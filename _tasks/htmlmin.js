'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import htmlmin from 'gulp-htmlmin';

const reload = browserSync.reload;

gulp.task('htmlmin', () => {
  return gulp.src('_site/**/*.html')
    .pipe(htmlmin( {collapseWhitespace: true}))
    .pipe(gulp.dest('_site/'))
    .pipe(reload({stream: true}));
});