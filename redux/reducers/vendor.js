import {
  REGISTER_VENDOR_REQUEST,
  REGISTER_VENDOR_SUCCESS,
  REGISTER_VENDOR_FAILURE,
  UPDATE_VENDOR_REQUEST,
  UPDATE_VENDOR_SUCCESS,
  UPDATE_VENDOR_FAILURE,
  GET_ALL_VENDORS_REQUEST,
  GET_ALL_VENDORS_SUCCESS,
  GET_ALL_VENDORS_FAILURE,
  FETCH_FOLLOWED_VENDORS_REQUEST,
  FETCH_FOLLOWED_VENDORS_SUCCESS,
  FETCH_FOLLOWED_VENDORS_FAILURE,
  UNFOLLOW_VENDOR_REQUEST,
  UNFOLLOW_VENDOR_SUCCESS,
  UNFOLLOW_VENDOR_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  vendors: [
    {
      id: null,
      name: '',
      job: '', // 'Tree Vendor' or something else
      location: '', // 'Nairobi' or location name
      description: '',
      followers: 0, // 'Followed by ...'
      connections: [], // ['https://example.com/connector1.jpg', ...]
      image: null, // avatar photo URL
      products: '', // Products or services offered, map from 'job' if relevant
      totalRatings: 0,
      totalProducts: 0,
      badge: null,
      followed: false,
    },
  ], // This will hold the list of registered vendors
  followedVendors: [
    {
      id: null,
      name: '',
      job: '', // 'Tree Vendor' or something else
      location: '', // 'Nairobi' or location name
      description: '',
      followers: 0, // 'Followed by ...'
      connections: [], // ['https://example.com/connector1.jpg', ...]
      image: null, // avatar photo URL
      products: '', // Products or services offered, map from 'job' if relevant
      totalRatings: 0,
      totalProducts: 0,
      badge: null,
      followed: true,
    },
  ], // This will hold the list of followed vendors
  loading: false,
  error: null,
};

const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_VENDOR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTER_VENDOR_SUCCESS:
      return {
        ...state,
        vendors: [...state.vendors, action.payload], // Add new vendor to the list
        vendorData: initialState.vendorData, // Reset vendorData after registration
        loading: false,
      };
    case REGISTER_VENDOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Set error message
      };
    case UPDATE_VENDOR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_VENDOR_SUCCESS:
      return {
        ...state,
        vendors: state.vendors.map((vendor) =>
          vendor.id === action.payload.vendorId
            ? { ...vendor, ...action.payload.updatedData } // Update vendor data
            : vendor
        ),
        loading: false,
      };
    case UPDATE_VENDOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Set error message
      };
    case GET_ALL_VENDORS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ALL_VENDORS_SUCCESS:
      return {
        ...state,
        vendors: action.payload, // Replace vendors with the fetched list
        loading: false,
      };
    case GET_ALL_VENDORS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Set error message
      };
    case FETCH_FOLLOWED_VENDORS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_FOLLOWED_VENDORS_SUCCESS:
      return {
        ...state,
        followedVendors: action.payload, // Set followed vendors
        loading: false,
      };
    case FETCH_FOLLOWED_VENDORS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Set error message
      };
    case UNFOLLOW_VENDOR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UNFOLLOW_VENDOR_SUCCESS:
      return {
        ...state,
        followedVendors: state.followedVendors.filter(vendor => vendor.id !== action.payload), // Remove unfollowed vendor
        loading: false,
      };
    case UNFOLLOW_VENDOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Set error message
      };
    default:
      return state; // Return the current state if action type does not match
  }
};

export default vendorReducer;
