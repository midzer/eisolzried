'use strict'

function addMessage (message) {
  const item = document.createElement('li')
  item.textContent = message
  messagesList.appendChild(item)
  chatbox.scrollTop = chatbox.scrollHeight
}

function sendMessage () {
  const input = document.getElementById('chat-input')
  const message = input.value
  addMessage(message)
  input.value = ''
  ws.send(message)
}

const chatbox = document.getElementById('chatbox')
const messagesList = document.getElementById('chat-messages')
const ws = new WebSocket('wss://feuerwehr-eisolzried.de:62187')
let incomingMessages = [],
  scheduled

ws.onmessage = message => {
  incomingMessages.push(message.data)

  if (!scheduled) {
    scheduled = true
    window.requestAnimationFrame(function () {
      for (let i = 0, len = incomingMessages.length; i < len; i++) {
        addMessage(incomingMessages[i])
      }
      incomingMessages.length = 0
      scheduled = false
    })
  }
}

document.getElementById('chat-btn').onclick = () => {
  sendMessage()
}

document.getElementById('chat-form').onkeypress = event => {
  if (event.keyCode === 13) {
    event.preventDefault()
    sendMessage()
  }
}
