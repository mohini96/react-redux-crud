import {createStore} from 'redux';
import rootReducer from './reducer';
import thunk from 'redux-thunk';
import {compose,applyMiddleware} from 'redux';
import createHistory from 'history/createBrowserHistory';
import {routerMiddleware} from 'react-router-redux'
export const history=createHistory();
const middleware=[thunk,routerMiddleware(history)];
const composedMiddleware=applyMiddleware(...middleware);
const store=createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(composedMiddleware));

export default store;