'use strict'

import { toggleAudio } from './helper/toggleaudio'

function hubDone (nextHub) {
  document.getElementById('kuebel').src = `/assets/images/games/kuebel-${nextHub}.png`
  document.getElementById('huebe').textContent = ++huebe
}

var huebe = 0

if ('LinearAccelerationSensor' in window) {
  const sensor = new LinearAccelerationSensor()
  let nextHub = 'up'
  sensor.onreading = () => {
    if (sensor.z < -5 && nextHub === 'up') {
      hubDone(nextHub)
      toggleAudio(document.getElementById('kuebel-up-player'))
      nextHub = 'down'
    } else if (sensor.z > 5 && nextHub === 'down') {
      hubDone(nextHub)
      toggleAudio(document.getElementById('kuebel-down-player'))
      nextHub = 'up'
    }
  }
  sensor.start()
}
