var browserSync = require('browser-sync').create(), // Browser Sync
path = require('../path');

/**
 * Gulp tasks for browser sync
 *
 * @author Alexandre Moraes | http://github.com/kalvinmoraes
 * @license MIT | http://opensource.org/licenses/MIT
 */
module.exports = function(gulp) {
    /* Browsersync */
    gulp.task('browser-sync', function () {
    	browserSync.init({
    		server: './www',
    		port: 4000
    	});
    });

    gulp.task('watch', ['browser-sync'], function () {
        gulp.watch([path.jade.watch], ['jade', browserSync.reload]);
    	gulp.watch([path.css.watch], ['css', browserSync.reload]);
    	gulp.watch([path.react.watch], ['js', browserSync.reload]);
    });
}
