function replaceSrc(element) {
    if (element.nodeName == 'VIDEO') {
        var sources = element.getElementsByTagName('source');
        for (let i = 0; i < sources.length; i++) {
            sources[i].src = sources[i].dataset.src;
            sources[i].removeAttribute('data-src');
        }
        element.load();
    }
    else {
        element.src = element.dataset.src;
        element.removeAttribute('data-src');
        element.onload = function() {
            element.classList.add('loaded');
        }
    }
}

// 1. Convert node list of all elements with data-src attributed to array
var els = document.querySelectorAll('.lazy');
if (! ('IntersectionObserver' in window)) {
  console.log('Intersection Observers not supported');
  for (var i = 0; i < els.length; i++) {
      replaceSrc(els[i]);
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
              replaceSrc(change.target);

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

SimpleJekyllSearch({
searchInput: document.getElementById('search-input'),
resultsContainer: document.getElementById('results-container'),
json: '/search.json',
searchResultTemplate: '<li><a href="{url}">{title}</a></li>',
noResultsText: '<li><a>Nix gfunna!</a></li>',
limit: 5,
fuzzy: false,
exclude: ['Welcome']
});
