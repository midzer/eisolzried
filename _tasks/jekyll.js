'use strict';

import gulp from 'gulp';
import log from 'fancy-log';
import childProcess from 'child_process';

gulp.task('jekyll', done => {
  return childProcess.spawn('bundle', ['exec', 'jekyll', 'build', '--drafts'], {stdio: 'inherit'})
  .on('error', (error) => log.error(error.message))
  .on('close', done);
});

gulp.task('jekyll:prod', done => {
  var productionEnv = process.env;
      productionEnv.JEKYLL_ENV = 'production';

  return childProcess.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit' , env: productionEnv})
  .on('close', done);
});