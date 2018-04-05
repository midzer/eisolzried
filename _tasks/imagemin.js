'use strict';

import gulp from 'gulp';
import imagemin from 'gulp-imagemin';

gulp.task('imagemin', () => {
  return gulp.src('_assets/images/**/*')
    .pipe(gulp.dest('_site/assets/images'));
});

gulp.task('imagemin:prod', () => {
  return gulp.src('_assets/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('_site/assets/images'));
});