'use strict'

import gulp from 'gulp'
var browserSync = require('browser-sync').create();
import htmlmin from 'gulp-htmlmin'
import log from 'fancy-log'
import svgSprite from 'gulp-svg-sprite'
import plumber from 'gulp-plumber'
import imagemin from 'gulp-imagemin'
import imageminMozjpeg from 'imagemin-mozjpeg'
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
    //'_assets/animations/**',
    //'_assets/audio/**',
    '_assets/data/**',
    '_assets/gimmicks/**',
    //'_assets/videos/**'
  ], {
    base: '_assets'
  })
    .pipe(gulp.dest('_site/assets/'))
})

// Compress
//import BrotliPlugin from 'brotli-webpack-plugin';
//import ZopfliPlugin from 'zopfli-webpack-plugin';

// const brotliConfig = {
//   module: {
//     rules: [
//       {
//         test: /\.(js|css|html|svg|ics|json)$/,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: '[path][name].[ext]'
//             }
//           }
//         ]
//       }
//     ]
//   },
//   plugins: [
// 		new BrotliPlugin({
// 			asset: '[path].br[query]',
// 			test: /\.(js|css|html|svg|ics|json)$/,
// 			threshold: 10240,
// 			minRatio: 0.8
// 		})
// 	]
// };

// const zopfliConfig = {
//   module: {
//     rules: [
//       {
//         test: /\.(js|css|html|svg|ics|json)$/,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: '[path][name].[ext]'
//             }
//           }
//         ]
//       }
//     ]
//   },
//   plugins: [
// 		new ZopfliPlugin({
// 			asset: "[path].gz[query]",
// 			algorithm: "zopfli",
// 			test: /\.(js|css|html|svg|ics|json)$/,
// 			threshold: 10240,
// 			minRatio: 0.8
// 		})
// 	]
// };

// gulp.task('brotli', () => {
//   return gulp.src(
//     [
//       '_site/**/*.js',
//       '_site/**/*.css',
//       '_site/**/*.html',
//       '_site/**/*.svg',
//       '_site/**/*.ics',
//       '_site/**/*.json',
//     ])
//     .pipe(webpackStream(brotliConfig, webpack))
//     .pipe(gulp.dest(''));
// });

// gulp.task('zopfli', () => {
//   return gulp.src(
//     [
//       '_site/**/*.js',
//       '_site/**/*.css',
//       '_site/**/*.html',
//       '_site/**/*.svg',
//       '_site/**/*.ics',
//       '_site/**/*.json',
//     ])
//     .pipe(webpackStream(zopfliConfig, webpack))
//     .pipe(gulp.dest(''));
// });

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

// ImageMin
gulp.task('imagemin', () => {
  return gulp.src('_assets/images/**/*')
    .pipe(gulp.dest('_site/assets/images'))
})

gulp.task('imagemin:prod', () => {
  return gulp.src('_assets/images/**/*')
    .pipe(imagemin([
      imageminMozjpeg({
        quality: 90,
        progressive: false
      })
    ]))
    .pipe(gulp.dest('_site/assets/images'))
})

// Jekyll
gulp.task('jekyll', done => {
  return childProcess.spawn('bundle', ['exec', 'jekyll', 'build', '--drafts'], { stdio: 'inherit' })
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
      `${rootDir}/assets/{css,js,icons}/*`,
      `${rootDir}/search.json`,
      `${rootDir}/search-by.json`,
      `${rootDir}/assets/data/termine.ics`,
      `${rootDir}/assets/gimmicks/grisu.webm`
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
  '_assets/styles/chatbox.scss',
  '_assets/styles/lightbox.scss',
  '_assets/styles/snackbar.scss'
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
    .pipe(browserSync.stream())
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
    .pipe(browserSync.stream())
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
gulp.task('build', gulp.series('jekyll', 'copy', 'scripts', 'sass', 'imagemin', 'icons', 'precache'))
gulp.task('build:prod', gulp.series('jekyll:prod', 'copy', 'scripts:prod', 'sass:prod', /*'imagemin:prod',*/ 'icons', 'precache:prod', 'htmlmin'))

// Serve
gulp.task('serve', gulp.series('build', () => { 
  browserSync.init({
    server: {
      baseDir: '_site'
    },
    notify: false
    //https: true
  })
  
  gulp.watch(['_assets/styles/**/*.scss'], gulp.series('sass'))
  gulp.watch(['_assets/js/**/*.js'], gulp.series('scripts'))
  gulp.watch(['_assets/images/**/*'], gulp.series('imagemin'))
  gulp.watch(['_assets/icons/**/*.svg'], gulp.series('icons'))
  gulp.watch([
    '_layouts/**/*',
    '_includes/**/*',
    '_pages/**/*',
    '_posts/**/*'
  ]).on('change', browserSync.reload)
}))

gulp.task('default', gulp.series('serve', function() { 
  // default task code here
}))
