// src/redux/reducers/paymentReducer.js
import {
    DEPOSIT_REQUEST,
    DEPOSIT_SUCCESS,
    DEPOSIT_FAILURE,
    WITHDRAW_REQUEST,
    WITHDRAW_SUCCESS,
    WITHDRAW_FAILURE,
    SEND_POINTS_REQUEST,
    SEND_POINTS_SUCCESS,
    SEND_POINTS_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    totalBalance: 0, // Renamed for clarity
    points: 0,
    loading: false,
    error: null,
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case DEPOSIT_REQUEST:
        case WITHDRAW_REQUEST:
        case SEND_POINTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null, // Reset error on new request
            };
        case DEPOSIT_SUCCESS:
            return {
                ...state,
                loading: false,
                totalBalance: state.totalBalance + action.payload.points, // Assuming points are cash equivalents
            };

        case WITHDRAW_SUCCESS:
            return {
                ...state,
                loading: false,
                totalBalance: state.totalBalance - action.payload.points,
            };

        case SEND_POINTS_SUCCESS:
            return {
                ...state,
                loading: false,
                points: state.points - action.payload.points,
            };

        case DEPOSIT_FAILURE:
        case WITHDRAW_FAILURE:
        case SEND_POINTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default paymentReducer;
