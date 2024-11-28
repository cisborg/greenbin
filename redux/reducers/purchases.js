// src/redux/reducers/purchasesReducer.js

import {
    CREATE_PURCHASE_REQUEST,
    CREATE_PURCHASE_SUCCESS,
    CREATE_PURCHASE_FAILURE,
    GET_ALL_PURCHASES_REQUEST,
    GET_ALL_PURCHASES_SUCCESS,
    GET_ALL_PURCHASES_FAILURE,
    UPDATE_PURCHASE_REQUEST,
    UPDATE_PURCHASE_SUCCESS,
    UPDATE_PURCHASE_FAILURE,
    DELETE_PURCHASE_REQUEST,
    DELETE_PURCHASE_SUCCESS,
    DELETE_PURCHASE_FAILURE,
    CLEAR_ALL_PURCHASES_REQUEST,
    CLEAR_ALL_PURCHASES_SUCCESS,
    CLEAR_ALL_PURCHASES_FAILURE,
  } from '../actions/actionTypes';
  
  const initialState = {
    purchases: [],
    loading: false,
    error: null,
    userPoints: 0,
    date: null,                  // Date of the most recent purchase
    totalAmountPurchased: 0,     // Total amount purchased by the user
    currentPurchase: 0,          // Amount of the current purchase
    currentTier: null,           // Current tier based on total purchases
    message: null,               // Custom message based on purchase tier
    purchaseId: null             // ID of the most recent purchase
  };
  
  // Define purchase tiers
  const purchaseTiers = [
    { name: 'Bronze', minAmount: 1000 },
    { name: 'Silver', minAmount: 5000 },
    { name: 'Titanium', minAmount: 10000 },
    { name: 'Gold', minAmount: 50000 },
    { name: 'Platinum', minAmount: 100000 },
    { name: 'Diamond', minAmount: 700000 },
  ];
  
  // Function to determine the current tier based on total purchases
  const getCurrentTier = (totalPurchased) => {
    for (let i = purchaseTiers.length - 1; i >= 0; i--) {
      if (totalPurchased >= purchaseTiers[i].minAmount) {
        return purchaseTiers[i].name;
      }
    }
    return null; // No tier if below the minimum amount
  };
  
  // Function to generate a custom message based on the tier
  const generateMessage = (tier, amount) => {
    if (!tier) {
      return `Thank you for your purchase of ${amount} GCPs!`;
    }
    return `Congratulations on purchasing ${amount} GCPs! You've reached the ${tier} tier!`;
  };
  
  const purchasesReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_PURCHASE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case CREATE_PURCHASE_SUCCESS:
        const { amount, id, date } = action.payload; // Assume payload contains these details
        const newTotalAmountPurchased = state.totalAmountPurchased + amount;
        const currentTier = getCurrentTier(newTotalAmountPurchased);
        const customMessage = generateMessage(currentTier, amount);
  
        return {
          ...state,
          loading: false,
          purchases: [...state.purchases, action.payload],
          totalAmountPurchased: newTotalAmountPurchased,
          currentPurchase: amount,
          currentTier: currentTier,
          message: customMessage,          // Update message
          purchaseId: id,                  // Store the current purchase ID
          date: date                       // Store the date of the current purchase
        };
  
      case CREATE_PURCHASE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case GET_ALL_PURCHASES_REQUEST:
      case UPDATE_PURCHASE_REQUEST:
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
          purchases: action.payload, // Assume payload is an array of purchases
        };
  
      case UPDATE_PURCHASE_SUCCESS:
        const updatedPurchase = action.payload;
        return {
          ...state,
          loading: false,
          purchases: state.purchases.map(purchase =>
            purchase.id === updatedPurchase.id ? updatedPurchase : purchase
          ),
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
          totalAmountPurchased: 0,
          currentPurchase: 0,
          currentTier: null,
          message: null,
          purchaseId: null,
          date: null,
        };
  
      case GET_ALL_PURCHASES_FAILURE:
      case UPDATE_PURCHASE_FAILURE:
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
  