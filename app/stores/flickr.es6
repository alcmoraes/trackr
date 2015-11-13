import Alt from '../components/alt';
import Q from 'q'; // Promise Library
import _ from 'lodash';

import FlickrActions from '../actions/flickr';

/**
* UIReact\Flickr\Store
*
* @author Alexandre Moraes | http://github.com/kalvinmoraes
* @license MIT | http://opensource.org/licenses/MIT
*/
class FlickrStore {
    constructor() {
        this.bindListeners({
            onFetch: FlickrActions.FETCH,
        });
    }

    jsonp(url, callbackName) {
        return Q.Promise((resolve, reject, notify) => {

            window[callbackName] = (data) => {
                delete window[callbackName];
                document.body.removeChild(script);
                resolve(data);
            }

            let script = document.createElement('script');
            script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
            document.body.appendChild(script);
        });
    }

    onFetch() {
        this.jsonp('https://api.flickr.com/services/feeds/photos_public.gne?format=json', 'jsonFlickrFeed')
        .then((data) => {
            this.setState({'flickrImages': data, 'preLoader': false});
        });
    }

}

module.exports = Alt.createStore(FlickrStore, 'FlickrStore');
