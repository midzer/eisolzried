'use strict'

import { loadScript } from './loadscript'

function removeHint () {
  this.style.willChange = 'auto'
}

function addLoaded (element) {
  element.addEventListener('animationend', removeHint)
  element.classList.add('loaded')
}

function replaceSrc (element) {
  element.src = element.dataset.src
  element.removeAttribute('data-src')
}

function loadVideo (element) {
  element.onloadstart = () => {
    addLoaded(element)
  }
  for (let i = 0; i < 2; i++) {
    replaceSrc(element.children[i])
  }
  element.load()
}

function loadImage (element) {
  element.onload = () => {
    addLoaded(element)
  }
  replaceSrc(element)
}

export function load (element) {
  if (element.nodeName === 'IMG' || element.nodeName === 'IFRAME') {
    loadImage(element)
  } else if (element.nodeName === 'VIDEO') {
    loadVideo(element)
  } else if (element.dataset.src.slice(-3) === '.js') {
    loadScript(element.dataset.src)
  }
}
