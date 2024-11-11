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
} from './actionTypes';
import api from "../../utils/axiosConfig";

// Fetch chats action
export const fetchChats = () => async (dispatch) => {
    dispatch({ type: FETCH_CHATS_REQUEST });
    try {
        const response = await api.get('/api/chats');
        dispatch({ type: FETCH_CHATS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_CHATS_FAILURE, payload: error.message });
    }
};

// Fetch messages action
export const fetchMessages = (chatId) => async (dispatch) => {
    dispatch({ type: FETCH_MESSAGES_REQUEST });
    try {
        const response = await api.get(`/api/chats/${chatId}/messages`);
        dispatch({ type: FETCH_MESSAGES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_MESSAGES_FAILURE, payload: error.message });
    }
};

// Send message action
export const sendMessage = (chatId, message) => async (dispatch) => {
    dispatch({ type: SEND_MESSAGE_REQUEST });
    try {
        const response = await api.post(`/api/chats/${chatId}/messages`, { message });
        dispatch({ type: SEND_MESSAGE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: SEND_MESSAGE_FAILURE, payload: error.message });
    }
};

// Delete message action
export const deleteMessage = (chatId, messageId) => async (dispatch) => {
    dispatch({ type: DELETE_MESSAGE_REQUEST });
    try {
        await api.delete(`/api/chats/${chatId}/messages/${messageId}`);
        dispatch({ type: DELETE_MESSAGE_SUCCESS, payload: messageId });
    } catch (error) {
        dispatch({ type: DELETE_MESSAGE_FAILURE, payload: error.message });
    }
};

// Delete chat action
export const deleteChat = (chatId) => async (dispatch) => {
    dispatch({ type: DELETE_CHAT_REQUEST });
    try {
        await api.delete(`/api/chats/${chatId}`);
        dispatch({ type: DELETE_CHAT_SUCCESS, payload: chatId });
    } catch (error) {
        dispatch({ type: DELETE_CHAT_FAILURE, payload: error.message });
    }
};

// Update message status action
export const updateMessageStatus = (chatId, messageId, status) => async (dispatch) => {
    dispatch({ type: UPDATE_MESSAGE_STATUS_REQUEST });
    try {
        const response = await api.put(`/api/chats/${chatId}/messages/${messageId}`, { status });
        dispatch({ type: UPDATE_MESSAGE_STATUS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_MESSAGE_STATUS_FAILURE, payload: error.message });
    }
};

// Update chat status action
export const updateChatStatus = (chatId, status) => async (dispatch) => {
    dispatch({ type: UPDATE_CHAT_STATUS_REQUEST });
    try {
        const response = await api.put(`/api/chats/${chatId}`, { status });
        dispatch({ type: UPDATE_CHAT_STATUS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_CHAT_STATUS_FAILURE, payload: error.message });
    }
};
