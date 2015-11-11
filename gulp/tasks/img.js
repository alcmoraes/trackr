var imagemin = require('gulp-imagemin'), // Minify Images
path = require('../path.js');

/**
 * Gulp tasks for images
 *
 * @author Alexandre Moraes | http://github.com/kalvinmoraes
 * @license MIT | http://opensource.org/licenses/MIT
 */
module.exports = function(gulp) {
    gulp.task('img', function () {
    	return gulp.src(path.img.src, {base: './src/img'})
    	.pipe(imagemin({optimizationLevel: 5}))
    	.pipe(gulp.dest(path.img.dest));
    });

    gulp.task('vendor-img', function () {
    	return gulp.src(path.img.vendor_src)
    	.pipe(imagemin({optimizationLevel: 5}))
    	.pipe(gulp.dest(path.img.vendor_dest));
    });
}
