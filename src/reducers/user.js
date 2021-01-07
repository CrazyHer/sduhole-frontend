import { GEN_STOKEN_SUCCESS, SET_STOKEN } from '../pages/home/home_redux';
import { LOGIN_SUCCESS, LOGOFF } from '../pages/login/login_redux';

const defaultState = {
  token: localStorage.getItem('token') || sessionStorage.getItem('token') || '',
  refresh_token:
    localStorage.getItem('refresh_token') ||
    sessionStorage.getItem('refresh_token') ||
    '',
  stoken: localStorage.getItem('stoken') || '',
};
const user = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        refresh_token: action.payload.refresh_token,
      };
    case GEN_STOKEN_SUCCESS:
      return {
        ...state,
        stoken: action.payload.stoken,
      };
    case LOGOFF:
      return {
        ...state,
        token: '',
        refresh_token: '',
        stoken: localStorage.getItem('stoken') || '',
      };
    case SET_STOKEN:
      return {
        ...state,
        stoken: action.payload,
      };
    default:
      return state;
  }
};
export default user;
