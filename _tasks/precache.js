'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import swPrecache from 'sw-precache';
import path from 'path';

function writeServiceWorkerFile(rootDir, handleFetch, callback) {
  const config = {
    cacheId: 'ff-eisolzried',
    handleFetch: handleFetch,
    logger: gutil.log,
    staticFileGlobs: [
      `${rootDir}/**/*.html`,
      `${rootDir}/assets/{css,js,icons}/*`,
      `${rootDir}/search.json`,
      `${rootDir}/assets/data/termine.ics`,
    ],
    stripPrefix: `${rootDir}/`,
    verbose: false,
  };

  swPrecache.write(path.join(rootDir, 'service-worker.js'), config, callback);
}

gulp.task('precache', (cb) => {
  writeServiceWorkerFile('_site', false, cb);
});

gulp.task('precache:prod', (cb) => {
  writeServiceWorkerFile('_site', true, cb);
});
