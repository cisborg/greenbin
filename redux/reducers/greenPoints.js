// pointsReducer.js
import {
    FETCH_POINTS,
    DEPOSIT_POINTS,
    DEDUCT_POINTS,
    TRANSFER_POINTS,
    RESET_POINTS
} from '../actions/actionTypes';

const initialState = {
    points: 0, // Total points for the user
};

const pointsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POINTS:
            return { 
                ...state, 
                points: action.payload.points // Assuming payload contains points
            };

        case DEPOSIT_POINTS:
            return {
                ...state,
                points: state.points + action.payload.points // Adding deposited points
            };

        case DEDUCT_POINTS:
            return {
                ...state,
                points: state.points - action.payload.points // Deducting points
            };

        case TRANSFER_POINTS:
            return {
                ...state,
                points: state.points - action.payload.points // Deducting points for transfer
            };

        case RESET_POINTS:
            return initialState; // Resetting points to initial state

        default:
            return state;
    }
};

export default pointsReducer;
