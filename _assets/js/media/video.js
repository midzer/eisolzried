'use strict';

import { videos, path } from './videos';
import { trans } from '../helper/trans';

export function createVideo() {
    let card = null;
    if (videos.length) {
        const video = videos.shift();
        card = document.createElement('div');
        card.className = 'card border-primary';
        const link = document.createElement('a');
        link.href = "#";
        link.dataset.type = "html";
        link.dataset.target = '#v' + video;
        link.className = 'lightbox';
        link.title = video;
        const img = document.createElement('img');
        img.className = 'endless card-img';
        img.src = trans;
        img.dataset.src = path + 'thumbs/' + video + '.jpg';
        img.title = video;
        img.alt = video;
        const div = document.createElement('div');
        div.className = "embed-responsive";
        div.style = "display:none;";
        div.id = 'v' + video;
        const vid = document.createElement('video');
        vid.className = "embed-responsive-item";
        vid.controls = true;
        vid.preload = "none";
        const sourceWebm = document.createElement('source');
        sourceWebm.src = path + video + '.webm';
        sourceWebm.type = "video/webm";
        vid.appendChild(sourceWebm);
        const sourceMp4 = document.createElement('source');
        sourceMp4.src = path + video + '.webm';
        sourceMp4.type = "video/mp4";
        vid.appendChild(sourceMp4);
        div.appendChild(vid);
        link.appendChild(img);
        link.appendChild(div);
        card.appendChild(link);
    }
    return card;
}
