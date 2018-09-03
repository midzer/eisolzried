'use strict'

import gulp from 'gulp'
import log from 'fancy-log'
import svgSprite from 'gulp-svg-sprite'
import plumber from 'gulp-plumber'

const config = {
  mode: {
    stack: { // stack mode to build the SVG
      dest: 'icons', // destination folder
      sprite: 'sprite.svg' // sprite name
    }
  },
  shape: {
    transform: [
      {
        svgo: {
          plugins: [
              {
                convertShapeToPath: false
              }
          ]
        }
      }
    ]
  },
  svg: {
    xmlDeclaration: false, // strip out the XML attribute
    doctypeDeclaration: false // don't include the !DOCTYPE declaration
  }
}

gulp.task('icons', () => {
  return gulp.src('_assets/icons/**/*.svg')
    .pipe(plumber({
      errorHandler: function (err) {
        log.error(err)
        this.emit('end')
      }
    }))
    .pipe(svgSprite(config))
    .pipe(gulp.dest('_site/assets'))
})
