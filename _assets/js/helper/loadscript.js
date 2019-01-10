export function loadScript (element) {
  const script = document.createElement('script')
  script.async = false
  script.src = `/assets/js/${element.getAttribute('data-src')}`
  if (document.head.lastChild.src !== script.src) {
    document.head.appendChild(script)
  }
}

/*
export function loadScript (file) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.async = false
    script.src = `/assets/js/${file}`
    script.onload = () => {
      resolve(script.src)
    }
    script.onerror = reject
    if (document.body.lastChild.src !== script.src) {
      //document.body.appendChild(script)
      document.documentElement.appendChild(script)
    }
  })
}*/

//export function loadModule (src) {
//  import(/* webpackIgnore: true */`./modules/${src}`)
//  .then((module) => {
//    module.default()
//  })
//}
