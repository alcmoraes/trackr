import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route, Redirect, IndexRoute} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import UIReactLayout from './routers/layout';
import UIReactHome from './routers/home/index';
import NotFound from './components/not-found';

injectTapEventPlugin();

/**
* UIReact/App.
*
* React app
*/
if(document.getElementById('uireact-app')) {

    ReactDOM.render((
        <Router createElement={createElement}>
            <Route path="/" component={UIReactLayout}>
                <IndexRoute component={UIReactHome} />
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
