const path = require('path')

module.exports = {
  entry: {
    main: [
      './_assets/js/vendor/snackbar.js',
      './_assets/js/main.js',
      './_assets/js/vendor/service-worker-registration.js'
    ],
    lightbox: [
      './_assets/js/lightbox.js'
    ],
    calendar: [
      'ical.js',
      './_assets/js/vendor/drcal.js',
      './_assets/js/calendar.js'
    ],
    posts: [
      './_assets/js/modules/posts.js'
    ],
    chatbox: [
      './_assets/js/modules/chatbox.js'
    ],
    socialbox: [
      './_assets/js/socialbox.js'
    ],
    charts: [
      './_assets/js/charts.js'
    ],
    kuebelspritze: [
      './_assets/js/kuebelspritze.js'
    ],
    media: [
      './_assets/js/media.js'
    ],
    einsatz: [
      './_assets/js/einsatz.js'
    ],
    weather: [
      './_assets/js/modules/weather.js'
    ],
    emoji: [
      './_assets/js/modules/emoji.js'
    ],
    feedbox: [
      './_assets/js/modules/feedbox.js'
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '_site/assets/js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // + files with import()
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  "targets": {
                    "esmodules": true
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  }
}
