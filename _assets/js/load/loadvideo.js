import { addLoaded } from './addloaded'
import { replaceSrc } from './replacesrc'

export function loadVideo (element) {
    element.onloadstart = () => addLoaded(element)
    for (let i = 0; i < 2; i++) {
      replaceSrc(element.children[i])
    }
    element.load()
}
