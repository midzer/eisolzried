'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import swPrecache from 'sw-precache';
import path from 'path';

function writeServiceWorkerFile(rootDir, handleFetch, callback) {
  const config = {
    cacheId: 'ff-eisolzried',
    handleFetch,
    logger: gutil.log,
    staticFileGlobs: [
      `${rootDir}/**/*.html`,
      `${rootDir}/assets/{css,data,js,icons,font}/*`
    ],
    stripPrefix: `${rootDir}/`,
    verbose: true,
  };

  swPrecache.write(path.join(rootDir, 'service-worker.js'), config, callback);
}

gulp.task('precache', (cb) => {
  writeServiceWorkerFile('_site', false, cb);
});

gulp.task('precache:prod', (cb) => {
  writeServiceWorkerFile('_site', true, cb);
});
