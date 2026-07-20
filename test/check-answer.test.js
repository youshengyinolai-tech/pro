import test from 'node:test';
import assert from 'node:assert/strict';
import { checkAnswer } from '../js/core/state.js';

test('空白・改行・大文字小文字を表記揺れとして吸収する', function(){
  assert.equal(checkAnswer(' COUT << N << ENDL ; ', ['cout<<n<<endl;']), true);
});

test('全角英数字・全角記号・Unicodeマイナスを吸収する', function(){
  assert.equal(checkAnswer('ｉｆ（ｎ＞＝０）｛ｘ＝１；｝', ['if(n>=0){x=1;}']), true);
  assert.equal(checkAnswer('−10', ['-10']), true);
});

test('Markdownのコードブロックを貼り付けても採点できる', function(){
  assert.equal(checkAnswer('```cpp\ncout << n << endl;\n```', ['cout<<n<<endl;']), true);
});

test('std名前空間の明示は意味が同じなら許容する', function(){
  assert.equal(checkAnswer('std::cout<<std::hex<<n;', ['cout<<hex<<n;']), true);
});

test('数値の不要な小数点は許容する', function(){
  assert.equal(checkAnswer('2.0', ['2']), true);
  assert.equal(checkAnswer('2.5', ['2']), false);
});

test('演算子・変数名・数値が変わる誤答は許容しない', function(){
  assert.equal(checkAnswer('a-b', ['a+b']), false);
  assert.equal(checkAnswer('cout<<x;', ['cout<<y;']), false);
  assert.equal(checkAnswer('3', ['2']), false);
});
