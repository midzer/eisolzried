'use strict';

import gulp from 'gulp';
import log from 'fancy-log';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const webpackConfigDev = {
  mode: 'development',
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
      }
    ],
  }
};

const webpackConfig = {
  mode: 'production',
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
      }
    ],
  }
};

gulp.task('scripts', () => {
  return gulp.src('')
    .pipe(plumber({
      errorHandler: (err) => {
        log.error(err);
        this.emit('end');
      },
    }))
    .pipe(webpackStream(webpackConfigDev, webpack))
    .pipe(gulp.dest('_site/assets/js'));
});

gulp.task('scripts:prod', () => {
  return gulp.src('')
    .pipe(plumber({
      errorHandler: (err) => {
        log.error(err);
        this.emit('end');
      },
    }))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('_site/assets/js'));
});
