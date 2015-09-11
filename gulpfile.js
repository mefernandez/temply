var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('perf', shell.task([
  'mkdir -p perf && nperf -n 10 -c 1 -o json http://localhost:3000 | grep -A 8 -e "{ statuses" >> perf/data.json'
]));