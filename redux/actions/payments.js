// src/redux/actions/paymentActions.js
import {
    DEPOSIT_REQUEST,
    DEPOSIT_SUCCESS,
    DEPOSIT_FAILURE,
    WITHDRAW_REQUEST,
    WITHDRAW_SUCCESS,
    WITHDRAW_FAILURE,
    SEND_POINTS_REQUEST,
    SEND_POINTS_SUCCESS,
    SEND_POINTS_FAILURE,
} from './actionTypes';
import api from "../../utils/axiosConfig";

// Deposit action
export const deposit = (amount) => async (dispatch) => {
    dispatch({ type: DEPOSIT_REQUEST });
    try {
        const response = await api.post('/api/deposit', { amount });
        dispatch({ type: DEPOSIT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: DEPOSIT_FAILURE, payload: error.message });
    }
};

// Withdraw action
export const withdraw = (amount) => async (dispatch) => {
    dispatch({ type: WITHDRAW_REQUEST });
    try {
        const response = await api.post('/api/withdraw', { amount });
        dispatch({ type: WITHDRAW_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: WITHDRAW_FAILURE, payload: error.message });
    }
};

export const sendPoints = (userId, points) => async (dispatch) => {
    dispatch({ type: SEND_POINTS_REQUEST });
    try {
     const response = await api.post(" api/send-points", { userId, points });
     dispatch({ type: SEND_POINTS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: SEND_POINTS_FAILURE, payload: error.message });
    }
  };
 
