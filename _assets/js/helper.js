export function loadScript(src) {
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

export function query(selector) {
    return Array.from(document.getElementsByClassName(selector));
}

// Audio Player
export function toggleAudio(player) {
    if (player.paused) {
        if (player.readyState == 0) {
            player.load();
        }
        player.play();
    }
    else {
        player.pause();
    }
}

export const snackbar = new Snackbar(document.getElementById('snackbar'));

import { Modal } from 'bootstrap.native';
export const modal = new Modal(document.getElementById('event-modal'));

// Lazy loading
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
