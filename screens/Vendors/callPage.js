import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/core';
import { Color } from '../../GlobalStyles';

// Mock function to simulate fetching user status
const fetchUserStatus = async () => {
  // Replace with actual API call
  return 'On another call';
};

// Mock function to simulate subscribing to user status updates
const subscribeToUserStatus = (callback) => {
  // Simulate real-time updates
  const interval = setInterval(() => {
    callback('Available'); // Simulate user status change
  }, 10000); // Change status every 10 seconds

  return () => clearInterval(interval);
};

const WaveAnimation = () => {
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const waveAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    waveAnimation.start();

    return () => waveAnimation.stop();
  }, [waveAnim]);

  const waveStyle = {
    transform: [{
      translateY: waveAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -20],
      }),
    }],
  };

  return (
    <View style={styles.waveContainer}>
      <Animated.View style={[styles.wave, waveStyle]} />
      <Animated.View style={[styles.wave, waveStyle]} />
      <Animated.View style={[styles.wave, waveStyle]} />
    </View>
  );
};

const CallScreen = () => {
  const navigation = useNavigation();
  const [callStatus, setCallStatus] = useState('Calling...');
  const [userStatus, setUserStatus] = useState('Loading...'); // Initial loading state
  const [talkTime, setTalkTime] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fetch initial user status
    const fetchStatus = async () => {
      const status = await fetchUserStatus();
      setUserStatus(status);
    };

    fetchStatus();

    // Subscribe to real-time updates
    const unsubscribe = subscribeToUserStatus((newStatus) => {
      setUserStatus(newStatus);
    });

    const callingTimeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        setCallStatus('Ringing...');
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            setCallStatus(''); 
            startTalkTime(); 
          }, 4000); 
        });
      });
    }, 2000);

    return () => {
      clearTimeout(callingTimeout);
      unsubscribe(); // Cleanup subscription on unmount
    };
  }, [fadeAnim]);

  const startTalkTime = () => {
    const timer = setInterval(() => {
      setTalkTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  };

  const formatTalkTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours > 0 ? `${hours}:` : ''}${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    Alert.alert("End Call", "Are you sure you want to end the call?", [
      { text: "Cancel", style: "cancel" },
      { text: "End Call", onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Foundation name="arrows-compress" size={24} color="black" />
        <Text style={styles.userName}>Cecilia Jessica</Text>
        <FontAwesome5 name="users" size={24} color="black" />
      </View>

      {/* Call Status Text */}
      <Animated.Text style={[styles.callDuration, { opacity: fadeAnim }]}>
        {callStatus || formatTalkTime(talkTime)}
      </Animated.Text>
      
      {/* User Status */}
      <Text style={styles.userStatus}>{userStatus}</Text>

      {/* Wave Animation in the middle of the screen */}
      <View style={styles.animationContainer}>
        <WaveAnimation />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Octicons name="unmute" size={24} color="green" />
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
    backgroundColor: Color.colorWhite,
    padding: 20,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  userName: {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    fontWeight: 'bold',
  },
  userStatus: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  callDuration: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 40,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomRightRadius: 10,
  },
  button: {
    alignItems: 'center',
  },
  endCallButton: {
    backgroundColor: '#ff4d4d',
    borderRadius: 35,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: -12,
  },
  waveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 100,
    width: '100%',
    overflow: 'hidden',
  },
  wave: {
    width: 20,
    height: 50,
    backgroundColor: 'rgba(0, 255, 0, 0.5)',
    borderRadius: 10,
    marginHorizontal: 5,
  },
});

export default CallScreen;
