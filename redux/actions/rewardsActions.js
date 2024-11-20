import {
    FETCH_ELIGIBLE_REWARDS_REQUEST,
    FETCH_ELIGIBLE_REWARDS_SUCCESS,
    FETCH_ELIGIBLE_REWARDS_FAILURE,
  
} from './actionTypes';
import  api  from '../../utils/axiosConfig'

export const fetchEligibleRewards = (userId) => {
    return async (dispatch) => {
      dispatch({ type: FETCH_ELIGIBLE_REWARDS_REQUEST });
      
      try {
        const response = await api.get(`/api/rewards/${userId}`);
        dispatch({
          type: FETCH_ELIGIBLE_REWARDS_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: FETCH_ELIGIBLE_REWARDS_FAILURE,
          error: error.message,
        });
        console.error('Error fetching eligible rewards:', error);
      }
    };
  };