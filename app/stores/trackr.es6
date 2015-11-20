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
        return Q.Promise((resolve, reject) => {
            let request = new XMLHttpRequest();

            let url = this.package_track_url({code: code});

            const PARSE_ERROR = "Código de rastreamento inválido.";
            const STATUS_ERROR = "A API dos correios parece estar temporariamente indisponível.";
            const XML_ERROR = "Código de rastreamento inválido ou serviço temporariamente indisponível.";

            request.open("GET", url, true);

            request.onload = () => {
                if (request.status === 200) {
                    let output = false;
                    try {
                        output = JSON.parse(request.responseText);
                        resolve(output);
                    } catch(err) {
                        reject(new Error(PARSE_ERROR));
                    }
                } else {
                    reject(new Error(STATUS_ERROR));
                }
            };

            request.onerror = () => {
                reject(new Error(XML_ERROR));
            };

            request.send();
        });
    }

    /**
     * Fetch data from Correios API
     */
    onFetch(code) {
        this.setState({
            'message': false,
            'preLoader': true,
            'code': 'Carregando...'
        });
        this._track(code)
        .then((data) => {
            this.setState({
                'trackrData': data.reverse(),
                'message': false
            });
        })
        .catch((err) => {
            this.setState({
                'trackrData': [],
                'message': err.message
            });
        }).finally(() => {
            this.setState({
                'code': code,
                'preLoader': false
            });
        });
    }

}

module.exports = Alt.createStore(TrackrStore, 'TrackrStore');
