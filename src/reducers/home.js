import {
  GET_HOLELIST_FAILURE,
  GET_HOLELIST_REQUEST,
  GET_HOLELIST_SUCCESS,
} from '../pages/home/home_redux';

const defaultState = {
  holeList: [
    {
      hole: {
        holeId: 1,
        rootId: 0,
        parentId: 0,
        holeUserId: 3,
        content: 'test!',
        date: '2020-12-29 16:23:07',
        like: 0,
        hate: 1,
        status: 0,
        type: 0,
      },
      holeUser: {
        holeUserId: 3,
        holeUserName: '南瓜',
        status: 0,
      },
    },
    {
      hole: {
        holeId: 5,
        rootId: 1,
        parentId: 1,
        holeUserId: 3,
        content: '回复222',
        date: '2020-12-29 17:42:20',
        like: 0,
        hate: 0,
        status: 0,
        type: 0,
      },
      holeUser: {
        holeUserId: 3,
        holeUserName: '南瓜',
        status: 0,
      },
    },
  ],
  loading: false,
  message: '',
};
const home = (state = defaultState, action) => {
  switch (action.type) {
    case GET_HOLELIST_REQUEST:
      return { ...state, loading: true };
    case GET_HOLELIST_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_HOLELIST_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default home;
