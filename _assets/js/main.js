// Theme switch
function setTheme(theme) {
    var disabled, icon;
    if (theme == 'dark') {
        disabled = false;
        icon = 'sun';
    }
    else {
        disabled = true;
        icon = 'moon';
    }
    document.getElementById('theme-link').disabled = disabled;
    document.getElementById('theme-icon').href.baseVal = '/assets/icons/sprite.svg#' + icon;
    localStorage.setItem('theme', theme);
}
if (localStorage.getItem('theme') != 'dark') {
    setTheme('light');
}
else {
    setTheme('dark');
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
function query(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function replaceSrc(element) {
    element.src = element.dataset.src;
    element.removeAttribute('data-src');
}
function addLoaded(element) {
    element.classList.add('loaded');
}
function load(element) {
    if (element.nodeName == 'VIDEO') {
        var sources = element.getElementsByTagName('source');
        for (let i = 0; i < sources.length; i++) {
            replaceSrc(sources[i]);
        }
        element.load();
        element.onloadstart = function() { addLoaded(element) };
    }
    else {
        replaceSrc(element);
        element.onload = function() { addLoaded(element) };
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
        window.location = path.replace('/by','');;
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
const endpoint = '/assets/data/search.json';
const pages = [];
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => pages.push(...data))
function findResults(termToMatch, pages) {
    return pages.filter(item => {
        const regex = new RegExp(termToMatch, 'gi');
        return item.title.match(regex) || item.content.match(regex);
    });
}
function displayResults() {
    const resultsArray = findResults(this.value, pages);
    const html = resultsArray.map(item => {
        return `
            <li><a href="${item.url}">${item.title}</a></li>`;
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
lightbox(".lightbox", {
    close: false,
    counter: false,
    zoom: false,
    docClose: true
});
