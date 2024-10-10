// actions.js
import {
    FETCH_SQUAD_LEADERBOARD,
    UPDATE_SQUAD_LEADERBOARD,
    RESET_SQUAD_LEADERBOARD
} from './actionTypes';
import axios from 'axios';

// Fetch Squad Leaderboard
export const fetchSquadLeaderboard = (squadId) => async (dispatch) => {
    const response = await axios.get(`/api/squad-leaderboard/${squadId}`);
    dispatch({ type: FETCH_SQUAD_LEADERBOARD, payload: response.data });
};

// Update Squad Leaderboard
export const updateSquadLeaderboard = (squadData) => async (dispatch) => {
    const response = await axios.put(`/api/squad-leaderboard`, squadData);
    dispatch({ type: UPDATE_SQUAD_LEADERBOARD, payload: response.data });
};

// Reset Squad Leaderboard
export const resetSquadLeaderboard = () => async (dispatch) => {
    const response = await axios.post('/api/squad-leaderboard/reset');
    dispatch({ type: RESET_SQUAD_LEADERBOARD, payload: response.data });
};
