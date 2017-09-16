'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';


const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const webpackConfig = {
  entry: {
    main: [
      'bootstrap.native/dist/bootstrap-native.js',
      'intersection-observer/intersection-observer.js',
      './_assets/js/snackbar.js',
      './_assets/js/main.js',
      './_assets/js/service-worker-registration.js'
    ],
    index: [
      'ical.js/build/ical.js',
      './_assets/js/drcal.js',
      './_assets/js/index.js'
    ]
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|vendor)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                modules: false,
                useBuiltIns: true,
                targets: {
                  browsers: [
                    '> 1%',
                    'last 2 versions',
                    'Firefox ESR'
                  ],
                },
              }],
            ],
          },
        },
      }
    ],
  },
  plugins: [
    new UglifyJSPlugin()
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
