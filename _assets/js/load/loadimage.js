import { addLoaded } from './addloaded'
import { replaceSrc } from './replacesrc'

export function loadImage (element) {
    element.onload = () => addLoaded(element)
    replaceSrc(element)
}
