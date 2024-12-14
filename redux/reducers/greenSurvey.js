// reducers/wasteReducer.js
import {
    FETCH_WASTE_REQUEST,
    FETCH_WASTE_SUCCESS,
    FETCH_WASTE_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    wasteCollected: 0,
    uploadedForm: null, // To store the uploaded form data
    loading: false,
    squad: '',
    error: null,
};

const wasteReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_WASTE_REQUEST:
            return { ...state, loading: true, error:null };
        case FETCH_WASTE_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                squad: action.payload,
                wasteCollected: action.payload.wasteCollected,
                uploadedForm: action.payload.uploadedForm // Store the uploaded form data
            };
        case FETCH_WASTE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default wasteReducer;
