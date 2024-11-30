import api from '../../utils/axiosConfig';
import {
    FETCH_BALANCE_REQUEST,
    FETCH_BALANCE_SUCCESS,
    FETCH_BALANCE_FAILURE,
    FETCH_TOKEN_BALANCE_REQUEST,
    FETCH_TOKEN_BALANCE_SUCCESS,
    FETCH_TOKEN_BALANCE_FAILURE,
  
} from './actionTypes'
export const fetchBalance = () => async (dispatch) => {
    dispatch({ type: FETCH_BALANCE_REQUEST });
    try {
      const response = await api.get('/user/balance'); // Replace with your API endpoint
      dispatch({ type: FETCH_BALANCE_SUCCESS, payload: response.data.balance });
    } catch (error) {
      dispatch({ type: FETCH_BALANCE_FAILURE, payload: error.message });
    }
  };
  
  export const fetchTokenBalance = () => async (dispatch) => {
    dispatch({ type: FETCH_TOKEN_BALANCE_REQUEST });
    try {
      const response = await api.get('/api/token-balance'); // Replace with your API endpoint
      dispatch({ type: FETCH_TOKEN_BALANCE_SUCCESS, payload: response.data.tokenBalance });
    } catch (error) {
      dispatch({ type: FETCH_TOKEN_BALANCE_FAILURE, payload: error.message });
    }
  };