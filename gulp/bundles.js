var reactify = require('reactify'), // Write React as JSX
browserify = require('browserify'), // Module loaders for JS
babelify = require('babelify'), // Babel for ES6

path = require('./path');

/**
 * Gulp browserify bundles
 *
 * @author Alexandre Moraes | http://github.com/kalvinmoraes
 * @license MIT | http://opensource.org/licenses/MIT
 */

/* React Browserify Area */
exports.reactBundleWatchify = browserify({
	entries: [path.react.src],
	transform: [babelify.configure({
		optional: ['es7.decorators', 'es7.classProperties']
	}), reactify],
	extensions: ['.jsx', '.js', '.es6']
});
/* End of React Browserify Area */
