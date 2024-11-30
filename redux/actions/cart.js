// src/redux/actions/cartActions.js

import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    REMOVE_FROM_CART_ERROR,
    CLEAR_CART,
    ADD_QUANTITY,
    CLEAR_CART_ERROR,
    DECREASE_QUANTITY,
    ADD_TO_CART_ERROR,
    ADD_QUANTITY_ERROR,
    DECREASE_QUANTITY_ERROR
} from './actionTypes';

import api from "../../utils/axiosConfig";

// Add to Cart
export const addToCart = (good) => async (dispatch) => {
    try {
        const response = await api.post('/cart/add', good); // Replace with your API endpoint
        dispatch({ type: ADD_TO_CART, payload: response.data });
    } catch (error) {
        dispatch({ type: ADD_TO_CART_ERROR, payload: error.message });
    }
};

// Remove from Cart
export const removeFromCart = (id) => async (dispatch) => {
    try {
        await api.delete(`/cart/delete/${id}`); // Replace with your API endpoint
        dispatch({ type: REMOVE_FROM_CART, payload: id });
    } catch (error) {
        dispatch({ type: REMOVE_FROM_CART_ERROR, payload: error.message });
    }
};

// Add Quantity
export const addQuantity = (id) => async (dispatch) => {
    try {
        const response = await api.patch(`/cart/${id}/add`); // Replace with your API endpoint
        dispatch({ type: ADD_QUANTITY, payload: response.data });
    } catch (error) {
        dispatch({ type: ADD_QUANTITY_ERROR, payload: error.message });
    }
};

// Decrease Quantity
export const decreaseQuantity = (id) => async (dispatch) => {
    try {
        const response = await api.patch(`/cart/${id}/decrease`); // Replace with your API endpoint
        dispatch({ type: DECREASE_QUANTITY, payload: response.data });
    } catch (error) {
        dispatch({ type: DECREASE_QUANTITY_ERROR, payload: error.message });
    }
};

// Clear Cart
export const clearCart = (id) => async (dispatch) => {
    try {
        await api.delete('/cart/delete/all'); // Replace with your API endpoint
        dispatch({ type: CLEAR_CART, payload: id });
    } catch (error) {
        dispatch({ type: CLEAR_CART_ERROR, payload: error.message });
    }
};
