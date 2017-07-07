'use strict';

import gulp from 'gulp';

gulp.task('serve', ['browser-sync'], () => {
  //asset pipeline
  gulp.watch(['_assets/styles/**/*.scss'], ['sass']);
  gulp.watch(['_assets/js/**/*.js'], ['scripts']);
  gulp.watch(['_assets/images/**/*'], ['imagemin']);
  gulp.watch(['_assets/icons/**/*.svg'], ['icons']);

  //jekyll
  gulp.watch([
    '*.html', 
    '_layouts/**/*', 
    '_includes/**/*', 
    '_posts/**/*'
  ], ['jekyll:reload']);
});

gulp.task('default', ['serve']);