// 5. Convert node list of all images with data-src attributed to array
var imgs = document.querySelectorAll('img[data-src]');
if (! ('IntersectionObserver' in window)) {
  console.log('Intersection Observers not supported');
  for (var i = 0; i < imgs.length; i++) {
      imgs[i].src = imgs[i].dataset.src;
  }
} else {
  // 1. Create the IntersectionObserver and bind it to the function we want it to work with
  var observer = new IntersectionObserver(onChange, {
      threshold: 0.5
  });
  
  function onChange(changes) {
      // 2. For each image that we want to change
      changes.forEach(change => {
          if (change.isIntersecting) {
              console.log("loaded");
              // 3. take image url from `data-src` attribute
              change.target.src = change.target.dataset.src;
              // 4. Stop observing the current target
              observer.unobserve(change.target);
              change.target.onload = () => change.target.classList.add('loaded');
          }
    })
  }
  // 6. Observe each image derived from the array above
  imgs.forEach(img => observer.observe(img));
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
