import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import History from 'history';
import _ from 'lodash';

// Material-UI components
import LeftNav from 'material-ui/lib/left-nav';
import Avatar from 'material-ui/lib/avatar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVert from 'material-ui/lib/svg-icons/navigation/more-vert';

// Material-UI Properties
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import AppBar from 'material-ui/lib/app-bar';

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
          { route: 'get-started', text: 'Get Started' },
          { route: 'customization', text: 'Customization' },
          { route: 'components', text: 'Components' },
          { type: 'SUBHEADER', text: 'Resources' },
          {
             type: 'LINK',
             payload: 'https://github.com/kalvinmoraes/react-ui',
             text: 'GitHub'
          },
          {
             text: 'Disabled',
             disabled: true
          },
          {
             type: 'LINK',
             payload: 'https://www.google.com',
             text: 'Disabled Link',
             disabled: true
          },
        ];

        /**
         * React Components using ES6 classes no longer autobind `this` to
         * non React methods
         *
         * Ref:
         * https://github.com/goatslacker/alt/issues/283#issuecomment-107463147
         */
         this.onChange = this.onChange.bind(this);
         this.toggleLeftNav = this.toggleLeftNav.bind(this);

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
    }

    /**
     * When component unmount. Stop listen to uireact Store
     */
    componentWillUnmount() {
        UIReactStore.unlisten(this.onChange);
    }

    toggleLeftNav(e) {
        e.preventDefault();
        this.refs.leftNav.toggle();
    }

    /**
     * Triggers when store changes.
     * Automatically set state
     */
    onChange(state) {
        this.setState(state);
    }

    /**
     * Component Render
     */
    render() {

        let appWrapperStyle = {
            maxWidth: '1280px',
            margin: '0 auto'
        }

        return (
            <div className="wrapper">
                <LeftNav ref="leftNav" docked={false} menuItems={this.menuItems} />
                <CircularProgressComponent active={this.state.preLoader} />
                <div className="appWrapper" style={appWrapperStyle}>

                    <AppBar
                        title="React-UI"
                        onLeftIconButtonTouchTap={this.toggleLeftNav}
                        iconElementRight={
                            <IconMenu iconButtonElement={
                              <IconButton><MoreVert /></IconButton>
                            }>
                              <MenuItem primaryText="Refresh" />
                              <MenuItem primaryText="Help" />
                              <MenuItem primaryText="Sign out" />
                            </IconMenu>
                        }
                        />

                    {this.props.children}

                </div>
            </div>
        )
    }
}

module.exports = UIReactLayout;
