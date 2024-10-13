// tiersReducer.js
import {
    FETCH_DONATION_TIERS,
    FETCH_PURCHASE_TIERS,
    UPDATE_TOTAL_TIERS
} from '../actions/actionTypes';

const initialState = {
    donationTiers: 0,
    purchaseTiers: 0,
    totalTiers: 0,
};

const tiersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DONATION_TIERS:
            return { 
                ...state, 
                donationTiers: action.payload.donationTiers // Assuming payload contains donation tiers
            };

        case FETCH_PURCHASE_TIERS:
            return {
                ...state,
                purchaseTiers: action.payload.purchaseTiers // Assuming payload contains purchase tiers
            };

        case UPDATE_TOTAL_TIERS:
            return {
                ...state,
                totalTiers: action.payload // Update total tiers
            };

        default:
            return state;
    }
};

export default tiersReducer;
