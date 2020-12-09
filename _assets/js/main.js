import Button from 'bootstrap/js/dist/button';
import Carousel from 'bootstrap/js/dist/carousel';
import Collapse from 'bootstrap/js/dist/collapse';
import Dropdown from 'bootstrap/js/dist/dropdown';
import Modal from 'bootstrap/js/dist/modal';
import Tab from 'bootstrap/js/dist/tab';

import { load } from './load/load'
import { loadScript } from './load/loadscript'
import { query } from './helper/query'
import { toggleAudio } from './helper/toggleaudio'
import { Christmas } from './helper/christmas'

const anchorJS = require('anchor-js')

// Lazy components
const observer = new IntersectionObserver(changes => {
  changes.forEach(change => {
    if (change.isIntersecting) {
      // Stop observing the current target
      observer.unobserve(change.target)
      
      load(change.target)
    }
  })
})

query('.lazy').forEach(item => observer.observe(item))

// Anchors
const anchors = new anchorJS({
  icon: '#',
  class: 'anchorjs-link'
})
anchors.add('h2[id]')

// Theme switch
function setTheme (dark) {
  document.getElementById('theme-link').rel = dark ? 'stylesheet' : ''
  document.getElementById('theme-icon').href.baseVal = `${spritePath}${dark ? 'sun' : 'moon'}`
  window.localStorage.setItem('dark-theme', dark)
}

let sensor
if ('AmbientLightSensor' in window) {
  sensor = new AmbientLightSensor()
  sensor.onreading = () => setTheme(sensor.illuminance === 0 ? true : false)
  sensor.start()
}

document.getElementById('theme-switch').onclick = () => {
  if (sensor) {
    sensor.stop()
  }
  setTheme(window.localStorage.getItem('dark-theme') !== 'true' ? true : false )
}

// Language switch
document.getElementById('language-btn').onclick = () => {
  window.location = isBoarischeUrl ? path.replace('/by', '') : '/by'.concat(path)
}

// Siren player
document.getElementById('siren-btn').onclick = () => {
  const player = document.getElementById('siren-player')
  document.getElementById('siren-icon').href.baseVal = `${spritePath}${player.paused ? 'volume-2' : 'play'}`
  toggleAudio(player)
}

// Fire run
document.querySelector('.icon--home').onclick = () => {
  const spacer = document.querySelector('#fire-run div')
  spacer.style.animationPlayState = spacer.style.animationPlayState === 'paused' || spacer.style.animationPlayState === '' ? 'running' : 'paused'
  toggleAudio(document.getElementById('fire-run-player'))
}
document.getElementById('grisu').onclick = event => toggleAudio(event.target)

// Bottombar
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

const bottomBar = document.getElementById('bottombar')
let ticking

window.addEventListener('scroll', requestTick)

// Globals
const spritePath = '/assets/icons/sprite.svg#',
  modalTemplate = document.getElementById('modal')

if (modalTemplate) {
  window.modal = new Modal(modalTemplate)
}

// Locales
const path = window.location.pathname,
  isBoarischeUrl = path.indexOf('/by/') !== -1

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
    fetch(`/search${isBoarischeUrl ? '-by' : ''}.json`)
      .then(blob => blob.json())
      .then(data => pages.push(...data))
      .then(() => displayResults(this.value))
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
  resultsList.innerHTML = resultsArray.length === 0 ? `<p class='dropdown-item'>${isBoarischeUrl ? 'Nix gfunna' : 'Nichts gefunden'} :(</p>` : html
  resultsList.style.display = value ? 'block' : 'none'
}

const field = document.getElementById('search-input'),
  resultsList = document.getElementById('results-container'),
  pages = []

field.addEventListener('keyup', startSearch)
field.addEventListener('keypress', event => {
  if (event.keyCode === 13) {
    event.preventDefault()
  }
})

// Snow
new Christmas()

// Show render time
if (window.PerformanceNavigationTiming) {
  const [entry] = window.performance.getEntriesByType('navigation'),
    rendertime = document.getElementById('rendertime')
  
  rendertime.firstElementChild.textContent = `${parseInt(entry.domInteractive)}ms`
  rendertime.classList.remove('invisible')
}
