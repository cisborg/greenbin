// reducers/rewardsReducer.js
import { State } from 'react-native-gesture-handler';
import {
    FETCH_ELIGIBLE_REWARDS_REQUEST,
    FETCH_ELIGIBLE_REWARDS_SUCCESS,
    FETCH_ELIGIBLE_REWARDS_FAILURE,
  } from '../actions/actionTypes';

  const initialState = {
    eligibleRewards: [
      {
        id: null,
        rewardName: '',
        description: '',
        threshold: 0,
        referralCount: 0
        
      },
    ],
    loading: false,
    error: null,
  };

  const rewardsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ELIGIBLE_REWARDS_REQUEST:
        return {
          ...State,
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
  