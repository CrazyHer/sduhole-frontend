import { message } from 'antd';
import Axios from 'axios';
import qs from 'qs';
import { REGISTER_URL } from '../../constants/requestURL';
import { onLogin } from '../login/login_redux';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const onRegister = ({ userName, password, email }) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  return Axios.post(REGISTER_URL, qs.stringify({ userName, password, email }))
    .then((res) => res.data)
    .then((res) => {
      if (res.code === 0) {
        dispatch(onLogin(userName, password, false));
        dispatch({ type: REGISTER_SUCCESS });
        message.success('注册成功！');
      } else {
        dispatch({ type: REGISTER_FAILURE });
        message.error('注册失败：' + res.message);
      }
    })
    .catch((err) => {
      dispatch({ type: REGISTER_FAILURE });
      console.error(err);
      message.error('注册失败，请求异常');
    });
};
