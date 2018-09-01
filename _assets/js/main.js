'use strict'

import { loadScript } from './helper/loadscript'
import { load } from './helper/load'
import { query } from './helper/query'
import { toggleAudio } from './helper/toggleaudio'

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
  observer.observe(items[i])
}

// Theme switch
function setTheme (theme) {
  let rel,
    icon
  theme === 'dark' ? (rel = 'stylesheet', icon = 'sun') : (rel = 'prefetch', icon = 'moon')
  document.getElementById('theme-link').rel = rel
  document.getElementById('theme-icon').href.baseVal = `/assets/icons/sprite.svg#${icon}`
  window.localStorage.setItem('theme', theme)
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
  window.localStorage.getItem('theme') === 'dark' ? setTheme('light') : setTheme('dark')
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

// Bottombar
const bottomBar = document.getElementById('bottombar').firstElementChild
let ticking
window.addEventListener('scroll', requestTick)

function requestTick () {
  if (!ticking) {
    ticking = true
    'requestIdleCallback' in window ? window.requestIdleCallback(update, { timeout: 100 }) : window.requestAnimationFrame(update)
  }
}

function update () {
  const scaleX = window.pageYOffset / (document.body.clientHeight - window.innerHeight)
  bottomBar.style.transform = `scaleX(${scaleX})`
  ticking = false
}

// Globals
window.snackbar = new Snackbar(document.querySelector('.snackbar'))

// Lightbox
if (document.querySelector('.lightbox')) {
  loadScript('/assets/js/lightbox.js')
}

// Custom search
const path = window.location.pathname // needed elsewhere, too
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

// Snow
// const Snowflakes = require('magic-snowflakes');
// Snowflakes();

// Show render time
if (window.PerformanceNavigationTiming) {
  const [entry] = window.performance.getEntriesByType('navigation')
  document.getElementById('rendertime').textContent = `${parseInt(entry.domInteractive)}ms`
  document.getElementById('rendertext').hidden = false
}
