'use strict'

import gulp from 'gulp'
import htmlmin from 'gulp-htmlmin'

gulp.task('htmlmin', () => {
  return gulp.src('_site/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('_site/'))
})
