'use strict'

import { images, path } from './images'
import { trans } from '../helper/trans'

var tempImages = [...images]

export function createImage () {
  let card
  if (tempImages.length) {
    const image = tempImages.shift()
    card = document.createElement('div')
    card.className = 'card border-primary'
    const link = document.createElement('a')
    link.href = path + image.name
    link.title = image.text
    const img = document.createElement('img')
    img.className = 'endless card-img'
    img.src = trans
    img.dataset.src = path + 'thumbs/' + image.name
    img.title = image.text
    img.alt = image.text
    link.appendChild(img)
    card.appendChild(link)
  }
  return card
}

export function resetImages () {
  tempImages = [...images]
}
