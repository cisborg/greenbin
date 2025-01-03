// actions/callActions.js
import api from '../../utils/axiosConfig';
import {
  INITIATE_CALL_REQUEST,
  INITIATE_CALL_SUCCESS,
  INITIATE_CALL_FAILURE,

} from './actionTypes';

// Action to initiate a call
// Action to initiate a call
export const initiateCall = (callDetails) => async (dispatch) => {
  const { user, callId } = callDetails;

  dispatch({ type: INITIATE_CALL_REQUEST });
  try {
    // Make the API call to create the token and stream ID
    const response = await api.post('/call/token/create', {userId: user.id, callId}); // Replace with your API endpoint

    // Dispatch the success action with the response data (make sure it's correctly structured)
    dispatch({
      type: INITIATE_CALL_SUCCESS,
      payload: {
        streamId: response.data.streamId, // Assuming this is the structure of the response
        token: response.data.token,         // Ensure token is correctly returned in the response
      },
    });
  } catch (error) {
    // Dispatch the failure action with a clear error message
    dispatch({
      type: INITIATE_CALL_FAILURE,
      payload: error.response ? error.response.data.message : error.message, // Provide better error handling
    });
  }
};


// Action to end a call