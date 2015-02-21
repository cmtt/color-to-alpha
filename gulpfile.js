var gulp = require('gulp');
var mocha = require('gulp-mocha');
var webmake = require('gulp-webmake');

var options = {
  mocha : {},
  webmake : {}
};

gulp.task('default', ['mocha', 'example']);

gulp.task('mocha', function () {
  return gulp.src('spec/**/*.js')
  .pipe(mocha(options.mocha));
});

gulp.task('watch', ['default'], function () {
  return gulp.watch(['*.js', 'spec/**/*.js', 'example-src/**/*'], ['default']);
});

gulp.task('webmake', function () {
  return gulp.src('example-src/example.js')
  .pipe(webmake(options.webmake))
  .pipe(gulp.dest('example'))
});

gulp.task('example', ['webmake'], function () {
  return gulp.src([
    'example-src/index.html',
    'spec/fixtures/**'
  ])
  .pipe(gulp.dest('example'))
});