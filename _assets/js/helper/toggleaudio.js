export default function (player) {
  player.paused ? player.play() : player.pause()
}
