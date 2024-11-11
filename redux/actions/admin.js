// src/redux/actions/adminActions.js
import api from "../../utils/axiosConfig";
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
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_USER_REQUEST,
} from './actionTypes';

// Fetch all admins action
export const fetchAdmins = () => async (dispatch) => {
    dispatch({ type: FETCH_ADMINS_REQUEST });
    try {
        const response = await api.get('/api/admins');
        dispatch({ type: FETCH_ADMINS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_ADMINS_FAILURE, payload: error.message });
    }
};

// Add admin action
export const addAdmin = (adminData) => async (dispatch) => {
    dispatch({ type: ADD_ADMIN_REQUEST });
    try {
        const response = await api.post('/api/admins', adminData);
        dispatch({ type: ADD_ADMIN_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: ADD_ADMIN_FAILURE, payload: error.message });
    }
};

// Delete admin action
export const deleteAdmin = (adminId) => async (dispatch) => {
    dispatch({ type: DELETE_ADMIN_REQUEST });
    try {
        await api.delete(`/api/admins/${adminId}`);
        dispatch({ type: DELETE_ADMIN_SUCCESS, payload: adminId });
    } catch (error) {
        dispatch({ type: DELETE_ADMIN_FAILURE, payload: error.message });
    }
};

// Update admin credentials action
export const updateAdminCredentials = (adminId, adminData) => async (dispatch) => {
    dispatch({ type: UPDATE_ADMIN_CREDENTIALS_REQUEST });
    try {
        const response = await api.put(`/api/admins/${adminId}`, adminData);
        dispatch({ type: UPDATE_ADMIN_CREDENTIALS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_ADMIN_CREDENTIALS_FAILURE, payload: error.message });
    }
};

// Update admin password action
export const updateAdminPassword = (adminId, newPassword) => async (dispatch) => {
    dispatch({ type: UPDATE_ADMIN_PASSWORD_REQUEST });
    try {
        const response = await api.put(`/api/admins/${adminId}/password`, { password: newPassword });
        dispatch({ type: UPDATE_ADMIN_PASSWORD_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_ADMIN_PASSWORD_FAILURE, payload: error.message });
    }
};

// Fetch all users action
export const fetchUsers = () => async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    try {
        const response = await api.get('/api/users');
        dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
    }
};

// Delete squad action
export const deleteSquad = (squadId) => async (dispatch) => {
    dispatch({ type: DELETE_SQUAD_REQUEST });
    try {
        await api.delete(`/api/squads/${squadId}`);
        dispatch({ type: DELETE_SQUAD_SUCCESS, payload: squadId });
    } catch (error) {
        dispatch({ type: DELETE_SQUAD_FAILURE, payload: error.message });
    }
};

// Create product action
export const createProduct = (productData) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    try {
        const response = await api.post('/api/products', productData);
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


 // Delete User action
 export const deleteUser = (userId) => async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });
    try {
      const response = await api.delete(` api/delete-user/${userId}`);
      dispatch({ type: DELETE_USER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
    }
  };


// Update User action
export const updateUser = (userId, userData) => async (dispatch) => {
   dispatch({ type: UPDATE_USER_REQUEST });
   try {
    const response = await api.put(`/user/update${userId}`, userData);
     dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
     dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });   }
 };
