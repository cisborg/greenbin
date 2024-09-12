import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/core';
import { Color } from '../GlobalStyles';


const WaveAnimation = () => {
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start wave animation
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

    return () => waveAnimation.stop(); // Cleanup on unmount
  }, [waveAnim]);

  const waveStyle = {
    transform: [{
      translateY: waveAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -20], // Adjust the bounce height
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
  const [talkTime, setTalkTime] = useState(0); // Talk time in seconds
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity value

  useEffect(() => {
    // Start with "Calling..." and fade out after 2 seconds
    const callingTimeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000, // Fade out duration
        useNativeDriver: true,
      }).start(() => {
        setCallStatus('Ringing...');
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2000, // Fade in duration
          useNativeDriver: true,
        }).start(() => {
          // After 10 seconds of ringing, start talk time
          setTimeout(() => {
            setCallStatus(''); // Clear the call status
            startTalkTime(); // Start the talk time
          }, 4000); // 10 seconds
        });
      });
    }, 2000); // Initial duration for "Calling..."

    return () => clearTimeout(callingTimeout); // Cleanup on unmount
  }, [fadeAnim]);

  const startTalkTime = () => {
    const timer = setInterval(() => {
      setTalkTime(prevTime => prevTime + 1); // Increment talk time by 1 second
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  };

  // Format talk time to HH.MM.SS
  const formatTalkTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours > 0 ? `${hours}.` : ''}${String(minutes).padStart(2, '0')}.${String(secs).padStart(2, '0')}`;
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
        <TouchableOpacity style={styles.endCallButton} onPress={()=> navigation.goBack()}>
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
  callDuration: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center', // Center the wave animation vertically
    alignItems: 'center', // Center the wave animation horizontally
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
    backgroundColor: 'rgba(0, 255, 0, 0.5)', // Adjust color as needed
    borderRadius: 10,
    marginHorizontal: 5,
  },
});

export default CallScreen;
