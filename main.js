// ==============================
// 状態管理
// ==============================

let index = Number(prompt("どの問題から始める？（1〜3）")) - 1


// ==============================
// UIパーツ
// ==============================

function questionBox(q){
  // 問題ごとの導入文（今はdescと同じでもOK）
  return `
    <div class="question-box">
      ${q.desc}
    </div>
  `
}

function comment(){
  return `<div class="comment" id="comment"></div>`
}

function character(){
  return `
    <div class="character">
      <img src="images/chara.png" />
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

function footer(){
  return `<div class="footer">わからないときは聞いてね！</div>`
}

function submit(){
  return `<div class="submit" onclick="checkInput()">入力完了</div>`
}


// ==============================
// 選択問題
// ==============================

function choices(q){
  return `
    <div class="choices">
      ${q.choices.map((c,i)=>`
        <div class="choice" onclick="answer(${i})">${c}</div>
      `).join("")}
    </div>
  `
}


// ==============================
// テーブル（完全動的化）
// ==============================

function table(q){
  return `
    <table class="table">
      <tr>
        <th>勘定科目</th>
        <th>借方</th>
        <th>貸方</th>
      </tr>

      ${q.accounts.map(acc => row(acc, q)).join("")}
    </table>
  `
}

function row(acc, q){
  return `
    <tr>
      <td>${acc.name}</td>
      <td>${createSelect(`${acc.key}-debit`, q)}</td>
      <td>${createSelect(`${acc.key}-credit`, q)}</td>
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


// ==============================
// カード
// ==============================

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
  }

  if(q.type === "input"){
    return `
      <div class="card">
        ${step()}
        ${title(q.question)}
        ${infoBox(q.desc)}
        ${table(q)}
        ${submit()}
        ${footer()}
      </div>
    `
  }
}


// ==============================
// 描画
// ==============================

function render() {
  const q = questions[index]
  document.getElementById("app").innerHTML =
    // questionBox(q) +
    comment() +
    character() +
    card(q);

  document.getElementById("comment").innerHTML = q.comment;
}


// ==============================
// 操作ロジック
// ==============================

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

  let user = {}

  // 入力収集
  q.accounts.forEach(acc => {
    const debit = Number(document.getElementById(`${acc.key}-debit`).value || 0)
    const credit = Number(document.getElementById(`${acc.key}-credit`).value || 0)

    if(debit > 0){
      user[`${acc.key}-debit`] = debit
    }
    if(credit > 0){
      user[`${acc.key}-credit`] = credit
    }
  })

  // 正解展開
  let correct = {}

  q.answer.forEach(a => {
    correct[`${a.key}-${a.side}`] = a.amount
  })

  // 判定
  let isCorrect = true

  for(let key in correct){
    if(user[key] !== correct[key]){
      isCorrect = false
    }
  }

  for(let key in user){
    if(!correct[key]){
      isCorrect = false
    }
  }

  if(isCorrect){
    alert("正解")
    next()
  } else {
    alert("不正解")
  }
}


// ==============================
// 初期化
// ==============================

render()