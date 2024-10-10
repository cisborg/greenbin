// actions.js
import {
    FETCH_POINTS,
    DEPOSIT_POINTS,
    DEDUCT_POINTS,
    TRANSFER_POINTS,
    RESET_POINTS
} from './actionTypes';
import axios from 'axios';

// Fetch User Points
export const fetchPoints = (userId) => async (dispatch) => {
    const response = await axios.get(`/api/points/${userId}`);
    dispatch({ type: FETCH_POINTS, payload: response.data });
};

// Deposit Points
export const depositPoints = (userId, points) => async (dispatch) => {
    const response = await axios.post(`/api/points/deposit`, { userId, points });
    dispatch({ type: DEPOSIT_POINTS, payload: response.data });
};

// Deduct Points
export const deductPoints = (userId, points) => async (dispatch) => {
    const response = await axios.post(`/api/points/deduct`, { userId, points });
    dispatch({ type: DEDUCT_POINTS, payload: response.data });
};

// Transfer Points
export const transferPoints = (fromUserId, toUserId, points) => async (dispatch) => {
    const response = await axios.post(`/api/points/transfer`, { fromUserId, toUserId, points });
    dispatch({ type: TRANSFER_POINTS, payload: response.data });
};

// Reset Points
export const resetPoints = (userId) => async (dispatch) => {
    const response = await axios.post(`/api/points/reset`, { userId });
    dispatch({ type: RESET_POINTS, payload: response.data });
};
