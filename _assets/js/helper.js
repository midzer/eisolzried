window.query = function query(selector) {
    return Array.from(document.querySelectorAll(selector));
}

window.findUpElement = function findUpElement(el, className) {
    while (el.parentNode) {
        el = el.parentNode;
        if (el.classList.contains(className))
            return el;
    }
    return null;
}
