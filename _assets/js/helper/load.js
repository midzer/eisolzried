import { loadScript } from './loadscript'

function removeHint () {
  this.classList.remove(['lazy', 'loaded'])
  this.style.willChange = 'auto'
  this.removeEventListener('animationend', removeHint)
}

function addLoaded (element) {
  element.addEventListener('animationend', removeHint)
  element.classList.add('loaded')
}

function replaceSrc (element) {
  element.setAttribute('src', element.getAttribute('data-src'))
  element.removeAttribute('data-src')
}

function loadVideo (element) {
  element.onloadstart = () => {
    addLoaded(element)
  }
  for (let i = 0; i < 2; i++) {
    replaceSrc(element.children[i])
  }
  element.load()
}

function loadImage (element) {
  element.onload = () => {
    addLoaded(element)
  }
  replaceSrc(element)
}

function loadSVG (element) {
  // Too bad browsers dont trigger onload consistently:
  // * Chromium only on pageload, sub viewport elements wont show up
  // * Firefox doesnt trigger at all
  // -> do animation instantely
  element.querySelector('use').href.baseVal = `/assets/icons/sprite.svg#${element.getAttribute('data-icon')}`
  element.removeAttribute('data-icon')
  addLoaded(element)
}

export function load (element) {
  if (element.hasAttribute('data-src') && element.dataset.src.slice(-3) === '.js') {
    element.classList.remove('lazy')
    loadScript(element.getAttribute('data-src'))
    /*if (element.hasAttribute('data-type') && navigator.userAgent.indexOf('Chrome') > -1)
    loadModule(element.getAttribute('data-src'))*/
  } else {
    element.style.willChange = 'opacity'
    if (element.tagName === 'IMG' || element.tagName === 'IFRAME') {
      loadImage(element)
    } else if (element.tagName === 'VIDEO') {
      loadVideo(element)
    } else if (element.tagName === 'A') {
      loadImage(element.querySelector('img'))
      tobi.add(element)
    } else if (element.tagName === 'svg') {
      loadSVG(element)
    }
  }
}

export { loadScript } from './loadscript'
