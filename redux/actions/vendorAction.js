import {
    CREATE_VENDOR_REQUEST,
    CREATE_VENDOR_SUCCESS,
    CREATE_VENDOR_FAILURE,
    GET_ALL_VENDORS_REQUEST,
    GET_ALL_VENDORS_SUCCESS,
    GET_ALL_VENDORS_FAILURE,
    FETCH_FOLLOWED_VENDORS_SUCCESS,
    UNFOLLOW_VENDOR_REQUEST,
    UNFOLLOW_VENDOR_SUCCESS,
    UNFOLLOW_VENDOR_FAILURE,
    FOLLOW_VENDOR_REQUEST,
    FOLLOW_VENDOR_SUCCESS,
    FOLLOW_VENDOR_FAILURE,
    
} from './actionTypes';
import api from '../../utils/axiosConfig';

// Create Vendor action
export const createVendor = (vendorData) => async (dispatch) => {
    dispatch({ type: CREATE_VENDOR_REQUEST });
    try {
        const response = await api.post('/vendor/apply', vendorData);
        dispatch({ type: CREATE_VENDOR_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_VENDOR_FAILURE, payload: error.message });
    }
};

// Get All Vendors action
export const getAllVendors = () => async (dispatch) => {
    dispatch({ type: GET_ALL_VENDORS_REQUEST });
    try {
        const response = await api.get('/user/vendors');
        dispatch({ type: GET_ALL_VENDORS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_ALL_VENDORS_FAILURE, payload: error.message });
    }
};

export const fetchFollowedVendors = () => (dispatch, getState) => {
    const { vendors } = getState().vendor; // Access the current state
    const followedVendors = vendors.filter(vendor => vendor.followed);
    
    dispatch({
      type: FETCH_FOLLOWED_VENDORS_SUCCESS,
      payload: followedVendors,
    });
  };

// Delete Vendor action
export const deleteVendor = (vendorId) => async (dispatch) => {
    dispatch({ type: UNFOLLOW_VENDOR_REQUEST });
    try {
        await api.delete(`/user/connect/delete/${vendorId}`);
        dispatch({ type: UNFOLLOW_VENDOR_SUCCESS, payload: vendorId });
    } catch (error) {
        dispatch({ type: UNFOLLOW_VENDOR_FAILURE, payload: error.message });
    }
};

export const followVendor = (vendorId) => async (dispatch) => {
    dispatch({ type: FOLLOW_VENDOR_REQUEST  });
     try {
       const response = await api.post("/user/connect/request", { vendorId });
       dispatch({ type: FOLLOW_VENDOR_SUCCESS , payload: response.data });
     } catch (error) {
       dispatch({ type: FOLLOW_VENDOR_FAILURE , payload: error.message });
     }
   };