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
export const sendResetPassword = (email) => async (dispatch) => {
  dispatch({ type: SEND_RESET_PASSWORD });
  try {
    const response = await axios.post(" api/send-reset-password", { email });
    dispatch({ type: SEND_RESET_PASSWORD_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: SEND_RESET_PASSWORD_FAILURE, payload: error.message });
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
