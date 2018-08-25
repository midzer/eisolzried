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
  grid = gridDest

  done = fillFrag(createElement)

  if (!isVisualUpdateScheduled) {
    isVisualUpdateScheduled = true
    requestAnimationFrame(appendDocumentFragment)
  }
  if (!done || (frag.childElementCount && !isVisualUpdateScheduled)) {
    appendFragment(grid, createElement)
  }
}

function appendDocumentFragment () {
  children.push.apply(children, Array.from(frag.children))
  grid.appendChild(frag)
  isVisualUpdateScheduled = false
  if (done) {
    for (let i = 0, len = children.length; i < len; i++) {
      observer.observe(children[i].querySelector('img'))
      tobi.add(children[i].querySelector('a'))
    }
    children.length = 0
  }
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
