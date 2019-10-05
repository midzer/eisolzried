import { loadImage } from './loadimage'
import { loadVideo } from './loadvideo'
import { loadSVG } from './loadsvg'
import { loadScript } from './loadscript'

export function load (element) {
  switch (element.tagName) {
    case 'IMG':
    case 'IFRAME':
      loadImage(element)
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
