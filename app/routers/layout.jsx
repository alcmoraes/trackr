import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import History from 'history';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// Material-UI components
import LeftNav from 'material-ui/lib/left-nav';

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVert from 'material-ui/lib/svg-icons/navigation/more-vert';

// Material-UI Properties
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';

// Common components
import CircularProgressComponent from '../components/circular-progress';
import UIReactStore from '../stores/uireact';
import UIReactActions from '../actions/uireact';

/**
* React-UI layout
*
* @author Alexandre Moraes | http://github.com/kalvinmoraes
* @license MIT | http://opensource.org/licenses/MIT
*/
@connectToStores
class UIReactLayout extends React.Component {

    static childContextTypes = {
        muiTheme: React.PropTypes.object
    }

    /**
     * Class constructor
     */
    constructor(props) {
        // Get props from extended class
        super(props);

        this.menuItems = [
          { route: '/', text: 'Home' },
          { route: '/flickr', text: 'Flickr Example' },
          { type: 'SUBHEADER', text: 'Resources' },
          {
             type: 'LINK',
             payload: 'https://github.com/kalvinmoraes/react-ui',
             text: 'GitHub'
          }
        ];

        /**
         * React Components using ES6 classes no longer autobind `this` to
         * non React methods
         *
         * Ref:
         * https://github.com/goatslacker/alt/issues/283#issuecomment-107463147
         */
         this.onChange = this.onChange.bind(this);
         this.onLeftNavChange = this.onLeftNavChange.bind(this);

        // Here we use the same state from uireact Store but this isn't
        // necessary
        this.state = {
            preLoader: false,
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
        }
    }

    /**
     * Stores used by this component
     */
    static getStores() {
        return [UIReactStore]
    }

    /**
     * Used by Alt Flux to get properties from store
     */
    static getPropsFromStores() {
        return UIReactStore.getState();
    }

    getChildContext() {
        return {
            muiTheme: this.state.muiTheme,
        };
    }

    componentWillMount() {
        let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
            accent1Color: Colors.lightGreen500
        });

        this.setState({muiTheme: newMuiTheme});
    }

    /**
     * When component mount. Start listen to uireact Store
     */
    componentDidMount() {
        UIReactStore.listen(this.onChange);

        // Send left nav to every component, allowing to trigger it
        // from everywhere
        UIReactActions.setLeftNav(this.refs.leftNav);
    }

    /**
     * When component unmount. Stop listen to uireact Store
     */
    componentWillUnmount() {
        UIReactStore.unlisten(this.onChange);
    }

    /**
     * Triggers when store changes.
     * Automatically set state
     */
    onChange(state) {
        this.setState(state);
    }

    onLeftNavChange(e, i, m) {
        this.refs.leftNav.toggle();
        this.props.history.pushState(null, m.route);
    }

    /**
     * Component Render
     */
    render() {

        let appsWrapperStyle = {
            maxWidth: '1280px',
            margin: '0 auto'
        }

        const { pathname } = this.props.location

        const key = pathname.split('/')[1] || 'root'

        return (
            <div className="wrapper">

                <LeftNav onChange={this.onLeftNavChange} ref="leftNav" docked={false} menuItems={this.menuItems} />
                <CircularProgressComponent active={this.state.preLoader} />

                <div className="apps-wrapper" style={appsWrapperStyle}>
                    <ReactCSSTransitionGroup
                      component="div" transitionName="swap"
                      transitionEnterTimeout={500} transitionLeaveTimeout={500}
                    >
                        {React.cloneElement(this.props.children || <div />, { key: key })}
                    </ReactCSSTransitionGroup>
                </div>

            </div>
        )
    }
}

module.exports = UIReactLayout;
