import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  Animated,
  Platform,
  StatusBar
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

const EventForm = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [eventLocation, setEventLocation] = useState('');
  const [eventPhoto, setEventPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

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
    if (!eventName || !eventLocation) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalVisible(true);
    }, 2000); // Simulate network request
  };

  return (
    <SafeAreaView style={styles.container}>
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
          {eventPhoto && <Image source={{ uri: eventPhoto }} style={styles.image} />}

          <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
            <Text style={{ color: 'white' }}>Submit Event</Text>
          </TouchableOpacity>

          {loading && (
            <ActivityIndicator size="large" color={'green'} style={styles.loader} />
          )}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Event Submitted Successfully</Text>
                <TouchableOpacity
                  style={styles.okButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.okButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
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
    color: 'green',
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
