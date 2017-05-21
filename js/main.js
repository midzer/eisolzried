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

// 1. Convert node list of all elements with data-src attributed to array
var els = document.querySelectorAll('.lazy');
if (! ('IntersectionObserver' in window)) {
  console.log('Intersection Observer not supported');
  for (var i = 0; i < els.length; i++) {
      load(els[i]);
  }
} else {
  // 2. Create the IntersectionObserver and bind it to the function we want it to work with
  var observer = new IntersectionObserver(onChange, {
      threshold: 0.5
  });
  
  function onChange(changes) {
      // 3. For each element that we want to change
      changes.forEach(change => {
          if (change.isIntersecting) {
              // 4. take url from `data-src` attribute
              load(change.target);

              // 5. Stop observing the current target
              observer.unobserve(change.target);

              console.log('lazy loaded element');
          }
        })
  }
  // 6. Observe each image derived from the array above
  els.forEach(el => observer.observe(el));
}

$('.gallery a').simpleLightbox();

const endpoint = '/search.json';
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
