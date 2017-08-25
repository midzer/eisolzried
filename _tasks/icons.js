'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import svgSprite from 'gulp-svg-sprite';
import plumber from 'gulp-plumber';

const config = {
  mode: {
    symbol: { // symbol mode to build the SVG
      dest: 'icons', // destination folder
      sprite: 'sprite.svg', // sprite name
    }
  },
  
  shape				: {
		transform		: [
			{}
		]
	}
};

gulp.task('icons', () => {
  return gulp.src('_assets/icons/**/*.svg')
    .pipe(plumber({
      errorHandler: function (err) {
        gutil.log(gutil.colors.red(err));
        this.emit('end');
      }
    }))
    .pipe(svgSprite(config))
    .pipe(gulp.dest('_site/assets'));
});