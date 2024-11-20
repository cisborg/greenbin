// src/redux/reducers/authReducer.js
import {
  REGISTER_USER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  SEND_RESET_PASSWORD,
  SEND_RESET_PASSWORD_SUCCESS,
  SEND_RESET_PASSWORD_FAILURE,
  CONNECTION_REQUEST,
  CONNECTION_REQUEST_SUCCESS,
  CONNECTION_REQUEST_FAILURE,
  GET_REFERRAL_CODE_REQUEST,
  GET_REFERRAL_CODE_SUCCESS,
  GET_REFERRAL_CODE_FAILURE,
  REGISTER_CODE_REQUEST, 
  REGISTER_CODE_SUCCESS,
  REGISTER_CODE_FAILURE,
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
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
  referralCode: "",
  greenBankCode: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Grouping loading cases
    case REGISTER_USER:
    case SEND_RESET_PASSWORD:
    case REGISTER_CODE_REQUEST:
    case LOGIN_USER:
    case CONNECTION_REQUEST:
    case GET_REFERRAL_CODE_REQUEST:
      return { ...state, loading: true, error: null };

    // Handling success cases
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        token: action.payload.token,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case REGISTER_CODE_SUCCESS:
      return {
        loading: false,
        token: action.payload.greenBankCode,
      };

    case SEND_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };

    case CONNECTION_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case GET_REFERRAL_CODE_SUCCESS:
      return {
        ...state,
        referralCode: action.payload.referralCode,
        loading: false,
      };

    // Grouping failure cases
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case SEND_RESET_PASSWORD_FAILURE:
    case CONNECTION_REQUEST_FAILURE:
    case REGISTER_CODE_FAILURE:
    case GET_REFERRAL_CODE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state; 
  }
};

export default authReducer;
