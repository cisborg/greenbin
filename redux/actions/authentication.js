// src/redux/actions/userActions.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../utils/axiosConfig";
import {
  REGISTER_USER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  ACCEPT_CODE,
  ACCEPT_CODE_SUCCESS,
  ACCEPT_CODE_FAILURE,
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

    if (response.data.status === "success") {
      const token = response.data.token;
      await AsyncStorage.setItem("token", token);
      Alert.alert("Token stored successfully");

      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
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
export const sendResetPassword = ({ email, token, newPassword }) => async (dispatch) => {
  if (!token) {
    // Step 1: Request password reset email
    dispatch({ type: SEND_RESET_PASSWORD });
    try {
      const response = await api.post("/user/reset", { email });

      if (response.data.status === "success") {
        // Store the email for reference (if needed later)
        await AsyncStorage.setItem("resetPasswordEmail", email);
        Alert.alert("Reset password link sent!", "Please check your email.");
        dispatch({ type: SEND_RESET_PASSWORD_SUCCESS, payload: response.data });
      }
    } catch (error) {
      dispatch({ type: SEND_RESET_PASSWORD_FAILURE, payload: error.message });
      Alert.alert("Error", error.message);
    }
  } else {
    // Step 2: Reset password using token
    try {
      const response = await api.post("/user/reset-password", { token, newPassword });

      if (response.data.status === "success") {
        Alert.alert("Password changed successfully!", "You can now log in with your new password.");
        dispatch({ type: SEND_RESET_PASSWORD_SUCCESS, payload: response.data });
      }
    } catch (error) {
      dispatch({ type: SEND_RESET_PASSWORD_FAILURE, payload: error.message });
      Alert.alert("Error", error.message);
    }
  }
};

export const registerCode = (productId) => async (dispatch) => {
  dispatch({ type: REGISTER_CODE_REQUEST });
  try {
      const response = await api.post(`/user/getcode`, { productId }); // Adjust the endpoint as needed
      dispatch({ type: REGISTER_CODE_SUCCESS, payload: response.data });
  } catch (error) {
      dispatch({ type: REGISTER_CODE_FAILURE, payload: error.message });
  }
};


// Connection Request action
 export const connectionRequest = (userId) => async (dispatch) => {
  dispatch({ type: CONNECTION_REQUEST });
   try {
     const response = await api.post("/user/connect", { userId });
     dispatch({ type: CONNECTION_REQUEST_SUCCESS, payload: response.data });
   } catch (error) {
     dispatch({ type: CONNECTION_REQUEST_FAILURE, payload: error.message });
   }
 };

 export const connectToVendor = (userId) => async (dispatch) => {
  dispatch({ type: CONNECTION_REQUEST });
   try {
     const response = await api.post("/user/vendor", { userId });
     dispatch({ type: CONNECTION_REQUEST_SUCCESS, payload: response.data });
   } catch (error) {
     dispatch({ type: CONNECTION_REQUEST_FAILURE, payload: error.message });
   }
 };

 // Get Referral Code action
 export const getReferralCode = (userId) => async (dispatch) => {
  dispatch({ type: GET_REFERRAL_CODE_REQUEST });
  try {
    const response = await api.get(` /user/get-referral-code/${userId}`);
     dispatch({ type: GET_REFERRAL_CODE_SUCCESS, payload: response.data });
   } catch (error) {
    dispatch({ type: GET_REFERRAL_CODE_FAILURE, payload: error.message });
   }
 };


 export const validateReferralCode = (referralCode) => async (dispatch) => {
  dispatch({ type: 'VALIDATE_REFERRAL_CODE_REQUEST' });
  try {
    const response = await api.get(`/user/validate-referral-code/${referralCode}`);
    dispatch({ type: 'VALIDATE_REFERRAL_CODE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'VALIDATE_REFERRAL_CODE_FAILURE', payload: error.message });
  }
};


export const updateUser = (userId, userData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER });
  try {
    const formData = new FormData();

    // Append text fields
    if (userData.username) formData.append("username", userData.username);
    if (userData.email) formData.append("about", userData.email);
    if (userData.about) formData.append("about", userData.about);

    if (userData.phone) formData.append("about", userData.phone);

    // Append the file (profile picture) if it exists
    if (userData.profilePic) {
      formData.append("profilePic", {
        uri: userData.profilePic, // Path to the image (local or picked from gallery)
        type: "image/jpeg",      // MIME type
        name: "profile.jpg",     // File name (can be dynamic)
      });
    }

    const response = await api.put(`/user/update/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.status === "success") {
      const updatedUser = response.data.data;

      // Update AsyncStorage with new user details
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


export const acceptCode = (code) => async (dispatch) => {
  dispatch({ type: ACCEPT_CODE });
  
  try {
    const response = await api.post("/user/code/accept", { code }); // Adjust the endpoint as needed

    if (response.data.status === "success") {
      const { token, user } = response.data.data; // Adjust based on your API response
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      
      dispatch({ type: ACCEPT_CODE_SUCCESS, payload: { user, token } });
    }

    return response.data; // Return the response for further handling if needed
  } catch (error) {
    dispatch({
      type: ACCEPT_CODE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });

    throw new Error(error.response?.data?.message || "Code acceptance failed");
  }
};

 // fetch user information
 export const fetchUserData = () => async (dispatch) => {
  dispatch({ type: FETCH_USER_DATA_REQUEST });
  try {
    const response = await api.get("/user/profile");

    if (response.data.status === "success") {
      const user = response.data.data;
      dispatch({ type: FETCH_USER_DATA_SUCCESS, payload: user });
    } else {
      dispatch({ type: FETCH_USER_DATA_FAILURE, payload: response.data.message });
    }
  } catch (error) {
    dispatch({ type: FETCH_USER_DATA_FAILURE, payload: error.message });
  }
};