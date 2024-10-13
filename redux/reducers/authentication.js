// src/redux/reducers/authReducer.js
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    VERIFY_ACCESS_REQUEST,
    VERIFY_TOKEN_SUCCESS,
    VERIFY_TOKEN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    RESEND_TOKEN_REQUEST,
    RESEND_TOKEN_SUCCESS,
    RESEND_TOKEN_FAILURE,
    DELETE_ACCOUNT,
  } from '../actions/actionTypes';
  
  const initialState = {
    email: '',
    password: '',
    promoCode: '',
    phone: '',
    token: '',
    loading: false,
    promoError: false,
    error: null,
    user: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_REQUEST:
      case VERIFY_ACCESS_REQUEST:
      case LOGIN_REQUEST:
        return { ...state, loading: true, error: null };
      case RESEND_TOKEN_REQUEST:
        return { ...state, loading: true, error: null };
      case REGISTER_SUCCESS:
        return { ...state, loading: false, user: action.payload, token: action.payload.token };
      case VERIFY_TOKEN_SUCCESS:
        return { ...state, loading: false };
      case LOGIN_SUCCESS:
        return { ...state, loading: false, user: action.payload.user, token: action.payload.token };
      case RESEND_TOKEN_SUCCESS:
        return { ...state, loading: false };
      case REGISTER_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case VERIFY_TOKEN_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case LOGIN_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case RESEND_TOKEN_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case DELETE_ACCOUNT:
        return { ...initialState, token:'', user: null }; // Reset state on logout
      default:
        return state;
    }
  };
  
  export default authReducer;
  