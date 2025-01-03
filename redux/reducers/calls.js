// reducers/callReducer.js
import {
    INITIATE_CALL_REQUEST,
    INITIATE_CALL_SUCCESS,
    INITIATE_CALL_FAILURE,
   
  } from '../actions/actionTypes';
  
  const initialState = {
    streamId: null,
    token:'',
    loading: false,
    error: null,
  };
  
  const callReducer = (state = initialState, action) => {
    switch (action.type) {
      case INITIATE_CALL_REQUEST:
        return { ...state, loading: true };
  
      case INITIATE_CALL_SUCCESS:
        return {
          ...state,
          loading: false,
          streamId: action.payload.streamId,
          token: action.payload.token, // e.g., call ID, participants
        };
  
     
  
      case INITIATE_CALL_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default callReducer;
  