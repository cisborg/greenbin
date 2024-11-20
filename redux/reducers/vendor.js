import { REGISTER_VENDOR, UPDATE_VENDOR, GET_ALL_VENDORS } from './actionTypes';

const initialState = {
  vendors: [], // This will hold the list of registered vendors
  vendorData: {
    id: null,
    name: '',
    job: '', // 'Tree Vendor' or something else
    location: '', // 'Nairobi' or location name
    description: '',
    followers: '', // 'Followed by ...'
    connections: [], // ['https://example.com/connector1.jpg', ...]
    image: null, // avatar photo URL
    products: '', // Products or services offered, map from 'job' if relevant
  },
  totalRatings: 0,
  totalProducts: 0,
  totalFollowers: 0,
  totalScore: 0
};

const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_VENDOR:
      return {
        ...state,
        vendors: [...state.vendors, action.payload], // Add new vendor to the list
        vendorData: initialState.vendorData, // Reset vendorData after registration
      };
    case UPDATE_VENDOR:
      return {
        ...state,
        vendors: state.vendors.map((vendor) =>
          vendor.id === action.payload.vendorId
            ? { ...vendor, ...action.payload.updatedData } // Update vendor data
            : vendor
        ),
      };
    case GET_ALL_VENDORS:
      return {
        ...state,
        vendors: action.payload, // Replace vendors with the fetched list
      };
    default:
      return state; // Return the current state if action type does not match
  }
};

export default vendorReducer;
