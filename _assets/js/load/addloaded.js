function removeHint () {
    this.style.willChange = 'auto'
    this.removeEventListener('animationend', removeHint)
}

export function addLoaded (element) {
    element.addEventListener('animationend', removeHint)
    element.classList.add('loaded')
}
