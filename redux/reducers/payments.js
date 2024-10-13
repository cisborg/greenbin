// src/redux/reducers/paymentReducer.js
import {
    DEPOSIT_REQUEST,
    DEPOSIT_SUCCESS,
    DEPOSIT_FAILURE,
    WITHDRAW_REQUEST,
    WITHDRAW_SUCCESS,
    WITHDRAW_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    balance: 0,
    loading: false,
    error: null,
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case DEPOSIT_REQUEST:
        case WITHDRAW_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case DEPOSIT_SUCCESS:
            return {
                ...state,
                loading: false,
                balance: state.balance + action.payload.amount,
            };

        case WITHDRAW_SUCCESS:
            return {
                ...state,
                loading: false,
                balance: state.balance - action.payload.amount,
            };

        case DEPOSIT_FAILURE:
        case WITHDRAW_FAILURE:
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
