// actions.js
import {
    FETCH_LEADERBOARD,
    UPDATE_LEADERBOARD,
    RESET_LEADERBOARD
} from './actionTypes';
import axios from 'axios';

// Fetch Leaderboard
export const fetchLeaderboard = () => async (dispatch) => {
    const response = await axios.get('/api/leaderboard');
    dispatch({ type: FETCH_LEADERBOARD, payload: response.data });
};

// Update Leaderboard
export const updateLeaderboard = (leaderboardData) => async (dispatch) => {
    const response = await axios.put('/api/leaderboard', leaderboardData);
    dispatch({ type: UPDATE_LEADERBOARD, payload: response.data });
};

// Reset Leaderboard
export const resetLeaderboard = () => async (dispatch) => {
    const response = await axios.post('/api/leaderboard/reset');
    dispatch({ type: RESET_LEADERBOARD, payload: response.data });
};
