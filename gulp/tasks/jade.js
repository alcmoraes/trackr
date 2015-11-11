var jade = require('gulp-jade'),
path = require('../path.js');

/**
 * Gulp tasks for jade templates
 *
 * @author Alexandre Moraes | http://github.com/kalvinmoraes
 * @license MIT | http://opensource.org/licenses/MIT
 */
module.exports = function(gulp) {
    gulp.task('jade', function () {
    	return gulp.src(path.jade.src)
    	.pipe(jade({pretty: true}))
    	.pipe(gulp.dest(path.jade.dest));
    });
}
