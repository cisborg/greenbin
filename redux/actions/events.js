// actions.js
import {
    CREATE_SQUAD_ACTIVITY,
    DELETE_SQUAD_ACTIVITY,
    UPDATE_SQUAD_ACTIVITY,
    FETCH_SQUAD_ACTIVITIES
} from './actionTypes';
import api from "../../utils/axiosConfig";

// Add Squad Activity
export const addSquadActivity = (activity) => async (dispatch) => {
    const response = await api.post('/api/squad-activities', activity); // Replaced with API
    dispatch({ type: CREATE_SQUAD_ACTIVITY, payload: response.data });
};

// Remove Squad Activity
export const removeSquadActivity = (id) => async (dispatch) => {
    await api.delete(`/api/squad-activities/${id}`); // Replaced with API
    dispatch({ type: DELETE_SQUAD_ACTIVITY, payload: id });
};

// Update Squad Activity
export const updateSquadActivity = (activity) => async (dispatch) => {
    const response = await api.put(`/api/squad-activities/${activity.id}`, activity); // Replaced with API
    dispatch({ type: UPDATE_SQUAD_ACTIVITY, payload: response.data });
};

// Fetch Squad Activities
export const fetchSquadActivities = () => async (dispatch) => {
    const response = await api.get('/api/squad-activities'); // Replaced with API
    dispatch({ type: FETCH_SQUAD_ACTIVITIES, payload: response.data });
};
