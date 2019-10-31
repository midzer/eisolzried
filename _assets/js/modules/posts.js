/* Can be import()ed dynamically in the future
 * if browser support is better
 */
// Load more posts
document.getElementById('moreposts').onclick = function () {
  const button = this
  const els = list.querySelectorAll('[hidden]')
  window.requestAnimationFrame(() => {
    for (let i = 0, j = els.length; i < 8; i++) {
      els[i].removeAttribute('hidden')
      if (i + 1 === j) {
        // Remove button after last element done
        button.parentNode.removeChild(button)
        break
      }
    }
  })
}
// New posts badges
var lastIndex = Number(window.localStorage.getItem('lastindex'))
const list = document.getElementById('posts')
const els = list.children
for (let i = els.length - 1; i >= 0; i--) {
  const element = els[i].querySelector('span[data-index]')
  if (!element) {
    continue
  }
  const index = Number(element.getAttribute('data-index'))
  if (index > lastIndex) {
    element.classList.remove('invisible')
    lastIndex = index
  }
}
window.localStorage.setItem('lastindex', lastIndex)
