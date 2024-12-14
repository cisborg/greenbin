// actions.js
import api from "../../utils/axiosConfig";
import {
  RATE_PRODUCT,
  RATE_PRODUCT_SUCCESS,
  RATE_PRODUCT_FAILURE,
  RATE_VENDOR,
  RATE_VENDOR_SUCCESS,
  RATE_VENDOR_FAILURE,
  RATE_APP,
  RATE_APP_SUCCESS,
  RATE_APP_FAILURE,
  FETCH_PRODUCT_RATINGS_REQUEST,
  FETCH_PRODUCT_RATINGS_SUCCESS,
  FETCH_PRODUCT_RATINGS_FAILURE,
  FETCH_VENDOR_RATINGS_REQUEST,
  FETCH_VENDOR_RATINGS_SUCCESS,
  FETCH_VENDOR_RATINGS_FAILURE,
  FETCH_APP_RATINGS_REQUEST,
  FETCH_APP_RATINGS_SUCCESS,
  FETCH_APP_RATINGS_FAILURE,
} from './actionTypes';

// Action to rate a product
export const rateProduct = (productId, rating) => async (dispatch) => {
  dispatch({ type: RATE_PRODUCT });

  try {
    const response = await api.post('/rating/product', { productId, rating });
    dispatch({ type: RATE_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: RATE_PRODUCT_FAILURE, payload: error.message });
  }
};

// Action to rate a vendor
export const rateVendor = (vendorId, rating) => async (dispatch) => {
  dispatch({ type: RATE_VENDOR });

  try {
    const response = await api.post('/rating/vendor', { vendorId, rating });
    dispatch({ type: RATE_VENDOR_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: RATE_VENDOR_FAILURE, payload: error.message });
  }
};

// Action to rate the app
export const rateApp = (rating) => async (dispatch) => {
  dispatch({ type: RATE_APP });

  try {
    const response = await api.post('/rating/app', { rating });
    dispatch({ type: RATE_APP_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: RATE_APP_FAILURE, payload: error.message });
  }
};

// Action to fetch product ratings
export const fetchProductRatings = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_RATINGS_REQUEST });

  try {
    const response = await api.get('/rating/all/product');
    dispatch({ type: FETCH_PRODUCT_RATINGS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCT_RATINGS_FAILURE, payload: error.message });
  }
};

// Action to fetch vendor ratings
export const fetchVendorRatings = () => async (dispatch) => {
  dispatch({ type: FETCH_VENDOR_RATINGS_REQUEST });

  try {
    const response = await api.get('/rating/all/vendor');
    dispatch({ type: FETCH_VENDOR_RATINGS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_VENDOR_RATINGS_FAILURE, payload: error.message });
  }
};

// Action to fetch app ratings
export const fetchAppRatings = () => async (dispatch) => {
  dispatch({ type: FETCH_APP_RATINGS_REQUEST });

  try {
    const response = await api.get('/rating/all/app');
    dispatch({ type: FETCH_APP_RATINGS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_APP_RATINGS_FAILURE, payload: error.message });
  }
};
