var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('perf', shell.task([
  'mkdir -p perf && nperf -n 10 -c 1 -o json http://localhost:3000 | grep -A 8 -e "{ statuses" | sed \'s/\\([a-z_]*\\):/"\\1":/\' | sed "s/\'/\\"/g" | sed \'s/}$/},/\' >> perf/data.json'
]));