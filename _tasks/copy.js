'use strict';

import gulp from 'gulp';

gulp.task('copy', () => {
  return gulp.src([
    '_assets/audio/**',
    '_assets/data/**',
    '_assets/videos/**',
    '_assets/favicons/**',
    '_assets/js/snowstorm.min.js',
  ], {
    base: '_assets',
  })
    .pipe(gulp.dest('_site/assets/'));
});
