// tiersReducer.js
import {
    FETCH_DONATION_TIERS,
    FETCH_DONATION_TIERS_SUCCESS,
    FETCH_DONATION_TIERS_FAILURE,
    FETCH_PURCHASE_TIERS,
    FETCH_PURCHASE_TIERS_SUCCESS,
    FETCH_PURCHASE_TIERS_FAILURE,
    ADD_DONATION_TIER,
    ADD_DONATION_TIER_SUCCESS,
    ADD_DONATION_TIER_FAILURE,
    ADD_PURCHASE_TIER,
    ADD_PURCHASE_TIER_SUCCESS,
    ADD_PURCHASE_TIER_FAILURE,
    UPDATE_TOTAL_TIERS
} from '../actions/actionTypes';

const initialState = {
    donationTiers: [
        {
            id: null,
            categoryName: [],
            minpoints: 0,
            maxpoints: 0,
            valuePoints: []
        },
    ],
    purchaseTiers: [
        {
            id: null,
            categoryName: '',
            minpoints: 0,
            maxpoints: 0,
            valuePoints: []
        },
    ],
    totalTiers: 0,
    loading: false,
    error: null,
};

const tiersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DONATION_TIERS:
        case FETCH_PURCHASE_TIERS:
        case ADD_DONATION_TIER:
        case ADD_PURCHASE_TIER:
            return { 
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_DONATION_TIERS_SUCCESS:
            return { 
                ...state, 
                loading: false,
                donationTiers: action.payload, // Assuming payload contains an array of donation tiers
            };

        case FETCH_PURCHASE_TIERS_SUCCESS:
            return {
                ...state,
                loading: false,
                purchaseTiers: action.payload, // Assuming payload contains an array of purchase tiers
            };

        case FETCH_DONATION_TIERS_FAILURE:
        case FETCH_PURCHASE_TIERS_FAILURE:
        case ADD_DONATION_TIER_FAILURE:
        case ADD_PURCHASE_TIER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload, // Store error message
            };

        case ADD_DONATION_TIER_SUCCESS:
            return {
                ...state,
                loading: false,
                donationTiers: [...state.donationTiers, action.payload], // Add new donation tier
            };

        case ADD_PURCHASE_TIER_SUCCESS:
            return {
                ...state,
                loading: false,
                purchaseTiers: [...state.purchaseTiers, action.payload], // Add new purchase tier
            };

        case UPDATE_TOTAL_TIERS:
            return {
                ...state,
                totalTiers: action.payload, // Update total tiers
            };

        default:
            return state;
    }
};

export default tiersReducer;
