import {
  REGISTER_VENDOR_REQUEST,
  REGISTER_VENDOR_SUCCESS,
  REGISTER_VENDOR_FAILURE,
  GET_ALL_VENDORS_REQUEST,
  GET_ALL_VENDORS_SUCCESS,
  GET_ALL_VENDORS_FAILURE,
  FETCH_FOLLOWED_VENDORS_SUCCESS,
  UNFOLLOW_VENDOR_REQUEST,
  UNFOLLOW_VENDOR_SUCCESS,
  UNFOLLOW_VENDOR_FAILURE,
  FOLLOW_VENDOR_REQUEST,
  FOLLOW_VENDOR_SUCCESS,
  FOLLOW_VENDOR_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  vendors: [
    {
      id: null,
      name: '',
      job: '',
      location: '',
      description: '',
      followers: 0,
      image: null,
      products: '',
      totalRatings: 0,
      totalProducts: 0,
      badge: null,
      followed: false,
    },
  ],
  followedVendors: [],
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
        vendors: [...state.vendors, action.payload],
        loading: false,
      };
    case REGISTER_VENDOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
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
        vendors: action.payload.map(vendor => ({
          ...vendor,
          followed: vendor.followed || false,
        })),
        loading: false,
      };
    case GET_ALL_VENDORS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_FOLLOWED_VENDORS_SUCCESS:
      const followedVendors = state.vendors.filter(vendor => vendor.followed);
      return {
        ...state,
        followedVendors: followedVendors,
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
        vendors: state.vendors.map(vendor =>
          vendor.id === action.payload ? { ...vendor, followed: false } : vendor
        ),
        followedVendors: state.followedVendors.filter(vendor => vendor.id !== action.payload),
        loading: false,
      };
    case UNFOLLOW_VENDOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FOLLOW_VENDOR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FOLLOW_VENDOR_SUCCESS:
      return {
        ...state,
        vendors: state.vendors.map(vendor =>
          vendor.id === action.payload ? { ...vendor, followed: true, followers: vendor.followers + 1 } : vendor
        ),
        followedVendors: [...state.followedVendors, state.vendors.find(vendor => vendor.id === action.payload)],
        loading: false,
      };
    case FOLLOW_VENDOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default vendorReducer;
