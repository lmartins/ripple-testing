'use strict';

var gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    sass       = require('gulp-sass'),
    prefix     = require('gulp-autoprefixer'),
    coffee     = require('gulp-coffee'),
    coffeelint = require('gulp-coffeelint'),
    component  = require('gulp-component'),
    componentcoffee  = require('component-coffee'),
    plumber    = require('gulp-plumber'),
    changed    = require('gulp-changed'),
    uglify     = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    notify     = require('gulp-notify');

var options = {

  COFFEE: {
    src: ["src/coffee/**/*.coffee"],
    build: "build/js/"
  },

  COMPONENT: {
    manifest: "component.json",
    // este src é usado para fazer watching de components pessoais
    src: ["mycomponents/**/*.coffee", "mycomponents/**/*.js", "mycomponents/**/*.css"],
    build: "build/css/"
  },

  HTML:{
    src: 'pages/*.html'
  },

  SASS: {
    src: "src/sass/**/*.scss",
    build: "build/css/"
  },

  IMAGES: {
    src    : "src/images/**/*",
    build  : "build/images",
  },

  LIVE_RELOAD_PORT: 35729

}


// SASS ------------------------------------------------------------------------
gulp.task('sass', function() {
  gulp.src(options.SASS.src)
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed'
      }))
    .on("error", notify.onError())
    .on("error", function (err) {
      console.log("Error:", err);
    })
    .pipe(prefix( "last 1 version" ))
    .pipe(gulp.dest(options.SASS.build))
    .pipe(livereload());
});


// COFFEE ----------------------------------------------------------------------
gulp.task('coffee', function () {
  gulp.src( options.COFFEE.src )
    .pipe(changed( options.COFFEE.build , { extension: '.js' }))
    // .pipe(coffeelint())
    // .pipe(coffeelint.reporter())
    .pipe(coffee({
      bare: true,
      sourceMap: true
      })
    .on('error', gutil.log))
    .pipe(gulp.dest( options.COFFEE.build ))
    .pipe(livereload());
});



// COMPONENT -------------------------------------------------------------------
gulp.task('component-js', function () {
  gulp.src( options.COMPONENT.manifest )
    .pipe(component.scripts({
      standalone: false,
      configure: function (builder) {
        builder.use( componentcoffee )
      }
    }))
    .pipe(gulp.dest( options.COFFEE.build ))
})

gulp.task('component-css', function () {
  gulp.src( options.COMPONENT.manifest )
    .pipe(component.styles({
      configure: function (builder) {
        builder.use( sass )
      }
    }))
    .pipe(gulp.dest( options.SASS.build ))
})



// HTML ------------------------------------------------------------------------
gulp.task('html', function () {
  gulp.src( options.HTML.src )
    .pipe(livereload());
});




// WATCHERS AND TASKS ----------------------------------------------------------

gulp.task('component', [ 'component-js', 'component-css' ]);

gulp.task('default', function () {
  gulp.watch( options.HTML.src , ['html']);
  gulp.watch( options.COFFEE.src , ['coffee']);
  gulp.watch( [options.COMPONENT.manifest, options.COMPONENT.src] , ['component-js', 'component-css']);
  // gulp.watch(options.IMAGE_SOURCE, ['images']);
  gulp.watch( options.HTML.src , ['html']  );
  gulp.watch( options.SASS.src , ['sass']  );
});
