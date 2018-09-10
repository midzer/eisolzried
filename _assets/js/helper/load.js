import { loadScript } from './loadscript'

function removeHint () {
  this.style.willChange = 'auto'
}

function addLoaded (element) {
  element.addEventListener('animationend', removeHint)
  element.classList.add('loaded')
}

function replaceSrc (element) {
  element.src = element.getAttribute('data-src')
  element.removeAttribute('data-src')
}

function loadVideo (element) {
  element.onloadstart = () => {
    addLoaded(element)
  }
  element.style.willChange = 'opacity'
  for (let i = 0; i < 2; i++) {
    replaceSrc(element.children[i])
  }
  element.load()
}

function loadImage (element) {
  element.onload = () => {
    addLoaded(element)
  }
  element.style.willChange = 'opacity'
  replaceSrc(element)
}

export function load (element) {
  if (element.nodeName === 'IMG' || element.nodeName === 'IFRAME') {
    loadImage(element)
  } else if (element.nodeName === 'VIDEO') {
    loadVideo(element)
  } else if (element.nodeName === 'A') {
    loadImage(element.querySelector('img'))
    tobi.add(element)
  /*} else if (element.hasAttribute('data-type') && navigator.userAgent.indexOf('Chrome') > -1) {
    loadModule(element.getAttribute('data-src'))*/
  } else {
    loadScript(element.getAttribute('data-src'))
  }
}

export { loadScript } from './loadscript'
