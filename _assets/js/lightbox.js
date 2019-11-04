import Tobi from 'rqrauhvmra__tobi'
import { loadStyle } from './load/loadstyle'

loadStyle('lightbox.css')
.then(() => {
  window.tobi = new Tobi({
    navLabel: ['Vorheriges Bild', 'Nächstes Bild'],
    closeLabel: 'Schließen',
    counter: false,
    zoom: false,
    autoplayVideo: true,
    captions: false
  })
})
