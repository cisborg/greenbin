// messagesActions.js
import {
    CREATE_MESSAGE,
    UPDATE_MESSAGE,
    DELETE_MESSAGE,
    FETCH_MESSAGES
} from './actionTypes';
import axios from 'axios';

// Create Message
export const createMessage = (messageData) => async (dispatch) => {
    const response = await axios.post(`/api/messages`, messageData);
    dispatch({ type: CREATE_MESSAGE, payload: response.data });
};

// Update Message
export const updateMessage = (messageId, updatedData) => async (dispatch) => {
    const response = await axios.put(`/api/messages/${messageId}`, updatedData);
    dispatch({ type: UPDATE_MESSAGE, payload: response.data });
};

// Delete Message
export const deleteMessage = (messageId) => async (dispatch) => {
    await axios.delete(`/api/messages/${messageId}`);
    dispatch({ type: DELETE_MESSAGE, payload: messageId });
};

// Fetch Messages
export const fetchMessages = (userId) => async (dispatch) => {
    const response = await axios.get(`/api/messages/${userId}`);
    dispatch({ type: FETCH_MESSAGES, payload: response.data });
};
