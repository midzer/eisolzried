export function loadScript (file) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.async = true
    script.src = `/assets/js/${file}`
    script.onload = resolve
    script.onerror = reject
    if (document.head.lastChild.src !== script.src) {
      document.head.appendChild(script)
    }
  })
}

//export function loadModule (src) {
//  import(/* webpackIgnore: true */`./modules/${src}`)
//  .then((module) => {
//    module.default()
//  })
//}
