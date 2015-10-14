var gulp = require('gulp');
var shell = require('gulp-shell');
var argv = require('yargs').argv;

var server = require('gulp-express');
 
gulp.task('default', function () {
  options = {
      env: process.env
  };
  options.env.NODE_ENV = 'development';
  options.env.DEBUG = '*';

  // Start the server at the beginning of the task 
  var livereload = true;
  server.run(['bin/www'], options, livereload);

  // Restart the server when file changes 
  var watchOptions = {
    interval: 500
  }
  gulp.watch(['template/**/*.html'], watchOptions, server.notify); 
  gulp.watch(['app.js', 'routes/**/*.js', 'modules/**/*.js'], watchOptions, [server.run]);
});

gulp.task('perf', function () {
  var url = argv.u || 'http://localhost:3000';
  var out = argv.o || 'perf/data/default.json';
  var cmd = 'mkdir -p perf && nperf -n 10 -c 1 -o json ' + url + ' | grep -A 8 -e "{ statuses" | sed \'s/\\([a-z_]*\\):/"\\1":/\' | sed "s/\'/\\"/g" | sed \'s/}$/},/\' >> ' + out;
  return gulp.src('').pipe(shell([cmd]));
});