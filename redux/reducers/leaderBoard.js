import {
    FETCH_SQUAD_LEADERBOARD_REQUEST,
    FETCH_SQUAD_LEADERBOARD_SUCCESS,
    FETCH_SQUAD_LEADERBOARD_FAILURE,
    FETCH_USER_LEADERBOARD_REQUEST,
    FETCH_USER_LEADERBOARD_SUCCESS,
    FETCH_USER_LEADERBOARD_FAILURE,
    UPDATE_SQUAD_LEADERBOARD_REQUEST,
    UPDATE_SQUAD_LEADERBOARD_SUCCESS,
    UPDATE_SQUAD_LEADERBOARD_FAILURE,
    UPDATE_USER_LEADERBOARD_REQUEST,
    UPDATE_USER_LEADERBOARD_SUCCESS,
    UPDATE_USER_LEADERBOARD_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    squadLeaderboard: [
    {
        id: null,
        squadName: '',
        rank: null,
        awardType: null,
        profilelogo: null,
        points: null,
        membersCount: 0,
        activitiesCompleted: 0 },
    ],
    
    userLeaderboard: [
    {
        id: null,
        username: '',
        rank: 0,
        awardType: '',
        profilePicture: null,
        points: 0,
        squadName: '',
        crown: false
    },
    ],
    loading: false,
    error: null,
};

const leaderboardReducer = (state = initialState, action) => {
    switch (action.type) {
        // Request actions (loading)
        case FETCH_SQUAD_LEADERBOARD_REQUEST:
        case FETCH_USER_LEADERBOARD_REQUEST:
        case UPDATE_SQUAD_LEADERBOARD_REQUEST:
        case UPDATE_USER_LEADERBOARD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        // Fetch success actions (update leaderboard data)
        case FETCH_SQUAD_LEADERBOARD_SUCCESS:
            return {
                ...state,
                loading: false,
                squadLeaderboard: action.payload.squadLeaderboard,
            };

        case FETCH_USER_LEADERBOARD_SUCCESS:
            return {
                ...state,
                loading: false,
                userLeaderboard: action.payload.userLeaderboard,
            };

        // Update success actions (successfully updated leaderboard)
        case UPDATE_SQUAD_LEADERBOARD_SUCCESS:
            return {
                ...state,
                loading: false,
                squadLeaderboard: action.payload.squadLeaderboard, // Update squad leaderboard after update
            };

        case UPDATE_USER_LEADERBOARD_SUCCESS:
            return {
                ...state,
                loading: false,
                userLeaderboard: action.payload.userLeaderboard, // Update user leaderboard after update
            };

        // Failure actions (error handling)
        case FETCH_SQUAD_LEADERBOARD_FAILURE:
        case FETCH_USER_LEADERBOARD_FAILURE:
        case UPDATE_SQUAD_LEADERBOARD_FAILURE:
        case UPDATE_USER_LEADERBOARD_FAILURE:
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
