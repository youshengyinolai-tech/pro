const INDEXES={w1:[0,1,2,4,5,6],w2:[1,3,5],w3:[3,5,6],w4:[1,5,6],w5:[0,4,5,6,7],w6:[0,5,7],w7:[2,3,4,7],w8:[1,2,3,5],w9:[1,2,4,5,6],wa:[0,4,7],wb:[1,2,3,5,6],py:[0,4,5,10],tk:[0,1,4,5,6,8,9,11]};

function replace(beats,id,index,q,options,sourceQuote){
  var beat=beats[id]&&beats[id][index];
  if(!beat)return;
  beat.quiz={q:q,options:options,correct:0,explain:beat.story,sourceQuote:sourceQuote};
}

export function curateStudyBeats(beats){
  if(beats.__curated)return beats;
  var total=Object.keys(INDEXES).reduce(function(sum,id){return sum+(beats[id]||[]).length;},0);
  if(total<=56){Object.defineProperty(beats,'__curated',{value:true});return beats;}
  replace(beats,'w2',1,'変数aのアドレスをポインタpへ保存する正しい式はどれ？',['p = &a;','*p = a;','p = a;','&p = a;'],'ポインタへ変数のアドレスを入れるときは、アドレス演算子&を使って p = &a; と書きます。');
  replace(beats,'w2',3,'64bit環境でint*とdouble*のサイズが同じになる主な理由は？',['どちらもアドレスを保存するため','intとdoubleが同じ大きさだから','ポインタは値を保存しないから','コンパイラが型を無視するから'],'ポインタは指す先の型ではなく、メモリ上の場所を表すアドレスを保存します。');
  replace(beats,'w3',3,'呼び出し元にある2つのint値を関数内で交換したい。引数として適切なのは？',['int* px, int* py','int px, int py','const int px, const int py','引数は不要'],'呼び出し元の値を書き換えるには、その変数のアドレスをポインタ引数で受け取ります。');
  replace(beats,'w6',5,'構造体へのポインタpからメンバnameへアクセスする正しい書き方は？',['p->name','p.name','*p.name','p::name'],'構造体へのポインタからメンバへアクセスするときは、アロー演算子(->)を使います。');
  replace(beats,'w6',7,'関数内で構造体配列を書き換え、その変更を呼び出し元にも反映させたい。適切な渡し方は？',['配列の先頭を指すポインタを渡す','配列の要素を1個だけ値渡しする','要素数だけを渡す','関数内で同名の配列を作る'],'配列の先頭アドレスを渡せば、関数内から呼び出し元の配列要素を書き換えられます。');
  replace(beats,'w7',2,'引数なしのメンバ関数attackを呼び出す正しい式はどれ？',['hero.attack()','hero.attack','Hero::attack','attack.hero()'],'メンバ関数はオブジェクト名、ドット、関数名、丸括弧の順に hero.attack() と呼び出します。');
  replace(beats,'w7',7,'privateなbool値を外部へ安全に知らせるメソッドとして最も自然なのは？',['bool isAlive()','void setAlive()','int attack()','Hero alive'],'真偽値を問い合わせるメソッドは、isAlive()のようにisで始めると役割が明確になります。');
  replace(beats,'w8',5,'protectedメンバへ直接アクセスできる範囲として正しいものは？',['そのクラスと派生クラスのメンバ関数','mainを含むすべての関数','同じファイル内のすべての関数','クラスの外部だけ'],'protectedメンバはクラス外から直接触れませんが、派生クラスのメンバ関数からはアクセスできます。');
  replace(beats,'py',10,'Pythonの関数定義で*argsを使う目的は？',['任意個の位置引数をタプルで受け取る','ポインタの指す値を読む','引数を必ず1個に制限する','戻り値をリストに変換する'],'*argsは任意の個数の位置引数をまとめてタプルとして受け取ります。');
  Object.keys(INDEXES).forEach(function(id){var src=beats[id]||[];beats[id]=INDEXES[id].map(function(i){return src[i];}).filter(Boolean);});
  Object.defineProperty(beats,'__curated',{value:true});
  return beats;
}
