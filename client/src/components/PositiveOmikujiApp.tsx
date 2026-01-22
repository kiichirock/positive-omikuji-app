import React, { useState } from 'react';
import { Sparkles, Sun, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PositiveOmikujiApp = () => {
  const [gameState, setGameState] = useState<'idle' | 'shaking' | 'result'>('idle');
  const [currentMessage, setCurrentMessage] = useState<{
    title: string;
    color: string;
    text: string;
    luckyItem: string;
  } | null>(null);

  // タイトル（ランク）
  // ※ユーザー要望により全て「大吉」に統一（色はランダムで変わる）
  const titles = [
    { text: "大吉", color: "text-rose-600" },
    { text: "大吉", color: "text-orange-600" },
    { text: "大吉", color: "text-blue-600" },
    { text: "大吉", color: "text-pink-600" },
    { text: "大吉", color: "text-purple-600" },
    { text: "大吉", color: "text-yellow-600" },
    { text: "大吉", color: "text-red-600" },
    { text: "大吉", color: "text-emerald-600" }
  ];

  // ラッキーアイテム（ビール・発泡酒・新ジャンル銘柄）
  // ※ノンアルコールを除外
  const luckyItems = [
    "アサヒ スーパードライ", "キリン 一番搾り", "サッポロ 生ビール黒ラベル", "サントリー ザ・プレミアム・モルツ", "ヱビスビール",
    "キリン ラガービール", "サッポロ クラシック", "アサヒ 生ビール（マルエフ）", "オリオン ザ・ドラフト", "サントリー 金麦",
    "キリン のどごし<生>", "キリン 本麒麟", "アサヒ クリアアサヒ", "サッポロ 麦とホップ", "サントリー パーフェクトサントリービール",
    "キリン 淡麗グリーンラベル", "アサヒ スタイルフリー", "サッポロ ゴールドスター", 
    "よなよなエール", "インドの青鬼", "水曜日のネコ", "銀河高原ビール", "COEDO 伽羅-Kyara-",
    "アサヒ スーパードライ 生ジョッキ缶", "キリン スプリングバレー 豊潤", "サントリー 金麦〈糖質75％オフ〉", "サッポロ 北海道生搾り"
  ];

  // 一般的な運勢 ＋ お酒への誘いメッセージ（約100種）
  const messages = [
    "願望：叶うでしょう。祝杯の準備を今すぐ始めてください。",
    "待人：来ます。居酒屋の個室を予約して待つのが吉です。",
    "失物：出ます。探すのをやめて飲みに行けば、ふと思い出すでしょう。",
    "旅行：吉。旅先での地酒との出会いが、あなたの運命を変えます。",
    "商売：利益あり。取引先との会食が大きな契約に繋がる予感。",
    "学問：安心して勉学せよ。終わった後のビールが知識を定着させます。",
    "争事：勝ちます。勝利の美酒に酔いしれる夜になるでしょう。",
    "転居：よろし。新しい街の行きつけのバーを最初に探しましょう。",
    "出産：安産です。祝い酒の樽を用意しておいてください。",
    "病気：軽し。アルコール消毒（適量）で気力も回復するでしょう。",
    "縁談：調う。合コンや飲み会には積極的に参加すべきです。",
    "求人：良い職あり。歓迎会で主役になれる職場が見つかります。",
    "相場：買え。浮いた利益で高級なワインを開けましょう。",
    "天候：晴れ。ビアガーデン日和です。外で飲むビールは格別でしょう。",
    "健康：良好。肝機能も絶好調、今日はとことん飲める日です。",
    "恋愛：愛が深まります。ほろ酔い気分のあなたが最も魅力的です。",
    "金運：上昇中。臨時収入で後輩に奢るとさらに運気が上がります。",
    "仕事：順調。プレゼン成功の打ち上げ場所を決めておきましょう。",
    "人間関係：円満。腹を割って話すには、酒の力を借りるのが一番です。",
    "悩み：解決します。グラスを空にする頃には、悩みなど忘れています。",
    "進路：開ける。迷ったら、好きなお酒の種類で決めるのも一興です。",
    "家庭：円満。今夜は早く帰って、家族と晩酌を楽しみましょう。",
    "友情：深まる。旧友とのサシ飲みが、明日への活力を生みます。",
    "勝負：勝つ。祝勝会のビールかけの準備はできていますか？",
    "冒険：吉。初めて入る赤提灯の店に幸運が隠されています。",
    "直感：冴える。メニュー選びに迷いは不要、最初に目についたものを。",
    "人気：急上昇。幹事を引き受けると、あなたの評価が爆上がりします。",
    "再会：あり。学生時代の友人と朝まで語り明かすことになるでしょう。",
    "発見：あり。自分好みの隠し酒を見つけることができるはずです。",
    "約束：守られる。飲み会のドタキャンもなく、楽しい時間が過ごせます。",
    "努力：報われる。仕事終わりの一杯が、いつもより五臓六腑に染みます。",
    "過去：振り返るな。過ぎたことより、次の一杯のことを考えましょう。",
    "未来：明るい。黄金色のビールのように輝かしい未来が待っています。",
    "変化：吉。いつもと違う銘柄を試すと、新しい扉が開きます。",
    "休息：必要。今日は全てを忘れて、泥酔するまで寝るのが最良です。",
    "情報：入る。酒場の噂話の中に、人生を変えるヒントがあります。",
    "計画：順調。飲み会のスケジュール調整もスムーズに進むでしょう。",
    "節約：不要。今日だけは財布の紐を緩めて、豪遊しても許されます。",
    "創造：湧く。微酔い状態の時に、素晴らしいアイデアが降ってきます。",
    "勇気：出る。シラフでは言えないことも、今夜なら伝えられます。",
    "感謝：伝わる。お酌をするその所作に、あなたの心が表れています。",
    "笑顔：増える。炭酸の泡の数だけ、笑顔が弾ける夜になります。",
    "魅力：開花。赤らんだ頬が、異性の心を鷲掴みにするでしょう。",
    "信頼：厚くなる。二日酔いでも遅刻しない姿勢が評価されます。",
    "食欲：旺盛。お酒もおつまみも進む、至福の時間が約束されています。",
    "睡眠：快眠。ナイトキャップ（寝酒）が、極上の夢へと誘います。",
    "掃除：吉。空き缶や空き瓶を片付けると、さらに運気がアップします。",
    "買い物：吉。ジャケ買いしたワインが、大当たりする予感です。",
    "相談：吉。バーのマスターが、人生の深淵な答えを教えてくれます。",
    "手紙：吉。酔った勢いで書くラブレターは、意外と情熱的で成功します。",
    "方角：北が吉。北海道産のビールや食材を選ぶと大吉です。",
    "方角：南が吉。沖縄のビールや泡盛で南国気分を味わいましょう。",
    "方角：西が吉。関西のノリで楽しく騒ぐのが開運の鍵です。",
    "方角：東が吉。東京の下町酒場で人情に触れると良いことがあります。",
    "色：金が吉。黄金色の飲み物が、金運を強力に引き寄せます。",
    "色：赤が吉。赤ワインやトマトハイが、情熱を呼び覚まします。",
    "色：黒が吉。黒ビールやスタウトで、大人の落ち着きを演出しましょう。",
    "色：白が吉。マッコリや日本酒（濁り）が、心を浄化してくれます。",
    "数：3が吉。とりあえず3軒ハシゴすると、神がかり的な展開に。",
    "数：7が吉。7杯目を飲んだ時、奇跡が起こるかもしれません。",
    "音楽：吉。カラオケで熱唱した後のハイボールは格別です。",
    "映画：吉。映画を見ながらの晩酌は、最高の現実逃避になります。",
    "読書：吉。バーで一人静かに本を読む姿が、知的で素敵です。",
    "運動：吉。スポーツ観戦しながらのビールは、カロリーゼロです。",
    "温泉：吉。湯上がりの一杯のために、生きていると言っても過言ではありません。",
    "料理：吉。おつまみを自作すると、料理の腕前がプロ級に。",
    "園芸：吉。ミントを育てて、自家製モヒートを作りましょう。",
    "釣り：吉。釣果があってもなくても、反省会という名の飲み会は楽しい。",
    "賭事：ほどほどに。勝っても負けても、結局は飲む口実になります。",
    "流行：乗るべし。話題のクラフトビール店に行くと、流行の最先端に。",
    "伝統：守るべし。老舗の居酒屋の暖簾をくぐると、心が整います。",
    "早起き：吉。朝からシャンパンを飲む「朝シャン」で優雅な一日を。",
    "夜更かし：吉。深夜のラーメンとビールは、背徳的な味がします。",
    "秘密：守る。酔っても口を滑らせないあなたは、信頼の塊です。",
    "挑戦：吉。度数の高いお酒に挑む勇気が、道を開きます。",
    "反省：不要。昨夜の記憶がなくても、財布とスマホがあれば無傷です。",
    "直感：信じよ。「もう一軒行きたい」という直感は、大正解です。",
    "協調：吉。ペースを合わせて飲むことで、チームワークが強固になります。",
    "個性：吉。周りに流されず、自分の飲みたいものを注文しましょう。",
    "忍耐：不要。我慢せずに「おかわり！」と叫ぶことがストレス解消に。",
    "礼儀：吉。「いただきます」と「ごちそうさま」が、次の酒を呼びます。",
    "歴史：吉。ヴィンテージワインのように、あなたも歳を重ねて深みが出ます。",
    "科学：吉。二日酔いのメカニズムを語るより、迎え酒で実践あるのみ。",
    "哲学：吉。「酒とは何か」を語り合えば、夜は短すぎます。",
    "芸術：吉。グラスに注がれる液体の美しさは、もはや芸術作品です。",
    "外交：吉。言葉が通じなくても、乾杯一つで世界中と友達になれます。",
    "平和：吉。世界中の人が飲み交わせば、争いはなくなります。",
    "自己：肯定。酔っ払った自分も愛してあげましょう。あなたは可愛いです。",
    "帰宅：吉。千鳥足で帰る道のりすら、冒険のワンシーンです。",
    "入浴：注意。飲酒後の風呂は控えめに、シャワーでさっぱりしましょう。",
    "散歩：吉。酔い覚ましの夜風が、新しいインスピレーションを運びます。",
    "記憶：曖昧。楽しかった感情だけが残れば、それが最高の結果です。",
    "予感：的中。「今日は酔いそうだ」という予感は、確信に変わります。",
    "奇跡：起こる。終電を逃した先に、運命の出会いが待っています。",
    "復活：あり。シジミ汁一杯で、不死鳥のように蘇るでしょう。",
    "本能：従え。理性を捨てて本能のままに飲む夜が、あっても良いのです。",
    "結論：飲む。何があってもなくても、結局は飲むのが正解です。",
    "全体：超大吉。とにかく今すぐ冷蔵庫を開けて、プシュッとしてください！"
  ];

  // 画面表示用の確率表（激渋に見せるためのフェイク）
  const displayProbabilities = [
    { label: "大吉 (SSR)", rate: "0.200%" },
    { label: "中吉 (SR)", rate: "3.000%" },
    { label: "小吉 (R)", rate: "15.000%" },
    { label: "吉 (N)", rate: "31.800%" },
    { label: "末吉 (N)", rate: "20.000%" },
    { label: "凶 (HN)", rate: "20.000%" },
    { label: "大凶 (DN)", rate: "10.000%" },
  ];

  const drawOmikuji = () => {
    if (gameState === 'shaking') return;

    setGameState('shaking');

    // 2秒間振る演出
    setTimeout(() => {
      // ランダムに要素を選択して組み合わせる
      const randomTitle = titles[Math.floor(Math.random() * titles.length)];
      const randomText = messages[Math.floor(Math.random() * messages.length)];
      const randomItem = luckyItems[Math.floor(Math.random() * luckyItems.length)];

      const result = {
        title: randomTitle.text,
        color: randomTitle.color,
        text: randomText,
        luckyItem: randomItem
      };

      setCurrentMessage(result);
      setGameState('result');
    }, 2000);
  };

  const resetGame = () => {
    setGameState('idle');
    setCurrentMessage(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* メインカード */}
      <Card className="relative z-10 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-4 border-primary/20 flex flex-col max-h-[90vh]">
        
        {/* ヘッダー */}
        <CardHeader className="bg-primary p-4 text-center relative overflow-hidden shadow-md flex-shrink-0">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 11px)' }}></div>
          <CardTitle className="text-2xl font-bold text-yellow-50 tracking-widest relative z-10 font-heading flex items-center justify-center gap-2">
            <Sun className="w-6 h-6 animate-spin-slow" />
            開運 みくじ
            <Sun className="w-6 h-6 animate-spin-slow" />
          </CardTitle>
        </CardHeader>

        {/* メインコンテンツエリア - スクロール可能に */}
        <CardContent className="flex-1 overflow-y-auto p-8 relative">
          
          {gameState === 'idle' && (
            <div className="text-center animate-fade-in flex flex-col items-center w-full">
              
              <p className="mb-6 text-stone-500 text-sm tracking-widest font-body">心を込めてボタンを押してください</p>
              
              {/* 着物キャラクター（SVG）- 普通の真面目なおみくじバージョン */}
              <div className="w-48 h-48 relative mb-8 drop-shadow-xl hover:scale-105 transition-transform duration-300">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* 着物（後ろ）- 赤色 */}
                  <path d="M40,180 L160,180 L150,100 L50,100 Z" fill="#b91c1c" />
                  <path d="M50,100 L20,130 L40,150 L60,120 Z" fill="#ef4444" /> {/* 左袖 */}
                  <path d="M150,100 L180,130 L160,150 L140,120 Z" fill="#ef4444" /> {/* 右袖 */}
                  
                  {/* 襟 */}
                  <path d="M85,100 L100,130 L115,100" fill="none" stroke="white" strokeWidth="8" />
                  
                  {/* 顔 */}
                  <circle cx="100" cy="70" r="35" fill="#fde047" /> {/* 肌 */}
                  <path d="M80,60 Q100,60 120,60" fill="none" stroke="#44403c" strokeWidth="2" strokeLinecap="round" /> {/* 眉毛 */}
                  <circle cx="85" cy="65" r="3" fill="#44403c" /> {/* 左目 */}
                  <circle cx="115" cy="65" r="3" fill="#44403c" /> {/* 右目 */}
                  <path d="M95,75 Q100,80 105,75" fill="none" stroke="#44403c" strokeWidth="2" strokeLinecap="round" /> {/* 口 */}
                  <circle cx="82" cy="75" r="4" fill="#fca5a5" opacity="0.6" /> {/* 頬 */}
                  <circle cx="118" cy="75" r="4" fill="#fca5a5" opacity="0.6" /> {/* 頬 */}
                  
                  {/*髪の毛 */}
                  <path d="M65,70 Q60,40 100,30 Q140,40 135,70" fill="#292524" />
                  <circle cx="65" cy="65" r="8" fill="#292524" />
                  <circle cx="135" cy="65" r="8" fill="#292524" />

                  {/* おみくじ箱（真面目） */}
                  <rect x="85" y="110" width="30" height="60" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
                  <text x="100" y="145" fontSize="16" textAnchor="middle" fill="#78350f" fontWeight="bold" style={{writingMode: 'vertical-rl', fontFamily: 'serif'}}>御籤</text>
                </svg>
              </div>

              <Button
                onClick={drawOmikuji}
                size="lg"
                className="w-full max-w-xs mb-8 rounded-full text-lg font-bold tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-primary hover:bg-primary/90"
              >
                おみくじを引く
              </Button>

              {/* 確率表（常時表示・シュールさの強調） */}
              <div className="w-full bg-stone-100 p-4 rounded border border-stone-300 shadow-inner">
                <h3 className="text-xs font-bold text-stone-600 mb-2 flex items-center justify-center gap-1 border-b border-stone-300 pb-2 font-body">
                  <AlertCircle size={12} />
                  本日の提供割合（理論値）
                </h3>
                <table className="w-full text-xs text-left font-mono">
                  <thead className="bg-stone-200 text-stone-600">
                    <tr>
                      <th className="p-1">等級</th>
                      <th className="p-1 text-right">確率</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayProbabilities.map((item, index) => (
                      <tr key={index} className="border-b border-stone-200 last:border-0">
                        <td className="p-1 text-stone-700">{item.label}</td>
                        <td className="p-1 text-right text-stone-500">{item.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[10px] text-stone-400 mt-2 text-center">
                  ※法令に基づき確率を表示しています。<br/>
                  ※実際の排出率は運勢により変動します。
                </p>
              </div>
            </div>
          )}

          {gameState === 'shaking' && (
            <div className="flex flex-col items-center justify-center h-64 animate-pulse">
              <div className="w-32 h-64 relative animate-bounce">
                <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-2xl">
                  <rect x="20" y="40" width="60" height="120" fill="#f59e0b" stroke="#78350f" strokeWidth="3" />
                  <text x="50" y="100" fontSize="24" textAnchor="middle" fill="#78350f" fontWeight="bold" style={{writingMode: 'vertical-rl', fontFamily: 'serif'}}>御籤</text>
                  {/* 振っている効果線 */}
                  <path d="M10,60 L0,50" stroke="#555" strokeWidth="2" />
                  <path d="M90,60 L100,50" stroke="#555" strokeWidth="2" />
                  <path d="M10,140 L0,150" stroke="#555" strokeWidth="2" />
                  <path d="M90,140 L100,150" stroke="#555" strokeWidth="2" />
                </svg>
              </div>
              <p className="mt-8 text-xl font-bold text-primary animate-pulse font-heading">念じてください...</p>
            </div>
          )}

          {gameState === 'result' && currentMessage && (
            <div className="text-center animate-in zoom-in duration-500 flex flex-col items-center">
              
              <div className="mb-2 relative inline-block">
                <Sparkles className="absolute -top-6 -left-6 text-yellow-400 w-8 h-8 animate-spin-slow" />
                <Sparkles className="absolute -bottom-6 -right-6 text-yellow-400 w-8 h-8 animate-spin-slow" />
                <h2 className={`text-6xl font-black ${currentMessage.color} drop-shadow-md font-heading tracking-tighter my-4`}>
                  {currentMessage.title}
                </h2>
              </div>

              <div className="w-full bg-stone-50 border-2 border-stone-200 p-6 rounded-xl shadow-inner mb-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 opacity-50"></div>
                
                <h3 className="text-sm font-bold text-stone-400 mb-2 uppercase tracking-widest border-b border-stone-200 pb-1">Lucky Item</h3>
                <p className="text-xl font-bold text-stone-800 mb-4 font-heading leading-relaxed">
                  {currentMessage.luckyItem}
                </p>
                
                <div className="w-full h-px bg-stone-200 my-4"></div>
                
                <h3 className="text-sm font-bold text-stone-400 mb-2 uppercase tracking-widest border-b border-stone-200 pb-1">Message</h3>
                <p className="text-lg text-stone-700 font-medium leading-loose font-body">
                  {currentMessage.text}
                </p>
              </div>

              <Button 
                onClick={resetGame}
                variant="outline"
                className="rounded-full px-8 border-2 border-stone-300 hover:bg-stone-100 hover:text-stone-800 transition-colors"
              >
                もう一度引く
              </Button>
              
              <div className="mt-6 text-xs text-stone-400">
                <p>#開運みくじ #大吉確定 #飲みに行こう</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PositiveOmikujiApp;
