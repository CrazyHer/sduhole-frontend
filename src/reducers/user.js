import { LOGOFF } from '../pages/login/login_redux';

const defaultState = {
  userName: 'aa',
  token:
    localStorage.getItem('token') || sessionStorage.getItem('token') || 'token',
  refresh_token:
    localStorage.getItem('refresh_token') ||
    sessionStorage.getItem('refresh_token') ||
    'rtoken',
  stoken: localStorage.getItem('stoken') || 'stoken',
};
const user = (state = defaultState, action) => {
  switch (action.type) {
    case LOGOFF:
      return {
        token:
          localStorage.getItem('token') ||
          sessionStorage.getItem('token') ||
          '',
        refresh_token:
          localStorage.getItem('refresh_token') ||
          sessionStorage.getItem('refresh_token') ||
          '',
        stoken: localStorage.getItem('stoken') || '',
      };
    default:
      return state;
  }
};
export default user;
