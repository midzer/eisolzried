import { loadScript } from './loadscript';

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

function loadVideo(element) {
    element.onloadstart = () => {
        addLoaded(element);
    };
    const sources = Array.from(element.getElementsByTagName('source'));
    sources.forEach(source => {
        replaceSrc(source);
    });
    element.load();
}

function loadImage(element) {
    element.onload = () => {
        addLoaded(element)
    };
    replaceSrc(element);
}

export function load(element) {
    element.style.willChange = 'opacity';
    if (element.nodeName == 'VIDEO') {
        loadVideo(element);    
    }
    else if (element.nodeName == 'IMG' || element.nodeName == 'IFRAME') {
        loadImage(element);
    }
    else {
        // any element with data-src
        element.style.opacity = '1';
        loadScript(element.dataset.src);
    }
}
