// src/redux/reducers/leaderboardReducer.js
import {
    FETCH_SQUAD_LEADERBOARD_REQUEST,
    FETCH_SQUAD_LEADERBOARD_SUCCESS,
    FETCH_SQUAD_LEADERBOARD_FAILURE,
    FETCH_USER_LEADERBOARD_REQUEST,
    FETCH_USER_LEADERBOARD_SUCCESS,
    FETCH_USER_LEADERBOARD_FAILURE,
    UPDATE_LEADERBOARD_REQUEST,
    UPDATE_LEADERBOARD_SUCCESS,
    UPDATE_LEADERBOARD_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    squadLeaderboard: [],
    userLeaderboard: [],
    loading: false,
    error: null,
};

const leaderboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SQUAD_LEADERBOARD_REQUEST:
        case FETCH_USER_LEADERBOARD_REQUEST:
        case UPDATE_LEADERBOARD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_SQUAD_LEADERBOARD_SUCCESS:
            return {
                ...state,
                loading: false,
                squadLeaderboard: action.payload,
            };

        case FETCH_USER_LEADERBOARD_SUCCESS:
            return {
                ...state,
                loading: false,
                userLeaderboard: action.payload,
            };

        case UPDATE_LEADERBOARD_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case FETCH_SQUAD_LEADERBOARD_FAILURE:
        case FETCH_USER_LEADERBOARD_FAILURE:
        case UPDATE_LEADERBOARD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default leaderboardReducer;
