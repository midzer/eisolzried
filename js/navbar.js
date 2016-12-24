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

function switchTheme() {
    var newTheme;
    if (localStorage.getItem('theme') == 'light') {
        newTheme = 'dark';
    }
    else {
        newTheme = 'light';
    }
    localStorage.setItem('theme', newTheme);
}

function setIcon() {
    var icon;
    if (localStorage.getItem('theme') == 'light') {
        icon = 'moon';
    }
    else {
        icon = 'sun';
    }
    document.getElementById('theme-icon').setAttribute('class', 'icon-' + icon);
}

document.getElementById('theme-switch').onclick = function() {
    switchTheme();
    setTheme();
    setIcon();
};
setIcon();
