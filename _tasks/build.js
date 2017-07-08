'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';
import del from 'del';

const reload = browserSync.reload;

gulp.task('build', ['clean'], function(cb) {
  runSequence('jekyll', 'scripts', 'sass', 'imagemin', 'iconmin', 'icons', 'precache', cb);
});

gulp.task('build:prod', ['clean'], function(cb) {
  runSequence('jekyll:prod', 'scripts', 'sass:prod', 'imagemin', 'iconmin', 'icons', 'critical', 'htmlmin', 'precache:prod', cb);
});

gulp.task('clean', del.bind(null, ['_site'], {dot: true}));