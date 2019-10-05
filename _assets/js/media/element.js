import { images } from './images'
import { videos } from './videos'
import { trans } from './trans'
import { loadImage } from '../load/loadimage'

const imgLength = images.length,
  vidLength = videos.length,
  imgPath = '/assets/images/media/',
  vidPath = '/assets/videos/media/',
  imgTemplate = document.createElement('img'),
  vidTemplate = document.createElement('video'),
  extension = vidTemplate.canPlayType('video/webm') ? 'webm' : 'mp4',
  frag = document.createDocumentFragment()

let elements,
  length,
  path,
  imgMode,
  index = 0,
  currentGrid

imgTemplate.className = 'lazy'
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
  setup(grid)
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
  if (grid.id === 'image-grid') {
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
  let link
  if (index < length) {
    link = document.createElement('a')
    const element = elements[index]
    const img = imgTemplate.cloneNode(false)
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
    }
    observer.observe(img)
    link.appendChild(img)
    if (!imgMode) {
      const div = document.createElement('div')
      div.id = `v${element}`
      const vid = vidTemplate.cloneNode(false)
      vid.src = `${path}${element}.${extension}`
      div.appendChild(vid)
      link.appendChild(div)
    }
  }
  return link
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
      loadImage(change.target)

      appendElement()
      tobi.add(change.target.parentElement)

      // Stop observing the current target
      observer.unobserve(change.target)
    }
  })
})
