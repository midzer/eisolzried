// Rate
const ws = new WebSocket('wss://feuerwehr-eisolzried.de:63244');
const socialboxes = query(".socialbox");

function composeMsg(node, score) {
    const msg = {
        index: Number(node.getAttribute('data-index')),
        score: score
    };
    return msg;
}

function updateScore(item, score) {
    item.parentNode.lastElementChild.textContent = score;
    const msg = composeMsg(findUpElement(item, "socialbox"), score);
    ws.send(JSON.stringify(msg));
}

function matchesIndex(element) {
    return element.getAttribute('data-index') == this;
}

ws.onopen = function() {
    socialboxes.forEach(function(item) {
        const msg = composeMsg(item, undefined);
        ws.send(JSON.stringify(msg));
    });
};

ws.onmessage = function(msg) {
    let incoming = JSON.parse(msg.data);
    let item = socialboxes.find(matchesIndex, incoming.index);
    item.querySelector("span").textContent = incoming.score;
};

query(".plus-btn").forEach(function(item) {
    item.onclick = function() {
        updateScore(item, Number(item.parentNode.lastElementChild.textContent) + 1);
    }
});

query(".minus-btn").forEach(function(item) {
    item.onclick = function() {
        updateScore(item, Number(item.parentNode.lastElementChild.textContent) - 1);
    }
});

// Share
if (navigator.share) {
    let url = document.location.href;
    const canonicalElement = document.querySelector('link[rel=canonical]');
    if (canonicalElement !== null) {
        url = canonicalElement.href;
    }
    query(".share-btn").forEach(function(item) {
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
