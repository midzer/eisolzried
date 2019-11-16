import { loadStyle } from '../load/loadstyle'

function createWebSocket () {
  const ws = new WebSocket('wss://feuerwehr-eisolzried.de/feed:63409')

  ws.onmessage = message => {
    const feed = JSON.parse(message.data)

    // Date
    const date = document.createElement('span')
    const feedDate = new Date(feed.date)
    const formattedDate = new Intl.DateTimeFormat('de-DE').format(feedDate)
    date.textContent = formattedDate
    
    // Source
    const source = document.createElement('span')
    const url = new URL(feed.link)
    source.textContent = url.hostname

    // Link
    const link = document.createElement('a')
    link.href = feed.link
    link.textContent = feed.title

    feedbox.insertBefore(link, feedbox.childNodes[0])
    feedbox.insertBefore(source, feedbox.childNodes[0])
    feedbox.insertBefore(date, feedbox.childNodes[0])
  }
}

const feedbox = document.getElementById('feedbox')

loadStyle('feedbox.css')
.then(() => createWebSocket())
