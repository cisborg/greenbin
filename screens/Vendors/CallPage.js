import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StreamCall, StreamVideo, StreamVideoClient, useCallStateHooks } from '@stream-io/video-react-native-sdk';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import Config from 'react-native-config';
import { initiateCall } from '../../redux/actions/calls'; // Import your action

// User Setup (JavaScript)
const user = {
  id: 1,
  name: 'Dave',
  image: 'https://getstream.io/random_svg/?id=cecilia&name=Cecilia',
};

const apiKey = Config.API_KEY;

const CallScreen = () => {
  const [callDetails, setCallDetails] = useState(null);
  const [client, setClient] = useState(null); // State to store StreamVideoClient instance
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();

  const dispatch = useDispatch();
  const callData = useSelector((state) => state.calls); // Replace with actual state slice

  useEffect(() => {
    const fetchCallDetails = async () => {
      try {
        // Ensure token is available before dispatching
        if (callData?.token && callData?.streamId) {
          const details = { callId: 'default_9733eae8-2b03-4b6b-8154-4709a3ccf2ca', user, token: callData.token };
          dispatch(initiateCall(details)); // Dispatch the action to initiate the call
          setCallDetails(details); // Set the call details when available
        } else {
          console.error('Token or Stream ID is not available yet');
        }
      } catch (error) {
        console.error('Error fetching call details:', error);
      }
    };

    fetchCallDetails();
  }, [dispatch, callData?.token]);

  useEffect(() => {
    // Set the client after call details are available
    if (callDetails?.token && callDetails?.streamId) {
      setClient(new StreamVideoClient({
        apiKey,
        user,
        token: callDetails.token,
      }));
    }
  }, [callDetails]);

  useEffect(() => {
    // Ensure the token and streamId are available before setting call details
    if (callData?.streamId && callData?.token) {
      setCallDetails({
        streamId: callData.streamId,
        token: callData.token,
        isAudioOnly: true, // Adjust as needed
      });
    }
  }, [callData]);

  const handleEndCall = () => {
    Alert.alert('End Call', 'Are you sure you want to end this call?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'End Call', onPress: () => Alert.alert('Call ended') },
    ]);
  };

  if (!client) {
    return <Text>Loading...</Text>; // Wait for the client to be initialized
  }

  // Only render StreamCall if the client is initialized and the token is available
  return (
    <StreamVideo client={client}>
      {/* StreamCall component wrapping the part where useCallStateHooks are used */}
      <StreamCall call={client.call('default', callDetails.streamId)}>
        <View style={styles.container}>
          <Text style={styles.userName}>Cecilia Jessica</Text>
          <Text style={styles.participantCount}>Participants: {participantCount}</Text>

          {/* Stream Video */}
          <View style={styles.streamContainer}>
            <Text>Call {callDetails.streamId}</Text>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Feather name="video" size={24} color="green" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="person-add-sharp" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.endCallButton} onPress={handleEndCall}>
              <MaterialIcons name="call-end" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </StreamCall>
    </StreamVideo>
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
    
    userName: {
      fontSize: 20,
      color: '#333', // Neutral dark text for better contrast
      marginTop: 10,
      fontWeight: '600',
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
    
   
  })
  

export default CallScreen;