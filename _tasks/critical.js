'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import plumber from 'gulp-plumber';
import critical from 'critical';

const config = {
  inline: true,
  base: '_site',
  css: ['_site/assets/css/main.min.css'],
  minify: true,
  dimensions: [{
        height: 640,
        width: 360
    }, {
        height: 900,
        width: 1300
  }],
  ignore: ['@font-face']
};

gulp.task('critical', () => {
  return gulp.src('_site/index.html')
    .pipe(plumber({
      errorHandler: (err) => {
        gutil.log(gutil.colors.red(err));
        this.emit('end');
      },
    }))
    .pipe(critical.stream(config))
    .pipe(gulp.dest('_site'));
});
