import { message } from 'antd';
import axios from 'axios';
import qs from 'qs';
import { GET_HOLELIST_URL, LIKE_URL } from '../../constants/requestURL';

export const LIKE_REQUEST = 'LIKE_REQUEST';
export const LIKE_SUCCESS = 'LIKE_SUCCESS';
export const LIKE_FAILURE = 'LIKE_FAILURE';
export const onLike = (holeId) => (dispatch) => {
  dispatch(LIKE_REQUEST);
  return axios
    .post(LIKE_URL, qs.stringify({ holeId }))
    .then((res) => res.data)
    .then((res) => {
      if (res.code === 0) {
        dispatch({ type: LIKE_SUCCESS });
      } else {
        dispatch({ type: LIKE_FAILURE });
        message.error('点赞失败：' + res.message);
      }
    })
    .catch((err) => {
      dispatch({ type: LIKE_FAILURE });
      console.error(err);
      message.error('请求异常');
    });
};

export const GET_HOLELIST_REQUEST = 'GET_HOLELIST_REQUEST';
export const GET_HOLELIST_SUCCESS = 'GET_HOLELIST_SUCCESS';
export const GET_HOLELIST_FAILURE = 'GET_HOLELIST_FAILURE';
export const getHoleList = (holeId = 0) => (dispatch) => {
  dispatch({ type: GET_HOLELIST_REQUEST });
  return axios
    .get(GET_HOLELIST_URL, {
      params: qs.stringify({ holeId, page: 1, count: 10000 }),
    })
    .then((res) => res.data)
    .then((res) => {
      if (res.code === 0) {
        dispatch({ type: GET_HOLELIST_SUCCESS, payload: res.data });
      } else {
        dispatch({ type: GET_HOLELIST_FAILURE });
        message.error('获取树洞失败：' + res.message);
      }
    })
    .catch((err) => {
      dispatch({ type: GET_HOLELIST_FAILURE });
      console.error(err);
      message.error('请求异常');
    });
};
