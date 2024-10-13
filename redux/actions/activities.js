// actions.js
import {
    CREATE_ACTIVITY,
    DELETE_ACTIVITY,
    UPDATE_ACTIVITY,
    FETCH_ACTIVITIES
} from './actionTypes';
import axios from 'axios';

// Add Activity
export const addActivity = (activity) => async (dispatch) => {
    const response = await axios.post('/api/activities', activity); // Replace with your API endpoint
    dispatch({ type: CREATE_ACTIVITY, payload: response.data });
};

// Remove Activity
export const removeActivity = (id) => async (dispatch) => {
    await axios.delete(`/api/activities/${id}`); // Replace with your API endpoint
    dispatch({ type: DELETE_ACTIVITY, payload: id });
};

// Update Activity
export const updateActivity = (activity) => async (dispatch) => {
    const response = await axios.put(`/api/activities/${activity.id}`, activity); // Replace with your API endpoint
    dispatch({ type: UPDATE_ACTIVITY, payload: response.data });
};

// Fetch Activities
export const fetchActivities = () => async (dispatch) => {
    const response = await axios.get('/api/activities'); // Replace with your API endpoint
    dispatch({ type: FETCH_ACTIVITIES, payload: response.data });
};
