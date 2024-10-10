// squadReducer.js
import {
    CREATE_PROGRESS,
    FETCH_PROGRESS,
    UPDATE_PROGRESS,
    RESET_PROGRESS
} from '../actions/actionTypes';

const initialState = {
    squadProgress: {
        percentage: 0,
        tasksCompleted: 0,
        totalTasks: 0,
    },
};

const squadProgress = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PROGRESS:
            return { ...state, squadProgress: action.payload };

        case UPDATE_PROGRESS:
            return { ...state, squadProgress: { ...state.squadProgress, ...action.payload } };

    
        case FETCH_PROGRESS:
            return { ...state, squadProgress: action.payload };
            
        case RESET_PROGRESS:
            return { ...state, squadProgress: { percentage: 0, tasksCompleted: 0, totalTasks: 0 } };

        default:
            return state;
    }
};

export default squadProgress;
