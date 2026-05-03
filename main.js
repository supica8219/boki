// ==============================
// 状態管理
// ==============================

var questions = []
let index = 0

// ==============================
// 初期：問題セット選択
// ==============================

function initSelector() {
  fetch("questions/index.json")
    .then(res => res.json())
    .then(list => {
      const app = document.getElementById("app")

      app.innerHTML = `
        <div class="card">
          <div class="title">問題セットを選択</div>
          <div class="choices">
            ${list.map(q => `
              <div class="choice" onclick="loadQuestions('${q.file}')">
                ${q.name}
              </div>
            `).join("")}
          </div>
        </div>
      `
    })
}

// ==============================
// 問題読み込み
// ==============================

function loadQuestions(name) {
  const old = document.getElementById("q-script")
  if (old) old.remove()

  const script = document.createElement("script")
  script.id = "q-script"
  script.src = `questions/${name}.js?` + Math.random()

  script.onload = () => {
    questions = window.questionsData   // ←ここ重要
    showQuestionStartSelection()
  }

  document.body.appendChild(script)
}

function showQuestionStartSelection() {
  const app = document.getElementById("app")
  const questionItems = questions.map((q, i) => {
    let prefix
    if (i < 10) {
      prefix = String.fromCodePoint(0x2460 + i)
    } else {
      prefix = `[${i + 1}]`
    }
    return `
    <div class="choice" onclick="startFromQuestion(${i})">
      ${prefix} ${q.question}
    </div>
  `
  }).join("")

  app.innerHTML = `
    <div class="card">
      <div class="title">この問題セットの開始問題を選択</div>
      <div class="choices">
        ${questionItems}
      </div>
    </div>
  `
}

function startFromQuestion(startIndex) {
  index = startIndex
  render()
}

// ==============================
// ヘルパー
// ==============================

function accountInfo(acc) {
  if (typeof acc === "string") {
    return { name: acc, key: acc }
  }

  return {
    name: acc.name,
    key: acc.key || acc.name
  }
}

function normalizeSide(side) {
  if (side === "debit" || side === "借方") return "debit"
  if (side === "credit" || side === "貸方") return "credit"
  return side
}

// ==============================
// UIパーツ
// ==============================

function comment() {
  return `<div class="comment" id="comment"></div>`
}

function character() {
  return `
    <div class="character">
      <img src="images/chara.png" />
    </div>
  `
}

function step() {
  return `<div class="step">STEP ${index + 1}/${questions.length}</div>`
}

function title(text) {
  return `<div class="title">${text}</div>`
}

function infoBox(desc) {
  return `<div class="info-box">${desc}</div>`
}

function footer() {
  const q = questions[index]
  let html = ''

  if (q.image) {
    html += `<div class="footer-link" onclick="showImage('${q.image}')">画像を表示</div>`
  }

  if (q.hint && q.hint.length > 0) {
    const hintLinks = q.hint.map(keyword => `<span class="hint-keyword" onclick="explainKeyword('${keyword}')">${keyword}</span>`).join('、')
    html += `<div class="hint">ヒント: ${hintLinks}</div>`
  }

  return `<div class="footer">${html}</div>`
}

function submit() {
  return `<div class="submit" onclick="checkInput()">入力完了</div>`
}

// ==============================
// 選択問題
// ==============================

function choices(q) {
  return `
    <div class="choices">
      ${q.choices.map((c, i) => `
        <div class="choice" onclick="answer(${i})">${c}</div>
      `).join("")}
    </div>
  `
}

// ==============================
// テーブル
// ==============================

function table(q) {
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

function row(acc, q) {
  const account = accountInfo(acc)

  return `
    <tr>
      <td>${account.name}</td>
      <td>${createSelect(`${account.key}-debit`, q)}</td>
      <td>${createSelect(`${account.key}-credit`, q)}</td>
    </tr>
  `
}

function createSelect(id, q) {
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

function card(q) {
  if (q.type === "choice") {
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

  if (q.type === "input") {
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
    comment() +
    character() +
    card(q)

  document.getElementById("comment").innerHTML = q.comment
}

// ==============================
// 操作
// ==============================

function answer(i) {
  const q = questions[index]

  if (i === q.answer) {
    alert("正解")
    next()
  } else {
    alert("不正解")
    // 不正解の場合は次の問題に進まない
  }
}

function next() {
  index++

  if (index < questions.length) {
    render()
  } else {
    document.getElementById("app").innerHTML = `
      <div class="card">
        <div class="title">終了！</div>
        <div class="choices">
          <div class="choice" onclick="initSelector()">もう一度選ぶ</div>
        </div>
      </div>
    `
  }
}

function checkInput() {
  const q = questions[index]
  const user = {}

  q.accounts.forEach(acc => {
    const { key } = accountInfo(acc)
    const debit = Number(document.getElementById(`${key}-debit`).value || 0)
    const credit = Number(document.getElementById(`${key}-credit`).value || 0)

    if (debit > 0) user[`${key}-debit`] = debit
    if (credit > 0) user[`${key}-credit`] = credit
  })

  const correct = {}
  q.answer.forEach(a => {
    const side = normalizeSide(a.side)
    correct[`${a.key}-${side}`] = a.amount
  })

  let isCorrect = true

  for (const key in correct) {
    if (user[key] !== correct[key]) isCorrect = false
  }

  for (const key in user) {
    if (!(key in correct)) isCorrect = false
  }

  if (isCorrect) {
    alert("正解")
    next()
  } else {
    alert("不正解")
    // 不正解の場合は次の問題に進まない
  }
}

// ==============================
// AI 質問機能
// ==============================

let apiKey = ''

// API キーを読み込む
fetch('API/api.txt')
  .then(res => res.text())
  .then(key => apiKey = key.trim())

// ==============================
// キーワード解説
// ==============================

function getQuestionContext(q) {
  let context = `問題: ${q.question}`
  if (q.comment) context += `\nコメント: ${q.comment}`
  if (q.desc) context += `\n説明: ${q.desc}`
  if (q.type === 'choice') {
    context += `\n選択肢: ${q.choices.join('、')}`
  } else if (q.type === 'input') {
    const accounts = q.accounts.map(acc => accountInfo(acc).name).join('、')
    context += `\n勘定科目: ${accounts}`
  }
  return context
}

async function explainKeyword(keyword) {
  const modal = document.createElement("div")
  modal.className = "ai-modal"
  modal.innerHTML = `
    <div class="ai-modal-content">
      <div class="ai-modal-header">
        <h3>"${keyword}" の解説</h3>
        <span class="ai-modal-close">&times;</span>
      </div>
      <div id="keyword-response" class="ai-response">解説を取得中...</div>
      <div id="followup-section" style="display: none;">
        <textarea id="followup-question-input" placeholder="追加の質問を入力してください..." rows="2"></textarea>
        <button id="followup-submit-btn" onclick="askFollowup('${keyword}')">質問する</button>
      </div>
      <div class="ai-modal-resize-handle"></div>
    </div>
  `

  modal.onclick = (e) => {
    if (e.target === modal || e.target.className === "ai-modal-close") {
      modal.remove()
    }
  }

  document.body.appendChild(modal)

  const content = modal.querySelector('.ai-modal-content')
  const header = modal.querySelector('.ai-modal-header')
  const resizeHandle = modal.querySelector('.ai-modal-resize-handle')

  // ドラッグ処理
  header.addEventListener('mousedown', (event) => {
    event.preventDefault()

    const rect = content.getBoundingClientRect()
    const shiftX = event.clientX - rect.left
    const shiftY = event.clientY - rect.top

    content.style.left = rect.left + 'px'
    content.style.top = rect.top + 'px'
    content.style.transform = 'none'

    function onMouseMove(e) {
      content.style.left = e.clientX - shiftX + 'px'
      content.style.top = e.clientY - shiftY + 'px'
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  })

  // リサイズ処理
  resizeHandle.addEventListener('mousedown', (event) => {
    event.preventDefault()
    event.stopPropagation()

    const rect = content.getBoundingClientRect()
    const startX = event.clientX
    const startY = event.clientY
    const startWidth = rect.width
    const startHeight = rect.height

    function onMouseMove(e) {
      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY
      const newWidth = Math.max(300, startWidth + deltaX)
      const newHeight = Math.max(200, startHeight + deltaY)
      content.style.width = newWidth + 'px'
      content.style.height = newHeight + 'px'
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  })

  modal.onclick = (e) => {
    if (e.target === modal || e.target.className === 'ai-modal-close') {
      modal.remove()
    }
  }

  const question = questions[index]
  const problemContext = getQuestionContext(question)

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'あなたは簿記や会計の専門家です。指定されたキーワードを、簿記22級レベルの問題を解く上で役立つように、簿記の文脈でわかりやすく簡潔に解説してください。'
          },
          {
            role: 'user',
            content: `簿記用語「${keyword}」を、この問題の文脈で、問題を解くときにどう使うかを中心にわかりやすく簡潔に解説してください。\n\n${problemContext}`
          }
        ],
        max_tokens: 300
      })
    })

    const data = await response.json()

    if (data.choices && data.choices[0]) {
      document.getElementById("keyword-response").innerHTML = `<strong>${keyword}:</strong><br>${data.choices[0].message.content}`
      document.getElementById("followup-section").style.display = "block"
    } else {
      document.getElementById("keyword-response").innerHTML = "申し訳ありません、解説を取得できませんでした。"
    }
  } catch (error) {
    document.getElementById("keyword-response").innerHTML = "エラーが発生しました。もう一度お試しください。"
    console.error('AI API Error:', error)
  }
}

async function askFollowup(keyword) {
  const followupText = document.getElementById("followup-question-input").value.trim()
  if (!followupText) return

  const submitBtn = document.getElementById("followup-submit-btn")
  const responseDiv = document.getElementById("keyword-response")

  submitBtn.disabled = true
  submitBtn.textContent = "考え中..."

  const currentContent = responseDiv.innerHTML
  responseDiv.innerHTML += "<br><br><strong>追加質問:</strong> " + followupText + "<br><em>回答を取得中...</em>"

  const currentQuestion = questions[index]
  const problemContext = getQuestionContext(currentQuestion)

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'あなたは簿記や会計の専門家です。キーワードの解説に関する追加質問に、簿記22級レベルの問題を解く上で役立つように、わかりやすく簡潔に回答してください。'
          },
          {
            role: 'user',
            content: `簿記用語「${keyword}」について、以下の追加質問に答えてください。\n\n${problemContext}\n\n追加質問: ${followupText}`
          }
        ],
        max_tokens: 300
      })
    })

    const data = await response.json()

    if (data.choices && data.choices[0]) {
      responseDiv.innerHTML = currentContent + "<br><br><strong>追加質問:</strong> " + followupText + "<br><strong>回答:</strong><br>" + data.choices[0].message.content
    } else {
      responseDiv.innerHTML = currentContent + "<br><br><strong>追加質問:</strong> " + followupText + "<br><em>申し訳ありません、回答を取得できませんでした。</em>"
    }
  } catch (error) {
    responseDiv.innerHTML = currentContent + "<br><br><strong>追加質問:</strong> " + followupText + "<br><em>エラーが発生しました。もう一度お試しください。</em>"
    console.error('AI API Error:', error)
  }

  submitBtn.disabled = false
  submitBtn.textContent = "質問する"
  document.getElementById("followup-question-input").value = ""
}

// ==============================
// 画像表示
// ==============================

function showImage(imagePath) {
  window.open(imagePath, "_blank")
}

// ==============================
// 初期化
// ==============================

initSelector()
