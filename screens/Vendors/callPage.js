import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';
import { Color } from '../../GlobalStyles';

// Mock function to simulate fetching user status
const fetchUserStatus = async () => {
  return 'On another call';
};

// Mock function to simulate subscribing to user status updates
const subscribeToUserStatus = (callback) => {
  const interval = setInterval(() => {
    callback('Available');
  }, 10000);
  return () => clearInterval(interval); // Cleanup interval on unsubscribe
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

    return () => waveAnimation.stop(); // Cleanup wave animation on unmount
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
  const [userStatus, setUserStatus] = useState('Loading...');
  const [talkTime, setTalkTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false); // Mute state
  const [isSmallScreen, setIsSmallScreen] = useState(false); // Resize state
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef(null); // Timer reference for cleanup

  useEffect(() => {
    const fetchStatus = async () => {
      const status = await fetchUserStatus();
      setUserStatus(status);
    };
    fetchStatus();

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
            startTalkTime(); // Start the talk time when status is updated
          }, 4000);
        });
      });
    }, 2000);

    return () => {
      clearTimeout(callingTimeout); // Clear timeout on cleanup
      unsubscribe(); // Unsubscribe from updates
      clearInterval(timerRef.current); // Clear the interval timer on unmount
    };
  }, [fadeAnim]);

  const startTalkTime = () => {
    timerRef.current = setInterval(() => {
      setTalkTime(prevTime => prevTime + 1);
    }, 1000);
  };

  const stopTalkTime = () => {
    clearInterval(timerRef.current);
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
      { text: "End Call", onPress: () => {
        clearInterval(timerRef.current); // Stop timer
        navigation.goBack(); // Exit screen
      }}
    ]);
  };

  const toggleMute = () => {
    setIsMuted((prevMute) => {
      if (!prevMute) {
        stopTalkTime(); // Stop timer if muted
        setCallStatus('Muted');
      } else {
        startTalkTime(); // Resume timer if unmuted
        setCallStatus('');
      }
      return !prevMute; // Toggle mute state
    });
  };

  const handleGroupCall = () => {
    Alert.alert("Group Call", "Group call initiated!");
    // Logic for initiating group call goes here
  };

  const toggleScreenSize = () => {
    setIsSmallScreen(!isSmallScreen); // Toggle between full and small screen
    if (!isSmallScreen) {
      navigation.goBack(); // Navigate back if screen is minimized
    }
  };

  return (
    <View style={[styles.container, isSmallScreen && styles.smallScreenContainer]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleScreenSize}>
          <MaterialCommunityIcons name="arrow-collapse" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.userName}>Cecilia Jessica</Text>
        <TouchableOpacity onPress={handleGroupCall}>
          <Ionicons name="person-add-sharp" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Wrap Text inside another Text component to prevent errors */}
      <View>
        <Animated.Text style={[styles.callDuration, { opacity: fadeAnim }]}>
          {callStatus || formatTalkTime(talkTime)}
        </Animated.Text>
      </View>
      
      <View>
        <Text style={styles.userStatus}>{userStatus}</Text>
      </View>

      {!isSmallScreen && (
        <View style={styles.animationContainer}>
          <WaveAnimation />
        </View>
      )}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleMute}>
          <Octicons name={isMuted ? "mute" : "unmute"} size={24} color="green" />
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
  smallScreenContainer: {
    width: '80%', // Reduced screen width
    height: '40%', // Reduced screen height
    position: 'absolute',
    top: 20,
    right: 20,
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
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
    fontSize: 18,
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
    padding: 20,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    margin: 20,
    elevation: 1,
    borderRadius: 17,
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
