/*
 state.js — アプリ全体の状態(state)・進捗(progress/localStorage同期)・
 1000本ノック用の派生インデックス・共通ユーティリティをまとめて持つ。
 画面のHTMLを直接組み立てることはせず、router/study/exerciseがここを介して
 データを読み書きする。
*/
import {
  BASE_STAGES, STAGES, BOSS_GROUPS, BOSS_LONG_QS, questionTier,
  questionIsRedundant, questionSimilarityTag
} from '../data/questions.js?v=2026072115';

export const STORE_KEY = 'oopExamQuest_v3';

/* 保存データのスキーマバージョン。既存キー(STORE_KEY)は変更せず、中身に
   storageSchemaVersionを持たせて世代を管理する。3(無印)→4への移行時だけ、
   移行前の生データをBACKUP_KEYへ一度だけ複製する。壊れた保存データを検知した
   場合は、デフォルト値で上書きしてしまわないようsaveProgressを一時停止する。 */
export const STORAGE_SCHEMA_VERSION = 4;
export const STORAGE_BACKUP_KEY = STORE_KEY + '_backup_before_schema4';
const BACKUP_KEY = STORAGE_BACKUP_KEY;
let storageWriteLocked = false;
export function isStorageWriteLocked(){ return storageWriteLocked; }


  /* 1000本ノック用の全問プール。BASE_STAGESの通常+難問を1つのプールにまとめ、
     出典(章タイトル)を添えて扱えるようにしておく。ボス戦は元ステージの問題を
     再利用しているだけなので、重複を避けるためBASE_STAGESから直接集める。
     ボス専用の長文コード問題(BOSS_LONG_QS)だけはボス以外に存在しないので別途追加する。 */
  export const ENDLESS_POOL = [];
  function addEndlessQuestion(entry){ if(!questionIsRedundant(entry.q)) ENDLESS_POOL.push(entry); }
  BASE_STAGES.forEach(function(st){
    st.qs.forEach(function(q){ addEndlessQuestion({q:q, unit:q.unit, diff:q.diff, tier:questionTier(q,'qs'), srcTitle:st.title, srcSub:st.sub}); });
    (st.qsHard||[]).forEach(function(q){ addEndlessQuestion({q:q, unit:q.unit, diff:q.diff, tier:questionTier(q,'qsHard'), srcTitle:st.title, srcSub:st.sub+' ・ 難問'}); });
    (st.qsExtra||[]).forEach(function(q){ addEndlessQuestion({q:q, unit:q.unit, diff:q.diff, tier:questionTier(q,'qsExtra'), srcTitle:st.title, srcSub:st.sub+' ・ 総復習演習'}); });
    (st.qsExpert||[]).forEach(function(q){ addEndlessQuestion({q:q, unit:q.unit, diff:q.diff, tier:questionTier(q,'qsExpert'), srcTitle:st.title, srcSub:st.sub+' ・ 発展演習'}); });
    (st.qsDrag||[]).forEach(function(q){ addEndlessQuestion({q:q, unit:q.unit, diff:q.diff, tier:questionTier(q,'qsDrag'), srcTitle:st.title, srcSub:st.sub+' ・ ドラッグ問題'}); });
  });
  BOSS_GROUPS.forEach(function(group){
    (BOSS_LONG_QS[group.id] || []).forEach(function(q){
      addEndlessQuestion({q:q, unit:q.unit, diff:q.diff, tier:questionTier(q,'boss'), srcTitle:group.title, srcSub:group.sub+' ・ 総復習'});
    });
  });

  /* qid(問題の安定した識別子)からENDLESS_POOL上のINDEXを引けるようにしておく。復習モードが使う。 */
  export const POOL_INDEX_BY_QID = {};
  ENDLESS_POOL.forEach(function(entry, i){ POOL_INDEX_BY_QID[entry.q.qid] = i; });

  /* 表示上の4段階は維持しつつ、同じ段階内の問題差を100〜1000で表す内部レート。
     解説文の長さは難しさに含めず、実際に読むコード・組み立てる回答の特徴だけを見る。 */
  function questionComplexityScore(q){
    var type=q.type||'fill';
    var answer=String((q.answers&&q.answers[0])||'');
    var code=[q.before||'',q.after||'',q.code||'',q.lead||'']
      .concat((q.lines||[]).map(function(line){ return line.code||''; })).join('\n');
    var codeLines=code.split('\n').filter(function(line){ return line.trim(); }).length;
    var answerLines=answer.split('\n').filter(function(line){ return line.trim(); }).length;
    var controlTokens=(code.match(/\b(?:if|else|for|while|switch|case|return|new|delete|class|template|try|catch)\b/g)||[]).length;
    var operators=(code.match(/(?:<<|>>|==|!=|<=|>=|&&|\|\||\+\+|--|[+\-*\/%=<>])/g)||[]).length;
    var brackets=(code.match(/[()[\]{}]/g)||[]).length;
    var typeWeight={choice:-20,fill:0,debug:42,order:34,dragfill:28}[type]||0;
    var score=typeWeight+
      Math.min(125,answer.length*0.7)+
      Math.min(90,Math.max(0,answerLines-1)*18)+
      Math.min(90,codeLines*5)+
      Math.min(90,controlTokens*13)+
      Math.min(55,operators*2.2)+
      Math.min(45,brackets*1.4)+
      Math.min(70,(q.lines||[]).length*9)+
      Math.min(35,(q.pieces||[]).length*6);
    if(q.long) score+=75;
    if(q.answers&&q.answers.length>1) score-=Math.min(18,(q.answers.length-1)*5);
    return Math.max(0,score);
  }

  const DIFFICULTY_RANGES={1:[100,299],2:[300,499],3:[500,749],4:[750,1000]};
  const QUESTION_RATING_BY_QID={};
  [1,2,3,4].forEach(function(diff){
    var entries=ENDLESS_POOL.filter(function(entry){ return entry.diff===diff; });
    var scores=entries.map(function(entry){ return questionComplexityScore(entry.q); });
    var min=Math.min.apply(Math,scores),max=Math.max.apply(Math,scores);
    var range=DIFFICULTY_RANGES[diff];
    entries.forEach(function(entry,index){
      var ratio=max===min?0.5:(scores[index]-min)/(max-min);
      QUESTION_RATING_BY_QID[entry.q.qid]=Math.round(range[0]+ratio*(range[1]-range[0]));
    });
  });

  export function questionDifficultyRating(q){
    return QUESTION_RATING_BY_QID[q.qid] || 100;
  }

  /* unit(章)ごとの出題対象INDEXを引けるようにしておく。弱点集計・単元フィルターの両方で使う。 */
  export const UNIT_LIST = BASE_STAGES.map(function(st){ return {id:st.id, title:st.title, sub:st.sub, emoji:st.emoji}; });
  export const POOL_INDICES_BY_UNIT = {};
  ENDLESS_POOL.forEach(function(entry, i){
    if(!POOL_INDICES_BY_UNIT[entry.unit]) POOL_INDICES_BY_UNIT[entry.unit] = [];
    POOL_INDICES_BY_UNIT[entry.unit].push(i);
  });


  export function loadProgress(){
    var raw;
    try{ raw = localStorage.getItem(STORE_KEY); }catch(e){ raw = null; }

    if(!raw){
      storageWriteLocked = false;
      return {unlocked:1, stars:{}, storageSchemaVersion: STORAGE_SCHEMA_VERSION};
    }

    var parsed;
    try{
      parsed = JSON.parse(raw);
    }catch(e){
      storageWriteLocked = true;
      console.error('[codecase] 保存データの解析に失敗しました。既存データを保護するため自動保存を停止します。');
      return {unlocked:1, stars:{}, storageSchemaVersion: STORAGE_SCHEMA_VERSION};
    }
    if(!parsed || typeof parsed!=='object' || Array.isArray(parsed)){
      storageWriteLocked = true;
      console.error('[codecase] 保存データの形式が不正です。既存データを保護するため自動保存を停止します。');
      return {unlocked:1, stars:{}, storageSchemaVersion: STORAGE_SCHEMA_VERSION};
    }

    storageWriteLocked = false;
    var priorVersion = typeof parsed.storageSchemaVersion==='number' ? parsed.storageSchemaVersion : 1;
    if(priorVersion < STORAGE_SCHEMA_VERSION){
      try{
        if(localStorage.getItem(BACKUP_KEY)===null) localStorage.setItem(BACKUP_KEY, raw);
      }catch(e){}
    }
    parsed.storageSchemaVersion = STORAGE_SCHEMA_VERSION;
    return parsed;
  }
  var progressSaveEventQueued=false;
  export function saveProgress(p){
    if(storageWriteLocked) return;
    try{ localStorage.setItem(STORE_KEY, JSON.stringify(p)); }catch(e){}
    if(typeof window!=='undefined'&&window.dispatchEvent){
      if(progressSaveEventQueued) return;
      progressSaveEventQueued=true;
      queueMicrotask(function(){
        progressSaveEventQueued=false;
        window.dispatchEvent(new CustomEvent('codecase:progress-saved'));
      });
    }
  }

  export function applySyncedProgress(remote){
    if(!remote||typeof remote!=='object') return;
    var localLink=progress.settings&&progress.settings.progressSync;
    var localRanking=progress.ranking;
    Object.keys(progress).forEach(function(key){ delete progress[key]; });
    Object.keys(remote).forEach(function(key){ progress[key]=remote[key]; });
    if(!progress.settings) progress.settings={};
    if(localLink) progress.settings.progressSync=localLink;
    if(localRanking) progress.ranking=localRanking;
    /* remoteは別端末(古いキャッシュ済みバンドルの可能性がある)が保存した
       progressそのものなので、新しいフィールド(dropCase等)が欠けているかも
       しれない。normalizeProgress()を再度通して不足分を補ってから保存する。
       これを怠ると、同期直後にdropCase等が復元されず該当機能が
       (エラーが握りつぶされて)無反応になる。 */
    normalizeProgress();
    saveProgress(progress);
  }

  /* progressの欠けているフィールドへ既定値を補う。初回ロード時に加え、
     applySyncedProgress()での同期後にも呼び直す必要があるため関数化している。 */
  function normalizeProgress(){
  if(!progress.stars || typeof progress.stars!=='object' || Array.isArray(progress.stars)){
    progress.stars = {};
  }
  if(!progress.endless || !Array.isArray(progress.endless.queue)){
    progress.endless = {queue:[], pos:0, correct:0, wrong:0, streak:0, bestStreak:0};
  }
  if(progress.endless.adaptiveQueueVersion !== 2){
    progress.endless.queue = [];
    progress.endless.pos = 0;
    progress.endless.adaptiveQueueVersion = 2;
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
  if(!('endlessFastMode' in progress.settings)){
    progress.settings.endlessFastMode = true;
  }
  if([0,10,20,50,100].indexOf(progress.settings.endlessBatchSize)===-1){
    progress.settings.endlessBatchSize = 0;
  }
  if(progress.settings.endlessBatchSizeVersion !== 2){
    progress.settings.endlessBatchSize = 0;
    progress.settings.endlessBatchSizeVersion = 2;
  }
  if(!('endlessTiers' in progress.settings)){
    progress.settings.endlessTiers = null;
  }
  if(!('studyModeActive' in progress.settings)){
    progress.settings.studyModeActive = false;
  }
  if(!('soloCollapsed' in progress.settings)){
    progress.settings.soloCollapsed = false;
  }
  if(!('mobileAnswerMode' in progress.settings)){
    progress.settings.mobileAnswerMode = false;
  }
  if(progress.settings.answerModeVersion !== 2){
    progress.settings.mobileAnswerMode = false;
    progress.settings.answerModeVersion = 2;
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
  if(!progress.dropCase || typeof progress.dropCase!=='object'){
    progress.dropCase = {};
  }
  if(!progress.dropCase.normal || typeof progress.dropCase.normal!=='object'){
    progress.dropCase.normal = {cleared:false, bestScore:0, bestTimeMs:null, bestCombo:0, bestAccuracy:0, lastPlayedAt:null};
  }
  if(!progress.dropCase.endless || typeof progress.dropCase.endless!=='object'){
    progress.dropCase.endless = {unlocked:false, bestScore:0, bestSolved:0, bestCombo:0, bestLevel:0, lastPlayedAt:null};
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
  if(!progress.ranking){
    progress.ranking = {nickname:'あなた', rooms:[], activeMetric:'overall'};
  }
  if(!progress.ranking.nickname){
    progress.ranking.nickname = 'あなた';
  }
  if(!progress.activity || typeof progress.activity !== 'object'){
    progress.activity = {days:{}, bestDayCorrect:0};
  }
  if(!progress.activity.days || typeof progress.activity.days !== 'object'){
    progress.activity.days = {};
  }
  if(typeof progress.activity.bestDayCorrect !== 'number'){
    progress.activity.bestDayCorrect = 0;
  }
  if(!progress.showcase || typeof progress.showcase !== 'object'){
    progress.showcase = {achievementLabels:null};
  }
  }

  export const progress = loadProgress();
  normalizeProgress();
  saveProgress(progress);

  function activityDateKey(date){
    var d=date||new Date();
    return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  }

  function shiftedDateKey(daysAgo){
    var d=new Date();
    d.setHours(12,0,0,0);
    d.setDate(d.getDate()-daysAgo);
    return activityDateKey(d);
  }

  export function recordLearningActivity(kind, amount){
    var key=activityDateKey();
    var days=progress.activity.days;
    if(!days[key]) days[key]={answers:0,correct:0,studySteps:0,reviewsCleared:0};
    var field=kind||'answers';
    days[key][field]=(days[key][field]||0)+(typeof amount==='number'?amount:1);
    if((days[key].correct||0)>progress.activity.bestDayCorrect){
      progress.activity.bestDayCorrect=days[key].correct;
    }
  }

  export function learningActivitySummary(){
    var todayKey=activityDateKey();
    var today=progress.activity.days[todayKey]||{answers:0,correct:0,studySteps:0,reviewsCleared:0};
    var streak=0;
    var startOffset=((today.answers||0)+(today.studySteps||0)+(today.reviewsCleared||0))>0?0:1;
    for(var i=startOffset;i<370;i++){
      var day=progress.activity.days[shiftedDateKey(i)];
      if(!day||((day.answers||0)+(day.studySteps||0)+(day.reviewsCleared||0))===0) break;
      streak++;
    }
    var missions=[
      {id:'correct',label:'既存問題で5問正解',value:today.correct||0,target:5},
      {id:'study',label:'学習パートを3ステップ',value:today.studySteps||0,target:3},
      {id:'review',label:'間違いノートを1問解決',value:today.reviewsCleared||0,target:1}
    ];
    var completed=missions.filter(function(m){ return m.value>=m.target; }).length;
    return {today:today,streak:streak,missions:missions,completed:completed,bestDayCorrect:progress.activity.bestDayCorrect||0};
  }

  export function investigatorRank(){
    var correct=0;
    Object.keys(progress.unitStats||{}).forEach(function(unit){ correct+=(progress.unitStats[unit].correct||0); });
    var study=Object.keys(progress.studyCompleted||{}).filter(function(id){ return !!progress.studyCompleted[id]; }).length;
    var points=totalStarsEarned()*10+correct+study*20;
    var ranks=[
      {name:'見習い捜査員',min:0},
      {name:'コード巡査',min:100},
      {name:'事件解析官',min:300},
      {name:'上級デバッガー',min:700},
      {name:'首席コード探偵',min:1400}
    ];
    var current=ranks[0],next=null;
    ranks.forEach(function(rank,index){ if(points>=rank.min){ current=rank; next=ranks[index+1]||null; } });
    var pct=next?Math.max(0,Math.min(100,Math.round((points-current.min)/(next.min-current.min)*100))):100;
    return {name:current.name,points:points,next:next,percent:pct};
  }


  export function recordUnitAnswer(unit, correct){
    if(!unit) return;
    if(!progress.unitStats[unit]) progress.unitStats[unit] = {correct:0, wrong:0};
    if(correct) progress.unitStats[unit].correct++;
    else progress.unitStats[unit].wrong++;
    recordLearningActivity('answers',1);
    if(correct) recordLearningActivity('correct',1);
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

  /* 難易度をユーザーが絞っていないときの、単元別の習熟度を1.0〜4.0で返す。
     5問未満は基礎寄りから少しずつ上げ、十分な実績があれば誤答率に応じて連続的に変化させる。 */
  export function unitDifficultyTarget(unit){
    var info = unitAttemptInfo(unit);
    if(info.total < 5) return 1 + info.total*0.15;
    return Math.max(1, Math.min(4, 4 - info.wrongRate*5));
  }

  function adaptiveDifficultyWeight(entry){
    var targetLevel = unitDifficultyTarget(entry.unit);
    var targetRating = 100 + (targetLevel-1)*300;
    var distance = (questionDifficultyRating(entry.q)-targetRating)/145;
    return unitWeight(entry.unit) * (0.025 + Math.exp(-0.5*distance*distance));
  }

  function spaceSimilarIndices(indices,seedTags){
    var remaining=indices.slice(),result=[],recent=(seedTags||[]).slice(-6);
    while(remaining.length){
      var pick=remaining.findIndex(function(i){
        var tag=questionSimilarityTag(ENDLESS_POOL[i].q);
        return !tag||recent.indexOf(tag)===-1;
      });
      if(pick<0) pick=0;
      var chosen=remaining.splice(pick,1)[0],tag=questionSimilarityTag(ENDLESS_POOL[chosen].q);
      result.push(chosen);
      if(tag){ recent.push(tag);recent=recent.slice(-6); }
    }
    return result;
  }

  function prioritizeNewSimilarity(indices,usedTags){
    var remaining=indices.slice(),result=[];
    while(remaining.length){
      var pick=remaining.findIndex(function(i){
        var tag=questionSimilarityTag(ENDLESS_POOL[i].q);
        return !tag||!usedTags.has(tag);
      });
      if(pick<0) pick=0;
      var chosen=remaining.splice(pick,1)[0];
      var tag=questionSimilarityTag(ENDLESS_POOL[chosen].q);
      result.push(chosen);
      if(tag) usedTags.add(tag);
    }
    return result;
  }

  /* 全難易度が選ばれている（endlessDiffs=null）場合だけ使う適応出題。
     プールと同じ問数を保ちながら、単元ごとの目標難易度に近い問題を高確率で抽選する。 */
  export function adaptiveEndlessQueue(indices, requestedCount){
    var count=requestedCount||indices.length;
    var recentTags=(progress.endless.recentSimilarityTags||[]).slice(-6);
    var usedFastTags=new Set(progress.settings.endlessFastMode?(progress.endless.fastSeenSimilarityTags||[]):[]);
    if(progress.settings.endlessDiffs && progress.settings.endlessDiffs.length){
      var explicitQueue=[];
      while(explicitQueue.length<count && indices.length){
        var batch=spaceSimilarIndices(weightedShuffle(indices),recentTags);
        if(progress.settings.endlessFastMode) batch=prioritizeNewSimilarity(batch,usedFastTags);
        if(explicitQueue.length && batch.length>1 && explicitQueue[explicitQueue.length-1]===batch[0]){
          var swap=batch[0];batch[0]=batch[1];batch[1]=swap;
        }
        explicitQueue=explicitQueue.concat(batch);
      }
      return spaceSimilarIndices(explicitQueue.slice(0,count),recentTags);
    }
    if(indices.length < 2) return indices.slice();
    var queue=[];
    for(var n=0;n<count;n++){
      var totalWeight=0;
      var weighted=indices.map(function(i){
        var weight=adaptiveDifficultyWeight(ENDLESS_POOL[i]);
        if(queue.length && i===queue[queue.length-1]) weight*=0.08;
        var similarityTag=questionSimilarityTag(ENDLESS_POOL[i].q);
        if(similarityTag&&recentTags.indexOf(similarityTag)!==-1) weight*=0.025;
        if(progress.settings.endlessFastMode&&similarityTag&&usedFastTags.has(similarityTag)) weight*=0.002;
        totalWeight+=weight;
        return {i:i, ceiling:totalWeight};
      });
      var pick=Math.random()*totalWeight;
      var chosen=weighted[weighted.length-1].i;
      for(var j=0;j<weighted.length;j++){
        if(pick<weighted[j].ceiling){ chosen=weighted[j].i; break; }
      }
      queue.push(chosen);
      var chosenTag=questionSimilarityTag(ENDLESS_POOL[chosen].q);
      if(chosenTag){ recentTags.push(chosenTag);recentTags=recentTags.slice(-6);usedFastTags.add(chosenTag); }
    }
    return queue;
  }

  export function recordEndlessSimilarity(q){
    var tag=questionSimilarityTag(q);
    if(!tag) return;
    if(!progress.endless.recentSimilarityTags) progress.endless.recentSimilarityTags=[];
    progress.endless.recentSimilarityTags.push(tag);
    progress.endless.recentSimilarityTags=progress.endless.recentSimilarityTags.slice(-6);
    if(progress.settings.endlessFastMode){
      if(!progress.endless.fastSeenSimilarityTags) progress.endless.fastSeenSimilarityTags=[];
      if(progress.endless.fastSeenSimilarityTags.indexOf(tag)===-1) progress.endless.fastSeenSimilarityTags.push(tag);
    }
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
    progress.endless.fastSeenSimilarityTags = [];
    progress.endless.queue = adaptiveEndlessQueue(currentEndlessPoolIndices(),progress.settings.endlessBatchSize);
    progress.endless.pos = 0;
    progress.endless.sessionCorrect = 0;
    progress.endless.sessionWrong = 0;
  }
  export function ensureEndlessQueue(){
    var expectedLength=progress.settings.endlessBatchSize || currentEndlessPoolIndices().length;
    if(progress.endless.queue.length !== expectedLength ||
       progress.endless.pos >= progress.endless.queue.length){
      rebuildEndlessQueue();
    }
  }
  export function reshuffleEndlessQueue(){
    progress.endless.fastSeenSimilarityTags = [];
    var lastIdx = progress.endless.queue.length ? progress.endless.queue[progress.endless.queue.length-1] : -1;
    var next = adaptiveEndlessQueue(currentEndlessPoolIndices(),progress.settings.endlessBatchSize);
    if(next.length>1 && next[0]===lastIdx){
      var tmp=next[0]; next[0]=next[1]; next[1]=tmp;
    }
    progress.endless.queue = next;
    progress.endless.pos = 0;
    progress.endless.sessionCorrect = 0;
    progress.endless.sessionWrong = 0;
  }

  /* 制限なしでは1問ごとに最新の正誤実績を反映し、次の出題候補を作り直す。
     セット成績はリセットせず、直前と同じ問題だけは先頭から外す。 */
  export function refreshUnlimitedEndlessQueue(lastIdx){
    var next=adaptiveEndlessQueue(currentEndlessPoolIndices());
    if(next.length>1 && next[0]===lastIdx){
      var different=next.findIndex(function(i){ return i!==lastIdx; });
      if(different>0){
        var swap=next[0];next[0]=next[different];next[different]=swap;
      }
    }
    progress.endless.queue=next;
    progress.endless.pos=0;
  }

  /* 件数指定セットでは回答済み部分と進捗位置を保ち、未出題分だけを毎問再計算する。 */
  export function refreshRemainingEndlessQueue(lastIdx){
    var remaining=progress.endless.queue.length-progress.endless.pos;
    if(remaining<=0) return;
    var next=adaptiveEndlessQueue(currentEndlessPoolIndices(),remaining);
    if(next.length>1 && next[0]===lastIdx){
      var different=next.findIndex(function(i){ return i!==lastIdx; });
      if(different>0){
        var swap=next[0];next[0]=next[different];next[different]=swap;
      }
    }
    progress.endless.queue=progress.endless.queue.slice(0,progress.endless.pos).concat(next);
  }


  export const state = {curQ:null, screen:'map', stageIndex:0, order:[], qIndex:0, heroHP:100, monsterHP:100, wrong:0, locked:false, failReason:null, lessonFromBattle:false, activeQs:[], pickerSelection:[], pickerDiffSelection:[1,2,3,4], pickerTierSelection:[1,2,3,4,5], pickerBatchSize:0, pickerFastMode:true, pickerReturnScreen:'map', pickerReturnFocusId:null, reviewQueue:[], reviewPos:0, reviewStats:{correct:0, wrong:0}, dragPlacement:{}, dragSelected:null, dragQid:null, choiceOrder:null, choiceOrderQid:null, dropCaseRun:null, mobileLineOrder:[], mobileLineSelected:null, mobileLineQid:null, startTier:1, studyStep:0, studyPicked:null, studyCombo:0, studyBestCombo:0, studyWrongCount:0};


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
    return String(s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  export const FULLWIDTH_MAP = {
    '＊':'*','＋':'+','－':'-','＜':'<','＞':'>','／':'/','＆':'&','（':'(','）':')',
    '：':':','；':';','＿':'_','．':'.','，':',','　':' ','％':'%','＝':'=','！':'!',
    '”':'"','“':'"','’':"'",'‘':"'",'〜':'~','～':'~','｛':'{','｝':'}','［':'[',
    '］':']','＃':'#','｜':'|','？':'?','＠':'@','＾':'^','￥':'\\','−':'-'
  };
  export function toHalfWidth(s){
    var source=String(s);
    if(typeof source.normalize==='function') source=source.normalize('NFKC');
    return source.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(c){
      return String.fromCharCode(c.charCodeAt(0)-0xFEE0);
    }).replace(/[＊＋－＜＞／＆（）：；＿．，　％＝！”“’‘〜～｛｝［］＃｜？＠＾￥−]/g, function(c){
      return FULLWIDTH_MAP[c];
    });
  }
  export function unwrapCodeFence(s){
    return String(s).trim().replace(/^```[a-zA-Z0-9_+-]*\s*/,'').replace(/\s*```$/,'');
  }
  export function normalize(s){
    return toHalfWidth(unwrapCodeFence(s)).replace(/[\u200B-\u200D\uFEFF]/g,'').trim().toLowerCase().replace(/\s+/g,'');
  }
  export function stripSemi(s){
    return s.replace(/[;。、.]+$/,'');
  }
  export function stripStd(s){
    return s.replace(/std::/g,'');
  }
  export function sameNumericValue(a,b){
    if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(a) || !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(b)) return false;
    return Number(a)===Number(b);
  }
  export function checkAnswer(input, answers){
    var n = normalize(input);
    var n2 = stripSemi(n);
    var n3 = stripStd(n2);
    return answers.some(function(a){
      var an = normalize(a);
      var an2 = stripSemi(an);
      var an3 = stripStd(an2);
      return n===an || n2===an2 || n3===an3 || sameNumericValue(n2,an2);
    });
  }

  /* 授業準拠モード用の厳密採点。空白・改行・インデントの違いだけは吸収するが、
     大文字小文字・std::の省略・末尾セミコロンの有無は別解として扱い、
     自動では同一視しない(教授が授業で使った表記だけを正解とするため)。 */
  export function normalizeStrict(s){
    return toHalfWidth(unwrapCodeFence(s)).replace(/[​-‍﻿]/g,'').trim().replace(/\s+/g,'');
  }
  export function checkAnswerStrict(input, answers){
    var n = normalizeStrict(input);
    return answers.some(function(a){ return n===normalizeStrict(a); });
  }

export const STUDY_MEDAL_ICON = {gold:'🏅', silver:'🥈', bronze:'🥉'};
export const MEDAL_RANK = {gold:3, silver:2, bronze:1};
