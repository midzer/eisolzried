// Rate
const ws = new WebSocket('wss://feuerwehr-eisolzried.de:63244');
const rateboxes = query(".ratebox");

function sendMessage(node, score) {
    let msg = {
        index: Number(node.getAttribute('data-index')),
        score: score
    };
    ws.send(JSON.stringify(msg));
}

ws.onopen = function() {
    rateboxes.forEach(function(item) {
        sendMessage(item);
    });
};

function matchesIndex(element) {
    return element.getAttribute('data-index') == this;
}

ws.onmessage = function(msg) {
    let incoming = JSON.parse(msg.data);
    let item = rateboxes.find(matchesIndex, incoming.index);
    item.lastElementChild.textContent = incoming.score;
};

query(".plus-btn").forEach(function(item) {
    item.onclick = function() {
        let newScore = Number(item.parentNode.lastElementChild.textContent) + 1;
        item.parentNode.lastElementChild.textContent = newScore;
        sendMessage(item.parentNode, newScore);
    }
});

query(".minus-btn").forEach(function(item) {
    item.onclick = function() {
        let newScore = parseInt(item.parentNode.lastElementChild.textContent) - 1;
        item.parentNode.lastElementChild.textContent = newScore;
        sendMessage(item.parentNode, newScore);
    }
});
