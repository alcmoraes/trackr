import React from 'react';
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
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
// Material-UI Properties
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
// Stores
import FlickrStore from '../../stores/flickr';
import UIReactStore from '../../stores/uireact';
// Actions
import FlickrActions from '../../actions/flickr';
import UIReactActions from '../../actions/uireact';

/**
* Flickr Example using Alt Flux component
*
* @author Alexandre Moraes | http://github.com/kalvinmoraes
* @license MIT | http://opensource.org/licenses/MIT
*/
@ThemeDecorator(ThemeManager.getMuiTheme(LightRawTheme))
@connectToStores
class FlickrHome extends React.Component {

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

         // Set the initial state for the component
         this.state = {
             flickrImages: {
                 items: []
             }
         };
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

    /**
     * When component mount. Start listen to Flickr and UIReact Store.
     */
    componentDidMount() {
        FlickrStore.listen(this.onChange);
        UIReactStore.listen(this.onChange);
        UIReactActions.preLoader(true);
        FlickrActions.fetch();
    }

    /**
     * When component unmount. Stop listen to Flickr and UIReact Store
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
                    className="app-bar"
                    title="Flickr Example"
                    iconElementLeft={<IconButton><NavigationBack onTouchTap={this.historyBack}/></IconButton>}
                    iconElementRight={
                        <IconMenu iconButtonElement={
                          <IconButton><MoreVert /></IconButton>
                        }>
                          <MenuItem onTouchTap={FlickrActions.fetch} primaryText="Refresh" />
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
