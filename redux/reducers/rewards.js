import {
    FETCH_PURCHASE_TIERS,
    FETCH_PURCHASE_TIERS_SUCCESS,
    FETCH_PURCHASE_TIERS_FAILURE,
    FETCH_DONATION_TIERS,
    FETCH_DONATION_TIERS_SUCCESS,
    FETCH_DONATION_TIERS_FAILURE,
    UPDATE_TOTAL_TIERS,
    FETCH_COINS,
    FETCH_COINS_SUCCESS,
    FETCH_COINS_FAILURE,
    FETCH_COUPON_GIFTS,
    FETCH_COUPON_GIFTS_SUCCESS,
    FETCH_COUPON_GIFTS_FAILURE,
    FETCH_GREEN_CARBON_POINTS,
    FETCH_GREEN_CARBON_POINTS_SUCCESS,
    FETCH_GREEN_CARBON_POINTS_FAILURE,
    FETCH_VOUCHERS,
    FETCH_VOUCHERS_SUCCESS,
    FETCH_VOUCHERS_FAILURE,
    FETCH_GREEN_GIFTS,
    FETCH_GREEN_GIFTS_SUCCESS,
    FETCH_GREEN_GIFTS_FAILURE,
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
    coins: 0, // State for coins
    couponGifts: 0, // State for coupon gifts
    greenCarbonPoints: 0, // State for green carbon points
    vouchers: 0, // State for vouchers
    greenGifts: [], // State for green gifts
    totalTiers: 0,
    loading: false,
    error: null,
};

const tiersReducer = (state = initialState, action) => {
    switch (action.type) {
        // Loading States
        case FETCH_DONATION_TIERS:
        case FETCH_PURCHASE_TIERS:
        case FETCH_COINS:
        case FETCH_COUPON_GIFTS:
        case FETCH_GREEN_CARBON_POINTS:
        case FETCH_VOUCHERS:
        case FETCH_GREEN_GIFTS:
            return { 
                ...state,
                loading: true,
                error: null,
            };

        // Success States
        case FETCH_DONATION_TIERS_SUCCESS:
            return { 
                ...state, 
                loading: false,
                donationTiers: action.payload,
            };

        case FETCH_PURCHASE_TIERS_SUCCESS:
            return {
                ...state,
                loading: false,
                purchaseTiers: action.payload,
            };

        case FETCH_COINS_SUCCESS:
            return {
                ...state,
                loading: false,
                coins: action.payload, // Update coins
            };

        case FETCH_COUPON_GIFTS_SUCCESS:
            return {
                ...state,
                loading: false,
                couponGifts: action.payload, // Update coupon gifts
            };

        case FETCH_GREEN_CARBON_POINTS_SUCCESS:
            return {
                ...state,
                loading: false,
                greenCarbonPoints: action.payload, // Update green carbon points
            };

        case FETCH_VOUCHERS_SUCCESS:
            return {
                ...state,
                loading: false,
                vouchers: action.payload, // Update vouchers
            };

        case FETCH_GREEN_GIFTS_SUCCESS:
            return {
                ...state,
                loading: false,
                greenGifts: action.payload, // Update green gifts
            };


        // Failure States
        case FETCH_DONATION_TIERS_FAILURE:
        case FETCH_PURCHASE_TIERS_FAILURE:
        case FETCH_COINS_FAILURE:
        case FETCH_COUPON_GIFTS_FAILURE:
        case FETCH_GREEN_CARBON_POINTS_FAILURE:
        case FETCH_VOUCHERS_FAILURE:
        case FETCH_GREEN_GIFTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Update Total Tiers
        case UPDATE_TOTAL_TIERS:
            return {
                ...state,
                totalTiers: action.payload,
            };

        default:
            return state;
    }
};

export default tiersReducer;
