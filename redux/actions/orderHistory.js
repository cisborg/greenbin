// actions.js
import {
    CREATE_ORDER,
    FETCH_ORDER,
    DELETE_ORDER,
    UPDATE_ORDER
} from './actionTypes';
import axios from 'axios';

// Add Order
export const createOrder = (order) => async (dispatch) => {
    const response = await axios.post('/api/orders', order); // Replace with your API endpoint
    dispatch({ type: CREATE_ORDER, payload: response.data });
};

// Check Order
export const fetchOrder = (id) => async (dispatch) => {
    const response = await axios.get(`/api/orders/${id}`); // Replace with your API endpoint
    dispatch({ type: FETCH_ORDER, payload: response.data });
};

// Remove Order
export const deleteOrder = (id) => ({
    type: DELETE_ORDER,
    payload: id,
});

// Update Order
export const updateOrder = (order) => ({
    type: UPDATE_ORDER,
    payload: order,
});
