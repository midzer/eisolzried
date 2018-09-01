'use strict'

import { images, path } from './images'
import { trans } from '../helper/trans'

const length = images.length

export function createImage (index) {
  let card
  if (index < length) {
    const image = images[index]
    card = document.createElement('div')
    card.className = 'card border-primary'
    const link = document.createElement('a')
    link.className = 'lightbox'
    link.href = path + image.name
    const img = document.createElement('img')
    img.className = 'card-img'
    img.src = trans
    img.dataset.src = `${path}thumbs/${image.name}`
    img.alt = image.text
    img.style.opacity = '0'
    img.style.willChange = 'opacity'
    link.appendChild(img)
    card.appendChild(link)
  }
  return card
}
