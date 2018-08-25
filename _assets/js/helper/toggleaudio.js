'use strict'

export function toggleAudio (player) {
  player.paused ? player.play() : player.pause()
}
