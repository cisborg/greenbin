// src/redux/actions/shopActions.js
import axios from 'axios';
import {
    CREATE_SHOP_REQUEST,
    CREATE_SHOP_SUCCESS,
    CREATE_SHOP_FAILURE,
    UPDATE_SHOP_REQUEST,
    UPDATE_SHOP_SUCCESS,
    UPDATE_SHOP_FAILURE,
    DELETE_SHOP_REQUEST,
    DELETE_SHOP_SUCCESS,
    DELETE_SHOP_FAILURE,
    GET_NEARBY_SHOPS_REQUEST,
    GET_NEARBY_SHOPS_SUCCESS,
    GET_NEARBY_SHOPS_FAILURE,
    GET_SHOP_BY_ID_REQUEST,
    GET_SHOP_BY_ID_SUCCESS,
    GET_SHOP_BY_ID_FAILURE,
} from './actionTypes';

// Create Shop action
export const createShop = (shopData) => async (dispatch) => {
    dispatch({ type: CREATE_SHOP_REQUEST });
    try {
        const response = await axios.post('/api/create-shop', shopData);
        dispatch({ type: CREATE_SHOP_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_SHOP_FAILURE, payload: error.message });
    }
};

// Update Shop action
export const updateShop = (shopId, shopData) => async (dispatch) => {
    dispatch({ type: UPDATE_SHOP_REQUEST });
    try {
        const response = await axios.put(`/api/update-shop/${shopId}`, shopData);
        dispatch({ type: UPDATE_SHOP_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_SHOP_FAILURE, payload: error.message });
    }
};

// Delete Shop action
export const deleteShop = (shopId) => async (dispatch) => {
    dispatch({ type: DELETE_SHOP_REQUEST });
    try {
        await axios.delete(`/api/delete-shop/${shopId}`);
        dispatch({ type: DELETE_SHOP_SUCCESS, payload: shopId });
    } catch (error) {
        dispatch({ type: DELETE_SHOP_FAILURE, payload: error.message });
    }
};

// Get Nearby Shops action
export const getNearbyShops = (location) => async (dispatch) => {
    dispatch({ type: GET_NEARBY_SHOPS_REQUEST });
    try {
        const response = await axios.get(`/api/get-nearby-shops`, { params: location });
        dispatch({ type: GET_NEARBY_SHOPS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_NEARBY_SHOPS_FAILURE, payload: error.message });
    }
};

// Get Shop by ID action
export const getShopById = (shopId) => async (dispatch) => {
    dispatch({ type: GET_SHOP_BY_ID_REQUEST });
    try {
        const response = await axios.get(`/api/get-shop/${shopId}`);
        dispatch({ type: GET_SHOP_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_SHOP_BY_ID_FAILURE, payload: error.message });
    }
};
