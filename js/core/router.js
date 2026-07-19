/*
 router.js — 画面遷移(state.screen)の一元管理。マップ画面の描画・グローバル学習モード
 トグル・各画面の初期表示とイベント配線をここに集約する。study.js/exercise.jsは
 それぞれの画面のHTML生成と、その画面固有の配線(wireStudy/wireLesson/wireUnitPicker/
 wireQuestionControls)だけを担当し、render()から呼び出される。
*/
import { BASE_STAGES, BOSS_GROUPS, STAGES, TOTAL_STARS, DIFF_BATCH_LABEL, TIER_LABEL } from '../data/questions.js';
import {
  state, progress, saveProgress, esc, totalStarsEarned, missedCount,
  recommendDifficulty, starString, STUDY_MEDAL_ICON, UNIT_LIST, ENDLESS_POOL,
  shuffle, POOL_INDEX_BY_QID
} from './state.js';
import { renderStudy, startStudy, wireStudy } from '../components/study.js';
import {
  renderLesson, wireLesson, openUnitPicker, renderUnitPicker, wireUnitPicker,
  renderBattle, renderEndless, renderQuestionBody, wireQuestionControls,
  startStage
} from '../components/exercise.js';


  export function renderTopbar(){
    return ''+
    '<div class="topbar">'+
      '<div class="brand"><span class="glyph">🧙</span><div><h1>コード転生記</h1><small>期末試験サバイバル・クエスト</small></div></div>'+
      '<div class="tally">総獲得星 <span class="stars num">'+totalStarsEarned()+' / '+TOTAL_STARS+'</span></div>'+
    '</div>';
  }


  export const SECTION_TITLES = [
    '第1部 C++入門 ― 入出力・ポインタ・関数',
    '第2部 データ構造 ― 配列・文字列・構造体',
    '第3部 クラス設計 ― 基本から後片付けまで',
    '第4部 継承と多態性',
    '第5部 Pythonへの転生 ― クラスとTkinter'
  ];

  export function renderMap(){
    var studyMode = !!progress.settings.studyModeActive;
    var sectionsHtml = '';
    var sectionIdx = 0;
    var cardsBuf = [];
    function flushSection(){
      if(cardsBuf.length){
        sectionsHtml += '<h3 class="groupheading">'+esc(SECTION_TITLES[sectionIdx] || ('第'+(sectionIdx+1)+'部'))+'</h3>'+
          '<div class="stagegrid'+(studyMode?' study-mode':'')+'">'+cardsBuf.join('')+'</div>';
        cardsBuf = [];
      }
    }
    STAGES.forEach(function(st, i){
      var stars = progress.stars[st.id] || 0;
      var done = !!progress.studyCompleted[st.id];
      var medal = progress.studyMedal[st.id];
      var studyBadge = done
        ? '<span class="studydonebadge">'+(medal ? STUDY_MEDAL_ICON[medal] : '✓')+' 学習済み</span>'
        : (studyMode ? '<span class="studyhint">📖 クリックで学習パートへ</span>' : '');
      cardsBuf.push(''+
        '<button class="stagecard'+(st.isBoss?' boss':'')+'" data-idx="'+i+'" aria-label="'+esc(st.title)+'">'+
          '<div class="row1"><span class="emoji">'+st.emoji+'</span><span class="idx">'+(st.isBoss?'★ BOSS ★':'STAGE '+(i+1))+'</span></div>'+
          '<h3>'+esc(st.title)+'</h3>'+
          '<div class="sub">'+esc(st.sub)+' ・ '+esc(st.mon)+'</div>'+
          studyBadge+
          '<div class="stars">'+starString(stars)+'</div>'+
        '</button>');
      if(st.isBoss){ flushSection(); sectionIdx++; }
    });
    flushSection();

    var e = progress.endless;
    var totalAns = e.correct + e.wrong;
    var acc = totalAns>0 ? Math.round(e.correct/totalAns*100) : 0;
    var selUnits = progress.settings.endlessUnits;
    var selDiffs = progress.settings.endlessDiffs;
    var selTiers = progress.settings.endlessTiers;
    var endlessFilterLabel = (!selUnits || selUnits.length===0)
      ? '対象: 全'+UNIT_LIST.length+'単元'
      : '対象: '+selUnits.length+'/'+UNIT_LIST.length+'単元に絞り込み中';
    endlessFilterLabel += (!selDiffs || selDiffs.length===0)
      ? ' ・ 難易度: 全て'
      : ' ・ 難易度: '+selDiffs.map(function(lv){ return DIFF_BATCH_LABEL[lv]; }).join('/');
    endlessFilterLabel += (!selTiers || selTiers.length===0)
      ? ' ・ 重要度: 全て'
      : ' ・ 重要度: '+selTiers.map(function(lv){ return TIER_LABEL[lv]; }).join('/');
    var overallReco = recommendDifficulty(selUnits);
    var missedN = missedCount();

    return ''+ renderTopbar() +
    '<button class="frame modetoggle '+(studyMode?'study':'quest')+'" id="btnModeToggle" aria-pressed="'+(studyMode?'true':'false')+'">'+
      '<span class="modeicon">'+(studyMode?'📖':'⚔️')+'</span>'+
      '<span class="modebody">'+
        '<span class="modetitle">今の地図モード: '+(studyMode?'学習モード':'冒険モード')+'</span>'+
        '<span class="modedesc">'+(studyMode
          ? 'この状態で章をクリックすると、まず学習パート(要点講義)へ案内される。準備ができたらここを押して冒険モードに切り替えよう。'
          : 'この状態で章をクリックすると、そのまま訓練場(問題パート)へ進む。要点から仕込みたい章は、ここを押して学習モードに切り替えてから選ぼう。')+
        '</span>'+
      '</span>'+
      '<span class="modeswitch" aria-hidden="true"><span class="modeswitch-knob"></span></span>'+
    '</button>'+
    '<div class="frame intro">'+
      '<h2>試験前夜、記憶の迷宮へ</h2>'+
      '<p>全'+STAGES.length+'章(通常'+BASE_STAGES.length+'章+ボス'+BOSS_GROUPS.length+'体)。各章にはまず「訓練場」があり、完成した正しいコードと解説を読んで感覚をつかめる。準備ができたら難易度(初級/中級/上級)を選んで、記述式・選択式・並べ替えなど様々な形式の設問に挑もう。まとまりを1つ終えるごとに総復習のボスが待ち構えている。</p>'+
    '</div>'+
    '<button class="frame alttoggle" id="btnAltToggle" aria-pressed="'+(progress.settings.allowAlt?'true':'false')+'">'+
      '<span class="alticon">'+(progress.settings.allowAlt?'🔓':'🔒')+'</span>'+
      '<span class="altbody">'+
        '<span class="alttitle">別解モード: '+(progress.settings.allowAlt?'ON':'OFF')+'</span>'+
        '<span class="altdesc">'+(progress.settings.allowAlt
          ? '授業で扱っていない書き方(別解)も正解として受け付け中。クリックでOFFに戻せます。'
          : '一部の設問には、授業で扱っていない別解にも対応した採点があります。ONにすると、それらの別解も正解として受け付けます。')+
        '</span>'+
      '</span>'+
    '</button>'+
    '<div class="frame endlesscard">'+
      '<button class="endlesscard-main" id="btnEndless" aria-label="1000本ノックを開始する">'+
        '<div class="endlesscard-head">'+
          '<span class="emoji">📚</span>'+
          '<div><h3>1000本ノック</h3>'+
          '<div class="sub">'+esc(endlessFilterLabel)+' ・ 全'+ENDLESS_POOL.length+'問のプールから尽きるまで出題され続ける総復習モード。1週間の勉強量でも解き切れないボリュームで、誤答が多い単元ほど優先的に出やすくなる。</div></div>'+
        '</div>'+
        '<div class="endlesscard-stats">'+
          '<span>連続正解 <b>'+e.streak+'</b>(最高'+e.bestStreak+')</span>'+
          '<span>通算正答率 <b>'+e.correct+' / '+totalAns+'</b>('+acc+'%)</span>'+
          '<span>🤖 おすすめ難易度 <b>'+esc(DIFF_BATCH_LABEL[overallReco])+'</b></span>'+
        '</div>'+
      '</button>'+
      '<button class="endlesscard-filter" id="btnUnitPicker">🎯 出題する単元・難易度を選ぶ</button>'+
    '</div>'+
    '<button class="frame reviewcard'+(missedN===0?' empty':'')+'" id="btnReview2" aria-label="間違いノートを復習する">'+
      '<span class="emoji">📕</span>'+
      '<div><h3>間違いノートを復習する</h3>'+
      '<div class="sub">'+(missedN>0
        ? '今までに間違えた問題が'+missedN+'問たまっています。正解するたびにノートから消えていきます。'
        : 'まだ間違えた問題はありません。戦闘や1000本ノックで間違えると、ここに自動で集まります。')+'</div></div>'+
      '<span class="reviewcard-count">'+missedN+'問</span>'+
    '</button>'+
    sectionsHtml+
    '<p class="footer-note">進行状況はこの端末に自動保存されます。</p>';
  }


  export function openLesson(idx, fromBattle){
    state.stageIndex = idx;
    state.screen = 'lesson';
    state.lessonFromBattle = !!fromBattle;
    render();
  }


  export function openEndless(){
    ensureEndlessQueue();
    state.curQ = null;
    state.locked = false;
    state.screen = 'endless';
    render();
  }


  /* 「間違いノート」に載っている問題(progress.missed)だけを出題する復習モード。
     正解するとノートから消え、誤答すると残り続けるので、繰り返すほどノートが薄くなる。 */
  export function openReview(){
    var qids = Object.keys(progress.missed);
    state.reviewQueue = shuffle(qids.map(function(qid){ return POOL_INDEX_BY_QID[qid]; }).filter(function(i){ return i!==undefined; }));
    state.reviewPos = 0;
    state.reviewStats = {correct:0, wrong:0};
    state.curQ = null;
    state.locked = false;
    state.screen = 'review';
    render();
  }


  export function currentReviewQuestion(){
    var idx = state.reviewQueue[state.reviewPos];
    return ENDLESS_POOL[idx];
  }


  export function renderReview(){
    if(state.reviewQueue.length===0){
      return ''+ renderTopbar() +
      '<div class="battlebar"><button class="backbtn" id="btnHome">← 地図へ戻る</button></div>'+
      '<div class="frame result">'+
        '<span class="bigemoji">📗</span><h2>間違いノートは空っぽです</h2>'+
        '<p>今のところ間違えた問題は記録されていません。各章の戦闘や1000本ノックで間違えると、その問題が自動的にここへ集まってきます。</p>'+
        '<div class="resultbtns"><button class="ghost" id="btnMap">地図へ戻る</button></div>'+
      '</div>';
    }
    if(state.reviewPos >= state.reviewQueue.length){
      var remaining = missedCount();
      return ''+ renderTopbar() +
      '<div class="battlebar"><button class="backbtn" id="btnHome">← 地図へ戻る</button></div>'+
      '<div class="frame result">'+
        '<span class="bigemoji">📕</span><h2>この周の復習が終わりました</h2>'+
        '<p>正解 '+state.reviewStats.correct+'問 ／ 誤答 '+state.reviewStats.wrong+'問。間違いノートには、まだ'+remaining+'問残っています。</p>'+
        '<div class="resultbtns">'+
          (remaining>0 ? '<button class="primary" id="btnReviewAgain">もう一度復習する →</button>' : '')+
          '<button class="ghost" id="btnMap">地図へ戻る</button>'+
        '</div>'+
      '</div>';
    }
    if(!state.curQ){
      var cur = currentReviewQuestion();
      state.curQ = cur.q;
      state.endlessSrc = cur;
    }
    var qb = renderQuestionBody(state.curQ);
    return ''+ renderTopbar() +
    '<div class="battlebar"><button class="backbtn" id="btnHome">← 地図へ戻る</button></div>'+
    '<div class="frame endlessbar">'+
      '<div class="estat"><span class="elabel">出題元</span><span class="evalue">'+esc(state.endlessSrc.srcTitle)+'</span></div>'+
      '<div class="estat"><span class="elabel">この周の進捗</span><span class="evalue">'+(state.reviewPos+1)+' / '+state.reviewQueue.length+'</span></div>'+
      '<div class="estat"><span class="elabel">間違いノート残り</span><span class="evalue">'+missedCount()+'問</span></div>'+
    '</div>'+
    '<div class="frame qcard" id="qcard">'+
      '<div class="qmeta"><span>📕 復習モード <span class="tierbadge t'+state.endlessSrc.tier+'">'+esc(TIER_LABEL[state.endlessSrc.tier])+'</span></span><span>'+esc(state.endlessSrc.srcSub)+'</span></div>'+
      '<div class="qlead">'+qb.qlead+'</div>'+
      qb.bodyHtml+
      qb.answerHtml+
    '</div>'+
    '<div id="feedbackSlot"></div>';
  }


  export function renderResult(win){
    var st = STAGES[state.stageIndex];
    var stars = 1;
    if(win){
      var ratio = state.heroHP/100;
      if(state.wrong===0) stars=3;
      else if(ratio>=0.5) stars=2;
      else stars=1;
      var prev = progress.stars[st.id]||0;
      if(stars>prev) progress.stars[st.id]=stars;
      if(state.stageIndex+2 > progress.unlocked) progress.unlocked = state.stageIndex+2;
      if(progress.unlocked > STAGES.length) progress.unlocked = STAGES.length;
      saveProgress(progress);
    }
    var failMsg = state.failReason==='outofq'
      ? ('<span class="bigemoji">🌀</span><h2>とどめを刺しきれなかった…</h2><p>設問はすべて解き終えたが、'+esc(st.mon)+'にはまだ息がある。誤答が多いと決定打が足りない。訓練場で復習してもう一度挑もう。</p>')
      : ('<span class="bigemoji">💤</span><h2>力尽きた…</h2><p>'+esc(st.mon)+'にHPを削り切られてしまった。訓練場で復習してもう一度挑もう。</p>');
    var body = win ?
      ('<span class="bigemoji">🏆</span><h2>'+esc(st.mon)+'を撃破した！</h2><div class="starsline">'+starString(stars)+'</div><p>誤答'+state.wrong+'回で切り抜けた。単元「'+esc(st.sub)+'」はもう怖くない。</p>')
      : failMsg;

    var nextIdx = state.stageIndex+1;
    var hasNext = win && nextIdx < STAGES.length;

    return ''+ renderTopbar() +
    '<div class="frame result">'+
      body+
      '<div class="resultbtns">'+
        '<button class="ghost" id="btnReview">📖 訓練場で見直す</button>'+
        '<button class="ghost" id="btnRetry">'+(win?'もう一度挑む':'再挑戦する')+'</button>'+
        (hasNext? '<button class="primary" id="btnNext">次の間へ進む →</button>' : '')+
        '<button class="ghost" id="btnMap">地図へ戻る</button>'+
      '</div>'+
    '</div>'+
    (!hasNext && win && nextIdx>=STAGES.length ? '<div class="frame allclear"><h2>🎉 全'+STAGES.length+'章 制覇！</h2><p>期末試験の範囲をひと通り旅した。総獲得星 <span class="num">'+totalStarsEarned()+' / '+TOTAL_STARS+'</span>。仕上げにもう一周して星を集めよう。</p></div>' : '');
  }


  export function render(){
    var app = document.getElementById('app');
    if(state.screen==='map'){
      app.innerHTML = renderMap();
      Array.prototype.forEach.call(app.querySelectorAll('.stagecard:not(.locked)'), function(btn){
        btn.addEventListener('click', function(){
          state.curQ = null;
          var idx = parseInt(btn.getAttribute('data-idx'),10);
          if(progress.settings.studyModeActive) startStudy(idx);
          else openLesson(idx, false);
        });
      });
      document.getElementById('btnModeToggle').addEventListener('click', function(){
        progress.settings.studyModeActive = !progress.settings.studyModeActive;
        saveProgress(progress);
        render();
      });
      document.getElementById('btnEndless').addEventListener('click', function(){
        openEndless();
      });
      document.getElementById('btnAltToggle').addEventListener('click', function(){
        progress.settings.allowAlt = !progress.settings.allowAlt;
        saveProgress(progress);
        render();
      });
      document.getElementById('btnUnitPicker').addEventListener('click', function(){
        openUnitPicker();
      });
      document.getElementById('btnReview2').addEventListener('click', function(){
        openReview();
      });
    } else if(state.screen==='unitPicker'){
      app.innerHTML = renderUnitPicker();
      wireUnitPicker(app);
    } else if(state.screen==='study'){
      app.innerHTML = renderStudy();
      wireStudy(app);
    } else if(state.screen==='lesson'){
      app.innerHTML = renderLesson();
      wireLesson(app);
    } else if(state.screen==='battle'){
      app.innerHTML = renderBattle();
      document.getElementById('btnHome').addEventListener('click', function(){
        state.curQ=null; state.screen='map'; render();
      });
      document.getElementById('btnReview').addEventListener('click', function(){
        openLesson(state.stageIndex, true);
      });
      wireQuestionControls(app);
    } else if(state.screen==='endless'){
      app.innerHTML = renderEndless();
      document.getElementById('btnHome').addEventListener('click', function(){
        state.curQ=null; state.screen='map'; render();
      });
      document.getElementById('btnEndlessFilter').addEventListener('click', function(){
        state.curQ=null; openUnitPicker();
      });
      wireQuestionControls(app);
    } else if(state.screen==='review'){
      app.innerHTML = renderReview();
      var reviewHome = document.getElementById('btnHome');
      if(reviewHome) reviewHome.addEventListener('click', function(){ state.curQ=null; state.screen='map'; render(); });
      var reviewMap = document.getElementById('btnMap');
      if(reviewMap) reviewMap.addEventListener('click', function(){ state.curQ=null; state.screen='map'; render(); });
      var reviewAgain = document.getElementById('btnReviewAgain');
      if(reviewAgain) reviewAgain.addEventListener('click', function(){ openReview(); });
      if(document.getElementById('qcard')) wireQuestionControls(app);
    } else if(state.screen==='result-win' || state.screen==='result-lose'){
      var win = state.screen==='result-win';
      app.innerHTML = renderResult(win);
      var review = document.getElementById('btnReview');
      if(review) review.addEventListener('click', function(){ state.curQ=null; openLesson(state.stageIndex, false); });
      var retry = document.getElementById('btnRetry');
      if(retry) retry.addEventListener('click', function(){ state.curQ=null; startStage(state.stageIndex, state.startTier); });
      var next = document.getElementById('btnNext');
      if(next) next.addEventListener('click', function(){ state.curQ=null; startStage(state.stageIndex+1, state.startTier); });
      var map = document.getElementById('btnMap');
      if(map) map.addEventListener('click', function(){ state.curQ=null; state.screen='map'; render(); });
    }
  }

  function onSubmit(){
    if(state.locked) return;
    var input = document.getElementById('ansInput');
    var val = input.value;
    if(!val.trim()){
      input.classList.add('shake');
      setTimeout(function(){ input.classList.remove('shake'); }, 350);
      input.focus();
      return;
    }
    input.disabled = true;
    document.getElementById('btnSubmit').disabled = true;
    resolveAnswer(val);
  }

  function onChoice(idx){
    if(state.locked) return;
    Array.prototype.forEach.call(document.querySelectorAll('.choicebtn'), function(b){ b.disabled = true; });
    resolveAnswer(state.curQ.options[idx]);
  }
export function boot(){
  render();
}
