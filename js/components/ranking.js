/*
 ranking.js — ランキングルームの作成、招待コード参加、複数観点順位表を描画する。
*/
import { state, progress, saveProgress, applySyncedProgress, esc } from '../core/state.js?v=2026072109';
import {
  RANKING_METRICS, playerIdentity, setPlayerName, captureProgress,
  createRoom, joinRoom, listRooms, getRoom, openRoom, syncCurrentPlayer,
  removeRoom, roomRanking, saveRemoteRoom
} from '../core/ranking.js?v=2026072109';
import { firebaseAvailable } from '../services/firebase.js';
import {
  createFirebaseRoom, joinFirebaseRoom, syncFirebaseProgress, loadFirebaseRoom,
  subscribeFirebaseRoomMembers, kickFirebaseMember
} from '../services/firebaseRanking.js?v=2026072109';
import {
  createProgressLink, joinProgressLink, pushProgressLink, subscribeProgressLink
} from '../services/firebaseProgress.js?v=2026072101';
import { render, renderTopbar } from '../core/router.js?v=2026072109';
import { icon } from '../core/icons.js';

var realtimeRoomId=null;
var stopRealtimeRoom=null;
var REMOTE_SYNC_INTERVAL=60*1000;
var MAX_AUTO_SYNCS_PER_DAY=100;
var MAX_PROGRESS_SYNCS_PER_DAY=250;
var MAX_REALTIME_STARTS_PER_DAY=20;
var progressSyncTimer=null,progressSyncStop=null,progressSyncRevision=0,applyingRemoteProgress=false,lastProgressPayloadKey='';
var rankingSyncTimer=null;

function syncPayload(){
  var payload=JSON.parse(JSON.stringify(progress));
  delete payload.ranking;
  if(payload.endless){ payload.endless.queue=[];payload.endless.pos=0; }
  return payload;
}

function scheduleProgressCloudSync(){
  var link=progress.settings&&progress.settings.progressSync;
  if(!firebaseAvailable()||!link||applyingRemoteProgress) return;
  var payloadKey=JSON.stringify(syncPayload());
  if(payloadKey===lastProgressPayloadKey) return;
  clearTimeout(progressSyncTimer);
  progressSyncTimer=setTimeout(async function(){
    var budget=dailyBudget('progressSyncs');
    if(budget.count>=MAX_PROGRESS_SYNCS_PER_DAY) return;
    try{
      var payload=syncPayload();
      await pushProgressLink(link.syncId,payload,progressSyncRevision);
      lastProgressPayloadKey=JSON.stringify(payload);
      budget.count++;saveProgress(progress);
    }
    catch(error){ console.warn('進捗同期に失敗しました',error); }
  },2500);
}

async function startProgressCloudSync(){
  var link=progress.settings&&progress.settings.progressSync;
  if(!firebaseAvailable()||!link||progressSyncStop) return;
  progressSyncStop=await subscribeProgressLink(link.syncId,function(remote){
    progressSyncRevision=remote.revision||0;
    if(!remote.payload) return;
    var remoteKey=JSON.stringify(remote.payload);
    if(remoteKey===JSON.stringify(syncPayload())){ lastProgressPayloadKey=remoteKey;return; }
    applyingRemoteProgress=true;
    applySyncedProgress(remote.payload);
    lastProgressPayloadKey=remoteKey;
    applyingRemoteProgress=false;
    if(state.screen==='map'||state.screen==='ranking'||state.screen==='ranking-room') render();
  },function(error){ console.warn('進捗リアルタイム同期を停止しました',error); });
}

function rankingSnapshotKey(){
  var snapshot=captureProgress();
  delete snapshot.updatedAt;
  return JSON.stringify(snapshot);
}

function scheduleRankingCloudSync(delay){
  if(!firebaseAvailable()) return;
  var key=rankingSnapshotKey();
  if(!progress.ranking.remoteSnapshotKeys) progress.ranking.remoteSnapshotKeys={};
  var onlineRooms=listRooms().filter(function(room){ return room.isFirebase; });
  if(!onlineRooms.some(function(room){ return progress.ranking.remoteSnapshotKeys[room.id]!==key; })) return;
  clearTimeout(rankingSyncTimer);
  rankingSyncTimer=setTimeout(function(){
    listRooms().filter(function(room){ return room.isFirebase; }).forEach(function(room){
      syncProgressIfDue(room).catch(function(error){ console.warn('ランキング同期に失敗しました',error); });
    });
  },typeof delay==='number'?delay:3000);
}

if(typeof window!=='undefined'){
  window.addEventListener('codecase:progress-saved',function(){
    scheduleProgressCloudSync();
    scheduleRankingCloudSync();
  });
  setTimeout(startProgressCloudSync,0);
}

function dailyBudget(name){
  if(!progress.ranking.autoUpdateBudget) progress.ranking.autoUpdateBudget={};
  var today=new Date().toISOString().slice(0,10);
  var budget=progress.ranking.autoUpdateBudget[name];
  if(!budget||budget.day!==today) budget={day:today,count:0};
  progress.ranking.autoUpdateBudget[name]=budget;
  return budget;
}

function stopRealtimeRanking(){
  if(stopRealtimeRoom) stopRealtimeRoom();
  stopRealtimeRoom=null;
  realtimeRoomId=null;
}

async function syncProgressIfDue(room){
  if(!firebaseAvailable()||!room) return false;
  var snapshotKey=rankingSnapshotKey();
  if(!progress.ranking.remoteSnapshotKeys) progress.ranking.remoteSnapshotKeys={};
  if(progress.ranking.remoteSnapshotKeys[room.id]===snapshotKey) return false;
  if(!progress.ranking.remoteSyncAt) progress.ranking.remoteSyncAt={};
  var last=progress.ranking.remoteSyncAt[room.id]||0;
  if(Date.now()-last<REMOTE_SYNC_INTERVAL){
    scheduleRankingCloudSync(REMOTE_SYNC_INTERVAL-(Date.now()-last)+100);
    return false;
  }
  var budget=dailyBudget('syncs');
  if(budget.count>=MAX_AUTO_SYNCS_PER_DAY) return false;
  await syncFirebaseProgress(room.id,playerIdentity().name,captureProgress(),playerIdentity().id);
  progress.ranking.remoteSyncAt[room.id]=Date.now();
  progress.ranking.remoteSnapshotKeys[room.id]=snapshotKey;
  budget.count++;
  saveProgress(progress);
  return true;
}

async function startRealtimeRanking(room){
  if(!firebaseAvailable()||!room||realtimeRoomId===room.id) return;
  stopRealtimeRanking();
  var realtimeBudget=dailyBudget('listeners');
  if(realtimeBudget.count>=MAX_REALTIME_STARTS_PER_DAY) return;
  realtimeBudget.count++;
  saveProgress(progress);
  realtimeRoomId=room.id;
  try{
    await syncProgressIfDue(room);
    if(realtimeRoomId!==room.id) return;
    stopRealtimeRoom=await subscribeFirebaseRoomMembers(room,function(remote){
      saveRemoteRoom(remote);
      if(state.screen==='ranking-room'&&getRoom()&&getRoom().id===remote.id) render();
    },function(error){
      console.warn('ランキング自動更新を停止しました',error);
    });
  }catch(error){
    console.warn('ランキング自動同期に失敗しました',error);
  }
}

function metricLabel(metricId){
  return RANKING_METRICS.filter(function(m){ return m.id===metricId; })[0]||RANKING_METRICS[0];
}

function roomCards(){
  var rooms=listRooms();
  if(!rooms.length) return '<div class="room-empty"><span>'+icon('archive')+'</span><h3>まだ参加中の部屋はありません</h3><p>部屋を作成して、既存コンテンツの進捗を競ってみよう。</p></div>';
  return '<div class="room-list">'+rooms.map(function(room){
    var own=room.members.filter(function(member){ return member.isPlayer; })[0];
    return '<button class="room-card" data-room-id="'+esc(room.id)+'">'+
      '<span class="room-card-icon">'+icon('trophy')+'</span><span><strong>'+esc(room.name)+'</strong>'+
      '<small>'+room.members.length+'人 ・ 招待コード '+esc(room.code)+'</small></span>'+
      '<b>'+(own?Math.round((own.snapshot||{}).overall||0).toLocaleString():'0')+' pt</b>'+
    '</button>';
  }).join('')+'</div>';
}

export function renderRankingHome(){
  var identity=playerIdentity();
  var snapshot=captureProgress();
  return ''+renderTopbar()+
    '<div class="battlebar"><button class="backbtn" id="btnHome">← 地図へ戻る</button></div>'+
    '<main class="league-shell">'+
      '<section class="frame league-hero room-hero"><div><span class="league-eyebrow">PROGRESS RANKING ROOMS</span>'+
        '<h2>'+icon('trophy')+' ランキングルーム</h2>'+
        '<p>新しい専用問題ではなく、これまでの章攻略・学習・演習の実績をみんなで競います。</p></div>'+
        '<label class="league-nickname room-profile">ランキング表示名<input id="rankingNickname" maxlength="16" value="'+esc(identity.name)+'"></label>'+
      '</section>'+
      '<section class="room-progress-strip">'+
        '<div><small>総合進捗</small><strong>'+snapshot.overall.toLocaleString()+' pt</strong></div>'+
        '<div><small>連続捜査</small><strong>'+snapshot.dailyStreak+'日</strong></div>'+
        '<div><small>スター</small><strong>'+snapshot.stars+'</strong></div>'+
        '<div><small>累計正解</small><strong>'+snapshot.correct+'</strong></div>'+
        '<div><small>正答率</small><strong>'+snapshot.accuracy+'%</strong></div>'+
        '<div><small>学習完了</small><strong>'+snapshot.study+'章</strong></div>'+
      '</section>'+
      '<div class="room-actions-grid">'+
        '<section class="frame room-action"><span class="league-eyebrow">CREATE ROOM</span><h3>新しい部屋を作る</h3>'+
          '<p>名前を決めると6文字の招待コードが発行されます。</p>'+
          '<form id="createRoomForm"><input id="roomName" maxlength="30" placeholder="例：期末試験ガチ勢"><button class="primary" type="submit">部屋を作成</button></form>'+
        '</section>'+
        '<section class="frame room-action"><span class="league-eyebrow">JOIN ROOM</span><h3>招待コードで参加</h3>'+
          '<p>友達から受け取った6文字のコードを入力します。</p>'+
          '<form id="joinRoomForm"><input id="roomCode" maxlength="6" placeholder="ABC234"><button class="primary" type="submit">部屋に参加</button></form>'+
          '<p class="room-error" id="roomError" aria-live="polite"></p>'+
        '</section>'+
      '</div>'+
      '<section class="frame room-index"><div class="room-section-head"><div><span class="league-eyebrow">DEVICE SYNC</span><h3>スマホ・PCの進捗同期</h3></div></div>'+
        ((progress.settings&&progress.settings.progressSync)
          ? '<p>同期中のコード：<strong class="sync-code-value">'+esc(progress.settings.progressSync.code)+'</strong></p>'
          : '<p>片方の端末でコードを発行し、もう片方へ入力すると同じ進捗を共有できます。</p><div class="room-actions-grid">'+
            '<button class="primary" id="btnCreateProgressSync" type="button">同期コードを発行</button>'+
            '<form id="joinProgressSyncForm"><input id="progressSyncCode" maxlength="10" placeholder="10文字のコード"><button class="ghost" type="submit">この端末を同期</button></form></div>')+
        '<p class="room-error" id="progressSyncError" aria-live="polite"></p></section>'+
      '<section class="frame room-index"><div class="room-section-head"><div><span class="league-eyebrow">YOUR ROOMS</span><h3>参加中の部屋</h3></div><small>'+listRooms().length+'部屋</small></div>'+roomCards()+'</section>'+
      '<p class="league-local-note room-demo-note">'+
        (firebaseAvailable()
          ? 'Firebaseオンライン同期が有効です。部屋コードを使って別端末から参加できます。'
          : 'ローカル動作確認モードです。Firebase設定を入力すると、同じ画面のまま別端末同期へ切り替わります。')+
      '</p>'+
    '</main>';
}

function metricTabs(active){
  return '<div class="metric-tabs" role="tablist">'+RANKING_METRICS.map(function(metric){
    return '<button role="tab" class="metric-tab'+(metric.id===active?' active':'')+'" data-metric="'+metric.id+'">'+esc(metric.label)+'</button>';
  }).join('')+'</div>';
}

function rankingTable(room,active){
  var metric=metricLabel(active);
  var isOwner=room.members.some(function(member){ return member.isPlayer&&member.id===room.ownerId; });
  return '<div class="league-table room-ranking-table" role="table">'+roomRanking(room,active).map(function(row){
    var rowIsOwner=row.id===room.ownerId;
    return '<div class="league-row'+(row.isPlayer?' player':'')+'" role="row">'+
      '<span class="league-rank">'+row.rank+'</span>'+
      '<span class="league-name">'+esc(row.name)+(rowIsOwner?' <small class="room-owner-badge">部屋主</small>':'')+(row.isPlayer?' <small>YOU</small>':'')+'</span>'+
      '<strong>'+row.value.toLocaleString()+' '+metric.unit+'</strong>'+
      '<span class="member-kind">'+(rowIsOwner?'OWNER':(row.isDemo?'DEMO':'MEMBER'))+'</span>'+
      '<span class="member-action">'+(isOwner&&!row.isPlayer?'<button type="button" data-kick-member="'+esc(row.id)+'" data-kick-name="'+esc(row.name)+'">キック</button>':'')+'</span>'+
    '</div>';
  }).join('')+'</div>';
}

export function renderRankingRoom(){
  var room=getRoom();
  if(!room){ state.screen='ranking'; return renderRankingHome(); }
  syncCurrentPlayer(room.id);
  var active=progress.ranking.activeMetric||'overall';
  var rows=roomRanking(room,active);
  var player=rows.filter(function(row){ return row.isPlayer; })[0];
  return ''+renderTopbar()+
    '<div class="battlebar"><button class="backbtn" id="btnRankingBack">← 部屋一覧</button><button class="backbtn" id="btnMap">地図へ戻る</button></div>'+
    '<main class="league-shell">'+
      '<section class="frame league-hero room-detail-hero"><div><span class="league-eyebrow">RANKING ROOM // '+esc(room.code)+'</span>'+
        '<h2>'+icon('trophy')+' '+esc(room.name)+'</h2><p>'+room.members.length+'人が参加中。学習中の進捗は短い間隔でまとめてランキングへ自動反映されます。</p></div>'+
        '<div class="room-code"><small>招待コード</small><strong>'+esc(room.code)+'</strong><button id="btnCopyCode">コピー</button></div>'+
      '</section>'+
      '<section class="frame room-board">'+
        '<div class="room-section-head"><div><span class="league-eyebrow">MULTI VIEW RANKING</span><h3>'+esc(metricLabel(active).label)+'ランキング</h3></div>'+
          '<div class="your-room-rank"><small>あなたの順位</small><strong>'+(player?player.rank:'-')+'位</strong></div></div>'+
        metricTabs(active)+rankingTable(room,active)+
      '</section>'+
      '<div class="room-detail-actions"><button class="ghost" id="btnSyncProgress">'+icon('review')+' 現在の進捗を反映</button>'+
        '<button class="ghost danger-room" id="btnRemoveRoom">この端末から部屋を削除</button></div>'+
      '<p class="league-local-note room-demo-note">'+
        (firebaseAvailable()?'Firebaseと同期するオンラインルームです。':'現在は動作確認用ローカルルームです。')+
      '</p>'+
    '</main>';
}

export function wireRankingHome(){
  document.getElementById('btnHome').addEventListener('click',function(){ state.screen='map'; render(); });
  document.getElementById('rankingNickname').addEventListener('change',function(event){ setPlayerName(event.target.value); render(); });
  var createSync=document.getElementById('btnCreateProgressSync');
  if(createSync) createSync.addEventListener('click',async function(){
    this.disabled=true;
    try{
      var link=await createProgressLink(syncPayload());
      progress.settings.progressSync=link;saveProgress(progress);
      await startProgressCloudSync();render();
    }catch(error){ document.getElementById('progressSyncError').textContent=error.message;this.disabled=false; }
  });
  var joinSync=document.getElementById('joinProgressSyncForm');
  if(joinSync) joinSync.addEventListener('submit',async function(event){
    event.preventDefault();
    try{
      var joined=await joinProgressLink(document.getElementById('progressSyncCode').value);
      progress.settings.progressSync={syncId:joined.syncId,code:joined.code};
      applyingRemoteProgress=true;applySyncedProgress(joined.payload);applyingRemoteProgress=false;
      progressSyncRevision=joined.revision||0;saveProgress(progress);
      await startProgressCloudSync();render();
    }catch(error){ document.getElementById('progressSyncError').textContent=error.message; }
  });
  document.getElementById('createRoomForm').addEventListener('submit',async function(event){
    event.preventDefault();
    var room=createRoom(document.getElementById('roomName').value);
    if(firebaseAvailable()){
      try{
        await createFirebaseRoom(room);
        var remote=await loadFirebaseRoom(room.id);
        if(remote) saveRemoteRoom(remote);
      }catch(error){
        document.getElementById('roomError').textContent='Firebase: '+error.message;
        return;
      }
    }
    state.screen='ranking-room'; render();
  });
  document.getElementById('joinRoomForm').addEventListener('submit',async function(event){
    event.preventDefault();
    var code=document.getElementById('roomCode').value;
    if(firebaseAvailable()){
      try{
        var roomId=await joinFirebaseRoom(code,playerIdentity().name,captureProgress(),playerIdentity().id);
        var remote=await loadFirebaseRoom(roomId);
        if(remote) saveRemoteRoom(remote);
        state.screen='ranking-room'; render();
      }catch(error){
        document.getElementById('roomError').textContent='Firebase: '+error.message;
      }
    }else{
      var result=joinRoom(code);
      if(result.ok){ state.screen='ranking-room'; render(); }
      else document.getElementById('roomError').textContent=result.error;
    }
  });
  Array.prototype.forEach.call(document.querySelectorAll('.room-card'),function(button){
    button.addEventListener('click',function(){ if(openRoom(button.getAttribute('data-room-id'))){ state.screen='ranking-room'; render(); } });
  });
}

export function wireRankingRoom(){
  var currentRoom=getRoom();
  startRealtimeRanking(currentRoom);
  document.getElementById('btnRankingBack').addEventListener('click',function(){ stopRealtimeRanking(); state.screen='ranking'; render(); });
  document.getElementById('btnMap').addEventListener('click',function(){ stopRealtimeRanking(); state.screen='map'; render(); });
  Array.prototype.forEach.call(document.querySelectorAll('.metric-tab'),function(button){
    button.addEventListener('click',function(){ progress.ranking.activeMetric=button.getAttribute('data-metric'); render(); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-kick-member]'),function(button){
    button.addEventListener('click',async function(){
      var room=getRoom();
      var name=button.getAttribute('data-kick-name')||'このメンバー';
      if(!room||!window.confirm('「'+name+'」をこの部屋からキックしますか？')) return;
      button.disabled=true;
      try{
        await kickFirebaseMember(room.id,button.getAttribute('data-kick-member'));
      }catch(error){
        button.disabled=false;
        window.alert('キックに失敗しました: '+error.message);
      }
    });
  });
  document.getElementById('btnSyncProgress').addEventListener('click',async function(){
    var room=getRoom();
    syncCurrentPlayer();
    if(firebaseAvailable()&&room){
      try{
        var synced=await syncProgressIfDue(room);
        if(!synced){
          this.textContent='自動同期済み';
          setTimeout(function(){ var button=document.getElementById('btnSyncProgress'); if(button) button.textContent='進捗を同期'; },1200);
        }
      }catch(error){
        window.alert('Firebase同期に失敗しました: '+error.message);
      }
    }
    render();
  });
  document.getElementById('btnCopyCode').addEventListener('click',function(){
    var button=this,room=getRoom();
    if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(room.code);
    button.textContent='コピー済み'; setTimeout(function(){ button.textContent='コピー'; },1000);
  });
  document.getElementById('btnRemoveRoom').addEventListener('click',function(){
    var room=getRoom();
    if(room&&window.confirm('「'+room.name+'」をこの端末から削除しますか？')){ stopRealtimeRanking(); removeRoom(room.id); state.screen='ranking'; render(); }
  });
}
