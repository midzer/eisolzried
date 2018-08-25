import { createImage } from './media/image'
import { createVideo } from './media/video'

function fillFrag (createElement) {
  const start = Date.now()
  while (Date.now() - start < 3) {
    let element = createElement(index++)
    if (!element) {
      return true
    }
    frag.appendChild(element)
  }
}

function appendFragment (gridDest, createElement) {
  if (!isVisualUpdateScheduled) {
    isVisualUpdateScheduled = true
    grid = gridDest
    requestAnimationFrame(appendDocumentFragment)
  }
  
  done = fillFrag(createElement)

  if (!done || (frag.childElementCount && !isVisualUpdateScheduled)) {
    appendFragment(gridDest, createElement)
  }
}

function appendDocumentFragment () {
  if (frag.childElementCount) {
    children.push.apply(children, Array.from(frag.children))
    grid.appendChild(frag)  
  }
  // Finally...
  if (done) {
    // Observe and dynamic adding to lightbox
    for (let i = 0, len = children.length; i < len; i++) {
      observer.observe(children[i].querySelector('img'))
      tobi.add(children[i].querySelector('a'))
    }
    // Cleanup
    children.length = 0
  }
  // Reset
  isVisualUpdateScheduled = false
}

const imageTab = document.getElementById('bilder-tab'),
  videoTab = document.getElementById('videos-tab'),
  imageGrid = document.getElementById('image-grid'),
  videoGrid = document.getElementById('video-grid')
let index = 0,
  frag = document.createDocumentFragment(),
  grid,
  children = [],
  isVisualUpdateScheduled,
  done

imageTab.addEventListener('shown.bs.tab', function () {
  index = 0
  tobi.reset()
  appendFragment(imageGrid, createImage)
  while (videoGrid.firstChild) {
    videoGrid.removeChild(videoGrid.firstChild)
  }
}, false)

videoTab.addEventListener('shown.bs.tab', function () {
  index = 0
  tobi.reset()
  appendFragment(videoGrid, createVideo)
  while (imageGrid.firstChild) {
    imageGrid.removeChild(imageGrid.firstChild)
  }
}, false)
// Kickstart
appendFragment(imageGrid, createImage)
