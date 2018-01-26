'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import plumber from 'gulp-plumber';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import BrotliPlugin from 'brotli-webpack-plugin';
import ZopfliPlugin from 'zopfli-webpack-plugin';

const brotliConfig = {
  module: {
    rules: [
      {
        test: /\.(js|css|html|svg|ics|json)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
		new BrotliPlugin({
			asset: '[path].br[query]',
			test: /\.(js|css|html|svg|ics|json)$/,
			threshold: 10240,
			minRatio: 0.8
		})
	]
};

const zopfliConfig = {
  module: {
    rules: [
      {
        test: /\.(js|css|html|svg|ics|json)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
		new ZopfliPlugin({
			asset: "[path].gz[query]",
			algorithm: "zopfli",
			test: /\.(js|css|html|svg|ics|json)$/,
			threshold: 10240,
			minRatio: 0.8
		})
	]
};

gulp.task('brotli', () => {
  return gulp.src(
    [
      '_site/**/*.js',
      '_site/**/*.css',
      '_site/**/*.html',
      '_site/**/*.svg',
      '_site/**/*.ics',
      '_site/**/*.json',
    ])
    .pipe(webpackStream(brotliConfig, webpack))
    .pipe(gulp.dest(''));
});

gulp.task('zopfli', () => {
  return gulp.src(
    [
      '_site/**/*.js',
      '_site/**/*.css',
      '_site/**/*.html',
      '_site/**/*.svg',
      '_site/**/*.ics',
      '_site/**/*.json',
    ])
    .pipe(webpackStream(zopfliConfig, webpack))
    .pipe(gulp.dest(''));
});
