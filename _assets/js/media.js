import { createImage } from './media/image'
import { createVideo } from './media/video'

function appendElement (frag, createElement) {
  const start = Date.now()
  while (Date.now() - start < 5) {
    const element = createElement(index++)
    if (!element) {
      return true
    }
    observer.observe(element.querySelector('img'))
    frag.appendChild(element)
  }
}

function createGallery (grid, createElement) {
  const frag = document.createDocumentFragment(),
    done = appendElement(frag, createElement)
  
  requestAnimationFrame(function () {
    const count = frag.childElementCount
    if (count) {
      const children = Array.from(frag.children)
      grid.appendChild(frag)
      for (let i = 0; i < count; i++) {
        tobi.add(children[i].querySelector('a'))
      }
    }
    if (!done) {
      createGallery(grid, createElement)
    }
  })
}

function reset () {
  index = 0
  tobi.reset()
}

const imageTab = document.getElementById('bilder-tab'),
  videoTab = document.getElementById('videos-tab'),
  imageGrid = document.getElementById('image-grid'),
  videoGrid = document.getElementById('video-grid')
let index = 0

imageTab.addEventListener('show.bs.tab', () => {
  reset()
  createGallery(imageGrid, createImage)
})
videoTab.addEventListener('show.bs.tab', () => {
  reset()
  createGallery(videoGrid, createVideo)
})
imageTab.addEventListener('hidden.bs.tab', () => {
  while (imageGrid.firstChild) {
    imageGrid.removeChild(imageGrid.firstChild)
  }
})
videoTab.addEventListener('hidden.bs.tab', () => {
  while (videoGrid.firstChild) {
    videoGrid.removeChild(videoGrid.firstChild)
  }
})
// Kickstart
createGallery(imageGrid, createImage)
