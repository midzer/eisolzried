import { createImage, resetImages } from './media/image'
import { createVideo, resetVideos } from './media/video'
import { load } from './helper/lazy'

function appendElement (parent, createElement) {
  const element = createElement()
  if (element) {
    return parent.appendChild(element)
  }
}

function appendFragment (grid, createElement) {
  let frag = document.createDocumentFragment()
  for (let i = 0; i < 24; i++) {
    appendElement(frag, createElement)
  }
  const children = Array.from(frag.children) // shallow copy due empty frag after appendChild()
  grid.appendChild(frag)
  children.forEach(child => {
    observeElement(child)
  })
}

function observeElement (element) {
  mediaObserver.observe(element.querySelector('img'))
  tobi.add(element.querySelector('a'))
}

const imageTab = document.getElementById('bilder-tab')
const videoTab = document.getElementById('videos-tab')
const imageGrid = document.getElementById('image-grid')
const videoGrid = document.getElementById('video-grid')

imageTab.addEventListener('shown.bs.tab', function() {
  tobi.reset()
  appendFragment(imageGrid, createImage)
  while (videoGrid.firstChild) {
    videoGrid.removeChild(videoGrid.firstChild);
  }
  resetVideos()
}, false);

videoTab.addEventListener('shown.bs.tab', function() {
  tobi.reset()
  appendFragment(videoGrid, createVideo)
  while (imageGrid.firstChild) {
    imageGrid.removeChild(imageGrid.firstChild);
  }
  resetImages()
}, false);

// Pre-load items that are within 2 multiples of the visible viewport height.
const mediaObserver = new IntersectionObserver(changes => {
  changes.forEach(change => {
    // Edge 15 doesn't support isIntersecting, but we can infer it
    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12156111/
    // https://github.com/WICG/IntersectionObserver/issues/211
    const isIntersecting = (typeof change.isIntersecting === 'boolean')
      ? change.isIntersecting : change.intersectionRect.height > 0
    if (isIntersecting) {
      // Stop observing the current target
      mediaObserver.unobserve(change.target)

      load(change.target)

      let element
      if (change.target.closest('#image-grid')) {
        element = appendElement(imageGrid, createImage)
      } else if (change.target.closest('#video-grid')) {
        element = appendElement(videoGrid, createVideo)
      }
      if (element) {
        observeElement(element)
      }
    }
  })
}
)
// Kickstart by adding a large set
appendFragment(imageGrid, createImage)
