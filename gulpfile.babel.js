'use strict'

import gulp from 'gulp'
import htmlmin from 'gulp-htmlmin'
import log from 'fancy-log'
import svgSprite from 'gulp-svg-sprite'
import plumber from 'gulp-plumber'
import childProcess from 'child_process'
import swPrecache from 'sw-precache'
import path from 'path'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import purgecss from 'gulp-purgecss'
import csso from 'gulp-csso'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'

// Copy
gulp.task('copy', () => {
  return gulp.src([
    '_assets/data/**',
    '_assets/images/**/*',
    //'_assets/videos/**'
  ], {
    base: '_assets'
  })
    .pipe(gulp.dest('_site/assets/'))
})

// HtmlMin
gulp.task('htmlmin', () => {
  return gulp.src('_site/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('_site/'))
})

// Icons
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
              convertShapeToPath: true
            },
            {
              removeXMLNS: true
            },
            {
              removeAttrs: {attrs: '(class)'}
            },
            {
              cleanupNumericValues:
              {
                floatPrecision: 2
              }
            }
          ]
        }
      }
    ]
  },
  svg: {
    xmlDeclaration: false, // Add XML declaration to SVG sprite
    doctypeDeclaration: false, // Add DOCTYPE declaration to SVG sprite
    namespaceIDs: false, // Add namespace token to all IDs in SVG shapes
    namespaceClassnames: false, // Add namespace token to all CSS class names in SVG shapes
    dimensionAttributes: false // Width and height attributes on the sprite
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

// Jekyll
gulp.task('jekyll', done => {
  return childProcess.spawn('bundle', ['exec', 'jekyll', 'serve'], { stdio: 'inherit' })
    .on('error', (error) => log.error(error.message))
    .on('close', done)
})

gulp.task('jekyll:prod', done => {
  var productionEnv = process.env
  productionEnv.JEKYLL_ENV = 'production'

  return childProcess.spawn('bundle', ['exec', 'jekyll', 'build'], { stdio: 'inherit', env: productionEnv })
    .on('close', done)
})

// Precache
function writeServiceWorkerFile (rootDir, handleFetch, callback) {
  const config = {
    cacheId: 'ff-eisolzried',
    handleFetch: handleFetch,
    logger: log,
    staticFileGlobs: [
      `${rootDir}/**/*.html`,
      `${rootDir}/assets/icons/*`,
      `${rootDir}/assets/css/main.css`,
      `${rootDir}/assets/css/dark-theme.css`,
      `${rootDir}/assets/js/main.js`,
      `${rootDir}/assets/js/posts.js`
    ],
    stripPrefix: `${rootDir}/`,
    verbose: false
  }

  swPrecache.write(path.join(rootDir, 'service-worker.js'), config, callback)
}

gulp.task('precache', (cb) => {
  writeServiceWorkerFile('_site', false, cb)
})

gulp.task('precache:prod', (cb) => {
  writeServiceWorkerFile('_site', true, cb)
})

// Sass
const sourcefiles = [
  '_assets/styles/main.scss',
  '_assets/styles/dark-theme.scss',
  '_assets/styles/calendar.scss',
  '_assets/styles/charts.scss',
  '_assets/styles/lightbox.scss'
]

gulp.task('sass', () => {
  return gulp.src(sourcefiles)
    .pipe(plumber({
      errorHandler: (err) => {
        log.error(err)
        this.emit('end')
      }
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('_site/assets/css'))
})

gulp.task('sass:prod', () => {
  return gulp.src(sourcefiles)
    .pipe(plumber({
      handleError: (err) => {
        log.error(err)
        this.emit('end')
      }
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(purgecss({
      content: ['_site/assets/js/*.js', '_site/**/*.html'],
      whitelistPatterns: [/^carousel/, /^modal/]
    }))
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest('_site/assets/css'))
})

// Scripts
const devConfig = require('./webpack.dev.js')
const prodConfig = require('./webpack.prod.js')

gulp.task('scripts', () => {
  return gulp.src('assets/js', { allowEmpty: true })
    .pipe(plumber({
      errorHandler: (err) => {
        log.error(err)
        this.emit('end')
      }
    }))
    .pipe(webpackStream(devConfig, webpack))
    .pipe(gulp.dest('_site/assets/js'))
})

gulp.task('scripts:prod', () => {
  return gulp.src('assets/js', { allowEmpty: true })
    .pipe(plumber({
      errorHandler: (err) => {
        log.error(err)
        this.emit('end')
      }
    }))
    .pipe(webpackStream(prodConfig, webpack))
    .pipe(gulp.dest('_site/assets/js'))
})

// Build
gulp.task('serve', gulp.series(/*'copy',*/ 'scripts', 'sass', 'icons', 'jekyll'))
gulp.task('build', gulp.series('jekyll:prod', /*'copy',*/ 'scripts:prod', 'sass:prod', 'icons', 'precache:prod', 'htmlmin'))
