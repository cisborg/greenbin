// src/redux/reducers/donationReducer.js
import {
    CREATE_DONATION_REQUEST,
    CREATE_DONATION_SUCCESS,
    CREATE_DONATION_FAILURE,
    GET_ALL_DONATIONS_REQUEST,
    GET_ALL_DONATIONS_SUCCESS,
    GET_ALL_DONATIONS_FAILURE,
    DELETE_DONATION_REQUEST,
    DELETE_DONATION_SUCCESS,
    DELETE_DONATION_FAILURE,
  } from '../actions/actionTypes';
  
  const initialState = {
    donations: [],
    loading: false,
    error: null,
    userPoints: 0,
    totalAmountDonated: 0, // Total amount donated by the user
    currentDonation: 0,     // Current donation amount
    currentTier: null,      // Current tier based on total donations
  };
  
  const donationTiers = [
    { name: 'Bronze', minAmount: 1000 },
    { name: 'Silver', minAmount: 5000 },
    { name: 'Titanium', minAmount: 10000 },
    { name: 'Gold', minAmount: 50000 },
    { name: 'Platinum', minAmount: 100000 },
    { name: 'Diamond', minAmount: 700000 },
  ];
  
  // Function to determine the current tier based on total donations
  const getCurrentTier = (totalDonated) => {
    for (let i = donationTiers.length - 1; i >= 0; i--) {
      if (totalDonated >= donationTiers[i].minAmount) {
        return donationTiers[i].name;
      }
    }
    return null; // No tier if below the minimum amount
  };
  
  const donationReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_DONATION_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CREATE_DONATION_SUCCESS:
        const newTotalAmountDonated = state.totalAmountDonated + action.payload.amount; // Update total donations
        const currentTier = getCurrentTier(newTotalAmountDonated); // Calculate new tier
        return {
          ...state,
          loading: false,
          donations: [...state.donations, action.payload],
          totalAmountDonated: newTotalAmountDonated,
          currentDonation: action.payload.amount, // Current donation amount
          currentTier: currentTier, // Update current tier
        };
      case CREATE_DONATION_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case GET_ALL_DONATIONS_REQUEST:
      case DELETE_DONATION_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_ALL_DONATIONS_SUCCESS:
      case DELETE_DONATION_SUCCESS:
        return {
          ...state,
          loading: false,
          donations: action.payload,
        };
      case GET_ALL_DONATIONS_FAILURE:  
      case DELETE_DONATION_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default donationReducer;
  