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
import NavigationBack from 'material-ui/lib/svg-icons/navigation/arrow-back'
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border'
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
class TrackrMyPackages extends React.Component {

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

         // Set the initial state for the component
         this.state = {
             myTrackrData: []
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
        this.setState(UIReactStore.getState());
        this.setState(TrackrStore.getState());
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

    trackPackage(item) {
        this.props.history.pushState(null, '/track/'+item.code);
    }

    /**
     * Component Render
     */
    render() {

        let containerStyle = {
            textAlign: 'center'
        };

        let cardStyle = {
            position: 'absolute',
            backgroundSize: 'cover',
            width: '100%',
            backgroundImage: 'url("http://placehold.it/150x150")',
            height: '100%',
            backgroundPosition: 'center center'
        };

        return (
            <div className="app-screen my-trackrs-app-wrapper">

                <AppBar
                    className="app-bar"
                    title="Minhas encomendas"
                    iconElementLeft={
                        <IconButton>
                            <NavigationBack onClick={UIReactActions.goBack} onTouchTap={UIReactActions.goBack}/>
                        </IconButton>} />

                <div style={containerStyle}>
                    <GridList
                        key={(Math.ceil(Math.random() * 9999))}
                        cellHeight={200}>
                            {
                                this.state.myTrackrData.map(item =>
                                    <GridTile
                                        key={(Math.ceil(Math.random() * 9999))}
                                        title={item.name}
                                        subtitle={item.code}
                                        actionIcon={
                                            <IconButton>
                                                <StarBorder onTouchTap={TrackrActions.toggleItem.bind(this, item)} color="yellow"/>
                                            </IconButton>
                                        }>
                                        <div onTouchTap={this.trackPackage.bind(this, item)} style={cardStyle}></div>
                                    </GridTile>
                                )
                            }
                    </GridList>
                </div>
            </div>
        )
    }

}

module.exports = TrackrMyPackages;
