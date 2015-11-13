import Alt from '../components/alt';

class UIReactActions {
    preLoader(active) {
        this.dispatch(active);
    }
    setLeftNav(leftNav) {
        this.dispatch(leftNav);
    }
}

module.exports = Alt.createActions(UIReactActions);
