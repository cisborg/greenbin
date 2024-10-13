// src/redux/actions/adminActions.js
import axios from 'axios';
import {
    FETCH_ADMINS_REQUEST,
    FETCH_ADMINS_SUCCESS,
    FETCH_ADMINS_FAILURE,
    ADD_ADMIN_REQUEST,
    ADD_ADMIN_SUCCESS,
    ADD_ADMIN_FAILURE,
    DELETE_ADMIN_REQUEST,
    DELETE_ADMIN_SUCCESS,
    DELETE_ADMIN_FAILURE,
    UPDATE_ADMIN_CREDENTIALS_REQUEST,
    UPDATE_ADMIN_CREDENTIALS_SUCCESS,
    UPDATE_ADMIN_CREDENTIALS_FAILURE,
    UPDATE_ADMIN_PASSWORD_REQUEST,
    UPDATE_ADMIN_PASSWORD_SUCCESS,
    UPDATE_ADMIN_PASSWORD_FAILURE,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    DELETE_SQUAD_REQUEST,
    DELETE_SQUAD_SUCCESS,
    DELETE_SQUAD_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
} from './actionTypes';

// Fetch all admins action
export const fetchAdmins = () => async (dispatch) => {
    dispatch({ type: FETCH_ADMINS_REQUEST });
    try {
        const response = await axios.get('/api/admins');
        dispatch({ type: FETCH_ADMINS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_ADMINS_FAILURE, payload: error.message });
    }
};

// Add admin action
export const addAdmin = (adminData) => async (dispatch) => {
    dispatch({ type: ADD_ADMIN_REQUEST });
    try {
        const response = await axios.post('/api/admins', adminData);
        dispatch({ type: ADD_ADMIN_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: ADD_ADMIN_FAILURE, payload: error.message });
    }
};

// Delete admin action
export const deleteAdmin = (adminId) => async (dispatch) => {
    dispatch({ type: DELETE_ADMIN_REQUEST });
    try {
        await axios.delete(`/api/admins/${adminId}`);
        dispatch({ type: DELETE_ADMIN_SUCCESS, payload: adminId });
    } catch (error) {
        dispatch({ type: DELETE_ADMIN_FAILURE, payload: error.message });
    }
};

// Update admin credentials action
export const updateAdminCredentials = (adminId, adminData) => async (dispatch) => {
    dispatch({ type: UPDATE_ADMIN_CREDENTIALS_REQUEST });
    try {
        const response = await axios.put(`/api/admins/${adminId}`, adminData);
        dispatch({ type: UPDATE_ADMIN_CREDENTIALS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_ADMIN_CREDENTIALS_FAILURE, payload: error.message });
    }
};

// Update admin password action
export const updateAdminPassword = (adminId, newPassword) => async (dispatch) => {
    dispatch({ type: UPDATE_ADMIN_PASSWORD_REQUEST });
    try {
        const response = await axios.put(`/api/admins/${adminId}/password`, { password: newPassword });
        dispatch({ type: UPDATE_ADMIN_PASSWORD_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_ADMIN_PASSWORD_FAILURE, payload: error.message });
    }
};

// Fetch all users action
export const fetchUsers = () => async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    try {
        const response = await axios.get('/api/users');
        dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
    }
};

// Delete squad action
export const deleteSquad = (squadId) => async (dispatch) => {
    dispatch({ type: DELETE_SQUAD_REQUEST });
    try {
        await axios.delete(`/api/squads/${squadId}`);
        dispatch({ type: DELETE_SQUAD_SUCCESS, payload: squadId });
    } catch (error) {
        dispatch({ type: DELETE_SQUAD_FAILURE, payload: error.message });
    }
};

// Delete product action
export const deleteProduct = (productId) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    try {
        await axios.delete(`/api/products/${productId}`);
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
    } catch (error) {
        dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
    }
};
