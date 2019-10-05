export function loadStyle (file) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `/assets/css/${file}`
    document.head.appendChild(link)
    resolve()
  })
}
