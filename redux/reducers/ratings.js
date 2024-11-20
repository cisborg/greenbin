// reducer.js
import {
    RATE_PRODUCT,
    RATE_PRODUCT_SUCCESS,
    RATE_PRODUCT_FAILURE,
    RATE_VENDOR,
    RATE_VENDOR_SUCCESS,
    RATE_VENDOR_FAILURE
  } from './actionTypes';
  
  // Initial state
  const initialState = {
    productRatings: {
        points: 0,
        reason: '',
        productId: null,
        stars: 0
    },
    vendorRatings: {
        points: 0,
        reason: '',
        vendorId: null,
        stars: rating
    },
    loadingProductRating: false,
    loadingVendorRating: false,
    errorProductRating: null,
    errorVendorRating: null,
  };
  
  // Reducer to handle ratings
  const ratingsReducer = (state = initialState, action) => {
    switch (action.type) {
      // Product rating actions
      case RATE_PRODUCT:
        return {
          ...state,
          loadingProductRating: true,
          errorProductRating: null,
        };
      case RATE_PRODUCT_SUCCESS:
        return {
          ...state,
          loadingProductRating: false,
          productRatings: {
            ...state.productRatings,
            [action.payload.productId]: action.payload.rating, // Update product rating
          },
        };
      case RATE_PRODUCT_FAILURE:
        return {
          ...state,
          loadingProductRating: false,
          errorProductRating: action.payload,
        };
  
      // Vendor rating actions
      case RATE_VENDOR:
        return {
          ...state,
          loadingVendorRating: true,
          errorVendorRating: null,
        };
      case RATE_VENDOR_SUCCESS:
        return {
          ...state,
          loadingVendorRating: false,
          vendorRatings: {
            ...state.vendorRatings,
            [action.payload.vendorId]: action.payload.rating, // Update vendor rating
          },
        };
      case RATE_VENDOR_FAILURE:
        return {
          ...state,
          loadingVendorRating: false,
          errorVendorRating: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default ratingsReducer;
  