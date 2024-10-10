// src/redux/actions/authActions.js
import axios from 'axios';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  VERIFY_ACCESS_TOKEN,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAILURE,
  RESEND_TOKEN_REQUEST,
  RESEND_TOKEN_SUCCESS,
  RESEND_TOKEN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './actionTypes';

// Register action
export const registerUser = (email, password, phone, referralCode) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await axios.post('/api/register', { email, password,phone, referralCode });
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
  }
};

// Verify OTP action (if applicable, otherwise you can remove it)
export const verifyToken = (token) => async (dispatch) => {
  dispatch({ type: VERIFY_ACCESS_TOKEN });
  try {
    const response = await axios.post('/api/verify-token', { token });
    dispatch({ type: VERIFY_TOKEN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: VERIFY_TOKEN_FAILURE, payload: error.message });
  }
};

// Login action
// Login action
export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post('/api/login', { email, password });
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response?.data?.message || error.message });
  }
};


// Resend OTP action (if applicable, otherwise you can remove it)
export const resendToken = (email) => async (dispatch) => {
  dispatch({ type: RESEND_TOKEN_REQUEST });
  try {
    const response = await axios.post('/api/resend-token', { email });
    dispatch({ type: RESEND_TOKEN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: RESEND_TOKEN_FAILURE, payload: error.message });
  }
};

// Logout action
export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
