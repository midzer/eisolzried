import { loadStyle } from '../load/loadstyle'

function createWebSocket () {
  const ws = new WebSocket('wss://feuerwehr-eisolzried.de/news:63409'),
    feedbox = document.getElementById('feedbox')

  ws.onmessage = message => {
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
      const url = new URL(feed.link)
      let hostname = url.hostname
      if (url.hostname.startsWith('www.')) {
        hostname = hostname.replace('www.', '')
      }
      source.textContent = hostname

      // Link
      const link = document.createElement('a')
      link.href = feed.link
      link.textContent = feed.title

      frag.insertBefore(link, frag.childNodes[0])
      frag.insertBefore(source, frag.childNodes[0])
      frag.insertBefore(time, frag.childNodes[0])
      frag.insertBefore(date, frag.childNodes[0])
    });
    window.requestAnimationFrame(() => feedbox.insertBefore(frag, feedbox.childNodes[0]))
  }
}

loadStyle('feedbox.css')
.then(() => createWebSocket())
