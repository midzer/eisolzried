import { videos } from './videos'
import { trans } from './trans'

const length = videos.length
const path = '/assets/videos/media/'

export default function (index) {
  let card
  if (index < length) {
    const video = videos[index]
    card = document.createElement('div')
    card.className = 'card border-primary'
    const link = document.createElement('a')
    link.href = `#v${video}`
    link.setAttribute('data-type', 'html')
    const img = document.createElement('img')
    img.className = 'lazy card-img'
    img.src = trans
    img.setAttribute('data-src', `${path}thumbs/${video}.jpg`)
    img.alt = video
    const div = document.createElement('div')
    div.id = `v${video}`
    const vid = document.createElement('video')
    vid.controls = true
    vid.preload = 'none'
    vid.loop = true
    vid.style.display = 'none'
    vid.src = `${path}${video}.${vid.canPlayType('video/webm') ? 'webm' : 'mp4'}`
    div.appendChild(vid)
    link.appendChild(img)
    card.appendChild(link)
    card.appendChild(div)
  }
  return card
}
