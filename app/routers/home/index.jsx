import React from 'react';
import connectToStores from 'alt/utils/connectToStores';

// Material-UI Components
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVert from 'material-ui/lib/svg-icons/navigation/more-vert';

// Material-UI Properties
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';

import UIReactStore from '../../stores/uireact';
import UIReactActions from '../../actions/uireact';

/**
* UIReact Home component
*
* @author Alexandre Moraes | http://github.com/kalvinmoraes
* @license MIT | http://opensource.org/licenses/MIT
*/
@connectToStores
class UIReactHome extends React.Component {

    static childContextTypes = {
        muiTheme: React.PropTypes.object
    }

    /**
     * Class constructor
     */
    constructor(props) {
        // Get props from extended class
        super(props);

        /**
         * React Components using ES6 classes no longer autobind `this` to
         * non React methods so we need to bind for ourselves
         *
         * Ref:
         * https://github.com/goatslacker/alt/issues/283#issuecomment-107463147
         */
         this.onChange = this.onChange.bind(this);
         this.handleTouchTap = this.handleTouchTap.bind(this);
         this.triggerLeftNav = this.triggerLeftNav.bind(this);

         this.setState({
             muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
         });
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

    /**
     * When component will mount. Set MuiTheme.
     */
    componentWillMount() {
        let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
            accent1Color: Colors.lightGreen500
        });

        this.setState({muiTheme: newMuiTheme});
    }

    /**
     * When component mount. Start listen to UIReact Store
     */
    componentDidMount() {
        UIReactStore.listen(this.onChange);
    }

    /**
     * When component unmount. Stop listen to UIReact Store
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

    handleTouchTap() {
        if(!this.state.modal) {
            UIReactActions.preLoader(true);
            this.setState({requestCode: Math.random().toString(36).substring(5)});
            setTimeout(() => {
                UIReactActions.preLoader(false);
                this.setState({modal: true});
            }, 2000);
        } else {
            this.setState({modal: false});
        }
    }

    /**
     * Trigger the left nav
     */
    triggerLeftNav(e) {
        e.preventDefault()
        this.state.leftNav.toggle();
    }

    /**
     * Component Render
     */
    render() {

        let standardActions = [
            {
                text: 'Ok',
                onTouchTap: this.handleTouchTap
            }
        ];

        let containerStyle = {
            textAlign: 'center',
            marginTop: '50px'
        };

        return (
            <div className="app-screen home-app-wrapper">

                <AppBar
                    title="Home"
                    onLeftIconButtonTouchTap={this.triggerLeftNav}
                    />

                <div style={containerStyle}>

                    <h1>React-UI</h1>
                    <h2>A boilerplate using</h2>
                    <h2>ReactJS, Alt Flux, Stylus, Jade and Material-UI</h2>
                    <h3>ES6/ES7 Ready</h3>

                    <Dialog
                        open={this.state.modal}
                        title={"Request #" + (this.state.requestCode ? this.state.requestCode : '#0')}
                        actions={standardActions}
                        ref="requestDialog">
                        This was triggered trough an onTouchTap action
                    </Dialog>

                    <RaisedButton label="Trigger Dialog" primary={true} onTouchTap={this.handleTouchTap} />

                </div>

            </div>
    )
    }

}

module.exports = UIReactHome;