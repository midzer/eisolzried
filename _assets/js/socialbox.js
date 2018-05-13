import { query } from './helper/query';

function sendMessage(item, score) {
    const msg = {
        index: Number(item.getAttribute('data-index')),
        score: score
    };
    ws.send(JSON.stringify(msg));
}

function matchesIndex(element) {
    return element.getAttribute('data-index') == this;
}

function updateScore(item, modifier) {
    var socialbox = item.closest('.socialbox');
    var rating = socialbox.querySelector("#rating");
    var newScore = Number(rating.textContent) + modifier;
    rating.textContent = newScore;
    sendMessage(socialbox, newScore);
}

const ws = new WebSocket('wss://feuerwehr-eisolzried.de:63244');
const socialboxes = query("socialbox");

ws.onopen = function() {
    socialboxes.forEach(function(item) {
        sendMessage(item, undefined);
    });
};

ws.onmessage = function(msg) {
    let incoming = JSON.parse(msg.data);
    let item = socialboxes.find(matchesIndex, incoming.index);
    item.querySelector("span").textContent = incoming.score;
};

query("plus-btn").forEach(function(item) {
    item.onclick = function() {
        updateScore(item, 1);
    }
});

query("minus-btn").forEach(function(item) {
    item.onclick = function() {
        updateScore(item, -1);
    }
});

// Share
if (navigator.share) {
    let url = document.location.href;
    const canonicalElement = document.querySelector('link[rel=canonical]');
    if (canonicalElement !== null) {
        url = canonicalElement.href;
    }
    query("share-btn").forEach(function(item) {
        item.onclick = function() {
            navigator.share({
                title: document.title,
                url: url
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
        }
    });
}
