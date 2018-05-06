function hubDone(nextHub) {
    document.getElementById('kuebel').src = '/assets/images/games/kuebel-' + nextHub + '.png';
    document.getElementById('huebe').innerHTML = parseInt(document.getElementById('huebe').innerHTML) + 1;
}

if ('LinearAccelerationSensor' in window) {
    const sensor = new LinearAccelerationSensor();
    var nextHub = 'up';
    sensor.onreading = () => {
        if (sensor.z < -5 && nextHub == 'up') {
            hubDone(nextHub);
            nextHub = 'down';
        }
        if (sensor.z > 5 && nextHub == 'down') {
            hubDone(nextHub);
            nextHub = 'up';
        }
    };
    sensor.start();
}
