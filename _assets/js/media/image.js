import { images } from './images'
import { trans } from './trans'

const length = images.length
const path = '/assets/images/media/'

export default function (index) {
  let card
  if (index < length) {
    const image = images[index]
    card = document.createElement('div')
    card.className = 'card border-primary'
    const link = document.createElement('a')
    link.href = `${path}${image.name}`
    const img = document.createElement('img')
    img.className = 'lazy card-img'
    img.src = trans
    img.setAttribute('data-src', `${path}thumbs/${image.name}`)
    img.alt = image.text
    link.appendChild(img)
    card.appendChild(link)
  }
  return card
}
