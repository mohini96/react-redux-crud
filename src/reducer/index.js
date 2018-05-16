import {combineReducers} from 'redux';
import auth from './auth';
import user from './user';
import {routerReducer} from 'react-router-redux';

const rootReducer= combineReducers({auth,user,router:routerReducer});
export default rootReducer


