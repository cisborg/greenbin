import {
    CREATE_VENDOR_REQUEST,
    CREATE_VENDOR_SUCCESS,
    CREATE_VENDOR_FAILURE,
    GET_ALL_VENDORS_REQUEST,
    GET_ALL_VENDORS_SUCCESS,
    GET_ALL_VENDORS_FAILURE,
    UPDATE_VENDOR_REQUEST,
    UPDATE_VENDOR_SUCCESS,
    UPDATE_VENDOR_FAILURE,
    DELETE_VENDOR_REQUEST,
    DELETE_VENDOR_SUCCESS,
    DELETE_VENDOR_FAILURE,
} from './actionTypes';
import api from '../../utils/axiosConfig';

// Create Vendor action
export const createVendor = (vendorData) => async (dispatch) => {
    dispatch({ type: CREATE_VENDOR_REQUEST });
    try {
        const response = await api.post('/api/create-vendor', vendorData);
        dispatch({ type: CREATE_VENDOR_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_VENDOR_FAILURE, payload: error.message });
    }
};

// Get All Vendors action
export const getAllVendors = () => async (dispatch) => {
    dispatch({ type: GET_ALL_VENDORS_REQUEST });
    try {
        const response = await api.get('/api/get-all-vendors');
        dispatch({ type: GET_ALL_VENDORS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_ALL_VENDORS_FAILURE, payload: error.message });
    }
};

// Update Vendor action
export const updateVendor = (vendorId, vendorData) => async (dispatch) => {
    dispatch({ type: UPDATE_VENDOR_REQUEST });
    try {
        const response = await api.put(`/api/update-vendor/${vendorId}`, vendorData);
        dispatch({ type: UPDATE_VENDOR_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_VENDOR_FAILURE, payload: error.message });
    }
};

// Delete Vendor action
export const deleteVendor = (vendorId) => async (dispatch) => {
    dispatch({ type: DELETE_VENDOR_REQUEST });
    try {
        await api.delete(`/api/delete-vendor/${vendorId}`);
        dispatch({ type: DELETE_VENDOR_SUCCESS, payload: vendorId });
    } catch (error) {
        dispatch({ type: DELETE_VENDOR_FAILURE, payload: error.message });
    }
};
