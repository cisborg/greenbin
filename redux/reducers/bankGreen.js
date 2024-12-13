// reducers/balanceReducer.js
import {
    FETCH_BALANCE_REQUEST,
    FETCH_BALANCE_SUCCESS,
    FETCH_BALANCE_FAILURE,
    FETCH_TOKEN_BALANCE_REQUEST,
    FETCH_TOKEN_BALANCE_SUCCESS,
    FETCH_TOKEN_BALANCE_FAILURE,
  } from '../actions/actionTypes';
  
  const initialState = {
    balance: 0,
    tokenBalance: 0,
    loading: false,
    error: null,
  };
  
  const balanceReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BALANCE_REQUEST:
      case FETCH_TOKEN_BALANCE_REQUEST:
        return { ...state, loading: true };
      case FETCH_BALANCE_SUCCESS:
        return { ...state, loading: false, balance: action.payload.balance };
      case FETCH_TOKEN_BALANCE_SUCCESS:
        return { ...state, loading: false, tokenBalance: action.payload.tokenBalance };
      case FETCH_BALANCE_FAILURE:
      case FETCH_TOKEN_BALANCE_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default balanceReducer;
  