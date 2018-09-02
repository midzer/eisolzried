'use strict'

import { createImage } from './media/image'
import { createVideo } from './media/video'

function createGallery (grid, createElement) {
  const frag = document.createDocumentFragment()
  let element
  while (element = createElement(index++)) {
    observer.observe(element.querySelector('a'))
    frag.appendChild(element)
  }
  window.requestAnimationFrame(function () {
    grid.appendChild(frag)
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
