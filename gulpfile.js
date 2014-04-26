'use strict';

var gulp = require('gulp'),
  gutil      = require('gulp-util'),
  sass       = require('gulp-sass'),
  prefix     = require('gulp-autoprefixer'),
  coffee     = require('gulp-coffee'),
  coffeelint = require('gulp-coffeelint'),
  plumber    = require('gulp-plumber'),
  changed    = require('gulp-changed'),
  uglify     = require('gulp-uglify'),
  livereload = require('gulp-livereload'),
  notify     = require('gulp-notify');

var options = {
  // HTML
  HTML_SOURCE     : ['*.html'],

  // SASS / CSS
  SASS_SOURCE     : "src/sass/**/*.scss",
  SASS_BUILD      : "build/css/",

  // JavaScript
  COFFEE_SOURCE   : "src/js/**/*.coffee",
  COFFEE_BUILD    : "build/js/",

  // Live reload
  LIVE_RELOAD_PORT: 35729
}


// Compile Our Sass
gulp.task('sass', function() {
  gulp.src(options.SASS_SOURCE)
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed'
      }))
    .on("error", notify.onError())
    .on("error", function (err) {
      console.log("Error:", err);
    })
    .pipe(prefix( "last 1 version" ))
    .pipe(gulp.dest(options.SASS_BUILD))
    .pipe(livereload());
});

// Compile Our Coffee
gulp.task('coffee', function () {
  gulp.src( options.COFFEE_SOURCE )
    .pipe(changed( options.COFFEE_BUILD , { extension: '.js' }))
    // .pipe(coffeelint())
    // .pipe(coffeelint.reporter())
    .pipe(coffee({
      bare: true,
      sourceMap: true
      })
    .on('error', gutil.log))
    .pipe(gulp.dest( options.COFFEE_BUILD ))
    .pipe(livereload());
});


gulp.task('html', function () {
  gulp.src( options.HTML_SOURCE )
    .pipe(livereload());
});


gulp.task('default', function () {
  // server = livereload();
  gulp.watch(options.HTML_SOURCE, ['html']);
  gulp.watch(options.COFFEE_SOURCE, ['coffee']);
  gulp.watch(options.SASS_SOURCE, ['sass']  );
});
