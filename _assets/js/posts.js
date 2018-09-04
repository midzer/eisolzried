'use strict'

// Load more posts
document.getElementById('moreposts').onclick = function () {
  const button = this
  const els = list.querySelectorAll('li[hidden]')
  window.requestAnimationFrame(function () {
    for (let i = 0, j = els.length; i < 4; i++) {
      els[i].removeAttribute('hidden')
      if (i + 1 === j) {
        // Remove button when after last element done
        button.parentNode.removeChild(button)
      }
    }
  })
}

// New posts badges
let lastIndex = Number(window.localStorage.getItem('lastindex'))
const list = document.getElementById('posts')
const els = list.querySelectorAll('li:not([hidden])')

window.requestAnimationFrame(function () {
  for (let i = els.length - 1; i >= 0; i--) {
    const dataElement = els[i].querySelector('a[data-index]')
    const index = Number(dataElement.getAttribute('data-index'))
    if (index > lastIndex) {
      const span = document.createElement('span')
      span.className = 'badge badge-primary ml-1'
      span.textContent = 'Neu'
      dataElement.appendChild(span)
      lastIndex = index
    }
  }
})
window.localStorage.setItem('lastindex', lastIndex)
