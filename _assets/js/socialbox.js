import { query } from './helper/query'

function sendMessage (item, score) {
  const msg = {
    index: Number(item.getAttribute('data-index')),
    score: score
  }
  ws.send(JSON.stringify(msg))
}

function matchesIndex (element) {
  return element.getAttribute('data-index') == this
}

function updateScore (item, modifier) {
  const socialbox = item.closest('.socialbox'),
    rating = socialbox.querySelector('#rating'),
    newScore = Number(rating.textContent) + modifier

  rating.textContent = newScore
  sendMessage(socialbox, newScore)

  // Disable rating after click
  const rateButtons = Array.from(socialbox.querySelectorAll('.btn-outline-primary'))
  rateButtons.forEach(button => button.disabled = true)
}

const ws = new WebSocket('wss://feuerwehr-eisolzried.de/rate:63244'),
  socialboxes = query('.socialbox')

ws.onopen = () => {
  socialboxes.forEach(item => sendMessage(item, undefined))
}

ws.onmessage = msg => {
  const incoming = JSON.parse(msg.data),
    item = socialboxes.find(matchesIndex, incoming.index)

  item.querySelector('span').textContent = incoming.score
}

query('.plus-btn').forEach(item => item.onclick = () => updateScore(item, 1))
query('.minus-btn').forEach(item => item.onclick = () => updateScore(item, -1))

// Share
if (navigator.share) {
  const canonicalElement = document.querySelector('link[rel=canonical]')
  let url = document.location.href
  if (canonicalElement) {
    url = canonicalElement.href
  }
  query('.share-btn').forEach(item => {
    item.onclick = () => {
      navigator.share({
        title: document.title,
        url: url
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error))
    }
  })
}
