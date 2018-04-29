// Set up lazy loading
function replaceSrc(element) {
    element.src = element.dataset.src;
    removeDataSrc(element);
}

function removeDataSrc(element) {
    element.removeAttribute('data-src');
}

function removeHint() {
    this.style.willChange = 'auto';
}

function addLoaded(element) {
    element.addEventListener('animationend', removeHint);
    element.classList.add('loaded');
}

function load(element) {
    element.style.willChange = 'opacity';
    if (element.nodeName == 'VIDEO') {
        // <video> element
        element.onloadstart = () => {
            addLoaded(element)
        };
        const sources = element.getElementsByTagName('source');
        Array.from(sources).forEach(source => {
            replaceSrc(source);
        });
        element.load();
    }
    else if (element.nodeName == 'IMG' || element.nodeName == 'IFRAME') {
        // <img> element
        element.onload = () => {
            addLoaded(element)
        };
        replaceSrc(element);
    }
    else {
        // any element with data-src
        element.style.opacity = '1';
        loadScript(element.dataset.src);
    }
}

// Pre-load items that are within 2 multiples of the visible viewport height.
var observer = new IntersectionObserver(changes => {
    changes.forEach(change => {
        // Edge 15 doesn't support isIntersecting, but we can infer it
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12156111/
        // https://github.com/WICG/IntersectionObserver/issues/211
        const isIntersecting = (typeof change.isIntersecting === 'boolean') ?
        change.isIntersecting : change.intersectionRect.height > 0;
        if (isIntersecting) {
            // Stop observing the current target
            observer.unobserve(change.target);

            load(change.target);
        }
    });
  }
);

query(".lazy").forEach(function(item) {
    observer.observe(item);
});
