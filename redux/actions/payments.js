// src/redux/actions/paymentActions.js
import axios from 'axios';
import {
    DEPOSIT_REQUEST,
    DEPOSIT_SUCCESS,
    DEPOSIT_FAILURE,
    WITHDRAW_REQUEST,
    WITHDRAW_SUCCESS,
    WITHDRAW_FAILURE,
} from './actionTypes';

// Deposit action
export const deposit = (amount) => async (dispatch) => {
    dispatch({ type: DEPOSIT_REQUEST });
    try {
        const response = await axios.post('/api/deposit', { amount });
        dispatch({ type: DEPOSIT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: DEPOSIT_FAILURE, payload: error.message });
    }
};

// Withdraw action
export const withdraw = (amount) => async (dispatch) => {
    dispatch({ type: WITHDRAW_REQUEST });
    try {
        const response = await axios.post('/api/withdraw', { amount });
        dispatch({ type: WITHDRAW_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: WITHDRAW_FAILURE, payload: error.message });
    }
};
