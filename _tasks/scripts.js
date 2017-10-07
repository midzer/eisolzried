'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const webpackConfig = {
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
    moreposts: [
      './_assets/js/moreposts.js'
    ],
    chatbox: [
      './_assets/js/chatbox.js'
    ],
    socialbox: [
      './_assets/js/socialbox.js'
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
                //modules: false,
                //useBuiltIns: true
              }],
            ],
          },
        },
      }
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "main",
      minChunks: Infinity
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]
};

gulp.task('scripts', () => {
  return gulp.src('')
    .pipe(plumber({
      errorHandler: (err) => {
        gutil.log(gutil.colors.red(err));
        this.emit('end');
      },
    }))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('_site/assets/js'));
});
