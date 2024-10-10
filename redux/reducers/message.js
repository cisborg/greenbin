// messagesReducer.js
import {
    CREATE_MESSAGE,
    UPDATE_MESSAGE,
    DELETE_MESSAGE,
    FETCH_MESSAGES
} from '../actions/actionTypes';

const initialState = {
    messages: [],
};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MESSAGES:
            return {
                ...state,
                messages: action.payload // Assuming payload contains an array of messages
            };

        case CREATE_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload] // Add new message
            };

        case UPDATE_MESSAGE:
            return {
                ...state,
                messages: state.messages.map(message =>
                    message.id === action.payload.id ? action.payload : message // Update specific message
                )
            };

        case DELETE_MESSAGE:
            return {
                ...state,
                messages: state.messages.filter(message => message.id !== action.payload) // Remove deleted message
            };

        default:
            return state;
    }
};

export default messagesReducer;
