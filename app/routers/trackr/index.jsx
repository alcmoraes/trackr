import React from 'react';
import _ from 'lodash';
// Alt Annotation
import connectToStores from 'alt/utils/connectToStores';
// Material-UI Components
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
// Material-UI Components
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVert from 'material-ui/lib/svg-icons/navigation/more-vert';
import NavigationBack from 'material-ui/lib/svg-icons/navigation/arrow-back'
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import Avatar from 'material-ui/lib/avatar';
// Material-UI Properties
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
// Stores
import TrackrStore from '../../stores/trackr';
import UIReactStore from '../../stores/uireact';
// Actions
import TrackrActions from '../../actions/trackr';
import UIReactActions from '../../actions/uireact';

/**
* Trackr Example using Alt Flux component
*
* @author Alexandre Moraes | http://github.com/kalvinmoraes
* @license MIT | http://opensource.org/licenses/MIT
*/
@ThemeDecorator(ThemeManager.getMuiTheme(LightRawTheme))
@connectToStores
class TrackrHome extends React.Component {

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
         * non React methods
         *
         * Ref:
         * https://github.com/goatslacker/alt/issues/283#issuecomment-107463147
         */
         this.onChange = this.onChange.bind(this);
         this.historyBack = this.historyBack.bind(this);
         this.refresh = this.refresh.bind(this);

         // Set the initial state for the component
         this.state = {
             trackrData: []
         };
    }

    /**
     * Stores used by this component
     */
    static getStores() {
        return [TrackrStore, UIReactStore]
    }

    /**
     * Used by Alt Flux to get properties from store
     */
    static getPropsFromStores() {
        return {
            ...TrackrStore.getState(),
            ...UIReactStore.getState()
        }
    }

    /**
     * When component mount. Start listen to Trackr and UIReact Store.
     */
    componentDidMount() {
        TrackrStore.listen(this.onChange);
        UIReactStore.listen(this.onChange);
        this.refresh();
    }

    /**
     * When component unmount. Stop listen to Trackr and UIReact Store
     */
    componentWillUnmount() {
        TrackrStore.unlisten(this.onChange);
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
     * Go back in navigation history
     */
    historyBack(e) {
        e.preventDefault();
        this.props.history.pushState(null, '/');
    }

    /**
     * Go to a specific link
     *
     * @param  {String} link URL to go to
     */
    goLink(link) {
        window.location = link;
    }

    refresh() {
        TrackrActions.fetch(this.props.params.code);
    }

    /**
     * Component Render
     */
    render() {

        let containerStyle = {
            textAlign: 'left'
        };

        return (
            <div className="app-screen trackr-app-wrapper">

                <AppBar
                    className="app-bar"
                    title={this.props.params.code}
                    iconElementLeft={<IconButton><NavigationBack onTouchTap={this.historyBack}/></IconButton>}
                    iconElementRight={
                        <IconMenu iconButtonElement={
                          <IconButton><MoreVert /></IconButton>
                        }>
                          <MenuItem onTouchTap={this.refresh} primaryText="Atualizar" />
                        </IconMenu>
                    } />

                <div style={containerStyle}>
                    {
                        this.state.trackrData.map(item =>
                            <Card key={(Math.ceil(Math.random() * 100))}>
                                <CardHeader
                                    title={item.data}
                                    subtitle={_.capitalize(item.local)}
                                    avatar={<Avatar>{item.acao.charAt(0).toUpperCase()}</Avatar>}
                                    actAsExpander={true}
                                    showExpandableButton={true}>
                                </CardHeader>
                                <CardText expandable={true}>
                                    <h2>{_.capitalize(item.acao)}</h2>
                                    <h3>{_.capitalize(item.detalhes)}</h3>
                                </CardText>
                            </Card>
                        )
                    }
                </div>

            </div>
        )
    }

}

module.exports = TrackrHome;
