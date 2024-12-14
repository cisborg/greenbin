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
  donations: [
    {
    donationId: null,
    date: null,              // Date of the most recent donation
    totalAmountDonated: 0,   // Total amount donated by the user
    currentTier: null,       // Current tier based on total donations
    message: null,           // Custom message based on donation tier
    }
  ],
  loading: false,
  error: null,
           // ID of the most recent donation
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
const getCurrentTier = (totalAmountDonated) => {
  for (let i = donationTiers.length - 1; i >= 0; i--) {
    if ( totalAmountDonated >= donationTiers[i].minAmount) {
      return donationTiers[i].name;
    }
  }
  return null; // No tier if below the minimum amount
};

// Function to generate a custom message based on the tier
const generateMessage = (tier, amount) => {
  if (!tier) {
    return `Thank you for donating ${amount}!`;
  }
  return `Congratulations on donating ${amount}! You've reached the ${tier} tier!`;
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
      const { amount, id, date } = action.payload;   // Assume payload contains these details
      const newTotalAmountDonated = state.totalAmountDonated + amount;
      const currentTier = getCurrentTier(newTotalAmountDonated);
      const customMessage = generateMessage(currentTier, amount);

      return {
        ...state,
        loading: false,
        donations: [...state.donations, action.payload],
        totalAmountDonated: newTotalAmountDonated,
        currentTier: currentTier,
        message: customMessage,               // Update message
        donationId: id,                       // Store the current donation ID
        date: date                            // Store the date of the current donation
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
