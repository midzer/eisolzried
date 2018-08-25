'use strict'

export function loadScript (src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.defer = true
    script.src = src
    script.onload = () => {
      resolve(script.src)
    }
    script.onerror = reject
    if (document.body.lastChild !== script) {
      document.body.appendChild(script)
    }
  })
}
