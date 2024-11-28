// actions/callActions.js
import api from '../../utils/axiosConfig';
import {
  INITIATE_CALL_REQUEST,
  INITIATE_CALL_SUCCESS,
  INITIATE_CALL_FAILURE,
  END_CALL_REQUEST,
  END_CALL_SUCCESS,
  END_CALL_FAILURE,
} from './actionTypes';

// Action to initiate a call
export const initiateCall = (callDetails) => async (dispatch) => {
  dispatch({ type: INITIATE_CALL_REQUEST });
  try {
    const response = await api.post('/api/initiate-call', callDetails); // Replace with your API endpoint
    dispatch({ type: INITIATE_CALL_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: INITIATE_CALL_FAILURE, payload: error.message });
  }
};

// Action to end a call
export const endCall = (callId) => async (dispatch) => {
  dispatch({ type: END_CALL_REQUEST });
  try {
    const response = await api.post(`/api/end-call/${callId}`); // Replace with your API endpoint
    dispatch({ type: END_CALL_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: END_CALL_FAILURE, payload: error.message });
  }
};
