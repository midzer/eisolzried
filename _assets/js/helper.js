window.loadScript = function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.async = true;
        script.src = src;
        script.onload = () => {
            resolve(script.src);
        };
        script.onerror = reject;
        if (document.head.lastChild != script) {
            document.head.appendChild(script);
        }
    });
}

window.query = function query(selector) {
    return [].slice.call(document.getElementsByClassName(selector));
}

window.findUpElement = function findUpElement(el, className) {
    while (el.parentNode) {
        el = el.parentNode;
        if (el.classList.contains(className))
            return el;
    }
    return null;
}
