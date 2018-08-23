'use strict'

require('chartist-plugin-legend')
let Chartist = require('chartist')
Chartist.Bar('#member', {
  labels: ['1990', '1995', '2000', '2005', '2010', '2015'],
  series: [
    { 'name': 'Aktive', 'data': [26, 27, 39, 41, 34, 38] },
    { 'name': 'Jugend', 'data': [0, 2, 5, 2, 4, 4] },
    { 'name': 'Ehrenmitglieder', 'data': [0, 0, 0, 1, 1, 3] },
    { 'name': 'Passive', 'data': [2, 3, 8, 8, 12, 16] },
    { 'name': 'Ausgetreten', 'data': [0, 0, 0, 6, 7, 3] }
  ]
}, {
  plugins: [
    Chartist.plugins.legend()
  ]
})
