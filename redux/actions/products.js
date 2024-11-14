// src/redux/actions/productActions.js
import api from "../../utils/axiosConfig";

import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  PURCHASE_PRODUCT_REQUEST,
  PURCHASE_PRODUCT_SUCCESS,
  PURCHASE_PRODUCT_FAILURE,
  SUBSCRIBE_PRODUCT_REQUEST,
  SUBSCRIBE_PRODUCT_SUCCESS,
  SUBSCRIBE_PRODUCT_FAILURE,
  CANCEL_SUBSCRIPTION_REQUEST,
  CANCEL_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION_FAILURE,
} from "./actionTypes";

// Fetch all products action
export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });
  try {
    const response = await api.get("/api/products");
    console.log("Products(response.data)", response.data);
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error fetching products:", error);
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
};

// Create product action
export const createProduct = (productData) => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_REQUEST });
  try {
    const response = await api.post("/api/products", productData);
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
  }
};

// Update product action
export const updateProduct = (productId, productData) => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST });
  try {
    const response = await api.put(`/api/products/${productId}`, productData);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error.message });
  }
};

// Delete product action
export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });
  try {
    await api.delete(`/api/products/${productId}`);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
  }
};

// Purchase product action
export const purchaseProduct = (productId, quantity) => async (dispatch) => {
  dispatch({ type: PURCHASE_PRODUCT_REQUEST });
  try {
    const response = await api.post(`/api/purchase`, { productId, quantity });
    dispatch({ type: PURCHASE_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: PURCHASE_PRODUCT_FAILURE, payload: error.message });
  }
};

// Subscribe to product action
export const subscribeProduct = (productId) => async (dispatch) => {
  dispatch({ type: SUBSCRIBE_PRODUCT_REQUEST });
  try {
    const response = await api.post(`/api/subscribe`, { productId });
    dispatch({ type: SUBSCRIBE_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: SUBSCRIBE_PRODUCT_FAILURE, payload: error.message });
  }
};

// Cancel subscription action
export const cancelSubscription = (productId) => async (dispatch) => {
  dispatch({ type: CANCEL_SUBSCRIPTION_REQUEST });
  try {
    await api.delete(`/api/subscribe/${productId}`);
    dispatch({ type: CANCEL_SUBSCRIPTION_SUCCESS, payload: productId });
  } catch (error) {
    dispatch({ type: CANCEL_SUBSCRIPTION_FAILURE, payload: error.message });
  }
};
