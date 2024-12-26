// src/redux/actions/shoppingActions.js

import api from '../../utils/axiosConfig';
import {
    CREATE_LIST_REQUEST,
    CREATE_LIST_SUCCESS,
    CREATE_LIST_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    JOIN_LIST_REQUEST,
    JOIN_LIST_SUCCESS,
    JOIN_LIST_FAILURE,
    ACCEPT_NOTIFICATION_REQUEST,
    ACCEPT_NOTIFICATION_SUCCESS,
    ACCEPT_NOTIFICATION_FAILURE,
    REWARD_USER_REQUEST,
    REWARD_USER_SUCCESS,
    REWARD_USER_FAILURE,
} from './actionTypes';

// Create a shopping list
export const createList = (listCode, userId) => async (dispatch) => {
    dispatch({ type: CREATE_LIST_REQUEST });
    try {
        const response = await api.post('/shopping/create', { listCode, userId });
        dispatch({ type: CREATE_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_LIST_FAILURE, payload: error.message });
    }
};

// Fetch products for a specific list
export const fetchProducts = (listCode) => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
        const response = await api.get(`/shopping/${listCode}/products`); // Replace with your API endpoint
        dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
    }
};

// Fetch users and their shopping lists
export const fetchUsers = () => async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    try {
        const response = await api.get('/shopping/users'); // Replace with your API endpoint
        dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
    }
};

// Join an existing shopping list
export const joinList = (listCode, userId) => async (dispatch) => {
    dispatch({ type: JOIN_LIST_REQUEST });
    try {
        const response = await api.post(`/shopping/join`, { listCode, userId });
        dispatch({ type: JOIN_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: JOIN_LIST_FAILURE, payload: error.message });
    }
};

// Accept a notification
export const acceptNotification = (userId) => async (dispatch) => {
    dispatch({ type: ACCEPT_NOTIFICATION_REQUEST });
    try {
        const response = await api.post(`/notifications/accept`, { userId });
        dispatch({ type: ACCEPT_NOTIFICATION_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: ACCEPT_NOTIFICATION_FAILURE, payload: error.message });
    }
};

// Reward a user for accepting a join request
export const rewardUser = (userId) => async (dispatch) => {
    dispatch({ type: REWARD_USER_REQUEST });
    try {
        const response = await api.post(`/rewards/issue`, { userId });
        dispatch({ type: REWARD_USER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: REWARD_USER_FAILURE, payload: error.message });
    }
};
