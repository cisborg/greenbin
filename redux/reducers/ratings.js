// reducer.js
import {
  RATE_PRODUCT,
  RATE_PRODUCT_SUCCESS,
  RATE_PRODUCT_FAILURE,
  RATE_VENDOR,
  RATE_VENDOR_SUCCESS,
  RATE_VENDOR_FAILURE,
  RATE_APP,
  RATE_APP_SUCCESS,
  RATE_APP_FAILURE,
  FETCH_PRODUCT_RATINGS_REQUEST,
  FETCH_PRODUCT_RATINGS_SUCCESS,
  FETCH_PRODUCT_RATINGS_FAILURE,
  FETCH_VENDOR_RATINGS_REQUEST,
  FETCH_VENDOR_RATINGS_SUCCESS,
  FETCH_VENDOR_RATINGS_FAILURE,
  FETCH_APP_RATINGS_REQUEST,
  FETCH_APP_RATINGS_SUCCESS,
  FETCH_APP_RATINGS_FAILURE,
} from '../actions/actionTypes';

// Initial state
const initialState = {
  ratings: {
      product: {
          reason: '',
          productId: null,
          stars: 0
      },
      vendor: {
          reason: '',
          vendorId: null,
          stars: 0
      },
      app: {
          reason: '',
          stars: 0
      }
  },
  loading: false,
  error: null,
};

// Reducer to handle ratings
const ratingsReducer = (state = initialState, action) => {
  switch (action.type) {
      // Rating actions
      case RATE_PRODUCT:
      case RATE_VENDOR:
      case RATE_APP:
          return {
              ...state,
              loading: true,
              error: null,
          };
      case RATE_PRODUCT_SUCCESS:
          return {
              ...state,
              loading: false,
              ratings: {
                  ...state.ratings,
                  product: {
                      reason: action.payload.rating.reason,
                      productId: action.payload.productId,
                      stars: action.payload.rating.stars,
                  },
              },
          };
      case RATE_VENDOR_SUCCESS:
          return {
              ...state,
              loading: false,
              ratings: {
                  ...state.ratings,
                  vendor: {
                      reason: action.payload.rating.reason,
                      vendorId: action.payload.vendorId,
                      stars: action.payload.rating.stars,
                  },
              },
          };
      case RATE_APP_SUCCESS:
          return {
              ...state,
              loading: false,
              ratings: {
                  ...state.ratings,
                  app: {
                      reason: action.payload.rating.reason,
                      stars: action.payload.rating.stars,
                  },
              },
          };
      case RATE_PRODUCT_FAILURE:
      case RATE_VENDOR_FAILURE:
      case RATE_APP_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };

      // Fetch ratings actions
      case FETCH_PRODUCT_RATINGS_REQUEST:
      case FETCH_VENDOR_RATINGS_REQUEST:
      case FETCH_APP_RATINGS_REQUEST:
          return {
              ...state,
              loading: true,
              error: null,
          };
      case FETCH_PRODUCT_RATINGS_SUCCESS:
          return {
              ...state,
              loading: false,
              ratings: {
                  ...state.ratings,
                  product: action.payload, // Assuming payload contains the ratings data
              },
          };
      case FETCH_VENDOR_RATINGS_SUCCESS:
          return {
              ...state,
              loading: false,
              ratings: {
                  ...state.ratings,
                  vendor: action.payload, // Assuming payload contains the ratings data
              },
          };
      case FETCH_APP_RATINGS_SUCCESS:
          return {
              ...state,
              loading: false,
              ratings: {
                  ...state.ratings,
                  app: action.payload, // Assuming payload contains the ratings data
              },
          };
      case FETCH_PRODUCT_RATINGS_FAILURE:
      case FETCH_VENDOR_RATINGS_FAILURE:
      case FETCH_APP_RATINGS_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };

      default:
          return state;
  }
};

export default ratingsReducer;
