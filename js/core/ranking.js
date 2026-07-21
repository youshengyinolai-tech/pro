/*
 ranking.js — 既存の学習進捗を複数の観点で比較するランキングルームのデータ層。
 現在はlocalStorage版。公開時は同じ関数をSupabase実装へ差し替える。
*/
import { STAGES, TOTAL_STARS } from '../data/questions.js?v=2026072115';
import { progress, saveProgress, totalStarsEarned, learningActivitySummary } from './state.js?v=2026072115';

export const RANKING_METRICS = [
  {id:'overall', label:'総合進捗', unit:'pt'},
  {id:'dailyStreak', label:'連続捜査日数', unit:'日'},
  {id:'stars', label:'獲得スター', unit:'個'},
  {id:'clears', label:'クリア章', unit:'章'},
  {id:'correct', label:'累計正解', unit:'問'},
  {id:'accuracy', label:'正答率', unit:'%'},
  {id:'streak', label:'最高連続正解', unit:'問'},
  {id:'study', label:'学習完了', unit:'章'},
  {id:'medals', label:'学習メダル', unit:'pt'}
];

function hashString(text){
  var h=2166136261;
  for(var i=0;i<text.length;i++){ h^=text.charCodeAt(i); h=Math.imul(h,16777619); }
  return h>>>0;
}

function seededRandom(seed){
  var x=seed>>>0;
  return function(){
    x+=0x6D2B79F5;
    var t=x;
    t=Math.imul(t^(t>>>15),t|1);
    t^=t+Math.imul(t^(t>>>7),t|61);
    return ((t^(t>>>14))>>>0)/4294967296;
  };
}

function uid(prefix){
  return (prefix||'id')+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8);
}

function roomCode(){
  var chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var result='';
  for(var i=0;i<6;i++) result+=chars[Math.floor(Math.random()*chars.length)];
  return result;
}

function ensureRanking(){
  var changed=false;
  if(!progress.ranking){ progress.ranking={};changed=true; }
  if(!progress.ranking.playerId){ progress.ranking.playerId=uid('player');changed=true; }
  if(!progress.ranking.nickname){ progress.ranking.nickname='あなた';changed=true; }
  if(!Array.isArray(progress.ranking.rooms)){ progress.ranking.rooms=[];changed=true; }
  if(!progress.ranking.activeMetric){ progress.ranking.activeMetric='overall';changed=true; }
  if(changed) saveProgress(progress);
  return progress.ranking;
}

export function playerIdentity(){
  var ranking=ensureRanking();
  return {id:ranking.playerId,name:ranking.nickname};
}

export function setPlayerName(name){
  var ranking=ensureRanking();
  ranking.nickname=String(name||'').trim().slice(0,16)||'あなた';
  ranking.rooms.forEach(function(room){
    var member=room.members.filter(function(m){ return m.id===ranking.playerId; })[0];
    if(member) member.name=ranking.nickname;
  });
  saveProgress(progress);
}

export function captureProgress(){
  var stars=totalStarsEarned();
  var clears=Object.keys(progress.stars||{}).filter(function(id){ return (progress.stars[id]||0)>0; }).length;
  var correct=0,wrong=0;
  Object.keys(progress.unitStats||{}).forEach(function(unit){
    correct+=(progress.unitStats[unit].correct||0);
    wrong+=(progress.unitStats[unit].wrong||0);
  });
  var accuracy=(correct+wrong)>0?Math.round(correct/(correct+wrong)*100):0;
  var study=Object.keys(progress.studyCompleted||{}).filter(function(id){ return !!progress.studyCompleted[id]; }).length;
  var medals=0;
  Object.keys(progress.studyMedal||{}).forEach(function(id){
    medals+=({gold:3,silver:2,bronze:1}[progress.studyMedal[id]]||0);
  });
  var streak=(progress.endless&&progress.endless.bestStreak)||0;
  var dailyStreak=learningActivitySummary().streak||0;
  var overall=stars*100+clears*80+correct*4+accuracy*3+streak*20+study*70+medals*35;
  return {overall:overall,dailyStreak:dailyStreak,stars:stars,clears:clears,correct:correct,accuracy:accuracy,streak:streak,study:study,medals:medals,updatedAt:new Date().toISOString()};
}

var DEMO_NAMES=['NullHunter','Pointer侍','SegFault猫','ClassMaster','LoopRider','Bit探偵','Stack探偵','Lambda狐'];

function demoSnapshot(random, base, index){
  var strength=.35+random()*.9;
  var stars=Math.min(TOTAL_STARS,Math.max(0,Math.round((base.stars||10)*strength+random()*8)));
  var clears=Math.min(STAGES.length,Math.max(0,Math.round(stars/2.5+random()*2)));
  var correct=Math.max(5,Math.round((base.correct||80)*strength+random()*120));
  var accuracy=Math.min(100,Math.max(42,Math.round((base.accuracy||72)+random()*24-10)));
  var streak=Math.max(1,Math.round((base.streak||5)*strength+random()*12));
  var dailyStreak=Math.max(1,Math.round((base.dailyStreak||3)*strength+random()*7));
  var study=Math.min(STAGES.length,Math.max(0,Math.round((base.study||4)*strength+random()*5)));
  var medals=Math.min(STAGES.length*3,Math.max(0,Math.round((base.medals||5)*strength+random()*8)));
  return {
    overall:stars*100+clears*80+correct*4+accuracy*3+streak*20+study*70+medals*35,
    dailyStreak:dailyStreak,stars:stars,clears:clears,correct:correct,accuracy:accuracy,streak:streak,study:study,medals:medals,
    updatedAt:new Date(Date.now()-index*3600000).toISOString()
  };
}

export function createRoom(name){
  var ranking=ensureRanking();
  var identity=playerIdentity();
  var room={
    id:uid('room'),
    code:roomCode(),
    name:String(name||'').trim().slice(0,30)||'みんなの学習部屋',
    ownerId:identity.id,
    createdAt:new Date().toISOString(),
    members:[{id:identity.id,name:identity.name,isPlayer:true,snapshot:captureProgress()}]
  };
  var random=seededRandom(hashString(room.code));
  DEMO_NAMES.forEach(function(memberName,index){
    room.members.push({id:'demo-'+room.id+'-'+index,name:memberName,isDemo:true,snapshot:demoSnapshot(random,captureProgress(),index+1)});
  });
  ranking.rooms.unshift(room);
  ranking.activeRoomId=room.id;
  saveProgress(progress);
  return room;
}

export function joinRoom(code){
  var ranking=ensureRanking();
  var normalized=String(code||'').trim().toUpperCase();
  var room=ranking.rooms.filter(function(r){ return r.code===normalized; })[0];
  if(!room) return {ok:false,error:'この端末には、その招待コードの部屋がありません。'};
  ranking.activeRoomId=room.id;
  syncCurrentPlayer(room.id);
  saveProgress(progress);
  return {ok:true,room:room};
}

export function listRooms(){
  return ensureRanking().rooms.slice();
}

export function getRoom(roomId){
  var ranking=ensureRanking();
  return ranking.rooms.filter(function(room){ return room.id===(roomId||ranking.activeRoomId); })[0]||null;
}

export function openRoom(roomId){
  var ranking=ensureRanking();
  if(!getRoom(roomId)) return false;
  ranking.activeRoomId=roomId;
  syncCurrentPlayer(roomId);
  saveProgress(progress);
  return true;
}

export function syncCurrentPlayer(roomId){
  var room=getRoom(roomId);
  if(!room) return;
  var identity=playerIdentity();
  var member=room.members.filter(function(m){ return m.id===identity.id; })[0];
  /* Firebase上のメンバーIDは匿名認証UID、端末内のplayerIdとは異なる。
     オンライン部屋ではisPlayerで既存の自分を見つけ、二重追加を防ぐ。 */
  if(!member && room.isFirebase){
    member=room.members.filter(function(m){ return !!m.isPlayer; })[0];
  }
  if(!member){
    member={id:identity.id,name:identity.name,isPlayer:true,snapshot:{}};
    room.members.push(member);
  }
  member.name=identity.name;
  member.snapshot=captureProgress();
  saveProgress(progress);
}

export function removeRoom(roomId){
  var ranking=ensureRanking();
  ranking.rooms=ranking.rooms.filter(function(room){ return room.id!==roomId; });
  if(ranking.activeRoomId===roomId) ranking.activeRoomId=null;
  saveProgress(progress);
}

export function saveRemoteRoom(room){
  if(!room || !room.id) return null;
  var ranking=ensureRanking();
  var index=ranking.rooms.findIndex(function(item){ return item.id===room.id; });
  room.isFirebase=true;
  if(index===-1) ranking.rooms.unshift(room);
  else ranking.rooms[index]=room;
  ranking.activeRoomId=room.id;
  saveProgress(progress);
  return room;
}

export function roomRanking(room,metricId){
  var metric=RANKING_METRICS.filter(function(m){ return m.id===metricId; })[0]||RANKING_METRICS[0];
  return (room?room.members:[]).map(function(member){
    return {id:member.id,name:member.name,isPlayer:member.isPlayer,isDemo:member.isDemo,value:Number((member.snapshot||{})[metric.id])||0,updatedAt:(member.snapshot||{}).updatedAt};
  }).sort(function(a,b){
    if(b.value!==a.value) return b.value-a.value;
    return String(a.updatedAt||'').localeCompare(String(b.updatedAt||''));
  }).map(function(row,index){ row.rank=index+1; return row; });
}

ensureRanking();
