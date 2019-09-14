import { images } from './images'
import { videos } from './videos'
import { trans } from './trans'
import { load } from '../helper/load'

const imgLength = images.length,
  vidLength = videos.length,  
  imgPath = '/assets/images/media/',
  vidPath = '/assets/videos/media/',
  cardTemplate = document.createElement('div'),
  imgTemplate = document.createElement('img'),
  vidTemplate = document.createElement('video'),
  frag = document.createDocumentFragment()

let elements,
  length,
  path,
  imgMode,
  index = 0,
  currentGrid

cardTemplate.className = 'card border-custom'

imgTemplate.className = 'lazy dynamic card-img'
imgTemplate.src = trans

vidTemplate.controls = true
vidTemplate.preload = 'none'
vidTemplate.loop = true
vidTemplate.style.display = 'none'

function appendElement(frag) {
  let element = createElement(index++)
  if (element) {
    (frag || currentGrid).appendChild(element)
  }
}

export function create (grid) {
  setup(grid.id)
  while (index < 24) {
    // Lets fill a block of 24 elements initially
    appendElement(frag)
  }
  window.requestAnimationFrame(function () {
    grid.appendChild(frag)
  })
  currentGrid = grid
}

export function reset () {
  index = 0
  tobi.destroy()
}

function setup (grid) {
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

function createElement (index) {
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
    observer.observe(img)
    link.appendChild(img)
    card = cardTemplate.cloneNode(false)
    card.appendChild(link)
    if (!imgMode) {
        card.appendChild(div)
    }
  }
  return card
}

// Dynamic observer
const observer = new IntersectionObserver(changes => {
  changes.forEach(change => {
    // Edge 15 doesn't support isIntersecting, but we can infer it
    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12156111/
    // https://github.com/WICG/IntersectionObserver/issues/211
    const isIntersecting = (typeof change.isIntersecting === 'boolean')
      ? change.isIntersecting : change.intersectionRect.height > 0
    if (isIntersecting) {
      load(change.target)

      appendElement();
      tobi.add(change.target.parentElement)

      // Stop observing the current target
      observer.unobserve(change.target)
    }
  })
})
