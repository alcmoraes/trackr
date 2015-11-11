var path = require('../path.js');

/**
 * Gulp for common tasks
 *
 * @author Alexandre Moraes | http://github.com/kalvinmoraes
 * @license MIT | http://opensource.org/licenses/MIT
 */
module.exports = function(gulp) {
    gulp.task('fonts', function(){
    	return gulp.src(path.fonts.vendors)
    	.pipe(gulp.dest(path.fonts.dest));
    });

    gulp.task('public-assets', function(){
    	return gulp.src(path.public)
    	.pipe(gulp.dest(path.dest));
    });
}
