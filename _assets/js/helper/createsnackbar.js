export function createSnackbar () {
    const snackbar = document.createElement('div')
    snackbar.className = 'snackbar'
    const snackbarText = document.createElement('div')
    snackbarText.className = 'snackbar__text'
    const snackbarButton = document.createElement('button')
    snackbarButton.className = 'snackbar__action'
    snackbarButton.type = 'button'
    snackbar.appendChild(snackbarText)
    snackbar.appendChild(snackbarButton)
    return new Snackbar(document.body.appendChild(snackbar))
}
