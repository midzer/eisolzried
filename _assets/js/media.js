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

function cleanup (grid) {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild)
  }
}

const imageTab = document.getElementById('bilder-tab'),
  videoTab = document.getElementById('videos-tab'),
  imageGrid = document.getElementById('image-grid'),
  videoGrid = document.getElementById('video-grid')
let index = 0

imageTab.addEventListener('show.bs.tab', () => {
  createGallery(imageGrid, createImage)
})
videoTab.addEventListener('show.bs.tab', () => {
  createGallery(videoGrid, createVideo)
})
imageTab.addEventListener('hide.bs.tab', () => {
  reset()
})
videoTab.addEventListener('hide.bs.tab', () => {
  reset()
})
imageTab.addEventListener('hidden.bs.tab', () => {
  cleanup(imageGrid)
})
videoTab.addEventListener('hidden.bs.tab', () => {
  cleanup(videoGrid)
})
// Kickstart
createGallery(imageGrid, createImage)
