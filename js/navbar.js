var path = window.location.pathname;
var langBtn = document.getElementById('language-btn');
var langImg = document.getElementById('flag-img');
if (path.indexOf("/by/") === -1) {
    langImg.src = '/assets/by.png';
    langImg.alt = 'Flagge Bayern';
    langBtn.onclick = function() {
        window.location = '/by'.concat(path);
    };
}
else {
    langImg.src = '/assets/de.png';
    langImg.alt = 'Flagge Deutschland';
    langBtn.onclick = function() {
        window.location = path.replace('/by','');;
    };
}

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
    document.getElementById('theme-link').href = css;
    document.getElementById('theme-icon').className = 'icon-' + icon;
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
