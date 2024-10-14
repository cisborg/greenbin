// src/redux/reducers/authReducer.js
import {
  REGISTER_USER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  UPDATE_USER,
  SEND_RESET_PASSWORD,
  GET_ALL_USERS,
  CONNECTION_REQUEST,
  LOGIN_USER,
  GET_REFERRAL_CODE,
  DELETE_USER,
  SEND_POINTS,
  UPDATE_PASSWORD,
  LOGIN_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  name: "",
  email: "",
  password: "",
  promoCode: "",
  contact: "",
  token: "",
  loading: false,
  promoError: false,
  error: null,
  user: null,
  // usersList: [],
  referralCode: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, loading: true, error: null };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        token: action.payload.token,
      };
    case REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        loading: false,
      };

    case SEND_RESET_PASSWORD:
      return { ...state, loading: false };

    case GET_ALL_USERS:
      return { ...state, usersList: action.payload, loading: false };

    case GET_REFERRAL_CODE:
      return { ...state, referralCode: action.payload, loading: false };

    case SEND_POINTS:
      return { ...state, loading: false };

    case DELETE_USER:
      return { ...initialState, token: "", user: null };

    default:
      return state;
  }
};

export default authReducer;
