// actions.js
import {
    CREATE_SQUAD_ACTIVITY,
    DELETE_SQUAD_ACTIVITY,
    UPDATE_SQUAD_ACTIVITY,
    FETCH_SQUAD_ACTIVITIES
} from './actionTypes';
import axios from 'axios';

// Add Squad Activity
export const addSquadActivity = (activity) => async (dispatch) => {
    const response = await axios.post('/api/squad-activities', activity); // Replace with your API endpoint
    dispatch({ type: CREATE_SQUAD_ACTIVITY, payload: response.data });
};

// Remove Squad Activity
export const removeSquadActivity = (id) => async (dispatch) => {
    await axios.delete(`/api/squad-activities/${id}`); // Replace with your API endpoint
    dispatch({ type: DELETE_SQUAD_ACTIVITY, payload: id });
};

// Update Squad Activity
export const updateSquadActivity = (activity) => async (dispatch) => {
    const response = await axios.put(`/api/squad-activities/${activity.id}`, activity); // Replace with your API endpoint
    dispatch({ type: UPDATE_SQUAD_ACTIVITY, payload: response.data });
};

// Fetch Squad Activities
export const fetchSquadActivities = () => async (dispatch) => {
    const response = await axios.get('/api/squad-activities'); // Replace with your API endpoint
    dispatch({ type: FETCH_SQUAD_ACTIVITIES, payload: response.data });
};
