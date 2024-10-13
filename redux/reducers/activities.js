// activitiesReducer.js
import {
    CREATE_ACTIVITY,
    DELETE_ACTIVITY,
    UPDATE_ACTIVITY,
    FETCH_ACTIVITIES
} from '../actions/actionTypes';

const initialState = {
    activities: [],
};

const activitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ACTIVITIES:
            return { ...state, activities: action.payload };
        case CREATE_ACTIVITY:
            return { ...state, activities: [...state.activities, action.payload] };
        case DELETE_ACTIVITY:
            return { ...state, activities: state.activities.filter(activity => activity.id !== action.payload) };
        case UPDATE_ACTIVITY:
            return {
                ...state,
                activities: state.activities.map(activity =>
                    activity.id === action.payload.id ? action.payload : activity
                ),
            };
        default:
            return state;
    }
};

export default activitiesReducer;
