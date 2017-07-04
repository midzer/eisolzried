var gulp = require('gulp');

gulp.task('default', function(callback) {
  var swPrecache = require('sw-precache');
  var rootDir = '_site';

  swPrecache.write(`${rootDir}/service-worker.js`, {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,woff2}'],
    stripPrefix: rootDir
  }, callback);
});
