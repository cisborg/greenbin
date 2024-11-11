// src/redux/actions/tiersActions.js
import {
    FETCH_DONATION_TIERS,
    FETCH_PURCHASE_TIERS,
    UPDATE_TOTAL_TIERS
} from './actionTypes';
import api from '../../utils/axiosConfig';

// Fetch Donation Tiers
export const fetchDonationTiers = (userId) => async (dispatch) => {
    try {
        const response = await api.get(`/api/tiers/donations/${userId}`);
        dispatch({ type: FETCH_DONATION_TIERS, payload: response.data });
    } catch (error) {
        console.error("Error fetching donation tiers:", error);
    }
};

// Fetch Purchase Tiers
export const fetchPurchaseTiers = (userId) => async (dispatch) => {
    try {
        const response = await api.get(`/api/tiers/purchases/${userId}`);
        dispatch({ type: FETCH_PURCHASE_TIERS, payload: response.data });
    } catch (error) {
        console.error("Error fetching purchase tiers:", error);
    }
};

// Update Total Tiers
export const updateTotalTiers = (donationTiers, purchaseTiers) => {
    const totalTiers = donationTiers + purchaseTiers;
    return { type: UPDATE_TOTAL_TIERS, payload: totalTiers };
};
