import { images } from './images'
import { videos } from './videos'
import { trans } from './trans'

const imgLength = images.length,
  vidLength = videos.length,  
  imgPath = '/assets/images/media/',
  vidPath = '/assets/videos/media/',
  cardTemplate = document.createElement('div'),
  imgTemplate = document.createElement('img'),
  vidTemplate = document.createElement('video')

let elements,
  length,
  path,
  imgMode

cardTemplate.className = 'card border-custom'

imgTemplate.className = 'lazy dynamic card-img'
imgTemplate.src = trans

vidTemplate.controls = true
vidTemplate.preload = 'none'
vidTemplate.loop = true
vidTemplate.style.display = 'none'

export function setup (grid) {
    if (grid === 'image-grid') {
        elements = images
        length = imgLength
        path = imgPath
        imgMode = true
    }
    else {
        elements = videos
        length = vidLength
        path = vidPath
        imgMode = false
    }
}

export function createElement (index) {
  let card
  if (index < length) {
    const element = elements[index]
    const link = document.createElement('a')
    const img = imgTemplate.cloneNode(false)
    let div
    if (imgMode) {
        link.href = `${path}${element.name}`
        img.setAttribute('data-src', `${path}thumbs/${element.name}`)
        img.alt = element.text
    }
    else {
        link.href = `#v${element}`
        link.setAttribute('data-type', 'html')
        img.setAttribute('data-src', `${path}thumbs/${element}.jpg`)
        img.alt = element
        div = document.createElement('div')
        div.id = `v${element}`
        const vid = vidTemplate.cloneNode(false)
        vid.src = `${path}${element}.${vid.canPlayType('video/webm') ? 'webm' : 'mp4'}`
        div.appendChild(vid)
    }
    link.appendChild(img)
    card = cardTemplate.cloneNode(false)
    card.appendChild(link)
    if (!imgMode) {
        card.appendChild(div)
    }
  }
  return card
}
