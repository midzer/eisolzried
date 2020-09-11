import { Collapse } from 'bootstrap.native'

function ping () {
  ws.send('ping')
  timeout = setTimeout(() => {
    console.log('WebSocket connection closed. Please reload page.')
  }, 5000)
}

function pong () {
  clearTimeout(timeout)
}

function createSVG (icon) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.classList.add('icon')
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use')
  use.setAttributeNS(
    'http://www.w3.org/1999/xlink',
    'href', 
    `/assets/icons/sprite.svg#${icon}`)
  svg.appendChild(use)
  
  return svg
}

const ws = new WebSocket('wss://api.feuerwehr-eisolzried.de/news/'),
  feedbox = document.getElementById('feedbox')

let timeout

ws.onopen = () => setInterval(ping, 30000)

ws.onmessage = message => {
  if (message.data === 'pong') {
    pong()
    return
  }
  const feedArray = JSON.parse(message.data)
  const frag = document.createDocumentFragment()
  feedArray.forEach(feed => {
    // Date
    const date = document.createElement('span')
    const feedDate = new Date(feed.date)
    const formattedDate = new Intl.DateTimeFormat('de-DE').format(feedDate)
    date.textContent = formattedDate

    // Time
    const time = document.createElement('span')
    const formattedTime = feedDate.toLocaleTimeString('de-De')
    time.textContent = formattedTime

    // Source
    const source = document.createElement('span')
    source.className = 'text-truncate'
    let hostname
    if (feed.link) {
      const url = new URL(feed.link)
      hostname = url.hostname
    }
    else {
      hostname = 'feuerwehr-eisolzried.de'
    }
    if (hostname.startsWith('www.')) {
      hostname = hostname.replace('www.', '')
    }
    source.textContent = hostname

    // Link
    const linkContainer = document.createElement('div')
    const link = document.createElement('a')
    link.href = feed.link
    link.textContent = feed.title
    link.dataset.toggle = 'tooltip'
    link.dataset.placement = 'bottom'
    link.title = feed.summary
    if (feedArray.length === 1) {
      // Show "NEU" badge
      const badge = document.createElement('span')
      badge.className = 'badge badge-secondary mr-2'
      badge.textContent = 'NEU'
      linkContainer.appendChild(badge)
    }
    linkContainer.appendChild(link)

    // Collapse
    if (feed.summary) {
      const plusLink = document.createElement('a')
      plusLink.className = 'badge badge-secondary ml-2'
      plusLink.dataset.toggle = 'collapse'
      let id = `${formattedDate}-${formattedTime}`
      id = id.replace(/[\.:]+/g, '');
      plusLink.href = `#collapse-${id}`
      plusLink.role = 'button'
      plusLink.setAttribute('aria-expanded', false)
      plusLink.setAttribute('aria-controls', `#collapse-${id}`)
      plusLink.appendChild(createSVG('plus'))
      const collapse = document.createElement('div')
      collapse.className = 'collapse'
      collapse.id = `collapse-${id}`
      collapse.innerHTML = feed.summary
      linkContainer.appendChild(plusLink)
      linkContainer.appendChild(collapse)
    }
    // Social share
    if (navigator.share) {
      const shareLink = document.createElement('a')
      shareLink.className = 'badge badge-secondary ml-2'
      shareLink.onclick = () => {
        navigator.share({
          title: feed.title,
          url: feed.link
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error))
      }
      
      shareLink.appendChild(createSVG('share-2'))
      linkContainer.appendChild(shareLink)
    }
    const facebookLink = document.createElement('a')
    facebookLink.className = 'badge badge-secondary ml-2'
    facebookLink.href = `https://www.facebook.com/sharer/sharer.php?u=${feed.link}`
    facebookLink.rel = 'nofollow noopener'
    facebookLink.appendChild(createSVG('facebook'))
    linkContainer.appendChild(facebookLink)
    const twitterLink = document.createElement('a')
    twitterLink.className = 'badge badge-secondary ml-2'
    twitterLink.href = `https://twitter.com/share?text=${feed.title}&url=${feed.link}`
    twitterLink.rel = 'nofollow noopener'
    twitterLink.appendChild(createSVG('twitter'))
    linkContainer.appendChild(twitterLink)

    // Append all to frag
    frag.insertBefore(linkContainer, frag.childNodes[0])
    frag.insertBefore(source, frag.childNodes[0])
    frag.insertBefore(time, frag.childNodes[0])
    frag.insertBefore(date, frag.childNodes[0])
  })
  window.requestAnimationFrame(() => {
    feedbox.insertBefore(frag, feedbox.childNodes[0])

    // Initialize plusButtons
    const plusButtons = Array.from(document.querySelectorAll('[data-toggle="collapse"]'))
    plusButtons.forEach(button => new Collapse(button))
  })
}
