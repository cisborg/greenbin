// src/redux/reducers/authReducer.js
import {
  REGISTER_USER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  SEND_RESET_PASSWORD,
  SEND_RESET_PASSWORD_SUCCESS,
  SEND_RESET_PASSWORD_FAILURE,
  CONNECTION_REQUEST,
  CONNECTION_REQUEST_SUCCESS,
  CONNECTION_REQUEST_FAILURE,
  GET_REFERRAL_CODE_REQUEST,
  GET_REFERRAL_CODE_SUCCESS,
  GET_REFERRAL_CODE_FAILURE,
  REGISTER_CODE_REQUEST, 
  REGISTER_CODE_SUCCESS,
  REGISTER_CODE_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USER_BY_DETAILS_REQUEST,
  FETCH_USER_BY_DETAILS_SUCCESS,
  FETCH_USER_BY_DETAILS_FAILURE,
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  ACCEPT_CODE,
  ACCEPT_CODE_SUCCESS,
  ACCEPT_CODE_FAILURE,
  VALIDATE_REFERRAL_CODE_REQUEST,
  VALIDATE_REFERRAL_CODE_SUCCESS,
  VALIDATE_REFERRAL_CODE_FAILURE,

} from "../actions/actionTypes";

const initialState = {
  users: [], // Array of user objects
  selectedUser: null, // Single user object fetched by details
  loading: false, // General loading state
  error: null, // General error state
};

const mapUserData = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  promoCode: user.promoCode,
  contact: user.contact,
  token: user.token,
  image: user.image,
  points: user.points,
  totalTiers: user.totalTiers,
  statusDescription: user.statusDescription,
  referralCode: user.referralCode,
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Generic Loading States
    case REGISTER_USER:
    case SEND_RESET_PASSWORD:
    case REGISTER_CODE_REQUEST:
    case LOGIN_USER:
    case VALIDATE_REFERRAL_CODE_REQUEST:
    case CONNECTION_REQUEST:
    case ACCEPT_CODE:
    case GET_REFERRAL_CODE_REQUEST:
    case FETCH_USERS_REQUEST:
    case FETCH_USER_BY_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };

    // Handling Success Cases
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.map(mapUserData),
      };

      case FETCH_USER_BY_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          selectedUser: mapUserData(action.payload),
        };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedUser: action.payload, // Assuming backend returns full user details
        token: action.payload.token,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedUser: action.payload.user,
        token: action.payload.token,
      };

    case REGISTER_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        greenBankCode: action.payload.greenBankCode,
      };

      case VALIDATE_REFERRAL_CODE_SUCCESS:
        return {
          ...state,
          loading: false,
          referralCode: action.payload.referralCode,
          selectedUser: {
            ...state.selectedUser,
            referralCode: action.payload.referralCode,
          },
        };
      

    case SEND_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message, // Assuming success message is returned
      };

    case CONNECTION_REQUEST_SUCCESS:
    case ACCEPT_CODE_SUCCESS:
    case GET_REFERRAL_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload, // Assuming these success cases return appropriate properties
      };

    // Handling Failure Cases
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case SEND_RESET_PASSWORD_FAILURE:
    case CONNECTION_REQUEST_FAILURE:
    case REGISTER_CODE_FAILURE:
    case VALIDATE_REFERRAL_CODE_FAILURE:
    case GET_REFERRAL_CODE_FAILURE:
    case ACCEPT_CODE_FAILURE:
    case FETCH_USERS_FAILURE:
    case FETCH_USER_BY_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default authReducer;
