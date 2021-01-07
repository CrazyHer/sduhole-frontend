import {
  GEN_STOKEN_FAILURE,
  GEN_STOKEN_REQUEST,
  GEN_STOKEN_SUCCESS,
  GET_HOLELIST_FAILURE,
  GET_HOLELIST_REQUEST,
  GET_HOLELIST_SUCCESS,
  GET_REPLY_SUCCESS,
  UNEXPAND_REPLY,
} from '../pages/home/home_redux';

const defaultState = {
  holeList: [],
  replyList: {},
  loading: false,
  genloading: false,
  message: '',
};
const home = (state = defaultState, action) => {
  switch (action.type) {
    case GET_HOLELIST_REQUEST:
      return { ...state, loading: true };
    case GET_HOLELIST_SUCCESS:
      return { ...state, loading: false, holeList: action.payload.reverse() };
    case GET_HOLELIST_FAILURE:
      return { ...state, loading: false };
    case GEN_STOKEN_REQUEST:
      return { ...state, genloading: true };
    case GEN_STOKEN_SUCCESS:
      return { ...state, genloading: false };
    case GEN_STOKEN_FAILURE:
      return { ...state, genloading: false };
    case GET_REPLY_SUCCESS:
      return {
        ...state,
        replyList: { ...state.replyList, ...action.payload },
      };
    case UNEXPAND_REPLY: {
      delete state.replyList[action.payload];
      return { ...state };
    }
    default:
      return state;
  }
};

export default home;
