import {
    CREATE_ACTIVITY,
    DELETE_ACTIVITY,
    UPDATE_ACTIVITY,
    FETCH_ACTIVITIES,
    FETCH_ACTIVITIES_SUCCESS,
    FETCH_ACTIVITIES_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    activities: [
        {
            id: null,
            name: '',
            description: '',
            startDate: null,
            endDate: null,
            squadId: null,
            squadName: '',
            milestone: null,
        },
    ],
    loading: false,
    error: null,
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
};

const activitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ACTIVITIES:
            return { ...state, loading: true, error: null }; // Set loading to true
        case FETCH_ACTIVITIES_SUCCESS:
            return { 
                ...state, 
                activities: action.payload, 
                loading: false 
            }; // Set loading to false on success
        case FETCH_ACTIVITIES_FAILURE:
            return { 
                ...state, 
                loading: false, 
                error: action.payload // Handle error
            };
        case CREATE_ACTIVITY:
            return { 
                ...state, 
                activities: [...state.activities, action.payload] 
            };
        case DELETE_ACTIVITY:
            return { 
                ...state, 
                activities: state.activities.filter(activity => activity.id !== action.payload) 
            };
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
