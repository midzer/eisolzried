import EmojiButton from 'emoji-button'
import { loadStyle } from '../load/loadstyle'

loadStyle('chatbox.css')

/* Can be import()ed dynamically in the future
 * if browser support is better
 */
// Markdown
function removeTags(string) {
  return string.replace(/<(?:.|\n)*?>/gm, '')
}

function md2html(md) {
  const bold_pattern1 = /\*{2}(.+)\*{2}/gim // <b>
  const bold_pattern2 = /\_{2}(.+)\_{2}/gim  // <b>
  const italic_pattern1 = /\_(.+)\_/gim // <i>
  const italic_pattern2 = /\*(.+)\*/gim // <i>
  const striketrough_pattern = /\~{2}(.+)\~{2}/gim // <del>
  const a_pattern1 = /\[(.+)\]\((.+)\)/gim // <a>
  const a_pattern2 = /\[(.+)\]\((.+) \"(.+)\"\)/gim // <a>
  const a_pattern3 = /\[(.+)\]/gim // <a>

  /* links */
  md = md.replace(a_pattern1, function(match, title, url) {
    return '<a href="' + url + '">' + title + '</a>'
  })
  md = md.replace(a_pattern2, function(match, title, url, tooltip) {
    return '<a href="' + url + '" title="' + tooltip + '">' + title + '</a>'
  })
  md = md.replace(a_pattern3, function(match, url) {
    return '<a href="' + url + '">' + url + '</a>'
  })

  /* bold */
  md = md.replace(bold_pattern1, function(match, str) {
    return '<b>' + str + '</b>'
  })
  md = md.replace(bold_pattern2, function(match, str) {
    return '<b>' + str + '</b>'
  })

  /* italic */
  md = md.replace(italic_pattern1, function(match, str) {
    return '<i>' + str + '</i>';
  })
  md = md.replace(italic_pattern2, function(match, str) {
    return '<i>' + str + '</i>';
  })

  /* striketrough */
  md = md.replace(striketrough_pattern, function(match, str) {
    return '<del>' + str + '</del>'
  })

  return md
}

function createMessage (message) {
  const item = document.createElement('li')
  item.innerHTML = md2html(removeTags(message))
  return item
}

function appendToList(list, child) {
  messagesList.appendChild(child)
  chatbox.scrollTop = chatbox.scrollHeight
}

function sendMessage () {
  const message = input.value
  appendToList(messagesList, createMessage(message))
  input.value = ''
  ws.send(message)
}

const chatbox = document.getElementById('chatbox')
const input = document.getElementById('chat-input')
const messagesList = document.getElementById('chat-messages')
const ws = new WebSocket('wss://feuerwehr-eisolzried.de/chat:62187')
let incomingMessages = [],
  scheduled

ws.onmessage = message => {
  incomingMessages.push(createMessage(message.data))

  if (!scheduled) {
    scheduled = true
    window.requestAnimationFrame(function () {
      const frag = document.createDocumentFragment()
      for (let i = 0, len = incomingMessages.length; i < len; i++) {
        frag.appendChild(incomingMessages[i])
      }
      appendToList(messagesList, frag)
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

// Emoji button
const emojiButton = document.querySelector('#emoji-btn')
const picker = new EmojiButton()

picker.on('emoji', emoji => {
  input.value += emoji
})

emojiButton.addEventListener('click', () => {
  picker.pickerVisible ? picker.hidePicker() : picker.showPicker(emojiButton)
})
