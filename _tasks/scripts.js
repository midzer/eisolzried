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
    main: './_assets/js/main.js',
    index: './_assets/js/index.js',
    vendor : [
      'bootstrap.native/dist/polyfill.js',
      'bootstrap.native/dist/bootstrap-native.js',
      'intersection-observer/intersection-observer.js',
      'ical.js/build/ical.js',
      './_assets/js/snackbar.js',
      './_assets/js/service-worker-registration.js',
      './_assets/js/drcal.js'
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
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: '[name].js'
    }),
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
