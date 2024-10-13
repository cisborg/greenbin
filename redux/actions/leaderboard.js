// src/redux/actions/leaderboardActions.js
import axios from 'axios';
import {
    FETCH_SQUAD_LEADERBOARD_REQUEST,
    FETCH_SQUAD_LEADERBOARD_SUCCESS,
    FETCH_SQUAD_LEADERBOARD_FAILURE,
    FETCH_USER_LEADERBOARD_REQUEST,
    FETCH_USER_LEADERBOARD_SUCCESS,
    FETCH_USER_LEADERBOARD_FAILURE,
    UPDATE_LEADERBOARD_REQUEST,
    UPDATE_LEADERBOARD_SUCCESS,
    UPDATE_LEADERBOARD_FAILURE,
} from './actionTypes';

// Fetch squad leaderboard action
export const fetchSquadLeaderboard = () => async (dispatch) => {
    dispatch({ type: FETCH_SQUAD_LEADERBOARD_REQUEST });
    try {
        const response = await axios.get('/api/leaderboard/squad');
        dispatch({ type: FETCH_SQUAD_LEADERBOARD_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_SQUAD_LEADERBOARD_FAILURE, payload: error.message });
    }
};

// Fetch user leaderboard action
export const fetchUserLeaderboard = () => async (dispatch) => {
    dispatch({ type: FETCH_USER_LEADERBOARD_REQUEST });
    try {
        const response = await axios.get('/api/leaderboard/user');
        dispatch({ type: FETCH_USER_LEADERBOARD_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_USER_LEADERBOARD_FAILURE, payload: error.message });
    }
};

// Update leaderboard action
export const updateLeaderboard = (leaderboardData) => async (dispatch) => {
    dispatch({ type: UPDATE_LEADERBOARD_REQUEST });
    try {
        const response = await axios.put('/api/leaderboard', leaderboardData);
        dispatch({ type: UPDATE_LEADERBOARD_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_LEADERBOARD_FAILURE, payload: error.message });
    }
};
