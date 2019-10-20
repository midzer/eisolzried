export function loadStyle (file) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `/assets/css/${file}`
    link.onload = resolve
    link.onerror = reject
    document.head.appendChild(link)
  })
}
