module.exports = {
    entry: {
      main: [
        'intersection-observer',
        './_assets/js/snackbar.js',
        './_assets/js/main.js',
        './_assets/js/service-worker-registration.js'
      ],
      lazy: [
        './_assets/js/lazy.js'
      ],
      lightbox: [
        './_assets/js/lightbox.js'
      ],
      calendar: [
        'ical.js',
        './_assets/js/drcal.js',
        './_assets/js/calendar.js'
      ],
      posts: [
        './_assets/js/posts.js'
      ],
      chatbox: [
        './_assets/js/chatbox.js'
      ],
      socialbox: [
        './_assets/js/socialbox.js'
      ],
      charts: [
        'chartist',
        './_assets/js/charts.js'
      ],
      kuebelspritze: [
        './_assets/js/kuebelspritze.js'
      ],
      imagegal: [
        './_assets/js/imagegal.js'
      ],
      videogal: [
        './_assets/js/videogal.js'
      ]
    },
    output: {
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {
                  modules: false,
                  useBuiltIns: true
                }],
              ],
            },
          },
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
      ],
    }
};
