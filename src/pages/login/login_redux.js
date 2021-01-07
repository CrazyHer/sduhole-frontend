import { message } from 'antd';
import Axios from 'axios';
import qs from 'qs';
import { LOGIN_URL } from '../../constants/requestURL';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOFF = 'LOGOFF';

export const onLogin = ({ u, p, autoLogin }) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  return Axios.post(LOGIN_URL, qs.stringify({ u, p }))
    .then((res) => res.data)
    .then((res) => {
      if (res.code === 0) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            token: res.data.token,
            refresh_token: res.data.refresh_token,
          },
        });
        autoLogin &&
          localStorage.setItem('token', res.data.token) &&
          localStorage.setItem('refresh_token', res.data.refresh_token);
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('refresh_token', res.data.refresh_token);
      } else {
        dispatch({ type: LOGIN_FAILURE });
        message.error('登陆失败：' + res.message);
        localStorage.clear();
        sessionStorage.clear();
      }
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAILURE });
      console.error(err);
      message.error('登陆失败，请求异常');
    });
};

export const onLogoff = (dispath) => {
  dispath({ type: LOGOFF });
  console.log(666);
  let stoken = localStorage.getItem('stoken');
  localStorage.clear();
  sessionStorage.clear();
  stoken && localStorage.setItem('stoken', stoken);
};

export const refreshToken = () => (dispatch) => {};
