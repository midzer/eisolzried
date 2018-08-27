'use strict'

import { Chart } from 'frappe-charts/dist/frappe-charts.esm.js'

const chart = new Chart('#member', {
  data: {
    labels: ['1990', '1995', '2000', '2005', '2010', '2015'],

	  datasets: [
		  {
	  		name: 'Aktive', chartType: 'bar',
	  		values: [26, 27, 39, 41, 34, 38]
	  	},
  		{
  			name: 'Jugend', chartType: 'bar',
  			values: [0, 2, 5, 2, 4, 4]
  		},
  		{
  			name: 'Ehrenmitglieder', chartType: 'bar',
  			values: [0, 0, 0, 1, 1, 3]
      },
      {
	  		name: 'Passive', chartType: 'bar',
	  		values: [2, 3, 8, 8, 12, 16]
      },
      {
  			name: 'Ausgetreten', chartType: 'bar',
  			values: [0, 0, 0, 6, 7, 3]
  		}
    ],
  },
	title: 'Mitglieder Statistik',
	type: 'bar'
});
