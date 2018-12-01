import Tobi from 'rqrauhvmra__tobi'
import { loadStyle } from './helper/loadstyle'

loadStyle('lightbox.css')

window.tobi = new Tobi({
  navLabel: ['Vorheriges', 'Nächstes'],
  closeLabel: 'Schließen',
  counter: false,
  zoom: false,
  threshold: 100,
  autoplayVideo: true,
  captions: false
})
