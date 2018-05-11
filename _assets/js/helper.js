function loadScript(src) {
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

function query(selector) {
    return Array.from(document.getElementsByClassName(selector));
}

// Audio Player
function toggleAudio(player) {
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

const snackbar = new Snackbar(document.getElementById('snackbar'));

import { Modal } from 'bootstrap.native';
window.modal = new Modal(document.getElementById('event-modal'));

export { loadScript, query, toggleAudio, snackbar };
