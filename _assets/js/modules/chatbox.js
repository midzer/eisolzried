import EmojiButton from 'emoji-button'
import bsCustomFileInput from 'bs-custom-file-input'

import { createSnackbar } from '../helper/createsnackbar'
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

function createMessage (content) {
  const item = document.createElement('li')
  item.innerHTML = content
  return item
}

function appendToList(child) {
  messagesList.appendChild(child)
  chatbox.scrollTop = chatbox.scrollHeight
}

function sendMessage (message) {
  appendToList(createMessage(message))
  ws.send(message)
}

function sendTextMessage() {
  if (chatInput.value) {
    sendMessage(md2html(removeTags(chatInput.value)))
    chatInput.value = ''
  }
}

const chatbox = document.getElementById('chatbox')
const chatInput = document.getElementById('chat-input')
const imageInput = document.getElementById('image-input')
const imageForm = document.getElementById('image-form')
const messagesList = document.getElementById('chat-messages')
const ws = new WebSocket('wss://feuerwehr-eisolzried.de/chat:62187')
bsCustomFileInput.init()
let incomingMessages = [],
  scheduled

ws.onmessage = message => {
  incomingMessages.push(createMessage(md2html(message.data)))

  if (!scheduled) {
    scheduled = true
    window.requestAnimationFrame(function () {
      const frag = document.createDocumentFragment()
      for (let i = 0, len = incomingMessages.length; i < len; i++) {
        frag.appendChild(incomingMessages[i])
      }
      appendToList(frag)
      incomingMessages.length = 0
      scheduled = false
    })
  }
}

document.getElementById('chat-btn').onclick = () => {
  sendTextMessage()
}

document.getElementById('upload-btn').onclick = () => {
  const selectedFile = imageInput.files
  if (selectedFile.length > 0) {
    const imageFile = selectedFile[0]
    if (imageFile.size <= 42000) {
      const fileReader = new FileReader()
      fileReader.onload = function(fileLoadedEvent) {
        const srcData = fileLoadedEvent.target.result
        const newImage = document.createElement('img')
        newImage.className = 'img-fluid'
        newImage.src = srcData
        sendMessage(newImage.outerHTML)
      }
      fileReader.readAsDataURL(imageFile)
    }
    else {
      const snackbar = createSnackbar()
      const data = {
        message: 'Upload nicht möglich! Maximale Bildgröße 42kb',
        timeout: 5000
      }
      snackbar.showSnackbar(data)
    }
  }
  imageForm.reset()
}

document.getElementById('chat-form').onkeypress = event => {
  if (event.keyCode === 13) {
    event.preventDefault()
    sendTextMessage()
  }
}

// Emoji button
const emojiButton = document.getElementById('emoji-btn')
const picker = new EmojiButton({position: 'top-end'})

picker.on('emoji', emoji => {
  input.value += emoji
})

emojiButton.onclick = () => {
  picker.pickerVisible ? picker.hidePicker() : picker.showPicker(emojiButton)
}
