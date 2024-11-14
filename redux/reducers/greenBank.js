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
    Balance: 0, // Renamed for clarity
    points: 0,
    loading: false,
    error: null,
    greenBankBalance: 0, // Assume Green Bank balance is stored separately
};

const greenBankReducer = (state = initialState, action) => {
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
                Balance: state.Balance + action.payload.points, // Assuming points are cash equivalents
            };

        case WITHDRAW_SUCCESS:
            return {
                ...state,
                loading: false,
                Balance: state.Balance - action.payload.points,
            };

        case SEND_POINTS_SUCCESS:
            return {
                ...state,
                loading: false,
                points: Math.max(0, state.points - action.payload.points), // Ensure points don't go negative
            };
        case UPDATE_GREEN_BANK_BALANCE:
            return {
                ...state,
                greenBankBalance: state.greenBankBalance + action.payload, // Update Green Bank balance
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

export default greenBankReducer;
