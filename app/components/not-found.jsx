import React from 'react';
import Router from 'react-router';

/**
* Simple Not Found Page
*
* @author Alexandre Moraes | http://github.com/kalvinmoraes
* @license MIT | http://opensource.org/licenses/MIT
*/
const NotFoundComponent = React.createClass({

    render() {


        let containerStyle = {
            textAlign: 'center'
        };

        return (
            <div className="app-screen" style={containerStyle}>
                <h2>Not found!</h2>
            </div>
        )
    }

});

module.exports = NotFoundComponent;
