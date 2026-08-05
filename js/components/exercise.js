/*
 exercise.js — 訓練場(訓練カード+難易度選択)・1000本ノックの単元/難易度/重要度ピッカー・
 戦闘/エンドレス/復習で共通利用する設問レンダリング&採点ロジックをまとめる。
*/
import {
  STAGES, DIFF_BATCH_LABEL, DIFF_WRONG_DMG, DIFF_CORRECT_DMG,
  TIER_LABEL, TIER_DESC, questionTier, questionIsRedundant, questionSimilarityTag
} from '../data/questions.js?v=2026072115';
import {
  state, progress, saveProgress, esc, shuffle, checkAnswer, checkAnswerStrict, normalize,
  UNIT_LIST, unitAttemptInfo, recommendDifficulty, weakUnitIds,
  recordUnitAnswer, recordMissed, rebuildEndlessQueue, reshuffleEndlessQueue,
  refreshUnlimitedEndlessQueue, refreshRemainingEndlessQueue,
  currentEndlessPoolIndices, ENDLESS_POOL, recordLearningActivity, recordEndlessSimilarity,
  questionDifficultyRating, unitDifficultyTarget
} from '../core/state.js?v=2026072115';
import { icon, stageIcon } from '../core/icons.js';
import { render, renderTopbar, openLesson } from '../core/router.js?v=2026072115';
import { loadStudyBeats } from './study.js?v=2026072115';

  var exerciseKeyboardInstalled = false;

  function isEditableTarget(target){
    if(!target || target.nodeType!==1) return false;
    var tag = target.tagName;
    if(tag==='INPUT' || tag==='TEXTAREA' || tag==='SELECT'){
      return !target.disabled && !target.readOnly;
    }
    return !!target.isContentEditable;
  }

  function isInsideEscapeSurface(target){
    return !!(target && target.closest && target.closest('dialog[open], [data-escape-surface]'));
  }

  function closeTopmostEscapeSurface(){
    var activePopups = Array.prototype.slice.call(document.querySelectorAll('.codex-overlay, .modal, .popup, .overlay, dialog[open]'));
    if(activePopups.length){
      var popup = activePopups[activePopups.length - 1];
      if(popup && popup.tagName === 'DIALOG' && popup.hasAttribute('open')){
        if(typeof popup.close === 'function') popup.close();
      } else if(popup){
        popup.remove();
      }
      return true;
    }

    var dialogs = document.querySelectorAll('dialog[open]');
    if(dialogs.length){
      var dialog = dialogs[dialogs.length-1];
      var cancelEvent = new Event('cancel', {cancelable:true});
      if(dialog.dispatchEvent(cancelEvent)) dialog.close();
      return true;
    }

    var dismissers = document.querySelectorAll('[data-escape-dismiss]:not([hidden])');
    if(dismissers.length){
      dismissers[dismissers.length-1].click();
      return true;
    }

    var openDetails = document.querySelectorAll('details[open]');
    if(openDetails.length){
      var details = openDetails[openDetails.length-1];
      details.open = false;
      var summary = details.querySelector('summary');
      if(summary) summary.focus();
      return true;
    }

    if(state.screen==='unitPicker'){
      closeUnitPicker();
      return true;
    }

    var homeBtn = document.getElementById('btnHome') ||
      document.getElementById('btnStudyBack') ||
      document.getElementById('btnLessonBack');
    if(homeBtn && homeBtn.offsetParent !== null){
      homeBtn.click();
      return true;
    }

    var mapBtn = document.getElementById('btnMap');
    if(mapBtn && mapBtn.offsetParent !== null){
      mapBtn.click();
      return true;
    }
    return false;
  }

  function tryAdvanceWithEnter(){
    var continueBtn = document.getElementById('btnContinue') ||
      document.getElementById('btnStudyNext') ||
      document.getElementById('btnStudyToChallenge') ||
      document.getElementById('btnToBattle');
    if(continueBtn && !continueBtn.disabled){
      continueBtn.click();
      return true;
    }
    var nextBtn = document.getElementById('btnNext');
    if(nextBtn && !nextBtn.disabled){
      nextBtn.click();
      return true;
    }
    var reviewAgainBtn = document.getElementById('btnReviewAgain');
    if(reviewAgainBtn && !reviewAgainBtn.disabled){
      reviewAgainBtn.click();
      return true;
    }
    var submitBtn = document.getElementById('btnSubmit');
    if(submitBtn && !submitBtn.disabled && !state.locked){
      submitBtn.click();
      return true;
    }
    return false;
  }

  function handleExerciseKeyboard(event){
    var key = event.key || '';
    var keyCode = event.keyCode || event.which || 0;
    if(key==='Enter' || keyCode===13){
      if(event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if(isEditableTarget(event.target)) return;
      if(tryAdvanceWithEnter()){
        event.preventDefault();
        event.stopPropagation();
      }
      return;
    }

    if(key!=='Escape' && key!=='Esc' && keyCode!==27) return;
    if(event.defaultPrevented || event.isComposing || event.altKey || event.ctrlKey || event.metaKey) return;

    if(isEditableTarget(event.target) && isInsideEscapeSurface(event.target)){
      event.target.blur();
      event.preventDefault();
      return;
    }

    if(closeTopmostEscapeSurface()){
      event.preventDefault();
      event.stopPropagation();
    }
  }

  export function installExerciseKeyboardShortcuts(){
    if(exerciseKeyboardInstalled || typeof document==='undefined') return;
    document.addEventListener('keydown', handleExerciseKeyboard, true);
    exerciseKeyboardInstalled = true;
  }

  if(typeof document !== 'undefined'){
    installExerciseKeyboardShortcuts();
  }

  export function renderLesson(){
    var st = STAGES[state.stageIndex];
    var cards = st.lesson.map(function(c, i){
      return '<div class="frame lessoncard">'+
        '<div class="lstep">例題 '+(i+1)+' / '+st.lesson.length+'</div>'+
        '<h3>'+esc(c.title)+'</h3>'+
        '<pre class="codeblock">'+esc(c.code)+'</pre>'+
        '<p class="lessonexplain">'+esc(c.explain)+'</p>'+
      '</div>';
    }).join('');

    var backLabel = state.lessonFromBattle ? '← 戦闘へ戻る' : '← 地図へ戻る';
    var toggleHtml = state.lessonFromBattle
      ? '' : '<button class="togglebtn" id="btnLessonToggleStudy">⇄ 学習パートに切替</button>';

    var actionHtml;
    if(state.lessonFromBattle){
      actionHtml = '<div class="actionrow"><button class="primary" id="btnToBattle">戦いに戻る →</button></div>';
    } else {
      var tierCounts = [1,2,3,4].map(function(lv){ return stageEscalatingPool(st, lv).length; });
      var diffBtnsHtml = [1,2,3,4].map(function(lv){
        return '<button class="diffbtn" data-tier="'+lv+'">'+
          '<span class="dname">'+esc(DIFF_BATCH_LABEL[lv])+'</span>'+
          '<span class="ddesc">からスタート(残り'+tierCounts[lv-1]+'問)</span>'+
        '</button>';
      }).join('');
      actionHtml = '<div class="frame diffpick">'+
        '<div class="difftitle">'+icon('sword')+' 難易度を選んで'+esc(st.mon)+'に挑もう</div>'+
        '<p class="ddesc" style="margin:0 0 14px;">選んだ難易度の設問からランダムに出題が始まり、探偵が捜査を続けられるかぎり、そのグループを出し切るごとに1つ上の難易度へ自動でエスカレートしていく。高い難易度から始めるほど、序盤から手強い相手になる。</p>'+
        '<div class="diffrow">'+diffBtnsHtml+'</div>'+
      '</div>';
    }

    return ''+ renderTopbar() +
    '<div class="battlebar"><button class="backbtn" id="btnLessonBack">'+backLabel+'</button>'+toggleHtml+'</div>'+
    '<div class="frame lessonintro">'+
      '<h2>'+stageIcon(st.id,st.isBoss)+' 訓練場 — '+esc(st.title)+'</h2>'+
      '<p>'+esc(st.sub)+'の要点を、完成した正しいコードと解説で確認しよう。まずは読んで感覚をつかんでから、'+esc(st.mon)+'に挑むと理解しやすい。</p>'+
    '</div>'+
    '<div class="lessongrid">'+cards+'</div>'+
    actionHtml;
  }

  export function wireLesson(app){
    document.getElementById('btnLessonBack').addEventListener('click', function(){
      state.screen = state.lessonFromBattle ? 'battle' : 'map';
      render();
    });
    var lessonToggle = document.getElementById('btnLessonToggleStudy');
    if(lessonToggle) lessonToggle.addEventListener('click', function(){
      /* studyStep/studyPickedはリセットしない。前回学習パートを離れた地点から
         そのまま再開できるよう、画面だけを切り替える即時トグル。
         ただしstudyBeats.jsがまだ読み込まれていない(startStudyを経由せず訓練場から
         直接ここへ来た)場合があるため、切り替える前に必ず読み込みを済ませる。 */
      state.screen = 'studyLoading';
      render();
      loadStudyBeats().then(function(){
        if(state.screen!=='studyLoading') return;
        state.screen = 'study';
        render();
      }).catch(function(error){
        console.error('学習データを読み込めませんでした',error);
        if(state.screen!=='studyLoading') return;
        state.screen = 'lesson';
        render();
        window.alert('学習データを読み込めませんでした。通信を確認して、もう一度お試しください。');
      });
    });
    var toBattleBtn = document.getElementById('btnToBattle');
    if(toBattleBtn){
      toBattleBtn.addEventListener('click', function(){ state.screen='battle'; render(); });
    }
    Array.prototype.forEach.call(app.querySelectorAll('.diffbtn'), function(btn){
      btn.addEventListener('click', function(){
        startStage(state.stageIndex, parseInt(btn.getAttribute('data-tier'),10));
      });
    });
  }



  /* CASEでも100〜1000の内部レートを使う。開始難易度は必ず下限として守り、
     各問題の出題元単元の習熟度に近い問題から先に並べる。 */
  export function stageEscalatingPool(st, startTier){
    var all = (st.qs||[]).concat(st.qsHard||[]).concat(st.qsExtra||[]).concat(st.qsDrag||[]).concat(st.qsExpert||[])
      .filter(function(q){ return !questionIsRedundant(q); });
    var from = startTier || 1;
    var ranked=all.filter(function(q){ return (q.diff||1)>=from; })
      .map(function(q){
        var targetLevel=Math.max(from,unitDifficultyTarget(q.unit||st.id));
        var targetRating=100+(targetLevel-1)*300;
        return {q:q,distance:Math.abs(questionDifficultyRating(q)-targetRating),tie:Math.random()};
      })
      .sort(function(a,b){ return a.distance-b.distance || a.tie-b.tie; });
    var result=[];
    while(ranked.length){
      var recent=result.slice(-6).map(questionSimilarityTag);
      var pick=ranked.findIndex(function(item){
        var tag=questionSimilarityTag(item.q);
        return !tag||recent.indexOf(tag)===-1;
      });
      if(pick<0) pick=0;
      result.push(ranked.splice(pick,1)[0].q);
    }
    return result;
  }


  export function startStage(idx, startTier){
    var st = STAGES[idx];
    state.startTier = startTier || 1;
    state.activeQs = stageEscalatingPool(st, state.startTier);
    state.screen='battle';
    state.stageIndex=idx;
    state.order = state.activeQs.map(function(_,i){return i;});
    state.qIndex=0;
    state.heroHP=100;
    state.monsterHP=100;
    state.wrong=0;
    state.locked=false;
    state.failReason=null;
    render();
  }


  export function openUnitPicker(){
    state.pickerReturnScreen = state.screen || 'map';
    var trigger = document.activeElement;
    state.pickerReturnFocusId = trigger && trigger.id ? trigger.id : null;
    var cur = progress.settings.endlessUnits;
    var curDiff = progress.settings.endlessDiffs;
    var curTier = progress.settings.endlessTiers;
    state.pickerSelection = (cur && cur.length) ? cur.slice() : UNIT_LIST.map(function(u){ return u.id; });
    state.pickerDiffSelection = (curDiff && curDiff.length) ? curDiff.slice() : [1,2,3,4];
    state.pickerTierSelection = (curTier && curTier.length) ? curTier.slice() : [1,2,3,4,5];
    state.pickerBatchSize = progress.settings.endlessBatchSize;
    state.pickerFastMode = progress.settings.endlessFastMode !== false;
    state.screen = 'unitPicker';
    render();
  }

  export function closeUnitPicker(){
    var returnScreen = state.pickerReturnScreen || 'map';
    var returnFocusId = state.pickerReturnFocusId;
    state.screen = returnScreen;
    state.pickerReturnScreen = 'map';
    state.pickerReturnFocusId = null;
    render();
    if(returnFocusId){
      requestAnimationFrame(function(){
        var trigger = document.getElementById(returnFocusId);
        if(trigger) trigger.focus();
      });
    }
  }


  export function renderUnitPicker(){
    var sel = state.pickerSelection;
    var diffSel = state.pickerDiffSelection;
    var tierSel = state.pickerTierSelection;
    var batchSize = state.pickerBatchSize;
    var fastMode = state.pickerFastMode;
    var chips = UNIT_LIST.map(function(u){
      var on = sel.indexOf(u.id) !== -1;
      var info = unitAttemptInfo(u.id);
      var rate = info.wrongRate===null ? null : Math.round(info.wrongRate*100);
      return '<button class="unitchip'+(on?' on':'')+'" data-unit="'+u.id+'">'+
        '<span class="uc-emoji">'+stageIcon(u.id,false)+'</span>'+
        '<span class="uc-case">'+esc(u.title)+'</span>'+
        '<span class="uc-title">'+esc(u.sub)+'</span>'+
        '<span class="uc-rate">'+(rate===null?'未挑戦':'誤答率'+rate+'%')+'</span>'+
      '</button>';
    }).join('');

    var diffChips = [1,2,3,4].map(function(lv){
      var on = diffSel.indexOf(lv) !== -1;
      return '<button class="diffchip'+(on?' on':'')+'" data-diff="'+lv+'">'+esc(DIFF_BATCH_LABEL[lv])+'</button>';
    }).join('');

    var tierChips = [1,2,3,4,5].map(function(lv){
      var on = tierSel.indexOf(lv) !== -1;
      var count = ENDLESS_POOL.filter(function(e){ return e.tier===lv; }).length;
      return '<button class="tierchip t'+lv+(on?' on':'')+'" data-tier="'+lv+'">'+
        '<span class="tc-label">'+esc(TIER_LABEL[lv])+'</span>'+
        '<span class="tc-count">'+count+'問</span>'+
        '<span class="tc-desc">'+esc(TIER_DESC[lv])+'</span>'+
      '</button>';
    }).join('');
    var batchChips=[0,10,20,50,100].map(function(count){
      return '<button class="diffchip'+(batchSize===count?' on':'')+'" data-batch-size="'+count+'">'+(count===0?'制限なし':count+'問')+'</button>';
    }).join('');

    var recoLevel = recommendDifficulty(sel);

    var backLabel = state.pickerReturnScreen==='endless' ? '← 問題へ戻る' : '← 地図へ戻る';
    return ''+ renderTopbar() +
    '<div class="battlebar"><button class="backbtn" id="btnPickerBack" data-escape-dismiss>'+backLabel+'</button></div>'+
    '<div class="frame intro">'+
      '<h2>'+icon('target')+' 出題する単元・難易度・重要度を選ぶ</h2>'+
      '<p>チェックした単元・難易度・重要度だけを対象に1000本ノックを出題します。誤答率が高い単元には目印がついているので、絞り込みの参考にしよう。何も選ばなければ開始できません。</p>'+
    '</div>'+
    '<div class="frame recobar cramcard">'+
      '<div class="reco-text">'+icon('spark')+' 時間がないなら「鉄板」と「頻出」だけに絞って、全単元をひと通り最短で回そう。</div>'+
      '<button class="primary" id="btnPickerCram">'+icon('spark')+' 一夜漬けモード（鉄板・頻出のみ）→</button>'+
    '</div>'+
    '<div class="frame recobar">'+
      '<div class="reco-text">'+icon('target')+' <b>快速モード</b>：似た問題はなるべく1問に絞り、違う内容をテンポよく出題します。'+
        '<span class="reco-sub">難易度のユーザー指定には含まれず、内部レートの自動調整は毎問そのまま動きます。</span></div>'+
      '<button type="button" class="ghost" id="btnPickerFast" aria-pressed="'+(fastMode?'true':'false')+'">快速モード：'+(fastMode?'ON':'OFF')+'</button>'+
    '</div>'+
    '<div class="frame recobar">'+
      '<div class="reco-text">'+icon('chip')+' 選択中の単元でのおすすめ難易度: <b>'+esc(DIFF_BATCH_LABEL[recoLevel])+'</b>'+
        '<span class="reco-sub">(正答実績から自動判定。データが少ない単元はまず初級から勧めます)</span></div>'+
      '<button class="ghost" id="btnPickerAuto">'+icon('target')+' 苦手分野+おすすめ難易度に自動設定</button>'+
    '</div>'+
    '<div class="actionrow" style="justify-content:flex-start; margin-bottom:14px;">'+
      '<button class="ghost" id="btnPickerAll">単元を全選択</button>'+
      '<button class="ghost" id="btnPickerNone">単元を全解除</button>'+
    '</div>'+
    '<div class="unitgrid">'+chips+'</div>'+
    '<div class="difftitle" style="margin-top:24px;">重要度で絞る(複数選択可) — 試験に出そうな核心から優先したいときに</div>'+
    '<div class="tierchiprow">'+tierChips+'</div>'+
    '<div class="difftitle" style="margin-top:24px;">難易度で絞る(複数選択可)</div>'+
    '<div class="diffchiprow">'+diffChips+'</div>'+
    '<div class="difftitle" style="margin-top:24px;">1セットの出題数</div>'+
    '<div class="diffchiprow" role="radiogroup" aria-label="出題数">'+batchChips+'</div>'+
    '<div class="actionrow" style="margin-top:20px;">'+
      '<button class="primary" id="btnPickerStart"'+((sel.length===0||diffSel.length===0||tierSel.length===0)?' disabled':'')+'>この設定で1000本ノックを開始 →</button>'+
    '</div>';
  }

  export function wireUnitPicker(app){
    document.getElementById('btnPickerBack').addEventListener('click', function(){
      closeUnitPicker();
    });
    Array.prototype.forEach.call(app.querySelectorAll('.unitchip'), function(btn){
      btn.addEventListener('click', function(){
        var id = btn.getAttribute('data-unit');
        var idx = state.pickerSelection.indexOf(id);
        if(idx===-1) state.pickerSelection.push(id);
        else state.pickerSelection.splice(idx,1);
        render();
      });
    });
    document.getElementById('btnPickerAll').addEventListener('click', function(){
      state.pickerSelection = UNIT_LIST.map(function(u){ return u.id; });
      render();
    });
    document.getElementById('btnPickerNone').addEventListener('click', function(){
      state.pickerSelection = [];
      render();
    });
    Array.prototype.forEach.call(app.querySelectorAll('[data-diff]'), function(btn){
      btn.addEventListener('click', function(){
        var lv = parseInt(btn.getAttribute('data-diff'),10);
        var idx = state.pickerDiffSelection.indexOf(lv);
        if(idx===-1) state.pickerDiffSelection.push(lv);
        else state.pickerDiffSelection.splice(idx,1);
        render();
      });
    });
    Array.prototype.forEach.call(app.querySelectorAll('.tierchip'), function(btn){
      btn.addEventListener('click', function(){
        var lv = parseInt(btn.getAttribute('data-tier'),10);
        var idx = state.pickerTierSelection.indexOf(lv);
        if(idx===-1) state.pickerTierSelection.push(lv);
        else state.pickerTierSelection.splice(idx,1);
        render();
      });
    });
    Array.prototype.forEach.call(app.querySelectorAll('[data-batch-size]'), function(btn){
      btn.addEventListener('click', function(){
        state.pickerBatchSize=parseInt(btn.getAttribute('data-batch-size'),10);
        render();
      });
    });
    document.getElementById('btnPickerAuto').addEventListener('click', function(){
      var weak = weakUnitIds();
      state.pickerSelection = weak.slice();
      state.pickerDiffSelection = [recommendDifficulty(weak)];
      render();
    });
    document.getElementById('btnPickerFast').addEventListener('click', function(){
      state.pickerFastMode = !state.pickerFastMode;
      progress.settings.endlessFastMode = state.pickerFastMode;
      saveProgress(progress);
      render();
    });
    document.getElementById('btnPickerCram').addEventListener('click', function(){
      state.pickerSelection = UNIT_LIST.map(function(u){ return u.id; });
      state.pickerDiffSelection = [1,2,3,4];
      state.pickerTierSelection = [1,2];
      progress.settings.endlessUnits = null;
      progress.settings.endlessDiffs = null;
      progress.settings.endlessTiers = [1,2];
      progress.settings.endlessBatchSize = state.pickerBatchSize;
      progress.settings.endlessFastMode = state.pickerFastMode;
      saveProgress(progress);
      rebuildEndlessQueue();
      state.curQ = null;
      state.screen = 'endless';
      render();
    });
    document.getElementById('btnPickerStart').addEventListener('click', function(){
      if(state.pickerSelection.length===0 || state.pickerDiffSelection.length===0 || state.pickerTierSelection.length===0) return;
      progress.settings.endlessUnits = (state.pickerSelection.length===UNIT_LIST.length)
        ? null : state.pickerSelection.slice();
      progress.settings.endlessDiffs = (state.pickerDiffSelection.length===4)
        ? null : state.pickerDiffSelection.slice();
      progress.settings.endlessTiers = (state.pickerTierSelection.length===5)
        ? null : state.pickerTierSelection.slice();
      progress.settings.endlessBatchSize = state.pickerBatchSize;
      progress.settings.endlessFastMode = state.pickerFastMode;
      saveProgress(progress);
      rebuildEndlessQueue();
      state.curQ = null;
      state.screen = 'endless';
      render();
    });
  }



  export function currentEndlessQuestion(){
    var idx = progress.endless.queue[progress.endless.pos];
    return ENDLESS_POOL[idx];
  }


  export function currentQuestion(){
    var qi = state.order[state.qIndex];
    return state.activeQs[qi];
  }


  export const QLEAD_DEFAULT = {
    fill:'空欄(<span style="color:var(--accent);font-weight:700;">______</span>)に入るコードや単語を実際に入力して、呪文のように唱えよう。',
    debug:'🐛 このコードには誤りが1箇所ある。正しく直した内容を入力して唱えよう。',
    choice:'次のうち正しいものを選んで唱えよう。',
    order:'A〜Dなどのカードをドラッグして、正しい順番に並べよう。',
    dragfill:'下のピースをドラッグ（またはタップで選んで配置）して、空欄をすべて埋めよう。'
  };

  function selectionAnswerEnabled(){
    return !!progress.settings.mobileAnswerMode;
  }

  function answerModeToggleHtml(useSelection){
    return '<div class="answer-mode" role="group" aria-label="回答方法">'+
      '<span class="answer-mode-label">回答方法</span>'+
      '<button type="button" class="answer-mode-btn'+(!useSelection?' active':'')+'" data-answer-mode="input" aria-pressed="'+(!useSelection)+'">⌨ 入力</button>'+
      '<span class="answer-mode-arrow" aria-hidden="true">→</span>'+
      '<button type="button" class="answer-mode-btn'+(useSelection?' active':'')+'" data-answer-mode="selection" aria-pressed="'+useSelection+'">☝ 選択</button>'+
    '</div>';
  }

  function choiceButtonHtml(text,index,extraClass,extraAttr){
    return '<button type="button" class="choicebtn answer-choice '+(extraClass||'')+'" '+(extraAttr||'')+'>'+
      '<span class="choice-index" aria-hidden="true">'+String.fromCharCode(65+index)+'</span>'+
      '<span class="choice-text">'+esc(text)+'</span></button>';
  }

  function textInputAnswerHtml(q){
    if(q.long){
      return '<div class="answerrow long">'+
        '<textarea class="codeinput long" id="ansInput" rows="6" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="答えを入力…（複数行も入力できます）"></textarea>'+
        '</div><div class="actionrow"><button class="primary" id="btnSubmit">入力した答えで回答 →</button></div>';
    }
    return '<div class="answerrow">'+
      '<input class="codeinput" id="ansInput" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="答えを入力…">'+
      '<button class="primary" id="btnSubmit">入力した答えで回答 →</button>'+
    '</div>';
  }

  function mobileAnswerKind(answer){
    var text=String(answer);
    if(/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(text.trim())) return 'number';
    if(/^[!<>=+\-*/%&|^~]+$/.test(text.trim())) return 'operator';
    if(/^[A-Za-z_][\w:]*$/.test(text.trim())) return 'word';
    if(/[{}();<>=]|\n/.test(text)) return 'code';
    return 'text';
  }

  function mobileChoiceAnswers(q){
    var correct=q.answers[0];
    var kind=mobileAnswerKind(correct);
    var candidates=[];
    ENDLESS_POOL.forEach(function(entry){
      var candidate=entry.q;
      var type=candidate.type||'fill';
      if(candidate.qid===q.qid || candidate.long || (type!=='fill'&&type!=='debug') || candidate.unit!==q.unit) return;
      var answer=candidate.answers&&candidate.answers[0];
      if(answer && mobileAnswerKind(answer)===kind && !checkAnswer(answer,q.answers)) candidates.push(answer);
    });
    var unique=[];
    candidates.sort(function(a,b){ return Math.abs(String(a).length-String(correct).length)-Math.abs(String(b).length-String(correct).length); });
    candidates.forEach(function(answer){ if(unique.indexOf(answer)===-1 && unique.length<3) unique.push(answer); });
    var fallbacks=kind==='number'?['0','1','2','10']:
      kind==='operator'?['==','!=','<','>','<=','>=']:
      kind==='word'?['cout','cin','int','string','return','endl']:
      ['エラー','できる','できない','正しい'];
    fallbacks.forEach(function(answer){ if(unique.length<3 && !checkAnswer(answer,q.answers) && unique.indexOf(answer)===-1) unique.push(answer); });
    var options=[correct].concat(unique.slice(0,3));
    var offset=String(q.qid||'').split('').reduce(function(sum,ch){ return sum+ch.charCodeAt(0); },0)%options.length;
    return options.slice(offset).concat(options.slice(0,offset));
  }

  function mobileLineBuilder(q){
    var lines=String(q.answers[0]).split('\n').filter(function(line){ return line.trim()!==''; });
    if(lines.length<2) return null;
    if(state.mobileLineQid!==q.qid){
      state.mobileLineQid=q.qid;
      state.mobileLineOrder=new Array(lines.length).fill(null);
      state.mobileLineSelected=null;
    }
    var used=state.mobileLineOrder;
    var source=lines.map(function(line,index){ return {line:line,index:index}; })
      .sort(function(a,b){
        var ah=(String(q.qid)+a.index).split('').reduce(function(n,ch){ return n+ch.charCodeAt(0); },0)%17;
        var bh=(String(q.qid)+b.index).split('').reduce(function(n,ch){ return n+ch.charCodeAt(0); },0)%17;
        return ah-bh || b.index-a.index;
      }).map(function(item){
        var isUsed=used.indexOf(item.index)!==-1;
        var isSelected=state.mobileLineSelected===item.index;
        return '<button type="button" class="mobile-code-line'+(isUsed?' used':'')+(isSelected?' selected':'')+'" data-mobile-line="'+item.index+
          '" draggable="'+(isUsed?'false':'true')+'"'+(isUsed?' disabled':'')+'>'+
          '<code>'+esc(item.line)+'</code></button>';
      }).join('');
    var placed=used.map(function(index,position){
      return '<div class="mobile-code-slot'+(index!==null?' filled':'')+'" data-mobile-slot="'+position+'"><span>'+(position+1)+'</span>'+
        (index!==null?'<button type="button" class="mobile-code-placed" data-mobile-move="'+position+'" draggable="true"><code>'+esc(lines[index])+'</code></button>':
          '<button type="button" class="mobile-code-placeholder">選択またはドラッグして配置</button>')+'</div>';
    }).join('');
    return '<div class="mobile-code-builder"><p>コード行を選び、番号欄へドラッグ（タップ配置も可）</p><div class="mobile-code-source">'+source+'</div>'+
      '<div class="mobile-code-answer">'+placed+'</div>'+
      '<div class="actionrow"><button class="ghost" id="btnMobileLineReset" type="button">リセット</button>'+
      '<button class="primary" id="btnMobileLineSubmit" type="button"'+(used.every(function(index){ return index!==null; })?'':' disabled')+'>このコードで回答 →</button></div></div>';
  }


  export function renderQuestionBody(q){
    var type = q.type || 'fill';
    var useSelection=selectionAnswerEnabled();
    var leadText = q.lead;
    if(type==='order' && leadText){
      leadText=leadText.replace(/正しい順番を記号で答えなさい。?/,'カードを正しい順番に並べなさい。');
    }
    var qlead = leadText ? esc(leadText) : QLEAD_DEFAULT[type];

    if((type==='dragfill'||type==='order') && state.dragQid !== q.qid){
      state.dragPlacement = {};
      state.dragSelected = null;
      state.dragQid = q.qid;
    }

    var bodyHtml;
    if(type==='order'){
      /* 正解は常にq.linesの並び順そのものなので、トレイの表示順だけをシャッフルする。
         data-pieceはln.labelのままなので、正解判定(順序比較)は一切変更しない。 */
      if(state.orderTrayQid !== q.qid){
        state.orderTrayOrder = shuffle(q.lines.map(function(_,i){ return i; }));
        state.orderTrayQid = q.qid;
      }
      var orderUsed=Object.keys(state.dragPlacement).map(function(key){ return state.dragPlacement[key]; }).filter(Boolean);
      var orderCards=state.orderTrayOrder.map(function(idx){
        var ln=q.lines[idx];
        var used=orderUsed.indexOf(ln.label)!==-1;
        var selected=state.dragSelected===ln.label;
        return '<button type="button" class="dragpiece orderpiece'+(used?' used':'')+(selected?' selected':'')+
          '" data-piece="'+esc(ln.label)+'" draggable="false"'+(used?' disabled':'')+'>'+
          '<b>'+esc(ln.label)+'</b><code>'+esc(ln.code)+'</code></button>';
      }).join('');
      var orderSlots=q.lines.map(function(ln,index){
        var key='order-'+index;
        var placedLabel=state.dragPlacement[key];
        var placed=q.lines.filter(function(candidate){ return candidate.label===placedLabel; })[0];
        return '<div class="orderrow"><span class="ordernum">'+(index+1)+'</span>'+
          '<button type="button" class="dragslot orderslot'+(placed?' filled':'')+'" data-blank="'+key+'">'+
          (placed?'<b>'+esc(placed.label)+'</b><code>'+esc(placed.code)+'</code>':'ここへカードを置く')+
          '</button></div>';
      }).join('');
      bodyHtml='<div class="orderbuilder"><div class="ordertray">'+orderCards+'</div>'+
        '<div class="orderanswer" aria-label="並び替えた回答">'+orderSlots+'</div></div>';
    } else if(type==='choice'){
      bodyHtml = q.code ? '<pre class="codeblock">'+esc(q.code)+'</pre>' : '';
    } else if(type==='dragfill'){
      var placement = state.dragPlacement;
      var codeLines = q.lines.map(function(ln){
        if(ln.blank===undefined) return esc(ln.code);
        var placedId = placement[ln.blank];
        var piece = placedId ? q.pieces.filter(function(p){ return p.id===placedId; })[0] : null;
        return '<span class="dragslot'+(piece?' filled':'')+'" data-blank="'+ln.blank+'">'+(piece?esc(piece.code):'ここにピースを置く')+'</span>';
      });
      bodyHtml = '<pre class="codeblock dragcode">'+codeLines.join('\n')+'</pre>';
    } else {
      /* q.codeは「複数の設問が同じプログラムを共有する」ケース(1つの長いコードに
         対して出力を何個も予想させる問題など)向けの、読み取り専用の参考コード。
         通常のbefore/before内の空欄コードとは別枠で、その上に表示する。 */
      bodyHtml = (q.code ? '<pre class="codeblock">'+esc(q.code)+'</pre>' : '')+
        '<pre class="codeblock">'+esc(q.before)+'<mark class="blank">______</mark>'+esc(q.after)+'</pre>';
    }

    /* choice/order/dragfillは選択・操作でしか回答できない形式のため、
       入力⇄選択の切替(ペーパーテスト再現用に維持)には関係なく常に本来のUIを出す。
       切替の対象はfill/debug(自由記述で書ける形式)だけに限定する。 */
    var answerHtml;
    if(type==='choice'){
      /* 正解が常にoptions[0]にあるデータのため、表示順だけをシャッフルする。
         data-optは元のindexのままなので、正解判定(値比較)は一切変更しない。 */
      if(state.choiceOrderQid !== q.qid){
        state.choiceOrder = shuffle(q.options.map(function(_,i){ return i; }));
        state.choiceOrderQid = q.qid;
      }
      answerHtml = '<div class="choicegrid" id="choiceGrid">'+
        state.choiceOrder.map(function(origIdx,displayPos){
          return choiceButtonHtml(q.options[origIdx],displayPos,'','data-opt="'+origIdx+'"');
        }).join('')+
      '</div>';
    } else if(type==='order'){
      var orderComplete=q.lines.every(function(ln,index){ return !!state.dragPlacement['order-'+index]; });
      answerHtml='<div class="actionrow"><button class="ghost" id="btnDragReset" type="button">並び順をリセット</button>'+
        '<button class="primary" id="btnSubmit"'+(orderComplete?'':' disabled')+'>この順番で回答 →</button></div>';
    } else if(type==='dragfill'){
      var usedIds = Object.keys(state.dragPlacement).map(function(b){ return state.dragPlacement[b]; }).filter(Boolean);
      var trayHtml = q.pieces.map(function(p){
        var used = usedIds.indexOf(p.id)!==-1;
        var selected = state.dragSelected===p.id;
        return '<button class="dragpiece'+(used?' used':'')+(selected?' selected':'')+'" data-piece="'+p.id+'" draggable="false"'+(used?' disabled':'')+'>'+esc(p.code)+'</button>';
      }).join('');
      var blankIds = q.lines.filter(function(ln){ return ln.blank!==undefined; }).map(function(ln){ return ln.blank; });
      var allFilled = blankIds.every(function(b){ return !!state.dragPlacement[b]; });
      answerHtml = '<div class="dragtray" id="dragTray">'+trayHtml+'</div>'+
        '<div class="actionrow">'+
          '<button class="ghost" id="btnDragReset" type="button">やり直す</button>'+
          '<button class="primary" id="btnSubmit"'+(allFilled?'':' disabled')+'>詠唱する →</button>'+
        '</div>';
    } else if(useSelection && q.long && mobileLineBuilder(q)){
      answerHtml=mobileLineBuilder(q);
    } else if(useSelection){
      answerHtml='<div class="mobile-choicegrid">'+mobileChoiceAnswers(q).map(function(answer,index){
        return choiceButtonHtml(answer,index,'mobile-answer-choice','data-mobile-answer="'+index+'"');
      }).join('')+'</div>';
    } else {
      answerHtml=textInputAnswerHtml(q);
    }
    var showModeToggle = (type==='fill'||type==='debug');
    return {qlead:qlead, bodyHtml:bodyHtml, answerHtml:(showModeToggle?answerModeToggleHtml(useSelection):'')+answerHtml};
  }


  export function renderBattle(){
    var st = STAGES[state.stageIndex];
    if(!state.curQ) state.curQ = currentQuestion();
    var total = state.activeQs.length;
    var qb = renderQuestionBody(state.curQ);

    return ''+ renderTopbar() +
    '<div class="battlebar">'+
      '<button class="backbtn" id="btnHome">← 地図へ戻る</button>'+
      '<button class="backbtn" id="btnReview">'+icon('book')+' 訓練場で例題を見直す</button>'+
    '</div>'+
    '<div class="combatants">'+
      '<div class="frame fighter"><div class="who"><span class="emoji">'+icon('shield')+'</span><div class="name">コード探偵<small>DETECTIVE UNIT</small></div></div>'+
        '<div class="hpbar hero"><i style="transform:scaleX('+(state.heroHP/100)+')"></i></div>'+
        '<div class="hpnum"><span>HP</span><span class="num">'+state.heroHP+' / 100</span></div></div>'+
      '<div class="vs">VS</div>'+
      '<div class="frame fighter"><div class="who"><span class="emoji">'+stageIcon(st.id,true)+'</span><div class="name">'+esc(st.mon)+'<small>'+esc(st.sub)+'</small></div></div>'+
        '<div class="hpbar monster"><i style="transform:scaleX('+(state.monsterHP/100)+')"></i></div>'+
        '<div class="hpnum"><span>HP</span><span class="num">'+state.monsterHP+' / 100</span></div></div>'+
    '</div>'+
    '<div class="frame qcard" id="qcard">'+
      '<div class="qmeta"><span>設問 '+(state.qIndex+1)+' / '+total+' <span class="tierbadge t'+questionTier(state.curQ)+'">重要度: '+esc(TIER_LABEL[questionTier(state.curQ)])+'</span></span><span>'+esc(st.title)+' ・ 難易度: '+esc(DIFF_BATCH_LABEL[state.curQ.diff]||'')+'</span></div>'+
      '<div class="qlead">'+qb.qlead+'</div>'+
      qb.bodyHtml+
      qb.answerHtml+
    '</div>'+
    '<div id="feedbackSlot"></div>';
  }


  export function renderEndless(){
    if(!state.curQ){
      var cur = currentEndlessQuestion();
      state.curQ = cur.q;
      state.endlessSrc = cur;
    }
    var qb = renderQuestionBody(state.curQ);
    var e = progress.endless;
    var total = e.correct + e.wrong;
    var acc = total>0 ? Math.round(e.correct/total*100) : 0;

    var selUnits = progress.settings.endlessUnits;
    var filterNote = (selUnits && selUnits.length) ? '('+selUnits.length+'/'+UNIT_LIST.length+'単元に絞り込み中)' : '(全単元)';

    return ''+ renderTopbar() +
    '<div class="battlebar">'+
      '<button class="backbtn" id="btnHome">← 地図へ戻る</button>'+
      '<button class="backbtn" id="btnEndlessFilter">'+icon('target')+' 単元を絞る '+esc(filterNote)+'</button>'+
      '<button class="backbtn pauseinvestigation" id="btnPauseEndless">'+icon('lock')+' 捜査を中断する</button>'+
    '</div>'+
    '<div class="frame endlessbar">'+
      '<div class="estat"><span class="elabel">出題元</span><span class="evalue">'+esc(state.endlessSrc.srcTitle)+'</span></div>'+
      '<div class="estat"><span class="elabel">連続正解</span><span class="evalue">'+e.streak+'(最高'+e.bestStreak+')</span></div>'+
      '<div class="estat"><span class="elabel">通算正答率</span><span class="evalue">'+e.correct+' / '+total+'('+acc+'%)</span></div>'+
      '<div class="estat"><span class="elabel">'+(progress.settings.endlessBatchSize===0?'出題数':'今セットの残数')+'</span><span class="evalue">'+
        (progress.settings.endlessBatchSize===0?'制限なし（毎問調整）':(progress.endless.queue.length-progress.endless.pos)+' / '+progress.endless.queue.length)+'</span></div>'+
    '</div>'+
    '<div class="frame qcard" id="qcard">'+
      '<div class="qmeta"><span>1000本ノック <span class="tierbadge t'+state.endlessSrc.tier+'">重要度: '+esc(TIER_LABEL[state.endlessSrc.tier])+'</span></span><span>'+esc(state.endlessSrc.srcSub)+' ・ 難易度: '+esc(DIFF_BATCH_LABEL[state.curQ.diff]||'')+'</span></div>'+
      '<div class="qlead">'+qb.qlead+'</div>'+
      qb.bodyHtml+
      qb.answerHtml+
    '</div>'+
    '<div id="feedbackSlot"></div>';
  }

  export function renderEndlessResult(){
    var correct=progress.endless.sessionCorrect||0;
    var wrong=progress.endless.sessionWrong||0;
    var total=correct+wrong;
    var accuracy=total?Math.round(correct/total*100):0;
    return ''+renderTopbar()+
      '<div class="battlebar"><button class="backbtn" id="btnHome">← 地図へ戻る</button></div>'+
      '<div class="frame result achieve">'+
        '<span class="bigemoji">'+icon('target')+'</span><h2>'+total+'本ノック完了！</h2>'+
        '<p>正解 <b>'+correct+'</b>問 ／ 誤答 <b>'+wrong+'</b>問 ／ 正答率 <b>'+accuracy+'%</b></p>'+
        '<div class="resultbtns">'+
          '<button class="primary" id="btnEndlessAgain">同じ設定でもう一度 →</button>'+
          '<button class="ghost" id="btnEndlessSettings">条件を変更する</button>'+
        '</div>'+
      '</div>';
  }


  export function wireQuestionControls(app){
    var type = state.curQ.type||'fill';
    Array.prototype.forEach.call(document.querySelectorAll('[data-answer-mode]'),function(btn){
      btn.addEventListener('click',function(){
        var useSelection=btn.getAttribute('data-answer-mode')==='selection';
        if(progress.settings.mobileAnswerMode===useSelection) return;
        progress.settings.mobileAnswerMode=useSelection;
        saveProgress(progress);
        render();
      });
    });
    var mobileChoices=app.querySelectorAll('.mobile-answer-choice');
    if(mobileChoices.length){
      var answers=mobileChoiceAnswers(state.curQ);
      Array.prototype.forEach.call(mobileChoices,function(btn){
        btn.addEventListener('click',function(){
          btn.classList.add('chosen');
          Array.prototype.forEach.call(mobileChoices,function(choice){ choice.disabled=true; });
          resolveAnswer(answers[parseInt(btn.getAttribute('data-mobile-answer'),10)]);
        });
      });
    } else if(document.getElementById('btnMobileLineSubmit')){
      wireMobileLineBuilder(app);
    } else if(document.getElementById('ansInput')){
      var input = document.getElementById('ansInput');
      var submitBtn = document.getElementById('btnSubmit');
      submitBtn.addEventListener('click', onSubmit);
      input.addEventListener('keydown', function(e){
        if(e.key!=='Enter' || state.locked || e.isComposing) return;
        if(input.tagName==='TEXTAREA' && e.shiftKey) return;
        e.preventDefault();
        e.stopPropagation();
        onSubmit();
      });
      input.focus();
    } else if(type==='choice'){
      Array.prototype.forEach.call(app.querySelectorAll('.choicebtn'), function(btn){
        btn.addEventListener('click', function(){ onChoice(parseInt(btn.getAttribute('data-opt'),10)); });
      });
    } else if(type==='dragfill'||type==='order'){
      wireDragfillControls(app);
    }
  }

  function wireMobileLineBuilder(app){
    var pointerDragged=false;
    function placeLine(lineIndex,slotIndex,fromSlot){
      if(fromSlot!==null) state.mobileLineOrder[fromSlot]=null;
      var oldSlot=state.mobileLineOrder.indexOf(lineIndex);
      if(oldSlot!==-1) state.mobileLineOrder[oldSlot]=null;
      var displaced=state.mobileLineOrder[slotIndex];
      state.mobileLineOrder[slotIndex]=lineIndex;
      if(displaced!==null&&fromSlot!==null) state.mobileLineOrder[fromSlot]=displaced;
      state.mobileLineSelected=null;
      render();
    }
    function installPointerDrag(element,lineIndex,fromSlot){
      element.addEventListener('pointerdown',function(event){
        if(event.pointerType==='mouse') return;
        pointerDragged=false;
        var startX=event.clientX,startY=event.clientY;
        element.setPointerCapture(event.pointerId);
        element.classList.add('touch-dragging');
        function move(moveEvent){
          if(Math.abs(moveEvent.clientX-startX)+Math.abs(moveEvent.clientY-startY)>8) pointerDragged=true;
        }
        function end(endEvent){
          element.classList.remove('touch-dragging');
          element.removeEventListener('pointermove',move);
          element.removeEventListener('pointerup',end);
          if(!pointerDragged) return;
          var target=document.elementFromPoint(endEvent.clientX,endEvent.clientY);
          var slot=target&&target.closest?target.closest('[data-mobile-slot]'):null;
          if(slot) placeLine(lineIndex,parseInt(slot.getAttribute('data-mobile-slot'),10),fromSlot);
        }
        element.addEventListener('pointermove',move);
        element.addEventListener('pointerup',end);
      });
    }
    Array.prototype.forEach.call(app.querySelectorAll('[data-mobile-line]:not(:disabled)'),function(btn){
      btn.addEventListener('click',function(){
        if(pointerDragged){ pointerDragged=false; return; }
        var index=parseInt(btn.getAttribute('data-mobile-line'),10);
        state.mobileLineSelected=state.mobileLineSelected===index?null:index;
        render();
      });
      btn.addEventListener('dragstart',function(event){
        if(event.dataTransfer) event.dataTransfer.setData('text/plain','line:'+btn.getAttribute('data-mobile-line'));
      });
      installPointerDrag(btn,parseInt(btn.getAttribute('data-mobile-line'),10),null);
    });
    Array.prototype.forEach.call(app.querySelectorAll('[data-mobile-slot]'),function(slot){
      var slotIndex=parseInt(slot.getAttribute('data-mobile-slot'),10);
      slot.addEventListener('dragover',function(event){ event.preventDefault(); slot.classList.add('dragover'); });
      slot.addEventListener('dragleave',function(){ slot.classList.remove('dragover'); });
      slot.addEventListener('drop',function(event){
        event.preventDefault();
        var parts=(event.dataTransfer?event.dataTransfer.getData('text/plain'):'').split(':');
        if(parts[0]==='line') placeLine(parseInt(parts[1],10),slotIndex,null);
        if(parts[0]==='slot'){
          var fromSlot=parseInt(parts[1],10);
          placeLine(state.mobileLineOrder[fromSlot],slotIndex,fromSlot);
        }
      });
      slot.addEventListener('click',function(event){
        if(event.target.closest('[data-mobile-move]')) return;
        if(state.mobileLineSelected!==null) placeLine(state.mobileLineSelected,slotIndex,null);
      });
    });
    Array.prototype.forEach.call(app.querySelectorAll('[data-mobile-move]'),function(btn){
      var fromSlot=parseInt(btn.getAttribute('data-mobile-move'),10);
      var lineIndex=state.mobileLineOrder[fromSlot];
      btn.addEventListener('click',function(){
        if(pointerDragged){ pointerDragged=false; return; }
        state.mobileLineOrder[fromSlot]=null;
        state.mobileLineSelected=lineIndex;
        render();
      });
      btn.addEventListener('dragstart',function(event){
        if(event.dataTransfer) event.dataTransfer.setData('text/plain','slot:'+fromSlot);
      });
      installPointerDrag(btn,lineIndex,fromSlot);
    });
    document.getElementById('btnMobileLineReset').addEventListener('click',function(){
      state.mobileLineOrder=new Array(state.mobileLineOrder.length).fill(null);
      state.mobileLineSelected=null;
      render();
    });
    document.getElementById('btnMobileLineSubmit').addEventListener('click',function(){
      var lines=String(state.curQ.answers[0]).split('\n').filter(function(line){ return line.trim()!==''; });
      resolveAnswer(state.mobileLineOrder.map(function(index){ return lines[index]; }).join('\n'));
    });
  }


  /* dragfill(複数行空欄をピースで埋める形式)の操作。
     ピースをタップ→空欄をタップで配置(タッチ・キーボード操作でも完結)でき、
     さらにデスクトップではdraggable属性によるネイティブのドラッグ&ドロップにも対応する。 */
  export function dragfillValue(q){
    if((q.type||'fill')==='order'){
      return q.lines.map(function(ln,index){ return state.dragPlacement['order-'+index]||''; }).join(',');
    }
    var blankIds = q.lines.filter(function(ln){ return ln.blank!==undefined; }).map(function(ln){ return ln.blank; });
    return blankIds.map(function(b){ return b+'='+(state.dragPlacement[b]||''); }).join('|');
  }

  /* order-dragfix3: 並べ替えは回答モードに関係なくポインタ操作で配置できる。 */
  export function wireDragfillControls(app){
    function placePiece(pid,slot){
      if(!pid || !slot || state.locked) return false;
      state.dragPlacement[slot.getAttribute('data-blank')] = pid;
      state.dragSelected = null;
      render();
      return true;
    }

    function installPointerDrag(btn){
      var active=false, moved=false, ignoreClick=false, pointerId=null;
      var startX=0, startY=0, ghost=null, highlighted=null;

      function slotAt(x,y){
        var target=document.elementFromPoint(x,y);
        return target&&target.closest ? target.closest('.dragslot') : null;
      }
      function highlight(slot){
        if(highlighted===slot) return;
        if(highlighted) highlighted.classList.remove('dragover');
        highlighted=slot;
        if(highlighted) highlighted.classList.add('dragover');
      }
      function makeGhost(){
        var rect=btn.getBoundingClientRect();
        ghost=btn.cloneNode(true);
        ghost.disabled=false;
        ghost.classList.add('dragpiece-ghost');
        ghost.style.left=rect.left+'px';
        ghost.style.top=rect.top+'px';
        ghost.style.width=rect.width+'px';
        ghost.style.height=rect.height+'px';
        document.body.appendChild(ghost);
        btn.classList.add('drag-source');
      }
      function cleanup(){
        window.removeEventListener('pointermove',onMove,true);
        window.removeEventListener('pointerup',onUp,true);
        window.removeEventListener('pointercancel',onCancel,true);
        highlight(null);
        if(ghost&&ghost.parentNode) ghost.parentNode.removeChild(ghost);
        ghost=null;
        btn.classList.remove('drag-source');
        active=false;
        pointerId=null;
      }
      function onMove(event){
        if(!active||event.pointerId!==pointerId) return;
        var dx=event.clientX-startX,dy=event.clientY-startY;
        if(!moved&&(Math.abs(dx)>7||Math.abs(dy)>7)){
          moved=true;
          makeGhost();
        }
        if(!moved) return;
        event.preventDefault();
        ghost.style.transform='translate3d('+dx+'px,'+dy+'px,0)';
        highlight(slotAt(event.clientX,event.clientY));
      }
      function onUp(event){
        if(!active||event.pointerId!==pointerId) return;
        var slot=moved?slotAt(event.clientX,event.clientY):null;
        if(moved){ event.preventDefault(); ignoreClick=true; }
        cleanup();
        if(slot) placePiece(btn.getAttribute('data-piece'),slot);
      }
      function onCancel(event){
        if(!active||event.pointerId!==pointerId) return;
        ignoreClick=moved;
        cleanup();
      }

      btn.addEventListener('pointerdown',function(event){
        if(state.locked||active||(event.pointerType==='mouse'&&event.button!==0)) return;
        active=true; moved=false; pointerId=event.pointerId;
        startX=event.clientX; startY=event.clientY;
        window.addEventListener('pointermove',onMove,{capture:true,passive:false});
        window.addEventListener('pointerup',onUp,{capture:true,passive:false});
        window.addEventListener('pointercancel',onCancel,true);
      });
      btn.addEventListener('click',function(event){
        if(!ignoreClick) return;
        ignoreClick=false;
        event.preventDefault();
        event.stopImmediatePropagation();
      },true);
    }

    Array.prototype.forEach.call(app.querySelectorAll('.dragpiece:not(.used)'), function(btn){
      installPointerDrag(btn);
      btn.addEventListener('click', function(){
        if(state.locked) return;
        var pid = btn.getAttribute('data-piece');
        state.dragSelected = (state.dragSelected===pid) ? null : pid;
        render();
      });
    });
    Array.prototype.forEach.call(app.querySelectorAll('.dragslot'), function(slot){
      slot.addEventListener('click', function(){
        if(state.locked) return;
        var blankId = slot.getAttribute('data-blank');
        if(slot.classList.contains('filled')){
          state.dragPlacement[blankId] = null;
        } else if(state.dragSelected){
          state.dragPlacement[blankId] = state.dragSelected;
          state.dragSelected = null;
        }
        render();
      });
    });
    var resetBtn = document.getElementById('btnDragReset');
    if(resetBtn) resetBtn.addEventListener('click', function(){
      if(state.locked) return;
      state.dragPlacement = {};
      state.dragSelected = null;
      render();
    });
    var submitBtn = document.getElementById('btnSubmit');
    if(submitBtn) submitBtn.addEventListener('click', function(){
      if(state.locked || submitBtn.disabled) return;
      resolveAnswer(dragfillValue(state.curQ));
    });
  }


  export function resolveAnswer(val){
    state.locked = true;

    var isEndless = state.screen==='endless';
    var isReview = state.screen==='review';
    var allowAlt = !!progress.settings.allowAlt;
    /* 授業準拠モード(allowAlt=false)では、各問題の先頭に登録された正式解答
       (answers[0])だけを正解として扱い、大文字小文字・std::・末尾セミコロンを
       自動では同一視しない。別解許容モードでは従来通りanswers全体+altAnswersを
       使い、表記揺れも吸収する。 */
    var answerPool = allowAlt
      ? ((state.curQ.altAnswers && state.curQ.altAnswers.length)
          ? state.curQ.answers.concat(state.curQ.altAnswers) : state.curQ.answers)
      : [state.curQ.answers[0]];
    var correct = allowAlt ? checkAnswer(val, answerPool) : checkAnswerStrict(val, answerPool);
    var slot = document.getElementById('feedbackSlot');
    var qcard = document.getElementById('qcard');

    recordUnitAnswer(state.curQ.unit, correct);
    recordMissed(state.curQ.qid, correct);

    if(isEndless){
      recordEndlessSimilarity(state.curQ);
      if(correct){
        progress.endless.correct++;
        progress.endless.sessionCorrect=(progress.endless.sessionCorrect||0)+1;
        progress.endless.streak++;
        if(progress.endless.streak > progress.endless.bestStreak) progress.endless.bestStreak = progress.endless.streak;
        qcard.classList.add('pulse');
      } else {
        progress.endless.wrong++;
        progress.endless.sessionWrong=(progress.endless.sessionWrong||0)+1;
        progress.endless.streak = 0;
        qcard.classList.add('shake');
      }
      saveProgress(progress);
    } else if(isReview){
      if(correct){
        state.reviewStats.correct++;
        recordLearningActivity('reviewsCleared',1);
        qcard.classList.add('pulse');
      } else {
        state.reviewStats.wrong++;
        qcard.classList.add('shake');
      }
      saveProgress(progress);
    } else {
      var dmgToMonster = DIFF_CORRECT_DMG[state.curQ.diff] || 10;
      var wrongDmg = DIFF_WRONG_DMG[state.curQ.diff] || 20;
      if(correct){
        state.monsterHP = Math.max(0, state.monsterHP - dmgToMonster);
        qcard.classList.add('pulse');
      } else {
        state.wrong++;
        state.heroHP = Math.max(0, state.heroHP - wrongDmg);
        qcard.classList.add('shake');
      }
      saveProgress(progress);
    }

    var yourAnsChip, correctAnsChip;
    if(state.curQ.type==='dragfill'){
      var dfBlankIds = state.curQ.lines.filter(function(ln){ return ln.blank!==undefined; }).map(function(ln){ return ln.blank; });
      var pieceCode = function(pid){
        var p = state.curQ.pieces.filter(function(pp){ return pp.id===pid; })[0];
        return p ? p.code : '(空欄)';
      };
      yourAnsChip = '<div class="yourans"><span class="label">あなたの配置</span>'+
        dfBlankIds.map(function(b){ return '<span class="chip">'+esc(pieceCode(state.dragPlacement[b]))+'</span>'; }).join('')+
      '</div>';
      correctAnsChip = correct ? '' : '<div class="correctans"><span class="label">正解</span>'+
        dfBlankIds.map(function(b){ return '<span class="chip">'+esc(pieceCode(state.curQ.answerMap[b]))+'</span>'; }).join('')+
      '</div>';
    } else {
      yourAnsChip = '<div class="yourans"><span class="label">あなたの回答</span><span class="chip">'+esc(val)+'</span></div>';
      if(correct){
        var exactMatch=answerPool.some(function(answer){ return String(val).trim()===String(answer).trim(); });
        if(exactMatch){
          correctAnsChip = '';
        } else {
          var canonicalAnswer=state.curQ.answers[0];
          var variantLabel = allowAlt ? '教材の模範表記（どちらも正解）' : '授業準拠モードの正解表記（書式の違いのみ）';
          correctAnsChip='<div class="correctans accepted-variant"><span class="label">'+esc(variantLabel)+'</span>'+
            '<button type="button" class="ghost-badge copyable" data-copy="'+esc(canonicalAnswer)+'">'+esc(canonicalAnswer)+'</button></div>';
        }
      } else if(allowAlt){
        var altList = (state.curQ.altAnswers && state.curQ.altAnswers.length) ? state.curQ.altAnswers : [];
        var primaryBadges = state.curQ.answers.map(function(a){
          return '<button type="button" class="ghost-badge copyable" data-copy="'+esc(a)+'">'+esc(a)+'</button>';
        }).join('');
        var altBadges = altList.map(function(a){
          return '<button type="button" class="ghost-badge copyable alt" data-copy="'+esc(a)+'">'+esc(a)+' <small>(別解)</small></button>';
        }).join('');
        correctAnsChip = '<div class="correctans"><span class="label">正解例(クリックでコピー)</span>'+primaryBadges+altBadges+'</div>';
      } else {
        correctAnsChip = '<div class="correctans"><span class="label">授業準拠モードの正解</span>'+
          '<button type="button" class="ghost-badge copyable" data-copy="'+esc(state.curQ.answers[0])+'">'+esc(state.curQ.answers[0])+'</button></div>'+
          '<div class="explain"><span class="tag">授業準拠モード</span>この解答は授業で扱った表記と一致しません。授業準拠モードでは先頭の正式解答のみが正解になります。別解許容モードに切り替えると、他の書き方も正解として扱われる場合があります。</div>';
      }
    }

    var missedNow = !!progress.missed[state.curQ.qid];
    slot.innerHTML = ''+
      '<div class="frame feedback '+(correct?'good':'bad')+'">'+
        '<div class="head">'+icon(correct?'sword':'alert')+(correct? ' 会心の一撃！' : ' 手痛い反撃を受けた…')+'</div>'+
        yourAnsChip+
        correctAnsChip+
        '<div class="explain"><span class="tag">解説</span>'+esc(state.curQ.explain)+'</div>'+
        (!correct && state.curQ.explainWrong ? '<div class="explain explain-detail"><span class="tag">くわしい解説</span>'+esc(state.curQ.explainWrong)+'</div>' : '')+
        '<label class="missedcheck"><input type="checkbox" id="missedToggle"'+(missedNow?' checked':'')+'> '+icon('review')+' この問題を復習ノートに入れる</label>'+
      '</div>'+
      '<div class="actionrow"><button class="primary" id="btnContinue">つづける →</button></div>';

    if(!isEndless && !isReview) setTimeout(refreshBars, 30);

    Array.prototype.forEach.call(slot.querySelectorAll('.copyable'), function(btn){
      btn.addEventListener('click', function(){
        var text = btn.getAttribute('data-copy');
        var original = btn.innerHTML;
        function flash(){
          btn.classList.add('copied');
          btn.innerHTML = icon('check')+' コピーしました';
          setTimeout(function(){ btn.classList.remove('copied'); btn.innerHTML = original; }, 1200);
        }
        if(navigator.clipboard && navigator.clipboard.writeText){
          navigator.clipboard.writeText(text).then(flash, flash);
        } else {
          var ta = document.createElement('textarea');
          ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
          document.body.appendChild(ta); ta.select();
          try{ document.execCommand('copy'); }catch(e){}
          document.body.removeChild(ta);
          flash();
        }
      });
    });

    document.getElementById('missedToggle').addEventListener('change', function(e){
      if(e.target.checked) progress.missed[state.curQ.qid] = true;
      else delete progress.missed[state.curQ.qid];
      saveProgress(progress);
    });

    document.getElementById('btnContinue').addEventListener('click', function(){
      state.curQ = null;
      if(isEndless){
        var answeredIndex=progress.endless.queue[progress.endless.pos];
        progress.endless.pos++;
        if(progress.settings.endlessBatchSize===0) refreshUnlimitedEndlessQueue(answeredIndex);
        else if(progress.endless.pos >= progress.endless.queue.length) state.screen='endless-result';
        else if(!progress.settings.endlessDiffs || progress.settings.endlessDiffs.length===0){
          refreshRemainingEndlessQueue(answeredIndex);
        }
        saveProgress(progress);
        state.locked = false;
        render();
        return;
      }
      if(isReview){
        state.reviewPos++;
        state.locked = false;
        render();
        return;
      }
      if(state.heroHP<=0){ state.failReason='hero'; state.screen='result-lose'; render(); return; }
      if(state.monsterHP<=0){ state.screen='result-win'; render(); return; }
      state.qIndex++;
      if(state.qIndex >= state.order.length){
        if(state.monsterHP<=0){ state.screen='result-win'; }
        else { state.failReason='outofq'; state.screen='result-lose'; }
        render();
        return;
      }
      state.locked = false;
      render();
    });
  }


  export function refreshBars(){
    var heroBar = document.querySelector('.hpbar.hero i');
    var monBar = document.querySelector('.hpbar.monster i');
    if(heroBar) heroBar.style.transform = 'scaleX('+(state.heroHP/100)+')';
    if(monBar) monBar.style.transform = 'scaleX('+(state.monsterHP/100)+')';
    var nums = document.querySelectorAll('.hpnum .num');
    if(nums[0]) nums[0].textContent = state.heroHP+' / 100';
    if(nums[1]) nums[1].textContent = state.monsterHP+' / 100';
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
    var chosen=document.querySelector('.choicebtn[data-opt="'+idx+'"]');
    if(chosen) chosen.classList.add('chosen');
    Array.prototype.forEach.call(document.querySelectorAll('.choicebtn'), function(b){ b.disabled = true; });
    resolveAnswer(state.curQ.options[idx]);
  }
