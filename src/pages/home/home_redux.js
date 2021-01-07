import { message } from 'antd';
import Axios from 'axios';
import qs from 'qs';
import {
  GEN_STOKEN_URL,
  GET_HOLELIST_URL,
  LIKE_URL,
  POST_HOLE_URL,
} from '../../constants/requestURL';

export const LIKE_REQUEST = 'LIKE_REQUEST';
export const LIKE_SUCCESS = 'LIKE_SUCCESS';
export const LIKE_FAILURE = 'LIKE_FAILURE';
export const onLike = (holeId) => (dispatch) => {
  dispatch(LIKE_REQUEST);
  return Axios.post(LIKE_URL, qs.stringify({ holeId }))
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
  return Axios.get(GET_HOLELIST_URL, {
    params: { holeId, page: 1, count: 10000 },
  })
    .then((res) => res.data)
    .then((res) => {
      if (res.code === 0) {
        dispatch({ type: GET_HOLELIST_SUCCESS, payload: res.data });
      } else if (res.code === 40034) {
        dispatch({ type: SUBMIT_HOLE_FAILURE });
        dispatch(setStoken(''));
        localStorage.clear();
        message.error('失败：' + res.message);
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

export const GEN_STOKEN_REQUEST = 'GEN_STOKEN_REQUEST';
export const GEN_STOKEN_SUCCESS = 'GEN_STOKEN_SUCCESS';
export const GEN_STOKEN_FAILURE = 'GEN_STOKEN_FAILURE';
export const getStoken = () => (dispatch) => {
  dispatch({ type: GEN_STOKEN_REQUEST });
  return Axios.post(GEN_STOKEN_URL)
    .then((res) => res.data)
    .then((res) => {
      if (res.code === 0) {
        dispatch({ type: GEN_STOKEN_SUCCESS, payload: res.data });
        localStorage.setItem('stoken', res.data.stoken);
        Axios.defaults.headers['stoken'] = res.data.stoken;
        message.success('SToken生成成功！');
        dispatch(getHoleList());
      } else {
        dispatch({ type: GEN_STOKEN_FAILURE });
        message.error('生成失败：' + res.message);
      }
    })
    .catch((err) => {
      dispatch({ type: GEN_STOKEN_FAILURE });
      console.error(err);
      message.error('请求异常');
    });
};

export const SUBMIT_HOLE_REQUEST = 'SUBMIT_HOLE_REQUEST';
export const SUBMIT_HOLE_SUCCESS = 'SUBMIT_HOLE_SUCCESS';
export const SUBMIT_HOLE_FAILURE = 'SUBMIT_HOLE_FAILURE';
export const submitHole = ({ parentId, content }) => (dispatch) => {
  dispatch({ type: SUBMIT_HOLE_REQUEST });
  return Axios.post(POST_HOLE_URL, qs.stringify({ parentId, content }))
    .then((res) => res.data)
    .then((res) => {
      if (res.code === 0) {
        dispatch({ type: SUBMIT_HOLE_SUCCESS });
        parentId === 0
          ? dispatch(getHoleList())
          : dispatch(getReplyList(parentId));
      } else {
        dispatch({ type: SUBMIT_HOLE_FAILURE });
        message.error('失败：' + res.message);
      }
    })
    .catch((err) => {
      dispatch({ type: SUBMIT_HOLE_FAILURE });
      console.error(err);
      message.error('请求异常');
    });
};

export const GET_REPLY_REQUEST = 'GET_REPLY_REQUEST';
export const GET_REPLY_SUCCESS = 'GET_REPLY_SUCCESS';
export const GET_REPLY_FAILURE = 'GET_REPLY_FAILURE';
export const getReplyList = (holeId) => (dispatch) => {
  dispatch({ type: GET_REPLY_REQUEST });
  return Axios.get(GET_HOLELIST_URL, {
    params: { holeId, page: 1, count: 10000 },
  })
    .then((res) => res.data)
    .then((res) => {
      if (res.code === 0) {
        let payload = {};
        payload[holeId] = res.data;
        dispatch({ type: GET_REPLY_SUCCESS, payload });
      } else {
        dispatch({ type: GET_REPLY_FAILURE });
        message.error('失败：' + res.message);
      }
    })
    .catch((err) => {
      dispatch({ type: GET_REPLY_FAILURE });
      console.error(err);
      message.error('请求异常');
    });
};

export const UNEXPAND_REPLY = 'UNEXPAND_REPLY';
export const unExpandReply = (holeId) => ({
  type: UNEXPAND_REPLY,
  payload: holeId,
});

export const SET_STOKEN = 'SET_STOKEN';
export const setStoken = (stoken) => ({
  type: SET_STOKEN,
  payload: stoken,
});
