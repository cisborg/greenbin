// squadLeaderboardReducer.js
import {
    FETCH_SQUAD_LEADERBOARD,
    UPDATE_SQUAD_LEADERBOARD,
    RESET_SQUAD_LEADERBOARD
} from '../actions/actionTypes';

const initialState = {
    totalTiers: 0,         // Total number of tiers from all members in the squad
    squadCapacity: 0,      // Maximum capacity of the squad
    percentageReached: 0,   // Percentage of capacity reached
    awardType: '',         // Type of award earned by the squad
};

const squadLeaderboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SQUAD_LEADERBOARD:
            return { 
                ...state, 
                ...action.payload 
            }; // Expecting payload to contain the new state

        case UPDATE_SQUAD_LEADERBOARD:
            return {
                ...state,
                ...action.payload // Update state with new values
            };

        case RESET_SQUAD_LEADERBOARD:
            return initialState; // Reset to initial state

        default:
            return state;
    }
};

export default squadLeaderboardReducer;
