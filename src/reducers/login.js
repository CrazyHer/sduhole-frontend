import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from '../pages/login/login_redux';

const defaultState = {
  loading: false,
  message: '',
};
const login = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        message: LOGIN_REQUEST,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        message: LOGIN_SUCCESS,
        loading: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        message: LOGIN_FAILURE,
        loading: false,
      };
    default:
      return state;
  }
};
export default login;
