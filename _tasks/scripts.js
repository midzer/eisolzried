'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import webpack from 'webpack-stream';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const srcFiles = [
  'node_modules/bootstrap.native/dist/polyfill.js',
  'node_modules/bootstrap.native/dist/bootstrap-native.js',
  'node_modules/intersection-observer/intersection-observer.js',
  '_assets/js/snackbar.js',
  '_assets/js/main.js',
  '_assets/js/service-worker-registration.js'
];

const srcFilesIndex = [
  'node_modules/ical.js/build/ical.js',
  '_assets/js/drcal.js',
  '_assets/js/index.js'
];

const webpackConfig = {
  module: {
    rules: [{
      test: /\.js$/,
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
                  'Firefox ESR',
                ],
              },
            }],
          ],
        },
      },
    }],
  }
};

gulp.task('scripts', () => {
  return gulp.src(srcFiles)
    .pipe(plumber({
      errorHandler: (err) => {
        gutil.log(gutil.colors.red(err));
        this.emit('end');
      },
    }))
    .pipe(webpack(webpackConfig))
    .pipe($.uglify())
    .pipe($.rename('bundle.min.js'))
    .pipe(gulp.dest('_site/assets/js'));
});

gulp.task('scriptsIndex', () => {
  return gulp.src(srcFilesIndex)
    .pipe(plumber({
      errorHandler: (err) => {
        gutil.log(gutil.colors.red(err));
        this.emit('end');
      },
    }))
    .pipe(webpack(webpackConfig))
    .pipe($.uglify())
    .pipe($.rename('index.min.js'))
    .pipe(gulp.dest('_site/assets/js'));
});
