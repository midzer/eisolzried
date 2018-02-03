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

window.below4G = function below4G() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
        const types = ['slow-2g', '2g', '3g'];
        if (types.indexOf(connection.effectiveType) > -1) {
            return true;
        }
    }
    return false;
}
