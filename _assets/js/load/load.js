import { loadImage } from './loadelement'
import { loadVideo } from './loadelement'
import { loadSVG } from './loadelement'
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
      element.classList.add('loading')
      loadScript(element.getAttribute('data-src')).then(() => {
        element.classList.remove('loading')
        element.removeAttribute('data-src')
      })
  }
}
