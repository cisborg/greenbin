import {
    CREATE_PURCHASE_REQUEST,
    CREATE_PURCHASE_SUCCESS,
    CREATE_PURCHASE_FAILURE,
    GET_ALL_PURCHASES_REQUEST,
    GET_ALL_PURCHASES_SUCCESS,
    GET_ALL_PURCHASES_FAILURE,
    UPDATE_PURCHASE_REQUEST,
    UPDATE_PURCHASE_SUCCESS,
    UPDATE_PURCHASE_FAILURE,
    DELETE_PURCHASE_REQUEST,
    DELETE_PURCHASE_SUCCESS,
    DELETE_PURCHASE_FAILURE,
    CLEAR_ALL_PURCHASES_REQUEST,
    CLEAR_ALL_PURCHASES_SUCCESS,
    CLEAR_ALL_PURCHASES_FAILURE,
} from './actionTypes';
import api from "../../utils/axiosConfig";

// Create Purchase action
export const createPurchase = (purchaseData) => async (dispatch) => {
    dispatch({ type: CREATE_PURCHASE_REQUEST });
    try {
        const response = await api.post('/api/create-purchase', purchaseData);
        dispatch({ type: CREATE_PURCHASE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_PURCHASE_FAILURE, payload: error.message });
    }
};

// Get All Purchases action
export const getAllPurchases = () => async (dispatch) => {
    dispatch({ type: GET_ALL_PURCHASES_REQUEST });
    try {
        const response = await api.get('/api/get-all-purchases');
        dispatch({ type: GET_ALL_PURCHASES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_ALL_PURCHASES_FAILURE, payload: error.message });
    }
};

// Update Purchase action
export const updatePurchase = (purchaseId, purchaseData) => async (dispatch) => {
    dispatch({ type: UPDATE_PURCHASE_REQUEST });
    try {
        const response = await api.put(`/api/update-purchase/${purchaseId}`, purchaseData);
        dispatch({ type: UPDATE_PURCHASE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_PURCHASE_FAILURE, payload: error.message });
    }
};

// Delete Purchase action
export const deletePurchase = (purchaseId) => async (dispatch) => {
    dispatch({ type: DELETE_PURCHASE_REQUEST });
    try {
        await api.delete(`/api/delete-purchase/${purchaseId}`);
        dispatch({ type: DELETE_PURCHASE_SUCCESS, payload: purchaseId });
    } catch (error) {
        dispatch({ type: DELETE_PURCHASE_FAILURE, payload: error.message });
    }
};

// Clear All Purchases action
export const clearAllPurchases = () => async (dispatch) => {
    dispatch({ type: CLEAR_ALL_PURCHASES_REQUEST });
    try {
        await api.delete('/api/clear-all-purchases'); // Assuming endpoint exists for batch delete
        dispatch({ type: CLEAR_ALL_PURCHASES_SUCCESS });
    } catch (error) {
        dispatch({ type: CLEAR_ALL_PURCHASES_FAILURE, payload: error.message });
    }
};
