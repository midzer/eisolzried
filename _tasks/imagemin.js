'use strict'

import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import imageminMozjpeg from 'imagemin-mozjpeg'

gulp.task('imagemin', () => {
  return gulp.src('_assets/images/**/*')
    .pipe(gulp.dest('_site/assets/images'))
})

gulp.task('imagemin:prod', () => {
  return gulp.src('_assets/images/**/*')
    .pipe(imagemin([
      imageminMozjpeg({
        progressive: false
      })
    ]))
    .pipe(gulp.dest('_site/assets/images'))
})
