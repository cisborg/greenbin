// reducers/squadActivitiesReducer.js
import {
    CREATE_SQUAD_ACTIVITY,
    DELETE_SQUAD_ACTIVITY,
    UPDATE_SQUAD_ACTIVITY,
    FETCH_SQUAD_ACTIVITIES,
    SQUAD_ACTIVITY_LOADING,
    SQUAD_ACTIVITY_ERROR,
} from '../actions/actionTypes';

const initialState = {
    activities: [],
    activityDetails:{
        id: null,
        title: '',
        description: '',
        date: '',
        location: '',
        image: null, // For storing image data
    },
    loading: false,
    error: null,
    successMessage: '', // For success confirmation messages
};

const squadActivitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SQUAD_ACTIVITY_LOADING:
            return {
                ...state,
                loading: true,
                error: null,
                successMessage: '',
            };

        case CREATE_SQUAD_ACTIVITY:
            return {
                ...state,
                loading: false,
                activities: [
                    ...state.activities,
                    {
                        ...state.activityDetails, // Use data from activityDetails
                        id: action.payload.id, // Ensure ID comes from the server response
                        image: action.payload.image || null, // Ensure image field is set
                    },
                ],
                activityDetails: initialState.activityDetails, // Reset form data
                successMessage: 'Activity created successfully!',
            };
            
        case DELETE_SQUAD_ACTIVITY:
            return {
                ...state,
                loading: false,
                activities: state.activities.filter(activity => activity.id !== action.payload),
                successMessage: 'Activity deleted successfully!',
            };

        case UPDATE_SQUAD_ACTIVITY:
            return {
                ...state,
                loading: false,
                activities: state.activities.map(activity =>
                    activity.id === action.payload.id 
                        ? { ...activity, ...action.payload, image: action.payload.image || activity.image }
                        : activity
                ),
                successMessage: 'Activity updated successfully!',
            };

        case FETCH_SQUAD_ACTIVITIES:
            return {
                ...state,
                loading: false,
                activities: action.payload.map(activity => ({
                    ...activity,
                    image: activity.image || null, // Ensure each activity has an image field
                })),
            };

        case SQUAD_ACTIVITY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default squadActivitiesReducer;
