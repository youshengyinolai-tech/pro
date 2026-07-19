/*
 state.js — アプリ全体の状態(state)・進捗(progress/localStorage同期)・
 1000本ノック用の派生インデックス・共通ユーティリティをまとめて持つ。
 画面のHTMLを直接組み立てることはせず、router/study/exerciseがここを介して
 データを読み書きする。
*/
import { BASE_STAGES, STAGES, BOSS_GROUPS, BOSS_LONG_QS, questionTier } from '../data/questions.js';

export const STORE_KEY = 'oopExamQuest_v3';


  /* 1000本ノック用の全問プール。BASE_STAGESの通常+難問を1つのプールにまとめ、
     出典(章タイトル)を添えて扱えるようにしておく。ボス戦は元ステージの問題を
     再利用しているだけなので、重複を避けるためBASE_STAGESから直接集める。
     ボス専用の長文コード問題(BOSS_LONG_QS)だけはボス以外に存在しないので別途追加する。 */
  export const ENDLESS_POOL = [];
  BASE_STAGES.forEach(function(st){
    st.qs.forEach(function(q){ ENDLESS_POOL.push({q:q, unit:q.unit, diff:q.diff, tier:questionTier(q,'qs'), srcTitle:st.title, srcSub:st.sub}); });
    (st.qsHard||[]).forEach(function(q){ ENDLESS_POOL.push({q:q, unit:q.unit, diff:q.diff, tier:questionTier(q,'qsHard'), srcTitle:st.title, srcSub:st.sub+' ・ 難問'}); });
    (st.qsExtra||[]).forEach(function(q){ ENDLESS_POOL.push({q:q, unit:q.unit, diff:q.diff, tier:questionTier(q,'qsExtra'), srcTitle:st.title, srcSub:st.sub+' ・ 総復習演習'}); });
    (st.qsExpert||[]).forEach(function(q){ ENDLESS_POOL.push({q:q, unit:q.unit, diff:q.diff, tier:questionTier(q,'qsExpert'), srcTitle:st.title, srcSub:st.sub+' ・ 発展演習'}); });
    (st.qsDrag||[]).forEach(function(q){ ENDLESS_POOL.push({q:q, unit:q.unit, diff:q.diff, tier:questionTier(q,'qsDrag'), srcTitle:st.title, srcSub:st.sub+' ・ ドラッグ問題'}); });
  });
  BOSS_GROUPS.forEach(function(group){
    (BOSS_LONG_QS[group.id] || []).forEach(function(q){
      ENDLESS_POOL.push({q:q, unit:q.unit, diff:q.diff, tier:questionTier(q,'boss'), srcTitle:group.title, srcSub:group.sub+' ・ 総復習'});
    });
  });

  /* qid(問題の安定した識別子)からENDLESS_POOL上のINDEXを引けるようにしておく。復習モードが使う。 */
  export const POOL_INDEX_BY_QID = {};
  ENDLESS_POOL.forEach(function(entry, i){ POOL_INDEX_BY_QID[entry.q.qid] = i; });

  /* unit(章)ごとの出題対象INDEXを引けるようにしておく。弱点集計・単元フィルターの両方で使う。 */
  export const UNIT_LIST = BASE_STAGES.map(function(st){ return {id:st.id, title:st.title, sub:st.sub, emoji:st.emoji}; });
  export const POOL_INDICES_BY_UNIT = {};
  ENDLESS_POOL.forEach(function(entry, i){
    if(!POOL_INDICES_BY_UNIT[entry.unit]) POOL_INDICES_BY_UNIT[entry.unit] = [];
    POOL_INDICES_BY_UNIT[entry.unit].push(i);
  });


  export function loadProgress(){
    try{
      var raw = localStorage.getItem(STORE_KEY);
      if(raw) return JSON.parse(raw);
    }catch(e){}
    return {unlocked:1, stars:{}};
  }
  export function saveProgress(p){
    try{ localStorage.setItem(STORE_KEY, JSON.stringify(p)); }catch(e){}
  }

  export const progress = loadProgress();
  if(!progress.endless || !Array.isArray(progress.endless.queue)){
    progress.endless = {queue:[], pos:0, correct:0, wrong:0, streak:0, bestStreak:0};
  }
  if(!progress.settings){
    progress.settings = {allowAlt:false, endlessUnits:null, endlessDiffs:null, endlessTiers:null, studyModeActive:false};
  }
  if(!('endlessUnits' in progress.settings)){
    progress.settings.endlessUnits = null;
  }
  if(!('endlessDiffs' in progress.settings)){
    progress.settings.endlessDiffs = null;
  }
  if(!('endlessTiers' in progress.settings)){
    progress.settings.endlessTiers = null;
  }
  if(!('studyModeActive' in progress.settings)){
    progress.settings.studyModeActive = false;
  }
  /* 3段階だった旧重要度スキーマ(1=最重要/2=標準/3=深掘り)を5段階へ移行する。
     旧設定で絞り込み済みだった人が、アップデート後に急に0件になったり範囲が
     ズレたりしないよう、1→[1,2] 2→[3] 3→[4,5] へ機械的に対応づける。
     nullは「絞り込みなし=全件」を意味する既存の約束なのでそのまま引き継ぐ。 */
  if(progress.settings.tierSchemaVersion !== 5){
    var OLD_TIER_TO_NEW = {1:[1,2], 2:[3], 3:[4,5]};
    if(Array.isArray(progress.settings.endlessTiers) && progress.settings.endlessTiers.length){
      var migratedTiers = [];
      progress.settings.endlessTiers.forEach(function(oldLv){
        (OLD_TIER_TO_NEW[oldLv]||[]).forEach(function(newLv){
          if(migratedTiers.indexOf(newLv)===-1) migratedTiers.push(newLv);
        });
      });
      progress.settings.endlessTiers = migratedTiers.length ? migratedTiers : null;
    }
    progress.settings.tierSchemaVersion = 5;
  }
  if(!progress.unitStats){
    progress.unitStats = {};
  }
  if(!progress.missed){
    progress.missed = {};
  }
  if(!progress.studyCompleted){
    progress.studyCompleted = {};
  }
  if(!progress.studyMedal){
    progress.studyMedal = {};
  }
  saveProgress(progress);


  export function recordUnitAnswer(unit, correct){
    if(!unit) return;
    if(!progress.unitStats[unit]) progress.unitStats[unit] = {correct:0, wrong:0};
    if(correct) progress.unitStats[unit].correct++;
    else progress.unitStats[unit].wrong++;
  }

  /* 間違えた問題を「間違いノート」(progress.missed)に記録する。
     正解しても自動では消えない(消すのは解説パネルのチェックボックスで手動のみ)。
     戦闘・1000本ノック・復習モードのどこで間違えても、この関数を通るので自動的に集まってくる。 */
  export function recordMissed(qid, correct){
    if(!qid) return;
    if(!correct) progress.missed[qid] = true;
  }
  export function missedCount(){
    return Object.keys(progress.missed).length;
  }

  /* 弱点ほど出やすくする重み。攻略回数がまだ無い章は中立寄りの重みにしておく。 */
  export function unitWeight(unit){
    var s = progress.unitStats[unit];
    var total = s ? s.correct + s.wrong : 0;
    var wrongRate = total > 0 ? s.wrong/total : 0.35;
    return 1 + wrongRate*3; // 1x(誤答無し) 〜 4x(誤答ばかり)
  }

  export function unitAttemptInfo(unit){
    var s = progress.unitStats[unit];
    var total = s ? s.correct + s.wrong : 0;
    return {total:total, wrongRate: total>0 ? s.wrong/total : null};
  }

  /* 指定した単元群(省略時は全単元)の正誤実績から、今やるべき難易度バッチ(1〜4)を判定する。
     データが少ない章はまず基礎(1)から、誤答が少なく安定している章ほど高い難易度を勧める。 */
  export function recommendDifficulty(unitIds){
    var scope = (unitIds && unitIds.length) ? unitIds : UNIT_LIST.map(function(u){ return u.id; });
    var totalWrong=0, totalCount=0;
    scope.forEach(function(u){
      var s = progress.unitStats[u];
      if(s){ totalWrong += s.wrong; totalCount += s.correct + s.wrong; }
    });
    if(totalCount < 5) return 1;
    var rate = totalWrong/totalCount;
    if(rate > 0.5) return 1;
    if(rate > 0.3) return 2;
    if(rate > 0.15) return 3;
    return 4;
  }

  /* 弱点(誤答率が高い、または未挑戦)な単元だけを抜き出す。おすすめ設定の自動選択に使う。 */
  export function weakUnitIds(threshold){
    var th = (typeof threshold === 'number') ? threshold : 0.3;
    var weak = UNIT_LIST.map(function(u){ return u.id; }).filter(function(u){
      var info = unitAttemptInfo(u);
      return info.total===0 || info.wrongRate > th;
    });
    return weak.length ? weak : UNIT_LIST.map(function(u){ return u.id; });
  }

  /* 全問正しく1周する並び順は保ったまま、弱点の章ほど手前に来やすいよう重み付けして並べ替える。
     (指数分布を使った重み付きシャッフルで、重みが大きいほど先頭側に来やすくなる) */
  export function weightedShuffle(indices){
    return indices.map(function(i){
      var w = unitWeight(ENDLESS_POOL[i].unit);
      var key = Math.pow(Math.random(), 1/w);
      return {i:i, key:key};
    }).sort(function(a,b){ return b.key - a.key; }).map(function(k){ return k.i; });
  }

  export function currentEndlessPoolIndices(){
    var units = progress.settings.endlessUnits;
    var diffs = progress.settings.endlessDiffs;
    var tiers = progress.settings.endlessTiers;
    var base;
    if(!units || units.length===0){
      base = ENDLESS_POOL.map(function(_,i){return i;});
    } else {
      base = [];
      units.forEach(function(u){ base = base.concat(POOL_INDICES_BY_UNIT[u] || []); });
    }
    if(diffs && diffs.length){
      base = base.filter(function(i){ return diffs.indexOf(ENDLESS_POOL[i].diff)!==-1; });
    }
    if(tiers && tiers.length){
      base = base.filter(function(i){ return tiers.indexOf(ENDLESS_POOL[i].tier)!==-1; });
    }
    return base;
  }

  export function rebuildEndlessQueue(){
    progress.endless.queue = weightedShuffle(currentEndlessPoolIndices());
    progress.endless.pos = 0;
  }
  export function ensureEndlessQueue(){
    var pool = currentEndlessPoolIndices();
    if(progress.endless.queue.length !== pool.length){
      rebuildEndlessQueue();
    }
  }
  export function reshuffleEndlessQueue(){
    var lastIdx = progress.endless.queue.length ? progress.endless.queue[progress.endless.queue.length-1] : -1;
    var next = weightedShuffle(currentEndlessPoolIndices());
    if(next.length>1 && next[0]===lastIdx){
      var tmp=next[0]; next[0]=next[1]; next[1]=tmp;
    }
    progress.endless.queue = next;
    progress.endless.pos = 0;
  }


  export const state = {curQ:null, screen:'map', stageIndex:0, order:[], qIndex:0, heroHP:100, monsterHP:100, wrong:0, locked:false, failReason:null, lessonFromBattle:false, activeQs:[], pickerSelection:[], pickerDiffSelection:[1,2,3,4], pickerTierSelection:[1,2,3,4,5], pickerReturnScreen:'map', pickerReturnFocusId:null, reviewQueue:[], reviewPos:0, reviewStats:{correct:0, wrong:0}, dragPlacement:{}, dragSelected:null, dragQid:null, startTier:1, studyStep:0, studyPicked:null, studyCombo:0, studyBestCombo:0, studyWrongCount:0};


  export function shuffle(arr){
    var a = arr.slice();
    for(var i=a.length-1;i>0;i--){
      var j = Math.floor(Math.random()*(i+1));
      var t=a[i]; a[i]=a[j]; a[j]=t;
    }
    return a;
  }

  export function starString(n){
    var s='';
    for(var i=0;i<3;i++) s += (i<n? '★':'☆');
    return s;
  }

  export function totalStarsEarned(){
    var sum=0;
    Object.keys(progress.stars).forEach(function(k){ sum += progress.stars[k]; });
    return sum;
  }

  export function esc(s){
    return String(s).replace(/[&<>]/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c];});
  }

  export const FULLWIDTH_MAP = {
    '＊':'*','＋':'+','－':'-','＜':'<','＞':'>','／':'/','＆':'&','（':'(','）':')',
    '：':':','；':';','＿':'_','．':'.','，':',','　':' ','％':'%','＝':'=','！':'!',
    '”':'"','“':'"','’':"'",'‘':"'",'〜':'~','～':'~'
  };
  export function toHalfWidth(s){
    return String(s).replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(c){
      return String.fromCharCode(c.charCodeAt(0)-0xFEE0);
    }).replace(/[＊＋－＜＞／＆（）：；＿．，　％＝！”“’‘〜～]/g, function(c){
      return FULLWIDTH_MAP[c];
    });
  }
  export function normalize(s){
    return toHalfWidth(String(s)).trim().toLowerCase().replace(/\s+/g,'');
  }
  export function stripSemi(s){
    return s.replace(/[;。、]+$/,'');
  }
  export function stripStd(s){
    return s.replace(/^std::/,'');
  }
  export function checkAnswer(input, answers){
    var n = normalize(input);
    var n2 = stripSemi(n);
    var n3 = stripStd(n2);
    return answers.some(function(a){
      var an = normalize(a);
      var an2 = stripSemi(an);
      var an3 = stripStd(an2);
      return n===an || n2===an2 || n3===an3;
    });
  }

export const STUDY_MEDAL_ICON = {gold:'🏅', silver:'🥈', bronze:'🥉'};
export const MEDAL_RANK = {gold:3, silver:2, bronze:1};
