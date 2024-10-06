// src/redux/actions/authActions.js
import axios from 'axios';
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
} from './actionTypes';

// Register action
export const registerUser = (phoneNumber, promoCode) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await axios.post('/api/register', { phoneNumber, promoCode });
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
  }
};

// Verify OTP action
export const verifyOtp = (otp) => async (dispatch) => {
  dispatch({ type: VERIFY_OTP_REQUEST });
  try {
    const response = await axios.post('/api/verify-otp', { otp });
    dispatch({ type: VERIFY_OTP_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: VERIFY_OTP_FAILURE, payload: error.message });
  }
};

// Login action
export const loginUser = (password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post('/api/login', { password });
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

// Resend OTP action
export const resendOtp = (phoneNumber) => async (dispatch) => {
  dispatch({ type: RESEND_OTP_REQUEST });
  try {
    const response = await axios.post('/api/resend-otp', { phoneNumber });
    dispatch({ type: RESEND_OTP_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: RESEND_OTP_FAILURE, payload: error.message });
  }
};

// LOGOUT
export const logoutUser = () => (dispatch) => {
    dispatch({ type: LOGOUT });
  };