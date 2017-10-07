// CommonJS imports
import { Modal } from 'bootstrap.native/dist/bootstrap-native-v4';

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

if (localStorage.getItem('theme') == 'dark') {
    setTheme('dark');
}
else {
    setTheme('light');
}
document.getElementById('theme-switch').onclick = function() {
    if (localStorage.getItem('theme') == 'dark') {
        setTheme('light');
    }
    else {
        setTheme('dark');
    }
};

// Set up lazy loading
function replaceSrc(element) {
    element.src = element.dataset.src;
    element.removeAttribute('data-src');
}

function removeHint() {
    this.style.willChange = 'auto';
}

function addLoaded(element) {
    element.addEventListener('animationend', removeHint);
    element.classList.add('loaded');
}

function loadScript(src) {
    return new Promise(function(resolve, reject) {
        const script = document.createElement('script');
        script.async = true;
        script.src = '/assets/js/' + src.id + '.js';
        script.onload = function() {
            resolve(script.src);
            addLoaded(src);
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
        element.onloadstart = function() { addLoaded(element) };
        var sources = element.getElementsByTagName('source');
        for (let i = 0; i < sources.length; i++) {
            replaceSrc(sources[i]);
        }
        element.load();
    }
    else if (element.nodeName == 'IMG') {
        // <img> element
        element.onload = function() { addLoaded(element) };
        replaceSrc(element);
    }
    else if (element.hasAttribute('id')) {
        // any element with an id
        loadScript(element);
    }
}

// Pre-load items that are within 2 multiples of the visible viewport height.
var observer = new IntersectionObserver(function(changes) {
    changes.forEach(function(change) {
        // Edge 15 doesn't support isIntersecting, but we can infer it
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12156111/
        // https://github.com/WICG/IntersectionObserver/issues/211
        const isIntersecting = (typeof change.isIntersecting === 'boolean') ?
        change.isIntersecting : change.intersectionRect.height > 0;
        if (isIntersecting) {
            load(change.target);

            // 5. Stop observing the current target
            observer.unobserve(change.target);
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
    langBtn.onclick = function() {
        window.location = '/by'.concat(path);
    };
}
else {
    langBtn.onclick = function() {
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
document.getElementById('siren-btn').onclick = function() {
    var player = document.getElementById('siren-player');
    document.getElementById('siren-icon').href.baseVal = '/assets/icons/sprite.svg#' + (player.paused ? 'volume-2' : 'play');
    toggleAudio(player);
};

// Fire run
document.getElementById('fire-station').onclick = function() {
    var truck = document.getElementById("fire-truck");
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
field.addEventListener('keypress', function(event) {
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
window.snackbar = new Snackbar(document.getElementById("snackbar"));

// Progressbar
var progressBar = document.getElementById('progress-bar');
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
    var percent = 100 * window.pageYOffset / (document.body.clientHeight - window.innerHeight);
    progressBar.style.width = percent + '%';
    progressBar.setAttribute("aria-valuenow", percent);
    ticking = false;
}

window.addEventListener('scroll', requestTick, false);

// Modal
window.modal = new Modal(document.getElementById('event-modal'));
