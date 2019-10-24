export function replaceSrc (element) {
    element.setAttribute('src', element.getAttribute('data-src'))
    element.removeAttribute('data-src')
    if (element.hasAttribute('data-srcset')) {
        element.setAttribute('srcset', element.getAttribute('data-srcset'))
        element.removeAttribute('data-srcset')
    }
}
