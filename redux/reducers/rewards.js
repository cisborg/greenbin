// reducers/rewardsReducer.js
import {
    FETCH_ELIGIBLE_REWARDS_REQUEST,
    FETCH_ELIGIBLE_REWARDS_SUCCESS,
    FETCH_ELIGIBLE_REWARDS_FAILURE,
  } from '../actions/rewards';

  const initialState = {
    eligibleRewards: [],
    loading: false,
    error: null,
  };

  const rewardsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ELIGIBLE_REWARDS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_ELIGIBLE_REWARDS_SUCCESS:
        return {
          ...state,
          loading: false,
          eligibleRewards: action.payload,
        };
      case FETCH_ELIGIBLE_REWARDS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default rewardsReducer;
  