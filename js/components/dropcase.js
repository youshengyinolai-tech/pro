/*
 dropcase.js — 特別捜査モード「DROP CASE」。落下してくる問題カードへ、
 正しい選択肢をドラッグ(またはタップ)して回答する短時間ゲーム。
 既存の問題データ(choice形式)を再利用し、本編の進捗・内部レート・ランキングとは
 完全に分離した専用スコア/専用記録として扱う。
*/
import { ENDLESS_POOL, state, progress, saveProgress, esc, shuffle, questionDifficultyRating, checkAnswer } from '../core/state.js?v=2026072115';
import { icon } from '../core/icons.js';
import { render, renderTopbar } from '../core/router.js?v=2026072115';

/* ---------- 出題プール ---------- */
/* DROP CASE向けの候補は「choice形式・短い問題文・短いコード・長すぎない選択肢」に限定する。
   diff1(用語穴埋め)とdiff4(長文コード記述)にはchoice形式が存在しないため対象外
   (ユーザー確認済み: diff2/3のみを使い、難易度は落下速度で表現する)。 */
function dropCaseEligible(q){
  if((q.type||'fill')!=='choice') return false;
  if(!q.lead || q.lead.length>70) return false;
  if(q.code && (q.code.length>60 || q.code.indexOf('\n')!==-1)) return false;
  if(!q.options || q.options.length<3) return false;
  if(q.options.some(function(o){ return o.length>45; })) return false;
  return true;
}

var ELIGIBLE = [];
ENDLESS_POOL.forEach(function(entry){
  if(dropCaseEligible(entry.q)) ELIGIBLE.push(entry);
});
ELIGIBLE.sort(function(a,b){ return questionDifficultyRating(a.q)-questionDifficultyRating(b.q); });

var QUARTILE_SIZE = Math.max(1, Math.ceil(ELIGIBLE.length/4));
var QUARTILES = [
  ELIGIBLE.slice(0, QUARTILE_SIZE),
  ELIGIBLE.slice(QUARTILE_SIZE, QUARTILE_SIZE*2),
  ELIGIBLE.slice(QUARTILE_SIZE*2, QUARTILE_SIZE*3),
  ELIGIBLE.slice(QUARTILE_SIZE*3)
];

function pickFrom(list, excludeQids, n){
  var pool = list.filter(function(e){ return excludeQids.indexOf(e.q.qid)===-1; });
  if(pool.length < n) pool = list.slice();
  var picked = shuffle(pool).slice(0, n);
  return picked;
}

/* 通常捜査20問の構成: 1-5=帯1, 6-10=帯2, 11-15=帯3, 16-19=帯4, 20=ボス(帯4相当+最速)。 */
function buildNormalPlan(){
  var used = [];
  var plan = [];
  [ [QUARTILES[0],5,1], [QUARTILES[1],5,2], [QUARTILES[2],5,3], [QUARTILES[3],4,4] ].forEach(function(spec){
    var picked = pickFrom(spec[0].length?spec[0]:ELIGIBLE, used, spec[1]);
    picked.forEach(function(e){ used.push(e.q.qid); plan.push({entry:e, band:spec[2], isBoss:false}); });
  });
  var bossSrc = QUARTILES[3].length?QUARTILES[3]:ELIGIBLE;
  var boss = pickFrom(bossSrc, used, 1)[0] || ELIGIBLE[ELIGIBLE.length-1];
  plan.push({entry:boss, band:5, isBoss:true});
  return plan;
}

function levelToQuartileIndex(level){
  if(level<=2) return 0;
  if(level<=4) return 1;
  if(level<=6) return 2;
  return 3;
}

function pickEndlessQuestion(level, recentQids){
  var qi = levelToQuartileIndex(level);
  var candidates = QUARTILES[qi].length?QUARTILES[qi]:ELIGIBLE;
  var pool = candidates.filter(function(e){ return recentQids.indexOf(e.q.qid)===-1; });
  if(!pool.length) pool = candidates;
  return pool[Math.floor(Math.random()*pool.length)];
}

/* ---------- 速度(落下時間)テーブル ---------- */
var NORMAL_FALL_MS = {1:9000, 2:7600, 3:6400, 4:5300, 5:4700};
function endlessFallMs(level){
  return Math.max(2800, 9200 - level*420); /* 操作不能にならないよう下限を設ける */
}

/* ---------- スコア計算(1箇所に集約) ---------- */
export function computeDropCaseScore(opts){
  var baseByBand={1:80,2:120,3:170,4:230,5:300}[opts.band]||120;
  var speedRatio=Math.max(0,Math.min(1,1-(opts.elapsedMs/Math.max(1,opts.fallDurationMs))));
  var speedBonus=Math.round(baseByBand*0.6*speedRatio);
  var comboBonus=Math.min(opts.combo,15)*6;
  var lifeBonus=Math.max(0,opts.life)*12;
  var modeBonus=opts.mode==='endless'?1.15:1;
  return Math.round((baseByBand+speedBonus+comboBonus+lifeBonus)*modeBonus);
}

/* ---------- ラン管理 ---------- */
function stopTicking(run){
  if(run && run.rafId){ cancelAnimationFrame(run.rafId); run.rafId=null; }
}

function newRun(mode){
  return {
    mode: mode,
    status: progress.dropCase.introSeen ? 'playing' : 'intro',
    plan: mode==='normal' ? buildNormalPlan() : null,
    qIndex: 0,
    recentQids: [],
    score:0, combo:0, maxCombo:0, life:3,
    correctCount:0, wrongCount:0,
    level:1, levelQAnswered:0,
    current:null, order:[],
    fallDurationMs:9000, startedAt:0, pausedAt:null, totalPausedMs:0,
    runStartedAt:Date.now(), rafId:null, answered:false, paused:false
  };
}

function currentBandFor(run){
  if(run.mode==='normal') return run.plan[run.qIndex].band;
  return Math.min(5, Math.ceil(run.level/1.4));
}

function loadNextQuestion(run){
  run.answered=false;
  var entry;
  var band;
  if(run.mode==='normal'){
    if(run.qIndex>=run.plan.length){ endRun(true); return; }
    var slot=run.plan[run.qIndex];
    entry=slot.entry; band=slot.band;
    run.fallDurationMs=NORMAL_FALL_MS[band]||7000;
  } else {
    entry=pickEndlessQuestion(run.level, run.recentQids);
    band=currentBandFor(run);
    run.fallDurationMs=endlessFallMs(run.level);
  }
  run.recentQids.push(entry.q.qid);
  if(run.recentQids.length>15) run.recentQids.shift();
  run.current={q:entry.q, band:band, isBoss: run.mode==='normal' && run.plan[run.qIndex].isBoss};
  run.order=shuffle(entry.q.options.map(function(_,i){ return i; }));
  run.startedAt=performance.now();
  run.pausedAt=null; run.totalPausedMs=0;
  run.status='playing';
}

function advanceAfterAnswer(run, correct){
  stopTicking(run);
  if(correct){
    run.combo++; run.maxCombo=Math.max(run.maxCombo,run.combo); run.correctCount++;
    var elapsed=performance.now()-run.startedAt-run.totalPausedMs;
    var gained=computeDropCaseScore({band:run.current.band, elapsedMs:elapsed, fallDurationMs:run.fallDurationMs, combo:run.combo, life:run.life, mode:run.mode});
    run.score+=gained;
    run.status='correct-flash';
  } else {
    run.combo=0; run.wrongCount++; run.life--;
    run.status='wrong-flash';
  }
  if(run.mode==='endless'){
    run.levelQAnswered++;
    if(run.levelQAnswered>=8){ run.levelQAnswered=0; run.level++; }
  } else {
    run.qIndex++;
  }
  render();
  setTimeout(function(){
    if(state.screen!=='dropcase-play' || state.dropCaseRun!==run) return;
    if(run.life<=0){ endRun(false); return; }
    if(run.mode==='normal' && run.qIndex>=run.plan.length){ endRun(true); return; }
    loadNextQuestion(run);
    render();
  }, correct?520:620);
}

function endRun(success){
  var run=state.dropCaseRun;
  if(!run) return;
  stopTicking(run);
  run.status='result';
  var elapsedMs=Date.now()-run.runStartedAt;
  var totalAnswered=run.correctCount+run.wrongCount;
  var accuracy= totalAnswered>0 ? Math.round(run.correctCount/totalAnswered*100) : 0;
  run.finalAccuracy=accuracy;
  run.finalElapsedMs=elapsedMs;
  run.success=success;

  var newBest=false;
  if(run.mode==='normal'){
    var rec=progress.dropCase.normal;
    newBest = run.score>rec.bestScore;
    if(success){
      var wasCleared=rec.cleared;
      rec.cleared=true;
      if(!wasCleared){ progress.dropCase.endless.unlocked=true; run.justUnlockedEndless=true; }
    }
    if(newBest) rec.bestScore=run.score;
    rec.bestCombo=Math.max(rec.bestCombo,run.maxCombo);
    rec.bestAccuracy=Math.max(rec.bestAccuracy,accuracy);
    if(success && (!rec.bestTimeMs || elapsedMs<rec.bestTimeMs)) rec.bestTimeMs=elapsedMs;
    rec.lastPlayedAt=new Date().toISOString();
  } else {
    var rec2=progress.dropCase.endless;
    newBest = run.score>rec2.bestScore;
    if(newBest) rec2.bestScore=run.score;
    rec2.bestSolved=Math.max(rec2.bestSolved,run.correctCount);
    rec2.bestCombo=Math.max(rec2.bestCombo,run.maxCombo);
    rec2.bestLevel=Math.max(rec2.bestLevel,run.level);
    rec2.lastPlayedAt=new Date().toISOString();
  }
  run.newBest=newBest;
  progress.dropCase.introSeen=true;
  saveProgress(progress);
  state.screen='dropcase-result';
  render();
}

export function startDropCaseRun(mode){
  if(mode==='endless' && !progress.dropCase.endless.unlocked) return;
  state.dropCaseRun=newRun(mode);
  if(state.dropCaseRun.status==='playing') loadNextQuestion(state.dropCaseRun);
  state.screen='dropcase-play';
  render();
}

/* ---------- 落下アニメーション(1問ごとに開始し、回答/タイムアウトで停止) ---------- */
function tick(run){
  if(!run || run.status!=='playing' || run.paused){ return; }
  var el=document.getElementById('dropFallCard');
  if(!el){ return; }
  var elapsed=performance.now()-run.startedAt-run.totalPausedMs;
  var ratio=Math.max(0,Math.min(1, elapsed/run.fallDurationMs));
  el.style.top=(ratio*100)+'%';
  if(ratio>=1){
    advanceAfterAnswer(run, false);
    return;
  }
  run.rafId=requestAnimationFrame(function(){ tick(run); });
}

function pauseRun(run){
  if(!run || run.paused || run.status!=='playing') return;
  run.paused=true;
  run.pausedAt=performance.now();
  stopTicking(run);
}
function resumeRun(run){
  if(!run || !run.paused) return;
  run.paused=false;
  run.totalPausedMs += performance.now()-run.pausedAt;
  run.pausedAt=null;
  if(run.status==='playing'){ run.rafId=requestAnimationFrame(function(){ tick(run); }); }
}

var visHandlerInstalled=false;
function installVisibilityPause(){
  if(visHandlerInstalled) return;
  visHandlerInstalled=true;
  document.addEventListener('visibilitychange', function(){
    var run=state.dropCaseRun;
    if(!run || state.screen!=='dropcase-play') return;
    if(document.hidden) pauseRun(run); else resumeRun(run);
  });
  document.addEventListener('keydown', function(e){
    if(e.key!=='Escape') return;
    if(state.screen==='dropcase-menu' && menuHelpOpen){ menuHelpOpen=false; render(); return; }
    var run=state.dropCaseRun;
    if(!run || state.screen!=='dropcase-play') return;
    if(run.status==='intro') return;
    if(run.paused) resumeRun(run); else pauseRun(run);
    render();
  });
}

/* ---------- 遊び方(メニューのモーダル/初回イントロ画面で共用) ---------- */
function dropCaseHelpBodyHtml(){
  return ''+
    '<h2>'+icon('terminal')+' DROP CASE の遊び方</h2>'+
    '<p>落下する問題へ、正しい証拠を投入せよ。</p>'+
    '<ul class="dropcase-help-list">'+
      '<li>選択肢を問題カードへドラッグして回答</li>'+
      '<li>選択肢をタップするだけでも回答できます</li>'+
      '<li>問題が下まで落ちるとライフが減ります</li>'+
      '<li>連続正解でコンボが上昇します</li>'+
    '</ul>';
}

var menuHelpOpen=false;

/* ---------- 描画: メニュー ---------- */
export function renderDropCaseMenu(){
  var n=progress.dropCase.normal, e=progress.dropCase.endless;
  return ''+renderTopbar()+
    '<div class="battlebar"><button class="backbtn" id="btnHome">← 地図へ戻る</button></div>'+
    '<main class="dropcase-menu">'+
      '<section class="frame dropcase-hero"><span class="league-eyebrow">SPECIAL INVESTIGATION</span>'+
        '<h2>'+icon('terminal')+' DROP CASE</h2><p>落下する事件を、正しい証拠で解決せよ</p></section>'+
      '<div class="dropcase-modes">'+
        '<button class="frame dropcase-mode-card" id="btnDropNormal">'+
          '<h3>'+icon('sword')+' 通常捜査</h3><p>全20問・ライフ3・5問ごとに加速</p>'+
          (n.cleared?'<div class="dc-best">'+icon('check')+' クリア済み ・ ベスト '+n.bestScore.toLocaleString()+'pt</div>':'<div class="dc-best">未クリア</div>')+
        '</button>'+
        (e.unlocked
          ? '<button class="frame dropcase-mode-card" id="btnDropEndless">'+
              '<h3>'+icon('unlock')+' 終わりなき捜査</h3><p>ライフが尽きるまで継続</p>'+
              '<div class="dc-best">ベスト '+e.bestScore.toLocaleString()+'pt</div>'+
            '</button>'
          : '<div class="frame dropcase-mode-card locked"><h3>'+icon('lock')+' 終わりなき捜査</h3><p>通常捜査をクリアすると解放</p></div>')+
      '</div>'+
      '<button class="ghost" id="btnDropHelp">'+icon('review')+' 遊び方を見る</button>'+
    '</main>'+
    (menuHelpOpen
      ? '<div class="dropcase-pause-overlay" id="dropHelpOverlay"><div class="frame dropcase-help-modal">'+dropCaseHelpBodyHtml()+
        '<button class="primary" id="btnDropHelpClose">閉じる</button></div></div>'
      : '');
}

export function wireDropCaseMenu(app){
  installVisibilityPause();
  document.getElementById('btnHome').addEventListener('click', function(){ menuHelpOpen=false; state.screen='map'; render(); });
  document.getElementById('btnDropNormal').addEventListener('click', function(){ menuHelpOpen=false; startDropCaseRun('normal'); });
  var btnEndless=document.getElementById('btnDropEndless');
  if(btnEndless) btnEndless.addEventListener('click', function(){ menuHelpOpen=false; startDropCaseRun('endless'); });
  document.getElementById('btnDropHelp').addEventListener('click', function(){ menuHelpOpen=true; render(); });
  var closeBtn=document.getElementById('btnDropHelpClose');
  if(closeBtn) closeBtn.addEventListener('click', function(){ menuHelpOpen=false; render(); });
}

/* ---------- 描画: プレイ画面 ---------- */
function bandLabel(band, isBoss){
  if(isBoss) return 'BOSS';
  return ['','LV.1','LV.2','LV.3','LV.4','LV.5'][band]||'LV.'+band;
}

export function renderDropCasePlay(){
  var run=state.dropCaseRun;
  if(!run) return renderDropCaseMenu();

  if(run.status==='intro'){
    return ''+renderTopbar()+
      '<main class="dropcase-menu"><section class="frame dropcase-hero">'+
        dropCaseHelpBodyHtml()+
        '<button class="primary" id="btnDropIntroStart">はじめる</button>'+
      '</section></main>';
  }

  var q=run.current.q;
  var life=Math.max(0,run.life);
  var lifeStr=''; /* 減った分は表示せず、残りライフの数だけハートを出す */
  for(var i=0;i<life;i++) lifeStr+='❤︎'; /* 末尾の異体字セレクタでテキスト表示を強制し、色付き絵文字化を防ぐ(太めのハート形状) */
  var total = run.mode==='normal' ? run.plan.length : null;
  var progressCaption = run.mode==='normal' ? 'PROGRESS' : 'LEVEL';
  var progressLabel = run.mode==='normal' ? ((run.qIndex+1)+' / '+total) : ('LV.'+run.level);

  var optionsHtml = run.order.map(function(origIdx){
    return '<button type="button" class="dropcase-option" data-opt="'+origIdx+'">'+esc(q.options[origIdx])+'</button>';
  }).join('');

  return ''+renderTopbar()+
    '<div class="dropcase-play-screen">'+
      '<div class="dropcase-hud">'+
        '<span class="dc-stat"><small>SCORE</small><b>'+run.score.toLocaleString()+'</b></span>'+
        '<span class="dc-stat"><small>COMBO</small><b>'+run.combo+'</b></span>'+
        '<span class="dc-stat"><small>LIFE</small><b class="dc-life" aria-label="残りライフ '+life+' / 3">'+lifeStr+'</b></span>'+
        '<span class="dc-stat"><small>'+progressCaption+'</small><b>'+esc(progressLabel)+'</b></span>'+
        '<button class="backbtn dc-pause" id="btnDropPause" aria-label="ポーズ">'+icon('lock')+'</button>'+
      '</div>'+
      '<div class="dropcase-field" id="dropField">'+
        '<div class="dropcase-fallcard'+(run.current.isBoss?' boss':'')+(run.status==='correct-flash'?' correct':'')+(run.status==='wrong-flash'?' wrong':'')+'" id="dropFallCard" data-band="'+bandLabel(run.current.band,run.current.isBoss)+'">'+
          (run.current.isBoss?'<span class="dc-boss-badge">BOSS</span>':'')+
          (q.code?'<pre class="codeblock dc-code">'+esc(q.code)+'</pre>':'')+
          '<div class="dc-lead">'+esc(q.lead)+'</div>'+
          (run.status==='correct-flash'?'<div class="dc-stamp">CASE CLOSED</div>':'')+
        '</div>'+
      '</div>'+
      '<div class="dropcase-options" id="dropOptions">'+optionsHtml+'</div>'+
    '</div>'+
    (run.paused ? '<div class="dropcase-pause-overlay" id="dropPauseOverlay"><div class="frame"><h3>ポーズ中</h3><button class="primary" id="btnDropResume">再開する</button><button class="ghost" id="btnDropQuit">やめて地図へ戻る</button></div></div>' : '');
}

function submitDropAnswer(run, origIdx){
  if(!run || run.status!=='playing' || run.answered || run.paused) return;
  run.answered=true;
  var q=run.current.q;
  var correct = checkAnswer(q.options[origIdx], q.answers); /* 位置ではなくanswersと値で照合する */
  advanceAfterAnswer(run, correct);
}

export function wireDropCasePlay(app){
  var run=state.dropCaseRun;
  if(!run) return;

  if(run.status==='intro'){
    document.getElementById('btnDropIntroStart').addEventListener('click', function(){
      progress.dropCase.introSeen=true; saveProgress(progress);
      run.status='playing';
      loadNextQuestion(run);
      render();
    });
    return;
  }

  installVisibilityPause();

  var pauseBtn=document.getElementById('btnDropPause');
  if(pauseBtn) pauseBtn.addEventListener('click', function(){ pauseRun(run); render(); });
  var resumeBtn=document.getElementById('btnDropResume');
  if(resumeBtn) resumeBtn.addEventListener('click', function(){ resumeRun(run); render(); });
  var quitBtn=document.getElementById('btnDropQuit');
  if(quitBtn) quitBtn.addEventListener('click', function(){
    stopTicking(run); state.dropCaseRun=null; state.screen='map'; render();
  });

  if(run.paused || run.status!=='playing') return;

  if(!run.rafId) run.rafId=requestAnimationFrame(function(){ tick(run); });

  var field=document.getElementById('dropField');
  var card=document.getElementById('dropFallCard');
  Array.prototype.forEach.call(app.querySelectorAll('.dropcase-option'), function(btn){
    var dragging=false, startX=0, startY=0, moved=false;
    var origX=0, origY=0;

    function onMove(e){
      if(!dragging) return;
      var dx=e.clientX-startX, dy=e.clientY-startY;
      if(Math.abs(dx)>6||Math.abs(dy)>6) moved=true;
      btn.style.transform='translate('+dx+'px,'+dy+'px)';
      btn.classList.add('dragging');
    }
    function onUp(e){
      if(!dragging) return;
      dragging=false;
      btn.releasePointerCapture && btn.releasePointerCapture(e.pointerId);
      btn.removeEventListener('pointermove', onMove);
      btn.removeEventListener('pointerup', onUp);
      btn.removeEventListener('pointercancel', onUp);
      btn.classList.remove('dragging');
      btn.style.transform='';
      var origIdx=parseInt(btn.getAttribute('data-opt'),10);
      if(!moved){
        submitDropAnswer(run, origIdx);
        return;
      }
      var cardEl=document.getElementById('dropFallCard');
      if(cardEl){
        var r=cardEl.getBoundingClientRect();
        if(e.clientX>=r.left && e.clientX<=r.right && e.clientY>=r.top && e.clientY<=r.bottom){
          submitDropAnswer(run, origIdx);
        }
      }
    }
    btn.addEventListener('pointerdown', function(e){
      if(run.answered) return;
      dragging=true; moved=false; startX=e.clientX; startY=e.clientY;
      btn.setPointerCapture && btn.setPointerCapture(e.pointerId);
      btn.addEventListener('pointermove', onMove);
      btn.addEventListener('pointerup', onUp);
      btn.addEventListener('pointercancel', onUp);
    });
  });
}

/* ---------- 描画: 結果画面 ---------- */
export function renderDropCaseResult(){
  var run=state.dropCaseRun;
  if(!run) return renderDropCaseMenu();
  var mins=Math.floor(run.finalElapsedMs/60000), secs=Math.round((run.finalElapsedMs%60000)/1000);
  return ''+renderTopbar()+
    '<main class="dropcase-menu"><section class="frame dropcase-hero">'+
      '<h2>'+(run.success?'捜査完了':'捜査失敗')+'</h2>'+
      (run.mode==='normal'?('<p>'+run.correctCount+'件の事件を解決しました</p>'):('<p>LEVEL '+run.level+' まで到達</p>'))+
      '<div class="dropcase-result-grid">'+
        '<div><small>SCORE</small><b>'+run.score.toLocaleString()+'</b></div>'+
        '<div><small>正答率</small><b>'+run.finalAccuracy+'%</b></div>'+
        '<div><small>最大COMBO</small><b>'+run.maxCombo+'</b></div>'+
        '<div><small>正解/誤答</small><b>'+run.correctCount+' / '+run.wrongCount+'</b></div>'+
        '<div><small>プレイ時間</small><b>'+mins+'分'+secs+'秒</b></div>'+
      '</div>'+
      (run.newBest?'<div class="dc-newrecord">NEW RECORD</div>':'')+
      (run.justUnlockedEndless
        ? '<div class="dc-unlock">「終わりなき捜査」が解放されました</div>' : '')+
      '<div class="dropcase-result-actions">'+
        '<button class="primary" id="btnDropAgain">もう一度挑戦</button>'+
        '<button class="ghost" id="btnDropModeSelect">モード選択へ</button>'+
        '<button class="ghost" id="btnDropRanking">ランキングを見る</button>'+
        '<button class="ghost" id="btnDropHome">本部へ戻る</button>'+
      '</div>'+
    '</section></main>';
}

export function wireDropCaseResult(app){
  var run=state.dropCaseRun;
  document.getElementById('btnDropAgain').addEventListener('click', function(){ startDropCaseRun(run.mode); });
  document.getElementById('btnDropModeSelect').addEventListener('click', function(){ state.dropCaseRun=null; state.screen='dropcase-menu'; render(); });
  document.getElementById('btnDropRanking').addEventListener('click', function(){ state.dropCaseRun=null; state.screen='ranking'; progress.ranking.activeMetric=(run.mode==='normal'?'dropCaseNormal':'dropCaseEndless'); saveProgress(progress); render(); });
  document.getElementById('btnDropHome').addEventListener('click', function(){ state.dropCaseRun=null; state.screen='map'; render(); });
}
