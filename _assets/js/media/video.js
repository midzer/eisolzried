'use strict'

import { videos, path } from './videos'
import { trans } from '../helper/trans'

const length = videos.length

export function createVideo (index) {
  let card
  if (index < length) {
    const video = videos[index]
    card = document.createElement('div')
    card.className = 'card border-primary'
    const link = document.createElement('a')
    link.href = `#v${video}`
    link.dataset.type = 'html'
    link.title = video
    const img = document.createElement('img')
    img.className = 'card-img'
    img.src = trans
    img.dataset.src = `${path}thumbs/${video}.jpg`
    img.title = video
    img.alt = video
    img.style.opacity = '0'
    const vid = document.createElement('video')
    vid.id = `v${video}`
    vid.controls = true
    vid.preload = 'none'
    vid.loop = true
    const sourceWebm = document.createElement('source')
    sourceWebm.src = `${path}${video}.webm`
    sourceWebm.type = 'video/webm'
    vid.appendChild(sourceWebm)
    const sourceMp4 = document.createElement('source')
    sourceMp4.src = `${path}${video}.mp4`
    sourceMp4.type = 'video/mp4'
    vid.appendChild(sourceMp4)
    link.appendChild(img)
    card.appendChild(link)
    card.appendChild(vid)
  }
  return card
}
