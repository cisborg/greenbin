// callsActions.js
import {
    CREATE_CALL,
    CANCEL_CALL,
    FETCH_CALLS
} from './actionTypes';
import axios from 'axios';

// Create Call
export const createCall = (callData) => async (dispatch) => {
    const response = await axios.post(`/api/calls`, callData);
    dispatch({ type: CREATE_CALL, payload: response.data });
};

// Cancel Call
export const cancelCall = (callId) => async (dispatch) => {
    await axios.delete(`/api/calls/${callId}`);
    dispatch({ type: CANCEL_CALL, payload: callId });
};

// Fetch Calls
export const fetchCalls = (userId) => async (dispatch) => {
    const response = await axios.get(`/api/calls/${userId}`);
    dispatch({ type: FETCH_CALLS, payload: response.data });
};
