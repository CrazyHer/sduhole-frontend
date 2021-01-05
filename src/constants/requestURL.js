const ROOT = 'http://skyemperor.top:6011/api';

//AUTH
export const REFRESH_URL = `${ROOT}/auth/refresh`;
export const REGISTER_URL = `${ROOT}/auth/register`;
export const LOGIN_URL = `${ROOT}/auth/login`;

//HOLE
export const GEN_STOKEN_URL = `${ROOT}/hole/stoken/generate`;
export const HAS_LIKE_URL = `${ROOT}/hole/has/like`;
export const HAS_HATE_URL = `${ROOT}/hole/has/hate`;
export const GET_HOLELIST_URL = `${ROOT}/hole/list`;
export const GET_HOLEREPLY_URL = `${ROOT}/hole/reply`;
export const GET_MYHOLES_URL = `${ROOT}/hole/list`;
export const GET_HOLEDETAIL_URL = `${ROOT}/hole`;

export const LIKE_URL = `${ROOT}/hole/like`;
export const HATE_URL = `${ROOT}/hole/hate`;
export const POST_HOLE_URL = `${ROOT}/hole/post`;

//USER
export const GET_USERINFO_URL = `${ROOT}/basic_user/info`;

export const UPDATE_USERINFO_URL = `${ROOT}/basic_user/info/update`;
export const BIND_STUNUM_URL = `${ROOT}/basic_user/stu_num/bind`;
export const BIND_EMAIL_URL = `${ROOT}/basic_user/email/bind`;
