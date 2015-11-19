import React from 'react';
// Alt Annotation
import connectToStores from 'alt/utils/connectToStores';
// Needed for transition trough routes
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
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
// Common components
import CircularProgressComponent from '../components/circular-progress';
// Stores
import UIReactStore from '../stores/uireact';
import TrackrStore from '../stores/trackr';
// Actions
import UIReactActions from '../actions/uireact';

/**
* React-UI layout component
*
* This component encapsulate all other routes.
*
* @author Alexandre Moraes | http://github.com/kalvinmoraes
* @license MIT | http://opensource.org/licenses/MIT
*/
@ThemeDecorator(ThemeManager.getMuiTheme(LightRawTheme))
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

        // The LeftNav menu.
        this.menuItems = [
          { route: '/', text: 'Home' },
          { type: 'SUBHEADER', text: 'Resources' },
          {
             type: 'LINK',
             payload: 'https://github.com/kalvinmoraes/trackr',
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

        // Set the initial state for the component
        this.state = {
            preLoader: false
        };
    }

    /**
     * Stores used by this component
     */
    static getStores() {
        return [UIReactStore, TrackrStore]
    }

    /**
     * Used by Alt Flux to get properties from store
     */
    static getPropsFromStores() {
        return {
            ...UIReactStore.getState(),
            ...TrackrStore.getState()
        }
    }

    /**
     * When component mount. Start listen to UIReact and Trackr Stores
     */
    componentDidMount() {
        UIReactStore.listen(this.onChange);
        TrackrStore.listen(this.onChange);

        // Send left nav to every component, allowing to trigger it
        // from everywhere
        UIReactActions.setLeftNav(this.refs.leftNav);
    }

    /**
     * When component unmount. Stop listen to UIReact and Trackr Stores
     */
    componentWillUnmount() {
        UIReactStore.unlisten(this.onChange);
        TrackrStore.unlisten(this.onChange);
    }

    /**
     * Triggers when store changes.
     * Automatically set state
     */
    onChange(state) {
        this.setState(state);
    }

    /**
     * When some item from Left Navigation was clicked (tapped)
     * trigger this method.
     */
    onLeftNavChange(e, i, m) {
        // We close the menu
        this.refs.leftNav.toggle();
        // And wait 200ms to send user to the selected link
        setTimeout(() => {
            this.props.history.pushState(null, m.route);
        }, 200);
    }

    /**
     * Component Render
     */
    render() {

        let appsWrapperStyle = {
            maxWidth: '1280px',
            margin: '0 auto'
        }

        return (
            <div className="wrapper">

                <LeftNav onChange={this.onLeftNavChange} ref="leftNav" docked={false} menuItems={this.menuItems} />
                <CircularProgressComponent active={this.state.preLoader} />

                <div className="apps-wrapper" style={appsWrapperStyle}>
                    <ReactCSSTransitionGroup
                      component="div" transitionName="swap"
                      transitionEnterTimeout={500} transitionLeaveTimeout={500}
                    >
                        {this.props.children}
                    </ReactCSSTransitionGroup>
                </div>

            </div>
        )
    }
}

module.exports = UIReactLayout;
