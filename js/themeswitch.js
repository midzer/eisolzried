function setTheme() {
    var theme;
    if (localStorage.getItem('theme') == 'light') {
        theme = '';
    }
    else {
        theme = '/css/dark-theme.min.css'
    }
    document.getElementById('theme-link').setAttribute('href', theme);
}

if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'light');
}
setTheme();
