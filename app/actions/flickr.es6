import Alt from '../components/alt';

/**
 * Flickr actions
 *
 * Contains all actions for the Flickr Example
 *
 * @author Alexandre Moraes | http://github.com/kalvinmoraes
 * @license MIT | http://opensource.org/licenses/MIT
 */
class FlickrActions {
    /**
     * Fetch images from flickr
     */
    fetch() {
        this.dispatch();
    }
}

module.exports = Alt.createActions(FlickrActions);
