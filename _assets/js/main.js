'use strict';

import { loadScript } from './helper/loadscript';
import { toggleAudio } from './helper/toggleaudio';

// Lazy components
if (document.querySelectorAll('.lazy').length) {
    loadScript('/assets/js/lazy.js');
}

// Theme switch
function setTheme(theme) {
    let rel, icon;
    if (theme == 'dark') {
        rel = 'stylesheet';
        icon = 'sun';
    }
    else {
        rel = 'prefetch';
        icon = 'moon';
    }
    document.getElementById('theme-link').rel = rel;
    document.getElementById('theme-icon').href.baseVal = '/assets/icons/sprite.svg#' + icon;
    localStorage.setItem('theme', theme);
}

let sensor = null;
if ('AmbientLightSensor' in window) {
    sensor = new AmbientLightSensor();
    sensor.onreading = () => {
        if (sensor.illuminance == 0) {
            setTheme('dark');
        }
        else {
            setTheme('light');
        }
    };
    sensor.start();
}

document.getElementById('theme-switch').onclick = () => {
    if (sensor) {
        sensor.stop();
    }
    if (localStorage.getItem('theme') == 'dark') {
        setTheme('light');
    }
    else {
        setTheme('dark');
    }
};

// Language switch
const path = window.location.pathname;
document.getElementById('language-btn').onclick = () => {
    if (path.indexOf("/by/") === -1) {
        window.location = '/by'.concat(path);
    }
    else {
        window.location = path.replace('/by','');
    }
}

// Siren player
document.getElementById('siren-btn').onclick = () => {
    const player = document.getElementById('siren-player');
    document.getElementById('siren-icon').href.baseVal = '/assets/icons/sprite.svg#' + (player.paused ? 'volume-2' : 'play');
    toggleAudio(player);
};

// Fire run
document.getElementById('fire-station').onclick = () => {
    const truck = document.getElementById("fire-truck");
    if (truck.style.animationPlayState == "paused" || truck.style.animationPlayState == "") {
        truck.style.animationPlayState = "running";
    }
    else {
        truck.style.animationPlayState = "paused";
    }
    toggleAudio(document.getElementById('fire-run-player'));
};

// Custom search
const endpoint = '/search.json';
const pages = [];
fetch(endpoint)
.then(blob => blob.json())
.then(data => pages.push(...data));

function findResults(termToMatch, pages) {
    return pages.filter(item => {
        const regex = new RegExp(termToMatch, 'gi');
        return item.title.match(regex) || item.content.match(regex);
    });
}

function displayResults() {
    const resultsArray = findResults(this.value, pages);
    const html = resultsArray.map(item => {
        return `<a class="dropdown-item" href="${item.url}">${item.title}</a>`;
    }).join('');
    if ((resultsArray.length == 0) || (this.value == '')) {
        resultsList.innerHTML = `<p>Nix gfunna!</p>`;
    } else {
        resultsList.innerHTML = html;
    }
}

const field = document.getElementById('search-input');
const resultsList = document.getElementById('results-container');
field.addEventListener('keyup', displayResults);
field.addEventListener('keypress', event => {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
});

// Progressbar
function requestTick() {
    if (!ticking) {
        ticking = true;
        if ('requestIdleCallback' in window) {
            requestIdleCallback(update, { timeout: 500 });
        }
        else {
            requestAnimationFrame(update);
        }
    }
}

function update() {
    let value = window.pageYOffset / (document.body.clientHeight - window.innerHeight);
    progressBar.style.transform = 'scaleX(' + value + ')';
    progressBar.setAttribute("aria-valuenow", value * 100);
    ticking = false;
}

const progressBar = document.getElementById('progressbar');
let ticking = false;
window.addEventListener('scroll', requestTick, { passive: true });

// Snow
//const Snowflakes = require('magic-snowflakes');
//Snowflakes();

// Show render time
if (window.PerformanceNavigationTiming) {
    const [entry] = performance.getEntriesByType("navigation");
    document.getElementById('rendertime').innerText = parseInt(entry.domInteractive) + 'ms';
    document.getElementById('rendertext').hidden = false;
}

// Lightbox
if (document.querySelectorAll('.lightbox').length) {
    loadScript('/assets/js/lightbox.js');
}

// Globals
window.snackbar = new Snackbar(document.getElementById('snackbar'));

import { Modal } from 'bootstrap.native';
window.modal = new Modal(document.getElementById('event-modal'));
