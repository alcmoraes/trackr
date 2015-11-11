var merge2 = require('merge2'), // Merge Gulp Stream Sources
concat = require('gulp-concat'), // Concatenate files
header = require('gulp-header'), // Add headers to files
nib = require('nib'), // Helpers for Stylus
stylus = require('gulp-stylus'), // Stylus CSS Pre Processor
sourcemaps = require('gulp-sourcemaps'), // Create source maps for JS/CSS
rename = require('gulp-rename'), // Rename files
map = require('vinyl-map'), // Rename files
path = require('../path.js');

/**
 * Gulp tasks for stylesheets
 *
 * @author Alexandre Moraes | http://github.com/kalvinmoraes
 * @license MIT | http://opensource.org/licenses/MIT
 */
module.exports = function(gulp) {

    gulp.task('css', function () {
    	return merge2(
    		gulp.src(path.css.vendors)
    		.pipe(header('/* Vendors Stylesheet */\n')),
    		gulp.src(path.css.src)
    		.pipe(stylus({use: nib(),compress: true}))
    		.pipe(header('/* Application Stylesheet */\n'))
    	)
    	.pipe(concat('application.css'))
    	.pipe(header('/* <%= new Date() %> */\n'))
    	.pipe(gulp.dest(path.css.dest));
    });

    gulp.task('css-minify', function(){
    	return gulp.src(path.css.dest + '/application.css')
    	.pipe(rename('application.min.css'))
    	.pipe(header('/* <%= new Date() %> */\n'))
    	.pipe(sourcemaps.init({loadMaps: true}))
    	.pipe(sourcemaps.write('./'))
    	.pipe(gulp.dest(path.css.dest));
    });
}
