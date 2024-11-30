import api from '../../utils/axiosConfig';
import {
    CREATE_SQUAD_REQUEST,
    CREATE_SQUAD_SUCCESS,
    CREATE_SQUAD_FAILURE,
    FETCH_SQUADS_DATA_REQUEST,
    FETCH_SQUADS_DATA_SUCCESS,
    FETCH_SQUADS_DATA_FAILURE,
    REQUEST_JOIN_SQUAD_REQUEST,
    REQUEST_JOIN_SQUAD_SUCCESS,
    REQUEST_JOIN_SQUAD_FAILURE,
    APPROVE_JOIN_REQUEST_REQUEST,
    APPROVE_JOIN_REQUEST_SUCCESS,
    APPROVE_JOIN_REQUEST_FAILURE,
    REMOVE_MEMBER_REQUEST,
    REMOVE_MEMBER_SUCCESS,
    REMOVE_MEMBER_FAILURE,
    ADD_MEMBER_REQUEST,
    ADD_MEMBER_SUCCESS,
    ADD_MEMBER_FAILURE,
    LEAVE_SQUAD_REQUEST,
    LEAVE_SQUAD_SUCCESS,
    LEAVE_SQUAD_FAILURE,
    DELETE_SQUAD_REQUEST,
    DELETE_SQUAD_SUCCESS,
    DELETE_SQUAD_FAILURE,
    GET_ALL_SQUADS_REQUEST,
    GET_ALL_SQUADS_SUCCESS,
    GET_ALL_SQUADS_FAILURE,
    UPDATE_SQUAD_REQUEST,
    UPDATE_SQUAD_SUCCESS,
    UPDATE_SQUAD_FAILURE,
} from './actionTypes';

// Create Squad action
export const createSquad = (squadData) => async (dispatch) => {
    dispatch({ type: CREATE_SQUAD_REQUEST });
    try {
        const response = await api.post('/squad/create', squadData);
        if (response.data.status === 'success') {
            dispatch({ type: CREATE_SQUAD_SUCCESS, payload: response.data.squadData });
        }
    } catch (error) {
        dispatch({ type: CREATE_SQUAD_FAILURE, payload: error.message });
    }
};

// fetch squash data
export const fetchSquadData = () => async (dispatch) => {
    dispatch({ type: FETCH_SQUADS_DATA_REQUEST });
    try {
        const response = await api.get('/api/squash-data');
        dispatch({ type: FETCH_SQUADS_DATA_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_SQUADS_DATA_FAILURE, payload: error.message });
    }
};

// Request to Join Squad action
export const requestJoinSquad = (squadId, userId) => async (dispatch) => {
    dispatch({ type: REQUEST_JOIN_SQUAD_REQUEST });
    try {
        const response = await api.post('/squad/join/request', { squadId, userId });
        dispatch({ type: REQUEST_JOIN_SQUAD_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: REQUEST_JOIN_SQUAD_FAILURE, payload: error.message });
    }
};

// Approve Join Request action
export const approveJoinRequest = (squadId, userId) => async (dispatch) => {
    dispatch({ type: APPROVE_JOIN_REQUEST_REQUEST });
    try {
        const response = await api.post('/squad/members/approve', { squadId, userId });
        dispatch({ type: APPROVE_JOIN_REQUEST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: APPROVE_JOIN_REQUEST_FAILURE, payload: error.message });
    }
};

// Remove Member from Squad action
export const removeMember = (squadId, userId) => async (dispatch) => {
    dispatch({ type: REMOVE_MEMBER_REQUEST });
    try {
        const response = await api.post('/squad/members/delete', { squadId, userId });
        dispatch({ type: REMOVE_MEMBER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: REMOVE_MEMBER_FAILURE, payload: error.message });
    }
};

// Add Members to Squad action
export const addMembers = (squadId, members) => async (dispatch) => {
    dispatch({ type: ADD_MEMBER_REQUEST });
    try {
        const response = await api.post('/squad/add', { squadId, members });
        dispatch({ type: ADD_MEMBER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: ADD_MEMBER_FAILURE, payload: error.message });
    }
};

// Leave Squad action
export const leaveSquad = (squadId, userId) => async (dispatch) => {
    dispatch({ type: LEAVE_SQUAD_REQUEST });
    try {
        const response = await api.post('/squad/leave', { squadId, userId });
        dispatch({ type: LEAVE_SQUAD_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: LEAVE_SQUAD_FAILURE, payload: error.message });
    }
};

// Delete Squad action
export const deleteSquad = (squadId) => async (dispatch) => {
    dispatch({ type: DELETE_SQUAD_REQUEST });
    try {
        const response = await api.delete(`/squad/delete/${squadId}`, squadData);
        dispatch({ type: DELETE_SQUAD_SUCCESS, payload: response.data.squadData });
    } catch (error) {
        dispatch({ type: DELETE_SQUAD_FAILURE, payload: error.message });
    }
};

// Get All Squads action
export const getAllSquads = () => async (dispatch) => {
    dispatch({ type: GET_ALL_SQUADS_REQUEST });
    try {
        const response = await api.get('/squad/all', squads);
        dispatch({ type: GET_ALL_SQUADS_SUCCESS, payload: response.data.squads });
    } catch (error) {
        dispatch({ type: GET_ALL_SQUADS_FAILURE, payload: error.message });
    }
};

// Update Squad action
export const updateSquad = (squadId, squadData) => async (dispatch) => {
    dispatch({ type: UPDATE_SQUAD_REQUEST });
    try {
        const response = await api.put(`/squad/update/${squadId}`, squadData);
        dispatch({ type: UPDATE_SQUAD_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_SQUAD_FAILURE, payload: error.message });
    }
};
