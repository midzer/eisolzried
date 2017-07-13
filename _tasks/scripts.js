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
  '_assets/js/intersection-observer.js',
  '_assets/js/main.js',
  '_assets/js/service-worker-registration.js'
];

const webpackConfig = {
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/',
      query: {
        compact: false,
      }
    }],
  },
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
