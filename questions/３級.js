window.questionsData = [
  // 一問目
  {
    type: "choice",
    question: "差額はいくら？",
    desc: "実際有高 350,500円<br>帳簿残高 332,000円",
    choices: ["18,500円", "17,500円", "19,500円", "16,500円"],
    answer: 0,
    comment: "実際有高 - 帳簿残高だから..."
  },
  // 二問目
  {
    type: "choice",
    question: "次の問題",
    desc: "100円と120円の差額は？",
    choices: ["20円", "10円", "30円", "40円"],
    answer: 0,
    comment: "サンプル問題!!"
  },
  // 三問目
  {
    type: "input",
    question: "仕訳を入力しよう",
    desc: "現金の実際有高は350,500であった。帳簿残高との差額について雑損または雑役を計上しよう。<br>帳簿残高は332,000円である。",

    accounts: [
      { name: "現金", key: "genkin" },
      { name: "雑損", key: "zasson" },
      { name: "雑益", key: "zasseki" }
    ],

    choices: [0, 18500, 350500],

    answer: [
      { key: "genkin", side: "debit", amount: 350500 },
      { key: "zasseki", side: "credit", amount: 18500 }
    ],

    comment: "実際有高 350,500円 <br> 差額 18,500円"
  },
  // 四問目
  {
    type: "input",
    question: "仕訳を入力しよう",
    desc: "当座預金勘定の貸方残高は200,000円を借入金勘定に振り替える。",

    accounts: [
      { name: "当座預金", key: "touzayokin" },
      { name: "借入金", key: "kariirekin" }
    ],

    choices: [0, 200000, 350500],

    answer: [
      { key: "touzayokin", side: "debit", amount: 200000 },
      { key: "kariirekin", side: "credit", amount: 200000 }
    ],

    comment: "当座預金は借方、借入金は貸方だね！"
  },
  // 五問目
  {
    type: "input",
    question: "仕訳を入力しよう",
    desc: "売掛金30,000の普通預金口座への入金がされた。<br>売掛金540,000、普通預金口座439,000の記載を修正してください。",

    accounts: [
      { name: "売掛金", key: "urikakekin" },
      { name: "普通預金", key: "futsuyokin" }
    ],

    choices: [0, 510000, 540000, 469000],

    answer: [
      { key: "urikakekin", side: "debit", amount: 510000 },
      { key: "futsuyokin", side: "credit", amount: 469000 }
    ],

    comment: "売掛金が減って普通預金が増えたね！"
  },
  // 六問目
  {
    type: "choice",
    question: "売掛金510,000に対して2%の貸倒引当金を差額補充法により設定する。いくらか。",
    desc: "510,000 × 2% = ?",
    choices: ["10,200円", "17,500円", "19,500円", "16,500円"],
    answer: 0,
    comment: "510,000 × 2% = 10,200円だから..."
  },
  // 七問目
  {
    type: "input",
    question: "仕訳を入力しよう",
    desc: "期末商品棚卸高は140,000であった。<br>期首商品棚卸高は153,000、当期商品仕入高は2,080,000である。仕訳を行ってください。",

    accounts: [
      { name: "商品", key: "shouhin" },
      { name: "売上原価", key: "uriagegenka" }
    ],

    choices: [0, 140000, 153000, 2093000],

    answer: [
      { key: "shouhin", side: "debit", amount: 140000 },
      { key: "uriagegenka", side: "debit", amount: 2093000 }
    ],

    comment: "売上原価 = 期首 + 仕入 - 期末"
  },
  // 八問目
  {
    type: "choice",
    question: "売掛金510,000に対して2%の貸倒引当金を差額補充法により設定する。いくらか。",
    desc: "510,000 × 2% = ?",
    choices: ["10,200円", "17,500円", "19,500円", "16,500円"],
    answer: 0,
    comment: "510,000 × 2% = 10,200円だから..."
  },
// 九問目
{
  type: "input",
  question: "仕訳を入力しよう",
  desc: "建物（取得原価1,200,000円、減価償却累計額120,000円）について減価償却を行う。<br>定額法・残存価額ゼロ・耐用年数20年。<br>また、土地は700,000円である。",
  accounts: [
    { name: "減価償却費", key: "genkashoukyakuhi" },
    { name: "建物減価償却累計額", key: "tatemono_ruikei" }
  ],
  choices: [0, 60000, 120000, 180000],
  answer: [
    { key: "genkashoukyakuhi", side: "debit", amount: 60000 },
    { key: "tatemono_ruikei", side: "credit", amount: 180000 }
  ],
  comment: "1,200,000 ÷ 20年 = 60,000円。累計額は120,000 + 60,000 = 180,000。土地は減価償却しない。"
},
// 十問目
{
  type: "input",
  question: "仕訳を入力しよう",
  desc: "保険料12,000円を7月1日に向こう1年分支払っている。<br>決算日は3月31日である。月割で前払分を計上しなさい。",

  accounts: [
    { name: "保険料", key: "hokenryou" },
    { name: "前払費用", key: "maebaraifuyou" }
  ],

  choices: [0, 3000, 9000, 12000],

  answer: [
    { key: "hokenryou", side: "debit", amount: 9000 },
    { key: "maebaraifuyou", side: "debit", amount: 3000 }
  ],

  comment: "1年分12,000円のうち、7月〜3月の9ヶ月分が当期分（9,000円）、残り3ヶ月分が前払費用（3,000円）"
},
// 十一問目
{
  type: "input",
  question: "仕訳を入力しよう",
  desc: "未収地代9,000円を計上する。受取地代は38,000円である。",

  accounts: [
    { name: "未収収益", key: "mishuushueki" },
    { name: "受取地代", key: "uketorichidai" }
  ],

  choices: [0, 9000, 38000, 47000],

  answer: [
    { key: "mishuushueki", side: "debit", amount: 9000 },
    { key: "uketorichidai", side: "credit", amount: 47000 }
  ],

  comment: "未収分9,000円を計上するため、未収収益（資産）を増やし、受取地代（収益）を38,000 + 9,000 = 47,000円にする"
},
// 十二問目
{
  type: "input",
  question: "仕訳を入力しよう",
  desc: "未払家賃16,000円を計上する。支払家賃は120,000円が記帳されている。",

  accounts: [
    { name: "支払家賃", key: "shiharaichin" },
    { name: "未払費用", key: "mibarai" }
  ],

  choices: [0, 16000, 120000, 136000],

  answer: [
    { key: "shiharaichin", side: "debit", amount: 136000 },
    { key: "mibarai", side: "credit", amount: 16000 }
  ],

  comment: "未払分16,000円を計上するため、支払家賃（費用）を120,000 + 16,000 = 136,000円にし、未払費用（負債）を計上する"
},// 十三問目
{
  type: "input",
  question: "仕訳を入力しよう",
  desc: "当期の法人税等は98,000円と計算された。仮払法人税等が50,000円記帳されている。",

  accounts: [
    { name: "法人税等", key: "houjinzei" },
    { name: "未払法人税等", key: "mibaraihoujinzei" }
  ],

  choices: [0, 48000, 50000, 98000],

  answer: [
    { key: "houjinzei", side: "debit", amount: 98000 },
    { key: "mibaraihoujinzei", side: "credit", amount: 48000 }
  ],

  comment: "法人税等98,000円のうち、仮払50,000円を差し引いた残額48,000円が未払となる"
}
]