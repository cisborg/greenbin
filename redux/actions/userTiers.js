// src/redux/actions/tiersActions.js
import {
    ADD_PURCHASE_TIER,
    ADD_PURCHASE_TIER_SUCCESS,
    ADD_PURCHASE_TIER_FAILURE,
    ADD_DONATION_TIER,
    ADD_DONATION_TIER_SUCCESS,
    ADD_DONATION_TIER_FAILURE,
    FETCH_PURCHASE_TIERS,
    FETCH_PURCHASE_TIERS_SUCCESS,
    FETCH_PURCHASE_TIERS_FAILURE,
    FETCH_DONATION_TIERS,
    FETCH_DONATION_TIERS_SUCCESS,
    FETCH_DONATION_TIERS_FAILURE,
    UPDATE_TOTAL_TIERS
} from './actionTypes';
import api from '../../utils/axiosConfig';

// Fetch Donation Tiers
export const fetchDonationTiers = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_DONATION_TIERS });
    try {
        const response = await api.get(`/api/tiers/donations/${userId}`);
        dispatch({ type: FETCH_DONATION_TIERS_SUCCESS, payload: response.data });
    } catch (error) {
        console.error("Error fetching donation tiers:", error);
        dispatch({ type: FETCH_DONATION_TIERS_FAILURE, payload: error });
    }
};

// Fetch Purchase Tiers
export const fetchPurchaseTiers = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_PURCHASE_TIERS });
    try {
        const response = await api.get(`/api/tiers/purchases/${userId}`);
        dispatch({ type: FETCH_PURCHASE_TIERS_SUCCESS, payload: response.data });
    } catch (error) {
        console.error("Error fetching purchase tiers:", error);
        dispatch({ type: FETCH_PURCHASE_TIERS_FAILURE, payload: error });
    }
};

// Add Donation Tier
export const addDonationTier = (userId, tierData) => async (dispatch) => {
    dispatch({ type: ADD_DONATION_TIER });
    try {
        const response = await api.post(`/api/tiers/add/${userId}`, tierData);
        dispatch({ type: ADD_DONATION_TIER_SUCCESS, payload: response.data });
    } catch (error) {
        console.error("Error adding donation tier:", error);
        dispatch({ type: ADD_DONATION_TIER_FAILURE, payload: error });
    }
};

// Add Purchase Tier
export const addPurchaseTier = (userId, tierData) => async (dispatch) => {
    dispatch({ type: ADD_PURCHASE_TIER });
    try {
        const response = await api.post(`/api/tiers/purchases/add/${userId}`, tierData);
        dispatch({ type: ADD_PURCHASE_TIER_SUCCESS, payload: response.data });
    } catch (error) {
        console.error("Error adding purchase tier:", error);
        dispatch({ type: ADD_PURCHASE_TIER_FAILURE, payload: error });
    }
};

// Update Total Tiers
export const updateTotalTiers = (donationTiers, purchaseTiers) => {
    const totalTiers = donationTiers + purchaseTiers;
    return { type: UPDATE_TOTAL_TIERS, payload: totalTiers };
};
