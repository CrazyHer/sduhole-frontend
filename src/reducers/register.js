import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '../pages/register/register_redux';

const defaultState = {
  message: '',
  loading: false,
};
const register = (state = defaultState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, loading: true };
    case REGISTER_SUCCESS:
      return { ...state, loading: false, message: REGISTER_SUCCESS };
    case REGISTER_FAILURE:
      return { ...state, loading: false, message: REGISTER_FAILURE };
    default:
      return state;
  }
};
export default register;
