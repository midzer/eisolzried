const path = require('path')

module.exports = {
  entry: {
    main: [
      'intersection-observer',
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
    polyfills: [
      './_assets/js/polyfills.js'
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
              ['@babel/preset-env', {
                modules: false
              }]
            ]
          }
        }
      },
      {
        test: /bootstrap\.native/,
        use: {
          loader: 'bootstrap.native-loader',
          options: {
            ignore: ['scrollspy', 'popover', 'alert', 'affix']
          }
        }
      }
    ]
  },
  optimization: {
    runtimeChunk: {
      name: 'main'
    }
  }
}
