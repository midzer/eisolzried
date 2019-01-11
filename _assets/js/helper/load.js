import { loadScript } from './loadscript'

function removeHint () {
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
  addLoaded(element)
  element.removeAttribute('data-icon')
}

export function load (element) {
  switch (element.tagName) {
    case 'IMG':
    case 'IFRAME':
      loadImage(element)
      if (element.classList.contains('dynamic')) {	
        tobi.add(element.parentElement)	
      }
      break;
    case 'VIDEO':
      loadVideo(element)
      break;
    case 'svg':
      loadSVG(element)
      break;
    default:
      element.classList.remove('lazy')
      loadScript(element.getAttribute('data-src'))
      /*if (element.hasAttribute('data-type') && navigator.userAgent.indexOf('Chrome') > -1)
      loadModule(element.getAttribute('data-src'))*/
  }
}

export { loadScript } from './loadscript'
