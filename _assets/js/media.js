import { createImage } from './media/image'
import { createVideo } from './media/video'

function fillFrag (createElement) {
  const start = Date.now()
  while (Date.now() - start < 5) {
    let element = createElement(index++)
    if (!element) {
      return true
    }
    observer.observe(element.querySelector('img'))
    frag.appendChild(element)
  }
}

function appendFragment (grid, createElement) {
  if (!isVisualUpdateScheduled) {
    isVisualUpdateScheduled = true

    requestAnimationFrame(function () {
      isVisualUpdateScheduled = false
      if (frag.childElementCount) {
        children.push.apply(children, Array.from(frag.children))
        grid.appendChild(frag)
      }
      if (!done) {
        appendFragment(grid, createElement)
      } else {
        // Finally add everything to lightbox
        for (let i = 0, len = children.length; i < len; i++) {
          tobi.add(children[i].querySelector('a'))
        }
        // Cleanup
        children.length = 0
      }
    })
  }
  done = fillFrag(createElement)
}

function reset () {
  index = 0
  tobi.reset()
}

const imageTab = document.getElementById('bilder-tab'),
  videoTab = document.getElementById('videos-tab'),
  imageGrid = document.getElementById('image-grid'),
  videoGrid = document.getElementById('video-grid')
let index = 0,
  frag = document.createDocumentFragment(),
  children = [],
  isVisualUpdateScheduled,
  done

imageTab.addEventListener('show.bs.tab', function () {
  reset()
  appendFragment(imageGrid, createImage)
  while (videoGrid.firstChild) {
    videoGrid.removeChild(videoGrid.firstChild)
  }
}, false)

videoTab.addEventListener('show.bs.tab', function () {
  reset()
  appendFragment(videoGrid, createVideo)
  while (imageGrid.firstChild) {
    imageGrid.removeChild(imageGrid.firstChild)
  }
}, false)
// Kickstart
appendFragment(imageGrid, createImage)
