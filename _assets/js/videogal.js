import { videos, path } from './media/videos';
import { load } from './helper';

function createVideo() {
    let embed = null;
    if (videos.length) {
        embed = document.createElement('div');
        embed.className = 'embed-responsive embed-responsive-16by9';
        const video = document.createElement('video');
        video.className = 'endless embed-responsive-item';
        video.controls = true;
        video.preload = 'metadata';
        const sourceWebm = document.createElement('source');
        sourceWebm.dataset.src = path + videos[0] + '.webm';
        sourceWebm.type = "video/webm";
        video.appendChild(sourceWebm);
        const sourceMp4 = document.createElement('source');
        sourceMp4.dataset.src = path + videos.shift() + '.webm';
        sourceMp4.type = "video/mp4";
        video.appendChild(sourceMp4);
        embed.appendChild(video);
        observer.observe(video);
    }
    return embed;
}

function appendVideo() {
    const video = createVideo();
    if (video) {
        grid.appendChild(video);
    }
}

const grid = document.getElementById('video-grid');

const observer = new IntersectionObserver(changes => {
    changes.forEach(change => {
        const isIntersecting = (typeof change.isIntersecting === 'boolean') ?
        change.isIntersecting : change.intersectionRect.height > 0;
        if (isIntersecting) {
            observer.unobserve(change.target);

            load(change.target);

            appendVideo();
        }
    });
  }
);

// Kickstart by adding first item
appendVideo();
