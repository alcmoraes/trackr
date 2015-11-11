import Alt from '../components/alt';
import Q from 'q'; // Promise Library
import _ from 'lodash';

import UIReactActions from '../actions/uireact';

/**
* Install\uireact\Store
*
* @author Alexandre Moraes | http://github.com/kalvinmoraes
* @license MIT | http://opensource.org/licenses/MIT
*/

class UIReactStore {
    constructor() {

        this.bindListeners({
            onPreloader: UIReactActions.PRE_LOADER,
        });

    }

    onPreloader(show) {
        this.preLoader = show;
    }

}

module.exports = Alt.createStore(UIReactStore, 'UIReactStore');
