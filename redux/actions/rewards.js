// src/redux/actions/tiersActions.js
import {
    FETCH_PURCHASE_TIERS,
    FETCH_PURCHASE_TIERS_SUCCESS,
    FETCH_PURCHASE_TIERS_FAILURE,
    FETCH_DONATION_TIERS,
    FETCH_DONATION_TIERS_SUCCESS,
    FETCH_DONATION_TIERS_FAILURE,
    FETCH_COINS,
    FETCH_TIERS,
    FETCH_TIERS_SUCCESS,
    FETCH_TIERS_FAILURE,
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
    FETCH_GREEN_GIFTS ,
    FETCH_GREEN_GIFTS_SUCCESS,
    FETCH_GREEN_GIFTS_FAILURE,
    UPDATE_COINS
} from './actionTypes';
import api from '../../utils/axiosConfig';

// Fetch Donation Tiers
export const fetchDonationTiers = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_DONATION_TIERS });
    try {
        const response = await api.get(`/user/tiers/donations/${userId}`);
        dispatch({ type: FETCH_DONATION_TIERS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_DONATION_TIERS_FAILURE, payload: error });
    }
};

// Fetch Purchase Tiers
export const fetchPurchaseTiers = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_PURCHASE_TIERS });
    try {
        const response = await api.get(`/user/tiers/purchases/${userId}`);
        dispatch({ type: FETCH_PURCHASE_TIERS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_PURCHASE_TIERS_FAILURE, payload: error });
    }
};

// Fetch Coins
export const fetchCoins = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_COINS });
    try {
        const response = await api.get(`/user/coins/balance/${userId}`);
        dispatch({ type: FETCH_COINS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_COINS_FAILURE, payload: error });
    }
};

// Fetch Coupon Gifts
export const fetchCouponGifts = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_COUPON_GIFTS });
    try {
        const response = await api.get(`/user/coupons/${userId}`);
        dispatch({ type: FETCH_COUPON_GIFTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_COUPON_GIFTS_FAILURE, payload: error });
    }
};

// Fetch Green Carbon Points
export const fetchGreenCarbonPoints = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_GREEN_CARBON_POINTS });
    try {
        const response = await api.get(`/user/balance/${userId}`);
        dispatch({ type: FETCH_GREEN_CARBON_POINTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_GREEN_CARBON_POINTS_FAILURE, payload: error });
    }
};

// Fetch Vouchers
export const fetchVouchers = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_VOUCHERS });
    try {
        const response = await api.get(`/user/vouchers/${userId}`);
        dispatch({ type: FETCH_VOUCHERS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_VOUCHERS_FAILURE, payload: error });
    }
};


export const greenGifts = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_GREEN_GIFTS });
    try {
        const response = await api.get(`/user/green-gifts/${userId}`);
        dispatch({ type: FETCH_GREEN_GIFTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_GREEN_GIFTS_FAILURE, payload: error });
    }
};


// Update Total Tiers
export const fetchTiers = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_TIERS }); // Indicate that the fetch has started
    try {
        const response = await api.get(`/user/tiers/${userId}`); // Adjust the endpoint as needed
        dispatch({ type: FETCH_TIERS_SUCCESS, payload: response.data }); // Dispatch success with data
    } catch (error) {
        dispatch({ type: FETCH_TIERS_FAILURE, payload: error }); // Dispatch failure with error
    }
};



// Update Coins
export const updateCoins = (newCoinCount) => {
    return { type: UPDATE_COINS, payload: newCoinCount };
};
