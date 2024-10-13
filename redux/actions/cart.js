import {
    FETCH_GOODS,
    ADD_GOOD,
    REMOVE_GOOD,
    UPDATE_GOOD,
    ADD_TO_CART,
    ADD_QUANTITY,
    DECREASE_QUANTITY
} from './actionTypes';

import axios from 'axios';

// Fetch Goods
export const fetchGoods = () => async (dispatch) => {
    const response = await axios.get('/api/goods'); // Replace with your API endpoint
    dispatch({ type: FETCH_GOODS, payload: response.data });
};

// Add Good
export const addGood = (good) => ({
    type: ADD_GOOD,
    payload: good,
});

// Remove Good
export const removeGood = (id) => ({
    type: REMOVE_GOOD,
    payload: id,
});

// Update Good
export const updateGood = (good) => ({
    type: UPDATE_GOOD,
    payload: good,
});

// Add to Cart
export const addToCart = (good) => ({
    type: ADD_TO_CART,
    payload: good,
});

// Add Quantity
export const addQuantity = (id) => ({
    type: ADD_QUANTITY,
    payload: id,
});

// Decrease Quantity
export const decreaseQuantity = (id) => ({
    type: DECREASE_QUANTITY,
    payload: id,
});
