import {
    FETCH_SQUAD_LEADERBOARD_REQUEST,
    FETCH_SQUAD_LEADERBOARD_SUCCESS,
    FETCH_SQUAD_LEADERBOARD_FAILURE,
    FETCH_USER_LEADERBOARD_REQUEST,
    FETCH_USER_LEADERBOARD_SUCCESS,
    FETCH_USER_LEADERBOARD_FAILURE,
   
} from './actionTypes';
import api from "../../utils/axiosConfig";

// Fetch squad leaderboard action
export const fetchSquadLeaderboard = () => async (dispatch) => {
    dispatch({ type: FETCH_SQUAD_LEADERBOARD_REQUEST });
    try {
        const response = await api.get('/leaderboard/squads'); // API call to fetch squad leaderboard
        dispatch({ type: FETCH_SQUAD_LEADERBOARD_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_SQUAD_LEADERBOARD_FAILURE, payload: error.message });
    }
};

// Fetch user leaderboard action


export const fetchUserLeaderboard = () => async (dispatch) => {
    dispatch({ type: FETCH_USER_LEADERBOARD_REQUEST });
    try {
        const response = await api.get('/leaderboard/users'); // API call to fetch user leaderboard
        dispatch({ type: FETCH_USER_LEADERBOARD_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_USER_LEADERBOARD_FAILURE, payload: error.message });
    }
};


export const fetchMoreUsers = () => async (dispatch) => {
    try {
      dispatch({ type: "FETCH_MORE_USERS_REQUEST" });
  
      const response = await api.get(`/leaderboard?offset=${offset}&limit=20`);   
      dispatch({
        type: "FETCH_MORE_USERS_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_MORE_USERS_FAILURE",
        payload: error.response?.data?.message || "Failed to load more users",
      });
    }
  };
  
