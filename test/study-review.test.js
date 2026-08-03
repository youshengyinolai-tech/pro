import test from 'node:test';
import assert from 'node:assert/strict';
import './helpers/localstorage-polyfill.js';

const stateModule = await import('../js/core/state.js');
// state.js と同じモジュールURLを使い、実際の画面で厳選済みになったデータを検査する。
const { GENERATED_BEATS } = await import('../js/data/studyBeats.js?v=2026072115');

test('学習モードの確認問題は通常出題に混ざらず、復習用には登録される', function(){
  const studyQid = 'study:w1:0';
  assert.ok(stateModule.REVIEW_ENTRY_BY_QID[studyQid]);
  assert.equal(
    stateModule.ENDLESS_POOL.some(function(entry){ return entry.q.qid===studyQid; }),
    false
  );
});

test('学習モードの誤答IDを間違いノートへ保存できる', function(){
  const studyQid = 'study:w1:0';
  delete stateModule.progress.missed[studyQid];
  stateModule.recordMissed(studyQid, false);
  assert.equal(stateModule.progress.missed[studyQid], true);
  delete stateModule.progress.missed[studyQid];
});

test('学習モードは機械生成109問から、理解確認になる厳選問題だけを出す', function(){
  const quizzes = Object.values(GENERATED_BEATS).flat().map(function(beat){ return beat.quiz; });
  assert.equal(quizzes.length, 56);
  quizzes.forEach(function(quiz){
    assert.equal(new Set(quiz.options).size, quiz.options.length);
    assert.ok(quiz.correct >= 0 && quiz.correct < quiz.options.length);
    assert.ok(String(quiz.q).trim().length > 0);
  });
});
