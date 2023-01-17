import { createStore, applyMiddleware, compose } from 'redux';

import reduxThunk from 'redux-thunk';

import reducers from './reducers';

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // added for redux debugging (redux-devtools-extension)
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

export const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(reduxThunk)));

