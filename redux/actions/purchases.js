// src/redux/actions/purchasesActions.js

import {
    GET_ALL_PURCHASES_REQUEST,
    GET_ALL_PURCHASES_SUCCESS,
    GET_ALL_PURCHASES_FAILURE,
    DELETE_PURCHASE_REQUEST,
    DELETE_PURCHASE_SUCCESS,
    DELETE_PURCHASE_FAILURE,
    CLEAR_ALL_PURCHASES_REQUEST,
    CLEAR_ALL_PURCHASES_SUCCESS,
    CLEAR_ALL_PURCHASES_FAILURE,
} from './actionTypes';
import api from "../../utils/axiosConfig";

// Get All Purchases action
export const getAllPurchases = () => async (dispatch) => {
    dispatch({ type: GET_ALL_PURCHASES_REQUEST });
    try {
        const response = await api.get('/user/transaction/history'); // Update to the correct endpoint
        if (response.data.status === 'success') {
            const purchases = response.data.data.purchases; // Extract purchases
            dispatch({ type: GET_ALL_PURCHASES_SUCCESS, payload: purchases }); // Dispatch only the purchases
        } else {
            dispatch({ type: GET_ALL_PURCHASES_FAILURE, payload: response.data.message });
        }
    } catch (error) {
        dispatch({ type: GET_ALL_PURCHASES_FAILURE, payload: error.message });
    }
};


// Delete Purchase action
export const deletePurchase = (purchaseId) => async (dispatch) => {
    dispatch({ type: DELETE_PURCHASE_REQUEST });
    try {
        const response = await api.delete(`/api/delete-purchase/${purchaseId}`);
        if (response.data.status === 'success') {
            dispatch({ type: DELETE_PURCHASE_SUCCESS, payload: purchaseId });
        } else {
            dispatch({ type: DELETE_PURCHASE_FAILURE, payload: response.data.message });
        }
    } catch (error) {
        dispatch({ type: DELETE_PURCHASE_FAILURE, payload: error.message });
    }
};

// Clear All Purchases action
export const clearAllPurchases = () => async (dispatch) => {
    dispatch({ type: CLEAR_ALL_PURCHASES_REQUEST });
    try {
        const response = await api.delete('/api/clear-all-purchases'); // Assuming endpoint exists for batch delete
        if (response.data.status === 'success') {
            dispatch({ type: CLEAR_ALL_PURCHASES_SUCCESS });
        } else {
            dispatch({ type: CLEAR_ALL_PURCHASES_FAILURE, payload: response.data.message });
        }
    } catch (error) {
        dispatch({ type: CLEAR_ALL_PURCHASES_FAILURE, payload: error.message });
    }
};