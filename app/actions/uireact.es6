import Alt from '../components/alt';

/**
 * UIReact actions
 *
 * Contains common actions for the app
 *
 * @author Alexandre Moraes | http://github.com/kalvinmoraes
 * @license MIT | http://opensource.org/licenses/MIT
 */
class UIReactActions {
    /**
     * Activate the PreLoader (the progress circle)
     *
     * @param  {Boolean} active True/False to activate the Pre Loader
     */
    preLoader(active) {
        this.dispatch(active);
    }
    /**
     * Used to spread the LeftNav component trough other components.
     *
     * @param {MaterialUI\Lib\LeftNav} leftNav LeftNav reference
     */
    setLeftNav(leftNav) {
        this.dispatch(leftNav);
    }
}

module.exports = Alt.createActions(UIReactActions);
