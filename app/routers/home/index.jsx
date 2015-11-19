import React from 'react';
// Alt Annotation
import connectToStores from 'alt/utils/connectToStores';
// Material-UI Components
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVert from 'material-ui/lib/svg-icons/navigation/more-vert';
import TextField from 'material-ui/lib/text-field';
// Material-UI Properties
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
// Stores
import UIReactStore from '../../stores/uireact';
// Actions
import UIReactActions from '../../actions/uireact';

/**
* UIReact Home component
*
* @author Alexandre Moraes | http://github.com/kalvinmoraes
* @license MIT | http://opensource.org/licenses/MIT
*/
@ThemeDecorator(ThemeManager.getMuiTheme(LightRawTheme))
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

    }

    /**
     * Stores used by this component
     */
    static getStores() {
        return [UIReactStore];
    }

    /**
     * Used by Alt Flux to get properties from store
     */
    static getPropsFromStores() {
        return UIReactStore.getState();
    }

    /**
     * When component mount. Start listen to UIReact Store
     */
    componentDidMount() {
        UIReactStore.listen(this.onChange);
        this.setState(UIReactStore.getState());
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

    /**
     * Action for the button clicked on component.
     *
     * This is a dummy method. It would simulate a request and a dialog
     * opening.
     */
    handleTouchTap(e) {
        e.preventDefault();
        this.props.history.pushState(null, '/'+this.refs.code.getValue());
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
                    className="app-bar"
                    title=""
                    onLeftIconButtonTouchTap={this.triggerLeftNav}
                    />

                <div style={containerStyle}>

                    <h1>Trackr</h1>
                    <h2>Rastreio de encomendas</h2>

                    <div>
                        <TextField
                            ref="code"
                            hintText="DM671114492BR" />
                    </div>

                    <RaisedButton label="Rastrear" primary={true} onTouchTap={this.handleTouchTap} />

                </div>

            </div>
    )
    }

}

module.exports = UIReactHome;
