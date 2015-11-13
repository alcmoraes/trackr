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

         this.state = {
             muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
         }
    }

    /**
     * Stores used by this component
     */
    static getStores() {
        return [UIReactStore, FlickrStore]
    }

    /**
     * Used by Alt Flux to get properties from store
     */
    static getPropsFromStores() {
        return {
            ...UIReactStore.getState(),
            ...FlickrStore.getState()
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
     * When component mount. Start listen to uireact Store
     */
    componentDidMount() {
        UIReactStore.listen(this.onChange);
        FlickrStore.listen(this.onChange);
        FlickrActions.fetch();
    }

    /**
     * When component unmount. Stop listen to uireact Store
     */
    componentWillUnmount() {
        UIReactStore.unlisten(this.onChange);
        FlickrStore.listen(this.onChange);
    }

    /**
     * Triggers when store changes.
     * Automatically set state
     */
    onChange(state) {
        this.setState(state);
    }

    /**
     * Trigger the left nav
     */
    triggerLeftNav() {
        this.state.leftNav.toggle();
    }

    /**
     * Component Render
     */
    render() {

        let containerStyle = {
            textAlign: 'center',
            marginTop: '50px'
        };

        let output = [];

        if(this.state.flickrImages) {
            output = (
                <GridList
                    cols={2}
                    cellHeight={200}
                    padding={1}
                    style={{width: 320, height: 640, overflowY: 'auto'}}>
                        {
                            this.state.flickrImages.items.map((item) => {
                                <GridTile
                                    key={Math.ceil(Math.random(5) * 1000)}
                                    title={item.title}
                                    titlePosition="top"
                                    cols="2"
                                    rows="2">
                                    <img src={item.media.m} />
                                </GridTile>
                            })
                        }
                </GridList>
            );
        } else {
            output = (
                <div>No images to show</div>
            );
        }

        return (
            <div className="app-screen flickr-app-wrapper">

                <AppBar
                    title="Flickr Example"
                    onLeftIconButtonTouchTap={this.props.history.goBack}
                    iconElementLeft={<IconButton><NavigationBack /></IconButton>}
                    />

                <div style={containerStyle}>
                    {output}
                </div>

            </div>
        )
    }

}

module.exports = FlickrHome;
