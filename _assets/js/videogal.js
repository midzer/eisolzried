'use strict';

import { videos, path } from './media/videos';
import { load } from './helper/lazy';

function createVideo() {
    let embed = null;
    if (videos.length) {
        const video = videos.shift();
        embed = document.createElement('div');
        embed.className = 'embed-responsive embed-responsive-16by9';
        const vid = document.createElement('video');
        vid.className = 'endless embed-responsive-item';
        vid.controls = true;
        vid.preload = 'metadata';
        const sourceWebm = document.createElement('source');
        sourceWebm.dataset.src = path + video + '.webm';
        sourceWebm.type = "video/webm";
        vid.appendChild(sourceWebm);
        const sourceMp4 = document.createElement('source');
        sourceMp4.dataset.src = path + video + '.webm';
        sourceMp4.type = "video/mp4";
        vid.appendChild(sourceMp4);
        embed.appendChild(vid);
        observer.observe(vid);
    }
    return embed;
}

function appendVideo(parent) {
    const video = createVideo();
    if (video) {
        parent.appendChild(video);
    }
}

function appendFragment() {
    let frag = document.createDocumentFragment();
    for (let i = 0; i < 6; i++) {
        appendVideo(frag);
    }
    grid.appendChild(frag);
}

const grid = document.getElementById('video-grid');

const observer = new IntersectionObserver(changes => {
    changes.forEach(change => {
        const isIntersecting = (typeof change.isIntersecting === 'boolean') ?
        change.isIntersecting : change.intersectionRect.height > 0;
        if (isIntersecting) {
            observer.unobserve(change.target);

            load(change.target);

            appendVideo(grid);
        }
    });
  }
);

// Kickstart by adding a large set
appendFragment();