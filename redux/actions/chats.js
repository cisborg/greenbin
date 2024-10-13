// src/redux/actions/chatActions.js
import axios from 'axios';
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
} from './actionTypes';

// Fetch chats action
export const fetchChats = () => async (dispatch) => {
    dispatch({ type: FETCH_CHATS_REQUEST });
    try {
        const response = await axios.get('/api/chats');
        dispatch({ type: FETCH_CHATS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_CHATS_FAILURE, payload: error.message });
    }
};

// Send chat message action
export const sendChat = (message) => async (dispatch) => {
    dispatch({ type: SEND_CHAT_REQUEST });
    try {
        const response = await axios.post('/api/chats', { message });
        dispatch({ type: SEND_CHAT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: SEND_CHAT_FAILURE, payload: error.message });
    }
};

// Delete chat action
export const deleteChat = (chatId) => async (dispatch) => {
    dispatch({ type: DELETE_CHAT_REQUEST });
    try {
        await axios.delete(`/api/chats/${chatId}`);
        dispatch({ type: DELETE_CHAT_SUCCESS, payload: chatId });
    } catch (error) {
        dispatch({ type: DELETE_CHAT_FAILURE, payload: error.message });
    }
};

// Update chat status action
export const updateChatStatus = (chatId, status) => async (dispatch) => {
    dispatch({ type: UPDATE_CHAT_STATUS_REQUEST });
    try {
        const response = await axios.put(`/api/chats/${chatId}`, { status });
        dispatch({ type: UPDATE_CHAT_STATUS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_CHAT_STATUS_FAILURE, payload: error.message });
    }
};
