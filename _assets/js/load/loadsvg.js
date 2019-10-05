import { addLoaded } from './addloaded'

export function loadSVG (element) {
    // Too bad browsers dont trigger onload consistently:
    // * Chromium only on pageload, sub viewport elements wont show up
    // * Firefox doesnt trigger at all
    // -> do animation instantely
    element.querySelector('use').href.baseVal = `/assets/icons/sprite.svg#${element.getAttribute('data-icon')}`
    addLoaded(element)
    element.removeAttribute('data-icon')
}
