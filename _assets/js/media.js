import { createImage } from './media/image';
import { createVideo } from './media/video';
import { load } from './helper/lazy';

function appendElement(parent, createElement) {
    const element = createElement();
    if (element) {
        mediaObserver.observe(element.querySelector('img'));
        tobi.add(element.querySelector('a'));
        parent.appendChild(element);
    }
}

function appendFragment(grid, createElement) {
    let frag = document.createDocumentFragment();
    for (let i = 0; i < 24; i++) {
        appendElement(frag, createElement);
    }
    grid.appendChild(frag);
}

const imageGrid = document.getElementById('image-grid');
const videoGrid = document.getElementById('video-grid');

// Pre-load items that are within 2 multiples of the visible viewport height.
const mediaObserver = new IntersectionObserver(changes => {
    changes.forEach(change => {
        // Edge 15 doesn't support isIntersecting, but we can infer it
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12156111/
        // https://github.com/WICG/IntersectionObserver/issues/211
        const isIntersecting = (typeof change.isIntersecting === 'boolean') ?
        change.isIntersecting : change.intersectionRect.height > 0;
        if (isIntersecting) {
            // Stop observing the current target
            mediaObserver.unobserve(change.target);
            
            load(change.target);

            if (change.target.closest('#image-grid')) {
                appendElement(imageGrid, createImage);
            }
            else if (change.target.closest('#video-grid')) {
                appendElement(videoGrid, createVideo);
            }
        }
    });
  }
);
// Kickstart by adding a large set
appendFragment(imageGrid, createImage);
appendFragment(videoGrid, createVideo);
