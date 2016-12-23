function setTheme() {
    var theme;
    var icon;
    if (localStorage.getItem('theme') == 'light') {
        theme = '';
        icon = 'moon';
    }
    else {
        theme = '/css/dark-theme.min.css'
        icon = 'sun';
    }
    document.getElementById('theme-link').setAttribute('href', theme);
    document.getElementById('theme-icon').setAttribute('class', 'icon-' + icon);
}

function switchTheme() {
    var newTheme;
    if (localStorage.getItem('theme') == 'light') {
        newTheme = 'dark';
    }
    else {
        newTheme = 'light';
    }
    localStorage.setItem('theme', newTheme);
    setTheme(); 
}

if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'light');
}
setTheme();

document.getElementById('theme-switch').onclick = function() {
    switchTheme();
};
