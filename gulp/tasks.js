/**
 * Gulp tasks
 *
 * @author Alexandre Moraes | http://github.com/kalvinmoraes
 * @license MIT | http://opensource.org/licenses/MIT
 */
module.exports = function(gulp) {

    require('./tasks/browsersync.js')(gulp);
    require('./tasks/img.js')(gulp);
    require('./tasks/jade.js')(gulp);
    require('./tasks/javascript.js')(gulp);
    require('./tasks/stylesheet.js')(gulp);
    require('./tasks/commons.js')(gulp);

};
