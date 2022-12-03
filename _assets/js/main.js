import Button from 'bootstrap/js/dist/button'
import Carousel from 'bootstrap/js/dist/carousel'
import Collapse from 'bootstrap/js/dist/collapse'
import Dropdown from 'bootstrap/js/dist/dropdown'
import Tab from 'bootstrap/js/dist/tab'
import anchorJS from 'anchor-js'

import { load } from './load/load'
import { loadScript } from './load/loadscript'
import { query } from './helper/query'
import { toggleAudio } from './helper/toggleaudio'
//import { Christmas } from './helper/christmas'

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
function setTheme (isDark) {
  document.getElementById('theme-link').disabled = isDark ? false : true
  document.getElementById('theme-icon').href.baseVal = `${spritePath}${isDark ? 'sun' : 'moon'}`
  window.localStorage.setItem('dark-theme', isDark)
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
const spritePath = '/assets/icons/sprite.svg#'

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
//new Christmas()

// Show render time
if (window.PerformanceNavigationTiming) {
  const [entry] = window.performance.getEntriesByType('navigation'),
    rendertime = document.getElementById('rendertime')
  
  rendertime.firstElementChild.textContent = `${parseInt(entry.domInteractive)}ms`
  rendertime.classList.remove('invisible')
}
/*! instant.page v5.1.1 - (C) 2019-2022 Alexandre Dieulot - https://instant.page/license */

let mouseoverTimer
let lastTouchTimestamp
const prefetches = new Set()
const prefetchElement = document.createElement('link')
const isSupported = prefetchElement.relList && prefetchElement.relList.supports && prefetchElement.relList.supports('prefetch')
                    && window.IntersectionObserver && 'isIntersecting' in IntersectionObserverEntry.prototype
const allowQueryString = 'instantAllowQueryString' in document.body.dataset
const allowExternalLinks = 'instantAllowExternalLinks' in document.body.dataset
const useWhitelist = 'instantWhitelist' in document.body.dataset
const mousedownShortcut = 'instantMousedownShortcut' in document.body.dataset
const DELAY_TO_NOT_BE_CONSIDERED_A_TOUCH_INITIATED_ACTION = 1111

let delayOnHover = 65
let useMousedown = false
let useMousedownOnly = false
let useViewport = false

if ('instantIntensity' in document.body.dataset) {
  const intensity = document.body.dataset.instantIntensity

  if (intensity.substr(0, 'mousedown'.length) == 'mousedown') {
    useMousedown = true
    if (intensity == 'mousedown-only') {
      useMousedownOnly = true
    }
  }
  else if (intensity.substr(0, 'viewport'.length) == 'viewport') {
    if (!(navigator.connection && (navigator.connection.saveData || (navigator.connection.effectiveType && navigator.connection.effectiveType.includes('2g'))))) {
      if (intensity == "viewport") {
        /* Biggest iPhone resolution (which we want): 414 × 896 = 370944
         * Small 7" tablet resolution (which we don’t want): 600 × 1024 = 614400
         * Note that the viewport (which we check here) is smaller than the resolution due to the UI’s chrome */
        if (document.documentElement.clientWidth * document.documentElement.clientHeight < 450000) {
          useViewport = true
        }
      }
      else if (intensity == "viewport-all") {
        useViewport = true
      }
    }
  }
  else {
    const milliseconds = parseInt(intensity)
    if (!isNaN(milliseconds)) {
      delayOnHover = milliseconds
    }
  }
}

if (isSupported) {
  const eventListenersOptions = {
    capture: true,
    passive: true,
  }

  if (!useMousedownOnly) {
    document.addEventListener('touchstart', touchstartListener, eventListenersOptions)
  }

  if (!useMousedown) {
    document.addEventListener('mouseover', mouseoverListener, eventListenersOptions)
  }
  else if (!mousedownShortcut) {
      document.addEventListener('mousedown', mousedownListener, eventListenersOptions)
  }

  if (mousedownShortcut) {
    document.addEventListener('mousedown', mousedownShortcutListener, eventListenersOptions)
  }

  if (useViewport) {
    let triggeringFunction
    if (window.requestIdleCallback) {
      triggeringFunction = (callback) => {
        requestIdleCallback(callback, {
          timeout: 1500,
        })
      }
    }
    else {
      triggeringFunction = (callback) => {
        callback()
      }
    }

    triggeringFunction(() => {
      const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const linkElement = entry.target
            intersectionObserver.unobserve(linkElement)
            preload(linkElement.href)
          }
        })
      })

      document.querySelectorAll('a').forEach((linkElement) => {
        if (isPreloadable(linkElement)) {
          intersectionObserver.observe(linkElement)
        }
      })
    })
  }
}

function touchstartListener(event) {
  /* Chrome on Android calls mouseover before touchcancel so `lastTouchTimestamp`
   * must be assigned on touchstart to be measured on mouseover. */
  lastTouchTimestamp = performance.now()

  const linkElement = event.target.closest('a')

  if (!isPreloadable(linkElement)) {
    return
  }

  preload(linkElement.href)
}

function mouseoverListener(event) {
  if (performance.now() - lastTouchTimestamp < DELAY_TO_NOT_BE_CONSIDERED_A_TOUCH_INITIATED_ACTION) {
    return
  }

  if (!('closest' in event.target)) {
    // Without this check sometimes an error “event.target.closest is not a function” is thrown, for unknown reasons
    // That error denotes that `event.target` isn’t undefined. My best guess is that it’s the Document.

    // Details could be gleaned from throwing such an error:
    //throw new TypeError(`instant.page non-element event target: timeStamp=${~~event.timeStamp}, type=${event.type}, typeof=${typeof event.target}, nodeType=${event.target.nodeType}, nodeName=${event.target.nodeName}, viewport=${innerWidth}x${innerHeight}, coords=${event.clientX}x${event.clientY}, scroll=${scrollX}x${scrollY}`)

    return
  }
  const linkElement = event.target.closest('a')

  if (!isPreloadable(linkElement)) {
    return
  }

  linkElement.addEventListener('mouseout', mouseoutListener, {passive: true})

  mouseoverTimer = setTimeout(() => {
    preload(linkElement.href)
    mouseoverTimer = undefined
  }, delayOnHover)
}

function mousedownListener(event) {
  const linkElement = event.target.closest('a')

  if (!isPreloadable(linkElement)) {
    return
  }

  preload(linkElement.href)
}

function mouseoutListener(event) {
  if (event.relatedTarget && event.target.closest('a') == event.relatedTarget.closest('a')) {
    return
  }

  if (mouseoverTimer) {
    clearTimeout(mouseoverTimer)
    mouseoverTimer = undefined
  }
}

function mousedownShortcutListener(event) {
  if (performance.now() - lastTouchTimestamp < DELAY_TO_NOT_BE_CONSIDERED_A_TOUCH_INITIATED_ACTION) {
    return
  }

  const linkElement = event.target.closest('a')

  if (event.which > 1 || event.metaKey || event.ctrlKey) {
    return
  }

  if (!linkElement) {
    return
  }

  linkElement.addEventListener('click', function (event) {
    if (event.detail == 1337) {
      return
    }

    event.preventDefault()
  }, {capture: true, passive: false, once: true})

  const customEvent = new MouseEvent('click', {view: window, bubbles: true, cancelable: false, detail: 1337})
  linkElement.dispatchEvent(customEvent)
}

function isPreloadable(linkElement) {
  if (!linkElement || !linkElement.href) {
    return
  }

  if (useWhitelist && !('instant' in linkElement.dataset)) {
    return
  }

  if (!allowExternalLinks && linkElement.origin != location.origin && !('instant' in linkElement.dataset)) {
    return
  }

  if (!['http:', 'https:'].includes(linkElement.protocol)) {
    return
  }

  if (linkElement.protocol == 'http:' && location.protocol == 'https:') {
    return
  }

  if (!allowQueryString && linkElement.search && !('instant' in linkElement.dataset)) {
    return
  }

  if (linkElement.hash && linkElement.pathname + linkElement.search == location.pathname + location.search) {
    return
  }

  if ('noInstant' in linkElement.dataset) {
    return
  }

  return true
}

function preload(url) {
  if (prefetches.has(url)) {
    return
  }

  let element
  if (HTMLScriptElement.supports('speculationrules')) {
    element = document.createElement('script')
    element.type = 'speculationrules'
    element.text = '{"prerender":[{"source": "list","urls": ["' + url + '"]}]}'
  }
  else {
    element = document.createElement('link')
    element.rel = 'prefetch'
    element.href = url
  }
  document.head.appendChild(element)

  prefetches.add(url)
}
