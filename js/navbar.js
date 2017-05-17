function setTheme(local) {
    var theme, icon, css;
    if (local == 'light') {
        theme = 'dark';
        icon = 'sun';
        css = '/css/dark-theme.min.css';
    }
    else  {
        theme = 'light';
        icon = 'moon';
        css = ''
    }
    document.getElementById('theme-link').setAttribute('href', css);
    document.getElementById('theme-icon').setAttribute('class', 'icon-' + icon);
    localStorage.setItem('theme', theme);
}

if (localStorage.getItem('theme') == 'dark') {
    setTheme('light');
}
else {
    localStorage.setItem('theme', 'light');
}

document.getElementById('theme-switch').onclick = function() {
    setTheme(localStorage.getItem('theme'));
};
