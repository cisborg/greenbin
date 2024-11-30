// src/redux/actions/reportActions.js
import api from "../../utils/axiosConfig";

import {
    CREATE_REPORT_REQUEST,
    CREATE_REPORT_SUCCESS,
    CREATE_REPORT_FAILURE,
    GET_ALL_REPORTS_REQUEST,
    GET_ALL_REPORTS_SUCCESS,
    GET_ALL_REPORTS_FAILURE,
    DELETE_REPORT_REQUEST,
    DELETE_REPORT_SUCCESS,
    DELETE_REPORT_FAILURE,
} from './actionTypes';

// Create Report action
export const createReport = (reportData) => async (dispatch) => {
    dispatch({ type: CREATE_REPORT_REQUEST });
    try {
        const response = await api.post('/report/create', reportData);
        dispatch({ type: CREATE_REPORT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_REPORT_FAILURE, payload: error.message });
    }
};

// Get All Reports action
export const getAllReports = () => async (dispatch) => {
    dispatch({ type: GET_ALL_REPORTS_REQUEST });
    try {
        const response = await api.get('/report/find/all');
        dispatch({ type: GET_ALL_REPORTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_ALL_REPORTS_FAILURE, payload: error.message });
    }
};

// Delete Report action
export const deleteReport = (reportId) => async (dispatch) => {
    dispatch({ type: DELETE_REPORT_REQUEST });
    try {
        await api.delete(`/report/delete/${reportId}`);
        dispatch({ type: DELETE_REPORT_SUCCESS, payload: reportId });
    } catch (error) {
        dispatch({ type: DELETE_REPORT_FAILURE, payload: error.message });
    }
};
