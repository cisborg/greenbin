// actions.js
import api from "../../utils/axiosConfig";
import {
  RATE_PRODUCT,
  RATE_PRODUCT_SUCCESS,
  RATE_PRODUCT_FAILURE,
  RATE_VENDOR,
  RATE_VENDOR_SUCCESS,
  RATE_VENDOR_FAILURE
} from './actionTypes';

// Action to rate a product
export const rateProduct = (productId, rating, reason) => async (dispatch) => {
  dispatch({ type: RATE_PRODUCT });

  try {
    // Make the API call to rate the product
    const response = await api.post('/api/products/rate', { productId, rating });

    // If successful, dispatch success action
    dispatch({ type: RATE_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    // If there is an error, dispatch failure action
    dispatch({ type: RATE_PRODUCT_FAILURE, payload: error.message });
  }
};

// Action to rate a vendor
export const rateVendor = (vendorId, rating) => async (dispatch) => {
  dispatch({ type: RATE_VENDOR });

  try {
    // Make the API call to rate the vendor
    const response = await api.post('/api/vendors/rate', { vendorId, rating });

    // If successful, dispatch success action
    dispatch({ type: RATE_VENDOR_SUCCESS, payload: response.data });
  } catch (error) {
    // If there is an error, dispatch failure action
    dispatch({ type: RATE_VENDOR_FAILURE, payload: error.message });
  }
};
