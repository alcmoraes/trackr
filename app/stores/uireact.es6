import Alt from '../components/alt';
import Q from 'q'; // Promise Library
import _ from 'lodash';

import UIReactActions from '../actions/uireact';

/**
* UIReact\Store
*
* @author Alexandre Moraes | http://github.com/kalvinmoraes
* @license MIT | http://opensource.org/licenses/MIT
*/

class UIReactStore {
    constructor() {

        this.bindListeners({
            onPreLoader: UIReactActions.PRE_LOADER,
            onSetLeftNav: UIReactActions.SET_LEFT_NAV
        });

    }

    onPreLoader(show) {
        this.setState({'preLoader': show});
    }

    onSetLeftNav(leftNav) {
        this.setState({'leftNav': leftNav});
    }

}

module.exports = Alt.createStore(UIReactStore, 'UIReactStore');
