// leaderboardReducer.js
import {
    FETCH_LEADERBOARD,
    UPDATE_LEADERBOARD,
    RESET_LEADERBOARD
} from '../actions/actionTypes';

const initialState = {
    leaderboard: [],
};

const leaderboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LEADERBOARD:
            return { ...state, leaderboard: action.payload };

        case UPDATE_LEADERBOARD:
            return {
                ...state,
                leaderboard: state.leaderboard.map(user =>
                    user.id === action.payload.id ? action.payload : user
                ),
            };

        case RESET_LEADERBOARD:
            return { ...state, leaderboard: [] }; // Resetting the leaderboard

        default:
            return state;
    }
};

export default leaderboardReducer;
