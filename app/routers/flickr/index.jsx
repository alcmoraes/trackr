import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import {Link} from 'react-router';

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
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
// Material-UI Properties
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';

import FlickrStore from '../../stores/flickr';
import FlickrActions from '../../actions/flickr';

import UIReactStore from '../../stores/uireact';
import UIReactActions from '../../actions/uireact';

/**
* Flickr Example using Alt Flux component
*
* @author Alexandre Moraes | http://github.com/kalvinmoraes
* @license MIT | http://opensource.org/licenses/MIT
*/
@connectToStores
class FlickrHome extends React.Component {

    static childContextTypes = {
        muiTheme: React.PropTypes.object
    }

    /**
     * Class importructor
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
         this.refreshFlickr = this.refreshFlickr.bind(this);

         this.state = {
             flickrImages: {
                 items: []
             },
             muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
         }
    }

    /**
     * Stores used by this component
     */
    static getStores() {
        return [FlickrStore, UIReactStore]
    }

    /**
     * Used by Alt Flux to get properties from store
     */
    static getPropsFromStores() {
        return {
            ...FlickrStore.getState(),
            ...UIReactStore.getState()
        }
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
     * When component mount. Start listen to Flickr Store and fetch data from it.
     */
    componentDidMount() {
        FlickrStore.listen(this.onChange);
        UIReactStore.listen(this.onChange);
        UIReactActions.preLoader(true);
        FlickrActions.fetch();
    }

    /**
     * When component unmount. Stop listen to Flickr Store
     */
    componentWillUnmount() {
        FlickrStore.unlisten(this.onChange);
        UIReactStore.unlisten(this.onChange);
    }

    /**
     * Triggers when store changes.
     * Automatically set state
     */
    onChange(state) {
        this.setState(state);
    }

    historyBack(e) {
        e.preventDefault();
        this.props.history.goBack();
    }

    goLink(link) {
        window.location = link;
    }

    refreshFlickr() {
        FlickrActions.fetch();
    }

    /**
     * Component Render
     */
    render() {

        let containerStyle = {
            textAlign: 'center',
            marginTop: '5px'
        };

        return (
            <div className="app-screen flickr-app-wrapper">

                <AppBar
                    title="Flickr Example"
                    iconElementLeft={<IconButton><NavigationBack onTouchTap={this.historyBack}/></IconButton>}
                    iconElementRight={
                        <IconMenu iconButtonElement={
                          <IconButton><MoreVert /></IconButton>
                        }>
                          <MenuItem onTouchTap={this.refreshFlickr} primaryText="Refresh" />
                        </IconMenu>
                    } />

                <div style={containerStyle}>
                    <GridList cols={2}>
                    {
                        this.state.flickrImages.items.map(item =>
                            <GridTile key={(item.author_id + Math.ceil(Math.random() * 100))} onTouchTap={this.goLink.bind(this, item.link)} cols={1}>
                                <img src={item.media.m}/>
                            </GridTile>
                        )
                    }
                    </GridList>
                </div>

            </div>
        )
    }

}

module.exports = FlickrHome;
