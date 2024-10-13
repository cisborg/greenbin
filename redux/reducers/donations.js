// src/redux/reducers/donationReducer.js
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
} from '../actions/actionTypes';

const initialState = {
  donations: [],
  loading: false,
  error: null,
};

const donationReducer = (state = initialState, action) => {
  switch (action.type) {
      case CREATE_DONATION_REQUEST:
      case GET_ALL_DONATIONS_REQUEST:
      case UPDATE_DONATION_REQUEST:
      case DELETE_DONATION_REQUEST:
          return {
              ...state,
              loading: true,
              error: null,
          };

      case CREATE_DONATION_SUCCESS:
          return {
              ...state,
              loading: false,
              donations: [...state.donations, action.payload],
          };

      case GET_ALL_DONATIONS_SUCCESS:
          return {
              ...state,
              loading: false,
              donations: action.payload,
          };

      case UPDATE_DONATION_SUCCESS:
          return {
              ...state,
              loading: false,
              donations: state.donations.map(donation =>
                  donation.id === action.payload.id ? action.payload : donation
              ),
          };

      case DELETE_DONATION_SUCCESS:
          return {
              ...state,
              loading: false,
              donations: state.donations.filter(donation => donation.id !== action.payload),
          };

      case CREATE_DONATION_FAILURE:
      case GET_ALL_DONATIONS_FAILURE:
      case UPDATE_DONATION_FAILURE:
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
