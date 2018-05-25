'use strict';

import gulp from 'gulp';
import log from 'fancy-log';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

const reload = browserSync.reload;

const devConfig = require('./webpack.dev.js');
const prodConfig = require('./webpack.prod.js');

gulp.task('scripts', () => {
  return gulp.src('')
    .pipe(plumber({
      errorHandler: (err) => {
        log.error(err);
        this.emit('end');
      },
    }))
    .pipe(webpackStream(devConfig, webpack))
    .pipe(gulp.dest('_site/assets/js'))
    .pipe(reload({ stream: true }));
});

gulp.task('scripts:prod', () => {
  return gulp.src('')
    .pipe(plumber({
      errorHandler: (err) => {
        log.error(err);
        this.emit('end');
      },
    }))
    .pipe(webpackStream(prodConfig, webpack))
    .pipe(gulp.dest('_site/assets/js'));
});
