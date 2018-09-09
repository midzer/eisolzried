export default function () {
  // Load more posts
  document.getElementById('moreposts').onclick = function () {
    const button = this
    const els = list.querySelectorAll('[hidden]')
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
  var lastIndex
  try {
    lastIndex = Number(window.localStorage.getItem('lastindex'))
  } catch (e) {
    console.error('Error during localStorage access, possibly cookies are blocked:', e)
  }
  const list = document.getElementById('posts')
  const els = list.children
  for (let i = els.length - 1; i >= 0; i--) {
    const element = els[i].querySelector('span[data-index]')
    const index = Number(element.getAttribute('data-index'))
    if (index > lastIndex) {
      element.classList.remove('invisible')
      lastIndex = index
    }
  }
  try {
    window.localStorage.setItem('lastindex', lastIndex)
  } catch (e) {
    console.error('Error during localStorage access, possibly cookies are blocked:', e)
  }
}
