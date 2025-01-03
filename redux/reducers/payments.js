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
    REQUEST_PAYMENT_REQUEST,
    REQUEST_PAYMENT_SUCCESS,
    REQUEST_PAYMENT_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    greenBalance: 0, // Renamed for clarity
    points: 0,
    loading: true,
    error: null,
    greenBankBalance: 0,

};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case DEPOSIT_REQUEST:
        case WITHDRAW_REQUEST:
        case REQUEST_PAYMENT_REQUEST:
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
                greenBalance: state.greenBalance + action.payload.points, // Assuming points are cash equivalents
            };

        case WITHDRAW_SUCCESS:
            return {
                ...state,
                loading: false,
                greenBalance: state.greenBalance - action.payload.points,
            };
        case REQUEST_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
            };

            
        case SEND_POINTS_REQUEST:
        case SEND_POINTS_SUCCESS:
            return {
                ...state,
                loading: false,
                points: Math.max(0, state.points - action.payload.points), // Ensure points don't go negative
            };
        

        case DEPOSIT_FAILURE:
        case WITHDRAW_FAILURE:
        case REQUEST_PAYMENT_FAILURE:
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
