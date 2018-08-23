'use strict'

export function toggleAudio (player) {
  if (player.paused) {
    if (player.readyState === 0) {
      player.load()
    }
    player.play()
  } else {
    player.pause()
  }
}
