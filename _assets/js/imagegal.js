import { images, path, trans } from './media/images';
import { load } from './helper';
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

function appendImage() {
    const image = createImage();
    if (image) {
        grid.appendChild(image);
    }
}

const grid = document.getElementById('image-grid');

const observer = new IntersectionObserver(changes => {
    changes.forEach(change => {
        const isIntersecting = (typeof change.isIntersecting === 'boolean') ?
        change.isIntersecting : change.intersectionRect.height > 0;
        if (isIntersecting) {
            observer.unobserve(change.target);

            load(change.target);

            appendImage();
        }
    });
  }
);

// Kickstart by adding first item
const tobi = new Tobi({
    close: false,
    counter: false,
    zoom: false,
    docClose: true
});
appendImage();
