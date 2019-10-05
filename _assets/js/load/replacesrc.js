export function replaceSrc (element) {
    element.setAttribute('src', element.getAttribute('data-src'))
    element.removeAttribute('data-src')
}
