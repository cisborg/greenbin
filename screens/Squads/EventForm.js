import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  Animated
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { addSquadActivity } from './path/to/actions';
import LottieView from 'lottie-react-native'; // Import Lottie component

const EventForm = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [eventLocation, setEventLocation] = useState('');
  const [eventPhoto, setEventPhoto] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(true); // State for controlling the loading screen

  const dispatch = useDispatch();
  const loading = useSelector(state => state.squadActivities.loading);
  const error = useSelector(state => state.squadActivities.error);

  useEffect(() => {
    // Simulate an async loading (you can replace this with actual data fetching or other loading logic)
    setTimeout(() => {
      setIsLoading(false); // Turn off loading after 3 seconds
    }, 3000);

    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'You need to grant permission to access the camera roll.');
      }
    };
    requestPermissions();
  }, []);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setEventPhoto(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!eventName || !eventLocation) {
      Alert.alert('Entry Error', 'Please fill in all required fields.');
      return;
    }

    const activity = {
      name: eventName,
      date: eventDate.toISOString(),
      location: eventLocation,
      image: eventPhoto,
    };

    // Dispatch addSquadActivity action
    dispatch(addSquadActivity(activity));
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  if (isLoading) {
    // Show Lottie animation while loading
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('../../assets/lottie/rotateLoad.json')} // Path to your Lottie JSON file
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.label}>Event Name:</Text>
          <TextInput
            style={styles.input}
            value={eventName}
            onChangeText={setEventName}
            placeholder="Enter event name"
          />

          <Text style={styles.label}>Event Date:</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>{eventDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={eventDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setEventDate(selectedDate);
                }
              }}
            />
          )}

          <Text style={styles.label}>Location:</Text>
          <TextInput
            style={styles.input}
            value={eventLocation}
            onChangeText={setEventLocation}
            placeholder="Enter location"
          />

          <Text style={styles.label}>Event Photo:</Text>
          <TouchableOpacity onPress={handleImagePick}>
            <Text style={styles.photoButton}>Pick an image</Text>
          </TouchableOpacity>
          {eventPhoto && <FastImage source={{ uri: eventPhoto }} style={styles.image} resizeMode={FastImage.resizeMode.cover} />}

          <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
            <Text style={{ color: 'white' }}>Submit Event</Text>
          </TouchableOpacity>

          {loading && (
            <ActivityIndicator size="large" color={'green'} style={styles.loader} />
          )}

          {error && (
            <Text style={styles.errorText}>Error: {error}</Text>
          )}

        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 150,
    height: 150,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    backgroundColor: 'lightgray',
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 14,
  },
  dateText: {
    height: 40,
    backgroundColor: 'lightgray',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 14,
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  submit: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 14,
    marginBottom: 15,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  okButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
  },
  okButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default EventForm;
