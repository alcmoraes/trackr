var bundles = require('../bundles.js'),
source = require('vinyl-source-stream'), // TODO: Check what is this
merge2 = require('merge2'), // Merge Gulp Stream Sources
concat = require('gulp-concat'), // Concatenate files
header = require('gulp-header'), // Add headers to files
buffer = require('vinyl-buffer'), // TODO: Check what is this
sourcemaps = require('gulp-sourcemaps'), // Create source maps for JS/CSS
uglify = require('gulp-uglify'), // Uglify/Minify JS files
rename = require('gulp-rename'), // Rename files
_ = require('lodash'),
path = require('../path.js');

/**
 * Gulp tasks for javascript
 *
 * @author Alexandre Moraes | http://github.com/kalvinmoraes
 * @license MIT | http://opensource.org/licenses/MIT
 */
module.exports = function(gulp) {

    gulp.task('js', function() {
    	return merge2(
    		gulp.src(path.js.vendors)
    		.pipe(concat('vendors.js'))
    		.pipe(header('/* Vendors JS */\n')),
    		bundles.reactBundleWatchify.bundle()
    		.pipe(source('react.js'))
    		.pipe(buffer())
    		.pipe(header('/* React JS */\n'))
    	)
    	.pipe(concat('application.js'))
    	.pipe(header('/* <%= new Date() %> */\n'))
    	.pipe(sourcemaps.init({loadMaps: true}))
    	.pipe(sourcemaps.write('./'))
    	.pipe(gulp.dest(path.react.dest));
    });

    gulp.task('js-minify', function(){
    	return gulp.src(path.react.dest + '/application.js')
    	.pipe(uglify())
    	.pipe(rename('application.min.js'))
    	.pipe(header('/* <%= new Date() %> */\n'))
    	.pipe(sourcemaps.init({loadMaps: true}))
    	.pipe(sourcemaps.write('./'))
    	.pipe(gulp.dest(path.react.dest));
    });

};
