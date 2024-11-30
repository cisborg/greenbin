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
    DELETE_TRANSACTION_REQUEST,
    DELETE_TRANSACTION_SUCCESS,
    DELETE_TRANSACTION_FAILURE,
    CLEAR_ALL_TRANSACTIONS_REQUEST,
    CLEAR_ALL_TRANSACTIONS_SUCCESS,
    CLEAR_ALL_TRANSACTIONS_FAILURE,
    BUY_AIRTIME_REQUEST,
    BUY_AIRTIME_SUCCESS,
    BUY_AIRTIME_FAILURE,
} from './actionTypes';
import api from "../../utils/axiosConfig";


// Cash Deposit Action
export const cashDeposit = (amount) => async (dispatch) => {
    const depositAmount = parseFloat(amount);
    try {
        // Assuming you have an API endpoint to handle cash deposits
        await api.post('/api/cash-deposit', { amount: depositAmount });

        // Dispatch actions to update both total balance and Green Bank balance
        dispatch({ type: DEPOSIT_SUCCESS, payload: depositAmount });
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch({ type: DEPOSIT_FAILURE, payload: errorMessage });
    }
};


// Deposit action
export const deposit = (amount) => async (dispatch) => {
    dispatch({ type: DEPOSIT_REQUEST });
    try {
        const response = await api.post('/pay/init', { amount });
        dispatch({ type: DEPOSIT_SUCCESS, payload: response.data });
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch({ type: DEPOSIT_FAILURE, payload: errorMessage });
    }
};


// Withdraw action
export const withdraw = (amount) => async (dispatch) => {
    dispatch({ type: WITHDRAW_REQUEST });
    try {
        const response = await api.post('/pay/transfer/init', { amount });
        dispatch({ type: WITHDRAW_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: WITHDRAW_FAILURE, payload: error.message });
    }
};

export const sendPoints = (userId, points) => async (dispatch) => {
    dispatch({ type: SEND_POINTS_REQUEST });
    try {
     const response = await api.post("/user/transact/send", { userId, points });
     dispatch({ type: SEND_POINTS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: SEND_POINTS_FAILURE, payload: error.message });
    }
  };
 
  export const deleteTransaction = (donationId) => async (dispatch) => {
    dispatch({ type: DELETE_TRANSACTION_REQUEST });
    try {
        await api.delete(`/api/delete-donation/${donationId}`);
        dispatch({ type: DELETE_TRANSACTION_SUCCESS, payload: donationId });
    } catch (error) {
        dispatch({ type: DELETE_TRANSACTION_FAILURE, payload: error.message });
    }
};

export const clearAllTransactions = () => async (dispatch) => {
    dispatch({ type: CLEAR_ALL_TRANSACTIONS_REQUEST });
    try {
        await api.delete('/api/clear-all-donations'); // Assuming endpoint exists for batch delete
        dispatch({ type: CLEAR_ALL_TRANSACTIONS_SUCCESS });
    } catch (error) {
        dispatch({ type: CLEAR_ALL_TRANSACTIONS_FAILURE, payload: error.message });
    }
};

// actions/paymentActions.js
export const buyAirtime = (amount) => async (dispatch) => {
    dispatch({ type: BUY_AIRTIME_REQUEST });
    
    try {
      // Assume you have an API endpoint for purchasing airtime
      const response = await api.post('/quickAction/airtime', { amount });
      
      if (response.data.status === 'success') {
        dispatch({ type: BUY_AIRTIME_SUCCESS, payload: response.data });
        return response.data; // Return success data if needed
      }
    } catch (error) {
      dispatch({ type: BUY_AIRTIME_FAILURE, payload: error.message });
      throw new Error(error.message);
    }
  };
  