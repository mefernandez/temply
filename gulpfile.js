var gulp = require('gulp');
var shell = require('gulp-shell');
var argv = require('yargs').argv;

var server = require('gulp-express');
 
gulp.task('default', function () {
    // Start the server at the beginning of the task 
    server.run(['bin/www']);
 
    // Restart the server when file changes 
    gulp.watch(['template/**/*.html'], server.notify); 
    gulp.watch(['app.js', 'routes/**/*.js', 'modules/**/*.js'], [server.run]);
});

gulp.task('perf', function () {
	var url = argv.u || 'http://localhost:3000';
	var out = argv.o || 'perf/data/default.json';
	var cmd = 'mkdir -p perf && nperf -n 10 -c 1 -o json ' + url + ' | grep -A 8 -e "{ statuses" | sed \'s/\\([a-z_]*\\):/"\\1":/\' | sed "s/\'/\\"/g" | sed \'s/}$/},/\' >> ' + out;
	return gulp.src('').pipe(shell([cmd]));
});