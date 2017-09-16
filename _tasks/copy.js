'use strict';

import gulp from 'gulp';

gulp.task('copy', () => {
  return gulp.src([
    '_assets/js/d3.min.js',
    '_assets/js/lightbox.min.js',
    '_assets/audio/**',
    '_assets/css/dark-theme.min.css',
    '_assets/data/**',
    '_assets/videos/**'
  ], {
    base: '_assets',
  })
    .pipe(gulp.dest('_site/assets/'));
});
