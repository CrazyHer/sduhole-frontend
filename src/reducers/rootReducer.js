import { combineReducers } from 'redux';
import user from './user';
import login from './login';
import register from './register';
import home from './home';
export default combineReducers({ user, login, register, home });
