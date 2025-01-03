import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { submitWasteCollection } from '../../redux/actions/greenSurvey'; // Assuming this is still needed for submission

const SurveyScreen = () => {
  const [weight, setWeight] = useState('');
  const [numberOfWastes, setNumberOfWastes] = useState('');
  const [squad, setSquad] = useState('');
  const [points, setPoints] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false); // Local loading state
  const [error, setError] = useState(null); // Local error state

  const showToast = (type, message) => {
    Toast.show({
      type,
      text1: message,
      visibilityTime: 4000,
    });
  };

  const validateInputs = () => {
    const weightInKg = parseFloat(weight);
    const numberOfItems = parseInt(numberOfWastes, 10);

    if (isNaN(weightInKg) || weightInKg <= 0) {
      showToast('error', 'Please enter a valid weight in kilograms.');
      return false;
    }

    if (isNaN(numberOfItems) || numberOfItems <= 0 || numberOfItems > 3) {
      showToast('error', 'Number of items must be between 1 and 3.');
      return false;
    }

    if (!squad.trim()) {
      showToast('error', 'Please enter your squad name.');
      return false;
    }

    return true;
  };

  const calculatePoints = async () => {
    if (!validateInputs()) return;

    const weightInKg = parseFloat(weight);
    const numberOfItems = parseInt(numberOfWastes, 10);
    let earnedPoints = Math.min(3, Math.floor(weightInKg * 6));
    let tier = '';

    if (weightInKg < 0.5) {
      tier = 'Eco Champion';
    } else if (weightInKg >= 0.5 && weightInKg <= 1) {
      tier = 'Green Guardian';
    } else {
      tier = 'Waste Wizard';
    }

    setLoading(true); // Set loading to true
    setError(null); // Reset error state

    try {
      const data = {
        weight: weightInKg,
        numberOfWastes: numberOfItems,
        squad,
        receipt,
      };

      await submitWasteCollection(data); // Assuming this is an async action
      setPoints(`You earned ${earnedPoints} points as "${tier}"!`);
      showToast('success', `Points Calculated: ${earnedPoints}, Tier: ${tier}`);
    } catch (err) {
      setError('Failed to submit waste collection. Please try again.'); // Set error message
      showToast('error', 'Failed to submit waste collection. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const uploadReceipt = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setReceipt(result.assets[0].uri);
        showToast('success', 'Receipt uploaded successfully!');
      }
    } catch (err) {
      showToast('error', 'Could not upload the receipt. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>E-Waste Collection Survey</Text>
      <Text style={styles.label}>How many e-wastes have you collected (max 3 items)?</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter number of items"
        value={numberOfWastes}
        onChangeText={setNumberOfWastes}
      />
      <Text style={styles.label}>How much e-waste have you collected (in kg)?</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter weight in kg"
        value={weight}
        onChangeText={setWeight}
      />
      <Text style={styles.label}>Enter the squad you are currently active in:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter squad name"
        value={squad}
        onChangeText={setSquad}
      />
      <TouchableOpacity style={styles.button} onPress={calculatePoints}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadButton} onPress={uploadReceipt}>
        <Text style={styles.buttonText}>Upload Receipt</Text>
      </TouchableOpacity>
      {receipt && <Image source={{ uri: receipt }} style={styles.receiptImage} />}
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      {points && <TouchableOpacity style={styles.resultBtn}>
            <Text style={styles.result}>{points}</Text>
        </TouchableOpacity>}
      {error && <Text style={styles.error}>Error: {error}</Text>}
      <Text style={styles.footer}>Thank you for your participation!</Text>
      <Text style={styles.footnote}>
        *Please ensure you have received a stamped receipt of your personal collections before inputting the weight.
      </Text>
      <Toast />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green',
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'green',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 10,
  },
  receiptImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 14,
  },
  resultBtn: {
    backgroundColor: '#f3f3f3',
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderColor: 'green', 
    marginBottom: 10
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green'
  },
  footnote: {
    marginTop: 20,
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
});

export default SurveyScreen;
