// src/redux/actions/postActions.js
import api from "../../utils/axiosConfig";

import {
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    SHARE_POST_REQUEST,
    SHARE_POST_SUCCESS,
    SHARE_POST_FAILURE,
    GET_ALL_POSTS_REQUEST,
    GET_ALL_POSTS_SUCCESS,
    GET_ALL_POSTS_FAILURE,
    GET_POST_BY_ID_REQUEST,
    GET_POST_BY_ID_SUCCESS,
    GET_POST_BY_ID_FAILURE,
    VIEW_SHARED_POST_REQUEST,
    VIEW_SHARED_POST_SUCCESS,
    VIEW_SHARED_POST_FAILURE,
    UPDATE_POST_REQUEST,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAILURE,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UNLIKE_POST_FAILURE,
    POST_COMMENT_REQUEST,
    POST_COMMENT_SUCCESS,
    POST_COMMENT_FAILURE,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,
    GET_ALL_COMMENTS_REQUEST,
    GET_ALL_COMMENTS_SUCCESS,
    GET_ALL_COMMENTS_FAILURE,
    SAVE_POST_REQUEST,
    SAVE_POST_SUCCESS,
    SAVE_POST_FAILURE,
    UNSAVE_POST_REQUEST,
    UNSAVE_POST_SUCCESS,
    UNSAVE_POST_FAILURE,
} from './actionTypes';

// Create Post action
export const createPost = (postData) => async (dispatch) => {
    dispatch({ type: CREATE_POST_REQUEST });
    try {
        const response = await api.post('/api/create-post', postData);
        dispatch({ type: CREATE_POST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_POST_FAILURE, payload: error.message });
    }
};

// Delete Post action
export const deletePost = (postId) => async (dispatch) => {
    dispatch({ type: DELETE_POST_REQUEST });
    try {
        await api.delete(`/api/delete-post/${postId}`);
        dispatch({ type: DELETE_POST_SUCCESS, payload: postId });
    } catch (error) {
        dispatch({ type: DELETE_POST_FAILURE, payload: error.message });
    }
};

// Share Post action
export const sharePost = (postId) => async (dispatch) => {
    dispatch({ type: SHARE_POST_REQUEST });
    try {
        const response = await api.post(`/api/share-post`, { postId });
        dispatch({ type: SHARE_POST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: SHARE_POST_FAILURE, payload: error.message });
    }
};

// Get All Posts action
export const getAllPosts = () => async (dispatch) => {
    dispatch({ type: GET_ALL_POSTS_REQUEST });
    try {
        const response = await api.get('/api/get-all-posts');
        dispatch({ type: GET_ALL_POSTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_ALL_POSTS_FAILURE, payload: error.message });
    }
};

// Get Post by ID action
export const getPostById = (postId) => async (dispatch) => {
    dispatch({ type: GET_POST_BY_ID_REQUEST });
    try {
        const response = await api.get(`/api/get-post/${postId}`);
        dispatch({ type: GET_POST_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_POST_BY_ID_FAILURE, payload: error.message });
    }
};

// View Shared Post action
export const viewSharedPost = (postId) => async (dispatch) => {
    dispatch({ type: VIEW_SHARED_POST_REQUEST });
    try {
        const response = await api.get(`/api/view-shared-post/${postId}`);
        dispatch({ type: VIEW_SHARED_POST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: VIEW_SHARED_POST_FAILURE, payload: error.message });
    }
};

// Update Post action
export const updatePost = (postId, postData) => async (dispatch) => {
    dispatch({ type: UPDATE_POST_REQUEST });
    try {
        const response = await api.put(`/api/update-post/${postId}`, postData);
        dispatch({ type: UPDATE_POST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_POST_FAILURE, payload: error.message });
    }
};

// Like Post action
export const likePost = (postId) => async (dispatch) => {
    dispatch({ type: LIKE_POST_REQUEST });
    try {
        const response = await api.post(`/api/like-post`, { postId });
        dispatch({ type: LIKE_POST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: LIKE_POST_FAILURE, payload: error.message });
    }
};

// Unlike Post action
export const unlikePost = (postId) => async (dispatch) => {
    dispatch({ type: UNLIKE_POST_REQUEST });
    try {
        const response = await api.post(`/api/unlike-post`, { postId });
        dispatch({ type: UNLIKE_POST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UNLIKE_POST_FAILURE, payload: error.message });
    }
};

// Post Comment action
export const postComment = (postId, commentData) => async (dispatch) => {
    dispatch({ type: POST_COMMENT_REQUEST });
    try {
        const response = await api.post(`/api/post-comment`, { postId, commentData });
        dispatch({ type: POST_COMMENT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: POST_COMMENT_FAILURE, payload: error.message });
    }
};

// Delete Comment action
export const deleteComment = (postId, commentId) => async (dispatch) => {
    dispatch({ type: DELETE_COMMENT_REQUEST });
    try {
        await api.delete(`/api/delete-comment/${postId}/${commentId}`);
        dispatch({ type: DELETE_COMMENT_SUCCESS, payload: commentId });
    } catch (error) {
        dispatch({ type: DELETE_COMMENT_FAILURE, payload: error.message });
    }
};

// Get All Comments action
export const getAllComments = (postId) => async (dispatch) => {
    dispatch({ type: GET_ALL_COMMENTS_REQUEST });
    try {
        const response = await api.get(`/api/get-all-comments/${postId}`);
        dispatch({ type: GET_ALL_COMMENTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_ALL_COMMENTS_FAILURE, payload: error.message });
    }
};

// Save Post action
export const savePost = (postId) => async (dispatch) => {
    dispatch({ type: SAVE_POST_REQUEST });
    try {
        const response = await api.post(`/api/save-post`, { postId });
        dispatch({ type: SAVE_POST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: SAVE_POST_FAILURE, payload: error.message });
    }
};

// Unsaved Post action
export const unsavePost = (postId) => async (dispatch) => {
    dispatch({ type: UNSAVE_POST_REQUEST });
    try {
        const response = await api.post(`/api/unsave-post`, { postId });
        dispatch({ type: UNSAVE_POST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UNSAVE_POST_FAILURE, payload: error.message });
    }
};
