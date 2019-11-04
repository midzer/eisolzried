import bsCustomFileInput from 'bs-custom-file-input'

import { createSnackbar } from '../helper/createsnackbar'
import { loadStyle } from '../load/loadstyle'
import { loadScript } from '../load/loadscript'

/* Can be import()ed dynamically in the future
 * if browser support is better
 */
// Markdown
function removeTags (string) {
  return string.replace(/<(?:.|\n)*?>/gm, '')
}

function md2html (md) {
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
  item.innerHTML = md2html(content)

  return item
}

function appendToList (child) {
  chatbox.appendChild(child)
  chatbox.scrollTop = chatbox.scrollHeight
}

function sendMessage (message) {
  appendToList(createMessage(message))
  ws.send(message)
}

function sendTextMessage () {
  if (chatInput.value) {
    sendMessage(removeTags(chatInput.value))
    chatInput.value = ''
  }
}

function createWebSocket () {
  ws = new WebSocket('ws://localhost:62187')

  ws.onmessage = message => {
    incomingMessages.push(createMessage(message.data))
  
    if (!scheduled) {
      scheduled = true
      window.requestAnimationFrame(() => {
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
}

const chatbox = document.getElementById('chatbox'),
  chatInput = document.getElementById('chat-input'),
  imageInput = document.getElementById('image-input'),
  imageForm = document.getElementById('image-form'),
  MAX_WIDTH = 600,
  MAX_HEIGHT = 400

let incomingMessages = [],
  scheduled,
  ws

bsCustomFileInput.init()

loadStyle('chatbox.css')
.then(() => createWebSocket())

document.getElementById('chat-btn').onclick = () => sendTextMessage()

document.getElementById('upload-btn').onclick = () => {
  const selectedFile = imageInput.files
  if (selectedFile.length > 0) {
    const imageFile = selectedFile[0]
    if (imageFile.size <= 4200000) {
      const fileReader = new FileReader()
      fileReader.onload = event => {
        let srcData = event.target.result
        const image = document.createElement('img')
        image.src = srcData
        image.onload = () => {
          let width = image.width,
            height = image.height,
            resize
          
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width
              width = MAX_WIDTH
              resize = true
            }
          }
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
            resize = true
          }
          if (resize) {
            const canvas = document.createElement('canvas'),
              context = canvas.getContext('2d')
            
            canvas.width = width
            canvas.height = height

            context.drawImage(image, 0, 0, width, height)
            srcData = canvas.toDataURL('image/jpeg')
          }
          sendMessage(`<img src='${srcData}'>`)
        }
      }
      fileReader.readAsDataURL(imageFile)
    }
    else {
      const snackbar = createSnackbar(),
        data = {
          message: 'Upload nicht möglich! Maximale Bildgröße 4.2MB',
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
let emojiButton = document.getElementById('emoji-btn')
emojiButton.onclick = () => {
  loadScript('emoji.js')

  // Remove reference (and handler)
  emojiButton = null
}
