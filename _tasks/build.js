'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';
import del from 'del';

const reload = browserSync.reload;

gulp.task('build', function(cb) {
  runSequence('jekyll', 'copy', 'scripts', 'sass', 'imagemin', 'icons', 'precache', cb);
});

gulp.task('build:prod', ['clean'], function(cb) {
  runSequence('jekyll:prod', 'copy', 'scripts:prod', 'sass:prod', 'imagemin:prod', 'icons', 'precache:prod', 'htmlmin', 'critical', cb);
});

gulp.task('clean', del.bind(null, ['_site'], {dot: true}));
