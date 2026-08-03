/*
 study.js — ゲーミフィケーション学習エンジン。物語形式のビート(studyBeats)を1問ずつ
 提示し、コンボ・EXPバー・達成メダルの演出を管理する。技術的な説明文(story/explain)
 自体はここでは一切生成せず、questions.js/studyBeats.jsにある確認済みの文面をそのまま
 表示するだけに徹する(演出はUI側だけに閉じ込め、内容の正確性はデータ側に委ねる)。
*/
import { STAGES } from '../data/questions.js?v=2026072115';
import { state, progress, saveProgress, esc, MEDAL_RANK, recordLearningActivity, recordMissed } from '../core/state.js?v=2026072115';
import { render, renderTopbar, openLesson } from '../core/router.js?v=2026072115';
import { icon, stageIcon } from '../core/icons.js';

  var resolveStudyBeats = null;
  var studyBeatsPromise = null;

  function loadStudyBeats(){
    if(resolveStudyBeats) return Promise.resolve(resolveStudyBeats);
    if(!studyBeatsPromise){
      studyBeatsPromise=import('../data/studyBeats.js?v=2026072115').then(function(module){
        resolveStudyBeats=module.resolveStudyBeats;
        return resolveStudyBeats;
      });
    }
    return studyBeatsPromise;
  }


  /* 地図の「学習モード」トグルがONの状態で章をクリックすると、この章に入る。
     全13章がresolveStudyBeats()経由でstudyBeats.jsの生成済みビートを持つため、
     通常はrenderStudyFallback()に落ちることは無い(万一ビートが1つも無い場合だけの
     保険として残してある)。いつでも即座に問題パート(訓練場)へトグルで切り替えられる。 */
  export function awardStudyMedal(stId, medal){
    var prev = progress.studyMedal[stId];
    if(!prev || MEDAL_RANK[medal] > MEDAL_RANK[prev]) progress.studyMedal[stId] = medal;
  }

  /* 誤答時、quiz.sourceQuote(正解の根拠になった本文の一文、またはコード行)をそのまま
     引用して見せる。正解の語句がその引用文の中に見つかれば強調表示し、「本文のどこを
     読み返せばよかったか」を視覚的に一目でわかるようにする(外部知識ではなく、
     同じbeat内の本文だけを指し示すやさしいガイダンス)。 */
  function formatInline(text){
    var html = esc(text);
    html = html.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
    html = html.replace(/`(.+?)`/g, '<code>$1</code>');
    return html;
  }

  /* 「教科書なしでもなんとかなる」水準まで拡充したstoryは、
       ## 根本の仕組み / ## コードの1行解説 / ## テストの罠・頻出パターン
     という見出し行(空行区切りの段落の先頭に##)を含む長文になる。認知負荷を下げるため、
     最初のセクション(通常は根本の仕組み。見出しの無い書き出しの段落があればそれも含む)
     だけを最初から開いた「要約」として表示し、それ以降の見出しセクションは<details>/
     <summary>のアコーディオンに包んでタップするまで隠しておく。
     クイズ(quiz.q/sourceQuote)はビルド時にstudyBeats.js側で確定済みの別データであり、
     ここでの開閉状態やHTML構造の変更とは一切連動しないため、アコーディオンの開閉は
     クローズ問題エンジンの採点・正解判定に影響しない。 */
  function renderStoryHtml(text){
    var blocks = String(text).split(/\n\s*\n/).map(function(b){ return b.trim(); }).filter(Boolean);
    var sections = [];
    var current = null;
    blocks.forEach(function(block){
      var heading = block.match(/^##\s*(.+)$/);
      if(heading){
        current = {heading: heading[1].trim(), paras: []};
        sections.push(current);
      } else {
        if(!current){ current = {heading: null, paras: []}; sections.push(current); }
        current.paras.push('<p>'+formatInline(block)+'</p>');
      }
    });

    return sections.map(function(sec, i){
      var bodyHtml = sec.paras.join('');
      var isTrap = !!(sec.heading && (sec.heading.indexOf('罠') !== -1 || sec.heading.indexOf('注意') !== -1));
      if(i === 0){
        // 最初のセクションは要約として常に開いたまま表示する
        var headingHtml = sec.heading ? '<h4'+(isTrap?' class="trap"':'')+'>'+esc(sec.heading)+'</h4>' : '';
        return headingHtml + bodyHtml;
      }
      var label = sec.heading
        ? (isTrap ? icon('alert')+' タップして「'+esc(sec.heading)+'」を確認' : icon('book')+' タップして「'+esc(sec.heading)+'」を表示')
        : icon('book')+' タップして詳細を表示';
      return '<details class="accordion'+(isTrap?' trap':'')+'">'+
        '<summary>'+label+'<span class="chev">▸</span></summary>'+
        '<div class="accordion-body">'+bodyHtml+'</div>'+
      '</details>';
    }).join('');
  }

  function highlightQuote(text, answer){
    var escaped = esc(text);
    var escapedAnswer = answer ? esc(answer) : '';
    if(escapedAnswer && escaped.indexOf(escapedAnswer) !== -1){
      return escaped.split(escapedAnswer).join('<mark class="qhl">'+escapedAnswer+'</mark>');
    }
    return escaped;
  }

  export async function startStudy(idx){
    state.stageIndex = idx;
    state.studyStep = 0;
    state.studyPicked = null;
    state.studyCombo = 0;
    state.studyBestCombo = 0;
    state.studyWrongCount = 0;
    state.screen = 'studyLoading';
    render();
    try{
      await loadStudyBeats();
      if(state.screen!=='studyLoading') return;
      state.screen = 'study';
      render();
    }catch(error){
      console.error('学習データを読み込めませんでした',error);
      if(state.screen!=='studyLoading') return;
      state.screen = 'map';
      render();
      window.alert('学習データを読み込めませんでした。通信を確認して、もう一度お試しください。');
    }
  }

  export function renderStudyLoading(){
    return ''+renderTopbar()+
      '<div class="frame lessonintro"><h2>'+icon('book')+' 学習資料を読み込んでいます…</h2>'+
      '<p>事件一覧の表示を軽くするため、詳しい解説は必要になった時だけ読み込みます。</p></div>';
  }

  export function renderStudyFallback(st){
    if(!progress.studyCompleted[st.id]){
      progress.studyCompleted[st.id] = true;
      saveProgress(progress);
    }
    var cards = st.lesson.map(function(c, i){
      return '<div class="frame lessoncard">'+
        '<div class="lstep">要点 '+(i+1)+' / '+st.lesson.length+'</div>'+
        '<h3>'+esc(c.title)+'</h3>'+
        '<pre class="codeblock">'+esc(c.code)+'</pre>'+
        '<p class="lessonexplain">'+esc(c.explain)+'</p>'+
      '</div>';
    }).join('');
    return ''+ renderTopbar() +
    '<div class="battlebar">'+
      '<button class="backbtn" id="btnStudyBack">← 地図へ戻る</button>'+
      '<button class="togglebtn" id="btnStudyToggle">⇄ 問題パートに切替</button>'+
    '</div>'+
    '<div class="frame lessonintro">'+
      '<h2>'+stageIcon(st.id,st.isBoss)+' 学習ノート — '+esc(st.title)+'</h2>'+
      '<p>'+esc(st.sub)+'の要点を、完成した正しいコードと解説でひと通り確認しよう。この章はまだ物語形式の学習パートを準備中なので、訓練場と同じ要点ノートを学習パートとして表示している。</p>'+
    '</div>'+
    '<div class="lessongrid">'+cards+'</div>'+
    '<div class="frame result">'+
      '<span class="bigemoji">'+icon('check')+'</span><h2>学習ノートを確認しました</h2>'+
      '<p>準備ができたら、問題パートで実際に手を動かして定着させよう。</p>'+
      '<div class="resultbtns">'+
        '<button class="primary" id="btnStudyToChallenge">問題に挑戦する →</button>'+
        '<button class="ghost" id="btnStudyToMap">地図に戻る</button>'+
      '</div>'+
    '</div>';
  }

  export function renderStudy(){
    var st = STAGES[state.stageIndex];
    var beats = resolveStudyBeats(st);
    var total = beats.length;

    if(total === 0) return renderStudyFallback(st);

    if(state.studyStep >= total){
      progress.studyCompleted[st.id] = true;
      var medal = state.studyWrongCount===0 ? 'gold' : (state.studyWrongCount<=2 ? 'silver' : 'bronze');
      awardStudyMedal(st.id, medal);
      saveProgress(progress);
      var medalLabel = {gold:'ノーミス達成 — 完璧な理解です', silver:'好調な仕上がりです', bronze:'学習を修了しました'}[medal];
      return ''+ renderTopbar() +
      '<div class="battlebar">'+
        '<button class="backbtn" id="btnStudyBack">← 地図へ戻る</button>'+
        '<button class="togglebtn" id="btnStudyToggle">⇄ 問題パートに切替</button>'+
      '</div>'+
      '<div class="frame result achieve '+medal+'">'+
        '<span class="bigemoji">'+icon('trophy')+'</span><h2>'+medalLabel+'</h2>'+
        '<p>'+esc(st.sub)+'の急所は仕込み終えた。この勢いのまま、'+esc(st.mon)+'に挑んでみよう。</p>'+
        '<div class="achievestats"><span>誤答 <b>'+state.studyWrongCount+'</b>回</span><span>最高コンボ <b>'+state.studyBestCombo+'</b></span></div>'+
        '<div class="resultbtns">'+
          '<button class="primary" id="btnStudyToChallenge">問題に挑戦する →</button>'+
          '<button class="ghost" id="btnStudyToMap">地図に戻る</button>'+
        '</div>'+
      '</div>';
    }

    var beat = beats[state.studyStep];
    var answered = state.studyPicked !== null;
    var good = answered && state.studyPicked === beat.quiz.correct;
    var expPct = Math.round((state.studyStep/total)*100);
    var dots = beats.map(function(_, i){
      return '<span class="dot'+(i<state.studyStep?' done':'')+(i===state.studyStep?' cur':'')+'"></span>';
    }).join('');
    var comboHtml = (good && state.studyCombo>=2)
      ? '<div class="combobadge">'+icon('spark')+' '+state.studyCombo+' COMBO</div>' : '';

    var quizHtml;
    if(!answered){
      var optsHtml = beat.quiz.options.map(function(opt, i){
        return '<button class="choicebtn studyquizbtn" data-opt="'+i+'">'+esc(opt)+'</button>';
      }).join('');
      quizHtml = '<div class="quizbox"><p class="quizq">'+icon('chip')+' '+esc(beat.quiz.q)+'</p>'+
        '<div class="choicegrid">'+optsHtml+'</div></div>';
    } else {
      var correctAnswerText = beat.quiz.options[beat.quiz.correct];
      var guidanceHtml = (!good && beat.quiz.sourceQuote)
        ? '<div class="guidance">'+
            '<span class="glabel">'+icon('book')+' 本文のここをもう一度確認しよう</span>'+
            '<p class="gquote">'+highlightQuote(beat.quiz.sourceQuote, correctAnswerText)+'</p>'+
          '</div>'
        : '';
      quizHtml = '<div class="quizbox"><p class="quizq">'+icon('chip')+' '+esc(beat.quiz.q)+'</p>'+
        comboHtml+
        '<div class="feedback '+(good?'good':'bad')+'">'+
          '<div class="head">'+icon(good?'check':'alert')+(good ? ' 正解' : ' 惜しい、正解は「'+esc(correctAnswerText)+'」')+'</div>'+
          guidanceHtml+
          '<div class="explain sstory">'+renderStoryHtml(beat.quiz.explain)+'</div>'+
        '</div>'+
        '<div class="actionrow"><button class="primary" id="btnStudyNext">'+(state.studyStep+1<total?'次へ →':'仕上げる →')+'</button></div>'+
      '</div>';
    }

    return ''+ renderTopbar() +
    '<div class="battlebar">'+
      '<button class="backbtn" id="btnStudyBack">← 地図へ戻る</button>'+
      '<button class="togglebtn" id="btnStudyToggle">⇄ 問題パートに切替</button>'+
    '</div>'+
    '<div class="studyexpbar"><div class="studyexpfill" style="width:'+expPct+'%"></div></div>'+
    '<div class="studydots">'+dots+'<span class="studystep">'+(state.studyStep+1)+' / '+total+'</span></div>'+
    '<div class="frame storycard">'+
      '<span class="sicon">'+icon('chip')+'</span>'+
      '<div class="sstory">'+renderStoryHtml(beat.story)+'</div>'+
      '<pre class="codeblock">'+esc(beat.code)+'</pre>'+
    '</div>'+
    quizHtml;
  }

  export function wireStudy(app){
    var studyBack = document.getElementById('btnStudyBack');
    if(studyBack) studyBack.addEventListener('click', function(){ state.screen = 'map'; render(); });
    var studyToggle = document.getElementById('btnStudyToggle');
    if(studyToggle) studyToggle.addEventListener('click', function(){ openLesson(state.stageIndex, false); });
    var studyNext = document.getElementById('btnStudyNext');
    if(studyNext) studyNext.addEventListener('click', function(){
      state.studyStep++; state.studyPicked = null; render();
    });
    var studyToChallenge = document.getElementById('btnStudyToChallenge');
    if(studyToChallenge) studyToChallenge.addEventListener('click', function(){ openLesson(state.stageIndex, false); });
    var studyToMap = document.getElementById('btnStudyToMap');
    if(studyToMap) studyToMap.addEventListener('click', function(){ state.screen = 'map'; render(); });
    Array.prototype.forEach.call(app.querySelectorAll('.studyquizbtn'), function(btn){
      btn.addEventListener('click', function(){
        var st = STAGES[state.stageIndex];
        var beats = resolveStudyBeats(st);
        var beat = beats[state.studyStep];
        var picked = parseInt(btn.getAttribute('data-opt'),10);
        state.studyPicked = picked;
        recordLearningActivity('studySteps',1);
        if(picked === beat.quiz.correct){
          state.studyCombo++;
          if(state.studyCombo > state.studyBestCombo) state.studyBestCombo = state.studyCombo;
        } else {
          state.studyCombo = 0;
          state.studyWrongCount++;
          recordMissed('study:'+st.id+':'+state.studyStep, false);
        }
        saveProgress(progress);
        render();
      });
    });
  }
