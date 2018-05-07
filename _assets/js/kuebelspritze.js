function hubDone(nextHub) {
    document.getElementById('kuebel').src = '/assets/images/games/kuebel-' + nextHub + '.png';
    document.getElementById('huebe').innerHTML = parseInt(document.getElementById('huebe').innerHTML) + 1;
}

if ('LinearAccelerationSensor' in window) {
    const sensor = new LinearAccelerationSensor();
    var nextHub = 'up';
    const upPlayer = document.getElementById('kuebel-up-player');
    const downPlayer = document.getElementById('kuebel-down-player');
    sensor.onreading = () => {
        if (sensor.z < -5 && nextHub == 'up') {
            hubDone(nextHub);
            nextHub = 'down';
            toggleAudio(upPlayer);
        }
        if (sensor.z > 5 && nextHub == 'down') {
            hubDone(nextHub);
            nextHub = 'up';
            toggleAudio(downPlayer);
        }
    };
    sensor.start();
}
