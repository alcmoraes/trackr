import React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';

/**
* Preloader Component
*
* @author Alexandre Moraes | http://github.com/kalvinmoraes
* @license MIT | http://opensource.org/licenses/MIT
*/
class CircularProgressComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="circular-progress-wrapper" style={{display: this.props.active ? 'block' : 'none'}} layout="row" layoutSm="column" layoutAlign="space-around">
                <CircularProgress mode="indeterminate" />
            </div>
        )
    }

}

CircularProgressComponent.propTypes = {
    active: React.PropTypes.bool
};

module.exports = CircularProgressComponent;
