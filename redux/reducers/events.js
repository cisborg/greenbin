// reducers/squadActivitiesReducer.js

import {
    CREATE_SQUAD_ACTIVITY,
    DELETE_SQUAD_ACTIVITY,
    UPDATE_SQUAD_ACTIVITY,
    FETCH_SQUAD_ACTIVITIES,
    SQUAD_ACTIVITY_LOADING,
    SQUAD_ACTIVITY_ERROR,
} from '../actions/actionTypes';

// Initial state for squad activities
const initialState = {
    activities: [], // List of squad activities
    newActivity: {  // Structure for the activity being created
        id: null,
        title: '',
        description: '',
        date: '',
        location: '',
        image: null, // Placeholder for image data
    },
    loading: false, // Indicates if data is being fetched or mutated
    error: null, // Stores error messages, if any
    successMessage: '', // Stores success messages for operations
};

// Squad activities reducer
const squadActivitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        // Loading state
        case SQUAD_ACTIVITY_LOADING:
            return {
                ...state,
                loading: true,
                error: null, // Clear previous errors
                successMessage: '', // Clear previous success messages
            };

        // Create a new squad activity
        case CREATE_SQUAD_ACTIVITY:
            return {
                ...state,
                loading: false,
                activities: [
                    ...state.activities,
                    {
                        ...state.newActivity, // Use data from `newActivity` as the base
                        ...action.payload,   // Merge payload data
                    },
                ],
                newActivity: initialState.newActivity, // Reset `newActivity`
                successMessage: 'Activity created successfully!', // Notify success
            };

        // Delete an existing squad activity
        case DELETE_SQUAD_ACTIVITY:
            return {
                ...state,
                loading: false,
                activities: state.activities.filter(
                    (activity) => activity.id !== action.payload // Remove by ID
                ),
                successMessage: 'Activity deleted successfully!', // Notify success
            };

        // Update an existing squad activity
        case UPDATE_SQUAD_ACTIVITY:
            return {
                ...state,
                loading: false,
                activities: state.activities.map((activity) =>
                    activity.id === action.payload.id
                        ? { ...activity, ...action.payload } // Merge updated data
                        : activity
                ),
                successMessage: 'Activity updated successfully!', // Notify success
            };

        // Fetch all squad activities
        case FETCH_SQUAD_ACTIVITIES:
            return {
                ...state,
                loading: false,
                activities: action.payload.map((activity) => ({
                    ...activity,
                    image: activity.image || null, // Ensure image field exists
                })),
            };

        // Handle errors
        case SQUAD_ACTIVITY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload, // Set the error message
            };

        // Default case: return current state
        default:
            return state;
    }
};

export default squadActivitiesReducer;
