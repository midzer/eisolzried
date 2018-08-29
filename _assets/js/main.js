'use strict'

import { loadScript } from './helper/loadscript'
import { load } from './helper/load'
import { query } from './helper/query'
import { toggleAudio } from './helper/toggleaudio'
import { Modal } from 'bootstrap.native'

// Locales
const path = window.location.pathname

// Lightbox
if (document.querySelector('.lightbox')) {
  loadScript('/assets/js/lightbox.js')
}

// Lazy components
window.observer = new IntersectionObserver(changes => {
  changes.forEach(change => {
    // Edge 15 doesn't support isIntersecting, but we can infer it
    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12156111/
    // https://github.com/WICG/IntersectionObserver/issues/211
    const isIntersecting = (typeof change.isIntersecting === 'boolean')
      ? change.isIntersecting : change.intersectionRect.height > 0
    if (isIntersecting) {
      // Stop observing the current target
      observer.unobserve(change.target)
      
      load(change.target)
    }
  })
})

const items = query('.lazy')
for (let i = 0, j = items.length; i < j; i++) {
  if (['IMG', 'VIDEO', 'IFRAME'].indexOf(items[i].nodeName) !== -1) {
    items[i].style.opacity = '0'
    items[i].style.willChange = 'opacity'
  }
  observer.observe(items[i])
}

// Theme switch
function setTheme (theme) {
  let rel,
    icon
  theme === 'dark' ? (rel = 'stylesheet', icon = 'sun') : (rel = 'prefetch', icon = 'moon')
  document.getElementById('theme-link').rel = rel
  document.getElementById('theme-icon').href.baseVal = `/assets/icons/sprite.svg#${icon}`
  localStorage.setItem('theme', theme)
}

let sensor = null
if ('AmbientLightSensor' in window) {
  sensor = new AmbientLightSensor()
  sensor.onreading = () => {
    sensor.illuminance === 0 ? setTheme('dark') : setTheme('light')
  }
  sensor.start()
}

document.getElementById('theme-switch').onclick = () => {
  if (sensor) {
    sensor.stop()
  }
  localStorage.getItem('theme') === 'dark' ? setTheme('light') : setTheme('dark')
}

// Language switch
document.getElementById('language-btn').onclick = () => {
  window.location = path.indexOf('/by/') === -1 ? '/by'.concat(path) : path.replace('/by', '')
}

// Siren player
document.getElementById('siren-btn').onclick = () => {
  const player = document.getElementById('siren-player')
  document.getElementById('siren-icon').href.baseVal = `/assets/icons/sprite.svg#${player.paused ? 'volume-2' : 'play'}`
  toggleAudio(player)
}

// Fire run
document.getElementById('fire-station').onclick = () => {
  const truck = document.getElementById('fire-truck')
  truck.style.animationPlayState = truck.style.animationPlayState === 'paused' || truck.style.animationPlayState === '' ? 'running' : 'paused'
  toggleAudio(document.getElementById('fire-run-player'))
}

// Custom search
const suffix = path.indexOf('/by/') !== -1 ? '-by' : ''
const endpoint = `/search${suffix}.json`
const pages = []
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => pages.push(...data))

function findResults (termToMatch, pages) {
  return pages.filter(item => {
    const regex = new RegExp(termToMatch, 'gi')
    return item.title.match(regex) || item.content.match(regex)
  })
}

function displayResults () {
  const resultsArray = findResults(this.value, pages)
  const html = resultsArray.map(item => {
    return `<a class="dropdown-item" href="${item.url}">${item.title}</a>`
  }).join('')
  resultsList.innerHTML = resultsArray.length === 0 || this.value === '' ? `<p class='dropdown-item'>${path.indexOf('/by/') !== -1 ? 'Nix gfunna' : 'Nichts gefunden'} :(</p>` : html
}

const field = document.getElementById('search-input')
const resultsList = document.getElementById('results-container')
field.addEventListener('keyup', displayResults)
field.addEventListener('keypress', event => {
  if (event.keyCode === 13) {
    event.preventDefault()
  }
})

// Progressbar
const progressBar = document.getElementById('progressbar')
let ticking
window.addEventListener('scroll', requestTick)

function requestTick () {
  if (!ticking) {
    ticking = true
    'requestIdleCallback' in window ? requestIdleCallback(update) : requestAnimationFrame(update)
  }
}

function update () {
  const value = window.pageYOffset / (document.body.clientHeight - window.innerHeight)
  progressBar.style.transform = `scaleX(${value})`
  progressBar.setAttribute('aria-valuenow', value * 100)
  ticking = false
}

// Show render time
if (window.PerformanceNavigationTiming) {
  const [entry] = performance.getEntriesByType('navigation')
  document.getElementById('rendertime').textContent = `${parseInt(entry.domInteractive)}ms`
  document.getElementById('rendertext').hidden = false
}

// Globals
window.snackbar = new Snackbar(document.querySelector('.snackbar'))
window.modal = new Modal(document.querySelector('.modal'))

// Snow
// const Snowflakes = require('magic-snowflakes');
// Snowflakes();
