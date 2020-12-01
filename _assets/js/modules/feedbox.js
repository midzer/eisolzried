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
  svg.classList.add(`icon--${icon}`)
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

    // Entry
    let entry
    let details
    if (feed.summary) {
      entry = document.createElement('summary')
      details = document.createElement('details')
      details.className = 'entry'
      details.textContent = feed.summary
      details.appendChild(entry)
    }
    else {
      entry = document.createElement('div')
      entry.className = 'entry'
    }
    // Badge
    if (feedArray.length === 1) {
      const badge = document.createElement('span')
      badge.className = 'badge bg-secondary mr-2'
      badge.textContent = 'NEU'
      entry.appendChild(badge)
    }
    // Link
    const link = document.createElement('a')
    link.href = feed.link
    link.rel = 'noopener nofollow'
    link.title = feed.summary
    link.appendChild(createSVG('external-link'))
    const linkHeading = document.createElement('h2')
    linkHeading.className = 'h6 d-inline'
    linkHeading.textContent = feed.title
    link.appendChild(linkHeading)
    entry.appendChild(link)

    // Social
    if (navigator.share) {
      const shareLink = document.createElement('a')
      shareLink.className = 'badge bg-secondary ml-2'
      shareLink.setAttribute('role', 'button')
      shareLink.setAttribute('aria-label', 'Beitrag teilen')
      shareLink.onclick = () => {
        navigator.share({
          title: feed.title,
          url: feed.link
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error))
      }
      shareLink.appendChild(createSVG('share-2'))
      entry.appendChild(shareLink)
    }
    const facebookLink = document.createElement('a')
    facebookLink.className = 'badge bg-secondary ml-2'
    facebookLink.href = `https://www.facebook.com/sharer/sharer.php?u=${feed.link}`
    facebookLink.rel = 'nofollow noopener'
    facebookLink.setAttribute('aria-label', 'Auf Facebook teilen')
    facebookLink.appendChild(createSVG('facebook'))
    entry.appendChild(facebookLink)
    const twitterLink = document.createElement('a')
    twitterLink.className = 'badge bg-secondary ml-2'
    twitterLink.href = `https://twitter.com/share?text=${feed.title}&url=${feed.link}`
    twitterLink.rel = 'nofollow noopener'
    twitterLink.setAttribute('aria-label', 'Auf Twitter teilen')
    twitterLink.appendChild(createSVG('twitter'))
    entry.appendChild(twitterLink)

    // Append all to frag
    frag.insertBefore(details || entry, frag.childNodes[0])
    frag.insertBefore(source, frag.childNodes[0])
    frag.insertBefore(time, frag.childNodes[0])
    frag.insertBefore(date, frag.childNodes[0])
  })
  window.requestAnimationFrame(() => {
    feedbox.insertBefore(frag, feedbox.childNodes[0])
  })
}
