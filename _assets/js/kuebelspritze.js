'use strict'

import { toggleAudio } from './helper/toggleaudio'

function hubDone (nextHub) {
  kuebel.src = '/assets/images/games/kuebel-' + nextHub + '.png'
  huebe.innerText = parseInt(huebe.textContent) + 1
}

const kuebel = document.getElementById('kuebel')
const huebe = document.getElementById('huebe')

if ('LinearAccelerationSensor' in window) {
  const sensor = new LinearAccelerationSensor()
  var nextHub = 'up'
  const upPlayer = document.getElementById('kuebel-up-player')
  const downPlayer = document.getElementById('kuebel-down-player')
  sensor.onreading = () => {
    if (sensor.z < -5 && nextHub === 'up') {
      hubDone(nextHub)
      toggleAudio(upPlayer)
      nextHub = 'down'
    } else if (sensor.z > 5 && nextHub === 'down') {
      hubDone(nextHub)
      toggleAudio(downPlayer)
      nextHub = 'up'
    }
  }
  sensor.start()
}
