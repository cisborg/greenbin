// callsReducer.js
import {
    CREATE_CALL,
    CANCEL_CALL,
    FETCH_CALLS
} from '../actions/actionTypes';

const initialState = {
    calls: [],
};

const callsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CALLS:
            return {
                ...state,
                calls: action.payload // Assuming payload contains an array of calls
            };

        case CREATE_CALL:
            return {
                ...state,
                calls: [...state.calls, action.payload] // Add new call
            };

        case CANCEL_CALL:
            return {
                ...state,
                calls: state.calls.filter(call => call.id !== action.payload) // Remove canceled call
            };

        default:
            return state;
    }
};

export default callsReducer;
