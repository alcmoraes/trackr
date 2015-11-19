import Alt from '../components/alt';
import Q from 'q'; // Promise Library
import _ from 'lodash';

import TrackrActions from '../actions/trackr';

/**
* UIReact\Trackr\Store
*
* @author Alexandre Moraes | http://github.com/kalvinmoraes
* @license MIT | http://opensource.org/licenses/MIT
*/
class TrackrStore {
    constructor() {
        this.bindListeners({
            onFetch: TrackrActions.FETCH,
        });

        this.package_track_url = _.template('http://developers.agenciaideias.com.br/correios/rastreamento/json/<%= code %>');
    }


    /**
     * Do a promised request to Correios API
     *
     * @param  {String} code         Code to track
     * @return {Q\Promise}
     */
    _track(code) {
        return Q.Promise((resolve, reject, notify) => {
            let request = new XMLHttpRequest();

            let url = this.package_track_url({code: code});

            request.open("GET", url, true);
            request.onload = () => {
                if (request.status === 200) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject(new Error("Status code was " + request.status));
                }
            };
            request.onerror = () => {
                reject(new Error("Can't XHR " + JSON.stringify(url)));
            };
            request.onprogress = (event) => {
                notify(event.loaded / event.total);
            };
            request.send();
        });
    }

    /**
     * Fetch data from Correios API
     */
    onFetch(code) {
        this.setState({'preLoader': true});
        this._track(code)
        .then((data) => {
            this.setState({'trackrData': data.reverse(), 'preLoader': false});
        });
    }

}

module.exports = Alt.createStore(TrackrStore, 'TrackrStore');
