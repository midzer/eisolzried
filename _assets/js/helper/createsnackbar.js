export function createSnackbar () {
  const snackbar = document.createElement('div'),
    snackbarText = document.createElement('div'),
    snackbarButton = document.createElement('button')
  
  snackbar.className = 'snackbar'
  snackbarText.className = 'snackbar__text'
  snackbarButton.className = 'snackbar__action'
  snackbarButton.type = 'button'
  
  snackbar.appendChild(snackbarText)
  snackbar.appendChild(snackbarButton)
  
  return new Snackbar(document.body.appendChild(snackbar))
}
