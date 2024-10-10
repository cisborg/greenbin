// actions.js
import {
    CREATE_PROGRESS,
    FETCH_PROGRESS,
    UPDATE_PROGRESS,
    RESET_PROGRESS
} from './actionTypes';
import axios from 'axios';

// Create Progress
export const createProgress = (progress) => async (dispatch) => {
    const response = await axios.post('/api/squad-progress', progress);
    dispatch({ type: CREATE_PROGRESS, payload: response.data });
};

// Fetch Progress
export const fetchProgress = () => async (dispatch) => {
    const response = await axios.get('/api/squad-progress');
    dispatch({ type: FETCH_PROGRESS, payload: response.data });
};

// Fetch Progress by Month

// Update Progress
export const updateProgress = (progress) => async (dispatch) => {
    const response = await axios.put(`/api/squad-progress/${progress.id}`, progress);
    dispatch({ type: UPDATE_PROGRESS, payload: response.data });
};

// Reset Progress (monthly)
export const resetProgress = () => async (dispatch) => {
    const response = await axios.post('/api/squad-progress/reset');
    dispatch({ type: RESET_PROGRESS, payload: response.data });
};
