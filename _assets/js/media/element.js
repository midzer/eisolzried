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
  canPlayWebm = vidTemplate.canPlayType('video/webm'),
  extension = canPlayWebm ? 'webm' : 'mp4',
  type = canPlayWebm ? 'video/webm;codecs="vp9,opus"' : 'video/mp4;codecs="avc1.42c01e,mp4a.40.2"',
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

function appendElement (frag) {
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
  window.requestAnimationFrame(() => grid.appendChild(frag))
  currentGrid = grid
}

export function reset () {
  index = 0
  tobi.destroy()
}

function setup (grid) {
  // Default for images
  elements = images
  length = imgLength
  path = imgPath
  imgMode = true

  if (grid.id === 'video-grid') {
    // Adapt for videos
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
    
    const element = elements[index],
      img = imgTemplate.cloneNode(false)
    
    // Defaults for images
    link.href = `${path}${element.name}.jpg`
    let name = element.name,
      alt = element.text
    
    if (!imgMode) {
      // Adjust for videos
      link.href = `#v${element}`
      link.setAttribute('data-type', 'html')
      name = element
      alt = element
    }
    img.setAttribute('data-src', `${path}thumbs/${name}-1x.jpg`)
    img.setAttribute('data-srcset',
                     `${path}thumbs/${name}-1x.jpg 1x,
                      ${path}thumbs/${name}-2x.jpg 2x,
                      ${path}thumbs/${name}-3x.jpg 3x`)
    img.alt = alt
    
    observer.observe(img)
    link.appendChild(img)

    if (!imgMode) {
      const div = document.createElement('div'),
        vid = vidTemplate.cloneNode(false)
      
      div.id = `v${element}`
      vid.src = `${path}${element}.${extension}`
      vid.setAttribute('type', type)
      
      div.appendChild(vid)
      link.appendChild(div)
    }
  }
  return link
}

// Dynamic observer
const observer = new IntersectionObserver(changes => {
  changes.forEach(change => {
    if (change.isIntersecting) {
      // Stop observing the current target
      observer.unobserve(change.target)
      
      loadImage(change.target)
      appendElement()
      tobi.add(change.target.parentElement)
    }
  })
})
