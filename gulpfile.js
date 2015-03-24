'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

// Modules for webserver and livereload
var express = require('express'),
    refresh = require('gulp-livereload'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 5000;

// Set up an express server (not starting it yet)
var server = express();
// Add live reload
server.use(livereload({port: livereloadport}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function(req, res) {
  res.sendfile('index.html', { root: 'dist' });
});

// Dev task
gulp.task('dev', ['clean', 'views', 'copyFiles', 'lint', 'concat'], function() { });

// Clean task
gulp.task('clean', function() {
  gulp.src('./dist/views', { read: false }) // much faster
  .pipe(rimraf({force: true}));
});


// JSHint task
gulp.task('lint', function() {
  gulp.src('app/js/*.js')
  .pipe(jshint({
    "predef": ["angular"]
  }))
  .pipe(jshint.reporter('default'));
});

// copyFiles task
gulp.task('copyFiles', function() {
  gulp.src('app/scss/*.scss')
  // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
  .pipe(sass({onError: function(e) { console.log(e); } }))
  // Optionally add autoprefixer
  .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
  // These last two should look familiar now :)
  .pipe(gulp.dest('dist/css/'));

  gulp.src('app/bower_components/**/*')
  .pipe(gulp.dest('dist/bower_components'));

});

// Concat task
gulp.task('concat', function() {
  
  gulp.src(['app/js/app.js' ,'app/js/**/*.js'])
  
  // Bundle to a single file
  .pipe(concat('main.js'))
  // Output it to our dist folder
  .pipe(gulp.dest('dist/js'));
});

// Views task
gulp.task('views', function() {
  // Get our index.html
  gulp.src('app/index.html')
  // And put it in the dist folder
  .pipe(gulp.dest('dist/'));

  // Any other view files from app/views
  gulp.src('app/views/**/*')
  // Will be put in the dist/views folder
  .pipe(gulp.dest('dist/views/'));
});

gulp.task('watch', ['lint'], function() {
  // Start webserver
  server.listen(serverport);
  // Start live reload
  refresh.listen(livereloadport);

  // Watch our scripts, and when they change run lint and concat
  gulp.watch(['app/js/*.js', 'app/js/**/*.js'],[
    'lint',
    'concat'
  ]);
  // Watch our sass files
  gulp.watch(['app/scss/**/*.scss'], [
    'copyFiles'
  ]);

  gulp.watch(['app/**/*.html'], [
    'views'
  ]);

  gulp.watch('./dist/**').on('change', refresh.changed);

});

var karma = require('gulp-karma');

gulp.task('test', function() {
  // Be sure to return the stream
  // NOTE: Using the fake './foobar' so as to run the files
  // listed in karma.conf.js INSTEAD of what was passed to
  // gulp.src !
  return gulp.src('./foobar')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      console.log(err);
      this.emit('end'); //instead of erroring the stream, end it
    });
});

gulp.task('autotest', function() {
  return gulp.watch(['app/js/**/*.js', 'test/**/*.js'], ['test']);
});

gulp.task('default', ['dev', 'watch']);