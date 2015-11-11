/**
 * Gulp
 *
 * @author Alexandre Moraes | http://github.com/kalvinmoraes
 * @license MIT | http://opensource.org/licenses/MIT
 */
var
gulp = require('gulp'), // Gulp
sequence = require('gulp-sequence'), // Chain multiple gulk tasks
path = require('./gulp/path');

require('./gulp/tasks.js')(gulp)

/* Tasks Sequences */
gulp.task('bundle', sequence('js', 'css'));
gulp.task('proc', sequence('img', 'vendor-img', 'jade', 'bundle'));
gulp.task('default', sequence('proc', 'public-assets', 'fonts'));
gulp.task('minify', sequence('js-minify', 'css-minify'));
/* End of Tasks */
