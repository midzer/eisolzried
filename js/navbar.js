SimpleJekyllSearch({
searchInput: document.getElementById('search-input'),
resultsContainer: document.getElementById('results-container'),
json: '/search.json',
searchResultTemplate: '<li><a href="{url}">{title}</a></li>',
noResultsText: 'Keine Suchergebnisse',
limit: 10,
fuzzy: false,
exclude: ['Welcome']
});

