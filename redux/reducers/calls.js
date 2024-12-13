// reducers/callReducer.js
import {
    INITIATE_CALL_REQUEST,
    INITIATE_CALL_SUCCESS,
    INITIATE_CALL_FAILURE,
    END_CALL_REQUEST,
    END_CALL_SUCCESS,
    END_CALL_FAILURE,
  } from '../actions/actionTypes';
  
  const initialState = {
    isCalling: false,
    callInProgress: false,
    callDetails: null,
    token:'',
    loading: false,
    error: null,
  };
  
  const callReducer = (state = initialState, action) => {
    switch (action.type) {
      case INITIATE_CALL_REQUEST:
      case END_CALL_REQUEST:
        return { ...state, loading: true };
  
      case INITIATE_CALL_SUCCESS:
        return {
          ...state,
          loading: false,
          isCalling: true,
          callInProgress: true,
          token: action.payload.token, // e.g., call ID, participants
        };
  
      case END_CALL_SUCCESS:
        return {
          ...state,
          loading: false,
          isCalling: false,
          callInProgress: false,
          callDetails: null, // Clear call details after ending
        };
  
      case INITIATE_CALL_FAILURE:
      case END_CALL_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default callReducer;
  