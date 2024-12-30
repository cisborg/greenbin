// src/redux/reducers/purchasesReducer.js

import {
  GET_ALL_PURCHASES_REQUEST,
  GET_ALL_PURCHASES_SUCCESS,
  GET_ALL_PURCHASES_FAILURE,
  DELETE_PURCHASE_REQUEST,
  DELETE_PURCHASE_SUCCESS,
  DELETE_PURCHASE_FAILURE,
  CLEAR_ALL_PURCHASES_REQUEST,
  CLEAR_ALL_PURCHASES_SUCCESS,
  CLEAR_ALL_PURCHASES_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  purchases: [], // Each purchase will now contain id, message, and tier
  loading: false,
  error: null,
};

// Purchases Reducer
const purchasesReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_ALL_PURCHASES_REQUEST:
      case DELETE_PURCHASE_REQUEST:
      case CLEAR_ALL_PURCHASES_REQUEST:
          return {
              ...state,
              loading: true,
          };

      case GET_ALL_PURCHASES_SUCCESS:
          return {
              ...state,
              loading: false,
              purchases: action.payload.map(purchase => ({
                  id: purchase.id, // Order ID
                  message: `Thank you for your purchase of ${purchase.amount} GCPs!`, // Message
                  // Removed tier, as requested
              })),
          };

      case DELETE_PURCHASE_SUCCESS:
          return {
              ...state,
              loading: false,
              purchases: state.purchases.filter(purchase => purchase.id !== action.payload),
          };

      case CLEAR_ALL_PURCHASES_SUCCESS:
          return {
              ...state,
              loading: false,
              purchases: [],
          };

      case GET_ALL_PURCHASES_FAILURE:
      case DELETE_PURCHASE_FAILURE:
      case CLEAR_ALL_PURCHASES_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };

      default:
          return state;
  }
};

export default purchasesReducer;
