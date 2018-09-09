export function loadScript (src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.async = false
    script.src = `/assets/js/${src}`
    script.onload = () => {
      resolve(script.src)
    }
    script.onerror = reject
    if (document.body.lastChild.src !== script.src) {
      //document.body.appendChild(script)
      document.documentElement.appendChild(script)
    }
  })
}

//export function loadModule (src) {
//  import(/* webpackIgnore: true */`./modules/${src}`)
//  .then((module) => {
//    module.default()
//  })
//}
