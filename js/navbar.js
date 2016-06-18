SimpleJekyllSearch({
searchInput: document.getElementById('search-input'),
resultsContainer: document.getElementById('results-container'),
json: '/search.json',
searchResultTemplate: '<li><a href="{url}">{title}</a></li>',
noResultsText: '<li><a>Nix gfunna!</a></li>',
limit: 10,
fuzzy: false,
exclude: ['Welcome']
});

