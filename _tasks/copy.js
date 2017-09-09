'use strict';

import gulp from 'gulp';

gulp.task('copy', () => {
  return gulp.src([
    '_assets/js/*.js',
    '!_assets/js/drcal.js',
    '!_assets/js/index.js',
    '!_assets/js/intersection-observer.js',
    '!_assets/js/main.js',
    '!_assets/js/service-worker-registration.js',
    '_assets/audio/**',
    '_assets/css/**',
    '_assets/data/**',
    '_assets/videos/**'
  ], {
    base: '_assets',
  })
    .pipe(gulp.dest('_site/assets/'));
});
