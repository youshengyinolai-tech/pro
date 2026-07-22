import './helpers/localstorage-polyfill.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  loadProgress, saveProgress, isStorageWriteLocked,
  STORE_KEY, STORAGE_SCHEMA_VERSION, STORAGE_BACKUP_KEY
} from '../js/core/state.js';

function reset(){
  localStorage.removeItem(STORE_KEY);
  localStorage.removeItem(STORAGE_BACKUP_KEY);
}

test('新規ユーザーはstorageSchemaVersion付きの空の進捗から始まる', function(){
  reset();
  var p = loadProgress();
  assert.equal(p.storageSchemaVersion, STORAGE_SCHEMA_VERSION);
  assert.deepEqual(p.stars, {});
  assert.equal(isStorageWriteLocked(), false);
});

test('schemaVersionを持たない旧データは、既存フィールド・不明フィールドを保持したまま移行される', function(){
  reset();
  var oldData = {unlocked:5, stars:{w1:3,w2:2}, missed:{'w1:qs:0':true}, futureField:'keep-me'};
  localStorage.setItem(STORE_KEY, JSON.stringify(oldData));

  var migrated = loadProgress();
  assert.equal(migrated.storageSchemaVersion, STORAGE_SCHEMA_VERSION);
  assert.equal(migrated.unlocked, 5);
  assert.deepEqual(migrated.stars, {w1:3,w2:2});
  assert.deepEqual(migrated.missed, {'w1:qs:0':true});
  assert.equal(migrated.futureField, 'keep-me');
});

test('初回移行時だけ、移行前の生データをバックアップキーへ複製する', function(){
  reset();
  var oldRaw = JSON.stringify({unlocked:2, stars:{w1:1}});
  localStorage.setItem(STORE_KEY, oldRaw);

  loadProgress();
  assert.equal(localStorage.getItem(STORAGE_BACKUP_KEY), oldRaw);

  // 2回目以降に保存された新しいデータで再度読み込んでも、最初のバックアップは上書きされない。
  saveProgress({unlocked:3, stars:{w1:9}, storageSchemaVersion: STORAGE_SCHEMA_VERSION});
  loadProgress();
  assert.equal(localStorage.getItem(STORAGE_BACKUP_KEY), oldRaw);
});

test('移行は冪等: 複数回読み込んでも進捗が変化しない', function(){
  reset();
  localStorage.setItem(STORE_KEY, JSON.stringify({unlocked:4, stars:{w3:1}}));
  var first = loadProgress();
  saveProgress(first);
  var second = loadProgress();
  assert.deepEqual(second, first);
});

test('壊れたJSONを検知した場合、既存データを上書きせず保存を停止する', function(){
  reset();
  var corrupted = '{not valid json';
  localStorage.setItem(STORE_KEY, corrupted);

  var fallback = loadProgress();
  assert.equal(isStorageWriteLocked(), true);
  assert.deepEqual(fallback.stars, {});

  saveProgress({unlocked:99, stars:{hacked:1}});
  assert.equal(localStorage.getItem(STORE_KEY), corrupted, '破損データが上書きされてはいけない');
});

test('保存データが不正な形(配列や非オブジェクト)の場合も保存を停止する', function(){
  reset();
  localStorage.setItem(STORE_KEY, JSON.stringify([1,2,3]));
  loadProgress();
  assert.equal(isStorageWriteLocked(), true);
});

test('正常なデータを再読み込みすると保存停止が解除される(リロードによる復旧)', function(){
  reset();
  localStorage.setItem(STORE_KEY, '{not valid json');
  loadProgress();
  assert.equal(isStorageWriteLocked(), true);

  localStorage.setItem(STORE_KEY, JSON.stringify({unlocked:1, stars:{}, storageSchemaVersion: STORAGE_SCHEMA_VERSION}));
  loadProgress();
  assert.equal(isStorageWriteLocked(), false);

  saveProgress({unlocked:1, stars:{w1:1}, storageSchemaVersion: STORAGE_SCHEMA_VERSION});
  assert.equal(JSON.parse(localStorage.getItem(STORE_KEY)).stars.w1, 1);
});
