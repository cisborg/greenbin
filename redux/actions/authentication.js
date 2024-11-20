// src/redux/actions/userActions.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../utils/axiosConfig";
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
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  REGISTER_CODE_REQUEST,
  REGISTER_CODE_SUCCESS,
  REGISTER_CODE_FAILURE,
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

// Send Reset Password action
// Send Reset Password action
export const sendResetPassword = (email) => async (dispatch) => {
  dispatch({ type: SEND_RESET_PASSWORD });
  try {
    const response = await api.post("/api/send-reset-password", { email });

    if (response.data.status === "success") {
      // Optionally store a success message or token in AsyncStorage
      await AsyncStorage.setItem("resetPasswordEmail", email); // Store email for confirmation or further use
      Alert.alert("Reset password link sent!", "Please check your email.");

      dispatch({ type: SEND_RESET_PASSWORD_SUCCESS, payload: response.data });
    } else {
      dispatch({ type: SEND_RESET_PASSWORD_FAILURE, payload: response.data.message });
      Alert.alert("Error", response.data.message);
    }
  } catch (error) {
    dispatch({ type: SEND_RESET_PASSWORD_FAILURE, payload: error.message });
    Alert.alert("Error", error.message);
  }
};

export const registerCode = (productId) => async (dispatch) => {
  dispatch({ type: REGISTER_CODE_REQUEST });
  try {
      const response = await api.post(`/api/register`, { productId }); // Adjust the endpoint as needed
      dispatch({ type: REGISTER_CODE_SUCCESS, payload: response.data });
  } catch (error) {
      dispatch({ type: REGISTER_CODE_FAILURE, payload: error.message });
  }
};


// Connection Request action
 export const connectionRequest = (userId) => async (dispatch) => {
  dispatch({ type: CONNECTION_REQUEST });
   try {
     const response = await api.post(" api/connection-request", { userId });
     dispatch({ type: CONNECTION_REQUEST_SUCCESS, payload: response.data });
   } catch (error) {
     dispatch({ type: CONNECTION_REQUEST_FAILURE, payload: error.message });
   }
 };


 // Get Referral Code action
 export const getReferralCode = (userId) => async (dispatch) => {
  dispatch({ type: GET_REFERRAL_CODE_REQUEST });
  try {
    const response = await api.get(` api/get-referral-code/${userId}`);
     dispatch({ type: GET_REFERRAL_CODE_SUCCESS, payload: response.data });
   } catch (error) {
    dispatch({ type: GET_REFERRAL_CODE_FAILURE, payload: error.message });
   }
 };

export const updateUser = (userId, userData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER });
  try {
    const response = await api.put(`/user/update/${userId}`, userData);

    if (response.data.status === "success") {
      // Optionally, update the user information in AsyncStorage
      const updatedUser = response.data.data;
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

      dispatch({ type: UPDATE_USER_SUCCESS, payload: updatedUser });
    } else {
      dispatch({ type: UPDATE_USER_FAILURE, payload: response.data.message });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
