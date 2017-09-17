'use strict';

import gulp from 'gulp';

gulp.task('copy', () => {
  return gulp.src([
    '_assets/js/bootstrap-native.min.js',
    '_assets/js/d3.min.js',
    '_assets/js/lightbox.min.js',
    '_assets/audio/**',
    '_assets/css/dark-theme.min.css',
    '_assets/data/**',
    '_assets/videos/**',
    '_assets/favicons/**'
  ], {
    base: '_assets',
  })
    .pipe(gulp.dest('_site/assets/'));
});
