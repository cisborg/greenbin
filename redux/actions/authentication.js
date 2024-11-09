// src/redux/actions/userActions.js
// import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../utils/axiosConfig";
import {
  REGISTER_USER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  //   UPDATE_USER,
  //   UPDATE_USER_SUCCESS,
  //   UPDATE_USER_FAILURE,
  //   SEND_RESET_PASSWORD,
  //   GET_ALL_USERS,
  //   CONNECTION_REQUEST,
  //   LOGIN_USER,
  //   GET_REFERRAL_CODE,
  //   DELETE_USER,
  //   SEND_POINTS,
  //   UPDATE_PASSWORD,
  // CREATE_USER_SUCCESS,
  // CREATE_USER_FAILURE,
  //   UPDATE_USER_SUCCESS,
  //   UPDATE_USER_FAILURE,
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  //   DELETE_USER_REQUEST,
  //   DELETE_USER_SUCCESS,
  //   DELETE_USER_FAILURE,
  //   SEND_POINTS_REQUEST,
  //   SEND_POINTS_SUCCESS,
  //   SEND_POINTS_FAILURE,
} from "./actionTypes";
import { Alert } from "react-native";

// Create User action
export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_USER });
  try {
    console.log("Sending registration request with data:", userData);
    // Alert.alert('Sending registration request with data:', userData.email);

    const response = await api.post("/user/signup", userData);

    console.log("response part", response.data);

    if (response.data.status === "success") {
      const token = response.data.token;
      await AsyncStorage.setItem("token", token);
      Alert.alert("Token stored successfully");

      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    } else {
      dispatch({ type: REGISTER_FAILURE, payload: response.data.message });
    }
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Login User action
export const loginUser = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_USER });
  try {
    const response = await api.post("/user/login", credentials);

    const { token, name, email, ...user } = response.data.data;
    if (response.data.status === "success") {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          id: user.userId,
          name: name,
          email: email,
        })
      );
      dispatch({ type: LOGIN_SUCCESS, payload: { user, token } });
    }
    // dispatch({ type: LOGIN_SUCCESS, payload: { user, token } });

    return { token: token };
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || error.message,
    });

    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// Update User action
// export const updateUser = (userId, userData) => async (dispatch) => {
//   dispatch({ type: UPDATE_USER });
//   try {
//     const response = await axios.put(`/user/update${userId}`, userData);
//     dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
//   }
// };

// Send Reset Password action
// export const sendResetPassword = (email) => async (dispatch) => {
//   dispatch({ type: SEND_RESET_PASSWORD });
//   try {
//     const response = await axios.post("/api/send-reset-password", { email });
//     dispatch({ type: SEND_RESET_PASSWORD_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({ type: SEND_RESET_PASSWORD_FAILURE, payload: error.message });
//   }
// };

// Get All Users action
// export const getAllUsers = () => async (dispatch) => {
//   dispatch({ type: GET_ALL_USERS_REQUEST });
//   try {
//     const response = await axios.get("/api/get-all-users");
//     dispatch({ type: GET_ALL_USERS_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({ type: GET_ALL_USERS_FAILURE, payload: error.message });
//   }
// };

// Connection Request action
// export const connectionRequest = (userId) => async (dispatch) => {
//   dispatch({ type: CONNECTION_REQUEST });
//   try {
//     const response = await axios.post("/api/connection-request", { userId });
//     dispatch({ type: CONNECTION_REQUEST_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({ type: CONNECTION_REQUEST_FAILURE, payload: error.message });
//   }
// };

// // Get Referral Code action
// export const getReferralCode = (userId) => async (dispatch) => {
//   dispatch({ type: GET_REFERRAL_CODE_REQUEST });
//   try {
//     const response = await axios.get(`/api/get-referral-code/${userId}`);
//     dispatch({ type: GET_REFERRAL_CODE_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({ type: GET_REFERRAL_CODE_FAILURE, payload: error.message });
//   }
// };

// Delete User action
// export const deleteUser = (userId) => async (dispatch) => {
//   dispatch({ type: DELETE_USER_REQUEST });
//   try {
//     const response = await axios.delete(`/api/delete-user/${userId}`);
//     dispatch({ type: DELETE_USER_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
//   }
// };

// // Send Points action
// export const sendPoints = (userId, points) => async (dispatch) => {
//   dispatch({ type: SEND_POINTS_REQUEST });
//   try {
//     const response = await axios.post("/api/send-points", { userId, points });
//     dispatch({ type: SEND_POINTS_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({ type: SEND_POINTS_FAILURE, payload: error.message });
//   }
// };

// // Update Password action
// export const updatePassword = (userId, newPassword) => async (dispatch) => {
//   dispatch({ type: UPDATE_PASSWORD_REQUEST });
//   try {
//     const response = await axios.put(`/api/update-password/${userId}`, {
//       newPassword,
//     });
//     dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({ type: UPDATE_PASSWORD_FAILURE, payload: error.message });
//   }
// };
