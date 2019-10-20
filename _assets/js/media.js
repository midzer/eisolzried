import { create, reset } from './media/element'
import { loadScript } from './load/loadscript'

function cleanup (grid) {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild)
  }
}

const imageTab = document.getElementById('bilder-tab'),
  videoTab = document.getElementById('videos-tab'),
  imageGrid = document.getElementById('image-grid'),
  videoGrid = document.getElementById('video-grid')

imageTab.addEventListener('show.bs.tab', () => {
  create(imageGrid)
})
videoTab.addEventListener('show.bs.tab', () => {
  create(videoGrid)
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
const lightbox = loadScript('lightbox.js')
lightbox.then(() => create(imageGrid))
