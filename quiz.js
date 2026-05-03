const questions = [
  {
    type: "choice",
    question: "差額はいくら？",
    desc: "帳簿残高 332,000円 <br> 実際有高 350,500円",
    choices: ["18,500円","17,500円","19,500円","16,500円"],
    answer: 0,
    comment: "実際有高-帳簿残高だから..."
  },
  {
    type: "choice",
    question: "次の問題",
    desc: "100円と120円の差額は？",
    choices: ["20円","10円","30円","40円"],
    answer: 0,
    comment: "サンプル問題!!"
  },
  {
    type: "input",
    question: "仕訳を入力しよう",
    desc: "実際有高 350,500円 <br> 差額 18,500円",
    choices: [0, 18500, 350500],
    answer: {
      "genkin-debit": 350500,
      "genkin-credit": 0,
      "zasson-debit": 0,
      "zasson-credit": 0,
      "zasseki-debit": 0,
      "zasseki-credit": 18500
    },
    comment: "現金は借方、雑益は貸方だね！"
  }
]

let index = 0

// ===== パーツ =====

function questionBox(){
  return `
    <div class="question-box">
      現金の実際有高は350,500円であったため、
      帳簿残高との差額については雑損または雑益として処理する。
    </div>
  `
}

function comment(){
  return `<div class="comment" id="comment"></div>`
}

function character(){
  return `
    <div class="character">
      <img src="chara.png" />
    </div>
  `
}

function step(){
  return `<div class="step">STEP ${index+1}/${questions.length}</div>`
}

function title(text){
  return `<div class="title">${text}</div>`
}

function infoBox(desc){
  return `<div class="info-box">${desc}</div>`
}

function choices(q){
  return `
    <div class="choices">
      ${q.choices.map((c,i)=>`
        <div class="choice" onclick="answer(${i})">${c}</div>
      `).join("")}
    </div>
  `
}

function footer(){
  return `<div class="footer">わからないときは聞いてね！</div>`
}

function submit(){
  return `<div class="submit" onclick="checkInput()">入力完了</div>`
}

// ===== テーブル（ここが本体） =====

function table(){
  const q = questions[index]

  return `
    <table class="table">
      <tr>
        <th>勘定科目</th>
        <th>借方</th>
        <th>貸方</th>
      </tr>

      ${row("現金","genkin", q)}
      ${row("雑損","zasson", q)}
      ${row("雑益","zasseki", q)}
    </table>
  `
}

function row(name,key,q){
  return `
    <tr>
      <td>${name}</td>
      <td>
        ${createSelect(`${key}-debit`, q)}
      </td>
      <td>
        ${createSelect(`${key}-credit`, q)}
      </td>
    </tr>
  `
}

function createSelect(id, q){
  return `
    <select id="${id}">
      <option value="">ーーー</option>
      ${q.choices.map(v => `
        <option value="${v}">${v.toLocaleString()}円</option>
      `).join("")}
    </select>
  `
}

// ===== UI組み立て =====

function card(q){
  if(q.type === "choice"){
    return `
      <div class="card">
        ${step()}
        ${title(q.question)}
        ${infoBox(q.desc)}
        ${choices(q)}
        ${footer()}
      </div>
    `
  } else if(q.type === "input"){
    return `
      <div class="card">
        ${step()}
        ${title(q.question)}
        ${infoBox(q.desc)}
        ${table()}
        ${submit()}
        ${footer()}
      </div>
    `
  }
}

// ===== 描画 =====

function render() {
  const q = questions[index]

  document.getElementById("app").innerHTML =
    questionBox() +
    comment() +
    character() +
    card(q);

  document.getElementById("comment").innerHTML = q.comment;
}

// ===== コントローラー =====

function answer(i) {
  if(i === questions[index].answer){
    alert("正解")
  } else {
    alert("不正解")
  }

  next()
}

function next(){
  index++

  if(index < questions.length){
    render()
  } else {
    alert("終了！")
  }
}

function checkInput(){
  const q = questions[index]
  let correct = true

  for(let key in q.answer){
    const value = Number(document.getElementById(key).value || 0)

    if(value !== q.answer[key]){
      correct = false
    }
  }

  if(correct){
    alert("正解")
    next()
  } else {
    alert("不正解")
  }
}

// 初期描画
render()