// src/redux/reducers/reportReducer.js
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
} from '../actions/actionTypes';

const initialState = {
    reports: [],
    reportDetails:{
        id: null,
        title: '',
        description: '',
        image: '',
        location: '',
        date: '',
    },
    loading: false,
    error: null,
};

const reportReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_REPORT_REQUEST:
        case GET_ALL_REPORTS_REQUEST:
        case DELETE_REPORT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case CREATE_REPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                reports: [...state.reports, action.payload],
            };

        case GET_ALL_REPORTS_SUCCESS:
            return {
                ...state,
                loading: false,
                reports: action.payload,
            };

        case DELETE_REPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                reports: state.reports.filter(report => report.id !== action.payload),
            };

        case CREATE_REPORT_FAILURE:
        case GET_ALL_REPORTS_FAILURE:
        case DELETE_REPORT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default reportReducer;
