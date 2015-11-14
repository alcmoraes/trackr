import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route, Redirect, IndexRoute} from 'react-router';
// Used by Material-UI
import injectTapEventPlugin from 'react-tap-event-plugin';

// The CreateHashHistory allow us to navigate trough # paths
import createHashHistory from 'history/lib/createHashHistory';

// Routers
import UIReactLayout from './routers/layout';
import UIReactHome from './routers/home/index';
import FlickrHome from './routers/flickr/index';
import NotFound from './components/not-found';

// Here we inject the 'onTouchTap' event on React Components
injectTapEventPlugin();

/**
* UIReact/App.
*
* React app
*
* @author Alexandre Moraes | http://github.com/kalvinmoraes
* @license MIT | http://opensource.org/licenses/MIT
*/
if(document.getElementById('uireact-app')) {

    ReactDOM.render((
        <Router history={createHashHistory()} createElement={createElement}>
            <Route path="/" component={UIReactLayout}>
                <IndexRoute component={UIReactHome} />
                <Route path="/flickr" component={FlickrHome} />
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    ), document.getElementById('uireact-app'));

}

/**
* Callback for each created element from Router
*/
function createElement(Component, props) {
    // Here we're going to any props to children routes
    return <Component {...props} />
}
