var ye=[{id:"w1",title:"CASE 01「消えた出力」",sub:"Week1 C++の入出力",emoji:"👺",mon:"何も表示しない男",lesson:[{title:"画面に文字を出す",code:`#include <iostream>
using namespace std;
int main(){
  cout << "Hello World!" << endl;
}`,explain:'coutは画面(コンソール)に文字を出すための「出力ストリーム」というオブジェクトです。ストリームとは「データが流れる川」のようなイメージで、coutは「画面という川の出口」だと考えるとわかりやすいです。<<(出力演算子)を使って、coutの右側に出したい値をどんどんつなげていくと、その値が左から順番に画面に表示されます。この例では文字列"Hello World!"のあとにendlが続いていますが、endlは改行をしたうえで、プログラムが一時的にためている出力データ(バッファ)を確実に画面に反映させる働きをします。C++のプログラムはmain関数の中に書かれた命令が上から順番に実行されるので、この1行が実行された瞬間に画面に文字が現れます。'},{title:"表示形式を変えるマニピュレータ",code:`cout << hex << 255 << endl; // ff
cout << dec << 255 << endl; // 255`,explain:"hex, oct, decは「マニピュレータ」と呼ばれる特別な単語で、coutに<<でつなぐと、その後ろに続く数値の見た目(表示形式)を切り替えることができます。普段私たちが使っている0〜9の数字の数え方が10進数(dec)、0〜7だけを使うのが8進数(oct)、0〜9とa〜fを使うのが16進数(hex)です。コンピュータの内部ではすべて2進数(0と1)でデータが扱われていますが、2進数は人間には読みにくいため、プログラムでは16進数がよく使われます(4桁の2進数がちょうど16進数の1桁に対応するため、読み替えがしやすいのです)。マニピュレータは出力(cout)だけでなく、cin >> hex >> n; のように入力(cin)にもつけることができ、キーボードから入力された文字列を指定した形式の数値として読み取ってくれます。一度hexを指定すると、その後は指定し直すまでずっとその形式が続く点にも注意しましょう。"},{title:"std::を省略する",code:`using namespace std;
// これ以降 std:: を省略できる
cout << "Hi" << endl;`,explain:"C++の標準ライブラリにあるcoutやendlは、正式にはstd::cout、std::endlのように「std::」という接頭辞をつけて書く必要があります。これはcoutやendlがstdという「名前空間(namespace)」に属しているからです。名前空間は、たくさんの人が作ったプログラム部品を組み合わせて使うときに、同じ名前の関数や変数がぶつかってしまわないように整理する「引き出し」や「タグ」のようなものだと考えてください。毎回std::と書くのは面倒なので、プログラムの先頭で using namespace std; と宣言しておくと、それ以降はstd名前空間にあるものをstd::なしでそのまま書けるようになります。ただし大きなプログラムでは複数のライブラリで同じ名前が使われて衝突する可能性があるため、using namespace stdを使わずに毎回std::をつけて書くスタイルが好まれることもあります。"}],qs:[{before:`int main(){
  `,after:` << "Hello World!" << endl;
}`,answers:["cout","std::cout"],explain:'coutはC++が標準で用意している「出力ストリーム」というオブジェクトです。画面(コンソール)に文字や数値を出すための窓口だと考えてください。coutの後ろに<<(出力演算子)をつけて出したい値を書くと、その値が画面に表示されます。<<は複数つなげることもでき、cout << "a" << "b" << endl; のように書けば"a"と"b"が続けて表示されます。もしプログラムの先頭で using namespace std; を書いていなければ、std::cout << ... と、std::をつけて書く必要がある点も覚えておきましょう。cOutのように綴りを間違えるとコンパイルエラーになるので、正確に小文字で cout と書くことが大切です。'},{before:"#include <",after:`>
using namespace std;
int main(){
  cout << "Hi" << endl;
}`,answers:["iostream"],explain:"coutやcin、endlといった画面への入出力に関する機能は、C++の標準ライブラリの中でも「iostream」という部品(ヘッダファイル)にまとめられています。自分のプログラムでこれらの機能を使いたいときは、ファイルの一番上で #include <iostream> と書いて、その部品を読み込む(取り込む)必要があります。includeは英語で「含める・取り込む」という意味です。もしこの1行を書き忘れると、coutなどが「定義されていない」というコンパイルエラーになってしまいます。ちなみに、ファイルの読み書きをしたいときは<fstream>、文字列専用の便利なクラスを使いたいときは<string>というように、機能ごとに読み込むヘッダファイルが分かれているので、目的に応じて必要なヘッダを追加していくのがC++プログラミングの基本の流れです。"},{before:'cout << "10進数表示 " << ',after:" << n << endl; // nを10進数で表示したい",answers:["dec"],explain:"マニピュレータとは、coutに<<でつなげることで、それ以降に出力する数値の表示形式を切り替えられる特別な単語のことです。decは「decimal(10進数)」の略で、私たちが日常生活で使っている0〜9の数字だけを使う数え方のことです。実はマニピュレータを何も指定しなければ、coutは最初からdec(10進数)で数値を表示するようになっています。つまりdecを明示的に指定するのは「これから10進数に戻しますよ」という合図であり、hexやoctで表示形式を変えたあとに元の10進数表示に戻したいときによく使われます。"},{before:'cout << "16進数表示 " << ',after:" << n << endl;",answers:["hex"],explain:"hexは「hexadecimal(16進数)」の略で、0から9の数字に加えてa,b,c,d,e,fの6文字を使い、合計16種類の記号で数を表す方法です。たとえば10進数の255は16進数だとffになります。コンピュータのメモリのアドレスや、色のコード(例:#ff0000)など、2進数と相性が良い場面でよく使われます。マニピュレータは一度指定すると、明示的にdecなどに変更するまでずっとその表示形式が続く「状態を切り替えるスイッチ」のようなものであることも覚えておきましょう。"},{before:'cout << "Hello World!" << ',after:"; // 改行し、かつ画面にすぐ表示したい",answers:["endl"],explain:'endlは「end of line(行の終わり)」の略で、2つの役割を同時にこなす便利なマニピュレータです。1つ目は改行文字を出力すること、2つ目はバッファ(まだ画面に表示されず、プログラム内部に一時的にためられている出力データ)の中身を強制的に画面へ送り出す(flushする)ことです。似たものに"\\n"という改行文字がありますが、"\\n"は改行するだけでflushはしません。通常のプログラムでは違いを意識しなくても動きますが、大量に出力する処理では"\\n"の方が高速に動作することがある、という違いも知っておくと応用が効きます。'},{before:`// std名前空間に属する機能を毎回省略して書けるようにする宣言
`,after:" std;",answers:["using namespace"],explain:"using namespace std; という1行を書いておくと、std(標準)という名前空間に属しているcout, cin, endlなどの機能を、std::という接頭辞を省略してそのまま書けるようになります。これは「std という引き出しの中身を、いちいち住所を書かなくても取り出せるようにする」ことを宣言しているとイメージしてください。namespace(名前空間)は、様々なライブラリで同じ名前の関数や変数が使われていても、名前空間ごとに区別することで名前の衝突(バッティング)を防ぐ仕組みです。学習中のプログラムでは using namespace std; を書いておくと記述がシンプルになりますが、実務では意図しない名前の衝突を避けるため、あえて省略せずにstd::を毎回書くコーディングスタイルもよく使われます。"},{before:"cin >> ",after:" >> n; // nに16進数として入力された値を読み込みたい",answers:["hex"],explain:'マニピュレータは出力用のcoutだけでなく、入力用のcinにもそのまま使うことができます。cin >> hex >> n; と書くと、キーボードから入力された文字列を「16進数の数値」として解釈し、変換した結果をnに代入します。たとえばユーザーが"ff"と入力した場合、nには10進数で255が格納されます。マニピュレータは一度cinに対して指定すると、次にまた別のマニピュレータ(decなど)を指定するまで、その解釈方式がずっと有効なままになる点にも注意しましょう。'},{before:`int age;
cin >> `,after:"; // ageに入力値を読み込む",answers:["age"],explain:"cin >> 変数名; と書くことで、キーボードから入力された値をその変数に読み込めます。cin >> age; はageという変数に入力値を代入する、という意味です。"},{before:`int x = 5;
cout << `,after:" << endl; // xの値を出力する",answers:["x"],explain:'cout << 変数名; と書くと、その変数に入っている値がそのまま画面に出力されます。文字列のように""で囲む必要はありません。'},{before:`#include <iostream>
`,after:`
int main(){
  cout << "Hi" << endl;
}`,lead:"using namespace std;を書く行を補いなさい。",answers:["using namespace std;"],explain:"using namespace std; を書いておくことで、std::を省略してcoutやendlをそのまま使えるようになります。"},{before:`int a = 3, b = 4;
cout << a << " " << `,after:" << endl; // aとbをスペース区切りで出力",answers:["b"],explain:'<<を続けてつなげることで、複数の値をまとめて1行に出力できます。間に" "を挟むことで、aとbの値がスペースで区切られて表示されます。'},{before:`cout << "A" << endl;
cout << `,after:' << endl; // "B"を出力する',answers:['"B"'],explain:'文字列リテラルは""で囲んで書きます。"B"と書けば、そのままBという文字が出力されます。'},{before:`int n;
cin >> n;
cout << `,after:" << endl; // nをそのまま出力する",answers:["n"],explain:"cinで読み込んだ変数nの値を、そのままcoutで出力できます。"},{before:`// 画面に出力するために使うC++の標準オブジェクト名を書きなさい(cin/coutのうち出力用)
`,after:"",answers:["cout"],explain:"coutは画面(コンソール)に文字や数値を出力するための標準オブジェクトです。"},{before:`// キーボードからの入力を受け取るために使うC++の標準オブジェクト名を書きなさい
`,after:"",answers:["cin"],explain:"cinはキーボードからの入力を受け取るための標準オブジェクトです。"}],qsHard:[{type:"debug",before:`#include <iostream>
int main(){
  `,after:` << "Hi" << std::endl;
} // using namespace stdを書かない前提で、正しくstd::を補いなさい`,answers:["std::cout"],explain:"using namespace std; を書いていない場合、coutやendlはstdという名前空間に属しているため、std::coutのようにstd::を明示的につけて書かないとコンパイルエラーになります。省略を許可する宣言をしていない以上、毎回正式な所属先を書く必要があります。"},{type:"choice",code:"cout << hex << 255 << endl;",lead:"このコードの出力結果として正しいものを選びなさい。",options:["ff","100","11111111","377"],answers:["ff"],explain:"hexマニピュレータは、それ以降の数値を16進数で表示します。10進数の255は16進数だとffになります。100は16進数で256を表し(誤り)、11111111は2進数表現、377は8進数表現であり、いずれもhex指定時の出力とは異なります。"},{type:"order",lines:[{label:"A",code:'  cout << "Hi" << endl;'},{label:"B",code:"using namespace std;"},{label:"C",code:"#include <iostream>"},{label:"D",code:"int main(){"},{label:"E",code:"}"}],answers:["C,B,D,A,E"],explain:"C++のプログラムは、必要な機能を#includeで取り込み(C)、using namespace std;で省略記法を有効にし(B)、int main(){ から処理を書き始め(D)、実際の処理を実行して(A)、最後に}で閉じます(E)。この基本構造はどのC++プログラムでも共通しています。"},{type:"debug",before:`int n;
cin >> `,after:" >> n; // 8進数として入力を読み込みたい",answers:["oct"],explain:"マニピュレータは出力だけでなく入力(cin)にも使えます。cin >> oct >> n; と書くと、入力された文字列を8進数として解釈してnに格納します。"},{type:"choice",code:"cout << oct << 8 << endl;",lead:"このコードの出力結果として正しいものを選びなさい。",options:["10","8","1000","9"],answers:["10"],explain:'8進数は0〜7の8種類の記号で数を表すため、10進数の8は8進数では桁が繰り上がって"10"と表記されます。'},{type:"order",lines:[{label:"A",code:"#include <iostream>"},{label:"B",code:"using namespace std;"},{label:"C",code:"int main(){"},{label:"D",code:"  cout << oct << 64 << endl; // 100"},{label:"E",code:"}"}],answers:["A,B,C,D,E"],explain:"ヘッダを取り込み(A)、省略記法を有効にし(B)、main関数を開始し(C)、8進数で出力し(D)、mainを閉じます(E)。10進数の64は8進数だと100になります。"},{type:"debug",before:`cout << hex << 255 << endl;
cout << `,after:" << 255 << endl; // 表示形式を10進数に戻したい",answers:["dec"],explain:"一度hexに切り替えた表示形式は、明示的にdecを指定するまで16進数のままです。10進数表示に戻すにはdecマニピュレータを使います。"},{type:"choice",lead:'endlと"\\n"の違いとして正しいものを選びなさい。',options:['endlは改行に加えてバッファをflushするが、"\\n"は改行のみ',"endlは改行しない",'"\\n"はバッファをflushするがendlはしない',"両者に違いはない"],answers:['endlは改行に加えてバッファをflushするが、"\\n"は改行のみ'],explain:'endlは改行文字の出力とバッファのflush(強制的な画面反映)の2つの役割を持ちますが、"\\n"は改行文字を出力するだけでflushは行いません。'},{type:"order",lines:[{label:"A",code:"int n;"},{label:"B",code:"cin >> n;"},{label:"C",code:"cout << dec << n << endl;"}],answers:["A,B,C"],explain:"変数を宣言し(A)、値を読み込み(B)、10進数で出力します(C)。"},{type:"debug",before:"cout << ",after:" << 255 << endl; // 8進数で表示したい",answers:["oct"],explain:"octマニピュレータを指定すると、それ以降の数値が8進数で表示されます。"},{type:"choice",lead:"using namespace std;を書いた場合の効果として正しいものを選びなさい。",options:["std::を省略して書けるようになる","coutが使えなくなる","main関数が不要になる","iostreamのincludeが不要になる"],answers:["std::を省略して書けるようになる"],explain:"using namespace std;は、std名前空間に属する機能(cout, cin, endlなど)をstd::という接頭辞なしで書けるようにする宣言です。includeの代わりにはなりません。"},{type:"debug",before:`#include <iostream>
using namespace std;
int main(){
  cout << `,after:` << "Hi"; 
} // 改行してすぐ画面に反映させたい(1単語)`,answers:["endl"],explain:"endlは改行に加えてバッファをflush(画面への即時反映)する働きを持つマニピュレータです。"},{type:"order",lines:[{label:"A",code:"#include <iostream>"},{label:"B",code:"using namespace std;"},{label:"C",code:"int main(){"},{label:"D",code:"  int n; cin >> n;"},{label:"E",code:"  cout << hex << n << endl;"},{label:"F",code:"}"}],answers:["A,B,C,D,E,F"],explain:"ヘッダを取り込み(A)、省略記法を有効にし(B)、mainを開始し(C)、値を読み込み(D)、16進数で出力し(E)、mainを閉じます(F)。"},{type:"choice",lead:"マニピュレータを指定しない場合、coutが数値を表示するデフォルトの基数を選びなさい。",options:["10進数","2進数","8進数","16進数"],answers:["10進数"],explain:"coutは何も指定しなければ最初から10進数(dec)で数値を表示します。"},{type:"debug",before:"cout << dec << 10 << oct << 10 << ",after:" << 10 << endl; // 3つ目は16進数で出したい",answers:["hex"],explain:"1つの文の中でも、マニピュレータを何度も切り替えられます。3つ目の10を16進数で出したいのでhexを指定します。"}],qsExtra:[{before:"cout << ",after:" << 255 << endl; // 255を8進数(oct)で表示したい",answers:["oct"],explain:"octは「octal(8進数)」の略で、0〜7の数字だけを使って数を表す方法です。hexが16進数、decが10進数を表す指定子だったのと同じ仲間で、coutに<<でつなぐとそれ以降の数値を8進数で表示するようになります。マニピュレータは一度指定すると、次に別のものを指定するまでずっと有効なままである点はhex/decと共通しています。"},{before:`int a=10,b=255,c=90;
`,after:"",lead:"1つのcout文で、aを10進数→bを16進数→cを10進数の順に続けて出力する行を書きなさい。",answers:["cout<<dec<<a<<hex<<b<<dec<<c<<endl;"],explain:"マニピュレータは指定し直すまでずっと効果が続くので、1つのcout文の途中で何度でも切り替えられます。decでaを10進数表示したあとhexに切り替えてbを16進数表示し、再びdecに戻してcを10進数表示すれば、3つの値をそれぞれ違う基数で1行にまとめて出力できます。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
`,after:`
}`,lead:"標準入力から整数x,yを読み込み、その和を「10進数で1行」「16進数で1行」の順にcoutで出力する処理を書きなさい。",answers:[`int x,y;
cin>>x>>y;
cout<<dec<<x+y<<endl;
cout<<hex<<x+y<<endl;`],explain:"cin>>x>>y;でキーボードから2つの整数をまとめて読み込めます。その和x+yを、まずdecで10進数として1行、続けてhexに切り替えて16進数として1行、それぞれcoutで出力します。読み込みと出力形式の切り替えを1つの処理の中で組み合わせる、この章の集大成のような設問です。"},{type:"debug",long:!0,before:`void showAllBases(int n){
`,after:`
}`,lead:"showAllBases関数の中身に、nを「8進数→10進数→16進数」の順で3行出力する処理を書きなさい。",answers:[`cout<<oct<<n<<endl;
cout<<dec<<n<<endl;
cout<<hex<<n<<endl;`],explain:"oct・dec・hexの3つのマニピュレータを順番に切り替えながら、同じ変数nを3種類の基数で表示します。マニピュレータが「指定し直すまで効果が続くスイッチ」であることを利用すれば、こうして1つの値を複数の形式で連続して出力できます。"},{type:"choice",lead:"using namespace std; を書かない場合、画面に文字を出すために必要な書き方はどれか選びなさい。",options:["std::cout","using std;","#include std","cout::std"],answers:["std::cout"],explain:"coutはstdという名前空間に属しているため、using namespace std; を書いていなければ、std::coutのようにstd::を明示的につけて書く必要があります。「using std;」や「#include std」は文法として存在しない書き方、「cout::std」は順序が逆で意味を持ちません。"},{type:"order",lines:[{label:"A",code:"#include <iostream>"},{label:"B",code:"using namespace std;"},{label:"C",code:"int main(){"},{label:"D",code:`  int n;
  cin >> n;`},{label:"E",code:"  cout << n*2 << endl;"},{label:"F",code:"}"}],lead:"入力した整数を2倍して出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D,E,F"],explain:"includeで機能を取り込み(A)、名前空間の省略を有効にし(B)、main関数を開始し(C)、入力を受け取り(D)、計算結果を出力し(E)、最後にmainを閉じます(F)。取り込みと準備は必ず本体より前に来る必要があります。"},{before:"",after:"",lead:"画面ではなく標準エラー出力に文字を出したいときに使う、coutと対になるストリームの名前を書きなさい。",answers:["cerr","std::cerr"],explain:"cerrは、coutと同じように<<で値をつなげて出力できるストリームですが、通常の出力先(標準出力)とは別の「標準エラー出力」という経路に文字を送ります。エラーメッセージなど、通常の実行結果とは区別して扱いたい情報を出力するときによく使われます。"},{before:`int n;
cin >> hex >> n;
cout << `,after:" << n << endl; // 読み込んだ値を10進数で表示したい",answers:["dec"],explain:"cin >> hex >> n; で読み込んだ時点では、入力形式の指定(hex)はcin側の設定です。coutで表示するときは、coutの表示形式を別途decに指定し直さないと、coutが今どの基数を使っているかは変わりません。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
  int n;
  cin >> n;
`,after:`
  return 0;
}`,lead:'nが0未満なら標準エラー出力(cerr)に"invalid"と出力し、そうでなければ標準出力(cout)にnをそのまま出力する処理を書きなさい。',answers:[`if(n<0){
cerr << "invalid" << endl;
}else{
cout << n << endl;
}`],explain:"if(n<0)で不正な入力かどうかを判定し、不正であればcerrへ、正常であればcoutへ、それぞれ異なる出力先にメッセージや値を送ります。エラーの情報と通常の結果を分けて出力する、実務でもよく使われる考え方です。"},{type:"choice",lead:"改行だけを行い、バッファのflushは行わない書き方はどれか選びなさい。",options:['"\\n"',"endl","cerr","flush"],answers:['"\\n"'],explain:'"\\n"は改行文字そのものを出力するだけで、バッファの強制的な書き出し(flush)は行いません。endlは改行に加えてflushも行う点が異なります。cerrはストリームの名前、flushはflushだけを行うマニピュレータで、どちらも改行はしません。'},{type:"order",lines:[{label:"A",code:"#include <iostream>"},{label:"B",code:"using namespace std;"},{label:"C",code:"int main(){"},{label:"D",code:`  int n;
  cin >> hex >> n;`},{label:"E",code:"  cout << dec << n << endl;"},{label:"F",code:"}"}],lead:"16進数として入力を読み込み、10進数に変換して出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D,E,F"],explain:"includeと名前空間の準備をしてから(A,B)main関数を開始し(C)、hexマニピュレータをつけたcinで16進数として読み込み(D)、decに切り替えたcoutで10進数として表示します(E)。"},{before:'cout << "x=" ',after:" x << endl; // 文字列と変数xをつなげて出力する演算子",answers:["<<"],explain:'<<(出力演算子)は何度でもつなげて書けます。"x=" << x のように書けば、まず文字列"x="が、続けて変数xの中身が、そのまま続けて画面に表示されます。'},{before:`int a,b,c;
`,after:"",lead:"cinで3つの整数a,b,cを一度に読み込む行を書きなさい。",answers:["cin>>a>>b>>c;"],explain:">>(入力演算子)も<<と同じように何度でもつなげて書けます。cin>>a>>b>>c;と書けば、入力された値が順番にa,b,cへ代入されます。"},{before:"char c = ",after:"; // 文字'A'を格納する",answers:["'A'"],explain:`char型の変数に1文字を代入するときは、'A'のようにシングルクォートで囲みます。ダブルクォートで囲む"A"は1文字の文字列(string型やchar配列向け)であり、char型への代入にはシングルクォートを使います。`},{type:"choice",lead:"cin>>a>>b; のように複数の変数をまとめて読み込む場合の入力順として正しいものを選びなさい。",options:["入力した順に左から右のa,bへ代入される","必ずbから先に代入される","スペース区切りでなくても良い","エラーになる"],answers:["入力した順に左から右のa,bへ代入される"],explain:"cin>>a>>b;と書くと、キーボードから入力された値が左に書いた変数から順番に代入されます。複数の値を入力するときは、スペースや改行で区切って入力します。"},{before:`cout << sizeof(int) << endl; // 通常の環境で何バイトか(半角数字)
int intSize = `,after:";",answers:["4"],explain:"int型は多くの環境で4バイト(32ビット)の大きさを持ちます。sizeof(int)はその環境での実際のバイト数を調べる式で、通常の64bit環境でも4を返します(ポインタのサイズ8バイトとは別の話である点に注意)。"},{type:"order",lines:[{label:"A",code:"#include <iostream>"},{label:"B",code:"using namespace std;"},{label:"C",code:"int main(){"},{label:"D",code:`  int a,b;
  cin>>a>>b;`},{label:"E",code:"  cout<<a+b<<endl;"},{label:"F",code:"}"}],lead:"2つの整数を読み込み、その合計を出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D,E,F"],explain:"includeと名前空間の準備をしてから(A,B)main関数を開始し(C)、2つの値を読み込み(D)、その合計を出力します(E)。"},{before:`int score=90;
cout << "点数: " << `,after:" << endl;",answers:["score"],explain:'"点数: "という文字列に続けて、<<で変数scoreをつなげれば、見出しと値を1行にまとめて表示できます。'},{type:"choice",lead:"int型の変数を宣言だけして初期化しない場合の値として正しいものを選びなさい。",options:["不定(ゴミデータ)で予測できない","必ず0になる","必ず-1になる","コンパイルエラーになる"],answers:["不定(ゴミデータ)で予測できない"],explain:"初期化せずに宣言しただけの変数には、その時点でメモリ上にたまたま残っていた値が入っており、実行するたびに変わることがあります。使う前に必ず値を代入するか初期化する習慣が大切です。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
`,after:`
  return 0;
}`,lead:"3つの整数a,b,cをcinで読み込み、その合計をcoutで出力する処理を書きなさい。",answers:[`int a,b,c;
cin>>a>>b>>c;
cout<<a+b+c<<endl;`],explain:"3つの変数を宣言し、cin>>a>>b>>c;でまとめて読み込み、a+b+cの計算結果をそのままcoutで出力します。"},{before:`int n=10;
cout << `,after:" << n << endl; // 何も指定しなくても既定で使われる基数を表すマニピュレータ",answers:["dec"],explain:"coutは何もマニピュレータを指定しなければ、最初から10進数(dec)で数値を表示します。decを明示的に書くのは「hexやoctから10進数表示に戻したいとき」によく使われます。"},{type:"choice",lead:"cinで数値を期待する変数に文字を入力するなど、読み込みに失敗した場合の一般的な挙動として正しいものを選びなさい。",options:["読み込みに失敗した状態のままになり、以降の入力もおかしくなることがある","自動的に0が代入され問題なく続く","プログラムが強制終了する","無視されて次の行に進む"],answers:["読み込みに失敗した状態のままになり、以降の入力もおかしくなることがある"],explain:"cinは読み込みに失敗すると「失敗状態」のフラグが立ち、それ以降の>>による読み込みも正しく行われなくなります。ファイル読み込みでwhile(fin>>...)の終了条件として失敗状態を利用したのと同じ仕組みが、cinでも働いています。"},{before:`int a=3,b=4;
cout << `,after:" << endl; // aとbの積を出力する式",answers:["a*b"],explain:"*(乗算演算子)を使ってa*bと書けば、aとbの積が計算され、その結果をcoutでそのまま出力できます。"},{before:`int n=200;
cout << `,after:" << n << endl; // 200を16進数で表示したい(結果はc8)",answers:["hex"],explain:"hexマニピュレータを指定すると、それ以降の数値が16進数で表示されます。200は16進数でc8になります。"},{before:`int n=64;
cout << `,after:" << n << endl; // 64を8進数で表示したい(結果は100)",answers:["oct"],explain:"octマニピュレータを指定すると8進数表示になります。64は8進数で100になります。"},{before:`int n=31;
cout << `,after:" << n << endl; // 31を16進数で表示したい(結果は1f)",answers:["hex"],explain:"31を16進数にすると1fになります。0〜9のあとa,b,c,d,e,fと続く16進数の表記に慣れておきましょう。"},{before:`int a,b;
cin>>a>>b;
cout << `,after:" << endl; // aとbの和を出力する式",answers:["a+b"],explain:"+演算子でaとbを足し合わせ、その結果をそのまま出力します。"},{before:`int a,b;
cin>>a>>b;
cout << `,after:" << endl; // aからbを引いた差を出力する式",answers:["a-b"],explain:"-演算子でaからbを引いた差を計算し、その結果を出力します。"},{before:`int a,b,c;
cin>>a>>b>>c;
cout << `,after:" << endl; // 3つの値の合計を出す式",answers:["a+b+c"],explain:"+演算子を2回使ってa,b,cすべてを足し合わせた合計を計算します。"},{before:`int a,b;
cin>>a>>b;
cout << `,after:" << endl; // aをbで割った余りを出力する式",answers:["a%b"],explain:"%(剰余演算子)はaをbで割った余りを計算します。割り算の商が欲しいときは/を使います。"},{before:`cout << sizeof(double) << endl; // 通常の環境で何バイトか(半角数字)
int s = `,after:";",answers:["8"],explain:"double型(倍精度浮動小数点数)は多くの環境で8バイトです。int(4バイト)より大きな範囲・精度を扱えます。"},{before:`cout << sizeof(char) << endl; // 通常の環境で何バイトか(半角数字)
int s = `,after:";",answers:["1"],explain:"char型は1文字を表す型で、通常1バイトです。C++の型の中で最も小さいサイズの基本型の1つです。"},{before:`cout << sizeof(bool) << endl; // 通常の環境で何バイトか(半角数字)
int s = `,after:";",answers:["1"],explain:"bool型はtrue/falseの2値しか持たない型ですが、実際のメモリ上では通常1バイトを使って表現されます。"},{before:`cout << sizeof(long) << endl; // 多くの64bit環境で何バイトか(半角数字)
int s = `,after:";",answers:["8"],explain:"long型はintより大きな範囲の整数を扱うための型で、多くの64bit環境では8バイトになります。"},{before:`cout << sizeof(short) << endl; // 通常の環境で何バイトか(半角数字)
int s = `,after:";",answers:["2"],explain:"short型はintより小さい範囲の整数を扱う型で、通常2バイトです。扱う範囲が狭い分、メモリを節約できます。"},{before:`int a=6,b=3;
cout << `,after:" << endl; // aをbで割った商",answers:["a/b"],explain:"/(除算演算子)でaをbで割った商を計算します。int型同士の割り算なので、小数点以下は切り捨てられます。"},{before:`int a=7,b=2;
cout << `,after:" << endl; // aをbで割った余り",answers:["a%b"],explain:"%演算子でaをbで割った余りを計算します。7を2で割ると商3、余り1です。"},{before:`int a=5,b=9;
cout << `,after:" << endl; // aとbの積",answers:["a*b"],explain:"*演算子でaとbの積を計算します。"},{before:`int a=12,b=5;
cout << `,after:" << endl; // aからbを引いた差",answers:["a-b"],explain:"-演算子でaからbを引いた差を計算します。"},{before:`int a=2,b=3,c=4;
cout << `,after:" << endl; // a,b,cすべてを足した合計",answers:["a+b+c"],explain:"+演算子を2回つなげて3つの値をまとめて足し合わせます。"},{before:`int a=5,b=5;
cout << (a`,after:"b) << endl; // aとbが等しいか(1が表示される)",answers:["=="],explain:"==(等価演算子)は2つの値が等しいかどうかを調べ、等しければtrue(1)を返します。"},{before:`int a=3,b=7;
cout << (a`,after:"b) << endl; // aがbより小さいか(1が表示される)",answers:["<"],explain:"<演算子は左の値が右の値より小さいかどうかを調べます。3は7より小さいのでtrue(1)になります。"},{before:`int a=10,b=2;
cout << (a`,after:"b) << endl; // aがbより大きいか(1が表示される)",answers:[">"],explain:">演算子は左の値が右の値より大きいかどうかを調べます。10は2より大きいのでtrue(1)になります。"},{before:`int a=4,b=9;
cout << (a`,after:"b) << endl; // aとbが等しくないか(1が表示される)",answers:["!="],explain:"!=(不等価演算子)は2つの値が等しくないかどうかを調べます。4と9は異なるのでtrue(1)になります。"},{type:"choice",lead:'endlと"\\n"の違いとして正しいものを選びなさい。',options:['endlは改行に加えてバッファをflushする、"\\n"は改行のみ',"endlは改行しない",'"\\n"はflushする、endlはしない',"どちらも全く同じ働きをする"],answers:['endlは改行に加えてバッファをflushする、"\\n"は改行のみ'],explain:'endlは改行文字を出力したうえで、バッファに溜まっている出力を強制的に画面へ送り出す(flushする)働きも持ちます。"\\n"は改行だけを行い、flushはしません。'},{type:"choice",lead:"cinで整数を期待する変数に文字列を入力した場合の一般的な結果として正しいものを選びなさい。",options:["読み込み失敗の状態になる","自動的に0になる","無視されて次に進む","プログラムが必ず終了する"],answers:["読み込み失敗の状態になる"],explain:"cinは期待する型と違うデータを読み込もうとすると失敗状態になり、それ以降の読み込みも正しく行われなくなります。"},{type:"choice",lead:"coutとcerrの主な違いとして正しいものを選びなさい。",options:["出力先が異なる(標準出力と標準エラー出力)","coutは文字列専用、cerrは数値専用","cerrを使うには別のヘッダが必要","coutでは<<が使えない"],answers:["出力先が異なる(標準出力と標準エラー出力)"],explain:"coutとcerrはどちらも<<で値をつなげて出力できる点は同じですが、出力される経路(標準出力か標準エラー出力か)が異なります。どちらも<iostream>で使えます。"},{type:"choice",lead:"1バイトが8ビットであることの説明として正しいものを選びなさい。",options:["1バイトは8個の0/1(ビット)からできている","1バイトは8個の文字からできている","1バイトはビットの8倍の面積を持つ","ビットとバイトは全く同じ単位である"],answers:["1バイトは8個の0/1(ビット)からできている"],explain:"ビットは0か1だけを表せる情報の最小単位です。このビットを8個集めたものが1バイトで、2の8乗=256通りの値を表現できます。"},{type:"order",lines:[{label:"A",code:"#include <iostream>"},{label:"B",code:"using namespace std;"},{label:"C",code:"int main(){"},{label:"D",code:"  int a=3,b=4;"},{label:"E",code:"  cout << a*b << endl;"},{label:"F",code:"}"}],lead:"aとbの積を出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D,E,F"],explain:"includeと名前空間の準備をしてから(A,B)main関数を開始し(C)、変数を用意して(D)、積を計算して出力します(E)。"},{type:"order",lines:[{label:"A",code:"int a,b;"},{label:"B",code:"cin >> a >> b;"},{label:"C",code:"int product = a*b;"},{label:"D",code:"cout << product << endl;"}],lead:"2つの整数を読み込み、その積を出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"変数を宣言し(A)、値を読み込み(B)、積を計算して変数に保存し(C)、最後に出力します(D)。"},{type:"order",lines:[{label:"A",code:"int n;"},{label:"B",code:"cin >> n;"},{label:"C",code:"cout << hex << n << endl;"},{label:"D",code:"cout << dec << n << endl;"}],lead:"nを読み込み、16進数→10進数の順で出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"変数を宣言し(A)、値を読み込み(B)、hexで16進数表示し(C)、decに切り替えて10進数表示します(D)。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
  int a,b,c;
  cin >> a >> b >> c;
`,after:`
  return 0;
}`,lead:"3つの整数のうち最大値を求めてcoutで出力する処理を書きなさい(if文を使ってよい)。",answers:[`int maxVal=a;
if(b>maxVal) maxVal=b;
if(c>maxVal) maxVal=c;
cout<<maxVal<<endl;`],explain:"maxValをaで仮に設定し、bとcがそれより大きければ更新していきます。最終的にmaxValには3つの中の最大値が残ります。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
  int a,b;
  cin >> a >> b;
`,after:`
  return 0;
}`,lead:"aとbのうち小さい方をcoutで出力する処理を書きなさい。",answers:[`if(a<b){
cout<<a<<endl;
}else{
cout<<b<<endl;
}`],explain:"a<bが成立すればaを、そうでなければ(bの方が小さいか等しい場合)bを出力します。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
  int n;
  cin >> n;
`,after:`
  return 0;
}`,lead:'nが偶数なら"even"、奇数なら"odd"と出力する処理を書きなさい。',answers:[`if(n%2==0){
cout<<"even"<<endl;
}else{
cout<<"odd"<<endl;
}`],explain:"n%2==0で偶数かどうかを判定し、条件に応じて異なる文字列を出力します。"},{before:"int ",after:" = 1, b = 2, c = 3; // 1行でa,b,cを宣言・初期化する",answers:["a"],explain:"カンマで区切ることで、1つの型宣言の中に複数の変数をまとめて宣言・初期化できます。"},{before:"double x = 1.5, ",after:" = 2.5; // yも同じ行で宣言・初期化する",answers:["y"],explain:"double x = 1.5, y = 2.5; のように、カンマで区切って2つ目以降の変数も同じ型でまとめて宣言できます。"},{before:`// 1行で3つの変数を全て0で初期化する書き方
int `,after:"=0,y=0,z=0;",answers:["x"],explain:"カンマ区切りで複数の変数を1行にまとめて宣言・初期化できる書き方の練習です。"},{before:'cout << "1行目',after:'2行目" << endl; // \\nで改行を挟む',answers:["\\n"],explain:"\\nは改行を表すエスケープシーケンスで、文字列の途中に挟むことでその位置で改行できます。"},{before:'cout << "a',after:'b" << endl; // タブ文字を挟む(\\t)',answers:["\\t"],explain:"\\tはタブ文字を表すエスケープシーケンスです。文字列の途中に挟むと、その位置に一定の空白(タブ)が入ります。"},{before:"",after:" int MAX = 100; // 値を変更できない定数として宣言する",lead:"MAXを定数として宣言する行の先頭に補う語を書きなさい。",answers:["const"],explain:"constをつけて宣言した変数は、後から値を変更しようとするとコンパイルエラーになる「定数」になります。"},{before:`const int SIZE = 10;
SIZE = `,after:"; // これを実行しようとするとどうなるか(「エラー」とだけ答えなさい)",answers:["エラー"],explain:"constをつけて宣言した変数に後から代入しようとすると、コンパイルエラーになります。「一度決めたら変更できない」というのがconstの役割です。"}],qsExpert:[{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
  int n;
  cin >> n;
`,after:`
  return 0;
}`,lead:"nを読み込み、「10進数:値」「16進数:値」という見出し付きの2行を出力する処理を書きなさい。",answers:[`cout << "10進数:" << dec << n << endl;
cout << "16進数:" << hex << n << endl;`],explain:'coutは文字列と数値を<<で自由につなげられるので、"10進数:"という見出しの直後にdecで整形した値を続けて出力できます。同じ要領でhexに切り替えた2行目も書きます。'},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
  int sum = 0;
`,after:`
  cout << hex << sum << endl;
  return 0;
}`,lead:"3回繰り返し、cinで読み込んだ値をsumに加算していく処理(for文)を書きなさい。",answers:[`for(int i=0;i<3;i++){
int n;
cin >> n;
sum += n;
}`],explain:"for文を3回まわし、そのたびにcinで新しい値nを読み込んではsumに足し込んでいきます。ループを抜けたあとのsumには3つの値の合計が入っており、それを最後にhexで表示します。"},{type:"debug",long:!0,before:"",after:"",lead:"#include<iostream>とusing namespace std;を書いたうえで、2つの整数x,yを読み込み、大きい方をdecで1行、続けてx,yそれぞれをhexで1行ずつ出力するmain関数一式を書きなさい。",answers:[`#include <iostream>
using namespace std;
int main(){
int x,y;
cin>>x>>y;
int maxVal=x;
if(y>maxVal) maxVal=y;
cout<<dec<<maxVal<<endl;
cout<<hex<<x<<endl;
cout<<hex<<y<<endl;
return 0;
}`],explain:"maxValをひとまずxとしておき、yの方が大きければmaxValを更新する、というW4で学ぶ「最大値探し」と同じ考え方です。その後、決まったmaxValをdecで、元のx,yをそれぞれhexで出力します。1つのプログラムの中でも複数回マニピュレータを切り替えられることを確認しましょう。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
`,after:`
  return 0;
}`,lead:"1から5までの整数を1つずつ、奇数のときは10進数、偶数のときは16進数で出力するfor文を書きなさい(%演算子で偶数・奇数を判定できます)。",answers:[`for(int i=1;i<=5;i++){
if(i%2==0) cout<<hex<<i<<endl;
else cout<<dec<<i<<endl;
}`],explain:"%(剰余演算子)はi%2のように書くと「iを2で割った余り」を計算します。余りが0なら偶数、そうでなければ奇数と判定できるので、if(i%2==0)で偶数のときだけhex表示、else(それ以外、つまり奇数)のときはdec表示、と条件分岐します。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
  int n;
  cin >> n;
`,after:`
  return 0;
}`,lead:"nが負の数なら「負の数です」と出力し、そうでなければ8進数→10進数→16進数の順で3行出力する処理を書きなさい。",answers:[`if(n<0){
cout << "負の数です" << endl;
}else{
cout<<oct<<n<<endl;
cout<<dec<<n<<endl;
cout<<hex<<n<<endl;
}`],explain:"if(n<0)でまず負の数かどうかを判定し、負ならエラーめいたメッセージだけを出力して処理を終えます。それ以外(elseの中)では、これまで学んだoct・dec・hexの3つのマニピュレータを順番に使って同じ値を3種類の基数で表示します。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
  int n;
  cin >> hex >> n;
`,after:`
  return 0;
}`,lead:"16進数として読み込んだnを、10進数に変換して1行出力する処理を書きなさい。",answers:["cout << dec << n << endl;"],explain:"cin >> hex >> n; によってnには16進数として解釈された値が格納されています。あとはdecマニピュレータで出力するだけで、値そのものは変わらず表示形式だけが10進数に切り替わります。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
void showAllBases(int n){
`,after:`
}`,lead:"showAllBasesの中身に、nを8進数・10進数・16進数の順で3行出力する処理を書きなさい。",answers:[`cout<<oct<<n<<endl;
cout<<dec<<n<<endl;
cout<<hex<<n<<endl;`],explain:"これまで学んだ3つのマニピュレータ(oct, dec, hex)を1つの関数の中にまとめておくと、同じ変換処理を何度も呼び出して再利用できます。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
  int total=0;
  int n;
`,after:`
  cout << hex << total << endl;
  return 0;
}`,lead:"0が入力されるまでcinで値を読み込み続けてtotalに加算するwhile文を書きなさい(0はtotalに加算しない)。",answers:[`cin >> n;
while(n != 0){
total += n;
cin >> n;
}`],explain:"先に1回cin>>nを行い、その値が0でない間はループの中でtotalに加算しながら次の値を読み込み続けます。0が入力された時点でループの条件を満たさなくなり終了します。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
  int a,b,c;
  cin >> a >> b >> c;
`,after:`
  return 0;
}`,lead:"a,b,cのうち最小値をdecで、最大値をhexで、それぞれ1行ずつ出力する処理を書きなさい。",answers:[`int minVal=a, maxVal=a;
if(b<minVal) minVal=b;
if(c<minVal) minVal=c;
if(b>maxVal) maxVal=b;
if(c>maxVal) maxVal=c;
cout<<dec<<minVal<<endl;
cout<<hex<<maxVal<<endl;`],explain:"aを仮の最小値・最大値としておき、bとcのそれぞれと比較しながら更新していく、W4で学ぶ最大値・最小値探しと同じ考え方です。求まった値をdecとhexでそれぞれ表示します。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
`,after:`
  return 0;
}`,lead:"1から10までの整数のうち、3の倍数だけを16進数で、それ以外を10進数で出力するfor文を書きなさい。",answers:[`for(int i=1;i<=10;i++){
if(i%3==0) cout<<hex<<i<<endl;
else cout<<dec<<i<<endl;
}`],explain:"i%3==0で3の倍数かどうかを判定し、条件に応じてhexとdecを使い分けて出力します。"},{type:"debug",long:!0,before:"",after:"",lead:'std::を省略せずに(using namespace stdを書かずに)、"Result: "という文字列とint型変数resultの値を16進数で1行出力するmain関数一式を書きなさい(resultは10で初期化してよい)。',answers:[`#include <iostream>
int main(){
int result=10;
std::cout << "Result: " << std::hex << result << std::endl;
return 0;
}`],explain:"using namespace std;を書いていない場合、cout・hex・endlはすべてstd::を明示的につける必要があります。マニピュレータも例外ではなくstd::hexのように書きます。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
  int values[5];
  int sum=0;
`,after:`
  cout << dec << sum << endl;
  cout << hex << sum << endl;
  return 0;
}`,lead:"5個の値をcinで配列valuesに読み込みながら、同時にsumに加算していくfor文を書きなさい。",answers:[`for(int i=0;i<5;i++){
cin >> values[i];
sum += values[i];
}`],explain:"読み込みと集計を同じループの中で同時に行うことで、配列に値を保存しつつ合計も求められます。求まったsumを最後にdecとhexで出力します。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
  int n;
  cin >> oct >> n;
`,after:`
  return 0;
}`,lead:"8進数として読み込んだnを、10進数と16進数の両方で1行ずつ出力する処理を書きなさい。",answers:[`cout << dec << n << endl;
cout << hex << n << endl;`],explain:"cin >> oct >> n; で8進数として解釈された値がnに格納されます。あとはdecとhexで順番に出力するだけです。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
  int x;
  cin >> x;
  cout << "hex:" << hex << x << " dec:" << dec << x << endl;
`,after:`
  return 0;
}`,lead:'既存の1行では同じ行の中でhexとdecを切り替えて出力している。それに続けて、"oct:"という見出し付きでoct表示の1行を出力する処理を書きなさい。',answers:['cout << "oct:" << oct << x << endl;'],explain:"マニピュレータは1つの文の中で何度でも切り替えられます。同じ考え方をもう1行追加し、oct表示の値を見出し付きで出力します。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
  int n;
  cin >> n;
  int sum=0;
  int evenCount=0;
`,after:`
  cout << hex << sum << endl;
  cout << dec << evenCount << endl;
  return 0;
}`,lead:"nに読み込んだ個数ぶんcinで値を読み込みながら、合計をsumに、偶数の個数をevenCountに、同時に集計するfor文を書きなさい。",answers:[`for(int i=0;i<n;i++){
int x;
cin >> x;
sum += x;
if(x%2==0) evenCount++;
}`],explain:"1回の読み込みで得た値xを、合計への加算(sum+=x)と偶数判定(x%2==0)の両方に同時に使うことで、1つのループで2種類の集計を同時に行えます。求まった2つの値を最後にhexとdecでそれぞれ表示します。"}],qsDrag:[{type:"dragfill",lead:"空欄1が16進数出力、空欄2が10進数出力になるよう、正しいピースをドラッグ(またはタップ)して配置しなさい。",lines:[{code:"void showBoth(int n){"},{blank:"b1"},{blank:"b2"},{code:"}"}],pieces:[{id:"p1",code:"cout << hex << n << endl;"},{id:"p2",code:"cout << dec << n << endl;"},{id:"p3",code:"cout << oct << n << endl;"}],answerMap:{b1:"p1",b2:"p2"},explain:"空欄1にはhexで16進数表示する行を、空欄2にはdecで10進数表示する行を配置します。p3(oct)は8進数表示になってしまうため、この問題では使いません。"}]},{id:"w2",title:"CASE 02「存在しない住所」",sub:"Week2 ポインタと参照",emoji:"💀",mon:"住所だけ残して消えた男",lesson:[{title:"アドレスとポインタ",code:`int a = 10;
int* p = &a;   // pはaのアドレスを持つ
cout << p << endl;   // aのアドレス
cout << *p << endl;  // aの中身(10)`,explain:"コンピュータのメモリは、1バイトごとに「住所」がついた広大な棚のようなものです。変数を宣言すると、この棚のどこかにその変数専用の場所が確保され、値が保管されます。&(アドレス演算子)を変数の前につけると「その変数が棚の何番地に置かれているか」を調べることができ、これを「アドレス」と呼びます。int* pのように型の後ろに*をつけて宣言した変数は「ポインタ」と呼ばれ、住所(アドレス)だけを保管する専用の箱です。p = &a; と書くとpの中には「aの住所」が入ります。そして*p(間接参照)と書くと、逆に「pに書かれた住所の場所に実際に何が置かれているか」を覗きに行くことができます。&で住所を調べ、*でその住所の中身を見に行く、この2つはペアで使う演算子だと覚えておくと理解しやすくなります。"},{title:"参照(別名)",code:`int a = 10;
int& x = a;  // xはaの別名
x = 20;
cout << a << endl; // 20`,explain:"参照(リファレンス)は、すでにある変数につける「別名(あだ名)」のようなものです。int& x = a; と書くと、xという新しい変数が作られるのではなく、xはaと全く同じメモリ上の場所を指す別名になります。そのためxに値を代入するとaの中身も一緒に変わりますし、逆にaを変えるとxを読んだときの値も変わります。ポインタと似ていますが、参照は宣言と同時に必ず初期化しなければならず(int& x; だけの宣言はエラーになります)、一度ある変数の別名になったら、後で別の変数を指すように変更することもできません。この「一度決めたらずっとそのまま」という性質が、ポインタとの大きな違いです。"},{title:"ポインタのサイズ",code:"cout << sizeof(int*) << endl; // 8 (64bit環境)",explain:"ポインタは「どの型を指すか」に関わらず、中身は「アドレス(住所)」という数値を保存しているだけです。現在主流の64bit環境では、メモリの住所を表現するのに64ビット=8バイトの情報量が必要になるため、int型を指すポインタでもdouble型を指すポインタでも、ポインタ変数自体のサイズは常に8バイトになります(int自体は4バイト、double自体は8バイトというように「指す先」のサイズは型によって違いますが、それとポインタ自体のサイズは別の話です)。"}],qs:[{before:`int a;
int`,after:" p = &a; // aのアドレスを指すポインタ変数pを宣言",answers:["*"],explain:"変数の型の後ろに*をつけると「ポインタ型」になります。ポインタとは「住所(アドレス)」を保管できる箱のようなものです。int* p; は「int型変数のアドレスを格納できる変数pを宣言する」という意味になります。int* pでもint *pでも意味は同じで、どちらも「pという名前のint型ポインタ変数」を宣言しています。宣言した直後のポインタは、まだどこも指していない(あるいはどこか不明な場所を指している)危険な状態なので、続けて &変数名 を代入してあげる必要があります。"},{before:`int a = 10;
cout << `,after:"a << endl; // aのアドレスを表示したい",answers:["&"],explain:"&(アドレス演算子)を変数の前につけると、その変数がメモリ上のどこに置かれているか、つまり「アドレス(住所)」を取得できます。&aは「aのアドレス」という意味で、実行するたびに0x7ff...のような16進数の値が表示されます(この値はプログラムを実行するたびに変わることがあります)。この&は、ポインタ変数にアドレスを代入するとき(int* p = &a;)にも同じ記号を使うので、「アドレスを取り出す記号は&」としっかり覚えておきましょう。"},{before:`int a = 10;
int* p = &a;
cout << `,after:"p << endl; // pが指す先にある実際の値(10)を表示したい",answers:["*"],explain:"*(間接参照演算子、デリファレンス演算子)をポインタ変数の前につけると、そのポインタに書かれているアドレスの場所まで実際に見に行き、そこに置かれている「実際の値」を取り出せます。pにはaのアドレスが入っているので、*pは「pが指す場所、つまりaの中身」を意味し、結果として10が表示されます。&(アドレスを取る)と*(アドレス先の値を取る)はちょうど逆の働きをするペアの演算子なので、セットで覚えておくと混乱しにくくなります。"},{before:`int a = 5;
int`,after:" x = a; // aの別名(参照)としてxを宣言",answers:["&"],explain:"型の後ろに&をつけると「参照」という、別の変数の別名(あだ名)を作れます。int& x = a; と書くとxはaの別名になり、xを変更するとaの中身も一緒に変わります。参照はポインタと違って*で中身を取り出す必要がなく、普通の変数と同じ感覚でそのまま使えるのが特徴です。ただし参照は宣言と同時に必ず初期化する必要があり(int& x; だけではエラーになります)、一度どの変数の別名になるかが決まったら、後から別の変数に結びつけ直すこともできません。"},{before:`// pをaのアドレスで初期化しながら宣言する(望ましい書き方)
int* p = `,after:";",answers:["&a"],explain:"int* p; とだけ書いてすぐに使うと、pの中には何が入っているか分からない状態(ゴミデータ)になっており、そのまま*pで中身を読もうとすると、プログラムが予期しない場所のメモリを触ってしまい、クラッシュ(異常終了)する原因になります。これを避けるため、ポインタは宣言と同時に正しいアドレスで初期化しておくのが望ましいとされています。int* p = &a; と書けば、変数aのアドレスをその場でpに代入でき、pは最初から「aを指している」安全な状態になります。指す先がまだ決まっていない場合は、nullptr(何も指していないことを表す特別な値)で初期化しておく方法もあります。"},{before:`// 64bitマシンでのポインタ変数(int*など)のサイズは何バイトか、半角数字で答えなさい
int pointerSize = `,after:";",answers:["8"],explain:"現在主流の64bitマシンでは、メモリ上のすべての住所(アドレス)を表現するために64ビット=8バイトの情報を使います。ポインタ変数はまさにこの「住所そのもの」を保管する箱なので、そのサイズは指し示す先のデータの型がintであろうとdoubleであろうと関係なく、常に8バイトになります。一方でint自体は4バイト、double自体は8バイトというように、扱うデータそのもののサイズは型ごとに違います。「ポインタのサイズ」と「指している先のデータのサイズ」は別の話だという点を混同しないようにしましょう。"},{before:`// 1バイトは何ビットか、半角数字で答えなさい
int bitsPerByte = `,after:";",answers:["8"],explain:"コンピュータの世界では、1バイト(byte)は8ビット(bit)と決められています。ビット(bit)は「0」か「1」だけを表せる、情報の最小単位です。電球のスイッチが「オン」か「オフ」の2状態しか持たないのと同じイメージです。このビットを8個集めてひとまとめにしたものが1バイトで、8個の0/1の組み合わせなので2の8乗=256通りの値を表現できます(これがchar型が256通りの値を表せる理由でもあります)。バイトは、データの大きさを表すときの基本的な単位として、int型は4バイト、ポインタは8バイトというように、いろいろな型のサイズを説明する際によく登場します。"},{before:`int b = 20;
int* q = &b;
cout << *q << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["20"],explain:"*qはqが指す先(b)の値を表すので、bの値である20が出力されます。"},{before:`int x = 7;
int& y = x;
cout << y << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい(yはxの別名)。",answers:["7"],explain:"yはxの別名(参照)なので、yを読み取ると実際にはxの値(7)がそのまま出力されます。"},{before:`int a = 1;
int* p = &a;
*p = 99;
cout << a << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい(ポインタ経由で書き換えた)。",answers:["99"],explain:"*p = 99;はpが指す先(a)に99を書き込むので、aの値も99に変わります。"},{before:`int a = 10;
int* p = nullptr;
p = `,after:"; // aのアドレスを代入する",answers:["&a"],explain:"ポインタにアドレスを代入するときは&をつけます。&aは「aのアドレス」を意味します。"},{before:`int x = 5;
int& r = x;
r = 10;
cout << x << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい(rを変えるとxも変わる)。",answers:["10"],explain:"rはxの別名なので、rに10を代入するとxそのものが10に変わります。"},{before:`// アドレス(住所)を保管する変数の型を何と呼ぶか(カタカナで)
`,after:"",answers:["ポインタ"],explain:"アドレス(住所)を保管する変数の型をポインタと呼びます。"},{before:`// 別の変数の別名として振る舞う仕組みを何と呼ぶか(カタカナで)
`,after:"",answers:["参照"],explain:"別の変数の別名(あだ名)として振る舞う仕組みを参照(リファレンス)と呼びます。"}],qsHard:[{type:"debug",before:`int a = 10;
int* p = &a;
cout << `,after:" << endl; // pの指す先の値(10)を表示したいのに、住所が表示されてしまうバグを直しなさい",answers:["*p"],altAnswers:["p[0]"],explain:"pそのものを出力すると、pに入っている「aの住所(アドレス)」が表示されてしまいます。pが指す先の実際の値を見るには、間接参照演算子*をつけて*pと書く必要があります。&(住所を取る)と*(住所先の値を取る)は逆の働きをするペアだと覚えておきましょう。(別解: p[0]も*pと同じ値を指しますが、授業では扱っていません)"},{type:"choice",lead:"int* p; と宣言しただけで、どこも指すように初期化していないとき、*pを読むとどうなるか選びなさい。",options:["不定な値を読み、実行時に問題を起こす可能性がある","必ず0が表示される","コンパイルエラーになる","pは自動的にnullptrになる"],answers:["不定な値を読み、実行時に問題を起こす可能性がある"],explain:"初期化されていないポインタの中身はゴミデータ(どこを指しているか分からない値)です。そのまま*pで読み書きしようとすると、プログラムが予期しない場所のメモリに触れてしまい、クラッシュなど不安定な動作の原因になります。だからこそポインタは宣言と同時に正しいアドレス(またはnullptr)で初期化するのが望ましいとされています。"},{type:"order",lines:[{label:"A",code:"int t = *px;"},{label:"B",code:"void swap(int* px, int* py){"},{label:"C",code:"*px = *py;"},{label:"D",code:"*py = t;"},{label:"E",code:"}"}],answers:["B,A,C,D,E"],explain:"関数の中身を書く前にまず関数の宣言行(B)が必要です。その後、pxが指す先の値を一時変数tに退避し(A)、pxの指す先にpyの指す先の値を上書きし(C)、最後にpyの指す先にtを書き戻す(D)ことで、2つの変数の中身が入れ替わります。"},{before:`int a = 5;
int* p = &a;
cout << sizeof(p) << endl; // `,after:"",lead:"64bit環境での出力される値を半角数字で書きなさい(ポインタ変数自体のサイズ)。",answers:["8"],explain:"ポインタ変数自体は「アドレス」という数値を保持するだけなので、指す先の型に関わらず64bit環境では常に8バイトになります。"},{type:"choice",lead:"int& x; のように、参照を初期化せずに宣言しようとするとどうなるか選びなさい。",options:["コンパイルエラーになる","xは自動的にどこかの変数を指す","xはnullptrとして扱われる","xはint型の0になる"],answers:["コンパイルエラーになる"],explain:"参照は「すでにある変数の別名」なので、宣言と同時に必ずどの変数の別名になるかを指定しなければなりません。初期化せずに宣言しようとするとコンパイルエラーになります。"},{type:"order",lines:[{label:"A",code:"void swapRef(int& x, int& y){"},{label:"B",code:"  int t = x;"},{label:"C",code:"  x = y;"},{label:"D",code:"  y = t;"},{label:"E",code:"}"}],answers:["A,B,C,D,E"],explain:"関数の宣言行(A)のあと、xの値を一時変数tに退避し(B)、xにyの値を上書きし(C)、最後にyにtを書き戻します(D)。参照は普通の変数と同じ感覚で読み書きできるので、*や&を使わずに書けます。"},{before:`int a=5, b=5;
cout << (&a == &b) << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい(異なる変数なので)。",answers:["0"],explain:"aとbは値が同じ5でも、メモリ上では別々の場所に置かれた異なる変数です。そのため&aと&bは異なるアドレスになり、比較結果はfalse(=0)になります。"},{type:"choice",lead:"ポインタpが変数aを指しているとき、*p = 5; の意味として正しいものを選びなさい。",options:["pが指す先(a)の値を5にする","pそのものの住所を5にする","pをnullptrにする","aのアドレスを5にする"],answers:["pが指す先(a)の値を5にする"],explain:"*p = 5;は、pに書き込むのではなく、pが指している先(この場合a)の値を5に書き換えます。"},{before:`int a = 10;
`,after:" = a; // aの別名としてxという参照を宣言する行",answers:["int& x"],explain:"型の後ろに&をつけてint& x = a;と書くことで、xはaの別名(参照)になります。"},{type:"order",lines:[{label:"A",code:"int a = 10;"},{label:"B",code:"int* p = nullptr;"},{label:"C",code:"p = &a;"},{label:"D",code:"cout << *p << endl; // 10"}],answers:["A,B,C,D"],explain:"変数を宣言し(A)、まずはnullptrで安全に初期化しておいたポインタを用意し(B)、あとからaのアドレスを代入し(C)、最後に*pで値を読み取ります(D)。"},{before:`int* p = nullptr;
if(p != nullptr){
  cout << *p << endl;
}else{
  cout << `,after:` << endl;
} // ポインタが無効なことを伝えるメッセージ`,answers:['"ポインタが無効です"'],explain:"pがnullptr(何も指していない)の場合は、*pで値を読もうとせず、代わりにエラーめいたメッセージを出力するのが安全なパターンです。"},{type:"choice",lead:"参照(reference)がポインタと違い、一度初期化した後にできないことは何か選びなさい。",options:["別の変数を指すように結びつけ直すこと","値を読み取ること","関数の引数として渡すこと","printで表示すること"],answers:["別の変数を指すように結びつけ直すこと"],explain:"ポインタはp = &b;のように途中で指す先を変更できますが、参照は一度ある変数の別名になったら、後から別の変数の別名に変更することはできません。"},{before:`int a = 10;
int* p;
p = `,after:"; // aのアドレスを代入する正しい書き方",answers:["&a"],explain:"ポインタにアドレスを代入するときは&をつけます。&aは「aのアドレス」を意味します。"},{type:"order",lines:[{label:"A",code:"int a = 10;"},{label:"B",code:"int* p = &a;"},{label:"C",code:"cout << *p << endl; // 10"}],answers:["A,B,C"],explain:"変数を宣言し(A)、そのアドレスでポインタを初期化し(B)、*pで指す先の値を読み取ります(C)。"},{type:"choice",lead:"sizeof(int*)とsizeof(double*)の関係として正しいものを選びなさい。",options:["同じ64bit環境なら基本的に同じサイズになる(どちらもアドレスを保持するだけだから)","sizeof(double*)の方が必ず大きい","sizeof(int*)の方が必ず大きい","型ごとに全く関係のないサイズになる"],answers:["同じ64bit環境なら基本的に同じサイズになる(どちらもアドレスを保持するだけだから)"],explain:"ポインタが保持しているのは指す先の型に関わらず「アドレス」という数値だけなので、同じ環境であればint*でもdouble*でもポインタ自体のサイズは変わりません。"}],qsExtra:[{before:"int* p = ",after:"; // まだどこも指していないことを表す、ポインタの安全な初期化に使う特別な値",answers:["nullptr"],explain:"ポインタを宣言しても指す先がまだ決まっていない場合、nullptrという特別な値で初期化しておくと「どこも指していない」ことを明示できます。何も指さずに*pで中身を読もうとするとプログラムが不安定になりますが、nullptrで初期化しておけば「まだ使えない状態」であることがコード上からもはっきり分かり、安全に扱えます。"},{before:"void swapRef(int",after:` a, int& b){
  int t=a; a=b; b=t;
} // 1つ目の引数も参照渡しにする記号`,answers:["&"],explain:"両方の仮引数をint&(参照)にすると、関数の中でa,bを書き換えるだけで、呼び出し元の変数の中身も直接入れ替わります。ポインタ渡しのように*で中身を取り出す必要がなく、普通の変数と同じ感覚で書けるのが参照渡しの特徴です。"},{type:"debug",long:!0,before:`void swapRef(int& a, int& b){
  `,after:`
}`,lead:"参照渡しのswapRef関数の中身に、aとbの値を入れ替える処理を書きなさい。",answers:[`int t=a;
a=b;
b=t;`],explain:"一時変数tにaの値を退避し、aにbの値を代入し、最後にbにtを代入すれば入れ替えが完了します。a,bは参照(呼び出し元の変数そのものの別名)なので、*で中身を取り出す必要はなく、普通の変数と同じ書き方で操作できます。"},{type:"debug",long:!0,before:`int a = 42;
int* p = &a;
`,after:"",lead:"pを使って、「aのアドレス」「pが指す先の値」「ポインタpのサイズ」の3つを順番に1行ずつ出力する処理を書きなさい。",answers:[`cout<<p<<endl;
cout<<*p<<endl;
cout<<sizeof(p)<<endl;`],explain:"ポインタ変数pをそのまま出力すると住所(アドレス)が、*pをつけると指す先の値(42)が、sizeof(p)をつけるとポインタ自体のバイト数(64bit環境なら8)が、それぞれ表示されます。同じ変数pから3つの異なる情報を取り出せることを整理しておきましょう。"},{type:"choice",lead:"参照(reference)とポインタの違いとして正しい説明を選びなさい。",options:["参照は宣言と同時に初期化が必須で、後から別の変数を指し直せない","参照はポインタと違い、*をつけないと中身を読めない","参照は必ずnullptrで初期化できる","参照とポインタは全く同じ機能で名前が違うだけ"],answers:["参照は宣言と同時に初期化が必須で、後から別の変数を指し直せない"],explain:"参照は宣言と同時に必ず初期化する必要があり、一度どの変数の別名になるかが決まったら、後から別の変数に結びつけ直すこともできません。この「一度決めたらずっとそのまま」という性質が、後から指す先を変えられるポインタとの大きな違いです。参照は*をつけずにそのまま使える点や、nullptrで初期化できない点もポインタとは異なります。"},{type:"order",lines:[{label:"A",code:"int a = 10;"},{label:"B",code:"int* p = &a;"},{label:"C",code:"int& x = a;"},{label:"D",code:"x = 20;"},{label:"E",code:"cout << *p << endl; // 20が表示される"}],lead:"最終的に*pが20を表示するようになる正しい順番を記号で答えなさい。",answers:["A,B,C,D,E"],explain:"まずaを宣言し(A)、aのアドレスを指すポインタp(B)とaの別名となる参照x(C)をそれぞれ用意します。xに20を代入すると(D)、xはaの別名なのでaの中身も20になり、aのアドレスを指すpを通して*pを見ても(E)同じく20が表示されます。"},{before:`int a=5;
int* p=&a;
int* q=&a;
if(p `,after:' q){ cout << "same" << endl; }',answers:["=="],explain:"2つのポインタが同じアドレスを指しているかどうかは、==で比較できます。p==qは「pに入っているアドレスとqに入っているアドレスが等しいか」を調べる式で、ここではどちらもaのアドレスを持っているのでtrueになります。"},{before:`int arr[3] = {1,2,3};
int* p = `,after:"; // 配列名だけを代入すると自動的に先頭要素のアドレスになる",answers:["arr"],explain:"配列名は単独で使うと、その配列の先頭要素のアドレスを表します。int* p = arr; と書くだけで、pはarrの先頭アドレスを持つことになり、&arr[0]と書いたのと同じ意味になります。"},{type:"debug",long:!0,before:`int* maxPtr(int* a, int* b){
`,after:`
}`,lead:"aとbが指す値を比較し、大きい方を指しているポインタをreturnする処理を書きなさい。",answers:[`if(*a > *b) return a;
return b;`],explain:"*aと*bで指す先の値同士を比較し、aの方が大きければポインタaそのものをreturnし、そうでなければポインタbをreturnします。値ではなく「どちらのポインタか」を返している点がこの問題のポイントです。"},{type:"choice",lead:"&aと*aの違いとして正しい説明を選びなさい。",options:["&aはaのアドレス、*aはポインタが指す先の値","&aもaも同じ意味","*aは常にアドレスを返す","&aは配列専用の演算子"],answers:["&aはaのアドレス、*aはポインタが指す先の値"],explain:"&(アドレス演算子)は変数の前につけて「その変数のアドレス」を取得します。*(間接参照演算子)はポインタの前につけて「ポインタが指す先にある実際の値」を取得します。この2つは逆の働きをするペアの演算子です。"},{type:"order",lines:[{label:"A",code:"int x=3,y=7;"},{label:"B",code:"int* result = maxPtr(&x,&y);"},{label:"C",code:"cout << *result << endl; // 7"}],lead:"x,yのうち大きい方の値を出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"x,yを宣言してから(A)、それぞれのアドレスを渡してmaxPtrを呼び出し、大きい方を指すポインタを受け取り(B)、*resultでその指す先の値(7)を出力します(C)。"},{before:`int a=1,b=2;
int* p=&a;
p=`,after:"; // pがbを指すように変更する",answers:["&b"],explain:"ポインタは後から別の変数のアドレスを代入し直すことで、指す先を自由に変更できます。p=&b;と書けば、pはもうaではなくbを指すようになります。"},{before:`int* p=nullptr;
if(p `,after:' nullptr){ cout<<"empty"<<endl; }',answers:["=="],explain:"pがnullptrと等しいかどうかは==で比較できます。p==nullptrという条件で「pがまだ何も指していないか」を確認してから使うのが安全なポインタの扱い方です。"},{before:`int a[3]={1,2,3};
int& r = a[1];
r = 99;
cout << a[`,after:"] << endl; // 99が表示される添字",answers:["1"],explain:"rはa[1]の別名(参照)なので、r=99;と書くとa[1]自体が99に書き換わります。そのためa[1]を出力すると99が表示されます。"},{type:"choice",lead:"参照(reference)を関数の引数にすると起きることとして正しいものを選びなさい。",options:["呼び出し元の変数を直接操作できる(ポインタと同じ効果が得られる)","必ずコピーが渡される","呼び出し側で&をつけて渡す必要がある","関数を抜けると変更内容は元に戻る"],answers:["呼び出し元の変数を直接操作できる(ポインタと同じ効果が得られる)"],explain:"参照渡しの仮引数は呼び出し元の変数そのものの別名になるため、関数の中で書き換えると呼び出し元にもその変更が反映されます。ポインタ渡しと同じ効果を、&をつけずに呼び出せる書き方で実現できます。"},{before:`int a[3]={10,20,30};
int* p=a;
cout << p[`,after:"] << endl; // 3番目の要素(30)を配列と同じ添字表記で取り出す",answers:["2"],explain:"配列の先頭アドレスを持つポインタpは、p[添字]のように配列と全く同じ書き方でアクセスできます。3番目の要素は添字2(0から数えて)にあるので、p[2]で30を取り出せます。"},{type:"debug",long:!0,before:`void divide(int a, int b, int& q, int& r){
`,after:`
}`,lead:"aをbで割った商をq、余りをrに、それぞれ参照引数を通して書き込む処理を書きなさい。",answers:[`q = a / b;
r = a % b;`],explain:"関数は戻り値を1つしか返せませんが、商と余りの2つを同時に呼び出し元へ渡したいときは、参照引数q,rに直接代入する方法が使えます。呼び出し元は普通の変数を渡すだけで、両方の結果を受け取れます。"},{type:"choice",lead:"ポインタ変数pがまだ何も指していないことを明示するために代入する値として正しいものを選びなさい。",options:["nullptr","0.0",'空文字""',"void"],answers:["nullptr"],explain:"nullptrは「どこも指していない」ことを表す特別な値です。宣言したポインタをすぐに使わない場合や、指す先が決まっていない場合は、nullptrで初期化しておくのが安全な習慣です。"},{before:`void show(int* p){ cout << *p << endl; }
int main(){
  int a=42;
  show(`,after:`);
  return 0;
}`,answers:["&a"],explain:"showはint*型(ポインタ)を受け取るので、呼び出す側はaのアドレス&aを渡す必要があります。関数の中では*pでaの中身(42)を読み取って出力します。"},{type:"order",lines:[{label:"A",code:"void swapRef(int& a, int& b){ int t=a; a=b; b=t; }"},{label:"B",code:"int x=1,y=2;"},{label:"C",code:"swapRef(x,y);"},{label:"D",code:'cout<<x<<" "<<y<<endl; // 2 1'}],lead:"参照渡しでx,yの中身を入れ替えて出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"参照渡しの関数を定義し(A)、変数を用意して(B)、&をつけずにそのまま渡して呼び出すと(C)、x,yの中身が入れ替わり、出力すると2 1になります(D)。"},{type:"choice",lead:"参照(reference)がポインタと違い、必ず初期化しなければならない理由として正しいものを選びなさい。",options:["参照はnullptrのような「何も指さない」状態を持てないため","参照は配列専用だから","参照は関数の中でしか使えないから","参照は必ず0で初期化されるから"],answers:["参照はnullptrのような「何も指さない」状態を持てないため"],explain:"参照は必ず何らかの変数の別名でなければならず、ポインタのnullptrのような「まだどこも指していない」状態を作れません。そのため宣言と同時に、別名にする対象を必ず指定(初期化)する必要があります。"},{type:"debug",long:!0,before:`void swapD(double* a, double* b){ double t=*a; *a=*b; *b=t; }
int main(){
`,after:`
  return 0;
}`,lead:"x=1.5, y=2.5を宣言し、swapDをポインタ渡しで呼び出したあと、x,yを1行ずつ出力する処理を書きなさい。",answers:[`double x=1.5,y=2.5;
swapD(&x,&y);
cout<<x<<endl;
cout<<y<<endl;`],explain:"int版のswapと全く同じ考え方が、double型でもそのまま使えます。&x,&yでアドレスを渡し、関数の中で指す先の値を入れ替えることで、呼び出し元のx,yが2.5と1.5に入れ替わります。"},{before:`cout << sizeof(double*) << endl; // 64bit環境で何バイトか(半角数字)
int ptrSize = `,after:";",answers:["8"],explain:"ポインタのサイズは、指す先の型がintであろうとdoubleであろうと関係なく、64bit環境では常に8バイトです。ポインタは「アドレス(住所)」だけを保管する箱なので、指す先のデータの大きさとは無関係にサイズが決まります。"},{before:`double d=3.14;
double* p = `,after:"; // dのアドレスを取得する",answers:["&d"],explain:"&(アドレス演算子)は、型がdoubleでもintと同じように使えます。&dはdのアドレスを表します。"},{before:`char c='x';
char* p = `,after:"; // cのアドレスを取得する",answers:["&c"],explain:"char型の変数のアドレスも、&cのように同じ記号で取得できます。"},{before:`bool flag=true;
bool* p = `,after:"; // flagのアドレスを取得する",answers:["&flag"],explain:"bool型の変数のアドレスも、&flagのように同じ記号で取得できます。"},{before:`int a=100;
int* p=&a;
cout << `,after:" << endl; // pが指す先の値(100)を表示",answers:["*p"],explain:"*(間接参照演算子)をポインタの前につけると、そのポインタが指す先の実際の値を取り出せます。"},{before:`int a=10;
int* p=&a;
`,after:" = 20; // pを介してaに20を代入する",answers:["*p"],explain:"*p = 20;と書くと、pが指す先(a)に20を書き込みます。ポインタ経由でも普通の変数と同じように値を書き換えられます。"},{before:`double d=1.0;
double& r = d;
r = `,after:"; // rを通してdを2.0に変更する",answers:["2.0"],explain:"rはdの別名なので、rに値を代入するとdの中身も一緒に変わります。"},{before:`int a=5;
int& r = a;
cout << `,after:" << endl; // rを出力するとaと同じ値(5)が表示される",answers:["r"],explain:"rはaの別名(参照)なので、rをそのまま出力してもaの値と全く同じ5が表示されます。"},{before:`string s = "hi";
string& r = s;
r += `,after:'; // rを通してsに"!"を追加',answers:['"!"'],explain:'rはsの別名なので、r += "!";と書くとsの中身自体が"hi!"に変わります。'},{before:`cout << sizeof(char*) << endl; // 64bit環境で何バイトか(半角数字)
int s = `,after:";",answers:["8"],explain:"char*のようなポインタも、指す先の型に関わらず64bit環境では8バイトです。"},{before:`int a=1,b=2,c=3;
int* p=&a;
p=`,after:"; // pがcを指すように変更",answers:["&c"],explain:"ポインタは後から別のアドレスを代入し直すことで、指す先を変更できます。"},{before:`int a=1;
int* p=&a;
int b=2;
p=`,after:"; // pがbを指すように変更",answers:["&b"],explain:"p=&b;と代入し直すことで、pは今度はbを指すようになります。"},{before:`int a=5;
int* p=nullptr;
p = `,after:"; // pがnullptrでなくなるよう、aのアドレスを設定する",answers:["&a"],explain:"nullptrで初期化していたポインタも、後からアドレスを代入すれば有効なポインタとして使えるようになります。"},{before:`int a=5;
int* p=&a;
if(p != `,after:"){ cout << *p << endl; }",answers:["nullptr"],explain:"p != nullptrで「pが何かを指しているか」を確認してから*pを読むのが安全なポインタの扱い方です。"},{before:`int a=5;
int* p=&a;
if(p `,after:' nullptr){ cout << "valid" << endl; }',answers:["!="],explain:"!=は「等しくない」ことを調べる演算子です。p != nullptrで、pが何かを指していることを確認できます。"},{type:"choice",lead:"int a=5; int* p=&a; の後、pに入っている値は何か選びなさい。",options:["aのアドレス(住所)","aの値そのもの(5)","0","未定"],answers:["aのアドレス(住所)"],explain:"&aはaのアドレスを表すので、int* p=&a;と書くとpにはaのアドレスが代入されます。aの値(5)そのものではありません。"},{type:"choice",lead:"参照とポインタの共通点として正しいものを選びなさい。",options:["どちらも「別の場所にある値」を間接的に操作する手段になる","どちらも配列専用である","どちらもnullptrで初期化できる","どちらも必ず8バイトの変数である"],answers:["どちらも「別の場所にある値」を間接的に操作する手段になる"],explain:"ポインタはアドレスを保持して間接的に値を操作し、参照は別名として直接的に(しかし別の場所の)値を操作します。書き方は違いますが、どちらも「別の場所の値を扱う」という目的は共通しています。"},{type:"choice",lead:"int a=5; int* p=&a; *p=10; の後、aの値はどうなるか選びなさい。",options:["10になる","5のまま変わらない","エラーになる","nullptrになる"],answers:["10になる"],explain:"*p=10;はpが指す先(a)に10を書き込むので、aの値は10に変わります。"},{type:"choice",lead:"関数の引数をポインタ渡しにする目的として最も適切なものを選びなさい。",options:["呼び出し元の変数の中身を関数の中から直接書き換えるため","関数の実行速度を上げるため","引数の数を減らすため","戻り値を無くすため"],answers:["呼び出し元の変数の中身を関数の中から直接書き換えるため"],explain:"ポインタ渡しにすると、関数の中でその指す先の値を書き換えることで、呼び出し元の変数の中身を直接変更できます。"},{type:"choice",lead:"参照(reference)を宣言したあと、別の変数を指すように変更できるか選びなさい。",options:["できない(一度決めたらそのまま)","いつでもできる","constをつければできる","配列なら変更できる"],answers:["できない(一度決めたらそのまま)"],explain:"参照は宣言時に決めた変数の別名にずっと固定され、後から別の変数を指すように変更することはできません。指す先を変更したい場合はポインタを使います。"},{type:"order",lines:[{label:"A",code:"int a=1;"},{label:"B",code:"int* p=&a;"},{label:"C",code:"*p = 99;"},{label:"D",code:"cout << a << endl; // 99"}],lead:"ポインタ経由でaの値を書き換えて出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"aを宣言し(A)、そのアドレスを指すポインタpを用意し(B)、*pに99を代入すると(C)aの中身も99になり、出力すると99が表示されます(D)。"},{type:"order",lines:[{label:"A",code:"int a=5;"},{label:"B",code:"int& r = a;"},{label:"C",code:"r = 100;"},{label:"D",code:"cout << a << endl; // 100"}],lead:"参照経由でaの値を書き換えて出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"aを宣言し(A)、その別名となる参照rを用意し(B)、rに100を代入すると(C)aの中身も100になり、出力すると100が表示されます(D)。"},{type:"order",lines:[{label:"A",code:"double d=1.0;"},{label:"B",code:"double* p=&d;"},{label:"C",code:"cout << *p << endl; // 1"}],lead:"doubleのポインタを使って値を出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"dを宣言し(A)、そのアドレスを指すポインタpを用意し(B)、*pで指す先の値を出力します(C)。"},{type:"debug",long:!0,before:`void doubleIt(int* p){
`,after:`
}`,lead:"pが指す値を2倍にする処理を書きなさい。",answers:["*p = *p * 2;"],explain:"*pで現在の値を取り出し、2倍した結果を再び*pに代入します。"},{type:"debug",long:!0,before:`void resetToZero(int* p){
`,after:`
}`,lead:"pが指す値を0にする処理を書きなさい。",answers:["*p = 0;"],explain:"*p = 0;と書けば、pが指す先の値が0に書き換わります。"},{type:"debug",long:!0,before:`void addOne(int& r){
`,after:`
}`,lead:"参照rが指す値に1を加える処理を書きなさい。",answers:["r += 1;"],explain:"rは呼び出し元の変数の別名なので、r += 1;と書くだけで呼び出し元の値が1増えます。"},{type:"debug",long:!0,before:`void swapIfNeeded(int* a, int* b){
`,after:`
}`,lead:"*aが*bより大きい場合だけ、中身を入れ替える処理を書きなさい。",answers:[`if(*a > *b){
int t=*a;
*a=*b;
*b=t;
}`],explain:"if(*a > *b)という条件をつけてから、一時変数tを使って中身を入れ替えます。条件を満たさない場合は何もしません。"},{type:"debug",long:!0,before:`int* findAddress(int arr[], int n, int target){
`,after:`
  return nullptr;
}`,lead:"配列arrの中からtargetと一致する要素のアドレスをreturnする処理(見つからなければ最後のnullptrが実行される)を書きなさい。",answers:[`for(int i=0;i<n;i++){
if(arr[i]==target) return &arr[i];
}`],explain:"配列を先頭から調べ、targetと一致する要素が見つかったら、そのアドレス&arr[i]をreturnします。最後まで見つからなければ、関数の最後に書かれたreturn nullptr;が実行されます。"},{type:"debug",long:!0,before:`void swapChar(char* a, char* b){
`,after:`
}`,lead:"*aと*bの中身を入れ替える処理を書きなさい(char型)。",answers:[`char t=*a;
*a=*b;
*b=t;`],explain:"int型のswapと全く同じ考え方が、char型でもそのまま使えます。一時変数tの型もcharにします。"},{type:"debug",long:!0,before:`void swapBool(bool* a, bool* b){
`,after:`
}`,lead:"*aと*bの中身を入れ替える処理を書きなさい(bool型)。",answers:[`bool t=*a;
*a=*b;
*b=t;`],explain:"bool型でも同じ考え方でswapを実装できます。一時変数tの型をboolにします。"},{type:"debug",long:!0,before:`void swapString(string* a, string* b){
`,after:`
}`,lead:"*aと*bの中身を入れ替える処理を書きなさい(string型)。",answers:[`string t=*a;
*a=*b;
*b=t;`],explain:"string型でも同じ考え方でswapを実装できます。一時変数tの型をstringにします。"},{before:`int x=1;
int* p1=&x;
int* p2=&x;
cout << (p1==p2) << endl; // 同じ変数を指しているので
int result=`,after:";",answers:["1"],explain:"p1もp2も同じ変数xのアドレスを持っているので、p1==p2はtrue(1)になります。"},{before:`int a=3, b=3;
int* p=&a;
int* q=&b;
cout << (p==q) << endl; // 別々の変数なので
int result=`,after:";",answers:["0"],explain:"aとbの値が同じ3であっても、アドレス(住所)は別々です。p==qは値ではなくアドレスを比較するので、false(0)になります。"},{before:`int a=5;
int& r1=a;
int& r2=a;
r1=10;
cout << r2 << endl; // r1もr2もaの別名なので
int result=`,after:";",answers:["10"],explain:"r1とr2はどちらもaの別名です。r1経由でaを10に変更すると、r2を通して見てもaと同じ10が表示されます。"},{before:`void increment(int* p){ (*p)++; }
int a=5;
`,after:`;
cout << a << endl; // 6`,lead:"incrementをポインタ渡しで呼び出す行を書きなさい。",answers:["increment(&a)"],explain:"incrementはint*型を受け取るので、呼び出すときはaのアドレス&aを渡します。"},{before:`void increment(int& r){ r++; }
int a=5;
`,after:`;
cout << a << endl; // 6`,lead:"incrementを参照渡しで呼び出す行を書きなさい。",answers:["increment(a)"],explain:"incrementは参照渡しなので、呼び出すときは&をつけずにそのままaを渡します。"},{type:"choice",lead:"この章で学んだ、ポインタの最も基本的な役割は何か選びなさい。",options:["変数のアドレス(住所)を保持すること","必ず配列の代わりになること","文字列専用の型であること","constの代わりになること"],answers:["変数のアドレス(住所)を保持すること"],explain:"ポインタの本質は「メモリ上のアドレス(住所)を保持する変数」であることです。配列アクセスや関数への参照渡しなど、様々な応用はすべてこの基本の上に成り立っています。"},{before:`int a=1;
int b=2;
int* p = &a;
p = &b;
cout << *p << endl; // `,after:"",lead:"このコードの出力される値を半角数字で書きなさい。",answers:["2"],explain:"pは最初aを指していましたが、p=&b;で指す先をbに変更しています。そのため*pはbの値である2を表示します。"}],qsExpert:[{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
void swap(int* px, int* py){
  int t=*px; *px=*py; *py=t;
}
`,after:"",lead:"main関数の中に、x=1,y=2を宣言し、swap関数をポインタ渡しで呼び出し、入れ替え後のx,yを1行ずつ出力する処理を書きなさい。",answers:[`int main(){
int x=1,y=2;
swap(&x,&y);
cout<<x<<endl;
cout<<y<<endl;
return 0;
}`],explain:"x,yを宣言してからswap(&x,&y);のようにそれぞれのアドレスを渡して呼び出すと、関数の中で指す先の値が入れ替わります。呼び出し後にx,yを出力すると、xは2、yは1に変わっています。"},{type:"debug",long:!0,before:`int findMax(int* a, int n){
`,after:`
}`,lead:"ポインタaが指す配列の中から最大値を探してreturnする処理を書きなさい(a[i]の形でアクセスしてよい)。",answers:[`int maxVal=a[0];
for(int i=1;i<n;i++){
if(a[i]>maxVal) maxVal=a[i];
}
return maxVal;`],explain:"配列を関数に渡すと先頭アドレスへのポインタとして受け取ることになりますが、a[i]のように配列と全く同じ書き方でアクセスできます。maxValをa[0]から始め、残りの要素と比較しながら最大値を更新し、最後にreturnします。"},{type:"debug",long:!0,before:`void safePrint(int* p){
`,after:`
}`,lead:"pがnullptrでなければ*pの値を出力し、nullptrなら「ポインタが無効です」と出力する処理を書きなさい。",answers:[`if(p != nullptr){
cout << *p << endl;
}else{
cout << "ポインタが無効です" << endl;
}`],explain:"p != nullptrという条件で「pがどこかを指しているかどうか」を確認してから*pを読むことで、まだ何も指していないポインタを不用意に読んでしまう事故を防げます。安全にポインタを扱う基本パターンです。"},{type:"debug",long:!0,before:`void doubleValue(int* p){
  *p = *p * 2;
}
int main(){
`,after:`
  return 0;
}`,lead:"aを5で宣言し、doubleValue関数にaのアドレスを渡して呼び出したあと、aの値(10になっているはず)を出力する処理を書きなさい。",answers:[`int a = 5;
doubleValue(&a);
cout << a << endl;`],explain:"doubleValue(&a);のようにaのアドレスを渡すと、関数の中の*p = *p * 2;がaの中身を直接書き換えます。呼び出し後にaを出力すると、5の2倍である10が表示されます。"},{type:"debug",long:!0,before:`void incByPointer(int* p){ (*p)++; }
void incByRef(int& r){ r++; }
int main(){
`,after:`
  return 0;
}`,lead:"aを0で宣言し、incByPointerでポインタ渡しの方法で1増やし、続けてincByRefで参照渡しの方法でさらに1増やしたあと、aの値(2になっているはず)を出力する処理を書きなさい。",answers:[`int a = 0;
incByPointer(&a);
incByRef(a);
cout << a << endl;`],explain:"incByPointerはポインタ渡しなので、呼び出し側では&aとアドレスを渡します。一方incByRefは参照渡しなので、&をつけずにそのままaを渡すだけで済みます。同じ「呼び出し元の値を変える」目的でも、渡し方が違う点を対比して確認しましょう。"},{type:"debug",long:!0,before:`bool findIndex(int* a, int n, int target, int* result){
`,after:`
}`,lead:"ポインタaが指す配列の中からtargetと一致する要素のインデックスをresultが指す先に書き込み、見つかったかどうかをbool型でreturnする処理を書きなさい。",answers:[`for(int i=0;i<n;i++){
if(a[i]==target){
*result = i;
return true;
}
}
return false;`],explain:"一致する要素が見つかった時点で、*result = i;でインデックスをresultが指す先に書き込み、trueをreturnします。見つからなければfalseをreturnし、resultには何も書き込みません。戻り値だけでなく、ポインタ引数経由でも結果を伝えられる例です。"},{type:"debug",long:!0,before:`void swapRef(int& x, int& y){
`,after:`
}`,lead:"swapRefの中身に、参照渡しで受け取ったxとyの値を入れ替える処理を書きなさい(一時変数を使ってよい)。",answers:[`int t = x;
x = y;
y = t;`],explain:"参照は変数の別名なので、ポインタのように*をつけなくても、普通の変数と同じ書き方で値の入れ替えができます。"},{type:"debug",long:!0,before:`void swapRef(int& x, int& y){
  int t = x;
  x = y;
  y = t;
}
int main(){
`,after:`
  return 0;
}`,lead:"aを1、bを2で宣言し、swapRefで入れ替えたあと、aとbを1行ずつ出力する処理を書きなさい。",answers:[`int a=1, b=2;
swapRef(a,b);
cout << a << endl;
cout << b << endl;`],explain:"参照渡しの関数を呼び出すときは、ポインタ渡しのように&をつける必要はなく、普通の変数名(a,b)をそのまま渡すだけで済みます。"},{type:"debug",long:!0,before:`void printArray(int* p, int n){
`,after:`
}`,lead:"pがp[0]を指しているとして、ポインタの加算(p+i)を使って配列のn個の要素を1行ずつ出力する処理を書きなさい(*(p+i)で値にアクセスできる)。",answers:[`for(int i=0;i<n;i++){
cout << *(p+i) << endl;
}`],explain:"ポインタに整数を足すと、その型のサイズ分だけ指す先がずれていきます。p+iはp[i]のアドレスと同じ意味になり、*(p+i)でその値を取り出せます。p[i]という書き方は、実はこの*(p+i)を短く書けるようにした記法です。"},{type:"debug",long:!0,before:`int sumArray(int* p, int n){
`,after:`
}`,lead:"*(p+i)を使って配列の合計をreturnする処理を書きなさい。",answers:[`int sum=0;
for(int i=0;i<n;i++){
sum += *(p+i);
}
return sum;`],explain:"p[i]の代わりに*(p+i)という書き方でも全く同じ値にアクセスできることを確認する問題です。どちらの書き方でも配列の集計処理は同じように書けます。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
void addOne(int* p){ (*p)++; }
void addTen(int& r){ r += 10; }
`,after:"",lead:"main関数の中にnを5で宣言し、addOneをポインタ渡しで、addTenを参照渡しで順に呼び出したあと、nの値(16になっているはず)を出力する処理を書きなさい。",answers:[`int main(){
int n = 5;
addOne(&n);
addTen(n);
cout << n << endl;
return 0;
}`],explain:"ポインタ渡しの関数には&nと書いてアドレスを渡し、参照渡しの関数にはnをそのまま渡します。5に1足して6、さらに10足して16になります。"},{type:"debug",long:!0,before:`int safeSum(int* a, int n){
`,after:`
}`,lead:"aがnullptrでなければ配列の合計をreturnし、nullptrなら0をreturnする処理を書きなさい。",answers:[`if(a == nullptr){
return 0;
}
int sum=0;
for(int i=0;i<n;i++){
sum += a[i];
}
return sum;`],explain:"まずaがnullptr(何も指していない)かどうかを確認し、そうであれば安全に0をreturnして処理を終えます。それ以外の場合だけ、実際に配列の中身を合計します。"},{before:`int a = 5;
int b = 5;
int* p1 = &a;
int* p2 = &a;
int* p3 = &b;
cout << (p1==p2) << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい(同じ変数aを指しているので)。",answers:["1"],explain:"p1とp2はどちらも同じ変数aのアドレスを持っているので、p1==p2はtrue(=1)になります。aとbの値がどちらも5であっても、ポインタの比較はアドレス(指している場所)同士の比較である点に注意しましょう。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
  int a = 10;
  int& ref = a;
  int copy = a;
`,after:`
  return 0;
}`,lead:"refに100を代入したあと、aとcopyをそれぞれ出力する処理を書きなさい(aは変わるがcopyは変わらないはず)。",answers:[`ref = 100;
cout << a << endl;
cout << copy << endl;`],explain:"refはaの別名(参照)なので、refを書き換えるとaそのものが変わり100になります。一方copyはaの値をコピーしただけの別の変数なので、refを書き換えても影響を受けず10のままです。"},{type:"debug",long:!0,before:`void swapElements(int* a, int i, int j){
`,after:`
}`,lead:"配列aのi番目とj番目の要素を、一時変数を使って入れ替える処理を書きなさい。",answers:[`int t = a[i];
a[i] = a[j];
a[j] = t;`],explain:"配列を関数に渡すと先頭アドレスへのポインタとして受け取りますが、a[i]・a[j]のように普通の配列と同じ書き方でアクセスできます。一時変数tを使って値を退避しながら入れ替えます。"}],qsDrag:[{type:"dragfill",lead:"pxとpyが指す値を正しく入れ替えるswap関数になるよう、3つの空欄に正しい順でピースを配置しなさい。",lines:[{code:"void swap(int* px, int* py){"},{blank:"b1"},{blank:"b2"},{blank:"b3"},{code:"}"}],pieces:[{id:"p1",code:"int t = *px;"},{id:"p2",code:"*px = *py;"},{id:"p3",code:"*py = t;"},{id:"p4",code:"*py = *px;"}],answerMap:{b1:"p1",b2:"p2",b3:"p3"},explain:"まずpxの指す値を一時変数tに退避し(p1)、pxの指す先にpyの指す値を上書きし(p2)、最後にpyの指す先にtを書き戻します(p3)。p4のように*py=*pxを先にしてしまうと、両方とも同じ値になってしまい正しく入れ替わりません。"}]},{id:"w3",title:"CASE 03「繰り返される証言」",sub:"Week3 関数",emoji:"🐙",mon:"一度も呼ばれなかった関数",lesson:[{title:"戻り値なしの関数",code:`void show(int x){
  cout << x << endl;
}`,explain:"関数の中には、計算した結果を呼び出し元に返す(returnする)ものと、画面に表示するだけなど「返す値が無い」ものがあります。後者を作るときは、戻り値の型としてvoid(空っぽ、という意味の英単語)を書きます。voidの関数はreturn文で値を返す必要が無く、途中で処理を終わらせたいときはreturn;とだけ書くこともできます。int型などの戻り値がある関数では、必ずreturn 値; のように何かしらの値を返さなければコンパイラに警告されますが、voidの関数にはその制約がありません。"},{title:"オーバーロード",code:`int add(int x,int y){ return x+y; }
double add(double x,double y){ return x+y; }`,explain:"普通は同じ名前の関数を2つ定義するとエラーになりますが、C++では引数の型や個数が違っていれば、同じ名前の関数をいくつも定義することができます。これを「関数オーバーロード」と呼びます。add(1,3)のようにint型の引数で呼び出せば上のadd(int,int)が、add(1.5,3.2)のようにdouble型の引数で呼び出せば下のadd(double,double)が、それぞれ自動的に選ばれて実行されます。人間が「整数の足し算」と「小数の足し算」を1つの関数名addで呼び分けられるので、覚える関数名を減らせるのがオーバーロードの利点です。"},{title:"ポインタ渡し・参照渡し",code:`void swap(int* px, int* py){
  int t=*px; *px=*py; *py=t;
}
int main(){
  int x=1,y=2;
  swap(&x,&y);
}`,explain:"関数に変数をそのまま渡す「値渡し」では、関数の中で使われる仮引数(このコード例だとxやy)は、実際には呼び出し元の変数のコピーにすぎません。そのためswap(x,y)のように普通に値渡しでswap関数を書いても、関数の中でコピーを入れ替えているだけで、呼び出し元のx,y自体は変化しません。呼び出し元の変数の中身そのものを書き換えたいときは、「その変数がどこにあるか(アドレス)」を関数に伝えて、その場所を直接書き換えてもらう必要があります。これを実現する方法が2つあり、1つはポインタ渡し(呼び出し側で&をつけてアドレスを渡し、関数の中では*をつけて中身を触る)、もう1つは参照渡し(呼び出し側はそのまま渡し、関数の仮引数の型に&をつけておく)です。"}],qs:[{before:"",after:` show(int x, int y){
  cout << x + y << endl;
} // 戻り値の無い関数の戻り値の型はどう書く？`,answers:["void"],explain:"戻り値(関数が計算した結果として返す値)が無い関数を作るときは、戻り値の型としてvoidを書きます。voidは英語で「空っぽ」という意味です。この例のshow関数は、x+yの計算結果をreturnで返すのではなく、cout << ... で直接画面に表示してしまっているので、呼び出し元に何かを返す必要がありません。そのためintではなくvoidを戻り値の型にします。voidの関数は、途中で処理を終わらせたいときreturn;とだけ書くこともできます(値をつけて return 何か; とは書けません)。"},{before:`int add(int x, int y){ return x+y; }
double add(double x, double y){ return x+y; }
// このように同じ名前addで引数の型が異なる関数を複数定義することを何と呼ぶか(カタカナで)
`,after:"",answers:["オーバーロード","関数オーバーロード"],explain:"引数の型や数が異なれば、同じ名前の関数をいくつも定義できます。これを「関数オーバーロード」と呼びます。呼び出すときに渡した引数の型や数を見て、コンパイラがどの関数を使うか自動的に判断してくれるので、呼び出す側は「addという名前で足し算する」とだけ覚えておけば十分です。一方、引数の型と個数が完全に同じで戻り値の型だけを変えた関数(例えばint add(int,int)とdouble add(int,int))は定義できません。呼び出すときにコンパイラがどちらを使うべきか判断できず、あいまいになってしまうからです。"},{before:`void swap(int* px, int* py){
  int a;
  a = `,after:`px;
  *px = *py;
  *py = a;
}`,answers:["*"],explain:"仮引数pxはint型へのポインタ(int*)なので、pxという変数そのものに入っているのは「あるint変数のアドレス」です。もしただ a = px; と書いてしまうと、値ではなくアドレス(住所を表す数値)をaに代入することになり、意図した動作になりません。呼び出し元にある本当のint変数の中身を取り出したり書き換えたりするには、*px のように間接参照演算子*をつけて「pxが指すアドレスまで行って、そこにある実際の値を見る/書き換える」という操作をする必要があります。この関数全体では、a=*px; *px=*py; *py=a; という3行によって、pxとpyが指す先の2つの変数の中身を入れ替えています。"},{before:`void swap(int* px, int* py){ ... }
int main(){
  int x=3, y=5;
  swap(`,after:`); // ポインタ渡しの場合、実引数はどう渡す？
}`,answers:["&x,&y"],explain:"swap関数の仮引数(px, py)はint*型、つまり「int型の変数のアドレスを受け取る」ように定義されています。そのため呼び出す側でも、渡したい変数の「アドレス」を用意してあげる必要があり、それには変数の前に&(アドレス演算子)をつけます。もしうっかり swap(x, y); のようにアドレスではなく値そのものを渡してしまうと、int*型が必要なところにint型を渡すことになり、コンパイルエラーになります。ちなみに同じ目的を果たす「参照渡し」を使う場合は、仮引数の型に&をつける代わりに、呼び出し側では &をつけずに swap(x, y); とそのまま渡します。ポインタ渡しは呼び出す側にも&が必要、参照渡しは呼び出す側は普通に渡すだけ、という違いを整理して覚えておきましょう。"},{before:`int main(){
  int n = 10;
  {
    int n = 3; // 内側のブロックだけで有効な別のn
    cout << n << endl; // 内側のcoutで出力される値を半角数字で書きなさい
  }
  cout << n << endl;
}
int innerOutput = `,after:";",answers:["3"],explain:"波括弧{ }で囲まれた範囲のことを「ブロック」と呼び、変数はそれが宣言されたブロックの中でだけ有効です(これを「スコープ」と呼びます)。この例では、外側でn=10という変数が宣言された後、内側の{ }の中でもう一度 int n = 3; と、同じ名前の変数が新しく宣言されています。C++ではこのように内側のブロックで同じ名前の変数を宣言すると、そのブロックの中に限っては内側のnが優先され、外側のnは一時的に見えなくなります(これを「シャドーイング」、影に隠れることと呼びます)。そのため内側のcoutでは3が出力されます。そして内側のブロックを抜けると、内側のnはメモリごと消えてなくなり、再び外側のn(10)が見えるようになるので、次のcoutでは10が出力されます。"},{before:`int main(){
  return `,after:`; // OSに正常終了を伝える一般的な値
}`,answers:["0"],explain:"main関数は、プログラムを実行したときに一番最初に呼び出される、いわばプログラム全体の入り口です。プログラムが最後まで実行し終わったら、OS(オペレーティングシステム)に「終了コード」という数値を1つ返す決まりになっています。慣習として0を返すと「エラーなく正常に終了した」ことを、0以外の値を返すと「何らかの問題があって終了した」ことを表します。ちなみにmain関数に限っては特別に、このreturn 0;を省略してもコンパイラが自動的に0を返す処理を補ってくれます。"},{before:`// 戻り値の型
`,after:` main(){
  int a=10,b=30,c;
  c = a-b;
}`,answers:["int"],explain:"C++の関数は「戻り値の型 関数名(引数){ 処理 }」という形で定義し、戻り値の型は必ず関数名の前に書きます。main関数はプログラムの入り口であり、実行し終わったらOSに終了コード(通常のint型の整数)を返す約束になっているため、int main(){ ... } という形が基本形になります。もしvoid main(){ ... } のように書いてしまうと、多くの環境でエラーや警告の原因になるので注意しましょう。"},{before:`int square(int x){
  return x`,after:`;
}`,answers:["*x"],explain:"xを2乗した値をreturnしたいので、x*x(xとxの掛け算)をそのままreturnします。"},{before:`void greet(){
  cout << "Hello" << endl;
}
int main(){
  `,after:`;
}`,lead:"greet関数を呼び出す行を書きなさい。",answers:["greet()"],explain:"引数を持たない関数を呼び出すときは、関数名の後ろに空の括弧()をつけるだけで済みます。"},{before:`int add(int x, int y){
  `,after:` x+y;
}`,lead:"戻り値を返す文を補いなさい。",answers:["return"],explain:"関数が計算結果を呼び出し元に返すには、returnを使って戻り値を指定します。"},{before:`int main(){
  int result = add(3,4);
  cout << `,after:` << endl;
}`,lead:"resultを出力する処理を補いなさい。",answers:["result"],explain:"関数の戻り値を代入した変数resultを、そのままcoutで出力できます。"},{before:`bool isPositive(int n){
  return n `,after:` 0;
}`,lead:"nが0より大きいかを判定する条件を補いなさい。",answers:[">"],explain:"n > 0という比較結果(true/false)を、そのままreturnすることでbool型の戻り値になります。"},{before:`void show(int x){
  cout << `,after:` << endl;
}`,lead:"xを出力する処理を補いなさい。",answers:["x"],explain:"引数として受け取ったxを、そのままcoutで出力します。"},{before:`// 関数を呼び出すときに渡す値のことを何と呼ぶか(カタカナで)
`,after:"",answers:["引数"],explain:"関数を呼び出すときに渡す値のことを引数(ひきすう)と呼びます。"},{before:`// 関数が処理の結果として呼び出し元に返す値を何と呼ぶか(カタカナで)
`,after:"",answers:["戻り値"],explain:"関数が処理の結果として呼び出し元に返す値を戻り値と呼びます。"}],qsHard:[{type:"debug",before:"void swap(int",after:` x, int* y){
  int t=*x; *x=*y; *y=t;
} // 1つ目の仮引数もポインタ型にして、呼び出し元の値を入れ替えられるようにしなさい`,answers:["*"],explain:"値渡しのままでは仮引数xは呼び出し元のコピーにすぎず、関数内でいくら入れ替えても呼び出し元の変数は変わりません。両方の仮引数をポインタ型(int*)にして、*xや*yで指す先の値を直接書き換える必要があります。"},{type:"choice",lead:"次のうち、正しく関数オーバーロードが成立する組み合わせはどれか選びなさい。",options:["int add(int x,int y); / double add(int x,int y);","int add(int x,int y); / int add(int x,int y,int z);","int add(int x,int y); / int add(int a,int b);","void add(){} / void add(){}"],answers:["int add(int x,int y); / int add(int x,int y,int z);"],explain:"オーバーロードが成立するには、引数の型や個数が異なっている必要があります。1つ目の選択肢は引数が全く同じで戻り値の型だけが違うため、コンパイラがどちらを呼ぶべきか区別できずエラーになります。3つ目は引数名が違うだけで型・個数は同じなので同じ関数の再宣言とみなされ、4つ目は完全に同一な重複定義です。2つ目だけが引数の個数が異なる正しいオーバーロードです。"},{type:"order",lines:[{label:"A",code:"swap(&x,&y);"},{label:"B",code:"void swap(int* px,int* py){ int t=*px;*px=*py;*py=t; }"},{label:"C",code:"int main(){"},{label:"D",code:"  int x=1,y=2;"},{label:"E",code:"}"}],answers:["B,C,D,A,E"],explain:"swap関数はmainより前(もしくはプロトタイプ宣言)が必要なのでまず定義し(B)、main関数を開始して(C)変数を用意し(D)、ポインタ渡しでswapを呼び出し(A)、最後にmainを閉じます(E)。"},{type:"debug",before:`int add(int x,int y){
  `,after:` x+y;
} // 戻り値を返す文を補いなさい`,answers:["return"],explain:"関数が値を呼び出し元へ返すためには、returnを使って戻り値を指定する必要があります。"},{type:"choice",lead:"void型の関数の説明として正しいものを選びなさい。",options:["戻り値を持たない関数","必ず引数を持たない関数","必ずポインタを引数に取る関数","呼び出せない関数"],answers:["戻り値を持たない関数"],explain:"void型の関数は、何かを行うだけでreturnで値を返さない関数です。引数は普通の関数と同じように自由に持てます。"},{type:"order",lines:[{label:"A",code:"int square(int x){ return x*x; }"},{label:"B",code:"int main(){"},{label:"C",code:"  cout << square(4) << endl;"},{label:"D",code:"  return 0;"},{label:"E",code:"}"}],answers:["A,B,C,D,E"],explain:"関数を定義してから(A)main関数を開始し(B)、呼び出して結果を出力し(C)、mainを終了します(D,E)。"},{type:"debug",before:"void addOne(int",after:" x){ x++; } // 呼び出し元の値を変えるために参照渡しにしなさい",answers:["&"],explain:"値渡しのままではxは呼び出し元のコピーなので、xをint&にして参照渡しにすることで、呼び出し元の変数そのものを変更できるようになります。"},{type:"choice",lead:"値渡しで受け取った引数を関数内で変更した場合、呼び出し元の変数はどうなるか選びなさい。",options:["変わらない(コピーを変更しているだけ)","必ず変わる","コンパイルエラーになる","ポインタに変換される"],answers:["変わらない(コピーを変更しているだけ)"],explain:"値渡しでは、関数の引数には呼び出し元の値のコピーが渡されるため、関数の中でそのコピーを変更しても呼び出し元の変数には影響しません。"},{type:"debug",before:`void show(int x){ cout<<x<<endl; }
void show(`,after:" x){ cout<<x<<endl; } // string型を受け取るオーバーロード版にしなさい",answers:["string"],explain:"引数の型をstringにすることで、既存のint版とは別のオーバーロード版として定義できます。"},{type:"order",lines:[{label:"A",code:"void increment(int* p){ (*p)++; }"},{label:"B",code:"int main(){"},{label:"C",code:"  int a = 5;"},{label:"D",code:"  increment(&a);"},{label:"E",code:`  return 0;
}`}],answers:["A,B,C,D,E"],explain:"関数を定義し(A)、mainを開始して(B)変数を用意し(C)、ポインタ渡しで呼び出し(D)、mainを終了します(E)。"},{type:"choice",lead:"次のうち、正しく関数オーバーロードが成立しないものを選びなさい。",options:["int f(int x); と int f(int x){ return x; } (同じシグネチャの重複定義)","int f(int x); と int f(double x);","int f(int x); と int f(int x, int y);","void f(); と void f(int x);"],answers:["int f(int x); と int f(int x){ return x; } (同じシグネチャの重複定義)"],explain:"引数の型・個数が完全に同じ関数を2つ定義しようとすると、オーバーロードではなく単なる重複定義となりコンパイルエラーになります。それ以外の選択肢はすべて引数の型または個数が異なる正しいオーバーロードです。"},{type:"debug",before:`int max3(int a,int b,int c){
  int m=a;
  if(b>m) m=b;
  `,after:`
  return m;
} // cとの比較も追加しなさい`,answers:["if(c>m) m=c;"],explain:"bとの比較と同じように、cもmより大きければmを更新することで、3つの中の最大値が正しく求まります。"},{type:"order",lines:[{label:"A",code:"void swapRef(int& a, int& b){"},{label:"B",code:"  int t=a; a=b; b=t;"},{label:"C",code:"}"}],answers:["A,B,C"],explain:"参照渡しの関数宣言(A)のあと、一時変数を使って値を入れ替える処理(B)を書き、関数を閉じます(C)。"},{type:"choice",lead:"値渡し・ポインタ渡し・参照渡しのうち、呼び出し元の変数を直接書き換えられる組み合わせとして正しいものを選びなさい。",options:["ポインタ渡しと参照渡し","値渡しのみ","値渡しとポインタ渡し","どれも書き換えられない"],answers:["ポインタ渡しと参照渡し"],explain:"ポインタ渡しは*を使って、参照渡しはそのまま、どちらも呼び出し元の変数そのものにアクセスして書き換えられます。値渡しはコピーが渡されるだけなので、呼び出し元には影響しません。"},{type:"debug",before:"void addToTotal(int",after:" total, int amount){ total += amount; } // 呼び出し元のtotalも変えたいので参照渡しにしなさい",answers:["&"],explain:"totalをint&(参照)にすることで、関数内でtotalを変更すると呼び出し元の変数そのものが変わるようになります。"}],qsExtra:[{before:`void swapRef(int& a, int& b){ int t=a; a=b; b=t; }
int main(){
  int x=3, y=5;
  swapRef(`,after:`); // 参照渡しの場合、実引数はどう渡す？
}`,answers:["x,y"],explain:"参照渡しの仮引数(int& a, int& b)は、呼び出し元の変数そのものの別名になります。ポインタ渡しのときのように&をつけてアドレスを渡す必要はなく、swapRef(x,y);のように普通の変数名をそのまま渡すだけで、関数の中でa,bを書き換えると呼び出し元のx,yも一緒に変わります。"},{before:`int add(int x, int y){ return x+y; }
`,after:"",lead:"同じ名前addで、double型の引数を2つ受け取り合計を返すオーバーロード版を書きなさい。",answers:["double add(double x, double y){ return x+y; }"],explain:"引数の型さえ違えば、戻り値の型や処理内容は同じでも別の関数として定義できます。int版とdouble版の両方を用意しておけば、add(1,2)のように整数を渡したときはint版が、add(1.5,2.5)のように小数を渡したときはdouble版が、それぞれ自動的に選ばれて呼び出されます。"},{type:"debug",long:!0,before:`void demoScope(){
  int n = 10;
  {
`,after:`
  }
  cout << n << endl; // 10
}`,lead:"内側のブロックの中に、nという名前で新しい変数を3で宣言し、その場でcoutで出力する処理(内側では3が表示される)を書きなさい。",answers:[`int n = 3;
cout << n << endl;`],explain:"内側の{ }の中でもう一度int n = 3;と宣言すると、そのブロックの中だけ内側のnが優先され(シャドーイング)、直後のcoutでは3が表示されます。ブロックを抜けると内側のnは消え、外側のn(10)が再び見えるようになります。"},{type:"debug",long:!0,before:`int absValue(int n){
`,after:`
}`,lead:"absValue関数の中身に、nが負ならその符号を反転した値を、そうでなければnをそのまま返す処理を書きなさい。",answers:[`if(n<0) return -n;
return n;`],explain:"if(n<0)の条件でnが負のときだけ-n(符号を反転した値)をreturnし、条件に一致しなかった場合はif文の次の行に処理が進んで、そのままnをreturnします。1つの関数の中でも、条件によって複数のreturn文のどれか1つだけが実行される、という流れを押さえておきましょう。"},{type:"choice",lead:"次のうち、関数オーバーロードとして成立しない(コンパイルエラーになる)組み合わせを選びなさい。",options:["int show(int x); / double show(double x);","int show(int x); / int show(int y);","int show(int x); / int show(int x,int y);","void show(); / void show(int x);"],answers:["int show(int x); / int show(int y);"],explain:"オーバーロードが成立するには引数の型や個数が異なる必要があります。「int show(int x);」と「int show(int y);」は引数名が違うだけで、型も個数も全く同じシグネチャなので、コンパイラはこれを同じ関数の重複定義とみなしエラーになります。他の3つはいずれも引数の型または個数が異なる正しいオーバーロードです。"},{type:"order",lines:[{label:"A",code:"void tryChange(int x){ x = 100; }"},{label:"B",code:"int main(){"},{label:"C",code:"  int a = 5;"},{label:"D",code:"  tryChange(a);"},{label:"E",code:"  cout << a << endl; // 5のまま(値渡しなので変化しない)"},{label:"F",code:"}"}],lead:"値渡しでは呼び出し元が変化しないことを確認するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D,E,F"],explain:"tryChange関数はint x(値渡し)を受け取るため、関数の中でxを書き換えても、それは仮引数xというコピーを書き換えているだけです。main側のa(C)はtryChange(a)を呼んでも(D)変化せず、E行では5がそのまま表示されます。ポインタ渡しや参照渡しとの違いを対比して覚えておきましょう。"},{before:`void show(int x){
  if(x<0){
    `,after:`; // 値をつけずに処理を途中で終える文
  }
  cout<<x<<endl;
}`,answers:["return"],explain:"void型の関数では、値をつけずにreturn;とだけ書くことで、その場で処理を終えることができます。この例ではxが負の場合、以降のcout<<x<<endl;を実行せずに関数を抜けます。"},{before:`void greet(){ cout << "Hello" << endl; }
`,after:"",lead:'同じ名前greetで、string型の引数nameを1つ受け取り"Hello, "+nameを出力するオーバーロード版を書きなさい。',answers:['void greet(string name){ cout << "Hello, " << name << endl; }'],explain:'引数の数が異なれば(0個 vs 1個)、同じ名前greetで別の関数を定義できます。呼び出す側はgreet();かgreet("Taro");かで、どちらが実行されるか自動的に決まります。'},{type:"debug",long:!0,before:`int factorial(int n){
`,after:`
}`,lead:"1からnまでの積(階乗)を計算してreturnする処理を書きなさい。",answers:[`int result=1;
for(int i=1;i<=n;i++){
result *= i;
}
return result;`],explain:"resultを1で初期化し(0で初期化すると掛け算の結果が常に0になってしまうので注意)、1からnまでを順にresultへ掛け合わせていきます。factorial(5)なら1*2*3*4*5=120が計算されます。"},{type:"choice",lead:"void型の関数の説明として正しいものを選びなさい。",options:["戻り値が無い関数のこと","引数が無い関数のこと","必ずreturn文を書けない関数のこと","main関数の別名"],answers:["戻り値が無い関数のこと"],explain:"voidは「戻り値が無い」ことを表す型です。引数の有無とは無関係で、void型の関数でも引数を受け取ることはできますし、値をつけないreturn;を書いて途中で処理を終えることもできます。"},{type:"order",lines:[{label:"A",code:"int factorial(int n){ int r=1; for(int i=1;i<=n;i++) r*=i; return r; }"},{label:"B",code:"int main(){"},{label:"C",code:"  cout << factorial(5) << endl; // 120"},{label:"D",code:"  return 0;"},{label:"E",code:"}"}],lead:"5の階乗を計算して出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D,E"],explain:"factorial関数をmainより前に定義してから(A)、main関数を開始し(B)、factorial(5)を呼び出して結果を出力し(C)、正常終了を返して(D)、mainを閉じます(E)。"},{before:`int add(int x,int y); // 関数のプロトタイプ宣言(中身は後で書く)
int main(){
  cout << add(2,3) << endl;
  return 0;
}
int `,after:"(int x,int y){ return x+y; }",answers:["add"],explain:"先に関数の宣言(プロトタイプ)だけを書いておけば、実際の中身をmainより後ろに書いても、mainの中でその関数を呼び出せます。関数名はプロトタイプと定義で一致させる必要があります。"},{before:`void greet(){ cout << "Hi" << endl; }
void greetTwice(){
  greet();
  `,after:`;
}`,answers:["greet()"],explain:"greet();を2回書けば、greetの中身(Hiの出力)が2回実行されます。関数は何度でも呼び出せるので、同じ処理を別の関数の中から複数回呼ぶこともできます。"},{type:"choice",lead:"戻り値も引数も無い関数の宣言として正しいものを選びなさい。",options:["void func();","func void();","void func(void return);","func();"],answers:["void func();"],explain:"戻り値が無いことを表すvoidを関数名の前に、引数が無いことを空の括弧()で表します。void func();が正しい宣言の形です。"},{before:`bool isEven(int n){
  return n`,after:`==0;
}`,answers:["%2"],explain:"n%2は「nを2で割った余り」です。余りが0なら偶数なので、n%2==0という式はそのままisEvenの戻り値(bool)として使えます。"},{type:"debug",long:!0,before:`int power(int base, int exp){
`,after:`
}`,lead:"baseのexp乗を計算してreturnする処理(for文)を書きなさい。",answers:[`int result=1;
for(int i=0;i<exp;i++){
result *= base;
}
return result;`],explain:"resultを1で初期化し、exp回だけbaseを掛け合わせていきます。power(2,3)ならresultは1→2→4→8となり、8(2の3乗)がreturnされます。"},{before:`int sum3(int a,int b,int c){
  return `,after:`;
}`,answers:["a+b+c"],explain:"3つの引数を+でつなげてそのままreturnするだけで、3つの値の合計を計算する関数になります。"},{type:"order",lines:[{label:"A",code:"int square(int x){ return x*x; }"},{label:"B",code:"double square(double x){ return x*x; }"},{label:"C",code:"cout << square(3) << endl; // 9"},{label:"D",code:"cout << square(2.5) << endl; // 6.25"}],lead:"int版とdouble版のsquareをオーバーロードし、それぞれの型で呼び出すプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"int版(A)とdouble版(B)のsquareを定義しておくと、square(3)のように整数を渡せばint版が(C)、square(2.5)のように小数を渡せばdouble版が(D)、それぞれ自動的に選ばれます。"},{type:"choice",lead:"同じ処理を何度も書く代わりに関数にまとめる利点として正しいものを選びなさい。",options:["同じコードを繰り返し書かずに再利用できる","必ず実行速度が上がる","変数が使えなくなる","クラスが自動的に作られる"],answers:["同じコードを繰り返し書かずに再利用できる"],explain:"よく使う処理を関数にまとめておけば、その処理が必要になるたびに関数名を呼び出すだけで済み、同じコードを何度もコピー&ペーストする必要がなくなります。修正が必要なときも1箇所を直すだけで済みます。"},{before:`void printPositive(int n){
  if(n<=0) return;
  `,after:`;
}`,answers:["cout << n << endl"],explain:"if(n<=0) return;で、nが0以下のときはその場で処理を終えます。それ以外の場合だけ、続く行でnを出力します。"},{type:"debug",long:!0,before:`bool isPrime(int n){
  if(n<2) return false;
`,after:`
  return true;
}`,lead:"2からn-1までの範囲でnを割り切る数が1つでもあればfalseをreturnし、無ければtrueをreturnする処理(for文)を書きなさい。",answers:[`for(int i=2;i<n;i++){
if(n%i==0) return false;
}`],explain:"2以上n未満の数で1つずつnを割ってみて、余りが0(割り切れる)になる数が見つかれば、そこでfalseをreturnして処理を終えます。ループを最後まで割り切れる数が見つからなければ、最後の行のreturn true;が実行されます。"},{before:`int maxOfTwo(int a,int b){
  if(a>b) return a;
  `,after:`;
}`,answers:["return b"],explain:"if(a>b)が成立すればaをreturnして処理を終えます。成立しなかった場合(aがb以下の場合)は、次の行のreturn b;が実行されます。"},{type:"choice",lead:"関数のオーバーロードが成立する条件として正しいものを選びなさい。",options:["引数の型または個数が異なること","戻り値の型だけが異なること","関数名が異なること","必ずconstをつけること"],answers:["引数の型または個数が異なること"],explain:"オーバーロードが成立するには、引数の型または個数のどちらかが異なっている必要があります。引数が全く同じで戻り値の型だけが違う関数は、コンパイラがどちらを呼ぶべきか区別できずエラーになります。"},{before:`void printLine(){
  `,after:`;
}`,lead:'printLine関数の中身に、"-----"という文字列を1行出力する処理を書きなさい。',answers:['cout << "-----" << endl;'],explain:"coutで固定の文字列を出力するだけの単純な関数です。"},{before:`void printSquare(int n){
  `,after:`;
}`,lead:"nの2乗を出力する処理を書きなさい。",answers:["cout << n*n << endl;"],explain:"n*nでnの2乗を計算し、そのままcoutで出力します。"},{before:`int cube(int n){
  return `,after:`;
}`,lead:"nの3乗をreturnする式を書きなさい。",answers:["n*n*n"],explain:"n*n*nはnを3回掛け合わせた値、つまりnの3乗になります。"},{before:`int negate(int n){
  return `,after:`;
}`,lead:"nの符号を反転した値をreturnする式を書きなさい。",answers:["-n"],explain:"-n(単項マイナス)は、nの符号を反転した値(正なら負、負なら正)になります。"},{before:`double half(double n){
  return `,after:`;
}`,lead:"nの半分をreturnする式を書きなさい。",answers:["n/2"],explain:"n/2でnを2で割った値(半分)を計算します。"},{before:`int triple(int x){ return x*3; }
`,after:"",lead:"同じ名前tripleで、double型引数を受け取り3倍を返すオーバーロード版を書きなさい。",answers:["double triple(double x){ return x*3; }"],explain:"引数の型が異なれば、同じ名前tripleで別の関数を定義できます。"},{before:`void show(int x){ cout << x << endl; }
`,after:"",lead:"同じ名前showで、double型引数を受け取るオーバーロード版を書きなさい。",answers:["void show(double x){ cout << x << endl; }"],explain:"引数の型だけを変えたオーバーロード版です。呼び出すときに渡す値の型で、どちらが実行されるか自動的に決まります。"},{before:`int combine(int a,int b){ return a+b; }
`,after:"",lead:"同じ名前combineで、3つのint引数を受け取り合計を返すオーバーロード版を書きなさい。",answers:["int combine(int a,int b,int c){ return a+b+c; }"],explain:"引数の個数が異なれば、同じ名前combineで別の関数を定義できます。呼び出すときに渡す引数の個数で、どちらが実行されるか自動的に決まります。"},{type:"choice",lead:"int show(int x); と double show(int x); のように、引数が同じで戻り値の型だけが違う関数を2つ定義しようとするとどうなるか選びなさい。",options:["コンパイルエラーになる","正しくオーバーロードされる","後に書いた方だけが有効になる","警告だけで両方使える"],answers:["コンパイルエラーになる"],explain:"オーバーロードが成立するには引数の型または個数が異なる必要があります。引数が完全に同じで戻り値の型だけが違う場合、呼び出し方だけではどちらを使うべきか区別できないため、コンパイルエラーになります。"},{before:`int calc(int x){ return x+1; }
double calc(double x){ return x+1; }
cout << calc(5) << endl; // どちらの関数が呼ばれるか
`,after:"",lead:"呼ばれる関数の引数の型を(intかdoubleで)答えなさい。",answers:["int"],explain:"calc(5)の5はint型のリテラルなので、int版のcalcが呼ばれます。"},{before:`bool isNegative(int n){
  return `,after:`;
}`,answers:["n<0"],explain:"n<0という条件式の結果(true/false)が、そのままbool型の戻り値になります。"},{before:`bool isZero(int n){
  return `,after:`;
}`,answers:["n==0"],explain:"n==0という条件式の結果が、そのままbool型の戻り値になります。"},{before:`int absValue(int n){
  if(n<0) return -n;
  `,after:`;
}`,answers:["return n"],explain:"nが負の場合はすでに-nをreturnして処理が終わっています。この行に到達するのはnが0以上のときなので、そのままnをreturnします。"},{before:`char firstChar(string s){
  return `,after:`;
}`,lead:"sの最初の1文字をreturnする式を書きなさい。",answers:["s[0]"],explain:"string型もs[0]のように配列と同じ感覚で1文字ずつアクセスできます。"},{before:`int lastIndex(int n){
  return `,after:`;
}`,lead:"サイズnの配列の最後の添字をreturnする式を書きなさい。",answers:["n-1"],explain:"添字は0から始まるので、サイズnの配列の最後の添字はn-1になります。"},{type:"debug",long:!0,before:`int sumUpTo(int n){
`,after:`
}`,lead:"1からnまでの合計をreturnする処理(for文)を書きなさい。",answers:[`int sum=0;
for(int i=1;i<=n;i++){
sum+=i;
}
return sum;`],explain:"sumを0で初期化し、1からnまでを順番に足し込んでいきます。"},{before:`int countDigitsHelper(int n){
  int count=0;
  while(n>0){
    `,after:`;
  }
  return count;
}`,lead:"nを10で割り続けて桁数を数える処理(1行)を書きなさい(countを増やす処理とn/=10の両方が必要)。",answers:["count++; n/=10;"],explain:"ループのたびにcountを1つ増やし、nを10で割ることで1桁ずつ削っていきます。nが0になるまでの繰り返し回数が桁数になります。"},{before:`int gcdBruteForce(int a, int b){
  int result=1;
  for(int i=1;i<=a && i<=b;i++){
    `,after:`;
  }
  return result;
}`,lead:"aとbの両方を割り切るiが見つかるたびにresultを更新する処理を書きなさい。",answers:["if(a%i==0 && b%i==0) result=i"],explain:"iを1から順に試し、aとbの両方を割り切れる(余りが0)たびにresultを更新していくと、最後にはaとbの最大公約数がresultに残ります。"},{before:`int fibonacciAt(int n){
  int a=0,b=1;
  for(int i=0;i<n;i++){
    int next=a+b;
    a=b;
    `,after:`;
  }
  return a;
}`,answers:["b=next"],explain:"a,bをフィボナッチ数列の隣り合う2項として管理し、nextに次の項を計算してから、aとbをそれぞれ1つ後ろにずらします。"},{before:`int countMultiples(int limit, int divisor){
  int count=0;
  for(int i=1;i<=limit;i++){
    `,after:`;
  }
  return count;
}`,lead:"1からlimitまでの中で、divisorの倍数の個数を数える処理を書きなさい。",answers:["if(i%divisor==0) count++"],explain:"i%divisor==0で「iがdivisorで割り切れるか(倍数か)」を判定し、条件を満たすたびにcountを増やします。"},{type:"choice",lead:"voidの関数はreturn文を書かなくてもよいか選びなさい。",options:["書かなくてもよい(必要なら値なしのreturn;だけ書ける)","必ず書く必要がある","void型は関数として定義できない","returnを書くとエラーになる"],answers:["書かなくてもよい(必要なら値なしのreturn;だけ書ける)"],explain:"voidの関数はreturn文を省略しても構いません。途中で処理を終わらせたい場合は、値をつけずにreturn;とだけ書くこともできます。"},{type:"choice",lead:"int型の関数で、値をreturnせずに関数の最後まで到達した場合どうなるか選びなさい。",options:["未定義の動作になる(戻り値が保証されない)","自動的に0がreturnされる","コンパイルエラーになる","無限ループになる"],answers:["未定義の動作になる(戻り値が保証されない)"],explain:"戻り値がある関数(void以外)では、必ずどこかのreturn文で値を返す必要があります。返さずに関数の最後まで到達すると、戻り値は保証されない未定義の動作になります(main関数だけは特別にreturn 0;が自動で補われます)。"},{type:"choice",lead:"関数の引数に渡す値の順番として正しい説明を選びなさい。",options:["定義したときの仮引数の順番と対応する","順番は関係なくすべて自動で対応する","必ず1つ目の引数から順に無視される","引数の型によって順番が変わる"],answers:["定義したときの仮引数の順番と対応する"],explain:"関数を呼び出すときに渡す値(実引数)は、定義したときの仮引数の並び順とそのまま対応します。1つ目に渡した値が1つ目の仮引数に、2つ目に渡した値が2つ目の仮引数に、という具合です。"},{type:"choice",lead:"1つの関数の中に複数のreturn文を書くことはできるか選びなさい。",options:["できる(条件によってどれか1つが実行される)","1つの関数に1つしか書けない","2つまでしか書けない","if文の中でしか書けない"],answers:["できる(条件によってどれか1つが実行される)"],explain:"1つの関数の中には、いくつでもreturn文を書くことができます。実際に実行されるのは、条件分岐によって選ばれたどれか1つのreturn文だけです。"},{type:"choice",lead:"関数の戻り値の型として使えないものはどれか選びなさい。",options:["戻り値の型に「使えない型」は基本的に無い(int/double/bool/構造体など様々使える)","int","void","bool"],answers:["戻り値の型に「使えない型」は基本的に無い(int/double/bool/構造体など様々使える)"],explain:"int,double,bool,void(戻り値なし)はもちろん、構造体やクラスなど、ほとんどどんな型でも関数の戻り値の型として使うことができます。"},{type:"order",lines:[{label:"A",code:"int cube(int n){ return n*n*n; }"},{label:"B",code:"int main(){"},{label:"C",code:"  cout << cube(3) << endl; // 27"},{label:"D",code:`  return 0;
}`}],lead:"3の3乗を計算して出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"cube関数をmainより前に定義してから(A)、main関数を開始し(B)、cube(3)を呼び出して結果(27)を出力し(C)、正常終了を返します(D)。"},{type:"order",lines:[{label:"A",code:"bool isEven(int n){ return n%2==0; }"},{label:"B",code:"int main(){"},{label:"C",code:"  cout << isEven(4) << endl; // 1"},{label:"D",code:`  return 0;
}`}],lead:"4が偶数かどうかを判定して出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"isEven関数を定義してから(A)、main関数を開始し(B)、isEven(4)を呼び出して結果(true=1)を出力し(C)、正常終了を返します(D)。"},{type:"order",lines:[{label:"A",code:"int sumUpTo(int n){ int s=0; for(int i=1;i<=n;i++) s+=i; return s; }"},{label:"B",code:"int main(){"},{label:"C",code:"  cout << sumUpTo(5) << endl; // 15"},{label:"D",code:`  return 0;
}`}],lead:"1から5までの合計を計算して出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"sumUpTo関数を定義してから(A)、main関数を開始し(B)、sumUpTo(5)を呼び出して結果(15)を出力し(C)、正常終了を返します(D)。"},{type:"debug",long:!0,before:`bool isPerfectSquare(int n){
`,after:`
}`,lead:"1からnまでの数iについて、i*i==nとなるものがあればtrueを、無ければfalseをreturnする処理を書きなさい。",answers:[`for(int i=1;i<=n;i++){
if(i*i==n) return true;
}
return false;`],explain:"1からnまでのiを1つずつ試し、i*iがnと一致すればtrueをreturnして処理を終えます。最後まで一致するiが見つからなければfalseをreturnします。"},{type:"debug",long:!0,before:`int digitSum(int n){
  int sum=0;
`,after:`
  return sum;
}`,lead:"nの各桁の数字を合計してsumに足し込む処理(while文)を書きなさい(n%10で1の位、n/=10で桁を進められます)。",answers:[`while(n>0){
sum += n%10;
n /= 10;
}`],explain:"n%10でnの一番右の桁(1の位)を取り出してsumに足し、n/=10で1桁削ります。これをnが0になるまで繰り返すと、全ての桁の合計が求まります。"},{type:"debug",long:!0,before:`int countVowels(string s){
`,after:`
}`,lead:"sの中の母音(a,i,u,e,o)の個数を数えてreturnする処理を書きなさい。",answers:[`int count=0;
for(int i=0;i<s.size();i++){
char c=s[i];
if(c=='a'||c=='i'||c=='u'||c=='e'||c=='o') count++;
}
return count;`],explain:"sを1文字ずつ調べ、'a','i','u','e','o'のどれかに一致するたびにcountを増やします。||(または)を使って複数の条件をまとめて判定しています。"},{type:"debug",long:!0,before:`int findMaxIndex(int* a, int n){
`,after:`
}`,lead:"配列aの中で最大値を持つ要素の添字をreturnする処理を書きなさい。",answers:[`int maxIdx=0;
for(int i=1;i<n;i++){
if(a[i]>a[maxIdx]) maxIdx=i;
}
return maxIdx;`],explain:"仮の最大値の添字maxIdxを0としておき、a[maxIdx]より大きい要素が見つかるたびにmaxIdxを更新します。"},{type:"debug",long:!0,before:`void printRange(int start, int end){
`,after:`
}`,lead:"startからendまでの整数を1行ずつ出力する処理(for文)を書きなさい。",answers:[`for(int i=start;i<=end;i++){
cout<<i<<endl;
}`],explain:"iをstartからendまで1ずつ増やしながら、その都度coutで出力します。"},{before:`int x = 100;
void show(){
  int x = 5;
  cout << x << endl; // 
}`,after:"",lead:"show関数の中で出力される値を半角数字で書きなさい。",answers:["5"],explain:"show関数の中で新しく宣言されたローカル変数xが、外側(グローバル)のxより優先されます(シャドーイング)。そのため出力は5になります。"},{before:`int main(){
  int a=1;
  {
    int a=2;
    {
      int a=3;
      cout << a << endl; // 一番内側のaが優先される
    }
  }
  return 0;
}
int innermost = `,after:";",answers:["3"],explain:"ブロックが入れ子になっていても、一番内側で宣言された変数が優先されます(シャドーイング)。そのため一番内側のcoutでは3が出力されます。"},{before:`void f(){
  int x=1;
  x = x + 1;
  cout << x << endl; // 
}`,after:"",lead:"f関数を呼び出したときに出力される値を半角数字で書きなさい。",answers:["2"],explain:"xは1で初期化され、x = x + 1;で1増えて2になります。coutではその2が出力されます。"},{before:`void tryModify(int x){ x=100; }
int main(){
  int a=5;
  tryModify(a);
  cout << a << endl; // 
  return 0;
}
int result = `,after:";",lead:"値渡しなのでaは変化しない。出力される値を半角数字で書きなさい。",answers:["5"],explain:"tryModifyは値渡しなので、関数の中でxを書き換えても、それはコピーを書き換えているだけです。呼び出し元のaは変化せず5のままです。"},{before:`void modify(int* p){ *p=100; }
int main(){
  int a=5;
  modify(&a);
  cout << a << endl; // 
  return 0;
}
int result = `,after:";",lead:"ポインタ渡しなのでaが変化する。出力される値を半角数字で書きなさい。",answers:["100"],explain:"modifyはポインタ渡しなので、*pを書き換えると呼び出し元のaも直接変わります。aは100になります。"},{before:`void modify(int& r){ r=100; }
int main(){
  int a=5;
  modify(a);
  cout << a << endl; // 
  return 0;
}
int result = `,after:";",lead:"参照渡しなのでaが変化する。出力される値を半角数字で書きなさい。",answers:["100"],explain:"modifyは参照渡しなので、rはaの別名です。rを書き換えると呼び出し元のaも直接変わり、aは100になります。"},{before:`// 関数を呼び出すときに渡す値のことを何と呼ぶか(漢字で、"実"から始まる)
`,after:"",answers:["実引数"],explain:"関数を呼び出すときに実際に渡す値のことを「実引数」と呼びます。関数を定義するときに書く変数(仮引数)と対になる言葉です。"},{before:`// 関数を定義するときに書く、値を受け取る変数のことを何と呼ぶか(漢字で、"仮"から始まる)
`,after:"",answers:["仮引数"],explain:"関数を定義するときに書く、値を受け取るための変数のことを「仮引数」と呼びます。呼び出すときに実際に渡す値(実引数)を受け取る、いわば入れ物の役割です。"}],qsExpert:[{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int add(int x,int y){ return x+y; }
double add(double x,double y){ return x+y; }
`,after:"",lead:"main関数の中で、add(2,3)とadd(1.5,2.5)をそれぞれ呼び出し、結果を1行ずつ出力する処理を書きなさい。",answers:[`int main(){
cout<<add(2,3)<<endl;
cout<<add(1.5,2.5)<<endl;
return 0;
}`],explain:"add(2,3)は整数を渡しているのでint版のaddが、add(1.5,2.5)は小数を渡しているのでdouble版のaddが、それぞれ自動的に選ばれて呼び出されます。呼び出す側は型を意識せず、同じ名前addで書けるのがオーバーロードの利点です。"},{type:"debug",long:!0,before:`int classify(int n){
`,after:`
}`,lead:"nが0より大きければ1、0より小さければ-1、0ならば0をreturnする処理を、if・else ifを使って書きなさい。",answers:[`if(n>0) return 1;
else if(n<0) return -1;
return 0;`],explain:"if(n>0)で正の数かどうかを判定し、そうでなければelse ifでさらに負の数かどうかを判定します。どちらの条件にも当てはまらなければ(つまりnが0であれば)、最後の行のreturn 0;にたどり着きます。1つの関数の中でも条件によって異なるreturn文が実行される、という流れを確認しましょう。"},{type:"debug",long:!0,before:`void swapVal(int a, int b){ int t=a; a=b; b=t; }
void swapPtr(int* a, int* b){ int t=*a; *a=*b; *b=t; }
int main(){
`,after:`
  return 0;
}`,lead:"x=1,y=2を宣言し、まずswapValを普通に呼び出し、続けてswapPtrをポインタ渡しで呼び出してから、x,yを1行ずつ出力する処理を書きなさい。",answers:[`int x=1,y=2;
swapVal(x,y);
swapPtr(&x,&y);
cout<<x<<endl;
cout<<y<<endl;`],explain:"swapVal(x,y);は値渡しなので、呼んでもx,yの中身は変わりません(1,2のまま)。続くswapPtr(&x,&y);はポインタ渡しなので、今度は実際にx,yの中身が入れ替わり、最終的にxは2、yは1として出力されます。同じ「入れ替えるつもりの関数」でも、渡し方次第で結果が変わることを確認する問題です。"},{type:"debug",long:!0,before:`bool contains(int* a, int n, int target){
`,after:`
}`,lead:"配列aの中にtargetと同じ値がある場合はtrueを、無ければfalseをreturnする処理を書きなさい。",answers:[`for(int i=0;i<n;i++){
if(a[i]==target) return true;
}
return false;`],explain:"配列を先頭から順番に見ていき、targetと一致する要素が見つかった時点でtrueをreturnして処理を終えます。forループを最後まで回してもtargetが見つからなければ、ループの外にあるreturn false;が実行されます。"},{type:"debug",long:!0,before:`int minOfThree(int a,int b,int c){
`,after:`
}`,lead:"a,b,cのうち最も小さい値をreturnする処理を書きなさい。",answers:[`int m=a;
if(b<m) m=b;
if(c<m) m=c;
return m;`],explain:"仮の最小値mをaとしておき、bがmより小さければmを更新し、続けてcもmより小さければさらに更新します。2回の比較を終えたときのmには、a,b,cの中の最小値が残っています。W4で学んだ「配列から最大値を探す」考え方を、3つの変数版にアレンジしたものです。"},{type:"debug",long:!0,before:`int add(int x,int y){ return x+y; }
int add(int x,int y,int z){ return x+y+z; }
int main(){
`,after:`
  return 0;
}`,lead:"add(1,2)とadd(1,2,3)をそれぞれ呼び出し、結果を1行ずつ出力する処理を書きなさい。",answers:[`cout<<add(1,2)<<endl;
cout<<add(1,2,3)<<endl;`],explain:"オーバーロードは、引数の型だけでなく個数によっても区別できます。add(1,2)は引数2個の版、add(1,2,3)は引数3個の版が、それぞれ自動的に選ばれます。"},{type:"debug",long:!0,before:`void printRange(int start,int end){
`,after:`
}`,lead:"startからendまでの整数を1つずつ出力するfor文を書きなさい。",answers:[`for(int i=start;i<=end;i++){
cout << i << endl;
}`],explain:"forループの開始値・終了条件に、引数として受け取った変数をそのまま使えます。i<=endとすることで、endの値も含めて出力されます。"},{type:"debug",long:!0,before:`bool isEven(int n){ return n%2==0; }
int main(){
  int n;
  cin >> n;
`,after:`
  return 0;
}`,lead:'isEven(n)がtrueなら"偶数"を、falseなら"奇数"を出力する処理を書きなさい。',answers:[`if(isEven(n)){
cout << "偶数" << endl;
}else{
cout << "奇数" << endl;
}`],explain:"if文の条件には、bool型を返す関数の呼び出しをそのまま書くことができます。isEven(n)の戻り値によって、出力する文字列を切り替えます。"},{type:"debug",long:!0,before:`void minMax(int a,int b,int* minVal,int* maxVal){
`,after:`
}`,lead:"aとbのうち小さい方を*minValに、大きい方を*maxValに書き込む処理を書きなさい。",answers:[`if(a<b){
*minVal=a;
*maxVal=b;
}else{
*minVal=b;
*maxVal=a;
}`],explain:"関数は1つの値しかreturnできませんが、ポインタ引数を使うと、複数の結果を同時に呼び出し元へ書き込んで返すことができます。"},{type:"debug",long:!0,before:`void minMax(int a,int b,int* minVal,int* maxVal){
  if(a<b){
    *minVal=a;
    *maxVal=b;
  }else{
    *minVal=b;
    *maxVal=a;
  }
}
int main(){
  int lo,hi;
`,after:`
  cout<<lo<<endl;
  cout<<hi<<endl;
  return 0;
}`,lead:"minMax関数を使って3と7の最小値・最大値をlo,hiに求める呼び出し行を書きなさい。",answers:["minMax(3,7,&lo,&hi);"],explain:"ポインタ引数に値を書き込んでもらいたいので、呼び出すときは&lo, &hiのようにアドレスを渡します。"},{type:"debug",long:!0,before:`void show(int x){ cout << "int:" << x << endl; }
void show(string x){ cout << "string:" << x << endl; }
int main(){
`,after:`
  return 0;
}`,lead:'show(5)とshow("Hi")をそれぞれ呼び出す処理を書きなさい。',answers:[`show(5);
show("Hi");`],explain:'show(5)は整数を渡しているのでint版が、show("Hi")は文字列を渡しているのでstring版が、それぞれ引数の型に応じて自動的に選ばれます。'},{type:"debug",long:!0,before:`void addToTotal(int& total, int amount){
`,after:`
}`,lead:"totalにamountを加算する処理を書きなさい(参照渡しなので呼び出し元のtotalも変わる)。",answers:["total += amount;"],explain:"totalは参照なので、関数の中でtotalを書き換えると、呼び出し元の変数そのものが変わります。"},{type:"debug",long:!0,before:`void addToTotal(int& total, int amount){ total += amount; }
int main(){
  int total = 0;
`,after:`
  cout << total << endl;
  return 0;
}`,lead:"addToTotalを使って10,20,30を順にtotalに加算する処理を書きなさい(結果は60になるはず)。",answers:[`addToTotal(total,10);
addToTotal(total,20);
addToTotal(total,30);`],explain:"参照渡しの関数を呼ぶときは&をつけず、変数名をそのまま渡します。3回の呼び出しで、totalは0→10→30→60と変化していきます。"},{type:"debug",long:!0,before:`double average(int* a, int n){
`,after:`
}`,lead:"配列aのn個の要素の平均をdouble型でreturnする処理を書きなさい。",answers:[`int sum=0;
for(int i=0;i<n;i++){
sum+=a[i];
}
return (double)sum/n;`],explain:"合計を求めたあと、int型同士の割り算では小数点以下が切り捨てられてしまうため、(double)でsumをdouble型に変換してから割ることで、平均を正しく小数として求められます。"},{type:"debug",long:!0,before:`void sortTwo(int* a, int* b){
`,after:`
}`,lead:"*aが*bより大きい場合だけ、2つの値を入れ替えて*aの方が小さくなるようにする処理を書きなさい。",answers:[`if(*a > *b){
int t=*a;
*a=*b;
*b=t;
}`],explain:"if(*a > *b)で入れ替えが必要かどうかを判定し、必要な場合だけ一時変数tを使って値を入れ替えます。すでに*aの方が小さい場合は何もしません。"}],qsDrag:[{type:"dragfill",lead:"同じ名前addで、double型引数2つを受け取るオーバーロード版になるよう、正しいピースを空欄に配置しなさい。",lines:[{code:"int add(int x, int y){ return x+y; }"},{blank:"b1"}],pieces:[{id:"p1",code:"double add(double x, double y){ return x+y; }"},{id:"p2",code:"int add(int x, int y){ return x-y; }"}],answerMap:{b1:"p1"},explain:"p1は引数の型がdoubleで、既存のint版と型が異なるため正しいオーバーロードになります。p2は引数の型・個数が既存のint版と全く同じで、処理内容が違うだけなので、これは正しいオーバーロードではなく単なる重複定義でありコンパイルエラーになります。"}]},{id:"w4",title:"CASE 04「十三番目の記録」",sub:"Week4 配列",emoji:"🧱",mon:"0番目から数えた犯人",lesson:[{title:"配列の基本",code:`int a[5] = {10,20,30,40,50};
cout << a[0] << endl; // 10
cout << a[4] << endl; // 50`,explain:"配列は、同じ型の変数をメモリ上に隙間なく連続して並べたものです。それぞれの箱には「添字(インデックス、要素番号)」という番号がついていますが、この番号は1からではなく0から始まります。そのため要素数(サイズ)が5の配列では、有効な添字は0,1,2,3,4の5つで、a[4]が最後の要素になります。日本語では「1番目」というと普通1から数えますが、プログラミングではa[0]が「1番目の要素」を指すことに最初は戸惑いやすいので、意識して慣れておきましょう。a[5]のように存在しない添字にアクセスすると、コンパイルエラーにはならず実行時に不具合(範囲外アクセス)が起きるので特に注意が必要です。"},{title:"配列を関数に渡す",code:`void printSum(int* a, int n){
  int sum=0;
  for(int i=0;i<n;i++) sum+=a[i];
  cout << sum << endl;
}`,explain:"配列を関数の引数として渡すと、実はその配列全体がコピーされるのではなく、「配列の先頭要素のアドレス」だけが渡され、関数の中では配列はただのポインタとして扱われます。ポインタになってしまうと「この配列が全部でいくつの要素を持っているか」という情報は失われてしまいます。そのため、配列を受け取る関数を作るときは、要素数(サイズ)も別の引数として一緒に渡してあげるのが基本です。この例のprintSum関数もint* aとint nの2つを受け取り、forループはi<nという条件でnまで繰り返すことで、渡された配列の範囲だけを正しく合計できるようになっています。"},{title:"バブルソート",code:`for(int i=1;i<n;i++)
  for(int j=n-1;j>=i;j--)
    if(a[j-1]>a[j]){
      int w=a[j]; a[j]=a[j-1]; a[j-1]=w;
    }`,explain:"配列の並べ替え(ソート)を行う代表的な方法の1つが「バブルソート」です。隣どうしの要素を1組ずつ比べていき、もし順番が逆(小さい順に並べたいのに左側の方が大きい)なら、その場で2つの値を交換します。これを配列の端から端まで繰り返し行い、さらにその一連の処理全体を配列のサイズ分だけ繰り返すことで、最終的にすべての要素が正しい順番に並びます。値が少しずつ正しい位置へ水面の泡(バブル)のように浮かび上がっていく様子から、この名前がつけられました。"}],qs:[{before:`int a[5] = {10,20,30,40,50};
// 添字は0から始まるので、最後の要素a[`,after:"]には50が入っている(半角数字を書く)",answers:["4"],explain:"配列の添字(要素番号)は0から始まります。サイズが5の配列なら有効な添字は0,1,2,3,4の5つで、最後の要素はa[4]になります。「サイズが5だから、最後の添字も5だろう」と勘違いしてa[5]にアクセスしてしまうのは初心者が非常によく犯すミスです。a[5]は本来存在しない場所なので、コンパイル時にはエラーにならなくても、実行時に予期しない値が出たりプログラムが異常終了したりする原因になります。「サイズがnなら、有効な添字は0からn-1まで」という公式のようにセットで覚えておきましょう。"},{before:`void printSum(int* a, int n){
  int sum=0;
  for(int i=0;i<n;i++) sum += a[i];
  cout << sum << endl;
}
int main(){
  int arr[]={1,2,3};
  printSum(arr, `,after:`); // 配列と一緒に渡す必要がある値(要素数)を半角数字で書く
}`,answers:["3"],explain:"配列を関数に渡すと、関数の中では配列がただの「先頭アドレスを指すポインタ」に格下げされてしまい、要素数(サイズ)の情報が失われます。printSum関数の中でsizeof(a)を使ってサイズを求めようとしても、配列全体のバイト数ではなく、ポインタ自体のサイズ(8バイト)が返ってきてしまい、正しく動きません。そのため配列を渡す関数にはサイズも一緒に渡す必要があります。ここでは配列arrの要素数3を、for(int i=0;i<n;i++)のnとして渡すことで、関数の中で正しくa[0]からa[2]までを合計できるようになります。"},{before:"",after:` int size = 3; // sizeを値の変更できない定数にしたい
int a[size];`,answers:["const"],explain:"変数の前にconstをつけると「値を変更できない定数」として扱われます。const int size = 3; と宣言した後で size = 4; のように書き換えようとすると、コンパイラがその場でエラーを出して教えてくれます。「うっかりプログラムの途中で値を書き換えてしまい、意図しない不具合が起きる」ことを防げるので、配列のサイズのように、一度決めたら変えるつもりのない値には積極的にconstをつけておくのが良い習慣とされています。"},{before:`int a[5];
// 宣言の後に中括弧で再代入すること a[5]={1,2,3,4,5}; は`,after:"(「できる」か「できない」で答えなさい)",answers:["できない"],explain:"{ }を使ったまとめての初期化(int a[5] = {1,2,3,4,5};のような書き方)は、変数を宣言するその瞬間にしか使えません。すでに宣言済みの配列に対して、後からもう一度 a[5] = {1,2,3,4,5}; のように書いても文法エラーになります。宣言済みの配列の中身をまとめて入れ替えたい場合は、for(int i=0;i<5;i++){ a[i] = 新しい値; } のように、for文を使って要素を1つずつ代入し直す必要があります。"},{before:`int a[]={7,3,9,2};
int w;
for(int i=1;i<4;i++){
  for(int j=3;j>=i;j--){
    if(a[j-1]`,after:`a[j]){
      w=a[j]; a[j]=a[j-1]; a[j-1]=w;
    }
  }
}
// 小さい順に並べ替えたいとき、隣接する要素を比較する不等号を書く`,answers:[">"],explain:"バブルソートでは、隣り合う2つの要素を比較して、順番が逆になっていたら交換する、という処理を繰り返します。「小さい順」に並べたい場合、隣り合う2要素のうち左側(a[j-1])の方が右側(a[j])より大きいなら、それは「逆順」なので交換が必要です。この条件を書いたのが if(a[j-1] > a[j]) です。もし逆に「大きい順」に並べ替えたいのであれば、条件を if(a[j-1] < a[j]) のように不等号を逆にするだけで、同じロジックのまま並べ替える方向を変えられます。"},{before:`int a[5];
cout << a << endl;
// 配列名だけを書くと何を表すか(「アドレス」という言葉を使って答えなさい)
`,after:"",answers:["アドレス","先頭要素のアドレス"],explain:"C++では、配列名を単独で(添字[ ]をつけずに)使うと、それは配列の中身(値)ではなく、配列の先頭要素a[0]が置かれているメモリ上の場所、つまり「アドレス」を表します。これは「配列名はポインタのように振る舞う」と言われる性質で、実際 cout << a; と cout << &a[0]; はほぼ同じアドレスを表示します。この性質があるからこそ、配列を関数に渡すときに printSum(arr, n); のように配列名だけを書けば、その先頭アドレスが自動的に渡されるようになっているのです。"},{before:`// 配列の隣接する要素を比較・交換することを繰り返して並べ替えるアルゴリズムの名前をカタカナで書きなさい
`,after:"",answers:["バブルソート"],explain:"隣り合う要素を比べて、順番が逆なら交換する、という操作を配列の端まで繰り返すことで並べ替えるアルゴリズムを「バブルソート」と呼びます。1回のひと通りの比較・交換(内側のforループ)を1パスと呼ぶとすると、1パス終えるごとに一番大きい(または小さい)値が少しずつ端の方へ押し出されていき、その様子が水面に向かって浮かび上がる泡(バブル)のように見えることからこの名前がつきました。書き方がシンプルで理解しやすい反面、要素数が多くなると比較・交換の回数が急激に増えるため、実務では他のもっと効率的な並べ替えアルゴリズム(クイックソートなど)が使われることも多いです。"},{before:`int a[3] = {5,10,15};
cout << a[1] << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["10"],explain:"添字は0から始まるので、a[1]は2番目の要素(10)です。"},{before:`int a[3] = {1,2,3};
int sum=0;
for(int i=0;i<3;i++){
  sum `,after:` a[i];
}`,lead:"sumにa[i]を加算する演算子を補いなさい。",answers:["+="],explain:"+=を使うと、sum = sum + a[i]; と同じ意味を短く書けます。"},{before:`int a[4];
a[0]=1;
a[`,after:"]=2; // 2番目の要素(添字1)に2を設定する",answers:["1"],explain:"2番目の要素の添字は1です(添字は0から始まります)。"},{before:`int a[10]; // サイズ10の配列を宣言(初期化なし)
cout << a[`,after:"] << endl; // 最後の要素の添字を書きなさい",answers:["9"],explain:"サイズ10の配列の添字は0〜9なので、最後の要素の添字は9です。"},{before:`int a[3] = {100,200,300};
cout << a[0] << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["100"],explain:"a[0]は配列の最初の要素なので100です。"},{before:`int a[5];
// サイズが5の配列で、有効な添字の範囲は0から何までか(半角数字)
int maxIndex = `,after:";",answers:["4"],explain:"サイズがnの配列の有効な添字は0からn-1までなので、サイズ5なら0〜4です。"},{before:`int a[4]={2,8,3,9};
int maxVal=a[0];
for(int i=1;i<4;i++){
  if(a[i]`,after:`maxVal) maxVal=a[i];
}`,lead:"a[i]がmaxValより大きいかを判定する不等号を補いなさい。",answers:[">"],explain:"a[i]がmaxValより大きい場合に更新したいので、>を使います。"},{before:`// 同じ型の値を複数まとめて扱うためのデータ構造を何と呼ぶか(カタカナで)
`,after:"",answers:["配列"],explain:"同じ型の値を複数まとめて扱うためのデータ構造を配列と呼びます。"}],qsHard:[{type:"debug",before:`int a[5]={1,2,3,4,5};
for(int i=0; `,after:`; i++){
  cout << a[i] << endl;
} // 範囲外アクセスになってしまう継続条件のバグを直しなさい(i<の形で)`,answers:["i<5"],altAnswers:["i<=4"],explain:"サイズ5の配列の有効な添字は0〜4です。i<=5だとi=5のときa[5]という存在しない要素にアクセスしてしまい、実行時に不具合を起こす原因になります。継続条件はi<5にする必要があります。(別解: i<=4でも同じ範囲になりますが、授業ではi<の形で教えています)"},{type:"choice",lead:"配列を関数に渡し、関数の中でsizeof(引数名)を書いた場合、何が返るか選びなさい。",options:["ポインタ自体のサイズ(例:8)","配列全体のバイト数","配列の要素数","コンパイルエラーになる"],answers:["ポインタ自体のサイズ(例:8)"],explain:"配列を関数に渡すと、関数の中では配列は先頭要素へのポインタとして扱われ、サイズの情報は失われます。そのためsizeof(引数名)は配列全体のバイト数ではなく、ポインタ自体のサイズ(64bit環境なら8)を返してしまいます。配列を渡す関数には、要素数を別の引数として一緒に渡す必要があります。"},{type:"order",lines:[{label:"A",code:"for(int i=1;i<n;i++)"},{label:"B",code:"  for(int j=n-1;j>=i;j--)"},{label:"C",code:"    if(a[j-1]>a[j]){"},{label:"D",code:`      int w=a[j]; a[j]=a[j-1]; a[j-1]=w;
    }`}],answers:["A,B,C,D"],explain:"バブルソートは外側のループ(A)で全体の周回数を、内側のループ(B)で隣接ペアの比較範囲を決め、隣が逆順なら(C)交換します(D)。この入れ子構造の順番を崩すと正しく並べ替えられません。"},{before:`int a[10];
for(int i=0;i<10;i++) a[i]=0;
// a[10]は存在しない要素なので、最後の要素にアクセスする正しい添字を書きなさい
int last = a[`,after:"];",answers:["9"],explain:"サイズ10の配列の添字は0〜9なので、最後の要素はa[9]です。a[10]は範囲外アクセスになり不具合の原因になります。"},{type:"choice",lead:"配列を関数の引数として渡すと、関数内部では配列は何として扱われるか選びなさい。",options:["先頭要素へのポインタ","配列のコピー全体","固定長の構造体","文字列"],answers:["先頭要素へのポインタ"],explain:"配列を関数に渡すと、実体がコピーされるのではなく、先頭要素のアドレス(ポインタ)として渡されます。そのため関数側でのsizeofはポインタ自体のサイズを返します。"},{type:"order",lines:[{label:"A",code:"int a[3]={5,1,3};"},{label:"B",code:"int maxVal=a[0];"},{label:"C",code:"for(int i=1;i<3;i++){ if(a[i]>maxVal) maxVal=a[i]; }"},{label:"D",code:"cout << maxVal << endl; // 5"}],answers:["A,B,C,D"],explain:"配列を初期化し(A)、仮の最大値を設定し(B)、残りの要素と比較しながら更新し(C)、最後に結果を出力します(D)。"},{before:"int a[5] = {",after:"}; // 全要素を0で初期化する最も簡潔な書き方",answers:["0"],explain:"{0}のように1つだけ0を書いておくと、残りの要素も自動的に0で初期化されます。"},{type:"choice",lead:"配列aのサイズが5のとき、a[-1]にアクセスするとどうなるか選びなさい。",options:["実行時に未定義の動作(不具合)を起こす可能性がある","コンパイルエラーになる","必ず0が返る","自動的にa[4]として扱われる"],answers:["実行時に未定義の動作(不具合)を起こす可能性がある"],explain:"C++は配列の添字が範囲内かどうかを自動的にチェックしてくれません。a[-1]のような範囲外アクセスは、コンパイルは通ってしまいますが、実行時に予測できない動作を引き起こす可能性があります。"},{before:`int a[5]={1,2,3,4,5};
int last = a[`,after:"]; // 最後の要素(5)を取得する添字",answers:["4"],explain:"サイズ5の配列の最後の要素の添字は4(サイズ-1)です。"},{type:"order",lines:[{label:"A",code:"int a[4]={4,2,3,1};"},{label:"B",code:"for(int i=1;i<4;i++){"},{label:"C",code:"  for(int j=3;j>=i;j--){"},{label:"D",code:`    if(a[j-1]<a[j]){ int w=a[j];a[j]=a[j-1];a[j-1]=w; }
  }
}`}],answers:["A,B,C,D"],explain:"降順(大きい順)にしたいので、比較の不等号を昇順のときと逆にし、a[j-1]がa[j]より小さいときに交換します。"},{type:"choice",lead:"配列を関数に渡すとき、要素数を別の引数として一緒に渡す必要があるのはなぜか選びなさい。",options:["配列は関数内でポインタとして扱われ、サイズの情報が失われるから","配列は関数に渡せないから","要素数は自動的に0になるから","ポインタには最大10個までしか渡せないから"],answers:["配列は関数内でポインタとして扱われ、サイズの情報が失われるから"],explain:"配列は関数に渡すとポインタとして扱われ、元の要素数の情報は失われてしまいます。そのため、別の引数(int nなど)として要素数を明示的に渡す必要があります。"},{before:`int a[5]={1,2,3,4,5};
int sum=0;
for(int i=0;i<5;i++){
  `,after:`;
}`,lead:"sumにa[i]を加算する処理を書きなさい。",answers:["sum += a[i]"],explain:"+=を使うと、sum = sum + a[i]; と同じ意味を短く書けます。"},{type:"order",lines:[{label:"A",code:"int a[3] = {10,20,30};"},{label:"B",code:"for(int i=0;i<3;i++){"},{label:"C",code:"  cout << a[i] << endl;"},{label:"D",code:"}"}],answers:["A,B,C,D"],explain:"配列を初期化し(A)、forループで(B)、各要素を出力し(C)、ループを閉じます(D)。"},{type:"choice",lead:"配列の要素は、メモリ上でどのように配置されているか選びなさい。",options:["隙間なく連続して並んでいる","ランダムな場所に散らばっている","要素ごとに別々のファイルに保存される","使うたびに新しく確保される"],answers:["隙間なく連続して並んでいる"],explain:"配列は宣言した時点で、同じ型の要素がメモリ上に隙間なく連続して並ぶように確保されます。この性質のおかげで、ポインタの加算(p+i)を使ったアクセスも可能になります。"},{before:`int a[5]={1,2,3,4,5};
for(int i=0;i<5/2;i++){
  int t=a[i];
  a[i]=a[`,after:`];
  a[4-i]=t;
}`,lead:"配列を逆順にする処理の空欄を埋めなさい(末尾からi番目の添字)。",answers:["4-i"],explain:"末尾からi番目の要素の添字は、サイズ-1-i(この場合4-i)で求められます。"}],qsExtra:[{before:`int a[5] = {1,2}; // 残りの要素は自動的にどんな値になるか
cout << a[4] << endl; // 半角数字で答えなさい
int expected = `,after:";",answers:["0"],explain:"{ }で一部の要素だけを指定して配列を初期化した場合、指定されなかった残りの要素は自動的に0で初期化されます。int a[5] = {1,2}; と書くとa[0]=1, a[1]=2で、a[2]からa[4]までは0になります。すべての要素を書かなくても安全に初期化できる、地味に便利な仕様です。"},{before:`int a[5]={3,9,2,7,5};
int maxVal=a[0];
for(int i=1;i<5;i++){
`,after:`
}`,lead:"配列aの中から最大値を探してmaxValに格納するfor文の中身を書きなさい。",answers:["if(a[i]>maxVal) maxVal=a[i];"],explain:"maxValをa[0]で仮の最大値としておき、残りの要素を1つずつ見ていって、maxValより大きい値が見つかるたびにmaxValを更新します。配列を1周し終えたときには、maxValに全要素中の最大値が入っています。"},{type:"debug",long:!0,before:`int a[5]={5,3,4,1,2};
int n=5;
`,after:"",lead:"配列aを小さい順に並べ替えるバブルソートの処理一式(for文2つとif文含む)を書きなさい。",answers:[`for(int i=1;i<n;i++){
for(int j=n-1;j>=i;j--){
if(a[j-1]>a[j]){
int w=a[j];a[j]=a[j-1];a[j-1]=w;
}
}
}`],explain:"外側のforで周回数を、内側のforで隣接ペアの比較範囲を決め、a[j-1]がa[j]より大きい(逆順の)ときだけ一時変数wを使って中身を交換します。この2重ループとif文の組み合わせがバブルソートの本体です。"},{type:"debug",long:!0,before:`int sumArray(int* a, int n){
`,after:`
}`,lead:"sumArray関数の中身に、配列aのn個の要素の合計を計算してreturnする処理を書きなさい。",answers:[`int sum=0;
for(int i=0;i<n;i++) sum+=a[i];
return sum;`],explain:"合計を入れる変数sumを0で初期化し、for文でi=0からn-1まで(サイズがnなら有効な添字は0〜n-1)a[i]を1つずつ足し込み、最後にsumをreturnします。配列を関数に渡すときは要素数nも一緒に渡す必要があることを思い出しましょう。"},{type:"choice",lead:"int a[5]; とだけ書いて中身を初期化しなかった場合、a[0]の値はどうなるか選びなさい。",options:["不定(ゴミデータ)で予測できない","必ず0になる","コンパイルエラーになる","必ず-1になる"],answers:["不定(ゴミデータ)で予測できない"],explain:"{ }を使って初期化しないまま宣言しただけの配列は、その時点でメモリ上にたまたま残っていた値(ゴミデータ)がそのまま入っており、値は不定で実行するたびに変わることがあります。安全に使うためには、必ず値を代入するか{ }で初期化してから使う必要があります。"},{type:"order",lines:[{label:"A",code:"int a[5];"},{label:"B",code:"for(int i=0;i<5;i++) cin >> a[i];"},{label:"C",code:"int sum=0;"},{label:"D",code:"for(int i=0;i<5;i++) sum += a[i];"},{label:"E",code:"cout << sum << endl;"}],lead:"5個の整数を読み込んで合計を出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D,E"],explain:"配列を宣言し(A)、キーボードから5個の値を読み込み(B)、合計用の変数を0で用意して(C)、配列の全要素を足し込み(D)、最後に結果を出力します(E)。合計を計算する前に、必ずsumを0で初期化しておく必要があります。"},{before:"int a[5] = ",after:"; // 全要素を0で初期化する簡潔な書き方",answers:["{0}"],explain:"{0}のように最初の要素だけ0を指定して初期化すると、残りの要素は自動的に0で埋められます。そのためint a[5] = {0}; と書くだけで、5個すべての要素が0になります。"},{before:`int a[5]={1,2,3,4,5};
int w=a[0];
`,after:"",lead:"a[0]とa[4]の中身を入れ替える残りの処理(2行)を書きなさい。",answers:[`a[0]=a[4];
a[4]=w;`],explain:"すでにa[0]の元の値がwに退避されているので、あとはa[0]にa[4]の値を代入し、最後にa[4]にwを代入すれば、2つの要素の中身が入れ替わります。"},{type:"debug",long:!0,before:`bool isSorted(int* a, int n){
`,after:`
}`,lead:"配列aがn個の要素すべて昇順に並んでいるかどうかをbool型でreturnする処理を書きなさい。",answers:[`for(int i=1;i<n;i++){
if(a[i-1]>a[i]) return false;
}
return true;`],explain:"隣り合う要素を順番に比較し、もし前の要素の方が大きい(順序が逆転している)ペアが1つでも見つかれば、その時点でfalseをreturnして処理を終えます。最後まで逆転が見つからなければtrueをreturnします。"},{type:"choice",lead:"配列を関数に値渡し(コピーとして丸ごと)で渡すことはできるか選びなさい。",options:["できない(常にポインタとして渡される)","できる","要素数が5以下ならできる","const配列だけできる"],answers:["できない(常にポインタとして渡される)"],explain:"C++では配列を関数の引数にすると、配列全体がコピーされることはなく、常に先頭要素へのポインタとして渡されます。そのため関数の中で配列の中身を書き換えると、呼び出し元の配列にも影響します。"},{type:"order",lines:[{label:"A",code:"int a[5]={1,2,3,4,5};"},{label:"B",code:"bool ok = isSorted(a,5);"},{label:"C",code:"cout << ok << endl; // 1"}],lead:"配列が昇順に並んでいるかを確認するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"配列を宣言してから(A)、isSorted関数に渡して結果を受け取り(B)、その結果(bool型)を出力します(C)。この配列はすでに昇順なので1(true)が表示されます。"},{before:`int a[3]={1,2,3};
int b[3];
for(int i=0;i<3;i++){
  `,after:`;
}`,answers:["b[i]=a[i]"],explain:"配列全体をそのままコピーする演算子はないため、for文で要素を1つずつ対応するb[i]に代入していきます。ループが終わるとbはaと同じ内容の配列になります。"},{before:`int a[5]={4,8,15,16,23};
int target=15;
int idx=-1;
for(int i=0;i<5;i++){
  if(a[i]==target) `,after:`;
}`,answers:["idx=i"],explain:"targetと一致する要素が見つかったら、そのときの添字iをidxに記録します。見つからなければidxは初期値の-1のままになります。"},{type:"choice",lead:"配列の要素を逆順に並べ替える処理で使われる一般的な考え方はどれか選びなさい。",options:["前半と後半の要素を1つずつ交換する","全要素を0にする","配列のサイズを2倍にする","sizeofで自動的に逆順になる"],answers:["前半と後半の要素を1つずつ交換する"],explain:"先頭からi番目と末尾からi番目の要素を1組ずつ交換していくことで、配列全体を逆順にできます。全体の半分の回数だけ交換すれば完了します。"},{type:"debug",long:!0,before:`int countEven(int* a, int n){
`,after:`
}`,lead:"配列aの中の偶数の個数を数えてreturnする処理を書きなさい(%演算子で判定できます)。",answers:[`int count=0;
for(int i=0;i<n;i++){
if(a[i]%2==0) count++;
}
return count;`],explain:"a[i]%2==0で偶数かどうかを判定し、偶数のたびにcountを増やします。ループを最後まで回し終えたcountには、偶数の個数が残ります。"},{before:`int a[4]={2,4,6,8};
int sum=0;
for(int i=0;i<4;i++) sum+=a[i];
int avg = sum / `,after:"; // 要素数で割って平均を求める(半角数字)",answers:["4"],explain:"合計を要素数(この場合4)で割ると平均が求められます。ただしint型同士の割り算は小数点以下が切り捨てられる点に注意しましょう。"},{before:"int ",after:"[3] = {7,14,21}; // aという名前でサイズ3の配列を宣言・初期化",answers:["a"],explain:"型名の後に変数名、続けて[サイズ]、そして{ }で初期値を書くのが配列宣言の基本形です。この場合は変数名aを補えば、サイズ3で{7,14,21}に初期化された配列になります。"},{type:"order",lines:[{label:"A",code:"int a[5]={4,8,15,16,23};"},{label:"B",code:`int idx=-1;
for(int i=0;i<5;i++){ if(a[i]==16) idx=i; }`},{label:"C",code:"cout << idx << endl; // 3"}],lead:"配列の中から値16の添字を探して出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"配列を宣言し(A)、値16と一致する添字を探してidxに記録し(B)、その結果を出力します(C)。16はa[3]にあるので3が表示されます。"},{type:"choice",lead:"配列の要素数を実行中に自由に変更したい場合、通常の配列(int a[5];)の代わりに何を使うべきか選びなさい。",options:["vector","string","struct","pointer単体"],answers:["vector"],explain:"通常の配列は宣言時にサイズが固定されますが、vectorはpush_backなどで実行中に自由に要素数を増減できます。「サイズが事前に分からない」「後から増やしたい」という場面ではvectorの方が向いています。"},{before:`int a[5]; // nは5以下の整数とする
int w=a[0];
a[0]=a[n-1];
a[n-1]=`,after:";",answers:["w"],explain:"すでにa[0]の元の値をwに退避しているので、最後にa[n-1]にwを代入すれば、a[0]とa[n-1]の中身が入れ替わります。"},{type:"debug",long:!0,before:`void shiftLeft(int* a, int n){
`,after:`
}`,lead:"配列aの要素を1つずつ前(添字の小さい方)にずらし、最後の要素を0にする処理を書きなさい。",answers:[`for(int i=0;i<n-1;i++){
a[i]=a[i+1];
}
a[n-1]=0;`],explain:"a[i]にa[i+1]の値を代入することを繰り返すと、全体が1つずつ前にずれます。ループはn-1回で十分で(最後の要素は代入元がないため)、最後にa[n-1]を0で埋めます。"},{before:`bool allPositive(int* a, int n){
  for(int i=0;i<n;i++){
    if(a[i]<=0) `,after:`;
  }
  return true;
}`,answers:["return false"],explain:"0以下の要素が1つでも見つかった時点でfalseをreturnして処理を終えます。ループを最後まで回り切って一度も引っかからなければ、全要素が正の数だったということなので、最後の行のtrueが返ります。"},{type:"choice",lead:"配列を宣言するとき、サイズに変数nを使いたい場合(int a[n];のように)、nはどうあるべきか選びなさい。",options:["コンパイル時に値が決まっている必要がある(通常はconstの整数)","必ずdouble型である","必ず0である","グローバル変数である必要がある"],answers:["コンパイル時に値が決まっている必要がある(通常はconstの整数)"],explain:"通常の配列のサイズは、プログラムをコンパイルする時点で決まっている必要があります。そのため実行時に変化する可能性のある普通の変数ではなく、constをつけた定数などを使うのが基本です。実行中にサイズを変えたい場合はvectorを使います。"},{before:`int a[4] = {10,20,30,40};
cout << a[`,after:"] << endl; // 30を表示したい(添字)",answers:["2"],explain:"添字は0から始まるので、3番目の値30はa[2]にあります。"},{before:`int a[6];
for(int i=0;i<6;i++) a[i]=i*i;
cout << a[3] << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい(a[3]=3*3)。",answers:["9"],explain:"ループでa[i]=i*iと代入しているので、a[3]には3*3=9が入っています。"},{before:`int a[5] = {1,1,1,1,1};
int sum=0;
for(int i=0;i<5;i++) sum+=a[i];
cout << sum << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["5"],explain:"1が5個分合計されるので、sumは5になります。"},{before:`int a[3] = {5,5,5};
a[1] = `,after:"; // a[1]を10に変更する",answers:["10"],explain:"配列の要素も普通の変数と同じように、添字を指定して直接代入で書き換えられます。"},{before:`int a[4];
for(int i=0;i<4;i++){
  `,after:`;
}`,lead:"配列の全要素をi*2で初期化するループの中身を書きなさい。",answers:["a[i]=i*2"],explain:"ループ変数iを使って、各要素にi*2(0,2,4,6)を代入していきます。"},{before:`int a[3]={7,8,9};
int total=a[0]+a[1]+`,after:";",lead:"3要素すべての合計を計算する式の続きを書きなさい。",answers:["a[2]"],explain:"a[0]+a[1]に続けてa[2]を足せば、3要素すべての合計になります。"},{before:`int a[6]={3,1,4,1,5,9};
int maxVal=a[0];
for(int i=1;i<6;i++){
  `,after:`;
}`,answers:["if(a[i]>maxVal) maxVal=a[i]"],explain:"maxValより大きい要素が見つかるたびに更新していくことで、最終的に最大値が残ります。"},{before:`int a[4]={9,2,7,4};
int minVal=a[0];
for(int i=1;i<4;i++){
  `,after:`;
}`,answers:["if(a[i]<minVal) minVal=a[i]"],explain:"minValより小さい要素が見つかるたびに更新していくことで、最終的に最小値が残ります。"},{before:`int a[5]={2,4,6,8,10};
int sum=0;
for(int i=0;i<5;i++) sum+=a[i];
double avg = sum / `,after:".0; // 小数の平均を求める(要素数)",answers:["5"],explain:"合計を要素数5で割ると平均が求まります。.0をつけて小数として割ることで、小数点以下も含めた正確な平均が得られます。"},{before:`int a[3]={10,20,30};
int product=1;
for(int i=0;i<3;i++) `,after:";",lead:"全要素の積を計算するループの中身を書きなさい。",answers:["product*=a[i]"],explain:"productを1で初期化し(0だと掛け算の結果が常に0になってしまうので注意)、各要素を掛け合わせていきます。"},{before:`int a[4]={-1,2,-3,4};
int count=0;
for(int i=0;i<4;i++){
  if(a[i]<0) `,after:`;
}`,answers:["count++"],explain:"a[i]<0という条件で負の数を判定し、条件を満たすたびにcountを増やします。"},{type:"choice",lead:"配列の要素にアクセスするとき、範囲外の添字(例: サイズ5の配列でa[5])にアクセスするとどうなるか選びなさい。",options:["コンパイルエラーにはならないが、実行時に問題を起こす可能性がある","必ず0が返る","自動的にサイズが拡張される","コンパイルエラーになる"],answers:["コンパイルエラーにはならないが、実行時に問題を起こす可能性がある"],explain:"C++は配列の範囲外アクセスをコンパイル時にはチェックしません。そのため実行時に予期しない値が出たり、プログラムが不安定になったりする原因になります。"},{type:"choice",lead:"int a[5] = {1,2,3}; のように、要素数より少ない初期値を書いた場合、残りの要素はどうなるか選びなさい。",options:["自動的に0になる","不定値(ゴミデータ)になる","コンパイルエラーになる","配列のサイズが自動的に縮む"],answers:["自動的に0になる"],explain:"{ }で一部の要素だけを指定して初期化すると、指定されなかった残りの要素は自動的に0で初期化されます。"},{type:"choice",lead:"配列名を関数の引数にすると、実際には何として渡されるか選びなさい。",options:["先頭要素へのポインタ","配列全体のコピー","要素数の情報を含む特別な型","文字列"],answers:["先頭要素へのポインタ"],explain:"配列を関数に渡すと、配列全体がコピーされるのではなく、先頭要素のアドレス(ポインタ)だけが渡されます。そのため要素数の情報は失われ、別途渡す必要があります。"},{type:"choice",lead:"バブルソートで要素数nの配列を並べ替えるとき、内側のループは何をしているか選びなさい。",options:["隣接する要素を比較して、逆順なら交換する","全要素を0で初期化する","最大値だけを探す","配列のコピーを作る"],answers:["隣接する要素を比較して、逆順なら交換する"],explain:"内側のループでは、隣り合う2つの要素を比較し、順番が逆であれば交換します。これを繰り返すことで、少しずつ正しい順序に近づいていきます。"},{type:"choice",lead:"2つの配列(同じ要素数)の中身が完全に一致するかどうかを調べる一般的な方法として正しいものを選びなさい。",options:["for文で対応する要素を1つずつ比較する","==演算子で配列同士を直接比較する","sizeofで比較する","配列名同士を比較する"],answers:["for文で対応する要素を1つずつ比較する"],explain:"C++では配列同士を==で直接比較することはできません(それはアドレスの比較になってしまいます)。中身を比較したい場合は、for文で対応する要素を1つずつ比較する必要があります。"},{type:"order",lines:[{label:"A",code:"int a[5]={5,4,3,2,1};"},{label:"B",code:`int maxVal=a[0];
for(int i=1;i<5;i++){ if(a[i]>maxVal) maxVal=a[i]; }`},{label:"C",code:"cout << maxVal << endl; // 5"}],lead:"配列の最大値を求めて出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"配列を宣言し(A)、最大値を探して(B)、その結果を出力します(C)。"},{type:"order",lines:[{label:"A",code:"int a[4];"},{label:"B",code:"for(int i=0;i<4;i++) cin >> a[i];"},{label:"C",code:`int sum=0;
for(int i=0;i<4;i++) sum+=a[i];`},{label:"D",code:"cout << sum << endl;"}],lead:"4個の値を読み込んで合計を出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"配列を宣言し(A)、値を読み込み(B)、合計を計算し(C)、最後に出力します(D)。"},{type:"order",lines:[{label:"A",code:"int a[3]={1,2,3};"},{label:"B",code:`int b[3];
for(int i=0;i<3;i++) b[i]=a[i];`},{label:"C",code:"b[0]=99;"},{label:"D",code:"cout << a[0] << endl; // 1(bを変えてもaは変わらない)"}],lead:"配列aをbにコピーし、bだけを書き換えてもaが変わらないことを確認するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"aを宣言し(A)、要素ごとにbへコピーし(B)、bだけを書き換えても(C)、aとbは別々のメモリ領域なのでaは影響を受けません(D)。"},{type:"debug",long:!0,before:`void fillSquares(int* a, int n){
`,after:`
}`,lead:"配列aの各要素a[i]にi*iを代入する処理を書きなさい。",answers:[`for(int i=0;i<n;i++){
a[i]=i*i;
}`],explain:"ループ変数iを使って、各要素にi*i(その添字の2乗)を代入していきます。"},{type:"debug",long:!0,before:`int countNegative(int* a, int n){
`,after:`
}`,lead:"配列aの中の負の数の個数を数えてreturnする処理を書きなさい。",answers:[`int count=0;
for(int i=0;i<n;i++){
if(a[i]<0) count++;
}
return count;`],explain:"a[i]<0で負の数かどうかを判定し、条件を満たすたびにcountを増やします。"},{type:"debug",long:!0,before:`void copyArray(int* src, int* dest, int n){
`,after:`
}`,lead:"src配列の中身をdest配列にコピーする処理を書きなさい。",answers:[`for(int i=0;i<n;i++){
dest[i]=src[i];
}`],explain:"対応する添字のsrc[i]をdest[i]に代入していくことで、配列全体をコピーできます。"},{type:"debug",long:!0,before:`bool contains(int* a, int n, int target){
`,after:`
}`,lead:"配列aの中にtargetと同じ値があるかどうかをbool型でreturnする処理を書きなさい。",answers:[`for(int i=0;i<n;i++){
if(a[i]==target) return true;
}
return false;`],explain:"配列を先頭から順に調べ、targetと一致する要素が見つかった時点でtrueをreturnします。最後まで見つからなければfalseをreturnします。"},{type:"debug",long:!0,before:`int sumOfSquares(int* a, int n){
`,after:`
}`,lead:"配列aの各要素の2乗の合計をreturnする処理を書きなさい。",answers:[`int sum=0;
for(int i=0;i<n;i++){
sum += a[i]*a[i];
}
return sum;`],explain:"各要素の2乗(a[i]*a[i])を計算してsumに足し込んでいきます。"},{type:"debug",long:!0,before:`void doubleAll(int* a, int n){
`,after:`
}`,lead:"配列aの全要素を2倍にする処理を書きなさい。",answers:[`for(int i=0;i<n;i++){
a[i] *= 2;
}`],explain:"*=演算子を使って、各要素をその場で2倍に更新していきます。"},{before:`int a[5]={3,6,9,12,15};
int target=9;
int foundIndex=-1;
for(int i=0;i<5;i++){
  if(a[i]==target) `,after:`;
}`,answers:["foundIndex=i"],explain:"targetと一致する要素が見つかったら、そのときの添字iをfoundIndexに記録します。"},{before:`int a[4]={1,2,3,4};
bool found=false;
for(int i=0;i<4;i++){
  if(a[i]==100) `,after:`;
}`,answers:["found=true"],explain:"条件を満たす要素が見つかった時点でfoundをtrueに変更します。"},{before:`int a[5]={2,4,6,8,10};
int count=0;
for(int i=0;i<5;i++){
  if(a[i]%2==0) `,after:`;
}`,lead:"偶数の個数を数える処理の続きを書きなさい。",answers:["count++"],explain:"a[i]%2==0で偶数かどうかを判定し、条件を満たすたびにcountを増やします。"},{before:`int a[6]={1,2,3,4,5,6};
int sumEven=0;
for(int i=0;i<6;i++){
  if(a[i]%2==0) `,after:`;
}`,lead:"偶数だけを合計する処理の続きを書きなさい。",answers:["sumEven+=a[i]"],explain:"偶数と判定された要素だけをsumEvenに足し込みます。"},{before:`int a[5]={1,2,3,4,5};
for(int i=0;i<5;i++){
  `,after:`;
}`,lead:"全要素に10を加える処理を書きなさい。",answers:["a[i]+=10"],explain:"+=演算子を使って、各要素に10をその場で加算していきます。"},{before:`int a[4]={1,2,3,4};
for(int i=0;i<4;i++){
  `,after:`;
}`,lead:"全要素を0でリセットする処理を書きなさい。",answers:["a[i]=0"],explain:"各要素に0を代入することで、配列全体をリセットできます。"},{before:`int a[5]={1,2,3,4,5};
int temp=a[0];
for(int i=0;i<4;i++){
  a[i]=a[i+1];
}
a[4]=`,after:";",lead:"配列を1つ前にずらし、最後の要素に元の先頭の値(temp)を入れる処理を完成させなさい。",answers:["temp"],explain:"すでにtempに元のa[0]の値を退避してあるので、ずらし終えた最後にa[4]へtempを代入すれば、循環的なシフトが完成します。"},{before:`int a[3]={1,2,3};
int b[3]={1,2,3};
bool same=true;
for(int i=0;i<3;i++){
  if(a[i]!=b[i]) `,after:`;
}`,answers:["same=false"],explain:"対応する要素が1つでも異なればsameをfalseに変更します。全て一致すればsameはtrueのままです。"},{before:`int a[3]={1,2,3};
int b[3];
for(int i=0;i<3;i++) `,after:";",lead:"aの内容をbにコピーするループの中身を書きなさい。",answers:["b[i]=a[i]"],explain:"対応する添字の要素を1つずつコピーしていきます。"},{before:`int a[4]={1,2,3,4};
int b[4]={4,3,2,1};
int sum=0;
for(int i=0;i<4;i++) sum += a[i]`,after:";",lead:"対応する要素同士を掛けて合計する式を完成させなさい(内積)。",answers:["*b[i]"],explain:"a[i]*b[i]を計算してsumに足し込むことで、2つの配列の「内積」と呼ばれる値が求まります。"},{before:`int a[3]={1,2,3};
int b[3]={4,5,6};
int c[3];
for(int i=0;i<3;i++) c[i]=a[i]`,after:";",lead:"対応する要素同士を足してcに格納する式を完成させなさい。",answers:["+b[i]"],explain:"a[i]+b[i]を計算してc[i]に代入することで、2つの配列を要素ごとに足し合わせたcが得られます。"},{before:`// 配列のサイズを実行中に変更したい場合、通常の配列の代わりに使うべきクラス名を書きなさい
`,after:"",answers:["vector"],explain:"通常の配列はサイズが固定されますが、vectorはpush_backなどで実行中に自由に要素数を増減できます。"},{before:`int a[5]={1,2,3,4,5};
// aという配列名だけをcoutで出力すると何が表示されるか(カタカナか漢字で)
`,after:"",answers:["アドレス"],explain:"配列名を単独で使うと、その配列の先頭要素のアドレスを表します。"},{before:`int a[5];
// 配列のサイズ(要素数)を宣言時に指定せず後から変えることは通常の配列ではできるか
`,after:"",lead:"「できる」か「できない」で答えなさい。",answers:["できない"],explain:"通常の配列は宣言した時点でサイズが固定され、後から変更することはできません。サイズを変えたい場合はvectorを使います。"},{before:`int a[100]; // 大きめに確保しておき、実際に使うのはn個だけ、という書き方はよく使われる。
// このときnのような「実際に使っている要素数」を別途持ち歩く必要がある理由を一言で書きなさい
`,after:"",lead:"「要素数」という言葉を使って一言で答えなさい。",answers:["要素数がわからないから","要素数が別途必要だから"],explain:"配列自体は「今実際に何個使っているか」という情報を持っていません。配列を確保したサイズ(100)と、実際に使っている要素数(n)は別の話なので、nを別の変数として持ち歩く必要があります。"}],qsExpert:[{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
`,after:`
  return 0;
}`,lead:"サイズ5の配列aを{5,3,4,1,2}で宣言し、これまでのfor文の型でバブルソートしたあと、全要素を1行ずつ出力する処理を書きなさい。",answers:[`int a[5]={5,3,4,1,2};
for(int i=1;i<5;i++){
for(int j=4;j>=i;j--){
if(a[j-1]>a[j]){
int w=a[j];a[j]=a[j-1];a[j-1]=w;
}
}
}
for(int i=0;i<5;i++){
cout<<a[i]<<endl;
}`],explain:"まず配列を初期化し、これまでと同じ形のバブルソート(外側i、内側j、隣接比較・交換)で並べ替えます。並べ替えが終わったあとにもう1つforループを回し、a[0]からa[4]までを1行ずつ出力します。"},{type:"debug",long:!0,before:`void reverseArray(int* a, int n){
`,after:`
}`,lead:"配列aの中身を前後逆順に並べ替える処理を書きなさい(前半と後半を1つずつ入れ替えていく方法でよい)。",answers:[`for(int i=0;i<n/2;i++){
int w=a[i];a[i]=a[n-1-i];a[n-1-i]=w;
}`],explain:"先頭からi番目と、末尾からi番目(添字n-1-i)を1組ずつ交換していきます。全体の半分(n/2回)だけ交換すれば、配列全体が逆順になります。整数同士の割り算n/2は小数点以下が切り捨てられる点も思い出しておきましょう。"},{type:"debug",long:!0,before:`void findMinMax(int* a, int n, int* minOut, int* maxOut){
`,after:`
}`,lead:"配列aの中の最小値をminOutが指す先に、最大値をmaxOutが指す先に、それぞれ書き込む処理を書きなさい(ポインタ引数を通して結果を返す)。",answers:[`*minOut=a[0]; *maxOut=a[0];
for(int i=1;i<n;i++){
if(a[i]<*minOut) *minOut=a[i];
if(a[i]>*maxOut) *maxOut=a[i];
}`],explain:"関数は戻り値を1つしかreturnできないため、最小値と最大値の2つを同時に呼び出し元へ返したいときは、ポインタ引数を使って「書き込んでほしい場所」を渡してもらう方法が使えます。*minOut、*maxOutに直接結果を書き込めば、呼び出し元は自分の変数のアドレスを渡すだけで両方の結果を受け取れます。"},{type:"debug",long:!0,before:`int countValue(int* a, int n, int target){
`,after:`
}`,lead:"配列aの中にtargetと同じ値がいくつあるかを数えてreturnする処理を書きなさい。",answers:[`int count=0;
for(int i=0;i<n;i++){
if(a[i]==target) count++;
}
return count;`],explain:"countを0で初期化し、配列を先頭から順に見ていって、targetと一致するたびにcountを1つずつ増やします。ループを最後まで回し終えたら、countには一致した個数がそのまま残っています。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
  int n;
  cin >> n;
  int a[100];
`,after:`
  return 0;
}`,lead:"nに読み込んだ個数ぶん配列aに値をcinで読み込み、その合計をcoutで出力する処理を書きなさい。",answers:[`for(int i=0;i<n;i++){
cin>>a[i];
}
int sum=0;
for(int i=0;i<n;i++){
sum+=a[i];
}
cout<<sum<<endl;`],explain:"1つ目のforでn個ぶんの値をcinで読み込み、2つ目のforでsumに全要素を足し込みます。あらかじめ配列のサイズを100のように余裕を持って宣言しておき、実際に使うのはnの範囲だけ、という書き方はよく使われます。"},{type:"debug",long:!0,before:`void removeAt(int* a, int n, int index){
`,after:`
}`,lead:"配列aのindex番目の要素を削除するイメージで、index以降の要素を1つずつ前へシフトする処理を書きなさい(nは削除前の要素数とする)。",answers:[`for(int i=index;i<n-1;i++){
a[i]=a[i+1];
}`],explain:"index番目を消すには、その後ろにある要素を1つずつ手前に詰めていきます。a[i]=a[i+1]をindexからn-2まで繰り返すことで、全体が1つ前にずれます。"},{type:"debug",long:!0,before:`void insertAt(int* a, int n, int index, int value){
`,after:`
}`,lead:"index番目にvalueを挿入するイメージで、末尾からindexまでの要素を1つずつ後ろへシフトしてから、index番目にvalueを設定する処理を書きなさい(配列には十分な余裕があるとする)。",answers:[`for(int i=n;i>index;i--){
a[i]=a[i-1];
}
a[index]=value;`],explain:"末尾側から順にa[i]=a[i-1]でずらしていくことで、途中の要素を上書きせずに後ろへ詰められます。すべてずらし終えたあとにindex番目へvalueを設定すれば挿入が完了します。"},{type:"debug",long:!0,before:`void selectionSort(int* a, int n){
`,after:`
}`,lead:"選択ソート(各周でi番目以降の最小値を探し、i番目と交換する)でaを昇順に並べ替える処理を書きなさい。",answers:[`for(int i=0;i<n-1;i++){
int minIdx=i;
for(int j=i+1;j<n;j++){
if(a[j]<a[minIdx]) minIdx=j;
}
int t=a[i];a[i]=a[minIdx];a[minIdx]=t;
}`],explain:"バブルソートとは違い、選択ソートはまず「未処理の範囲の中で最小の要素の場所」を探してからi番目と1回だけ交換します。これをi=0からn-2まで繰り返すことで、全体が昇順に並びます。"},{type:"debug",long:!0,before:`void reverseArray(int* a, int n){
  for(int i=0;i<n/2;i++){
    int w=a[i];a[i]=a[n-1-i];a[n-1-i]=w;
  }
}
int main(){
  int a[4]={1,2,3,4};
`,after:`
  return 0;
}`,lead:"reverseArrayを呼び出したあと、配列を1行ずつ出力する処理を書きなさい(4,3,2,1の順になるはず)。",answers:[`reverseArray(a,4);
for(int i=0;i<4;i++){
cout<<a[i]<<endl;
}`],explain:"reverseArray(a,4);を呼ぶと配列の中身がその場で逆順に書き換わるので、そのあとに出力するfor文では逆順の値(4,3,2,1)が表示されます。"},{type:"debug",long:!0,before:`void prefixSum(int* a, int* result, int n){
`,after:`
}`,lead:"aの累積和(result[i]がa[0]からa[i]までの合計になるようにする)をresultに書き込む処理を書きなさい。",answers:[`int sum=0;
for(int i=0;i<n;i++){
sum += a[i];
result[i] = sum;
}`],explain:"sumを0から始め、要素を1つ処理するごとにsumへ足し込みながら、その時点までの合計をresult[i]に書き込んでいきます。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
  int a[5]={2,8,3,9,1};
  int sum=0;
  for(int i=0;i<5;i++) sum+=a[i];
  double avg = (double)sum/5;
  int count=0;
`,after:`
  cout << count << endl;
  return 0;
}`,lead:"aの中でavgより大きい要素の個数を数える処理を書きなさい。",answers:[`for(int i=0;i<5;i++){
if(a[i]>avg) count++;
}`],explain:"平均avgをあらかじめ求めておき、各要素と比較してavgより大きければcountを1つ増やします。"},{type:"debug",long:!0,before:`int search(int* a, int n, int target){
`,after:`
}`,lead:"配列aの中からtargetと同じ値を探し、見つかった添字をreturnする処理を書きなさい(見つからない場合は-1をreturnする)。",answers:[`for(int i=0;i<n;i++){
if(a[i]==target) return i;
}
return -1;`],explain:"見つかった時点でその添字iをreturnし、最後まで見つからなければループの外で-1をreturnします。-1は「有効な添字ではありえない値」として、見つからなかったことを表す定番の目印です。"},{type:"debug",long:!0,before:`void copyArray(int* src, int* dest, int n){
`,after:`
}`,lead:"srcの内容をdestにそのままコピーする処理を書きなさい。",answers:[`for(int i=0;i<n;i++){
dest[i] = src[i];
}`],explain:"配列同士は=でまとめてコピーできないため、要素を1つずつdest[i]=src[i]と代入していく必要があります。"},{type:"debug",long:!0,before:`bool isSorted(int* a, int n){
`,after:`
}`,lead:"配列aが昇順に並んでいるかどうかをbool型でreturnする処理を書きなさい。",answers:[`for(int i=1;i<n;i++){
if(a[i-1]>a[i]) return false;
}
return true;`],explain:"隣り合う要素を順番に比較し、前の方が後ろより大きい(順序が逆転している)組が1つでもあればfalseをreturnします。最後まで問題がなければtrueをreturnします。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
int main(){
`,after:`
  return 0;
}`,lead:"サイズ4の配列aを{3,1,4,2}で宣言し、これまでのfor文の型で降順(大きい順)にバブルソートしたあと、全要素を1行ずつ出力する処理を書きなさい。",answers:[`int a[4]={3,1,4,2};
for(int i=1;i<4;i++){
for(int j=3;j>=i;j--){
if(a[j-1]<a[j]){
int w=a[j];a[j]=a[j-1];a[j-1]=w;
}
}
}
for(int i=0;i<4;i++){
cout<<a[i]<<endl;
}`],explain:"降順にしたいので、比較の不等号を昇順のときと逆にし、a[j-1]がa[j]より小さいときに交換します。並べ替えが終わったあとに全要素を出力します。"}],qsDrag:[{type:"dragfill",lead:"バブルソートの外側・内側のfor文の見出し行になるよう、正しいピースを順番に配置しなさい。",lines:[{code:"int a[5]={5,3,4,1,2};"},{blank:"b1"},{blank:"b2"},{code:"if(a[j-1]>a[j]){"},{code:"  int w=a[j];a[j]=a[j-1];a[j-1]=w;"},{code:"}}}"}],pieces:[{id:"p1",code:"for(int i=1;i<5;i++){"},{id:"p2",code:"for(int j=4;j>=i;j--){"},{id:"p3",code:"for(int i=0;i<5;i++){"}],answerMap:{b1:"p1",b2:"p2"},explain:"外側のループはi=1から始めます(p1)。p3のようにi=0から始めてしまうと、内側のfor(int j=4;j>=i;j--)の範囲がずれてしまい、正しく並べ替えられません。内側は毎回n-1(=4)から始め、iまで減らしながら隣接ペアを比較します(p2)。"}]},{id:"w5",title:"CASE 05「途切れたメッセージ」",sub:"Week5 文字列",emoji:"📜",mon:"終端文字を消した者",lesson:[{title:"文字列とヌル文字",code:`char word[] = "hello";
cout << word << endl;   // hello
cout << sizeof(word) << endl; // 6 (ヌル文字込み)`,explain:'C++における「文字列」の実体は、char型(1文字を表す型)の変数を並べた配列です。"hello"のように""で文字列を書くと、コンパイラは自動的にh,e,l,l,oの5文字に加えて、末尾に「ヌル文字」と呼ばれる特別な文字(\\0、値としては0)を付け加えてくれます。coutなどが文字列を表示するときは、このヌル文字が現れるところまでを「1つの文字列の終わり」とみなして処理します。そのためsizeof(word)のようにこの配列全体のバイト数を調べると、見た目の文字数(5文字)より1つ多い6が返ってきます。「見えている文字数+1」が配列全体のサイズになる、という点を意識しておきましょう。'},{title:"stringクラス",code:`#include <string>
string s = "Hello";
s += "!";
cout << s << endl; // Hello!`,explain:'char配列で文字列を扱うと、ヌル文字の管理やサイズの計算などを自分で意識しなければならず面倒です。そこでC++には、文字列をもっと手軽に扱うためのstringというクラスが標準で用意されています。<string>ヘッダをインクルードすれば使え、string s = "Hello"; のように、まるで普通の変数のように文字列を代入できます。s += "!"; のように+=演算子で文字列の末尾に別の文字列を連結したり、s.size()で今の文字数を調べたり、s.at(1)で特定の位置の文字を取り出したりと、char配列を自分で操作するより格段に簡単に文字列を扱えるようになります。'},{title:"ファイル入出力",code:`#include <fstream>
fstream fin;
fin.open("data.txt", ios::in);
string line;
getline(fin, line);`,explain:'これまで使ってきたcout, cinは画面(コンソール)とのやり取りに使うものでしたが、ファイルを読み書きしたいときは<fstream>ヘッダにあるfstreamクラスを使います。fin.open("data.txt", ios::in); のように、開きたいファイル名と、どのようなモードで開くかをopen()メソッドに渡します。ios::inは「読み込み(input)」、ios::outは「書き込み(output)」を表す指定子です。ファイルを開いたあとは、cinで画面から読み込むのとほぼ同じ感覚で fin >> 変数 や getline(fin, line) のように読み込むことができます。getlineは、区切り文字(スペースなど)ではなく「改行」までをまとめて1行分読み込んでくれる関数で、氏名のようにスペースを含むデータを読み込みたいときに特に便利です。'}],qs:[{before:`char word[] = "hello";
// 文字列の終わりを示すために自動的に付け加えられる特別な文字を、\\記法で書きなさい
`,after:"",answers:["\\0"],explain:"文字列(char配列)の末尾には、自動的に「ヌル文字」と呼ばれる特別な文字が付け加えられます。プログラム中では\\0と書き表し、値としては0そのものです(見た目の文字が印刷されるわけではありません)。coutや文字列を扱うさまざまな関数は、この特別な値0=ヌル文字が現れるところまでを「1つの文字列」として扱う決まりになっています。つまりヌル文字は「文字列はここでおしまいです」という目印の役割を果たしているのです。"},{before:`char word[] = "hello";
cout << `,after:" word << endl; // 配列全体のバイト数(ヌル文字含む)を調べる演算子",answers:["sizeof"],explain:'sizeofは、変数や配列が実際にメモリ上でどれだけのバイト数を占めているかを教えてくれる演算子です。"hello"という文字列は見た目には5文字ですが、char配列にする際、目に見えない末尾のヌル文字(\\0)が自動的に1つ追加されるため、実際に確保されているメモリは6バイト分になります。そのためsizeof(word)は5ではなく6を返します。「文字列の見た目の長さ」と「実際に使っているメモリのサイズ」は1つずれる、という点を覚えておきましょう(ちなみに見た目の文字数だけを知りたいときはstring型のsize()メソッドを使うと、ヌル文字を含まない5が返ってきます)。'},{before:`// UTF-8で書かれた日本語1文字(「あ」など)は通常何バイトか、半角数字で答えなさい
int bytesOfJapaneseChar = `,after:";",answers:["3"],explain:"コンピュータは文字そのものを直接扱うことができず、内部ではすべての文字を「数値」として表現しています。この「どの数値がどの文字に対応するか」を決めたルールを文字コードと呼び、C++はUTF-8という文字コードに標準で対応しています。UTF-8はアルファベットなどのASCII文字(半角英数字)を1バイトで表現できる一方、日本語のようにたくさんの種類がある文字は、1文字を表すのに複数バイトを組み合わせて使います。日常的に使われるひらがな・カタカナ・常用漢字の多くは3バイトで表現されるため、char配列で日本語の文字列を扱うときは、見た目の文字数とバイト数が大きくずれる点に注意が必要です。"},{before:"#include <",after:`>
// string型を使うために必要なヘッダ
string word = "Hello";`,answers:["string"],explain:"C++のstring型を使うには、他の機能と同じように、その機能がまとめられているヘッダファイル<string>を#includeでインクルードする必要があります。stringクラスを使うと、char配列を自分でヌル文字まで管理しながら操作するのに比べて、はるかに簡単に文字列を扱えます。たとえば2つの文字列をつなげたいときは単に+演算子や+=演算子を使えばよく、文字数を知りたいときは.size()メソッドを呼ぶだけで済みます。これから文字列を扱うプログラムを書くときは、特別な理由がない限りchar配列よりstring型を使う方が安全で書きやすいでしょう。"},{before:`fstream fin;
fin.open("data.txt", ios::`,after:"); // ファイルを「読み込み」モードで開きたい",answers:["in"],explain:"fstreamでファイルを開くとき(open()メソッドを呼ぶとき)は、そのファイルをどんな目的で使うかを第2引数で指定する必要があります。読み込み(データを取り出したいだけ)ならios::in、書き込み(新しくデータを書き込みたい)ならios::outを指定します。「ファイルの中身をプログラムに取り込みたい(in)のか、プログラムからファイルへ出力したい(out)のか」という向きをイメージすると覚えやすいでしょう。ちなみに読み書き両方を同時に行いたい場合は、ios::in | ios::outのように|(ビット単位のOR)でつなげて両方指定することもできます。"},{before:`#include <fstream>
// ファイルの入出力に使うクラス名を書きなさい
`,after:" fin;",answers:["fstream"],explain:"画面(コンソール)への入出力を扱うクラスがiostream(cout, cinなどが用意されている)であるのに対して、ファイルへの読み書きを扱うクラスはfstreamです。役割ごとにクラスが分かれているのは、C++の標準ライブラリが「必要な機能だけを取り込んで使う」という設計になっているためです。fstream fin; のようにfstream型の変数を1つ用意し、その変数のopen()メソッドでファイルを開き、finに対して >> や getline を使って読み込んでいく、という流れになります。"},{before:`char word[] = {'h','e','l','l','o'};
// ヌル文字が無いと、coutは文字列の終わりを判断できず意図しない場所まで表示してしまう。
// coutが文字列の終わりを見つける手がかりにしている文字を\\記法で書きなさい
`,after:"",answers:["\\0"],explain:`coutは文字列を表示するとき、char配列の先頭から1文字ずつ順番に見ていき、ヌル文字(\\0)が現れたところで「ここで文字列は終わり」と判断して出力を止めます。この問題のように{'h','e','l','l','o'}とだけ書いてヌル文字を入れ忘れると、coutはどこで止まればよいか分からず、helloの後ろにたまたまメモリ上に置かれている別のデータまで、ヌル文字が見つかるまでずっと読み進めて表示してしまいます。その結果、意味不明な記号や文字化けしたような文字列が続けて表示されてしまうことがあります。文字列を自分でchar配列として作るときは、ヌル文字を入れ忘れないよう特に注意しましょう(ちなみに"..."で書いた場合は自動でヌル文字が付くので、この問題は起きません)。`},{before:`string s = "abc";
s += "def";
cout << s << endl; // `,after:"",lead:"出力される内容を書きなさい。",answers:["abcdef"],explain:'+=は末尾に文字列を追加(連結)する演算子です。"abc"に"def"を追加すると"abcdef"になります。'},{before:`string s = "Hi";
s += "!";
cout << s << endl; // `,after:"",lead:"出力される内容を書きなさい。",answers:["Hi!"],explain:'+=は末尾に文字列を連結する演算子です。"Hi"に"!"を足すと"Hi!"になります。'},{before:`string a = "cat";
string b = "cat";
cout << (a==b) << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい(内容が同じなので)。",answers:["1"],explain:"string型は==で内容を比較でき、同じ内容ならtrue(=1)になります。"},{before:`string s = "Hello";
cout << s[1] << endl; // `,after:"",lead:"出力される文字を書きなさい。",answers:["e"],explain:"添字は0から始まるので、s[1]は2番目の文字'e'です。"},{before:`string a = "foo";
string b = "bar";
string c = a + b;
cout << c << endl; // `,after:"",lead:"出力される内容を書きなさい。",answers:["foobar"],explain:'+はaとbの内容をそのままの順番でつなげるので、"foo"+"bar"は"foobar"になります。'},{before:`fstream fout;
fout.open("out.txt", ios::`,after:"); // ファイルを「書き込み」モードで開きたい",answers:["out"],explain:"ios::outは書き込み専用でファイルを開くモードです。"},{before:`string line;
`,after:"(cin, line); // 1行まるごと読み込む関数名",answers:["getline"],explain:"getline(cin, line);と書くと、キーボードから入力された1行全体(スペースを含む)をlineに読み込めます。"},{before:`// 文字列の終わりを示す特別な値を持つのは、char配列とstring型のどちらか(答えを書く)
`,after:"",answers:["char配列"],explain:"char配列は末尾にヌル文字(\\0)を持って文字列の終わりを示しますが、string型は内部でサイズを自動管理しているため、ヌル文字を意識する必要はありません。"}],qsHard:[{type:"debug",before:`// 次の説明の誤りを直しなさい
// 「char word[] = "hi"; のとき sizeof(word) は文字数と同じ2になる」
// 正しくは全部で何バイトになるか、半角数字で書きなさい
`,after:"",answers:["3"],explain:'"hi"は見た目には2文字ですが、char配列にする際、末尾に見えないヌル文字(\\0)が自動的に1つ追加されます。そのため実際に確保されるメモリはh,i,\\0の3バイト分になり、sizeof(word)は2ではなく3を返します。'},{type:"choice",lead:"UTF-8で書かれた半角英数字(ASCII文字)1文字は通常何バイトか選びなさい。",options:["1","2","3","4"],answers:["1"],explain:"UTF-8は半角英数字などのASCII文字を1バイトで表現できます。一方でひらがな・カタカナ・常用漢字などの多くは3バイトで表現されるため、日本語混じりの文字列は見た目の文字数とバイト数が大きくずれる点に注意が必要です。"},{type:"order",lines:[{label:"A",code:"#include <fstream>"},{label:"B",code:"fstream fin;"},{label:"C",code:'fin.open("data.txt", ios::in);'},{label:"D",code:`string line;
getline(fin, line);`}],answers:["A,B,C,D"],explain:"ファイルを読み込むには、まずfstreamヘッダを取り込み(A)、fstream型の変数を用意し(B)、open()でファイルを開いてから(C)、getlineで1行ずつ読み込みます(D)。この順番が入れ替わると、開いていないファイルから読み込もうとするなどのエラーになります。"},{type:"debug",before:`// 次の説明の誤りを直しなさい
// 「char word[] = "cat"; のとき sizeof(word) は文字数と同じ3になる」
// 正しくは全部で何バイトになるか、半角数字で書きなさい
`,after:"",answers:["4"],explain:'"cat"は3文字ですが、ヌル文字(\\0)が末尾に1つ自動で追加されるため、sizeof(word)は4を返します。'},{type:"choice",lead:"string型のsize()とchar配列のsizeof()の違いとして正しいものを選びなさい。",options:["size()はヌル文字を含まない文字数、sizeof()はヌル文字込みのバイト数","両者は常に同じ値になる","size()はバイト数、sizeof()は文字数","sizeof()はstring型には使えない"],answers:["size()はヌル文字を含まない文字数、sizeof()はヌル文字込みのバイト数"],explain:"string型のsize()は見た目の文字数(ヌル文字を含まない)を、char配列のsizeof()はヌル文字を含めたバイト数を返します。"},{type:"order",lines:[{label:"A",code:'string s = "Hi";'},{label:"B",code:'s += "!";'},{label:"C",code:"cout << s << endl; // Hi!"}],answers:["A,B,C"],explain:"文字列を作り(A)、末尾に!を連結し(B)、出力します(C)。"},{before:`string a = "cat";
string b = "cat";
cout << (a `,after:" b) << endl; // 内容が同じかを調べる演算子",answers:["=="],explain:"string型は==演算子で内容そのものを比較できます。"},{type:"choice",lead:"s.at(i)とs[i]の違いとして一般的に説明される点を選びなさい。",options:["at(i)は範囲チェックが働くことがあるが、[i]は保証されない","[i]の方が常に安全","at(i)はstring専用の記号である","機能的な違いは全くない"],answers:["at(i)は範囲チェックが働くことがあるが、[i]は保証されない"],explain:"at(i)は範囲外アクセスに対するチェックが期待できる書き方、[i]はチェックなしで高速にアクセスする書き方とされています。"},{before:`string s = "hello";
for(int i=0;i<`,after:`;i++){
  cout << s[i] << endl;
}`,lead:"ループの継続条件を補いなさい(s.size()を使う)。",answers:["s.size()"],explain:"string型の文字数はs.size()で調べられるので、i<s.size()という条件で全文字を1周できます。"},{type:"order",lines:[{label:"A",code:"#include <fstream>"},{label:"B",code:"fstream fout;"},{label:"C",code:'fout.open("out.txt", ios::out);'},{label:"D",code:'fout << "Hello" << endl;'}],answers:["A,B,C,D"],explain:"ヘッダを取り込み(A)、fstream型の変数を用意し(B)、書き込みモードで開いてから(C)、内容を書き込みます(D)。"},{type:"choice",lead:"スペースを含む1行をまるごと読み込みたいとき、cin>>とgetlineのどちらを使うべきか選びなさい。",options:["getline","cin>>","どちらでも同じ","string型には読み込めない"],answers:["getline"],explain:"cin>>はスペースで区切ってしまいますが、getlineはスペースを含む1行全体をそのまま読み込めます。"},{before:`string s;
`,after:"(cin, s); // スペースを含む1行を読み込む関数名",answers:["getline"],explain:"getline(cin, s);と書くと、キーボードから入力された1行全体(スペースを含む)をsに読み込めます。"},{before:`string s = "World";
cout << s[0] << endl; // `,after:"",lead:"出力される文字を書きなさい。",answers:["W"],explain:"添字は0から始まるので、s[0]は先頭の文字'W'です。"},{type:"order",lines:[{label:"A",code:'string s = "abc";'},{label:"B",code:"char c = s[0];"},{label:"C",code:"s[0] = s[2];"},{label:"D",code:`s[2] = c;
cout << s << endl; // cba`}],answers:["A,B,C,D"],explain:'文字列を作り(A)、先頭の文字を一時変数cに退避し(B)、先頭に末尾の文字を上書きし(C)、末尾に退避しておいたcを書き戻します(D)。先頭と末尾が入れ替わり"cba"になります。'},{type:"choice",lead:'string a="x"; string b="y"; string c = a + b; の結果として正しいものを選びなさい。',options:['"xy"','"yx"','"x y"',"エラーになる"],answers:['"xy"'],explain:'+はaとbの内容をそのままの順番でつなげるので、"x"+"y"は"xy"になります。'}],qsExtra:[{before:`string s = "Hello";
cout << s.`,after:"() << endl; // 文字数を調べるメソッド",answers:["size"],explain:"string型のsize()メソッドを呼ぶと、その文字列の見た目の文字数(ヌル文字を含まない数)を調べられます。char配列でsizeof(word)を使うとヌル文字込みのバイト数が返ってきたのと違い、string型のsize()はヌル文字を意識せず、素直に「見えている文字数」を教えてくれます。"},{before:`string s = "Hello";
s `,after:' "!"; // 末尾に"!"を連結する演算子',answers:["+="],explain:'string型は+=演算子を使うだけで、既存の文字列の末尾に別の文字列を連結できます。char配列で同じことをしようとすると、ヌル文字の位置を意識しながら1文字ずつコピーする面倒な処理が必要になりますが、string型ならs += "!";の1行で済みます。'},{type:"debug",long:!0,before:`#include <fstream>
#include <string>
using namespace std;
int main(){
  fstream fin;
  fin.open("data.txt", ios::in);
  string line;
`,after:`
}`,lead:"ファイルを1行ずつ最後まで読み込み、読み込むたびに画面に出力する処理(while文)を書きなさい。",answers:[`while(getline(fin, line)){
cout << line << endl;
}`],explain:"getline(fin, line)は、1行読み込めればtrueのように扱われる値を返し、ファイルの終わりに達すると読み込みに失敗してfalseのように扱われます。これをwhileの条件にそのまま使うことで、「読み込めるあいだは繰り返し、ファイルの終わりで自動的に止まる」処理が書けます。"},{type:"debug",long:!0,before:`int myStrLen(char* s){
  int count = 0;
`,after:`
  return count;
}`,lead:"sがヌル文字(\\0)に到達するまで1文字ずつ数え、文字数をcountに数える処理(while文)を書きなさい。",answers:[`while(s[count] != '\\0'){
count++;
}`],explain:"char配列の文字列は、ヌル文字(\\0)が現れるまでが「1つの文字列」です。s[count]がヌル文字でないあいだはcountを1つずつ増やし続け、ヌル文字に到達した瞬間にwhileが終わるので、countにはヌル文字の手前までの文字数(=文字列の長さ)が残ります。これはstring型のsize()が内部でやっていることを、char配列で手作業でなぞった処理です。"},{type:"choice",lead:"string型とchar配列(cstring)の違いとして正しい説明を選びなさい。",options:["string型は+=や+で連結でき、サイズもsize()で調べられる","string型はヌル文字を使わずには文字列の終わりを判断できない","char配列はいつでも自由に文字数を変更できる","string型はcoutで表示することができない"],answers:["string型は+=や+で連結でき、サイズもsize()で調べられる"],explain:"string型は+=や+で手軽に文字列を連結でき、size()メソッドで現在の文字数を調べられます。string型は内部的な実装の詳細をヌル文字ごと隠してくれるので、使う側がヌル文字を直接意識する必要はありません。一方char配列は宣言時のサイズが基本的に固定で、cout自体はstring型もそのまま表示できます。"},{type:"order",lines:[{label:"A",code:"#include <fstream>"},{label:"B",code:"fstream fin;"},{label:"C",code:'fin.open("data.txt", ios::in);'},{label:"D",code:`string s;
fin >> s;`}],lead:"ファイルから1つの文字列(スペース区切りの1単語)を読み込むプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"fstreamヘッダを取り込み(A)、fstream型の変数を用意し(B)、ios::in(読み込みモード)でファイルを開いてから(C)、cinと同じ感覚でfin>>sのように読み込みます(D)。"},{before:`string a="cat";
string b="cat";
if(a `,after:' b){ cout << "same" << endl; }',answers:["=="],explain:'string型同士も==演算子で内容を比較できます。文字数や中身がすべて一致していればtrueになり、この例では両方とも"cat"なのでtrueと判定されます。'},{before:`string s = "Hello";
cout << s.`,after:"(1) << endl; // 添字を指定して1文字取り出すメソッド(角括弧と同じ働き)",answers:["at"],explain:"at(添字)メソッドは、s[添字]と同じように指定した位置の1文字を取り出せます。s.at(1)はs[1]と同じ結果(この場合は'e')になります。"},{type:"debug",long:!0,before:`string s = "I am a hero";
int count = 1;
`,after:"",lead:"sの中のスペースの数を数えて、それに1を足すことで単語数をcountに求める処理(for文)を書きなさい。",answers:[`for(int i=0;i<s.size();i++){
if(s[i]==' ') count++;
}`],explain:"単語がスペースで区切られている場合、「スペースの数+1」がだいたい単語数になります。sを1文字ずつ調べ、スペースが見つかるたびにcountを増やします。countは最初から1で始めているので、最終的に単語数と一致します。"},{type:"choice",lead:"string型同士を+で連結すると何が起きるか選びなさい。",options:["2つの文字列がつながった新しいstringになる","エラーになる","数値として加算される","片方が消える"],answers:["2つの文字列がつながった新しいstringになる"],explain:'string型は+演算子で連結できます。"Hello" + "World" のように書くと、2つの文字列をつなげた新しいstringが作られます。+=を使えば、既存の文字列にその場で連結することもできます。'},{type:"order",lines:[{label:"A",code:"#include <fstream>"},{label:"B",code:`fstream fin;
fin.open("data.txt", ios::in);`},{label:"C",code:`string line;
int count=0;`},{label:"D",code:"while(getline(fin,line)){ count++; }"},{label:"E",code:"cout << count << endl;"}],lead:"ファイルの行数を数えて出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D,E"],explain:"fstreamヘッダを取り込み(A)、ファイルを読み込みモードで開き(B)、行を受け取る変数とカウンタを用意し(C)、1行読み込むたびにcountを増やし(D)、最後に結果を出力します(E)。"},{before:`string s = "";
if(s.`,after:'()==0){ cout << "empty" << endl; }',answers:["size"],explain:"s.size()は文字列の文字数を返します。何も文字が入っていなければ0を返すので、size()==0という条件でsが空文字列かどうかを判定できます。"},{before:`string s = "Hello";
s = `,after:"; // sを空文字列にリセットする",answers:['""'],explain:'string型は普通の変数と同じように、いつでも新しい値を再代入できます。s = ""; のように空文字列を代入すれば、sの中身をリセットできます。'},{type:"choice",lead:"char配列とstring型の違いとして正しい説明を選びなさい。",options:["string型は+や+=で連結でき、サイズ管理も自動で行われる","char配列も+で文字列を連結できる","string型は必ずヌル文字を意識して扱う必要がある","char配列の方がsize()を使いやすい"],answers:["string型は+や+=で連結でき、サイズ管理も自動で行われる"],explain:"string型は+や+=で手軽に連結でき、size()で文字数も簡単に調べられます。ヌル文字などの管理は内部でstring型自身が行ってくれるので、使う側が意識する必要はありません。"},{type:"debug",long:!0,before:`int countUpper(string s){
`,after:`
}`,lead:"sの中の大文字アルファベットの個数を数えてreturnする処理を書きなさい('A'<=s[i] && s[i]<='Z'で判定できます)。",answers:[`int count=0;
for(int i=0;i<s.size();i++){
if('A'<=s[i] && s[i]<='Z') count++;
}
return count;`],explain:"アルファベットは文字コード上でA〜Zが連続して並んでいるため、'A'<=s[i] && s[i]<='Z'という条件で「s[i]が大文字かどうか」を判定できます。条件を満たすたびにcountを増やします。"},{before:`string name;
`,after:"; // cinからスペースを含む1行をnameに読み込む",answers:["getline(cin,name)"],explain:"getlineはファイルだけでなく、cin(キーボード入力)からもそのまま使えます。getline(cin, name);と書けば、スペースを含む1行分をまるごとnameに読み込めます。"},{before:`string s = "abc";
string result = "";
for(int i=s.size()-1;i>=0;i--){
  `,after:`;
}`,answers:["result += s[i]"],explain:"sを末尾から先頭に向かって1文字ずつたどりながら、resultの末尾に追加していくと、逆順の文字列ができあがります。"},{type:"order",lines:[{label:"A",code:`#include <iostream>
#include <string>
using namespace std;`},{label:"B",code:"int main(){"},{label:"C",code:`  string name;
  getline(cin, name);`},{label:"D",code:'  cout << "Hello, " << name << endl;'},{label:"E",code:`  return 0;
}`}],lead:"名前を1行読み込み、挨拶を出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D,E"],explain:"必要なヘッダを取り込み(A)、main関数を開始し(B)、getlineで1行読み込み(C)、挨拶と一緒に出力し(D)、mainを閉じます(E)。"},{type:"choice",lead:"string型のsize()メソッドが返す値として正しいものを選びなさい。",options:["文字列の文字数(ヌル文字を含まない)","配列全体のバイト数(ヌル文字込み)","必ず0","メモリ上のアドレス"],answers:["文字列の文字数(ヌル文字を含まない)"],explain:"string型のsize()は、見た目の文字数(ヌル文字を含まない)をそのまま返します。char配列のsizeof()がヌル文字込みのバイト数を返したのとは異なる点に注意しましょう。"},{before:`string a="cat";
string b="dog";
if(a `,after:' b){ cout << "different" << endl; }',answers:["!="],explain:"!=は「等しくない」ことを調べる演算子で、string型同士にもそのまま使えます。a!=bは「aとbの中身が異なっていればtrue」という意味です。"},{type:"debug",long:!0,before:`bool isPalindrome(string s){
`,after:`
}`,lead:"sが前から読んでも後ろから読んでも同じ(回文)かどうかをbool型でreturnする処理を書きなさい(前後対称の添字を比較する)。",answers:[`for(int i=0;i<s.size()/2;i++){
if(s[i]!=s[s.size()-1-i]) return false;
}
return true;`],explain:"先頭からi番目と末尾からi番目(添字s.size()-1-i)を比較し、1組でも一致しなければfalseをreturnします。全体の半分だけ比較すれば、回文かどうかを判定するのに十分です。"},{before:`string s = "Hi";
s += `,after:"; // 文字'!'を末尾に追加する",answers:["'!'"],explain:`+=は文字列だけでなく、1文字(char型、シングルクォートで囲む)を末尾に追加するのにも使えます。s += '!';でsは"Hi!"になります。`},{type:"choice",lead:"1つのUTF-8のファイルの中に半角英数字と日本語が混在している場合の説明として正しいものを選びなさい。",options:["文字ごとにバイト数が異なる(半角は1バイト、多くの日本語は3バイト)","すべての文字が2バイトで統一される","日本語は1バイトで表現される","半角英数字は使えない"],answers:["文字ごとにバイト数が異なる(半角は1バイト、多くの日本語は3バイト)"],explain:"UTF-8は文字の種類によって使うバイト数が異なる可変長の文字コードです。半角英数字(ASCII文字)は1バイト、多くのひらがな・カタカナ・漢字は3バイトで表現されるため、同じ「1文字」でも消費するバイト数が違います。"},{before:`char word[] = "cat";
cout << sizeof(word) << endl; // ヌル文字込みで何バイトか(半角数字)
int s = `,after:";",answers:["4"],explain:'"cat"はc,a,tの3文字にヌル文字(\\0)が加わって4バイトになります。sizeof(char配列)は、その配列が確保しているバイト数(ヌル文字込み)をそのまま返します。'},{before:`char word[] = "hello world";
cout << sizeof(word) << endl; // ヌル文字込みで何バイトか(半角数字)
int s = `,after:";",answers:["12"],explain:'"hello world"は11文字なので、ヌル文字を含めると12バイトになります。スペースも1文字として数えます。'},{before:`string s = "programming";
cout << s.size() << endl; // 文字数(半角数字)
int n = `,after:";",answers:["11"],explain:'string型のsize()はヌル文字を含まない見た目の文字数を返します。"programming"は11文字です。'},{before:`string s = "";
cout << s.size() << endl; // 空文字列の文字数(半角数字)
int n = `,after:";",answers:["0"],explain:'空文字列""は文字を1つも持たないので、size()は0を返します。'},{before:`string a = "Hello";
string b = "World";
string c = a + " " + `,after:'; // "Hello World"にする',answers:["b"],explain:'文字列同士の+は連結を意味します。a+" "+bで、"Hello"と半角スペースと"World"がつながり、"Hello World"になります。'},{before:`string s = "abc";
s += "def";
cout << s << endl; // `,after:"",lead:"出力される文字列を書きなさい。",answers:["abcdef"],explain:'+=は末尾に文字列を追加(連結)する演算子です。"abc"に"def"を追加すると"abcdef"になります。'},{before:`string s = "Hello";
cout << s.at(0) << endl; // `,after:"",lead:"出力される文字を書きなさい。",answers:["H"],explain:"at(i)はi番目の文字を返すメソッドで、添字は0から始まります。s.at(0)は先頭の'H'です。"},{before:`string s = "World";
cout << s.at(4) << endl; // `,after:"",lead:"出力される文字を書きなさい。",answers:["d"],explain:`"World"はW,o,r,l,dの5文字で添字は0〜4です。s.at(4)は最後の文字'd'を指します。`},{before:`string s1="abc";
string s2=s1;
s2 += "d";
cout << s1 << endl; // s1は変わらず
`,after:"",lead:"出力される文字列を書きなさい。",answers:["abc"],explain:'s2=s1は中身のコピーを作るので、s2を変更してもs1には影響しません。s1は"abc"のままです。'},{before:`string s = "Data";
int len = s.size();
cout << len << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["4"],explain:'"Data"はD,a,t,aの4文字なので、size()は4を返します。'},{type:"choice",lead:"string型の変数同士を==で比較すると何が調べられるか、正しいものを選びなさい。",options:["文字列の内容が完全に一致しているかどうか","アドレスが同じかどうか","文字数だけが同じかどうか","大文字小文字を区別せず一致するか"],answers:["文字列の内容が完全に一致しているかどうか"],explain:"string型の==は中身(文字の並び)を1文字ずつ比較し、完全に一致していればtrueを返します。アドレスの比較ではありません。"},{type:"choice",lead:"char配列で文字列を扱う場合と比べて、string型を使う利点として正しいものを選びなさい。",options:["ヌル文字の管理やサイズ計算を自分で意識しなくてよい","必ず処理速度が速くなる","メモリを一切使わない","char配列より添字アクセスができない"],answers:["ヌル文字の管理やサイズ計算を自分で意識しなくてよい"],explain:"string型はサイズやヌル文字を内部で自動管理してくれるため、char配列に比べて扱いが簡単で安全です。速度が必ず速いわけではありません。"},{type:"choice",lead:"s[i]とs.at(i)について、一般的に言われている違いとして正しいものを選びなさい。",options:["at(i)は範囲チェックが働くことがあるが、[i]は保証されない","[i]の方が常に安全","at(i)はstring専用の記号である","機能的な違いは全く無い"],answers:["at(i)は範囲チェックが働くことがあるが、[i]は保証されない"],explain:"at(i)は範囲外アクセスに対するチェックが期待できる書き方、[i]はチェックなしで高速にアクセスする書き方とされています。どちらも同じ文字を指すことができますが、性質が異なります。"},{type:"choice",lead:"\\0(ヌル文字)を明示的に意識する必要があるのはどちらか、正しいものを選びなさい。",options:["char配列","string型","どちらも意識不要","int型"],answers:["char配列"],explain:"char配列は文字列の終わりをヌル文字\\0で表すため、サイズやコピー時にヌル文字を意識する必要があります。string型は内部で自動管理してくれます。"},{type:"choice",lead:"getlineがcinやfstreamからの読み込みで優れている点として正しいものを選びなさい。",options:["スペースを含む1行をまるごと読み込める","数値だけを読み込める","ヌル文字を自動で除去する","ファイルだけに使える"],answers:["スペースを含む1行をまるごと読み込める"],explain:"cin>>はスペースで区切ってしまいますが、getlineはスペースを含む1行全体をそのまま読み込めます。"},{type:"order",lines:[{label:"A",code:`#include <string>
using namespace std;`},{label:"B",code:'string s = "Hi";'},{label:"C",code:'s += "!";'},{label:"D",code:"cout << s << endl; // Hi!"}],lead:"文字列を作り、!を追加して出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"ヘッダを取り込み(A)、文字列を作り(B)、!を追加し(C)、出力します(D)。"},{type:"order",lines:[{label:"A",code:'string a="foo";'},{label:"B",code:'string b="bar";'},{label:"C",code:"string c = a+b;"},{label:"D",code:"cout << c << endl; // foobar"}],lead:"2つの文字列を連結して出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"aとbをそれぞれ作り(A,B)、+で連結してcに入れ(C)、出力します(D)。"},{type:"order",lines:[{label:"A",code:'char word[] = "ab";'},{label:"B",code:"cout << sizeof(word) << endl; // 3"}],lead:"char配列のサイズを調べるプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B"],explain:'配列を作ってから(A)、そのサイズを調べます(B)。"ab"は2文字+ヌル文字で3バイトです。'},{type:"debug",long:!0,before:`int countChar(string s, char target){
`,after:`
}`,lead:"sの中にtargetと同じ文字がいくつあるか数えてreturnする処理を書きなさい。",answers:[`int count=0;
for(int i=0;i<s.size();i++){
if(s[i]==target) count++;
}
return count;`],explain:"カウンタcountを0で初期化し、全文字を調べてtargetと一致するたびに1増やし、最後にreturnします。"},{type:"debug",long:!0,before:`string toUpperManual(string s){
`,after:`
  return s;
}`,lead:"sの中の小文字アルファベットを大文字に変換する処理を書きなさい('a'から'A'への差は32で、char同士の足し算・引き算ができる)。",answers:[`for(int i=0;i<s.size();i++){
if('a'<=s[i] && s[i]<='z') s[i] = s[i] - 32;
}`],explain:"各文字が小文字の範囲('a'〜'z')にあるかを調べ、そうであれば32を引くことで対応する大文字に変換します。"},{type:"debug",long:!0,before:`bool startsWithA(string s){
`,after:`
}`,lead:"sの最初の文字が'A'かどうかをbool型でreturnする処理を書きなさい。",answers:["return s[0]=='A';"],explain:"先頭の文字はs[0]で取り出せます。それが'A'と等しいかどうかの比較結果(bool)をそのままreturnします。"},{type:"debug",long:!0,before:`string repeatChar(char c, int n){
  string result="";
`,after:`
  return result;
}`,lead:"文字cをn回繰り返した文字列をresultに作ってreturnする処理を書きなさい。",answers:[`for(int i=0;i<n;i++){
result += c;
}`],explain:"空のresultにcをn回追加(+=)していくことで、cをn個並べた文字列ができあがります。"},{type:"debug",long:!0,before:`int countWords(string s){
  int count=1;
`,after:`
  return count;
}`,lead:"sの中のスペースの数を数えてcountに足し込み、単語数を求める処理を書きなさい(スペースの数+1が単語数になる)。",answers:[`for(int i=0;i<s.size();i++){
if(s[i]==' ') count++;
}`],explain:"単語はスペース区切りなので、スペースの数を数えてcountに足していけば、最終的に単語数(スペース数+1)が求まります。"},{type:"debug",long:!0,before:`bool containsChar(string s, char target){
`,after:`
}`,lead:"sの中にtargetと同じ文字が1つでもあればtrueをreturnする処理を書きなさい。",answers:[`for(int i=0;i<s.size();i++){
if(s[i]==target) return true;
}
return false;`],explain:"ループの途中でtargetと一致する文字が見つかった時点でtrueをreturnし、最後まで見つからなければループを抜けた後にfalseをreturnします。"},{before:`string s = "banana";
int count=0;
for(int i=0;i<s.size();i++){
  if(s[i]=='a') `,after:`;
}`,answers:["count++"],explain:"条件が成り立つたびにcountを1増やすことで、'a'の出現回数を数えられます。"},{before:`string s = "hello";
bool hasE=false;
for(int i=0;i<s.size();i++){
  if(s[i]=='e') `,after:`;
}`,answers:["hasE=true"],explain:"'e'が見つかった時点でhasEをtrueにします。一致するかどうかのフラグを立てる典型的な書き方です。"},{before:`string s = "Test123";
int digitCount=0;
for(int i=0;i<s.size();i++){
  if('0'<=s[i] && s[i]<='9') `,after:`;
}`,answers:["digitCount++"],explain:"文字が'0'〜'9'の範囲にあれば数字なので、digitCountを1増やして数字の個数を数えます。"},{before:`string s = "aAbBcC";
int upperCount=0;
for(int i=0;i<s.size();i++){
  if('A'<=s[i] && s[i]<='Z') `,after:`;
}`,answers:["upperCount++"],explain:"文字が'A'〜'Z'の範囲にあれば大文字なので、upperCountを1増やして大文字の個数を数えます。"},{before:`string s = "xyz";
int sumCodes=0;
for(int i=0;i<s.size();i++){
  `,after:`;
}`,lead:"各文字の文字コード(int(s[i])で数値として扱える)を合計する処理を書きなさい。",answers:["sumCodes += s[i]"],explain:"char型は数値としても扱えるため、s[i]をそのまま足し込むことで文字コードの合計が求まります。"},{before:`fstream fout;
fout.open("log.txt", ios::`,after:"); // 書き込みモードで開く",answers:["out"],explain:"ios::outは書き込み専用でファイルを開くモードです。"},{before:`fstream fin;
fin.open("data.txt", ios::in);
if(!fin){
  cout << "ファイルが開けません" << endl;
}
// このif文が判定しているものを一言で(カタカナで)
`,after:"",answers:["オープン失敗","ファイルオープンの失敗"],explain:"!finは「ファイルが正しく開けなかった(オープンに失敗した)」ことを判定する典型的な書き方です。"},{before:`fstream fin;
fin.open("data.txt", ios::in);
string line;
int total=0;
while(getline(fin,line)){
  `,after:`;
}`,lead:"行を読み込むたびにtotalを1増やす処理を書きなさい。",answers:["total++"],explain:"getline(fin,line)が1行読み込むたびにループの中身が実行されるので、totalを1増やせば読み込んだ行数が数えられます。"},{before:`fstream fout;
fout.open("out.txt", ios::out);
fout << "result: " << `,after:" << endl; // 変数scoreの値も書き込みたい",answers:["score"],explain:"<<演算子は変数の値をそのままファイルに書き込めます。scoreの値を続けて書き込みます。"},{before:`string s = "abc";
char c = s[0];
s[0] = s[2];
s[2] = c;
cout << s << endl; // `,after:"",lead:"出力される文字列を書きなさい(先頭と末尾を入れ替えている)。",answers:["cba"],explain:`s[0]の'a'とs[2]の'c'を一時変数cを使って入れ替えているので、"abc"は"cba"になります。`},{before:`string s = "Hello";
int n = s.size();
cout << s[n-1] << endl; // `,after:"",lead:"出力される文字を書きなさい(最後の文字)。",answers:["o"],explain:`文字列の最後の文字はs[size()-1]で取り出せます。"Hello"の最後は'o'です。`},{before:`// 文字列リテラル"abc"は、内部的にはchar型の何として扱われるか(カタカナで)
`,after:"",answers:["配列"],explain:"C++の文字列リテラルは、内部的にはchar型の配列(末尾にヌル文字が付く)として扱われます。"},{before:`string a = "x";
string b = "x";
cout << (a==b) << endl; // 内容が同じなので
int result=`,after:";",answers:["1"],explain:'aとbは同じ内容"x"を持つので、a==bはtrue(=1)になります。'},{before:`string a = "x";
string b = "y";
cout << (a==b) << endl; // 内容が違うので
int result=`,after:";",answers:["0"],explain:"aとbは内容が異なるので、a==bはfalse(=0)になります。"},{before:`char c = '5';
int n = c - '0'; // 文字'5'を数値の5に変換するテクニック
cout << n << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["5"],explain:"文字コードは連番になっているため、文字'5'から文字'0'を引くと、対応する数値5が求まります。数字文字を数値に変換する定番のテクニックです。"}],qsExpert:[{type:"debug",long:!0,before:`int myStrLen(char* s){
  int count=0;
  while(s[count]!='\\0'){ count++; }
  return count;
}
int main(){
`,after:`
  return 0;
}`,lead:'char word[]="hello"; と宣言し、myStrLen(word)の結果をcoutで出力する処理を書きなさい。',answers:[`char word[]="hello";
cout << myStrLen(word) << endl;`],explain:'wordはchar配列なので、そのままmyStrLen(word)に渡すと配列名が先頭アドレスとして渡されます。myStrLenの中ではヌル文字(\\0)に到達するまで数えるので、"hello"の5文字ぶんがcountされ、5が出力されます。'},{type:"debug",long:!0,before:`#include <fstream>
#include <string>
using namespace std;
int main(){
  fstream fin;
  fin.open("data.txt", ios::in);
  string lines[100];
  int count=0;
`,after:`
  return 0;
}`,lead:"ファイルを1行ずつ読み込んでlines配列に格納し、読み込んだ行数をcountに数える処理(while文)を書きなさい。",answers:[`while(getline(fin, lines[count])){
count++;
}`],explain:"getline(fin, lines[count])は、成功すればlines[count]にその行の文字列を格納し、trueのように扱われる値を返します。これをwhileの条件にすることで、読み込みに成功しているあいだはcountを1つずつ増やしながら次の行へ進み、ファイルの終わりで自動的に止まります。"},{type:"debug",long:!0,before:`string names[3] = {"Rika","Taro","Yui"};
string result = "";
`,after:"",lead:'names配列の3つの文字列を、間にカンマ+スペースを挟んで1つのresultに連結する処理を書きなさい(例: "Rika, Taro, Yui")。',answers:[`for(int i=0;i<3;i++){
if(i>0) result += ", ";
result += names[i];
}`],explain:'i>0のとき(つまり2つ目以降の要素のとき)だけ先に", "を連結してから、names[i]自体を連結します。1つ目の要素の前には区切りをつけたくないので、if(i>0)という条件でその制御をしています。'},{type:"debug",long:!0,before:`void myStrCopy(char* dest, char* src){
  int i=0;
`,after:`
  dest[i] = '\\0';
}`,lead:"srcの内容をdestに1文字ずつコピーする処理(while文、ヌル文字の手前まで)を書きなさい。",answers:[`while(src[i] != '\\0'){
dest[i] = src[i];
i++;
}`],explain:"srcのヌル文字に到達するまで、1文字ずつdestにコピーしていきます。ループを抜けたあと(後ろに書かれているdest[i] = '\\0';)で、コピーし終えた場所に自分でヌル文字をつけ足すことで、destも正しく文字列の終わりが分かる状態になります。"},{type:"debug",long:!0,before:`string s = "programming";
int count = 0;
`,after:"",lead:"sの中に文字'g'がいくつ含まれるかを数える処理(for文、s.size()とs[i]を使う)を書きなさい。",answers:[`for(int i=0;i<s.size();i++){
if(s[i]=='g') count++;
}`],explain:"string型もs[i]のように配列と同じ感覚で1文字ずつアクセスでき、s.size()で全体の文字数が分かります。0からs.size()-1までを順番に見ていき、'g'と一致するたびにcountを増やします。"},{type:"debug",long:!0,before:`bool myStrEqual(char* a, char* b){
  int i=0;
`,after:`
}`,lead:"aとbが完全に同じ文字列かどうかをbool型でreturnする処理を書きなさい(どちらかにヌル文字が現れるまで1文字ずつ比較する)。",answers:[`while(a[i]!='\\0' || b[i]!='\\0'){
if(a[i]!=b[i]) return false;
i++;
}
return true;`],explain:"a[i]とb[i]をどちらかがヌル文字になるまで比較し、途中で1文字でも違いがあればfalseをreturnします。長さが違う場合も、片方が先にヌル文字になった時点でa[i]!=b[i]がtrueになりfalseが返ります。"},{type:"debug",long:!0,before:`void reverseCharArray(char* s){
  int len = 0;
  while(s[len] != '\\0'){ len++; }
`,after:`
}`,lead:"lenで求めた文字数を使い、char配列sの中身を前後逆順に並べ替える処理を書きなさい(前半と後半を1つずつ入れ替える方法でよい)。",answers:[`for(int i=0;i<len/2;i++){
char t=s[i];
s[i]=s[len-1-i];
s[len-1-i]=t;
}`],explain:"配列の逆順並べ替えと同じ考え方をchar配列に適用します。先頭からi番目と末尾からi番目を、一時変数tを使って入れ替えます。"},{type:"debug",long:!0,before:`int countVowels(string s){
`,after:`
}`,lead:"sの中の母音(a,i,u,e,o)の数を数えてreturnする処理を書きなさい。",answers:[`int count=0;
for(int i=0;i<s.size();i++){
char c=s[i];
if(c=='a'||c=='i'||c=='u'||c=='e'||c=='o') count++;
}
return count;`],explain:"各文字を順番に調べ、5つの母音のいずれかと一致すればcountを増やします。||(または)を使って5つの条件をまとめて判定しています。"},{type:"debug",long:!0,before:`#include <fstream>
#include <string>
using namespace std;
int main(){
  fstream fout;
  fout.open("out.txt", ios::out);
  string names[3] = {"A","B","C"};
`,after:`
  return 0;
}`,lead:"names配列の3つの文字列を、ファイルに1行ずつ書き込むfor文を書きなさい。",answers:[`for(int i=0;i<3;i++){
fout << names[i] << endl;
}`],explain:"fout(書き込み用のfstream)にも<<演算子がそのまま使え、coutと同じ感覚で1行ずつファイルへ書き込めます。"},{type:"debug",long:!0,before:`void myStrCat(char* dest, char* src){
  int destLen = 0;
  while(dest[destLen] != '\\0'){ destLen++; }
  int i = 0;
`,after:`
  dest[destLen+i] = '\\0';
}`,lead:"srcの内容をdestの末尾(destLenの位置から)に1文字ずつ連結していくwhile文を書きなさい。",answers:[`while(src[i] != '\\0'){
dest[destLen+i] = src[i];
i++;
}`],explain:"まずdestの元々の長さdestLenを求めておき、そこから続けてsrcの文字を1つずつコピーしていきます。ループを抜けたあと(後ろに書かれている行)で連結後の末尾にヌル文字をつけ足すことで、正しい文字列になります。"},{type:"debug",long:!0,before:`int findChar(string s, char target){
`,after:`
}`,lead:"sの中でtargetと最初に一致する文字の添字をreturnする処理を書きなさい(見つからなければ-1をreturnする)。",answers:[`for(int i=0;i<s.size();i++){
if(s[i]==target) return i;
}
return -1;`],explain:"配列の検索と同じ考え方で、最初に一致した時点の添字iをreturnし、最後まで見つからなければ-1をreturnします。"},{type:"debug",long:!0,before:`#include <fstream>
#include <string>
using namespace std;
int main(){
  fstream fin;
  fin.open("data.txt", ios::in);
  string names[100];
  int scores[100];
  int count=0;
`,after:`
  return 0;
}`,lead:"ファイルから名前と得点をcinのように>>で読み込み続け、読み込みに成功するあいだcountを増やすwhile文を書きなさい(fin >> names[count] >> scores[count] の戻り値をそのままwhileの条件にしてよい)。",answers:[`while(fin >> names[count] >> scores[count]){
count++;
}`],explain:"ファイル用のfinもcinと同じように>>で読み込め、読み込みが成功したかどうかをそのままif文やwhile文の条件として使えます。読み込みに失敗した(ファイルの終わりに達した)時点でループが終わります。"},{type:"debug",long:!0,before:`bool isAllUpper(string s){
`,after:`
}`,lead:"sがすべて大文字アルファベットかどうかをbool型でreturnする処理を書きなさい(1文字でも小文字があればfalse)。",answers:[`for(int i=0;i<s.size();i++){
if(!('A'<=s[i] && s[i]<='Z')) return false;
}
return true;`],explain:"各文字が大文字の範囲('A'〜'Z')に収まっているかどうかを!(否定)を使って判定し、範囲外の文字が1つでもあればfalseをreturnします。"},{type:"debug",long:!0,before:`void replaceChar(string& s, char from, char to){
`,after:`
}`,lead:"sの中のfromと一致する文字を、すべてtoに置き換える処理を書きなさい。",answers:[`for(int i=0;i<s.size();i++){
if(s[i]==from) s[i]=to;
}`],explain:"sは参照渡しなので、関数の中でs[i]を書き換えると呼び出し元の文字列そのものが変わります。各文字を調べ、fromと一致すればtoで上書きします。"},{type:"debug",long:!0,before:`#include <iostream>
#include <string>
using namespace std;
int main(){
  string a, b;
  cin >> a >> b;
`,after:`
  return 0;
}`,lead:'aとbを読み込み、a==bならば"一致"、そうでなければ"不一致"を出力する処理を書きなさい。',answers:[`if(a==b){
cout << "一致" << endl;
}else{
cout << "不一致" << endl;
}`],explain:"string型は==で内容そのものを比較できるので、a==bという条件だけで一致判定ができます。"}],qsDrag:[{type:"dragfill",lead:"ファイルを1行ずつ読み込んで画面に出力する処理になるよう、正しいピースを空欄に配置しなさい。",lines:[{code:"fstream fin;"},{code:'fin.open("data.txt", ios::in);'},{code:"string line;"},{blank:"b1"},{blank:"b2"},{code:"}"}],pieces:[{id:"p1",code:"while(getline(fin, line)){"},{id:"p2",code:"cout << line << endl;"},{id:"p3",code:"while(fin >> line){"}],answerMap:{b1:"p1",b2:"p2"},explain:"getline(fin, line)は改行までを1行としてまとめて読み込みます(p1)。p3のfin >> lineはスペース区切りで1単語だけを読み込む書き方なので、行の途中にスペースがあると意図通りに読み込めません。"}]},{id:"w6",title:"CASE 06「継ぎ接ぎの人物像」",sub:"Week6 構造体",emoji:"🗂️",mon:"情報をひとまとめにした男",lesson:[{title:"構造体の定義",code:`struct Results{
  string name;
  int score;
};
Results a;
a.name = "Rika";
a.score = 90;`,explain:"これまで扱ってきたint, double, stringなどは、C++にあらかじめ用意されている「型」でした。structを使うと、自分だけの新しい型を作ることができます。struct Results{ string name; int score; }; と書くと、「名前(name)と点数(score)を1セットで持つ、Resultsという新しい型」が定義されます。Results a; と宣言すれば、その型の変数(構造体変数)を作れ、中に入っているnameやscoreといったデータ(メンバと呼びます)には、a.name、a.scoreのようにドット(.)でアクセスします。バラバラに管理していたデータをひとまとめにできるので、「この名前とこの点数は同じ人のもの」という対応関係が分かりやすくなります。"},{title:"構造体の配列",code:`Results students[3];
for(int i=0;i<3;i++){
  cin >> students[i].name >> students[i].score;
}`,explain:"構造体で作った型(Resultsなど)も、intやdoubleと同じように「型」の一種として扱えるので、普通に配列を作ることができます。Results students[3]; と書けば、Results型の変数が3人分並んだ配列になります。個々の要素にアクセスするときは、まず[ ]で何番目の生徒かを指定し(students[i])、そのあとに.で見たいメンバを指定します(students[i].name)。「配列の添字で人を選び、ドットでその人のどのデータを見るか選ぶ」という2段階のアクセスになる点をイメージすると分かりやすいでしょう。"},{title:"ポインタ渡しで並べ替え",code:`void sortBySub(Results* students, int num, int sub){
  // 構造体配列の中身を書き換える処理
}`,explain:"関数の中で構造体配列の並び順を書き換えて、その変更を呼び出し元にも反映させたい場合は、配列そのものではなく「配列の先頭アドレス」を渡す「ポインタ渡し」にする必要があります。Results* studentsという仮引数は、実際には呼び出し元の配列の先頭アドレスを受け取っており、students[0], students[1]のように書けば、呼び出し元の配列と全く同じ場所にあるデータを直接読み書きしていることになります。もし値渡しにしてしまうと、関数の中で配列をコピーして並べ替えているだけになり、呼び出し元の配列は変わらないままになってしまいます。"}],qs:[{before:"",after:` Results{
  string name;
  int score[3];
};`,answers:["struct"],explain:"構造体はstructというキーワードで定義します。struct 名前{ メンバ1; メンバ2; ...}; という形で、複数の関連するデータ(この例ではnameとscore)をひとまとめにして、新しい「型」として扱えるようにする仕組みです。構造体はこの後に学ぶクラス(class)ととてもよく似ていますが、大きな違いの1つとして、構造体はメンバのアクセス指定を何も書かなければ自動的にpublic(クラス外から自由にアクセス可能)になる、という点があります(クラスの場合はデフォルトでprivateになります)。"},{before:`struct Results{ string name; int score[3]; };
Results student;
cout << student`,after:"name << endl; // メンバにアクセスする演算子",answers:["."],explain:'構造体(やクラス)のメンバ(構造体の中に入っている個々のデータ)にアクセスするには、変数名の後ろにドット(.)をつけて、続けてメンバの名前を書きます。student.name は「studentという構造体変数の中に入っているnameというメンバ」を意味し、これで値を読み取ることも(cout << student.name;)、値を書き換えることも(student.name = "太郎";)できます。ドット演算子はメンバへの「入口」だとイメージすると分かりやすいでしょう。'},{before:`fstream fin;
fin.open("data.txt", ios::in);
string str;
int m=0;
while(`,after:`(fin, str)){
  m++;
} // finから1行読み込みstrに格納する関数`,answers:["getline"],explain:"getline(fin, str); は、ストリームfin(この場合はファイル)から、次の改行記号が現れるまでの1行分の文字列をまるごと読み取り、strという変数に格納してくれる関数です。fin >> str; と違い、途中にスペースが含まれていてもそのスペースごと1行として読み込める点が特徴です。この例では、getline(fin, str)をfinがファイルの最後まで到達して失敗する(whileの条件がfalseになる)まで繰り返すことで、mという変数に「ファイルが全部で何行あるか」を数え上げています。あとで実際のデータを読み込む前に、まずファイルの行数(=学生の人数)を知りたいときによく使われるテクニックです。"},{before:"void sortBySub(Results",after:` students, int num, int sub){
  // 構造体配列を書き換えたいのでポインタ渡しにする
}`,answers:["*"],explain:"構造体の配列の中身を関数の中で並べ替えて、呼び出し元の配列にもその変更をきちんと反映させたい場合は、配列そのものをコピーして渡す(値渡し)のではなく、配列の先頭アドレスを渡す「ポインタ渡し」にする必要があります。Results* students は「Results型へのポインタ」という意味で、配列の先頭アドレスを受け取ることができます。関数の中でstudents[j]とstudents[j-1]の中身を交換すると、それはそのまま呼び出し元にある本物の配列の中身を交換していることになります。もし値渡しにしてしまうと、せっかく並べ替えても呼び出し元の配列は元のままになってしまいます。"},{before:`while(fin >> name >> score){
  // 処理
}
// このループはどんなときに終了するか、最も適切な語句を書きなさい
`,after:"",answers:["読み込みが失敗したとき","入力が失敗したとき","失敗したとき"],explain:"一見不思議に思えるかもしれませんが、fin >> name >> score のような「ストリームから読み込む」操作は、実は読み込みが成功したかどうかを表す値を返しており、if文やwhile文の条件としてそのまま使うことができます。読み込みが正常にできればtrue(のように扱われる値)、ファイルの終わりに到達するなどして読み込みに失敗するとfalse(のように扱われる値)になります。そのためwhile(fin >> name >> score){ ... } と書くと、「ファイルから正しく読み込めている間はループを続け、ファイルの終わりに来たら自動的にループを抜ける」という処理を、特別な終了条件を自分で書かなくても実現できるのです。"},{before:`struct Results{ string name; int score[3]; };
Results students[`,after:"]; // 4人分の構造体配列を宣言したい(半角数字を書く)",answers:["4"],explain:"構造体で作った型は、int型やdouble型と同じように「型」として扱えるので、intの配列を作るのと全く同じ書き方で構造体の配列も作れます。Results students[4]; と書けば、Results型(名前と点数のセット)を持つ変数が4つ並んだ配列ができあがります。それぞれの要素はstudents[0]からstudents[3]までの4つで、各要素にはname, scoreといったメンバがすべて備わっています。"},{before:`// 構造体を使う一番の利点を一言で書きなさい。例:「関連する複数のデータを○○にできる」の○○部分
`,after:"",answers:["ひとまとめ","1つのまとまり","ひとつのまとまり"],explain:"構造体を使わない場合、name[5]という文字列の配列と、score[5]という点数の配列を、それぞれ別々に用意して管理することになります。この方法だと「name[2]とscore[2]は同じ人のデータ」という対応関係を、プログラマが頭の中で意識し続けなければならず、もし片方だけを並べ替えてしまったりすると、簡単に対応がズレてバグの原因になります。構造体を使えば、名前・点数のように「本来セットで扱いたいデータ」を1つの変数(students[i])としてまとめて持ち運べるので、students[i].nameとstudents[i].scoreが常にペアであることが保証され、対応関係が分かりやすくミスも減ります。"},{before:`struct Point{ int x; int y; };
Point p;
p.x = 3;
p.`,after:" = 4; // yに4を設定する",answers:["y"],explain:"p.xと同じように、p.yと書けばyメンバにアクセスできます。"},{before:`struct Item{ string name; int price; };
Item a = `,after:'; // 名前"Pen"、価格100で初期化する',answers:['{"Pen",100}'],explain:"構造体はメンバの並び順通りに{ }で値を渡すことで、宣言と同時に初期化できます。"},{before:`struct Point{ int x; int y; };
Point p = {1,2};
cout << p.x << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["1"],explain:"{1,2}の1つ目の値がxに設定されるので、p.xは1です。"},{before:`struct Item{ string name; };
Item a; Item* p = &a;
p`,after:'name = "Pen"; // ポインタ経由でメンバにアクセスする演算子(2文字)',answers:["->"],explain:"構造体へのポインタからメンバにアクセスするときは、p->nameのようにアロー演算子(->)を使います。"},{before:`struct Point{ int x; int y; };
Point pts[`,after:"]; // 3個分の構造体配列を宣言する(半角数字)",answers:["3"],explain:"構造体の配列も、intの配列と同じ書き方でサイズを指定して宣言できます。"},{before:`struct Item{ string name; int price; };
Item a = {"Pen", 100};
cout << a.price << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["100"],explain:'{"Pen", 100}の2つ目の値がpriceに設定されるので、a.priceは100です。'},{before:`struct Item{ int price; };
Item a = {100};
Item b = a;
b.price = 200;
cout << a.price << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい(bを変えてもaは変わらない)。",answers:["100"],explain:"b=aは構造体全体のコピーを作るので、bを変更してもaには影響しません。"},{before:`// 複数の異なる型のデータをひとまとめにして扱える仕組みを何と呼ぶか(カタカナか漢字で)
`,after:"",answers:["構造体"],explain:"複数の異なる型のデータをひとまとめにして扱える仕組みを構造体と呼びます。"}],qsHard:[{type:"debug",before:`struct Results{ string name; int score; };
Results a;
a.name = "Rika";
a`,after:" = 90; // 抜けているメンバアクセス演算子とメンバ名を補いなさい",answers:[".score"],explain:"構造体のメンバにアクセスするにはドット(.)の後にメンバ名を続けます。a.scoreと書かなければ、scoreという単独の変数(存在しない)への代入とみなされコンパイルエラーになります。"},{type:"choice",lead:"Results students[3]; と宣言したとき、2番目の生徒(students[1])の得点にアクセスする正しい書き方を選びなさい。",options:["students[1].score","students.score[1]","students->score[1]","score[students[1]]"],answers:["students[1].score"],explain:"構造体の配列は「まず[ ]で何番目かを選び、その後に.でメンバを選ぶ」という2段階のアクセスになります。students[1]でstudents配列の2番目の要素(Results型)を取り出し、続けて.scoreでそのメンバにアクセスします。"},{type:"order",lines:[{label:"A",code:"Results students[3];"},{label:"B",code:"for(int i=0;i<3;i++){"},{label:"C",code:"  cin >> students[i].name >> students[i].score;"},{label:"D",code:"}"}],answers:["A,B,C,D"],explain:"まず構造体配列を宣言し(A)、その要素数分だけループを回し(B)、各要素のメンバに順番に読み込み(C)、ループを閉じます(D)。宣言より前にループを書くことはできません。"},{before:`struct Item{ string name; int price; };
Item a; Item* p = &a;
cout << p`,after:"price << endl; // ポインタ経由でpriceにアクセスする演算子(2文字)",answers:["->"],explain:"構造体へのポインタからメンバにアクセスするときは、p->priceのようにアロー演算子(->)を使います。"},{before:`struct Item{ string name; int price; };
Item items[2];
items[0].price = 100;
items[1].price = 200;
int total = items[0].price + items[1].price;
cout << total << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["300"],explain:"items[0].priceは100、items[1].priceは200なので、合計すると300になります。"},{type:"order",lines:[{label:"A",code:"struct Point{ int x; int y; };"},{label:"B",code:"Point p; p.x=1; p.y=2;"},{label:"C",code:'cout << p.x << "," << p.y << endl; // 1,2'}],answers:["A,B,C"],explain:"構造体を定義し(A)、変数を用意してメンバに値を設定し(B)、出力します(C)。"},{before:`struct Item{ string name; int price; };
Item a;
a.`,after:" = 100; // priceに100を設定する",answers:["price"],explain:"構造体変数のメンバにはドット(.)でアクセスして代入できます。a.priceでpriceメンバを指定します。"},{type:"choice",lead:"2つの構造体変数を==でそのまま比較しようとするとどうなるか選びなさい。",options:["多くの場合そのままでは比較できずコンパイルエラーになる","必ずメンバ同士を自動比較してtrue/falseを返す","必ずfalseになる","アドレスの大小を比較する"],answers:["多くの場合そのままでは比較できずコンパイルエラーになる"],explain:"構造体には標準で==演算子が定義されていないため、そのまま比較しようとするとコンパイルエラーになります。"},{before:`struct Item{ string name; int price; };
Item items[3];
Item* p = items;
p`,after:"; // 次の要素へポインタを進める(1つ加算)",answers:["++"],explain:"構造体へのポインタは++でResults(この場合Item)型1つぶん先へ進み、配列の次の要素を指すようになります。"},{type:"order",lines:[{label:"A",code:"struct Item{ string name; int price; };"},{label:"B",code:"Item a; Item* p = &a;"},{label:"C",code:"p->price = 100;"},{label:"D",code:"cout << a.price << endl; // 100"}],answers:["A,B,C,D"],explain:"構造体を定義し(A)、変数とそれを指すポインタを用意し(B)、アロー演算子でメンバに値を設定し(C)、出力します(D)。"},{before:`struct Point{ int x; int y; };
Point p = `,after:"; // xを3、yを4で初期化する(集成体初期化)",answers:["{3,4}"],explain:"構造体はメンバの並び順通りに{ }で値を渡すことで、宣言と同時に初期化できます。"},{type:"choice",lead:"関数の戻り値の型として構造体を使うことはできるか選びなさい。",options:["できる(構造体全体をreturnできる)","できない","ポインタでしか返せない","配列としてしか返せない"],answers:["できる(構造体全体をreturnできる)"],explain:"構造体もint型やdouble型と同じように、関数の戻り値の型として使え、構造体全体をそのままreturnできます。"},{before:`struct Item{ string name; int price; };
Item items[3];
int sum=0;
for(int i=0;i<3;i++){
  `,after:`;
}`,lead:"sumにitems[i].priceを加算する処理を書きなさい。",answers:["sum += items[i].price"],explain:"配列の各要素のpriceメンバを取り出して、sumに足し込みます。"},{type:"order",lines:[{label:"A",code:"struct Item{ string name; int price; };"},{label:"B",code:"void raise(Item* p){ p->price += 10; }"},{label:"C",code:'Item a={"Pen",100};'},{label:"D",code:`raise(&a);
cout << a.price << endl; // 110`}],answers:["A,B,C,D"],explain:"構造体を定義し(A)、ポインタ経由でpriceを書き換える関数を定義し(B)、変数を初期化してから(C)、関数を呼び出して結果を確認します(D)。"},{type:"choice",lead:"structとclassのデフォルトのアクセス指定の違いとして正しいものを選びなさい。",options:["structはpublic、classはprivateがデフォルト","structはprivate、classはpublicがデフォルト","両方ともpublicがデフォルト","両方ともprivateがデフォルト"],answers:["structはpublic、classはprivateがデフォルト"],explain:"何も指定しなかった場合のアクセス指定の既定値は、structがpublic、classがprivateと異なります。"}],qsExtra:[{before:`struct Results{ string name; int score; };
Results a = `,after:'; // 名前"Rika"、得点90で宣言と同時に初期化する(集成体初期化)',answers:['{"Rika",90}'],explain:'構造体は宣言と同時に、メンバの並び順通りに{ }で値を渡して初期化できます(集成体初期化)。Results a = {"Rika",90}; と書くと、1つ目のメンバname に"Rika"が、2つ目のメンバscoreに90が、それぞれ順番に設定されます。後からa.name="Rika"; a.score=90; と2行に分けて代入するより簡潔に書けます。'},{type:"debug",long:!0,before:`struct Results{ string name; int score; };
void sortByScore(Results* students, int n){
`,after:`
}`,lead:"students配列を得点(score)の降順(大きい順)に並べ替えるバブルソートの処理一式を、これまでと同じfor文の型(i=1;i<n;i++ と j=n-1;j>=i;j--)で書きなさい。",answers:[`for(int i=1;i<n;i++){
for(int j=n-1;j>=i;j--){
if(students[j-1].score<students[j].score){
Results w=students[j];students[j]=students[j-1];students[j-1]=w;
}
}
}`],explain:"降順(大きい順)に並べ替えたいので、比較の不等号を昇順のときと逆にし、students[j-1].scoreがstudents[j].scoreより小さい(逆順)ときに交換します。交換する単位が数値ではなく構造体まるごと(Results型)である点以外は、配列のバブルソートと全く同じ考え方です。"},{type:"debug",long:!0,before:`struct Results{ string name; int score; };
int main(){
  int n;
  cin >> n;
  Results students[100];
`,after:`
}`,lead:"nに読み込んだ人数ぶん、名前と得点をcinで読み込み、その場でcoutで1行ずつ出力するfor文一式を書きなさい。",answers:[`for(int i=0;i<n;i++){
cin>>students[i].name>>students[i].score;
cout<<students[i].name<<" "<<students[i].score<<endl;
}`],explain:"0からn-1までのfor文の中で、まずcin>>で名前と得点をその生徒の要素に読み込み、続けてcoutで同じ要素の中身をそのまま出力します。読み込みと出力を1つのループの中にまとめて書ける、という点を確認しておきましょう。"},{type:"choice",lead:"構造体へのポインタpからメンバnameにアクセスする書き方について、正しい説明を選びなさい。",options:["(*p).nameとp->nameは同じ意味である","p->nameはポインタpそのものの値(アドレス)を書き換える","(*p).nameは配列専用の書き方でstructには使えない","p->nameはclassでは使えずstructだけで使える"],answers:["(*p).nameとp->nameは同じ意味である"],explain:"p->nameは(*p).nameを短く書いたものにすぎず、両者は全く同じ意味です。*pでポインタが指す先の構造体本体を取り出し、そこに.でメンバアクセスするのが本来の書き方ですが、->を使えば1つの記号でまとめて書けます。structでもclassでも同じように使えます。"},{type:"order",lines:[{label:"A",code:"struct Results{ string name; int score; };"},{label:"B",code:"Results students[3];"},{label:"C",code:"for(int i=0;i<3;i++) cin>>students[i].name>>students[i].score;"},{label:"D",code:"sortByScore(students,3);"},{label:"E",code:"for(int i=0;i<3;i++) cout<<students[i].name<<endl;"}],lead:"3人分のデータを読み込み、得点順に並べ替えてから名前だけを出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D,E"],explain:"構造体を定義し(A)、配列を用意して(B)、全員分のデータを読み込み(C)、並べ替えてから(D)、最後に並べ替え後の順番で名前を出力します(E)。並べ替えより前に全員分読み込んでおく必要があります。"},{before:`struct Point{ int x; int y; };
struct Rect{ Point topLeft; int width; };
`,after:"",lead:"Rect構造体の変数rを宣言する行だけを書きなさい。",answers:["Rect r;"],explain:"構造体は他の型と同じように、型名 変数名; の形でそのまま宣言できます。Rectはメンバの1つとして別の構造体Pointを持っていますが、宣言の書き方自体は普通の構造体と変わりません。"},{before:`Rect r;
r.`,after:".x = 10; // topLeftのxメンバに10を設定する",answers:["topLeft"],explain:"RectはメンバとしてPoint型のtopLeftを持っているので、その中のxにアクセスするには、r.topLeft.xのようにドットを2回つなげます。まずr.topLeftでPoint型のtopLeftを取り出し、続けて.xでその中のxメンバにアクセスします。"},{type:"debug",long:!0,before:`struct Rect{ int width; int height; };
int area(Rect r){
`,after:`
}`,lead:"Rect構造体rのwidthとheightを掛け合わせた面積をreturnする処理を書きなさい。",answers:["return r.width * r.height;"],explain:"構造体rのメンバにはr.widthやr.heightのようにドットでアクセスできます。2つのメンバを掛け合わせた値をそのままreturnすれば、面積を計算する関数になります。"},{type:"choice",lead:"構造体を関数の引数にそのまま(ポインタを使わず)渡すと何が起きるか選びなさい。",options:["構造体全体がコピーされて渡される","ポインタとして扱われる","エラーになる","メンバが1つだけ渡される"],answers:["構造体全体がコピーされて渡される"],explain:"配列とは異なり、構造体を値渡しすると構造体全体(すべてのメンバ)がコピーされて関数に渡されます。そのため関数の中でコピーを書き換えても、呼び出し元の構造体には影響しません。呼び出し元を書き換えたい場合はポインタ渡しにする必要があります。"},{type:"order",lines:[{label:"A",code:"Rect r; r.width=4; r.height=3;"},{label:"B",code:"int a = area(r);"},{label:"C",code:"cout << a << endl; // 12"}],lead:"幅4・高さ3の長方形の面積を計算して出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"構造体変数を用意してメンバに値を設定してから(A)、area関数に渡して面積を計算し(B)、その結果を出力します(C)。4×3=12が表示されます。"},{before:`struct Point{ int x; int y; };
Point pts[2] = {`,after:"}; // {1,2}と{3,4}の2点で初期化する",answers:["{1,2},{3,4}"],explain:"構造体の配列も、外側の{ }の中に各要素分の{ }を並べることで、宣言と同時にまとめて初期化できます。{ {1,2}, {3,4} }と書けば、pts[0]がx=1,y=2、pts[1]がx=3,y=4になります。"},{before:`struct Point{ int x; int y; };
Point p;
Point* ptr = &p;
ptr`,after:"x = 5; // ポインタ経由でxに5を設定する(アロー演算子を使う)",answers:["->"],explain:"構造体へのポインタからメンバにアクセスするときはアロー演算子(->)を使います。ptr->xは(*ptr).xと同じ意味で、ptrが指す先(p)のxメンバに5を設定します。"},{type:"choice",lead:"構造体を関数から呼び出し元へ返す(returnする)ことはできるか選びなさい。",options:["できる(構造体全体をreturnできる)","できない(構造体はreturnできない)","ポインタでしか返せない","配列としてしか返せない"],answers:["できる(構造体全体をreturnできる)"],explain:"構造体もint型やdouble型と同じように、関数の戻り値の型として使えます。関数の中で作った構造体変数を、そのままreturnで呼び出し元に返すことができます。"},{type:"debug",long:!0,before:`struct Point{ int x; int y; };
Point makePoint(int x, int y){
`,after:`
}`,lead:"引数x,yを使って、xとyのメンバを設定したPoint構造体をreturnする処理を書きなさい。",answers:[`Point p;
p.x = x;
p.y = y;
return p;`],explain:"まずPoint型の変数pを用意し、引数として受け取ったx,yをp.x,p.yに代入して、最後にpをreturnします。関数は構造体をまるごと戻り値として返せます。"},{before:`struct Results{ string name; int score; };
Results students[3];
int sum=0;
for(int i=0;i<3;i++) sum += students[i].score;
int avg = sum / `,after:"; // 人数で割って平均を求める(半角数字)",answers:["3"],explain:"合計を人数(この場合3)で割ると平均が求められます。int型同士の割り算なので、小数点以下は切り捨てられます。"},{before:`struct Point{ int x; int y; };
Point a={1,2}, b={1,2};
if(a.x==b.x && `,after:'){ cout << "same" << endl; }',answers:["a.y==b.y"],explain:"構造体同士を直接==で比較することはできないため、メンバを1つずつ比較する必要があります。xがすでに比較済みなので、残りのyメンバ同士(a.yとb.y)も比較する式を補います。"},{type:"order",lines:[{label:"A",code:"Point p = makePoint(3,4);"},{label:"B",code:'cout << p.x << "," << p.y << endl; // 3,4'}],lead:"makePoint関数を使って構造体を生成し、その中身を出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B"],explain:"makePoint(3,4)を呼び出すと、x=3,y=4を持つPoint構造体が作られ、それをpに受け取ります(A)。続けてpのメンバを出力します(B)。"},{type:"choice",lead:"構造体のメンバに配列を持たせることはできるか(例: struct S{ int arr[5]; };)選びなさい。",options:["できる","できない","ポインタでしか持てない","1つの要素だけ持てる"],answers:["できる"],explain:"構造体のメンバには、int型やstring型と同じように配列も持たせることができます。struct S{ int arr[5]; }; と定義すれば、Sのオブジェクトはそれぞれ自分専用の5要素の配列を持ちます。"},{before:`struct Results{ string name; int score; };
Results r={"Yui", 88};
cout << r.name << ":" << `,after:' << endl; // "Yui:88"と表示したい',answers:["r.score"],explain:'r.nameで名前を、続けて":"という区切り文字を挟んでr.scoreで得点を出力すれば、"Yui:88"のような形式で表示できます。'},{type:"debug",long:!0,before:`struct Results{ string name; int score; };
void addBonus(Results* students, int n, int bonus){
`,after:`
}`,lead:"students配列の全員のscoreにbonusを加算する処理を書きなさい。",answers:[`for(int i=0;i<n;i++){
students[i].score += bonus;
}`],explain:"ポインタ渡しなので、関数の中でstudents[i].scoreを書き換えると、呼び出し元の配列にもその変更が反映されます。全員分をforループで1人ずつ処理します。"},{before:`struct Point{ int x; int y; };
Point p;
p.x = 0;
p.`,after:" = 0; // yも0に設定する",answers:["y"],explain:"p.xと同じように、p.yと書けばyメンバにアクセスできます。両方に0を代入すれば、pの中身は(0,0)になります。"},{type:"choice",lead:"構造体の配列を関数に渡し、関数の中で書き換えた内容を呼び出し元にも反映させたい場合、どの渡し方を使うべきか選びなさい。",options:["ポインタ渡し(Results*)","値渡しで構造体1個ずつコピーして渡す","文字列に変換して渡す","vector<int>に変換して渡す"],answers:["ポインタ渡し(Results*)"],explain:"配列は関数に渡すと自動的に先頭アドレス(ポインタ)として扱われます。Results*として受け取り、students[i]のように書き換えれば、呼び出し元の配列そのものを直接操作でき、変更が反映されます。"},{before:`struct Item{ string name; int price; };
Item a = `,after:'; // 名前"Pen"、価格100で宣言と同時に初期化する',answers:['{"Pen",100}'],explain:'構造体はメンバの並び順通りに{ }で値を渡せば、宣言と同時に初期化できます。Item a = {"Pen",100}; でnameに"Pen"、priceに100が設定されます。'},{before:`struct Item{ string name; int price; };
Item a;
a.name = "Pen";
a.`,after:" = 100; // priceに100を設定する",answers:["price"],explain:"構造体変数のメンバにはドット(.)でアクセスして代入できます。a.priceでpriceメンバを指定します。"},{before:`struct Item{ string name; int price; };
Item a={"Pen",100};
cout << a.name << " " << a.price << endl; // `,after:"",lead:"出力される内容を書きなさい。",answers:["Pen 100"],explain:'a.nameは"Pen"、a.priceは100なので、間の" "も合わせて"Pen 100"と出力されます。'},{before:`struct Item{ string name; int price; };
Item items[3];
items[0].name = "A";
items[`,after:'].name = "B"; // 2つ目の要素の名前を設定する',answers:["1"],explain:"配列の添字は0から始まるので、2つ目の要素はitems[1]です。"},{before:`struct Item{ string name; int price; };
Item* p = new Item;
p->name = "Pen";
cout << p->name << endl; // `,after:"",lead:"出力される内容を書きなさい。",answers:["Pen"],explain:'p->nameはp(ポインタ)が指す先の構造体のnameメンバを指します。設定した"Pen"がそのまま出力されます。'},{before:`struct Item{ int x; int y; };
Item arr[2] = {`,after:"}; // {1,2}と{3,4}の2要素で初期化する",answers:["{1,2},{3,4}"],explain:"構造体の配列は、外側の{ }の中に各要素分の{ }を並べて初期化します。{ {1,2}, {3,4} }でarr[0]がx=1,y=2、arr[1]がx=3,y=4になります。"},{before:`struct Item{ string name; int price; };
Item a; Item* p = &a;
cout << p`,after:"name << endl; // ポインタ経由でnameにアクセスする演算子(2文字)",answers:["->"],explain:"構造体へのポインタからメンバにアクセスするときは、p->nameのようにアロー演算子(->)を使います。"},{before:`struct Item{ string name; int price; };
Item a; Item* p = &a;
cout << (`,after:").name << endl; // アロー演算子を使わずに書く場合",answers:["*p"],explain:"p->nameは(*p).nameを短く書いたものです。*pでポインタが指す構造体本体を取り出し、そこに.でメンバアクセスします。"},{before:`struct Point{ int x; int y; };
struct Line{ Point start; Point end; };
Line l;
l.start.`,after:" = 5; // startのxに5を設定する",answers:["x"],explain:"lはPoint型のメンバstartとendを持つので、l.start.xのようにドットを2回つなげてPoint型内部のxにアクセスします。"},{before:`struct Point{ int x; int y; };
struct Line{ Point start; Point end; };
Line l;
l.`,after:".y = 10; // endのyに10を設定する",answers:["end"],explain:"Lineはstartとendという2つのPoint型メンバを持ちます。end側のyに設定するには、l.end.yと書きます。"},{before:`struct Item{ string name; int price; };
void raise(Item* p){
  p->price `,after:" 10; // priceを10増やす",answers:["+="],explain:"p->price += 10;で、ポインタが指す構造体のpriceメンバに10を加算します。"},{before:`struct Item{ string name; int price; };
Item a={"Pen",100};
Item b = a;
b.price = 200;
cout << a.price << endl; // aは変わらず
`,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["100"],explain:"b=aは構造体全体のコピーを作るので、bを変更してもaには影響しません。aのpriceは100のままです。"},{before:`struct Item{ string name; int price; };
Item items[5];
int n=5;
for(int i=0;i<n;i++) cin >> items[i].`,after:" >> items[i].price; // nameを読み込む",answers:["name"],explain:"cin>>は複数の変数を続けて読み込めるので、items[i].nameとitems[i].priceを1行でまとめて読み込めます。"},{type:"choice",lead:"構造体を値渡しで関数に渡した場合の説明として正しいものを選びなさい。",options:["構造体全体がコピーされて渡される","ポインタとして自動的に扱われる","エラーになる","メンバの一部だけがコピーされる"],answers:["構造体全体がコピーされて渡される"],explain:"構造体を値渡しすると、すべてのメンバを含む構造体全体がコピーされて関数に渡されます。関数内での変更は呼び出し元に影響しません。"},{type:"choice",lead:"構造体の配列を関数に渡した場合の説明として正しいものを選びなさい。",options:["先頭アドレスが渡され、関数内での変更が呼び出し元に反映される","必ず全体がコピーされる","エラーになる","要素数が自動的に変わる"],answers:["先頭アドレスが渡され、関数内での変更が呼び出し元に反映される"],explain:"配列は関数に渡すと自動的に先頭アドレス(ポインタ)として扱われるため、関数内でitems[i]を書き換えると呼び出し元の配列に反映されます。"},{type:"choice",lead:"アロー演算子(->)の説明として正しいものを選びなさい。",options:["(*p).memberを短く書いたもの","ポインタの値そのものを書き換える演算子","配列専用の演算子","構造体を比較する演算子"],answers:["(*p).memberを短く書いたもの"],explain:"p->memberは(*p).memberと全く同じ意味で、ポインタが指す構造体のメンバに簡潔にアクセスするための記法です。"},{type:"choice",lead:"2つの構造体変数を==でそのまま比較するとどうなるか選びなさい。",options:["多くの場合そのままでは比較できずコンパイルエラーになる","必ずメンバ同士を自動比較してtrue/falseを返す","必ずfalseになる","アドレスの大小を比較する"],answers:["多くの場合そのままでは比較できずコンパイルエラーになる"],explain:"構造体には標準で==演算子が定義されていないため、そのまま比較しようとするとコンパイルエラーになります。比較したい場合はメンバを1つずつ自分で比較する必要があります。"},{type:"choice",lead:"構造体のメンバに別の構造体(入れ子)を持たせることはできるか選びなさい。",options:["できる","できない","ポインタでしか持てない","1つまでしか持てない"],answers:["できる"],explain:"構造体はメンバとして他の構造体を持つことができます(例: struct Line{ Point start; Point end; };)。これを入れ子(ネスト)構造と呼びます。"},{type:"order",lines:[{label:"A",code:"struct Item{ string name; int price; };"},{label:"B",code:'Item a; a.name="Pen"; a.price=100;'},{label:"C",code:'cout << a.name << " " << a.price << endl; // Pen 100'}],lead:"構造体を定義し、メンバに値を設定して出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"構造体を定義してから(A)、変数を作りメンバに値を代入し(B)、最後に出力します(C)。"},{type:"order",lines:[{label:"A",code:"struct Point{ int x; int y; };"},{label:"B",code:"Point p; Point* ptr=&p;"},{label:"C",code:"ptr->x = 5; ptr->y = 10;"},{label:"D",code:'cout << p.x << "," << p.y << endl; // 5,10'}],lead:"ポインタ経由で構造体のメンバに値を設定し、出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"構造体を定義し(A)、変数とそれを指すポインタを用意し(B)、アロー演算子でメンバに値を設定し(C)、最後に出力します(D)。"},{type:"order",lines:[{label:"A",code:"struct Item{ string name; int price; };"},{label:"B",code:'Item items[2] = {{"A",100},{"B",200}};'},{label:"C",code:"for(int i=0;i<2;i++) cout << items[i].name << endl;"}],lead:"構造体の配列を初期化して、全員の名前を出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"構造体を定義し(A)、配列を初期化してから(B)、ループで各要素の名前を出力します(C)。"},{type:"debug",long:!0,before:`struct Item{ string name; int price; };
int totalPrice(Item* items, int n){
`,after:`
}`,lead:"items配列n個分のpriceを合計してreturnする処理を書きなさい。",answers:[`int sum=0;
for(int i=0;i<n;i++){
sum += items[i].price;
}
return sum;`],explain:"合計用のsumを0で初期化し、全要素のpriceを足し込んでからreturnします。"},{type:"debug",long:!0,before:`struct Item{ string name; int price; };
int findExpensive(Item* items, int n){
`,after:`
}`,lead:"items配列の中で最も高いpriceを持つ要素のインデックスをreturnする処理を書きなさい。",answers:[`int maxIdx=0;
for(int i=1;i<n;i++){
if(items[i].price>items[maxIdx].price) maxIdx=i;
}
return maxIdx;`],explain:"maxIdxに現時点で最も高い要素の添字を保持し、より高い要素が見つかるたびに更新します。これは最大値探索と同じ考え方です。"},{type:"debug",long:!0,before:`struct Item{ string name; int price; };
void applyDiscount(Item* items, int n, int percent){
`,after:`
}`,lead:"items配列全員のpriceをpercent%引きにする処理を書きなさい(price = price - price*percent/100)。",answers:[`for(int i=0;i<n;i++){
items[i].price = items[i].price - items[i].price*percent/100;
}`],explain:"各要素についてprice*percent/100(割引額)を計算し、元のpriceから引いた値を代入し直します。"},{type:"debug",long:!0,before:`struct Item{ string name; int price; };
int countOver(Item* items, int n, int threshold){
`,after:`
}`,lead:"priceがthresholdを超える要素の個数をreturnする処理を書きなさい。",answers:[`int count=0;
for(int i=0;i<n;i++){
if(items[i].price>threshold) count++;
}
return count;`],explain:"条件(priceがthresholdより大きい)を満たすたびにcountを1増やし、最後にreturnします。"},{type:"debug",long:!0,before:`struct Item{ string name; int price; };
void sortByPriceAsc(Item* items, int n){
`,after:`
}`,lead:"items配列をpriceの昇順(小さい順)に並べ替えるバブルソートの処理一式を、これまでと同じfor文の型(i=1;i<n;i++ と j=n-1;j>=i;j--)で書きなさい。",answers:[`for(int i=1;i<n;i++){
for(int j=n-1;j>=i;j--){
if(items[j-1].price>items[j].price){
Item w=items[j];items[j]=items[j-1];items[j-1]=w;
}
}
}`],explain:"昇順にしたいので、隣同士でitems[j-1].priceがitems[j].priceより大きければ交換します。交換する単位が構造体まるごとである点に注意します。"},{type:"debug",long:!0,before:`struct Point{ int x; int y; };
Point addPoints(Point a, Point b){
`,after:`
}`,lead:"aとbのxとy同士をそれぞれ足した新しいPointをreturnする処理を書きなさい。",answers:[`Point p;
p.x = a.x + b.x;
p.y = a.y + b.y;
return p;`],explain:"新しいPoint型の変数pを用意し、xとyそれぞれにaとbの対応するメンバの和を代入して、pをreturnします。"},{type:"debug",long:!0,before:`struct Item{ string name; int price; };
bool hasItem(Item* items, int n, string target){
`,after:`
}`,lead:"items配列の中にnameがtargetと一致する要素があればtrueをreturnする処理を書きなさい。",answers:[`for(int i=0;i<n;i++){
if(items[i].name==target) return true;
}
return false;`],explain:"一致する要素が見つかった時点でtrueをreturnし、最後まで見つからなければループの外でfalseをreturnします。"},{type:"debug",long:!0,before:`struct Item{ string name; int price; };
void printAll(Item* items, int n){
`,after:`
}`,lead:'items配列全員の名前と価格を1行ずつ"name: price"の形式で出力する処理を書きなさい。',answers:[`for(int i=0;i<n;i++){
cout << items[i].name << ": " << items[i].price << endl;
}`],explain:'各要素についてnameと": "とpriceを続けて出力すれば、"name: price"の形式になります。'},{before:`struct Item{ string name; int price; };
Item items[3] = {{"A",100},{"B",200},{"C",300}};
int sum=0;
for(int i=0;i<3;i++) sum += items[i].price;
cout << sum << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["600"],explain:"100+200+300=600です。"},{before:`struct Item{ string name; int price; };
Item items[3] = {{"A",100},{"B",200},{"C",300}};
cout << items[1].name << endl; // `,after:"",lead:"出力される内容を書きなさい。",answers:["B"],explain:'添字は0から始まるので、items[1]は2つ目の要素、つまり"B"です。'},{before:`struct Item{ string name; int price; };
Item a={"A",100}, b={"B",100};
if(a.price == b.price){
  cout << "same price" << endl;
}
// このif文が比較しているものは何か(日本語で簡潔に)
`,after:"",answers:["価格","priceの値"],explain:"a.priceとb.priceを比較しているので、2つのItemの価格(price)が同じかどうかを調べています。"},{before:`struct Item{ string name; int price; };
Item items[100];
int n;
cin >> n;
for(int i=0;i<`,after:";i++) cin >> items[i].name >> items[i].price;",answers:["n"],explain:"読み込む人数はcinで受け取ったnなので、ループはi<nまで繰り返します。"},{before:`struct Item{ string name; int price; };
int n=3;
Item items[3];
for(int i=0;i<n;i++){
  cin >> items[i].name;
  cin >> items[i].`,after:`;
}`,answers:["price"],explain:"nameを読み込んだ後は、続けてpriceも読み込む必要があります。"},{before:`struct Point{ int x; int y; };
Point origin = {0,0};
Point p = {3,4};
int dx = p.x - origin.`,after:"; // 0を引く",answers:["x"],explain:"origin.xは0なので、p.xからorigin.xを引くことでx方向の差(この場合3)が求まります。"},{type:"debug",long:!0,before:`struct Item{ string name; int price; };
Item makeItem(string n, int pr){
`,after:`
}`,lead:"引数n,prを使って、nameとpriceを設定したItem構造体をreturnする処理を書きなさい。",answers:[`Item i;
i.name = n;
i.price = pr;
return i;`],explain:"Item型の変数iを用意し、引数の値をそれぞれのメンバに代入して、最後にiをreturnします。"},{before:`struct Item{ string name; int price; };
Item it = makeItem("Pen", 100);
cout << it.name << endl; // `,after:"",lead:"出力される内容を書きなさい。",answers:["Pen"],explain:'makeItem("Pen",100)はnameが"Pen"のItemを返すので、it.nameは"Pen"です。'},{before:`struct Item{ string name; int price; };
void changeName(Item* p, string newName){
  p->`,after:` = newName;
}`,answers:["name"],explain:"ポインタが指す構造体のnameメンバを書き換えたいので、p->nameに新しい値を代入します。"},{before:`struct Item{ string name; int price; };
void changeNameByValue(Item i, string newName){
  i.name = newName;
}
// 呼び出し元のItemは変わるか変わらないか(日本語で)
`,after:"",answers:["変わらない"],explain:"値渡しで受け取ったiは呼び出し元とは別のコピーなので、iを書き換えても呼び出し元の構造体には影響しません。"},{before:`struct Item{ string name; int price; };
Item items[2] = {{"A",100},{"B",200}};
for(int i=0;i<2;i++){
  items[i].price `,after:" 1.1; // 全員のpriceを1.1倍にする(int型なので小数点以下切り捨て)",answers:["*="],explain:"*=を使うと、現在の値に掛け算した結果を代入し直せます。items[i].price *= 1.1;で価格が1.1倍になります(int型のため小数点以下は切り捨てられます)。"}],qsExpert:[{type:"debug",long:!0,before:`#include <iostream>
#include <string>
using namespace std;
struct Results{ string name; int score; };
int main(){
`,after:`
  return 0;
}`,lead:"サイズ3のResults配列studentsを宣言し、cinで3人分の名前と得点を読み込んでから、全員分をcoutで1行ずつ出力する処理を書きなさい。",answers:[`Results students[3];
for(int i=0;i<3;i++){
cin>>students[i].name>>students[i].score;
}
for(int i=0;i<3;i++){
cout<<students[i].name<<" "<<students[i].score<<endl;
}`],explain:"構造体配列を宣言し、1つ目のforで全員分の名前と得点をcinで読み込みます。2つ目のforでは、読み込んだ順番のまま全員分をcoutで出力します。読み込みと出力を別々のループに分けて書く、という基本の流れです。"},{type:"debug",long:!0,before:`struct Results{ string name; int score; };
Results findTopScorer(Results* students, int n){
`,after:`
}`,lead:"students配列の中から最も得点(score)が高い生徒をreturnする処理を書きなさい。",answers:[`Results top=students[0];
for(int i=1;i<n;i++){
if(students[i].score>top.score) top=students[i];
}
return top;`],explain:"配列の最大値探しと同じ考え方を、構造体まるごとに応用しています。topをstudents[0]で仮に設定し、それより得点の高い生徒が見つかるたびにtop自体(name, score両方)を丸ごと更新し、最後にtopをreturnします。"},{type:"debug",long:!0,before:`struct Results{ string name; int score; };
void printAll(Results* students, int n){
  Results* p = students;
`,after:`
}`,lead:"pをstudentsの先頭から1つずつ進めながら、n人分の名前をp->nameの形でcoutに出力し、そのたびにpを1つ次の要素へ進める処理(for文)を書きなさい。",answers:[`for(int i=0;i<n;i++){
cout << p->name << endl;
p++;
}`],explain:"構造体へのポインタpは、p++と書くことでResults型1つぶん(sizeof(Results)バイト)だけ先へ進み、配列の次の要素を指すようになります。students[i]のように添字でアクセスする代わりに、ポインタ自体を1つずつ進めていく書き方もできる、という発展的な使い方です。"},{type:"debug",long:!0,before:`struct Results{ string name; int score; };
int countPassed(Results* students, int n){
`,after:`
}`,lead:"students配列の中で、score(得点)が60以上の人数を数えてreturnする処理を書きなさい。",answers:[`int count=0;
for(int i=0;i<n;i++){
if(students[i].score>=60) count++;
}
return count;`],explain:"countを0から始め、students[i].scoreが60以上の生徒が見つかるたびに1つずつ増やしていきます。ループを最後まで回し終えたcountには、条件を満たした人数がそのまま残ります。"},{type:"debug",long:!0,before:`struct Results{ string name; int score; };
void sortByName(Results* students, int n){
`,after:`
}`,lead:"students配列を名前(name)の辞書順(アルファベット順)に並べ替えるバブルソートの処理一式を書きなさい(名前の比較には<演算子が使えます)。",answers:[`for(int i=1;i<n;i++){
for(int j=n-1;j>=i;j--){
if(students[j-1].name>students[j].name){
Results w=students[j];students[j]=students[j-1];students[j-1]=w;
}
}
}`],explain:"string型は数値と同じように>や<で比較でき、辞書順(アルファベット順)で大小が判定されます。scoreの数値比較をnameの文字列比較に置き換えるだけで、得点順のバブルソートと全く同じ構造で名前順の並べ替えが書けます。"},{type:"debug",long:!0,before:`struct Results{ string name; int score; };
double averageScore(Results* students, int n){
`,after:`
}`,lead:"students配列のscoreの平均をdouble型でreturnする処理を書きなさい。",answers:[`int sum=0;
for(int i=0;i<n;i++){
sum += students[i].score;
}
return (double)sum/n;`],explain:"合計を求めたあと、int型のまま割ると小数点以下が切り捨てられるため、(double)でsumを変換してから割ることで正しい平均が求まります。"},{type:"debug",long:!0,before:`struct Results{ string name; int score; };
Results findLowestScorer(Results* students, int n){
`,after:`
}`,lead:"students配列の中から最も得点が低い生徒をreturnする処理を書きなさい。",answers:[`Results low=students[0];
for(int i=1;i<n;i++){
if(students[i].score<low.score) low=students[i];
}
return low;`],explain:"最大値探しと同じ考え方で、比較の不等号を逆にするだけで最小値(最も得点が低い生徒)を探せます。"},{type:"debug",long:!0,before:`struct Results{ string name; int score; };
Results findTopScorer(Results* students, int n){
  Results top=students[0];
  for(int i=1;i<n;i++){
    if(students[i].score>top.score) top=students[i];
  }
  return top;
}
int main(){
`,after:`
  return 0;
}`,lead:'サイズ3のResults配列studentsを{"A",70},{"B",90},{"C",60}で初期化し、findTopScorerの結果のnameを出力する処理を書きなさい(90点のBが出力されるはず)。',answers:[`Results students[3] = {{"A",70},{"B",90},{"C",60}};
cout << findTopScorer(students,3).name << endl;`],explain:"findTopScorer(students,3)はResults構造体をまるごとreturnするので、その戻り値に対して.nameでnameメンバにアクセスし、そのまま出力できます。"},{type:"debug",long:!0,before:`struct Point{ int x; int y; };
struct Rect{ Point topLeft; Point bottomRight; };
int area(Rect r){
`,after:`
}`,lead:"r.bottomRight.xとr.topLeft.xの差(幅)、r.bottomRight.yとr.topLeft.yの差(高さ)を掛け合わせた面積をreturnする処理を書きなさい。",answers:[`int width = r.bottomRight.x - r.topLeft.x;
int height = r.bottomRight.y - r.topLeft.y;
return width * height;`],explain:"入れ子になった構造体のメンバには、r.bottomRight.xのようにドットを2回つなげてアクセスします。幅と高さをそれぞれ差で求めてから掛け合わせます。"},{type:"debug",long:!0,before:`struct Point{ int x; int y; };
struct Rect{ Point topLeft; Point bottomRight; };
int area(Rect r){
  int width = r.bottomRight.x - r.topLeft.x;
  int height = r.bottomRight.y - r.topLeft.y;
  return width * height;
}
int main(){
`,after:`
  return 0;
}`,lead:"topLeftが(0,0)、bottomRightが(4,3)のRect構造体rを宣言し、area(r)の結果を出力する処理を書きなさい(12になるはず)。",answers:[`Rect r = {{0,0},{4,3}};
cout << area(r) << endl;`],explain:"入れ子構造体の初期化は{ {0,0}, {4,3} }のように、内側の構造体ごとに{ }で値をまとめて書きます。"},{type:"debug",long:!0,before:`struct Results{ string name; int score; };
Results* findByName(Results* students, int n, string target){
`,after:`
}`,lead:"students配列の中からnameがtargetと一致する要素へのポインタをreturnする処理を書きなさい(見つからなければnullptrをreturnする)。",answers:[`for(int i=0;i<n;i++){
if(students[i].name==target) return &students[i];
}
return nullptr;`],explain:"&students[i]で配列のi番目の要素そのもののアドレスを取得できます。見つからなければ「何も指していない」ことを表すnullptrをreturnします。"},{type:"debug",long:!0,before:`struct Results{ string name; int score; };
void curveScores(Results* students, int n, int amount){
`,after:`
}`,lead:"students配列全員のscoreにamountを加算する処理を書きなさい(得点が100を超えないように上限をかける)。",answers:[`for(int i=0;i<n;i++){
students[i].score += amount;
if(students[i].score>100){
students[i].score=100;
}
}`],explain:"まずamountを加算し、その結果が100を超えていれば100に切り詰めることで、「上限を超えて加点しすぎない」という制約を実現します。"},{type:"debug",long:!0,before:`struct Point{ int x; int y; };
bool isSamePoint(Point a, Point b){
`,after:`
}`,lead:"aとbのxとyがそれぞれ等しいかどうかをbool型でreturnする処理を書きなさい。",answers:["return a.x==b.x && a.y==b.y;"],explain:"構造体同士は直接==で比較できないため、メンバを1つずつ比較する必要があります。xとyの両方が一致しているかを&&(かつ)でつなげて判定します。"},{type:"debug",long:!0,before:`struct Point{ int x; int y; };
bool isSamePoint(Point a, Point b){ return a.x==b.x && a.y==b.y; }
int main(){
`,after:`
  return 0;
}`,lead:"p1を(1,2)、p2を(1,2)で宣言し、isSamePoint(p1,p2)の結果を出力する処理を書きなさい(1になるはず)。",answers:[`Point p1={1,2}, p2={1,2};
cout << isSamePoint(p1,p2) << endl;`],explain:"p1とp2は同じx,yの値を持つので、isSamePoint(p1,p2)はtrue(=1)を返します。"},{type:"debug",long:!0,before:`#include <iostream>
#include <string>
using namespace std;
struct Results{ string name; int score; };
int main(){
  Results students[3] = {{"A",80},{"B",90},{"C",70}};
`,after:`
  return 0;
}`,lead:"students配列全員のscoreの合計と平均を求め、合計・平均の順で1行ずつ出力する処理を書きなさい(平均はdouble型で計算する)。",answers:[`int sum=0;
for(int i=0;i<3;i++){
sum += students[i].score;
}
cout << sum << endl;
cout << (double)sum/3 << endl;`],explain:"合計を求めてから(double)で変換して3で割ることで、平均を小数として正しく求められます。"}],qsDrag:[{type:"dragfill",lead:"ポインタpを1つずつ進めながら全員の名前を出力する処理になるよう、正しいピースを空欄に配置しなさい。",lines:[{code:"Results* p = students;"},{blank:"b1"},{blank:"b2"},{code:"}"}],pieces:[{id:"p1",code:"for(int i=0;i<n;i++){"},{id:"p2",code:"cout << p->name << endl; p++;"},{id:"p3",code:"cout << p.name << endl; p++;"}],answerMap:{b1:"p1",b2:"p2"},explain:"pはResultsへのポインタなので、メンバにアクセスするにはp->nameのようにアロー演算子を使います(p2)。p3のp.nameは、ポインタではなく構造体本体に対して使うドット演算子なので、ポインタpにはこの書き方は使えません。"}]},{id:"w7",title:"CASE 07「もう一人の容疑者」",sub:"Week7 クラスとオブジェクト",emoji:"⚔️",mon:"同じ顔をしたインスタンス",lesson:[{title:"クラスの基本形",code:`class Hero{
  string name;
  int HP;
public:
  Hero(string n){ name=n; HP=50; }
  int attack(){ return 10; }
};`,explain:'クラスは、構造体をさらに発展させたもので、データ(name, HPのようなデータメンバ)と、そのデータを操作する処理(attackのようなメンバ関数)を1つにまとめて定義できる仕組みです。Hero(string n){ name=n; HP=50; } のように、クラス名と全く同じ名前で戻り値の型を書かない特別な関数を「コンストラクタ」と呼びます。コンストラクタはHero hero("勇者"); のようにオブジェクトを生成した瞬間に自動的に呼び出され、渡された引数を使ってデータメンバを初期化する役割を持っています。「オブジェクトが生まれると同時に、必要な準備を済ませてくれる関数」だとイメージするとよいでしょう。'},{title:"オブジェクトの生成と呼び出し",code:`Hero hero("勇者");
cout << hero.attack() << endl;`,explain:'クラスは、あくまで「どんなデータを持ち、どんな機能を提供するか」を決めた設計図のようなものであり、それ自体はまだ実体を持ちません。Hero hero("勇者"); のように書いて初めて、その設計図から実際にメモリ上に作られた実体ができあがり、これを「オブジェクト」または「インスタンス」と呼びます。オブジェクトが持っている機能(メンバ関数)を使いたいときは、構造体のときと同じように、オブジェクト名の後ろにドット(.)をつけて呼び出します。hero.attack()は「heroというオブジェクトに対して、attackという機能を実行させる」という意味になります。'},{title:"bool型",code:`bool alive = true;
if(alive){ cout << "生きている" << endl; }`,explain:"bool型は「論理型」と呼ばれ、true(真、そうである)とfalse(偽、そうでない)の2つの値しか取れない、とてもシンプルな型です。「そのオブジェクトが生きているかどうか」「条件を満たしているかどうか」のような、Yes/Noで答えられる情報を表すのにぴったりです。if(alive){ ... } のように、if文の条件としてbool型の変数をそのまま書くことができ、aliveがtrueのときだけ{ }の中の処理が実行されます。"}],qs:[{before:`class Hero{
  string name;
  int HP;
public:
  Hero(string nameInput); // これは何と呼ばれる特別な関数か(カタカナで)
};`,after:"",answers:["コンストラクタ"],explain:'クラス名(Hero)と全く同じ名前を持ち、戻り値の型を一切書かない特別な関数のことを「コンストラクタ」と呼びます。普通のメンバ関数は自分で呼び出す必要がありますが、コンストラクタだけは、Hero hero("勇者"); のようにオブジェクトが生成されるタイミングで、C++が自動的に呼び出してくれます。その役割は、name = nameInput; HP = 50; のように、生まれたばかりのオブジェクトのデータメンバに初期値を設定してあげることです。「オブジェクトの誕生と同時に実行される、初期設定専用の関数」というイメージを持つとよいでしょう。'},{before:`Hero::Hero(string nameInput){
  name = nameInput;
  HP = 50;
}
// コンストラクタの戻り値の型はどう書くか(何も書かない場合は「なし」と答えなさい)
`,after:"",answers:["なし","何も書かない"],explain:"普通の関数は必ず戻り値の型(int, void, boolなど)を関数名の前に書きますが、コンストラクタだけは唯一の例外で、戻り値の型を何も書きません。「コンストラクタは値を返さない関数だからvoidだろう」と考えて Hero void(string nameInput){ ... } のように書いてしまうのは初心者にありがちな間違いですが、これはコンパイルエラーになります。コンストラクタは「値を返さない」のではなく、そもそも「戻り値という概念自体が無い、特別な種類の関数」だと理解しておきましょう。"},{before:`int main(){
  Hero hero("勇者");
  hero`,after:"attack(); // メンバ関数を呼び出す記号",answers:["."],explain:"オブジェクトが持っているメンバ関数(そのオブジェクトができる「動作」)を呼び出すときは、オブジェクト名の後ろにドット(.)をつけて、続けて関数名と括弧を書きます。hero.attack() は「heroというオブジェクトに対して、attackという機能を実行しなさい」という意味の命令です。このドットは、構造体のメンバにアクセスするときに使ったドットと全く同じ記号で、「このオブジェクトの中にある、これを使いたい」という意味を表す共通の演算子だと考えておきましょう。"},{before:"bool isAlive = ",after:"; // 論理型の値で「真」を表すキーワード",answers:["true"],explain:"bool型(論理型)は真偽値、つまり「そうである/そうでない」だけを表すためのとてもシンプルな型で、true(真、そうである)とfalse(偽、そうでない)の2つの値しか取ることができません。intのように0や1、100といった無数の値を扱えるわけではなく、あくまで2択のスイッチのようなものだとイメージしてください。isAlive = true; は「生きている状態にする」、isAlive = false; は「そうでない(死んでいる)状態にする」ということを表しており、if(isAlive){ ... } のように条件分岐で使われることが多いです。"},{before:`class Hero{
  string name; // これらは何と呼ばれるか(漢字で)
  int HP;
public:
  Hero(string nameInput);
};`,after:"",answers:["データメンバ"],explain:'クラスの中に書かれた変数(この例ではnameとHP)は「データメンバ」と呼ばれます(「メンバ変数」と呼ばれることもあります)。ここで大事なポイントは、データメンバはクラスの外にある普通の変数とは違い、そのクラスから作られたオブジェクトごとに、それぞれ個別のコピーを持つという点です。たとえばHero hero1("勇者A"); とHero hero2("勇者B"); を作ると、hero1のnameとhero2のnameは全く別々のメモリに保管され、片方を書き換えてももう片方には影響しません。'},{before:`Hero hero1("勇者A");
Hero hero2("勇者B");
// Heroクラスから作られたhero1,hero2のような実体を何と呼ぶか(カタカナで)
`,after:"",answers:["オブジェクト","インスタンス"],explain:"クラスはあくまで「どんなデータを持ち、どんな機能があるか」を定義した設計図であり、それ自体は実体を持ちません。その設計図をもとに実際にメモリ上へ作られた実体のことを「オブジェクト」、または「インスタンス」と呼びます(「インスタンス化する」は「オブジェクトを作る」とほぼ同じ意味で使われます)。この例では、同じHeroという1つの設計図から、hero1とhero2という2つの独立したオブジェクトが作られています。どちらも同じ種類の存在(Hero)ですが、それぞれが自分専用のnameやHPというデータを持っているため、片方の状態を変えてももう片方には影響しません。"},{before:`// クラスの中にデータと処理をひとまとめにして、外から余計な操作をされないようにする考え方をカタカナで書きなさい
`,after:"",answers:["カプセル化"],explain:"データ(HPなど)と、それを操作するための関数(attack, damagedなど)をクラスという1つの箱にひとまとめにし、外部からは決められた方法(公開されたメンバ関数)を通してしか触れないようにすることを「カプセル化」と呼びます。薬を直接手で触らずカプセルに包んで安全に飲めるようにするイメージから、この名前がついています。カプセル化のご利益は、たとえばHPという数値を外部から直接 hero.HP = -9999; のように書き換えられてしまうと、プログラムのルールを無視した不正な状態になりかねませんが、damaged(int pt)のような専用の関数を通してしか変更できないようにしておけば、常に決められたルール(HPは0未満にならない、など)を守った安全な操作しかできなくなる、という点にあります。次のWeek8ではこれをprivate/publicという指定子で実現する方法を学びます。"},{before:`class Counter{
  int count;
public:
  Counter(){ count=0; }
  void increment(){ count++; }
};
Counter c;
c`,after:"increment(); // メンバ関数を呼び出す記号",answers:["."],explain:"オブジェクトのメンバ関数を呼び出すときは、オブジェクト名の後ろにドット(.)をつけます。"},{before:"bool isDead = ",after:"; // 論理型の値で「偽」を表すキーワード",answers:["false"],explain:"bool型はtrue(真)とfalse(偽)の2つの値しか取りません。falseは「そうでない」ことを表します。"},{before:`class Hero{
public:
  Hero(string n){ }
  int getHP(){ return 50; }
};
Hero hero("A");
int hp = hero.`,after:"();",answers:["getHP"],explain:"getHP()を呼び出すと、そのメンバ関数の戻り値(50)がhpに代入されます。"},{before:`class Item{
public:
  Item(string n){ }
};
`,after:' item("Pen"); // Item型のオブジェクトitemを生成する行',answers:["Item"],explain:'クラス名を型名として使い、Item item("Pen");のように書けばオブジェクトを生成できます。'},{before:"",after:` Hero{
public:
  Hero(string n){ }
};`,lead:"クラスを定義するキーワードを補いなさい。",answers:["class"],explain:"classキーワードを使ってクラスを定義します。"},{before:`class Hero{
  int HP;
public:
  Hero(){ HP=50; }
  void damaged(int pt){ HP -= pt; }
};
Hero hero;
hero.damaged(`,after:"); // 20のダメージを与える呼び出し",answers:["20"],explain:"damaged(20)を呼ぶと、HPが20減ります。"},{before:`class Hero{
  int HP;
`,after:`:
  Hero(){ HP=50; }
}; // 外部からコンストラクタを呼べるようにするアクセス指定子`,answers:["public"],explain:"コンストラクタを外部から呼べるようにするには、public:の後に定義する必要があります。"},{before:`// 同じクラスから作られた複数のオブジェクトが持つデータメンバは、共有されるか独立しているか(答えを書く)
`,after:"",answers:["独立している","独立"],explain:"同じクラスから作られたオブジェクトでも、それぞれが自分専用のデータメンバを持ち、独立しています。"}],qsHard:[{type:"debug",before:`class Hero{
  string name;
  int HP;
public:
  Hero(string n){ name=n; HP=50; }
};
int main(){
  `,after:' // Heroには引数ありのコンストラクタしか無いため、これはコンパイルエラーになる。文字列"勇者"を渡して正しく生成する行に直しなさい',answers:['Hero hero("勇者");'],explain:'HeroクラスにはHero(string n)という引数ありのコンストラクタしか定義されていないため、引数なしでオブジェクトを作ろうとするとコンパイルエラーになります。Hero hero("勇者"); のように、必要な引数を渡して生成する必要があります。'},{type:"choice",lead:"カプセル化の目的として最も適切なものを選びなさい。",options:["データと処理をひとまとめにし、外部からの不正な操作を防ぐこと","プログラムの実行速度を上げること","メモリ使用量を減らすこと","継承をしやすくすること"],answers:["データと処理をひとまとめにし、外部からの不正な操作を防ぐこと"],explain:"カプセル化は、データを直接いじられることで起きる不正な状態を防ぐため、決められた入り口(公開されたメンバ関数)を通してのみデータを操作できるようにする考え方です。速度やメモリ効率とは直接関係ありません。"},{type:"order",lines:[{label:"A",code:'Hero hero("勇者");'},{label:"B",code:"int atk = hero.attack();"},{label:"C",code:"cout << atk << endl;"}],answers:["A,B,C"],explain:"オブジェクトを生成してから(A)、そのメンバ関数を呼び出して結果を受け取り(B)、最後に結果を表示します(C)。生成前にメンバ関数を呼ぶことはできません。"},{type:"debug",before:`class Counter{
  int count;
public:
  Counter(){ count=0; }
  void increment(){ count++; }
  int getCount(){ return count; }
};
Counter c;
c.increment;
// increment()の呼び出し方に問題がある。正しく直しなさい
`,after:"",answers:["c.increment();"],explain:"メンバ関数を呼び出すには、括弧()をつけてc.increment();と書く必要があります。括弧を忘れると関数そのものを指すだけで、実行されません。"},{type:"choice",lead:"クラスから生成されたオブジェクトを何と呼ぶか、正しいものを選びなさい。",options:["オブジェクト(またはインスタンス)","データメンバ","コンストラクタ","ポインタ"],answers:["オブジェクト(またはインスタンス)"],explain:"クラスという設計図をもとに、実際にメモリ上へ作られた実体をオブジェクト(またはインスタンス)と呼びます。"},{type:"order",lines:[{label:"A",code:'Hero hero("勇者");'},{label:"B",code:"int hp = hero.getHP();"},{label:"C",code:"cout << hp << endl;"}],answers:["A,B,C"],explain:"オブジェクトを生成し(A)、getHP()の結果を変数に受け取り(B)、出力します(C)。"},{type:"debug",before:`class Hero{
  int HP;
public:
  Hero(){ HP=50; }
  int getHP(){
`,after:`
  }
};`,lead:"getHPメソッドの中身に、HPをreturnする処理を書きなさい。",answers:["return HP;"],explain:"getHP()はHPの値をそのままreturnする、privateなデータメンバを安全に読み取るためのメソッドです。"},{type:"choice",lead:"同じクラスから作られた2つのオブジェクトについて正しい説明を選びなさい。",options:["それぞれ独立したデータメンバを持つ","データメンバを共有する","片方を変更するともう片方も変わる","2つ目は生成できない"],answers:["それぞれ独立したデータメンバを持つ"],explain:"同じクラスから作られたオブジェクトでも、それぞれが自分専用のデータメンバの領域を持ちます。"},{type:"debug",before:`class Counter{
  int count;
public:
  Counter(){ count=0; }
  int getCount(){
`,after:`
  }
};`,lead:"getCountメソッドの中身に、countをreturnする処理を書きなさい。",answers:["return count;"],explain:"getCount()はcountの値をそのままreturnするだけの、外部から安全に読み取るための窓口です。"},{type:"order",lines:[{label:"A",code:'Hero hero1("A",80);'},{label:"B",code:'Hero hero2("B",50);'},{label:"C",code:"cout << hero1.getHP() << endl;"}],answers:["A,B,C"],explain:"2つのオブジェクトを生成し(A,B)、片方のgetHP()を呼んで出力します(C)。"},{before:`class Hero{
  bool alive;
public:
  Hero(){ alive=true; }
  bool isAlive(){ return alive; }
};
Hero h;
cout << h.isAlive() << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["1"],explain:"aliveはtrueで初期化されているので、isAlive()はtrue(=1)を返します。"},{type:"choice",lead:"クラスのオブジェクトを配列として複数まとめて扱うことはできるか選びなさい。",options:["できる","できない","ポインタ配列でしか扱えない","1つまでしか作れない"],answers:["できる"],explain:"クラスのオブジェクトも、intや構造体と同じように配列として複数まとめて扱えます。"},{before:`class Hero{
public:
  Hero(string n){ }
};
Hero party[3] = { Hero("A"), Hero("B"), `,after:" };",answers:['Hero("C")'],explain:'配列の初期化子には、生成したいオブジェクトをその場でHero("C")のように書き並べられます。'},{type:"order",lines:[{label:"A",code:'Hero hero1("A",80);'},{label:"B",code:'Hero hero2("B",60);'},{label:"C",code:"cout << hero1.isStrongerThan(hero2) << endl; // 1"}],answers:["A,B,C"],explain:"2人のHeroを生成し(A,B)、比較メソッドの結果を出力します(C)。80>60なのでtrue(1)になります。"},{type:"choice",lead:"privateなデータメンバに外部から直接アクセスしようとするとどうなるか選びなさい。",options:["コンパイルエラーになる","値が自動的に0になる","警告だけでアクセスできる","publicなメンバ関数が自動的に呼ばれる"],answers:["コンパイルエラーになる"],explain:"privateなメンバは、そのクラス自身のメンバ関数以外からアクセスしようとするとコンパイルエラーになります。"}],qsExtra:[{before:`class Hero{
  int HP;
public:
  Hero(){ HP=50; }
  void damaged(int pt){
`,after:`
  }
};`,lead:"damagedメソッドの中身に、HPをptの分だけ減らす処理を書きなさい。",answers:["HP -= pt;"],explain:"-=演算子を使うと、HP = HP - pt; と同じ意味を短く書けます。damaged(20)を呼べばHPが20減る、というように、メンバ関数を通してデータメンバを安全に変化させる典型的な例です。"},{before:"",after:"",lead:'"勇者A"という名前でhero1、"勇者B"という名前でhero2という2つのHeroオブジェクトを生成する行を書きなさい。',answers:[`Hero hero1("勇者A");
Hero hero2("勇者B");`],explain:"同じHeroという設計図から、異なる引数を渡してhero1とhero2という2つの独立したオブジェクトを作れます。それぞれが自分専用のname、HPを持つため、片方の状態を変えてももう片方には影響しません。"},{type:"debug",long:!0,before:`class Hero{
  string name;
  int HP;
public:
`,after:`
};`,lead:"name(string)を受け取りHPを50で初期化するコンストラクタ、10を返すattack()メソッド、HPが0より大きいかをbool型で返すisAlive()メソッドを、あわせて定義しなさい。",answers:[`Hero(string n){ name=n; HP=50; }
int attack(){ return 10; }
bool isAlive(){ return HP>0; }`],explain:"コンストラクタで受け取った名前をnameに、HPを50に設定します。attack()は固定で10を返すだけの単純なメソッドです。isAlive()はHP>0という条件式の結果(true/false)をそのままbool型としてreturnすることで、「生きているかどうか」を1つの真偽値で表現できます。"},{type:"debug",long:!0,before:`int main(){
`,after:`
}`,lead:'"勇者"という名前でheroオブジェクトを生成し、attack()の戻り値と、isAlive()の戻り値を順に1行ずつ出力する処理を書きなさい。',answers:[`Hero hero("勇者");
cout << hero.attack() << endl;
cout << hero.isAlive() << endl;`],explain:"オブジェクトを生成したあと、hero.attack()やhero.isAlive()のようにドットでメンバ関数を呼び出し、その戻り値をそのままcoutに渡せます。isAlive()はbool型を返すので、生きていれば1が表示されます。"},{type:"choice",lead:"bool型の値をcoutでそのまま出力すると、画面には何が表示されるか選びなさい。",options:["true→1、false→0という数字","trueとfalseという文字列そのまま","必ずtrueと表示される","コンパイルエラーになる"],answers:["true→1、false→0という数字"],explain:"coutはbool型の値を、trueなら1、falseなら0という数字として表示します。「生きているかどうか」を画面にそのまま分かりやすい文字で出したい場合は、boolalphaというマニピュレータを使うとtrue/falseの文字列で表示させることもできますが、何も指定しなければ数字での表示が既定の動作です。"},{type:"order",lines:[{label:"A",code:'Hero hero("勇者");'},{label:"B",code:"hero.damaged(20);"},{label:"C",code:"cout << hero.isAlive() << endl; // 1(生きている)"}],lead:"勇者を生成し、20のダメージを受けさせたあと、生存しているかを出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"オブジェクトを生成してから(A)ダメージを与え(B)、その結果を確認します(C)。HP50から20減っても0より大きい(30)ので、isAlive()はtrue(1)を返します。"},{before:`class Hero{
  string name;
public:
  Hero(string n){ name=n; }
  string `,after:"(){ return name; } // nameを読み取るメソッド名(get+メンバ名)",answers:["getName"],explain:"get+メンバ名(getName)という名付け方は、privateなメンバを外部から安全に読み取るためのメソッドによく使われる慣習です。中身はメンバをそのままreturnするだけの単純な処理です。"},{before:`class Hero{
  int HP;
public:
  Hero(){ HP=50; }
  int getHP(){ return HP; }
  void show(){
`,after:`
  }
};`,lead:"showメソッドの中身に、getHP()の結果をcoutで出力する処理を書きなさい。",answers:["cout << getHP() << endl;"],explain:"同じクラスの中では、他のメンバ関数をそのまま名前だけで呼び出せます。show()の中でgetHP()を呼ぶと、そのオブジェクト自身のgetHP()が実行され、その戻り値をcoutで出力できます。"},{type:"debug",long:!0,before:`class Hero{
  string name;
  int HP;
public:
`,after:`
};`,lead:"name(string)だけを受け取りHPを50にするコンストラクタと、name(string)とhp(int)の両方を受け取るコンストラクタの2つを、オーバーロードとして定義しなさい。",answers:[`Hero(string n){ name=n; HP=50; }
Hero(string n, int hp){ name=n; HP=hp; }`],explain:'引数の数が異なる2つのコンストラクタを定義できます。Hero("勇者")のように1つだけ渡すと1つ目が、Hero("勇者",80)のように2つ渡すと2つ目が、それぞれ自動的に選ばれます。'},{type:"choice",lead:"クラスの中に書かれた変数と関数を、それぞれ何と呼ぶか正しい組み合わせを選びなさい。",options:["変数=データメンバ、関数=メンバ関数","変数=グローバル変数、関数=フリー関数","変数=引数、関数=コンストラクタ","変数=戻り値、関数=データメンバ"],answers:["変数=データメンバ、関数=メンバ関数"],explain:"クラスの中に定義された変数は「データメンバ」、関数は「メンバ関数」と呼ばれます。データメンバはオブジェクトごとに個別の値を持ち、メンバ関数はそのオブジェクトのデータメンバを操作するための処理です。"},{type:"order",lines:[{label:"A",code:'Hero hero1("A",80);'},{label:"B",code:'Hero hero2("B",50);'},{label:"C",code:"cout << hero1.getHP() << endl;"},{label:"D",code:"cout << hero2.getHP() << endl;"}],lead:"2人の勇者をそれぞれ異なるHPで生成し、両方のHPを出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"2つのオブジェクトを生成してから(A,B)、それぞれのgetHP()を呼び出して出力します(C,D)。hero1とhero2は独立したデータメンバを持つので、それぞれ80と50が別々に表示されます。"},{before:`class Hero{
  string name;
  int hp;
public:
  Hero(string n, int h){ name=n; `,after:`=h; }
};`,answers:["hp"],explain:"コンストラクタの引数hで受け取った値を、データメンバhpに代入します。引数名hとメンバ名hpは別の名前なので、そのままhp=h;と書けます。"},{before:`class Hero{
  string name;
public:
  Hero(string n){ name=n; }
  string getName(){ return `,after:`; }
};`,answers:["name"],explain:"getNameメソッドは、データメンバnameの値をそのままreturnするだけの、外部からnameを安全に読み取るための窓口です。"},{type:"choice",lead:"同じクラスから作られた2つのオブジェクトが、互いのデータメンバに影響を与えるか選びなさい。",options:["与えない(それぞれ独立したデータを持つ)","必ず影響し合う","片方が消えるともう片方も消える","コンストラクタを共有する"],answers:["与えない(それぞれ独立したデータを持つ)"],explain:"同じクラスから作られたオブジェクトでも、それぞれが自分専用のデータメンバを持ちます。片方のオブジェクトのデータを書き換えても、もう片方には一切影響しません。"},{type:"debug",long:!0,before:`class Counter{
  int count;
public:
  Counter(){ count=0; }
`,after:`
};`,lead:"countを1増やすincrement()メソッドと、countの値を返すgetCount()メソッドを、あわせて定義しなさい。",answers:[`void increment(){ count++; }
int getCount(){ return count; }`],explain:"increment()はcountを1つ増やすだけの単純な処理、getCount()はcountの値をそのまま読み取るための窓口です。この2つを組み合わせることで、外部からcountを安全に操作・確認できます。"},{before:`Counter c;
c.increment();
c.increment();
cout << c.`,after:"() << endl; // 2が表示される",answers:["getCount"],explain:"increment()を2回呼んだので、count(初期値0)は2になっています。getCount()を呼び出せば、その2が出力されます。"},{before:`class Hero{
  bool alive;
public:
  Hero(){ alive = `,after:`; }
};`,answers:["true"],explain:"オブジェクトが生成された直後は「生きている」状態にしたいので、bool型のaliveをtrueで初期化します。"},{type:"order",lines:[{label:"A",code:"Counter c;"},{label:"B",code:"c.increment();"},{label:"C",code:`c.increment();
c.increment();`},{label:"D",code:"cout << c.getCount() << endl; // 3"}],lead:"Counterオブジェクトを生成し、合計3回incrementを呼んでから結果を出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"オブジェクトを生成し(A)、increment()を合計3回呼び出し(B,C)、最後にgetCount()で結果(3)を出力します(D)。"},{type:"choice",lead:"コンストラクタの主な役割として正しいものを選びなさい。",options:["オブジェクト生成時にデータメンバを初期化すること","オブジェクトを削除すること","クラス名を変更すること","メンバ関数を削除すること"],answers:["オブジェクト生成時にデータメンバを初期化すること"],explain:"コンストラクタは、オブジェクトが生成される瞬間に自動的に呼ばれ、そのオブジェクトのデータメンバに初期値を設定する役割を持っています。"},{before:'Hero party[3] = { Hero("A"), Hero("B"), ',after:" };",answers:['Hero("C")'],explain:'配列の初期化子には、生成したいオブジェクトをその場でHero("C")のように書き並べることができます。これでparty[2]は"C"という名前のHeroオブジェクトになります。'},{type:"debug",long:!0,before:`class Rectangle{
  int width;
  int height;
public:
  Rectangle(int w, int h){ width=w; height=h; }
`,after:`
};`,lead:"widthとheightを掛け合わせた面積をreturnするgetArea()メソッドを追加しなさい。",answers:["int getArea(){ return width * height; }"],explain:"widthとheightという2つのデータメンバを掛け合わせた値を、そのままreturnするだけのメソッドです。"},{type:"choice",lead:"クラスのオブジェクトを配列として複数まとめて扱うことはできるか(例: Hero party[3];)選びなさい。",options:["できる","できない","ポインタ配列でしか扱えない","1つまでしか作れない"],answers:["できる"],explain:"クラスのオブジェクトも、intや構造体と同じように配列として複数まとめて扱えます。Hero party[3];のように書けば、3体分のHeroオブジェクトが並んだ配列になります。"},{before:`class BankAccount{
  int balance;
public:
  BankAccount(){ balance=`,after:`; }
};`,lead:"balanceを0で初期化する処理を書きなさい。",answers:["0"],explain:"口座を作った直後は残高が0であるのが自然なので、コンストラクタでbalanceを0に初期化します。"},{before:"",after:"",lead:"BankAccountクラスの引数なしコンストラクタを使って、accオブジェクトを生成する行を書きなさい。",answers:["BankAccount acc;"],explain:"引数を持たないコンストラクタを使う場合は、型名 変数名; とだけ書けばオブジェクトが生成されます。"},{before:`class Book{
  string title;
  int pages;
public:
  Book(string t, int p){ title=t; `,after:`=p; }
};`,answers:["pages"],explain:"引数pで受け取った値を、データメンバpagesに代入します。"},{before:`class Book{
  string title;
public:
  Book(string t){ `,after:`=t; }
};`,answers:["title"],explain:"引数tで受け取った値を、データメンバtitleに代入します。"},{before:"",after:"",lead:'"C++入門"というタイトル、300ページでBookオブジェクトbookを生成する行を書きなさい。',answers:['Book book("C++入門", 300);'],explain:"コンストラクタが定義した順番(title, pages)通りに引数を並べてオブジェクトを生成します。"},{before:`class Animal{
  string name;
  int age;
public:
  Animal(string n, int a){ name=n; age=a; }
};
// 2つのデータメンバを持つAnimalクラスのコンストラクタの引数の数は何個か(半角数字)
int n=`,after:";",answers:["2"],explain:"nameとageの2つのデータメンバをそれぞれ設定するため、コンストラクタは2個の引数(n, a)を受け取ります。"},{before:`class BankAccount{
  int balance;
public:
  BankAccount(){ balance=0; }
  int `,after:"(){ return balance; } // balanceを読み取るメソッド名",answers:["getBalance"],explain:"get+メンバ名(getBalance)という名付け方の慣習に従い、privateなbalanceを安全に読み取るためのメソッドを定義します。"},{before:`class BankAccount{
  int balance;
public:
  BankAccount(){ balance=0; }
  void deposit(int amount){
`,after:`
  }
};`,lead:"depositメソッドの中身に、balanceにamountを足し込む処理を書きなさい。",answers:["balance += amount;"],explain:"+=を使うと、balance = balance + amount; と同じ意味を短く書けます。deposit(1000)を呼べばbalanceが1000増えます。"},{before:`class BankAccount{
  int balance;
public:
  BankAccount(){ balance=0; }
  void withdraw(int amount){
`,after:`
  }
};`,lead:"withdrawメソッドの中身に、balanceからamountを引く処理を書きなさい。",answers:["balance -= amount;"],explain:"-=を使うと、balance = balance - amount; と同じ意味を短く書けます。withdraw(300)を呼べばbalanceが300減ります。"},{before:`BankAccount acc;
acc.deposit(1000);
acc.withdraw(300);
cout << acc.getBalance() << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["700"],explain:"0から1000入金して1000、そこから300引き出して700になります。"},{before:`class Book{
  string title;
  int pages;
public:
  Book(string t, int p){ title=t; pages=p; }
  string `,after:"(){ return title; } // titleを読み取るメソッド名",answers:["getTitle"],explain:"get+メンバ名(getTitle)という名前で、titleを安全に読み取るためのメソッドを定義します。"},{before:`class Book{
  string title;
  int pages;
public:
  Book(string t, int p){ title=t; pages=p; }
  int getPages(){ return pages; }
};
Book b("Novel", 200);
cout << b.`,after:"() << endl; // 200が表示される",answers:["getPages"],explain:"b.getPages()を呼ぶと、コンストラクタで設定したpages(200)がそのまま返って出力されます。"},{type:"choice",lead:"クラスのメンバをprivateにする主な目的として正しいものを選びなさい。",options:["外部から直接アクセスできないようにし、メンバ関数を通して安全に操作させるため","コンパイルを速くするため","メモリを節約するため","継承をできなくするため"],answers:["外部から直接アクセスできないようにし、メンバ関数を通して安全に操作させるため"],explain:"privateにすることで、外部のコードが直接データメンバを書き換えられなくなり、get〜/set〜のようなメンバ関数を通じてのみ安全にアクセスできるようになります(カプセル化)。"},{type:"choice",lead:"コンストラクタのオーバーロードとは何か選びなさい。",options:["引数の数や型が異なる複数のコンストラクタを定義すること","コンストラクタを1つしか定義しないこと","コンストラクタを削除すること","コンストラクタの名前を自由に変えること"],answers:["引数の数や型が異なる複数のコンストラクタを定義すること"],explain:"同じクラスに対して、引数の数や型が異なる複数のコンストラクタを用意することをオーバーロードと呼びます。生成時に渡す引数に応じて、適切なコンストラクタが自動的に選ばれます。"},{type:"choice",lead:"get〜という名前のメソッドが一般的に持つ役割として正しいものを選びなさい。",options:["privateなデータメンバの値を読み取って返す","データメンバを削除する","新しいオブジェクトを生成する","コンストラクタを呼び出す"],answers:["privateなデータメンバの値を読み取って返す"],explain:"get〜という名前のメソッドは、外部から直接アクセスできないprivateなデータメンバの値を、安全に読み取るための窓口としてよく使われます。"},{type:"choice",lead:"クラスのオブジェクトを複数生成したとき、それぞれのオブジェクトについて正しい説明を選びなさい。",options:["それぞれが自分専用のデータメンバを持つ","すべてのオブジェクトがデータメンバを共有する","2つ目以降は生成できない","コンストラクタは最初の1回しか呼ばれない"],answers:["それぞれが自分専用のデータメンバを持つ"],explain:"同じクラスから作られたオブジェクトでも、それぞれが独立したデータメンバの領域を持ちます。片方を変更してももう片方には影響しません。コンストラクタもオブジェクトを生成するたびに毎回呼ばれます。"},{type:"choice",lead:"メンバ関数の中から、同じクラスの別のメンバ関数を呼び出すことはできるか選びなさい。",options:["できる(そのオブジェクト自身のメンバ関数として呼ばれる)","できない","staticなメンバ関数だけ呼び出せる","コンストラクタからは呼び出せない"],answers:["できる(そのオブジェクト自身のメンバ関数として呼ばれる)"],explain:"同じクラスの中では、他のメンバ関数を名前だけで呼び出せます。呼び出されるのは、その処理を実行している自分自身のオブジェクトのメンバ関数です。"},{type:"choice",lead:"クラスと構造体(struct)の違いとして、多くの教材で説明される点を選びなさい。",options:["メンバのデフォルトのアクセス制御(classはprivate、structはpublic)","structは配列を持てない","classはメンバ関数を持てない","structはコンストラクタを持てない"],answers:["メンバのデフォルトのアクセス制御(classはprivate、structはpublic)"],explain:"classとstructはほぼ同じ機能を持ちますが、何も指定しなかった場合のアクセス制御の既定値が異なり、classはprivate、structはpublicになります。"},{type:"order",lines:[{label:"A",code:"BankAccount acc;"},{label:"B",code:"acc.deposit(500);"},{label:"C",code:"cout << acc.getBalance() << endl; // 500"}],lead:"口座を作り、入金してから残高を出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"オブジェクトを生成し(A)、depositで入金し(B)、getBalanceで結果を確認します(C)。"},{type:"order",lines:[{label:"A",code:'Book b("Sample", 100);'},{label:"B",code:"cout << b.getTitle() << endl;"},{label:"C",code:"cout << b.getPages() << endl;"}],lead:"本のオブジェクトを生成し、タイトルとページ数を出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"オブジェクトを生成してから(A)、それぞれのgetterメソッドで情報を取り出して出力します(B,C)。"},{type:"order",lines:[{label:"A",code:"Counter c;"},{label:"B",code:"for(int i=0;i<5;i++) c.increment();"},{label:"C",code:"cout << c.getCount() << endl; // 5"}],lead:"カウンタを生成し、5回incrementしてから結果を出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"オブジェクトを生成し(A)、ループで5回increment()を呼び(B)、最後に結果を出力します(C)。"},{type:"debug",long:!0,before:`class Player{
  string name;
  int level;
public:
`,after:`
};`,lead:"name(string)を受け取りlevelを1で初期化するコンストラクタと、levelを1増やすlevelUp()メソッド、levelを返すgetLevel()メソッドを、あわせて定義しなさい。",answers:[`Player(string n){ name=n; level=1; }
void levelUp(){ level++; }
int getLevel(){ return level; }`],explain:"コンストラクタで初期状態(level=1)を設定し、levelUp()で成長を表現し、getLevel()で外部から現在のレベルを確認できるようにします。"},{type:"debug",long:!0,before:`class Stack{
  int data[100];
  int top;
public:
  Stack(){ top=0; }
`,after:`
};`,lead:"push(int val)メソッド(data[top]にvalを入れてtopを1増やす)と、topが0かどうかをbool型で返すisEmpty()メソッドを、あわせて定義しなさい。",answers:[`void push(int val){ data[top]=val; top++; }
bool isEmpty(){ return top==0; }`],explain:"topは「次に積む場所」を表す添字として使い、push()のたびに1つ進めます。isEmpty()はtopが0(何も積まれていない)かどうかをそのままreturnします。"},{type:"debug",long:!0,before:`class Temperature{
  double celsius;
public:
  Temperature(double c){ celsius=c; }
`,after:`
};`,lead:"celsiusを華氏に変換して返すtoFahrenheit()メソッドを定義しなさい(華氏 = 摂氏*9/5+32)。",answers:["double toFahrenheit(){ return celsius*9/5+32; }"],explain:"摂氏から華氏への変換式celsius*9/5+32をそのままreturnするメソッドです。"},{type:"debug",long:!0,before:`class Circle{
  double radius;
public:
  Circle(double r){ radius=r; }
`,after:`
};`,lead:"半径から円の面積を計算してreturnするgetArea()メソッドを定義しなさい(円周率は3.14を使う)。",answers:["double getArea(){ return radius*radius*3.14; }"],explain:"円の面積は「半径×半径×円周率」で求められるので、radius*radius*3.14をそのままreturnします。"},{type:"debug",long:!0,before:`class ScoreBoard{
  int scores[10];
  int count;
public:
  ScoreBoard(){ count=0; }
`,after:`
};`,lead:"addScore(int s)メソッド(scores[count]にsを入れてcountを1増やす)と、これまでのscoreの合計をreturnするtotal()メソッドを、あわせて定義しなさい。",answers:[`void addScore(int s){ scores[count]=s; count++; }
int total(){ int sum=0; for(int i=0;i<count;i++){ sum+=scores[i]; } return sum; }`],explain:"addScore()で得点を1つずつ配列に追加し、total()では追加された数(count)分だけループしてsumに足し込みます。"},{type:"debug",long:!0,before:`class Hero{
  int HP;
  int maxHP;
public:
  Hero(){ HP=100; maxHP=100; }
`,after:`
};`,lead:"heal(int pt)メソッドを定義しなさい。HPにptを足すが、maxHPを超えないようにする(超えた場合はmaxHPに合わせる)。",answers:["void heal(int pt){ HP += pt; if(HP>maxHP){ HP=maxHP; } }"],explain:"まずHPにptを足し、その結果がmaxHPを超えていたらHPをmaxHPに合わせることで、「上限を超えて回復しすぎない」という制約を実現します。"},{type:"debug",long:!0,before:`class Timer{
  int seconds;
public:
  Timer(){ seconds=0; }
`,after:`
};`,lead:'tick()メソッド(secondsを1増やす)と、secondsを分と秒に分けて"分:秒"の形式(例: "1:5")で出力するshow()メソッドを、あわせて定義しなさい(分 = seconds/60、秒 = seconds%60)。',answers:[`void tick(){ seconds++; }
void show(){ cout << seconds/60 << ":" << seconds%60 << endl; }`],explain:'secondsを60で割った商が分、60で割った余りが秒になります。この2つを":"で挟んで出力すれば"分:秒"の形式になります。'},{type:"debug",long:!0,before:`class Inventory{
  int items[50];
  int count;
public:
  Inventory(){ count=0; }
`,after:`
};`,lead:"add(int itemId)メソッド(items[count]にitemIdを入れてcountを1増やす)と、指定したitemIdを持っているかをbool型で返すhas(int itemId)メソッドを、あわせて定義しなさい。",answers:[`void add(int itemId){ items[count]=itemId; count++; }
bool has(int itemId){ for(int i=0;i<count;i++){ if(items[i]==itemId) return true; } return false; }`],explain:"add()で持ち物を配列に追加し、has()ではcount分だけ配列を調べ、一致するitemIdが見つかればtrueをreturnします。"},{before:`class Counter{
  int count;
public:
  Counter(){ count=0; }
  void increment(){ count++; }
  int getCount(){ return count; }
};
Counter counters[2];
counters[0].increment();
counters[1].increment();
counters[1].increment();
cout << counters[1].getCount() << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["2"],explain:"counters[1]は自分専用のcountを持ち、increment()を2回呼ばれたので2になっています。counters[0]の状態には影響されません。"},{before:`class Hero{
  int HP;
public:
  Hero(){ HP=100; }
  void damaged(int pt){ HP -= pt; }
  int getHP(){ return HP; }
};
Hero h;
h.damaged(30);
h.damaged(20);
cout << h.getHP() << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["50"],explain:"100から30減って70、さらに20減って50になります。"},{before:`class Rectangle{
  int width, height;
public:
  Rectangle(int w,int h){ width=w; height=h; }
  int getArea(){ return width*height; }
};
Rectangle rects[2] = { Rectangle(2,3), Rectangle(4,5) };
int total=0;
for(int i=0;i<2;i++) total += rects[i].`,after:"();",answers:["getArea"],explain:"各RectangleオブジェクトのgetArea()を呼び出し、その面積(6と20)を合計に足し込みます。"},{before:`class Player{
  int level;
public:
  Player(){ level=1; }
  void levelUp(){ level++; }
  int getLevel(){ return level; }
};
Player p;
p.levelUp();
p.levelUp();
p.levelUp();
cout << p.getLevel() << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["4"],explain:"初期値1からlevelUp()を3回呼ぶので、1+3=4になります。"},{before:`class BankAccount{
  int balance;
public:
  BankAccount(int b){ balance=b; }
  int getBalance(){ return balance; }
};
BankAccount a(100), b(200);
cout << a.getBalance() + b.`,after:"() << endl; // 300が表示される",answers:["getBalance"],explain:"aのbalance(100)とbのbalance(200)をそれぞれgetBalance()で取得し、足し合わせると300になります。"},{before:`class Circle{
  double radius;
public:
  Circle(double r){ radius=r; }
  double getArea(){ return radius*radius*3.14; }
};
Circle c(2);
cout << c.`,after:"() << endl; // 12.56が表示される",answers:["getArea"],explain:"半径2の円の面積は2*2*3.14=12.56です。c.getArea()を呼べばこの値が計算されます。"},{before:`class Temperature{
  double celsius;
public:
  Temperature(double c){ celsius=c; }
  double toFahrenheit(){ return celsius*9/5+32; }
};
Temperature t(0);
cout << t.`,after:"() << endl; // 32が表示される(氷点)",answers:["toFahrenheit"],explain:"摂氏0度は華氏では0*9/5+32=32度になります。水が凍る温度としてよく知られる値です。"},{before:`class Stack{
  int data[100];
  int top;
public:
  Stack(){ top=0; }
  void push(int val){ data[top]=val; top++; }
  bool isEmpty(){ return top==0; }
};
Stack s;
cout << s.isEmpty() << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい(何もpushしていない状態)。",answers:["1"],explain:"何もpushしていないのでtopは0のままで、isEmpty()はtrue(=1)を返します。"},{before:`class Stack{
  int data[100];
  int top;
public:
  Stack(){ top=0; }
  void push(int val){ data[top]=val; top++; }
  bool isEmpty(){ return top==0; }
};
Stack s;
s.push(5);
cout << s.`,after:"() << endl; // 0が表示される(pushしたので空ではない)",answers:["isEmpty"],explain:"push(5)によってtopが1になっているので、isEmpty()はfalse(=0)を返します。"},{before:`class Inventory{
  int items[50];
  int count;
public:
  Inventory(){ count=0; }
  void add(int itemId){ items[count]=itemId; count++; }
  bool has(int itemId){ for(int i=0;i<count;i++){ if(items[i]==itemId) return true; } return false; }
};
Inventory inv;
inv.add(10);
inv.add(20);
cout << inv.has(20) << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["1"],explain:"20はaddで追加済みなので、has(20)はtrue(=1)を返します。"},{before:`class Timer{
  int seconds;
public:
  Timer(){ seconds=0; }
  void tick(){ seconds++; }
};
Timer t;
for(int i=0;i<75;i++) t.`,after:"(); // 75回呼び出す",answers:["tick"],explain:"tick()を75回呼ぶと、secondsは0から75まで1ずつ増えていきます。"}],qsExpert:[{type:"debug",long:!0,before:`#include <iostream>
#include <string>
using namespace std;
class Hero{
  string name;
  int HP;
public:
  Hero(string n){ name=n; HP=50; }
  void damaged(int pt){ HP -= pt; }
  bool isAlive(){ return HP>0; }
};
int main(){
`,after:`
  return 0;
}`,lead:'"勇者A"のhero1と"勇者B"のhero2を生成し、hero1だけに60のダメージを与えたあと、両方のisAlive()の結果を1行ずつ出力する処理を書きなさい。',answers:[`Hero hero1("勇者A");
Hero hero2("勇者B");
hero1.damaged(60);
cout<<hero1.isAlive()<<endl;
cout<<hero2.isAlive()<<endl;`],explain:"hero1とhero2はそれぞれ独立したHPを持つため、hero1.damaged(60);を呼んでもhero2には一切影響しません。hero1はHP50-60で0以下になりisAlive()はfalse(0)、hero2はHP50のままなのでtrue(1)が表示されます。"},{type:"debug",long:!0,before:`class Hero{
  string name;
  int HP;
public:
  Hero(string n, int hp){ name=n; HP=hp; }
  int getHP(){ return HP; }
  bool isStrongerThan(Hero other){ return HP > other.getHP(); }
};
int main(){
`,after:`
  return 0;
}`,lead:'"A"でHP80のhero1と、"B"でHP60のhero2を生成し、hero1がhero2より強い(isStrongerThan)かどうかの結果を出力する処理を書きなさい。',answers:[`Hero hero1("A",80);
Hero hero2("B",60);
cout << hero1.isStrongerThan(hero2) << endl;`],explain:"isStrongerThanはHeroオブジェクトを引数として受け取り、other.getHP()で相手のHPを取得して自分のHPと比較しています。hero1.isStrongerThan(hero2)のように、オブジェクト自体を関数の引数として渡せる点がこの問題のポイントです。80>60なのでtrue(1)が表示されます。"},{type:"debug",long:!0,before:`class Hero{
  string name;
  int HP;
public:
  Hero(string n){ name=n; HP=50; }
  bool isAlive(){ return HP>0; }
  void damaged(int pt){ HP-=pt; }
};
int main(){
  Hero party[3] = { Hero("A"), Hero("B"), Hero("C") };
`,after:`
  return 0;
}`,lead:"party配列の3人全員に10ずつダメージを与え、全員分のisAlive()の結果を1行ずつ出力するfor文を書きなさい。",answers:[`for(int i=0;i<3;i++){
party[i].damaged(10);
cout << party[i].isAlive() << endl;
}`],explain:"オブジェクトの配列も、構造体配列のときと同じようにparty[i]で1体ずつアクセスできます。party[i].damaged(10);でそれぞれにダメージを与え、party[i].isAlive()で生存確認をする、という流れを3人ぶん繰り返します。"},{type:"debug",long:!0,before:`class Hero{
  int HP;
public:
  Hero(){ HP=50; }
  void damaged(int pt){
`,after:`
  }
  int getHP(){ return HP; }
};`,lead:"damagedメソッドの中身に、HPをptの分だけ減らしつつ、HPが0未満にならないようにする処理を書きなさい(0未満になったら0にする)。",answers:[`HP -= pt;
if(HP < 0) HP = 0;`],explain:"まずHPをptの分だけ減らし、その結果0未満になってしまった場合はif文でHPを0に補正します。「HPはマイナスにならない」というルールを、メンバ関数の中でしっかり守るのがカプセル化の実践です。"},{type:"debug",long:!0,before:`class Hero{
  int HP;
public:
  Hero(){ HP=50; }
  void heal(int pt){
`,after:`
  }
  int getHP(){ return HP; }
};`,lead:"healメソッドの中身に、HPをptの分だけ増やしつつ、HPが100を超えないようにする処理を書きなさい(100を超えたら100にする)。",answers:[`HP += pt;
if(HP > 100) HP = 100;`],explain:"HPをptの分だけ増やしたあと、もし100を超えてしまっていたらif文で100に補正します。damagedメソッドの「0未満にしない」ルールと対になる、「100を超えさせない」という上限のルールです。"},{type:"debug",long:!0,before:`class Hero{
  int HP;
public:
  Hero(int hp){ HP=hp; }
  int getHP(){ return HP; }
};
int totalHP(Hero* party, int n){
`,after:`
}`,lead:"party配列n人分のHPの合計をreturnする処理を書きなさい。",answers:[`int sum=0;
for(int i=0;i<n;i++){
sum += party[i].getHP();
}
return sum;`],explain:"オブジェクトの配列でも、party[i].getHP()のようにメンバ関数を呼び出しながら値を集計できます。"},{type:"debug",long:!0,before:`class Hero{
  string name;
  int HP;
public:
  Hero(string n, int hp){ name=n; HP=hp; }
  int getHP(){ return HP; }
  string getName(){ return name; }
};
Hero findStrongest(Hero* party, int n){
`,after:`
}`,lead:"party配列の中でHPが最も高いHeroをreturnする処理を書きなさい。",answers:[`Hero strongest = party[0];
for(int i=1;i<n;i++){
if(party[i].getHP() > strongest.getHP()) strongest = party[i];
}
return strongest;`],explain:"構造体のときと同じ考え方で、オブジェクトまるごとをstrongestに保持しながら、より強いHeroが見つかるたびに更新します。"},{type:"debug",long:!0,before:`class Hero{
  string name;
  int HP;
public:
  Hero(string n, int hp){ name=n; HP=hp; }
  int getHP(){ return HP; }
  string getName(){ return name; }
};
Hero findStrongest(Hero* party, int n){
  Hero strongest = party[0];
  for(int i=1;i<n;i++){
    if(party[i].getHP() > strongest.getHP()) strongest = party[i];
  }
  return strongest;
}
int main(){
`,after:`
  return 0;
}`,lead:'サイズ3のHero配列partyを{"A",50},{"B",80},{"C",30}で生成し、findStrongestの結果のnameを出力する処理を書きなさい(80のBが出力されるはず)。',answers:[`Hero party[3] = { Hero("A",50), Hero("B",80), Hero("C",30) };
cout << findStrongest(party,3).getName() << endl;`],explain:"findStrongestはHeroオブジェクトをまるごとreturnするので、その戻り値に対して.getName()を呼び出せます。"},{type:"debug",long:!0,before:`class Hero{
  int HP;
public:
  Hero(int hp){ HP=hp; }
  bool isAlive(){ return HP>0; }
};
int countAlive(Hero* party, int n){
`,after:`
}`,lead:"party配列の中で生存している(isAlive()がtrue)人数を数えてreturnする処理を書きなさい。",answers:[`int count=0;
for(int i=0;i<n;i++){
if(party[i].isAlive()) count++;
}
return count;`],explain:"各オブジェクトのisAlive()を呼び出して調べ、trueであればcountを1つ増やします。"},{type:"debug",long:!0,before:`class Hero{
  int HP;
public:
  Hero(){ HP=50; }
  void damaged(int pt){ HP -= pt; }
  int getHP(){ return HP; }
};
void damageAll(Hero* party, int n, int pt){
`,after:`
}`,lead:"party配列全員に同じダメージptを与える処理を書きなさい。",answers:[`for(int i=0;i<n;i++){
party[i].damaged(pt);
}`],explain:"配列の各要素についてdamaged(pt)を呼び出すだけの単純なループです。"},{type:"debug",long:!0,before:`class Hero{
  int power;
public:
  Hero(int p){ power=p; }
  int attack(){ return power; }
  int comboAttack(Hero other){ return attack() + other.attack(); }
};
int main(){
`,after:`
  return 0;
}`,lead:"h1をpower10、h2をpower15で生成し、h1.comboAttack(h2)の結果を出力する処理を書きなさい(25になるはず)。",answers:[`Hero h1(10);
Hero h2(15);
cout << h1.comboAttack(h2) << endl;`],explain:"comboAttackは自分自身のattack()と、引数として渡された別のオブジェクトのattack()を組み合わせて計算します。10+15=25です。"},{type:"debug",long:!0,before:`class Hero{
  string name;
  int HP;
public:
  Hero(string n){ name=n; HP=50; }
  Hero(string n, int hp){ name=n; HP=hp; }
  int getHP(){ return HP; }
};
int main(){
`,after:`
  return 0;
}`,lead:'"A"のみでhero1、"B"と80でhero2を生成し、両方のgetHP()の合計を出力する処理を書きなさい(130になるはず)。',answers:[`Hero hero1("A");
Hero hero2("B",80);
cout << hero1.getHP() + hero2.getHP() << endl;`],explain:"hero1は引数1つのコンストラクタが選ばれHPは50、hero2は引数2つのコンストラクタが選ばれHPは80になります。50+80=130です。"},{type:"debug",long:!0,before:`class Hero{
  int HP;
public:
  Hero(int hp){ HP=hp; }
  int getHP(){ return HP; }
};
double averageHP(Hero* party, int n){
`,after:`
}`,lead:"party配列n人分のHPの平均をdouble型でreturnする処理を書きなさい。",answers:[`int sum=0;
for(int i=0;i<n;i++){
sum += party[i].getHP();
}
return (double)sum/n;`],explain:"合計を求めたあと(double)でsumを変換してからnで割ることで、平均を正しく小数として求められます。"},{type:"debug",long:!0,before:`class Hero{
  int HP;
public:
  Hero(int hp){ HP=hp; }
  bool isAlive(){ return HP>0; }
};
bool allAlive(Hero* party, int n){
`,after:`
}`,lead:"party配列の全員が生存している場合だけtrueをreturnする処理を書きなさい(1人でも倒れていればfalse)。",answers:[`for(int i=0;i<n;i++){
if(!party[i].isAlive()) return false;
}
return true;`],explain:"倒れているメンバー(isAlive()がfalse)が1人でも見つかった時点でfalseをreturnし、最後まで見つからなければtrueをreturnします。"},{type:"debug",long:!0,before:`class Hero{
  int HP;
public:
  Hero(){ HP=30; }
  void damaged(int pt){ HP -= pt; }
  bool isAlive(){ return HP>0; }
};
int main(){
  Hero party[3];
`,after:`
  return 0;
}`,lead:"party全員に40のダメージを与えたあと、生存人数を数えて出力する処理を書きなさい(HP30から40減るので全員倒れ、0になるはず)。",answers:[`int count=0;
for(int i=0;i<3;i++){
party[i].damaged(40);
if(party[i].isAlive()) count++;
}
cout << count << endl;`],explain:"全員のHPは30なので、40ダメージを受けるとHPが0未満(マイナス)になり、isAlive()はfalseを返します。そのためcountは0のままになります。"}],qsDrag:[{type:"dragfill",lead:"ダメージを与えるdamagedメソッドと、生存確認するisAliveメソッドになるよう、正しいピースを空欄に配置しなさい。",lines:[{code:"class Hero{"},{code:"  int HP;"},{code:"public:"},{code:"  Hero(){ HP=50; }"},{blank:"b1"},{blank:"b2"},{code:"};"}],pieces:[{id:"p1",code:"void damaged(int pt){ HP -= pt; }"},{id:"p2",code:"bool isAlive(){ return HP>0; }"},{id:"p3",code:"void damaged(int pt){ HP += pt; }"}],answerMap:{b1:"p1",b2:"p2"},explain:"damagedはHPを「減らす」メソッドなので-=を使います(p1)。p3のように+=にしてしまうと、ダメージを受けるはずが逆にHPが回復してしまいます。isAliveはHPが0より大きいかどうかをbool型でreturnします(p2)。"}]},{id:"w8",title:"CASE 08「鍵のかかった情報」",sub:"Week8 クラスの定義1",emoji:"🔐",mon:"privateを覗いた者",lesson:[{title:"private/public",code:`class YearConverter{
  int western;      // private
public:
  YearConverter(int y){ western=y; }
  void show(){ cout << western << endl; }
};`,explain:"クラスの中でprivate:やpublic:を何も書かなければ、その部分はデフォルトでprivate(構造体の場合はpublicがデフォルトなので逆になる点に注意)として扱われます。privateなメンバは、そのクラス自身のメンバ関数からしかアクセスできず、クラスの外にある関数やmain関数からは直接触ることができません。この例ではwesternをprivateにしておくことで、外部からyc.western = 9999; のように無茶な値を直接代入されることを防ぎ、コンストラクタやshow()のような、きちんと動作が決められたメンバ関数を経由してしかアクセスできないようにしています。「データメンバはprivateに、外部に使ってほしい入り口だけpublicに」というのが、カプセル化の基本的な考え方です。"},{title:"デフォルト引数とオーバーロード",code:`YearConverter(int year=2022);
YearConverter yc1;      // year=2022
YearConverter yc2(2020);`,explain:"コンストラクタの引数に = で値を書いておくと「デフォルト引数」というものになり、呼び出すときにその引数を省略すると、自動的にその既定値が使われます。YearConverter(int year=2022); の場合、YearConverter yc1; のように引数を渡さずに書けば、yearには自動的に2022が入ります。もちろんYearConverter yc2(2020); のように値を明示的に渡せば、そちらが優先されます。またコンストラクタも普通の関数と同じくオーバーロード(引数の数や型が違う同名の関数を複数定義すること)ができるので、「引数なし用」と「引数あり用」のコンストラクタを別々に書くという方法でも、同じような柔軟性を実現できます。"},{title:"protected",code:`class Base{
protected:
  int baseData; // 派生クラスからは触れるが外部からは触れない
};`,explain:"protectedは、privateとpublicのちょうど中間のようなアクセス権です。そのクラス自身のメンバ関数はもちろん、それを継承した派生クラスのメンバ関数からもアクセスできますが、それ以外の外部の関数からはprivateと同じようにアクセスできません。「家族(自分自身と子ども)には見せるけれど、他人には見せない」というイメージで捉えると分かりやすいでしょう。この仕組みは、この後のWeekA(継承)で基本クラスと派生クラスがデータをやり取りする際によく登場します。"}],qs:[{before:`class YearConverter{
`,after:`:
  int western;
public:
  YearConverter(int year);
}; // クラス外の関数からアクセスできないようにする指定子`,answers:["private"],explain:"privateをつけたメンバは、そのクラス自身のメンバ関数からしかアクセスできず、mainを含む外部の関数からは直接触ることができなくなります。もしwesternをpublicのままにしておくと、yc.western = -500; のように、コンストラクタや専用の関数を経由せずに誰でも自由に(そしてルールを無視して)値を書き換えられてしまいます。データメンバをprivateにしておけば、そうした無秩序な書き換えを防ぎ、必ずコンストラクタやきちんと用意されたメンバ関数を通してのみ値が変更される、安全な設計にできます。これが「データメンバは基本的にprivateにする」という習慣が推奨される理由です。"},{before:`class YearConverter{
private:
  int western;
`,after:`:
  YearConverter(int year);
  void showReiwa();
}; // ここから先は誰からでもアクセスできるようにする指定子`,answers:["public"],explain:"publicをつけたメンバは、クラスの外にあるどんな関数(main関数など)からでも自由にアクセスできます。コンストラクタ(YearConverter)や、外部のプログラムに実際に使ってもらいたいメンバ関数(showReiwaなど)はpublicにしておく必要があります。もしコンストラクタまでprivateにしてしまうと、そもそも外部からオブジェクトを生成すること自体ができなくなってしまうので注意しましょう。「クラスが外の世界に提供する窓口の部分だけをpublicにする」というイメージを持つとよいでしょう。"},{before:`class YearConverter{
public:
  YearConverter(int year`,after:`); // 引数を省略したときに使われる既定値を指定したい
};`,answers:["=2022","= 2022"],explain:"関数(コンストラクタも含む)の引数に = で値を書いておくと「デフォルト引数」というものになり、呼び出すときにその引数を省略すると自動的にその既定値が使われるようになります。YearConverter(int year=2022) と定義しておけば、YearConverter yc; のように引数を渡さずに呼び出した場合、yearには自動的に2022が代入されます。もちろん YearConverter yc(2020); のように明示的に値を渡せば、そちらの値(2020)が優先されます。「よく使う値をあらかじめ既定値として用意しておき、必要なときだけ上書きできる」という便利な仕組みです。"},{before:`class YearConverter{
public:
  YearConverter();
  YearConverter(int year);
};
// 引数の数が違う複数のコンストラクタを定義すること。これを何と呼ぶか(カタカナで)
`,after:"",answers:["オーバーロード","コンストラクタのオーバーロード"],explain:"関数オーバーロードの仕組みは、コンストラクタにもそのまま適用できます。YearConverter(); (引数なし)とYearConverter(int year); (引数1つ)のように、引数の数や型が違えば、同じクラス名で複数のコンストラクタを用意することができます。呼び出す側は、括弧の中に何を渡すか(あるいは何も渡さないか)によって、どちらのコンストラクタが呼ばれるかが自動的に決まります。「引数なしで生成したときは今日の年で初期化、引数を渡したときはその年で初期化」というように、状況に応じた初期化方法を複数用意できるようになります。"},{before:`// 「引数なし」コンストラクタでオブジェクトycを正しく生成する行を書きなさい
`,after:"",answers:["YearConverter yc;"],explain:"引数なしのコンストラクタでオブジェクトを作るときは、YearConverter yc; のように、変数宣言のときと同じ感覚で、括弧を一切つけずに書きます。もしここで空の括弧をつけて YearConverter yc(); と書いてしまうと、C++のコンパイラはこれを「オブジェクトの宣言」ではなく「ycという名前の、引数を1つも取らずYearConverter型の値を返す関数の宣言」だと解釈してしまいます。これは初心者だけでなく経験者もよく引っかかる有名な落とし穴で、「Most Vexing Parse(最も厄介な構文解析)」という名前までついているほどです。「引数なしコンストラクタを呼ぶときは括弧をつけない」と覚えておきましょう。"},{before:`YearConverter yc(2022);
cout << yc`,after:"western << endl; // メンバ変数にアクセスする演算子",answers:["."],explain:"メンバ変数(データメンバ)へのアクセスにも、メンバ関数の呼び出しと同じくドット(.)を使います。yc.western は「ycというオブジェクトの中にあるwesternというデータメンバ」を意味します。ただし、この構文が実際に使えるかどうかはアクセス指定子次第です。もしwesternがprivateとして宣言されている場合、main関数のようなクラスの外にある関数からこの書き方でアクセスしようとすると、コンパイルエラーになります。ドットの書き方自体は同じでも、privateなメンバには外部からアクセスできない、という点をしっかり区別しておきましょう。"},{before:`class YearConverter{
  int western;
public:
  YearConverter(int year);
`,after:`:
  void valid_year(int y); // 派生クラスからはアクセスできるが、外部関数からはアクセスできないようにしたい指定子
};`,answers:["protected"],explain:"protectedをつけたメンバは、そのクラス自身のメンバ関数と、そのクラスを継承した派生クラスのメンバ関数からはアクセスできますが、それ以外の外部の関数からは(privateと同様に)アクセスできません。もしprivateにしてしまうと、継承した派生クラスからさえもそのメンバを直接使えなくなってしまいます。「自分のクラスと、その子どもたち(派生クラス)には見せてよいが、それ以外の他人には見せない」という中間的な公開範囲を作りたいときに使う指定子で、次のWeekA(継承)で実際にとても役立つ場面が出てきます。"},{before:`class Wallet{
`,after:`:
  int money;
public:
  Wallet(int m){ money=m; }
}; // 外部から直接アクセスできないようにする指定子`,answers:["private"],explain:"privateにすると、外部の関数からmoneyに直接アクセスできなくなります。"},{before:`class Wallet{
  int money;
`,after:`:
  Wallet(int m){ money=m; }
  int getMoney(){ return money; }
}; // コンストラクタとgetterを外部公開する指定子`,answers:["public"],explain:"外部から呼び出してほしいコンストラクタやメソッドはpublicにします。"},{before:`class Timer{
public:
  Timer(int m=`,after:`){ }
}; // 省略時は10分にしたい(半角数字)`,answers:["10"],explain:"デフォルト引数にm=10と指定すれば、引数を省略したときに自動的に10が使われます。"},{before:`class Item{
  int price;
public:
  Item(int p){ price=p; }
  int getPrice(){
`,after:`
  }
};`,lead:"getPriceメソッドの中身に、priceをreturnする処理を書きなさい。",answers:["return price;"],explain:"getPrice()はpriceの値をそのままreturnするだけの、安全な読み取り用メソッドです。"},{before:`class Item{
  int price;
public:
  Item(int p){ price=p; }
  void setPrice(int p){
    `,after:` = p;
  }
};`,lead:"setPriceメソッドの中身に、priceへ代入する処理を補いなさい。",answers:["price"],explain:"引数pの値を、データメンバpriceに代入します。"},{before:`class Base{
`,after:`:
  int val;
public:
  Base(int v){ val=v; }
}; // 派生クラスからはアクセスできるが外部からはできない指定子`,answers:["protected"],explain:"protectedは、そのクラス自身と派生クラスからはアクセスできる中間的な公開レベルです。"},{before:`class Box{
public:
  Box(int s=10){ }
};
Box b1;
Box b2(20);
// b1のsは何になるか(半角数字)
int s1 = `,after:";",answers:["10"],explain:"b1は引数を省略して生成されているので、デフォルト引数の10が使われます。"},{before:`// データを直接書き換えられないようにし、専用のメソッドを通してのみ操作させる考え方を何と呼ぶか(カタカナで)
`,after:"",answers:["カプセル化"],explain:"データを直接書き換えられないようにし、専用のメソッドを通してのみ操作させる考え方をカプセル化と呼びます。"}],qsHard:[{type:"debug",before:`// 次のように書くと、ycは「引数なしの関数の宣言」と解釈されてしまう(Most Vexing Parse)
// YearConverter yc();
// 引数なしコンストラクタでオブジェクトを正しく生成する行に直しなさい
`,after:"",answers:["YearConverter yc;"],explain:"YearConverter yc(); のように空の括弧をつけると、C++は「ycという引数なしでYearConverter型の値を返す関数の宣言」だと解釈してしまいます(Most Vexing Parse)。引数なしコンストラクタでオブジェクトを生成するときは、括弧を一切つけずにYearConverter yc; と書きます。"},{type:"choice",lead:"構造体(struct)とクラス(class)のデフォルトのアクセス指定の違いとして正しいものを選びなさい。",options:["構造体はpublic、クラスはprivateがデフォルト","構造体はprivate、クラスはpublicがデフォルト","どちらもpublicがデフォルト","どちらもprivateがデフォルト"],answers:["構造体はpublic、クラスはprivateがデフォルト"],explain:"structはアクセス指定子を省略するとpublicになりますが、classは省略するとprivateになります。この違いがあるため、クラスでは外部に公開したいメンバの前に明示的にpublic:を書く必要があります。"},{type:"order",lines:[{label:"A",code:"YearConverter yc1;"},{label:"B",code:"YearConverter yc2(2020);"},{label:"C",code:`class YearConverter{
public:
  YearConverter(int year=2022);
};`}],answers:["C,A,B"],explain:"デフォルト引数付きのコンストラクタをまず定義し(C)、その後で引数を省略した生成(A、yearは2022になる)と、明示的に値を渡した生成(B、yearは2020になる)ができるようになります。"},{type:"debug",before:`class Battery{
  int level;
public:
  Battery(int l){ level=l; }
  void setLevel(int l){
    `,after:`
  }
}; // lが0以上100以下のときだけ代入する条件を補いなさい`,answers:["if(l>=0 && l<=100) level=l;"],explain:"&&(かつ)を使って0以上100以下の範囲であることを確認してから代入することで、不正な値を弾けます。"},{type:"choice",lead:"get〜という名前のメソッドが一般的に持つ役割として正しいものを選びなさい。",options:["privateなデータメンバの値を読み取って返す","データメンバを削除する","新しいオブジェクトを生成する","コンストラクタを呼び出す"],answers:["privateなデータメンバの値を読み取って返す"],explain:"get〜という名前のメソッドは、外部から直接アクセスできないprivateなデータメンバを、安全に読み取るための窓口としてよく使われます。"},{type:"order",lines:[{label:"A",code:"Box b1;"},{label:"B",code:"Box b2(20);"},{label:"C",code:"cout << b1.getSize() << endl;"}],answers:["A,B,C"],explain:"引数なし・引数ありの2通りで生成し(A,B)、片方の結果を出力します(C)。"},{before:`class Fan{
  int speed;
public:
  Fan(int s=`,after:`){ speed=s; }
}; // 省略時は弱(1)にしたい(半角数字)`,answers:["1"],explain:"デフォルト引数にs=1と指定しておけば、引数を省略して生成したときに自動的に弱(1)が使われます。"},{before:`class Product{
  string name;
  int price;
public:
  Product(string n, int p){ name=n; price=p; }
  string getName(){ return name; }
};
Product p("Pen", 100);
cout << p.`,after:"() << endl; // Pen",answers:["getName"],explain:'p.getName()を呼ぶと、コンストラクタで設定したname("Pen")がそのまま返って出力されます。'},{type:"debug",before:`class Product{
  int price;
public:
  Product(int p){ price=p; }
  int getPrice(){
`,after:`
  }
};`,lead:"getPriceメソッドの中身に、priceをreturnする処理を書きなさい。",answers:["return price;"],explain:"getPrice()はpriceの値をそのままreturnするだけの、安全な読み取り用メソッドです。"},{type:"order",lines:[{label:"A",code:"BankAccount acc(100);"},{label:"B",code:"acc.withdraw(200);"},{label:"C",code:"cout << acc.getBalance() << endl; // 100(不正な引き出しは無視される)"}],answers:["A,B,C"],explain:"残高100に対して200の引き出しは残高不足のため無視され、getBalance()は最初の100を返します。"},{type:"debug",before:`class Base{
protected:
  int x;
public:
  Base(int v){ x=v; }
  int getX(){
`,after:`
  }
};`,lead:"getXメソッドの中身に、protectedなxをreturnする処理を書きなさい(同じクラスのメンバ関数なのでアクセスできる)。",answers:["return x;"],explain:"protectedなメンバにも、同じクラス自身のメンバ関数からは普通の変数と同じ感覚でアクセスできます。"},{type:"choice",lead:"デフォルト引数とコンストラクタのオーバーロードの違いとして正しいものを選びなさい。",options:["デフォルト引数は1つの定義で済むが、オーバーロードは複数のコンストラクタを定義する必要がある","デフォルト引数はコンストラクタには使えない","オーバーロードは1つのクラスに1つしか定義できない","両者に違いはない"],answers:["デフォルト引数は1つの定義で済むが、オーバーロードは複数のコンストラクタを定義する必要がある"],explain:"デフォルト引数は1つのコンストラクタ定義の中で「省略時の値」を指定できますが、オーバーロードは引数の数が異なる複数のコンストラクタを別々に定義する必要があります。"},{type:"debug",before:`class Battery{
  int level;
public:
  Battery(int l){ level=l; }
  int getLevel(){ return level; }
  void setLevel(int l){
    if(l>=0 `,after:` l<=100){
      level = l;
    }
  }
}; // 0以上「かつ」100以下にする演算子を補いなさい`,answers:["&&"],explain:"&&は「かつ」を意味する演算子で、両方の条件を同時に満たすときだけtrueになります。"},{type:"order",lines:[{label:"A",code:`class Box{
public:
  Box(int s=10){ }
};`},{label:"B",code:"Box b1;"},{label:"C",code:"Box b2(5);"}],answers:["A,B,C"],explain:"デフォルト引数付きのコンストラクタを定義し(A)、省略した生成(B、sは10になる)と値を渡した生成(C、sは5になる)を行います。"},{before:`class Employee{
  int salary;
public:
  Employee(int s){ salary=s; }
  void setSalary(int s){
    `,after:` = s;
  }
};`,lead:"setSalaryメソッドの中身に、salaryへ代入する処理を補いなさい。",answers:["salary"],explain:"引数sの値を、データメンバsalaryに代入します。"}],qsExtra:[{before:`class YearConverter{
  int western;
public:
  YearConverter(int y){ western=y; }
  int `,after:"(){ return western; } // privateなwesternを外部から読み取るためのメソッド名(get+メンバ名の形)",answers:["getWestern"],explain:"privateなデータメンバを外部から直接書き換えられないようにしつつ、値だけは読み取れるようにしたいときは、値をそのままreturnするだけの専用メソッド(ゲッター)をpublicで用意するのが定番です。get+メンバ名(getWestern)という名付け方はよく使われる慣習で、hero.getWestern()のように外部から安全に値を読み取れるようになります。"},{before:`class YearConverter{
  int western;
public:
  YearConverter(int y){ western=y; }
  void setWestern(int y){
`,after:`
  }
};`,lead:"setWesternメソッドの中身に、yが0以上のときだけwesternに代入する処理を書きなさい(不正な値を防ぐ)。",answers:["if(y>=0) western=y;"],explain:"if(y>=0)という条件をつけてから代入することで、setWestern(-5)のように不正な負の値を渡されても、westernが書き換わらないように守れます。データメンバをprivateにしたうえで、こうした専用メソッド(セッター)を通してのみ値を変更できるようにするのが、カプセル化の実践的な使い方です。"},{type:"debug",long:!0,before:`class YearConverter{
  int western;
public:
`,after:`
};`,lead:"yearが省略されたときに2022を使うデフォルト引数付きコンストラクタと、westernを返すgetWestern()メソッドを、あわせて定義しなさい。",answers:[`YearConverter(int year=2022){ western=year; }
int getWestern(){ return western; }`],explain:"コンストラクタの引数にyear=2022とデフォルト値を指定しておけば、引数を省略して生成したときに自動的に2022が使われます。getWestern()はwesternをそのままreturnするだけの、privateなメンバを安全に読み取るための窓口です。"},{type:"debug",long:!0,before:`class YearConverter{
  int western;
public:
`,after:`
};`,lead:"引数なしのとき2022を設定するコンストラクタと、引数ありのときその値を設定するコンストラクタの、2つをオーバーロードとして定義しなさい(デフォルト引数は使わない)。",answers:[`YearConverter(){ western=2022; }
YearConverter(int year){ western=year; }`],explain:"デフォルト引数を使わなくても、引数の数が異なる2つのコンストラクタを別々に定義する(オーバーロードする)ことで、同じように「引数を省略したときの挙動」を用意できます。YearConverter();(引数0個)とYearConverter(int year);(引数1個)は型も個数も違うため、正しくオーバーロードとして成立します。"},{type:"choice",lead:"コンストラクタのオーバーロードとデフォルト引数の関係について、正しい説明を選びなさい。",options:["どちらも「引数を省略したときの挙動」を実現できるが、書き方が異なる","デフォルト引数はコンストラクタには使えない","コンストラクタのオーバーロードは1つのクラスに1つしか定義できない","デフォルト引数を使うと、そのクラスは必ずコンパイルエラーになる"],answers:["どちらも「引数を省略したときの挙動」を実現できるが、書き方が異なる"],explain:"デフォルト引数(YearConverter(int year=2022))も、引数なし・引数ありの2つのコンストラクタをオーバーロードする方法も、どちらも「引数を省略して生成したときにどう初期化するか」を実現できます。前者は1つの定義で済み、後者は2つの定義に分かれるという書き方の違いがあります。"},{type:"order",lines:[{label:"A",code:`class YearConverter{
public:
  YearConverter(int year=2022){ }
};`},{label:"B",code:"YearConverter yc1;"},{label:"C",code:"YearConverter yc2(2020);"}],lead:"デフォルト引数を使ったコンストラクタを定義し、省略した生成と値を渡した生成の両方を行う正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"デフォルト引数付きのコンストラクタを定義してから(A)、引数を省略した生成(B、yearは2022になる)、明示的に値を渡した生成(C、yearは2020になる)の両方が行えます。「YearConverter yc1();」のように空の括弧をつけてしまうと関数宣言と解釈されてしまう(Most Vexing Parse)点にも注意しましょう。"},{before:`class Printer{
public:
  void show(int x){ cout << x << endl; }
`,after:`
};`,lead:"同じ名前showで、string型の引数を受け取るオーバーロード版を追加しなさい。",answers:["void show(string x){ cout << x << endl; }"],explain:'引数の型が異なれば、同じ名前showで別のメンバ関数を定義できます。show(5)のように呼べばint版、show("Hi")のように呼べばstring版が、それぞれ自動的に選ばれます。'},{type:"debug",long:!0,before:`class Box{
  int size;
public:
`,after:`
};`,lead:"引数なしのときsizeを10にするコンストラクタと、引数ありのときその値を使うコンストラクタ、そしてgetSize()を、あわせて定義しなさい。",answers:[`Box(){ size=10; }
Box(int s){ size=s; }
int getSize(){ return size; }`],explain:"引数の数が異なる2つのコンストラクタをオーバーロードすることで、Box b1;(引数なし)ではsize=10、Box b2(20);(引数あり)ではsize=20、というように使い分けられます。getSize()はどちらの場合でも同じように使えます。"},{type:"choice",lead:"メンバ関数の中からは、privateなメンバに直接アクセスできるか選びなさい。",options:["できる(同じクラスのメンバ関数だから)","できない","publicにしないと絶対にアクセスできない","コンパイラの設定による"],answers:["できる(同じクラスのメンバ関数だから)"],explain:"privateの制限は「クラスの外部」からのアクセスを防ぐためのものです。同じクラスの中で定義されたメンバ関数からは、privateなデータメンバにも普通の変数と同じ感覚で直接アクセスできます。"},{type:"order",lines:[{label:"A",code:"Box b1;"},{label:"B",code:"Box b2(20);"},{label:"C",code:"cout << b1.getSize() << endl;"},{label:"D",code:"cout << b2.getSize() << endl;"}],lead:"引数なし・引数ありの2通りでBoxを生成し、両方のサイズを出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"引数なしで生成すると(A)デフォルトの10が、引数20を渡して生成すると(B)その20が、それぞれ使われます。getSize()で確認すると(C,D)、10と20がそれぞれ出力されます。"},{before:`class BankAccount{
`,after:`:
  int balance;
public:
  BankAccount(int b){ balance=b; }
};`,answers:["private"],explain:"balanceのような重要なデータメンバは、外部から直接書き換えられないようprivateにしておくのが基本です。"},{before:`class BankAccount{
  int balance;
public:
  BankAccount(int b){ balance=b; }
  int `,after:`(){ return balance; }
};`,answers:["getBalance"],explain:"get+メンバ名(getBalance)という名前で、privateなbalanceの値を安全に読み取れるようにします。"},{type:"choice",lead:"publicなメンバ関数を通してのみprivateなデータを操作させる設計の利点として正しいものを選びなさい。",options:["不正な値の代入を防ぐなど、決められたルールを守らせやすい","実行速度が必ず上がる","メモリ使用量が減る","継承ができなくなる"],answers:["不正な値の代入を防ぐなど、決められたルールを守らせやすい"],explain:"データメンバをprivateにし、専用のメソッドを通してのみ操作させることで、「残高はマイナスにならない」のようなルールをそのメソッドの中で強制でき、外部から無秩序に書き換えられる事故を防げます。"},{type:"debug",long:!0,before:`class BankAccount{
  int balance;
public:
  BankAccount(int b){ balance=b; }
  int getBalance(){ return balance; }
  void withdraw(int amount){
`,after:`
  }
};`,lead:"withdrawメソッドの中身に、balanceがamount以上のときだけ引き出し(balanceから減算)を行う処理を書きなさい。",answers:[`if(balance >= amount){
balance -= amount;
}`],explain:"balance >= amountという条件で残高が足りているかを確認してから引き出します。残高不足のときは何も起きないので、balanceがマイナスになる事故を防げます。"},{before:`BankAccount acc(100);
acc.withdraw(30);
cout << acc.`,after:"() << endl; // 70が表示される",answers:["getBalance"],explain:"100からwithdraw(30)で30引かれるので、残高は70になります。getBalance()でその70を読み取って出力します。"},{before:`class BankAccount{
  int balance;
public:
  BankAccount(int b){ balance=b; }
  void deposit(int amount){
    `,after:`;
  }
};`,answers:["balance += amount"],explain:"depositは「入金する」メソッドなので、+=を使ってbalanceにamountを加算します。withdraw(引き出し)の-=と対になる処理です。"},{type:"order",lines:[{label:"A",code:"BankAccount acc(50);"},{label:"B",code:"acc.deposit(20);"},{label:"C",code:"acc.withdraw(10);"},{label:"D",code:"cout << acc.getBalance() << endl; // 60"}],lead:"50円で口座を開設し、20円入金、10円引き出したあとの残高を出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"50円で開設し(A)、20円入金して70円になり(B)、10円引き出して60円になります(C)。最後にその60円を出力します(D)。"},{type:"choice",lead:"コンストラクタが複数(オーバーロード)あるとき、どのコンストラクタが呼ばれるかはどう決まるか選びなさい。",options:["渡された引数の型・個数に応じて自動的に決まる","必ず最初に定義したものが呼ばれる","呼び出し側で明示的に選ぶ必要がある","ランダムに選ばれる"],answers:["渡された引数の型・個数に応じて自動的に決まる"],explain:"コンストラクタのオーバーロードは、普通の関数のオーバーロードと同じ仕組みです。生成するときに渡した引数の型や個数に応じて、コンパイラが適切なコンストラクタを自動的に選んでくれます。"},{before:`class Room{
  int temperature;
public:
  Room(int t=`,after:`){ temperature=t; }
}; // 省略時は20度にしたい`,answers:["20"],explain:"デフォルト引数にt=20と指定しておけば、Room room;のように引数を省略して生成したときに自動的に20が使われます。"},{type:"debug",long:!0,before:`class Battery{
  int level;
public:
  Battery(int l){ level=l; }
  int getLevel(){ return level; }
  void setLevel(int l){
`,after:`
  }
};`,lead:"setLevelメソッドの中身に、lが0以上100以下のときだけlevelに代入する処理を書きなさい。",answers:[`if(l>=0 && l<=100){
level = l;
}`],explain:"&&(かつ)を使ってl>=0とl<=100の両方を満たすときだけlevelに代入します。範囲外の値(マイナスや100を超える値)は無視され、levelは変わりません。"},{before:`Battery b(50);
b.setLevel(150);
cout << b.getLevel() << endl; // 150は不正なので50のまま
int expected = `,after:";",answers:["50"],explain:"setLevel(150)は0〜100の範囲外なので、setLevelの中のif文の条件を満たさず無視されます。そのためlevelは最初にコンストラクタで設定した50のままです。"},{type:"choice",lead:"structとclassで同じメンバ定義を書いた場合、デフォルトのアクセス指定以外に機能的な違いはあるか選びなさい。",options:["基本的にはほぼ同じ(デフォルトのアクセス指定が違うだけ)","structは継承が一切できない","classはコンストラクタを持てない","structはメンバ関数を持てない"],answers:["基本的にはほぼ同じ(デフォルトのアクセス指定が違うだけ)"],explain:"C++のstructとclassは、デフォルトのアクセス指定(structはpublic、classはprivate)が違うだけで、それ以外はほぼ同じように使えます。structもコンストラクタやメンバ関数、継承を持てます。"},{before:`class Product{
  int price;
public:
  Product(int p){ price=p; }
  int getPrice(){ return price; }
  void setPrice(int p){
`,after:`
  }
};`,lead:"setPriceメソッドの中身に、pが0以上のときだけpriceに代入する処理を書きなさい。",answers:[`if(p>=0){
price = p;
}`],explain:"if(p>=0)という条件をつけることで、setPrice(-50)のように不正な負の値を渡されても、priceが書き換わらないように守れます。"},{before:`class Product{
  int price;
public:
  Product(int p){ price=p; }
  int getPrice(){ return price; }
  void setPrice(int p){ if(p>=0){ price=p; } }
};
Product prod(100);
prod.setPrice(-50);
cout << prod.getPrice() << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい(-50は不正なので反映されない)。",answers:["100"],explain:"-50は条件p>=0を満たさないため、setPriceの中の代入は実行されません。priceはコンストラクタで設定した100のままです。"},{before:`class User{
  string name;
  int age;
public:
  User(string n, int a){ name=n; age=a; }
  void setAge(int a){
`,after:`
  }
};`,lead:"setAgeメソッドの中身に、aが0以上150以下のときだけageに代入する処理を書きなさい。",answers:[`if(a>=0 && a<=150){
age = a;
}`],explain:"&&(かつ)を使ってa>=0とa<=150の両方を満たすときだけageに代入し、現実的にありえない年齢の値を弾きます。"},{before:`class Thermostat{
  int temp;
public:
  Thermostat(int t){ temp=t; }
  int getTemp(){ return temp; }
  void setTemp(int t){
`,after:`
  }
};`,lead:"setTempメソッドの中身に、tが-30以上50以下のときだけtempに代入する処理を書きなさい。",answers:[`if(t>=-30 && t<=50){
temp = t;
}`],explain:"家庭用エアコンなどが対応する現実的な温度範囲(-30〜50度)を条件に指定し、それ以外の値は無視します。"},{before:`class Volume{
  int level;
public:
  Volume(){ level=50; }
  int getLevel(){ return level; }
  void setLevel(int l){
`,after:`
  }
};`,lead:"setLevelメソッドの中身に、lが0以上100以下のときだけlevelに代入し、それ以外は何もしない処理を書きなさい。",answers:[`if(l>=0 && l<=100){
level = l;
}`],explain:"音量のような値は0〜100の範囲に収まるべきなので、その範囲内のときだけ代入するよう条件を付けます。"},{before:`class Volume{
  int level;
public:
  Volume(){ level=50; }
  int getLevel(){ return level; }
  void setLevel(int l){ if(l>=0 && l<=100){ level=l; } }
};
Volume v;
v.setLevel(120);
cout << v.getLevel() << endl; // 120は不正なので初期値のまま
`,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["50"],explain:"120は範囲外(0〜100を超える)なので代入は行われず、levelはコンストラクタで設定した初期値50のままです。"},{before:`class Age{
  int value;
public:
  Age(int v){ value = (v>=0) ? v : `,after:`; }
}; // 不正な値なら0にする`,answers:["0"],explain:"三項演算子(条件 ? 真の場合 : 偽の場合)を使い、v>=0が満たされなければ代わりに0を設定します。"},{before:`class Stock{
  int quantity;
public:
  Stock(int q){ quantity=q; }
  int getQuantity(){ return quantity; }
  void reduce(int n){
`,after:`
  }
};`,lead:"reduceメソッドの中身に、quantityがn以上のときだけquantityからnを引く処理を書きなさい(在庫がマイナスにならないようにする)。",answers:[`if(quantity>=n){
quantity -= n;
}`],explain:"在庫が十分にあるとき(quantity>=n)だけ減算することで、quantityが不正にマイナスになるのを防ぎます。"},{before:`class Timer{
  int minutes;
public:
  Timer(int m=`,after:`){ minutes=m; }
}; // 省略時は5分にしたい`,answers:["5"],explain:"デフォルト引数にm=5と指定しておけば、Timer t;のように引数を省略して生成したときに自動的に5分が設定されます。"},{before:`class Timer{
public:
  Timer(int m=5){ }
};
Timer t1;
Timer t2(10);
// t1のminutesは何分になるか(半角数字)
int m1=`,after:";",answers:["5"],explain:"t1は引数を省略して生成されているので、デフォルト引数の5が使われます。"},{before:`class Timer{
public:
  Timer(int m=5){ }
};
Timer t1;
Timer t2(10);
// t2のminutesは何分になるか(半角数字)
int m2=`,after:";",answers:["10"],explain:"t2は明示的に10を渡して生成されているので、デフォルト引数ではなく渡した10が使われます。"},{before:`class Discount{
  int percent;
public:
  Discount(int p=`,after:`){ percent=p; }
}; // 割引なし(0%)をデフォルトにする`,answers:["0"],explain:"割引がない状態(0%)を既定値にしたいので、デフォルト引数をp=0とします。"},{before:`class Message{
  string text;
public:
  Message(string t="`,after:`"){ text=t; }
}; // 省略時は"Hello"にしたい`,answers:["Hello"],explain:'string型の引数にもデフォルト値を指定でき、t="Hello"とすれば省略時に自動的に"Hello"が使われます。'},{before:`class Config{
  int width;
  int height;
public:
  Config(int w=800, int h=`,after:`){ width=w; height=h; }
}; // 省略時のheightを600にする`,answers:["600"],explain:"複数の引数にそれぞれデフォルト値を指定できます。h=600とすれば、heightを省略したときに600が使われます。"},{before:`class Point{
  int x,y;
public:
  Point(){ x=0; y=0; }
`,after:`
};`,lead:"x,yを受け取って設定するオーバーロード版のコンストラクタを追加しなさい。",answers:["Point(int px,int py){ x=px; y=py; }"],explain:"引数の数が異なる(0個と2個)コンストラクタを両方定義することで、Point p1;とPoint p2(3,4);の両方が使えるようになります。"},{before:`class Point{
public:
  Point(){ }
  Point(int px,int py){ }
};
Point p1;
Point p2(3,4);
// p1はどちらのコンストラクタで生成されるか(半角数字で引数の個数を答える)
int n=`,after:";",answers:["0"],explain:"p1は引数を渡さずに生成しているので、引数0個のコンストラクタ(Point())が呼ばれます。"},{before:`class Rect{
  int w,h;
public:
  Rect(int size){ w=size; h=size; }
`,after:`
};`,lead:"幅と高さを別々に受け取るオーバーロード版のコンストラクタを追加しなさい。",answers:["Rect(int width,int height){ w=width; h=height; }"],explain:"既存の1引数版(正方形用)に加え、2引数版(幅と高さが別々)を定義することで、用途に応じて使い分けられます。"},{before:`class Vector2{
  double x,y;
public:
  Vector2(){ x=0; y=0; }
  Vector2(double vx,double vy){ x=vx; y=vy; }
};
Vector2 v1;
Vector2 v2(1.0,2.0);
// v1のxの値は何か(半角数字)
double val=`,after:";",answers:["0"],explain:"v1は引数なしのコンストラクタで生成されているので、xは0で初期化されます。"},{before:`class Grade{
  int score;
public:
  Grade(int s){ score=s; }
  Grade(){ score=0; }
  int `,after:`(){ return score; }
};`,lead:"privateなscoreを読み取るgetterメソッド名(get+メンバ名)を書きなさい。",answers:["getScore"],explain:"get+メンバ名(getScore)という名前で、privateなscoreの値を安全に読み取れるようにします。"},{before:`class Grade{
  int score;
public:
  Grade(int s){ score=s; }
  Grade(){ score=0; }
  int getScore(){ return score; }
};
Grade g1;
Grade g2(80);
cout << g1.getScore() << " " << g2.getScore() << endl; // `,after:"",lead:"出力される内容を書きなさい。",answers:["0 80"],explain:"g1は引数なしなのでscoreは0、g2は80を渡しているのでscoreは80になります。"},{type:"choice",lead:"デフォルト引数とコンストラクタのオーバーロードのうち、複数の初期化パターンを1つの定義で済ませられるのはどちらか選びなさい。",options:["デフォルト引数","オーバーロード","どちらも1つの定義では済まない","コンストラクタでは両方使えない"],answers:["デフォルト引数"],explain:"デフォルト引数は1つのコンストラクタ定義の中で「省略時の値」を指定できるため、1つの定義だけで済みます。オーバーロードは別々のコンストラクタを複数定義する必要があります。"},{type:"choice",lead:"setterメソッドの中で値のチェック(バリデーション)を行う目的として正しいものを選びなさい。",options:["不正な値がデータメンバに設定されるのを防ぐため","処理速度を上げるため","メモリを節約するため","コンストラクタを不要にするため"],answers:["不正な値がデータメンバに設定されるのを防ぐため"],explain:"setterの中でif文などを使って値をチェックすることで、範囲外の値やありえない値がそのままデータメンバに設定されてしまう事故を防げます。"},{type:"choice",lead:"コンストラクタの引数にデフォルト値(例: int m=5)を指定した場合の説明として正しいものを選びなさい。",options:["その引数を省略して呼び出すことができるようになる","その引数は必ず省略しなければならなくなる","デフォルト値は一切使われない","コンパイルエラーになる"],answers:["その引数を省略して呼び出すことができるようになる"],explain:"デフォルト値を指定した引数は、呼び出し時に省略することも、明示的に値を渡すこともできるようになります。省略した場合はデフォルト値が使われます。"},{type:"choice",lead:"オーバーロードされた複数のコンストラクタのうち、実際にどれが呼ばれるかは何によって決まるか選びなさい。",options:["呼び出し時に渡した引数の型と個数","クラス名の文字数","定義した順番(常に最初のもの)","ランダム"],answers:["呼び出し時に渡した引数の型と個数"],explain:"コンパイラは、生成時に渡された引数の型・個数を見て、それに一致するコンストラクタを自動的に選びます。定義した順番やランダムではありません。"},{type:"choice",lead:"class内でsetterメソッドが値を弾いた(条件を満たさなかった)場合、一般的にどう振る舞うべきか選びなさい。",options:["何もせず、データメンバを変更しないままにする","必ずプログラムを終了させる","無理やり元の型に変換して代入する","エラーメッセージを常に画面いっぱいに表示する"],answers:["何もせず、データメンバを変更しないままにする"],explain:"これまで扱ってきたsetterは、条件を満たさない場合は単純に代入をスキップし、それまでの値を保ったままにするという、シンプルで安全な振る舞いを採用しています。"},{type:"choice",lead:"int width=800のようなデフォルト引数を持つ関数を、実引数を渡さずに呼び出した場合どうなるか選びなさい。",options:["デフォルト値がそのまま使われる","コンパイルエラーになる","必ず0が使われる","実行時エラーになる"],answers:["デフォルト値がそのまま使われる"],explain:"引数を省略して呼び出した場合、あらかじめ指定しておいたデフォルト値(この場合800)がそのまま使われます。"},{type:"order",lines:[{label:"A",code:`class Product{
public:
  Product(int p=100){ }
};`},{label:"B",code:"Product a;"},{label:"C",code:"Product b(50);"}],lead:"デフォルト引数付きのコンストラクタを定義し、省略した生成と値を渡した生成の両方を行う正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"コンストラクタを定義してから(A)、省略した生成(B、pは100になる)、値を渡した生成(C、pは50になる)を行います。"},{type:"order",lines:[{label:"A",code:"Volume v;"},{label:"B",code:"v.setLevel(80);"},{label:"C",code:"cout << v.getLevel() << endl; // 80"}],lead:"音量オブジェクトを作り、正当な値をsetしてから結果を出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"オブジェクトを生成し(A)、範囲内の値(80)をsetLevelで設定し(B)、その結果を出力します(C)。"},{type:"order",lines:[{label:"A",code:"Battery b(50);"},{label:"B",code:"b.setLevel(150);"},{label:"C",code:"cout << b.getLevel() << endl; // 150は不正なので50のまま"}],lead:"バッテリーを50%で初期化し、不正な値をsetしようとしてから結果を出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"150は0〜100の範囲外なので、setLevel(150)は無視されます。そのため出力は初期値の50のままです。"},{type:"debug",long:!0,before:`class Temperature{
  int celsius;
public:
  Temperature(int c=20){ celsius=c; }
  int getCelsius(){ return celsius; }
  void setCelsius(int c){
`,after:`
  }
};`,lead:"setCelsiusメソッドの中身に、cが-273以上のときだけcelsiusに代入する処理を書きなさい(絶対零度より低い温度は不正)。",answers:[`if(c>=-273){
celsius = c;
}`],explain:"絶対零度(-273度)より低い温度は現実には存在しないため、その範囲を下回る値は無視するようにします。"},{type:"debug",long:!0,before:`class Employee{
  string name;
  int salary;
public:
`,after:`
};`,lead:"name(string)とsalary(int)を受け取るコンストラクタと、salaryが0以上のときだけ更新するsetSalary(int s)、salaryを返すgetSalary()を、あわせて定義しなさい。",answers:[`Employee(string n, int s){ name=n; salary=s; }
void setSalary(int s){ if(s>=0){ salary=s; } }
int getSalary(){ return salary; }`],explain:"コンストラクタで初期状態を設定し、setSalary()では負の給与という不正な値を弾き、getSalary()で外部から安全に読み取れるようにします。"},{type:"debug",long:!0,before:`class Ticket{
  int price;
  bool used;
public:
  Ticket(int p){ price=p; used=false; }
`,after:`
};`,lead:"まだ使われていない(used==false)ときだけtrueにするuse()メソッドと、usedを返すisUsed()メソッドを、あわせて定義しなさい。",answers:[`void use(){ if(!used){ used=true; } }
bool isUsed(){ return used; }`],explain:"!usedは「まだ使われていない」ことを表すので、その条件を満たすときだけusedをtrueにし、二重使用を防ぎます。"},{type:"debug",long:!0,before:`class Elevator{
  int floor;
public:
  Elevator(){ floor=1; }
  int getFloor(){ return floor; }
  void moveTo(int f){
`,after:`
  }
};`,lead:"moveToメソッドの中身に、fが1以上10以下のときだけfloorに代入する処理を書きなさい(ビルは1階から10階まで)。",answers:[`if(f>=1 && f<=10){
floor = f;
}`],explain:"ビルの範囲(1〜10階)を条件にし、その範囲内の階だけに移動できるようにします。"},{type:"debug",long:!0,before:`class PasswordBox{
  string password;
public:
  PasswordBox(string p){ password=p; }
  bool check(string input){
`,after:`
  }
};`,lead:"checkメソッドの中身に、inputがpasswordと一致するかをbool型でreturnする処理を書きなさい。",answers:["return input==password;"],explain:"inputとpasswordが完全に一致するかどうかの比較結果(true/false)を、そのままreturnします。"},{type:"debug",long:!0,before:`class SpeedLimiter{
  int speed;
public:
  SpeedLimiter(){ speed=0; }
  int getSpeed(){ return speed; }
  void accelerate(int amount){
`,after:`
  }
};`,lead:"accelerateメソッドの中身に、speedにamountを足すが、100を超えたら100に制限する処理を書きなさい。",answers:[`speed += amount;
if(speed>100){
speed = 100;
}`],explain:"まずspeedにamountを足し、その結果が上限(100)を超えていたら100に切り詰めることで、上限を超えないよう制御します。"},{type:"debug",long:!0,before:`class Library{
  int bookCount;
public:
  Library(){ bookCount=0; }
  int getCount(){ return bookCount; }
  void addBook(){
`,after:`
  }
  void removeBook(){
    if(bookCount>0){ bookCount--; }
  }
};`,lead:"addBookメソッドの中身に、bookCountを1増やす処理を書きなさい。",answers:["bookCount++;"],explain:"本を1冊追加するので、bookCountを1増やします(removeBookが本を減らす処理と対になっています)。"},{before:`class Wallet{
  int money;
public:
  Wallet(int m){ money=m; }
};
// moneyのアクセス指定は何か(英単語で)
`,after:"",answers:["private"],explain:"public:が書かれていないので、moneyはクラスのデフォルトのアクセス指定であるprivateになります。"},{before:`class Wallet{
public:
  int money;
  Wallet(int m){ money=m; }
};
Wallet w(100);
w.money = -999; // publicなので直接書き換えられてしまう
// このように直接書き換えられる問題を防ぐために、moneyに付けるべきアクセス指定は何か(英単語で)
`,after:"",answers:["private"],explain:"moneyをprivateにすれば、外部からw.money = -999;のように直接アクセスすることができなくなり、setterを通した安全な変更だけを許すようにできます。"},{before:`class Sensor{
  double value;
public:
  Sensor(){ value=0; }
  double getValue(){ return value; }
  void setValue(double v){
`,after:`
  }
};`,lead:"setValueメソッドの中身に、vが0.0以上のときだけvalueに代入する処理を書きなさい。",answers:[`if(v>=0.0){
value = v;
}`],explain:"センサーの値が負になることはない、という前提で、0.0以上のときだけ代入するようにします。"},{type:"debug",long:!0,before:`class Membership{
  int points;
public:
  Membership(){ points=0; }
  int getPoints(){ return points; }
  void addPoints(int p){
`,after:`
  }
};`,lead:"addPointsメソッドの中身に、pが0以上のときだけpointsに加算する処理を書きなさい(マイナスのポイント付与を防ぐ)。",answers:[`if(p>=0){
points += p;
}`],explain:"マイナスのポイント付与という不正な操作を防ぐため、p>=0を満たすときだけpointsに加算します。"}],qsExpert:[{type:"debug",long:!0,before:`class YearConverter{
  int western;
public:
  YearConverter(int y){ western=y; }
  int getWestern(){ return western; }
  void setWestern(int y){ if(y>=0) western=y; }
};
int main(){
`,after:`
  return 0;
}`,lead:"yc(2022)で生成し、setWestern(-5)を呼んでから(不正な値なので無視されるはず)、getWestern()の結果を出力する処理を書きなさい。",answers:[`YearConverter yc(2022);
yc.setWestern(-5);
cout << yc.getWestern() << endl;`],explain:"setWestern(-5)を呼んでも、setWestern内のif(y>=0)という条件によって、負の値-5は代入されずに無視されます。そのためwesternは最初にコンストラクタで設定した2022のままで、getWestern()も2022を返します。"},{type:"debug",long:!0,before:`class YearConverter{
  int western;
public:
  YearConverter(){ western=2022; }
  YearConverter(int y){ western=y; }
  int getWestern(){ return western; }
};
int main(){
`,after:`
  return 0;
}`,lead:"引数なしで生成したyc1と、2020を渡して生成したyc2、それぞれのgetWestern()の結果を1行ずつ出力する処理を書きなさい。",answers:[`YearConverter yc1;
YearConverter yc2(2020);
cout << yc1.getWestern() << endl;
cout << yc2.getWestern() << endl;`],explain:"引数の数によって呼ばれるコンストラクタが自動的に選ばれます。yc1;(引数なし)ではwestern=2022のコンストラクタが、yc2(2020);(引数1つ)ではwestern=yのコンストラクタが呼ばれるため、それぞれ2022と2020が出力されます。"},{type:"debug",long:!0,before:"",after:"",lead:"int westernをprivateに持ち、year省略時は2022を使うコンストラクタ、getWestern()、そしてyが0以上のときだけ代入するsetWestern(int y)を、あわせて定義しなさい。",answers:[`class YearConverter{
int western;
public:
YearConverter(int year=2022){ western=year; }
int getWestern(){ return western; }
void setWestern(int y){ if(y>=0) western=y; }
};`],explain:"デフォルト引数付きのコンストラクタ、値を読み取るだけのgetWestern、条件付きで書き換えるsetWesternの3点セットは、「privateなデータを安全に読み書きする」というカプセル化の典型的な構成です。"},{type:"debug",long:!0,before:`class Base{
protected:
  int baseData;
public:
  Base(int b){ baseData=b; }
  int getBaseData(){ return baseData; }
};
int main(){
`,after:`
  return 0;
}`,lead:"b(10)というBaseオブジェクトを生成し、getBaseData()の結果を出力する処理を書きなさい。",answers:[`Base b(10);
cout << b.getBaseData() << endl;`],explain:"baseDataはprotectedなので、main関数のような外部からb.baseDataと直接書くことはできませんが、publicなgetBaseData()というメンバ関数を経由すれば、間接的に値を読み取ることができます。"},{type:"debug",long:!0,before:`class Temperature{
  int celsius;
public:
  Temperature(int c){ celsius=c; }
  int getCelsius(){ return celsius; }
  void setCelsius(int c){ if(c >= -273) celsius=c; }
};
int main(){
`,after:`
  return 0;
}`,lead:"t(20)で生成し、setCelsius(-300)を呼んでから(不正な値なので無視されるはず)、getCelsius()の結果を出力する処理を書きなさい。",answers:[`Temperature t(20);
t.setCelsius(-300);
cout << t.getCelsius() << endl;`],explain:"絶対零度(-273℃)より低い温度は物理的にありえないため、setCelsius内のif(c >= -273)という条件で-300のような不正な値をはじいています。そのためcelsiusは最初の20のままで、getCelsius()も20を返します。"},{type:"debug",long:!0,before:"",after:"",lead:"int levelをprivateに持ち、level省略時は50を使うコンストラクタ、getLevel()、そしてlが0以上100以下のときだけ代入するsetLevel(int l)を、あわせて定義しなさい。",answers:[`class Volume{
int level;
public:
Volume(int l=50){ level=l; }
int getLevel(){ return level; }
void setLevel(int l){ if(l>=0 && l<=100) level=l; }
};`],explain:"デフォルト引数付きコンストラクタ、getter、範囲チェック付きsetterの組み合わせは、privateなデータを安全に扱うための典型的な構成です。"},{type:"debug",long:!0,before:`class Volume{
  int level;
public:
  Volume(int l=50){ level=l; }
  int getLevel(){ return level; }
};
int main(){
`,after:`
  return 0;
}`,lead:"引数なしで生成したv1と、80を渡して生成したv2、それぞれのgetLevel()を1行ずつ出力する処理を書きなさい。",answers:[`Volume v1;
Volume v2(80);
cout << v1.getLevel() << endl;
cout << v2.getLevel() << endl;`],explain:"v1は引数を省略しているのでデフォルト値の50が、v2は明示的に渡した80が、それぞれ使われます。"},{type:"debug",long:!0,before:`class Volume{
  int level;
public:
  Volume(int l=50){ level=l; }
  int getLevel(){ return level; }
  void setLevel(int l){ if(l>=0 && l<=100) level=l; }
};
int main(){
`,after:`
  return 0;
}`,lead:"v(50)で生成し、setLevel(150)を呼んでから(不正な値なので無視されるはず)、getLevel()の結果を出力する処理を書きなさい。",answers:[`Volume v(50);
v.setLevel(150);
cout << v.getLevel() << endl;`],explain:"150は0〜100の範囲外なので、setLevelの中の条件を満たさず無視されます。そのためlevelは最初の50のままです。"},{type:"debug",long:!0,before:`class Config{
protected:
  int width;
  int height;
public:
  Config(int w, int h){ width=w; height=h; }
  int getWidth(){ return width; }
  int getHeight(){ return height; }
};
int main(){
`,after:`
  return 0;
}`,lead:"c(800,600)というConfigオブジェクトを生成し、getWidth()とgetHeight()の合計を出力する処理を書きなさい。",answers:[`Config c(800,600);
cout << c.getWidth() + c.getHeight() << endl;`],explain:"widthとheightはprotectedなので外部から直接触れませんが、publicなgetterを経由すれば値を読み取れます。800+600=1400です。"},{type:"debug",long:!0,before:"",after:"",lead:"int percentをprivateに持ち、省略時は0(割引なし)を使うコンストラクタと、getPercent()を、あわせて定義しなさい。",answers:[`class Discount{
int percent;
public:
Discount(int p=0){ percent=p; }
int getPercent(){ return percent; }
};`],explain:"割引がない状態(0%)をデフォルト値にしておくことで、Discount d;のように生成しても安全な初期状態になります。"},{type:"debug",long:!0,before:`class Discount{
  int percent;
public:
  Discount(int p=0){ percent=p; }
  int getPercent(){ return percent; }
};
int main(){
  int price = 1000;
  Discount d(20);
`,after:`
  return 0;
}`,lead:"割引後の価格(price - price*d.getPercent()/100)を計算して出力する処理を書きなさい(800になるはず)。",answers:["cout << price - price*d.getPercent()/100 << endl;"],explain:"d.getPercent()は20を返すので、1000 - 1000*20/100 = 1000-200 = 800になります。"},{type:"debug",long:!0,before:`class Stock{
  int quantity;
public:
  Stock(int q=0){ quantity=q; }
  int getQuantity(){ return quantity; }
  void setQuantity(int q){
`,after:`
  }
};`,lead:"setQuantityメソッドの中身に、qが0以上のときだけquantityに代入する処理を書きなさい。",answers:["if(q>=0) quantity=q;"],explain:"在庫数がマイナスになるのは不自然なので、q>=0のときだけ代入するようにします。"},{type:"debug",long:!0,before:`class Stock{
  int quantity;
public:
  Stock(int q=0){ quantity=q; }
  int getQuantity(){ return quantity; }
  void setQuantity(int q){ if(q>=0) quantity=q; }
};
int main(){
`,after:`
  return 0;
}`,lead:"s(10)で生成し、setQuantity(-5)を呼んでから(不正な値なので無視されるはず)、getQuantity()の結果を出力する処理を書きなさい。",answers:[`Stock s(10);
s.setQuantity(-5);
cout << s.getQuantity() << endl;`],explain:"-5は条件q>=0を満たさないため代入されず、quantityは最初の10のままです。"},{type:"debug",long:!0,before:"",after:"",lead:"int width, heightをprivateに持ち、1つの引数sizeだけを受け取ると正方形(width=height=size)にするコンストラクタと、2つの引数w,hを受け取ると長方形にするコンストラクタの両方を、オーバーロードとして定義しなさい(getAreaは不要)。",answers:[`class Rectangle{
int width, height;
public:
Rectangle(int size){ width=size; height=size; }
Rectangle(int w, int h){ width=w; height=h; }
};`],explain:"引数の個数が異なる2つのコンストラクタをオーバーロードすることで、正方形用と長方形用の生成方法を1つのクラスにまとめられます。"},{type:"debug",long:!0,before:`class Rectangle{
  int width, height;
public:
  Rectangle(int size){ width=size; height=size; }
  Rectangle(int w, int h){ width=w; height=h; }
  int getArea(){ return width*height; }
};
int main(){
`,after:`
  return 0;
}`,lead:"r1を5(正方形)、r2を4と6(長方形)で生成し、両方のgetArea()を1行ずつ出力する処理を書きなさい。",answers:[`Rectangle r1(5);
Rectangle r2(4,6);
cout << r1.getArea() << endl;
cout << r2.getArea() << endl;`],explain:"r1は引数1個なので正方形用のコンストラクタが選ばれ面積は5*5=25、r2は引数2個なので長方形用が選ばれ面積は4*6=24になります。"}],qsDrag:[{type:"dragfill",lead:"westernを安全に読み書きするgetter/setterになるよう、正しいピースを空欄に配置しなさい。",lines:[{code:"class YearConverter{"},{code:"  int western;"},{code:"public:"},{code:"  YearConverter(int y){ western=y; }"},{blank:"b1"},{blank:"b2"},{code:"};"}],pieces:[{id:"p1",code:"int getWestern(){ return western; }"},{id:"p2",code:"void setWestern(int y){ if(y>=0) western=y; }"},{id:"p3",code:"int getWestern(){ return y; }"}],answerMap:{b1:"p1",b2:"p2"},explain:"getWesternはメンバwesternの値をそのままreturnします(p1)。p3はyという、このメソッドの中には存在しない変数を参照しようとしており、コンパイルエラーになります。setWesternはif(y>=0)という条件で不正な値をはじいてから代入します(p2)。"}]},{id:"w9",title:"CASE 09「消された後始末」",sub:"Week9 クラスの定義2",emoji:"👻",mon:"後片付けを忘れたデストラクタ",lesson:[{title:"デストラクタ",code:`class ArrayCal{
  double* array;
public:
  ArrayCal(int n){ array = new double[n]; }
  ~ArrayCal(){ delete [] array; }
};`,explain:"コンストラクタが「オブジェクトが生まれるときに自動で呼ばれる関数」だったのに対し、デストラクタは「オブジェクトが消えるときに自動で呼ばれる関数」です。クラス名の前に~(チルダ)をつけた~ArrayCal()のような名前で定義し、戻り値の型は書きません。この例のように、コンストラクタの中でnewを使って動的にメモリを確保したクラスでは、そのオブジェクトが不要になったときに、確保したメモリを必ずdeleteで解放してあげる必要があります。デストラクタにdelete [] array; と書いておけば、オブジェクトが消えるタイミングでC++が自動的にこの後片付けを実行してくれるので、解放し忘れ(メモリリーク)を防げます。"},{title:"new / delete",code:`int* p = new int(5);
// ...使う...
delete p;
int* arr = new int[10];
delete [] arr;`,explain:"newで確保したメモリは、必ずdeleteで解放しなければいけません。ここで注意が必要なのは、new int(5)のように単体の変数を確保した場合はdelete p;でよいのですが、new int[10]のように配列を確保した場合はdelete [] arr;のように[]をつけて解放する必要があるという点です。この対応(単体はnewとdelete、配列はnew[]とdelete[])を間違えると、正しくメモリが解放されずに不具合の原因になることがあります。そしてそもそもdelete自体を書き忘れると、確保したメモリはプログラムが終了するまでずっと使われたままになる「メモリリーク」という状態になってしまいます。"},{title:"vector(可変長配列)",code:`#include <vector>
vector<int> v;
v.push_back(1);
v.push_back(2);`,explain:"これまで使ってきたint a[5];のような配列は、宣言した時点でサイズが固定されており、後から要素数を増やしたり減らしたりすることはできませんでした。vectorは、この不便さを解消してくれるクラスで、実行中に自由に要素数を増減できる「可変長配列」を扱うことができます。<vector>ヘッダをインクルードし、vector<int> v; のように宣言したあと、v.push_back(1); のようにpush_backメソッドを呼ぶだけで、内部で自動的にメモリの管理をしてくれながら末尾に要素を追加していけます。実は内部ではvectorも動的にメモリを確保・解放していますが、その処理は全部vectorクラスが面倒を見てくれるので、私たちはnewやdeleteを意識する必要がありません。"}],qs:[{before:`class ArrayCal{
  double* array;
public:
  ArrayCal(double* a, int n);
  `,after:`ArrayCal(); // デストラクタの名前の書き方
};`,answers:["~"],explain:"デストラクタは「クラス名の前に~(チルダ、波状の記号)をつけた名前」を持つ特別な関数で、コンストラクタと同じくコンパイラが自動的に呼び出してくれるため、自分で明示的に呼び出す必要はありません。呼ばれるタイミングは「オブジェクトが消滅するとき」で、たとえばローカル変数として作られたオブジェクトが、そのブロック({ })の終わりに達して消えるタイミングなどが該当します。この例のように、コンストラクタでnewを使ってメモリを動的に確保したクラスでは、デストラクタの中でそのメモリをdeleteで解放してあげるのが定番の使い方です。「コンストラクタで用意したものは、デストラクタで片付ける」というペアで覚えておくとよいでしょう。"},{before:`ArrayCal::ArrayCal(double* a, int n){
  size = n;
  array = new double[size];
  for(int i=0;i<size;i++) array[i]=a[i];
}
ArrayCal::~ArrayCal(){
  `,after:" array; // newで確保した配列を解放する",answers:["delete []","delete[]"],explain:"コンストラクタの中でarray = new double[size]; のように配列としてメモリを確保した場合、それを解放するときも「配列を解放していますよ」とコンパイラに伝えるため、delete []のように角括弧[]をつける必要があります。もし単体のdelete array;だけを書いてしまうと、正しくすべての要素分のメモリが解放されず、意図しない動作(未定義動作と呼ばれる、実行するたびに結果が変わりうる不安定な状態)の原因になることがあります。「配列で確保したものは、必ず[]をつけて解放する」という対応関係をセットで覚えておきましょう。"},{before:`int* p;
p = `,after:" int[10]; // サイズ10のint配列を動的に確保する演算子",answers:["new"],explain:"これまで使ってきたint a[5];のような配列は、コンパイルする時点でサイズが5と決まっている「静的な」確保のされ方でした。それに対してnewは、プログラムが実際に動いている最中(実行時)に、必要な分だけメモリを確保するための演算子です。new int[10] と書くと、int型10個分の領域が「ヒープ領域」と呼ばれる動的メモリ専用の場所に新しく確保され、その確保された領域の先頭アドレスが戻り値として返されます。このアドレスをint* pのようなポインタ変数で受け取っておくことで、後からp[0]〜p[9]のように配列と同じ感覚で操作できます。プログラムを実行してみるまで必要なサイズが分からない場合(たとえばファイルの行数を読んでから配列を作る場合など)に、newが特に役立ちます。"},{before:`int* p = new int(5);
// 使い終わったら忘れずにメモリを解放する
`,after:" p;",answers:["delete"],explain:"変数宣言で確保される普通のメモリ(int a;など)は、そのブロック({ })を抜けると自動的に解放されますが、newで確保したメモリはその自動的な仕組みの対象外です。そのため、newで確保したメモリはプログラマが自分の責任で、使い終わったタイミングでdeleteを呼んで明示的に解放してあげなければいけません。もし解放を忘れてしまうと、そのメモリ領域はプログラムが終了するまでずっと「使用中」のまま残り続け、他の目的に使うことができなくなります。このように、確保したのに解放されないメモリがどんどん増えていく現象を「メモリリーク(memory leak、メモリの漏れ)」と呼び、放置するとパソコン全体の動作が重くなったり、最終的にはメモリ不足で異常終了したりする原因になります。"},{before:"#include <",after:`>
// 可変長配列(サイズを自由に変えられる配列)を扱うクラス
vector<int> v;`,answers:["vector"],explain:"vectorは、要素数を実行中に自由に増やしたり減らしたりできる「可変長配列」を扱うためのクラスです。<vector>ヘッダをインクルードすれば使えるようになります。普通の配列int a[5];はサイズが固定されているのに対し、vector<int> v; と宣言しておけば、v.push_back(値)を呼ぶたびに要素を1つずつ末尾に追加していくことができ、v.size()で現在の要素数を、v[i]で個々の要素にアクセスできます。「サイズがあらかじめ分からない」「後から要素を増やしたい」という場面では、配列よりvectorを使う方がずっと便利です。"},{before:`#include <vector>
vector<int> v;
v.`,after:"(2); // 値2の要素を末尾に追加するメソッド",answers:["push_back"],altAnswers:["emplace_back"],explain:"push_back(値)は、vectorの末尾に新しい要素を1つ追加するメソッドです。「push(押し込む)+back(後ろに)」という名前の通り、すでにある要素の一番後ろに新しい値を押し込んでいくイメージです。v.push_back(1); を実行するとvは要素数1(中身は{1})に、続けてv.push_back(2); を実行すると要素数2(中身は{1,2})になります。呼び出すたびに自動的にサイズが1つずつ大きくなっていくため、あらかじめ要素数を決めておかなくても、必要な分だけどんどんデータを追加していける便利さがvectorの一番の魅力です。(別解: emplace_backも同じ役割を果たせますが、授業では扱っていません)"},{before:`// deleteを忘れて動的に確保したメモリを解放しないままにしておくと起きる問題をカタカナで書きなさい
`,after:"",answers:["メモリリーク"],explain:"newで確保したメモリを解放し忘れることを「メモリリーク」と呼びます。リーク(leak)は英語で「漏れる」という意味で、まるで水道の蛇口から水が少しずつ漏れ続けているように、使われないままのメモリがプログラムの実行中にどんどん増え続けていく様子を表しています。1回や2回であれば大した影響はありませんが、たとえばループの中で毎回newして一度もdeleteしない、という書き方をしてしまうと、実行している間じゅうメモリが際限なく増え続け、最終的にはメモリ不足でプログラムやパソコン全体の動作が重くなったり、異常終了してしまったりする深刻な原因になります。"},{before:`vector<int> v;
v.push_back(1);
v.push_back(2);
cout << v.size() << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["2"],explain:"2回push_backしたので、要素数は2になります。"},{before:`vector<int> v = {10,20,30};
cout << v[1] << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["20"],explain:"添字は0から始まるので、v[1]は2番目の要素(20)です。"},{before:`int* p = new int(7);
cout << *p << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["7"],explain:"new int(7)は値7で初期化されたintを確保するので、*pは7になります。"},{before:`// オブジェクトが消滅するときに自動的に呼ばれる特別な関数を何と呼ぶか(カタカナで)
`,after:"",answers:["デストラクタ"],explain:"オブジェクトが消滅するときに自動的に呼ばれる特別な関数をデストラクタと呼びます。"},{before:`vector<int> v = {1,2,3};
v.pop_back();
cout << v.size() << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい(末尾を1つ削除するメソッド)。",answers:["2"],explain:"pop_back()で末尾の要素が1つ削除されるので、3要素から2要素になります。"},{before:"int* arr = ",after:" int[5]; // サイズ5のint配列を動的に確保する",answers:["new"],explain:"newは実行時にメモリを動的に確保するための演算子です。"},{before:`vector<int> v = {1,2,3};
v.clear();
cout << v.size() << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい(全要素削除後)。",answers:["0"],explain:"clear()で全要素が削除されるので、size()は0になります。"},{before:`// vectorが内部で自動的に行ってくれる、new/deleteに相当する処理を何と呼ぶか(漢字で)
`,after:"",answers:["メモリ管理"],explain:"vectorは内部でメモリ管理を自動的に行ってくれるため、使う側がnew/deleteを書く必要がありません。"}],qsHard:[{type:"debug",before:`class ArrayCal{
  double* array;
public:
  ArrayCal(int n){ array = new double[n]; }
  ~ArrayCal(){ `,after:" array; } // 配列として確保したメモリを正しく解放する書き方に直しなさい",answers:["delete []","delete[]"],explain:"new double[n]のように配列としてメモリを確保した場合、解放するときもdelete []のように角括弧をつける必要があります。単体のdelete array;だけでは全要素分のメモリが正しく解放されず、未定義動作の原因になります。"},{type:"choice",lead:"vectorの特徴として正しいものを選びなさい。",options:["実行中に要素数を自由に増減できる","配列よりサイズが常に小さい","宣言時に必ずサイズを指定しなければならない","ポインタを一切使わずに実装されている"],answers:["実行中に要素数を自由に増減できる"],explain:"vectorは可変長配列で、push_back()を呼ぶたびに実行中に要素を増やしていけます。通常の配列は宣言時にサイズが固定されるのに対し、vectorはその不便さを解消するために内部で動的にメモリを管理してくれるクラスです。"},{type:"order",lines:[{label:"A",code:"int* p = new int[10];"},{label:"B",code:"// pを使った処理"},{label:"C",code:"delete [] p;"}],answers:["A,B,C"],explain:"動的にメモリを確保し(A)、それを使って処理を行い(B)、使い終わったら必ず解放します(C)。解放より前に使う、あるいは解放を忘れるとメモリリークになります。"},{type:"debug",before:`int* p = new int(5);
`,after:" p; // 単体で確保したメモリを解放する正しい書き方(角括弧なし)",answers:["delete"],explain:"new int(5)のように単体で確保したメモリは、delete p;のように角括弧なしのdeleteで解放します。"},{before:`vector<int> v = {1,2,3,4,5};
int count=0;
for(int i=0;i<v.size();i++){
  if(v[i]%2==0) count++;
}
cout << count << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい(偶数の個数)。",answers:["2"],explain:"{1,2,3,4,5}のうち偶数は2と4の2つなので、countは2になります。"},{type:"order",lines:[{label:"A",code:"int* arr = new int[5];"},{label:"B",code:"for(int i=0;i<5;i++){ arr[i]=i; }"},{label:"C",code:"delete [] arr;"}],answers:["A,B,C"],explain:"配列としてnewで確保し(A)、その領域を使い(B)、最後にdelete []で配列として解放します(C)。"},{type:"debug",before:`vector<int> v;
v.`,after:"(10); // 末尾に10を追加するメソッド",answers:["push_back"],explain:"push_back(10)は、vectorの末尾に10を追加するメソッドです。"},{type:"choice",lead:"vectorのclear()メソッドの説明として正しいものを選びなさい。",options:["全要素を削除して空にする","1つ目の要素だけ削除する","要素数を返す","vector自体を削除する"],answers:["全要素を削除して空にする"],explain:"clear()を呼ぶと、vectorの中身がすべて削除され要素数0の状態になります。"},{before:`vector<int> v;
cout << (v.size()==0) << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい(宣言直後は空なので)。",answers:["1"],explain:"宣言しただけのvectorは要素数0の空の状態なので、v.size()==0はtrue(=1)になります。"},{type:"order",lines:[{label:"A",code:"vector<int> v;"},{label:"B",code:`v.push_back(1);
v.push_back(2);`},{label:"C",code:"cout << v.size() << endl; // 2"}],answers:["A,B,C"],explain:"空のvectorを用意し(A)、2つ追加して(B)、要素数を出力します(C)。"},{before:`vector<int> v = {5,10,15};
cout << v.at(1) << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["10"],explain:"at(1)は添字1(2番目)の要素を返します。v[1]と同じ働きです。"},{type:"debug",before:`class Leaky{
public:
  Leaky(){ data = new int[100]; }
  int* data;
}; // デストラクタが無いためdataは解放されない。正しいデストラクタの宣言行を書きなさい
`,after:"",answers:["~Leaky(){ delete [] data; }"],explain:"newで確保したメモリに対応するデストラクタ(~Leaky)を定義し、delete []でarrayとして解放する必要があります。"},{type:"debug",before:`vector<int> v = {1,2,3};
v.`,after:"(); // 末尾の要素を削除するメソッド",answers:["pop_back"],explain:"pop_back()は、vectorの末尾の要素を1つ削除するメソッドです。"},{type:"order",lines:[{label:"A",code:`class ArrayCal{
  double* array;
public:
  ArrayCal(int n){ array=new double[n]; }`},{label:"B",code:`  ~ArrayCal(){ delete [] array; }
};`},{label:"C",code:"ArrayCal calc(5);"}],answers:["A,B,C"],explain:"コンストラクタでnewして確保し(A)、デストラクタで対応してdelete []する(B)クラスを定義し、オブジェクトを生成します(C)。"},{type:"choice",lead:"vectorが生の配列(new/delete管理)に比べて安全とされる理由として正しいものを選びなさい。",options:["内部で自動的にメモリを管理してくれるので解放し忘れの心配が少ない","必ず処理が高速になるから","要素数を変更できないから","ポインタを一切使わないから"],answers:["内部で自動的にメモリを管理してくれるので解放し忘れの心配が少ない"],explain:"vectorは内部でnew/deleteに相当する処理を自動的に行ってくれるため、使う側がdeleteを書き忘れる心配がありません。"}],qsExtra:[{before:`vector<int> v;
v.push_back(1);
v.push_back(2);
cout << v.`,after:"() << endl; // 現在の要素数を調べるメソッド",answers:["size"],explain:"vectorのsize()メソッドを呼ぶと、今その時点で入っている要素数を調べられます。push_backで要素を追加するたびにサイズが1ずつ増えていくので、size()の戻り値もそれに合わせて変化します。"},{before:`vector<int> v;
v.push_back(10);
cout << `,after:" << endl; // vの1番目の要素(添字0)にアクセスする式を書きなさい",answers:["v[0]"],explain:"vectorも配列と同じように[ ]を使って要素にアクセスできます。v[0]はvの先頭(1番目)の要素を意味し、普通の配列のa[0]と全く同じ感覚で読み書きできます。"},{type:"debug",long:!0,before:`class ArrayCal{
  double* array;
  int size;
public:
`,after:`
};`,lead:"サイズnぶんの配列を動的に確保するコンストラクタと、そのメモリを解放するデストラクタを、あわせて定義しなさい。",answers:[`ArrayCal(int n){ size=n; array=new double[n]; }
~ArrayCal(){ delete [] array; }`],explain:"コンストラクタでnew double[n]を使い、必要な分だけメモリを動的に確保してarrayに保持します。デストラクタでは、確保したときと対応させてdelete []で配列として解放します。「newしたら対応するdeleteをデストラクタに書く」というペアで覚えておきましょう。"},{type:"debug",long:!0,before:`#include <vector>
int sumVector(vector<int> v){
`,after:`
}`,lead:"vector<int>型の引数vを受け取り、全要素の合計をreturnする処理を書きなさい(v.size()で要素数を調べられる)。",answers:[`int sum=0;
for(int i=0;i<v.size();i++) sum+=v[i];
return sum;`],explain:"配列のときと同じ考え方で、sumを0で初期化してからfor文で全要素を足し込みます。配列と違い、vectorはv.size()で自分の要素数を教えてくれるので、別の引数でサイズを渡す必要がありません。"},{type:"choice",lead:"vectorを関数の引数として渡すとき、普通の配列と違って便利な点はどれか選びなさい。",options:["要素数の情報も一緒に持ち運べるので、別途サイズを渡す必要がない","ポインタとして扱われることが一切ない","必ずコピーされずに高速に渡される","sizeof(v)で常に正しい要素数が得られる"],answers:["要素数の情報も一緒に持ち運べるので、別途サイズを渡す必要がない"],explain:"配列を関数に渡すと先頭アドレスだけのポインタになってしまい、要素数を別の引数で渡す必要がありました。vectorはオブジェクトとして要素数の情報を自分自身の中に持っているため、v.size()を呼ぶだけで要素数が分かり、配列のときのような別引数が不要になります。"},{type:"order",lines:[{label:"A",code:"#include <vector>"},{label:"B",code:"vector<int> v;"},{label:"C",code:`v.push_back(1);
v.push_back(2);
v.push_back(3);`},{label:"D",code:"cout << v.size() << endl; // 3"}],lead:"3個の要素を追加してから要素数を出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"vectorヘッダを取り込み(A)、空のvectorを用意し(B)、push_backで要素を1つずつ追加していき(C)、最後にsize()で要素数を確認します(D)。3回push_backしたのでsize()は3を返します。"},{before:`vector<int> v;
if(v.`,after:'()==0){ cout << "empty" << endl; }',answers:["size"],explain:"v.size()は現在の要素数を返します。まだ何もpush_backしていなければ0を返すので、size()==0という条件でvectorが空かどうかを判定できます。"},{before:`class Bag{
  vector<int> items;
public:
  void add(int x){ items.push_back(x); }
  int count(){
`,after:`
  }
};`,lead:"countメソッドの中身に、itemsの要素数をreturnする処理を書きなさい。",answers:["return items.size();"],explain:"items(vector<int>型のメンバ)の要素数はitems.size()で調べられます。countメソッドはそれをそのままreturnするだけの単純なラッパーです。"},{type:"debug",long:!0,before:`class Bag{
  vector<int> items;
public:
  void add(int x){ items.push_back(x); }
`,after:`
};`,lead:"指定したインデックスiの要素をreturnするget(int i)メソッドを追加しなさい。",answers:["int get(int i){ return items[i]; }"],explain:"vectorも配列と同じように[ ]で要素にアクセスできます。get(int i)は、items[i]の値をそのままreturnするだけの、privateなitemsを外部から安全に読み取るための窓口です。"},{type:"choice",lead:"vectorが内部でメモリを動的に管理していることの利点として正しいものを選びなさい。",options:["使う側がnewやdeleteを意識せずに要素数を増減できる","必ず配列よりメモリ効率が良い","ポインタを一切使えなくなる","コンパイル時にサイズが決まる"],answers:["使う側がnewやdeleteを意識せずに要素数を増減できる"],explain:"vectorは内部で必要に応じて自動的にメモリを確保・解放してくれるので、使う側はnewやdeleteを一切書かずに、push_backするだけで要素数を自由に増やしていけます。"},{type:"order",lines:[{label:"A",code:"Bag bag;"},{label:"B",code:`bag.add(10);
bag.add(20);`},{label:"C",code:"cout << bag.get(1) << endl; // 20"}],lead:"Bagに2つの値を追加し、2番目の要素を取り出して出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"Bagオブジェクトを生成し(A)、2つの値を追加してから(B)、添字1(2番目)の要素をget(1)で取り出して出力します(C)。add順に0番目が10、1番目が20なので、20が表示されます。"},{before:`class Logger{
public:
  `,after:`(){ cout << "終了" << endl; }
}; // デストラクタの名前の書き方(クラス名の前に~)`,answers:["~Logger"],explain:"デストラクタはクラス名の前に~をつけた名前で定義します。~Logger(){ ... }は、Loggerオブジェクトが消滅するときに自動的に呼ばれます。"},{before:`vector<int> v={1,2,3};
for(int i=0;i<v.size();i++){
  `,after:`;
}`,answers:["cout << v[i] << endl"],explain:"v.size()でvectorの要素数を調べ、v[i]で1つずつ要素を取り出しながら出力します。配列のときと全く同じforループの書き方が使えます。"},{type:"choice",lead:"vector<int> v; の宣言直後、v.size()は何を返すか選びなさい。",options:["0","未定義の値","1","エラーになる"],answers:["0"],explain:"宣言しただけのvectorは要素数0の空の状態で始まります。そのためv.size()は0を返します。push_backするたびにこの値が1つずつ増えていきます。"},{type:"debug",long:!0,before:`class History{
  vector<int> items;
public:
  void add(int x){ items.push_back(x); }
`,after:`
};`,lead:"itemsの最後に追加された要素をreturnするgetLast()メソッドを追加しなさい(items.size()-1が最後の添字です)。",answers:["int getLast(){ return items[items.size()-1]; }"],explain:"vectorの最後の要素の添字は、要素数から1引いたitems.size()-1です。items[items.size()-1]で、最後にpush_backされた値を取り出せます。"},{before:`History h;
h.add(10);
h.add(20);
cout << h.`,after:"() << endl; // 20が表示される",answers:["getLast"],explain:"add(10)、add(20)の順に追加したので、最後に追加された要素は20です。getLast()を呼ぶとその20が返ります。"},{before:`int* p = new int(5);
cout << *p << endl;
`,after:" p; // 動的に確保した単体のintを解放する",answers:["delete"],explain:"new int(5)のように単体の変数として確保したメモリは、delete p;のように角括弧なしのdeleteで解放します。配列として確保した場合(new int[n])だけ、delete []のように角括弧をつける必要があります。"},{type:"order",lines:[{label:"A",code:"History h;"},{label:"B",code:`h.add(1);
h.add(2);
h.add(3);`},{label:"C",code:"cout << h.getLast() << endl; // 3"}],lead:"3つの値を追加し、最後に追加した値を出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"オブジェクトを生成し(A)、3つの値を順番に追加し(B)、最後に追加された値(3)をgetLast()で出力します(C)。"},{type:"choice",lead:"クラスにデストラクタを自分で書かなかった場合どうなるか選びなさい。",options:["何もしないデストラクタが自動的に用意される","コンパイルエラーになる","コンストラクタも使えなくなる","必ずメモリリークが起きる"],answers:["何もしないデストラクタが自動的に用意される"],explain:"デストラクタを自分で書かなくても、コンパイラが何もしない(空の)デストラクタを自動的に用意してくれます。ただしnewで確保したメモリを解放する処理などは自動では行われないため、必要な場合は自分でデストラクタを書く必要があります。"},{before:`vector<double> v={1.5,2.5,3.0};
double total=0;
for(int i=0;i<v.size();i++){
  total += `,after:`;
}`,answers:["v[i]"],explain:"v[i]でvectorの各要素に1つずつアクセスし、totalに足し込んでいきます。vector<double>でも配列と同じ添字アクセスがそのまま使えます。"},{type:"debug",long:!0,before:`class ArrayCal{
  double* array;
  int size;
public:
  ArrayCal(int n){ size=n; array=new double[n]; }
  ~ArrayCal(){ delete [] array; }
`,after:`
};`,lead:"fillメソッドを追加し、array内の全要素を引数vの値にする処理を書きなさい。",answers:["void fill(double v){ for(int i=0;i<size;i++){ array[i]=v; } }"],explain:"保存しておいたsizeを使ってforループを回し、array[i]すべてに同じ値vを代入していきます。"},{before:`vector<int> v={1,2,3};
v = `,after:"; // vを空にする",answers:["{}"],explain:"vectorは普通の変数と同じように再代入でき、空の{ }を代入すれば中身をすべて空にできます。"},{type:"choice",lead:"newで確保したメモリの解放し忘れを防ぐために、vectorのような標準ライブラリのクラスを使う利点は何か選びなさい。",options:["内部で自動的にメモリを管理してくれるので解放し忘れの心配が少ない","必ず配列よりサイズが小さくなる","newが一切使えなくなる","コンパイルが速くなる"],answers:["内部で自動的にメモリを管理してくれるので解放し忘れの心配が少ない"],explain:"vectorは内部でnew/deleteに相当する処理を自動的に行ってくれるため、使う側がdeleteを書き忘れてメモリリークを起こす心配がありません。自分でnew/deleteを管理するより安全に扱えます。"},{before:`vector<int> v={1,2,3};
v.push_back(4);
cout << v.size() << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["4"],explain:"{1,2,3}の3要素にpush_back(4)で1つ追加されるので、要素数は4になります。"},{before:`vector<int> v={1,2,3};
v.pop_back();
cout << v.size() << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい(末尾の要素を1つ削除するメソッド)。",answers:["2"],explain:"pop_back()は末尾の要素を1つ削除するメソッドです。3要素から1つ減って2になります。"},{before:`vector<int> v={1,2,3};
cout << v.`,after:"() << endl; // 全要素を削除して空にするメソッド",answers:["clear"],explain:"clear()を呼ぶと、vectorの中身をすべて削除して空(size()が0)の状態にできます。"},{before:`vector<int> v;
cout << v.`,after:"() << endl; // 要素が1つもないかどうかをbool型で調べるメソッド",answers:["empty"],explain:"empty()は要素数が0であればtrue、そうでなければfalseを返すメソッドです。v.size()==0と同じ意味ですが、より簡潔に書けます。"},{before:`vector<int> v={5,10,15};
cout << v.at(1) << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["10"],explain:"at(1)は添字1(2番目)の要素を返します。v[1]と同じ働きです。"},{before:`vector<int> v={1,2,3,4,5};
int sum=0;
for(int i=0;i<v.size();i++) sum+=v[i];
cout << sum << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["15"],explain:"1+2+3+4+5=15です。"},{before:`vector<string> names;
names.push_back("Alice");
names.push_back("Bob");
cout << names[1] << endl; // `,after:"",lead:"出力される内容を書きなさい。",answers:["Bob"],explain:'添字は0から始まるので、names[1]は2番目に追加された"Bob"です。'},{before:`vector<int> v={1,2,3};
v[1] = 99;
cout << v[1] << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい(添字アクセスでの上書き)。",answers:["99"],explain:"v[1]に99を代入したので、その後v[1]を読み出すと99になっています。vectorは配列と同じように添字で読み書きできます。"},{before:`class TodoList{
  vector<string> tasks;
public:
  void addTask(string t){
`,after:`
  }
};`,lead:"addTaskメソッドの中身に、tasksの末尾にtを追加する処理を書きなさい。",answers:["tasks.push_back(t);"],explain:"push_back(t)で、vectorの末尾にtを追加できます。"},{before:`class TodoList{
  vector<string> tasks;
public:
  void addTask(string t){ tasks.push_back(t); }
  int count(){
`,after:`
  }
};`,lead:"countメソッドの中身に、tasksの要素数をreturnする処理を書きなさい。",answers:["return tasks.size();"],explain:"tasks.size()で現在の要素数がわかるので、それをそのままreturnします。"},{before:`class TodoList{
  vector<string> tasks;
public:
  void addTask(string t){ tasks.push_back(t); }
  string getTask(int i){
`,after:`
  }
};`,lead:"getTaskメソッドの中身に、tasksのi番目の要素をreturnする処理を書きなさい。",answers:["return tasks[i];"],explain:"tasks[i]で添字iの要素にアクセスし、そのままreturnします。"},{before:`class ShoppingCart{
  vector<int> prices;
public:
  void addItem(int p){ prices.push_back(p); }
  int total(){
`,after:`
  }
};`,lead:"totalメソッドの中身に、pricesの合計をreturnする処理を書きなさい。",answers:[`int sum=0;
for(int i=0;i<prices.size();i++){
sum+=prices[i];
}
return sum;`],explain:"sumを0で初期化し、全要素を足し込んでからreturnする、配列のときと同じ集計パターンです。"},{before:`ShoppingCart cart;
cart.addItem(300);
cart.addItem(500);
cout << cart.total() << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["800"],explain:"300+500=800です。"},{before:`class Playlist{
  vector<string> songs;
public:
  void add(string s){ songs.push_back(s); }
  bool contains(string s){
`,after:`
  }
};`,lead:"containsメソッドの中身に、songsの中にsと一致する要素があればtrueをreturnする処理を書きなさい。",answers:[`for(int i=0;i<songs.size();i++){
if(songs[i]==s) return true;
}
return false;`],explain:"一致する要素が見つかった時点でtrueをreturnし、最後まで見つからなければfalseをreturnします。"},{before:`int* p = new int(10);
cout << *p << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["10"],explain:"new int(10)は、値10で初期化されたintを動的に確保します。*pでその値を取り出せます。"},{before:`int* p = new int(10);
delete p;
// pが指していたメモリはどうなったか(日本語で簡潔に)
`,after:"",answers:["解放された","メモリが解放された"],explain:"deleteを実行すると、newで確保したメモリがシステムに返却(解放)されます。"},{before:`int* arr = new int[5];
`,after:"; // arrを配列として解放する",answers:["delete [] arr"],explain:"new int[5]のように配列として確保したメモリは、delete [] arr;のように角括弧をつけて解放する必要があります。"},{before:`double* p = new double(3.14);
cout << *p << endl; // `,after:"",lead:"出力される値を書きなさい。",answers:["3.14"],explain:"new double(3.14)で確保した値3.14を、*pで取り出して出力しています。"},{before:`class Node{
public:
  int value;
  Node(int v){ value=v; }
  `,after:`(){ cout << "破棄" << endl; }
}; // デストラクタの書き方`,answers:["~Node"],explain:"デストラクタはクラス名の前に~をつけた名前(~Node)で定義し、オブジェクトが消滅するときに自動的に呼ばれます。"},{before:`class Resource{
  int* data;
public:
  Resource(){ data = new int[100]; }
  `,after:`(){ delete [] data; }
}; // デストラクタ名`,answers:["~Resource"],explain:"コンストラクタでnewしたメモリを、対応するデストラクタ(~Resource)でdelete []して解放するペアの書き方です。"},{type:"choice",lead:"デストラクタが自動的に呼ばれるタイミングとして正しいものを選びなさい。",options:["オブジェクトが消滅する(スコープを抜けるなど)とき","オブジェクトを生成した直後","プログラムの開始時","メンバ関数を呼んだとき"],answers:["オブジェクトが消滅する(スコープを抜けるなど)とき"],explain:"デストラクタは、オブジェクトが役目を終えて消滅する瞬間(関数のスコープを抜ける、deleteされるなど)に自動的に呼ばれ、後片付けの処理を行います。"},{type:"choice",lead:"newで確保した単体の変数とnewで確保した配列を、それぞれ正しく解放する組み合わせを選びなさい。",options:["単体はdelete、配列はdelete []","どちらもdeleteでよい","どちらもdelete []が必要","単体はdelete []、配列はdelete"],answers:["単体はdelete、配列はdelete []"],explain:"new int(5)のような単体はdelete、new int[n]のような配列はdelete []と、確保した方法に対応する形で解放する必要があります。"},{type:"choice",lead:"vectorのpush_back(x)の説明として正しいものを選びなさい。",options:["末尾にxを追加し、要素数を1増やす","先頭にxを追加する","xと同じ値をすべて削除する","要素数を1減らす"],answers:["末尾にxを追加し、要素数を1増やす"],explain:"push_back(x)は、vectorの一番後ろにxを追加するメソッドで、呼ぶたびに要素数(size())が1増えます。"},{type:"choice",lead:"vectorに比べて、生の配列(new int[n])を自分でnew/deleteで管理する場合のリスクとして正しいものを選びなさい。",options:["deleteを書き忘れるとメモリリークが起きる","必ず処理が遅くなる","要素数を変更できない","添字アクセスができない"],answers:["deleteを書き忘れるとメモリリークが起きる"],explain:"自分でnewとdeleteを管理する場合、deleteを書き忘れると確保したメモリが解放されないまま残り続ける「メモリリーク」が発生します。vectorはこれを自動化してくれます。"},{type:"choice",lead:"vector<int> v; の宣言直後、要素数はいくつか選びなさい。",options:["0","1","未定義","エラー"],answers:["0"],explain:"宣言しただけのvectorは空の状態で始まり、要素数(size())は0です。"},{type:"choice",lead:"デストラクタを自分で定義しない場合の挙動として正しいものを選びなさい。",options:["コンパイラが何もしない空のデストラクタを自動生成する","コンパイルエラーになる","コンストラクタも自動的に無効化される","必ずメモリリークが起きる"],answers:["コンパイラが何もしない空のデストラクタを自動生成する"],explain:"デストラクタを書かなくても、コンパイラが自動的に何もしない空のデストラクタを用意してくれます。ただしnewしたメモリの解放などは自分で書く必要があります。"},{type:"order",lines:[{label:"A",code:"vector<int> v;"},{label:"B",code:`v.push_back(1);
v.push_back(2);`},{label:"C",code:"v.pop_back();"},{label:"D",code:"cout << v.size() << endl; // 1"}],lead:"2つ追加してから1つ削除し、要素数を出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"空のvectorを用意し(A)、2つ追加して要素数2にし(B)、pop_backで1つ削除して要素数1になり(C)、その1を出力します(D)。"},{type:"order",lines:[{label:"A",code:"int* p = new int(5);"},{label:"B",code:"cout << *p << endl;"},{label:"C",code:"delete p;"}],lead:"動的にメモリを確保し、値を出力してから解放するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"newで確保し(A)、その値を使い(B)、最後にdeleteで解放します(C)。使い終わったメモリは必ず解放するのが基本です。"},{type:"order",lines:[{label:"A",code:"TodoList list;"},{label:"B",code:`list.addTask("勉強");
list.addTask("運動");`},{label:"C",code:"cout << list.count() << endl; // 2"}],lead:"TodoListに2つのタスクを追加し、件数を出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"オブジェクトを生成し(A)、2つのタスクを追加してから(B)、count()で件数(2)を出力します(C)。"},{type:"debug",long:!0,before:`class Queue{
  vector<int> data;
public:
  void enqueue(int x){ data.push_back(x); }
  int dequeue(){
`,after:`
  }
};`,lead:"dequeueメソッドの中身に、先頭要素(data[0])を取り出してから、その要素を削除し、取り出した値をreturnする処理を書きなさい(vectorの先頭削除にはerase(data.begin())が使える)。",answers:[`int front = data[0];
data.erase(data.begin());
return front;`],explain:"先頭の値を変数frontに保存してから、erase(data.begin())で先頭要素をvectorから取り除き、最後にfrontをreturnします。キュー(先入れ先出し)の取り出し処理の基本形です。"},{type:"debug",long:!0,before:`class Average{
  vector<double> values;
public:
  void add(double v){ values.push_back(v); }
  double average(){
`,after:`
  }
};`,lead:"averageメソッドの中身に、valuesの平均値をreturnする処理を書きなさい(合計÷要素数)。",answers:[`double sum=0;
for(int i=0;i<values.size();i++){
sum+=values[i];
}
return sum/values.size();`],explain:"全要素を合計してから、要素数(values.size())で割ることで平均値が求まります。"},{type:"debug",long:!0,before:`class MaxTracker{
  vector<int> values;
public:
  void add(int v){ values.push_back(v); }
  int getMax(){
`,after:`
  }
};`,lead:"getMaxメソッドの中身に、valuesの中の最大値をreturnする処理を書きなさい。",answers:[`int maxVal = values[0];
for(int i=1;i<values.size();i++){
if(values[i]>maxVal) maxVal=values[i];
}
return maxVal;`],explain:"先頭の値を仮の最大値とし、残りの要素と比較しながらmaxValを更新していく、配列での最大値探索と同じ考え方です。"},{type:"debug",long:!0,before:`class UniqueChecker{
  vector<int> values;
public:
  bool addIfNew(int v){
`,after:`
  }
};`,lead:"addIfNewメソッドの中身に、vがまだvaluesに含まれていなければpush_backしてtrueをreturn、すでに含まれていればfalseをreturnする処理を書きなさい。",answers:[`for(int i=0;i<values.size();i++){
if(values[i]==v) return false;
}
values.push_back(v);
return true;`],explain:"既存の要素を調べて一致するものがあれば即falseをreturnし、なければpush_backしてtrueをreturnします。重複を防ぎながら追加する典型的な処理です。"},{type:"debug",long:!0,before:`class DynamicArray{
  int* data;
  int len;
public:
  DynamicArray(int n){ len=n; data=new int[n]; for(int i=0;i<n;i++){ data[i]=0; } }
  ~DynamicArray(){ delete [] data; }
`,after:`
};`,lead:"指定したインデックスiの値をvに設定するset(int i, int v)メソッドと、値を読み取るget(int i)メソッドを、あわせて定義しなさい。",answers:[`void set(int i, int v){ data[i]=v; }
int get(int i){ return data[i]; }`],explain:"動的に確保したdata配列に対しても、data[i]で普通の配列と同じように読み書きできます。"},{before:`DynamicArray arr(5);
arr.set(0,10);
arr.set(1,20);
cout << arr.get(0) + arr.get(1) << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["30"],explain:"10+20=30です。"},{type:"debug",long:!0,before:`class ScoreList{
  vector<int> scores;
public:
  void add(int s){ scores.push_back(s); }
  int countPassing(int passLine){
`,after:`
  }
};`,lead:"countPassingメソッドの中身に、scoresの中でpassLine以上の要素の個数をreturnする処理を書きなさい。",answers:[`int count=0;
for(int i=0;i<scores.size();i++){
if(scores[i]>=passLine) count++;
}
return count;`],explain:"条件(passLine以上)を満たすたびにcountを1増やし、最後にreturnします。"},{type:"debug",long:!0,before:`class Buffer{
  int* data;
  int capacity;
public:
  Buffer(int cap){ capacity=cap; data=new int[cap]; }
  ~Buffer(){
`,after:`
  }
};`,lead:"デストラクタの中身に、dataを配列として解放する処理を書きなさい。",answers:["delete [] data;"],explain:"コンストラクタでnew int[cap]と配列で確保しているので、対応してdelete []で解放する必要があります。"},{before:`vector<int> v={1,2,3};
v.push_back(4);
v.pop_back();
cout << v.size() << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい(追加してからすぐ削除しているので元と同じ)。",answers:["3"],explain:"push_backで4増えて4要素、pop_backで1減って3要素に戻ります。"},{type:"debug",long:!0,before:`class Wallet{
  vector<int> transactions;
public:
  void record(int amount){ transactions.push_back(amount); }
  int lastTransaction(){
`,after:`
  }
};`,lead:"lastTransactionメソッドの中身に、transactionsの最後の要素をreturnする処理を書きなさい(size()-1が最後の添字)。",answers:["return transactions[transactions.size()-1];"],explain:"最後の要素の添字は要素数から1引いたtransactions.size()-1なので、その位置の値をreturnします。"},{before:`int* p = nullptr;
if(p == `,after:'){ cout << "何も指していない" << endl; }',answers:["nullptr"],explain:"nullptrは「何も指していない」ことを表す特別な値で、ポインタと比較して初期化されているかどうかを確認するのによく使われます。"},{before:`class SafeArray{
  int* data;
  int len;
public:
  SafeArray(int n){ len=n; data=new int[n]; }
  ~SafeArray(){ delete [] data; }
  int getLen(){ `,after:`; }
};`,lead:"getLenメソッドの中身に、lenをreturnする処理を書きなさい。",answers:["return len"],explain:"保存しておいたlenの値をそのままreturnし、外部から配列のサイズを確認できるようにします。"}],qsExpert:[{type:"debug",long:!0,before:`class ArrayCal{
  double* array;
  int size;
public:
  ArrayCal(int n){ size=n; array=new double[n]; for(int i=0;i<n;i++) array[i]=0; }
  ~ArrayCal(){ delete [] array; }
  void set(int i, double v){ array[i]=v; }
  double get(int i){ return array[i]; }
};
int main(){
`,after:`
  return 0;
}`,lead:"サイズ3のArrayCalオブジェクトcalcを生成し、set(0,1.5)を呼んでから、get(0)の結果を出力する処理を書きなさい。",answers:[`ArrayCal calc(3);
calc.set(0,1.5);
cout << calc.get(0) << endl;`],explain:"コンストラクタでサイズ3の配列がnewで確保され、全要素が0で初期化されます。set(0,1.5)でarray[0]に1.5を書き込み、get(0)でそれを読み取って出力します。calcがブロックを抜けるときには、デストラクタが自動的にdelete []でメモリを解放してくれます。"},{type:"debug",long:!0,before:`class ArrayCal{
  double* array;
  int size;
public:
  ArrayCal(int n){ size=n; array=new double[n]; }
  ~ArrayCal(){ delete [] array; }
  void set(int i, double v){ array[i]=v; }
  double sum(){
`,after:`
  }
};`,lead:"sumメソッドの中身に、arrayのsize個ぶんの合計をreturnする処理を書きなさい。",answers:[`double total=0;
for(int i=0;i<size;i++){
total+=array[i];
}
return total;`],explain:"配列の合計を求めるときと同じ考え方で、totalを0で初期化してからfor文でarray[0]からarray[size-1]までを足し込みます。sizeはコンストラクタで保存しておいたメンバなので、このメソッドの中からもそのまま使えます。"},{type:"debug",long:!0,before:`#include <vector>
class ScoreBoard{
  vector<int> scores;
public:
  void add(int s){ scores.push_back(s); }
  int count(){ return scores.size(); }
};
int main(){
`,after:`
  return 0;
}`,lead:"boardという名前のScoreBoardを生成し、add(80)、add(90)、add(70)を呼んでから、count()の結果を出力する処理を書きなさい。",answers:[`ScoreBoard board;
board.add(80);
board.add(90);
board.add(70);
cout << board.count() << endl;`],explain:"ScoreBoardは内部にvector<int>を持ち、add()を呼ぶたびにpush_backで要素が1つ増えていきます。3回addを呼んだあとのcount()(内部のscores.size())は3を返します。vectorをクラスの内部に隠し、addやcountのような専用メソッドを通してだけ操作させる、カプセル化の実践例です。"},{type:"debug",long:!0,before:`class Logger{
public:
  Logger(){ cout << "生成された" << endl; }
  ~Logger(){ cout << "消滅した" << endl; }
};
int main(){
`,after:`
  return 0;
}`,lead:"{ }で囲まれたブロックの中でLoggerオブジェクトを1つ生成し、ブロックを抜けたときに自動でデストラクタが呼ばれる(「消滅した」が表示される)ことを確認するコードを書きなさい。",answers:[`{
Logger log;
}`],explain:"ローカル変数として作られたオブジェクトは、それが宣言されたブロック({ })の終わりに達すると自動的に消滅し、そのタイミングでデストラクタが呼ばれます。この場合、{ }の中でlogが生成された瞬間に「生成された」が、}に到達してlogが消滅する瞬間に「消滅した」が表示されます。"},{type:"debug",long:!0,before:`#include <vector>
#include <string>
using namespace std;
class Hero{
  string name;
public:
  Hero(string n){ name=n; }
  string getName(){ return name; }
};
int main(){
  vector<Hero> party;
`,after:`
  return 0;
}`,lead:'party(vector<Hero>型)に、Hero("A")、Hero("B")の2人をpush_backで追加したあと、party[0]とparty[1]それぞれのgetName()の結果を1行ずつ出力する処理を書きなさい。',answers:[`party.push_back(Hero("A"));
party.push_back(Hero("B"));
cout << party[0].getName() << endl;
cout << party[1].getName() << endl;`],explain:'vector<int>がint型の値を並べて持てたのと同じように、vector<Hero>はHero型のオブジェクトを何個でも並べて持てます。push_back(Hero("A"))のように、その場で生成したオブジェクトをそのまま追加でき、party[0]のように添字でオブジェクトを取り出してメンバ関数を呼べます。'},{type:"debug",long:!0,before:`class ArrayCal{
  double* array;
  int size;
public:
  ArrayCal(int n){ size=n; array=new double[n]; }
  ~ArrayCal(){ delete [] array; }
  void set(int i, double v){ array[i]=v; }
  double getMax(){
`,after:`
  }
};`,lead:"getMaxメソッドの中身に、array内のsize個の要素の最大値をreturnする処理を書きなさい。",answers:[`double maxVal = array[0];
for(int i=1;i<size;i++){
if(array[i]>maxVal) maxVal=array[i];
}
return maxVal;`],explain:"配列の最大値探しと同じ考え方を、動的に確保したarrayに適用します。sizeはコンストラクタで保存されたメンバなので、そのままループの範囲に使えます。"},{type:"debug",long:!0,before:`#include <vector>
class Stack{
  vector<int> data;
public:
  void push(int x){ data.push_back(x); }
  void pop(){
`,after:`
  }
  int top(){ return data[data.size()-1]; }
};`,lead:"popメソッドの中身に、dataの末尾の要素を削除する処理を書きなさい(pop_backを使う)。",answers:["data.pop_back();"],explain:"pop_back()はvectorの末尾の要素を1つ削除するメソッドです。"},{type:"debug",long:!0,before:`#include <vector>
class Stack{
  vector<int> data;
public:
  void push(int x){ data.push_back(x); }
  void pop(){ data.pop_back(); }
  int top(){ return data[data.size()-1]; }
};
int main(){
`,after:`
  return 0;
}`,lead:"sというStackを生成し、push(1)、push(2)、push(3)を呼んでからpop()を1回呼び、top()の結果を出力する処理を書きなさい(2になるはず)。",answers:[`Stack s;
s.push(1);
s.push(2);
s.push(3);
s.pop();
cout << s.top() << endl;`],explain:"push(1),push(2),push(3)の順でdataは{1,2,3}になり、pop()で末尾の3が削除されて{1,2}になります。top()は末尾の要素(2)を返します。"},{type:"debug",long:!0,before:`#include <vector>
#include <string>
using namespace std;
class Hero{
  string name;
public:
  Hero(string n){ name=n; }
  string getName(){ return name; }
};
int main(){
  vector<Hero> party;
  party.push_back(Hero("A"));
  party.push_back(Hero("B"));
  party.push_back(Hero("C"));
`,after:`
  return 0;
}`,lead:"partyの人数(size())と、for文で全員の名前を1行ずつ出力する処理を書きなさい。",answers:[`cout << party.size() << endl;
for(int i=0;i<party.size();i++){
cout << party[i].getName() << endl;
}`],explain:"party.size()でHeroオブジェクトの人数がわかり、party[i].getName()のように添字でオブジェクトを取り出してメンバ関数を呼べます。"},{type:"debug",long:!0,before:`class Logger{
  string name;
public:
  Logger(string n){ name=n; cout << name << "生成" << endl; }
  ~Logger(){ cout << name << "消滅" << endl; }
};
int main(){
`,after:`
  return 0;
}`,lead:'{ }で囲まれたブロックの中でLogger("A")というオブジェクトlogAを生成し、ブロックの外でLogger("B")というオブジェクトlogBを生成する処理を書きなさい(logAはブロックを抜けた時点で消滅する)。',answers:[`{
Logger logA("A");
}
Logger logB("B");`],explain:"logAはブロック{ }の中だけで生きる変数なので、そのブロックを抜けた瞬間にデストラクタが呼ばれ「A消滅」が表示されます。logBはmain関数が終わるまで生き続けます。"},{type:"debug",long:!0,before:`#include <vector>
class Inventory{
  vector<int> items;
public:
  void add(int x){ items.push_back(x); }
  void clearAll(){
`,after:`
  }
  int count(){ return items.size(); }
};`,lead:"clearAllメソッドの中身に、itemsを空にする処理を書きなさい(clear()を使う)。",answers:["items.clear();"],explain:"clear()を呼ぶと、vectorの中身がすべて削除され要素数0の状態になります。"},{type:"debug",long:!0,before:`#include <vector>
class Inventory{
  vector<int> items;
public:
  void add(int x){ items.push_back(x); }
  void clearAll(){ items.clear(); }
  int count(){ return items.size(); }
};
int main(){
`,after:`
  return 0;
}`,lead:"invというInventoryにadd(1),add(2)を呼んでからclearAll()を呼び、count()の結果を出力する処理を書きなさい(0になるはず)。",answers:[`Inventory inv;
inv.add(1);
inv.add(2);
inv.clearAll();
cout << inv.count() << endl;`],explain:"add()で2つ追加されたあと、clearAll()ですべて削除されるため、count()は0を返します。"},{type:"debug",long:!0,before:`class ArrayCal{
  double* array;
  int size;
public:
  ArrayCal(int n){ size=n; array=new double[n]; }
  ~ArrayCal(){ delete [] array; }
  void fillAll(double v){
`,after:`
  }
  double get(int i){ return array[i]; }
};`,lead:"fillAllメソッドの中身に、array内の全要素をvにする処理を書きなさい。",answers:[`for(int i=0;i<size;i++){
array[i]=v;
}`],explain:"sizeぶんのループを回し、arrayのすべての要素に同じ値vを代入します。"},{type:"debug",long:!0,before:`class ArrayCal{
  double* array;
  int size;
public:
  ArrayCal(int n){ size=n; array=new double[n]; }
  ~ArrayCal(){ delete [] array; }
  void fillAll(double v){ for(int i=0;i<size;i++){ array[i]=v; } }
  double get(int i){ return array[i]; }
};
int main(){
`,after:`
  return 0;
}`,lead:"サイズ3のArrayCal calcを生成し、fillAll(9.9)を呼んでから、get(2)の結果を出力する処理を書きなさい。",answers:[`ArrayCal calc(3);
calc.fillAll(9.9);
cout << calc.get(2) << endl;`],explain:"fillAll(9.9)によって全要素が9.9になるので、どの添字をget()で読み取っても9.9が返ります。"},{type:"debug",long:!0,before:`#include <vector>
#include <string>
using namespace std;
class Hero{
  string name;
public:
  Hero(string n){ name=n; }
  string getName(){ return name; }
};
bool hasHero(vector<Hero> party, string target){
`,after:`
}`,lead:"party(vector<Hero>)の中にgetName()がtargetと一致するHeroがいればtrueをreturnする処理を書きなさい。",answers:[`for(int i=0;i<party.size();i++){
if(party[i].getName()==target) return true;
}
return false;`],explain:"partyの各要素についてgetName()を呼び、targetと一致するものが見つかった時点でtrueをreturnします。"}],qsDrag:[{type:"dragfill",lead:"動的配列を確保するコンストラクタと、正しく解放するデストラクタになるよう、正しいピースを空欄に配置しなさい。",lines:[{code:"class ArrayCal{"},{code:"  double* array;"},{code:"public:"},{blank:"b1"},{blank:"b2"},{code:"};"}],pieces:[{id:"p1",code:"ArrayCal(int n){ array = new double[n]; }"},{id:"p2",code:"~ArrayCal(){ delete [] array; }"},{id:"p3",code:"~ArrayCal(){ delete array; }"}],answerMap:{b1:"p1",b2:"p2"},explain:"コンストラクタでnew double[n]のように配列として確保したメモリは(p1)、デストラクタでもdelete []のように角括弧をつけて解放する必要があります(p2)。p3のように単体のdeleteだけで解放しようとすると、配列全体が正しく解放されず未定義動作の原因になります。"}]},{id:"wa",title:"CASE 10「受け継がれた秘密」",sub:"Week A 継承",emoji:"🧬",mon:"親の機能を引き継いだ者",lesson:[{title:"継承の基本",code:`class Base{
public:
  int baseFunc(){ return 1; }
};
class Derived : public Base{
public:
  int drvFunc(){ return 2; }
};`,explain:"すでにあるクラス(Base)の機能をそのまま引き継いで、新しい機能を追加した別のクラス(Derived)を作ることを「継承」と呼びます。class Derived : public Base{ ... }; という書き方で、DerivedはBaseを継承します。この結果、DerivedのオブジェクトはBaseで定義されているpublicなメンバ関数(baseFuncなど)を、まるで自分自身が最初から持っているメンバであるかのように、そのまま呼び出すことができます。継承元のBaseを「基本クラス(親クラス)」、継承したDerivedを「派生クラス(子クラス)」と呼びます。同じような機能を一から書き直す必要がなくなるので、プログラムの再利用性が大きく高まります。"},{title:"イニシャライザで基本クラスを初期化",code:`class Derived : public Base{
  int drvData;
public:
  Derived(int a,int b):Base(a){ drvData=b; }
};`,explain:"派生クラスDerivedのオブジェクトは、内部にBaseから引き継いだ部分(baseDataなど)と、Derived自身が新しく追加した部分(drvData)の両方を持っています。そのためDerivedのコンストラクタは、この両方を初期化してあげる責任があります。Derived(int a,int b):Base(a){ drvData=b; } のように、コンストラクタの本体{ }が始まる前に : Base(a) という「イニシャライザ(初期化子)」を書いておくと、まず基本クラスBaseのコンストラクタが呼ばれてbaseData部分の初期化が行われ、そのあとに{ }の中でdrvDataの初期化が実行される、という順序で処理が進みます。「継承した部分の初期化は、基本クラスのコンストラクタに任せる」というイメージです。"},{title:"オーバーライド",code:`class Derived : public Base{
public:
  void show(){ cout << "Derived" << endl; } // Baseのshowを上書き
};`,explain:"基本クラスBaseに何かメンバ関数showがすでに定義されていたとして、それと全く同じ名前・同じ引数の関数を派生クラスDerivedの中でもう一度定義することを「オーバーライド」と呼びます。オーバーライドすると、派生クラスのオブジェクト(Derivedのインスタンス)に対してshow()を呼び出したときは、基本クラス側の定義は無視され、派生クラス側で新しく書いた定義が優先して実行されます。「基本クラスが持っていた機能を、派生クラスで自分好みに上書き(オーバーライド)する」というイメージです。名前が同じでも引数の型や数が違う場合は「オーバーライド」ではなく「オーバーロード」という別の仕組みになる点にも注意しましょう。"}],qs:[{before:`class Base{
public:
  int baseFunc();
};
class Derived : `,after:` Base{
public:
  int drvFunc();
}; // Baseクラスを継承したい`,answers:["public"],explain:"class Derived : public Base { ... }; と書くことで、DerivedクラスはBaseクラスを継承します。この構文では、クラス名(Derived)の後ろにコロン(:)を書き、続けてアクセス指定子(多くの場合public)を書き、最後に継承したい基本クラス名(Base)を書きます。この1行のおかげで、Derivedは自分では何も書いていなくても、Baseが持っているpublicなメンバ(baseFuncなど)をそのまま自分のもののように呼び出せるようになります。まさに親から子へ財産や才能が受け継がれる「継承(遺産相続)」のようなイメージで捉えると、なぜこの機能がinheritance(継承)と呼ばれるのか納得しやすいでしょう。"},{before:`class Derived : public Base{
  int drvData;
public:
  Derived(int a, int b)`,after:`(a){
    drvData = b;
  } // 基本クラスのコンストラクタを呼び出す部分(イニシャライザ)`,answers:[":Base",": Base"],explain:"派生クラスDerivedのオブジェクトは、内部に「基本クラスBaseの部分」と「派生クラスDerived自身が追加した部分」の両方を持っています。派生クラスのコンストラクタは、この両方をきちんと初期化する責任がありますが、基本クラスの部分の初期化はBase自身のコンストラクタにやってもらうのが自然です。そのために使うのが「イニシャライザ」と呼ばれる書き方で、コンストラクタの定義(引数リストの後ろ)に : Base(引数) と書いておくと、コンストラクタ本体{ }が実行される前に、まず指定した引数でBaseのコンストラクタが呼び出されます。この仕組みのおかげで、Derivedのコンストラクタでは自分が追加したdrvDataの初期化だけを書けばよくなります。"},{before:`class Base{
`,after:`:
  int baseData; // 派生クラスからはアクセスできるが、外部関数からはアクセスできないようにする指定子
public:
  int baseFunc();
};`,answers:["protected"],explain:"もしbaseDataをprivateにしてしまうと、それを継承したDerivedのメンバ関数からでさえも、baseDataを直接使うことができなくなってしまいます。しかしBaseの外部にある関数(mainなど)からは今まで通りアクセスさせたくない、というときに使うのがprotectedです。protectedにしておくと、Base自身のメンバ関数はもちろん、Baseを継承したDerivedのメンバ関数からも直接アクセスできる一方、それ以外の外部の関数からはprivateと同じようにアクセスできません。「基本クラスと、その子どもである派生クラスの間だけでデータを共有したい」というときに、protectedがちょうど良い公開レベルになります。"},{before:`class Derived : public Base{
public:
  void showData(){ cout << "Derived" << endl; }
};
// 基本クラスと同名同引数の関数を再定義し、派生クラス側を有効にすることを何と呼ぶか(カタカナで)
`,after:"",answers:["オーバーライド"],explain:"基本クラスBaseにすでに定義されている関数と、全く同じ名前・同じ引数を持つ関数を、派生クラスDerivedの中でもう一度定義することを「オーバーライド」と呼びます。この例では、両方のクラスにshowData()という同じ名前・同じ引数の関数がありますが、Derivedのオブジェクトに対してdrv.showData();のように呼び出すと、Base側の定義は無視され、Derived側で新しく書いた定義が優先して実行されます。まるで「基本クラスから受け継いだ機能を、派生クラスで自分好みに上書きする」ようなイメージで捉えると分かりやすいでしょう。"},{before:`// オーバーロードとオーバーライド、この2つの仕組みをまとめて何と呼ぶか(カタカナで)
`,after:"",answers:["ポリモーフィズム","多態性"],explain:"poly(多い)+ morphe(形)というギリシャ語が語源になっている「ポリモーフィズム(多態性)」とは、1つの名前(関数名)なのに、状況に応じていくつもの異なる形(振る舞い)を取れる性質のことを指します。オーバーロードは「引数の型や数の違いによって、呼び出される中身が変わる」仕組みで、オーバーライドは「オブジェクトの実際のクラス(基本クラスか派生クラスか)によって、同じ名前の関数でも呼び出される中身が変わる」仕組みです。どちらも「同じ名前で呼び出しているのに、状況によって適切な振る舞いが自動的に選ばれる」という点で共通しており、これがポリモーフィズムと呼ばれる理由です。"},{before:`// 既存のプログラムを再利用し、機能を拡張しやすくする、クラスの重要な仕組みを漢字二文字で書きなさい
`,after:"",answers:["継承"],explain:"「継承」とは、すでにあるクラス(基本クラス)が持っている機能をそのまま引き継ぎつつ、新しい機能を追加したり、一部の機能を上書き(オーバーライド)したりして、別のクラス(派生クラス)を作れる仕組みです。もし継承という機能が無ければ、似たようなクラスを作るたびに、共通する部分(データメンバやメンバ関数)をコピー&ペーストして一から書き直す必要があり、片方を修正したときにもう片方の修正を忘れる、といったミスの温床になります。継承を使えば「共通部分は基本クラスにまとめて書き、違う部分だけを派生クラスに書く」ことができるので、プログラムの見通しが良くなり、再利用性も高まります。"},{before:`class Derived : public Base{
  // Baseのメンバ関数をそのまま使いたい
};
int main(){
  Derived drv;
  drv.baseFunc(); // 派生クラスのオブジェクトから基本クラスのメンバ関数を呼び出せるのはなぜか
  // 「継承」という言葉を使って一言で書きなさい
}
`,after:"",answers:["継承しているから","基本クラスを継承しているから"],explain:"DerivedはBaseを継承しているため、Derived自身が何も新しく定義していなくても、Base側で定義されたpublicなメンバ関数(baseFuncなど)を、まるで自分自身が最初から持っているメンバであるかのように、そのまま呼び出すことができます。継承とは「基本クラスの機能一式を丸ごと引き継ぐ」ことなので、drv(Derived型のオブジェクト)がbaseFunc()を呼べるのは当然の結果であり、これこそが継承によってコードを再利用できる、という具体的な現れです。"},{before:`class Animal{
public:
  void speak();
};
class Dog : `,after:` Animal{
};`,lead:"DogがAnimalを継承するように、抜けている部分を補いなさい。",answers:["public"],explain:"class Dog : public Animal{ }; と書くことで、DogはAnimalを継承します。"},{before:`class Base{
public:
  int getValue(){ return 100; }
};
class Derived : public Base{
};
Derived d;
cout << d.`,after:"() << endl; // 継承したメソッドを呼ぶ",answers:["getValue"],explain:"DerivedはgetValue()を継承しているので、そのまま呼び出せます。"},{before:`class Base{
`,after:`:
  int x;
public:
  Base(int v){ x=v; }
}; // 派生クラスからはアクセスできるが外部からはできない指定子`,answers:["protected"],explain:"protectedは、そのクラス自身と派生クラスからアクセスできる中間的な公開レベルです。"},{before:`class Animal{
public:
  void speak(){ cout << "..." << endl; }
};
class Bird : public Animal{
public:
  void speak(){ cout << "Tweet" << endl; }
};
Bird b;
b.speak(); // `,after:"",lead:"出力される内容を書きなさい。",answers:["Tweet"],explain:'BirdはAnimalのspeak()をオーバーライドしているので、b.speak()は"Tweet"を出力します。'},{before:`// 継承において、機能を提供する側のクラスを何と呼ぶか(漢字で)
`,after:"",answers:["基本クラス"],explain:"継承で機能を提供する側のクラスを基本クラス(親クラス)と呼びます。"},{before:`// 継承において、機能を受け継ぐ側のクラスを何と呼ぶか(漢字で)
`,after:"",answers:["派生クラス"],explain:"継承で機能を受け継ぐ側のクラスを派生クラス(子クラス)と呼びます。"},{before:`class Base{
public:
  Base(int v){ }
};
class Derived : public Base{
public:
  Derived(int v):Base(v){}
};
Derived d(5); // `,after:"",lead:"このコードは正しくコンパイルできるか(できる/できない)",answers:["できる"],explain:"イニシャライザ:Base(v)で基本クラス部分が正しく初期化されるので、このコードは問題なくコンパイルできます。"},{before:`// 共通の機能を基本クラスにまとめ、コードの重複を減らせるという、継承の利点を一言(漢字)で書きなさい
`,after:"",answers:["再利用"],explain:"継承の利点は、共通する機能を基本クラスにまとめて再利用できることです。"}],qsHard:[{type:"debug",before:`class Derived : public Base{
  int drvData;
public:
  Derived(int a,int b)`,after:`{
    drvData = b;
  } // 基本クラスのコンストラクタ呼び出し(イニシャライザ)が抜けている。追加しなさい`,answers:[":Base(a)",": Base(a)"],explain:"派生クラスのコンストラクタは、基本クラス部分の初期化も担う責任があります。: Base(a) というイニシャライザを書いておくと、本体{ }が実行される前にBaseのコンストラクタが引数aで呼び出され、baseData部分が正しく初期化されます。"},{type:"choice",lead:"オーバーロードとオーバーライドの違いとして正しい説明を選びなさい。",options:["オーバーロードは引数の違いで区別、オーバーライドは基本/派生クラスでの再定義","オーバーロードは基本/派生クラスでの再定義、オーバーライドは引数の違いで区別","どちらも全く同じ意味である","オーバーライドは戻り値の型だけを変える仕組みである"],answers:["オーバーロードは引数の違いで区別、オーバーライドは基本/派生クラスでの再定義"],explain:"オーバーロードは同じ名前でも引数の型や数が違う関数を複数定義する仕組み、オーバーライドは基本クラスの関数と全く同じ名前・引数を持つ関数を派生クラス側で再定義し、派生クラス側を優先させる仕組みです。"},{type:"order",lines:[{label:"A",code:`class Base{
protected:
  int baseData;
};`},{label:"B",code:`class Derived : public Base{
public:
  void show(){ cout << baseData << endl; }
};`},{label:"C",code:`Derived d;
d.show();`}],answers:["A,B,C"],explain:"protectedなbaseDataを持つ基本クラスを定義し(A)、それを継承した派生クラスでbaseDataを利用する関数を定義し(B)、最後にオブジェクトを作って呼び出します(C)。protectedだからこそ派生クラスのメンバ関数からbaseDataに直接アクセスできます。"},{type:"debug",before:`class Employee{
public:
  void work(){ cout << "働く" << endl; }
};
class Manager `,after:` Employee{
};`,lead:"ManagerがEmployeeをpublic継承するように、抜けている部分を補いなさい。",answers:[": public",":public"],explain:": public と書くことで、ManagerはEmployeeのpublicなメンバをそのまま引き継ぎます。"},{before:`class Base{
public:
  int getValue(){ return 100; }
};
class Derived : public Base{
};
Derived d;
cout << d.getValue() + d.getValue() << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["200"],explain:"DerivedはgetValue()を継承しているので、2回呼び出すと100+100=200になります。"},{type:"order",lines:[{label:"A",code:`class Base{
public:
  Base(int v){ }
};`},{label:"B",code:`class Derived : public Base{
public:
  Derived(int v):Base(v){}
};`},{label:"C",code:"Derived d(5);"}],answers:["A,B,C"],explain:"基本クラスを定義し(A)、イニシャライザで基本クラスを初期化する派生クラスを定義し(B)、オブジェクトを生成します(C)。"},{type:"debug",before:`class Base{
public:
  Base(int v){ }
};
class Derived : public Base{
public:
  Derived(int v)`,after:`{ }
}; // 基本クラスのコンストラクタにvを渡すイニシャライザを補いなさい`,answers:[":Base(v)",": Base(v)"],explain:":Base(v)というイニシャライザで、本体{ }が実行される前に引数vを渡してBaseのコンストラクタを呼び出します。"},{before:`class Product{
public:
  int getPrice(){ return 500; }
};
class DiscountedProduct : public Product{
};
DiscountedProduct dp;
cout << dp.`,after:"() << endl; // 継承したメソッドを呼ぶ(500が表示される)",answers:["getPrice"],explain:"DiscountedProductはgetPrice()を継承しているので、自分で定義していなくてもそのまま呼び出せ、500が返ります。"},{type:"debug",before:`class Base{
public:
  int baseFunc(){ return 1; }
};
class Derived : public Base{
};
Derived d;
cout << d.`,after:"() << endl; // 継承したbaseFuncを呼び出す",answers:["baseFunc"],explain:"DerivedはBaseを継承しているので、baseFunc()を自分で定義していなくても、d.baseFunc()のようにそのまま呼び出せます。"},{type:"order",lines:[{label:"A",code:`class Base{
public:
  void show(){ cout << "Base" << endl; }
};`},{label:"B",code:`class Derived : public Base{
public:
  void show(){ Base::show(); cout << "Derived" << endl; }
};`},{label:"C",code:`Derived d;
d.show(); // Base→Derivedの順で2行`}],answers:["A,B,C"],explain:"基本クラスを定義し(A)、Base::show()経由で基本クラス側の処理も呼び出すDerivedを定義し(B)、呼び出します(C)。"},{type:"debug",before:`class Base{
public:
  void show(){ cout << "Base show" << endl; }
};
class Derived : public Base{
public:
  void show(){ cout << "Derived show" << endl; }
  void callShow(){
`,after:`
  }
};`,lead:"callShowメソッドの中身に、自分自身のshow()(オーバーライドされたDerived側)を呼び出す処理を書きなさい。",answers:["show();"],explain:"callShowの中からshow()を呼ぶと、自分自身のクラス(Derived)でオーバーライドされた版が実行されます。"},{type:"choice",lead:"派生クラスのコンストラクタでイニシャライザを省略し、かつ基本クラスに引数なしのコンストラクタも無い場合、何が起きるか選びなさい。",options:["コンパイルエラーになる(基本クラス部分の初期化方法が決まらない)","baseDataが自動的に0になるだけで問題なく動く","派生クラスのコンストラクタが自動的にBase(0)を補ってくれる","継承時は必ずイニシャライザを省略しなければならない"],answers:["コンパイルエラーになる(基本クラス部分の初期化方法が決まらない)"],explain:"基本クラスに引数なしのコンストラクタが無いのにイニシャライザも省略すると、コンパイラは基本クラス部分をどう初期化すればよいか分からずエラーになります。"},{type:"debug",before:`class Animal{
public:
  void speak(){ cout << "..." << endl; }
};
class Dog : public Animal{
public:
  `,after:`speak(){ cout << "Woof" << endl; }
}; // オーバーライドのために戻り値の型を補いなさい`,answers:["void"],explain:"オーバーライドするメソッドは、基本クラス側と同じ戻り値の型・引数で定義する必要があります。speak()はvoid型です。"},{type:"order",lines:[{label:"A",code:`class Animal{
public:
  void speak(){ cout << "..." << endl; }
};`},{label:"B",code:`class Dog : public Animal{
public:
  void speak(){ cout << "Woof" << endl; }
};`},{label:"C",code:`class Cat : public Animal{
public:
  void speak(){ cout << "Meow" << endl; }
};`},{label:"D",code:`Dog d; Cat c;
d.speak(); c.speak();`}],answers:["A,B,C,D"],explain:"共通の基本クラスAnimalを定義し(A)、それぞれ異なる鳴き方を実装したDog(B)とCat(C)を定義し、両方を呼び出します(D)。"},{before:`class Base{
public:
  void greet(){ cout << "Base greet" << endl; }
};
class Derived : public Base{
public:
  void greet(){ cout << "Derived greet" << endl; }
};
Derived d;
d.greet(); // `,after:"",lead:"出力される内容を書きなさい。",answers:["Derived greet"],explain:'d.greet()はオーバーライドされたDerived側の定義が使われるので、"Derived greet"が出力されます。'}],qsExtra:[{before:`class Derived : public Base{
public:
  void show(){
    `,after:`(); // オーバーライドしていても、あえて基本クラス側のshow()を呼び出したい
    cout << "Derived" << endl;
  }
};`,answers:["Base::show"],explain:"派生クラスでオーバーライドしていても、Base::show();のようにクラス名とスコープ解決演算子(::)をつけて呼び出せば、隠れてしまった基本クラス側のshow()をあえて呼び出すことができます。「上書きしたけれど、元の処理も活かしたい」というときによく使われる書き方です。"},{before:`class Base{
public:
  int baseFunc(){ return 1; }
};
class Derived : public Base{
};
int main(){
  Derived d;
  cout << `,after:" << endl; // dから継承したbaseFuncを呼び出す式",answers:["d.baseFunc()"],explain:"DerivedはBaseを継承しているため、Derived自身がbaseFuncを新しく定義していなくても、d.baseFunc()のようにドットで呼び出せます。継承は基本クラスの機能一式をまるごと引き継ぐ仕組みなので、これは自然な結果です。"},{type:"debug",long:!0,before:"",after:"",lead:"int baseDataをprotectedに持ちBase(int b)で初期化するBaseクラスと、それを継承しint drvDataを追加でコンストラクタで初期化しつつ、show()でbaseDataとdrvDataを両方出力するDerivedクラスを、あわせて定義しなさい。",answers:[`class Base{
protected:
int baseData;
public:
Base(int b){ baseData=b; }
};
class Derived : public Base{
int drvData;
public:
Derived(int a,int b):Base(a){ drvData=b; }
void show(){ cout<<baseData<<" "<<drvData<<endl; }
};`],explain:"BaseはbaseDataをprotectedにして、派生クラスからは触れるが外部からは触れないようにします。Derivedのコンストラクタは:Base(a)というイニシャライザでBase部分の初期化をBase自身に任せ、本体でdrvDataを初期化します。show()ではprotectedなbaseDataに直接アクセスできる点を確認しましょう。"},{type:"debug",long:!0,before:`class Base{
public:
  void show(){ cout << "Base" << endl; }
};
class Derived : public Base{
public:
  void show(){
`,after:`
  }
};`,lead:'Derived側のshow()の中身に、まず基本クラス側のshow()を呼び出してから(Base::show();)、続けて"Derived"という文字列を1行出力する処理を書きなさい。',answers:[`Base::show();
cout << "Derived" << endl;`],explain:'Base::show();と書けば、オーバーライドで隠れてしまった基本クラス側のshow()をあえて呼び出せます。その後で自分の処理(cout<<"Derived"<<endl;)を続けることで、「基本クラスの処理も生かしつつ、派生クラスで機能を追加する」というオーバーライドの実践的な使い方になります。'},{type:"choice",lead:"継承のイニシャライザ(:Base(a))を省略し、かつ基本クラスに引数なしのコンストラクタも無い場合、何が起きるか選びなさい。",options:["コンパイルエラーになる(基本クラス部分の初期化方法が決まらない)","baseDataが自動的に0になるだけで問題なく動く","派生クラスのコンストラクタが自動的にBase(0)を補ってくれる","継承時は必ずイニシャライザを省略しなければならない"],answers:["コンパイルエラーになる(基本クラス部分の初期化方法が決まらない)"],explain:"派生クラスのオブジェクトには必ず基本クラス部分が含まれており、その初期化方法をコンパイラに教えてあげる必要があります。基本クラスに引数なしのコンストラクタが無いのにイニシャライザも省略すると、「基本クラス部分をどう初期化すればよいか分からない」とコンパイラが判断し、エラーになります。"},{type:"order",lines:[{label:"A",code:`class Base{
public:
  void show(){ cout << "Base" << endl; }
};`},{label:"B",code:`class Derived : public Base{
public:
  void show(){ Base::show(); cout << "Derived" << endl; }
};`},{label:"C",code:`Derived d;
d.show(); // Base→Derivedの順で2行表示`}],lead:"Base→Derivedの順で2行表示されるプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"Baseクラスを定義し(A)、それを継承してBase::show()経由で基本クラス側の処理も呼び出すDerivedクラスを定義し(B)、最後にオブジェクトを作って呼び出します(C)。Base::show()が先に実行されるので「Base」が先に、続けて「Derived」が表示されます。"},{before:`class Base{
public:
  int baseFunc(){ return 1; }
};
class Derived : public Base{
public:
  int drvFunc(){ return 2; }
};
int main(){
  Derived d;
  cout << d.baseFunc() + d.`,after:`() << endl; // 3が表示される
}`,answers:["drvFunc"],explain:"Derivedオブジェクトdは、継承したbaseFunc()と自分で定義したdrvFunc()の両方を呼び出せます。1+2=3が出力されるためには、d.baseFunc()に続けてd.drvFunc()を呼ぶ必要があります。"},{before:`class Base{
protected:
  int val;
public:
  Base(int v){ val=v; }
};
class A : public Base{
public:
  A(int v):`,after:`{}
};`,lead:"基本クラスのコンストラクタに引数vを渡すイニシャライザを書きなさい。",answers:["Base(v)"],explain:":Base(v)というイニシャライザは、本体{ }が実行される前に、引数vを渡してBaseのコンストラクタを呼び出すことを意味します。これによって基本クラス部分(val)が正しく初期化されます。"},{type:"debug",long:!0,before:`class Base{
protected:
  int val;
public:
  Base(int v){ val=v; }
  int getVal(){ return val; }
};
class Derived : public Base{
public:
  Derived(int v):Base(v){}
};
int main(){
`,after:`
  return 0;
}`,lead:"Derivedオブジェクトdを10で生成し、getVal()の結果を出力する処理を書きなさい。",answers:[`Derived d(10);
cout << d.getVal() << endl;`],explain:"Derived d(10);と生成すると、イニシャライザ経由でBase(10)が呼ばれ、valが10に設定されます。DerivedはgetVal()を自分で定義していませんが、継承しているのでそのまま呼び出せ、10が出力されます。"},{type:"choice",lead:"継承の主な利点として正しいものを選びなさい。",options:["共通の機能を再利用でき、コードの重複を減らせる","必ず実行速度が上がる","メモリを一切使わなくなる","継承すると自動的にprivateになる"],answers:["共通の機能を再利用でき、コードの重複を減らせる"],explain:"継承を使うと、共通する機能を基本クラスにまとめて書き、派生クラスではその機能をそのまま再利用したり、必要な部分だけ追加・上書きしたりできます。似たクラスを何度もコピー&ペーストして書く必要がなくなり、コードの重複や修正漏れを減らせます。"},{type:"order",lines:[{label:"A",code:`class Base{
protected:
  int val;
public:
  Base(int v){ val=v; }
  int getVal(){ return val; }
};`},{label:"B",code:`class Derived : public Base{
public:
  Derived(int v):Base(v){}
};`},{label:"C",code:`Derived d(5);
cout << d.getVal() << endl; // 5`}],lead:"基本クラスのコンストラクタで初期化された値を、派生クラス経由で取得するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"protectedなvalとそれを初期化するコンストラクタ、読み取り用のgetVal()を持つBaseを定義し(A)、それを継承してBaseのコンストラクタを呼ぶだけのDerivedを定義し(B)、最後にオブジェクトを生成して値を確認します(C)。"},{before:`class Vehicle{
public:
  void run(){ cout << "走る" << endl; }
};
class Car : `,after:` Vehicle{
};`,answers:["public"],explain:"class Car : public Vehicle{ }; と書くことで、CarはVehicleを継承します。Vehicleが持つpublicなメンバ(run)を、Carのオブジェクトからもそのまま呼び出せるようになります。"},{before:`Car c;
c.`,after:"(); // Vehicleから継承したメソッドを呼ぶ",answers:["run"],explain:"CarはVehicleを継承しているので、run()を自分で定義していなくても、c.run()のようにそのまま呼び出せます。"},{type:"choice",lead:"派生クラスが基本クラスのpublicなメンバ関数を、自分で再定義せずにそのまま使えるのはなぜか選びなさい。",options:["継承により基本クラスの機能を丸ごと引き継ぐため","コンパイラが自動的にコピーするため","偶然名前が同じだから","必ずオーバーライドされるため"],answers:["継承により基本クラスの機能を丸ごと引き継ぐため"],explain:"継承とは、基本クラスが持つpublicな機能一式を、派生クラスがまるごと引き継ぐ仕組みです。そのため派生クラス側で何も書かなくても、基本クラスのメンバ関数をそのまま呼び出せます。"},{type:"debug",long:!0,before:`class Base{
protected:
  int value;
public:
  Base(int v){ value=v; }
};
class Derived : public Base{
public:
  Derived(int v):Base(v){}
`,after:`
};`,lead:"valueを2倍した値をreturnするgetDoubled()メソッドを追加しなさい。",answers:["int getDoubled(){ return value*2; }"],explain:"protectedで継承したvalueに、Derivedのメンバ関数から直接アクセスできます。value*2を計算してreturnするだけの単純なメソッドです。"},{before:`Derived d(5);
cout << d.`,after:"() << endl; // 10が表示される",answers:["getDoubled"],explain:"valueは5で初期化されているので、getDoubled()を呼ぶと5*2=10が返ります。"},{type:"order",lines:[{label:"A",code:`class Vehicle{
public:
  void run(){ cout << "走る" << endl; }
};`},{label:"B",code:`class Car : public Vehicle{
};`},{label:"C",code:`Car c;
c.run(); // 走る`}],lead:"Vehicleを継承したCarクラスを定義し、継承したメソッドを呼び出すプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"基本クラスVehicleを定義し(A)、それを継承した空のCarクラスを定義し(B)、Carのオブジェクトから継承したrun()を呼び出します(C)。"},{type:"choice",lead:"protectedなメンバに直接アクセスできるのはどれか選びなさい。",options:["そのクラス自身と、それを継承した派生クラスのメンバ関数","外部の全ての関数","派生クラスのみ(基本クラス自身は不可)","どこからもアクセスできない"],answers:["そのクラス自身と、それを継承した派生クラスのメンバ関数"],explain:"protectedは、そのクラス自身のメンバ関数と、それを継承した派生クラスのメンバ関数からアクセスできる中間的な公開レベルです。それ以外の外部の関数からはprivateと同様にアクセスできません。"},{before:`class Base{
protected:
  int x;
public:
  Base(int a){ x=a; }
};
class Derived : public Base{
  int y;
public:
  Derived(int a,int b)`,after:`{ y=b; }
};`,answers:[":Base(a)",": Base(a)"],explain:":Base(a)というイニシャライザで、基本クラス部分の初期化をBaseのコンストラクタに任せます。本体{ }では、Derived自身が追加したyだけを初期化します。"},{type:"debug",long:!0,before:`class Base{
public:
  void show(){ cout << "Base" << endl; }
};
class Derived : public Base{
public:
  void show(){ cout << "Derived" << endl; }
  void extra(){ cout << "Extra" << endl; }
};
int main(){
`,after:`
  return 0;
}`,lead:"Derivedオブジェクトdを生成し、show()とextra()を両方呼び出す処理を書きなさい。",answers:[`Derived d;
d.show();
d.extra();`],explain:'d.show()はオーバーライドされたDerived側の処理("Derived"を表示)を、d.extra()はDerivedが新しく追加した処理("Extra"を表示)を、それぞれ実行します。'},{before:`// Derivedのオブジェクトを生成すると、まずどちらのコンストラクタが呼ばれるか(漢字で)
`,after:"",answers:["基本クラス","基本クラスのコンストラクタ"],explain:"派生クラスのオブジェクトを生成すると、本体{ }が実行される前に、まず基本クラス部分を初期化するために基本クラスのコンストラクタが呼ばれます(イニシャライザで指定していればその引数で、省略していれば引数なしのものが呼ばれます)。"},{type:"choice",lead:"継承とカプセル化を組み合わせて使う理由として適切なものを選びなさい。",options:["共通機能を再利用しつつ、データは適切なアクセス指定で保護するため","継承すればカプセル化は不要になるため","カプセル化すれば継承できなくなるため","どちらも同じ機能だから"],answers:["共通機能を再利用しつつ、データは適切なアクセス指定で保護するため"],explain:"継承は「共通する機能の再利用」、カプセル化は「データを不正な操作から守ること」という、それぞれ別の目的を持つ仕組みです。protectedのようなアクセス指定を使えば、継承しつつも適切にデータを保護できます。"},{before:`class Shape{
public:
  void draw(){ cout << "図形" << endl; }
};
class Circle : `,after:` Shape{
};`,answers:["public"],explain:"class Circle : public Shape{ }; と書くことで、CircleはShapeを継承し、Shapeが持つpublicなメンバをそのまま使えるようになります。"},{before:`Circle c;
c.`,after:"(); // Shapeから継承したメソッドを呼ぶ",answers:["draw"],explain:"CircleはShapeを継承しているので、draw()を自分で定義していなくても、c.draw()のようにそのまま呼び出せます。"},{before:`class Employee{
public:
  void work(){ cout << "働く" << endl; }
};
class Manager : public Employee{
};
Manager m;
m.work(); // `,after:"",lead:"出力される内容を書きなさい。",answers:["働く"],explain:'ManagerはEmployeeを継承しているので、work()をそのまま呼び出せ、"働く"が出力されます。'},{before:`class Base{
public:
  int getValue(){ return 100; }
};
class Derived : public Base{
};
Derived d;
cout << d.getValue() << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["100"],explain:"DerivedはgetValue()を継承しているので、そのまま呼び出すと基本クラスの定義通り100が返ります。"},{before:`class Vehicle{
public:
  int speed;
};
class `,after:` : public Vehicle{
};  // Bikeという名前で継承する`,answers:["Bike"],explain:"class Bike : public Vehicle{ }; と書けば、BikeはVehicleを継承した新しいクラスになります。"},{before:`// AがBを継承するとき、クラス宣言の書き方は "class A : ○○○ B{ };" のようになる。○○○に入るアクセス指定を書きなさい(最も一般的なもの)
`,after:"",answers:["public"],explain:"最も一般的に使われるのはpublic継承(class A : public B)で、Bのpublicなメンバをそのままpublicなメンバとして引き継ぎます。"},{before:`class Animal{
protected:
  int age;
public:
  Animal(int a){ age=a; }
};
class Dog : public Animal{
public:
  Dog(int a):Animal(a){}
  int getAge(){ return `,after:`; }
};`,answers:["age"],explain:"protectedで継承したageには、派生クラスDogのメンバ関数から直接アクセスできます。"},{before:`class Base{
protected:
  int x;
};
class Derived : public Base{
public:
  void show(){ cout << `,after:` << endl; } // protectedで継承したxに直接アクセスする
};`,answers:["x"],explain:"protectedなメンバは、そのクラス自身だけでなく派生クラスからも直接アクセスできます。"},{before:`class Base{
`,after:`:
  int secret;
public:
  Base(int s){ secret=s; }
}; // 派生クラスからは触れるが外部からは触れないアクセス指定`,answers:["protected"],explain:"protectedは、そのクラス自身と派生クラスからはアクセスでき、それ以外の外部からはprivateと同様にアクセスできない、中間的な公開レベルです。"},{before:`class Base{
private:
  int x;
public:
  Base(int v){ x=v; }
};
class Derived : public Base{
public:
  void show(){ cout << x << endl; } // このコードはコンパイルできるか(日本語で)
};
`,after:"",answers:["できない"],explain:"xはprivateなので、派生クラスDerivedのメンバ関数からも直接アクセスできず、コンパイルエラーになります。派生クラスからもアクセスさせたい場合はprotectedにする必要があります。"},{before:`class Base{
protected:
  int hp;
public:
  Base(int h){ hp=h; }
};
class Monster : public Base{
public:
  Monster(int h):Base(h){}
  void damage(int d){
`,after:`
  }
};`,lead:"damageメソッドの中身に、protectedで継承したhpをdだけ減らす処理を書きなさい。",answers:["hp -= d;"],explain:"protectedなhpには派生クラスのメンバ関数から直接アクセスでき、-=でダメージ分を減算できます。"},{before:`class Base{
protected:
  int score;
public:
  Base(int s){ score=s; }
};
class Student : public Base{
public:
  Student(int s):Base(s){}
  bool isPassing(){
`,after:`
  }
};`,lead:"isPassingメソッドの中身に、scoreが60以上かをbool型でreturnする処理を書きなさい。",answers:["return score>=60;"],explain:"protectedで継承したscoreを使い、60以上かどうかの比較結果をそのままreturnします。"},{before:`class Base{
public:
  Base(int v){ }
};
class Derived : public Base{
public:
  Derived(int v)`,after:`{ }
}; // 基本クラスのコンストラクタにvを渡す`,answers:[":Base(v)",": Base(v)"],explain:":Base(v)というイニシャライザで、本体{ }が実行される前に、引数vを渡して基本クラスのコンストラクタを呼び出します。"},{before:`class Base{
protected:
  int x;
public:
  Base(int a){ x=a; }
};
class Derived : public Base{
  int y;
public:
  Derived(int a, int b) : Base(a) { `,after:` = b; }
};`,answers:["y"],explain:"イニシャライザ:Base(a)で基本クラス部分(x)の初期化をBaseに任せ、本体では自分が追加したyにbを代入します。"},{before:`class Animal{
protected:
  string name;
public:
  Animal(string n){ name=n; }
};
class Dog : public Animal{
public:
  Dog(string n) : `,after:`(n) {}
};`,answers:["Animal"],explain:"イニシャライザでは基本クラス名(Animal)を指定し、その引数として値を渡します。"},{before:`class Base{
public:
  Base(){ cout << "Base()" << endl; }
};
class Derived : public Base{
public:
  Derived(){ cout << "Derived()" << endl; }
};
Derived d;
// 出力される2行の順番は? ("Base()"が先か"Derived()"が先か)
`,after:"",answers:["Base()が先"],explain:'派生クラスのオブジェクトを生成すると、本体の処理が実行される前に、まず基本クラス部分のコンストラクタが呼ばれます。そのため"Base()"が先に、続けて"Derived()"が表示されます。'},{before:`class Base{
public:
  Base(int x){ }
};
class Derived : public Base{
public:
  Derived() : Base(`,after:`) {}
}; // 基本クラスに固定値0を渡す`,answers:["0"],explain:"イニシャライザのBase( )の中には、変数だけでなく固定値(リテラル)を直接書くこともできます。"},{before:`class Item{
protected:
  string name;
public:
  Item(string n){ name=n; }
};
class Weapon : public Item{
  int power;
public:
  Weapon(string n, int p) : Item(n) { power=p; }
  void show(){
`,after:`
  }
};`,lead:"showメソッドの中身に、nameとpowerを1行で出力する処理を書きなさい。",answers:['cout << name << " " << power << endl;'],explain:"protectedで継承したnameと、自分で追加したpowerを、同じクラスの中にあるかのように並べて出力できます。"},{type:"choice",lead:"派生クラスのオブジェクトを生成するとき、基本クラス部分と派生クラス自身の部分では、どちらが先に初期化されるか選びなさい。",options:["基本クラス部分が先","派生クラス自身の部分が先","同時に初期化される","決まっていない"],answers:["基本クラス部分が先"],explain:"派生クラスのコンストラクタの本体が実行される前に、まず基本クラス部分のコンストラクタが(イニシャライザで指定されていればその引数で)呼ばれ、その後で派生クラス自身の初期化が行われます。"},{type:"choice",lead:"オーバーライドの説明として正しいものを選びなさい。",options:["派生クラスで、基本クラスと同じ名前のメソッドを新しい内容で再定義すること","基本クラスのメソッドを削除すること","コンストラクタを継承すること","継承を禁止すること"],answers:["派生クラスで、基本クラスと同じ名前のメソッドを新しい内容で再定義すること"],explain:"オーバーライドとは、基本クラスに定義されているメソッドと同じ名前・シグネチャのメソッドを、派生クラス側で新しい内容として再定義することです。"},{type:"choice",lead:"Base::show()のように基本クラス名とスコープ解決演算子(::)を使う目的として正しいものを選びなさい。",options:["オーバーライドで隠れた基本クラス側のメソッドをあえて呼び出すため","派生クラスを削除するため","基本クラスを継承するため","privateなメンバを公開するため"],answers:["オーバーライドで隠れた基本クラス側のメソッドをあえて呼び出すため"],explain:"派生クラスでオーバーライドすると、そのままでは基本クラス側の同名メソッドは隠れてしまいますが、Base::show()のように書けば、あえてその基本クラス側の処理を呼び出すことができます。"},{type:"choice",lead:"1つの基本クラスから複数の異なる派生クラス(例: DogとCat)を作ることの利点として正しいものを選びなさい。",options:["共通部分は基本クラスにまとめつつ、それぞれ独自の振る舞いを追加できる","必ず処理が速くなる","メモリを一切使わなくなる","派生クラス同士で直接データを共有できる"],answers:["共通部分は基本クラスにまとめつつ、それぞれ独自の振る舞いを追加できる"],explain:"DogとCatのように、共通する部分(Animalが持つ機能)は1か所にまとめつつ、それぞれの派生クラスで異なる振る舞い(鳴き方など)を追加・上書きできるのが、継承とオーバーライドを組み合わせる利点です。"},{type:"choice",lead:"派生クラスから基本クラスのprivateなメンバに直接アクセスできるか選びなさい。",options:["できない(protected以上にする必要がある)","できる(継承すれば自動的にprotectedになる)","必ずできる","publicにすれば逆にアクセスできなくなる"],answers:["できない(protected以上にする必要がある)"],explain:"privateなメンバは、そのクラス自身のメンバ関数からしかアクセスできません。派生クラスからもアクセスさせたい場合は、protected(またはpublic)にする必要があります。"},{type:"choice",lead:"class Derived : public Base{ }; の「public」の部分を省略するとどうなるか選びなさい。",options:["classのデフォルトであるprivate継承になる","エラーになる","必ずpublic継承になる","protected継承になる"],answers:["classのデフォルトであるprivate継承になる"],explain:"classキーワードを使った継承では、アクセス指定を省略するとデフォルトでprivate継承になります(structの場合はpublicがデフォルトです)。意図しない挙動を避けるため、通常はpublicを明示します。"},{type:"order",lines:[{label:"A",code:`class Animal{
public:
  void speak(){ cout << "..." << endl; }
};`},{label:"B",code:`class Dog : public Animal{
public:
  void speak(){ cout << "Woof" << endl; }
};`},{label:"C",code:`Dog d;
d.speak(); // Woof`}],lead:"Animalを継承し、speak()をオーバーライドしたDogクラスを作るプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:'基本クラスAnimalを定義し(A)、それを継承してspeak()をオーバーライドするDogを定義し(B)、最後にオブジェクトを生成して呼び出します(C)。オーバーライドされているので"Woof"が表示されます。'},{type:"order",lines:[{label:"A",code:`class Base{
protected:
  int x;
public:
  Base(int v){ x=v; }
};`},{label:"B",code:`class Derived : public Base{
public:
  Derived(int v):Base(v){}
  int getX(){ return x; }
};`},{label:"C",code:`Derived d(7);
cout << d.getX() << endl; // 7`}],lead:"protectedなメンバを持つ基本クラスを継承し、値を取得するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"protectedなxとそれを初期化するBaseを定義し(A)、それを継承してxを読み取れるDerivedを定義し(B)、最後に生成して確認します(C)。"},{type:"order",lines:[{label:"A",code:`class Base{
public:
  void show(){ cout << "Base" << endl; }
};`},{label:"B",code:`class Derived : public Base{
public:
  void show(){ cout << "Derived" << endl; }
};`},{label:"C",code:`Derived d;
d.show(); // Derived`}],lead:"基本クラスのメソッドを派生クラスでオーバーライドするプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:'Baseを定義し(A)、それを継承してshow()をオーバーライドするDerivedを定義し(B)、生成して呼び出すと、オーバーライドされた"Derived"が表示されます(C)。'},{type:"debug",long:!0,before:`class Shape{
protected:
  string name;
public:
  Shape(string n){ name=n; }
};
class Square : public Shape{
  int side;
public:
`,after:`
};`,lead:"name(string)とside(int)を受け取り、:Shape(n)経由でnameを初期化しつつsideも初期化するコンストラクタと、side*sideをreturnするgetArea()を、あわせて定義しなさい。",answers:[`Square(string n,int s):Shape(n){ side=s; }
int getArea(){ return side*side; }`],explain:"イニシャライザ:Shape(n)で基本クラス部分(name)の初期化をShapeに任せ、本体でsideを初期化します。getArea()はside*sideをそのままreturnします。"},{type:"debug",long:!0,before:`class Character{
protected:
  int hp;
public:
  Character(int h){ hp=h; }
  int getHp(){ return hp; }
};
class Warrior : public Character{
  int armor;
public:
`,after:`
};`,lead:"hpとarmorを受け取り、:Character(h)経由でhpを初期化しつつarmorも初期化するコンストラクタと、armor分だけ軽減しただけダメージをhpから引くtakeDamage(int dmg)メソッド(hp -= dmg - armor)を、あわせて定義しなさい。",answers:[`Warrior(int h,int a):Character(h){ armor=a; }
void takeDamage(int dmg){ hp -= dmg - armor; }`],explain:"イニシャライザで基本クラス部分(hp)の初期化をCharacterに任せ、本体でarmorを初期化します。takeDamage()ではarmorの分だけダメージが軽減された値をhpから引きます。"},{type:"debug",long:!0,before:`class Base{
public:
  void greet(){ cout << "Hello from Base" << endl; }
};
class Derived : public Base{
public:
  void greet(){
`,after:`
  }
};`,lead:'Derived側のgreet()の中身に、基本クラス側のgreet()を呼び出してから、"Hello from Derived"という文字列を1行出力する処理を書きなさい。',answers:[`Base::greet();
cout << "Hello from Derived" << endl;`],explain:"Base::greet();で隠れてしまった基本クラス側の処理をあえて呼び出し、続けて自分の処理を出力します。"},{type:"debug",long:!0,before:`class Account{
protected:
  int balance;
public:
  Account(int b){ balance=b; }
  int getBalance(){ return balance; }
};
class SavingsAccount : public Account{
  double interestRate;
public:
`,after:`
};`,lead:"balanceとinterestRateを受け取り、:Account(b)経由でbalanceを初期化しつつinterestRateも初期化するコンストラクタと、balance*interestRateをreturnするgetInterest()メソッドを、あわせて定義しなさい。",answers:[`SavingsAccount(int b,double r):Account(b){ interestRate=r; }
double getInterest(){ return balance*interestRate; }`],explain:"イニシャライザで基本クラス部分(balance)の初期化をAccountに任せ、本体でinterestRateを初期化します。getInterest()はbalanceとinterestRateを掛け合わせた値をreturnします。"},{type:"debug",long:!0,before:`class Employee{
protected:
  int salary;
public:
  Employee(int s){ salary=s; }
  int getSalary(){ return salary; }
};
class Manager : public Employee{
  int bonus;
public:
`,after:`
};`,lead:"salaryとbonusを受け取り、:Employee(s)経由でsalaryを初期化しつつbonusも初期化するコンストラクタと、salaryとbonusを足した値をreturnするgetTotalPay()メソッドを、あわせて定義しなさい。",answers:[`Manager(int s,int b):Employee(s){ bonus=b; }
int getTotalPay(){ return salary+bonus; }`],explain:"イニシャライザで基本クラス部分(salary)の初期化をEmployeeに任せ、本体でbonusを初期化します。getTotalPay()はprotectedで継承したsalaryと自分のbonusを足してreturnします。"},{type:"debug",long:!0,before:`class Base{
public:
  int getBonus(){ return 10; }
};
class Derived : public Base{
public:
  int getBonus(){
`,after:`
  }
};`,lead:"Derived側のgetBonus()の中身に、基本クラス側のgetBonus()の戻り値に5を足した値をreturnする処理を書きなさい(Base::getBonus()を使う)。",answers:["return Base::getBonus() + 5;"],explain:"Base::getBonus()で隠れてしまった基本クラス側の戻り値(10)を呼び出し、それに5を足した値をreturnします。"},{before:`class Base{
public:
  int getBonus(){ return 10; }
};
class Derived : public Base{
public:
  int getBonus(){ return Base::getBonus() + 5; }
};
Derived d;
cout << d.getBonus() << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["15"],explain:"Base::getBonus()は10を返し、そこに5を足すので、d.getBonus()は15を返します。"},{before:`class Base{
public:
  Base(){ cout << "A"; }
};
class Derived : public Base{
public:
  Derived(){ cout << "B"; }
};
int main(){
`,after:`
  return 0;
}`,lead:'Derivedオブジェクトdを生成する行を書きなさい(実行すると"AB"と表示される)。',answers:["Derived d;"],explain:'Derived d;と生成すると、まず基本クラスのコンストラクタ(Aを表示)が呼ばれ、続けて派生クラスのコンストラクタ(Bを表示)が呼ばれるので、"AB"と表示されます。'},{before:`class Base{
public:
  void show(){ cout << "Base" << endl; }
};
class Derived : public Base{
public:
  void show(){ cout << "Derived" << endl; }
};
Derived d;
d.show(); // `,after:"",lead:"出力される内容を書きなさい。",answers:["Derived"],explain:'d.show()はオーバーライドされたDerived側の定義が使われるので、"Derived"が出力されます。'},{before:`class Base{
public:
  void show(){ cout << "Base" << endl; }
};
class Derived : public Base{
public:
  void show(){ Base::show(); cout << "Derived" << endl; }
};
Derived d;
d.show();
// 何行表示されるか(半角数字)
int lines=`,after:";",answers:["2"],explain:'Base::show()で1行("Base")、続けてcout<<"Derived"<<endl;でもう1行("Derived")、あわせて2行表示されます。'},{before:`class Base{
public:
  int x;
};
class Derived : public Base{
public:
  int y;
};
Derived d;
d.x = 1;
d.y = 2;
cout << d.x + d.y << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["3"],explain:"継承したxと自分のyの両方をdオブジェクトが持っているので、1+2=3が出力されます。"},{before:`class Base{
public:
  void hello(){ cout << "Hi" << endl; }
};
class Sub : public Base{
};
Sub s;
s.`,after:"(); // 継承したメソッドを呼ぶ",answers:["hello"],explain:"SubはBaseを継承しているので、hello()をそのまま呼び出せます。"},{before:`class Animal{
public:
  void speak(){ cout << "..." << endl; }
};
class Dog : public Animal{
public:
  void speak(){ cout << "Woof" << endl; }
};
class Cat : public Animal{
public:
  void speak(){ cout << "Meow" << endl; }
};
Dog d;
Cat c;
d.speak();
c.speak();
// 出力される2行を書きなさい
`,after:"",answers:[`Woof
Meow`,"Woof Meow"],explain:'DogとCatはそれぞれ独自にspeak()をオーバーライドしているので、d.speak()は"Woof"、c.speak()は"Meow"を出力します。'},{before:`// 派生クラスは基本クラスの機能を引き継ぎつつ、独自の機能を追加したり、一部を上書き(オーバーライド)したりできる。この仕組み全体を何と呼ぶか(漢字で)
`,after:"",answers:["継承"],explain:"このように、あるクラスが別のクラスの機能を引き継ぐ仕組み全体を「継承」と呼びます。"}],qsExpert:[{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
class Base{
public:
  void show(){ cout << "Base" << endl; }
};
class Derived : public Base{
public:
  void show(){ Base::show(); cout << "Derived" << endl; }
};
`,after:"",lead:"main関数の中でDerivedオブジェクトdを生成し、show()を呼び出す処理を書きなさい(Base→Derivedの順で2行表示されるはず)。",answers:[`int main(){
Derived d;
d.show();
return 0;
}`],explain:"d.show();を呼ぶとDerived側のshow()が実行され、その中でまずBase::show()(「Base」を表示)が呼ばれ、続けて「Derived」が表示されます。オーバーライドしていても、あえて基本クラス側の処理を呼び出す書き方の実践です。"},{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
class Base{
protected:
  int baseData;
public:
  Base(int b){ baseData=b; }
};
`,after:"",lead:"Baseを継承し、drvDataも持ち、コンストラクタで:Base(a)を呼びつつdrvDataをbで初期化し、show()でbaseDataとdrvDataの合計を出力するDerivedクラスを定義しなさい。",answers:[`class Derived : public Base{
int drvData;
public:
Derived(int a,int b):Base(a){ drvData=b; }
void show(){ cout<<baseData+drvData<<endl; }
};`],explain:":Base(a)というイニシャライザで基本クラス部分の初期化をBase自身に任せ、本体でdrvDataを初期化します。show()の中では、protectedで継承したbaseDataと、自分で追加したdrvDataの両方に、同じクラスの中にあるかのようにアクセスできます。"},{type:"debug",long:!0,before:`class Base{
public:
  int baseFunc(){ return 1; }
  void show(){ cout << "Base show" << endl; }
};
class Derived : public Base{
public:
  void show(){ cout << "Derived show" << endl; }
  void showAll(){
`,after:`
  }
};`,lead:"showAllメソッドの中身に、継承したbaseFunc()の戻り値を出力してから、自分自身のshow()(オーバーライドされたDerived側)を呼び出す処理を書きなさい。",answers:[`cout << baseFunc() << endl;
show();`],explain:"baseFunc()はDerived自身では定義していませんが、継承しているのでそのまま呼び出せます。show()は自分自身のクラス(Derived)の中から呼んでいるので、オーバーライドされたDerived側の定義(「Derived show」)が実行されます。"},{type:"debug",long:!0,before:`class Base{
protected:
  int baseData;
public:
  Base(int b){ baseData=b; }
  int getBaseData(){ return baseData; }
};
class Derived : public Base{
public:
  Derived(int b) : Base(b) {}
};
int main(){
`,after:`
  return 0;
}`,lead:"Derived d1(10)とDerived d2(20)を生成し、それぞれのgetBaseData()の結果を1行ずつ出力する処理を書きなさい。",answers:[`Derived d1(10);
Derived d2(20);
cout << d1.getBaseData() << endl;
cout << d2.getBaseData() << endl;`],explain:"DerivedはgetBaseData()を自分で定義していませんが、Baseから継承しているのでそのまま呼び出せます。d1とd2はそれぞれ独立したbaseDataを持つので、d1.getBaseData()は10を、d2.getBaseData()は20を返します。"},{type:"debug",long:!0,before:`class Animal{
public:
  void speak(){ cout << "..." << endl; }
};
class Dog : public Animal{
public:
  void speak(){ cout << "Woof" << endl; }
};
class Cat : public Animal{
public:
  void speak(){ cout << "Meow" << endl; }
};
int main(){
`,after:`
  return 0;
}`,lead:"DogオブジェクトdogとCatオブジェクトcatを生成し、それぞれのspeak()を呼び出す処理を書きなさい。",answers:[`Dog dog;
Cat cat;
dog.speak();
cat.speak();`],explain:"DogとCatはどちらもAnimalを継承し、それぞれ独自のspeak()でオーバーライドしています。同じAnimalという設計図から、異なる具体的な鳴き方を持つ複数の派生クラスを作れる、という継承とオーバーライドの組み合わせの典型例です。"},{type:"debug",long:!0,before:`class Employee{
protected:
  int salary;
public:
  Employee(int s){ salary=s; }
  int getSalary(){ return salary; }
};
class Manager : public Employee{
  int bonus;
public:
  Manager(int s,int b):Employee(s){ bonus=b; }
  int getTotalPay(){ return salary+bonus; }
};
int main(){
`,after:`
  return 0;
}`,lead:"mをsalary300000、bonus50000で生成し、getTotalPay()の結果を出力する処理を書きなさい。",answers:[`Manager m(300000,50000);
cout << m.getTotalPay() << endl;`],explain:"イニシャライザ:Employee(s)でsalaryが初期化され、コンストラクタ本体でbonusが初期化されます。getTotalPay()は継承したsalaryと自分のbonusを足した350000をreturnします。"},{type:"debug",long:!0,before:`class Shape{
protected:
  string name;
public:
  Shape(string n){ name=n; }
};
class Circle : public Shape{
  double r;
public:
  Circle(string n, double radius):Shape(n){ r=radius; }
  double getArea(){ return r*r*3.14; }
  string getName(){ return name; }
};
int main(){
`,after:`
  return 0;
}`,lead:'cを名前"円1"、半径2で生成し、名前と面積を1行ずつ出力する処理を書きなさい。',answers:[`Circle c("円1", 2);
cout << c.getName() << endl;
cout << c.getArea() << endl;`],explain:"イニシャライザ:Shape(n)でnameが初期化され、本体でrが初期化されます。getArea()は2*2*3.14=12.56を返します。"},{type:"debug",long:!0,before:`class Animal{
public:
  void speak(){ cout << "..." << endl; }
};
class Dog : public Animal{
public:
  void speak(){ cout << "Woof" << endl; }
};
int main(){
  Dog dogs[3];
`,after:`
  return 0;
}`,lead:"dogs配列3匹全員のspeak()を呼び出すfor文を書きなさい。",answers:[`for(int i=0;i<3;i++){
dogs[i].speak();
}`],explain:"派生クラスのオブジェクトも普通のオブジェクトと同じように配列としてまとめて扱え、dogs[i].speak()のように呼び出せます。"},{type:"debug",long:!0,before:`class Base{
protected:
  int x;
public:
  Base(int v){ x=v; }
};
class Derived : public Base{
public:
  Derived(int v):Base(v){}
  int doubled(){ return x*2; }
  int tripled(){ return x*3; }
};
int main(){
`,after:`
  return 0;
}`,lead:"d(5)で生成し、doubled()とtripled()の合計を出力する処理を書きなさい(25になるはず)。",answers:[`Derived d(5);
cout << d.doubled() + d.tripled() << endl;`],explain:"xは5なので、doubled()は10、tripled()は15をそれぞれ返し、合計すると25になります。protectedで継承したxに、複数のメンバ関数から自由にアクセスできることを確認する問題です。"},{type:"debug",long:!0,before:`class Book{
protected:
  string title;
public:
  Book(string t){ title=t; }
  string getTitle(){ return title; }
};
class EBook : public Book{
  int fileSizeMB;
public:
  EBook(string t, int size):Book(t){ fileSizeMB=size; }
  void show(){
`,after:`
  }
};`,lead:'showメソッドの中身に、タイトルとファイルサイズを"タイトル (サイズMB)"の形式で1行出力する処理を書きなさい。',answers:['cout << title << " (" << fileSizeMB << "MB)" << endl;'],explain:"protectedで継承したtitleと、自分で追加したfileSizeMBを、同じクラスの中にあるかのように並べて出力できます。"},{type:"debug",long:!0,before:`class Book{
protected:
  string title;
public:
  Book(string t){ title=t; }
};
class EBook : public Book{
  int fileSizeMB;
public:
  EBook(string t, int size):Book(t){ fileSizeMB=size; }
  void show(){ cout << title << " (" << fileSizeMB << "MB)" << endl; }
};
int main(){
`,after:`
  return 0;
}`,lead:'eを"入門書",5で生成し、show()を呼び出す処理を書きなさい。',answers:[`EBook e("入門書", 5);
e.show();`],explain:"コンストラクタの引数順(title, size)通りに値を渡してオブジェクトを生成し、show()を呼び出します。"},{type:"debug",long:!0,before:`class Base{
protected:
  int score;
public:
  Base(int s){ score=s; }
};
class Student : public Base{
  int bonus;
public:
  Student(int s,int b):Base(s){ bonus=b; }
  bool isPassing(){ return score+bonus>=60; }
};
int main(){
`,after:`
  return 0;
}`,lead:"sをscore50、bonus15で生成し、isPassing()の結果を出力する処理を書きなさい(1になるはず)。",answers:[`Student s(50,15);
cout << s.isPassing() << endl;`],explain:"score(50)+bonus(15)=65は60以上なので、isPassing()はtrue(=1)を返します。"},{type:"debug",long:!0,before:`class Base{
public:
  int getBonus(){ return 5; }
};
class Derived : public Base{
public:
  int getBonus(){ return Base::getBonus() + 10; }
  int getDoubleBonus(){ return getBonus()*2; }
};
int main(){
`,after:`
  return 0;
}`,lead:"dを生成し、getDoubleBonus()の結果を出力する処理を書きなさい(30になるはず)。",answers:[`Derived d;
cout << d.getDoubleBonus() << endl;`],explain:"getDoubleBonus()はgetBonus()を呼びますが、これは自分自身(Derived)のオーバーライドされた版なので、Base::getBonus()(5)+10=15が返り、それを2倍した30が最終的な結果になります。"},{type:"debug",long:!0,before:`class Vehicle{
protected:
  int speed;
public:
  Vehicle(int s){ speed=s; }
};
class Car : public Vehicle{
public:
  Car(int s):Vehicle(s){}
  int wheels(){ return 4; }
  int getSpeed(){ return speed; }
};
class Motorcycle : public Vehicle{
public:
  Motorcycle(int s):Vehicle(s){}
  int wheels(){ return 2; }
  int getSpeed(){ return speed; }
};
int main(){
`,after:`
  return 0;
}`,lead:"c(100)というCarとm(120)というMotorcycleを生成し、両方のwheels()の合計と、両方のgetSpeed()の合計を1行ずつ出力する処理を書きなさい。",answers:[`Car c(100);
Motorcycle m(120);
cout << c.wheels() + m.wheels() << endl;
cout << c.getSpeed() + m.getSpeed() << endl;`],explain:"CarとMotorcycleはどちらもVehicleを継承しつつ、それぞれ異なるwheels()を実装しています。wheels()の合計は4+2=6、speedの合計は100+120=220になります。"},{type:"debug",long:!0,before:`class Base{
protected:
  int x;
public:
  Base(int v=0){ x=v; }
};
class Derived : public Base{
public:
  Derived():Base(100){}
  int getX(){ return x; }
};
int main(){
`,after:`
  return 0;
}`,lead:"dを引数なしで生成し、getX()の結果を出力する処理を書きなさい(100になるはず)。",answers:[`Derived d;
cout << d.getX() << endl;`],explain:"Derivedの引数なしコンストラクタは、イニシャライザで明示的にBase(100)を呼んでいるため、Baseのデフォルト引数(0)ではなく100でxが初期化されます。"}],qsDrag:[{type:"dragfill",lead:"Baseをpublic継承するDerivedクラスの宣言行と、基本クラスを初期化するコンストラクタになるよう、正しいピースを空欄に配置しなさい。",lines:[{code:"class Base{"},{code:"protected:"},{code:"  int baseData;"},{code:"public:"},{code:"  Base(int b){ baseData=b; }"},{code:"};"},{blank:"b1"},{code:"  int drvData;"},{code:"public:"},{blank:"b2"},{code:"};"}],pieces:[{id:"p1",code:"class Derived : public Base{"},{id:"p2",code:"Derived(int a,int b):Base(a){ drvData=b; }"},{id:"p3",code:"class Derived : private Base{"}],answerMap:{b1:"p1",b2:"p2"},explain:"public継承(p1)にすることで、Baseのpublicなメンバが外部からもDerived経由で使えるようになります。p3のprivate継承では、Baseのメンバが外部から一切見えなくなってしまい、この章で学んだ継承の使い方とは異なります。コンストラクタは:Base(a)というイニシャライザで基本クラス部分の初期化をBaseに任せます(p2)。"}]},{id:"wb",title:"CASE 11「偽りの家系図」",sub:"Week B 階層的な継承",emoji:"🐲",mon:"家系図を書き換えた者",lesson:[{title:"純粋仮想関数と抽象クラス",code:`class Creature{
public:
  virtual int attack()=0;
};`,explain:"virtual int attack()=0; のように、関数の宣言の末尾に=0をつけたものを「純粋仮想関数」と呼びます。これは「この関数の中身(実装)はここでは書きません。実際にどう動くかは、これを継承する派生クラスの側で必ず用意してください」という約束を表しています。このように純粋仮想関数を1つ以上持つクラスは「抽象クラス」と呼ばれ、具体的な中身が決まっていない部分がある以上、そのクラス自身のオブジェクトを直接作ることはできません。「共通のルール(設計図の骨組み)だけを決めておき、具体的な実装は子どもたちに任せる」という考え方だとイメージしてください。"},{title:"抽象クラスを継承して実装",code:`class Hero : public Creature{
public:
  int attack(){ return 10; } // 必ず実装する
};`,explain:"Creatureは抽象クラスなので直接オブジェクトを作れませんが、Creatureを継承した派生クラス(この例のHero)の中で、attack()という純粋仮想関数の中身をきちんと実装(オーバーライド)してあげれば、その派生クラスは「もう約束を果たした具体的なクラス」になり、Hero h;のように普通にオブジェクトを生成できるようになります。抽象クラスは「まだ完成していない設計図」、それを継承して純粋仮想関数を全部実装したクラスは「完成した設計図」だとイメージするとよいでしょう。"},{title:"実行方式とインターフェース",code:`// GUI: アイコンやボタンで操作
// CLI: コマンドを打って操作
// python: インタプリタ方式(その場で解釈しながら実行)
// C++/Java: コンパイル方式(先に実行ファイルを作る)`,explain:"私たちがキーボードで打ったコマンドを受け取り、それをOS(オペレーティングシステム)に伝えて実行させてくれるプログラムを「シェル」と呼びます(bashやzshなど)。一方、書かれたプログラムをコンピュータが実行する方式には主に2種類あります。pythonのように、コードを1行ずつその場で解釈しながら実行する方式を「インタプリタ方式」、C++やJavaのように、実行の前に専用の変換作業(コンパイル)を行って実行ファイルを作っておく方式を「コンパイル方式」と呼びます。インタプリタ方式はすぐに試せる手軽さがあり、コンパイル方式は事前に変換しておく分、実行時の速度が速い傾向があります。"}],qs:[{before:`class Creature{
public:
  virtual int attack()`,after:`; // 純粋仮想関数にする書き方(末尾に何をつける？)
};`,answers:["=0","= 0"],explain:"普通のメンバ関数はint attack(){ return 10; } のように、必ず処理の中身({ }の部分)を書く必要があります。しかし関数の宣言の末尾に=0をつけて virtual int attack()=0; のように書くと、それは中身を持たない「純粋仮想関数」になります。これは「この関数がどう動くべきかは、このクラスの時点では決めません。実際にどう動くかは、必ず派生クラス側で用意してください」という強制力のある約束です。もし派生クラスで実装し忘れると、そのクラスは依然として抽象クラスのままになり、オブジェクトを作ろうとした時点でコンパイルエラーになります。"},{before:`class Creature{
public:
  virtual int attack()=0;
  virtual int damaged(int pt)=0;
};
// 純粋仮想関数を1つ以上含むこのようなクラスを何と呼ぶか(漢字で)
`,after:"",answers:["抽象クラス"],explain:"純粋仮想関数(=0がついた関数)を1つでも含むクラスは「抽象クラス」と呼ばれます。この例のCreatureクラスは「生き物にはattackとdamagedという機能があるはずだ」という共通のルール(設計図の骨組み)だけを決めていて、具体的にどんな攻撃をするか、どうダメージを受けるかという中身は、それぞれの生き物(HeroやMonsterなどの派生クラス)に任せています。「Creatureという抽象的な生き物」は実際には存在せず、実際に存在するのは具体的なHeroやMonsterだけ、という現実の感覚とも一致する、自然な設計の考え方です。"},{before:`class Creature{
public:
  virtual int attack()=0;
};
int main(){
  Creature c; // これは実行できるか「できる」か「できない」で答えなさい
}
`,after:"",answers:["できない"],explain:"Creatureは純粋仮想関数attack()を持つ抽象クラスです。「attack()を実行したときに具体的に何をするか」が決まっていない以上、C++のコンパイラは「Creature c;のようにオブジェクトを作られても、attack()を呼ばれたときにどう動けばよいか分からない」と判断し、抽象クラスのオブジェクトを直接作ることを禁止しています。実際に使うためには、Creatureを継承した派生クラスの中でattack()の中身をきちんと実装(オーバーライド)し、「約束を果たした具体的なクラス」にしてから、そちらのオブジェクトを作る必要があります。"},{before:`// 人とOS(オペレーティングシステム)とのインターフェースとなるプログラムを何と呼ぶか、英単語で書きなさい
`,after:"",answers:["shell","シェル"],explain:"私たちが普段パソコンを操作するとき、その裏側ではOS(オペレーティングシステム)がハードウェアや様々なプログラムを管理しています。ただしOSの中身に直接命令を送るのは複雑なので、間に立って人間の入力を受け取り、OSに伝えて実行させてくれるプログラムが用意されています。これを「シェル」と呼び、代表例としてMacやLinuxでよく使われるbash、zshや、Windowsのpowershellなどがあります。shellはもともと「殻」という意味の単語で、複雑なOSの中身を人間が直接触らなくても済むように、外側から優しく包んでいるイメージから名付けられています。"},{before:`// pythonのように、コマンドをその都度解釈しながら実行する方式を何と呼ぶか、カタカナで書きなさい
`,after:"",answers:["インタプリタ"],explain:"インタプリタは、書かれたプログラムのコードを1行ずつその場で読み取り、意味を解釈しながら順番に実行していく仕組みです。人が外国語の文章を、辞書を引きながらその場で1文ずつ訳していく様子に近いイメージです。pythonはこのインタプリタ方式で実行される言語で、書いたコードをすぐに%python ファイル名.pyのように実行できる手軽さがある一方、実行するたびに解釈作業が挟まるため、後述するコンパイル方式に比べると実行速度は遅くなりがちです。"},{before:`// C言語系やJavaのように、実行の前に専用の作業を行って実行ファイルを作る方式を何と呼ぶか書きなさい
`,after:"",answers:["コンパイル"],explain:"コンパイルは、人間が読み書きしやすい言葉(ソースコード)で書かれたプログラムを、コンピュータのCPUが直接理解できる「機械語」に変換し、実行ファイルとして作り上げる作業です。この変換専用のプログラムを「コンパイラ」と呼びます(g++はC++用のコンパイラの1つです)。C言語系やJavaはこの方式を採用しており、プログラムを書いたらまずコンパイルという準備の工程を挟んで実行ファイルを作り、その後で./実行ファイル名のように実行します。実行前に変換を済ませておく分、実行時にはすでに機械語になっているため、インタプリタ方式に比べて実行速度が速くなる傾向があります。"},{before:`// アイコンやボタンを使った直感的な操作方式(Graphical User Interface)の略称をアルファベット3文字で書きなさい
`,after:"",answers:["GUI"],explain:"人がコンピュータやプログラムとやり取りする方法(インターフェース)には、大きく分けて2つのタイプがあります。1つはGUI(Graphical User Interface)で、アイコンやボタンなど目で見て分かる視覚的な部品をマウスやタッチで操作する、直感的なインターフェースです(PowerPointやSafariなど)。もう1つはCLI(Command Line Interface)で、文字でコマンドを入力して操作するインターフェースです(ターミナルでのcdやls, gitのコマンドなど)。GUIは初めて触る人にも分かりやすい一方、CLIは操作の手順が決まっている作業を素早く・正確に繰り返すのに向いている、というそれぞれの得意分野があります。"},{before:`class Shape{
public:
  virtual double area()`,after:`; // 純粋仮想関数にする書き方(末尾に何をつける？)
};`,answers:["=0","= 0"],explain:"関数の宣言の末尾に=0をつけると純粋仮想関数になり、実装を派生クラスに義務づけられます。"},{before:`class Shape{
public:
  virtual double area()=0;
};
class Square : public Shape{
public:
  double area(){ return 9; }
};
Square s;
cout << s.area() << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["9"],explain:"Squareはarea()を実装しているので、そのまま呼び出すと9が返ります。"},{before:`class Shape{
public:
  virtual double area()=0;
};
class Square : public Shape{
public:
  double area(){ return 9; }
};
Shape* p = `,after:"; // Squareのオブジェクトをnewで生成してpに指させる",answers:["new Square()"],explain:"抽象クラス自身のオブジェクトは作れませんが、実装を完成させたSquareのオブジェクトをnewで生成し、Shape型のポインタに指させることはできます。"},{before:`// 文字でコマンドを入力して操作するインターフェースの略称をアルファベット3文字で書きなさい
`,after:"",answers:["CLI"],explain:"CLI(Command Line Interface)は、文字でコマンドを入力して操作するインターフェースです。"},{before:`// 抽象クラス自身のオブジェクトを直接生成することはできるか(できる/できないで答えなさい)
`,after:"",answers:["できない"],explain:"純粋仮想関数を持つ抽象クラスは、実装が決まっていないため、そのままオブジェクトを生成することはできません。"},{before:`class Task{
public:
  virtual void run()=0;
};
class SimpleTask : public Task{
public:
  void run(){ cout << "実行" << endl; }
};
SimpleTask t;
t.run(); // `,after:"",lead:"出力される内容を書きなさい。",answers:["実行"],explain:'SimpleTaskはrun()を実装しているので、呼び出すと"実行"が出力されます。'},{before:`// virtualキーワードがついていない普通の関数と違い、純粋仮想関数には何が無いか(漢字で)
`,after:"",answers:["中身","実装"],explain:"純粋仮想関数は中身(実装)を持たず、派生クラスでの実装を義務づけるだけの宣言です。"},{before:`// ソースコードを機械語に変換するプログラムを何と呼ぶか(カタカナで)
`,after:"",answers:["コンパイラ"],explain:"ソースコードを機械語に変換するプログラムをコンパイラと呼びます。"}],qsHard:[{type:"debug",before:`class Creature{
public:
  virtual int attack()=0;
};
int main(){
  Creature c;
} // このコードはコンパイルエラーになる。理由を「抽象クラス」という語を使って一言で書きなさい
`,after:"",answers:["抽象クラスだから","Creatureが抽象クラスだから"],explain:"Creatureは純粋仮想関数attack()を持つ抽象クラスです。中身が決まっていない関数がある以上、オブジェクトを直接作ることはできません。実際に使うには、派生クラスでattack()を実装してから、そちらのオブジェクトを作る必要があります。"},{type:"choice",lead:"抽象クラスから直接オブジェクトを作れない理由として正しいものを選びなさい。",options:["純粋仮想関数の中身が決まっておらず、呼び出し方法が定まらないから","メモリが足りないから","継承回数が多すぎるから","コンストラクタが存在しないから"],answers:["純粋仮想関数の中身が決まっておらず、呼び出し方法が定まらないから"],explain:"純粋仮想関数(=0がついた関数)は中身(実装)が無いため、そのままではその関数が呼ばれたときにどう動けばよいか決まりません。そのためコンパイラは抽象クラスのオブジェクト生成を禁止しています。"},{type:"order",lines:[{label:"A",code:`class Creature{
public:
  virtual int attack()=0;
};`},{label:"B",code:`class Hero : public Creature{
public:
  int attack(){ return 10; }
};`},{label:"C",code:`Hero h;
cout << h.attack() << endl;`}],answers:["A,B,C"],explain:"まず純粋仮想関数を持つ抽象クラスを定義し(A)、それを継承した派生クラスで実装を完成させ(B)、その派生クラスのオブジェクトを作って呼び出します(C)。抽象クラスCreature自身のオブジェクトは作れません。"},{type:"debug",before:`class Shape{
public:
  virtual double area()`,after:`; // 純粋仮想関数にする書き方(この関数に中身を持たせない)
};`,answers:["=0","= 0"],explain:"関数の宣言の末尾に=0をつけると純粋仮想関数になり、実装を派生クラスに義務づけられます。"},{type:"choice",lead:"virtualキーワードをつけた関数の説明として正しいものを選びなさい。",options:["派生クラス側でオーバーライドされることを前提とした関数","必ず中身を持たない関数","コンストラクタの一種","staticなメンバ関数"],answers:["派生クラス側でオーバーライドされることを前提とした関数"],explain:"virtualをつけた関数は、派生クラス側で同じ名前・引数のメソッドとして再定義(オーバーライド)されることを前提とした関数です。=0をつけると純粋仮想関数になり、実装自体を持たなくなります。"},{type:"order",lines:[{label:"A",code:`class Shape{
public:
  virtual double area()=0;
};`},{label:"B",code:`class Circle : public Shape{
  double r;
public:
  Circle(double radius){ r=radius; }
  double area(){ return r*r*3.14; }
};`},{label:"C",code:`Shape* s = new Circle(2);
cout << s->area() << endl; // 12.56`}],answers:["A,B,C"],explain:"抽象クラスを定義し(A)、実装を完成させた派生クラスを定義し(B)、抽象クラス型のポインタから呼び出します(C)。"},{type:"debug",before:`class Task{
public:
  virtual void run()=0;
  virtual bool `,after:"()=0; // 完了確認用の純粋仮想関数を追加する(isDoneという名前)",answers:["isDone"],explain:"1つの抽象クラスには純粋仮想関数をいくつでも追加できます。run()に加えてisDone()も追加すれば、両方の実装を派生クラスに義務づけられます。"},{before:`class Task{
public:
  virtual void run()=0;
};
class PrintTask : public Task{
public:
  void run(){ cout << "印刷中" << endl; }
};
Task* t = new PrintTask();
t->run(); // `,after:"",lead:"出力される内容を書きなさい。",answers:["印刷中"],explain:'tはTask型のポインタですが、実際に指しているPrintTaskのrun()が呼ばれるので、"印刷中"が出力されます。'},{type:"debug",before:`class Instrument{
public:
  virtual void sound()=0;
};
class Piano : public Instrument{
public:
  `,after:`sound(){ cout << "ピアノの音" << endl; }
}; // オーバーライドのために戻り値の型を補いなさい`,answers:["void"],explain:"オーバーライドするメソッドは、基本クラス側と同じ戻り値の型・引数で定義する必要があります。"},{type:"order",lines:[{label:"A",code:"Vehicle* items[2];"},{label:"B",code:`items[0] = new Car();
items[1] = new Bike();`},{label:"C",code:"for(int i=0;i<2;i++) cout << items[i]->wheels() << endl;"}],answers:["A,B,C"],explain:"抽象クラス型のポインタ配列を用意し(A)、異なる派生クラスのオブジェクトを格納し(B)、同じループでそれぞれのwheels()を呼び出します(C)。"},{type:"choice",lead:"純粋仮想関数を持つクラスのポインタ(例: Shape*)を宣言することはできるか選びなさい。",options:["できる(オブジェクト自体は生成できないがポインタは宣言できる)","できない","派生クラスの数だけ必要","ポインタ経由でしか継承できない"],answers:["できる(オブジェクト自体は生成できないがポインタは宣言できる)"],explain:"抽象クラスそのもののオブジェクトは生成できませんが、そのクラス型のポインタを宣言すること自体は問題なくでき、派生クラスのオブジェクトを指させて使います。"},{type:"debug",before:`class Vehicle{
public:
  int wheels()=0; // virtualが抜けている。正しく補いなさい
};
`,after:"",answers:["virtual int wheels()=0;"],explain:"純粋仮想関数として宣言するには、virtualキーワードと末尾の=0の両方が必要です。"},{type:"order",lines:[{label:"A",code:`class Payable{
public:
  virtual int amount()=0;
};`},{label:"B",code:`class FixedPrice : public Payable{
  int price;
public:
  FixedPrice(int p){ price=p; }
  int amount(){ return price; }
};`},{label:"C",code:`Payable* p = new FixedPrice(500);
cout << p->amount() << endl; // 500`}],answers:["A,B,C"],explain:"抽象クラスを定義し(A)、実装を完成させた派生クラスを定義し(B)、ポインタ経由で呼び出します(C)。"},{type:"choice",lead:"1つの抽象クラスから複数の異なる派生クラスを作ることの利点として正しいものを選びなさい。",options:["共通のインターフェースを保ちながら、それぞれ異なる実装を持たせられる","必ず実行速度が上がる","メモリを一切使わなくなる","派生クラス同士でデータを共有できる"],answers:["共通のインターフェースを保ちながら、それぞれ異なる実装を持たせられる"],explain:"抽象クラスは「これだけは必ず実装してください」という共通の窓口(インターフェース)を定め、各派生クラスがそれぞれ異なる具体的な中身を実装できるようにします。"},{type:"debug",before:`class Creature{
public:
  virtual int attack()=0;
};
int main(){
  Creature* c = new `,after:`(); // Creatureは抽象クラスなので、直接newできない。実装済みの適当な派生クラス名を書きなさい(Heroとする)
}`,answers:["Hero"],explain:"Creature自身は抽象クラスなのでnewできませんが、実装を完成させた派生クラス(Hero)のオブジェクトなら生成でき、Creature*型のポインタに指させることができます。"}],qsExtra:[{before:`class Creature{
public:
  virtual int attack()=0;
  virtual void `,after:"(int pt)=0; // ダメージを受ける処理も純粋仮想関数として追加したい",answers:["damaged"],explain:"1つの抽象クラスに、純粋仮想関数はいくつでも追加できます。attack()に加えてvirtual void damaged(int pt)=0;も追加しておけば、「攻撃する」だけでなく「ダメージを受ける」という振る舞いも、派生クラスに実装を義務づけることができます。"},{before:`class Creature{
public:
  virtual int attack()=0;
};
`,after:"",lead:"Creatureを継承し、attack()が5を返すMonsterクラスを定義しなさい。",answers:[`class Monster : public Creature{
public:
int attack(){ return 5; }
};`],explain:"HeroだけでなくMonsterも同じCreatureを継承して、それぞれ違う中身のattack()を実装できます。同じ抽象クラスから、異なる具体的な振る舞いを持つ複数の派生クラスを作れる、という抽象クラスの利点を表しています。"},{type:"debug",long:!0,before:`class Creature{
public:
  virtual int attack()=0;
};
class Hero : public Creature{
public:
  int attack(){ return 10; }
};
class Monster : public Creature{
public:
  int attack(){ return 5; }
};
int main(){
`,after:`
}`,lead:"Creature型のポインタhero、monsterを用意してHero、Monsterのオブジェクトをそれぞれnewで生成して指させ、両方のattack()の戻り値を1行ずつ出力する処理を書きなさい。",answers:[`Creature* hero = new Hero();
Creature* monster = new Monster();
cout << hero->attack() << endl;
cout << monster->attack() << endl;`],explain:"抽象クラスCreature自身のオブジェクトは作れませんが、Creature型のポインタに、それを継承したHeroやMonsterのオブジェクト(newで生成した実体)を指させることはできます。ポインタ経由でメンバにアクセスするので、hero->attack()のようにアロー演算子を使い、実際に指しているクラスのattack()がそれぞれ呼ばれます。"},{type:"debug",long:!0,before:`class Creature{
public:
  virtual int attack()=0;
  virtual void damaged(int pt)=0;
};
`,after:"",lead:"Creatureを継承し、attack()は10を返し、damaged(int pt)は何もしない(空の処理)Heroクラスを定義しなさい。",answers:[`class Hero : public Creature{
public:
int attack(){ return 10; }
void damaged(int pt){ }
};`],explain:"抽象クラスが持つ純粋仮想関数は、継承した派生クラス側で全て実装しないと、その派生クラスも依然として抽象クラスのままになりオブジェクトを作れません。damaged(int pt)を「何もしない空の処理{ }」として実装するだけでも、「実装済み」として扱われ、Heroは具体的なクラスになります。"},{type:"choice",lead:"GUIとCLIの違いとして正しい説明を選びなさい。",options:["GUIは視覚的な部品を操作し、CLIは文字でコマンドを入力して操作する","GUIはインタプリタ方式、CLIはコンパイル方式である","GUIはシェルの一種である","CLIはマウス操作専用のインターフェースである"],answers:["GUIは視覚的な部品を操作し、CLIは文字でコマンドを入力して操作する"],explain:"GUI(Graphical User Interface)はアイコンやボタンなど目で見て分かる部品をマウスやタッチで操作するインターフェース、CLI(Command Line Interface)は文字でコマンドを入力して操作するインターフェースです。インタプリタ/コンパイルはプログラムの実行方式の話であり、GUI/CLIとは別の軸の概念です。"},{type:"order",lines:[{label:"A",code:`class Creature{
public:
  virtual int attack()=0;
};`},{label:"B",code:`class Hero : public Creature{
public:
  int attack(){ return 10; }
};`},{label:"C",code:"Creature* c = new Hero();"},{label:"D",code:"cout << c->attack() << endl; // 10"}],lead:"Creature型のポインタでHeroのattack()を呼び出すプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"抽象クラスCreatureを定義し(A)、それを継承して実装を完成させたHeroを定義し(B)、Creature型のポインタcにnewしたHeroオブジェクトを指させ(C)、->で呼び出します(D)。cの型はCreatureですが、実際に指しているのはHeroなので、Hero側のattack()(10)が呼ばれます。"},{before:`class Playable{
public:
  virtual void play()=0;
};
class Video : public Playable{
public:
  void `,after:`(){ cout << "再生中" << endl; }
};`,lead:"Videoクラスでplay()を実装する行を完成させなさい(引数なし)。",answers:["play"],explain:"Playableが持つ純粋仮想関数play()を、Videoクラスの中で同じ名前・同じ引数(なし)で実装(オーバーライド)することで、Videoは具体的なクラスになりオブジェクトを作れるようになります。"},{before:`Playable* p = new Video();
p->`,after:"(); // playメソッドを呼び出す",answers:["play"],explain:"Playable型のポインタpは、実際にはVideoオブジェクトを指しています。p->play();と呼ぶと、Video側で実装されたplay()が実行されます。"},{type:"debug",long:!0,before:`class Playable{
public:
  virtual void play()=0;
};
class Video : public Playable{
public:
  void play(){ cout << "動画再生" << endl; }
};
class Audio : public Playable{
public:
  void play(){ cout << "音声再生" << endl; }
};
int main(){
`,after:`
  return 0;
}`,lead:"Playable*型の配列itemsに、newしたVideoとAudioを1つずつ格納し、for文で両方のplay()を呼び出す処理を書きなさい。",answers:[`Playable* items[2];
items[0] = new Video();
items[1] = new Audio();
for(int i=0;i<2;i++){
items[i]->play();
}`],explain:"Playable型のポインタ配列には、VideoでもAudioでも、Playableを継承したどんなクラスのオブジェクトでも格納できます。ループの中でitems[i]->play()を呼ぶと、実際に指している種類に応じて正しいplay()が選ばれます。"},{type:"choice",lead:"コンパイル方式とインタプリタ方式の一般的な特徴として正しい説明を選びなさい。",options:["コンパイル方式は事前に変換するため実行が速い傾向がある","インタプリタ方式は必ずコンパイル方式より高速に動く","コンパイル方式は1行ずつその場で実行する","インタプリタ方式は実行ファイルを事前に作る"],answers:["コンパイル方式は事前に変換するため実行が速い傾向がある"],explain:"コンパイル方式(C++やJavaなど)は実行前にあらかじめ機械語に変換しておくため、実行時にはすでに変換済みで実行速度が速い傾向があります。インタプリタ方式(pythonなど)は1行ずつその場で解釈しながら実行するため、手軽な反面、実行速度はコンパイル方式に劣りがちです。"},{type:"order",lines:[{label:"A",code:`class Playable{
public:
  virtual void play()=0;
};`},{label:"B",code:`class Video : public Playable{
public:
  void play(){ cout << "動画再生" << endl; }
};`},{label:"C",code:`Playable* p = new Video();
p->play();`}],lead:"抽象クラスPlayableとそれを実装するVideoクラスを使うプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"純粋仮想関数を持つ抽象クラスを定義し(A)、それを継承して実装したクラスを定義し(B)、抽象クラス型のポインタにそのオブジェクトを指させて呼び出します(C)。"},{before:`class Vehicle{
public:
  virtual int wheels()`,after:`; // 純粋仮想関数にする書き方
};`,answers:["=0","= 0"],explain:"関数の宣言の末尾に=0をつけると純粋仮想関数になり、中身の実装を派生クラスに義務づけられます。"},{before:`class Vehicle{
public:
  virtual int wheels()=0;
};
class Car : public Vehicle{
public:
  int `,after:`(){ return 4; }
};`,answers:["wheels"],explain:"Vehicleが持つ純粋仮想関数wheels()を、Carクラスの中で同じ名前・同じ引数(なし)で実装(オーバーライド)します。"},{type:"choice",lead:"抽象クラスがオブジェクトを直接生成できない理由として正しいものを選びなさい。",options:["純粋仮想関数の中身が決まっておらず、呼び出し方が定まらないから","メモリが足りないから","継承回数が多すぎるから","コンストラクタが無いから"],answers:["純粋仮想関数の中身が決まっておらず、呼び出し方が定まらないから"],explain:"抽象クラスは純粋仮想関数の具体的な中身を持っていません。もしオブジェクトを作れてしまうと、その関数を呼んだときにどう動くべきか決まらないため、C++は抽象クラスのオブジェクト生成を禁止しています。"},{type:"debug",long:!0,before:`class Vehicle{
public:
  virtual int wheels()=0;
};
class Car : public Vehicle{
public:
  int wheels(){ return 4; }
};
class Bike : public Vehicle{
public:
  int wheels(){ return 2; }
};
int totalWheels(Vehicle** vs, int n){
`,after:`
}`,lead:"vs(Vehicle型ポインタの配列)のn台ぶんのwheels()の合計をreturnする処理を書きなさい。",answers:[`int total=0;
for(int i=0;i<n;i++){
total += vs[i]->wheels();
}
return total;`],explain:"CarでもBikeでも、Vehicle*として同じ配列にまとめて格納できます。1つずつvs[i]->wheels()を呼び出せば、実際の乗り物に応じた正しい車輪数が計算され、totalに足し込まれます。"},{before:`// マウスやタッチでアイコンを操作する直感的なインターフェースの略称(アルファベット3文字)
`,after:"",answers:["GUI"],explain:"GUI(Graphical User Interface)は、アイコンやボタンなど目で見て分かる部品をマウスやタッチで操作する、直感的なインターフェースです。"},{before:`// 文字でコマンドを入力して操作するインターフェースの略称(アルファベット3文字)
`,after:"",answers:["CLI"],explain:"CLI(Command Line Interface)は、文字でコマンドを入力して操作するインターフェースです。ターミナルでのcdやls、gitのコマンドなどが該当します。"},{type:"order",lines:[{label:"A",code:`class Vehicle{
public:
  virtual int wheels()=0;
};`},{label:"B",code:`class Car : public Vehicle{
public:
  int wheels(){ return 4; }
};`},{label:"C",code:`Vehicle* v = new Car();
cout << v->wheels() << endl; // 4`}],lead:"抽象クラスVehicleとそれを実装するCarクラスを使うプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"純粋仮想関数を持つ抽象クラスを定義し(A)、それを継承して実装したクラスを定義し(B)、抽象クラス型のポインタにそのオブジェクトを指させて呼び出します(C)。"},{type:"choice",lead:"抽象クラスを継承した派生クラスが、純粋仮想関数を1つでも実装し忘れた場合どうなるか選びなさい。",options:["その派生クラスも依然として抽象クラスのままになりオブジェクトを作れない","自動的に空の実装が補われる","警告だけでオブジェクトは作れる","継承自体ができなくなる"],answers:["その派生クラスも依然として抽象クラスのままになりオブジェクトを作れない"],explain:"純粋仮想関数をすべて実装して初めて、そのクラスは「具体的なクラス」になります。1つでも実装し忘れると、その派生クラスも抽象クラスのままとみなされ、オブジェクトを生成しようとするとコンパイルエラーになります。"},{before:`// 人の入力を受け取りOSに伝えて実行させるプログラム(bashやzshなど)を何と呼ぶか(カタカナで)
`,after:"",answers:["シェル"],explain:"シェルは、人が入力したコマンドを受け取り、OSに伝えて実行させてくれるプログラムです。bashやzsh、Windowsのpowershellなどが代表例です。"},{type:"choice",lead:"コンパイル方式の言語で書かれたプログラムを実行するために必要な、事前の変換作業を行うプログラムを何と呼ぶか選びなさい。",options:["コンパイラ","インタプリタ","シェル","エディタ"],answers:["コンパイラ"],explain:"コンパイラは、人間が読み書きしやすいソースコードを、コンピュータが直接理解できる機械語に変換するプログラムです。g++はC++用のコンパイラの1つです。"},{before:`class Vehicle{
public:
  virtual int wheels()=0;
};
class Bike : public Vehicle{
public:
  int wheels(){ return `,after:`; }
}; // 自転車の車輪の数(半角数字)`,answers:["2"],explain:"自転車の車輪は2つなので、Bikeクラスのwheels()は2をreturnするように実装します。"},{before:`class Instrument{
public:
  virtual void sound()`,after:`; // 純粋仮想関数にする書き方
};`,answers:["=0","= 0"],explain:"関数の宣言の末尾に=0をつけると純粋仮想関数になり、その実装を派生クラスに義務づけられます。"},{before:`class Instrument{
public:
  virtual void sound()=0;
};
class Piano : public Instrument{
public:
  void `,after:`(){ cout << "ピアノの音" << endl; }
};`,answers:["sound"],explain:"Instrumentが持つ純粋仮想関数sound()を、Pianoクラスの中で同じ名前・同じ引数で実装(オーバーライド)します。"},{before:`class Instrument{
public:
  virtual void sound()=0;
};
class Guitar : public Instrument{
public:
`,after:`
};`,lead:'sound()を実装し、"ギターの音"と出力するGuitarクラスを完成させなさい。',answers:['void sound(){ cout << "ギターの音" << endl; }'],explain:"純粋仮想関数sound()を、指定された内容で実装することで、Guitarは具体的なクラスになります。"},{before:`class Shape{
public:
  virtual double area()=0;
};
class Square : public Shape{
  double side;
public:
  Square(double s){ side=s; }
  double `,after:`(){ return side*side; }
};`,answers:["area"],explain:"Shapeが持つ純粋仮想関数area()を、Squareクラスの中でside*sideを返す処理として実装します。"},{before:`class Employee{
public:
  virtual int salary()=0;
};
// このクラスのオブジェクトを直接生成することはできるか(日本語で)
`,after:"",answers:["できない"],explain:"純粋仮想関数を持つEmployeeは抽象クラスなので、そのままオブジェクトを生成することはできません。継承して実装を完成させた派生クラスのオブジェクトを作る必要があります。"},{before:`class Task{
public:
  virtual void run()=0;
  virtual bool `,after:"()=0; // 完了しているかどうかも純粋仮想関数として追加したい",answers:["isDone"],explain:"1つの抽象クラスには純粋仮想関数をいくつでも追加できます。run()に加えてisDone()も追加すれば、「実行する」と「完了しているか調べる」という両方の振る舞いを派生クラスに義務づけられます。"},{before:`class Creature{
public:
  virtual int attack()=0;
};
`,after:"",lead:"Creatureを継承し、attack()が20を返すDragonクラスを定義しなさい。",answers:[`class Dragon : public Creature{
public:
int attack(){ return 20; }
};`],explain:"同じCreatureという抽象クラスから、HeroやMonsterとは別に、20を返すattack()を持つDragonという新しい派生クラスを作れます。"},{before:`class Playable{
public:
  virtual void play()=0;
};
`,after:"",lead:'Playableを継承し、play()が"曲を再生"と出力するMusicクラスを定義しなさい。',answers:[`class Music : public Playable{
public:
void play(){ cout << "曲を再生" << endl; }
};`],explain:"純粋仮想関数play()を、指定された内容(「曲を再生」の出力)で実装したMusicクラスを定義します。"},{before:`class Shape{
public:
  virtual double area()=0;
};
`,after:"",lead:"Shapeを継承し、半径rを受け取るコンストラクタとarea()(r*r*3.14をreturn)を持つCircleクラスを定義しなさい。",answers:[`class Circle : public Shape{
  double r;
public:
Circle(double radius){ r=radius; }
double area(){ return r*r*3.14; }
};`],explain:"コンストラクタで半径を受け取って保存し、area()では円の面積の公式(半径×半径×円周率)をreturnするように実装します。"},{before:`class Task{
public:
  virtual void run()=0;
  virtual bool isDone()=0;
};
`,after:"",lead:"Taskを継承し、run()は何もしない空処理、isDone()は常にtrueを返すSimpleTaskクラスを定義しなさい。",answers:[`class SimpleTask : public Task{
public:
void run(){ }
bool isDone(){ return true; }
};`],explain:"純粋仮想関数は、空の処理{ }としてでも実装さえすれば「実装済み」として扱われ、そのクラスは具体的なクラスになります。"},{before:`class Vehicle{
public:
  virtual int wheels()=0;
};
`,after:"",lead:"Vehicleを継承し、wheels()が3を返すTricycleクラスを定義しなさい。",answers:[`class Tricycle : public Vehicle{
public:
int wheels(){ return 3; }
};`],explain:"三輪車(Tricycle)の車輪は3つなので、wheels()は3をreturnするように実装します。"},{before:`class Employee{
public:
  virtual int salary()=0;
};
`,after:"",lead:"Employeeを継承し、salary()が300000を返すEngineerクラスを定義しなさい。",answers:[`class Engineer : public Employee{
public:
int salary(){ return 300000; }
};`],explain:"純粋仮想関数salary()を、固定値300000を返す処理として実装したEngineerクラスを定義します。"},{before:`class Instrument{
public:
  virtual void sound()=0;
};
class Piano : public Instrument{
public:
  void sound(){ cout << "ピアノの音" << endl; }
};
Instrument* p = new Piano();
p->`,after:"(); // soundメソッドを呼び出す",answers:["sound"],explain:"pはInstrument型のポインタですが、実際にはPianoオブジェクトを指しているので、p->sound()を呼ぶとPiano側の実装が実行されます。"},{before:`class Shape{
public:
  virtual double area()=0;
};
class Circle : public Shape{
  double r;
public:
  Circle(double radius){ r=radius; }
  double area(){ return r*r*3.14; }
};
Shape* s = new Circle(2);
cout << s->area() << endl; // `,after:"",lead:"出力される値を書きなさい。",answers:["12.56"],explain:"半径2の円の面積は2*2*3.14=12.56です。sはShape型ですが、実際に指しているCircleのarea()が呼ばれます。"},{before:`class Creature{
public:
  virtual int attack()=0;
};
class Hero : public Creature{
public:
  int attack(){ return 10; }
};
class Dragon : public Creature{
public:
  int attack(){ return 20; }
};
Creature* arr[2];
arr[0] = new Hero();
arr[1] = new Dragon();
int total=0;
for(int i=0;i<2;i++) total += arr[i]->`,after:"();",answers:["attack"],explain:"配列に格納された種類(HeroかDragon)に応じて、arr[i]->attack()はそれぞれ正しいattack()を呼び出します。1つのループで異なる種類のオブジェクトを同じように扱えるのが、ポリモーフィズムの特徴です。"},{before:`class Task{
public:
  virtual bool isDone()=0;
};
class SimpleTask : public Task{
public:
  bool isDone(){ return true; }
};
Task* t = new SimpleTask();
cout << t->isDone() << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["1"],explain:"SimpleTaskのisDone()は常にtrueを返すので、t->isDone()はtrue(=1)を返します。"},{before:`class Vehicle{
public:
  virtual int wheels()=0;
};
class Car : public Vehicle{
public:
  int wheels(){ return 4; }
};
class Tricycle : public Vehicle{
public:
  int wheels(){ return 3; }
};
Vehicle* v1 = new Car();
Vehicle* v2 = new Tricycle();
cout << v1->wheels() + v2->`,after:"() << endl; // 7が表示される",answers:["wheels"],explain:"v1->wheels()は4(Car)、v2->wheels()は3(Tricycle)なので、合計すると7になります。"},{before:`class Employee{
public:
  virtual int salary()=0;
};
class Engineer : public Employee{
public:
  int salary(){ return 300000; }
};
Employee* e = new Engineer();
cout << e->salary() << endl; // `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["300000"],explain:"eはEmployee型ですが、実際に指しているEngineerのsalary()(300000を返す)が呼ばれます。"},{type:"choice",lead:"純粋仮想関数(virtual ... =0;)を持つクラスを何と呼ぶか選びなさい。",options:["抽象クラス","具象クラス","静的クラス","最終クラス"],answers:["抽象クラス"],explain:"1つ以上の純粋仮想関数を持つクラスを抽象クラスと呼びます。抽象クラスはそのままではオブジェクトを生成できず、派生クラスで実装を完成させる必要があります。"},{type:"choice",lead:"抽象クラス型のポインタに、その派生クラスのオブジェクトを指させることはできるか選びなさい。",options:["できる","できない","派生クラスが1つのときだけできる","コンパイルエラーになる"],answers:["できる"],explain:"抽象クラス自身のオブジェクトは作れませんが、抽象クラス型のポインタに、newで生成した派生クラスのオブジェクトを指させることは問題なくできます。"},{type:"choice",lead:"同じ基本クラス型のポインタ配列に異なる派生クラスのオブジェクトをまとめて格納し、同じメソッド呼び出しでそれぞれ異なる処理を実行させる仕組みを何と呼ぶか選びなさい。",options:["ポリモーフィズム(多態性)","カプセル化","オーバーロード","スコープ解決"],answers:["ポリモーフィズム(多態性)"],explain:"同じ型のポインタや同じメソッド呼び出しでも、実際に指しているオブジェクトの種類に応じて異なる処理が実行される性質をポリモーフィズム(多態性)と呼びます。"},{type:"choice",lead:"抽象クラスにコンストラクタを定義することはできるか選びなさい。",options:["できる(派生クラスの初期化時に呼ばれる)","できない","constのみ定義できる","デストラクタしか定義できない"],answers:["できる(派生クラスの初期化時に呼ばれる)"],explain:"抽象クラス自身のオブジェクトは作れませんが、コンストラクタは定義でき、派生クラスのオブジェクトが生成されるときに(継承の仕組みで)呼び出されます。"},{type:"choice",lead:"純粋仮想関数を持つクラスをそのまま(newで)生成しようとするとどうなるか選びなさい。",options:["コンパイルエラーになる","空のオブジェクトが作られる","実行時に無視される","自動的に派生クラスが選ばれる"],answers:["コンパイルエラーになる"],explain:"抽象クラスは実装が決まっていない純粋仮想関数を持つため、そのままオブジェクトを生成しようとするとコンパイルエラーになります。"},{type:"choice",lead:"GUIアプリとCLIアプリのうち、一般的にプログラミング初学者が最初に触れることが多いのはどちらとされるか選びなさい。",options:["CLI(ターミナルでのコマンド操作)","GUI(アイコンやボタン操作)","どちらも同時に学ぶのが一般的","決まっていない"],answers:["CLI(ターミナルでのコマンド操作)"],explain:"多くのプログラミング学習では、コンパイラの実行やファイル操作など、ターミナルでコマンドを入力するCLIの操作を先に学ぶことが一般的とされています。"},{type:"order",lines:[{label:"A",code:`class Instrument{
public:
  virtual void sound()=0;
};`},{label:"B",code:`class Piano : public Instrument{
public:
  void sound(){ cout << "ピアノの音" << endl; }
};`},{label:"C",code:`Instrument* p = new Piano();
p->sound();`}],lead:"抽象クラスInstrumentとそれを実装するPianoクラスを使うプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"純粋仮想関数を持つ抽象クラスを定義し(A)、それを継承して実装したクラスを定義し(B)、抽象クラス型のポインタにそのオブジェクトを指させて呼び出します(C)。"},{type:"order",lines:[{label:"A",code:`class Shape{
public:
  virtual double area()=0;
};`},{label:"B",code:`class Square : public Shape{
  double side;
public:
  Square(double s){ side=s; }
  double area(){ return side*side; }
};`},{label:"C",code:`Shape* s = new Square(3);
cout << s->area() << endl; // 9`}],lead:"抽象クラスShapeとそれを実装するSquareクラスを使うプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"抽象クラスを定義し(A)、実装を完成させた派生クラスを定義し(B)、抽象クラス型のポインタから呼び出します(C)。3*3=9が出力されます。"},{type:"order",lines:[{label:"A",code:"Vehicle* items[2];"},{label:"B",code:`items[0] = new Car();
items[1] = new Tricycle();`},{label:"C",code:"for(int i=0;i<2;i++) cout << items[i]->wheels() << endl;"}],lead:"異なる派生クラスのオブジェクトをまとめて処理するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"Vehicle型のポインタ配列を用意し(A)、異なる種類のオブジェクトを格納し(B)、同じループの中でそれぞれのwheels()を呼び出します(C)。"},{type:"debug",long:!0,before:`class Shape{
public:
  virtual double area()=0;
};
class Rectangle : public Shape{
  double w,h;
public:
`,after:`
};`,lead:"wとhを受け取るコンストラクタと、w*hをreturnするarea()を、あわせて定義しなさい。",answers:[`Rectangle(double width,double height){ w=width; h=height; }
double area(){ return w*h; }`],explain:"コンストラクタで幅と高さを受け取って保存し、area()ではその積(w*h)をそのままreturnします。"},{type:"debug",long:!0,before:`class Shape{
public:
  virtual double area()=0;
};
double totalArea(Shape** shapes, int n){
`,after:`
}`,lead:"shapes(Shape型ポインタの配列)のn個分のarea()の合計をreturnする処理を書きなさい。",answers:[`double total=0;
for(int i=0;i<n;i++){
total += shapes[i]->area();
}
return total;`],explain:"配列に格納されているのがどんな図形でも、shapes[i]->area()と呼べばそれぞれの図形に応じた面積が計算され、totalに足し込まれます。"},{type:"debug",long:!0,before:`class Creature{
public:
  virtual int attack()=0;
  virtual bool isAlive()=0;
};
class Slime : public Creature{
  int hp;
public:
`,after:`
};`,lead:"hpを100で初期化するコンストラクタと、attack()(3を返す)、isAlive()(hpが0より大きいかをreturn)を、あわせて定義しなさい。",answers:[`Slime(){ hp=100; }
int attack(){ return 3; }
bool isAlive(){ return hp>0; }`],explain:"Creatureが持つ2つの純粋仮想関数(attack、isAlive)を、それぞれSlime向けの内容で実装します。"},{type:"debug",long:!0,before:`class Payable{
public:
  virtual int amount()=0;
};
int totalPayable(Payable** items, int n){
`,after:`
}`,lead:"items(Payable型ポインタの配列)のn個分のamount()の合計をreturnする処理を書きなさい。",answers:[`int total=0;
for(int i=0;i<n;i++){
total += items[i]->amount();
}
return total;`],explain:"それぞれの要素のamount()を呼び出して合計に足し込む、ポリモーフィズムを使った集計処理の典型的なパターンです。"},{type:"debug",long:!0,before:`class Task{
public:
  virtual bool isDone()=0;
};
int countDone(Task** tasks, int n){
`,after:`
}`,lead:"tasks(Task型ポインタの配列)のうち、isDone()がtrueのものの個数をreturnする処理を書きなさい。",answers:[`int count=0;
for(int i=0;i<n;i++){
if(tasks[i]->isDone()) count++;
}
return count;`],explain:"各要素のisDone()を調べ、trueであればcountを1増やし、最後にreturnします。"},{type:"debug",long:!0,before:`class Playable{
public:
  virtual void play()=0;
};
void playAll(Playable** items, int n){
`,after:`
}`,lead:"items(Playable型ポインタの配列)のn個分のplay()を順番に呼び出す処理を書きなさい。",answers:[`for(int i=0;i<n;i++){
items[i]->play();
}`],explain:"配列の各要素についてplay()を呼び出すだけの単純なループです。実際に格納されている種類に応じて、それぞれ異なる再生処理が実行されます。"},{type:"debug",long:!0,before:`class Vehicle{
public:
  virtual int wheels()=0;
};
class Bus : public Vehicle{
public:
`,after:`
};`,lead:"wheels()が6を返すBusクラスの中身を完成させなさい。",answers:["int wheels(){ return 6; }"],explain:"大型バスなどは車輪が6つになることがあるという想定で、wheels()が6を返すように実装します。"},{type:"debug",long:!0,before:`class Employee{
public:
  virtual int salary()=0;
};
int totalSalary(Employee** emps, int n){
`,after:`
}`,lead:"emps(Employee型ポインタの配列)のn人分のsalary()の合計をreturnする処理を書きなさい。",answers:[`int total=0;
for(int i=0;i<n;i++){
total += emps[i]->salary();
}
return total;`],explain:"各従業員のsalary()を呼び出して合計に足し込みます。役職によってsalary()の実装が異なっていても、同じループで処理できます。"},{before:`// 人間が読み書きしやすいソースコードを、コンピュータが理解できる機械語に事前に変換するプログラムを何と呼ぶか(カタカナで)
`,after:"",answers:["コンパイラ"],explain:"コンパイラは、ソースコードを実行前にあらかじめ機械語に変換するプログラムです。g++はC++用のコンパイラの1つです。"},{before:`// ソースコードを1行ずつその場で解釈しながら実行する方式を何方式と呼ぶか(カタカナで)
`,after:"",answers:["インタプリタ"],explain:"インタプリタ方式は、ソースコードを事前に変換せず、1行ずつその場で解釈しながら実行する方式です。pythonなどがこの方式を採用しています。"},{before:`// bashやzshのように、人の入力を受け取りOSに伝えて実行させるプログラムを何と呼ぶか(カタカナで)
`,after:"",answers:["シェル"],explain:"シェルは、人が入力したコマンドを受け取り、OSに伝えて実行させてくれるプログラムです。"},{before:`// マウスやタッチでアイコンを操作する直感的なインターフェースの略称を書きなさい(アルファベット3文字)
`,after:"",answers:["GUI"],explain:"GUI(Graphical User Interface)は、目で見て分かる部品をマウスやタッチで操作するインターフェースです。"},{before:`// 文字でコマンドを入力して操作するインターフェースの略称を書きなさい(アルファベット3文字)
`,after:"",answers:["CLI"],explain:"CLI(Command Line Interface)は、文字でコマンドを入力して操作するインターフェースです。"},{before:`class Shape{
public:
  virtual double area()=0;
};
class Triangle : public Shape{
  double base, height;
public:
  Triangle(double b,double h){ base=b; height=h; }
  double area(){ return base*height/2; }
};
Triangle t(4,3);
cout << t.area() << endl; // `,after:"",lead:"出力される値を書きなさい。",answers:["6"],explain:"三角形の面積は「底辺×高さ÷2」なので、4*3/2=6になります。"}],qsExpert:[{type:"debug",long:!0,before:`#include <iostream>
using namespace std;
class Creature{
public:
  virtual int attack()=0;
};
class Hero : public Creature{
public:
  int attack(){ return 10; }
};
class Monster : public Creature{
public:
  int attack(){ return 5; }
};
int main(){
`,after:`
  return 0;
}`,lead:"Creature*型の配列partyに、newで生成したHeroとMonsterを1体ずつ格納し、for文で両方のattack()の結果を1行ずつ出力する処理を書きなさい。",answers:[`Creature* party[2];
party[0] = new Hero();
party[1] = new Monster();
for(int i=0;i<2;i++){
cout << party[i]->attack() << endl;
}`],explain:"Creature型のポインタ配列には、Creatureを継承したどんな具体的なクラス(HeroでもMonsterでも)のオブジェクトでも格納できます。ループの中でparty[i]->attack()を呼ぶと、実際に指しているクラスに応じて、それぞれ正しいattack()が自動的に選ばれて実行されます。"},{type:"debug",long:!0,before:`class Creature{
public:
  virtual int attack()=0;
  virtual void damaged(int pt)=0;
};
class Hero : public Creature{
  int HP;
public:
  Hero(){ HP=50; }
  int attack(){ return 10; }
  void damaged(int pt){ HP-=pt; }
  int getHP(){ return HP; }
};
int main(){
`,after:`
  return 0;
}`,lead:"heroというHeroオブジェクトを生成し、damaged(20)を呼んでから、getHP()の結果を出力する処理を書きなさい。",answers:[`Hero hero;
hero.damaged(20);
cout << hero.getHP() << endl;`],explain:"Heroはattack()とdamaged()の両方の純粋仮想関数を実装し終えているので、具体的なクラスとしてオブジェクトを生成できます。damaged(20)を呼ぶとHPが50から20減って30になり、getHP()もその30を返します。"},{type:"debug",long:!0,before:`class Creature{
public:
  virtual int attack()=0;
};
class Hero : public Creature{
public:
  int attack(){ return 10; }
};
class Monster : public Creature{
public:
  int attack(){ return 5; }
};
int totalAttack(Creature** party, int n){
`,after:`
}`,lead:"party(Creature型ポインタの配列)のn体ぶんのattack()の合計をreturnする処理を書きなさい。",answers:[`int total=0;
for(int i=0;i<n;i++){
total += party[i]->attack();
}
return total;`],explain:"Creature*の配列を関数に渡すと、Creature**(ポインタへのポインタ)として受け取ります。party[i]で1体ずつ取り出し、->attack()を呼んで合計に足し込む、という考え方は今までの配列の合計計算と同じです。"},{type:"debug",long:!0,before:`class Shape{
public:
  virtual double area()=0;
};
class Square : public Shape{
  double side;
public:
  Square(double s){ side=s; }
  double area(){ return side*side; }
};
class Circle : public Shape{
  double radius;
public:
  Circle(double r){ radius=r; }
  double area(){ return radius*radius*3.14; }
};
int main(){
`,after:`
  return 0;
}`,lead:"Shape*型のポインタshapeに、newしたSquare(4)を指させ、area()の結果を出力する処理を書きなさい。",answers:[`Shape* shape = new Square(4);
cout << shape->area() << endl;`],explain:"Shapeは面積を求めるarea()を純粋仮想関数として持つ抽象クラスです。Square(4)は一辺4の正方形なので、area()は4*4=16を返します。Shape型のポインタにSquareのオブジェクトを指させても、->で呼ぶとSquare側のarea()が実行されます。"},{type:"debug",long:!0,before:`class Shape{
public:
  virtual double area()=0;
};
class Square : public Shape{
  double side;
public:
  Square(double s){ side=s; }
  double area(){ return side*side; }
};
class Circle : public Shape{
  double radius;
public:
  Circle(double r){ radius=r; }
  double area(){ return radius*radius*3.14; }
};
double totalArea(Shape** shapes, int n){
`,after:`
}`,lead:"shapes(Shape型ポインタの配列)のn個ぶんのarea()の合計をreturnする処理を書きなさい。",answers:[`double total=0;
for(int i=0;i<n;i++){
total += shapes[i]->area();
}
return total;`],explain:"SquareでもCircleでも、Shape*として同じ配列にまとめて格納できます。1つずつshapes[i]->area()を呼び出せば、それぞれの実際の形に応じた正しい面積が計算され、totalに足し込まれていきます。"},{type:"debug",long:!0,before:`class Shape{
public:
  virtual double area()=0;
};
class Square : public Shape{
  double side;
public:
  Square(double s){ side=s; }
  double area(){ return side*side; }
};
class Circle : public Shape{
  double radius;
public:
  Circle(double r){ radius=r; }
  double area(){ return radius*radius*3.14; }
};
int main(){
`,after:`
  return 0;
}`,lead:"Shape*型の配列shapesに、newしたSquare(3)とCircle(2)を格納し、for文で両方のarea()を1行ずつ出力する処理を書きなさい。",answers:[`Shape* shapes[2];
shapes[0] = new Square(3);
shapes[1] = new Circle(2);
for(int i=0;i<2;i++){
cout << shapes[i]->area() << endl;
}`],explain:"Shape型のポインタ配列に、異なる具体的な図形(SquareとCircle)を格納し、同じループで両方のarea()を呼び出しています。"},{type:"debug",long:!0,before:`class Vehicle{
public:
  virtual int wheels()=0;
};
class Car : public Vehicle{
public:
  int wheels(){ return 4; }
};
class Bike : public Vehicle{
public:
  int wheels(){ return 2; }
};
int totalWheels(Vehicle** vs, int n){
  int total=0;
  for(int i=0;i<n;i++){
    total += vs[i]->wheels();
  }
  return total;
}
int main(){
`,after:`
  return 0;
}`,lead:"Vehicle*型の配列vsに、newしたCarとBikeを1台ずつ格納し、totalWheels(vs,2)の結果を出力する処理を書きなさい(6になるはず)。",answers:[`Vehicle* vs[2];
vs[0] = new Car();
vs[1] = new Bike();
cout << totalWheels(vs,2) << endl;`],explain:"Carのwheels()は4、Bikeのwheels()は2なので、合計すると6になります。"},{type:"debug",long:!0,before:`class Employee{
public:
  virtual int salary()=0;
};
class Engineer : public Employee{
public:
  int salary(){ return 300000; }
};
class Manager : public Employee{
public:
  int salary(){ return 400000; }
};
int main(){
`,after:`
  return 0;
}`,lead:"Employee*型の配列empsに、newしたEngineerとManagerを1人ずつ格納し、for文で両方のsalary()の合計を出力する処理を書きなさい(700000になるはず)。",answers:[`Employee* emps[2];
emps[0] = new Engineer();
emps[1] = new Manager();
int total=0;
for(int i=0;i<2;i++){
total += emps[i]->salary();
}
cout << total << endl;`],explain:"Engineerのsalary()は300000、Managerのsalary()は400000なので、合計すると700000になります。"},{type:"debug",long:!0,before:`class Task{
public:
  virtual bool isDone()=0;
};
class SimpleTask : public Task{
  bool done;
public:
  SimpleTask(bool d){ done=d; }
  bool isDone(){ return done; }
};
int countDone(Task** tasks, int n){
  int count=0;
  for(int i=0;i<n;i++){
    if(tasks[i]->isDone()) count++;
  }
  return count;
}
int main(){
`,after:`
  return 0;
}`,lead:"Task*型の配列tasksに、newしたSimpleTask(true)とSimpleTask(false)を格納し、countDone(tasks,2)の結果を出力する処理を書きなさい(1になるはず)。",answers:[`Task* tasks[2];
tasks[0] = new SimpleTask(true);
tasks[1] = new SimpleTask(false);
cout << countDone(tasks,2) << endl;`],explain:"trueのタスクが1つだけなので、countDoneの結果は1になります。"},{type:"debug",long:!0,before:`class Instrument{
public:
  virtual void sound()=0;
};
class Piano : public Instrument{
public:
  void sound(){ cout << "ピアノの音" << endl; }
};
class Guitar : public Instrument{
public:
  void sound(){ cout << "ギターの音" << endl; }
};
void playAll(Instrument** items, int n){
`,after:`
}`,lead:"items(Instrument型ポインタの配列)のn個分のsound()を順番に呼び出す処理を書きなさい。",answers:[`for(int i=0;i<n;i++){
items[i]->sound();
}`],explain:"各要素についてsound()を呼び出すだけの単純なループです。実際に格納されている楽器の種類に応じて、異なる音の出力が実行されます。"},{type:"debug",long:!0,before:`class Instrument{
public:
  virtual void sound()=0;
};
class Piano : public Instrument{
public:
  void sound(){ cout << "ピアノの音" << endl; }
};
class Guitar : public Instrument{
public:
  void sound(){ cout << "ギターの音" << endl; }
};
void playAll(Instrument** items, int n){
  for(int i=0;i<n;i++){
    items[i]->sound();
  }
}
int main(){
`,after:`
  return 0;
}`,lead:"Instrument*型の配列itemsに、newしたPianoとGuitarを格納し、playAll(items,2)を呼び出す処理を書きなさい。",answers:[`Instrument* items[2];
items[0] = new Piano();
items[1] = new Guitar();
playAll(items,2);`],explain:"itemsに異なる楽器を格納し、playAll関数にまとめて渡すことで、それぞれのsound()が順番に呼ばれます。"},{type:"debug",long:!0,before:`class Shape{
public:
  virtual double area()=0;
};
class Rectangle : public Shape{
  double w,h;
public:
  Rectangle(double width,double height){ w=width; h=height; }
  double area(){ return w*h; }
};
double totalArea(Shape** shapes, int n){
  double total=0;
  for(int i=0;i<n;i++){
    total += shapes[i]->area();
  }
  return total;
}
int main(){
`,after:`
  return 0;
}`,lead:"Shape*型の配列shapesに、newしたRectangle(2,3)とRectangle(4,5)を格納し、totalArea(shapes,2)の結果を出力する処理を書きなさい(26になるはず)。",answers:[`Shape* shapes[2];
shapes[0] = new Rectangle(2,3);
shapes[1] = new Rectangle(4,5);
cout << totalArea(shapes,2) << endl;`],explain:"2*3=6と4*5=20を合計すると26になります。"},{type:"debug",long:!0,before:`class Payable{
public:
  virtual int amount()=0;
};
class FixedPrice : public Payable{
  int price;
public:
  FixedPrice(int p){ price=p; }
  int amount(){ return price; }
};
class Discounted : public Payable{
  int price;
  int discount;
public:
  Discounted(int p,int d){ price=p; discount=d; }
  int amount(){ return price-discount; }
};
int totalPayable(Payable** items, int n){
  int total=0;
  for(int i=0;i<n;i++){
    total += items[i]->amount();
  }
  return total;
}
int main(){
`,after:`
  return 0;
}`,lead:"Payable*型の配列itemsに、newしたFixedPrice(1000)とDiscounted(2000,300)を格納し、totalPayable(items,2)の結果を出力する処理を書きなさい(2700になるはず)。",answers:[`Payable* items[2];
items[0] = new FixedPrice(1000);
items[1] = new Discounted(2000,300);
cout << totalPayable(items,2) << endl;`],explain:"FixedPrice(1000)のamount()は1000、Discounted(2000,300)のamount()は2000-300=1700なので、合計すると2700になります。"},{type:"debug",long:!0,before:`class Employee{
public:
  virtual int salary()=0;
};
class Engineer : public Employee{
public:
  int salary(){ return 300000; }
};
class Manager : public Employee{
public:
  int salary(){ return 400000; }
};
int findHighestPaidIndex(Employee** emps, int n){
`,after:`
}`,lead:"emps配列の中で最もsalary()が高い要素のインデックスをreturnする処理を書きなさい。",answers:[`int maxIdx=0;
for(int i=1;i<n;i++){
if(emps[i]->salary()>emps[maxIdx]->salary()) maxIdx=i;
}
return maxIdx;`],explain:"配列の最大値探しと同じ考え方で、maxIdxが指す要素のsalary()より高い要素が見つかるたびに更新します。"},{type:"debug",long:!0,before:`class Vehicle{
public:
  virtual int wheels()=0;
};
class Car : public Vehicle{
public:
  int wheels(){ return 4; }
};
class Bike : public Vehicle{
public:
  int wheels(){ return 2; }
};
double averageWheels(Vehicle** vs, int n){
`,after:`
}`,lead:"vs配列n台ぶんのwheels()の平均をdouble型でreturnする処理を書きなさい。",answers:[`int total=0;
for(int i=0;i<n;i++){
total += vs[i]->wheels();
}
return (double)total/n;`],explain:"合計を求めたあと(double)で変換してから台数nで割ることで、平均を正しく小数として求められます。"}],qsDrag:[{type:"dragfill",lead:"純粋仮想関数を持つ抽象クラスと、それを実装する派生クラスになるよう、正しいピースを空欄に配置しなさい。",lines:[{code:"class Creature{"},{code:"public:"},{blank:"b1"},{code:"};"},{code:"class Hero : public Creature{"},{code:"public:"},{blank:"b2"},{code:"};"}],pieces:[{id:"p1",code:"virtual int attack()=0;"},{id:"p2",code:"int attack(){ return 10; }"},{id:"p3",code:"int attack()=0;"}],answerMap:{b1:"p1",b2:"p2"},explain:"純粋仮想関数にするにはvirtualと=0の両方が必要です(p1)。p3のようにvirtualを付け忘れると、=0という書き方自体が文法的に成立せずコンパイルエラーになります。HeroはCreatureを継承し、attack()の中身を実装することで具体的なクラスになります(p2)。"}]},{id:"py",title:"CASE 12「姿を変えた容疑者」",sub:"Week C pythonのクラス基礎",emoji:"🐍",mon:"Pythonに姿を変えた容疑者",lesson:[{title:"関数とクラスの基本",code:`def add(x, y):
    return x + y

class Hero:
    def __init__(self, name):
        self.name = name`,explain:'C++ではint, void, boolのように戻り値の型を書いて関数を定義しましたが、pythonではdefというキーワードだけを使い、型は一切書かずに関数を定義します。クラスを定義するときはclassキーワードを使い、__init__という特別な名前のメソッドがC++のコンストラクタに相当します。__init__は、Hero("勇者")のようにオブジェクトを生成した瞬間に自動的に呼ばれ、その中で self.name = name のように書くことで、そのオブジェクト専用のデータ(データメンバ)を作ることができます。'},{title:"継承とsuper()",code:`class Monster:
    def __init__(self, hp):
        self.HP = hp

class Boss(Monster):
    def __init__(self, hp, name):
        super().__init__(hp)
        self.name = name`,explain:"pythonでクラスを継承するときは、class Boss(Monster): のように、クラス名の後ろの括弧に親クラス(継承元のクラス)の名前を書きます。C++のclass Derived : public Base とほぼ同じ役割です。親クラスのコンストラクタに相当する__init__を呼び出したいときは、super()という特殊な書き方を使い、super().__init__(hp) のようにします。superは「親」を表し、super().__init__(hp)は「親クラスの__init__を、引数hpを渡して呼び出す」という意味になります。これによって、親クラスが管理しているデータ(self.HP)の初期化を親クラス自身に任せることができます。"},{title:"複数の戻り値と*args",code:`def cal(x, y):
    return x+y, x-y
add, sub = cal(3, 2)

def func(*arg):
    print(arg)  # タプルになる`,explain:"C++の関数はreturnで1つの値しか返せませんでしたが、pythonでは return x+y, x-y のようにカンマ区切りで複数の値をまとめて書くことができ、これにより複数の値を同時に呼び出し元へ返せます。呼び出す側でも add, sub = cal(3, 2) のように、複数の変数をカンマ区切りで並べておけば、それぞれに対応する値を一度に受け取れます。また、関数を定義する際に引数名の前に*をつけると(*arg)、呼び出すときに渡された引数の個数がいくつであっても、それらをまとめて1つの「タプル」というデータとして受け取ることができます。"}],qs:[{before:"",after:` add(x, y):
    return x + y  # pythonで関数を定義するキーワード`,answers:["def"],explain:"pythonでは関数をdefキーワードで定義します。C++のようにint, voidといった戻り値の型を書く必要はありません。defの後に関数名、括弧の中に引数を書き、最後にコロン(:)をつけて改行し、そこから字下げ(インデント)された行が、その関数の中身とみなされます。C++が{ }でブロックの範囲を表していたのに対し、pythonでは字下げの深さそのものが「どこからどこまでが1つの関数か」を表す文法的な意味を持っている点が大きな違いです。字下げがずれるとエラーになるので注意しましょう。"},{before:`class Hero:
    def __init__(`,after:`, name):
        self.name = name  # クラスのメソッドの第一引数として、インスタンス自身を表すために慣習的に使う名前`,answers:["self"],explain:"pythonのクラスに定義するメソッド(関数)は、C++と違って自動的にオブジェクト自身を認識してくれるわけではなく、必ず第一引数として「このメソッドを呼び出したインスタンス自身」を明示的に受け取るという決まりがあります。この第一引数の名前は文法上どんな名前でも構わないのですが、世界中のpythonプログラマがselfという名前を使う慣習になっているため、自分もそれに合わせておくのが安全です。self.name = name のように書くと、渡された名前(name)を「このインスタンス固有のデータ」として保存でき、他のメソッドからもself.nameとして参照できるようになります。"},{before:`class Monster:
    def __init__(self, hp):
        self.HP = hp
class Boss(Monster):
    def __init__(self, hp, name):
        `,after:`().__init__(hp)
        self.name = name  # 親クラス(Monster)のコンストラクタを呼び出す書き方`,answers:["super"],explain:"super()という特別な書き方を使うと、今のクラスの親クラス(継承元のクラス)が持っているメソッドを呼び出すことができます。super().__init__(hp) は「親クラス(この場合はMonster)の__init__(コンストラクタに相当するもの)を、引数hpを渡して呼び出しなさい」という意味です。これによって、親クラスがすでに用意している初期化処理(self.HP = hpの部分)をそのまま再利用でき、Bossクラスの__init__では自分が新しく追加した部分(self.name = name)の初期化だけを書けばよくなります。これはC++の継承で、派生クラスのコンストラクタから:Base(引数)と書いて基本クラスのコンストラクタを呼び出していたのと、役割としては全く同じ考え方です。"},{before:"def func(",after:`arg):
    print(arg)
    print(type(arg))  # 複数の引数をまとめて受け取りたいときに引数名の前につける記号`,answers:["*"],explain:'関数を定義するときに引数名の前に*をつけると(この例では*arg)、その関数を呼び出すときに渡された引数がいくつであっても、それらをすべてまとめて1つの「タプル」というデータ型として受け取ることができます。たとえばfunc("Test", [1,2,3])のように2つの引数を渡すと、関数の中ではargが("Test", [1,2,3])というタプルになります。ここでの*は、C++のポインタで使う「間接参照演算子」の*とは全く別の意味を持つ記号なので、混同しないように注意してください。pythonの*は「複数の値をまとめる/ばらす」という意味で使われます。'},{before:`def cal(x, y):
    return x+y`,after:" x-y  # 2つの値を同時に戻したいとき、returnの後ろに挟む記号",answers:[","],explain:"C++の関数は1つの値しか返せませんでしたが、pythonの関数は return x+y, x-y のように、returnの後ろにカンマ区切りで複数の値を並べて書くだけで、複数の値を一度に返すことができます。実はこの書き方は内部的には自動的にタプルという1つのまとまりを作って返しており、呼び出す側で add, sub = cal(3,2) のようにカンマ区切りの複数の変数で受け取ると、そのタプルの中身がそれぞれの変数にきれいに振り分けられます(このような代入の仕方をアンパックと呼びます)。"},{before:`class Hero:
    def __init__(self, name):
        self.name = name
# selfをつけずにただ「name = name」とだけ書いた場合どうなるか
# 「ローカル変数として扱われ、__init__を抜けると◯◯」の◯◯部分を書きなさい
`,after:"",answers:["消える","消えてしまう"],explain:"self.をつけずにただ name = name と書いてしまうと、それは__init__メソッドの中だけで一時的に使われる「ローカル変数」を作っているにすぎず、そのインスタンスに保存されるデータメンバにはなりません。ローカル変数は、それが宣言された関数(この場合は__init__)の実行が終わった瞬間に消えてしまうので、次に他のメソッドを呼んだときにはもうアクセスできず、「そんな変数は無い」というエラーになります。インスタンスに紐づいたデータとしてずっと保持しておきたい場合は、必ずself.name = name のようにself.をつけて代入する必要があります。"},{before:"if __name__ == ",after:`:
    print("直接実行された")
# このファイルが直接実行されたときだけ処理をしたい場合の書き方`,answers:["'__main__'",'"__main__"'],explain:`pythonの各ファイル(モジュール)には、__name__という特別な変数が自動的に用意されています。この変数の中身は、そのファイルを % python ファイル名.py のように直接実行したときだけ文字列"__main__"になり、逆に他のファイルからimport ファイル名 のように読み込まれて使われたときは、ファイル名そのもの(例えば"timeApp")になります。この違いを利用して、if __name__ == '__main__': という条件分岐の中に書いた処理は、「このファイルが直接実行されたときだけ動く、importされたときには動かない」という便利な使い分けができるようになります。ライブラリとして再利用したいクラスと、実際に動かして試すための処理を1つのファイルに共存させたいときによく使われるテクニックです。`},{before:"",after:` greet():
    print("Hi")  # pythonで関数を定義するキーワード`,answers:["def"],explain:"pythonでは関数をdefキーワードで定義します。"},{before:`class Item:
    def __init__(self, price):
        self.price = price

i = Item(100)
print(i.`,after:") # priceという属性にアクセスする",answers:["price"],explain:"インスタンスの属性には、i.priceのようにドットでアクセスできます。"},{before:`class Hero:
    def __init__(self, hp):
        self.hp = hp

h = Hero(50)
print(h.hp) # `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["50"],explain:"h.hpはコンストラクタで設定された50です。"},{before:`class Hero:
    def __init__(self, hp):
        self.hp = hp
    def show(self):
        print(self.hp)

h = Hero(30)
h.`,after:"() # showメソッドを呼び出す",answers:["show"],explain:"h.show()のようにドットと括弧をつけてメソッドを呼び出します。"},{before:`class Hero:
    def `,after:`(self, name):
        self.name = name # コンストラクタに相当する特別なメソッド名`,answers:["__init__"],explain:"__init__は、オブジェクトが生成された瞬間に自動的に呼ばれる、C++のコンストラクタに相当する特別なメソッドです。"},{before:`class Animal:
    def __init__(self, name):
        self.name = name

class Dog`,after:`:
    pass # DogがAnimalを継承するように括弧部分を補う`,answers:["(Animal)"],explain:"クラス名の後ろの括弧に親クラス名を書くことで継承できます。"},{before:`items = []
items.`,after:"(1) # リストの末尾に1を追加するメソッド",answers:["append"],explain:"append(値)は、リストの末尾に値を追加するメソッドです。"},{before:`// pythonでインスタンスに紐づけられたデータ(C++でいうデータメンバ)を何と呼ぶか(カタカナで)
`,after:"",answers:["属性","アトリビュート"],explain:"pythonでは、インスタンスに紐づけられたデータを属性(アトリビュート)と呼びます。"}],qsHard:[{type:"debug",before:`class Hero:
    def __init__(self, name):
        name = name  # selfが抜けているバグを直しなさい(代入先を直す)
`,after:"",answers:["self.name = name"],explain:"selfをつけずにname = nameと書くと、__init__の中だけで使われるローカル変数を作っているにすぎず、インスタンスのデータメンバにはなりません。インスタンスに保存したいデータはself.name = nameのように必ずself.をつけて代入する必要があります。"},{type:"choice",lead:"super().__init__(hp) の役割として正しいものを選びなさい。",options:["親クラスの__init__を、引数hpを渡して呼び出す","自分自身のクラスを継承する","hpという名前の新しいクラスを作る","親クラスを削除する"],answers:["親クラスの__init__を、引数hpを渡して呼び出す"],explain:"super()は親クラス(継承元)を参照するための特別な書き方です。super().__init__(hp)は「親クラスの__init__を、引数hpを渡して呼び出しなさい」という意味で、親クラスがすでに用意している初期化処理を再利用できます。"},{type:"order",lines:[{label:"A",code:`class Monster:
    def __init__(self, hp):
        self.HP = hp`},{label:"B",code:`class Boss(Monster):
    def __init__(self, hp, name):
        super().__init__(hp)
        self.name = name`},{label:"C",code:'b = Boss(100, "ドラゴン")'}],answers:["A,B,C"],explain:"親クラスMonsterを定義し(A)、それを継承したBossクラスでsuper()を使って親の初期化を再利用しつつ独自のデータを追加し(B)、最後にBossのオブジェクトを生成します(C)。親クラスの定義が無いと継承できません。"},{type:"debug",before:`class Hero:
    def __init__(self, hp):
        self.hp = hp
    def show(self):
        print(hp) # selfが抜けている。正しく直しなさい
`,after:"",answers:["print(self.hp)"],explain:"メソッドの中から自分自身の属性にアクセスするには、self.hpのようにselfをつける必要があります。"},{type:"choice",lead:"pythonの__init__メソッドの役割として正しいものを選びなさい。",options:["オブジェクト生成時に自動的に呼ばれ、属性を初期化する","クラスを削除する","親クラスを継承する","printを実行する"],answers:["オブジェクト生成時に自動的に呼ばれ、属性を初期化する"],explain:"__init__は、オブジェクトが生成された瞬間に自動的に呼ばれ、self.属性名=値のような形でインスタンスの属性を初期化する特別なメソッドです。"},{type:"order",lines:[{label:"A",code:`class Hero:
    def __init__(self, name):
        self.name = name`},{label:"B",code:'h = Hero("Yui")'},{label:"C",code:"print(h.name) # Yui"}],answers:["A,B,C"],explain:"クラスを定義し(A)、オブジェクトを生成し(B)、属性にアクセスして出力します(C)。"},{type:"debug",before:`class Hero:
    def show(`,after:`):
        print("Hero") # 第一引数(self)が抜けている`,answers:["self"],explain:"pythonのメソッドは、第一引数に必ずself(そのメソッドを呼び出しているインスタンス自身)を書く必要があります。"},{type:"choice",lead:"pythonでクラスAがクラスBを継承する正しい書き方を選びなさい。",options:["class A(B):","class A extends B:","class A : B:","class A inherits B:"],answers:["class A(B):"],explain:"pythonでは、クラス名の後ろの括弧に継承したい親クラスの名前を書きます。"},{type:"debug",before:`class Item:
    def __init__(self, price):
        self.price = price
    def show(self):
        print(price) # selfが抜けている
`,after:"",answers:["print(self.price)"],explain:"self.priceのようにselfをつけないと、インスタンスの属性ではなく未定義の変数を参照しようとしてエラーになります。"},{type:"order",lines:[{label:"A",code:`class Animal:
    def __init__(self, name):
        self.name = name`},{label:"B",code:`class Dog(Animal):
    def __init__(self, name):
        super().__init__(name)`},{label:"C",code:`d = Dog("Pochi")
print(d.name)`}],answers:["A,B,C"],explain:"親クラスを定義し(A)、super()で親の初期化を再利用する子クラスを定義し(B)、生成して属性を確認します(C)。"},{type:"debug",before:`class Hero:
    def __init__(self, hp=`,after:`):
        self.hp = hp # 省略時は100にしたい`,answers:["100"],explain:"デフォルト引数にhp=100と指定しておけば、引数を省略して生成したときに自動的に100が使われます。"},{type:"choice",lead:"同じクラスから生成された2つのインスタンスについて正しい説明を選びなさい。",options:["それぞれ独立した属性を持つ","属性を共有する","片方を変更するともう片方も変わる","2つ目のインスタンスは生成できない"],answers:["それぞれ独立した属性を持つ"],explain:"同じクラスから生成しても、各インスタンスは自分専用のself(属性の入れ物)を持つため、それぞれ独立した値を保持できます。"},{before:`class Hero:
    def __init__(self, name):
        self.name = name

h = Hero("A")
print(h.`,after:") # nameという属性にアクセスする",answers:["name"],explain:"インスタンスの属性には、h.nameのようにドットでアクセスできます。"},{type:"order",lines:[{label:"A",code:`class Hero:
    def __init__(self, hp):
        self.hp = hp
    def is_alive(self):
        return self.hp > 0`},{label:"B",code:`    def status(self):
        if self.is_alive():
            return "生存"
        return "戦闘不能"`},{label:"C",code:`h = Hero(50)
print(h.status())`}],answers:["A,B,C"],explain:"クラスを定義し(A,B)、statusメソッドの中でself.is_alive()という同じクラスの別のメソッドを呼び出しています。最後にオブジェクトを生成して確認します(C)。"},{before:`class Hero:
    def __init__(self, hp):
        self.hp = hp
    def heal(self, amount):
        self.hp += amount

h = Hero(20)
h.heal(30)
print(h.hp) # `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["50"],explain:"h.heal(30)によってself.hpが20から30増え、50になります。"}],qsExtra:[{before:`class Hero:
    def __init__(self, name):
        self.name = name
    def attack(self):
        return 10
    def show(self):
        print(`,after:".attack()) # 同じクラスの別のメソッドを呼び出すときにつける",answers:["self"],explain:"クラスの中の1つのメソッドから、同じクラスの別のメソッドを呼び出すときも、self.attack()のようにselfをつけて呼び出します。selfは「このメソッドを呼び出しているインスタンス自身」を指しているので、self.をつけることで「自分自身のattackメソッド」を呼んでいることが明確になります。"},{before:`class Hero:
    def `,after:`(self, name, hp=50):
        self.name = name
        self.hp = hp # コンストラクタの定義(hpを省略したときは50を使う)`,answers:["__init__"],explain:'pythonのコンストラクタに相当する__init__は、C++の関数と同じように引数にデフォルト値を設定できます。def __init__(self, name, hp=50): と書いておけば、Hero("勇者")のようにhpを省略して呼び出した場合は自動的に50が使われ、Hero("勇者", 80)のように渡せばその値が優先されます。'},{type:"debug",long:!0,before:"",after:"",lead:"nameを受け取り、hpは常に50を持つHeroクラスを、__init__とattack(常に10を返す)メソッドをあわせて定義しなさい。",answers:[`class Hero:
def __init__(self, name):
self.name = name
self.hp = 50
def attack(self):
return 10`],explain:"__init__の中でself.name、self.hpにそれぞれ値を設定し、インスタンスごとのデータとして持たせます。attackメソッドも同じインデントの深さでクラスの中に定義し、常に10を返すだけの単純な処理にします。"},{type:"debug",long:!0,before:`class Monster:
    def __init__(self, hp):
        self.hp = hp
    def attack(self):
        return 3
`,after:"",lead:"Monsterを継承し、super()で親を初期化しつつnameも追加で持ち、attack()を20を返すようにオーバーライドしたBossクラスを定義しなさい。",answers:[`class Boss(Monster):
def __init__(self, hp, name):
super().__init__(hp)
self.name = name
def attack(self):
return 20`],explain:"class Boss(Monster):で継承し、__init__ではsuper().__init__(hp)で親の初期化処理(self.hp=hp)を再利用しつつ、self.nameを追加で初期化します。attackメソッドを同じ名前・同じ引数でもう一度定義すれば、C++のオーバーライドと同じように、Boss側の定義(20を返す)が優先されます。"},{type:"choice",lead:"pythonでMonsterクラスを継承してBossクラスを定義するときの正しい書き方を選びなさい。",options:["class Boss(Monster):","class Boss extends Monster:","class Boss : Monster:","class Boss inherits Monster:"],answers:["class Boss(Monster):"],explain:"pythonでは、クラス名の後ろの括弧に継承したい親クラスの名前を書きます。class Boss(Monster): と書くだけで、BossはMonsterを継承します。extends、:(コロン単体)、inheritsといった書き方はpythonの文法には存在しません。"},{type:"order",lines:[{label:"A",code:`class Hero:
    def __init__(self, name):
        self.name = name
        self.hp = 50`},{label:"B",code:'h = Hero("勇者")'},{label:"C",code:"print(h.hp) # 50"}],lead:"Heroクラスを定義し、オブジェクトを生成してからhpを出力する正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:'クラスを定義してから(A)、そのクラスのオブジェクトを生成し(B)、生成したオブジェクトの属性(h.hp)にアクセスして出力します(C)。クラス定義より前にHero("勇者")を書くことはできません。'},{before:`class Hero:
    def __init__(self, name):
        self.name = name

h = Hero("A")
print(h.`,after:") # 属性nameにアクセスする",answers:["name"],explain:"インスタンスh の属性には、h.name のようにドットでアクセスできます。__init__の中でself.name = nameと保存しておいたので、hが生きているあいだはずっとh.nameで参照できます。"},{before:`class Hero:
    def __init__(self, hp):
        self.hp = hp
    def show(self):
        print(self.hp)

h = Hero(50)
`,after:"",lead:"hのshowメソッドを呼び出す行を書きなさい。",answers:["h.show()"],explain:"インスタンスのメソッドは、h.show()のようにドットをつけて括弧をつけて呼び出します。selfは自動的にhが渡されるので、呼び出すときに自分でselfを書く必要はありません。"},{type:"debug",long:!0,before:`class Hero:
    def __init__(self, hp):
        self.hp = hp
    def status(self):
`,after:"",lead:'statusメソッドの中身に、self.hpが0より大きければ"生存"を、そうでなければ"戦闘不能"をreturnする処理を書きなさい。',answers:[`if self.hp > 0:
    return "生存"
else:
    return "戦闘不能"`],explain:"if文でself.hpが0より大きいかどうかを判定し、条件に応じて異なる文字列をreturnします。C++のif/elseと同じ考え方ですが、pythonでは波括弧の代わりにインデント(字下げ)でブロックの範囲を表します。"},{type:"choice",lead:"pythonのクラスでコンストラクタに相当する特別なメソッド名はどれか選びなさい。",options:["__init__","__main__","__self__","__class__"],answers:["__init__"],explain:"__init__は、オブジェクトが生成された瞬間に自動的に呼ばれる特別なメソッドで、C++のコンストラクタに相当します。__main__はファイルが直接実行されたかどうかを判定するための特別な変数の値で、__init__とは別の仕組みです。"},{type:"order",lines:[{label:"A",code:`class Hero:
    def __init__(self, hp):
        self.hp = hp`},{label:"B",code:"h = Hero(30)"},{label:"C",code:"print(h.hp) # 30"}],lead:"Heroクラスを定義し、オブジェクトを生成してからhpを出力する正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"クラスを定義してから(A)、そのクラスのオブジェクトを生成し(B)、生成したオブジェクトの属性h.hpにアクセスして出力します(C)。"},{before:`class Hero:
    def __init__(self, name):
        self.name = name
    def greet(self):
        return "Hello, " + `,after:`
`,answers:["self.name"],explain:'self.nameでこのインスタンス自身のnameを取り出し、"Hello, "という文字列と連結してreturnします。'},{before:`class Hero:
    def __init__(self, name):
        self.name = name
    def greet(self):
        return "Hello, " + self.name

h = Hero("Yui")
`,after:"",lead:"hのgreetメソッドの戻り値をprintする行を書きなさい。",answers:["print(h.greet())"],explain:"h.greet()を呼び出すとgreetメソッドの戻り値(文字列)が得られるので、それをそのままprintで表示します。"},{type:"choice",lead:"pythonでself.hpのように書くとき、selfは何を表すか選びなさい。",options:["そのメソッドを呼び出しているインスタンス自身","クラス名そのもの","親クラス","グローバル変数"],answers:["そのメソッドを呼び出しているインスタンス自身"],explain:"selfは、そのメソッドを呼び出したインスタンス自身を表す慣習的な名前です。self.hpと書くことで「このインスタンス固有のhp」にアクセスできます。"},{before:`class Hero:
    def __init__(self, hp):
        self.hp = hp
    def heal(self, amount):
`,after:`
`,lead:"healメソッドの中身に、self.hpにamountを加算する処理(1行)を書きなさい。",answers:["self.hp += amount"],explain:"self.hp += amountは、self.hp = self.hp + amountと同じ意味です。呼び出すたびにhpがamountの分だけ増えます。"},{before:`class Hero:
    def __init__(self, hp):
        self.hp = hp
    def heal(self, amount):
        self.hp += amount

h = Hero(30)
h.heal(20)
`,after:"",lead:"h.hpの値をprintする行を書きなさい(結果は50になるはず)。",answers:["print(h.hp)"],explain:"h.heal(20)でhpが30から50に増えているので、print(h.hp)を実行すると50が表示されます。"},{before:`class Hero:
    def __init__(self, hp):
        self.hp = hp
    def isAlive(self):
        return self.hp > 0
    def status(self):
        if self.`,after:`():
            return "生存"
        return "戦闘不能"`,answers:["isAlive"],explain:"statusメソッドの中から、同じクラスの別のメソッドisAlive()を、self.isAlive()のように呼び出せます。"},{type:"order",lines:[{label:"A",code:`class Hero:
    def __init__(self, hp):
        self.hp = hp
    def heal(self, amount):
        self.hp += amount`},{label:"B",code:"h = Hero(30)"},{label:"C",code:"h.heal(20)"},{label:"D",code:"print(h.hp) # 50"}],lead:"Heroを定義し、hpを30で生成、20回復させてから出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"クラスを定義し(A)、hp=30で生成し(B)、heal(20)を呼んでhpを50にし(C)、最後にその値を出力します(D)。"},{type:"choice",lead:"pythonのクラスでメソッドを定義するとき、第一引数に書く慣習的な名前は何か選びなさい。",options:["self","this","me","instance"],answers:["self"],explain:"文法上どんな名前でも構いませんが、世界中のpythonプログラマがselfという名前を使う慣習になっています。"},{before:`class Item:
    def __init__(self, price):
        self.`,after:" = price",answers:["price"],explain:"コンストラクタの引数priceを、self.price = priceのようにインスタンス自身の属性として保存すると、他のメソッドからもself.priceとして参照できるようになります。"},{type:"debug",long:!0,before:`class Hero:
    def __init__(self, hp):
        self.hp = hp
    def damaged(self, pt):
        self.hp -= pt

`,after:"",lead:"h1 = Hero(50)とh2 = Hero(50)を生成し、h1だけにdamaged(20)を与えたあと、h1.hpとh2.hpを1行ずつprintする処理を書きなさい。",answers:[`h1 = Hero(50)
h2 = Hero(50)
h1.damaged(20)
print(h1.hp)
print(h2.hp)`],explain:"h1とh2はそれぞれ独立したhpを持つため、h1.damaged(20)を呼んでもh2には一切影響しません。h1.hpは30、h2.hpは50のまま出力されます。"},{before:`class Hero:
    def __init__(self, hp):
        self.hp = hp
    def isAlive(self):
        if self.hp > 0:
            return `,after:`
        return False`,answers:["True"],explain:"pythonの真偽値はTrue/False(先頭が大文字)と書きます。条件を満たすときはTrueをreturnします。"},{type:"choice",lead:"pythonで真偽値を表すキーワードとして正しいものを選びなさい。",options:["True と False(先頭大文字)","true と false(すべて小文字)","TRUE と FALSE(すべて大文字)","1 と 0のみ"],answers:["True と False(先頭大文字)"],explain:"pythonの真偽値リテラルはTrueとFalseで、どちらも先頭だけ大文字で書く決まりになっています。C++のtrue/false(すべて小文字)とは書き方が異なる点に注意しましょう。"},{before:`class Book:
    def __init__(self, title, pages):
        self.title = title
        self.`,after:" = pages",answers:["pages"],explain:"引数pagesを、self.pages = pagesのようにインスタンス自身の属性として保存します。"},{before:`class Book:
    def __init__(self, title, pages):
        self.title = title
        self.pages = pages

b = Book("Python入門", 200)
print(b.title, b.pages) # `,after:"",lead:"出力される内容を書きなさい。",answers:["Python入門 200"],explain:'b.titleは"Python入門"、b.pagesは200なので、print(b.title, b.pages)はこの2つをスペース区切りで表示します。'},{before:`class Counter:
    def __init__(self):
        self.count = `,after:`
    def increment(self):
        self.count += 1`,lead:"countを0で初期化する処理を書きなさい。",answers:["0"],explain:"カウンタは0から始めるのが自然なので、self.countを0で初期化します。"},{before:`class Counter:
    def __init__(self):
        self.count = 0
    def increment(self):
        self.count += 1

c = Counter()
c.increment()
c.increment()
print(c.count) # `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["2"],explain:"increment()を2回呼んだので、0から2に増えています。"},{before:`class Rectangle:
    def __init__(self, w, h):
        self.w = w
        self.h = h
    def area(self):
        return self.w * `,after:`
`,answers:["self.h"],explain:"長方形の面積は幅×高さなので、self.wにself.hを掛け合わせてreturnします。"},{before:`class Rectangle:
    def __init__(self, w, h):
        self.w = w
        self.h = h
    def area(self):
        return self.w * self.h

r = Rectangle(4,5)
print(r.area()) # `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["20"],explain:"4*5=20です。"},{before:`class Item:
    def __init__(self, name):
        self.name = name
    def show(self):
        print(`,after:`.name)
`,answers:["self"],explain:"メソッドの中から自分自身の属性にアクセスするには、self.nameのようにselfをつける必要があります。"},{before:`class Item:
    def __init__(self, name, price):
        self.name = name
        self.price = price

i = Item("Pen", 100)
i.price = 150
print(i.`,after:") # 150",answers:["price"],explain:"インスタンスの属性は生成後にも直接代入できます。i.price = 150で書き換えたので、i.priceは150になっています。"},{before:`class Item:
    def __init__(self, name):
        self.name = name

i1 = Item("A")
i2 = i1
i2.name = "B"
print(i1.name) # i2を変更するとi1も変わる(同じオブジェクトを指しているため)
`,after:"",lead:"出力される内容を書きなさい。",answers:["B"],explain:"i2 = i1は同じオブジェクトを指すようにするだけで、コピーは作られません。そのためi2.nameを変更すると、i1.nameも同じように変わって見えます。"},{before:`class Item:
    def __init__(self, name):
        self.name = name

i1 = Item("A")
i2 = Item("A")
print(i1 is i2) # 別々に生成されたオブジェクトなので
`,after:"",lead:"出力される内容を書きなさい(pythonのTrue/False)。",answers:["False"],explain:'i1とi2はそれぞれItem("A")で別々に生成された、異なるオブジェクトです。isは同じオブジェクトかどうかを調べる演算子なので、Falseになります。'},{before:`class Wallet:
    def __init__(self, money):
        self.money = money
    def spend(self, amount):
        self.money `,after:` amount
`,lead:"moneyからamountを引く演算子を書きなさい。",answers:["-="],explain:"-=はself.money = self.money - amountと同じ意味を短く書ける演算子です。"},{before:`class Wallet:
    def __init__(self, money):
        self.money = money
    def spend(self, amount):
        self.money -= amount

w = Wallet(1000)
w.spend(300)
print(w.money) # `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["700"],explain:"1000から300引かれるので700になります。"},{before:`class Animal:
    def __init__(self, name):
        self.name = name

class Dog`,after:`:
    pass
`,lead:"DogクラスがAnimalを継承するように、括弧部分を補いなさい。",answers:["(Animal)"],explain:"pythonでは、クラス名の後ろの括弧に継承したい親クラス名を書きます。class Dog(Animal):でDogはAnimalを継承します。"},{before:`class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "Woof"

d = Dog()
print(d.speak()) # `,after:"",lead:"出力される内容を書きなさい。",answers:["Woof"],explain:'DogはAnimalのspeak()をオーバーライドしているので、d.speak()は"Woof"を返します。'},{before:`class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        `,after:`.__init__(self, name)
        self.breed = breed
`,lead:"親クラスのコンストラクタを呼び出す書き方を書きなさい(super()を使う)。",answers:["super()"],explain:"super().__init__(name)と書くと、親クラス(Animal)の__init__を呼び出し、その中の処理(self.name=name)を再利用できます。"},{before:`class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed

d = Dog("Pochi", "柴犬")
print(d.name, d.breed) # `,after:"",lead:"出力される内容を書きなさい。",answers:["Pochi 柴犬"],explain:'super().__init__(name)でd.nameが"Pochi"に設定され、self.breed=breedでd.breedが"柴犬"に設定されます。'},{before:`class Shape:
    def area(self):
        return 0

class Circle(Shape):
    def __init__(self, r):
        self.r = r
    def `,after:`(self):
        return self.r * self.r * 3.14
`,lead:"area()をオーバーライドするメソッド名を書きなさい。",answers:["area"],explain:"親クラスと同じ名前areaでメソッドを再定義することで、Circle側の実装がオーバーライドとして優先されます。"},{before:`class Base:
    def greet(self):
        return "Hello"

class Derived(Base):
    pass

d = Derived()
print(d.greet()) # `,after:"",lead:"出力される内容を書きなさい(Derivedはgreetを再定義していないので継承したものがそのまま使われる)。",answers:["Hello"],explain:'Derivedはgreetをオーバーライドしていないので、継承元Baseのgreet()がそのまま呼ばれ、"Hello"が返ります。'},{type:"choice",lead:"pythonでクラスを継承するときの正しい書き方を選びなさい。",options:["class Child(Parent):","class Child extends Parent:","class Child : Parent:","class Child inherits(Parent):"],answers:["class Child(Parent):"],explain:"pythonでは、クラス名の後ろの括弧に継承したい親クラスの名前を書きます。extends、コロン単体、inheritsといった書き方はpythonの文法には存在しません。"},{type:"choice",lead:"super().__init__(...)の役割として正しいものを選びなさい。",options:["親クラスのコンストラクタを呼び出す","子クラスを削除する","selfを初期化する","親クラスを継承しないようにする"],answers:["親クラスのコンストラクタを呼び出す"],explain:"super().__init__(...)は、親クラスの__init__メソッドを呼び出し、その初期化処理を再利用するための書き方です。"},{type:"choice",lead:"同じクラス内の別のメソッドを呼び出すとき、pythonで必要な書き方を選びなさい。",options:["self.をつけて呼び出す","何もつけずそのまま呼び出す","クラス名をつけて呼び出す","superをつけて呼び出す"],answers:["self.をつけて呼び出す"],explain:"pythonでは、同じクラスの別のメソッドを呼び出す場合でも、self.methodName()のようにselfを明示する必要があります。C++と違い、selfなしでは呼び出せません。"},{type:"choice",lead:"pythonのインスタンスが持つデータ(C++でいうデータメンバ)を何と呼ぶことが多いか選びなさい。",options:["属性(アトリビュート)","リテラル","モジュール","デコレータ"],answers:["属性(アトリビュート)"],explain:"pythonでは、self.name = nameのようにインスタンスに紐づけられたデータのことを「属性(アトリビュート)」と呼びます。"},{type:"choice",lead:"2つの異なるインスタンスが、それぞれ別の属性の値を持てる理由として正しいものを選びなさい。",options:["それぞれのインスタンスが自分専用のself(属性の入れ物)を持つため","クラスが1つしか存在しないため","__init__が1回しか呼ばれないため","pythonには属性という概念が無いため"],answers:["それぞれのインスタンスが自分専用のself(属性の入れ物)を持つため"],explain:"各インスタンスは、生成されるたびに自分専用のself(属性を保持する領域)を持つため、同じクラスから作られても、それぞれ独立した値を保持できます。"},{type:"choice",lead:"pythonのメソッド定義で、第一引数にself以外の名前(例: this)を使うとどうなるか選びなさい。",options:["文法上は動くが、慣習に反するため避けるべき","必ずエラーになる","selfと同じ意味には絶対にならない","継承ができなくなる"],answers:["文法上は動くが、慣習に反するため避けるべき"],explain:"pythonの文法上は第一引数の名前は自由に決められますが、世界中のpythonプログラマがselfという名前を使う強い慣習があるため、それ以外の名前を使うのは避けるべきとされています。"},{type:"order",lines:[{label:"A",code:`class Animal:
    def __init__(self, name):
        self.name = name`},{label:"B",code:`class Dog(Animal):
    def speak(self):
        return "Woof"`},{label:"C",code:`d = Dog("Pochi")
print(d.speak()) # Woof`}],lead:"Animalを継承したDogクラスを定義し、オーバーライドしたメソッドを呼び出すプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"基本クラスAnimalを定義し(A)、それを継承してspeak()をオーバーライドするDogを定義し(B)、最後にオブジェクトを生成して呼び出します(C)。"},{type:"order",lines:[{label:"A",code:`class Counter:
    def __init__(self):
        self.count = 0
    def increment(self):
        self.count += 1`},{label:"B",code:`c = Counter()
for i in range(3):
    c.increment()`},{label:"C",code:"print(c.count) # 3"}],lead:"Counterを定義し、3回incrementしてから結果を出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"クラスを定義し(A)、for文で3回increment()を呼び(B)、最後にcountの値(3)を出力します(C)。"},{type:"order",lines:[{label:"A",code:`class Item:
    def __init__(self, price):
        self.price = price`},{label:"B",code:"i = Item(100)"},{label:"C",code:"i.price = 200"},{label:"D",code:"print(i.price) # 200"}],lead:"Itemオブジェクトの属性を後から書き換えて出力するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"クラスを定義し(A)、100で生成し(B)、属性を200に書き換え(C)、最後にその値を出力します(D)。"},{type:"debug",long:!0,before:`class BankAccount:
    def __init__(self, balance):
`,after:"",lead:"引数balanceを受け取り、self.balanceに設定する__init__メソッドを定義しなさい。",answers:["self.balance = balance"],explain:"コンストラクタの中で、引数balanceをself.balanceとして保存し、インスタンス固有のデータにします。"},{type:"debug",long:!0,before:`class BankAccount:
    def __init__(self, balance):
        self.balance = balance
    def deposit(self, amount):
`,after:"",lead:"depositメソッドの中身に、self.balanceにamountを加算する処理を書きなさい。",answers:["self.balance += amount"],explain:"+=を使うと、self.balance = self.balance + amountと同じ意味を短く書けます。"},{type:"debug",long:!0,before:`class BankAccount:
    def __init__(self, balance):
        self.balance = balance
    def withdraw(self, amount):
`,after:"",lead:"withdrawメソッドの中身に、self.balanceがamount以上のときだけ引き出す処理を書きなさい。",answers:[`if self.balance >= amount:
    self.balance -= amount`],explain:"if文で残高が足りているかを確認してから引き出すことで、残高がマイナスになる事故を防ぎます。"},{type:"debug",long:!0,before:`class Stack:
    def __init__(self):
        self.items = []
    def push(self, x):
`,after:"",lead:"pushメソッドの中身に、self.itemsの末尾にxを追加する処理を書きなさい(リストのappendメソッドを使う)。",answers:["self.items.append(x)"],explain:"append(x)は、pythonのリストの末尾にxを追加するメソッドです。"},{type:"debug",long:!0,before:`class Stack:
    def __init__(self):
        self.items = []
    def push(self, x):
        self.items.append(x)
    def size(self):
`,after:"",lead:"sizeメソッドの中身に、self.itemsの要素数をreturnする処理を書きなさい(len関数を使う)。",answers:["return len(self.items)"],explain:"len(self.items)で、リストの要素数を調べられます。"},{type:"debug",long:!0,before:`class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return "..."

class Cat(Animal):
`,after:"",lead:'Animalを継承し、speak()を"Meow"を返すようにオーバーライドするCatクラスの中身を書きなさい(__init__は再定義しなくてよい)。',answers:[`def speak(self):
    return "Meow"`],explain:"__init__を再定義しなければ、継承元のAnimalの__init__がそのまま使われます。speak()だけを同じ名前で再定義すればオーバーライドになります。"},{type:"debug",long:!0,before:`class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

class Manager(Employee):
    def __init__(self, name, salary, bonus):
`,after:"",lead:"super()を使って親クラスのコンストラクタでnameとsalaryを初期化し、self.bonusにbonusを設定する処理を書きなさい。",answers:[`super().__init__(name, salary)
self.bonus = bonus`],explain:"super().__init__(name, salary)で親クラスの初期化処理を再利用し、続けてbonusをManager独自の属性として設定します。"},{type:"debug",long:!0,before:`class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

class Manager(Employee):
    def __init__(self, name, salary, bonus):
        super().__init__(name, salary)
        self.bonus = bonus
    def totalPay(self):
`,after:"",lead:"totalPayメソッドの中身に、self.salaryとself.bonusを足した値をreturnする処理を書きなさい。",answers:["return self.salary + self.bonus"],explain:"継承したself.salaryと自分で追加したself.bonusを足し合わせた値をreturnします。"},{before:`class BankAccount:
    def __init__(self, balance):
        self.balance = balance
    def deposit(self, amount):
        self.balance += amount
    def withdraw(self, amount):
        if self.balance >= amount:
            self.balance -= amount

acc = BankAccount(100)
acc.deposit(50)
acc.withdraw(30)
print(acc.balance) # `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["120"],explain:"100+50=150、150-30=120になります。"},{before:`class Stack:
    def __init__(self):
        self.items = []
    def push(self, x):
        self.items.append(x)
    def size(self):
        return len(self.items)

s = Stack()
s.push(1)
s.push(2)
s.push(3)
print(s.size()) # `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["3"],explain:"3回pushしたので、要素数は3になります。"},{before:`class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "Woof"

class Cat(Animal):
    def speak(self):
        return "Meow"

animals = [Dog(), Cat()]
for a in animals:
    print(a.speak())
# 出力される2行を書きなさい
`,after:"",answers:[`Woof
Meow`,"Woof Meow"],explain:'リストanimalsに入っているDogとCatは、それぞれ独自にspeak()をオーバーライドしているので、"Woof"と"Meow"が順に出力されます。'},{before:`class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

class Manager(Employee):
    def __init__(self, name, salary, bonus):
        super().__init__(name, salary)
        self.bonus = bonus
    def totalPay(self):
        return self.salary + self.bonus

m = Manager("Yui", 300000, 50000)
print(m.totalPay()) # `,after:"",lead:"出力される値を半角数字で書きなさい。",answers:["350000"],explain:"300000+50000=350000です。"},{before:`class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __str__(self):
        return f"({self.x}, {self.y})"

p = Point(1,2)
print(p) # __str__メソッドがあると自動的に呼ばれる
`,after:"",lead:"出力される内容を書きなさい。",answers:["(1, 2)"],explain:"printにオブジェクトを渡すと、そのクラスに__str__が定義されていれば自動的に呼ばれ、その戻り値が表示されます。"},{before:`# pythonでオブジェクトをprintしたときの表示内容をカスタマイズするために定義する特別なメソッド名を書きなさい
`,after:"",answers:["__str__"],explain:"__str__メソッドを定義しておくと、そのオブジェクトをprintしたときや文字列に変換したときに、自動的に呼び出されてカスタムの表示内容を返せます。"}],qsExpert:[{type:"debug",long:!0,before:`class Monster:
    def __init__(self, hp):
        self.hp = hp
    def attack(self):
        return 3

class Boss(Monster):
    def __init__(self, hp, name):
        super().__init__(hp)
        self.name = name
    def attack(self):
        return 20

`,after:"",lead:'"ドラゴン"という名前、HP100のBossオブジェクトbを生成し、b.attack()の結果をprintする処理を書きなさい。',answers:[`b = Boss(100, "ドラゴン")
print(b.attack())`],explain:'Boss(100, "ドラゴン")は、__init__(self, hp, name)の順にhp=100, name="ドラゴン"を渡して生成しています。b.attack()を呼ぶと、Boss側でオーバーライドされたattack()(20を返す)が実行され、親のMonster側のattack()(3を返す)は使われません。'},{type:"debug",long:!0,before:`class Hero:
    def __init__(self, name):
        self.name = name
    def show(self):
        print(self.name)

`,after:"",lead:'party(リスト)に、Hero("A")とHero("B")の2人をappendメソッドで追加してから、for文で全員のshow()を呼び出す処理を書きなさい。',answers:[`party = []
party.append(Hero("A"))
party.append(Hero("B"))
for h in party:
    h.show()`],explain:"[ ]は空のリストを作る書き方で、append(値)を呼ぶたびに末尾に要素が追加されます(C++のvectorのpush_backに近い働きです)。for h in party: は、リストpartyの中身を先頭から1つずつhという変数に取り出しながら繰り返す書き方で、そのたびにh.show()でそれぞれの名前を表示します。"},{type:"debug",long:!0,before:`class Hero:
    def __init__(self, hp):
        self.hp = hp
    def damaged(self, pt):
        self.hp -= pt

`,after:"",lead:"h = Hero(50)を生成し、h.damaged(20)を呼んでから、h.hpの値をprintする処理を書きなさい。",answers:[`h = Hero(50)
h.damaged(20)
print(h.hp)`],explain:"h.damaged(20)を呼ぶと、damagedメソッドの中でself.hp -= ptが実行され、hのhp(50)が20減って30になります。print(h.hp)でインスタンスの属性に直接アクセスして、その30を表示します。"},{type:"debug",long:!0,before:`class Hero:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp
    def is_stronger_than(self, other):
        return self.hp > other.hp

`,after:"",lead:'"A"でhp80のhero1と"B"でhp60のhero2を生成し、hero1.is_stronger_than(hero2)の結果をprintする処理を書きなさい。',answers:[`hero1 = Hero("A", 80)
hero2 = Hero("B", 60)
print(hero1.is_stronger_than(hero2))`],explain:"is_stronger_thanは引数otherとして別のHeroオブジェクトを受け取り、other.hpで相手のhpを直接読み取って比較しています。hero1.hp(80)がhero2.hp(60)より大きいのでTrueが表示されます。"},{type:"debug",long:!0,before:`class Hero:
    def __init__(self, hp):
        self.hp = hp
    def add_bonus(self, *bonus):
        for b in bonus:
            self.hp += b

`,after:"",lead:"h = Hero(50)を生成し、h.add_bonus(10, 5, 3)を呼んでから、h.hpの値をprintする処理を書きなさい。",answers:[`h = Hero(50)
h.add_bonus(10, 5, 3)
print(h.hp)`],explain:"*bonusという引数は、渡された値の個数に関係なくすべてタプルとしてまとめて受け取ります。add_bonus(10, 5, 3)と呼ぶとbonusは(10, 5, 3)になり、for b in bonus: でそれぞれの値を順にself.hpへ足し込むので、50+10+5+3=68になります。"},{type:"debug",long:!0,before:`class Hero:
    def __init__(self, hp):
        self.hp = hp

`,after:"",lead:"party(Heroオブジェクトのリスト)を受け取り、全員のhpの合計をreturnするtotal_hp関数を定義しなさい。",answers:[`def total_hp(party):
    total = 0
    for h in party:
        total += h.hp
    return total`],explain:"for h in party: でリストの各要素(Heroオブジェクト)を順番に取り出し、そのhpをtotalに足し込んでいきます。"},{type:"debug",long:!0,before:`class Hero:
    def __init__(self, hp):
        self.hp = hp

def total_hp(party):
    total = 0
    for h in party:
        total += h.hp
    return total

`,after:"",lead:"party(リスト)にHero(30)とHero(50)を追加し、total_hp(party)の結果をprintする処理を書きなさい。",answers:[`party = []
party.append(Hero(30))
party.append(Hero(50))
print(total_hp(party))`],explain:"空のリストを作り、appendで2人分のHeroを追加してから、total_hp関数に渡して合計(80)を求めます。"},{type:"debug",long:!0,before:`class Hero:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

def find_strongest(party):
`,after:"",lead:"party(Heroオブジェクトのリスト)の中でhpが最も高いHeroをreturnするfind_strongest関数の中身を書きなさい。",answers:[`strongest = party[0]
for h in party:
    if h.hp > strongest.hp:
        strongest = h
return strongest`],explain:"strongestを最初の要素で仮に設定し、より強いHeroが見つかるたびに更新していく、最大値探しと同じ考え方です。"},{type:"debug",long:!0,before:`class Hero:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

def find_strongest(party):
    strongest = party[0]
    for h in party:
        if h.hp > strongest.hp:
            strongest = h
    return strongest

`,after:"",lead:'party(リスト)にHero("A",50)とHero("B",80)を追加し、find_strongest(party).nameをprintする処理を書きなさい。',answers:[`party = []
party.append(Hero("A", 50))
party.append(Hero("B", 80))
print(find_strongest(party).name)`],explain:'find_strongestはHeroオブジェクトをまるごとreturnするので、その戻り値に対して.nameでアクセスできます。hpが高い"B"が選ばれます。'},{type:"debug",long:!0,before:`class Monster:
    def __init__(self, hp):
        self.hp = hp
    def attack(self):
        return 3

class Boss(Monster):
    def __init__(self, hp, name):
        super().__init__(hp)
        self.name = name
    def attack(self):
        return 20

`,after:"",lead:'party(リスト)にMonster(10)とBoss(100,"ドラゴン")を追加し、for文で全員のattack()の合計をprintする処理を書きなさい(23になるはず)。',answers:[`party = []
party.append(Monster(10))
party.append(Boss(100, "ドラゴン"))
total = 0
for m in party:
    total += m.attack()
print(total)`],explain:"Monsterのattack()は3、Bossはオーバーライドされたattack()で20を返すので、合計すると23になります。同じリストの中に親クラス・子クラスのオブジェクトを混在させても、それぞれ正しいattack()が呼ばれます。"},{type:"debug",long:!0,before:`class Hero:
    def __init__(self, hp):
        self.hp = hp
    def is_alive(self):
        return self.hp > 0

def count_alive(party):
`,after:"",lead:"party(Heroオブジェクトのリスト)の中で生存している(is_alive()がTrue)人数を数えてreturnするcount_alive関数の中身を書きなさい。",answers:[`count = 0
for h in party:
    if h.is_alive():
        count += 1
return count`],explain:"各要素のis_alive()を呼び出して調べ、Trueであればcountを1つ増やします。"},{type:"debug",long:!0,before:`class BankAccount:
    def __init__(self, balance):
        self.balance = balance

def total_balance(accounts):
`,after:"",lead:"accounts(BankAccountオブジェクトのリスト)を受け取り、全員のbalanceの合計をreturnするtotal_balance関数の中身を書きなさい。",answers:[`total = 0
for a in accounts:
    total += a.balance
return total`],explain:"リストの各要素のbalance属性を取り出して、totalに足し込んでいきます。"},{type:"debug",long:!0,before:`class BankAccount:
    def __init__(self, balance):
        self.balance = balance

def total_balance(accounts):
    total = 0
    for a in accounts:
        total += a.balance
    return total

`,after:"",lead:"accounts(リスト)にBankAccount(1000)とBankAccount(2000)を追加し、total_balance(accounts)の結果をprintする処理を書きなさい。",answers:[`accounts = []
accounts.append(BankAccount(1000))
accounts.append(BankAccount(2000))
print(total_balance(accounts))`],explain:"空のリストに2つのBankAccountを追加し、total_balance関数で合計(3000)を求めます。"},{type:"debug",long:!0,before:`class ScoreBoard:
    def __init__(self):
        self.total = 0
    def add_scores(self, *scores):
`,after:"",lead:"add_scoresメソッドの中身に、渡された任意個の得点をすべてself.totalに加算する処理を書きなさい(*scoresはタプルとして受け取れる)。",answers:[`for s in scores:
    self.total += s`],explain:"*scoresで渡された値の個数に関係なくすべてタプルとして受け取れるので、for s in scores: で1つずつself.totalに足し込みます。"},{type:"debug",long:!0,before:`class ScoreBoard:
    def __init__(self):
        self.total = 0
    def add_scores(self, *scores):
        for s in scores:
            self.total += s

`,after:"",lead:"b = ScoreBoard()を生成し、b.add_scores(80, 90, 70)を呼んでから、b.totalをprintする処理を書きなさい。",answers:[`b = ScoreBoard()
b.add_scores(80, 90, 70)
print(b.total)`],explain:"add_scores(80, 90, 70)を呼ぶと、80+90+70=240がself.totalに加算されます。"}],qsDrag:[{type:"dragfill",lead:"Monsterを継承するBossクラスの宣言行と、super()で親を初期化するコンストラクタになるよう、正しいピースを空欄に配置しなさい。",lines:[{code:"class Monster:"},{code:"    def __init__(self, hp):"},{code:"        self.hp = hp"},{blank:"b1"},{blank:"b2"}],pieces:[{id:"p1",code:"class Boss(Monster):"},{id:"p2",code:`    def __init__(self, hp, name):
        super().__init__(hp)
        self.name = name`},{id:"p3",code:"class Boss(self, Monster):"}],answerMap:{b1:"p1",b2:"p2"},explain:"pythonで継承するときは、クラス名の後ろの括弧に親クラス名だけを書きます(p1)。p3のようにselfを書いてしまうのは文法として誤りです(selfはメソッドの引数として使うもので、クラス宣言には登場しません)。コンストラクタはsuper().__init__(hp)で親の初期化を再利用しつつ、self.nameを追加します(p2)。"}]},{id:"tk",title:"CASE 13「硝子窓の向こう側」",sub:"Week D/E Tkinterウィジェット",emoji:"🪟",mon:"押しても反応しないボタン",lesson:[{title:"ウィンドウとウィジェット配置",code:`import tkinter as tk
from tkinter import ttk
root = tk.Tk()
label = ttk.Label(root, text="Hello")
label.grid(column=0, row=0)
root.mainloop()`,explain:'Tkinterでウィンドウを作りたいときは、まずtk.Tk()というクラスのオブジェクトを1つ生成します(慣習的にrootという名前をつけます)。これがアプリのウィンドウ本体です。その中に置きたい部品(ウィジェットと呼びます。ラベル、ボタン、入力欄など)は、ttk.Label(root, text="Hello")のように「どの親の中に置くか」を最初の引数で指定して生成し、続けてgrid()やpack()というメソッドで実際の配置場所を決めます。最後にroot.mainloop()を呼ぶことで、ウィンドウが画面に表示されたまま、ユーザーのクリックなどの操作をずっと待ち受ける状態になります。mainloop()を呼び忘れると、ウィンドウはすぐに閉じてしまいます。'},{title:"変化するテキストとEntry",code:`text = tk.StringVar()
label = ttk.Label(root, textvariable=text)
entry = ttk.Entry(root)
value = entry.get()
text.set(value)`,explain:'ラベルに表示するテキストを、実行中に自由に書き換えたい場合は、text="..."という固定のオプションではなく、textvariableというオプションを使います。まずtk.StringVar()というテキスト専用の入れ物を用意し、それをラベルのtextvariableに渡しておくと、あとでtext.set("新しい文字")のようにその入れ物の中身を書き換えるだけで、画面上のラベルの表示も自動的に更新されます。一方、ユーザーがEntry(入力欄)ウィジェットに入力した文字列を取得したいときは、entry.get()というメソッドを呼び出します。「表示を変えたいときはStringVar経由のset、入力値を読み取りたいときはEntryのget」と覚えておきましょう。'},{title:"自作ウィジェットクラス",code:`class TimeApp(ttk.Frame):
    def __init__(self, root):
        super().__init__(root)
        # ここに複数のウィジェットを追加

if __name__ == '__main__':
    root = tk.Tk()
    app = TimeApp(root)
    app.pack()
    root.mainloop()`,explain:"ラベルやボタンなど、複数のウィジェットを組み合わせて1つの部品(自作ウィジェット)としてまとめたいときは、ttk.Frameというクラスを継承した新しいクラスを作ります。C++の継承と同じように、class TimeApp(ttk.Frame): のように親クラスを指定し、__init__の中でsuper().__init__(root)を呼んでFrame自身の初期化をしたあと、そのFrame(self)を親として複数のウィジェットを追加していきます。こうして作ったTimeAppクラスは、それ自体が1つのウィジェットであるかのように、app = TimeApp(root); app.pack()のように使うことができます。if __name__ == '__main__': のブロックは、このファイルを直接実行してTimeAppの動作を単独で試したいときに使う、動作確認用のコードを書く場所です。"}],qs:[{before:`import tkinter as tk
root = tk.`,after:`()
root.mainloop()  # ウィンドウ本体を作るクラス`,answers:["Tk"],explain:"tk.Tk()は、Tkinterアプリのウィンドウ本体を作るクラスです。root = tk.Tk() と書くことで、rootという名前でウィンドウのオブジェクトを1つ生成します。このrootが、これから作るラベルやボタンなど、あらゆるウィジェットの「一番外側の入れ物」になります。オブジェクトを作っただけではまだウィンドウは表示され続けないので、最後に必ずroot.mainloop()を呼び出します。mainloop()は「ウィンドウを表示したまま、ユーザーがボタンを押したりウィンドウを閉じたりする操作をずっと待ち受け続ける」処理で、これを呼ばないとプログラムはすぐに終了してウィンドウも一瞬で消えてしまいます。"},{before:`label = ttk.Label(frame, text="Hello")
label.`,after:"(column=0, row=0)  # column, rowで位置を指定して配置するメソッド",answers:["grid"],explain:"Tkinterでは、ウィジェット(ラベルやボタンなどの画面部品)を生成しただけでは画面上に表示されず、続けて配置用のメソッドを呼ぶ必要があります。gridメソッドは、ウィンドウ全体を格子状(表計算ソフトのマス目のような)に区切って考え、column(何列目か)とrow(何行目か)を指定して、そのウィジェットをどのマスに置くかを決める配置方法です。もう1つの代表的な配置方法としてpackがあり、こちらは細かい位置を指定するのではなく「上から順に詰めて並べる」といった相対的な配置をします。同じ親ウィジェットの中では、gridとpackを混在させることはできない点にも注意しましょう。"},{before:`time = tk.StringVar()
label = ttk.Label(frame, `,after:"=time)  # 実行中に表示するテキストを変更可能にするために指定するオプション",answers:["textvariable"],explain:'ttk.Label(frame, text="Hello")のようにtextオプションだけで文字を指定すると、そのラベルは最初に設定した文字を表示したままで、後からプログラムで自動的に書き換えることはできません。実行中に表示内容を変えたい(たとえば現在時刻を表示し続けたい)場合は、代わりにtextvariableというオプションを使い、tk.StringVar()で作った専用の変数を渡しておきます。こうしておけば、あとでtime.set(新しい文字列)のようにそのStringVarの中身を更新するだけで、画面上のラベルの表示もTkinterが自動的に合わせて更新してくれます。'},{before:`entry = ttk.Entry(frame)
entry.grid(column=0,row=0)
text = entry.`,after:"()  # Entryウィジェットに入力された文字列を取得するメソッド",answers:["get"],explain:"ttk.Entryは、ユーザーが自由に文字を入力できる「入力欄」のウィジェットです。ユーザーが今そこに何を入力しているかをプログラム側で知りたいときは、そのEntryオブジェクトのget()メソッドを呼び出します。text = entry.get(); と書けば、入力欄に今入っている文字列がtextという変数に代入されます。この仕組みは、たとえば「Addボタンが押されたときに、入力欄の内容を読み取ってリストに追加する」といった処理でよく使われます。"},{before:"class TimeApp(ttk.",after:`):
    def __init__(self, root):
        super().__init__(root)
    # 複数のウィジェットをまとめる自作ウィジェットクラスを作るとき、一般的に継承するクラス`,answers:["Frame"],explain:"ラベルやボタンなど、複数のウィジェットをひとまとめにした「自作のウィジェット」を作りたいときは、ttk.Frameを継承したクラスを作るのが一般的です。Frameはもともと「他のウィジェットを中に入れるための入れ物」の役割を持つウィジェットで、C++のクラス継承と同じように、class TimeApp(ttk.Frame): と書いてFrameの機能を引き継ぎつつ、__init__の中で好きなだけウィジェットを追加していくことができます。こうして作ったTimeAppは、それ自体が1つのFrame(=ウィジェット)として扱えるので、app = TimeApp(root); app.pack(); のように普通のウィジェットと同じ感覚で配置できます。"},{before:`if __name__ == '__main__':
    root = tk.Tk()
    app = TimeApp(root)
    app.`,after:"(side='top')  # 上から順に詰めて配置するメソッド",answers:["pack"],explain:"packは、gridのように細かく列や行を指定するのではなく、ウィジェットを上下左右のいずれかの方向へ「順番に詰めて」配置するメソッドです。side引数で詰める方向を指定でき、side='top'(何も指定しない場合のデフォルト)なら上から順に積み重なるように、side='left'なら左から順に並ぶように配置されます。同じ親の中で複数のウィジェットをpackすると、後から追加したものが指定した方向に向かって順番に詰められていくため、ウィジェットを次々に増やしていくメモアプリのような画面と相性の良い配置方法です。"},{before:`# このモジュールが直接実行されたときだけ処理を行うためのイディオムを書きなさい
`,after:`:
    root = tk.Tk()
    root.mainloop()`,answers:["if __name__ == '__main__'",'if __name__=="__main__"'],explain:`if __name__ == '__main__': という1行は、pythonのファイルを部品(モジュール)として再利用しやすくするための定番のイディオム(お決まりの書き方)です。このファイルが % python ファイル名.py のように直接実行された場合にだけ__name__の値が"__main__"になるため、この条件が成立し、中に書かれたroot = tk.Tk()などの動作確認コードが実行されます。一方、このファイルが他のプログラムからimportされて部品として使われる場合は__name__は"__main__"にならないため、この中の処理は実行されず、クラスの定義部分だけが読み込まれます。GUIアプリの自作ウィジェットクラスを、他のファイルからも安心してimportして再利用できるようにするために、よく使われる書き方です。`},{before:`# ディレクトリ(パッケージ)をimportしたときに自動的に読み込まれる特別なファイル名を書きなさい
`,after:"",answers:["__init__.py"],explain:"1つのファイル(モジュール)だけでなく、複数のモジュールをディレクトリにまとめたものを「パッケージ」と呼びます。あるディレクトリをパッケージとしてimportすると、pythonはそのディレクトリの中にある__init__.pyという特別な名前のファイルを自動的に探し出し、読み込みます。このファイルの中に、パッケージ全体で共通して使いたい初期設定や、外部からアクセスしやすくするための橋渡し役のコードなどを書いておくことができます。実際にtkinterというライブラリ自体も、内部的にはこのような__init__.pyを持つパッケージとして作られています。"},{before:"label = ttk.",after:`(root, text="Hi")
label.grid(column=0,row=0) # ラベルウィジェットを作るクラス`,answers:["Label"],explain:"ttk.Labelは、固定または可変の文字列を表示するラベルウィジェットを作るクラスです。"},{before:"entry = ttk.",after:`(root)
entry.grid(column=0,row=0) # 入力欄ウィジェットを作るクラス`,answers:["Entry"],explain:"ttk.Entryは、ユーザーが自由に文字を入力できる入力欄のウィジェットを作るクラスです。"},{before:`msg = tk.StringVar()
msg.`,after:'("Hello") # StringVarの中身を書き換えるメソッド',answers:["set"],explain:"set()にはStringVarの新しい値を渡します。"},{before:`root = tk.Tk()
label = ttk.Label(root, text="Hi")
label.grid(column=1, `,after:"=0) # 0行目に配置する",answers:["row"],explain:"rowで行番号を指定します。"},{before:`root = tk.Tk()
label = ttk.Label(root, text="Hi")
label.grid(column=0,row=0)
root.`,after:"() # ウィンドウを表示し続けて操作を待ち受けるメソッド",answers:["mainloop"],explain:"root.mainloop()を呼ぶことで、ウィンドウが表示され続け、ユーザーの操作を待ち受けます。"},{before:`btn = ttk.Button(root, text="OK")
btn.grid(column=0,row=0)
# btnのようなラベル・ボタン・入力欄などの部品を総称して何と呼ぶか(カタカナで)
`,after:"",answers:["ウィジェット"],explain:"ラベル・ボタン・入力欄などの部品を総称してウィジェットと呼びます。"}],qsHard:[{type:"debug",before:`root = tk.Tk()
label = ttk.Label(root, text="Hi")
label.grid(column=0,row=0)
# ウィンドウを表示し続けるための呼び出しが抜けている。追記しなさい
`,after:"",answers:["root.mainloop()"],explain:"root.mainloop()を呼び出さないと、ウィンドウはユーザーの操作を待ち受けずにプログラムが終了し、一瞬で閉じてしまいます。mainloop()は「ウィンドウを表示したまま、ずっと操作を待ち受け続ける」処理です。"},{type:"choice",lead:"ラベルの表示内容を実行中に書き換えたいときに使うべき仕組みを選びなさい。",options:["StringVarとtextvariableオプション","text固定オプションを繰り返し設定し直す","grid()を毎回呼び直す","pack()を毎回呼び直す"],answers:["StringVarとtextvariableオプション"],explain:"tk.StringVar()で専用の入れ物を作り、それをラベルのtextvariableに渡しておくと、あとでその入れ物の中身をset()で書き換えるだけで画面上の表示も自動的に更新されます。"},{type:"order",lines:[{label:"A",code:`class TimeApp(ttk.Frame):
    def __init__(self, root):
        super().__init__(root)`},{label:"B",code:"root = tk.Tk()"},{label:"C",code:`app = TimeApp(root)
app.pack()`},{label:"D",code:"root.mainloop()"}],answers:["A,B,C,D"],explain:"自作ウィジェットクラスを定義し(A)、ウィンドウ本体を用意し(B)、そのクラスのオブジェクトを作って配置し(C)、最後にmainloop()で操作を待ち受けます(D)。"},{type:"debug",before:`def onClick():
    print("clicked")
btn = ttk.Button(root, text="OK", command=onClick())
# commandに括弧をつけて呼び出してしまっているバグを直しなさい
`,after:"",answers:['btn = ttk.Button(root, text="OK", command=onClick)'],explain:"commandにはonClickという関数名だけを渡します。onClick()のように括弧をつけると、ボタン生成時にすぐ実行されてしまいます。"},{before:`entry = ttk.Entry(root)
entry.grid(column=0,row=0)
entry.insert(0, "初期値")
entry.delete(0, "end")
value = entry.get()
print(len(value)) # `,after:"",lead:"出力される値を半角数字で書きなさい(delete後は空になっている)。",answers:["0"],explain:'delete(0, "end")で入力欄の中身がすべて削除されるため、get()で取得できる文字列は空になり、その長さは0です。'},{type:"order",lines:[{label:"A",code:`label = ttk.Label(root, text="名前")
label.grid(column=0,row=0)`},{label:"B",code:`entry = ttk.Entry(root)
entry.grid(column=1,row=0)`}],answers:["A,B"],explain:"ラベルを配置してから(A)、その右隣に入力欄を配置します(B)。"},{type:"debug",before:`btn = ttk.Button(root, text="OK")
btn.`,after:"(column=0,row=0) # ウィジェットを配置するメソッド",answers:["grid"],explain:"grid()は、行と列を指定してウィジェットを格子状に配置するメソッドです。"},{type:"choice",lead:"grid配置とpack配置の違いとして正しい説明を選びなさい。",options:["gridは行・列を指定して格子状に並べ、packは端から順にシンプルに並べる","gridは配置できない","packは1つのウィンドウに1回しか使えない","違いはない"],answers:["gridは行・列を指定して格子状に並べ、packは端から順にシンプルに並べる"],explain:"gridはcolumn・rowを指定して正確に格子状に並べる配置方法、packは細かい指定なしにシンプルに並べる配置方法です。"},{type:"debug",before:`msg = tk.StringVar()
label = ttk.Label(root, text=msg)
# 可変の文字列を紐づけるオプション名が間違っている。正しく直しなさい(オプション名のみ)
`,after:"",answers:["textvariable"],explain:"StringVarと連動させたい場合はtextではなくtextvariableオプションを使う必要があります。"},{type:"order",lines:[{label:"A",code:"msg = tk.StringVar()"},{label:"B",code:'msg.set("Hello")'},{label:"C",code:`label = ttk.Label(root, textvariable=msg)
label.grid(column=0,row=0)`}],answers:["A,B,C"],explain:"StringVarを用意し(A)、値を設定してから(B)、それをtextvariableに紐づけたラベルを配置します(C)。"},{type:"debug",before:`class Panel(ttk.Frame):
    def __init__(self, root):
        super().__init__(root)
        label = ttk.Label(root, text="Hi")
        # このLabelの親はPanel自身にすべき。正しく直しなさい(1単語)
`,after:"",answers:["self"],explain:"自作ウィジェットクラスの中でウィジェットを生成するときは、rootではなくselfを親として指定することで、そのクラス自身の内部に配置されます。"},{type:"choice",lead:"root.destroyをボタンのcommandに指定した場合の効果として正しいものを選びなさい。",options:["ウィンドウを閉じる","ウィンドウを最小化する","ラベルを削除する","何も起こらない"],answers:["ウィンドウを閉じる"],explain:"root.destroyはウィンドウを閉じるメソッドです。"},{type:"debug",before:`root = tk.Tk()
count = tk.IntVar()
count.set(0)
label = ttk.Label(root, textvariable=count)
label.`,after:"(column=0,row=0) # ウィジェットを配置するメソッド",answers:["grid"],explain:"grid()は、行と列を指定してウィジェットを格子状に配置するメソッドです。"},{type:"order",lines:[{label:"A",code:`def onClick():
    print("Hello")`},{label:"B",code:`btn = ttk.Button(root, text="Hi", command=onClick)
btn.grid(column=0,row=0)`},{label:"C",code:"root.mainloop()"}],answers:["A,B,C"],explain:"呼び出される関数を定義し(A)、それをcommandに指定したボタンを配置し(B)、mainloop()で操作を待ち受けます(C)。"},{type:"choice",lead:"ttk(テーマ付きウィジェット)を使うために必要なインポート文を選びなさい。",options:["from tkinter import ttk","import ttk","from ttk import tkinter","include ttk"],answers:["from tkinter import ttk"],explain:"from tkinter import ttk と書くことで、ttk.Labelやttk.Buttonのような、見た目が整えられたウィジェットを使えるようになります。"}],qsExtra:[{before:"btn = ttk.",after:`(root, text="OK")
btn.grid(column=0,row=0) # ボタンウィジェットを作るクラス`,answers:["Button"],explain:"ttk.Buttonは、クリックできるボタンのウィジェットを作るクラスです。ttk.Label(ラベル)やttk.Entry(入力欄)と同じように、まず生成してからgrid()やpack()で配置する、という流れは共通しています。"},{before:`def onClick():
    print("clicked")
btn = ttk.Button(root, text="OK", `,after:`=onClick)
btn.grid(column=0,row=0) # ボタンが押されたときに呼び出す関数を指定するオプション`,answers:["command"],explain:'commandオプションに関数名を渡しておくと、そのボタンが押されたタイミングでその関数が自動的に呼び出されます。ここではonClickという関数を渡しているので、ボタンをクリックするたびに"clicked"が表示されるようになります。関数名を渡すだけでよく、onClick()のように括弧をつけて呼び出してはいけない点に注意しましょう。'},{type:"debug",long:!0,before:`text = tk.StringVar()
label = ttk.Label(root, textvariable=text)
entry = ttk.Entry(root)
`,after:"",lead:"「反映」ボタンを押したときに、entryに入力された文字列を取得してtextにセットし、ラベルの表示を更新する処理一式を書きなさい(関数定義とボタン生成の両方)。",answers:[`def onClick():
value = entry.get()
text.set(value)
btn = ttk.Button(root, text="反映", command=onClick)`],explain:"onClick関数の中で、entry.get()で入力欄の中身を取得し、text.set(value)でStringVarの中身を書き換えます。textはラベルのtextvariableに紐づいているので、これだけで画面上のラベル表示も自動的に更新されます。あとはそのonClickをcommandに指定したボタンを用意すれば、押すたびに反映されるようになります。"},{type:"debug",long:!0,before:`class Panel(ttk.Frame):
    def __init__(self, root):
        super().__init__(root)
`,after:"",lead:'Panelクラスの__init__の中に、"Hello"というテキストのラベルを1つ生成し、column=0,row=0に配置する処理を書きなさい。',answers:[`label = ttk.Label(self, text="Hello")
label.grid(column=0, row=0)`],explain:'自作ウィジェットクラス(ttk.Frameを継承したクラス)の__init__の中では、selfがそのFrame自身を表します。ttk.Label(self, text="Hello")のように、selfを親として指定してウィジェットを生成すれば、そのラベルはこのPanel(自作ウィジェット)の中に配置されます。'},{type:"choice",lead:'ttk.Button(root, text="OK", command=onClick) について正しい説明を選びなさい。',options:["ボタンが押されたときにonClick関数が呼び出される","commandはボタンの見た目の色を指定するオプションである","onClickは即座に1回だけ実行されてから無視される","commandを指定しなくてもボタンは自動的に何か処理を行う"],answers:["ボタンが押されたときにonClick関数が呼び出される"],explain:"commandオプションはボタンが押されたときに呼び出す関数を指定するためのものです。onClickという関数名だけを渡しておき、実際に呼び出されるのはユーザーがボタンをクリックしたタイミングになります。commandを指定しなければ、ボタンを押しても何も起こりません。"},{type:"order",lines:[{label:"A",code:`def onClick():
    print("Hello")`},{label:"B",code:'btn = ttk.Button(root, text="Hi", command=onClick)'},{label:"C",code:"btn.grid(column=0,row=0)"},{label:"D",code:"root.mainloop()"}],lead:'ボタンを押すと"Hello"と表示されるプログラムになるよう、正しい順番を記号で答えなさい。',answers:["A,B,C,D"],explain:"呼び出される関数を先に定義し(A)、その関数をcommandに指定してボタンを生成し(B)、画面に配置してから(C)、最後にmainloop()で操作を待ち受けます(D)。関数はボタンより前に定義しておく必要があります。"},{before:`name = tk.StringVar()
name.set("Taro")
label2 = ttk.Label(root, `,after:`=name)
label2.grid(column=0,row=1) # 表示内容を可変にするオプション`,answers:["textvariable"],explain:'textvariableに StringVar を渡しておくと、そのラベルの表示内容はStringVarの中身と連動します。name.set("Taro")した時点の値がそのまま表示され、後からname.set()で更新すれば表示も自動的に変わります。'},{before:`def onYes():
    print("Yes")
def onNo():
    print("No")
`,after:"",lead:'"はい"というテキストでonYesを、"いいえ"というテキストでonNoをcommandに指定した2つのボタンを生成する行を書きなさい(配置は不要)。',answers:[`btn1 = ttk.Button(root, text="はい", command=onYes)
btn2 = ttk.Button(root, text="いいえ", command=onNo)`],explain:"commandにそれぞれ別の関数を指定することで、ボタンごとに異なる処理を割り当てられます。1つのウィンドウの中に複数のボタンを用意し、それぞれに違うcommandを設定するのはよくある使い方です。"},{type:"debug",long:!0,before:`class InputPanel(ttk.Frame):
    def __init__(self, root):
        super().__init__(root)
        self.entry = ttk.Entry(self)
        self.entry.grid(column=0,row=0)
`,after:"",lead:'InputPanelの__init__の中に、"送信"というテキストのボタンを生成し(column=1,row=0)に配置する処理を書きなさい(commandは指定しなくてよい)。',answers:[`btn = ttk.Button(self, text="送信")
btn.grid(column=1, row=0)`],explain:"自作ウィジェットクラスの__init__の中でウィジェットを生成するときは、selfを親として指定します。こうすることで、生成したボタンはこのInputPanel(自作ウィジェット)の中に配置されます。"},{type:"choice",lead:"self.entry = ttk.Entry(self) のように、自作ウィジェットクラスの中でselfを親として指定する理由として正しいものを選びなさい。",options:["そのウィジェットが自作クラス(Frame)自身の中に配置されるようにするため","pythonの文法上self以外指定できないため","entryをグローバル変数にするため","rootを削除するため"],answers:["そのウィジェットが自作クラス(Frame)自身の中に配置されるようにするため"],explain:"ttk.Entry(self)のselfは、このクラス自身(ttk.Frameを継承した自作ウィジェット)を指します。selfを親として渡すことで、生成したEntryはこの自作ウィジェットの内部に配置され、後でapp.pack()のように扱ったときに一緒についてきます。"},{type:"order",lines:[{label:"A",code:`def onYes():
    print("Yes")`},{label:"B",code:'btn = ttk.Button(root, text="はい", command=onYes)'},{label:"C",code:"btn.grid(column=0,row=0)"},{label:"D",code:"root.mainloop()"}],lead:'ボタンを押すと"Yes"と表示されるプログラムになるよう、正しい順番を記号で答えなさい。',answers:["A,B,C,D"],explain:"呼び出される関数を先に定義し(A)、それをcommandに指定してボタンを生成し(B)、画面に配置してから(C)、最後にmainloop()で操作を待ち受けます(D)。"},{before:"label = ttk.Label(root, ",after:`="Hello")
label.grid(column=0,row=0) # 固定の文字列を表示するオプション`,answers:["text"],explain:"textオプションに文字列を渡すと、そのラベルに固定の文字列が表示されます。実行中に表示を変えたい場合は、代わりにtextvariableを使います。"},{before:`entry = ttk.Entry(root)
entry.grid(column=0,row=0)
userInput = entry.`,after:"()",answers:["get"],explain:"entry.get()を呼ぶと、その入力欄に今入力されている文字列を取得できます。"},{type:"choice",lead:'ttk.Label(root, text="Hi") の第一引数rootが表す役割として正しいものを選びなさい。',options:["このラベルをどのウィンドウ(親)の中に配置するか","ラベルの文字色","ラベルのサイズ","ラベルの名前"],answers:["このラベルをどのウィンドウ(親)の中に配置するか"],explain:"ウィジェットを生成するときの最初の引数は、そのウィジェットをどの親(ウィンドウや自作Frameなど)の中に配置するかを指定します。rootを渡せば、ウィンドウ本体の中に直接配置されます。"},{type:"debug",long:!0,before:`root = tk.Tk()
`,after:`
root.mainloop()`,lead:'"名前:"というラベルをrow=0に、"年齢:"というラベルをrow=1に、それぞれcolumn=0で配置する処理を書きなさい。',answers:[`label1 = ttk.Label(root, text="名前:")
label1.grid(column=0, row=0)
label2 = ttk.Label(root, text="年齢:")
label2.grid(column=0, row=1)`],explain:"2つのラベルをそれぞれ生成し、rowの値を変えてgridで配置することで、縦に並べて表示できます。"},{before:`entry = ttk.Entry(root)
entry.grid(column=0,row=0)
def onClick():
  value = entry.get()
  `,after:"(value)",answers:["print"],explain:"entry.get()で取得した文字列を、printでそのままコンソールに表示できます。"},{before:"",after:`
from tkinter import ttk
root = tk.Tk()`,lead:"tkinterモジュールをtkという名前でインポートする行を書きなさい。",answers:["import tkinter as tk"],explain:"import tkinter as tk と書くことで、以降tkinterの機能をtk.Tk()のようにtkという短い名前で使えるようになります。"},{type:"order",lines:[{label:"A",code:"root = tk.Tk()"},{label:"B",code:`label = ttk.Label(root, text="入力してください")
label.grid(column=0,row=0)`},{label:"C",code:`entry = ttk.Entry(root)
entry.grid(column=0,row=1)`},{label:"D",code:"root.mainloop()"}],lead:"ラベルと入力欄を縦に並べて表示するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C,D"],explain:"ウィンドウ本体を用意し(A)、ラベルを1行目に(B)、入力欄を2行目に配置し(C)、最後にmainloop()で操作を待ち受けます(D)。"},{type:"choice",lead:"ttk.Entryウィジェットの主な役割として正しいものを選びなさい。",options:["ユーザーが自由に文字を入力できる欄を提供する","固定の文字列だけを表示する","ボタンを押したときの処理を実行する","ウィンドウ全体を閉じる"],answers:["ユーザーが自由に文字を入力できる欄を提供する"],explain:"ttk.Entryは、ユーザーが自由にキーボードで文字を入力できる「入力欄」のウィジェットです。入力された内容はget()メソッドで取得できます。"},{before:`import tkinter as tk
`,after:`
root = tk.Tk()`,lead:"ttk(テーマ付きウィジェット)を使うためのインポート文を書きなさい。",answers:["from tkinter import ttk"],explain:"from tkinter import ttk と書くことで、ttk.Label や ttk.Button のような、見た目が整えられたウィジェットを使えるようになります。"},{type:"debug",long:!0,before:`class InfoPanel(ttk.Frame):
    def __init__(self, root):
        super().__init__(root)
`,after:"",lead:'InfoPanelの__init__の中に、"Name"というラベルをrow=0に、"Age"というラベルをrow=1に配置する処理を書きなさい(親はselfにする)。',answers:[`label1 = ttk.Label(self, text="Name")
label1.grid(column=0, row=0)
label2 = ttk.Label(self, text="Age")
label2.grid(column=0, row=1)`],explain:"自作ウィジェットクラスの中でラベルを生成するときは、親としてselfを指定します。こうすることで、生成したラベルはこのInfoPanelの内部に配置されます。"},{before:`root = tk.Tk()
label = ttk.Label(root, text="Hi")
label.grid(column=0,row=0)
root.`,after:"() # ウィンドウを表示したまま操作を待ち受ける",answers:["mainloop"],explain:"root.mainloop()を呼び忘れると、ウィンドウはすぐに閉じてしまいます。これを呼ぶことで、ユーザーの操作をずっと待ち受ける状態になります。"},{type:"choice",lead:"1つの親ウィジェットの中で、同じ位置(同じcolumn,row)に2つのウィジェットをgrid配置するとどうなるか選びなさい。",options:["後から配置した方が先に配置したものの上に重なって表示される","エラーになる","自動的に位置がずらされる","両方とも表示されない"],answers:["後から配置した方が先に配置したものの上に重なって表示される"],explain:"gridは同じマスに複数のウィジェットを配置することを禁止していません。同じcolumn,rowを指定すると、後から配置したウィジェットが上に重なって表示されてしまうため、通常は異なる位置を指定します。"},{before:'label = ttk.Label(root, text="',after:`")
label.grid(column=0,row=0) # "こんにちは"と表示する`,answers:["こんにちは"],explain:"textオプションに渡した文字列が、そのままラベルとして画面に表示されます。"},{before:`btn = ttk.Button(root, text="送信")
btn.`,after:"(column=0,row=0) # ウィジェットを配置するメソッド",answers:["grid"],explain:"grid()は、行と列を指定してウィジェットを格子状に配置するためのメソッドです。"},{before:`entry = ttk.Entry(root)
entry.grid(column=0,row=0)
entry.`,after:'(0, "初期値") # 入力欄に文字をあらかじめ挿入するメソッド',answers:["insert"],explain:'insert(0, "初期値")は、入力欄の先頭(位置0)に指定した文字列をあらかじめ挿入するメソッドです。'},{before:`def onClick():
    print("押されました")
btn = ttk.Button(root, text="実行", command=`,after:`)
btn.grid(column=0,row=0)`,answers:["onClick"],explain:"commandには関数名だけを渡します。onClick()のように括弧をつけて呼び出してしまうと、ボタン生成時にすぐ実行されてしまうので注意しましょう。"},{before:"root = tk.",after:`()
root.mainloop() # ウィンドウ本体を作るクラス`,answers:["Tk"],explain:"tk.Tk()は、アプリのウィンドウ本体(ルートウィンドウ)を作るためのクラスです。"},{before:`root = tk.Tk()
root.`,after:'("マイアプリ") # ウィンドウのタイトルを設定するメソッド',answers:["title"],explain:"title()メソッドに文字列を渡すと、ウィンドウのタイトルバーに表示される文字列を設定できます。"},{before:`root = tk.Tk()
root.geometry("`,after:'") # 幅300、高さ200のウィンドウにする(半角文字で)',answers:["300x200"],explain:'geometry()には"幅x高さ"の形式(xは半角のエックス)で文字列を渡します。"300x200"で幅300、高さ200のウィンドウになります。'},{before:"msg = tk.",after:`()
msg.set("Hello")
label = ttk.Label(root, textvariable=msg) # 可変の文字列を保持するクラス`,answers:["StringVar"],explain:"tk.StringVar()は、文字列を保持し、ラベルなどのtextvariableに紐づけることで、set()するだけで自動的に画面表示も更新できる特殊な変数です。"},{before:`msg = tk.StringVar()
msg.`,after:'("更新後の文字列") # StringVarの中身を書き換えるメソッド',answers:["set"],explain:"set()にはStringVarの新しい値を渡します。textvariableで紐づけられたウィジェットの表示も、これに合わせて自動的に更新されます。"},{before:`msg = tk.StringVar()
msg.set("A")
current = msg.`,after:"() # StringVarの現在の値を取得するメソッド",answers:["get"],explain:"get()を呼ぶと、そのStringVarに現在設定されている値を取得できます。"},{before:"count = tk.",after:`()
count.set(0) # 数値を保持するための特殊な変数クラス(整数用)`,answers:["IntVar"],explain:"IntVarはStringVarの整数版で、数値を保持し、ウィジェットのtextvariableなどに紐づけて使える特殊な変数です。"},{before:`count = tk.IntVar()
count.set(5)
def increment():
    count.set(count.get() + `,after:`)
`,lead:"countを1増やす処理を完成させなさい。",answers:["1"],explain:"count.get()で現在の値を取得し、それに1を足した値をset()で書き戻すことで、カウンタが1増えます。"},{before:`msg = tk.StringVar()
label = ttk.Label(root, textvariable=msg)
msg.set("更新")
# labelの表示はどうなるか(日本語で)
`,after:"",answers:["更新と表示される","表示が更新される"],explain:'labelのtextvariableにmsgを紐づけているため、msg.set("更新")を呼ぶだけで、labelの表示も自動的に"更新"に変わります。'},{before:`label = ttk.Label(root, text="Hi")
label.`,after:"() # gridの代わりにシンプルに配置するメソッド",answers:["pack"],explain:"pack()は、行と列を細かく指定せずに、ウィジェットを上から順に(または端から順に)簡単に並べる配置方法です。"},{before:`label1 = ttk.Label(root, text="A")
label1.grid(column=0, row=0)
label2 = ttk.Label(root, text="B")
label2.grid(column=1, `,after:"=0) # label1の右隣に並べる",answers:["row"],explain:"columnを1つ増やしてrowは同じ0にすることで、label1の右隣(同じ行の次の列)にlabel2が並びます。"},{before:`label1 = ttk.Label(root, text="A")
label1.grid(column=0, row=0)
label2 = ttk.Label(root, text="B")
label2.grid(column=0, `,after:"=1) # label1の下に並べる",answers:["row"],explain:"columnは同じ0のままrowを1つ増やすことで、label1の下(次の行)にlabel2が並びます。"},{before:`btn = ttk.Button(root, text="OK")
btn.grid(column=0, row=0, `,after:"=10) # ウィジェットの周りに縦方向の余白を作るオプション",answers:["pady"],explain:"padyは上下(縦方向)の余白、padxは左右(横方向)の余白を指定するオプションです。"},{before:`# grid配置とpack配置のうち、行と列を指定してきっちり格子状に並べるのに向いているのはどちらか(カタカナで)
`,after:"",answers:["グリッド"],explain:"grid(グリッド)配置は、column(列)とrow(行)を指定して、格子状にウィジェットを正確に並べるのに向いています。"},{type:"choice",lead:'ttk.Button(root, text="OK", command=func) のcommandに関数名を渡すとき、func()のように括弧をつけて呼び出してしまうとどうなるか選びなさい。',options:["ボタン生成時にfuncがすぐ実行され、戻り値がcommandに渡されてしまう","ボタンを押すたびに正しくfuncが呼ばれる","エラーになりボタンが生成されない","何も変わらない"],answers:["ボタン生成時にfuncがすぐ実行され、戻り値がcommandに渡されてしまう"],explain:"command=func()と書くと、その場でfuncが呼び出されてしまい、commandにはfuncの戻り値が渡されてしまいます。ボタンを押すたびに実行させたい場合は、括弧をつけずにcommand=funcと書く必要があります。"},{type:"choice",lead:"root.mainloop()を呼び忘れた場合の挙動として正しいものを選びなさい。",options:["ウィンドウがすぐに閉じてしまい操作を待ち受けない","ウィンドウが開いたまま永久にフリーズする","エラーになりプログラムが実行できない","mainloopは省略しても全く同じ動作になる"],answers:["ウィンドウがすぐに閉じてしまい操作を待ち受けない"],explain:"mainloop()は、ユーザーの操作(クリックやキー入力など)を待ち受け続けるための仕組みです。これを呼ばないと、ウィンドウを表示する処理がすぐ終わってしまい、操作を受け付けないまま閉じてしまいます。"},{type:"choice",lead:"StringVarをラベルのtextvariableに紐づける利点として正しいものを選びなさい。",options:["set()するだけで画面の表示も自動的に更新される","textオプションより文字数制限が厳しい","ボタンにしか使えない","文字列以外の型でも自動的に変換される"],answers:["set()するだけで画面の表示も自動的に更新される"],explain:"textvariableにStringVarを紐づけておくと、そのStringVarの値をset()で書き換えるだけで、対応するウィジェットの表示も自動的に更新されます。"},{type:"choice",lead:"自作のウィジェットクラス(ttk.Frameを継承)の__init__の中でttk.Label(self, ...)のようにselfを親として渡す理由として正しいものを選びなさい。",options:["生成したウィジェットをその自作クラス自身の内部に配置するため","pythonの文法上self以外指定できないため","ラベルをグローバル変数にするため","rootを自動的に削除するため"],answers:["生成したウィジェットをその自作クラス自身の内部に配置するため"],explain:"selfを親として渡すことで、生成したウィジェットはこの自作クラス(Frame)の内部に配置され、後でこのFrame自体をpack()やgrid()で扱ったときに、中身もまとめてついてきます。"},{type:"choice",lead:"ttk.Entryウィジェットからユーザーが入力した文字列を取得するために使うメソッドを選びなさい。",options:["get()","fetch()","read()","value()"],answers:["get()"],explain:"get()は、Entryウィジェットに現在入力されている文字列を取得するためのメソッドです。"},{type:"choice",lead:"1つのウィンドウに複数のボタンを配置し、それぞれ異なるcommandを指定することの利点として正しいものを選びなさい。",options:["ボタンごとに異なる処理を割り当てられる","ボタンの見た目が自動的に統一される","commandを指定しないと配置できない","2つ目以降のボタンは無効になる"],answers:["ボタンごとに異なる処理を割り当てられる"],explain:"それぞれのボタンのcommandに別々の関数を指定することで、「保存ボタン」「キャンセルボタン」のように、ボタンごとに異なる処理を実行させられます。"},{type:"order",lines:[{label:"A",code:"root = tk.Tk()"},{label:"B",code:`label = ttk.Label(root, text="Hi")
label.grid(column=0,row=0)`},{label:"C",code:"root.mainloop()"}],lead:"ウィンドウにラベルを1つ表示するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"ウィンドウ本体を用意し(A)、ラベルを生成して配置し(B)、最後にmainloop()で操作を待ち受けます(C)。"},{type:"order",lines:[{label:"A",code:"msg = tk.StringVar()"},{label:"B",code:`label = ttk.Label(root, textvariable=msg)
label.grid(column=0,row=0)`},{label:"C",code:'msg.set("更新後")'}],lead:"StringVarと連動するラベルを作り、表示を更新するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"StringVarを用意し(A)、それをtextvariableに紐づけたラベルを配置し(B)、set()で値を更新すると表示も変わります(C)。"},{type:"order",lines:[{label:"A",code:`entry = ttk.Entry(root)
entry.grid(column=0,row=0)`},{label:"B",code:`def onClick():
    print(entry.get())`},{label:"C",code:`btn = ttk.Button(root, text="表示", command=onClick)
btn.grid(column=0,row=1)`}],lead:"入力欄の内容をボタンで表示するプログラムになるよう、正しい順番を記号で答えなさい。",answers:["A,B,C"],explain:"入力欄を配置し(A)、それを参照する関数を定義し(B)、その関数をcommandに指定したボタンを配置します(C)。"},{type:"debug",long:!0,before:`class Calculator(ttk.Frame):
    def __init__(self, root):
        super().__init__(root)
`,after:"",lead:'Calculatorの__init__の中に、"合計:"というラベルをcolumn=0,row=0に配置する処理を書きなさい(親はselfにする)。',answers:[`label = ttk.Label(self, text="合計:")
label.grid(column=0, row=0)`],explain:"自作ウィジェットクラスの中でラベルを生成するときは、親としてselfを指定し、そのクラス自身の内部に配置します。"},{type:"debug",long:!0,before:`class Form(ttk.Frame):
    def __init__(self, root):
        super().__init__(root)
        self.nameEntry = ttk.Entry(self)
        self.nameEntry.grid(column=0,row=0)
`,after:"",lead:'Formの__init__の中に、"登録"というテキストのボタンを生成し、column=1,row=0に配置する処理を書きなさい(commandは指定しなくてよい)。',answers:[`btn = ttk.Button(self, text="登録")
btn.grid(column=1, row=0)`],explain:"既存のnameEntryの右隣(column=1)に、登録ボタンを配置します。"},{type:"debug",long:!0,before:`entry = ttk.Entry(root)
entry.grid(column=0,row=0)
resultVar = tk.StringVar()
label = ttk.Label(root, textvariable=resultVar)
label.grid(column=0,row=1)
def onClick():
`,after:`
btn = ttk.Button(root, text="変換", command=onClick)
btn.grid(column=0,row=2)`,lead:"onClickの中身に、entryの文字列を取得し、resultVarにセットする処理を書きなさい。",answers:[`value = entry.get()
resultVar.set(value)`],explain:"entry.get()で入力欄の中身を取得し、resultVar.set(value)でStringVarを更新すると、紐づいたラベルの表示も自動的に変わります。"},{type:"debug",long:!0,before:`count = tk.IntVar()
count.set(0)
label = ttk.Label(root, textvariable=count)
label.grid(column=0,row=0)
def onClick():
`,after:`
btn = ttk.Button(root, text="+1", command=onClick)
btn.grid(column=0,row=1)`,lead:"onClickの中身に、countの値を1増やす処理を書きなさい。",answers:["count.set(count.get() + 1)"],explain:"count.get()で現在の値を取得し、1を足した値をset()で書き戻すことで、ボタンを押すたびに表示が1ずつ増えるカウンタになります。"},{type:"debug",long:!0,before:`class TodoApp(ttk.Frame):
    def __init__(self, root):
        super().__init__(root)
`,after:"",lead:"TodoAppの__init__の中に、入力欄(Entry)を1つ生成し、column=0,row=0に配置する処理を書きなさい(親はselfにする)。",answers:[`entry = ttk.Entry(self)
entry.grid(column=0, row=0)`],explain:"自作ウィジェットクラスの中でEntryを生成するときも、親としてselfを指定します。"},{type:"debug",long:!0,before:`root = tk.Tk()
root.title("設定")
`,after:`
root.mainloop()`,lead:'"音量:"というラベルをcolumn=0,row=0に配置し、続けて入力欄(Entry)をcolumn=1,row=0に配置する処理を書きなさい。',answers:[`label = ttk.Label(root, text="音量:")
label.grid(column=0, row=0)
entry = ttk.Entry(root)
entry.grid(column=1, row=0)`],explain:"ラベルと入力欄を同じ行(row=0)で異なる列(column=0と1)に配置することで、横に並べて表示できます。"},{type:"debug",long:!0,before:`def onSave():
    print("保存しました")
def onCancel():
    print("キャンセルしました")
`,after:"",lead:'"保存"というテキストでonSaveを、"キャンセル"というテキストでonCancelをcommandに指定した2つのボタンを生成する行を書きなさい(配置は不要)。',answers:[`btn1 = ttk.Button(root, text="保存", command=onSave)
btn2 = ttk.Button(root, text="キャンセル", command=onCancel)`],explain:"commandにそれぞれ異なる関数を指定することで、ボタンごとに違う処理を割り当てられます。"},{type:"debug",long:!0,before:`class Counter(ttk.Frame):
    def __init__(self, root):
        super().__init__(root)
        self.count = tk.IntVar()
        self.count.set(0)
        self.label = ttk.Label(self, textvariable=self.count)
        self.label.grid(column=0,row=0)
`,after:"",lead:'Counterの__init__の中に、押すたびにself.countを1増やすincrement関数を定義し、"+1"というテキストでそれをcommandに指定するボタンを生成し、column=0,row=1に配置する処理を書きなさい。',answers:[`def increment():
self.count.set(self.count.get() + 1)
btn = ttk.Button(self, text="+1", command=increment)
btn.grid(column=0, row=1)`],explain:"increment関数の中でself.countを1増やし、それをcommandに指定したボタンを、self(自作クラス自身)を親として配置します。"},{before:`root = tk.Tk()
label = ttk.Label(root, text="A")
label.grid(column=0,row=0)
label2 = ttk.Label(root, text="B")
label2.grid(column=0,row=0)
# 同じcolumn,rowに配置した場合、画面ではどう見えるか(日本語で簡潔に)
`,after:"",answers:["重なって表示される"],explain:"同じマスに複数のウィジェットを配置すると、後から配置したものが上に重なって表示されてしまいます。"},{before:`entry = ttk.Entry(root)
entry.grid(column=0,row=0)
entry.insert(0, "初期値")
value = entry.get()
print(value) # `,after:"",lead:"出力される内容を書きなさい。",answers:["初期値"],explain:'insert(0, "初期値")によって入力欄にあらかじめ"初期値"が入っているので、get()で取得した値もそのまま"初期値"になります。'},{before:`root = tk.Tk()
root.title("My App")
print(root.`,after:"()) # 設定したタイトルを取得するメソッド",answers:["title"],explain:"title()は引数を渡すと設定、引数を渡さずに呼ぶと現在のタイトルを取得する、両方の役割を持つメソッドです。"},{before:`class Panel(ttk.Frame):
    def __init__(self, root):
        `,after:"(root) # 親クラス(ttk.Frame)の__init__を呼び出す",answers:["super().__init__"],explain:"super().__init__(root)で、継承元であるttk.Frameのコンストラクタを呼び出し、Frameとしての初期化処理を行います。"},{before:`// tkinterでウィンドウの中に配置する部品(ラベル・ボタン・入力欄など)の総称を何と呼ぶか(カタカナで)
`,after:"",answers:["ウィジェット"],explain:"ラベル、ボタン、入力欄など、ウィンドウの中に配置する部品全般をウィジェットと呼びます。"}],qsExpert:[{type:"debug",long:!0,before:`import tkinter as tk
from tkinter import ttk
root = tk.Tk()
text = tk.StringVar()
label = ttk.Label(root, textvariable=text)
label.grid(column=0,row=0)
entry = ttk.Entry(root)
entry.grid(column=0,row=1)
def onClick():
    value = entry.get()
    text.set(value)
`,after:`
root.mainloop()`,lead:'"反映"というテキストのボタンを生成し、onClick関数をcommandに指定して(column=0,row=2)の位置に配置する処理を書きなさい。',answers:[`btn = ttk.Button(root, text="反映", command=onClick)
btn.grid(column=0,row=2)`],explain:"ttk.Buttonの生成とgrid()による配置は、これまでのLabelやEntryと同じ流れです。commandにonClickを指定しておくことで、このボタンが押されるたびにentryの内容がtextへ反映され、ラベルの表示が更新されます。"},{type:"debug",long:!0,before:`import tkinter as tk
from tkinter import ttk
class Panel(ttk.Frame):
    def __init__(self, root):
        super().__init__(root)
        label = ttk.Label(self, text="Hello")
        label.grid(column=0, row=0)

`,after:"",lead:"if __name__ == '__main__': のブロックの中に、root=tk.Tk()でウィンドウを用意し、Panel(root)を生成してpack()で配置し、mainloop()で待ち受ける処理を書きなさい。",answers:[`if __name__ == '__main__':
root = tk.Tk()
app = Panel(root)
app.pack()
root.mainloop()`],explain:"このファイルが直接実行されたときだけ動く定番のイディオムの中で、ウィンドウ本体を用意し、自作ウィジェットクラスPanelのオブジェクトを生成して配置し、最後にmainloop()で操作を待ち受けます。Panelは他のファイルからimportして再利用することもできます。"},{type:"debug",long:!0,before:`import tkinter as tk
from tkinter import ttk
root = tk.Tk()
text = tk.StringVar()
text.set("OFF")
label = ttk.Label(root, textvariable=text)
label.grid(column=0,row=0)
def onClick():
`,after:`
btn = ttk.Button(root, text="切替", command=onClick)
btn.grid(column=0,row=1)
root.mainloop()`,lead:'onClick関数の中身に、textの中身が"OFF"なら"ON"に、そうでなければ"OFF"にする処理を書きなさい(text.get()で現在の中身を取得できます)。',answers:[`if text.get() == "OFF":
text.set("ON")
else:
text.set("OFF")`],explain:'StringVarはset()で値を書き換えられるだけでなく、get()で現在の中身を読み取ることもできます。text.get()で今の表示が"OFF"かどうかを判定し、条件に応じてtext.set()で反対の状態に切り替えることで、ボタンを押すたびにON/OFFが交互に切り替わるようになります。'},{type:"debug",long:!0,before:`import tkinter as tk
from tkinter import ttk
root = tk.Tk()
names = ["A","B","C"]
row = 0
`,after:`
root.mainloop()`,lead:"names内の3つの文字列それぞれについて、ラベルを生成し、rowを1つずつ増やしながら縦に並べて配置するfor文を書きなさい(for n in names: の形で)。",answers:[`for n in names:
label = ttk.Label(root, text=n)
label.grid(column=0, row=row)
row += 1`],explain:"for n in names: で、names(リスト)の中身を1つずつnに取り出しながら繰り返します。ループのたびに新しいラベルを生成してrow番目に配置し、次のラベルが1つ下の行に来るようにrowを1ずつ増やしていきます。"},{type:"debug",long:!0,before:`import tkinter as tk
from tkinter import ttk
root = tk.Tk()
log = tk.StringVar()
log.set("")
label = ttk.Label(root, textvariable=log)
label.grid(column=0,row=0)
entry = ttk.Entry(root)
entry.grid(column=0,row=1)
def onAdd():
`,after:`
btn = ttk.Button(root, text="追加", command=onAdd)
btn.grid(column=0,row=2)
root.mainloop()`,lead:"onAdd関数の中身に、entryに入力された文字列を取得し、現在のlogの中身に改行と共に追加してセットし直す処理を書きなさい(log.get()で現在の中身を取得できます)。",answers:[`value = entry.get()
log.set(log.get() + "\\n" + value)`],explain:'entry.get()で今入力欄にある文字列を取得し、log.get()で現在のログの中身を取得して、間に改行"\\n"を挟みながら文字列として連結し、log.set()で書き戻します。ボタンを押すたびに新しい入力が下に積み重なっていく、簡易的なメモ欄の仕組みです。'},{type:"debug",long:!0,before:`import tkinter as tk
from tkinter import ttk
root = tk.Tk()
entry = ttk.Entry(root)
entry.grid(column=0,row=0)
def onClear():
`,after:`
btn = ttk.Button(root, text="クリア", command=onClear)
btn.grid(column=0,row=1)
root.mainloop()`,lead:'onClear関数の中身に、entryの中身をすべて削除する処理を書きなさい(delete(0, "end")を使う)。',answers:['entry.delete(0, "end")'],explain:'delete(0, "end")は、入力欄の先頭(0)から末尾("end")までを削除するメソッドです。ボタンを押すたびに入力欄が空になります。'},{type:"debug",long:!0,before:`import tkinter as tk
from tkinter import ttk
root = tk.Tk()
entry1 = ttk.Entry(root)
entry1.grid(column=0,row=0)
entry2 = ttk.Entry(root)
entry2.grid(column=0,row=1)
resultVar = tk.StringVar()
label = ttk.Label(root, textvariable=resultVar)
label.grid(column=0,row=2)
def onCalc():
`,after:`
btn = ttk.Button(root, text="合計", command=onCalc)
btn.grid(column=0,row=3)
root.mainloop()`,lead:"onCalc関数の中身に、entry1とentry2の入力値をint型に変換して合計し、resultVarにセットする処理を書きなさい(int()で変換できる)。",answers:[`total = int(entry1.get()) + int(entry2.get())
resultVar.set(total)`],explain:"entry.get()で取得できるのは常に文字列なので、計算に使うにはint()で数値に変換する必要があります。変換して合計した値をresultVarにセットすると、ラベルの表示も自動的に更新されます。"},{type:"debug",long:!0,before:`import tkinter as tk
from tkinter import ttk
class NameList(ttk.Frame):
    def __init__(self, root):
        super().__init__(root)
        self.names = []
        self.entry = ttk.Entry(self)
        self.entry.grid(column=0,row=0)
`,after:"",lead:'"追加"というテキストのボタンを生成し、押すたびにself.entryの内容をself.namesに追加するonAdd関数をcommandに指定して、column=1,row=0に配置する処理を書きなさい。',answers:[`def onAdd():
self.names.append(self.entry.get())
btn = ttk.Button(self, text="追加", command=onAdd)
btn.grid(column=1, row=0)`],explain:"onAdd関数の中でself.entry.get()を呼び、その文字列をself.names(リスト)にappendで追加します。selfを親としてボタンを配置することで、このNameList自身の内部に組み込まれます。"},{type:"debug",long:!0,before:`import tkinter as tk
from tkinter import ttk
root = tk.Tk()
`,after:`
root.mainloop()`,lead:'"終了"というテキストのボタンを生成し、押すとウィンドウを閉じる(root.destroy)処理をcommandに指定して、column=0,row=0に配置する処理を書きなさい。',answers:[`btn = ttk.Button(root, text="終了", command=root.destroy)
btn.grid(column=0, row=0)`],explain:"root.destroy はウィンドウを閉じるメソッドで、括弧をつけずにcommandへ渡すことで、ボタンが押されたタイミングで呼び出されるようになります。"},{type:"debug",long:!0,before:`import tkinter as tk
from tkinter import ttk
root = tk.Tk()
score = tk.IntVar()
score.set(0)
label = ttk.Label(root, textvariable=score)
label.grid(column=0,row=0)
def onCorrect():
`,after:`
btn = ttk.Button(root, text="正解", command=onCorrect)
btn.grid(column=0,row=1)
root.mainloop()`,lead:"onCorrect関数の中身に、scoreの値を10増やす処理を書きなさい。",answers:["score.set(score.get() + 10)"],explain:"get()で現在の値を取得し、10を足した値をset()で書き戻すことで、ボタンを押すたびに得点が10ずつ増えるようになります。"},{type:"debug",long:!0,before:`import tkinter as tk
from tkinter import ttk
root = tk.Tk()
entry = ttk.Entry(root)
entry.grid(column=0,row=0)
resultVar = tk.StringVar()
label = ttk.Label(root, textvariable=resultVar)
label.grid(column=0,row=1)
def onDouble():
`,after:`
btn = ttk.Button(root, text="2倍", command=onDouble)
btn.grid(column=0,row=2)
root.mainloop()`,lead:"onDouble関数の中身に、entryの入力値をint型に変換して2倍した値をresultVarにセットする処理を書きなさい。",answers:[`value = int(entry.get())
resultVar.set(value * 2)`],explain:"入力欄から取得できる値は文字列なので、int()で数値に変換してから2倍し、resultVarにセットして表示を更新します。"},{type:"debug",long:!0,before:`import tkinter as tk
from tkinter import ttk
class Toggle(ttk.Frame):
    def __init__(self, root):
        super().__init__(root)
        self.state = tk.StringVar()
        self.state.set("停止中")
        label = ttk.Label(self, textvariable=self.state)
        label.grid(column=0,row=0)
`,after:"",lead:'押すたびにself.stateが"停止中"なら"稼働中"に、そうでなければ"停止中"に切り替わるonToggle関数を定義し、"切替"というテキストでそれをcommandに指定するボタンを生成し、column=1,row=0に配置する処理を書きなさい。',answers:[`def onToggle():
if self.state.get() == "停止中":
self.state.set("稼働中")
else:
self.state.set("停止中")
btn = ttk.Button(self, text="切替", command=onToggle)
btn.grid(column=1, row=0)`],explain:"self.state.get()で現在の状態を確認し、条件に応じてset()で反対の状態に切り替えます。ボタンを押すたびに表示が交互に変わります。"},{type:"debug",long:!0,before:`import tkinter as tk
from tkinter import ttk
root = tk.Tk()
scores = [80, 90, 70]
row = 0
`,after:`
root.mainloop()`,lead:"scores内の3つの得点それぞれについて、ラベルを生成し、rowを1つずつ増やしながら縦に並べて配置するfor文を書きなさい(for s in scores: の形で)。",answers:[`for s in scores:
label = ttk.Label(root, text=s)
label.grid(column=0, row=row)
row += 1`],explain:"リストの中身を1つずつ取り出しながら、そのたびに新しいラベルを生成してrow番目に配置し、rowを1増やして次のラベルが1つ下に来るようにします。"},{type:"debug",long:!0,before:`import tkinter as tk
from tkinter import ttk
class AccountPanel(ttk.Frame):
    def __init__(self, root):
        super().__init__(root)
        self.balance = tk.IntVar()
        self.balance.set(1000)
        label = ttk.Label(self, textvariable=self.balance)
        label.grid(column=0,row=0)
`,after:"",lead:'押すたびにself.balanceを500増やすonDeposit関数を定義し、"入金"というテキストでそれをcommandに指定するボタンを生成し、column=1,row=0に配置する処理を書きなさい。',answers:[`def onDeposit():
self.balance.set(self.balance.get() + 500)
btn = ttk.Button(self, text="入金", command=onDeposit)
btn.grid(column=1, row=0)`],explain:"self.balance.get()で現在の残高を取得し、500を足した値をset()で書き戻すことで、押すたびに残高が500ずつ増えるボタンになります。"},{type:"debug",long:!0,before:`import tkinter as tk
from tkinter import ttk
class Dashboard(ttk.Frame):
    def __init__(self, root):
        super().__init__(root)
        label = ttk.Label(self, text="ダッシュボード")
        label.grid(column=0, row=0)

`,after:"",lead:"if __name__ == '__main__': のブロックの中に、root=tk.Tk()でウィンドウを用意し、Dashboard(root)を生成してpack()で配置し、mainloop()で待ち受ける処理を書きなさい。",answers:[`if __name__ == '__main__':
root = tk.Tk()
app = Dashboard(root)
app.pack()
root.mainloop()`],explain:"このファイルが直接実行されたときだけ動く定番のイディオムの中で、ウィンドウを用意し、自作ウィジェットクラスDashboardを生成して配置し、mainloop()で操作を待ち受けます。"}],qsDrag:[{type:"dragfill",lead:"ボタンを生成しcommandにonClickを指定してから、grid()で配置する処理になるよう、正しいピースを空欄に配置しなさい。",lines:[{code:"root = tk.Tk()"},{code:"def onClick():"},{code:'    print("Hi")'},{blank:"b1"},{blank:"b2"}],pieces:[{id:"p1",code:'btn = ttk.Button(root, text="OK", command=onClick)'},{id:"p2",code:"btn.grid(column=0,row=0)"},{id:"p3",code:'btn = ttk.Button(root, text="OK", command=onClick())'}],answerMap:{b1:"p1",b2:"p2"},explain:"commandには関数そのもの(onClick)を渡すのが正しく、呼び出されるのはボタンが押されたタイミングです(p1)。p3のようにonClick()と括弧をつけてしまうと、ボタンを生成した瞬間にonClickがすぐ実行されてしまい、ボタンを押したときには何も起きなくなります。生成したボタンは最後にgrid()で配置します(p2)。"}]}],Zn=["qs","qsHard","qsExtra","qsExpert"],N={1:"初級(基礎)",2:"中級(標準)",3:"上級(応用)",4:"超級(発展)"},Jn={1:14,2:20,3:23,4:28},$n={1:10,2:11,3:12,4:14},ae={1:"鉄板",2:"頻出",3:"標準",4:"深掘り",5:"完全制覇"},et={1:"ほぼ確実に問われる最重要の基礎。時間がない直前は、まずここだけを鉄板の得点源にする。",2:"出題頻度が高い定番設問。鉄板が仕上がったら次に固めたいライン。",3:"合格を安定させる標準的な応用問題。",4:"差がつく発展的な深掘り問題。余裕があれば挑戦したい。",5:"ドラッグ問題やボス総復習など特殊形式を含む、完全制覇を目指す人向けの最上級設問。"},Xn={qs:1,qsHard:2,qsExtra:3,qsExpert:4,qsDrag:5,boss:5},ea={1:1,2:2,3:3,4:4};function re(e,n){return e.tier?e.tier:n&&Xn[n]?Xn[n]:ea[e.diff]||3}ye.forEach(function(e){Zn.forEach(function(n,a){(e[n]||[]).forEach(function(i,s){i.unit=e.id,i.diff=a+1,i.qid=e.id+":"+n+":"+s})}),(e.qsDrag||[]).forEach(function(n,a){n.unit=e.id,n.diff=3,n.qid=e.id+":qsDrag:"+a;var i=n.lines.filter(function(s){return s.blank!==void 0}).map(function(s){return s.blank});n.answers=[i.map(function(s){return s+"="+n.answerMap[s]}).join("|")]})});var Dn=[{ids:[0,1,2],id:"b1",title:"正しく動いていたはずのコード",sub:"入出力・ポインタ・関数",emoji:"👹",mon:"未定義動作《UB》"},{ids:[3,4,5],id:"b2",title:"消えた一個のデータ",sub:"配列・文字列・構造体",emoji:"🦂",mon:"境界のずらし屋《オフバイワン》"},{ids:[6,7,8],id:"b3",title:"設計図だけは完璧だった",sub:"クラス設計",emoji:"🐺",mon:"何でも知っている神クラス"},{ids:[9,10],id:"b4",title:"複雑すぎる家系図",sub:"継承",emoji:"🐉",mon:"多重継承の怪人《ダイヤモンド》"},{ids:[11,12],id:"b5",title:"提出直前の完全犯罪",sub:"Python・Tkinter",emoji:"👑",mon:"締切5分前の自分"}],he={b1:[{type:"debug",long:!0,before:`void swap(int* px, int* py){
  `,after:`
}`,lead:"空欄に、pxとpyが指す値を正しく入れ替える処理(複数行でよい)を書きなさい。",answers:[`int t=*px;
*px=*py;
*py=t;`],altAnswers:["std::swap(*px,*py);"],explain:"一時変数tにpxの指す値を退避し、pxの指す先にpyの指す値を代入し、最後にpyの指す先にtを書き戻すことで中身を入れ替えられます。(別解: <utility>のstd::swapを使えば1行で書けますが、授業では扱っていません)"},{type:"debug",long:!0,before:`void showBoth(int n){
  `,after:`
}`,lead:"showBoth関数の中身に、nを「16進数→10進数」の順で2行出力する処理を書きなさい。",answers:[`cout<<hex<<n<<endl;
cout<<dec<<n<<endl;`],explain:"マニピュレータhexで16進数表示に切り替えて1行出力したあと、decで10進数表示に戻してもう1行出力します。マニピュレータは指定し直すまで効果が続く点に注意しましょう。"},{type:"debug",long:!0,before:`int main(){
  int n;
  cin >> n;
  `,after:`
  return 0;
}`,lead:"nが偶数なら16進数、奇数なら10進数で出力する処理を書きなさい。",answers:[`if(n%2==0){
cout<<hex<<n<<endl;
}else{
cout<<dec<<n<<endl;
}`],explain:"n%2==0で偶数かどうかを判定し、条件に応じてhexとdecを使い分けて出力します。"},{type:"debug",long:!0,before:`void printInfo(string label, int value){
  `,after:`
}`,lead:'labelとvalueを"label: value"の形式で1行出力する処理を書きなさい。',answers:['cout << label << ": " << value << endl;'],explain:'文字列と数値を<<で自由につなげられるので、labelと": "とvalueを続けて出力すれば指定の形式になります。'},{type:"debug",long:!0,before:`int main(){
  int a = 5;
  int* p = nullptr;
  `,after:`
  cout << *p << endl;
  return 0;
}`,lead:"pにaのアドレスを代入する行を書きなさい(nullptrのままだと*pは危険)。",answers:["p = &a;"],explain:"まだどこも指していない(nullptr)ポインタは、&aのようにアドレスを代入してから使う必要があります。"},{type:"debug",long:!0,before:`void addTen(int& x){
  `,after:`
}`,lead:"参照渡しで受け取ったxに10を加算する処理を書きなさい。",answers:["x += 10;"],explain:"xは参照なので、xを書き換えると呼び出し元の変数そのものが変わります。"},{type:"debug",long:!0,before:`int main(){
  int a=3, b=7;
  int* pa = &a;
  int* pb = &b;
  `,after:`
  return 0;
}`,lead:"pa,pbが指す値を入れ替える処理(一時変数を使ってよい)を書きなさい。",answers:[`int t=*pa;
*pa=*pb;
*pb=t;`],explain:"一時変数tに*paの値を退避し、*paに*pbの値を代入し、最後に*pbにtを書き戻すことで中身が入れ替わります。"},{type:"debug",long:!0,before:`int max3(int a,int b,int c){
  `,after:`
}`,lead:"a,b,cのうち最大値をreturnする処理を書きなさい。",answers:[`int m=a;
if(b>m) m=b;
if(c>m) m=c;
return m;`],explain:"仮の最大値mをaとしておき、bとcのそれぞれと比較しながら更新していきます。"},{type:"debug",long:!0,before:`void showBase(int n, int base){
  if(base==16){
    `,after:`
  }else if(base==8){
    cout<<oct<<n<<endl;
  }else{
    cout<<dec<<n<<endl;
  }
}`,lead:"baseが16のときhexで出力する処理を書きなさい。",answers:["cout<<hex<<n<<endl;"],explain:"baseの値に応じてマニピュレータを使い分ける関数です。base==16のときはhexで出力します。"},{type:"debug",long:!0,before:`int square(int x){
  `,after:`
}
double square(double x){
  return x*x;
}`,lead:"int版のsquare関数の中身に、xの2乗をreturnする処理を書きなさい(オーバーロード)。",answers:["return x*x;"],explain:"int型引数を受け取る版でも、double版と同じ計算(x*x)をそのままreturnします。"},{type:"debug",long:!0,before:`int main(){
  int n;
  int total=0;
  for(int i=0;i<3;i++){
    `,after:`
  }
  cout << dec << total << endl;
  return 0;
}`,lead:"3回繰り返し、cinで読み込んだ値をtotalに加算する処理を書きなさい。",answers:[`cin >> n;
total += n;`],explain:"ループのたびに新しい値nを読み込み、totalに足し込んでいきます。"},{type:"debug",long:!0,before:`bool isPositive(int* p){
  `,after:`
}`,lead:"pが指す値が0より大きいかをbool型でreturnする処理を書きなさい。",answers:["return *p > 0;"],explain:"*pでpが指す先の値を取り出し、0より大きいかどうかの比較結果をそのままreturnします。"},{type:"debug",long:!0,before:`void printRange(int start, int end){
  `,after:`
}`,lead:"startからendまでの整数を1つずつ出力するfor文を書きなさい。",answers:[`for(int i=start;i<=end;i++){
cout << i << endl;
}`],explain:"forループの開始値・終了条件に引数をそのまま使い、i<=endとすることでendの値も含めて出力されます。"},{type:"debug",long:!0,before:`int main(){
  int a = 10;
  int& ref = a;
  `,after:`
  cout << a << endl;
  return 0;
}`,lead:"refを通してaの値を20にする処理を書きなさい。",answers:["ref = 20;"],explain:"refはaの別名なので、refに20を代入するとaそのものが20に変わります。"},{type:"debug",long:!0,before:"",after:"",lead:"#include<iostream>とusing namespace std;を書いたうえで、int型の変数xを読み込み、xを8進数、10進数、16進数の順で1行ずつ出力するmain関数一式を書きなさい。",answers:[`#include <iostream>
using namespace std;
int main(){
int x;
cin>>x;
cout<<oct<<x<<endl;
cout<<dec<<x<<endl;
cout<<hex<<x<<endl;
return 0;
}`],explain:"ヘッダを取り込み、xを読み込んだあと、oct→dec→hexの順にマニピュレータを切り替えながら3回出力します。"},{type:"debug",long:!0,before:`void swapIfDescending(int* a, int* b){
  `,after:`
}`,lead:"*aが*bより大きい場合だけ、値を入れ替えて*aの方が小さくなるようにする処理を書きなさい。",answers:[`if(*a > *b){
int t=*a;
*a=*b;
*b=t;
}`],explain:"if(*a > *b)で入れ替えが必要かどうかを判定し、必要な場合だけ一時変数を使って値を入れ替えます。"},{type:"debug",long:!0,before:`int main(){
  int a, b;
  cin >> a >> b;
  `,after:`
  return 0;
}`,lead:"aとbのうち小さい方をdecで、大きい方をhexで、それぞれ1行ずつ出力する処理を書きなさい。",answers:[`if(a<b){
cout<<dec<<a<<endl;
cout<<hex<<b<<endl;
}else{
cout<<dec<<b<<endl;
cout<<hex<<a<<endl;
}`],explain:"aとbを比較し、小さい方をdecで、大きい方をhexで出力するよう条件分岐します。"}],b2:[{type:"debug",long:!0,before:`for(int i=1;i<n;i++){
  for(int j=n-1;j>=i;j--){
    `,after:`
  }
}`,lead:"空欄に、隣接する要素a[j-1]とa[j]を比較し、逆順なら交換する処理一式を書きなさい。",answers:[`if(a[j-1]>a[j]){
int w=a[j];a[j]=a[j-1];a[j-1]=w;
}`],altAnswers:["if(a[j-1]>a[j]) swap(a[j-1],a[j]);"],explain:"隣り合う要素を比較し、左が右より大きければ(逆順なら)入れ替えます。(別解: <algorithm>のswap関数を使えば1行にまとめられますが、授業では扱っていません)"},{type:"debug",long:!0,before:`Results students[3];
`,after:"",lead:"students配列の3人分に、名前と得点を読み込むfor文一式を書きなさい。",answers:[`for(int i=0;i<3;i++){
cin>>students[i].name>>students[i].score;
}`],explain:"0から2までの添字でループし、各要素のnameとscoreにcinで読み込みます。"},{type:"debug",long:!0,before:`int a[5]={3,1,4,1,5};
int sum=0;
`,after:`
cout << sum << endl;`,lead:"配列aの合計をsumに求めるfor文を書きなさい。",answers:[`for(int i=0;i<5;i++){
sum += a[i];
}`],explain:"sumを0で初期化しておき、全要素を1つずつ足し込んでいきます。"},{type:"debug",long:!0,before:`void reverseArray(int* a, int n){
  `,after:`
}`,lead:"配列aを前後逆順に並べ替える処理を書きなさい(前半と後半を1つずつ入れ替える方法でよい)。",answers:[`for(int i=0;i<n/2;i++){
int w=a[i];a[i]=a[n-1-i];a[n-1-i]=w;
}`],explain:"先頭からi番目と末尾からi番目(添字n-1-i)を1組ずつ交換していきます。"},{type:"debug",long:!0,before:`int countChar(string s, char target){
  `,after:`
}`,lead:"sの中にtargetと同じ文字がいくつあるか数えてreturnする処理を書きなさい。",answers:[`int count=0;
for(int i=0;i<s.size();i++){
if(s[i]==target) count++;
}
return count;`],explain:"カウンタcountを0で初期化し、全文字を調べてtargetと一致するたびに1増やします。"},{type:"debug",long:!0,before:`struct Item{ string name; int price; };
int totalPrice(Item* items, int n){
  `,after:`
}`,lead:"items配列n個分のpriceを合計してreturnする処理を書きなさい。",answers:[`int sum=0;
for(int i=0;i<n;i++){
sum += items[i].price;
}
return sum;`],explain:"合計用のsumを0で初期化し、全要素のpriceを足し込んでからreturnします。"},{type:"debug",long:!0,before:`int findMax(int* a, int n){
  `,after:`
}`,lead:"配列aの中から最大値を探してreturnする処理を書きなさい。",answers:[`int maxVal=a[0];
for(int i=1;i<n;i++){
if(a[i]>maxVal) maxVal=a[i];
}
return maxVal;`],explain:"maxValをa[0]から始め、残りの要素と比較しながら最大値を更新します。"},{type:"debug",long:!0,before:`bool isPalindrome(string s){
  `,after:`
}`,lead:"sが前から読んでも後ろから読んでも同じ(回文)かどうかをbool型でreturnする処理を書きなさい。",answers:[`for(int i=0;i<s.size()/2;i++){
if(s[i]!=s[s.size()-1-i]) return false;
}
return true;`],explain:"先頭からi番目と末尾からi番目を比較し、1組でも一致しなければfalseをreturnします。"},{type:"debug",long:!0,before:`struct Point{ int x; int y; };
int distanceSquared(Point a, Point b){
  `,after:`
}`,lead:"aとbのxの差の2乗とyの差の2乗の合計(距離の2乗)をreturnする処理を書きなさい。",answers:[`int dx = a.x-b.x;
int dy = a.y-b.y;
return dx*dx+dy*dy;`],explain:"xの差とyの差をそれぞれ求めて2乗し、足し合わせた値をreturnします。"},{type:"debug",long:!0,before:`void selectionSort(int* a, int n){
  `,after:`
}`,lead:"選択ソートでaを昇順に並べ替える処理を書きなさい(各周でi番目以降の最小値を探し、i番目と交換する)。",answers:[`for(int i=0;i<n-1;i++){
int minIdx=i;
for(int j=i+1;j<n;j++){
if(a[j]<a[minIdx]) minIdx=j;
}
int t=a[i];a[i]=a[minIdx];a[minIdx]=t;
}`],explain:"未処理の範囲の中で最小の要素の場所を探してからi番目と1回だけ交換します。"},{type:"debug",long:!0,before:`struct Results{ string name; int score; };
Results findTopScorer(Results* students, int n){
  `,after:`
}`,lead:"students配列の中から最も得点が高い生徒をreturnする処理を書きなさい。",answers:[`Results top=students[0];
for(int i=1;i<n;i++){
if(students[i].score>top.score) top=students[i];
}
return top;`],explain:"topをstudents[0]で仮に設定し、それより得点の高い生徒が見つかるたびに丸ごと更新します。"},{type:"debug",long:!0,before:`int countVowels(string s){
  `,after:`
}`,lead:"sの中の母音(a,i,u,e,o)の数を数えてreturnする処理を書きなさい。",answers:[`int count=0;
for(int i=0;i<s.size();i++){
char c=s[i];
if(c=='a'||c=='i'||c=='u'||c=='e'||c=='o') count++;
}
return count;`],explain:"各文字を順番に調べ、5つの母音のいずれかと一致すればcountを増やします。"},{type:"debug",long:!0,before:`void copyArray(int* src, int* dest, int n){
  `,after:`
}`,lead:"srcの内容をdestにそのままコピーする処理を書きなさい。",answers:[`for(int i=0;i<n;i++){
dest[i] = src[i];
}`],explain:"要素を1つずつdest[i]=src[i]と代入していきます。"},{type:"debug",long:!0,before:`struct Item{ string name; int price; };
void applyDiscount(Item* items, int n, int percent){
  `,after:`
}`,lead:"items配列全員のpriceをpercent%引きにする処理を書きなさい(price = price - price*percent/100)。",answers:[`for(int i=0;i<n;i++){
items[i].price = items[i].price - items[i].price*percent/100;
}`],explain:"各要素についてprice*percent/100(割引額)を計算し、元のpriceから引いた値を代入し直します。"},{type:"debug",long:!0,before:`int search(int* a, int n, int target){
  `,after:`
}`,lead:"配列aの中からtargetと同じ値を探し、見つかった添字をreturnする処理を書きなさい(見つからない場合は-1をreturnする)。",answers:[`for(int i=0;i<n;i++){
if(a[i]==target) return i;
}
return -1;`],explain:"見つかった時点でその添字iをreturnし、最後まで見つからなければ-1をreturnします。"},{type:"debug",long:!0,before:`void toUpperManual(string& s){
  `,after:`
}`,lead:"sの中の小文字アルファベットを大文字に変換する処理を書きなさい('a'-'A'=32を利用してよい)。",answers:[`for(int i=0;i<s.size();i++){
if('a'<=s[i] && s[i]<='z') s[i] = s[i] - 32;
}`],explain:"各文字が小文字の範囲にあるかを調べ、そうであれば32を引くことで対応する大文字に変換します。"},{type:"debug",long:!0,before:`struct Point{ int x; int y; };
bool isSamePoint(Point a, Point b){
  `,after:`
}`,lead:"aとbのxとyがそれぞれ等しいかどうかをbool型でreturnする処理を書きなさい。",answers:["return a.x==b.x && a.y==b.y;"],explain:"xとyの両方が一致しているかを&&(かつ)でつなげて判定します。"}],b3:[{type:"debug",long:!0,before:"",after:"",lead:"name(string)とHP(int)をprivateに持ち、コンストラクタでHPを50に初期化するHeroクラスの定義一式を書きなさい。",answers:[`class Hero{
string name;
int HP;
public:
Hero(string n){ name=n; HP=50; }
};`],explain:"クラスの中でアクセス指定子を書かなければデフォルトはprivateになるため、name/HPはそのままでprivateです。public:以降にコンストラクタを定義し、渡された名前をnameに、HPを50に設定します。"},{type:"debug",long:!0,before:`class ArrayCal{
  double* array;
public:
  ArrayCal(int n){ array=new double[n]; }
  `,after:`
};`,lead:"デストラクタを定義し、配列として確保したメモリを正しく解放しなさい。",answers:["~ArrayCal(){ delete [] array; }"],explain:"デストラクタはクラス名の前に~をつけた名前で定義し、戻り値は書きません。newで配列として確保したメモリは、delete []のように角括弧をつけて解放します。"},{type:"debug",long:!0,before:`class Counter{
  int count;
public:
  Counter(){ count=0; }
  `,after:`
};`,lead:"countを1増やすincrement()メソッドと、countの値を返すgetCount()メソッドを、あわせて定義しなさい。",answers:[`void increment(){ count++; }
int getCount(){ return count; }`],explain:"increment()はcountを1つ増やすだけの処理、getCount()はcountの値をそのまま読み取るための窓口です。"},{type:"debug",long:!0,before:`class BankAccount{
  int balance;
public:
  BankAccount(int b){ balance=b; }
  `,after:`
};`,lead:"balanceがamount以上のときだけ引き出す(減算する)withdraw(int amount)メソッドを定義しなさい。",answers:[`void withdraw(int amount){
if(balance>=amount){
balance -= amount;
}
}`],explain:"残高が足りているかを確認してから引き出すことで、balanceが不正にマイナスになるのを防ぎます。"},{type:"debug",long:!0,before:`class Hero{
  int HP;
public:
  Hero(){ HP=100; }
  `,after:`
};`,lead:"HPをptの分だけ減らしつつ、0未満にならないようにするdamaged(int pt)メソッドを定義しなさい。",answers:[`void damaged(int pt){
HP -= pt;
if(HP<0) HP=0;
}`],explain:"まずHPをptの分だけ減らし、その結果0未満になってしまった場合はHPを0に補正します。"},{type:"debug",long:!0,before:`class Rectangle{
  int width, height;
public:
  Rectangle(int w,int h){ width=w; height=h; }
  `,after:`
};`,lead:"widthとheightを掛け合わせた面積をreturnするgetArea()メソッドを定義しなさい。",answers:["int getArea(){ return width*height; }"],explain:"widthとheightを掛け合わせた値を、そのままreturnするだけのメソッドです。"},{type:"debug",long:!0,before:"",after:"",lead:"int levelをprivateに持ち、level省略時は1を使うコンストラクタと、levelを1増やすlevelUp()メソッド、levelを返すgetLevel()メソッドを、あわせて定義したPlayerクラスを書きなさい。",answers:[`class Player{
int level;
public:
Player(int l=1){ level=l; }
void levelUp(){ level++; }
int getLevel(){ return level; }
};`],explain:"デフォルト引数付きのコンストラクタで初期状態を設定し、levelUp()で成長を表現し、getLevel()で外部から確認できるようにします。"},{type:"debug",long:!0,before:`#include <vector>
class ScoreBoard{
  vector<int> scores;
public:
  `,after:`
};`,lead:"得点を追加するadd(int s)メソッドと、平均をdouble型でreturnするaverage()メソッドを、あわせて定義しなさい。",answers:[`void add(int s){ scores.push_back(s); }
double average(){
int sum=0;
for(int i=0;i<scores.size();i++){
sum+=scores[i];
}
return (double)sum/scores.size();
}`],explain:"add()でvectorに得点を追加し、average()では合計を求めてから(double)で変換し要素数で割ります。"},{type:"debug",long:!0,before:`#include <vector>
class Stack{
  vector<int> data;
public:
  void push(int x){ data.push_back(x); }
  `,after:`
};`,lead:"dataの末尾の要素を削除するpop()メソッドと、末尾の要素をreturnするtop()メソッドを、あわせて定義しなさい。",answers:[`void pop(){ data.pop_back(); }
int top(){ return data[data.size()-1]; }`],explain:"pop_back()で末尾を削除し、top()ではdata.size()-1番目(末尾)の値をreturnします。"},{type:"debug",long:!0,before:`class Temperature{
  int celsius;
public:
  Temperature(int c){ celsius=c; }
  `,after:`
};`,lead:"celsiusがc以上のときだけ代入するsetCelsius(int c)メソッドを定義しなさい(絶対零度-273未満は無視する)。",answers:[`void setCelsius(int c){
if(c>=-273){
celsius = c;
}
}`],explain:"絶対零度(-273度)より低い温度は現実には存在しないため、その範囲を下回る値は無視します。"},{type:"debug",long:!0,before:`#include <vector>
class Inventory{
  vector<int> items;
public:
  void add(int x){ items.push_back(x); }
  `,after:`
};`,lead:"itemsの中にtargetと同じ値が含まれているかをbool型でreturnするhas(int target)メソッドを定義しなさい。",answers:[`bool has(int target){
for(int i=0;i<items.size();i++){
if(items[i]==target) return true;
}
return false;
}`],explain:"一致する要素が見つかった時点でtrueをreturnし、最後まで見つからなければfalseをreturnします。"},{type:"debug",long:!0,before:`class Employee{
  int salary;
public:
  Employee(int s){ salary=s; }
  `,after:`
};`,lead:"salaryを返すgetSalary()メソッドと、salaryがs以上のときだけ更新するsetSalary(int s)メソッドを、あわせて定義しなさい。",answers:[`int getSalary(){ return salary; }
void setSalary(int s){
if(s>=0){
salary=s;
}
}`],explain:"getSalary()は値をそのまま読み取る窓口、setSalary()は負の値を弾いてから更新するセッターです。"},{type:"debug",long:!0,before:`class Logger{
public:
  Logger(){ cout << "生成" << endl; }
  `,after:`
};`,lead:'オブジェクトが消滅するときに"消滅"と出力するデストラクタを定義しなさい。',answers:['~Logger(){ cout << "消滅" << endl; }'],explain:"デストラクタはクラス名の前に~をつけた名前で定義し、オブジェクトが消滅する瞬間に自動的に呼ばれます。"},{type:"debug",long:!0,before:`#include <vector>
class Playlist{
  vector<string> songs;
public:
  void add(string s){ songs.push_back(s); }
  `,after:`
};`,lead:"songsの数をreturnするcount()メソッドを定義しなさい。",answers:["int count(){ return songs.size(); }"],explain:"songs.size()でvectorの要素数がわかるので、それをそのままreturnします。"},{type:"debug",long:!0,before:`class Battery{
  int level;
public:
  Battery(int l){ level=l; }
  int getLevel(){ return level; }
  `,after:`
};`,lead:"lが0以上100以下のときだけlevelに代入するsetLevel(int l)メソッドを定義しなさい。",answers:[`void setLevel(int l){
if(l>=0 && l<=100){
level = l;
}
}`],explain:"&&を使って0以上100以下の範囲であることを確認してから代入します。"},{type:"debug",long:!0,before:`class Wallet{
  int money;
public:
  Wallet(int m){ money=m; }
  `,after:`
};`,lead:"moneyにamountを加算するdeposit(int amount)メソッドと、moneyを返すgetMoney()メソッドを、あわせて定義しなさい。",answers:[`void deposit(int amount){ money += amount; }
int getMoney(){ return money; }`],explain:"deposit()はmoneyに加算するだけの処理、getMoney()はmoneyの値をそのまま読み取る窓口です。"},{type:"debug",long:!0,before:`class Thermostat{
  int temp;
public:
  Thermostat(int t){ temp=t; }
  int getTemp(){ return temp; }
  `,after:`
};`,lead:"tが-30以上50以下のときだけtempに代入するsetTemp(int t)メソッドを定義しなさい。",answers:[`void setTemp(int t){
if(t>=-30 && t<=50){
temp = t;
}
}`],explain:"現実的な温度範囲(-30〜50度)を条件にし、その範囲内のときだけ代入します。"}],b4:[{type:"debug",long:!0,before:`class Base{
protected:
  int baseData;
public:
  Base(int b){ baseData=b; }
};
`,after:"",lead:"Baseを継承し、コンストラクタで: Base(a)を呼び出しつつdrvDataを初期化するDerivedクラスの定義一式を書きなさい。",answers:[`class Derived : public Base{
int drvData;
public:
Derived(int a,int b):Base(a){ drvData=b; }
};`],explain:"class Derived : public Base{ ... }; で継承し、コンストラクタのイニシャライザ : Base(a) で基本クラス部分を初期化してから、本体でdrvDataを初期化します。"},{type:"debug",long:!0,before:"",after:"",lead:"attack()を純粋仮想関数として持つ抽象クラスCreatureと、それを継承してattack()が10を返すクラスHeroを、あわせて定義しなさい。",answers:[`class Creature{
public:
virtual int attack()=0;
};
class Hero : public Creature{
public:
int attack(){ return 10; }
};`],explain:"virtual int attack()=0; で純粋仮想関数を持つ抽象クラスCreatureを定義し、それを継承したHeroでattack()の中身を実装(オーバーライド)します。"},{type:"debug",long:!0,before:`class Animal{
public:
  void speak(){ cout << "..." << endl; }
};
`,after:"",lead:'Animalを継承し、speak()を"Meow"を出力するようにオーバーライドするCatクラスを定義しなさい。',answers:[`class Cat : public Animal{
public:
void speak(){ cout << "Meow" << endl; }
};`],explain:"基本クラスと同じ名前・引数のspeak()を再定義することで、オーバーライドが成立します。"},{type:"debug",long:!0,before:`class Employee{
protected:
  int salary;
public:
  Employee(int s){ salary=s; }
};
`,after:"",lead:"Employeeを継承し、salaryとbonusを受け取るコンストラクタ(:Employee(s)経由でsalaryを初期化)と、salaryとbonusの合計をreturnするgetTotalPay()メソッドを持つManagerクラスを定義しなさい。",answers:[`class Manager : public Employee{
int bonus;
public:
Manager(int s,int b):Employee(s){ bonus=b; }
int getTotalPay(){ return salary+bonus; }
};`],explain:"イニシャライザ:Employee(s)で基本クラス部分を初期化し、本体でbonusを初期化します。"},{type:"debug",long:!0,before:`class Shape{
public:
  virtual double area()=0;
};
`,after:"",lead:"Shapeを継承し、半径rを受け取るコンストラクタとarea()(r*r*3.14をreturn)を持つCircleクラスを定義しなさい。",answers:[`class Circle : public Shape{
double r;
public:
Circle(double radius){ r=radius; }
double area(){ return r*r*3.14; }
};`],explain:"コンストラクタで半径を受け取って保存し、area()では円の面積の公式をreturnします。"},{type:"debug",long:!0,before:`class Base{
public:
  void show(){ cout << "Base" << endl; }
};
class Derived : public Base{
public:
  void show(){
    `,after:`
    cout << "Derived" << endl;
  }
};`,lead:"まず基本クラス側のshow()を呼び出す処理を書きなさい(Base::show()の形)。",answers:["Base::show();"],explain:"Base::show();と書けば、オーバーライドで隠れてしまった基本クラス側のshow()をあえて呼び出せます。"},{type:"debug",long:!0,before:`class Vehicle{
public:
  virtual int wheels()=0;
};
`,after:"",lead:"Vehicleを継承し、wheels()が2を返すBikeクラスを定義しなさい。",answers:[`class Bike : public Vehicle{
public:
int wheels(){ return 2; }
};`],explain:"純粋仮想関数wheels()を、2を返す処理として実装します。"},{type:"debug",long:!0,before:`class Base{
protected:
  int hp;
public:
  Base(int h){ hp=h; }
};
`,after:"",lead:"Baseを継承し、コンストラクタで:Base(h)を呼びつつ、hpをptの分だけ減らすdamage(int pt)メソッドを持つMonsterクラスを定義しなさい。",answers:[`class Monster : public Base{
public:
Monster(int h):Base(h){}
void damage(int pt){ hp -= pt; }
};`],explain:"protectedで継承したhpに、派生クラスのメンバ関数から直接アクセスして減算できます。"},{type:"debug",long:!0,before:`class Task{
public:
  virtual bool isDone()=0;
};
`,after:"",lead:"Taskを継承し、コンストラクタでdoneを受け取り、isDone()がdoneをreturnするSimpleTaskクラスを定義しなさい。",answers:[`class SimpleTask : public Task{
bool done;
public:
SimpleTask(bool d){ done=d; }
bool isDone(){ return done; }
};`],explain:"純粋仮想関数isDone()を、コンストラクタで受け取ったdoneをそのままreturnする処理として実装します。"},{type:"debug",long:!0,before:`class Base{
public:
  int getBonus(){ return 5; }
};
class Derived : public Base{
public:
  int getBonus(){
    `,after:`
  }
};`,lead:"Base側のgetBonus()の戻り値に10を足した値をreturnする処理を書きなさい(Base::getBonus()を使う)。",answers:["return Base::getBonus() + 10;"],explain:"Base::getBonus()で隠れてしまった基本クラス側の戻り値(5)を呼び出し、それに10を足した値をreturnします。"},{type:"debug",long:!0,before:`class Payable{
public:
  virtual int amount()=0;
};
`,after:"",lead:"Payableを継承し、コンストラクタでpriceを受け取り、amount()がpriceをreturnするFixedPriceクラスを定義しなさい。",answers:[`class FixedPrice : public Payable{
int price;
public:
FixedPrice(int p){ price=p; }
int amount(){ return price; }
};`],explain:"純粋仮想関数amount()を、コンストラクタで受け取ったpriceをそのままreturnする処理として実装します。"},{type:"debug",long:!0,before:`class Base{
protected:
  int x;
public:
  Base(int v){ x=v; }
};
`,after:"",lead:"Baseを継承し、コンストラクタで:Base(v)を呼び出しつつ、xを2倍した値をreturnするdoubled()メソッドを持つDerivedクラスを定義しなさい。",answers:[`class Derived : public Base{
public:
Derived(int v):Base(v){}
int doubled(){ return x*2; }
};`],explain:"protectedで継承したxを使い、doubled()ではx*2をそのままreturnします。"},{type:"debug",long:!0,before:`class Instrument{
public:
  virtual void sound()=0;
};
`,after:"",lead:'Instrumentを継承し、sound()が"ドラムの音"と出力するDrumクラスを定義しなさい。',answers:[`class Drum : public Instrument{
public:
void sound(){ cout << "ドラムの音" << endl; }
};`],explain:"純粋仮想関数sound()を、指定された内容(「ドラムの音」の出力)で実装します。"},{type:"debug",long:!0,before:`class Base{
public:
  Base(){ cout << "A"; }
};
class Derived : public Base{
public:
  `,after:`
};`,lead:'コンストラクタでcout << "B";と出力するDerivedのコンストラクタを定義しなさい(生成すると"AB"と表示されるはず)。',answers:['Derived(){ cout << "B"; }'],explain:"派生クラスのオブジェクトを生成すると、まず基本クラスのコンストラクタ(A)が呼ばれ、続けて派生クラスのコンストラクタ(B)が呼ばれます。"},{type:"debug",long:!0,before:`class Shape{
public:
  virtual double area()=0;
};
`,after:"",lead:"Shapeを継承し、baseとheightを受け取るコンストラクタと、area()(base*height/2をreturn、三角形の面積)を持つTriangleクラスを定義しなさい。",answers:[`class Triangle : public Shape{
double base, height;
public:
Triangle(double b,double h){ base=b; height=h; }
double area(){ return base*height/2; }
};`],explain:"三角形の面積は「底辺×高さ÷2」なので、その計算式をそのままreturnします。"},{type:"debug",long:!0,before:`class Base{
protected:
  int score;
public:
  Base(int s){ score=s; }
};
`,after:"",lead:"Baseを継承し、コンストラクタで:Base(s)を呼びつつ、scoreが60以上かをbool型でreturnするisPassing()メソッドを持つStudentクラスを定義しなさい。",answers:[`class Student : public Base{
public:
Student(int s):Base(s){}
bool isPassing(){ return score>=60; }
};`],explain:"protectedで継承したscoreを使い、60以上かどうかの比較結果をそのままreturnします。"},{type:"debug",long:!0,before:`class Employee{
public:
  virtual int salary()=0;
};
`,after:"",lead:"Employeeを継承し、salary()が350000を返すDirectorクラスを定義しなさい。",answers:[`class Director : public Employee{
public:
int salary(){ return 350000; }
};`],explain:"純粋仮想関数salary()を、固定値350000を返す処理として実装します。"}],b5:[{type:"debug",long:!0,before:"",after:"",lead:"hpを受け取るMonsterクラスと、それを継承してnameも受け取るBossクラス(super()で親を初期化)を、あわせて定義しなさい。",answers:[`class Monster:
def __init__(self, hp):
self.HP = hp
class Boss(Monster):
def __init__(self, hp, name):
super().__init__(hp)
self.name = name`],explain:"親クラスMonsterでself.HPを初期化し、それを継承したBossではsuper().__init__(hp)で親の初期化を再利用しつつ、self.nameを追加で初期化します。"},{type:"debug",long:!0,before:"",after:"",lead:"ttk.Frameを継承し、__init__でsuper().__init__(root)を呼ぶTimeAppクラスの定義と、root=tk.Tk()から始めてそれを生成・配置・待受する一連の流れを、あわせて書きなさい。",answers:[`class TimeApp(ttk.Frame):
def __init__(self, root):
super().__init__(root)
root = tk.Tk()
app = TimeApp(root)
app.pack()
root.mainloop()`],explain:"ttk.Frameを継承した自作ウィジェットクラスを定義したら、root=tk.Tk()でウィンドウ本体を用意し、そのクラスのオブジェクトを生成してpack()で配置し、最後にmainloop()で操作を待ち受けます。"},{type:"debug",long:!0,before:`class Hero:
    def __init__(self, hp):
        self.hp = hp
    `,after:"",lead:"HPをptの分だけ減らすdamagedメソッドを定義しなさい(pythonのメソッド定義、インデント込みで)。",answers:[`def damaged(self, pt):
self.hp -= pt`],explain:"selfをつけてself.hpにアクセスし、引数ptの分だけ減算します。"},{type:"debug",long:!0,before:`class Counter:
    def __init__(self):
        self.count = 0
    `,after:"",lead:"countを1増やすincrementメソッドと、countを返すget_countメソッドを、あわせて定義しなさい。",answers:[`def increment(self):
self.count += 1
def get_count(self):
return self.count`],explain:"incrementはself.countを1増やすだけの処理、get_countはself.countの値をそのまま読み取るための窓口です。"},{type:"debug",long:!0,before:`class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return "..."

`,after:"",lead:'Animalを継承し、speak()が"Meow"を返すようにオーバーライドするCatクラスを定義しなさい。',answers:[`class Cat(Animal):
def speak(self):
return "Meow"`],explain:"親クラスと同じ名前speakでメソッドを再定義することで、Cat側の実装がオーバーライドとして優先されます。"},{type:"debug",long:!0,before:`class Employee:
    def __init__(self, salary):
        self.salary = salary

`,after:"",lead:"Employeeを継承し、super()で親を初期化しつつbonusを追加で持ち、total_payメソッドでsalaryとbonusの合計をreturnするManagerクラスを定義しなさい。",answers:[`class Manager(Employee):
def __init__(self, salary, bonus):
super().__init__(salary)
self.bonus = bonus
def total_pay(self):
return self.salary + self.bonus`],explain:"super().__init__(salary)で親クラスの初期化を再利用し、続けてbonusを初期化します。total_payでは継承したself.salaryと自分のself.bonusを足します。"},{type:"debug",long:!0,before:`class BankAccount:
    def __init__(self, balance):
        self.balance = balance
    `,after:"",lead:"balanceがamount以上のときだけ引き出すwithdrawメソッドを定義しなさい。",answers:[`def withdraw(self, amount):
if self.balance >= amount:
self.balance -= amount`],explain:"残高が十分にあるときだけ減算することで、self.balanceが不正にマイナスになるのを防ぎます。"},{type:"debug",long:!0,before:`class ScoreBoard:
    def __init__(self):
        self.scores = []
    `,after:"",lead:"得点を追加するaddメソッドと、平均をreturnするaverageメソッドを、あわせて定義しなさい(len()が使える)。",answers:[`def add(self, s):
self.scores.append(s)
def average(self):
return sum(self.scores) / len(self.scores)`],explain:"addでリストに得点を追加し、averageではsum()とlen()を使って平均を計算します。"},{type:"debug",long:!0,before:`class Task:
    def __init__(self):
        self.done = False
    `,after:"",lead:"doneをTrueにするcompleteメソッドと、doneをreturnするis_doneメソッドを、あわせて定義しなさい。",answers:[`def complete(self):
self.done = True
def is_done(self):
return self.done`],explain:"completeはself.doneをTrueにするだけの処理、is_doneはその値をそのまま読み取る窓口です。"},{type:"debug",long:!0,before:`class Hero:
    def __init__(self, hp):
        self.hp = hp
    def is_alive(self):
        return self.hp > 0
    `,after:"",lead:'is_alive()がTrueなら"生存"、そうでなければ"戦闘不能"をreturnするstatusメソッドを定義しなさい。',answers:[`def status(self):
if self.is_alive():
return "生存"
return "戦闘不能"`],explain:"同じクラスの中からself.is_alive()を呼び出し、その結果に応じて異なる文字列をreturnします。"},{type:"debug",long:!0,before:`import tkinter as tk
from tkinter import ttk
root = tk.Tk()
entry = ttk.Entry(root)
entry.grid(column=0,row=0)
result_var = tk.StringVar()
label = ttk.Label(root, textvariable=result_var)
label.grid(column=0,row=1)
`,after:`
btn = ttk.Button(root, text="摂氏→華氏", command=on_convert)
btn.grid(column=0,row=2)
root.mainloop()`,lead:"entryに入力された摂氏の値をint型に変換し、華氏(値*9/5+32)に変換してresult_varにセットするon_convert関数を定義しなさい。",answers:[`def on_convert():
celsius = int(entry.get())
result_var.set(celsius*9/5+32)`],explain:"entry.get()で取得できる値は文字列なのでint()で変換し、摂氏→華氏の変換式を計算してresult_varにセットします。"},{type:"debug",long:!0,before:`class BankAccount:
    def __init__(self, balance):
        self.balance = balance
    def deposit(self, amount):
        self.balance += amount
    `,after:"",lead:"balanceを返すget_balanceメソッドを定義しなさい。",answers:[`def get_balance(self):
return self.balance`],explain:"self.balanceの値をそのままreturnするだけの、安全な読み取り用メソッドです。"},{type:"debug",long:!0,before:`class Animal:
    def speak(self):
        return "..."

`,after:"",lead:'Animalを継承し、speak()が"Tweet"を返すBirdクラスを定義しなさい。',answers:[`class Bird(Animal):
def speak(self):
return "Tweet"`],explain:"親クラスと同じ名前speakを再定義することで、Bird側の実装がオーバーライドとして優先されます。"},{type:"debug",long:!0,before:`import tkinter as tk
from tkinter import ttk
root = tk.Tk()
score = tk.IntVar()
score.set(0)
label = ttk.Label(root, textvariable=score)
label.grid(column=0,row=0)
`,after:`
btn = ttk.Button(root, text="リセット", command=on_reset)
btn.grid(column=0,row=1)
root.mainloop()`,lead:"scoreを0に戻すon_reset関数を定義しなさい。",answers:[`def on_reset():
score.set(0)`],explain:"IntVarのset(0)を呼ぶことで、表示されている値を0にリセットできます。"},{type:"debug",long:!0,before:`class Stack:
    def __init__(self):
        self.items = []
    def push(self, x):
        self.items.append(x)
    `,after:"",lead:"itemsの末尾の要素を取り出して削除するpopメソッドを定義しなさい(pop()はリストの末尾を削除して返す組み込みメソッド)。",answers:[`def pop(self):
return self.items.pop()`],explain:"リストのpop()メソッドは、末尾の要素を削除してその値を返してくれるので、それをそのままreturnします。"},{type:"debug",long:!0,before:`class Vehicle:
    def wheels(self):
        return 0

`,after:"",lead:"Vehicleを継承し、wheels()が4を返すCarクラスを定義しなさい。",answers:[`class Car(Vehicle):
def wheels(self):
return 4`],explain:"親クラスと同じ名前wheelsを再定義し、4を返すように実装します。"},{type:"debug",long:!0,before:`import tkinter as tk
from tkinter import ttk
class SettingsPanel(ttk.Frame):
    def __init__(self, root):
        super().__init__(root)
        label = ttk.Label(self, text="設定")
        label.grid(column=0, row=0)

`,after:"",lead:"if __name__ == '__main__': のブロックの中に、root=tk.Tk()でウィンドウを用意し、SettingsPanel(root)を生成してpack()で配置し、mainloop()で待ち受ける処理を書きなさい。",answers:[`if __name__ == '__main__':
root = tk.Tk()
app = SettingsPanel(root)
app.pack()
root.mainloop()`],explain:"このファイルが直接実行されたときだけ動く定番のイディオムの中で、ウィンドウを用意し、自作ウィジェットクラスSettingsPanelを生成して配置し、mainloop()で操作を待ち受けます。"}]};Object.keys(he).forEach(function(e){he[e].forEach(function(n,a){n.unit="boss:"+e,n.diff=4,n.qid="boss:"+e+":"+a})});var na=new Set(["w4:qs:11","w7:qsHard:8","w8:qsHard:8","w8:qsHard:14","w9:qsExtra:32","w2:qsExtra:51","wb:qsExtra:28","wb:qsExtra:33","py:qsExpert:12","w7:qsExtra:36"]);function We(e){return!!e&&na.has(e.qid)}function nt(e){var n=[e.lead||"",e.before||"",e.code||"",e.after||""].concat((e.lines||[]).map(function(a){return a.code||""})).concat(e.answers||[]).join(`
`).toLowerCase().normalize("NFKC").replace(/\s+/g,"").replace(/[0-9]+/g,"#").replace(/[a-z_][a-z0-9_]*/g,"v").replace(/[^\p{L}\p{N}#]/gu,"");return(e.type||"fill")+"|"+n}function ta(e){for(var n=2166136261,a=0;a<e.length;a++)n^=e.charCodeAt(a),n=Math.imul(n,16777619);return"sim-"+(n>>>0).toString(36)}var aa={},pe={};ye.forEach(function(e){Zn.concat(["qsDrag"]).forEach(function(n){(e[n]||[]).forEach(function(a){var i=nt(a);pe[i]||(pe[i]=[]),pe[i].push(a)})})});Object.keys(he).forEach(function(e){he[e].forEach(function(n){var a=nt(n);pe[a]||(pe[a]=[]),pe[a].push(n)})});Object.keys(pe).forEach(function(e){var n=pe[e];if(!(n.length<2)){var a=ta(e);n.forEach(function(i){i.similarityTag=a,aa[i.qid]=a})}});function ee(e){return e&&e.similarityTag||null}function ra(e){var n=e.ids.map(function(s){return ye[s]}),a=[];n.forEach(function(s){s.lesson.forEach(function(o){a.push({title:"『"+s.title+"』"+o.title,code:o.code,explain:o.explain})})});var i=[];return n.forEach(function(s){for(var o=s.qs.slice(),l=o.length-1;l>0;l--){var u=Math.floor(Math.random()*(l+1)),b=o[l];o[l]=o[u],o[u]=b}i=i.concat(o.slice(0,8))}),i=i.concat(he[e.id]||[]),{id:e.id,title:e.title,sub:e.sub,emoji:e.emoji,mon:e.mon,isBoss:!0,lesson:a,qs:i}}var D=[];(function(){var e=0;ye.forEach(function(n,a){D.push(n);var i=Dn[e];i&&a===i.ids[i.ids.length-1]&&(D.push(ra(i)),e++)})})();var q=D.length*3;var lt="oopExamQuest_v3",j=[];function Ae(e){We(e.q)||j.push(e)}ye.forEach(function(e){e.qs.forEach(function(n){Ae({q:n,unit:n.unit,diff:n.diff,tier:re(n,"qs"),srcTitle:e.title,srcSub:e.sub})}),(e.qsHard||[]).forEach(function(n){Ae({q:n,unit:n.unit,diff:n.diff,tier:re(n,"qsHard"),srcTitle:e.title,srcSub:e.sub+" ・ 難問"})}),(e.qsExtra||[]).forEach(function(n){Ae({q:n,unit:n.unit,diff:n.diff,tier:re(n,"qsExtra"),srcTitle:e.title,srcSub:e.sub+" ・ 総復習演習"})}),(e.qsExpert||[]).forEach(function(n){Ae({q:n,unit:n.unit,diff:n.diff,tier:re(n,"qsExpert"),srcTitle:e.title,srcSub:e.sub+" ・ 発展演習"})}),(e.qsDrag||[]).forEach(function(n){Ae({q:n,unit:n.unit,diff:n.diff,tier:re(n,"qsDrag"),srcTitle:e.title,srcSub:e.sub+" ・ ドラッグ問題"})})});Dn.forEach(function(e){(he[e.id]||[]).forEach(function(n){Ae({q:n,unit:n.unit,diff:n.diff,tier:re(n,"boss"),srcTitle:e.title,srcSub:e.sub+" ・ 総復習"})})});var Re={};j.forEach(function(e,n){Re[e.q.qid]=n});function ia(e){var n=e.type||"fill",a=String(e.answers&&e.answers[0]||""),i=[e.before||"",e.after||"",e.code||"",e.lead||""].concat((e.lines||[]).map(function(g){return g.code||""})).join(`
`),s=i.split(`
`).filter(function(g){return g.trim()}).length,o=a.split(`
`).filter(function(g){return g.trim()}).length,l=(i.match(/\b(?:if|else|for|while|switch|case|return|new|delete|class|template|try|catch)\b/g)||[]).length,u=(i.match(/(?:<<|>>|==|!=|<=|>=|&&|\|\||\+\+|--|[+\-*\/%=<>])/g)||[]).length,b=(i.match(/[()[\]{}]/g)||[]).length,f={choice:-20,fill:0,debug:42,order:34,dragfill:28}[n]||0,y=f+Math.min(125,a.length*.7)+Math.min(90,Math.max(0,o-1)*18)+Math.min(90,s*5)+Math.min(90,l*13)+Math.min(55,u*2.2)+Math.min(45,b*1.4)+Math.min(70,(e.lines||[]).length*9)+Math.min(35,(e.pieces||[]).length*6);return e.long&&(y+=75),e.answers&&e.answers.length>1&&(y-=Math.min(18,(e.answers.length-1)*5)),Math.max(0,y)}var sa={1:[100,299],2:[300,499],3:[500,749],4:[750,1e3]},ot={};[1,2,3,4].forEach(function(e){var n=j.filter(function(l){return l.diff===e}),a=n.map(function(l){return ia(l.q)}),i=Math.min.apply(Math,a),s=Math.max.apply(Math,a),o=sa[e];n.forEach(function(l,u){var b=s===i?.5:(a[u]-i)/(s-i);ot[l.q.qid]=Math.round(o[0]+b*(o[1]-o[0]))})});function In(e){return ot[e.qid]||100}var Q=ye.map(function(e){return{id:e.id,title:e.title,sub:e.sub,emoji:e.emoji}}),Ye={};j.forEach(function(e,n){Ye[e.unit]||(Ye[e.unit]=[]),Ye[e.unit].push(n)});function la(){try{var e=localStorage.getItem(lt);if(e)return JSON.parse(e)}catch{}return{unlocked:1,stars:{}}}var Hn=!1;function H(e){try{localStorage.setItem(lt,JSON.stringify(e))}catch{}if(typeof window<"u"&&window.dispatchEvent){if(Hn)return;Hn=!0,queueMicrotask(function(){Hn=!1,window.dispatchEvent(new CustomEvent("codecase:progress-saved"))})}}function Ln(e){if(!(!e||typeof e!="object")){var n=t.settings&&t.settings.progressSync,a=t.ranking;Object.keys(t).forEach(function(i){delete t[i]}),Object.keys(e).forEach(function(i){t[i]=e[i]}),t.settings||(t.settings={}),n&&(t.settings.progressSync=n),a&&(t.ranking=a),H(t)}}var t=la();(!t.endless||!Array.isArray(t.endless.queue))&&(t.endless={queue:[],pos:0,correct:0,wrong:0,streak:0,bestStreak:0});t.endless.adaptiveQueueVersion!==2&&(t.endless.queue=[],t.endless.pos=0,t.endless.adaptiveQueueVersion=2);t.settings||(t.settings={allowAlt:!1,endlessUnits:null,endlessDiffs:null,endlessTiers:null,studyModeActive:!1});"endlessUnits"in t.settings||(t.settings.endlessUnits=null);"endlessDiffs"in t.settings||(t.settings.endlessDiffs=null);"endlessFastMode"in t.settings||(t.settings.endlessFastMode=!0);[0,10,20,50,100].indexOf(t.settings.endlessBatchSize)===-1&&(t.settings.endlessBatchSize=0);t.settings.endlessBatchSizeVersion!==2&&(t.settings.endlessBatchSize=0,t.settings.endlessBatchSizeVersion=2);"endlessTiers"in t.settings||(t.settings.endlessTiers=null);"studyModeActive"in t.settings||(t.settings.studyModeActive=!1);"soloCollapsed"in t.settings||(t.settings.soloCollapsed=!1);"mobileAnswerMode"in t.settings||(t.settings.mobileAnswerMode=!1);t.settings.answerModeVersion!==2&&(t.settings.mobileAnswerMode=!1,t.settings.answerModeVersion=2);t.settings.tierSchemaVersion!==5&&(tt={1:[1,2],2:[3],3:[4,5]},Array.isArray(t.settings.endlessTiers)&&t.settings.endlessTiers.length&&(Me=[],t.settings.endlessTiers.forEach(function(e){(tt[e]||[]).forEach(function(n){Me.indexOf(n)===-1&&Me.push(n)})}),t.settings.endlessTiers=Me.length?Me:null),t.settings.tierSchemaVersion=5);var tt,Me;t.unitStats||(t.unitStats={});t.missed||(t.missed={});t.studyCompleted||(t.studyCompleted={});t.studyMedal||(t.studyMedal={});t.ranking||(t.ranking={nickname:"あなた",rooms:[],activeMetric:"overall"});t.ranking.nickname||(t.ranking.nickname="あなた");(!t.activity||typeof t.activity!="object")&&(t.activity={days:{},bestDayCorrect:0});(!t.activity.days||typeof t.activity.days!="object")&&(t.activity.days={});typeof t.activity.bestDayCorrect!="number"&&(t.activity.bestDayCorrect=0);(!t.showcase||typeof t.showcase!="object")&&(t.showcase={achievementLabels:null});H(t);function Tn(e){var n=e||new Date;return n.getFullYear()+"-"+String(n.getMonth()+1).padStart(2,"0")+"-"+String(n.getDate()).padStart(2,"0")}function oa(e){var n=new Date;return n.setHours(12,0,0,0),n.setDate(n.getDate()-e),Tn(n)}function Ce(e,n){var a=Tn(),i=t.activity.days;i[a]||(i[a]={answers:0,correct:0,studySteps:0,reviewsCleared:0});var s=e||"answers";i[a][s]=(i[a][s]||0)+(typeof n=="number"?n:1),(i[a].correct||0)>t.activity.bestDayCorrect&&(t.activity.bestDayCorrect=i[a].correct)}function fe(){for(var e=Tn(),n=t.activity.days[e]||{answers:0,correct:0,studySteps:0,reviewsCleared:0},a=0,i=(n.answers||0)+(n.studySteps||0)+(n.reviewsCleared||0)>0?0:1,s=i;s<370;s++){var o=t.activity.days[oa(s)];if(!o||(o.answers||0)+(o.studySteps||0)+(o.reviewsCleared||0)===0)break;a++}var l=[{id:"correct",label:"既存問題で5問正解",value:n.correct||0,target:5},{id:"study",label:"学習パートを3ステップ",value:n.studySteps||0,target:3},{id:"review",label:"間違いノートを1問解決",value:n.reviewsCleared||0,target:1}],u=l.filter(function(b){return b.value>=b.target}).length;return{today:n,streak:a,missions:l,completed:u,bestDayCorrect:t.activity.bestDayCorrect||0}}function Se(){var e=0;Object.keys(t.unitStats||{}).forEach(function(u){e+=t.unitStats[u].correct||0});var n=Object.keys(t.studyCompleted||{}).filter(function(u){return!!t.studyCompleted[u]}).length,a=z()*10+e+n*20,i=[{name:"見習い捜査員",min:0},{name:"コード巡査",min:100},{name:"事件解析官",min:300},{name:"上級デバッガー",min:700},{name:"首席コード探偵",min:1400}],s=i[0],o=null;i.forEach(function(u,b){a>=u.min&&(s=u,o=i[b+1]||null)});var l=o?Math.max(0,Math.min(100,Math.round((a-s.min)/(o.min-s.min)*100))):100;return{name:s.name,points:a,next:o,percent:l}}function ct(e,n){e&&(t.unitStats[e]||(t.unitStats[e]={correct:0,wrong:0}),n?t.unitStats[e].correct++:t.unitStats[e].wrong++,Ce("answers",1),n&&Ce("correct",1))}function dt(e,n){e&&(n||(t.missed[e]=!0))}function F(){return Object.keys(t.missed).length}function ut(e){var n=t.unitStats[e],a=n?n.correct+n.wrong:0,i=a>0?n.wrong/a:.35;return 1+i*3}function Ge(e){var n=t.unitStats[e],a=n?n.correct+n.wrong:0;return{total:a,wrongRate:a>0?n.wrong/a:null}}function W(e){var n=e&&e.length?e:Q.map(function(o){return o.id}),a=0,i=0;if(n.forEach(function(o){var l=t.unitStats[o];l&&(a+=l.wrong,i+=l.correct+l.wrong)}),i<5)return 1;var s=a/i;return s>.5?1:s>.3?2:s>.15?3:4}function pt(e){var n=typeof e=="number"?e:.3,a=Q.map(function(i){return i.id}).filter(function(i){var s=Ge(i);return s.total===0||s.wrongRate>n});return a.length?a:Q.map(function(i){return i.id})}function ca(e){return e.map(function(n){var a=ut(j[n].unit),i=Math.pow(Math.random(),1/a);return{i:n,key:i}}).sort(function(n,a){return a.key-n.key}).map(function(n){return n.i})}function Mn(e){var n=Ge(e);return n.total<5?1+n.total*.15:Math.max(1,Math.min(4,4-n.wrongRate*5))}function da(e){var n=Mn(e.unit),a=100+(n-1)*300,i=(In(e.q)-a)/145;return ut(e.unit)*(.025+Math.exp(-.5*i*i))}function at(e,n){for(var a=e.slice(),i=[],s=(n||[]).slice(-6);a.length;){var o=a.findIndex(function(b){var f=ee(j[b].q);return!f||s.indexOf(f)===-1});o<0&&(o=0);var l=a.splice(o,1)[0],u=ee(j[l].q);i.push(l),u&&(s.push(u),s=s.slice(-6))}return i}function ua(e,n){for(var a=e.slice(),i=[];a.length;){var s=a.findIndex(function(u){var b=ee(j[u].q);return!b||!n.has(b)});s<0&&(s=0);var o=a.splice(s,1)[0],l=ee(j[o].q);i.push(o),l&&n.add(l)}return i}function Ke(e,n){var a=n||e.length,i=(t.endless.recentSimilarityTags||[]).slice(-6),s=new Set(t.settings.endlessFastMode?t.endless.fastSeenSimilarityTags||[]:[]);if(t.settings.endlessDiffs&&t.settings.endlessDiffs.length){for(var o=[];o.length<a&&e.length;){var l=at(ca(e),i);if(t.settings.endlessFastMode&&(l=ua(l,s)),o.length&&l.length>1&&o[o.length-1]===l[0]){var u=l[0];l[0]=l[1],l[1]=u}o=o.concat(l)}return at(o.slice(0,a),i)}if(e.length<2)return e.slice();for(var b=[],f=0;f<a;f++){for(var y=0,g=e.map(function(x){var m=da(j[x]);b.length&&x===b[b.length-1]&&(m*=.08);var A=ee(j[x].q);return A&&i.indexOf(A)!==-1&&(m*=.025),t.settings.endlessFastMode&&A&&s.has(A)&&(m*=.002),y+=m,{i:x,ceiling:y}}),P=Math.random()*y,E=g[g.length-1].i,_=0;_<g.length;_++)if(P<g[_].ceiling){E=g[_].i;break}b.push(E);var p=ee(j[E].q);p&&(i.push(p),i=i.slice(-6),s.add(p))}return b}function ft(e){var n=ee(e);n&&(t.endless.recentSimilarityTags||(t.endless.recentSimilarityTags=[]),t.endless.recentSimilarityTags.push(n),t.endless.recentSimilarityTags=t.endless.recentSimilarityTags.slice(-6),t.settings.endlessFastMode&&(t.endless.fastSeenSimilarityTags||(t.endless.fastSeenSimilarityTags=[]),t.endless.fastSeenSimilarityTags.indexOf(n)===-1&&t.endless.fastSeenSimilarityTags.push(n)))}function qe(){var e=t.settings.endlessUnits,n=t.settings.endlessDiffs,a=t.settings.endlessTiers,i;return!e||e.length===0?i=j.map(function(s,o){return o}):(i=[],e.forEach(function(s){i=i.concat(Ye[s]||[])})),n&&n.length&&(i=i.filter(function(s){return n.indexOf(j[s].diff)!==-1})),a&&a.length&&(i=i.filter(function(s){return a.indexOf(j[s].tier)!==-1})),i}function Xe(){t.endless.fastSeenSimilarityTags=[],t.endless.queue=Ke(qe(),t.settings.endlessBatchSize),t.endless.pos=0,t.endless.sessionCorrect=0,t.endless.sessionWrong=0}function Ze(){var e=t.settings.endlessBatchSize||qe().length;(t.endless.queue.length!==e||t.endless.pos>=t.endless.queue.length)&&Xe()}function Je(){t.endless.fastSeenSimilarityTags=[];var e=t.endless.queue.length?t.endless.queue[t.endless.queue.length-1]:-1,n=Ke(qe(),t.settings.endlessBatchSize);if(n.length>1&&n[0]===e){var a=n[0];n[0]=n[1],n[1]=a}t.endless.queue=n,t.endless.pos=0,t.endless.sessionCorrect=0,t.endless.sessionWrong=0}function bt(e){var n=Ke(qe());if(n.length>1&&n[0]===e){var a=n.findIndex(function(s){return s!==e});if(a>0){var i=n[0];n[0]=n[a],n[a]=i}}t.endless.queue=n,t.endless.pos=0}function mt(e){var n=t.endless.queue.length-t.endless.pos;if(!(n<=0)){var a=Ke(qe(),n);if(a.length>1&&a[0]===e){var i=a.findIndex(function(o){return o!==e});if(i>0){var s=a[0];a[0]=a[i],a[i]=s}}t.endless.queue=t.endless.queue.slice(0,t.endless.pos).concat(a)}}var r={curQ:null,screen:"map",stageIndex:0,order:[],qIndex:0,heroHP:100,monsterHP:100,wrong:0,locked:!1,failReason:null,lessonFromBattle:!1,activeQs:[],pickerSelection:[],pickerDiffSelection:[1,2,3,4],pickerTierSelection:[1,2,3,4,5],pickerBatchSize:0,pickerFastMode:!0,pickerReturnScreen:"map",pickerReturnFocusId:null,reviewQueue:[],reviewPos:0,reviewStats:{correct:0,wrong:0},dragPlacement:{},dragSelected:null,dragQid:null,mobileLineOrder:[],mobileLineSelected:null,mobileLineQid:null,startTier:1,studyStep:0,studyPicked:null,studyCombo:0,studyBestCombo:0,studyWrongCount:0};function $e(e){for(var n=e.slice(),a=n.length-1;a>0;a--){var i=Math.floor(Math.random()*(a+1)),s=n[a];n[a]=n[i],n[i]=s}return n}function Ee(e){for(var n="",a=0;a<3;a++)n+=a<e?"★":"☆";return n}function z(){var e=0;return Object.keys(t.stars).forEach(function(n){e+=t.stars[n]}),e}function d(e){return String(e).replace(/[&<>"']/g,function(n){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[n]})}var pa={"＊":"*","＋":"+","－":"-","＜":"<","＞":">","／":"/","＆":"&","（":"(","）":")","：":":","；":";","＿":"_","．":".","，":",","　":" ","％":"%","＝":"=","！":"!","”":'"',"“":'"',"’":"'","‘":"'","〜":"~","～":"~","｛":"{","｝":"}","［":"[","］":"]","＃":"#","｜":"|","？":"?","＠":"@","＾":"^","￥":"\\","−":"-"};function fa(e){var n=String(e);return typeof n.normalize=="function"&&(n=n.normalize("NFKC")),n.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(a){return String.fromCharCode(a.charCodeAt(0)-65248)}).replace(/[＊＋－＜＞／＆（）：；＿．，　％＝！”“’‘〜～｛｝［］＃｜？＠＾￥−]/g,function(a){return pa[a]})}function ba(e){return String(e).trim().replace(/^```[a-zA-Z0-9_+-]*\s*/,"").replace(/\s*```$/,"")}function rt(e){return fa(ba(e)).replace(/[\u200B-\u200D\uFEFF]/g,"").trim().toLowerCase().replace(/\s+/g,"")}function it(e){return e.replace(/[;。、.]+$/,"")}function st(e){return e.replace(/std::/g,"")}function ma(e,n){return!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(e)||!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(n)?!1:Number(e)===Number(n)}function en(e,n){var a=rt(e),i=it(a),s=st(i);return n.some(function(o){var l=rt(o),u=it(l),b=st(u);return a===l||i===u||s===b||ma(i,u)})}var Rn={gold:3,silver:2,bronze:1};var gt={mark:'<path d="M12 2 20 6.5v9L12 20l-8-4.5v-9L12 2Z"/><path d="m9 8-3 4 3 4M15 8l3 4-3 4M13.5 6l-3 12"/>',book:'<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H11v17H6.5A2.5 2.5 0 0 0 4 21.5v-17ZM20 4.5A2.5 2.5 0 0 0 17.5 2H13v17h4.5a2.5 2.5 0 0 1 2.5 2.5v-17Z"/>',sword:'<path d="m14.5 4.5 5-2-2 5L9 16l-3 1 1-3 7.5-9.5ZM13 6l5 5M4 17l3 3M3 21l4-4"/>',target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',unlock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 7.5-2M12 14v3"/>',archive:'<path d="M4 7h16v14H4zM3 3h18v4H3zM9 11h6"/>',review:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',chip:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 9h6v6H9zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',shield:'<path d="M12 2 20 5v6c0 5-3.4 8.7-8 11-4.6-2.3-8-6-8-11V5l8-3Z"/><path d="m9 12 2 2 4-5"/>',enemy:'<path d="M5 9 3 4l5 2 4-3 4 3 5-2-2 5 1 4-3 7H7l-3-7 1-4Z"/><path d="M8 12h.01M16 12h.01M9 17l3-2 3 2"/>',trophy:'<path d="M8 3h8v5a4 4 0 0 1-8 0V3ZM8 5H4v2a4 4 0 0 0 4 4M16 5h4v2a4 4 0 0 1-4 4M12 12v5M8 21h8M9 17h6"/>',alert:'<path d="M12 3 2 21h20L12 3Z"/><path d="M12 9v5M12 18h.01"/>',check:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',spark:'<path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z"/>',terminal:'<path d="m5 7 4 4-4 4M11 16h8"/><rect x="2" y="3" width="20" height="18" rx="2"/>',node:'<circle cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="m9 11 6-4M9 13l6 4"/>',search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5M8 10h5M10.5 7.5v5"/>'};function w(e,n){return'<svg class="uiicon'+(n?" "+n:"")+'" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+(gt[e]||gt.mark)+"</svg>"}function ie(e,n){if(n)return w("enemy","stageglyph");var a=["terminal","node","chip","archive","book","node","sword","lock","review","node","enemy","terminal","chip"],i=parseInt(String(e).replace(/\D/g,""),10);return Number.isFinite(i)||(i=String(e).charCodeAt(String(e).length-1)),w(a[Math.abs(i)%a.length],"stageglyph")}var vt=!1;function ht(e){if(!e||e.nodeType!==1)return!1;var n=e.tagName;return n==="INPUT"||n==="TEXTAREA"||n==="SELECT"?!e.disabled&&!e.readOnly:!!e.isContentEditable}function ga(e){return!!(e&&e.closest&&e.closest("dialog[open], [data-escape-surface]"))}function va(){var e=Array.prototype.slice.call(document.querySelectorAll(".codex-overlay, .modal, .popup, .overlay, dialog[open]"));if(e.length){var n=e[e.length-1];return n&&n.tagName==="DIALOG"&&n.hasAttribute("open")?typeof n.close=="function"&&n.close():n&&n.remove(),!0}var a=document.querySelectorAll("dialog[open]");if(a.length){var i=a[a.length-1],s=new Event("cancel",{cancelable:!0});return i.dispatchEvent(s)&&i.close(),!0}var o=document.querySelectorAll("[data-escape-dismiss]:not([hidden])");if(o.length)return o[o.length-1].click(),!0;var l=document.querySelectorAll("details[open]");if(l.length){var u=l[l.length-1];u.open=!1;var b=u.querySelector("summary");return b&&b.focus(),!0}if(r.screen==="unitPicker")return an(),!0;var f=document.getElementById("btnHome")||document.getElementById("btnStudyBack")||document.getElementById("btnLessonBack");if(f&&f.offsetParent!==null)return f.click(),!0;var y=document.getElementById("btnMap");return y&&y.offsetParent!==null?(y.click(),!0):!1}function ha(){var e=document.getElementById("btnContinue")||document.getElementById("btnStudyNext")||document.getElementById("btnStudyToChallenge")||document.getElementById("btnToBattle");if(e&&!e.disabled)return e.click(),!0;var n=document.getElementById("btnNext");if(n&&!n.disabled)return n.click(),!0;var a=document.getElementById("btnReviewAgain");if(a&&!a.disabled)return a.click(),!0;var i=document.getElementById("btnSubmit");return i&&!i.disabled&&!r.locked?(i.click(),!0):!1}function ya(e){var n=e.key||"",a=e.keyCode||e.which||0;if(n==="Enter"||a===13){if(e.isComposing||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||ht(e.target))return;ha()&&(e.preventDefault(),e.stopPropagation());return}if(!(n!=="Escape"&&n!=="Esc"&&a!==27)&&!(e.defaultPrevented||e.isComposing||e.altKey||e.ctrlKey||e.metaKey)){if(ht(e.target)&&ga(e.target)){e.target.blur(),e.preventDefault();return}va()&&(e.preventDefault(),e.stopPropagation())}}function ze(){vt||typeof document>"u"||(document.addEventListener("keydown",ya,!0),vt=!0)}typeof document<"u"&&ze();function nn(){var e=D[r.stageIndex],n=e.lesson.map(function(u,b){return'<div class="frame lessoncard"><div class="lstep">例題 '+(b+1)+" / "+e.lesson.length+"</div><h3>"+d(u.title)+'</h3><pre class="codeblock">'+d(u.code)+'</pre><p class="lessonexplain">'+d(u.explain)+"</p></div>"}).join(""),a=r.lessonFromBattle?"← 戦闘へ戻る":"← 地図へ戻る",i=r.lessonFromBattle?"":'<button class="togglebtn" id="btnLessonToggleStudy">⇄ 学習パートに切替</button>',s;if(r.lessonFromBattle)s='<div class="actionrow"><button class="primary" id="btnToBattle">戦いに戻る →</button></div>';else{var o=[1,2,3,4].map(function(u){return _t(e,u).length}),l=[1,2,3,4].map(function(u){return'<button class="diffbtn" data-tier="'+u+'"><span class="dname">'+d(N[u])+'</span><span class="ddesc">からスタート(残り'+o[u-1]+"問)</span></button>"}).join("");s='<div class="frame diffpick"><div class="difftitle">'+w("sword")+" 難易度を選んで"+d(e.mon)+'に挑もう</div><p class="ddesc" style="margin:0 0 14px;">選んだ難易度の設問からランダムに出題が始まり、探偵が捜査を続けられるかぎり、そのグループを出し切るごとに1つ上の難易度へ自動でエスカレートしていく。高い難易度から始めるほど、序盤から手強い相手になる。</p><div class="diffrow">'+l+"</div></div>"}return""+U()+'<div class="battlebar"><button class="backbtn" id="btnLessonBack">'+a+"</button>"+i+'</div><div class="frame lessonintro"><h2>'+ie(e.id,e.isBoss)+" 訓練場 — "+d(e.title)+"</h2><p>"+d(e.sub)+"の要点を、完成した正しいコードと解説で確認しよう。まずは読んで感覚をつかんでから、"+d(e.mon)+'に挑むと理解しやすい。</p></div><div class="lessongrid">'+n+"</div>"+s}function tn(e){document.getElementById("btnLessonBack").addEventListener("click",function(){r.screen=r.lessonFromBattle?"battle":"map",C()});var n=document.getElementById("btnLessonToggleStudy");n&&n.addEventListener("click",function(){r.screen="study",C()});var a=document.getElementById("btnToBattle");a&&a.addEventListener("click",function(){r.screen="battle",C()}),Array.prototype.forEach.call(e.querySelectorAll(".diffbtn"),function(i){i.addEventListener("click",function(){xe(r.stageIndex,parseInt(i.getAttribute("data-tier"),10))})})}function _t(e,n){for(var a=(e.qs||[]).concat(e.qsHard||[]).concat(e.qsExtra||[]).concat(e.qsDrag||[]).concat(e.qsExpert||[]).filter(function(b){return!We(b)}),i=n||1,s=a.filter(function(b){return(b.diff||1)>=i}).map(function(b){var f=Math.max(i,Mn(b.unit||e.id)),y=100+(f-1)*300;return{q:b,distance:Math.abs(In(b)-y),tie:Math.random()}}).sort(function(b,f){return b.distance-f.distance||b.tie-f.tie}),o=[];s.length;){var l=o.slice(-6).map(ee),u=s.findIndex(function(b){var f=ee(b.q);return!f||l.indexOf(f)===-1});u<0&&(u=0),o.push(s.splice(u,1)[0].q)}return o}function xe(e,n){var a=D[e];r.startTier=n||1,r.activeQs=_t(a,r.startTier),r.screen="battle",r.stageIndex=e,r.order=r.activeQs.map(function(i,s){return s}),r.qIndex=0,r.heroHP=100,r.monsterHP=100,r.wrong=0,r.locked=!1,r.failReason=null,C()}function be(){r.pickerReturnScreen=r.screen||"map";var e=document.activeElement;r.pickerReturnFocusId=e&&e.id?e.id:null;var n=t.settings.endlessUnits,a=t.settings.endlessDiffs,i=t.settings.endlessTiers;r.pickerSelection=n&&n.length?n.slice():Q.map(function(s){return s.id}),r.pickerDiffSelection=a&&a.length?a.slice():[1,2,3,4],r.pickerTierSelection=i&&i.length?i.slice():[1,2,3,4,5],r.pickerBatchSize=t.settings.endlessBatchSize,r.pickerFastMode=t.settings.endlessFastMode!==!1,r.screen="unitPicker",C()}function an(){var e=r.pickerReturnScreen||"map",n=r.pickerReturnFocusId;r.screen=e,r.pickerReturnScreen="map",r.pickerReturnFocusId=null,C(),n&&requestAnimationFrame(function(){var a=document.getElementById(n);a&&a.focus()})}function rn(){var e=r.pickerSelection,n=r.pickerDiffSelection,a=r.pickerTierSelection,i=r.pickerBatchSize,s=r.pickerFastMode,o=Q.map(function(g){var P=e.indexOf(g.id)!==-1,E=Ge(g.id),_=E.wrongRate===null?null:Math.round(E.wrongRate*100);return'<button class="unitchip'+(P?" on":"")+'" data-unit="'+g.id+'"><span class="uc-emoji">'+ie(g.id,!1)+'</span><span class="uc-case">'+d(g.title)+'</span><span class="uc-title">'+d(g.sub)+'</span><span class="uc-rate">'+(_===null?"未挑戦":"誤答率"+_+"%")+"</span></button>"}).join(""),l=[1,2,3,4].map(function(g){var P=n.indexOf(g)!==-1;return'<button class="diffchip'+(P?" on":"")+'" data-diff="'+g+'">'+d(N[g])+"</button>"}).join(""),u=[1,2,3,4,5].map(function(g){var P=a.indexOf(g)!==-1,E=j.filter(function(_){return _.tier===g}).length;return'<button class="tierchip t'+g+(P?" on":"")+'" data-tier="'+g+'"><span class="tc-label">'+d(ae[g])+'</span><span class="tc-count">'+E+'問</span><span class="tc-desc">'+d(et[g])+"</span></button>"}).join(""),b=[0,10,20,50,100].map(function(g){return'<button class="diffchip'+(i===g?" on":"")+'" data-batch-size="'+g+'">'+(g===0?"制限なし":g+"問")+"</button>"}).join(""),f=W(e),y=r.pickerReturnScreen==="endless"?"← 問題へ戻る":"← 地図へ戻る";return""+U()+'<div class="battlebar"><button class="backbtn" id="btnPickerBack" data-escape-dismiss>'+y+'</button></div><div class="frame intro"><h2>'+w("target")+' 出題する単元・難易度・重要度を選ぶ</h2><p>チェックした単元・難易度・重要度だけを対象に1000本ノックを出題します。誤答率が高い単元には目印がついているので、絞り込みの参考にしよう。何も選ばなければ開始できません。</p></div><div class="frame recobar cramcard"><div class="reco-text">'+w("spark")+' 時間がないなら「鉄板」と「頻出」だけに絞って、全単元をひと通り最短で回そう。</div><button class="primary" id="btnPickerCram">'+w("spark")+' 一夜漬けモード（鉄板・頻出のみ）→</button></div><div class="frame recobar"><div class="reco-text">'+w("target")+' <b>快速モード</b>：似た問題はなるべく1問に絞り、違う内容をテンポよく出題します。<span class="reco-sub">難易度のユーザー指定には含まれず、内部レートの自動調整は毎問そのまま動きます。</span></div><button type="button" class="ghost" id="btnPickerFast" aria-pressed="'+(s?"true":"false")+'">快速モード：'+(s?"ON":"OFF")+'</button></div><div class="frame recobar"><div class="reco-text">'+w("chip")+" 選択中の単元でのおすすめ難易度: <b>"+d(N[f])+'</b><span class="reco-sub">(正答実績から自動判定。データが少ない単元はまず初級から勧めます)</span></div><button class="ghost" id="btnPickerAuto">'+w("target")+' 苦手分野+おすすめ難易度に自動設定</button></div><div class="actionrow" style="justify-content:flex-start; margin-bottom:14px;"><button class="ghost" id="btnPickerAll">単元を全選択</button><button class="ghost" id="btnPickerNone">単元を全解除</button></div><div class="unitgrid">'+o+'</div><div class="difftitle" style="margin-top:24px;">重要度で絞る(複数選択可) — 試験に出そうな核心から優先したいときに</div><div class="tierchiprow">'+u+'</div><div class="difftitle" style="margin-top:24px;">難易度で絞る(複数選択可)</div><div class="diffchiprow">'+l+'</div><div class="difftitle" style="margin-top:24px;">1セットの出題数</div><div class="diffchiprow" role="radiogroup" aria-label="出題数">'+b+'</div><div class="actionrow" style="margin-top:20px;"><button class="primary" id="btnPickerStart"'+(e.length===0||n.length===0||a.length===0?" disabled":"")+">この設定で1000本ノックを開始 →</button></div>"}function sn(e){document.getElementById("btnPickerBack").addEventListener("click",function(){an()}),Array.prototype.forEach.call(e.querySelectorAll(".unitchip"),function(n){n.addEventListener("click",function(){var a=n.getAttribute("data-unit"),i=r.pickerSelection.indexOf(a);i===-1?r.pickerSelection.push(a):r.pickerSelection.splice(i,1),C()})}),document.getElementById("btnPickerAll").addEventListener("click",function(){r.pickerSelection=Q.map(function(n){return n.id}),C()}),document.getElementById("btnPickerNone").addEventListener("click",function(){r.pickerSelection=[],C()}),Array.prototype.forEach.call(e.querySelectorAll("[data-diff]"),function(n){n.addEventListener("click",function(){var a=parseInt(n.getAttribute("data-diff"),10),i=r.pickerDiffSelection.indexOf(a);i===-1?r.pickerDiffSelection.push(a):r.pickerDiffSelection.splice(i,1),C()})}),Array.prototype.forEach.call(e.querySelectorAll(".tierchip"),function(n){n.addEventListener("click",function(){var a=parseInt(n.getAttribute("data-tier"),10),i=r.pickerTierSelection.indexOf(a);i===-1?r.pickerTierSelection.push(a):r.pickerTierSelection.splice(i,1),C()})}),Array.prototype.forEach.call(e.querySelectorAll("[data-batch-size]"),function(n){n.addEventListener("click",function(){r.pickerBatchSize=parseInt(n.getAttribute("data-batch-size"),10),C()})}),document.getElementById("btnPickerAuto").addEventListener("click",function(){var n=pt();r.pickerSelection=n.slice(),r.pickerDiffSelection=[W(n)],C()}),document.getElementById("btnPickerFast").addEventListener("click",function(){r.pickerFastMode=!r.pickerFastMode,t.settings.endlessFastMode=r.pickerFastMode,H(t),C()}),document.getElementById("btnPickerCram").addEventListener("click",function(){r.pickerSelection=Q.map(function(n){return n.id}),r.pickerDiffSelection=[1,2,3,4],r.pickerTierSelection=[1,2],t.settings.endlessUnits=null,t.settings.endlessDiffs=null,t.settings.endlessTiers=[1,2],t.settings.endlessBatchSize=r.pickerBatchSize,t.settings.endlessFastMode=r.pickerFastMode,H(t),Xe(),r.curQ=null,r.screen="endless",C()}),document.getElementById("btnPickerStart").addEventListener("click",function(){r.pickerSelection.length===0||r.pickerDiffSelection.length===0||r.pickerTierSelection.length===0||(t.settings.endlessUnits=r.pickerSelection.length===Q.length?null:r.pickerSelection.slice(),t.settings.endlessDiffs=r.pickerDiffSelection.length===4?null:r.pickerDiffSelection.slice(),t.settings.endlessTiers=r.pickerTierSelection.length===5?null:r.pickerTierSelection.slice(),t.settings.endlessBatchSize=r.pickerBatchSize,t.settings.endlessFastMode=r.pickerFastMode,H(t),Xe(),r.curQ=null,r.screen="endless",C())})}function xa(){var e=t.endless.queue[t.endless.pos];return j[e]}function wa(){var e=r.order[r.qIndex];return r.activeQs[e]}var ka={fill:'空欄(<span style="color:var(--accent);font-weight:700;">______</span>)に入るコードや単語を実際に入力して、呪文のように唱えよう。',debug:"🐛 このコードには誤りが1箇所ある。正しく直した内容を入力して唱えよう。",choice:"次のうち正しいものを選んで唱えよう。",order:"A〜Dなどのカードをドラッグして、正しい順番に並べよう。",dragfill:"下のピースをドラッグ（またはタップで選んで配置）して、空欄をすべて埋めよう。"};function _a(){return!!t.settings.mobileAnswerMode}function Ba(e){return'<div class="answer-mode" role="group" aria-label="回答方法"><span class="answer-mode-label">回答方法</span><button type="button" class="answer-mode-btn'+(e?"":" active")+'" data-answer-mode="input" aria-pressed="'+!e+'">⌨ 入力</button><span class="answer-mode-arrow" aria-hidden="true">→</span><button type="button" class="answer-mode-btn'+(e?" active":"")+'" data-answer-mode="selection" aria-pressed="'+e+'">☝ 選択</button></div>'}function yt(e,n,a,i){return'<button type="button" class="choicebtn answer-choice '+(a||"")+'" '+(i||"")+'><span class="choice-index" aria-hidden="true">'+String.fromCharCode(65+n)+'</span><span class="choice-text">'+d(e)+"</span></button>"}function Aa(e){return e.long?'<div class="answerrow long"><textarea class="codeinput long" id="ansInput" rows="6" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="答えを入力…（複数行も入力できます）"></textarea></div><div class="actionrow"><button class="primary" id="btnSubmit">入力した答えで回答 →</button></div>':'<div class="answerrow"><input class="codeinput" id="ansInput" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="答えを入力…"><button class="primary" id="btnSubmit">入力した答えで回答 →</button></div>'}function xt(e){var n=String(e);return/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(n.trim())?"number":/^[!<>=+\-*/%&|^~]+$/.test(n.trim())?"operator":/^[A-Za-z_][\w:]*$/.test(n.trim())?"word":/[{}();<>=]|\n/.test(n)?"code":"text"}function Bt(e){var n=e.answers[0],a=xt(n),i=[];j.forEach(function(b){var f=b.q,y=f.type||"fill";if(!(f.qid===e.qid||f.long||y!=="fill"&&y!=="debug"||f.unit!==e.unit)){var g=f.answers&&f.answers[0];g&&xt(g)===a&&!en(g,e.answers)&&i.push(g)}});var s=[];i.sort(function(b,f){return Math.abs(String(b).length-String(n).length)-Math.abs(String(f).length-String(n).length)}),i.forEach(function(b){s.indexOf(b)===-1&&s.length<3&&s.push(b)});var o=a==="number"?["0","1","2","10"]:a==="operator"?["==","!=","<",">","<=",">="]:a==="word"?["cout","cin","int","string","return","endl"]:["エラー","できる","できない","正しい"];o.forEach(function(b){s.length<3&&!en(b,e.answers)&&s.indexOf(b)===-1&&s.push(b)});var l=[n].concat(s.slice(0,3)),u=String(e.qid||"").split("").reduce(function(b,f){return b+f.charCodeAt(0)},0)%l.length;return l.slice(u).concat(l.slice(0,u))}function wt(e){var n=String(e.answers[0]).split(`
`).filter(function(o){return o.trim()!==""});if(n.length<2)return null;r.mobileLineQid!==e.qid&&(r.mobileLineQid=e.qid,r.mobileLineOrder=new Array(n.length).fill(null),r.mobileLineSelected=null);var a=r.mobileLineOrder,i=n.map(function(o,l){return{line:o,index:l}}).sort(function(o,l){var u=(String(e.qid)+o.index).split("").reduce(function(f,y){return f+y.charCodeAt(0)},0)%17,b=(String(e.qid)+l.index).split("").reduce(function(f,y){return f+y.charCodeAt(0)},0)%17;return u-b||l.index-o.index}).map(function(o){var l=a.indexOf(o.index)!==-1,u=r.mobileLineSelected===o.index;return'<button type="button" class="mobile-code-line'+(l?" used":"")+(u?" selected":"")+'" data-mobile-line="'+o.index+'" draggable="'+(l?"false":"true")+'"'+(l?" disabled":"")+"><code>"+d(o.line)+"</code></button>"}).join(""),s=a.map(function(o,l){return'<div class="mobile-code-slot'+(o!==null?" filled":"")+'" data-mobile-slot="'+l+'"><span>'+(l+1)+"</span>"+(o!==null?'<button type="button" class="mobile-code-placed" data-mobile-move="'+l+'" draggable="true"><code>'+d(n[o])+"</code></button>":'<button type="button" class="mobile-code-placeholder">選択またはドラッグして配置</button>')+"</div>"}).join("");return'<div class="mobile-code-builder"><p>コード行を選び、番号欄へドラッグ（タップ配置も可）</p><div class="mobile-code-source">'+i+'</div><div class="mobile-code-answer">'+s+'</div><div class="actionrow"><button class="ghost" id="btnMobileLineReset" type="button">リセット</button><button class="primary" id="btnMobileLineSubmit" type="button"'+(a.every(function(o){return o!==null})?"":" disabled")+">このコードで回答 →</button></div></div>"}function Pe(e){var n=e.type||"fill",a=_a(),i=e.lead;n==="order"&&i&&(i=i.replace(/正しい順番を記号で答えなさい。?/,"カードを正しい順番に並べなさい。"));var s=i?d(i):ka[n];(n==="dragfill"||n==="order")&&r.dragQid!==e.qid&&(r.dragPlacement={},r.dragSelected=null,r.dragQid=e.qid);var o;if(n==="order"&&!a)o='<div class="order-reference" aria-label="並べ替えるコード">'+e.lines.map(function(m){return"<div><b>"+d(m.label)+"</b><code>"+d(m.code)+"</code></div>"}).join("")+"</div>";else if(n==="order"){var l=Object.keys(r.dragPlacement).map(function(m){return r.dragPlacement[m]}).filter(Boolean),u=e.lines.map(function(m){var A=l.indexOf(m.label)!==-1,B=r.dragSelected===m.label;return'<button type="button" class="dragpiece orderpiece'+(A?" used":"")+(B?" selected":"")+'" data-piece="'+d(m.label)+'" draggable="'+(A?"false":"true")+'"'+(A?" disabled":"")+"><b>"+d(m.label)+"</b><code>"+d(m.code)+"</code></button>"}).join(""),b=e.lines.map(function(m,A){var B="order-"+A,M=r.dragPlacement[B],O=e.lines.filter(function(k){return k.label===M})[0];return'<div class="orderrow"><span class="ordernum">'+(A+1)+'</span><button type="button" class="dragslot orderslot'+(O?" filled":"")+'" data-blank="'+B+'">'+(O?"<b>"+d(O.label)+"</b><code>"+d(O.code)+"</code>":"ここへカードを置く")+"</button></div>"}).join("");o='<div class="orderbuilder"><div class="ordertray">'+u+'</div><div class="orderanswer" aria-label="並び替えた回答">'+b+"</div></div>"}else if(n==="choice")o=e.code?'<pre class="codeblock">'+d(e.code)+"</pre>":"";else if(n==="dragfill"){var f=r.dragPlacement,y=e.lines.map(function(m){if(m.blank===void 0)return d(m.code);var A=f[m.blank],B=A?e.pieces.filter(function(M){return M.id===A})[0]:null;return'<span class="dragslot'+(B?" filled":"")+'" data-blank="'+m.blank+'">'+(B?d(B.code):"ここにピースを置く")+"</span>"});o='<pre class="codeblock dragcode">'+y.join(`
`)+"</pre>"}else o='<pre class="codeblock">'+d(e.before)+'<mark class="blank">______</mark>'+d(e.after)+"</pre>";var g;if(n==="choice"&&a)g='<div class="choicegrid" id="choiceGrid">'+e.options.map(function(m,A){return yt(m,A,"",'data-opt="'+A+'"')}).join("")+"</div>";else if(n==="order"&&a){var P=e.lines.every(function(m,A){return!!r.dragPlacement["order-"+A]});g='<div class="actionrow"><button class="ghost" id="btnDragReset" type="button">並び順をリセット</button><button class="primary" id="btnSubmit"'+(P?"":" disabled")+">この順番で回答 →</button></div>"}else if(n==="dragfill"&&a){var E=Object.keys(r.dragPlacement).map(function(m){return r.dragPlacement[m]}).filter(Boolean),_=e.pieces.map(function(m){var A=E.indexOf(m.id)!==-1,B=r.dragSelected===m.id;return'<button class="dragpiece'+(A?" used":"")+(B?" selected":"")+'" data-piece="'+m.id+'" draggable="'+(A?"false":"true")+'"'+(A?" disabled":"")+">"+d(m.code)+"</button>"}).join(""),p=e.lines.filter(function(m){return m.blank!==void 0}).map(function(m){return m.blank}),x=p.every(function(m){return!!r.dragPlacement[m]});g='<div class="dragtray" id="dragTray">'+_+'</div><div class="actionrow"><button class="ghost" id="btnDragReset" type="button">やり直す</button><button class="primary" id="btnSubmit"'+(x?"":" disabled")+">詠唱する →</button></div>"}else(n==="fill"||n==="debug")&&a&&e.long&&wt(e)?g=wt(e):(n==="fill"||n==="debug")&&a?g='<div class="mobile-choicegrid">'+Bt(e).map(function(m,A){return yt(m,A,"mobile-answer-choice",'data-mobile-answer="'+A+'"')}).join("")+"</div>":g=Aa(e);return{qlead:s,bodyHtml:o,answerHtml:Ba(a)+g}}function ln(){var e=D[r.stageIndex];r.curQ||(r.curQ=wa());var n=r.activeQs.length,a=Pe(r.curQ);return""+U()+'<div class="battlebar"><button class="backbtn" id="btnHome">← 地図へ戻る</button><button class="backbtn" id="btnReview">'+w("book")+' 訓練場で例題を見直す</button></div><div class="combatants"><div class="frame fighter"><div class="who"><span class="emoji">'+w("shield")+'</span><div class="name">コード探偵<small>DETECTIVE UNIT</small></div></div><div class="hpbar hero"><i style="transform:scaleX('+r.heroHP/100+')"></i></div><div class="hpnum"><span>HP</span><span class="num">'+r.heroHP+' / 100</span></div></div><div class="vs">VS</div><div class="frame fighter"><div class="who"><span class="emoji">'+ie(e.id,!0)+'</span><div class="name">'+d(e.mon)+"<small>"+d(e.sub)+'</small></div></div><div class="hpbar monster"><i style="transform:scaleX('+r.monsterHP/100+')"></i></div><div class="hpnum"><span>HP</span><span class="num">'+r.monsterHP+' / 100</span></div></div></div><div class="frame qcard" id="qcard"><div class="qmeta"><span>設問 '+(r.qIndex+1)+" / "+n+' <span class="tierbadge t'+re(r.curQ)+'">'+d(ae[re(r.curQ)])+"</span></span><span>"+d(e.title)+" ・ 今: "+d(N[r.curQ.diff]||"")+'</span></div><div class="qlead">'+a.qlead+"</div>"+a.bodyHtml+a.answerHtml+'</div><div id="feedbackSlot"></div>'}function on(){if(!r.curQ){var e=xa();r.curQ=e.q,r.endlessSrc=e}var n=Pe(r.curQ),a=t.endless,i=a.correct+a.wrong,s=i>0?Math.round(a.correct/i*100):0,o=t.settings.endlessUnits,l=o&&o.length?"("+o.length+"/"+Q.length+"単元に絞り込み中)":"(全単元)";return""+U()+'<div class="battlebar"><button class="backbtn" id="btnHome">← 地図へ戻る</button><button class="backbtn" id="btnEndlessFilter">'+w("target")+" 単元を絞る "+d(l)+'</button><button class="backbtn pauseinvestigation" id="btnPauseEndless">'+w("lock")+' 捜査を中断する</button></div><div class="frame endlessbar"><div class="estat"><span class="elabel">出題元</span><span class="evalue">'+d(r.endlessSrc.srcTitle)+'</span></div><div class="estat"><span class="elabel">連続正解</span><span class="evalue">'+a.streak+"(最高"+a.bestStreak+')</span></div><div class="estat"><span class="elabel">通算正答率</span><span class="evalue">'+a.correct+" / "+i+"("+s+'%)</span></div><div class="estat"><span class="elabel">'+(t.settings.endlessBatchSize===0?"出題数":"今セットの残数")+'</span><span class="evalue">'+(t.settings.endlessBatchSize===0?"制限なし（毎問調整）":t.endless.queue.length-t.endless.pos+" / "+t.endless.queue.length)+'</span></div></div><div class="frame qcard" id="qcard"><div class="qmeta"><span>1000本ノック <span class="tierbadge t'+r.endlessSrc.tier+'">'+d(ae[r.endlessSrc.tier])+"</span></span><span>"+d(r.endlessSrc.srcSub)+'</span></div><div class="qlead">'+n.qlead+"</div>"+n.bodyHtml+n.answerHtml+'</div><div id="feedbackSlot"></div>'}function cn(){var e=t.endless.sessionCorrect||0,n=t.endless.sessionWrong||0,a=e+n,i=a?Math.round(e/a*100):0;return""+U()+'<div class="battlebar"><button class="backbtn" id="btnHome">← 地図へ戻る</button></div><div class="frame result achieve"><span class="bigemoji">'+w("target")+"</span><h2>"+a+"本ノック完了！</h2><p>正解 <b>"+e+"</b>問 ／ 誤答 <b>"+n+"</b>問 ／ 正答率 <b>"+i+'%</b></p><div class="resultbtns"><button class="primary" id="btnEndlessAgain">同じ設定でもう一度 →</button><button class="ghost" id="btnEndlessSettings">条件を変更する</button></div></div>'}function me(e){var n=r.curQ.type||"fill";Array.prototype.forEach.call(document.querySelectorAll("[data-answer-mode]"),function(l){l.addEventListener("click",function(){var u=l.getAttribute("data-answer-mode")==="selection";t.settings.mobileAnswerMode!==u&&(t.settings.mobileAnswerMode=u,H(t),C())})});var a=e.querySelectorAll(".mobile-answer-choice");if(a.length){var i=Bt(r.curQ);Array.prototype.forEach.call(a,function(l){l.addEventListener("click",function(){l.classList.add("chosen"),Array.prototype.forEach.call(a,function(u){u.disabled=!0}),Ve(i[parseInt(l.getAttribute("data-mobile-answer"),10)])})})}else if(document.getElementById("btnMobileLineSubmit"))Ca(e);else if(document.getElementById("ansInput")){var s=document.getElementById("ansInput"),o=document.getElementById("btnSubmit");o.addEventListener("click",kt),s.addEventListener("keydown",function(l){l.key!=="Enter"||r.locked||l.isComposing||s.tagName==="TEXTAREA"&&l.shiftKey||(l.preventDefault(),l.stopPropagation(),kt())}),s.focus()}else n==="choice"?Array.prototype.forEach.call(e.querySelectorAll(".choicebtn"),function(l){l.addEventListener("click",function(){Da(parseInt(l.getAttribute("data-opt"),10))})}):(n==="dragfill"||n==="order")&&Ea(e)}function Ca(e){var n=!1;function a(s,o,l){l!==null&&(r.mobileLineOrder[l]=null);var u=r.mobileLineOrder.indexOf(s);u!==-1&&(r.mobileLineOrder[u]=null);var b=r.mobileLineOrder[o];r.mobileLineOrder[o]=s,b!==null&&l!==null&&(r.mobileLineOrder[l]=b),r.mobileLineSelected=null,C()}function i(s,o,l){s.addEventListener("pointerdown",function(u){if(u.pointerType==="mouse")return;n=!1;var b=u.clientX,f=u.clientY;s.setPointerCapture(u.pointerId),s.classList.add("touch-dragging");function y(P){Math.abs(P.clientX-b)+Math.abs(P.clientY-f)>8&&(n=!0)}function g(P){if(s.classList.remove("touch-dragging"),s.removeEventListener("pointermove",y),s.removeEventListener("pointerup",g),!!n){var E=document.elementFromPoint(P.clientX,P.clientY),_=E&&E.closest?E.closest("[data-mobile-slot]"):null;_&&a(o,parseInt(_.getAttribute("data-mobile-slot"),10),l)}}s.addEventListener("pointermove",y),s.addEventListener("pointerup",g)})}Array.prototype.forEach.call(e.querySelectorAll("[data-mobile-line]:not(:disabled)"),function(s){s.addEventListener("click",function(){if(n){n=!1;return}var o=parseInt(s.getAttribute("data-mobile-line"),10);r.mobileLineSelected=r.mobileLineSelected===o?null:o,C()}),s.addEventListener("dragstart",function(o){o.dataTransfer&&o.dataTransfer.setData("text/plain","line:"+s.getAttribute("data-mobile-line"))}),i(s,parseInt(s.getAttribute("data-mobile-line"),10),null)}),Array.prototype.forEach.call(e.querySelectorAll("[data-mobile-slot]"),function(s){var o=parseInt(s.getAttribute("data-mobile-slot"),10);s.addEventListener("dragover",function(l){l.preventDefault(),s.classList.add("dragover")}),s.addEventListener("dragleave",function(){s.classList.remove("dragover")}),s.addEventListener("drop",function(l){l.preventDefault();var u=(l.dataTransfer?l.dataTransfer.getData("text/plain"):"").split(":");if(u[0]==="line"&&a(parseInt(u[1],10),o,null),u[0]==="slot"){var b=parseInt(u[1],10);a(r.mobileLineOrder[b],o,b)}}),s.addEventListener("click",function(l){l.target.closest("[data-mobile-move]")||r.mobileLineSelected!==null&&a(r.mobileLineSelected,o,null)})}),Array.prototype.forEach.call(e.querySelectorAll("[data-mobile-move]"),function(s){var o=parseInt(s.getAttribute("data-mobile-move"),10),l=r.mobileLineOrder[o];s.addEventListener("click",function(){if(n){n=!1;return}r.mobileLineOrder[o]=null,r.mobileLineSelected=l,C()}),s.addEventListener("dragstart",function(u){u.dataTransfer&&u.dataTransfer.setData("text/plain","slot:"+o)}),i(s,l,o)}),document.getElementById("btnMobileLineReset").addEventListener("click",function(){r.mobileLineOrder=new Array(r.mobileLineOrder.length).fill(null),r.mobileLineSelected=null,C()}),document.getElementById("btnMobileLineSubmit").addEventListener("click",function(){var s=String(r.curQ.answers[0]).split(`
`).filter(function(o){return o.trim()!==""});Ve(r.mobileLineOrder.map(function(o){return s[o]}).join(`
`))})}function Sa(e){if((e.type||"fill")==="order")return e.lines.map(function(a,i){return r.dragPlacement["order-"+i]||""}).join(",");var n=e.lines.filter(function(a){return a.blank!==void 0}).map(function(a){return a.blank});return n.map(function(a){return a+"="+(r.dragPlacement[a]||"")}).join("|")}function Ea(e){Array.prototype.forEach.call(e.querySelectorAll(".dragpiece:not(.used)"),function(i){i.addEventListener("click",function(){if(!r.locked){var s=i.getAttribute("data-piece");r.dragSelected=r.dragSelected===s?null:s,C()}}),i.addEventListener("dragstart",function(s){s.dataTransfer&&s.dataTransfer.setData("text/plain",i.getAttribute("data-piece"))})}),Array.prototype.forEach.call(e.querySelectorAll(".dragslot"),function(i){i.addEventListener("click",function(){if(!r.locked){var s=i.getAttribute("data-blank");i.classList.contains("filled")?r.dragPlacement[s]=null:r.dragSelected&&(r.dragPlacement[s]=r.dragSelected,r.dragSelected=null),C()}}),i.addEventListener("dragover",function(s){s.preventDefault()}),i.addEventListener("drop",function(s){if(s.preventDefault(),!r.locked){var o=s.dataTransfer?s.dataTransfer.getData("text/plain"):null;o&&(r.dragPlacement[i.getAttribute("data-blank")]=o,r.dragSelected=null,C())}})});var n=document.getElementById("btnDragReset");n&&n.addEventListener("click",function(){r.locked||(r.dragPlacement={},r.dragSelected=null,C())});var a=document.getElementById("btnSubmit");a&&a.addEventListener("click",function(){r.locked||a.disabled||Ve(Sa(r.curQ))})}function Ve(e){r.locked=!0;var n=r.screen==="endless",a=r.screen==="review",i=t.settings.allowAlt&&r.curQ.altAnswers&&r.curQ.altAnswers.length?r.curQ.answers.concat(r.curQ.altAnswers):r.curQ.answers,s=en(e,i),o=document.getElementById("feedbackSlot"),l=document.getElementById("qcard");if(ct(r.curQ.unit,s),dt(r.curQ.qid,s),n)ft(r.curQ),s?(t.endless.correct++,t.endless.sessionCorrect=(t.endless.sessionCorrect||0)+1,t.endless.streak++,t.endless.streak>t.endless.bestStreak&&(t.endless.bestStreak=t.endless.streak),l.classList.add("pulse")):(t.endless.wrong++,t.endless.sessionWrong=(t.endless.sessionWrong||0)+1,t.endless.streak=0,l.classList.add("shake")),H(t);else if(a)s?(r.reviewStats.correct++,Ce("reviewsCleared",1),l.classList.add("pulse")):(r.reviewStats.wrong++,l.classList.add("shake")),H(t);else{var u=$n[r.curQ.diff]||10,b=Jn[r.curQ.diff]||20;s?(r.monsterHP=Math.max(0,r.monsterHP-u),l.classList.add("pulse")):(r.wrong++,r.heroHP=Math.max(0,r.heroHP-b),l.classList.add("shake")),H(t)}var f,y;if(r.curQ.type==="dragfill"){var g=r.curQ.lines.filter(function(B){return B.blank!==void 0}).map(function(B){return B.blank}),P=function(B){var M=r.curQ.pieces.filter(function(O){return O.id===B})[0];return M?M.code:"(空欄)"};f='<div class="yourans"><span class="label">あなたの配置</span>'+g.map(function(B){return'<span class="chip">'+d(P(r.dragPlacement[B]))+"</span>"}).join("")+"</div>",y=s?"":'<div class="correctans"><span class="label">正解</span>'+g.map(function(B){return'<span class="chip">'+d(P(r.curQ.answerMap[B]))+"</span>"}).join("")+"</div>"}else if(f='<div class="yourans"><span class="label">あなたの回答</span><span class="chip">'+d(e)+"</span></div>",s){var E=i.some(function(B){return String(e).trim()===String(B).trim()});if(E)y="";else{var _=r.curQ.answers[0];y='<div class="correctans accepted-variant"><span class="label">教材の模範表記（どちらも正解）</span><button type="button" class="ghost-badge copyable" data-copy="'+d(_)+'">'+d(_)+"</button></div>"}}else{var p=r.curQ.altAnswers&&r.curQ.altAnswers.length?r.curQ.altAnswers:[],x=r.curQ.answers.map(function(B){return'<button type="button" class="ghost-badge copyable" data-copy="'+d(B)+'">'+d(B)+"</button>"}).join(""),m=p.map(function(B){return'<button type="button" class="ghost-badge copyable alt" data-copy="'+d(B)+'">'+d(B)+" <small>(別解)</small></button>"}).join("");y='<div class="correctans"><span class="label">正解例(クリックでコピー)</span>'+x+m+"</div>"}var A=!!t.missed[r.curQ.qid];o.innerHTML='<div class="frame feedback '+(s?"good":"bad")+'"><div class="head">'+w(s?"sword":"alert")+(s?" 会心の一撃！":" 手痛い反撃を受けた…")+"</div>"+f+y+'<div class="explain"><span class="tag">解説</span>'+d(r.curQ.explain)+'</div><label class="missedcheck"><input type="checkbox" id="missedToggle"'+(A?" checked":"")+"> "+w("review")+' この問題を復習ノートに入れる</label></div><div class="actionrow"><button class="primary" id="btnContinue">つづける →</button></div>',!n&&!a&&setTimeout(Pa,30),Array.prototype.forEach.call(o.querySelectorAll(".copyable"),function(B){B.addEventListener("click",function(){var M=B.getAttribute("data-copy"),O=B.innerHTML;function k(){B.classList.add("copied"),B.innerHTML=w("check")+" コピーしました",setTimeout(function(){B.classList.remove("copied"),B.innerHTML=O},1200)}if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(M).then(k,k);else{var T=document.createElement("textarea");T.value=M,T.style.position="fixed",T.style.opacity="0",document.body.appendChild(T),T.select();try{document.execCommand("copy")}catch{}document.body.removeChild(T),k()}})}),document.getElementById("missedToggle").addEventListener("change",function(B){B.target.checked?t.missed[r.curQ.qid]=!0:delete t.missed[r.curQ.qid],H(t)}),document.getElementById("btnContinue").addEventListener("click",function(){if(r.curQ=null,n){var B=t.endless.queue[t.endless.pos];t.endless.pos++,t.settings.endlessBatchSize===0?bt(B):t.endless.pos>=t.endless.queue.length?r.screen="endless-result":(!t.settings.endlessDiffs||t.settings.endlessDiffs.length===0)&&mt(B),H(t),r.locked=!1,C();return}if(a){r.reviewPos++,r.locked=!1,C();return}if(r.heroHP<=0){r.failReason="hero",r.screen="result-lose",C();return}if(r.monsterHP<=0){r.screen="result-win",C();return}if(r.qIndex++,r.qIndex>=r.order.length){r.monsterHP<=0?r.screen="result-win":(r.failReason="outofq",r.screen="result-lose"),C();return}r.locked=!1,C()})}function Pa(){var e=document.querySelector(".hpbar.hero i"),n=document.querySelector(".hpbar.monster i");e&&(e.style.transform="scaleX("+r.heroHP/100+")"),n&&(n.style.transform="scaleX("+r.monsterHP/100+")");var a=document.querySelectorAll(".hpnum .num");a[0]&&(a[0].textContent=r.heroHP+" / 100"),a[1]&&(a[1].textContent=r.monsterHP+" / 100")}function kt(){if(!r.locked){var e=document.getElementById("ansInput"),n=e.value;if(!n.trim()){e.classList.add("shake"),setTimeout(function(){e.classList.remove("shake")},350),e.focus();return}e.disabled=!0,document.getElementById("btnSubmit").disabled=!0,Ve(n)}}function Da(e){if(!r.locked){var n=document.querySelector('.choicebtn[data-opt="'+e+'"]');n&&n.classList.add("chosen"),Array.prototype.forEach.call(document.querySelectorAll(".choicebtn"),function(a){a.disabled=!0}),Ve(r.curQ.options[e])}}var De=[{id:"overall",label:"総合進捗",unit:"pt"},{id:"dailyStreak",label:"連続捜査日数",unit:"日"},{id:"stars",label:"獲得スター",unit:"個"},{id:"clears",label:"クリア章",unit:"章"},{id:"correct",label:"累計正解",unit:"問"},{id:"accuracy",label:"正答率",unit:"%"},{id:"streak",label:"最高連続正解",unit:"問"},{id:"study",label:"学習完了",unit:"章"},{id:"medals",label:"学習メダル",unit:"pt"}];function Ha(e){for(var n=2166136261,a=0;a<e.length;a++)n^=e.charCodeAt(a),n=Math.imul(n,16777619);return n>>>0}function Ia(e){var n=e>>>0;return function(){n+=1831565813;var a=n;return a=Math.imul(a^a>>>15,a|1),a^=a+Math.imul(a^a>>>7,a|61),((a^a>>>14)>>>0)/4294967296}}function At(e){return(e||"id")+"-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,8)}function La(){for(var e="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",n="",a=0;a<6;a++)n+=e[Math.floor(Math.random()*e.length)];return n}function se(){var e=!1;return t.ranking||(t.ranking={},e=!0),t.ranking.playerId||(t.ranking.playerId=At("player"),e=!0),t.ranking.nickname||(t.ranking.nickname="あなた",e=!0),Array.isArray(t.ranking.rooms)||(t.ranking.rooms=[],e=!0),t.ranking.activeMetric||(t.ranking.activeMetric="overall",e=!0),e&&H(t),t.ranking}function ne(){var e=se();return{id:e.playerId,name:e.nickname}}function we(e){var n=se();n.nickname=String(e||"").trim().slice(0,16)||"あなた",n.rooms.forEach(function(a){var i=a.members.filter(function(s){return s.id===n.playerId})[0];i&&(i.name=n.nickname)}),H(t)}function de(){var e=z(),n=Object.keys(t.stars||{}).filter(function(y){return(t.stars[y]||0)>0}).length,a=0,i=0;Object.keys(t.unitStats||{}).forEach(function(y){a+=t.unitStats[y].correct||0,i+=t.unitStats[y].wrong||0});var s=a+i>0?Math.round(a/(a+i)*100):0,o=Object.keys(t.studyCompleted||{}).filter(function(y){return!!t.studyCompleted[y]}).length,l=0;Object.keys(t.studyMedal||{}).forEach(function(y){l+={gold:3,silver:2,bronze:1}[t.studyMedal[y]]||0});var u=t.endless&&t.endless.bestStreak||0,b=fe().streak||0,f=e*100+n*80+a*4+s*3+u*20+o*70+l*35;return{overall:f,dailyStreak:b,stars:e,clears:n,correct:a,accuracy:s,streak:u,study:o,medals:l,updatedAt:new Date().toISOString()}}var Ta=["NullHunter","Pointer侍","SegFault猫","ClassMaster","LoopRider","Bit探偵","Stack探偵","Lambda狐"];function Ma(e,n,a){var i=.35+e()*.9,s=Math.min(q,Math.max(0,Math.round((n.stars||10)*i+e()*8))),o=Math.min(D.length,Math.max(0,Math.round(s/2.5+e()*2))),l=Math.max(5,Math.round((n.correct||80)*i+e()*120)),u=Math.min(100,Math.max(42,Math.round((n.accuracy||72)+e()*24-10))),b=Math.max(1,Math.round((n.streak||5)*i+e()*12)),f=Math.max(1,Math.round((n.dailyStreak||3)*i+e()*7)),y=Math.min(D.length,Math.max(0,Math.round((n.study||4)*i+e()*5))),g=Math.min(D.length*3,Math.max(0,Math.round((n.medals||5)*i+e()*8)));return{overall:s*100+o*80+l*4+u*3+b*20+y*70+g*35,dailyStreak:f,stars:s,clears:o,correct:l,accuracy:u,streak:b,study:y,medals:g,updatedAt:new Date(Date.now()-a*36e5).toISOString()}}function Ct(e){var n=se(),a=ne(),i={id:At("room"),code:La(),name:String(e||"").trim().slice(0,30)||"みんなの学習部屋",ownerId:a.id,createdAt:new Date().toISOString(),members:[{id:a.id,name:a.name,isPlayer:!0,snapshot:de()}]},s=Ia(Ha(i.code));return Ta.forEach(function(o,l){i.members.push({id:"demo-"+i.id+"-"+l,name:o,isDemo:!0,snapshot:Ma(s,de(),l+1)})}),n.rooms.unshift(i),n.activeRoomId=i.id,H(t),i}function St(e){var n=se(),a=String(e||"").trim().toUpperCase(),i=n.rooms.filter(function(s){return s.code===a})[0];return i?(n.activeRoomId=i.id,je(i.id),H(t),{ok:!0,room:i}):{ok:!1,error:"この端末には、その招待コードの部屋がありません。"}}function ke(){return se().rooms.slice()}function te(e){var n=se();return n.rooms.filter(function(a){return a.id===(e||n.activeRoomId)})[0]||null}function Et(e){var n=se();return te(e)?(n.activeRoomId=e,je(e),H(t),!0):!1}function je(e){var n=te(e);if(n){var a=ne(),i=n.members.filter(function(s){return s.id===a.id})[0];!i&&n.isFirebase&&(i=n.members.filter(function(s){return!!s.isPlayer})[0]),i||(i={id:a.id,name:a.name,isPlayer:!0,snapshot:{}},n.members.push(i)),i.name=a.name,i.snapshot=de(),H(t)}}function Pt(e){var n=se();n.rooms=n.rooms.filter(function(a){return a.id!==e}),n.activeRoomId===e&&(n.activeRoomId=null),H(t)}function Oe(e){if(!e||!e.id)return null;var n=se(),a=n.rooms.findIndex(function(i){return i.id===e.id});return e.isFirebase=!0,a===-1?n.rooms.unshift(e):n.rooms[a]=e,n.activeRoomId=e.id,H(t),e}function qn(e,n){var a=De.filter(function(i){return i.id===n})[0]||De[0];return(e?e.members:[]).map(function(i){return{id:i.id,name:i.name,isPlayer:i.isPlayer,isDemo:i.isDemo,value:Number((i.snapshot||{})[a.id])||0,updatedAt:(i.snapshot||{}).updatedAt}}).sort(function(i,s){return s.value!==i.value?s.value-i.value:String(i.updatedAt||"").localeCompare(String(s.updatedAt||""))}).map(function(i,s){return i.rank=s+1,i})}se();var He={apiKey:"AIzaSyDFQqIU8RwD8hv1zh1_VE1IMQR7jGKCIXQ",authDomain:"code-case-bureau-2026.firebaseapp.com",projectId:"code-case-bureau-2026",storageBucket:"code-case-bureau-2026.firebasestorage.app",messagingSenderId:"89896901654",appId:"1:89896901654:web:26e93191d0ca4bbb7be937"},zn=!!(He.apiKey&&He.authDomain&&He.projectId&&He.appId);var Vn="12.16.0",dn=null;function K(){return zn}async function X(){return zn?dn||(dn=Promise.all([import("https://www.gstatic.com/firebasejs/"+Vn+"/firebase-app.js"),import("https://www.gstatic.com/firebasejs/"+Vn+"/firebase-auth.js"),import("https://www.gstatic.com/firebasejs/"+Vn+"/firebase-firestore.js")]).then(async function(e){var n=e[0],a=e[1],i=e[2],s=n.initializeApp(He),o=a.getAuth(s);return o.currentUser||await a.signInAnonymously(o),{app:s,auth:o,db:i.getFirestore(s),firestore:i}}),dn):null}function jn(e,n,a,i){return{clientId:String(i||"").slice(0,64),nickname:String(e||"あなた").slice(0,16),overall:n.overall||0,dailyStreak:n.dailyStreak||0,stars:n.stars||0,clears:n.clears||0,correct:n.correct||0,accuracy:n.accuracy||0,streak:n.streak||0,study:n.study||0,medals:n.medals||0,updatedAt:a()}}async function Dt(e){var n=await X();if(!n)return null;var a=n.firestore,i=n.auth.currentUser.uid,s=a.writeBatch(n.db),o=a.doc(n.db,"rooms",e.id),l=a.doc(n.db,"invites",e.code),u=a.doc(n.db,"rooms",e.id,"members",i);return s.set(o,{name:e.name,ownerId:i,code:e.code,createdAt:a.serverTimestamp()}),s.set(l,{roomId:e.id,ownerId:i,createdAt:a.serverTimestamp()}),s.set(u,jn(e.members[0].name,e.members[0].snapshot,a.serverTimestamp,e.members[0].id)),await s.commit(),e.id}async function On(e,n,a,i){var s=await X();if(!s)return null;var o=s.firestore,l=await o.getDoc(o.doc(s.db,"invites",String(e).toUpperCase()));if(!l.exists())throw new Error("招待コードが見つかりません。");var u=l.data().roomId;return await o.setDoc(o.doc(s.db,"rooms",u,"members",s.auth.currentUser.uid),jn(n,a,o.serverTimestamp,i),{merge:!0}),u}async function Ht(e,n,a,i){var s=await X();if(s){var o=s.firestore;await o.setDoc(o.doc(s.db,"rooms",e,"members",s.auth.currentUser.uid),jn(n,a,o.serverTimestamp,i),{merge:!0})}}async function un(e){var n=await X();if(!n)return null;var a=n.firestore,i=await a.getDoc(a.doc(n.db,"rooms",e));if(!i.exists())return null;var s=await a.getDocs(a.collection(n.db,"rooms",e,"members"));return{id:e,code:i.data().code,name:i.data().name,ownerId:i.data().ownerId,members:It(s.docs.map(function(o){var l=o.data();return{id:o.id,clientId:l.clientId||"",name:l.nickname,isPlayer:o.id===n.auth.currentUser.uid,snapshot:l}}),n.auth.currentUser.uid)}}function It(e,n){var a={};return e.filter(function(i){if(!i.clientId)return!0;var s=a[i.clientId];if(!s)return a[i.clientId]=i,!0;if(i.id===n){var o=e.indexOf(s);return o!==-1&&(s.__duplicate=!0),a[i.clientId]=i,!0}return i.__duplicate=!0,!1}).filter(function(i){return!i.__duplicate})}async function Lt(e,n){var a=await X();a&&await a.firestore.deleteDoc(a.firestore.doc(a.db,"rooms",e,"members",n))}async function Tt(e,n,a){var i=await X();if(!i||!e)return function(){};var s=i.firestore;return s.onSnapshot(s.collection(i.db,"rooms",e.id,"members"),function(o){n({id:e.id,code:e.code,name:e.name,ownerId:e.ownerId,isFirebase:!0,members:It(o.docs.map(function(l){var u=l.data();return{id:l.id,clientId:u.clientId||"",name:u.nickname,isPlayer:l.id===i.auth.currentUser.uid,snapshot:u}}),i.auth.currentUser.uid)})},a||function(){})}function Ra(){for(var e="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",n="",a=0;a<10;a++)n+=e[Math.floor(Math.random()*e.length)];return n}async function Mt(e){var n=await X();if(!n)return null;var a=n.firestore,i=n.auth.currentUser.uid,s=Ra(),o=a.doc(a.collection(n.db,"syncProfiles")).id,l=a.writeBatch(n.db);return l.set(a.doc(n.db,"syncCodes",s),{syncId:o,ownerId:i,createdAt:a.serverTimestamp()}),l.set(a.doc(n.db,"syncProfiles",o),{ownerId:i,payload:e,revision:1,updatedAt:a.serverTimestamp()}),l.set(a.doc(n.db,"syncProfiles",o,"devices",i),{code:s,joinedAt:a.serverTimestamp()}),await l.commit(),{syncId:o,code:s}}async function Rt(e){var n=await X();if(!n)return null;var a=n.firestore,i=String(e||"").trim().toUpperCase(),s=await a.getDoc(a.doc(n.db,"syncCodes",i));if(!s.exists())throw new Error("同期コードが見つかりません。");var o=s.data().syncId,l=n.auth.currentUser.uid;await a.setDoc(a.doc(n.db,"syncProfiles",o,"devices",l),{code:i,joinedAt:a.serverTimestamp()});var u=await a.getDoc(a.doc(n.db,"syncProfiles",o));if(!u.exists())throw new Error("同期データが見つかりません。");return{syncId:o,code:i,payload:u.data().payload||{},revision:u.data().revision||0}}async function qt(e,n,a){var i=await X();if(!(!i||!e)){var s=i.firestore;await s.setDoc(s.doc(i.db,"syncProfiles",e),{payload:n,revision:(a||0)+1,updatedAt:s.serverTimestamp()},{merge:!0})}}async function zt(e,n,a){var i=await X();if(!i||!e)return function(){};var s=i.firestore;return s.onSnapshot(s.doc(i.db,"syncProfiles",e),function(o){o.exists()&&n(o.data())},a||function(){})}var pn=null,fn=null,Vt=60*1e3,qa=100,za=250,Va=20,jt=null,Ot=null,Nn=0,Ne=!1,mn="",Ft=null,Fe=null;function gn(){var e=JSON.parse(JSON.stringify(t));return e.rankingLinks={nickname:ne().name,rooms:ke().filter(function(n){return n.isFirebase&&n.code}).map(function(n){return{id:n.id,code:n.code,name:n.name}})},delete e.ranking,e.endless&&(e.endless.queue=[],e.endless.pos=0),e}async function Ut(e){if(!(!K()||!e||!Array.isArray(e.rooms)))return Fe||(Fe=async function(){e.nickname&&we(e.nickname);for(var n=0;n<e.rooms.length;n++){var a=e.rooms[n],i=ke().some(function(l){return l.code===a.code});if(!i)try{var s=await On(a.code,ne().name,de(),ne().id),o=await un(s);o&&Oe(o)}catch(l){console.warn("同期済みランキング部屋への参加に失敗しました",a.code,l)}}}().finally(function(){Fe=null}),Fe)}function Nt(){var e=t.settings&&t.settings.progressSync;if(!(!K()||!e||Ne)){var n=JSON.stringify(gn());n!==mn&&(clearTimeout(jt),jt=setTimeout(async function(){var a=Un("progressSyncs");if(!(a.count>=za))try{var i=gn();await qt(e.syncId,i,Nn),mn=JSON.stringify(i),a.count++,H(t)}catch(s){console.warn("進捗同期に失敗しました",s)}},2500))}}async function Fn(){var e=t.settings&&t.settings.progressSync;!K()||!e||Ot||(Ot=await zt(e.syncId,async function(n){if(Nn=n.revision||0,!!n.payload){var a=JSON.stringify(n.payload);if(a===JSON.stringify(gn())){mn=a;return}var i=n.payload.rankingLinks,s=JSON.parse(JSON.stringify(n.payload));delete s.rankingLinks,Ne=!0,Ln(s),await Ut(i),mn=a,Ne=!1,(r.screen==="map"||r.screen==="ranking"||r.screen==="ranking-room")&&C()}},function(n){console.warn("進捗リアルタイム同期を停止しました",n)}))}function Qt(){var e=de();return delete e.updatedAt,JSON.stringify(e)}function Wt(e){if(K()){var n=Qt();t.ranking.remoteSnapshotKeys||(t.ranking.remoteSnapshotKeys={});var a=ke().filter(function(i){return i.isFirebase});a.some(function(i){return t.ranking.remoteSnapshotKeys[i.id]!==n})&&(clearTimeout(Ft),Ft=setTimeout(function(){ke().filter(function(i){return i.isFirebase}).forEach(function(i){Qn(i).catch(function(s){console.warn("ランキング同期に失敗しました",s)})})},typeof e=="number"?e:3e3))}}typeof window<"u"&&(window.addEventListener("codecase:progress-saved",function(){Nt(),Wt()}),setTimeout(function(){Fn(),Nt()},0));function Un(e){t.ranking.autoUpdateBudget||(t.ranking.autoUpdateBudget={});var n=new Date().toISOString().slice(0,10),a=t.ranking.autoUpdateBudget[e];return(!a||a.day!==n)&&(a={day:n,count:0}),t.ranking.autoUpdateBudget[e]=a,a}function bn(){fn&&fn(),fn=null,pn=null}async function Qn(e,n){if(!K()||!e)return!1;var a=Qt();if(t.ranking.remoteSnapshotKeys||(t.ranking.remoteSnapshotKeys={}),!n&&t.ranking.remoteSnapshotKeys[e.id]===a)return!1;t.ranking.remoteSyncAt||(t.ranking.remoteSyncAt={});var i=t.ranking.remoteSyncAt[e.id]||0;if(!n&&Date.now()-i<Vt)return Wt(Vt-(Date.now()-i)+100),!1;var s=Un("syncs");return s.count>=qa?!1:(await Ht(e.id,ne().name,de(),ne().id),t.ranking.remoteSyncAt[e.id]=Date.now(),t.ranking.remoteSnapshotKeys[e.id]=a,s.count++,H(t),!0)}async function ja(e){if(!(!K()||!e||pn===e.id)){bn();var n=Un("listeners");if(!(n.count>=Va)){n.count++,H(t),pn=e.id;try{if(await Qn(e),pn!==e.id)return;fn=await Tt(e,function(a){Oe(a),r.screen==="ranking-room"&&te()&&te().id===a.id&&C()},function(a){console.warn("ランキング自動更新を停止しました",a)})}catch(a){console.warn("ランキング自動同期に失敗しました",a)}}}}function Yt(e){return De.filter(function(n){return n.id===e})[0]||De[0]}function Oa(){var e=ke();return e.length?'<div class="room-list">'+e.map(function(n){var a=n.members.filter(function(i){return i.isPlayer})[0];return'<button class="room-card" data-room-id="'+d(n.id)+'"><span class="room-card-icon">'+w("trophy")+"</span><span><strong>"+d(n.name)+"</strong><small>"+n.members.length+"人 ・ 招待コード "+d(n.code)+"</small></span><b>"+(a?Math.round((a.snapshot||{}).overall||0).toLocaleString():"0")+" pt</b></button>"}).join("")+"</div>":'<div class="room-empty"><span>'+w("archive")+"</span><h3>まだ参加中の部屋はありません</h3><p>部屋を作成して、既存コンテンツの進捗を競ってみよう。</p></div>"}function Ue(){var e=ne(),n=de();return""+U()+'<div class="battlebar"><button class="backbtn" id="btnHome">← 地図へ戻る</button></div><main class="league-shell"><section class="frame league-hero room-hero"><div><span class="league-eyebrow">PROGRESS RANKING ROOMS</span><h2>'+w("trophy")+' ランキングルーム</h2><p>新しい専用問題ではなく、これまでの章攻略・学習・演習の実績をみんなで競います。</p></div><label class="league-nickname room-profile">ランキング表示名<input id="rankingNickname" maxlength="16" value="'+d(e.name)+'"></label></section><section class="room-progress-strip"><div><small>総合進捗</small><strong>'+n.overall.toLocaleString()+" pt</strong></div><div><small>連続捜査</small><strong>"+n.dailyStreak+"日</strong></div><div><small>スター</small><strong>"+n.stars+"</strong></div><div><small>累計正解</small><strong>"+n.correct+"</strong></div><div><small>正答率</small><strong>"+n.accuracy+"%</strong></div><div><small>学習完了</small><strong>"+n.study+'章</strong></div></section><div class="room-actions-grid"><section class="frame room-action"><span class="league-eyebrow">CREATE ROOM</span><h3>新しい部屋を作る</h3><p>名前を決めると6文字の招待コードが発行されます。</p><form id="createRoomForm"><input id="roomName" maxlength="30" placeholder="例：期末試験ガチ勢"><button class="primary" type="submit">部屋を作成</button></form></section><section class="frame room-action"><span class="league-eyebrow">JOIN ROOM</span><h3>招待コードで参加</h3><p>友達から受け取った6文字のコードを入力します。</p><form id="joinRoomForm"><input id="roomCode" maxlength="6" placeholder="ABC234"><button class="primary" type="submit">部屋に参加</button></form><p class="room-error" id="roomError" aria-live="polite"></p></section></div><section class="frame room-index"><div class="room-section-head"><div><span class="league-eyebrow">DEVICE SYNC</span><h3>スマホ・PCの進捗同期</h3></div></div>'+(t.settings&&t.settings.progressSync?'<p>同期中のコード：<strong class="sync-code-value">'+d(t.settings.progressSync.code)+"</strong></p>":'<p>片方の端末でコードを発行し、もう片方へ入力すると同じ進捗を共有できます。</p><div class="room-actions-grid"><button class="primary" id="btnCreateProgressSync" type="button">同期コードを発行</button><form id="joinProgressSyncForm"><input id="progressSyncCode" maxlength="10" placeholder="10文字のコード"><button class="ghost" type="submit">この端末を同期</button></form></div>')+'<p class="room-error" id="progressSyncError" aria-live="polite"></p></section><section class="frame room-index"><div class="room-section-head"><div><span class="league-eyebrow">YOUR ROOMS</span><h3>参加中の部屋</h3></div><small>'+ke().length+"部屋</small></div>"+Oa()+'</section><p class="league-local-note room-demo-note">'+(K()?"Firebaseオンライン同期が有効です。部屋コードを使って別端末から参加できます。":"ローカル動作確認モードです。Firebase設定を入力すると、同じ画面のまま別端末同期へ切り替わります。")+"</p></main>"}function Fa(e){return'<div class="metric-tabs" role="tablist">'+De.map(function(n){return'<button role="tab" class="metric-tab'+(n.id===e?" active":"")+'" data-metric="'+n.id+'">'+d(n.label)+"</button>"}).join("")+"</div>"}function Na(e,n){var a=Yt(n),i=e.members.some(function(s){return s.isPlayer&&s.id===e.ownerId});return'<div class="league-table room-ranking-table" role="table">'+qn(e,n).map(function(s){var o=s.id===e.ownerId;return'<div class="league-row'+(s.isPlayer?" player":"")+'" role="row"><span class="league-rank">'+s.rank+'</span><span class="league-name">'+d(s.name)+(o?' <small class="room-owner-badge">部屋主</small>':"")+(s.isPlayer?" <small>YOU</small>":"")+"</span><strong>"+s.value.toLocaleString()+" "+a.unit+'</strong><span class="member-kind">'+(o?"OWNER":s.isDemo?"DEMO":"MEMBER")+'</span><span class="member-action">'+(i&&!s.isPlayer?'<button type="button" data-kick-member="'+d(s.id)+'" data-kick-name="'+d(s.name)+'">キック</button>':"")+"</span></div>"}).join("")+"</div>"}function vn(){var e=te();if(!e)return r.screen="ranking",Ue();je(e.id);var n=t.ranking.activeMetric||"overall",a=qn(e,n),i=a.filter(function(s){return s.isPlayer})[0];return""+U()+'<div class="battlebar"><button class="backbtn" id="btnRankingBack">← 部屋一覧</button><button class="backbtn" id="btnMap">地図へ戻る</button></div><main class="league-shell"><section class="frame league-hero room-detail-hero"><div><span class="league-eyebrow">RANKING ROOM // '+d(e.code)+"</span><h2>"+w("trophy")+" "+d(e.name)+"</h2><p>"+e.members.length+'人が参加中。学習中の進捗は短い間隔でまとめてランキングへ自動反映されます。</p></div><div class="room-code"><small>招待コード</small><strong>'+d(e.code)+'</strong><button id="btnCopyCode">コピー</button></div></section><section class="frame room-board"><div class="room-section-head"><div><span class="league-eyebrow">MULTI VIEW RANKING</span><h3>'+d(Yt(n).label)+'ランキング</h3></div><div class="your-room-rank"><small>あなたの順位</small><strong>'+(i?i.rank:"-")+"位</strong></div></div>"+Fa(n)+Na(e,n)+'</section><div class="room-detail-actions"><button class="ghost" id="btnSyncProgress">'+w("review")+' 現在の進捗を反映</button><button class="ghost danger-room" id="btnRemoveRoom">この端末から部屋を削除</button></div><p class="league-local-note room-demo-note">'+(K()?"Firebaseと同期するオンラインルームです。":"現在は動作確認用ローカルルームです。")+"</p></main>"}function hn(){document.getElementById("btnHome").addEventListener("click",function(){r.screen="map",C()}),document.getElementById("rankingNickname").addEventListener("change",function(a){we(a.target.value),C()});var e=document.getElementById("btnCreateProgressSync");e&&e.addEventListener("click",async function(){this.disabled=!0;try{var a=await Mt(gn());t.settings.progressSync=a,H(t),await Fn(),C()}catch(i){document.getElementById("progressSyncError").textContent=i.message,this.disabled=!1}});var n=document.getElementById("joinProgressSyncForm");n&&n.addEventListener("submit",async function(a){a.preventDefault();try{var i=await Rt(document.getElementById("progressSyncCode").value);t.settings.progressSync={syncId:i.syncId,code:i.code};var s=i.payload&&i.payload.rankingLinks,o=JSON.parse(JSON.stringify(i.payload||{}));delete o.rankingLinks,Ne=!0,Ln(o),await Ut(s),Ne=!1,Nn=i.revision||0,H(t),await Fn(),C()}catch(l){document.getElementById("progressSyncError").textContent=l.message}}),document.getElementById("createRoomForm").addEventListener("submit",async function(a){a.preventDefault();var i=Ct(document.getElementById("roomName").value);if(K())try{await Dt(i);var s=await un(i.id);s&&Oe(s)}catch(o){document.getElementById("roomError").textContent="Firebase: "+o.message;return}r.screen="ranking-room",C()}),document.getElementById("joinRoomForm").addEventListener("submit",async function(a){a.preventDefault();var i=document.getElementById("roomCode").value;if(K())try{var s=await On(i,ne().name,de(),ne().id),o=await un(s);o&&Oe(o),r.screen="ranking-room",C()}catch(u){document.getElementById("roomError").textContent="Firebase: "+u.message}else{var l=St(i);l.ok?(r.screen="ranking-room",C()):document.getElementById("roomError").textContent=l.error}}),Array.prototype.forEach.call(document.querySelectorAll(".room-card"),function(a){a.addEventListener("click",function(){Et(a.getAttribute("data-room-id"))&&(r.screen="ranking-room",C())})})}function yn(){var e=te();ja(e),document.getElementById("btnRankingBack").addEventListener("click",function(){bn(),r.screen="ranking",C()}),document.getElementById("btnMap").addEventListener("click",function(){bn(),r.screen="map",C()}),Array.prototype.forEach.call(document.querySelectorAll(".metric-tab"),function(n){n.addEventListener("click",function(){t.ranking.activeMetric=n.getAttribute("data-metric"),C()})}),Array.prototype.forEach.call(document.querySelectorAll("[data-kick-member]"),function(n){n.addEventListener("click",async function(){var a=te(),i=n.getAttribute("data-kick-name")||"このメンバー";if(!(!a||!window.confirm("「"+i+"」をこの部屋からキックしますか？"))){n.disabled=!0;try{await Lt(a.id,n.getAttribute("data-kick-member"))}catch(s){n.disabled=!1,window.alert("キックに失敗しました: "+s.message)}}})}),document.getElementById("btnSyncProgress").addEventListener("click",async function(){var n=te();if(je(),K()&&n)try{var a=await Qn(n,!0);a||(this.textContent="本日の同期上限です",setTimeout(function(){var i=document.getElementById("btnSyncProgress");i&&(i.textContent="進捗を同期")},1200))}catch(i){window.alert("Firebase同期に失敗しました: "+i.message)}C()}),document.getElementById("btnCopyCode").addEventListener("click",function(){var n=this,a=te();navigator.clipboard&&navigator.clipboard.writeText&&navigator.clipboard.writeText(a.code),n.textContent="コピー済み",setTimeout(function(){n.textContent="コピー"},1e3)}),document.getElementById("btnRemoveRoom").addEventListener("click",function(){var n=te();n&&window.confirm("「"+n.name+"」をこの端末から削除しますか？")&&(bn(),Pt(n.id),r.screen="ranking",C())})}var xn=null;function Ua(e){return!!(e&&e.queue&&e.queue.length>0&&e.pos<e.queue.length)}function U(){return'<div class="topbar"><div class="brand"><span class="glyph">⬡</span><div><h1>コード事件捜査局</h1><small>CODE CASE BUREAU // EXAM INVESTIGATION</small></div></div><div class="tally">MISSION SCORE <span class="stars num">'+z()+" / "+q+"</span></div></div>"}function Qa(){var e=N[W(t.settings.endlessUnits)]||"標準";return'<section class="codex-panel" aria-label="Codex Panel"><div class="codex-panel__header"><span class="codex-panel__eyebrow">NEW CODEX PANEL</span><h4>観測ログ</h4></div><div class="codex-panel__body"><p>新しい捜査窓口を展開しました。次の観測点をすぐ確認できます。</p><ul><li>未解決事件: '+F()+" 件</li><li>総合評価: "+z()+" / "+q+"</li><li>獲得バッジ: "+_e().filter(function(n){return n.earned}).length+" / "+_e().length+" 個</li><li>推奨難易度: "+d(e)+'</li></ul><button class="codex-panel__cta" id="btnCodexOpen" type="button">観測を開く</button></div></section>'}function Wa(){var e=fe(),n=Se(),a=!!t.settings.soloCollapsed,i=e.missions.map(function(o){var l=o.value>=o.target,u=Math.min(100,Math.round(o.value/o.target*100));return'<li class="'+(l?"done":"")+'"><span class="solo-check">'+(l?w("check"):"○")+"</span><div><b>"+d(o.label)+"</b><small>"+Math.min(o.value,o.target)+" / "+o.target+'</small><span class="solo-mini-bar"><i style="width:'+u+'%"></i></span></div></li>'}).join(""),s=n.next?"次の「"+n.next.name+"」まで "+(n.next.min-n.points)+" pt":"最高ランクに到達";return'<section class="solo-momentum'+(a?" collapsed":"")+'"><div class="solo-head"><div><small>SOLO INVESTIGATION</small><h3>今日の一歩</h3></div><div class="solo-head-actions"><span class="solo-streak">'+w("spark")+" "+e.streak+'日</span><button type="button" id="btnSoloCollapse" aria-expanded="'+!a+'" aria-label="'+(a?"今日の一歩を展開":"今日の一歩を最小化")+'">'+(a?"＋":"−")+'</button></div></div><div class="solo-content"><ul class="solo-missions">'+i+'</ul><div class="solo-rank"><span><small>現在の階級</small><b>'+d(n.name)+"</b></span><strong>"+n.points+' pt</strong></div><div class="solo-rank-bar"><i style="width:'+n.percent+'%"></i></div><p>'+d(s)+" ・ 1日最高 "+e.bestDayCorrect+"正解</p>"+(e.completed===3?'<div class="solo-complete">'+w("trophy")+" 本日の捜査目標を全達成！</div>":"")+"</div></section>"}function _e(){var e=[],n=z(),a=Object.keys(t.stars).filter(function(k){return(t.stars[k]||0)>0}).length,i=(t.endless.correct||0)+(t.endless.wrong||0),s=i>0?Math.round((t.endless.correct||0)/i*100):0,o=Object.keys(t.studyCompleted||{}).filter(function(k){return!!t.studyCompleted[k]}).length,l=Object.keys(t.studyMedal||{}).filter(function(k){return!!t.studyMedal[k]}).length,u=fe(),b=Object.keys(t.activity&&t.activity.days||{}).filter(function(k){var T=t.activity.days[k]||{};return(T.answers||0)+(T.studySteps||0)+(T.reviewsCleared||0)>0}).length,f=Object.keys(t.activity&&t.activity.days||{}).reduce(function(k,T){return k+((t.activity.days[T]||{}).reviewsCleared||0)},0),y=t.ranking&&Array.isArray(t.ranking.rooms)?t.ranking.rooms:[],g=y.reduce(function(k,T){return Math.max(k,(T.members||[]).length)},0),P=Se().points,E=0;Object.keys(t.unitStats||{}).forEach(function(k){var T=t.unitStats[k]||{};(T.correct||0)>=5&&(T.wrong||0)===0&&E++});var _={初回突破:{how:"いずれかの事件でスターを1個以上獲得する",current:n,target:1,unit:"個"},序盤制圧:{how:"スターを合計3個獲得する",current:n,target:3,unit:"個"},中盤の切り札:{how:"スターを合計9個獲得する",current:n,target:9,unit:"個"},捜査の手応え:{how:"スターを合計15個獲得する",current:n,target:15,unit:"個"},上級捜査官:{how:"スターを合計20個獲得する",current:n,target:20,unit:"個"},伝説の実力者:{how:"スターを合計30個獲得する",current:n,target:30,unit:"個"},完全制覇:{how:"全事件で最大数のスターを集める",current:n,target:q,unit:"個"},半分の証拠:{how:"全事件の半分以上をクリアする",current:a,target:Math.ceil(D.length/2),unit:"章"},全章制覇:{how:"すべての事件を1回以上クリアする",current:a,target:D.length,unit:"章"},無傷の捜査:{how:"間違いノートを0件にする",current:F(),target:0,unit:"件",lowerIsBetter:!0},短期連勝:{how:"1000本ノックで3問連続正解する",current:t.endless.bestStreak||0,target:3,unit:"問"},連勝の極意:{how:"1000本ノックで8問連続正解する",current:t.endless.bestStreak||0,target:8,unit:"問"},連鎖突破:{how:"1000本ノックで15問連続正解する",current:t.endless.bestStreak||0,target:15,unit:"問"},"50本ノック達成":{how:"1000本ノックで累計50問に回答する",current:i,target:50,unit:"問"},"100本ノック達成":{how:"1000本ノックで累計100問に回答する",current:i,target:100,unit:"問"},"300本ノック達成":{how:"1000本ノックで累計300問に回答する",current:i,target:300,unit:"問"},"1000本ノック達成":{how:"1000本ノックで累計1000問に回答する",current:i,target:1e3,unit:"問"},高精度の捜査:{how:"1000本ノックを20問以上解き、正答率80%以上にする",current:s,target:80,unit:"%",note:"回答数 "+i+" / 20問"},正答率の鬼:{how:"1000本ノックを20問以上解き、正答率90%以上にする",current:s,target:90,unit:"%",note:"回答数 "+i+" / 20問"},学習ログ起動:{how:"学習パートを3章完了する",current:o,target:3,unit:"章"},学びの習慣:{how:"学習パートを6章完了する",current:o,target:6,unit:"章"},証拠を読み切る:{how:"学習パートを10章完了する",current:o,target:10,unit:"章"},学習モード:{how:"ホームで章選択の動作を「証拠を読む」に切り替える",current:t.settings.studyModeActive?1:0,target:1,unit:"回"},別解採用:{how:"ホームで「別解 採用」をオンにする",current:t.settings.allowAlt?1:0,target:1,unit:"回"},双方向攻略:{how:"学習モードと別解採用を両方オンにする",current:(t.settings.studyModeActive?1:0)+(t.settings.allowAlt?1:0),target:2,unit:"設定"},単元を極めた:{how:"同じ単元で5問以上正解し、誤答0を保つ",current:E,target:1,unit:"単元"},弱点を克服:{how:"3単元で5問以上正解し、誤答0を保つ",current:E,target:3,unit:"単元"},捜査条件を絞る:{how:"1000本ノックの対象単元を絞り込む",current:t.settings.endlessUnits&&t.settings.endlessUnits.length?1:0,target:1,unit:"設定"},難易度を見極める:{how:"1000本ノックの難易度を絞り込む",current:t.settings.endlessDiffs&&t.settings.endlessDiffs.length?1:0,target:1,unit:"設定"},重要度に着目:{how:"1000本ノックの重要度を絞り込む",current:t.settings.endlessTiers&&t.settings.endlessTiers.length?1:0,target:1,unit:"設定"},勉強の証:{how:"いずれかの学習パートを完了してメダルを獲得する",current:Object.keys(t.studyMedal||{}).length,target:1,unit:"個"},証拠収集家:{how:"学習メダルを5個集める",current:l,target:5,unit:"個"},資料室の主:{how:"学習メダルを10個集める",current:l,target:10,unit:"個"},現場百問:{how:"通常問題で累計100問正解する",current:Object.keys(t.unitStats||{}).reduce(function(k,T){return k+(t.unitStats[T].correct||0)},0),target:100,unit:"問"},復習捜査官:{how:"間違いノートの問題を5問解決する",current:f,target:5,unit:"問"},弱点封鎖:{how:"間違いノートの問題を20問解決する",current:f,target:20,unit:"問"},二日連続出動:{how:"2日連続で学習活動を記録する",current:u.streak,target:2,unit:"日"},一週間の張り込み:{how:"7日連続で学習活動を記録する",current:u.streak,target:7,unit:"日"},常連捜査員:{how:"合計30日で学習活動を記録する",current:b,target:30,unit:"日"},捜査会議を設置:{how:"ランキング部屋を1つ作成または参加する",current:y.length,target:1,unit:"室"},合同捜査:{how:"5人以上が登録されたランキング部屋に入る",current:g,target:5,unit:"人"},大規模捜査本部:{how:"10人以上が登録されたランキング部屋に入る",current:g,target:10,unit:"人"},名乗りを上げる:{how:"ユーザー名を「あなた」以外に変更する",current:t.ranking&&t.ranking.nickname&&t.ranking.nickname!=="あなた"?1:0,target:1,unit:"回"},事件解析官:{how:"捜査階級ポイントを300pt以上にする",current:P,target:300,unit:"pt"},首席コード探偵:{how:"捜査階級ポイントを1400pt以上にする",current:P,target:1400,unit:"pt"},まだ一歩目:{how:"最初の学習や事件捜査を始める前に与えられる記念バッジ",current:n+i+o===0?1:0,target:1,unit:"個"}};function p(k,T,ue,le,Z){var G=!!Z,V=_[k]||{how:"条件を満たすと取得できます",current:G?1:0,target:1,unit:"回"};e.push({label:k,rarity:T||"common",tone:ue||"neutral",batch:le||"base",earned:G,how:V.how,current:V.current,target:V.target,unit:V.unit||"",lowerIsBetter:!!V.lowerIsBetter,note:V.note||""})}var x={base:!0,standard:n>=9||a>=3||i>=50,advanced:n>=20||i>=200||o>=6,legendary:n>=q||i>=1e3||t.endless.bestStreak>=15};p("初回突破","common","good","base",n>0),p("序盤制圧","common","good","base",n>=3),p("中盤の切り札","common","good","standard",n>=9),p("捜査の手応え","rare","good","standard",n>=15),p("上級捜査官","rare","good","advanced",n>=20),p("伝説の実力者","epic","good","advanced",n>=30),p("完全制覇","legendary","good","legendary",n>=q),p("半分の証拠","common","good","standard",a>=Math.ceil(D.length/2)),p("全章制覇","rare","good","advanced",a>=D.length),p("無傷の捜査","rare","good","advanced",n>0&&F()===0),p("短期連勝","common","good","base",t.endless.bestStreak>=3),p("連勝の極意","rare","good","standard",t.endless.bestStreak>=8),p("連鎖突破","epic","good","legendary",t.endless.bestStreak>=15),p("50本ノック達成","common","good","standard",i>=50),p("100本ノック達成","rare","good","advanced",i>=100),p("300本ノック達成","epic","good","advanced",i>=300),p("1000本ノック達成","legendary","good","legendary",i>=1e3),p("高精度の捜査","rare","good","standard",s>=80&&i>=20),p("正答率の鬼","epic","good","advanced",s>=90&&i>=20),p("学習ログ起動","common","neutral","base",o>=3),p("学びの習慣","common","neutral","standard",o>=6),p("証拠を読み切る","rare","neutral","advanced",o>=10),p("学習モード","common","neutral","base",t.settings.studyModeActive),p("別解採用","common","neutral","base",t.settings.allowAlt),p("双方向攻略","rare","neutral","advanced",t.settings.studyModeActive&&t.settings.allowAlt),p("単元を極めた","rare","neutral","standard",E>=1),p("弱点を克服","epic","neutral","advanced",E>=3),p("捜査条件を絞る","common","neutral","base",!!(t.settings.endlessUnits&&t.settings.endlessUnits.length)),p("難易度を見極める","common","neutral","standard",!!(t.settings.endlessDiffs&&t.settings.endlessDiffs.length)),p("重要度に着目","rare","neutral","advanced",!!(t.settings.endlessTiers&&t.settings.endlessTiers.length)),p("勉強の証","common","neutral","base",!!Object.keys(t.studyMedal||{}).some(function(k){return!!t.studyMedal[k]})),p("証拠収集家","rare","neutral","study",l>=5),p("資料室の主","epic","neutral","study",l>=10),p("現場百問","rare","good","case",_.現場百問.current>=100),p("復習捜査官","rare","good","case",f>=5),p("弱点封鎖","epic","good","case",f>=20),p("二日連続出動","common","neutral","special",u.streak>=2),p("一週間の張り込み","epic","neutral","special",u.streak>=7),p("常連捜査員","legendary","neutral","special",b>=30),p("捜査会議を設置","common","good","league",y.length>=1),p("合同捜査","rare","good","league",g>=5),p("大規模捜査本部","epic","good","league",g>=10),p("名乗りを上げる","common","neutral","league",!!(t.ranking&&t.ranking.nickname&&t.ranking.nickname!=="あなた")),p("事件解析官","rare","good","special",P>=300),p("首席コード探偵","legendary","good","special",P>=1400),p("まだ一歩目","common","neutral","base",n===0&&i===0&&o===0);var m=["初回突破","序盤制圧","中盤の切り札","捜査の手応え","上級捜査官","伝説の実力者","完全制覇","半分の証拠","全章制覇","無傷の捜査","単元を極めた","弱点を克服"],A=["学習ログ起動","学びの習慣","証拠を読み切る","学習モード","勉強の証","証拠収集家","資料室の主"],B=["短期連勝","連勝の極意","連鎖突破","50本ノック達成","100本ノック達成","300本ノック達成","1000本ノック達成","高精度の捜査","正答率の鬼","捜査条件を絞る","難易度を見極める","重要度に着目"],M=["捜査会議を設置","合同捜査","大規模捜査本部","名乗りを上げる"];e.forEach(function(k){m.indexOf(k.label)!==-1?k.batch="case":A.indexOf(k.label)!==-1?k.batch="study":B.indexOf(k.label)!==-1?k.batch="training":M.indexOf(k.label)!==-1?k.batch="league":k.batch="special"});var O=typeof window<"u"&&new URLSearchParams(window.location.search).get("demo")==="all";return O&&e.forEach(function(k){k.earned=!0,k.note="全取得デモ表示"}),e}function Ya(){var e=Object.keys(t.stars).filter(function(a){return(t.stars[a]||0)>0}).length,n=_e().map(function(a){return a.label}).join(" / ");return`コード事件捜査局 進捗状況
ユーザー名: `+(t.ranking.nickname||"あなた")+`
総合評価: `+z()+" / "+q+`
解決済みケース: `+e+" / "+D.length+`
実績: `+n}function wn(){return(!t.showcase||typeof t.showcase!="object")&&(t.showcase={achievementLabels:null}),t.showcase}function Ga(){var e=Object.keys(t.stars).filter(function(f){return(t.stars[f]||0)>0}).length,n=t.ranking.nickname||"あなた",a=_e(),i=a.filter(function(f){return f.earned}).length,s=wn();if(!Array.isArray(s.achievementLabels)||s.achievementLabels.length!==5){for(var o=a.filter(function(f){return f.earned}).slice(0,5).map(function(f){return f.label});o.length<5;)o.push(null);s.achievementLabels=o,H(t)}var l=s.achievementLabels.map(function(f,y){var g=a.filter(function(E){return E.label===f&&E.earned})[0];if(!g)return'<li class="codex-showcase__achievement empty" data-showcase-slot="'+y+'"><span>実績をここへドロップ</span></li>';var P="codex-showcase__achievement--"+(g.rarity||"common");return'<li class="codex-showcase__achievement '+g.tone+" "+P+'" data-showcase-slot="'+y+'" draggable="true" data-achievement-label="'+d(g.label)+'"><span>'+d(g.label)+'</span><button type="button" data-clear-showcase="'+y+'" aria-label="'+d(g.label)+'を外す">×</button></li>'}).join(""),u=a.filter(function(f){return f.earned}).map(function(f){return'<button type="button" class="codex-showcase__source '+f.tone+" codex-showcase__source--"+(f.rarity||"common")+'" draggable="true" data-showcase-source="'+d(f.label)+'"><span>'+d(f.label)+"</span></button>"}).join(""),b=z()>=q?"全事件を完全制覇":e===0?"最初の事件を捜査中":"全"+D.length+"件中 "+e+"件を解決済み";return'<div class="codex-showcase" id="codexShowcase"><div class="codex-showcase__header"><span class="codex-showcase__eyebrow">PROGRESS STATUS</span><h6>進捗状況</h6></div><div class="codex-showcase__body"><label class="codex-showcase__identity"><span>ユーザー名</span><input id="showcaseUsername" maxlength="16" value="'+d(n)+'"></label><div class="codex-showcase__hero"><div class="codex-showcase__stamp">★ '+z()+" / "+q+'</div><div class="codex-showcase__quote">'+d(b)+'</div></div><div class="codex-showcase__metrics"><div class="codex-showcase__metric"><span>解決済みケース</span><strong>'+e+" / "+D.length+'</strong></div><div class="codex-showcase__metric"><span>未解決イベント</span><strong>'+F()+' 件</strong></div><div class="codex-showcase__metric"><span>推奨難易度</span><strong>'+d(N[W(t.settings.endlessUnits)]||"標準")+'</strong></div><div class="codex-showcase__metric"><span>獲得バッジ</span><strong>'+i+" / "+a.length+'</strong></div></div><div class="codex-showcase__achievement-head"><span>表示する実績</span><small>下の実績から5枠へドラッグ</small></div><div class="codex-showcase__tray" aria-label="取得済み実績">'+u+'</div><ul class="codex-showcase__achievements">'+l+"</ul></div></div>"}function Ka(e){var n=e.querySelector("#codexShowcase");if(!n)return;var a=document.createElement("canvas"),i=1200,s=630,o=window.devicePixelRatio||1;a.width=i*o,a.height=s*o;var l=a.getContext("2d");l.scale(o,o);function u(x,m,A,B,M){if(l.roundRect){l.roundRect(x,m,A,B,M);return}l.beginPath(),l.moveTo(x+M,m),l.arcTo(x+A,m,x+A,m+B,M),l.arcTo(x+A,m+B,x,m+B,M),l.arcTo(x,m+B,x,m,M),l.arcTo(x,m,x+A,m,M),l.closePath()}var b=l.createLinearGradient(0,0,i,s);b.addColorStop(0,"#241a13"),b.addColorStop(1,"#5a2b20"),l.fillStyle=b,l.fillRect(0,0,i,s),l.fillStyle="rgba(255,255,255,0.08)";for(var f=0;f<12;f++)l.beginPath(),l.arc(70+f%6*210,110+Math.floor(f/6)*360,58,0,Math.PI*2),l.fill();l.save(),l.translate(40,40),l.fillStyle="#f3e4bc",u(0,0,i-80,s-80,34),l.fill(),l.lineWidth=3,l.strokeStyle="#b78d4d",l.stroke(),l.restore(),l.fillStyle="#8d302b",l.font='bold 25px "Hiragino Mincho ProN", serif',l.fillText("コード事件捜査局",80,98),l.fillStyle="#2b2318",l.font='700 46px "Hiragino Mincho ProN", serif',l.fillText("進捗状況",80,155),l.fillStyle="#6b5b3e",l.font='600 23px "Hiragino Kaku Gothic ProN", sans-serif',l.fillText("ユーザー名  "+(t.ranking.nickname||"あなた"),80,205),l.fillText("総合評価  "+z()+" / "+q,80,270),l.fillText("解決済み案件  "+Object.keys(t.stars).filter(function(x){return(t.stars[x]||0)>0}).length+" / "+D.length,80,320),l.fillText("未解決イベント  "+F()+" 件",80,370),l.fillText("推奨難易度  "+(N[W(t.settings.endlessUnits)]||"標準"),80,420);var y=_e();l.fillText("獲得バッジ  "+y.filter(function(x){return x.earned}).length+" / "+y.length,80,470),l.fillStyle="#4f3b24",l.font='700 25px "Hiragino Kaku Gothic ProN", sans-serif',l.fillText("選択した実績",685,145);var g=_e(),P=wn(),E=Array.isArray(P.achievementLabels)?P.achievementLabels:[],_=E.map(function(x){return g.filter(function(m){return m.label===x&&m.earned})[0]}).filter(Boolean).slice(0,5);_.forEach(function(x,m){var A=205+m*64;l.fillStyle=x.tone==="good"?"#8d302b":"#3f6a8a",l.fillRect(685,A-18,15,15),l.fillStyle="#2b2318",l.font='600 22px "Hiragino Kaku Gothic ProN", sans-serif',l.fillText(x.label,720,A)}),l.fillStyle="#6b5b3e",l.font='600 18px "Hiragino Kaku Gothic ProN", sans-serif',l.fillText("CODE CASE BUREAU // PROGRESS CARD",80,545);var p=document.createElement("a");p.download="コード事件捜査局_進捗.png",p.href=a.toDataURL("image/png"),p.click()}function Kt(e){if(!e)return;var n=e.querySelector(".codex-overlay");n&&n.remove();var a=Object.keys(t.stars).filter(function(c){return(t.stars[c]||0)>0}).length,i=[],s=_e();s.forEach(function(c,v){c.detailIndex=v});var o=0,l={case:"事件捜査",study:"学習記録",training:"連続演習",league:"ランキング",special:"特別捜査"},u=["common","rare","epic","legendary"],b={common:"一般バッジ",rare:"希少バッジ",epic:"稀バッジ",legendary:"伝説バッジ"},f=["case","study","training","league","special"];u.forEach(function(c){var v=s.filter(function(L){return(L.rarity||"common")===c});v.sort(function(L,ve){return f.indexOf(L.batch)-f.indexOf(ve.batch)});for(var h=0;h<v.length;h+=6){var S=v.slice(h,h+6),I="■ "+b[c]+(v.length>6?" "+(Math.floor(h/6)+1):""),R='<ul class="codex-achievements codex-achievement-page" data-achievement-page="'+o+'"'+(o?" hidden":"")+'><li class="codex-achievement-group">'+d(I)+"</li>";S.forEach(function(L){var ve=L.rarity==="legendary"?"【伝説】":L.rarity==="epic"?"【稀】":L.rarity==="rare"?"【希少】":"【一般】",En=L.earned?"codex-achievement--earned":"codex-achievement--locked",Pn=L.earned?' draggable="true" data-achievement-label="'+d(L.label)+'"':' aria-disabled="true"';R+='<li><button type="button" class="codex-achievement '+L.tone+" codex-achievement--"+(L.rarity||"common")+" "+En+'" data-achievement-index="'+L.detailIndex+'"'+Pn+"><span>"+d(ve)+" "+d(L.label)+'</span><span class="codex-achievement__batch">'+d(l[L.batch]||"特別捜査")+" · "+d(L.earned?"取得済み":"未取得")+" ›</span></button></li>"}),i.push(R+"</ul>"),o++}}),i=i.join("");var y=Ya(),g=Ga(),P='<div class="codex-overlay" role="dialog" aria-modal="true" aria-label="進捗と実績"><div class="codex-sheet"><button class="codex-sheet__close" id="btnCodexClose" type="button" aria-label="閉じる">×</button><div class="codex-sheet__header"><span class="codex-panel__eyebrow">SHAREABLE PROGRESS</span><h4>進捗と実績</h4></div><div class="codex-sheet__grid"><section class="codex-card"><h5>進捗</h5><ul class="codex-metrics"><li><span>総合評価</span><strong>'+z()+" / "+q+"</strong></li><li><span>解決済みケース</span><strong>"+a+" / "+D.length+"</strong></li><li><span>未解決イベント</span><strong>"+F()+" 件</strong></li><li><span>推奨難易度</span><strong>"+d(N[W(t.settings.endlessUnits)]||"標準")+"</strong></li><li><span>獲得バッジ</span><strong>"+s.filter(function(c){return c.earned}).length+" / "+s.length+' 個</strong></li></ul></section><section class="codex-card"><h5>実績</h5><div class="codex-achievement-pages">'+i+'</div><div class="codex-achievement-pager"><button type="button" id="btnAchievementPrev" aria-label="前の実績ページ">← 前へ</button><span id="achievementPageStatus">1 / '+o+'</span><button type="button" id="btnAchievementNext" aria-label="次の実績ページ">次へ →</button></div></section></div><div class="codex-share"><p class="codex-share__label">進捗状況プレビュー</p><div class="codex-share__preview">'+g+'</div><p class="codex-share__label">共有メッセージ</p><textarea class="codex-share__textarea" readonly>'+d(y)+'</textarea><div class="codex-share__actions"><button class="codex-panel__cta" id="btnSaveCodexPhoto" type="button">写真にする</button><button class="codex-panel__cta" id="btnCopyCodexShare" type="button">コピーする</button><button class="codex-panel__secondary" id="btnShareCodex" type="button">共有する</button></div></div></div><div class="codex-achievement-popover" id="achievementPopover" role="tooltip" hidden></div></div>';e.insertAdjacentHTML("beforeend",P);var E=e.querySelector(".codex-sheet");E&&E.addEventListener("click",function(c){c.stopPropagation()});function _(){var c=E?E.scrollTop:0,v=window.scrollX,h=window.scrollY;Kt(e);var S=e.querySelector(".codex-sheet");S&&(S.scrollTop=c),window.scrollTo(v,h),requestAnimationFrame(function(){var I=e.querySelector(".codex-sheet");I&&(I.scrollTop=c),window.scrollTo(v,h)})}var p=e.querySelector(".codex-overlay");p&&p.addEventListener("click",function(){p.remove()});var x=e.querySelector("#btnCodexClose");x&&x.addEventListener("click",function(){p.remove()});var m=e.querySelector("#achievementPopover"),A=0,B=e.querySelectorAll("[data-achievement-page]"),M=e.querySelector("#achievementPageStatus"),O=e.querySelector("#btnAchievementPrev"),k=e.querySelector("#btnAchievementNext");function T(c){A=Math.max(0,Math.min(B.length-1,c)),Array.prototype.forEach.call(B,function(v,h){v.hidden=h!==A}),M&&(M.textContent=A+1+" / "+B.length),O&&(O.disabled=A===0),k&&(k.disabled=A===B.length-1),m&&(m.hidden=!0)}O&&O.addEventListener("click",function(){T(A-1)}),k&&k.addEventListener("click",function(){T(A+1)}),T(0);function ue(c){var v;c.earned?v="条件達成済み":c.lowerIsBetter?v="あと "+Math.max(0,c.current-c.target)+" "+c.unit+"減らす":v="あと "+Math.max(0,c.target-c.current)+" "+c.unit;var h=c.current+" "+c.unit+" / 目標 "+c.target+" "+c.unit;return'<span class="codex-achievement-detail__eyebrow">'+d(c.earned?"UNLOCKED":"HOW TO UNLOCK")+"</span><b>"+d(c.label)+"</b><p>"+d(c.how)+'</p><div class="codex-achievement-detail__progress"><span>'+d(h)+"</span><strong>"+d(v)+"</strong></div>"+(c.note?"<small>"+d(c.note)+"</small>":"")}function le(c,v){if(m){var h=14,S=m.offsetWidth||280,I=m.offsetHeight||150,R=c+h,L=v+8;R+S>window.innerWidth-10&&(R=Math.max(10,c-S-h)),L+I>window.innerHeight-10&&(L=Math.max(10,window.innerHeight-I-10)),m.style.left=R+"px",m.style.top=L+"px"}}function Z(c,v,h,S){if(!(!m||!v)){if(m.innerHTML=ue(v),m.hidden=!1,Array.prototype.forEach.call(e.querySelectorAll("[data-achievement-index]"),function(R){R.classList.remove("selected")}),c.classList.add("selected"),typeof h!="number"){var I=c.getBoundingClientRect();h=I.right,S=I.top}le(h,S)}}function G(c){m&&(m.hidden=!0),c&&c.classList.remove("selected")}var V=null;function J(c){V=c,Array.prototype.forEach.call(e.querySelectorAll("[data-achievement-index]"),function(v){v.classList.toggle("picked",v.getAttribute("data-achievement-label")===c)}),Array.prototype.forEach.call(e.querySelectorAll("[data-showcase-source]"),function(v){v.classList.toggle("picked",v.getAttribute("data-showcase-source")===c)})}function Te(c,v){var h=s.some(function(R){return R.earned&&R.label===v});if(h){for(var S=wn(),I=Array.isArray(S.achievementLabels)?S.achievementLabels.slice(0,5):[null,null,null,null,null];I.length<5;)I.push(null);I=I.map(function(R,L){return R===v&&L!==c?null:R}),I[c]=v,S.achievementLabels=I,H(t),_()}}Array.prototype.forEach.call(e.querySelectorAll("[data-achievement-index]"),function(c){var v=s[parseInt(c.getAttribute("data-achievement-index"),10)];v.earned&&c.addEventListener("dragstart",function(h){J(v.label),h.dataTransfer&&(h.dataTransfer.effectAllowed="move",h.dataTransfer.setData("text/plain",v.label))}),c.addEventListener("pointerenter",function(h){h.pointerType!=="touch"&&Z(c,v,h.clientX,h.clientY)}),c.addEventListener("pointermove",function(h){h.pointerType!=="touch"&&m&&!m.hidden&&le(h.clientX,h.clientY)}),c.addEventListener("pointerleave",function(h){h.pointerType!=="touch"&&G(c)}),c.addEventListener("focus",function(){Z(c,v)}),c.addEventListener("blur",function(){G(c)}),c.addEventListener("click",function(h){v.earned&&J(v.label),(h.pointerType==="touch"||!window.matchMedia("(hover:hover)").matches)&&(m&&!m.hidden&&c.classList.contains("selected")?G(c):Z(c,v,h.clientX||void 0,h.clientY||void 0))})}),Array.prototype.forEach.call(e.querySelectorAll("[data-showcase-source]"),function(c){var v=c.getAttribute("data-showcase-source");c.addEventListener("dragstart",function(h){J(v),h.dataTransfer&&(h.dataTransfer.effectAllowed="copy",h.dataTransfer.setData("text/plain",v))}),c.addEventListener("click",function(){J(v)})}),Array.prototype.forEach.call(e.querySelectorAll("[data-showcase-slot]"),function(c){var v=parseInt(c.getAttribute("data-showcase-slot"),10),h=c.getAttribute("data-achievement-label");h&&c.addEventListener("dragstart",function(S){J(h),S.dataTransfer&&(S.dataTransfer.effectAllowed="move",S.dataTransfer.setData("text/plain",h))}),c.addEventListener("dragover",function(S){S.preventDefault(),c.classList.add("dragover"),S.dataTransfer&&(S.dataTransfer.dropEffect="move")}),c.addEventListener("dragleave",function(){c.classList.remove("dragover")}),c.addEventListener("drop",function(S){S.preventDefault(),c.classList.remove("dragover");var I=S.dataTransfer?S.dataTransfer.getData("text/plain"):V;I&&Te(v,I)}),c.addEventListener("click",function(S){S.target.closest("[data-clear-showcase]")||V&&Te(v,V)})}),Array.prototype.forEach.call(e.querySelectorAll("[data-clear-showcase]"),function(c){c.addEventListener("click",function(v){v.stopPropagation();var h=parseInt(c.getAttribute("data-clear-showcase"),10),S=wn(),I=Array.isArray(S.achievementLabels)?S.achievementLabels.slice(0,5):[null,null,null,null,null];I[h]=null,S.achievementLabels=I,H(t),_()})});var oe=e.querySelector("#showcaseUsername");oe&&(oe.addEventListener("click",function(c){c.stopPropagation()}),oe.addEventListener("change",function(){we(oe.value),_()}));var ce=e.querySelector("#btnCopyCodexShare");ce&&ce.addEventListener("click",function(){navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(y).then(function(){ce.textContent="コピー済み"}):ce.textContent="コピーできません"});var ge=e.querySelector("#btnShareCodex");ge&&ge.addEventListener("click",function(){navigator.share?navigator.share({title:"コード事件捜査局 進捗",text:y}).catch(function(){}):navigator.clipboard&&navigator.clipboard.writeText&&navigator.clipboard.writeText(y).then(function(){ge.textContent="共有文をコピー"})});var $=e.querySelector("#btnSaveCodexPhoto");$&&$.addEventListener("click",function(){Ka(e),$.textContent="保存しました",setTimeout(function(){$&&($.textContent="写真にする")},1400)})}var Xa=["第1部 C++入門 ― 入出力・ポインタ・関数","第2部 データ構造 ― 配列・文字列・構造体","第3部 クラス設計 ― 基本から後片付けまで","第4部 継承と多態性","第5部 Pythonへの転生 ― クラスとTkinter"];function Za(){var e=!!t.settings.studyModeActive,n="",a=0,i=[];function s(){i.length&&(n+='<h3 class="groupheading">'+d(Xa[a]||"第"+(a+1)+"部")+'</h3><div class="stagegrid'+(e?" study-mode":"")+'">'+i.join("")+"</div>",i=[])}D.forEach(function(_,p){var x=t.stars[_.id]||0,m=!!t.studyCompleted[_.id],A=t.studyMedal[_.id],B=m?'<span class="studydonebadge">'+w(A?"trophy":"check")+" 学習済み</span>":e?'<span class="studyhint">'+w("book")+" 学習パートへ</span>":"";i.push('<button class="stagecard'+(_.isBoss?" boss":"")+'" data-idx="'+p+'" aria-label="'+d(_.title)+'"><div class="row1"><span class="emoji">'+ie(_.id,_.isBoss)+'</span><span class="idx">'+(_.isBoss?"BOSS NODE":"NODE "+String(p+1).padStart(2,"0"))+"</span></div><h3>"+d(_.title)+'</h3><div class="sub">'+d(_.sub)+" ・ "+d(_.mon)+"</div>"+B+'<div class="stars">'+Ee(x)+"</div></button>"),_.isBoss&&(s(),a++)}),s();var o=t.endless,l=o.correct+o.wrong,u=l>0?Math.round(o.correct/l*100):0,b=t.settings.endlessUnits,f=t.settings.endlessDiffs,y=t.settings.endlessTiers,g=!b||b.length===0?"対象: 全"+Q.length+"単元":"対象: "+b.length+"/"+Q.length+"単元に絞り込み中";g+=!f||f.length===0?" ・ 難易度: 全て":" ・ 難易度: "+f.map(function(_){return N[_]}).join("/"),g+=!y||y.length===0?" ・ 重要度: 全て":" ・ 重要度: "+y.map(function(_){return ae[_]}).join("/");var P=W(b),E=F();return""+U()+'<main class="case-office"><aside class="case-sidebar"><div class="office-plate"><span>'+w("target")+'</span><div><small>BUG INVESTIGATION UNIT</small><h2>事件管理簿</h2></div></div><button class="case-nav active"><span>'+w("archive")+"</span><b>事件一覧</b><small>"+D.length+'件</small></button><button class="case-nav league-nav" id="btnRanking"><span>'+w("trophy")+'</span><b>ランキング</b><small>ルームで競う</small></button><button class="case-nav" id="btnEndless"><span>'+w("terminal")+'</span><b>総合捜査</b><small>1000本ノック</small></button><button class="case-nav" id="btnReview2"><span>'+w("review")+"</span><b>未解決</b><small>"+E+'件</small></button><button class="case-nav" id="btnUnitPicker"><span>'+w("target")+"</span><b>捜査条件</b><small>"+d(N[P])+'</small></button><div class="case-stats"><h3>捜査記録</h3><dl><div><dt>解決評価</dt><dd class="num">'+z()+" / "+q+'</dd></div><div><dt>連続正解</dt><dd class="num">'+o.streak+'</dd></div><div><dt>正答率</dt><dd class="num">'+u+'%</dd></div></dl></div><button class="mode-file '+(e?"study":"quest")+'" id="btnModeToggle" aria-pressed="'+(e?"true":"false")+'"><span>'+w(e?"book":"sword")+"</span><b>"+(e?"証拠を読む":"推理に挑む")+'</b><small>章選択時の動作</small></button><button class="alt-file'+(t.settings.allowAlt?" on":"")+'" id="btnAltToggle" aria-pressed="'+(t.settings.allowAlt?"true":"false")+'"><span class="alt-file-label">'+w(t.settings.allowAlt?"unlock":"lock")+" 別解 "+(t.settings.allowAlt?"採用":"不採用")+'</span><span class="alt-switch" aria-hidden="true"><span class="alt-switch-knob"></span></span></button></aside><section class="evidence-board"><header class="board-head"><div><small>ACTIVE CASE FILES</small><h2>プログラム事件一覧</h2></div><p>不具合の証拠を読み、すべての事件を解決せよ。</p></header>'+Wa()+'<div class="case-scroll">'+n+'</div></section><aside class="desk-evidence"><div class="desk-lamp">'+w("search")+"</div><h3>本日の捜査</h3><p>"+d(g)+"</p><dl><div><dt>連続解決</dt><dd>"+o.streak+"</dd></div><div><dt>最高記録</dt><dd>"+o.bestStreak+"</dd></div></dl>"+(Ua(o)?'<button id="btnEndlessResume" class="resume-file">'+w("review")+" 前回の捜査を再開("+(o.queue.length-o.pos)+"問残り)</button>":"")+'<button id="btnEndlessDesk">捜査を開始</button>'+Qa()+'</aside></main><p class="footer-note">捜査記録はこの端末に自動保存されます。</p>'}function Ie(e,n){r.stageIndex=e,r.screen="lesson",r.lessonFromBattle=!!n,C()}function Wn(){Ze(),r.curQ=null,r.locked=!1,r.screen="endless",C()}function Gt(){var e=Object.keys(t.missed);r.reviewQueue=$e(e.map(function(n){return Re[n]}).filter(function(n){return n!==void 0})),r.reviewPos=0,r.reviewStats={correct:0,wrong:0},r.curQ=null,r.locked=!1,r.screen="review",C()}function Ja(){var e=r.reviewQueue[r.reviewPos];return j[e]}function $a(){if(r.reviewQueue.length===0)return""+U()+'<div class="battlebar"><button class="backbtn" id="btnHome">← 地図へ戻る</button></div><div class="frame result"><span class="bigemoji">'+w("check")+'</span><h2>間違いノートは空っぽです</h2><p>今のところ間違えた問題は記録されていません。各章の戦闘や1000本ノックで間違えると、その問題が自動的にここへ集まってきます。</p><div class="resultbtns"><button class="ghost" id="btnMap">地図へ戻る</button></div></div>';if(r.reviewPos>=r.reviewQueue.length){var e=F();return""+U()+'<div class="battlebar"><button class="backbtn" id="btnHome">← 地図へ戻る</button></div><div class="frame result"><span class="bigemoji">'+w("review")+"</span><h2>この周の復習が終わりました</h2><p>正解 "+r.reviewStats.correct+"問 ／ 誤答 "+r.reviewStats.wrong+"問。間違いノートには、まだ"+e+'問残っています。</p><div class="resultbtns">'+(e>0?'<button class="primary" id="btnReviewAgain">もう一度復習する →</button>':"")+'<button class="ghost" id="btnMap">地図へ戻る</button></div></div>'}if(!r.curQ){var n=Ja();r.curQ=n.q,r.endlessSrc=n}var a=Pe(r.curQ);return""+U()+'<div class="battlebar"><button class="backbtn" id="btnHome">← 地図へ戻る</button></div><div class="frame endlessbar"><div class="estat"><span class="elabel">出題元</span><span class="evalue">'+d(r.endlessSrc.srcTitle)+'</span></div><div class="estat"><span class="elabel">この周の進捗</span><span class="evalue">'+(r.reviewPos+1)+" / "+r.reviewQueue.length+'</span></div><div class="estat"><span class="elabel">間違いノート残り</span><span class="evalue">'+F()+'問</span></div></div><div class="frame qcard" id="qcard"><div class="qmeta"><span>'+w("review")+' 復習モード <span class="tierbadge t'+r.endlessSrc.tier+'">'+d(ae[r.endlessSrc.tier])+"</span></span><span>"+d(r.endlessSrc.srcSub)+'</span></div><div class="qlead">'+a.qlead+"</div>"+a.bodyHtml+a.answerHtml+'</div><div id="feedbackSlot"></div>'}function er(e){var n=D[r.stageIndex],a=1;if(e){var i=r.heroHP/100;r.wrong===0?a=3:i>=.5?a=2:a=1;var s=t.stars[n.id]||0;a>s&&(t.stars[n.id]=a),r.stageIndex+2>t.unlocked&&(t.unlocked=r.stageIndex+2),t.unlocked>D.length&&(t.unlocked=D.length),H(t)}var o=r.failReason==="outofq"?'<span class="bigemoji">'+w("alert")+"</span><h2>ミッション未完了</h2><p>設問はすべて解き終えたが、"+d(n.mon)+"にはまだ息がある。誤答が多いと決定打が足りない。訓練場で復習してもう一度挑もう。</p>":'<span class="bigemoji">'+w("shield")+"</span><h2>戦闘継続不能</h2><p>"+d(n.mon)+"にHPを削り切られてしまった。訓練場で復習してもう一度挑もう。</p>",l=e?'<span class="bigemoji">'+w("trophy")+"</span><h2>"+d(n.mon)+'を撃破した！</h2><div class="starsline">'+Ee(a)+"</div><p>誤答"+r.wrong+"回で切り抜けた。単元「"+d(n.sub)+"」はもう怖くない。</p>":o,u=r.stageIndex+1,b=e&&u<D.length;return""+U()+'<div class="frame result">'+l+'<div class="resultbtns"><button class="ghost" id="btnReview">'+w("book")+' 訓練場で見直す</button><button class="ghost" id="btnRetry">'+(e?"もう一度挑む":"再挑戦する")+"</button>"+(b?'<button class="primary" id="btnNext">次の間へ進む →</button>':"")+'<button class="ghost" id="btnMap">地図へ戻る</button></div></div>'+(!b&&e&&u>=D.length?'<div class="frame allclear"><h2>'+w("trophy")+" 全"+D.length+'章 制覇</h2><p>期末試験の範囲をひと通り旅した。総獲得星 <span class="num">'+z()+" / "+q+"</span>。仕上げにもう一周して星を集めよう。</p></div>":"")}function C(){var e=document.getElementById("app");if(xn&&(xn(),xn=null),document.body.classList.toggle("case-map-screen",r.screen==="map"),r.screen==="map"){let p=function(){a&&(a.classList.add("is-scrolling"),clearTimeout(s),s=setTimeout(function(){a.classList.remove("is-scrolling")},120))};e.innerHTML=Za(),Array.prototype.forEach.call(e.querySelectorAll(".stagecard:not(.locked)"),function(x){x.addEventListener("click",function(){if(!x.disabled){x.disabled=!0,x.classList.add("opening"),r.curQ=null;var m=parseInt(x.getAttribute("data-idx"),10);requestAnimationFrame(function(){t.settings.studyModeActive?kn(m):Ie(m,!1)})}})});var n=document.getElementById("btnSoloCollapse");n&&n.addEventListener("click",function(){t.settings.soloCollapsed=!t.settings.soloCollapsed,H(t);var x=n.closest(".solo-momentum");x&&x.classList.toggle("collapsed",t.settings.soloCollapsed),n.textContent=t.settings.soloCollapsed?"＋":"−",n.setAttribute("aria-expanded",String(!t.settings.soloCollapsed)),n.setAttribute("aria-label",t.settings.soloCollapsed?"今日の一歩を展開":"今日の一歩を最小化")});var a=e.querySelector(".case-office"),i=e.querySelector(".case-scroll"),s=0;i&&i.addEventListener("scroll",p,{passive:!0}),window.addEventListener("scroll",p,{passive:!0}),xn=function(){clearTimeout(s),i&&i.removeEventListener("scroll",p),window.removeEventListener("scroll",p)},document.getElementById("btnModeToggle").addEventListener("click",function(){t.settings.studyModeActive=!t.settings.studyModeActive,H(t),C()});var o=document.getElementById("btnCodexOpen");o&&o.addEventListener("click",function(x){x.preventDefault(),Kt(e)}),document.getElementById("btnEndless").addEventListener("click",function(){Wn()}),document.getElementById("btnRanking").addEventListener("click",function(){r.curQ=null,r.screen="ranking",C()}),document.getElementById("btnEndlessDesk").addEventListener("click",function(){Wn()});var l=document.getElementById("btnEndlessResume");l&&l.addEventListener("click",function(){Wn()}),document.getElementById("btnAltToggle").addEventListener("click",function(){t.settings.allowAlt=!t.settings.allowAlt,H(t),this.classList.toggle("on",t.settings.allowAlt),this.setAttribute("aria-pressed",String(t.settings.allowAlt)),this.innerHTML='<span class="alt-file-label">'+w(t.settings.allowAlt?"unlock":"lock")+" 別解 "+(t.settings.allowAlt?"採用":"不採用")+'</span><span class="alt-switch" aria-hidden="true"><span class="alt-switch-knob"></span></span>'}),document.getElementById("btnUnitPicker").addEventListener("click",function(){be()}),document.getElementById("btnReview2").addEventListener("click",function(){Gt()})}else if(r.screen==="ranking")e.innerHTML=Ue(),hn(e);else if(r.screen==="ranking-room")e.innerHTML=vn(),yn(e);else if(r.screen==="unitPicker")e.innerHTML=rn(),sn(e);else if(r.screen==="studyLoading")e.innerHTML=_n();else if(r.screen==="study")e.innerHTML=Bn(),An(e);else if(r.screen==="lesson")e.innerHTML=nn(),tn(e);else if(r.screen==="battle")e.innerHTML=ln(),document.getElementById("btnHome").addEventListener("click",function(){r.curQ=null,r.screen="map",C()}),document.getElementById("btnReview").addEventListener("click",function(){Ie(r.stageIndex,!0)}),me(e);else if(r.screen==="endless")e.innerHTML=on(),document.getElementById("btnHome").addEventListener("click",function(){r.curQ=null,r.screen="map",C()}),document.getElementById("btnEndlessFilter").addEventListener("click",function(){r.curQ=null,be()}),document.getElementById("btnPauseEndless").addEventListener("click",function(){H(t),r.curQ=null,r.screen="map",C()}),me(e);else if(r.screen==="endless-result")e.innerHTML=cn(),document.getElementById("btnHome").addEventListener("click",function(){r.curQ=null,r.screen="map",C()}),document.getElementById("btnEndlessAgain").addEventListener("click",function(){r.curQ=null,Je(),r.screen="endless",C()}),document.getElementById("btnEndlessSettings").addEventListener("click",function(){r.curQ=null,be()});else if(r.screen==="review"){e.innerHTML=$a();var u=document.getElementById("btnHome");u&&u.addEventListener("click",function(){r.curQ=null,r.screen="map",C()});var b=document.getElementById("btnMap");b&&b.addEventListener("click",function(){r.curQ=null,r.screen="map",C()});var f=document.getElementById("btnReviewAgain");f&&f.addEventListener("click",function(){Gt()}),document.getElementById("qcard")&&me(e)}else if(r.screen==="result-win"||r.screen==="result-lose"){var y=r.screen==="result-win";e.innerHTML=er(y);var g=document.getElementById("btnReview");g&&g.addEventListener("click",function(){r.curQ=null,Ie(r.stageIndex,!1)});var P=document.getElementById("btnRetry");P&&P.addEventListener("click",function(){r.curQ=null,xe(r.stageIndex,r.startTier)});var E=document.getElementById("btnNext");E&&E.addEventListener("click",function(){r.curQ=null,xe(r.stageIndex+1,r.startTier)});var _=document.getElementById("btnMap");_&&_.addEventListener("click",function(){r.curQ=null,r.screen="map",C()})}}var Le=null,Yn=null;function nr(){return Le?Promise.resolve(Le):(Yn||(Yn=import("./chunk-studyBeats-2026072120.js").then(function(e){return Le=e.resolveStudyBeats,Le})),Yn)}function tr(e,n){var a=t.studyMedal[e];(!a||Rn[n]>Rn[a])&&(t.studyMedal[e]=n)}function ar(e){var n=d(e);return n=n.replace(/\*\*(.+?)\*\*/g,"<b>$1</b>"),n=n.replace(/`(.+?)`/g,"<code>$1</code>"),n}function Xt(e){var n=String(e).split(/\n\s*\n/).map(function(s){return s.trim()}).filter(Boolean),a=[],i=null;return n.forEach(function(s){var o=s.match(/^##\s*(.+)$/);o?(i={heading:o[1].trim(),paras:[]},a.push(i)):(i||(i={heading:null,paras:[]},a.push(i)),i.paras.push("<p>"+ar(s)+"</p>"))}),a.map(function(s,o){var l=s.paras.join(""),u=!!(s.heading&&(s.heading.indexOf("罠")!==-1||s.heading.indexOf("注意")!==-1));if(o===0){var b=s.heading?"<h4"+(u?' class="trap"':"")+">"+d(s.heading)+"</h4>":"";return b+l}var f=s.heading?u?w("alert")+" タップして「"+d(s.heading)+"」を確認":w("book")+" タップして「"+d(s.heading)+"」を表示":w("book")+" タップして詳細を表示";return'<details class="accordion'+(u?" trap":"")+'"><summary>'+f+'<span class="chev">▸</span></summary><div class="accordion-body">'+l+"</div></details>"}).join("")}function rr(e,n){var a=d(e),i=n?d(n):"";return i&&a.indexOf(i)!==-1?a.split(i).join('<mark class="qhl">'+i+"</mark>"):a}async function kn(e){r.stageIndex=e,r.studyStep=0,r.studyPicked=null,r.studyCombo=0,r.studyBestCombo=0,r.studyWrongCount=0,r.screen="studyLoading",C();try{if(await nr(),r.screen!=="studyLoading")return;r.screen="study",C()}catch(n){if(console.error("学習データを読み込めませんでした",n),r.screen!=="studyLoading")return;r.screen="map",C(),window.alert("学習データを読み込めませんでした。通信を確認して、もう一度お試しください。")}}function _n(){return""+U()+'<div class="frame lessonintro"><h2>'+w("book")+" 学習資料を読み込んでいます…</h2><p>事件一覧の表示を軽くするため、詳しい解説は必要になった時だけ読み込みます。</p></div>"}function ir(e){t.studyCompleted[e.id]||(t.studyCompleted[e.id]=!0,H(t));var n=e.lesson.map(function(a,i){return'<div class="frame lessoncard"><div class="lstep">要点 '+(i+1)+" / "+e.lesson.length+"</div><h3>"+d(a.title)+'</h3><pre class="codeblock">'+d(a.code)+'</pre><p class="lessonexplain">'+d(a.explain)+"</p></div>"}).join("");return""+U()+'<div class="battlebar"><button class="backbtn" id="btnStudyBack">← 地図へ戻る</button><button class="togglebtn" id="btnStudyToggle">⇄ 問題パートに切替</button></div><div class="frame lessonintro"><h2>'+ie(e.id,e.isBoss)+" 学習ノート — "+d(e.title)+"</h2><p>"+d(e.sub)+'の要点を、完成した正しいコードと解説でひと通り確認しよう。この章はまだ物語形式の学習パートを準備中なので、訓練場と同じ要点ノートを学習パートとして表示している。</p></div><div class="lessongrid">'+n+'</div><div class="frame result"><span class="bigemoji">'+w("check")+'</span><h2>学習ノートを確認しました</h2><p>準備ができたら、問題パートで実際に手を動かして定着させよう。</p><div class="resultbtns"><button class="primary" id="btnStudyToChallenge">問題に挑戦する →</button><button class="ghost" id="btnStudyToMap">地図に戻る</button></div></div>'}function Bn(){var e=D[r.stageIndex],n=Le(e),a=n.length;if(a===0)return ir(e);if(r.studyStep>=a){t.studyCompleted[e.id]=!0;var i=r.studyWrongCount===0?"gold":r.studyWrongCount<=2?"silver":"bronze";tr(e.id,i),H(t);var s={gold:"ノーミス達成 — 完璧な理解です",silver:"好調な仕上がりです",bronze:"学習を修了しました"}[i];return""+U()+'<div class="battlebar"><button class="backbtn" id="btnStudyBack">← 地図へ戻る</button><button class="togglebtn" id="btnStudyToggle">⇄ 問題パートに切替</button></div><div class="frame result achieve '+i+'"><span class="bigemoji">'+w("trophy")+"</span><h2>"+s+"</h2><p>"+d(e.sub)+"の急所は仕込み終えた。この勢いのまま、"+d(e.mon)+'に挑んでみよう。</p><div class="achievestats"><span>誤答 <b>'+r.studyWrongCount+"</b>回</span><span>最高コンボ <b>"+r.studyBestCombo+'</b></span></div><div class="resultbtns"><button class="primary" id="btnStudyToChallenge">問題に挑戦する →</button><button class="ghost" id="btnStudyToMap">地図に戻る</button></div></div>'}var o=n[r.studyStep],l=r.studyPicked!==null,u=l&&r.studyPicked===o.quiz.correct,b=Math.round(r.studyStep/a*100),f=n.map(function(p,x){return'<span class="dot'+(x<r.studyStep?" done":"")+(x===r.studyStep?" cur":"")+'"></span>'}).join(""),y=u&&r.studyCombo>=2?'<div class="combobadge">'+w("spark")+" "+r.studyCombo+" COMBO</div>":"",g;if(l){var E=o.quiz.options[o.quiz.correct],_=!u&&o.quiz.sourceQuote?'<div class="guidance"><span class="glabel">'+w("book")+' 本文のここをもう一度確認しよう</span><p class="gquote">'+rr(o.quiz.sourceQuote,E)+"</p></div>":"";g='<div class="quizbox"><p class="quizq">'+w("chip")+" "+d(o.quiz.q)+"</p>"+y+'<div class="feedback '+(u?"good":"bad")+'"><div class="head">'+w(u?"check":"alert")+(u?" 正解":" 惜しい、正解は「"+d(E)+"」")+"</div>"+_+'<div class="explain sstory">'+Xt(o.quiz.explain)+'</div></div><div class="actionrow"><button class="primary" id="btnStudyNext">'+(r.studyStep+1<a?"次へ →":"仕上げる →")+"</button></div></div>"}else{var P=o.quiz.options.map(function(p,x){return'<button class="choicebtn studyquizbtn" data-opt="'+x+'">'+d(p)+"</button>"}).join("");g='<div class="quizbox"><p class="quizq">'+w("chip")+" "+d(o.quiz.q)+'</p><div class="choicegrid">'+P+"</div></div>"}return""+U()+'<div class="battlebar"><button class="backbtn" id="btnStudyBack">← 地図へ戻る</button><button class="togglebtn" id="btnStudyToggle">⇄ 問題パートに切替</button></div><div class="studyexpbar"><div class="studyexpfill" style="width:'+b+'%"></div></div><div class="studydots">'+f+'<span class="studystep">'+(r.studyStep+1)+" / "+a+'</span></div><div class="frame storycard"><span class="sicon">'+w("chip")+'</span><div class="sstory">'+Xt(o.story)+'</div><pre class="codeblock">'+d(o.code)+"</pre></div>"+g}function An(e){var n=document.getElementById("btnStudyBack");n&&n.addEventListener("click",function(){r.screen="map",C()});var a=document.getElementById("btnStudyToggle");a&&a.addEventListener("click",function(){Ie(r.stageIndex,!1)});var i=document.getElementById("btnStudyNext");i&&i.addEventListener("click",function(){r.studyStep++,r.studyPicked=null,C()});var s=document.getElementById("btnStudyToChallenge");s&&s.addEventListener("click",function(){Ie(r.stageIndex,!1)});var o=document.getElementById("btnStudyToMap");o&&o.addEventListener("click",function(){r.screen="map",C()}),Array.prototype.forEach.call(e.querySelectorAll(".studyquizbtn"),function(l){l.addEventListener("click",function(){var u=D[r.stageIndex],b=Le(u),f=b[r.studyStep],y=parseInt(l.getAttribute("data-opt"),10);r.studyPicked=y,Ce("studySteps",1),y===f.quiz.correct?(r.studyCombo++,r.studyCombo>r.studyBestCombo&&(r.studyBestCombo=r.studyCombo)):(r.studyCombo=0,r.studyWrongCount++),H(t),C()})})}var Zt=!1,Cn=null;function sr(e){return!!(e&&e.queue&&e.queue.length>0&&e.pos<e.queue.length)}function lr(){Zt||(ze(),Zt=!0)}function Qe(){return'<div class="topbar"><div class="brand"><span class="glyph">⬡</span><div><h1>コード事件捜査局</h1><small>CODE CASE BUREAU // EXAM INVESTIGATION</small></div></div><div class="tally">MISSION SCORE <span class="stars num">'+z()+" / "+q+"</span></div></div>"}function or(){var e=N[W(t.settings.endlessUnits)]||"標準";return'<section class="codex-panel" aria-label="Codex Panel"><div class="codex-panel__header"><span class="codex-panel__eyebrow">NEW CODEX PANEL</span><h4>観測ログ</h4></div><div class="codex-panel__body"><p>新しい捜査窓口を展開しました。次の観測点をすぐ確認できます。</p><ul><li>未解決事件: '+F()+" 件</li><li>総合評価: "+z()+" / "+q+"</li><li>獲得バッジ: "+Be().filter(function(n){return n.earned}).length+" / "+Be().length+" 個</li><li>推奨難易度: "+d(e)+'</li></ul><button class="codex-panel__cta" id="btnCodexOpen" type="button">観測を開く</button></div></section>'}function cr(){var e=fe(),n=Se(),a=!!t.settings.soloCollapsed,i=e.missions.map(function(o){var l=o.value>=o.target,u=Math.min(100,Math.round(o.value/o.target*100));return'<li class="'+(l?"done":"")+'"><span class="solo-check">'+(l?w("check"):"○")+"</span><div><b>"+d(o.label)+"</b><small>"+Math.min(o.value,o.target)+" / "+o.target+'</small><span class="solo-mini-bar"><i style="width:'+u+'%"></i></span></div></li>'}).join(""),s=n.next?"次の「"+n.next.name+"」まで "+(n.next.min-n.points)+" pt":"最高ランクに到達";return'<section class="solo-momentum'+(a?" collapsed":"")+'"><div class="solo-head"><div><small>SOLO INVESTIGATION</small><h3>今日の一歩</h3></div><div class="solo-head-actions"><span class="solo-streak">'+w("spark")+" "+e.streak+'日</span><button type="button" id="btnSoloCollapse" aria-expanded="'+!a+'" aria-label="'+(a?"今日の一歩を展開":"今日の一歩を最小化")+'">'+(a?"＋":"−")+'</button></div></div><div class="solo-content"><ul class="solo-missions">'+i+'</ul><div class="solo-rank"><span><small>現在の階級</small><b>'+d(n.name)+"</b></span><strong>"+n.points+' pt</strong></div><div class="solo-rank-bar"><i style="width:'+n.percent+'%"></i></div><p>'+d(s)+" ・ 1日最高 "+e.bestDayCorrect+"正解</p>"+(e.completed===3?'<div class="solo-complete">'+w("trophy")+" 本日の捜査目標を全達成！</div>":"")+"</div></section>"}function Be(){var e=[],n=z(),a=Object.keys(t.stars).filter(function(k){return(t.stars[k]||0)>0}).length,i=(t.endless.correct||0)+(t.endless.wrong||0),s=i>0?Math.round((t.endless.correct||0)/i*100):0,o=Object.keys(t.studyCompleted||{}).filter(function(k){return!!t.studyCompleted[k]}).length,l=Object.keys(t.studyMedal||{}).filter(function(k){return!!t.studyMedal[k]}).length,u=fe(),b=Object.keys(t.activity&&t.activity.days||{}).filter(function(k){var T=t.activity.days[k]||{};return(T.answers||0)+(T.studySteps||0)+(T.reviewsCleared||0)>0}).length,f=Object.keys(t.activity&&t.activity.days||{}).reduce(function(k,T){return k+((t.activity.days[T]||{}).reviewsCleared||0)},0),y=t.ranking&&Array.isArray(t.ranking.rooms)?t.ranking.rooms:[],g=y.reduce(function(k,T){return Math.max(k,(T.members||[]).length)},0),P=Se().points,E=0;Object.keys(t.unitStats||{}).forEach(function(k){var T=t.unitStats[k]||{};(T.correct||0)>=5&&(T.wrong||0)===0&&E++});var _={初回突破:{how:"いずれかの事件でスターを1個以上獲得する",current:n,target:1,unit:"個"},序盤制圧:{how:"スターを合計3個獲得する",current:n,target:3,unit:"個"},中盤の切り札:{how:"スターを合計9個獲得する",current:n,target:9,unit:"個"},捜査の手応え:{how:"スターを合計15個獲得する",current:n,target:15,unit:"個"},上級捜査官:{how:"スターを合計20個獲得する",current:n,target:20,unit:"個"},伝説の実力者:{how:"スターを合計30個獲得する",current:n,target:30,unit:"個"},完全制覇:{how:"全事件で最大数のスターを集める",current:n,target:q,unit:"個"},半分の証拠:{how:"全事件の半分以上をクリアする",current:a,target:Math.ceil(D.length/2),unit:"章"},全章制覇:{how:"すべての事件を1回以上クリアする",current:a,target:D.length,unit:"章"},無傷の捜査:{how:"間違いノートを0件にする",current:F(),target:0,unit:"件",lowerIsBetter:!0},短期連勝:{how:"1000本ノックで3問連続正解する",current:t.endless.bestStreak||0,target:3,unit:"問"},連勝の極意:{how:"1000本ノックで8問連続正解する",current:t.endless.bestStreak||0,target:8,unit:"問"},連鎖突破:{how:"1000本ノックで15問連続正解する",current:t.endless.bestStreak||0,target:15,unit:"問"},"50本ノック達成":{how:"1000本ノックで累計50問に回答する",current:i,target:50,unit:"問"},"100本ノック達成":{how:"1000本ノックで累計100問に回答する",current:i,target:100,unit:"問"},"300本ノック達成":{how:"1000本ノックで累計300問に回答する",current:i,target:300,unit:"問"},"1000本ノック達成":{how:"1000本ノックで累計1000問に回答する",current:i,target:1e3,unit:"問"},高精度の捜査:{how:"1000本ノックを20問以上解き、正答率80%以上にする",current:s,target:80,unit:"%",note:"回答数 "+i+" / 20問"},正答率の鬼:{how:"1000本ノックを20問以上解き、正答率90%以上にする",current:s,target:90,unit:"%",note:"回答数 "+i+" / 20問"},学習ログ起動:{how:"学習パートを3章完了する",current:o,target:3,unit:"章"},学びの習慣:{how:"学習パートを6章完了する",current:o,target:6,unit:"章"},証拠を読み切る:{how:"学習パートを10章完了する",current:o,target:10,unit:"章"},学習モード:{how:"ホームで章選択の動作を「証拠を読む」に切り替える",current:t.settings.studyModeActive?1:0,target:1,unit:"回"},別解採用:{how:"ホームで「別解 採用」をオンにする",current:t.settings.allowAlt?1:0,target:1,unit:"回"},双方向攻略:{how:"学習モードと別解採用を両方オンにする",current:(t.settings.studyModeActive?1:0)+(t.settings.allowAlt?1:0),target:2,unit:"設定"},単元を極めた:{how:"同じ単元で5問以上正解し、誤答0を保つ",current:E,target:1,unit:"単元"},弱点を克服:{how:"3単元で5問以上正解し、誤答0を保つ",current:E,target:3,unit:"単元"},捜査条件を絞る:{how:"1000本ノックの対象単元を絞り込む",current:t.settings.endlessUnits&&t.settings.endlessUnits.length?1:0,target:1,unit:"設定"},難易度を見極める:{how:"1000本ノックの難易度を絞り込む",current:t.settings.endlessDiffs&&t.settings.endlessDiffs.length?1:0,target:1,unit:"設定"},重要度に着目:{how:"1000本ノックの重要度を絞り込む",current:t.settings.endlessTiers&&t.settings.endlessTiers.length?1:0,target:1,unit:"設定"},勉強の証:{how:"いずれかの学習パートを完了してメダルを獲得する",current:Object.keys(t.studyMedal||{}).length,target:1,unit:"個"},証拠収集家:{how:"学習メダルを5個集める",current:l,target:5,unit:"個"},資料室の主:{how:"学習メダルを10個集める",current:l,target:10,unit:"個"},現場百問:{how:"通常問題で累計100問正解する",current:Object.keys(t.unitStats||{}).reduce(function(k,T){return k+(t.unitStats[T].correct||0)},0),target:100,unit:"問"},復習捜査官:{how:"間違いノートの問題を5問解決する",current:f,target:5,unit:"問"},弱点封鎖:{how:"間違いノートの問題を20問解決する",current:f,target:20,unit:"問"},二日連続出動:{how:"2日連続で学習活動を記録する",current:u.streak,target:2,unit:"日"},一週間の張り込み:{how:"7日連続で学習活動を記録する",current:u.streak,target:7,unit:"日"},常連捜査員:{how:"合計30日で学習活動を記録する",current:b,target:30,unit:"日"},捜査会議を設置:{how:"ランキング部屋を1つ作成または参加する",current:y.length,target:1,unit:"室"},合同捜査:{how:"5人以上が登録されたランキング部屋に入る",current:g,target:5,unit:"人"},大規模捜査本部:{how:"10人以上が登録されたランキング部屋に入る",current:g,target:10,unit:"人"},名乗りを上げる:{how:"ユーザー名を「あなた」以外に変更する",current:t.ranking&&t.ranking.nickname&&t.ranking.nickname!=="あなた"?1:0,target:1,unit:"回"},事件解析官:{how:"捜査階級ポイントを300pt以上にする",current:P,target:300,unit:"pt"},首席コード探偵:{how:"捜査階級ポイントを1400pt以上にする",current:P,target:1400,unit:"pt"},まだ一歩目:{how:"最初の学習や事件捜査を始める前に与えられる記念バッジ",current:n+i+o===0?1:0,target:1,unit:"個"}};function p(k,T,ue,le,Z){var G=!!Z,V=_[k]||{how:"条件を満たすと取得できます",current:G?1:0,target:1,unit:"回"};e.push({label:k,rarity:T||"common",tone:ue||"neutral",batch:le||"base",earned:G,how:V.how,current:V.current,target:V.target,unit:V.unit||"",lowerIsBetter:!!V.lowerIsBetter,note:V.note||""})}var x={base:!0,standard:n>=9||a>=3||i>=50,advanced:n>=20||i>=200||o>=6,legendary:n>=q||i>=1e3||t.endless.bestStreak>=15};p("初回突破","common","good","base",n>0),p("序盤制圧","common","good","base",n>=3),p("中盤の切り札","common","good","standard",n>=9),p("捜査の手応え","rare","good","standard",n>=15),p("上級捜査官","rare","good","advanced",n>=20),p("伝説の実力者","epic","good","advanced",n>=30),p("完全制覇","legendary","good","legendary",n>=q),p("半分の証拠","common","good","standard",a>=Math.ceil(D.length/2)),p("全章制覇","rare","good","advanced",a>=D.length),p("無傷の捜査","rare","good","advanced",n>0&&F()===0),p("短期連勝","common","good","base",t.endless.bestStreak>=3),p("連勝の極意","rare","good","standard",t.endless.bestStreak>=8),p("連鎖突破","epic","good","legendary",t.endless.bestStreak>=15),p("50本ノック達成","common","good","standard",i>=50),p("100本ノック達成","rare","good","advanced",i>=100),p("300本ノック達成","epic","good","advanced",i>=300),p("1000本ノック達成","legendary","good","legendary",i>=1e3),p("高精度の捜査","rare","good","standard",s>=80&&i>=20),p("正答率の鬼","epic","good","advanced",s>=90&&i>=20),p("学習ログ起動","common","neutral","base",o>=3),p("学びの習慣","common","neutral","standard",o>=6),p("証拠を読み切る","rare","neutral","advanced",o>=10),p("学習モード","common","neutral","base",t.settings.studyModeActive),p("別解採用","common","neutral","base",t.settings.allowAlt),p("双方向攻略","rare","neutral","advanced",t.settings.studyModeActive&&t.settings.allowAlt),p("単元を極めた","rare","neutral","standard",E>=1),p("弱点を克服","epic","neutral","advanced",E>=3),p("捜査条件を絞る","common","neutral","base",!!(t.settings.endlessUnits&&t.settings.endlessUnits.length)),p("難易度を見極める","common","neutral","standard",!!(t.settings.endlessDiffs&&t.settings.endlessDiffs.length)),p("重要度に着目","rare","neutral","advanced",!!(t.settings.endlessTiers&&t.settings.endlessTiers.length)),p("勉強の証","common","neutral","base",!!Object.keys(t.studyMedal||{}).some(function(k){return!!t.studyMedal[k]})),p("証拠収集家","rare","neutral","study",l>=5),p("資料室の主","epic","neutral","study",l>=10),p("現場百問","rare","good","case",_.現場百問.current>=100),p("復習捜査官","rare","good","case",f>=5),p("弱点封鎖","epic","good","case",f>=20),p("二日連続出動","common","neutral","special",u.streak>=2),p("一週間の張り込み","epic","neutral","special",u.streak>=7),p("常連捜査員","legendary","neutral","special",b>=30),p("捜査会議を設置","common","good","league",y.length>=1),p("合同捜査","rare","good","league",g>=5),p("大規模捜査本部","epic","good","league",g>=10),p("名乗りを上げる","common","neutral","league",!!(t.ranking&&t.ranking.nickname&&t.ranking.nickname!=="あなた")),p("事件解析官","rare","good","special",P>=300),p("首席コード探偵","legendary","good","special",P>=1400),p("まだ一歩目","common","neutral","base",n===0&&i===0&&o===0);var m=["初回突破","序盤制圧","中盤の切り札","捜査の手応え","上級捜査官","伝説の実力者","完全制覇","半分の証拠","全章制覇","無傷の捜査","単元を極めた","弱点を克服"],A=["学習ログ起動","学びの習慣","証拠を読み切る","学習モード","勉強の証","証拠収集家","資料室の主"],B=["短期連勝","連勝の極意","連鎖突破","50本ノック達成","100本ノック達成","300本ノック達成","1000本ノック達成","高精度の捜査","正答率の鬼","捜査条件を絞る","難易度を見極める","重要度に着目"],M=["捜査会議を設置","合同捜査","大規模捜査本部","名乗りを上げる"];e.forEach(function(k){m.indexOf(k.label)!==-1?k.batch="case":A.indexOf(k.label)!==-1?k.batch="study":B.indexOf(k.label)!==-1?k.batch="training":M.indexOf(k.label)!==-1?k.batch="league":k.batch="special"});var O=typeof window<"u"&&new URLSearchParams(window.location.search).get("demo")==="all";return O&&e.forEach(function(k){k.earned=!0,k.note="全取得デモ表示"}),e}function dr(){var e=Object.keys(t.stars).filter(function(a){return(t.stars[a]||0)>0}).length,n=Be().map(function(a){return a.label}).join(" / ");return`コード事件捜査局 進捗状況
ユーザー名: `+(t.ranking.nickname||"あなた")+`
総合評価: `+z()+" / "+q+`
解決済みケース: `+e+" / "+D.length+`
実績: `+n}function Sn(){return(!t.showcase||typeof t.showcase!="object")&&(t.showcase={achievementLabels:null}),t.showcase}function ur(){var e=Object.keys(t.stars).filter(function(f){return(t.stars[f]||0)>0}).length,n=t.ranking.nickname||"あなた",a=Be(),i=a.filter(function(f){return f.earned}).length,s=Sn();if(!Array.isArray(s.achievementLabels)||s.achievementLabels.length!==5){for(var o=a.filter(function(f){return f.earned}).slice(0,5).map(function(f){return f.label});o.length<5;)o.push(null);s.achievementLabels=o,H(t)}var l=s.achievementLabels.map(function(f,y){var g=a.filter(function(E){return E.label===f&&E.earned})[0];if(!g)return'<li class="codex-showcase__achievement empty" data-showcase-slot="'+y+'"><span>実績をここへドロップ</span></li>';var P="codex-showcase__achievement--"+(g.rarity||"common");return'<li class="codex-showcase__achievement '+g.tone+" "+P+'" data-showcase-slot="'+y+'" draggable="true" data-achievement-label="'+d(g.label)+'"><span>'+d(g.label)+'</span><button type="button" data-clear-showcase="'+y+'" aria-label="'+d(g.label)+'を外す">×</button></li>'}).join(""),u=a.filter(function(f){return f.earned}).map(function(f){return'<button type="button" class="codex-showcase__source '+f.tone+" codex-showcase__source--"+(f.rarity||"common")+'" draggable="true" data-showcase-source="'+d(f.label)+'"><span>'+d(f.label)+"</span></button>"}).join(""),b=z()>=q?"全事件を完全制覇":e===0?"最初の事件を捜査中":"全"+D.length+"件中 "+e+"件を解決済み";return'<div class="codex-showcase" id="codexShowcase"><div class="codex-showcase__header"><span class="codex-showcase__eyebrow">PROGRESS STATUS</span><h6>進捗状況</h6></div><div class="codex-showcase__body"><label class="codex-showcase__identity"><span>ユーザー名</span><input id="showcaseUsername" maxlength="16" value="'+d(n)+'"></label><div class="codex-showcase__hero"><div class="codex-showcase__stamp">★ '+z()+" / "+q+'</div><div class="codex-showcase__quote">'+d(b)+'</div></div><div class="codex-showcase__metrics"><div class="codex-showcase__metric"><span>解決済みケース</span><strong>'+e+" / "+D.length+'</strong></div><div class="codex-showcase__metric"><span>未解決イベント</span><strong>'+F()+' 件</strong></div><div class="codex-showcase__metric"><span>推奨難易度</span><strong>'+d(N[W(t.settings.endlessUnits)]||"標準")+'</strong></div><div class="codex-showcase__metric"><span>獲得バッジ</span><strong>'+i+" / "+a.length+'</strong></div></div><div class="codex-showcase__achievement-head"><span>表示する実績</span><small>下の実績から5枠へドラッグ</small></div><div class="codex-showcase__tray" aria-label="取得済み実績">'+u+'</div><ul class="codex-showcase__achievements">'+l+"</ul></div></div>"}function pr(e){var n=e.querySelector("#codexShowcase");if(!n)return;var a=document.createElement("canvas"),i=1200,s=630,o=window.devicePixelRatio||1;a.width=i*o,a.height=s*o;var l=a.getContext("2d");l.scale(o,o);function u(x,m,A,B,M){if(l.roundRect){l.roundRect(x,m,A,B,M);return}l.beginPath(),l.moveTo(x+M,m),l.arcTo(x+A,m,x+A,m+B,M),l.arcTo(x+A,m+B,x,m+B,M),l.arcTo(x,m+B,x,m,M),l.arcTo(x,m,x+A,m,M),l.closePath()}var b=l.createLinearGradient(0,0,i,s);b.addColorStop(0,"#241a13"),b.addColorStop(1,"#5a2b20"),l.fillStyle=b,l.fillRect(0,0,i,s),l.fillStyle="rgba(255,255,255,0.08)";for(var f=0;f<12;f++)l.beginPath(),l.arc(70+f%6*210,110+Math.floor(f/6)*360,58,0,Math.PI*2),l.fill();l.save(),l.translate(40,40),l.fillStyle="#f3e4bc",u(0,0,i-80,s-80,34),l.fill(),l.lineWidth=3,l.strokeStyle="#b78d4d",l.stroke(),l.restore(),l.fillStyle="#8d302b",l.font='bold 25px "Hiragino Mincho ProN", serif',l.fillText("コード事件捜査局",80,98),l.fillStyle="#2b2318",l.font='700 46px "Hiragino Mincho ProN", serif',l.fillText("進捗状況",80,155),l.fillStyle="#6b5b3e",l.font='600 23px "Hiragino Kaku Gothic ProN", sans-serif',l.fillText("ユーザー名  "+(t.ranking.nickname||"あなた"),80,205),l.fillText("総合評価  "+z()+" / "+q,80,270),l.fillText("解決済み案件  "+Object.keys(t.stars).filter(function(x){return(t.stars[x]||0)>0}).length+" / "+D.length,80,320),l.fillText("未解決イベント  "+F()+" 件",80,370),l.fillText("推奨難易度  "+(N[W(t.settings.endlessUnits)]||"標準"),80,420);var y=Be();l.fillText("獲得バッジ  "+y.filter(function(x){return x.earned}).length+" / "+y.length,80,470),l.fillStyle="#4f3b24",l.font='700 25px "Hiragino Kaku Gothic ProN", sans-serif',l.fillText("選択した実績",685,145);var g=Be(),P=Sn(),E=Array.isArray(P.achievementLabels)?P.achievementLabels:[],_=E.map(function(x){return g.filter(function(m){return m.label===x&&m.earned})[0]}).filter(Boolean).slice(0,5);_.forEach(function(x,m){var A=205+m*64;l.fillStyle=x.tone==="good"?"#8d302b":"#3f6a8a",l.fillRect(685,A-18,15,15),l.fillStyle="#2b2318",l.font='600 22px "Hiragino Kaku Gothic ProN", sans-serif',l.fillText(x.label,720,A)}),l.fillStyle="#6b5b3e",l.font='600 18px "Hiragino Kaku Gothic ProN", sans-serif',l.fillText("CODE CASE BUREAU // PROGRESS CARD",80,545);var p=document.createElement("a");p.download="コード事件捜査局_進捗.png",p.href=a.toDataURL("image/png"),p.click()}function $t(e){if(!e)return;var n=e.querySelector(".codex-overlay");n&&n.remove();var a=Object.keys(t.stars).filter(function(c){return(t.stars[c]||0)>0}).length,i=[],s=Be();s.forEach(function(c,v){c.detailIndex=v});var o=0,l={case:"事件捜査",study:"学習記録",training:"連続演習",league:"ランキング",special:"特別捜査"},u=["common","rare","epic","legendary"],b={common:"一般バッジ",rare:"希少バッジ",epic:"稀バッジ",legendary:"伝説バッジ"},f=["case","study","training","league","special"];u.forEach(function(c){var v=s.filter(function(L){return(L.rarity||"common")===c});v.sort(function(L,ve){return f.indexOf(L.batch)-f.indexOf(ve.batch)});for(var h=0;h<v.length;h+=6){var S=v.slice(h,h+6),I="■ "+b[c]+(v.length>6?" "+(Math.floor(h/6)+1):""),R='<ul class="codex-achievements codex-achievement-page" data-achievement-page="'+o+'"'+(o?" hidden":"")+'><li class="codex-achievement-group">'+d(I)+"</li>";S.forEach(function(L){var ve=L.rarity==="legendary"?"【伝説】":L.rarity==="epic"?"【稀】":L.rarity==="rare"?"【希少】":"【一般】",En=L.earned?"codex-achievement--earned":"codex-achievement--locked",Pn=L.earned?' draggable="true" data-achievement-label="'+d(L.label)+'"':' aria-disabled="true"';R+='<li><button type="button" class="codex-achievement '+L.tone+" codex-achievement--"+(L.rarity||"common")+" "+En+'" data-achievement-index="'+L.detailIndex+'"'+Pn+"><span>"+d(ve)+" "+d(L.label)+'</span><span class="codex-achievement__batch">'+d(l[L.batch]||"特別捜査")+" · "+d(L.earned?"取得済み":"未取得")+" ›</span></button></li>"}),i.push(R+"</ul>"),o++}}),i=i.join("");var y=dr(),g=ur(),P='<div class="codex-overlay" role="dialog" aria-modal="true" aria-label="進捗と実績"><div class="codex-sheet"><button class="codex-sheet__close" id="btnCodexClose" type="button" aria-label="閉じる">×</button><div class="codex-sheet__header"><span class="codex-panel__eyebrow">SHAREABLE PROGRESS</span><h4>進捗と実績</h4></div><div class="codex-sheet__grid"><section class="codex-card"><h5>進捗</h5><ul class="codex-metrics"><li><span>総合評価</span><strong>'+z()+" / "+q+"</strong></li><li><span>解決済みケース</span><strong>"+a+" / "+D.length+"</strong></li><li><span>未解決イベント</span><strong>"+F()+" 件</strong></li><li><span>推奨難易度</span><strong>"+d(N[W(t.settings.endlessUnits)]||"標準")+"</strong></li><li><span>獲得バッジ</span><strong>"+s.filter(function(c){return c.earned}).length+" / "+s.length+' 個</strong></li></ul></section><section class="codex-card"><h5>実績</h5><div class="codex-achievement-pages">'+i+'</div><div class="codex-achievement-pager"><button type="button" id="btnAchievementPrev" aria-label="前の実績ページ">← 前へ</button><span id="achievementPageStatus">1 / '+o+'</span><button type="button" id="btnAchievementNext" aria-label="次の実績ページ">次へ →</button></div></section></div><div class="codex-share"><p class="codex-share__label">進捗状況プレビュー</p><div class="codex-share__preview">'+g+'</div><p class="codex-share__label">共有メッセージ</p><textarea class="codex-share__textarea" readonly>'+d(y)+'</textarea><div class="codex-share__actions"><button class="codex-panel__cta" id="btnSaveCodexPhoto" type="button">写真にする</button><button class="codex-panel__cta" id="btnCopyCodexShare" type="button">コピーする</button><button class="codex-panel__secondary" id="btnShareCodex" type="button">共有する</button></div></div></div><div class="codex-achievement-popover" id="achievementPopover" role="tooltip" hidden></div></div>';e.insertAdjacentHTML("beforeend",P);var E=e.querySelector(".codex-sheet");E&&E.addEventListener("click",function(c){c.stopPropagation()});function _(){var c=E?E.scrollTop:0,v=window.scrollX,h=window.scrollY;$t(e);var S=e.querySelector(".codex-sheet");S&&(S.scrollTop=c),window.scrollTo(v,h),requestAnimationFrame(function(){var I=e.querySelector(".codex-sheet");I&&(I.scrollTop=c),window.scrollTo(v,h)})}var p=e.querySelector(".codex-overlay");p&&p.addEventListener("click",function(){p.remove()});var x=e.querySelector("#btnCodexClose");x&&x.addEventListener("click",function(){p.remove()});var m=e.querySelector("#achievementPopover"),A=0,B=e.querySelectorAll("[data-achievement-page]"),M=e.querySelector("#achievementPageStatus"),O=e.querySelector("#btnAchievementPrev"),k=e.querySelector("#btnAchievementNext");function T(c){A=Math.max(0,Math.min(B.length-1,c)),Array.prototype.forEach.call(B,function(v,h){v.hidden=h!==A}),M&&(M.textContent=A+1+" / "+B.length),O&&(O.disabled=A===0),k&&(k.disabled=A===B.length-1),m&&(m.hidden=!0)}O&&O.addEventListener("click",function(){T(A-1)}),k&&k.addEventListener("click",function(){T(A+1)}),T(0);function ue(c){var v;c.earned?v="条件達成済み":c.lowerIsBetter?v="あと "+Math.max(0,c.current-c.target)+" "+c.unit+"減らす":v="あと "+Math.max(0,c.target-c.current)+" "+c.unit;var h=c.current+" "+c.unit+" / 目標 "+c.target+" "+c.unit;return'<span class="codex-achievement-detail__eyebrow">'+d(c.earned?"UNLOCKED":"HOW TO UNLOCK")+"</span><b>"+d(c.label)+"</b><p>"+d(c.how)+'</p><div class="codex-achievement-detail__progress"><span>'+d(h)+"</span><strong>"+d(v)+"</strong></div>"+(c.note?"<small>"+d(c.note)+"</small>":"")}function le(c,v){if(m){var h=14,S=m.offsetWidth||280,I=m.offsetHeight||150,R=c+h,L=v+8;R+S>window.innerWidth-10&&(R=Math.max(10,c-S-h)),L+I>window.innerHeight-10&&(L=Math.max(10,window.innerHeight-I-10)),m.style.left=R+"px",m.style.top=L+"px"}}function Z(c,v,h,S){if(!(!m||!v)){if(m.innerHTML=ue(v),m.hidden=!1,Array.prototype.forEach.call(e.querySelectorAll("[data-achievement-index]"),function(R){R.classList.remove("selected")}),c.classList.add("selected"),typeof h!="number"){var I=c.getBoundingClientRect();h=I.right,S=I.top}le(h,S)}}function G(c){m&&(m.hidden=!0),c&&c.classList.remove("selected")}var V=null;function J(c){V=c,Array.prototype.forEach.call(e.querySelectorAll("[data-achievement-index]"),function(v){v.classList.toggle("picked",v.getAttribute("data-achievement-label")===c)}),Array.prototype.forEach.call(e.querySelectorAll("[data-showcase-source]"),function(v){v.classList.toggle("picked",v.getAttribute("data-showcase-source")===c)})}function Te(c,v){var h=s.some(function(R){return R.earned&&R.label===v});if(h){for(var S=Sn(),I=Array.isArray(S.achievementLabels)?S.achievementLabels.slice(0,5):[null,null,null,null,null];I.length<5;)I.push(null);I=I.map(function(R,L){return R===v&&L!==c?null:R}),I[c]=v,S.achievementLabels=I,H(t),_()}}Array.prototype.forEach.call(e.querySelectorAll("[data-achievement-index]"),function(c){var v=s[parseInt(c.getAttribute("data-achievement-index"),10)];v.earned&&c.addEventListener("dragstart",function(h){J(v.label),h.dataTransfer&&(h.dataTransfer.effectAllowed="move",h.dataTransfer.setData("text/plain",v.label))}),c.addEventListener("pointerenter",function(h){h.pointerType!=="touch"&&Z(c,v,h.clientX,h.clientY)}),c.addEventListener("pointermove",function(h){h.pointerType!=="touch"&&m&&!m.hidden&&le(h.clientX,h.clientY)}),c.addEventListener("pointerleave",function(h){h.pointerType!=="touch"&&G(c)}),c.addEventListener("focus",function(){Z(c,v)}),c.addEventListener("blur",function(){G(c)}),c.addEventListener("click",function(h){v.earned&&J(v.label),(h.pointerType==="touch"||!window.matchMedia("(hover:hover)").matches)&&(m&&!m.hidden&&c.classList.contains("selected")?G(c):Z(c,v,h.clientX||void 0,h.clientY||void 0))})}),Array.prototype.forEach.call(e.querySelectorAll("[data-showcase-source]"),function(c){var v=c.getAttribute("data-showcase-source");c.addEventListener("dragstart",function(h){J(v),h.dataTransfer&&(h.dataTransfer.effectAllowed="copy",h.dataTransfer.setData("text/plain",v))}),c.addEventListener("click",function(){J(v)})}),Array.prototype.forEach.call(e.querySelectorAll("[data-showcase-slot]"),function(c){var v=parseInt(c.getAttribute("data-showcase-slot"),10),h=c.getAttribute("data-achievement-label");h&&c.addEventListener("dragstart",function(S){J(h),S.dataTransfer&&(S.dataTransfer.effectAllowed="move",S.dataTransfer.setData("text/plain",h))}),c.addEventListener("dragover",function(S){S.preventDefault(),c.classList.add("dragover"),S.dataTransfer&&(S.dataTransfer.dropEffect="move")}),c.addEventListener("dragleave",function(){c.classList.remove("dragover")}),c.addEventListener("drop",function(S){S.preventDefault(),c.classList.remove("dragover");var I=S.dataTransfer?S.dataTransfer.getData("text/plain"):V;I&&Te(v,I)}),c.addEventListener("click",function(S){S.target.closest("[data-clear-showcase]")||V&&Te(v,V)})}),Array.prototype.forEach.call(e.querySelectorAll("[data-clear-showcase]"),function(c){c.addEventListener("click",function(v){v.stopPropagation();var h=parseInt(c.getAttribute("data-clear-showcase"),10),S=Sn(),I=Array.isArray(S.achievementLabels)?S.achievementLabels.slice(0,5):[null,null,null,null,null];I[h]=null,S.achievementLabels=I,H(t),_()})});var oe=e.querySelector("#showcaseUsername");oe&&(oe.addEventListener("click",function(c){c.stopPropagation()}),oe.addEventListener("change",function(){we(oe.value),_()}));var ce=e.querySelector("#btnCopyCodexShare");ce&&ce.addEventListener("click",function(){navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(y).then(function(){ce.textContent="コピー済み"}):ce.textContent="コピーできません"});var ge=e.querySelector("#btnShareCodex");ge&&ge.addEventListener("click",function(){navigator.share?navigator.share({title:"コード事件捜査局 進捗",text:y}).catch(function(){}):navigator.clipboard&&navigator.clipboard.writeText&&navigator.clipboard.writeText(y).then(function(){ge.textContent="共有文をコピー"})});var $=e.querySelector("#btnSaveCodexPhoto");$&&$.addEventListener("click",function(){pr(e),$.textContent="保存しました",setTimeout(function(){$&&($.textContent="写真にする")},1400)})}var fr=["第1部 C++入門 ― 入出力・ポインタ・関数","第2部 データ構造 ― 配列・文字列・構造体","第3部 クラス設計 ― 基本から後片付けまで","第4部 継承と多態性","第5部 Pythonへの転生 ― クラスとTkinter"];function br(){var e=!!t.settings.studyModeActive,n="",a=0,i=[];function s(){i.length&&(n+='<h3 class="groupheading">'+d(fr[a]||"第"+(a+1)+"部")+'</h3><div class="stagegrid'+(e?" study-mode":"")+'">'+i.join("")+"</div>",i=[])}D.forEach(function(_,p){var x=t.stars[_.id]||0,m=!!t.studyCompleted[_.id],A=t.studyMedal[_.id],B=m?'<span class="studydonebadge">'+w(A?"trophy":"check")+" 学習済み</span>":e?'<span class="studyhint">'+w("book")+" 学習パートへ</span>":"";i.push('<button class="stagecard'+(_.isBoss?" boss":"")+'" data-idx="'+p+'" aria-label="'+d(_.title)+'"><div class="row1"><span class="emoji">'+ie(_.id,_.isBoss)+'</span><span class="idx">'+(_.isBoss?"BOSS NODE":"NODE "+String(p+1).padStart(2,"0"))+"</span></div><h3>"+d(_.title)+'</h3><div class="sub">'+d(_.sub)+" ・ "+d(_.mon)+"</div>"+B+'<div class="stars">'+Ee(x)+"</div></button>"),_.isBoss&&(s(),a++)}),s();var o=t.endless,l=o.correct+o.wrong,u=l>0?Math.round(o.correct/l*100):0,b=t.settings.endlessUnits,f=t.settings.endlessDiffs,y=t.settings.endlessTiers,g=!b||b.length===0?"対象: 全"+Q.length+"単元":"対象: "+b.length+"/"+Q.length+"単元に絞り込み中";g+=!f||f.length===0?" ・ 難易度: 全て":" ・ 難易度: "+f.map(function(_){return N[_]}).join("/"),g+=!y||y.length===0?" ・ 重要度: 全て":" ・ 重要度: "+y.map(function(_){return ae[_]}).join("/");var P=W(b),E=F();return""+Qe()+'<main class="case-office"><aside class="case-sidebar"><div class="office-plate"><span>'+w("target")+'</span><div><small>BUG INVESTIGATION UNIT</small><h2>事件管理簿</h2></div></div><button class="case-nav active"><span>'+w("archive")+"</span><b>事件一覧</b><small>"+D.length+'件</small></button><button class="case-nav league-nav" id="btnRanking"><span>'+w("trophy")+'</span><b>ランキング</b><small>ルームで競う</small></button><button class="case-nav" id="btnEndless"><span>'+w("terminal")+'</span><b>総合捜査</b><small>1000本ノック</small></button><button class="case-nav" id="btnReview2"><span>'+w("review")+"</span><b>未解決</b><small>"+E+'件</small></button><button class="case-nav" id="btnUnitPicker"><span>'+w("target")+"</span><b>捜査条件</b><small>"+d(N[P])+'</small></button><div class="case-stats"><h3>捜査記録</h3><dl><div><dt>解決評価</dt><dd class="num">'+z()+" / "+q+'</dd></div><div><dt>連続正解</dt><dd class="num">'+o.streak+'</dd></div><div><dt>正答率</dt><dd class="num">'+u+'%</dd></div></dl></div><button class="mode-file '+(e?"study":"quest")+'" id="btnModeToggle" aria-pressed="'+(e?"true":"false")+'"><span>'+w(e?"book":"sword")+"</span><b>"+(e?"証拠を読む":"推理に挑む")+'</b><small>章選択時の動作</small></button><button class="alt-file'+(t.settings.allowAlt?" on":"")+'" id="btnAltToggle" aria-pressed="'+(t.settings.allowAlt?"true":"false")+'"><span class="alt-file-label">'+w(t.settings.allowAlt?"unlock":"lock")+" 別解 "+(t.settings.allowAlt?"採用":"不採用")+'</span><span class="alt-switch" aria-hidden="true"><span class="alt-switch-knob"></span></span></button></aside><section class="evidence-board"><header class="board-head"><div><small>ACTIVE CASE FILES</small><h2>プログラム事件一覧</h2></div><p>不具合の証拠を読み、すべての事件を解決せよ。</p></header>'+cr()+'<div class="case-scroll">'+n+'</div></section><aside class="desk-evidence"><div class="desk-lamp">'+w("search")+"</div><h3>本日の捜査</h3><p>"+d(g)+"</p><dl><div><dt>連続解決</dt><dd>"+o.streak+"</dd></div><div><dt>最高記録</dt><dd>"+o.bestStreak+"</dd></div></dl>"+(sr(o)?'<button id="btnEndlessResume" class="resume-file">'+w("review")+" 前回の捜査を再開("+(o.queue.length-o.pos)+"問残り)</button>":"")+'<button id="btnEndlessDesk">捜査を開始</button>'+or()+'</aside></main><p class="footer-note">捜査記録はこの端末に自動保存されます。</p>'}function Gn(e,n){r.stageIndex=e,r.screen="lesson",r.lessonFromBattle=!!n,Y()}function Kn(){Ze(),r.curQ=null,r.locked=!1,r.screen="endless",Y()}function Jt(){var e=Object.keys(t.missed);r.reviewQueue=$e(e.map(function(n){return Re[n]}).filter(function(n){return n!==void 0})),r.reviewPos=0,r.reviewStats={correct:0,wrong:0},r.curQ=null,r.locked=!1,r.screen="review",Y()}function mr(){var e=r.reviewQueue[r.reviewPos];return j[e]}function gr(){if(r.reviewQueue.length===0)return""+Qe()+'<div class="battlebar"><button class="backbtn" id="btnHome">← 地図へ戻る</button></div><div class="frame result"><span class="bigemoji">'+w("check")+'</span><h2>間違いノートは空っぽです</h2><p>今のところ間違えた問題は記録されていません。各章の戦闘や1000本ノックで間違えると、その問題が自動的にここへ集まってきます。</p><div class="resultbtns"><button class="ghost" id="btnMap">地図へ戻る</button></div></div>';if(r.reviewPos>=r.reviewQueue.length){var e=F();return""+Qe()+'<div class="battlebar"><button class="backbtn" id="btnHome">← 地図へ戻る</button></div><div class="frame result"><span class="bigemoji">'+w("review")+"</span><h2>この周の復習が終わりました</h2><p>正解 "+r.reviewStats.correct+"問 ／ 誤答 "+r.reviewStats.wrong+"問。間違いノートには、まだ"+e+'問残っています。</p><div class="resultbtns">'+(e>0?'<button class="primary" id="btnReviewAgain">もう一度復習する →</button>':"")+'<button class="ghost" id="btnMap">地図へ戻る</button></div></div>'}if(!r.curQ){var n=mr();r.curQ=n.q,r.endlessSrc=n}var a=Pe(r.curQ);return""+Qe()+'<div class="battlebar"><button class="backbtn" id="btnHome">← 地図へ戻る</button></div><div class="frame endlessbar"><div class="estat"><span class="elabel">出題元</span><span class="evalue">'+d(r.endlessSrc.srcTitle)+'</span></div><div class="estat"><span class="elabel">この周の進捗</span><span class="evalue">'+(r.reviewPos+1)+" / "+r.reviewQueue.length+'</span></div><div class="estat"><span class="elabel">間違いノート残り</span><span class="evalue">'+F()+'問</span></div></div><div class="frame qcard" id="qcard"><div class="qmeta"><span>'+w("review")+' 復習モード <span class="tierbadge t'+r.endlessSrc.tier+'">'+d(ae[r.endlessSrc.tier])+"</span></span><span>"+d(r.endlessSrc.srcSub)+'</span></div><div class="qlead">'+a.qlead+"</div>"+a.bodyHtml+a.answerHtml+'</div><div id="feedbackSlot"></div>'}function vr(e){var n=D[r.stageIndex],a=1;if(e){var i=r.heroHP/100;r.wrong===0?a=3:i>=.5?a=2:a=1;var s=t.stars[n.id]||0;a>s&&(t.stars[n.id]=a),r.stageIndex+2>t.unlocked&&(t.unlocked=r.stageIndex+2),t.unlocked>D.length&&(t.unlocked=D.length),H(t)}var o=r.failReason==="outofq"?'<span class="bigemoji">'+w("alert")+"</span><h2>ミッション未完了</h2><p>設問はすべて解き終えたが、"+d(n.mon)+"にはまだ息がある。誤答が多いと決定打が足りない。訓練場で復習してもう一度挑もう。</p>":'<span class="bigemoji">'+w("shield")+"</span><h2>戦闘継続不能</h2><p>"+d(n.mon)+"にHPを削り切られてしまった。訓練場で復習してもう一度挑もう。</p>",l=e?'<span class="bigemoji">'+w("trophy")+"</span><h2>"+d(n.mon)+'を撃破した！</h2><div class="starsline">'+Ee(a)+"</div><p>誤答"+r.wrong+"回で切り抜けた。単元「"+d(n.sub)+"」はもう怖くない。</p>":o,u=r.stageIndex+1,b=e&&u<D.length;return""+Qe()+'<div class="frame result">'+l+'<div class="resultbtns"><button class="ghost" id="btnReview">'+w("book")+' 訓練場で見直す</button><button class="ghost" id="btnRetry">'+(e?"もう一度挑む":"再挑戦する")+"</button>"+(b?'<button class="primary" id="btnNext">次の間へ進む →</button>':"")+'<button class="ghost" id="btnMap">地図へ戻る</button></div></div>'+(!b&&e&&u>=D.length?'<div class="frame allclear"><h2>'+w("trophy")+" 全"+D.length+'章 制覇</h2><p>期末試験の範囲をひと通り旅した。総獲得星 <span class="num">'+z()+" / "+q+"</span>。仕上げにもう一周して星を集めよう。</p></div>":"")}function Y(){var e=document.getElementById("app");if(Cn&&(Cn(),Cn=null),document.body.classList.toggle("case-map-screen",r.screen==="map"),r.screen==="map"){let p=function(){a&&(a.classList.add("is-scrolling"),clearTimeout(s),s=setTimeout(function(){a.classList.remove("is-scrolling")},120))};e.innerHTML=br(),Array.prototype.forEach.call(e.querySelectorAll(".stagecard:not(.locked)"),function(x){x.addEventListener("click",function(){if(!x.disabled){x.disabled=!0,x.classList.add("opening"),r.curQ=null;var m=parseInt(x.getAttribute("data-idx"),10);requestAnimationFrame(function(){t.settings.studyModeActive?kn(m):Gn(m,!1)})}})});var n=document.getElementById("btnSoloCollapse");n&&n.addEventListener("click",function(){t.settings.soloCollapsed=!t.settings.soloCollapsed,H(t);var x=n.closest(".solo-momentum");x&&x.classList.toggle("collapsed",t.settings.soloCollapsed),n.textContent=t.settings.soloCollapsed?"＋":"−",n.setAttribute("aria-expanded",String(!t.settings.soloCollapsed)),n.setAttribute("aria-label",t.settings.soloCollapsed?"今日の一歩を展開":"今日の一歩を最小化")});var a=e.querySelector(".case-office"),i=e.querySelector(".case-scroll"),s=0;i&&i.addEventListener("scroll",p,{passive:!0}),window.addEventListener("scroll",p,{passive:!0}),Cn=function(){clearTimeout(s),i&&i.removeEventListener("scroll",p),window.removeEventListener("scroll",p)},document.getElementById("btnModeToggle").addEventListener("click",function(){t.settings.studyModeActive=!t.settings.studyModeActive,H(t),Y()});var o=document.getElementById("btnCodexOpen");o&&o.addEventListener("click",function(x){x.preventDefault(),$t(e)}),document.getElementById("btnEndless").addEventListener("click",function(){Kn()}),document.getElementById("btnRanking").addEventListener("click",function(){r.curQ=null,r.screen="ranking",Y()}),document.getElementById("btnEndlessDesk").addEventListener("click",function(){Kn()});var l=document.getElementById("btnEndlessResume");l&&l.addEventListener("click",function(){Kn()}),document.getElementById("btnAltToggle").addEventListener("click",function(){t.settings.allowAlt=!t.settings.allowAlt,H(t),this.classList.toggle("on",t.settings.allowAlt),this.setAttribute("aria-pressed",String(t.settings.allowAlt)),this.innerHTML='<span class="alt-file-label">'+w(t.settings.allowAlt?"unlock":"lock")+" 別解 "+(t.settings.allowAlt?"採用":"不採用")+'</span><span class="alt-switch" aria-hidden="true"><span class="alt-switch-knob"></span></span>'}),document.getElementById("btnUnitPicker").addEventListener("click",function(){be()}),document.getElementById("btnReview2").addEventListener("click",function(){Jt()})}else if(r.screen==="ranking")e.innerHTML=Ue(),hn(e);else if(r.screen==="ranking-room")e.innerHTML=vn(),yn(e);else if(r.screen==="unitPicker")e.innerHTML=rn(),sn(e);else if(r.screen==="studyLoading")e.innerHTML=_n();else if(r.screen==="study")e.innerHTML=Bn(),An(e);else if(r.screen==="lesson")e.innerHTML=nn(),tn(e);else if(r.screen==="battle")e.innerHTML=ln(),document.getElementById("btnHome").addEventListener("click",function(){r.curQ=null,r.screen="map",Y()}),document.getElementById("btnReview").addEventListener("click",function(){Gn(r.stageIndex,!0)}),me(e);else if(r.screen==="endless")e.innerHTML=on(),document.getElementById("btnHome").addEventListener("click",function(){r.curQ=null,r.screen="map",Y()}),document.getElementById("btnEndlessFilter").addEventListener("click",function(){r.curQ=null,be()}),document.getElementById("btnPauseEndless").addEventListener("click",function(){H(t),r.curQ=null,r.screen="map",Y()}),me(e);else if(r.screen==="endless-result")e.innerHTML=cn(),document.getElementById("btnHome").addEventListener("click",function(){r.curQ=null,r.screen="map",Y()}),document.getElementById("btnEndlessAgain").addEventListener("click",function(){r.curQ=null,Je(),r.screen="endless",Y()}),document.getElementById("btnEndlessSettings").addEventListener("click",function(){r.curQ=null,be()});else if(r.screen==="review"){e.innerHTML=gr();var u=document.getElementById("btnHome");u&&u.addEventListener("click",function(){r.curQ=null,r.screen="map",Y()});var b=document.getElementById("btnMap");b&&b.addEventListener("click",function(){r.curQ=null,r.screen="map",Y()});var f=document.getElementById("btnReviewAgain");f&&f.addEventListener("click",function(){Jt()}),document.getElementById("qcard")&&me(e)}else if(r.screen==="result-win"||r.screen==="result-lose"){var y=r.screen==="result-win";e.innerHTML=vr(y);var g=document.getElementById("btnReview");g&&g.addEventListener("click",function(){r.curQ=null,Gn(r.stageIndex,!1)});var P=document.getElementById("btnRetry");P&&P.addEventListener("click",function(){r.curQ=null,xe(r.stageIndex,r.startTier)});var E=document.getElementById("btnNext");E&&E.addEventListener("click",function(){r.curQ=null,xe(r.stageIndex+1,r.startTier)});var _=document.getElementById("btnMap");_&&_.addEventListener("click",function(){r.curQ=null,r.screen="map",Y()})}}function wi(){lr(),ze(),Y()}export{fr as SECTION_TITLES,wi as boot,mr as currentReviewQuestion,Be as getCodexAchievements,Kn as openEndless,Gn as openLesson,Jt as openReview,Y as render,or as renderCodexPanel,br as renderMap,vr as renderResult,gr as renderReview,cr as renderSoloMomentum,Qe as renderTopbar};
