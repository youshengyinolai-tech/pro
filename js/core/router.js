/*
 router.js — 画面遷移(state.screen)の一元管理。マップ画面の描画・グローバル学習モード
 トグル・各画面の初期表示とイベント配線をここに集約する。study.js/exercise.jsは
 それぞれの画面のHTML生成と、その画面固有の配線(wireStudy/wireLesson/wireUnitPicker/
 wireQuestionControls)だけを担当し、render()から呼び出される。
*/
import { BASE_STAGES, BOSS_GROUPS, STAGES, TOTAL_STARS, DIFF_BATCH_LABEL, TIER_LABEL } from '../data/questions.js';
import {
  state, progress, saveProgress, esc, totalStarsEarned, missedCount,
  recommendDifficulty, starString, UNIT_LIST, ENDLESS_POOL,
  shuffle, POOL_INDEX_BY_QID, ensureEndlessQueue
} from './state.js';
import { renderStudy, startStudy, wireStudy } from '../components/study.js';
import { icon, stageIcon } from './icons.js';
import {
  renderLesson, wireLesson, openUnitPicker, renderUnitPicker, wireUnitPicker,
  closeUnitPicker,
  renderBattle, renderEndless, renderQuestionBody, wireQuestionControls,
  startStage, installExerciseKeyboardShortcuts
} from '../components/exercise.js';
import {
  renderRankingHome, renderRankingRoom, wireRankingHome, wireRankingRoom
} from '../components/ranking.js';

  var globalKeyboardReady = false;

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

    var homeBtn = document.getElementById('btnHome');
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
    var continueBtn = document.getElementById('btnContinue');
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
          '<li>推奨難易度: '+esc(recoLabel)+'</li>'+
        '</ul>'+
        '<button class="codex-panel__cta" id="btnCodexOpen" type="button">観測を開く</button>'+
      '</div>'+
    '</section>';
  }

  function getCodexAchievements(){
    var achievements = [];
    var stars = totalStarsEarned();
    var clearedCases = Object.keys(progress.stars).filter(function(stId){ return (progress.stars[stId]||0) > 0; }).length;
    var endlessTotal = (progress.endless.correct||0) + (progress.endless.wrong||0);
    var endlessAccuracy = endlessTotal > 0 ? Math.round((progress.endless.correct||0) / endlessTotal * 100) : 0;
    var studyCount = Object.keys(progress.studyCompleted || {}).filter(function(id){ return !!progress.studyCompleted[id]; }).length;
    var perfectUnits = 0;
    Object.keys(progress.unitStats || {}).forEach(function(unit){
      var s = progress.unitStats[unit] || {};
      if((s.correct||0) >= 5 && (s.wrong||0) === 0) perfectUnits++;
    });

    function addAchievement(label, rarity, tone, batch, unlockTest){
      var earned = !!(unlockTest);
      achievements.push({label:label, rarity:rarity || 'common', tone:tone || 'neutral', batch:batch || 'base', earned:earned});
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
    addAchievement('無傷の捜査', 'rare', 'good', 'advanced', missedCount() === 0);
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
    addAchievement('まだ一歩目', 'common', 'neutral', 'base', achievements.length === 0);
    return achievements;
  }

  function buildCodexShareText(){
    var clearedCases = Object.keys(progress.stars).filter(function(stId){ return (progress.stars[stId]||0) > 0; }).length;
    var achievements = getCodexAchievements().map(function(item){ return item.label; }).join(' / ');
    return 'コード事件捜査局 進捗共有\n総合評価: '+totalStarsEarned()+' / '+TOTAL_STARS+'\n解決済みケース: '+clearedCases+' / '+STAGES.length+'\n実績: '+achievements;
  }

  function buildCodexShowcaseHtml(){
    var clearedCases = Object.keys(progress.stars).filter(function(stId){ return (progress.stars[stId]||0) > 0; }).length;
    var achievements = getCodexAchievements().slice(0, 4).map(function(item){
      var rarityClass = 'codex-showcase__achievement--'+(item.rarity || 'common');
      return '<li class="codex-showcase__achievement '+item.tone+' '+rarityClass+'">'+esc(item.label)+'</li>';
    }).join('');
    var headline = totalStarsEarned() >= TOTAL_STARS
      ? '完全制覇の記録を友達に見せよう'
      : (missedCount() === 0 ? '無傷の捜査記録を自慢しよう' : '次の一歩まで着実に進んでいる');
    return ''+
      '<div class="codex-showcase" id="codexShowcase">'+
        '<div class="codex-showcase__header">'+
          '<span class="codex-showcase__eyebrow">BRAGGING CARD</span>'+ 
          '<h6>友人に自慢する進捗</h6>'+ 
        '</div>'+ 
        '<div class="codex-showcase__body">'+ 
          '<div class="codex-showcase__hero">'+
            '<div class="codex-showcase__stamp">★ '+totalStarsEarned()+' / '+TOTAL_STARS+'</div>'+ 
            '<div class="codex-showcase__quote">“'+esc(headline)+'”</div>'+ 
          '</div>'+ 
          '<div class="codex-showcase__metrics">'+
            '<div class="codex-showcase__metric"><span>解決済みケース</span><strong>'+clearedCases+' / '+STAGES.length+'</strong></div>'+ 
            '<div class="codex-showcase__metric"><span>未解決イベント</span><strong>'+missedCount()+' 件</strong></div>'+ 
            '<div class="codex-showcase__metric"><span>推奨難易度</span><strong>'+esc(DIFF_BATCH_LABEL[recommendDifficulty(progress.settings.endlessUnits)] || '標準')+'</strong></div>'+ 
          '</div>'+ 
          '<ul class="codex-showcase__achievements">'+achievements+'</ul>'+ 
        '</div>'+ 
      '</div>';
  }

  function saveCodexAsImage(app){
    var preview = app.querySelector('#codexShowcase');
    if(!preview) return;
    var canvas = document.createElement('canvas');
    var width = 1080;
    var height = 1600;
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
    for(var i=0;i<14;i++){
      ctx.beginPath();
      ctx.arc(90 + (i % 7) * 140, 180 + Math.floor(i / 7) * 180, 52, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.save();
    ctx.translate(70, 100);
    ctx.fillStyle = '#f3e4bc';
    roundedRect(0, 0, width - 140, height - 200, 38);
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#b78d4d';
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#8d302b';
    ctx.font = 'bold 34px "Hiragino Mincho ProN", serif';
    ctx.fillText('コード事件捜査局', 110, 220);

    ctx.fillStyle = '#2b2318';
    ctx.font = '700 56px "Hiragino Mincho ProN", serif';
    ctx.fillText('友人に自慢する進捗', 110, 290);

    ctx.fillStyle = '#6b5b3e';
    ctx.font = '600 28px "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.fillText('総合評価 ' + totalStarsEarned() + ' / ' + TOTAL_STARS, 110, 380);
    ctx.fillText('解決済み案件 ' + Object.keys(progress.stars).filter(function(stId){ return (progress.stars[stId]||0) > 0; }).length + ' / ' + STAGES.length, 110, 430);
    ctx.fillText('未解決イベント ' + missedCount() + ' 件', 110, 480);
    ctx.fillText('推奨難易度 ' + (DIFF_BATCH_LABEL[recommendDifficulty(progress.settings.endlessUnits)] || '標準'), 110, 530);

    ctx.fillStyle = '#4f3b24';
    ctx.font = '600 28px "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.fillText('実績', 110, 620);
    var achievements = getCodexAchievements().slice(0, 4);
    achievements.forEach(function(item, index){
      var y = 680 + index * 86;
      ctx.fillStyle = item.tone === 'good' ? '#8d302b' : '#3f6a8a';
      ctx.fillRect(110, y - 25, 18, 18);
      ctx.fillStyle = '#2b2318';
      ctx.font = '500 26px "Hiragino Kaku Gothic ProN", sans-serif';
      ctx.fillText(item.label, 150, y);
    });

    ctx.fillStyle = '#6b5b3e';
    ctx.font = '600 24px "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.fillText('この記録を写真にして、友達に見せよう。', 110, 1450);

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
    var grouped = {base:[], standard:[], advanced:[], legendary:[]};
    getCodexAchievements().forEach(function(item){
      if(!grouped[item.batch]) grouped[item.batch] = [];
      grouped[item.batch].push(item);
    });
    ['base','standard','advanced','legendary'].forEach(function(batch){
      if(!grouped[batch] || !grouped[batch].length) return;
      var batchTitle = batch === 'standard' ? '■ 標準バッチ' : (batch === 'advanced' ? '■ 上級バッチ' : (batch === 'legendary' ? '■ 伝説バッチ' : '■ 基礎バッチ'));
      achievementsHtml.push('<li class="codex-achievement-group">'+esc(batchTitle)+'</li>');
      grouped[batch].forEach(function(item){
        var rarityLabel = item.rarity === 'legendary' ? '【伝説】' : (item.rarity === 'epic' ? '【稀】' : (item.rarity === 'rare' ? '【希少】' : '【一般】'));
        var earnedClass = item.earned ? 'codex-achievement--earned' : 'codex-achievement--locked';
        return achievementsHtml.push('<li class="codex-achievement '+item.tone+' codex-achievement--'+(item.rarity || 'common')+' '+earnedClass+'">'+esc(rarityLabel)+' '+esc(item.label)+' <span class="codex-achievement__batch">'+esc(item.earned ? '取得済み' : '未取得')+'</span></li>');
      });
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
              '</ul>'+
            '</section>'+
            '<section class="codex-card">'+
              '<h5>実績</h5>'+
              '<ul class="codex-achievements">'+achievementsHtml+'</ul>'+
            '</section>'+
          '</div>'+
          '<div class="codex-share">'+
            '<p class="codex-share__label">友人に自慢するプレビュー</p>'+
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
      '</div>';
    app.insertAdjacentHTML('beforeend', html);

    var sheet = app.querySelector('.codex-sheet');
    if(sheet){ sheet.addEventListener('click', function(event){ event.stopPropagation(); }); }
    var overlay = app.querySelector('.codex-overlay');
    if(overlay){ overlay.addEventListener('click', function(){ overlay.remove(); }); }
    var closeBtn = app.querySelector('#btnCodexClose');
    if(closeBtn){ closeBtn.addEventListener('click', function(){ overlay.remove(); }); }
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
      '<section class="evidence-board"><header class="board-head"><div><small>ACTIVE CASE FILES</small><h2>プログラム事件一覧</h2></div><p>不具合の証拠を読み、すべての事件を解決せよ。</p></header><div class="case-scroll">'+sectionsHtml+'</div></section>'+
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
        render();
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
