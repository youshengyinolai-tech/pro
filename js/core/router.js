/*
 router.js — 画面遷移(state.screen)の一元管理。マップ画面の描画・グローバル学習モード
 トグル・各画面の初期表示とイベント配線をここに集約する。study.js/exercise.jsは
 それぞれの画面のHTML生成と、その画面固有の配線(wireStudy/wireLesson/wireUnitPicker/
 wireQuestionControls)だけを担当し、render()から呼び出される。
*/
import { BASE_STAGES, BOSS_GROUPS, STAGES, TOTAL_STARS, DIFF_BATCH_LABEL, TIER_LABEL } from '../data/questions.js?v=2026072114';
import {
  state, progress, saveProgress, esc, totalStarsEarned, missedCount,
  recommendDifficulty, starString, UNIT_LIST, ENDLESS_POOL,
  shuffle, POOL_INDEX_BY_QID, ensureEndlessQueue, reshuffleEndlessQueue,
  learningActivitySummary, investigatorRank
} from './state.js?v=2026072114';
import { renderStudy, startStudy, wireStudy } from '../components/study.js?v=2026072114';
import { icon, stageIcon } from './icons.js';
import {
  renderLesson, wireLesson, openUnitPicker, renderUnitPicker, wireUnitPicker,
  closeUnitPicker,
  renderBattle, renderEndless, renderEndlessResult, renderQuestionBody, wireQuestionControls,
  startStage, installExerciseKeyboardShortcuts
} from '../components/exercise.js?v=2026072114';
import {
  renderRankingHome, renderRankingRoom, wireRankingHome, wireRankingRoom
} from '../components/ranking.js?v=2026072114';
import { setPlayerName } from './ranking.js?v=2026072114';

  var globalKeyboardReady = false;
  var caseScrollCleanup = null;

  function isEditableTarget(target){
    if(!target || target.nodeType!==1) return false;
    var tag = target.tagName;
    return tag==='INPUT' || tag==='TEXTAREA' || tag==='SELECT' || target.isContentEditable;
  }

  function isInsideEscapeSurface(target){
    return !!(target && target.closest && target.closest('dialog[open], [data-escape-surface]'));
  }

  function closeTopmostEscapeSurface(){
    var overlay = document.querySelector('.codex-overlay');
    if(overlay){
      overlay.remove();
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

  function onGlobalKeydown(event){
    if(event.key==='Enter'){
      if(event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if(isEditableTarget(event.target)) return;
      if(tryAdvanceWithEnter()){
        event.preventDefault();
        event.stopPropagation();
      }
      return;
    }

    if(event.key!=='Escape' && event.key!=='Esc') return;
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

  function hasResumableEndless(e){
    return !!(e && e.queue && e.queue.length > 0 && e.pos < e.queue.length);
  }

  function installGlobalKeyboard(){
    if(globalKeyboardReady) return;
    installExerciseKeyboardShortcuts();
    globalKeyboardReady = true;
  }


  export function renderTopbar(){
    return ''+
    '<div class="topbar">'+
      '<div class="brand"><span class="glyph">⬡</span><div><h1>コード事件捜査局</h1><small>CODE CASE BUREAU // EXAM INVESTIGATION</small></div></div>'+
      '<div class="tally">MISSION SCORE <span class="stars num">'+totalStarsEarned()+' / '+TOTAL_STARS+'</span></div>'+
    '</div>';
  }

  export function renderCodexPanel(){
    var recoLabel = DIFF_BATCH_LABEL[recommendDifficulty(progress.settings.endlessUnits)] || '標準';
    return ''+
    '<section class="codex-panel" aria-label="Codex Panel">'+
      '<div class="codex-panel__header">'+
        '<span class="codex-panel__eyebrow">NEW CODEX PANEL</span>'+
        '<h4>観測ログ</h4>'+
      '</div>'+
      '<div class="codex-panel__body">'+
        '<p>新しい捜査窓口を展開しました。次の観測点をすぐ確認できます。</p>'+
        '<ul>'+
          '<li>未解決事件: '+missedCount()+' 件</li>'+
          '<li>総合評価: '+totalStarsEarned()+' / '+TOTAL_STARS+'</li>'+
          '<li>獲得バッジ: '+getCodexAchievements().filter(function(item){ return item.earned; }).length+' / '+getCodexAchievements().length+' 個</li>'+
          '<li>推奨難易度: '+esc(recoLabel)+'</li>'+
        '</ul>'+
        '<button class="codex-panel__cta" id="btnCodexOpen" type="button">観測を開く</button>'+
      '</div>'+
    '</section>';
  }

  export function renderSoloMomentum(){
    var activity=learningActivitySummary();
    var rank=investigatorRank();
    var collapsed=!!progress.settings.soloCollapsed;
    var missions=activity.missions.map(function(mission){
      var done=mission.value>=mission.target;
      var pct=Math.min(100,Math.round(mission.value/mission.target*100));
      return '<li class="'+(done?'done':'')+'">'+
        '<span class="solo-check">'+(done?icon('check'):'○')+'</span>'+
        '<div><b>'+esc(mission.label)+'</b><small>'+Math.min(mission.value,mission.target)+' / '+mission.target+'</small>'+
          '<span class="solo-mini-bar"><i style="width:'+pct+'%"></i></span></div>'+
      '</li>';
    }).join('');
    var nextText=rank.next
      ? '次の「'+rank.next.name+'」まで '+(rank.next.min-rank.points)+' pt'
      : '最高ランクに到達';
    return '<section class="solo-momentum'+(collapsed?' collapsed':'')+'">'+
      '<div class="solo-head"><div><small>SOLO INVESTIGATION</small><h3>今日の一歩</h3></div>'+
        '<div class="solo-head-actions"><span class="solo-streak">'+icon('spark')+' '+activity.streak+'日</span>'+
          '<button type="button" id="btnSoloCollapse" aria-expanded="'+(!collapsed)+'" aria-label="'+(collapsed?'今日の一歩を展開':'今日の一歩を最小化')+'">'+(collapsed?'＋':'−')+'</button></div></div>'+
      '<div class="solo-content">'+
        '<ul class="solo-missions">'+missions+'</ul>'+
        '<div class="solo-rank"><span><small>現在の階級</small><b>'+esc(rank.name)+'</b></span><strong>'+rank.points+' pt</strong></div>'+
        '<div class="solo-rank-bar"><i style="width:'+rank.percent+'%"></i></div>'+
        '<p>'+esc(nextText)+' ・ 1日最高 '+activity.bestDayCorrect+'正解</p>'+
        (activity.completed===3?'<div class="solo-complete">'+icon('trophy')+' 本日の捜査目標を全達成！</div>':'')+
      '</div>'+
    '</section>';
  }

  export function getCodexAchievements(){
    var achievements = [];
    var stars = totalStarsEarned();
    var clearedCases = Object.keys(progress.stars).filter(function(stId){ return (progress.stars[stId]||0) > 0; }).length;
    var endlessTotal = (progress.endless.correct||0) + (progress.endless.wrong||0);
    var endlessAccuracy = endlessTotal > 0 ? Math.round((progress.endless.correct||0) / endlessTotal * 100) : 0;
    var studyCount = Object.keys(progress.studyCompleted || {}).filter(function(id){ return !!progress.studyCompleted[id]; }).length;
    var medalCount = Object.keys(progress.studyMedal || {}).filter(function(id){ return !!progress.studyMedal[id]; }).length;
    var activity=learningActivitySummary();
    var activeDays=Object.keys((progress.activity&&progress.activity.days)||{}).filter(function(key){
      var day=progress.activity.days[key]||{};
      return (day.answers||0)+(day.studySteps||0)+(day.reviewsCleared||0)>0;
    }).length;
    var reviewsCleared=Object.keys((progress.activity&&progress.activity.days)||{}).reduce(function(total,key){
      return total+((progress.activity.days[key]||{}).reviewsCleared||0);
    },0);
    var rankingRooms=(progress.ranking&&Array.isArray(progress.ranking.rooms))?progress.ranking.rooms:[];
    var largestRoom=rankingRooms.reduce(function(max,room){ return Math.max(max,(room.members||[]).length); },0);
    var rankPoints=investigatorRank().points;
    var perfectUnits = 0;
    Object.keys(progress.unitStats || {}).forEach(function(unit){
      var s = progress.unitStats[unit] || {};
      if((s.correct||0) >= 5 && (s.wrong||0) === 0) perfectUnits++;
    });

    var guide = {
      '初回突破':{how:'いずれかの事件でスターを1個以上獲得する',current:stars,target:1,unit:'個'},
      '序盤制圧':{how:'スターを合計3個獲得する',current:stars,target:3,unit:'個'},
      '中盤の切り札':{how:'スターを合計9個獲得する',current:stars,target:9,unit:'個'},
      '捜査の手応え':{how:'スターを合計15個獲得する',current:stars,target:15,unit:'個'},
      '上級捜査官':{how:'スターを合計20個獲得する',current:stars,target:20,unit:'個'},
      '伝説の実力者':{how:'スターを合計30個獲得する',current:stars,target:30,unit:'個'},
      '完全制覇':{how:'全事件で最大数のスターを集める',current:stars,target:TOTAL_STARS,unit:'個'},
      '半分の証拠':{how:'全事件の半分以上をクリアする',current:clearedCases,target:Math.ceil(STAGES.length/2),unit:'章'},
      '全章制覇':{how:'すべての事件を1回以上クリアする',current:clearedCases,target:STAGES.length,unit:'章'},
      '無傷の捜査':{how:'間違いノートを0件にする',current:missedCount(),target:0,unit:'件',lowerIsBetter:true},
      '短期連勝':{how:'1000本ノックで3問連続正解する',current:progress.endless.bestStreak||0,target:3,unit:'問'},
      '連勝の極意':{how:'1000本ノックで8問連続正解する',current:progress.endless.bestStreak||0,target:8,unit:'問'},
      '連鎖突破':{how:'1000本ノックで15問連続正解する',current:progress.endless.bestStreak||0,target:15,unit:'問'},
      '50本ノック達成':{how:'1000本ノックで累計50問に回答する',current:endlessTotal,target:50,unit:'問'},
      '100本ノック達成':{how:'1000本ノックで累計100問に回答する',current:endlessTotal,target:100,unit:'問'},
      '300本ノック達成':{how:'1000本ノックで累計300問に回答する',current:endlessTotal,target:300,unit:'問'},
      '1000本ノック達成':{how:'1000本ノックで累計1000問に回答する',current:endlessTotal,target:1000,unit:'問'},
      '高精度の捜査':{how:'1000本ノックを20問以上解き、正答率80%以上にする',current:endlessAccuracy,target:80,unit:'%',note:'回答数 '+endlessTotal+' / 20問'},
      '正答率の鬼':{how:'1000本ノックを20問以上解き、正答率90%以上にする',current:endlessAccuracy,target:90,unit:'%',note:'回答数 '+endlessTotal+' / 20問'},
      '学習ログ起動':{how:'学習パートを3章完了する',current:studyCount,target:3,unit:'章'},
      '学びの習慣':{how:'学習パートを6章完了する',current:studyCount,target:6,unit:'章'},
      '証拠を読み切る':{how:'学習パートを10章完了する',current:studyCount,target:10,unit:'章'},
      '学習モード':{how:'ホームで章選択の動作を「証拠を読む」に切り替える',current:progress.settings.studyModeActive?1:0,target:1,unit:'回'},
      '別解採用':{how:'ホームで「別解 採用」をオンにする',current:progress.settings.allowAlt?1:0,target:1,unit:'回'},
      '双方向攻略':{how:'学習モードと別解採用を両方オンにする',current:(progress.settings.studyModeActive?1:0)+(progress.settings.allowAlt?1:0),target:2,unit:'設定'},
      '単元を極めた':{how:'同じ単元で5問以上正解し、誤答0を保つ',current:perfectUnits,target:1,unit:'単元'},
      '弱点を克服':{how:'3単元で5問以上正解し、誤答0を保つ',current:perfectUnits,target:3,unit:'単元'},
      '捜査条件を絞る':{how:'1000本ノックの対象単元を絞り込む',current:(progress.settings.endlessUnits&&progress.settings.endlessUnits.length)?1:0,target:1,unit:'設定'},
      '難易度を見極める':{how:'1000本ノックの難易度を絞り込む',current:(progress.settings.endlessDiffs&&progress.settings.endlessDiffs.length)?1:0,target:1,unit:'設定'},
      '重要度に着目':{how:'1000本ノックの重要度を絞り込む',current:(progress.settings.endlessTiers&&progress.settings.endlessTiers.length)?1:0,target:1,unit:'設定'},
      '勉強の証':{how:'いずれかの学習パートを完了してメダルを獲得する',current:Object.keys(progress.studyMedal||{}).length,target:1,unit:'個'},
      '証拠収集家':{how:'学習メダルを5個集める',current:medalCount,target:5,unit:'個'},
      '資料室の主':{how:'学習メダルを10個集める',current:medalCount,target:10,unit:'個'},
      '現場百問':{how:'通常問題で累計100問正解する',current:Object.keys(progress.unitStats||{}).reduce(function(n,id){return n+(progress.unitStats[id].correct||0);},0),target:100,unit:'問'},
      '復習捜査官':{how:'間違いノートの問題を5問解決する',current:reviewsCleared,target:5,unit:'問'},
      '弱点封鎖':{how:'間違いノートの問題を20問解決する',current:reviewsCleared,target:20,unit:'問'},
      '二日連続出動':{how:'2日連続で学習活動を記録する',current:activity.streak,target:2,unit:'日'},
      '一週間の張り込み':{how:'7日連続で学習活動を記録する',current:activity.streak,target:7,unit:'日'},
      '常連捜査員':{how:'合計30日で学習活動を記録する',current:activeDays,target:30,unit:'日'},
      '捜査会議を設置':{how:'ランキング部屋を1つ作成または参加する',current:rankingRooms.length,target:1,unit:'室'},
      '合同捜査':{how:'5人以上が登録されたランキング部屋に入る',current:largestRoom,target:5,unit:'人'},
      '大規模捜査本部':{how:'10人以上が登録されたランキング部屋に入る',current:largestRoom,target:10,unit:'人'},
      '名乗りを上げる':{how:'ユーザー名を「あなた」以外に変更する',current:(progress.ranking&&progress.ranking.nickname&&progress.ranking.nickname!=='あなた')?1:0,target:1,unit:'回'},
      '事件解析官':{how:'捜査階級ポイントを300pt以上にする',current:rankPoints,target:300,unit:'pt'},
      '首席コード探偵':{how:'捜査階級ポイントを1400pt以上にする',current:rankPoints,target:1400,unit:'pt'},
      'まだ一歩目':{how:'最初の学習や事件捜査を始める前に与えられる記念バッジ',current:(stars+endlessTotal+studyCount)===0?1:0,target:1,unit:'個'}
    };

    function addAchievement(label, rarity, tone, batch, unlockTest){
      var earned = !!(unlockTest);
      var info=guide[label]||{how:'条件を満たすと取得できます',current:earned?1:0,target:1,unit:'回'};
      achievements.push({
        label:label, rarity:rarity || 'common', tone:tone || 'neutral',
        batch:batch || 'base', earned:earned, how:info.how,
        current:info.current, target:info.target, unit:info.unit||'',
        lowerIsBetter:!!info.lowerIsBetter, note:info.note||''
      });
    }

    var batchFlags = {
      base: true,
      standard: stars >= 9 || clearedCases >= 3 || endlessTotal >= 50,
      advanced: stars >= 20 || endlessTotal >= 200 || studyCount >= 6,
      legendary: stars >= TOTAL_STARS || endlessTotal >= 1000 || progress.endless.bestStreak >= 15
    };

    addAchievement('初回突破', 'common', 'good', 'base', stars > 0);
    addAchievement('序盤制圧', 'common', 'good', 'base', stars >= 3);
    addAchievement('中盤の切り札', 'common', 'good', 'standard', stars >= 9);
    addAchievement('捜査の手応え', 'rare', 'good', 'standard', stars >= 15);
    addAchievement('上級捜査官', 'rare', 'good', 'advanced', stars >= 20);
    addAchievement('伝説の実力者', 'epic', 'good', 'advanced', stars >= 30);
    addAchievement('完全制覇', 'legendary', 'good', 'legendary', stars >= TOTAL_STARS);
    addAchievement('半分の証拠', 'common', 'good', 'standard', clearedCases >= Math.ceil(STAGES.length / 2));
    addAchievement('全章制覇', 'rare', 'good', 'advanced', clearedCases >= STAGES.length);
    addAchievement('無傷の捜査', 'rare', 'good', 'advanced', stars > 0 && missedCount() === 0);
    addAchievement('短期連勝', 'common', 'good', 'base', progress.endless.bestStreak >= 3);
    addAchievement('連勝の極意', 'rare', 'good', 'standard', progress.endless.bestStreak >= 8);
    addAchievement('連鎖突破', 'epic', 'good', 'legendary', progress.endless.bestStreak >= 15);
    addAchievement('50本ノック達成', 'common', 'good', 'standard', endlessTotal >= 50);
    addAchievement('100本ノック達成', 'rare', 'good', 'advanced', endlessTotal >= 100);
    addAchievement('300本ノック達成', 'epic', 'good', 'advanced', endlessTotal >= 300);
    addAchievement('1000本ノック達成', 'legendary', 'good', 'legendary', endlessTotal >= 1000);
    addAchievement('高精度の捜査', 'rare', 'good', 'standard', endlessAccuracy >= 80 && endlessTotal >= 20);
    addAchievement('正答率の鬼', 'epic', 'good', 'advanced', endlessAccuracy >= 90 && endlessTotal >= 20);
    addAchievement('学習ログ起動', 'common', 'neutral', 'base', studyCount >= 3);
    addAchievement('学びの習慣', 'common', 'neutral', 'standard', studyCount >= 6);
    addAchievement('証拠を読み切る', 'rare', 'neutral', 'advanced', studyCount >= 10);
    addAchievement('学習モード', 'common', 'neutral', 'base', progress.settings.studyModeActive);
    addAchievement('別解採用', 'common', 'neutral', 'base', progress.settings.allowAlt);
    addAchievement('双方向攻略', 'rare', 'neutral', 'advanced', progress.settings.studyModeActive && progress.settings.allowAlt);
    addAchievement('単元を極めた', 'rare', 'neutral', 'standard', perfectUnits >= 1);
    addAchievement('弱点を克服', 'epic', 'neutral', 'advanced', perfectUnits >= 3);
    addAchievement('捜査条件を絞る', 'common', 'neutral', 'base', !!(progress.settings.endlessUnits && progress.settings.endlessUnits.length));
    addAchievement('難易度を見極める', 'common', 'neutral', 'standard', !!(progress.settings.endlessDiffs && progress.settings.endlessDiffs.length));
    addAchievement('重要度に着目', 'rare', 'neutral', 'advanced', !!(progress.settings.endlessTiers && progress.settings.endlessTiers.length));
    addAchievement('勉強の証', 'common', 'neutral', 'base', !!Object.keys(progress.studyMedal || {}).some(function(id){ return !!progress.studyMedal[id]; }));
    addAchievement('証拠収集家', 'rare', 'neutral', 'study', medalCount>=5);
    addAchievement('資料室の主', 'epic', 'neutral', 'study', medalCount>=10);
    addAchievement('現場百問', 'rare', 'good', 'case', guide['現場百問'].current>=100);
    addAchievement('復習捜査官', 'rare', 'good', 'case', reviewsCleared>=5);
    addAchievement('弱点封鎖', 'epic', 'good', 'case', reviewsCleared>=20);
    addAchievement('二日連続出動', 'common', 'neutral', 'special', activity.streak>=2);
    addAchievement('一週間の張り込み', 'epic', 'neutral', 'special', activity.streak>=7);
    addAchievement('常連捜査員', 'legendary', 'neutral', 'special', activeDays>=30);
    addAchievement('捜査会議を設置', 'common', 'good', 'league', rankingRooms.length>=1);
    addAchievement('合同捜査', 'rare', 'good', 'league', largestRoom>=5);
    addAchievement('大規模捜査本部', 'epic', 'good', 'league', largestRoom>=10);
    addAchievement('名乗りを上げる', 'common', 'neutral', 'league', !!(progress.ranking&&progress.ranking.nickname&&progress.ranking.nickname!=='あなた'));
    addAchievement('事件解析官', 'rare', 'good', 'special', rankPoints>=300);
    addAchievement('首席コード探偵', 'legendary', 'good', 'special', rankPoints>=1400);
    addAchievement('まだ一歩目', 'common', 'neutral', 'base', stars===0 && endlessTotal===0 && studyCount===0);
    var caseLabels=['初回突破','序盤制圧','中盤の切り札','捜査の手応え','上級捜査官','伝説の実力者','完全制覇','半分の証拠','全章制覇','無傷の捜査','単元を極めた','弱点を克服'];
    var studyLabels=['学習ログ起動','学びの習慣','証拠を読み切る','学習モード','勉強の証','証拠収集家','資料室の主'];
    var trainingLabels=['短期連勝','連勝の極意','連鎖突破','50本ノック達成','100本ノック達成','300本ノック達成','1000本ノック達成','高精度の捜査','正答率の鬼','捜査条件を絞る','難易度を見極める','重要度に着目'];
    var leagueLabels=['捜査会議を設置','合同捜査','大規模捜査本部','名乗りを上げる'];
    achievements.forEach(function(item){
      if(caseLabels.indexOf(item.label)!==-1) item.batch='case';
      else if(studyLabels.indexOf(item.label)!==-1) item.batch='study';
      else if(trainingLabels.indexOf(item.label)!==-1) item.batch='training';
      else if(leagueLabels.indexOf(item.label)!==-1) item.batch='league';
      else item.batch='special';
    });
    var demoAllUnlocked=typeof window!=='undefined'&&new URLSearchParams(window.location.search).get('demo')==='all';
    if(demoAllUnlocked){
      achievements.forEach(function(item){
        item.earned=true;
        item.note='全取得デモ表示';
      });
    }
    return achievements;
  }

  function buildCodexShareText(){
    var clearedCases = Object.keys(progress.stars).filter(function(stId){ return (progress.stars[stId]||0) > 0; }).length;
    var achievements = getCodexAchievements().map(function(item){ return item.label; }).join(' / ');
    return 'コード事件捜査局 進捗状況\nユーザー名: '+(progress.ranking.nickname||'あなた')+'\n総合評価: '+totalStarsEarned()+' / '+TOTAL_STARS+'\n解決済みケース: '+clearedCases+' / '+STAGES.length+'\n実績: '+achievements;
  }

  function ensureShowcaseSettings(){
    if(!progress.showcase || typeof progress.showcase!=='object'){
      progress.showcase={achievementLabels:null};
    }
    return progress.showcase;
  }

  function buildCodexShowcaseHtml(){
    var clearedCases = Object.keys(progress.stars).filter(function(stId){ return (progress.stars[stId]||0) > 0; }).length;
    var userName = progress.ranking.nickname || 'あなた';
    var allAchievements=getCodexAchievements();
    var earnedAchievementCount=allAchievements.filter(function(item){ return item.earned; }).length;
    var showcaseSettings=ensureShowcaseSettings();
    if(!Array.isArray(showcaseSettings.achievementLabels) || showcaseSettings.achievementLabels.length!==5){
      var defaults=allAchievements.filter(function(item){ return item.earned; }).slice(0,5).map(function(item){ return item.label; });
      while(defaults.length<5) defaults.push(null);
      showcaseSettings.achievementLabels=defaults;
      saveProgress(progress);
    }
    var achievements = showcaseSettings.achievementLabels.map(function(label,slotIndex){
      var item=allAchievements.filter(function(candidate){ return candidate.label===label&&candidate.earned; })[0];
      if(!item){
        return '<li class="codex-showcase__achievement empty" data-showcase-slot="'+slotIndex+'"><span>実績をここへドロップ</span></li>';
      }
      var rarityClass = 'codex-showcase__achievement--'+(item.rarity || 'common');
      return '<li class="codex-showcase__achievement '+item.tone+' '+rarityClass+'" data-showcase-slot="'+slotIndex+'" draggable="true" data-achievement-label="'+esc(item.label)+'">'+
        '<span>'+esc(item.label)+'</span><button type="button" data-clear-showcase="'+slotIndex+'" aria-label="'+esc(item.label)+'を外す">×</button></li>';
    }).join('');
    var earnedTray=allAchievements.filter(function(item){ return item.earned; }).map(function(item){
      return '<button type="button" class="codex-showcase__source '+item.tone+' codex-showcase__source--'+(item.rarity || 'common')+'" draggable="true" data-showcase-source="'+esc(item.label)+'"><span>'+esc(item.label)+'</span></button>';
    }).join('');
    var headline = totalStarsEarned() >= TOTAL_STARS
      ? '全事件を完全制覇'
      : (clearedCases===0 ? '最初の事件を捜査中' : '全'+STAGES.length+'件中 '+clearedCases+'件を解決済み');
    return ''+
      '<div class="codex-showcase" id="codexShowcase">'+
        '<div class="codex-showcase__header">'+
          '<span class="codex-showcase__eyebrow">PROGRESS STATUS</span>'+
          '<h6>進捗状況</h6>'+
        '</div>'+ 
        '<div class="codex-showcase__body">'+ 
          '<label class="codex-showcase__identity"><span>ユーザー名</span><input id="showcaseUsername" maxlength="16" value="'+esc(userName)+'"></label>'+
          '<div class="codex-showcase__hero">'+
            '<div class="codex-showcase__stamp">★ '+totalStarsEarned()+' / '+TOTAL_STARS+'</div>'+ 
            '<div class="codex-showcase__quote">'+esc(headline)+'</div>'+
          '</div>'+ 
          '<div class="codex-showcase__metrics">'+
            '<div class="codex-showcase__metric"><span>解決済みケース</span><strong>'+clearedCases+' / '+STAGES.length+'</strong></div>'+ 
            '<div class="codex-showcase__metric"><span>未解決イベント</span><strong>'+missedCount()+' 件</strong></div>'+ 
            '<div class="codex-showcase__metric"><span>推奨難易度</span><strong>'+esc(DIFF_BATCH_LABEL[recommendDifficulty(progress.settings.endlessUnits)] || '標準')+'</strong></div>'+ 
            '<div class="codex-showcase__metric"><span>獲得バッジ</span><strong>'+earnedAchievementCount+' / '+allAchievements.length+'</strong></div>'+
          '</div>'+ 
          '<div class="codex-showcase__achievement-head"><span>表示する実績</span><small>下の実績から5枠へドラッグ</small></div>'+
          '<div class="codex-showcase__tray" aria-label="取得済み実績">'+earnedTray+'</div>'+
          '<ul class="codex-showcase__achievements">'+achievements+'</ul>'+
        '</div>'+ 
      '</div>';
  }

  function saveCodexAsImage(app){
    var preview = app.querySelector('#codexShowcase');
    if(!preview) return;
    var canvas = document.createElement('canvas');
    var width = 1200;
    var height = 630;
    var dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    function roundedRect(x, y, w, h, r){
      if(ctx.roundRect){
        ctx.roundRect(x, y, w, h, r);
        return;
      }
      ctx.beginPath();
      ctx.moveTo(x+r, y);
      ctx.arcTo(x+w, y, x+w, y+h, r);
      ctx.arcTo(x+w, y+h, x, y+h, r);
      ctx.arcTo(x, y+h, x, y, r);
      ctx.arcTo(x, y, x+w, y, r);
      ctx.closePath();
    }

    var gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#241a13');
    gradient.addColorStop(1, '#5a2b20');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    for(var i=0;i<12;i++){
      ctx.beginPath();
      ctx.arc(70 + (i % 6) * 210, 110 + Math.floor(i / 6) * 360, 58, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.save();
    ctx.translate(40, 40);
    ctx.fillStyle = '#f3e4bc';
    roundedRect(0, 0, width - 80, height - 80, 34);
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#b78d4d';
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#8d302b';
    ctx.font = 'bold 25px "Hiragino Mincho ProN", serif';
    ctx.fillText('コード事件捜査局', 80, 98);

    ctx.fillStyle = '#2b2318';
    ctx.font = '700 46px "Hiragino Mincho ProN", serif';
    ctx.fillText('進捗状況', 80, 155);

    ctx.fillStyle = '#6b5b3e';
    ctx.font = '600 23px "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.fillText('ユーザー名  ' + (progress.ranking.nickname || 'あなた'), 80, 205);
    ctx.fillText('総合評価  ' + totalStarsEarned() + ' / ' + TOTAL_STARS, 80, 270);
    ctx.fillText('解決済み案件  ' + Object.keys(progress.stars).filter(function(stId){ return (progress.stars[stId]||0) > 0; }).length + ' / ' + STAGES.length, 80, 320);
    ctx.fillText('未解決イベント  ' + missedCount() + ' 件', 80, 370);
    ctx.fillText('推奨難易度  ' + (DIFF_BATCH_LABEL[recommendDifficulty(progress.settings.endlessUnits)] || '標準'), 80, 420);
    var imageAchievements=getCodexAchievements();
    ctx.fillText('獲得バッジ  ' + imageAchievements.filter(function(item){ return item.earned; }).length + ' / ' + imageAchievements.length, 80, 470);

    ctx.fillStyle = '#4f3b24';
    ctx.font = '700 25px "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.fillText('選択した実績', 685, 145);
    var allAchievements = getCodexAchievements();
    var showcaseSettings=ensureShowcaseSettings();
    var selectedAchievementLabels = Array.isArray(showcaseSettings.achievementLabels)
      ? showcaseSettings.achievementLabels
      : [];
    var achievements = selectedAchievementLabels.map(function(label){
      return allAchievements.filter(function(item){ return item.label===label&&item.earned; })[0];
    }).filter(Boolean).slice(0, 5);
    achievements.forEach(function(item, index){
      var y = 205 + index * 64;
      ctx.fillStyle = item.tone === 'good' ? '#8d302b' : '#3f6a8a';
      ctx.fillRect(685, y - 18, 15, 15);
      ctx.fillStyle = '#2b2318';
      ctx.font = '600 22px "Hiragino Kaku Gothic ProN", sans-serif';
      ctx.fillText(item.label, 720, y);
    });

    ctx.fillStyle = '#6b5b3e';
    ctx.font = '600 18px "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.fillText('CODE CASE BUREAU // PROGRESS CARD', 80, 545);

    var link = document.createElement('a');
    link.download = 'コード事件捜査局_進捗.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  function openCodexProgress(app){
    if(!app) return;
    var existing = app.querySelector('.codex-overlay');
    if(existing) existing.remove();
    var clearedCases = Object.keys(progress.stars).filter(function(stId){ return (progress.stars[stId]||0) > 0; }).length;
    var achievementsHtml = [];
    var achievementItems=getCodexAchievements();
    achievementItems.forEach(function(item,index){
      item.detailIndex=index;
    });
    var achievementPageIndex=0;
    var categoryTitles={
      case:'事件捜査',study:'学習記録',training:'連続演習',
      league:'ランキング',special:'特別捜査'
    };
    var rarityOrder=['common','rare','epic','legendary'];
    var rarityTitles={common:'一般バッジ',rare:'希少バッジ',epic:'稀バッジ',legendary:'伝説バッジ'};
    var categoryOrder=['case','study','training','league','special'];
    rarityOrder.forEach(function(rarity){
      var rarityItems=achievementItems.filter(function(item){ return (item.rarity||'common')===rarity; });
      rarityItems.sort(function(a,b){ return categoryOrder.indexOf(a.batch)-categoryOrder.indexOf(b.batch); });
      for(var offset=0;offset<rarityItems.length;offset+=6){
        var pageItems=rarityItems.slice(offset,offset+6);
        var pageTitle='■ '+rarityTitles[rarity]+(rarityItems.length>6?' '+(Math.floor(offset/6)+1):'');
        var pageHtml='<ul class="codex-achievements codex-achievement-page" data-achievement-page="'+achievementPageIndex+'"'+(achievementPageIndex?' hidden':'')+'>'+
          '<li class="codex-achievement-group">'+esc(pageTitle)+'</li>';
        pageItems.forEach(function(item){
          var rarityLabel = item.rarity === 'legendary' ? '【伝説】' : (item.rarity === 'epic' ? '【稀】' : (item.rarity === 'rare' ? '【希少】' : '【一般】'));
          var earnedClass = item.earned ? 'codex-achievement--earned' : 'codex-achievement--locked';
          var dragAttributes = item.earned
            ? ' draggable="true" data-achievement-label="'+esc(item.label)+'"'
            : ' aria-disabled="true"';
          pageHtml+='<li><button type="button" class="codex-achievement '+item.tone+' codex-achievement--'+(item.rarity || 'common')+' '+earnedClass+'" data-achievement-index="'+item.detailIndex+'"'+dragAttributes+'>'+
            '<span>'+esc(rarityLabel)+' '+esc(item.label)+'</span><span class="codex-achievement__batch">'+esc(categoryTitles[item.batch]||'特別捜査')+' · '+esc(item.earned ? '取得済み' : '未取得')+' ›</span></button></li>';
        });
        achievementsHtml.push(pageHtml+'</ul>');
        achievementPageIndex++;
      }
    });
    achievementsHtml = achievementsHtml.join('');
    var shareText = buildCodexShareText();
    var showcaseHtml = buildCodexShowcaseHtml();
    var html = ''+
      '<div class="codex-overlay" role="dialog" aria-modal="true" aria-label="進捗と実績">'+
        '<div class="codex-sheet">'+
          '<button class="codex-sheet__close" id="btnCodexClose" type="button" aria-label="閉じる">×</button>'+
          '<div class="codex-sheet__header">'+
            '<span class="codex-panel__eyebrow">SHAREABLE PROGRESS</span>'+
            '<h4>進捗と実績</h4>'+
          '</div>'+
          '<div class="codex-sheet__grid">'+
            '<section class="codex-card">'+
              '<h5>進捗</h5>'+
              '<ul class="codex-metrics">'+
                '<li><span>総合評価</span><strong>'+totalStarsEarned()+' / '+TOTAL_STARS+'</strong></li>'+
                '<li><span>解決済みケース</span><strong>'+clearedCases+' / '+STAGES.length+'</strong></li>'+
                '<li><span>未解決イベント</span><strong>'+missedCount()+' 件</strong></li>'+
                '<li><span>推奨難易度</span><strong>'+esc(DIFF_BATCH_LABEL[recommendDifficulty(progress.settings.endlessUnits)] || '標準')+'</strong></li>'+
                '<li><span>獲得バッジ</span><strong>'+achievementItems.filter(function(item){ return item.earned; }).length+' / '+achievementItems.length+' 個</strong></li>'+
              '</ul>'+
            '</section>'+
            '<section class="codex-card">'+
              '<h5>実績</h5>'+
              '<div class="codex-achievement-pages">'+achievementsHtml+'</div>'+
              '<div class="codex-achievement-pager">'+
                '<button type="button" id="btnAchievementPrev" aria-label="前の実績ページ">← 前へ</button>'+
                '<span id="achievementPageStatus">1 / '+achievementPageIndex+'</span>'+
                '<button type="button" id="btnAchievementNext" aria-label="次の実績ページ">次へ →</button>'+
              '</div>'+
            '</section>'+
          '</div>'+
          '<div class="codex-share">'+
            '<p class="codex-share__label">進捗状況プレビュー</p>'+
            '<div class="codex-share__preview">'+showcaseHtml+'</div>'+
            '<p class="codex-share__label">共有メッセージ</p>'+
            '<textarea class="codex-share__textarea" readonly>'+esc(shareText)+'</textarea>'+
            '<div class="codex-share__actions">'+
              '<button class="codex-panel__cta" id="btnSaveCodexPhoto" type="button">写真にする</button>'+
              '<button class="codex-panel__cta" id="btnCopyCodexShare" type="button">コピーする</button>'+
              '<button class="codex-panel__secondary" id="btnShareCodex" type="button">共有する</button>'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<div class="codex-achievement-popover" id="achievementPopover" role="tooltip" hidden></div>'+
      '</div>';
    app.insertAdjacentHTML('beforeend', html);

    var sheet = app.querySelector('.codex-sheet');
    if(sheet){ sheet.addEventListener('click', function(event){ event.stopPropagation(); }); }
    function reopenCodexProgressInPlace(){
      var sheetScrollTop=sheet?sheet.scrollTop:0;
      var pageX=window.scrollX;
      var pageY=window.scrollY;
      openCodexProgress(app);
      var reopenedSheet=app.querySelector('.codex-sheet');
      if(reopenedSheet) reopenedSheet.scrollTop=sheetScrollTop;
      window.scrollTo(pageX,pageY);
      requestAnimationFrame(function(){
        var currentSheet=app.querySelector('.codex-sheet');
        if(currentSheet) currentSheet.scrollTop=sheetScrollTop;
        window.scrollTo(pageX,pageY);
      });
    }
    var overlay = app.querySelector('.codex-overlay');
    if(overlay){ overlay.addEventListener('click', function(){ overlay.remove(); }); }
    var closeBtn = app.querySelector('#btnCodexClose');
    if(closeBtn){ closeBtn.addEventListener('click', function(){ overlay.remove(); }); }
    var achievementPopover=app.querySelector('#achievementPopover');
    var achievementPage=0;
    var achievementPages=app.querySelectorAll('[data-achievement-page]');
    var achievementPageStatus=app.querySelector('#achievementPageStatus');
    var achievementPrev=app.querySelector('#btnAchievementPrev');
    var achievementNext=app.querySelector('#btnAchievementNext');
    function showAchievementPage(index){
      achievementPage=Math.max(0,Math.min(achievementPages.length-1,index));
      Array.prototype.forEach.call(achievementPages,function(page,pageIndex){ page.hidden=pageIndex!==achievementPage; });
      if(achievementPageStatus) achievementPageStatus.textContent=(achievementPage+1)+' / '+achievementPages.length;
      if(achievementPrev) achievementPrev.disabled=achievementPage===0;
      if(achievementNext) achievementNext.disabled=achievementPage===achievementPages.length-1;
      if(achievementPopover) achievementPopover.hidden=true;
    }
    if(achievementPrev) achievementPrev.addEventListener('click',function(){ showAchievementPage(achievementPage-1); });
    if(achievementNext) achievementNext.addEventListener('click',function(){ showAchievementPage(achievementPage+1); });
    showAchievementPage(0);
    function achievementDetailHtml(item){
      var remaining;
      if(item.earned) remaining='条件達成済み';
      else if(item.lowerIsBetter) remaining='あと '+Math.max(0,item.current-item.target)+' '+item.unit+'減らす';
      else remaining='あと '+Math.max(0,item.target-item.current)+' '+item.unit;
      var currentText=item.current+' '+item.unit+' / 目標 '+item.target+' '+item.unit;
      return '<span class="codex-achievement-detail__eyebrow">'+esc(item.earned?'UNLOCKED':'HOW TO UNLOCK')+'</span>'+
        '<b>'+esc(item.label)+'</b><p>'+esc(item.how)+'</p>'+
        '<div class="codex-achievement-detail__progress"><span>'+esc(currentText)+'</span><strong>'+esc(remaining)+'</strong></div>'+
        (item.note?'<small>'+esc(item.note)+'</small>':'');
    }
    function positionAchievementPopover(clientX,clientY){
      if(!achievementPopover) return;
      var gap=14;
      var width=achievementPopover.offsetWidth||280;
      var height=achievementPopover.offsetHeight||150;
      var left=clientX+gap;
      var top=clientY+8;
      if(left+width>window.innerWidth-10) left=Math.max(10,clientX-width-gap);
      if(top+height>window.innerHeight-10) top=Math.max(10,window.innerHeight-height-10);
      achievementPopover.style.left=left+'px';
      achievementPopover.style.top=top+'px';
    }
    function showAchievementPopover(button,item,x,y){
      if(!achievementPopover||!item) return;
      achievementPopover.innerHTML=achievementDetailHtml(item);
      achievementPopover.hidden=false;
      Array.prototype.forEach.call(app.querySelectorAll('[data-achievement-index]'), function(other){ other.classList.remove('selected'); });
      button.classList.add('selected');
      if(typeof x!=='number'){
        var rect=button.getBoundingClientRect();
        x=rect.right; y=rect.top;
      }
      positionAchievementPopover(x,y);
    }
    function hideAchievementPopover(button){
      if(achievementPopover) achievementPopover.hidden=true;
      if(button) button.classList.remove('selected');
    }
    var pickedAchievementLabel = null;
    function markPickedAchievement(label){
      pickedAchievementLabel=label;
      Array.prototype.forEach.call(app.querySelectorAll('[data-achievement-index]'), function(candidate){
        candidate.classList.toggle('picked', candidate.getAttribute('data-achievement-label')===label);
      });
      Array.prototype.forEach.call(app.querySelectorAll('[data-showcase-source]'), function(candidate){
        candidate.classList.toggle('picked', candidate.getAttribute('data-showcase-source')===label);
      });
    }
    function placeShowcaseAchievement(slotIndex,label){
      var valid=achievementItems.some(function(item){ return item.earned&&item.label===label; });
      if(!valid) return;
      var showcaseSettings=ensureShowcaseSettings();
      var labels=Array.isArray(showcaseSettings.achievementLabels)
        ? showcaseSettings.achievementLabels.slice(0,5)
        : [null,null,null,null,null];
      while(labels.length<5) labels.push(null);
      labels=labels.map(function(existing,index){ return existing===label&&index!==slotIndex?null:existing; });
      labels[slotIndex]=label;
      showcaseSettings.achievementLabels=labels;
      saveProgress(progress);
      reopenCodexProgressInPlace();
    }
    Array.prototype.forEach.call(app.querySelectorAll('[data-achievement-index]'), function(button){
      var item=achievementItems[parseInt(button.getAttribute('data-achievement-index'),10)];
      if(item.earned){
        button.addEventListener('dragstart', function(event){
          markPickedAchievement(item.label);
          if(event.dataTransfer){
            event.dataTransfer.effectAllowed='move';
            event.dataTransfer.setData('text/plain',item.label);
          }
        });
      }
      button.addEventListener('pointerenter', function(event){
        if(event.pointerType!=='touch') showAchievementPopover(button,item,event.clientX,event.clientY);
      });
      button.addEventListener('pointermove', function(event){
        if(event.pointerType!=='touch'&&achievementPopover&&!achievementPopover.hidden) positionAchievementPopover(event.clientX,event.clientY);
      });
      button.addEventListener('pointerleave', function(event){
        if(event.pointerType!=='touch') hideAchievementPopover(button);
      });
      button.addEventListener('focus', function(){ showAchievementPopover(button,item); });
      button.addEventListener('blur', function(){ hideAchievementPopover(button); });
      button.addEventListener('click', function(event){
        if(item.earned) markPickedAchievement(item.label);
        if(event.pointerType==='touch'||!window.matchMedia('(hover:hover)').matches){
          if(achievementPopover&&!achievementPopover.hidden&&button.classList.contains('selected')) hideAchievementPopover(button);
          else showAchievementPopover(button,item,event.clientX||undefined,event.clientY||undefined);
        }
      });
    });
    Array.prototype.forEach.call(app.querySelectorAll('[data-showcase-source]'), function(button){
      var label=button.getAttribute('data-showcase-source');
      button.addEventListener('dragstart', function(event){
        markPickedAchievement(label);
        if(event.dataTransfer){
          event.dataTransfer.effectAllowed='copy';
          event.dataTransfer.setData('text/plain',label);
        }
      });
      button.addEventListener('click', function(){ markPickedAchievement(label); });
    });
    Array.prototype.forEach.call(app.querySelectorAll('[data-showcase-slot]'), function(slot){
      var slotIndex=parseInt(slot.getAttribute('data-showcase-slot'),10);
      var slotLabel=slot.getAttribute('data-achievement-label');
      if(slotLabel){
        slot.addEventListener('dragstart', function(event){
          markPickedAchievement(slotLabel);
          if(event.dataTransfer){
            event.dataTransfer.effectAllowed='move';
            event.dataTransfer.setData('text/plain',slotLabel);
          }
        });
      }
      slot.addEventListener('dragover', function(event){
        event.preventDefault();
        slot.classList.add('dragover');
        if(event.dataTransfer) event.dataTransfer.dropEffect='move';
      });
      slot.addEventListener('dragleave', function(){ slot.classList.remove('dragover'); });
      slot.addEventListener('drop', function(event){
        event.preventDefault();
        slot.classList.remove('dragover');
        var label=event.dataTransfer?event.dataTransfer.getData('text/plain'):pickedAchievementLabel;
        if(label) placeShowcaseAchievement(slotIndex,label);
      });
      slot.addEventListener('click', function(event){
        if(event.target.closest('[data-clear-showcase]')) return;
        if(pickedAchievementLabel) placeShowcaseAchievement(slotIndex,pickedAchievementLabel);
      });
    });
    Array.prototype.forEach.call(app.querySelectorAll('[data-clear-showcase]'), function(button){
      button.addEventListener('click', function(event){
        event.stopPropagation();
        var slotIndex=parseInt(button.getAttribute('data-clear-showcase'),10);
        var showcaseSettings=ensureShowcaseSettings();
        var labels=Array.isArray(showcaseSettings.achievementLabels)
          ? showcaseSettings.achievementLabels.slice(0,5)
          : [null,null,null,null,null];
        labels[slotIndex]=null;
        showcaseSettings.achievementLabels=labels;
        saveProgress(progress);
        reopenCodexProgressInPlace();
      });
    });
    var showcaseUsername=app.querySelector('#showcaseUsername');
    if(showcaseUsername){
      showcaseUsername.addEventListener('click', function(event){ event.stopPropagation(); });
      showcaseUsername.addEventListener('change', function(){
        setPlayerName(showcaseUsername.value);
        reopenCodexProgressInPlace();
      });
    }
    var copyBtn = app.querySelector('#btnCopyCodexShare');
    if(copyBtn){ copyBtn.addEventListener('click', function(){
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(shareText).then(function(){ copyBtn.textContent = 'コピー済み'; });
      } else {
        copyBtn.textContent = 'コピーできません';
      }
    }); }
    var shareBtn = app.querySelector('#btnShareCodex');
    if(shareBtn){ shareBtn.addEventListener('click', function(){
      if(navigator.share){
        navigator.share({title:'コード事件捜査局 進捗', text:shareText}).catch(function(){});
      } else if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(shareText).then(function(){ shareBtn.textContent = '共有文をコピー'; });
      }
    }); }
    var photoBtn = app.querySelector('#btnSaveCodexPhoto');
    if(photoBtn){ photoBtn.addEventListener('click', function(){
      saveCodexAsImage(app);
      photoBtn.textContent = '保存しました';
      setTimeout(function(){ if(photoBtn){ photoBtn.textContent = '写真にする'; } }, 1400);
    }); }
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
        ? '<span class="studydonebadge">'+icon(medal?'trophy':'check')+' 学習済み</span>'
        : (studyMode ? '<span class="studyhint">'+icon('book')+' 学習パートへ</span>' : '');
      cardsBuf.push(''+
        '<button class="stagecard'+(st.isBoss?' boss':'')+'" data-idx="'+i+'" aria-label="'+esc(st.title)+'">'+
          '<div class="row1"><span class="emoji">'+stageIcon(st.id,st.isBoss)+'</span><span class="idx">'+(st.isBoss?'BOSS NODE':'NODE '+String(i+1).padStart(2,'0'))+'</span></div>'+
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

    return ''+renderTopbar()+'<main class="case-office">'+
      '<aside class="case-sidebar">'+
        '<div class="office-plate"><span>'+icon('target')+'</span><div><small>BUG INVESTIGATION UNIT</small><h2>事件管理簿</h2></div></div>'+
        '<button class="case-nav active"><span>'+icon('archive')+'</span><b>事件一覧</b><small>'+STAGES.length+'件</small></button>'+
        '<button class="case-nav league-nav" id="btnRanking"><span>'+icon('trophy')+'</span><b>ランキング</b><small>ルームで競う</small></button>'+
        '<button class="case-nav" id="btnEndless"><span>'+icon('terminal')+'</span><b>総合捜査</b><small>1000本ノック</small></button>'+
        '<button class="case-nav" id="btnReview2"><span>'+icon('review')+'</span><b>未解決</b><small>'+missedN+'件</small></button>'+
        '<button class="case-nav" id="btnUnitPicker"><span>'+icon('target')+'</span><b>捜査条件</b><small>'+esc(DIFF_BATCH_LABEL[overallReco])+'</small></button>'+
        '<div class="case-stats"><h3>捜査記録</h3><dl><div><dt>解決評価</dt><dd class="num">'+totalStarsEarned()+' / '+TOTAL_STARS+'</dd></div><div><dt>連続正解</dt><dd class="num">'+e.streak+'</dd></div><div><dt>正答率</dt><dd class="num">'+acc+'%</dd></div></dl></div>'+
        '<button class="mode-file '+(studyMode?'study':'quest')+'" id="btnModeToggle" aria-pressed="'+(studyMode?'true':'false')+'"><span>'+icon(studyMode?'book':'sword')+'</span><b>'+(studyMode?'証拠を読む':'推理に挑む')+'</b><small>章選択時の動作</small></button>'+
        '<button class="alt-file'+(progress.settings.allowAlt?' on':'')+'" id="btnAltToggle" aria-pressed="'+(progress.settings.allowAlt?'true':'false')+'">'+
          '<span class="alt-file-label">'+icon(progress.settings.allowAlt?'unlock':'lock')+' 別解 '+(progress.settings.allowAlt?'採用':'不採用')+'</span>'+
          '<span class="alt-switch" aria-hidden="true"><span class="alt-switch-knob"></span></span>'+
        '</button>'+
      '</aside>'+
      '<section class="evidence-board"><header class="board-head"><div><small>ACTIVE CASE FILES</small><h2>プログラム事件一覧</h2></div><p>不具合の証拠を読み、すべての事件を解決せよ。</p></header>'+renderSoloMomentum()+'<div class="case-scroll">'+sectionsHtml+'</div></section>'+
      '<aside class="desk-evidence"><div class="desk-lamp">'+icon('search')+'</div><h3>本日の捜査</h3><p>'+esc(endlessFilterLabel)+'</p><dl><div><dt>連続解決</dt><dd>'+e.streak+'</dd></div><div><dt>最高記録</dt><dd>'+e.bestStreak+'</dd></div></dl>'+
        (hasResumableEndless(e) ? '<button id="btnEndlessResume" class="resume-file">'+icon('review')+' 前回の捜査を再開('+(e.queue.length-e.pos)+'問残り)</button>' : '')+
        '<button id="btnEndlessDesk">捜査を開始</button>'+renderCodexPanel()+'</aside>'+
    '</main><p class="footer-note">捜査記録はこの端末に自動保存されます。</p>';
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
        '<span class="bigemoji">'+icon('check')+'</span><h2>間違いノートは空っぽです</h2>'+
        '<p>今のところ間違えた問題は記録されていません。各章の戦闘や1000本ノックで間違えると、その問題が自動的にここへ集まってきます。</p>'+
        '<div class="resultbtns"><button class="ghost" id="btnMap">地図へ戻る</button></div>'+
      '</div>';
    }
    if(state.reviewPos >= state.reviewQueue.length){
      var remaining = missedCount();
      return ''+ renderTopbar() +
      '<div class="battlebar"><button class="backbtn" id="btnHome">← 地図へ戻る</button></div>'+
      '<div class="frame result">'+
        '<span class="bigemoji">'+icon('review')+'</span><h2>この周の復習が終わりました</h2>'+
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
      '<div class="qmeta"><span>'+icon('review')+' 復習モード <span class="tierbadge t'+state.endlessSrc.tier+'">'+esc(TIER_LABEL[state.endlessSrc.tier])+'</span></span><span>'+esc(state.endlessSrc.srcSub)+'</span></div>'+
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
      ? ('<span class="bigemoji">'+icon('alert')+'</span><h2>ミッション未完了</h2><p>設問はすべて解き終えたが、'+esc(st.mon)+'にはまだ息がある。誤答が多いと決定打が足りない。訓練場で復習してもう一度挑もう。</p>')
      : ('<span class="bigemoji">'+icon('shield')+'</span><h2>戦闘継続不能</h2><p>'+esc(st.mon)+'にHPを削り切られてしまった。訓練場で復習してもう一度挑もう。</p>');
    var body = win ?
      ('<span class="bigemoji">'+icon('trophy')+'</span><h2>'+esc(st.mon)+'を撃破した！</h2><div class="starsline">'+starString(stars)+'</div><p>誤答'+state.wrong+'回で切り抜けた。単元「'+esc(st.sub)+'」はもう怖くない。</p>')
      : failMsg;

    var nextIdx = state.stageIndex+1;
    var hasNext = win && nextIdx < STAGES.length;

    return ''+ renderTopbar() +
    '<div class="frame result">'+
      body+
      '<div class="resultbtns">'+
        '<button class="ghost" id="btnReview">'+icon('book')+' 訓練場で見直す</button>'+
        '<button class="ghost" id="btnRetry">'+(win?'もう一度挑む':'再挑戦する')+'</button>'+
        (hasNext? '<button class="primary" id="btnNext">次の間へ進む →</button>' : '')+
        '<button class="ghost" id="btnMap">地図へ戻る</button>'+
      '</div>'+
    '</div>'+
    (!hasNext && win && nextIdx>=STAGES.length ? '<div class="frame allclear"><h2>'+icon('trophy')+' 全'+STAGES.length+'章 制覇</h2><p>期末試験の範囲をひと通り旅した。総獲得星 <span class="num">'+totalStarsEarned()+' / '+TOTAL_STARS+'</span>。仕上げにもう一周して星を集めよう。</p></div>' : '');
  }


  export function render(){
    var app = document.getElementById('app');
    if(caseScrollCleanup){ caseScrollCleanup(); caseScrollCleanup=null; }
    document.body.classList.toggle('case-map-screen',state.screen==='map');
    if(state.screen==='map'){
      app.innerHTML = renderMap();
      Array.prototype.forEach.call(app.querySelectorAll('.stagecard:not(.locked)'), function(btn){
        btn.addEventListener('click', function(){
          if(btn.disabled) return;
          btn.disabled=true;
          btn.classList.add('opening');
          state.curQ = null;
          var idx = parseInt(btn.getAttribute('data-idx'),10);
          requestAnimationFrame(function(){
            if(progress.settings.studyModeActive) startStudy(idx);
            else openLesson(idx, false);
          });
        });
      });
      var soloCollapse=document.getElementById('btnSoloCollapse');
      if(soloCollapse) soloCollapse.addEventListener('click',function(){
        progress.settings.soloCollapsed=!progress.settings.soloCollapsed;
        saveProgress(progress);
        var panel=soloCollapse.closest('.solo-momentum');
        if(panel) panel.classList.toggle('collapsed',progress.settings.soloCollapsed);
        soloCollapse.textContent=progress.settings.soloCollapsed?'＋':'−';
        soloCollapse.setAttribute('aria-expanded',String(!progress.settings.soloCollapsed));
        soloCollapse.setAttribute('aria-label',progress.settings.soloCollapsed?'今日の一歩を展開':'今日の一歩を最小化');
      });
      var caseOffice=app.querySelector('.case-office');
      var caseScroll=app.querySelector('.case-scroll');
      var scrollIdleTimer=0;
      function markCaseScrolling(){
        if(!caseOffice) return;
        caseOffice.classList.add('is-scrolling');
        clearTimeout(scrollIdleTimer);
        scrollIdleTimer=setTimeout(function(){ caseOffice.classList.remove('is-scrolling'); },120);
      }
      if(caseScroll) caseScroll.addEventListener('scroll',markCaseScrolling,{passive:true});
      window.addEventListener('scroll',markCaseScrolling,{passive:true});
      caseScrollCleanup=function(){
        clearTimeout(scrollIdleTimer);
        if(caseScroll) caseScroll.removeEventListener('scroll',markCaseScrolling);
        window.removeEventListener('scroll',markCaseScrolling);
      };
      document.getElementById('btnModeToggle').addEventListener('click', function(){
        progress.settings.studyModeActive = !progress.settings.studyModeActive;
        saveProgress(progress);
        render();
      });
      var codexOpen = document.getElementById('btnCodexOpen');
      if(codexOpen){ codexOpen.addEventListener('click', function(event){
        event.preventDefault();
        openCodexProgress(app);
      }); }
      document.getElementById('btnEndless').addEventListener('click', function(){
        openEndless();
      });
      document.getElementById('btnRanking').addEventListener('click', function(){
        state.curQ=null; state.screen='ranking'; render();
      });
      document.getElementById('btnEndlessDesk').addEventListener('click', function(){
        openEndless();
      });
      var btnEndlessResume = document.getElementById('btnEndlessResume');
      if(btnEndlessResume) btnEndlessResume.addEventListener('click', function(){
        openEndless();
      });
      document.getElementById('btnAltToggle').addEventListener('click', function(){
        progress.settings.allowAlt = !progress.settings.allowAlt;
        saveProgress(progress);
        this.classList.toggle('on', progress.settings.allowAlt);
        this.setAttribute('aria-pressed', String(progress.settings.allowAlt));
        this.innerHTML =
          '<span class="alt-file-label">'+icon(progress.settings.allowAlt?'unlock':'lock')+
          ' 別解 '+(progress.settings.allowAlt?'採用':'不採用')+'</span>'+
          '<span class="alt-switch" aria-hidden="true"><span class="alt-switch-knob"></span></span>';
      });
      document.getElementById('btnUnitPicker').addEventListener('click', function(){
        openUnitPicker();
      });
      document.getElementById('btnReview2').addEventListener('click', function(){
        openReview();
      });
    } else if(state.screen==='ranking'){
      app.innerHTML = renderRankingHome();
      wireRankingHome(app);
    } else if(state.screen==='ranking-room'){
      app.innerHTML = renderRankingRoom();
      wireRankingRoom(app);
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
      document.getElementById('btnPauseEndless').addEventListener('click', function(){
        saveProgress(progress);
        state.curQ=null; state.screen='map'; render();
      });
      wireQuestionControls(app);
    } else if(state.screen==='endless-result'){
      app.innerHTML = renderEndlessResult();
      document.getElementById('btnHome').addEventListener('click', function(){
        state.curQ=null; state.screen='map'; render();
      });
      document.getElementById('btnEndlessAgain').addEventListener('click', function(){
        state.curQ=null; reshuffleEndlessQueue(); state.screen='endless'; render();
      });
      document.getElementById('btnEndlessSettings').addEventListener('click', function(){
        state.curQ=null; openUnitPicker();
      });
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
  installGlobalKeyboard();
  installExerciseKeyboardShortcuts();
  render();
}
