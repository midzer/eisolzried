// Load more posts
document.getElementById('moreposts').onclick = function() {
    var els = document.querySelectorAll('.hidden');
    for (var i = 0; i < 6; i++) {
        if (els.length == i) {
            this.classList.add('hidden');
            break;
        }
        els[i].classList.remove('hidden');
    }
};
