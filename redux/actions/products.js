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
} from './actionTypes';

// Fetch all products action
export const fetchProducts = () => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
        const response = await api.get('/product');
        if (response.data.status === "success") {
            dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
        } else {
            dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: response.data.message });
        }
    } catch (error) {
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
    }
};


export const fetchLatest = () => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
        const response = await api.get('//latest');
        if (response.data.status === "success") {
            dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
        } else {
            dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: response.data.message });
        }
    } catch (error) {
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
    }
};

export const fetchRecommended = () => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
        const response = await api.get('/product/recommended');
        if (response.data.status === "success") {
            dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
        } else {
            dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: response.data.message });
        }
    } catch (error) {
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
    }
};
export const fetchFlashsale = () => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
        const response = await api.get('/product/flashsale');
        if (response.data.status === "success") {
            dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
        } else {
            dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: response.data.message });
        }
    } catch (error) {
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
    }
};
// Create product action
export const createProduct = (productData) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    try {
        const response = await api.post('/product/create', productData);
        // Check if the response status is success
        if (response.data.status === "success") {
            dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: response.data });
        } else {
            dispatch({ type: CREATE_PRODUCT_FAILURE, payload: response.data.message });
        }
    } catch (error) {
        dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
    }
};


// Update product action
export const updateProduct = (productId, updatedData) => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    try {
        const formData = new FormData();

        // Append text fields
        if (updatedData.name) formData.append("name", updatedData.name);
        if (updatedData.description) formData.append("description", updatedData.description);
        if (updatedData.price) formData.append("price", updatedData.price);
        if (updatedData.quantity) formData.append("quantity", updatedData.quantity);
        if (updatedData.category) formData.append("category", updatedData.category);
        
        // Append the file (image) if it exists
        if (updatedData.image) {
            updatedData.image.forEach((img, index) => {
                formData.append(`image[${index}]`, {
                    uri: img.uri, // Path to the image
                    type: img.type || "image/jpeg", // MIME type
                    name: img.name || `image${index}.jpg`, // File name
                });
            });
        }

        const response = await api.put(`/product/update/${productId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.data.status === "success") {
            dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: response.data });
        } else {
            dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: response.data.message });
        }
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};



// Delete product action
export const deleteProduct = (productId) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    try {
        await api.delete(`/product/${productId}`);
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
    } catch (error) {
        dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
    }
};

// Purchase product action
export const purchaseProduct = (productId, quantity) => async (dispatch) => {
    dispatch({ type: PURCHASE_PRODUCT_REQUEST });
    try {
        const response = await api.post(`/product/request-payment`, { productId, quantity });
        dispatch({ type: PURCHASE_PRODUCT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: PURCHASE_PRODUCT_FAILURE, payload: error.message });
    }
};

// Subscribe to product action
export const subscribeProduct = (productId) => async (dispatch) => {
    dispatch({ type: SUBSCRIBE_PRODUCT_REQUEST });
    try {
        const response = await api.post(`/product/subscribe`, { productId });
        
        // Check if the response status is success
        if (response.data.status === "success") {
            const subscriptionData = response.data.data.subscription; // Extract subscription data
            dispatch({ type: SUBSCRIBE_PRODUCT_SUCCESS, payload: subscriptionData });
        } else {
            dispatch({ type: SUBSCRIBE_PRODUCT_FAILURE, payload: response.data.message });
        }
    } catch (error) {
        dispatch({
            type: SUBSCRIBE_PRODUCT_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Cancel subscription action
export const cancelSubscription = (productId) => async (dispatch) => {
    dispatch({ type: CANCEL_SUBSCRIPTION_REQUEST });
    try {
        const response = await api.delete(`/product/delete/subscription/${productId}`);
        
        // Check if the response status is success
        if (response.data.status === "success") {
            dispatch({ type: CANCEL_SUBSCRIPTION_SUCCESS, payload: response.data.message });
        } else {
            dispatch({ type: CANCEL_SUBSCRIPTION_FAILURE, payload: response.data.message });
        }
    } catch (error) {
        dispatch({
            type: CANCEL_SUBSCRIPTION_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};


