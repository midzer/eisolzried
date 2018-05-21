'use strict';

// Load more posts
document.getElementById('moreposts').onclick = function() {
    if (!/Mobi/.test(navigator.userAgent)) {
        // Only apply styling for desktop browsers
        this.previousElementSibling.style.overflowY = 'auto';
        this.previousElementSibling.style.height = '576px';
    }
    const els = document.querySelectorAll('li[hidden]');
    for (let i = 0; i < 4; i++) {
        els[i].removeAttribute('hidden');
        if (els.length == i + 1) {
            this.parentNode.removeChild(this);
        }
    }
};

// New posts badges
let lastIndex = Number(localStorage.getItem('lastindex'));
const els = document.querySelectorAll('[data-index]');
for (let i = els.length - 1; i >= 0; i--) {
    const index = Number(els[i].getAttribute('data-index'));
    if (index > lastIndex) {
        const span = document.createElement('span');
        span.className = 'badge badge-primary ml-1';
        span.innerText = 'Neu';
        els[i].appendChild(span);
        lastIndex = index;
    }
};
localStorage.setItem('lastindex', lastIndex);
