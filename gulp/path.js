/**
 * Gulp paths
 *
 * @author Alexandre Moraes | http://github.com/kalvinmoraes
 * @license MIT | http://opensource.org/licenses/MIT
 */
var path = {};
/* Paths */
path = {
	src: './src/',
	dest: './www/',
	vendor: './node_modules/',
	test: './__tests__/',
	public: './src/public/*'
};

path.img = {
	src: path.src + 'img/**/*',
	vendor_src: [],
	vendor_dest: path.dest + 'css/',
	watch: path.src + 'img/**/*',
	dest: path.dest + 'img/'
};

path.react = {
	src: './app/app.jsx',
	watch: './app/**/*',
	dest: path.dest + 'js'
};

path.jade = {
	src: path.src + 'jade/*.jade',
	watch: path.src + 'jade/**/*',
	dest: path.dest
};

path.js = {
	vendors: []
};

path.css = {
	vendors: [
		// Font awesome
		path.vendor + 'font-awesome/css/font-awesome.min.css'
	],
	src: path.src + 'stylus/core.styl',
	watch: path.src + 'stylus/**/*.styl',
	dest: path.dest + 'css'
};

path.fonts = {
	vendors: [
		path.vendor + 'font-awesome/fonts/*',
	],
	dest: path.dest + 'fonts'
}
/* End of Paths */

module.exports = path;
