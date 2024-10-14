import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Platform, StatusBar } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

const EventForm = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [eventLocation, setEventLocation] = useState('');
  const [eventPhoto, setEventPhoto] = useState(null);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setShowDatePicker(false);
    setEventDate(currentDate);
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setEventPhoto(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    const formattedDate = eventDate.toLocaleString('en-US', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
    });
    const eventData = {
      name: eventName,
      date: formattedDate,
      location: eventLocation,
      photo: eventPhoto,
    };
    console.log('Event Data:', eventData);
    // Here you would typically send the eventData to your server or state management
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.label}>Event Name:</Text>
      <TextInput
        style={styles.input}
        value={eventName}
        onChangeText={setEventName}
      />

      <Text style={styles.label}>Event Date:</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>{eventDate.toLocaleString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={eventDate}
          mode="datetime"
          display={Platform.OS === 'ios' ? 'default' : 'spinner'}
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        value={eventLocation}
        onChangeText={setEventLocation}
      />

      <Text style={styles.label}>Event Photo:</Text>
      <TouchableOpacity onPress={handleImagePick} style={styles.photoButton}>
        <Text style={styles.photoButtonText}>Pick an image</Text>
      </TouchableOpacity>
      {eventPhoto && <Image source={{ uri: eventPhoto }} style={styles.image} />}

      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Submit Event</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
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
  photoButtonText: {
    color: 'white',
    textAlign: 'center',
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
});

export default EventForm;
