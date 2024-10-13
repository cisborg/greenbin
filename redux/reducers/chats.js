// src/redux/reducers/chatReducer.js
import {
    FETCH_CHATS_REQUEST,
    FETCH_CHATS_SUCCESS,
    FETCH_CHATS_FAILURE,
    SEND_CHAT_REQUEST,
    SEND_CHAT_SUCCESS,
    SEND_CHAT_FAILURE,
    DELETE_CHAT_REQUEST,
    DELETE_CHAT_SUCCESS,
    DELETE_CHAT_FAILURE,
    UPDATE_CHAT_STATUS_REQUEST,
    UPDATE_CHAT_STATUS_SUCCESS,
    UPDATE_CHAT_STATUS_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    chats: [],
    loading: false,
    error: null,
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CHATS_REQUEST:
        case SEND_CHAT_REQUEST:
        case DELETE_CHAT_REQUEST:
        case UPDATE_CHAT_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_CHATS_SUCCESS:
            return {
                ...state,
                loading: false,
                chats: action.payload,
            };

        case SEND_CHAT_SUCCESS:
            return {
                ...state,
                loading: false,
                chats: [...state.chats, action.payload],
            };

        case DELETE_CHAT_SUCCESS:
            return {
                ...state,
                loading: false,
                chats: state.chats.filter(chat => chat.id !== action.payload),
            };

        case UPDATE_CHAT_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                chats: state.chats.map(chat =>
                    chat.id === action.payload.id ? { ...chat, status: action.payload.status } : chat
                ),
            };

        case FETCH_CHATS_FAILURE:
        case SEND_CHAT_FAILURE:
        case DELETE_CHAT_FAILURE:
        case UPDATE_CHAT_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default chatReducer;
