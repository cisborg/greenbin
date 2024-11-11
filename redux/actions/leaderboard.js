import {
    FETCH_SQUAD_LEADERBOARD_REQUEST,
    FETCH_SQUAD_LEADERBOARD_SUCCESS,
    FETCH_SQUAD_LEADERBOARD_FAILURE,
    FETCH_USER_LEADERBOARD_REQUEST,
    FETCH_USER_LEADERBOARD_SUCCESS,
    FETCH_USER_LEADERBOARD_FAILURE,
    UPDATE_SQUAD_LEADERBOARD_REQUEST,
    UPDATE_SQUAD_LEADERBOARD_SUCCESS,
    UPDATE_SQUAD_LEADERBOARD_FAILURE,
    UPDATE_USER_LEADERBOARD_REQUEST,
    UPDATE_USER_LEADERBOARD_SUCCESS,
    UPDATE_USER_LEADERBOARD_FAILURE,
} from './actionTypes';
import api from "../../utils/axiosConfig";

// Fetch squad leaderboard action
export const fetchSquadLeaderboard = () => async (dispatch) => {
    dispatch({ type: FETCH_SQUAD_LEADERBOARD_REQUEST });
    try {
        const response = await api.get('/api/leaderboard/squad'); // API call to fetch squad leaderboard
        dispatch({ type: FETCH_SQUAD_LEADERBOARD_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_SQUAD_LEADERBOARD_FAILURE, payload: error.message });
    }
};

// Fetch user leaderboard action
export const fetchUserLeaderboard = () => async (dispatch) => {
    dispatch({ type: FETCH_USER_LEADERBOARD_REQUEST });
    try {
        const response = await api.get('/api/leaderboard/user'); // API call to fetch user leaderboard
        dispatch({ type: FETCH_USER_LEADERBOARD_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_USER_LEADERBOARD_FAILURE, payload: error.message });
    }
};

// Update squad leaderboard action
export const updateSquadLeaderboard = (leaderboardData) => async (dispatch) => {
    dispatch({ type: UPDATE_SQUAD_LEADERBOARD_REQUEST });
    try {
        const response = await api.put('/api/leaderboard/squad', leaderboardData); // API call to update squad leaderboard
        dispatch({ type: UPDATE_SQUAD_LEADERBOARD_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_SQUAD_LEADERBOARD_FAILURE, payload: error.message });
    }
};

// Update user leaderboard action
export const updateUserLeaderboard = (leaderboardData) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_LEADERBOARD_REQUEST });
    try {
        const response = await api.put('/api/leaderboard/user', leaderboardData); // API call to update user leaderboard
        dispatch({ type: UPDATE_USER_LEADERBOARD_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_USER_LEADERBOARD_FAILURE, payload: error.message });
    }
};
