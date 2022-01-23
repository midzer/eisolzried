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
    if (element.hasAttribute('data-srcset')) {
        element.setAttribute('srcset', element.getAttribute('data-srcset'))
        element.removeAttribute('data-srcset')
    }
}

export function loadImage (element) {
    element.onload = () => addLoaded(element)
    replaceSrc(element)
}

export function loadVideo (element) {
    element.onloadstart = () => addLoaded(element)
    for (let i = 0; i < 2; i++) {
      replaceSrc(element.children[i])
    }
    element.load()
}

export function loadSVG (element) {
    // Too bad browsers dont trigger onload consistently:
    // * Chromium only on pageload, sub viewport elements wont show up
    // * Firefox doesnt trigger at all
    // -> do animation instantely
    element.querySelector('use').href.baseVal = `/assets/icons/sprite.svg#${element.getAttribute('data-icon')}`
    addLoaded(element)
    element.removeAttribute('data-icon')
}
