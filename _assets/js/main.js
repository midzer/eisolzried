import { load, loadScript } from './helper/load'
import query from './helper/query'
import toggleAudio from './helper/toggleaudio'
import { Modal } from 'bootstrap.native'

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
  document.getElementById('theme-link').rel = theme === 'dark' ? 'stylesheet' : ''
  document.getElementById('theme-icon').href.baseVal = `/assets/icons/sprite.svg#${theme === 'dark' ? 'sun' : 'moon'}`
  window.localStorage.setItem('theme', theme)
}

let sensor = null
if ('AmbientLightSensor' in window) {
  sensor = new AmbientLightSensor()
  sensor.onreading = () => {
    setTheme(sensor.illuminance === 0 ? 'dark' : 'light')
  }
  sensor.start()
}

document.getElementById('theme-switch').onclick = () => {
  if (sensor) {
    sensor.stop()
  }
  setTheme(window.localStorage.getItem('theme') === 'dark' ? 'light' : 'dark')
}

// Language switch
document.getElementById('language-btn').onclick = () => {
  window.location = isBoarischeUrl() ? path.replace('/by', '') : '/by'.concat(path)
}

// Siren player
document.getElementById('siren-btn').onclick = () => {
  const player = document.getElementById('siren-player')
  document.getElementById('siren-icon').href.baseVal = `/assets/icons/sprite.svg#${player.paused ? 'volume-2' : 'play'}`
  toggleAudio(player)
}

// Fire run
document.getElementById('fire-run-station').onclick = () => {
  const spacer = document.getElementById('fire-run-spacer')
  spacer.style.animationPlayState = spacer.style.animationPlayState === 'paused' || spacer.style.animationPlayState === '' ? 'running' : 'paused'
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
const modalTemplate = document.getElementById('modal')
if (modalTemplate) {
  window.modal = new Modal(modalTemplate)
}

// Locales
function isBoarischeUrl () {
  return path.indexOf('/by/') !== -1
}
const path = window.location.pathname

// Lightbox
if (document.querySelector('.lightbox')) {
  loadScript('lightbox.js')
}

// Custom search
function findResults (termToMatch) {
  return pages.filter(item => {
    const regex = new RegExp(termToMatch, 'gi')
    return item.title.match(regex) || item.content.match(regex)
  })
}

function startSearch () {
  if (!pages.length) {
    const suffix = isBoarischeUrl() ? '-by' : ''
    fetch(`/search${suffix}.json`)
      .then(blob => blob.json())
      .then(data => pages.push(...data))
      .then( () => displayResults(this.value))
  }
  else {
    displayResults(this.value)
  }
}

function displayResults (value) {
  const resultsArray = findResults(value)
  const html = resultsArray.map(item => {
    return `<a class="dropdown-item" href="${item.url}">${item.title}</a>`
  }).join('')
  resultsList.innerHTML = resultsArray.length === 0 ? `<p class='dropdown-item'>${isBoarischeUrl() ? 'Nix gfunna' : 'Nichts gefunden'} :(</p>` : html
}

const field = document.getElementById('search-input')
const resultsList = document.getElementById('results-container')
field.addEventListener('keyup', startSearch)
field.addEventListener('keypress', event => {
  if (event.keyCode === 13) {
    event.preventDefault()
  }
})
const pages = []

// Snow
// const Snowflakes = require('magic-snowflakes');
// Snowflakes();

// Show render time
if (window.PerformanceNavigationTiming) {
  const [entry] = window.performance.getEntriesByType('navigation')
  const rendertime = document.getElementById('rendertime')
  rendertime.firstElementChild.textContent = `${parseInt(entry.domInteractive)}ms`
  rendertime.classList.remove('invisible')
}
