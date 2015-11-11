import Alt from '../components/alt';

class UIReactActions {
    preLoader(active) {
        this.dispatch(active);
    }
}

module.exports = Alt.createActions(UIReactActions);
