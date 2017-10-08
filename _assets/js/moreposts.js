// Load more posts
document.getElementById('moreposts').onclick = function() {
    var els = document.querySelectorAll('li[hidden]');
    for (var i = 0; i < 3; i++) {
        if (els.length == i) {
            this.setAttribute('hidden', '');
            break;
        }
        els[i].removeAttribute('hidden');
    }
};
