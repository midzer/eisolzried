import { images, path, trans } from './media/images';
import { load } from './helper/lazy';
import Tobi from "rqrauhvmra__tobi";

function createImage() {
    let card = null;
    if (images.length) {
        const image = images.shift();
        card = document.createElement('div');
        card.className = 'card border-primary';
        const link = document.createElement('a');
        link.href = path + image.name;
        link.className = 'lightbox';
        link.title = image.text;
        const img = document.createElement('img');
        img.className = 'endless card-img';
        img.src = trans;
        img.dataset.src = path + 'thumbs/' + image.name;
        img.title = image.text;
        img.alt = image.text;
        observer.observe(img);
        link.appendChild(img);
        tobi.initElement(link);
        card.appendChild(link);
    }
    return card;
}

function appendImage(parent) {
    const image = createImage();
    if (image) {
        parent.appendChild(image);
    }
}

function appendFragment() {
    let frag = document.createDocumentFragment();
    for (let i = 0; i < 24; i++) {
        appendImage(frag);
    }
    grid.appendChild(frag);
}

const grid = document.getElementById('image-grid');

const observer = new IntersectionObserver(changes => {
    changes.forEach(change => {
        const isIntersecting = (typeof change.isIntersecting === 'boolean') ?
        change.isIntersecting : change.intersectionRect.height > 0;
        if (isIntersecting) {
            observer.unobserve(change.target);

            load(change.target);

            appendImage(grid);
        }
    });
  }
);

const tobi = new Tobi({
    close: false,
    counter: false,
    zoom: false,
    docClose: true
});
// Kickstart by adding a large set
appendFragment();
