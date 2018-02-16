// Theme switch
function setTheme(theme) {
    var rel, icon;
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

document.getElementById('theme-switch').onclick = () => {
    if (localStorage.getItem('theme') == 'dark') {
        setTheme('light');
    }
    else {
        setTheme('dark');
    }
};

if (localStorage.getItem('theme') == 'dark') {
    setTheme('dark');
}
else {
    setTheme('light');
}

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

function addLoader(element) {
    var loader = document.createElement('img');
    loader.className = "icon icon--loader d-block mx-auto";
    loader.src = "/assets/icons/sprite.svg#puff";
    return element.insertAdjacentElement("afterend", loader);
}

function loadScript(element) {
    return new Promise((resolve, reject) => {
        let loader = null;
        if (below4G()) {
            loader = addLoader(element);
        }
        const script = document.createElement('script');
        script.async = true;
        script.src = element.dataset.src;
        removeDataSrc(element);
        script.onload = () => {
            resolve(script.src);
            addLoaded(element);
            if (loader) {
                loader.parentNode.removeChild(loader);
            }
        };
        script.onerror = reject;
        if (document.head.lastChild != script) {
            document.head.appendChild(script);
        }
    });
}

function load(element) {
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
        loadScript(element);
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
  },
  { rootMargin: "150px 0px" }
);

query(".lazy").forEach(function(item) {
    observer.observe(item);
});

// Language switch
var path = window.location.pathname;
var langBtn = document.getElementById('language-btn');
if (path.indexOf("/by/") === -1) {
    langBtn.onclick = () => {
        window.location = '/by'.concat(path);
    };
}
else {
    langBtn.onclick = () => {
        window.location = path.replace('/by','');
    };
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

const field = document.querySelector('#search-input');
const resultsList = document.querySelector('#results-container');
field.addEventListener('keyup', displayResults);
field.addEventListener('keypress', event => {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
});

// Lightbox
if (query('.lightbox').length) {
    require('rqrauhvmra__tobi')({
        close: false,
        counter: false,
        zoom: false,
        docClose: true
    });
}

// Snackbar
window.snackbar = new Snackbar(query('.snackbar')[0]);

// Progressbar
var progressBar = query('.progressbar')[0];
var ticking = false;

function requestTick() {
    if ('requestIdleCallback' in window) {
        if (!ticking) {
            ticking = true;
            requestIdleCallback(update, { timeout: 100 });
        }
    }
    else {
        requestAnimationFrame(update);
    }
}

function update() {
    let percent = 100 * window.pageYOffset / (document.body.clientHeight - window.innerHeight);
    progressBar.style.width = percent + '%';
    progressBar.setAttribute("aria-valuenow", percent);
    ticking = false;
}

window.addEventListener('scroll', requestTick, false);

// Modal
import { Modal } from 'bootstrap.native/dist/bootstrap-native-v4';
window.modal = new Modal(document.getElementById('event-modal'));

const Snowflakes = require('magic-snowflakes');
Snowflakes();
