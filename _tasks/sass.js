'use strict';

import gulp from 'gulp';
import log from 'fancy-log';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import purgecss from 'gulp-purgecss';
import cleancss from 'gulp-clean-css';

const reload = browserSync.reload;

const sourcefiles = [
  '_assets/styles/main.scss',
  '_assets/styles/dark-theme.css'
];

gulp.task('sass', () => {
  return gulp.src(sourcefiles)
    .pipe(plumber({
      errorHandler: (err) => {
        log.error(err);
        this.emit('end');
      },
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(reload({ stream: true }));
});

gulp.task('sass:prod', () => {
  return gulp.src(sourcefiles)
    .pipe(plumber({
      handleError: (err) => {
        log.error(err);
        this.emit('end');
      },
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(purgecss({
      content: ['_site/assets/js/*.js', '_site/**/*.html']
    }))
    .pipe(cleancss())
    .pipe(gulp.dest('_site/assets/css'));
});