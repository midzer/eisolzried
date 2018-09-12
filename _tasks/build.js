'use strict'

import gulp from 'gulp'
import runSequence from 'run-sequence'

gulp.task('build', function (cb) {
  runSequence('jekyll', /*'copy',*/ 'scripts', 'sass', 'imagemin', 'icons', 'precache', cb)
})

gulp.task('build:prod', function (cb) {
  runSequence('jekyll:prod', /*'copy',*/ 'scripts:prod', 'sass:prod', /*'imagemin:prod',*/ /*'icons',*/ 'precache:prod', 'htmlmin', cb)
})
