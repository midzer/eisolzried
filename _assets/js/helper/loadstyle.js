export function loadStyle (file) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `/assets/css/${file}`
  document.head.appendChild(link)
}
