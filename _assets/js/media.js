import { createImage } from './media/image'
import { createVideo } from './media/video'

function appendFragment (grid, createElement) {
  const frag = document.createDocumentFragment()
  const start = Date.now();
  var element
  while (Date.now() - start < 3) {
    element = createElement(index++)
    if (!element) {
      break
    }
    frag.appendChild(element)
  }
  // Shallow copy due empty frag after append
  const children = Array.from(frag.children)
  grid.appendChild(frag)
  for (let i = 0, len = children.length; i < len; i++) {
    observer.observe(children[i].querySelector('img'))
    tobi.add(children[i].querySelector('a'))
  }
  if (element)
    appendFragment(grid, createElement)
}

const imageTab = document.getElementById('bilder-tab')
const videoTab = document.getElementById('videos-tab')
const imageGrid = document.getElementById('image-grid')
const videoGrid = document.getElementById('video-grid')
var index = 0

imageTab.addEventListener('shown.bs.tab', function() {
  index = 0
  tobi.reset()
  appendFragment(imageGrid, createImage)
  while (videoGrid.firstChild) {
    videoGrid.removeChild(videoGrid.firstChild);
  }
}, false);

videoTab.addEventListener('shown.bs.tab', function() {
  index = 0
  tobi.reset()
  appendFragment(videoGrid, createVideo)
  while (imageGrid.firstChild) {
    imageGrid.removeChild(imageGrid.firstChild);
  }
}, false);
// Kickstart
appendFragment(imageGrid, createImage)
