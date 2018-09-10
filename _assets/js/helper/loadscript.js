export function loadScript (file) {
  const script = document.createElement('script')
  script.async = false
  script.src = `/assets/js/${file}`
  if (document.documentElement.lastChild.src !== script.src) {
    document.documentElement.appendChild(script)
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
