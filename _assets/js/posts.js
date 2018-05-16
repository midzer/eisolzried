'use strict';

// Load more posts
document.getElementById('moreposts').onclick = function() {
    if (!/Mobi/.test(navigator.userAgent)) {
        // Only apply styling for desktop browsers
        this.previousElementSibling.style.overflowY = 'auto';
        this.previousElementSibling.style.height = '585px';
    }
    var els = document.querySelectorAll('li[hidden]');
    for (var i = 0; i < 8; i++) {
        if (els.length == i) {
            this.setAttribute('hidden', '');
            break;
        }
        els[i].removeAttribute('hidden');
    }
};

// New posts badges
let lastIndex = Number(localStorage.getItem('lastindex'));
let els = document.querySelectorAll('[data-index]');
for (var i = els.length - 1; i >= 0; i--) {
    let index = Number(els[i].getAttribute('data-index'));
    if (index > lastIndex) {
        els[i].innerHTML += `<span class="badge badge-primary ml-1">Neu</span>`;
        lastIndex = index;
    }
};
localStorage.setItem('lastindex', lastIndex);
