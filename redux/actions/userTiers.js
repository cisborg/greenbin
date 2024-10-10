// tiersActions.js
import {
    FETCH_DONATION_TIERS,
    FETCH_PURCHASE_TIERS,
    UPDATE_TOTAL_TIERS
} from './actionTypes';
import axios from 'axios';

// Fetch Donation Tiers
export const fetchDonationTiers = (userId) => async (dispatch) => {
    const response = await axios.get(`/api/tiers/donations/${userId}`);
    dispatch({ type: FETCH_DONATION_TIERS, payload: response.data });
};

// Fetch Purchase Tiers
export const fetchPurchaseTiers = (userId) => async (dispatch) => {
    const response = await axios.get(`/api/tiers/purchases/${userId}`);
    dispatch({ type: FETCH_PURCHASE_TIERS, payload: response.data });
};

// Update Total Tiers
export const updateTotalTiers = (donationTiers, purchaseTiers) => {
    const totalTiers = donationTiers + purchaseTiers;
    return { type: UPDATE_TOTAL_TIERS, payload: totalTiers };
};
