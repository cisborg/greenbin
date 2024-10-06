// src/redux/reducers/authReducer.js
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    VERIFY_OTP_REQUEST,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    RESEND_OTP_REQUEST,
    RESEND_OTP_SUCCESS,
    RESEND_OTP_FAILURE,
    LOGOUT,
  } from '../actions/actionTypes';
  
  const initialState = {
    phoneNumber: '',
    promoCode: '',
    otp: '',
    loading: false,
    error: null,
    user: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_REQUEST:
      case VERIFY_OTP_REQUEST:
      case LOGIN_REQUEST:
      case RESEND_OTP_REQUEST:
        return { ...state, loading: true, error: null };
      case REGISTER_SUCCESS:
        return { ...state, loading: false, user: action.payload };
      case VERIFY_OTP_SUCCESS:
        return { ...state, loading: false };
      case LOGIN_SUCCESS:
        return { ...state, loading: false, user: action.payload };
      case RESEND_OTP_SUCCESS:
        return { ...state, loading: false };
      case REGISTER_FAILURE:
      case VERIFY_OTP_FAILURE:
      case LOGIN_FAILURE:
      case RESEND_OTP_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case LOGOUT:
        return { ...initialState }; // Reset state on logout
      default:
        return state;
    }
  };
  
  export default authReducer;
  