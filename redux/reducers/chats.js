import {
    FETCH_CHATS_REQUEST,
    FETCH_CHATS_SUCCESS,
    FETCH_CHATS_FAILURE,
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_FAILURE,
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILURE,
    DELETE_MESSAGE_REQUEST,
    DELETE_MESSAGE_SUCCESS,
    DELETE_MESSAGE_FAILURE,
    DELETE_CHAT_REQUEST,
    DELETE_CHAT_SUCCESS,
    DELETE_CHAT_FAILURE,
    UPDATE_MESSAGE_STATUS_REQUEST,
    UPDATE_MESSAGE_STATUS_SUCCESS,
    UPDATE_MESSAGE_STATUS_FAILURE,
    UPDATE_CHAT_STATUS_REQUEST,
    UPDATE_CHAT_STATUS_SUCCESS,
    UPDATE_CHAT_STATUS_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    chats: [],
    chatDetails: null,
    loading: false,
    error: null,
    activeChatId: null,
    currentPage: 1,
    totalPages: 0,
    hasMore: true,
    messages: [],
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        // Grouping loading cases
        case FETCH_CHATS_REQUEST:
        case FETCH_MESSAGES_REQUEST:
        case SEND_MESSAGE_REQUEST:
        case DELETE_MESSAGE_REQUEST:
        case DELETE_CHAT_REQUEST:
        case UPDATE_MESSAGE_STATUS_REQUEST:
        case UPDATE_CHAT_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        // Handling success cases
        case FETCH_CHATS_SUCCESS:
            return {
                ...state,
                loading: false,
                chats: action.payload.chats,
                totalPages: action.payload.totalPages,
                hasMore: action.payload.hasMore,
            };

        case FETCH_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                messages: action.payload.messages,
                totalPages: action.payload.totalPages,
                hasMore: action.payload.hasMore,

            };

        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                messages: [...state.messages, action.payload],
            };

        case DELETE_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                messages: state.messages.filter(message => message.id !== action.payload),
            };

        case DELETE_CHAT_SUCCESS:
            return {
                ...state,
                loading: false,
                chats: state.chats.filter(chat => chat.id !== action.payload),
                messages: [], // Clear messages if chat is deleted
            };

        case UPDATE_MESSAGE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                messages: state.messages.map(message =>
                    message.id === action.payload.id ? { ...message, status: action.payload.status } : message
                ),
            };

        case UPDATE_CHAT_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                chats: state.chats.map(chat =>
                    chat.id === action.payload.id ? { ...chat, status: action.payload.status } : chat
                ),
            };

        // Grouping failure cases
        case FETCH_CHATS_FAILURE:
        case FETCH_MESSAGES_FAILURE:
        case SEND_MESSAGE_FAILURE:
        case DELETE_MESSAGE_FAILURE:
        case DELETE_CHAT_FAILURE:
        case UPDATE_MESSAGE_STATUS_FAILURE:
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
