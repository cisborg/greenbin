import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StreamCall } from '@stream-io/video-react-native-sdk';

const IncomingCallScreen = ({ navigation }) => {
  const [call, setCall] = useState(null); // Incoming call data

  useEffect(() => {
    // Replace with Stream SDK's actual incoming call listener
    const listener = StreamCall.onIncomingCall((incomingCall) => {
      setCall(incomingCall);
    });

    return () => {
      // Unsubscribe on unmount
      listener.remove();
    };
  }, []);

  const handleAccept = () => {
    call?.accept(); // Accept call logic
  };

  const handleDecline = () => {
    call?.decline(); // Decline call logic
    setCall(null); // Clear call state
  };

  if (!call) {
    return null; // No incoming call
  }

  return (
    <View style={styles.container}>
      <Text style={styles.callerText}>Incoming Call from {call.caller?.name || 'Unknown Caller'}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.declineButton} onPress={handleDecline}>
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  callerText: { fontSize: 18, marginBottom: 16 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '80%' },
  acceptButton: { backgroundColor: 'green', padding: 12, borderRadius: 8 },
  declineButton: { backgroundColor: 'red', padding: 12, borderRadius: 8 },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

export default IncomingCallScreen;
