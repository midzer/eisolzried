'use strict';

import gulp from 'gulp';
import log from 'fancy-log';
import plumber from 'gulp-plumber';
import critical from 'critical';

const config = {
  inline: true,
  base: '_site/',
  minify: true
};

gulp.task('critical', () => {
  return gulp.src('_site/index.html')
    .pipe(plumber({
      errorHandler: (err) => {
        log.error(err);
        this.emit('end');
      },
    }))
    .pipe(critical.stream(config))
    .pipe(gulp.dest('_site'));
});
