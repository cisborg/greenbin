import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import { StreamCall } from '@stream-io/video-react-native-sdk';
import {
  setCallStatus,
  setUserStatus,
  incrementTalkTime,
  toggleMute,
  toggleScreenSize,
  resetCallState,
} from '../../redux/actions/calls';

const fetchUserStatus = async () => 'On another call';
const subscribeToUserStatus = (callback) => {
  const interval = setInterval(() => callback('Available'), 10000);
  return () => clearInterval(interval);
};

const CallScreen = () => {
  const dispatch = useDispatch();
  const {
    callStatus,
    userStatus,
    talkTime,
    isMuted,
    isSmallScreen,
  } = useSelector((state) => state.call);

  const [callDetails, setCallDetails] = useState(null); // For storing call details
  const timerRef = useRef(null);

  // Dummy token and streamId should be replaced  with actual data from the backend

  const streamId = 'my-stream-id'; // This should come from Stream's API
  const token = 'my_stream_token_here'; // Replace with your token from Stream API

  useEffect(() => {
    const fetchStatus = async () => {
      const status = await fetchUserStatus();
      dispatch(setUserStatus(status));
    };
    fetchStatus();

    const unsubscribe = subscribeToUserStatus((newStatus) => {
      dispatch(setUserStatus(newStatus));
    });

    timerRef.current = setInterval(() => dispatch(incrementTalkTime()), 1000);

    //  set up voice call details should  come from the Stream API)
    setCallDetails({
      streamId,
      token,
      isAudioOnly: true, // Audio-only call
    });

    return () => {
      clearInterval(timerRef.current);
      unsubscribe();
    };
  }, [dispatch]);

  const handleEndCall = () => {
    Alert.alert('End Call', 'Are you sure you want to end this call?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'End Call', onPress: () => dispatch(resetCallState()) },
    ]);
  };

  const formatTalkTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, isSmallScreen && styles.smallScreenContainer]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => dispatch(toggleScreenSize())}>
          <MaterialCommunityIcons name="arrow-collapse" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.userName}>Cecilia Jessica</Text>
        <TouchableOpacity onPress={() => Alert.alert('Group Call', 'Group call initiated!')}>
          <Ionicons name="person-add-sharp" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.callDuration}>
        {callStatus || formatTalkTime(talkTime)}
      </Text>
      <Text style={styles.userStatus}>{userStatus}</Text>

      {!isSmallScreen && (
        <LottieView
          source={require('../../assets/lottie/rotateLoad.json')} // Add your Lottie file path
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
      )}

      {/* Stream Video for Voice Call */}
      {callDetails && (
        <StreamCall
          streamId={callDetails.streamId}
          token={callDetails.token}
          audioOnly={callDetails.isAudioOnly}  // Set to true for audio-only
          style={styles.streamVideo}
        />
      )}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => dispatch(toggleMute())}>
          <Octicons name={isMuted ? 'mute' : 'unmute'} size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Feather name="video" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <MaterialCommunityIcons name="microphone-off" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.endCallButton} onPress={handleEndCall}>
          <MaterialIcons name="call-end" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#ffffff', // Improved readability with hex color
      padding: 20,
      overflow: 'hidden',
    },
    smallScreenContainer: {
      width: '85%', // Slightly adjusted for more content space
      height: '50%', // Increased height for visibility
      position: 'absolute',
      top: 25,
      right: 20,
      borderRadius: 20,
      borderColor: '#ddd', // Subtle border for elegance
      borderWidth: 1,
      backgroundColor: '#f9f9f9', // Softer background
      padding: 15,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
      elevation: 5, // Enhanced for Android devices
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 20,
      marginTop: 20,
      borderBottomWidth: 0.5,
      borderBottomColor: '#ccc', // Added a divider for better structure
      paddingBottom: 10,
    },
    userName: {
      fontSize: 20,
      color: '#333', // Neutral dark text for better contrast
      marginTop: 10,
      fontWeight: '600',
    },
    userStatus: {
      fontSize: 16,
      color: '#555', // Slightly darker for readability
      marginTop: 8,
    },
    callDuration: {
      fontSize: 18,
      color: '#666',
      marginVertical: 8,
      fontStyle: 'italic', // Stylized for emphasis
    },
    animationContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginVertical: 15,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '90%', // Adjusted to center-align buttons better
      padding: 15,
      alignItems: 'center',
      shadowOffset: { width: 0, height: 2 },
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      marginTop: 20,
      elevation: 3,
      backgroundColor: '#f4f4f4', // Added subtle background for container
      borderRadius: 20,
    },
    button: {
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#e7f4e9', // Soft green background for buttons
      borderRadius: 50,
      elevation: 1,
    },
    endCallButton: {
      backgroundColor: '#ff4d4d',
      borderRadius: 50,
      paddingVertical: 12,
      paddingHorizontal: 25,
      alignItems: 'center',
      shadowColor: '#ff4d4d',
      shadowOpacity: 0.4,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 4,
    },
    waveContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      height: 100,
      width: '100%',
      overflow: 'hidden',
      backgroundColor: '#f0f0f0', // Added contrast to the wave area
    },
    wave: {
      width: 15,
      height: 40,
      backgroundColor: 'rgba(0, 255, 0, 0.4)', // Subtle color for the wave
      borderRadius: 8,
      marginHorizontal: 4,
    },
  })
  

export default CallScreen;
