// Load more posts
document.getElementById('moreposts').onclick = function() {
    var els = document.querySelectorAll('li[hidden]');
    for (var i = 0; i < 7; i++) {
        if (els.length == i) {
            this.setAttribute('hidden', '');
            break;
        }
        els[i].removeAttribute('hidden');
    }
};

// New posts badges
let lastIndex = Number(localStorage.getItem('lastindex'));
let badge = `<span class="badge badge-primary ml-1">Neu</span>`;
let els = document.querySelectorAll('[data-index]');
els.forEach(el => {
    let index = Number(el.getAttribute('data-index'));
    if (index > lastIndex) {
        el.innerHTML += badge;
        lastIndex = index;
    }
});
localStorage.setItem('lastindex', lastIndex);
