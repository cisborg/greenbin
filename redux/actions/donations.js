// src/redux/actions/donationActions.js
import axios from 'axios';
import {
    CREATE_DONATION_REQUEST,
    CREATE_DONATION_SUCCESS,
    CREATE_DONATION_FAILURE,
    GET_ALL_DONATIONS_REQUEST,
    GET_ALL_DONATIONS_SUCCESS,
    GET_ALL_DONATIONS_FAILURE,
    UPDATE_DONATION_REQUEST,
    UPDATE_DONATION_SUCCESS,
    UPDATE_DONATION_FAILURE,
    DELETE_DONATION_REQUEST,
    DELETE_DONATION_SUCCESS,
    DELETE_DONATION_FAILURE,
} from './actionTypes';

// Create Donation action
export const createDonation = (donationData) => async (dispatch) => {
    dispatch({ type: CREATE_DONATION_REQUEST });
    try {
        const response = await axios.post('/api/create-donation', donationData);
        dispatch({ type: CREATE_DONATION_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_DONATION_FAILURE, payload: error.message });
    }
};

// Get All Donations action
export const getAllDonations = () => async (dispatch) => {
    dispatch({ type: GET_ALL_DONATIONS_REQUEST });
    try {
        const response = await axios.get('/api/get-all-donations');
        dispatch({ type: GET_ALL_DONATIONS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_ALL_DONATIONS_FAILURE, payload: error.message });
    }
};

// Update Donation action
export const updateDonation = (donationId, donationData) => async (dispatch) => {
    dispatch({ type: UPDATE_DONATION_REQUEST });
    try {
        const response = await axios.put(`/api/update-donation/${donationId}`, donationData);
        dispatch({ type: UPDATE_DONATION_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_DONATION_FAILURE, payload: error.message });
    }
};

// Delete Donation action
export const deleteDonation = (donationId) => async (dispatch) => {
    dispatch({ type: DELETE_DONATION_REQUEST });
    try {
        await axios.delete(`/api/delete-donation/${donationId}`);
        dispatch({ type: DELETE_DONATION_SUCCESS, payload: donationId });
    } catch (error) {
        dispatch({ type: DELETE_DONATION_FAILURE, payload: error.message });
    }
};
