import Alt from '../components/alt';

/**
 * Trackr actions
 *
 * Contains all actions for the Trackr
 *
 * @author Alexandre Moraes | http://github.com/kalvinmoraes
 * @license MIT | http://opensource.org/licenses/MIT
 */
class TrackrActions {
    /**
     * Fetch from trackr
     */
    fetch(code) {
        this.dispatch(code);
    }
}

module.exports = Alt.createActions(TrackrActions);
