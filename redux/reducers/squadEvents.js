// squadActivitiesReducer.js
import {
    CREATE_SQUAD_ACTIVITY,
    DELETE_SQUAD_ACTIVITY,
    UPDATE_SQUAD_ACTIVITY,
    FETCH_SQUAD_ACTIVITIES
} from '../actions/actionTypes';

const initialState = {
    squadActivities: [],
};

const squadActivitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SQUAD_ACTIVITIES:
            return { ...state, squadActivities: action.payload };
        case CREATE_SQUAD_ACTIVITY:
            return { ...state, squadActivities: [...state.squadActivities, action.payload] };
        case DELETE_SQUAD_ACTIVITY:
            return { ...state, squadActivities: state.squadActivities.filter(activity => activity.id !== action.payload) };
        case UPDATE_SQUAD_ACTIVITY:
            return {
                ...state,
                squadActivities: state.squadActivities.map(activity =>
                    activity.id === action.payload.id ? action.payload : activity
                ),
            };
        default:
            return state;
    }
};

export default squadActivitiesReducer;
