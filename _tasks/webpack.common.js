module.exports = {
    entry: {
      main: [
        'rqrauhvmra__tobi',
        'intersection-observer',
        './_assets/js/snackbar.js',
        './_assets/js/helper.js',
        './_assets/js/main.js',
        './_assets/js/service-worker-registration.js'
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
      statistics: [
        'chartist',
        './_assets/js/statistics.js'
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