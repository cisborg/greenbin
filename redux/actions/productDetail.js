import {
    FETCH_PRODUCTS,
    FETCH_PRODUCT_DETAILS,
    UPDATE_PRODUCT,
    REMOVE_PRODUCT,
    RESET_PRODUCT_DETAILS
} from './actionTypes';
import axios from 'axios';

// Fetch Products
export const fetchProducts = () => async (dispatch) => {
    const response = await axios.get('/api/products'); // Replace with your API endpoint
    dispatch({ type: FETCH_PRODUCTS, payload: response.data });
};

// Fetch Product Details
export const fetchProductDetails = (id) => async (dispatch) => {
    const response = await axios.get(`/api/products/${id}`); // Replace with your API endpoint
    dispatch({ type: FETCH_PRODUCT_DETAILS, payload: response.data });
};

// Update Product
export const updateProduct = (product) => ({
    type: UPDATE_PRODUCT,
    payload: product,
});

// Remove Product
export const removeProduct = (id) => ({
    type: REMOVE_PRODUCT,
    payload: id,
});

// Reset Product Details
export const resetProductDetails = () => ({
    type: RESET_PRODUCT_DETAILS,
});
