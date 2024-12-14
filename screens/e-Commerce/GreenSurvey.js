import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux'; 
import { submitWasteCollection } from '../../redux/actions/greenSurvey';

const SurveyScreen = () => {
  const dispatch = useDispatch(); // Initialize dispatch
  const { loading, error } = useSelector((state) => state.waste); 
  const [weight, setWeight] = useState('');
  const [numberOfWastes, setNumberOfWastes] = useState('');
  const [squad, setSquad] = useState('');
  const [points, setPoints] = useState('');
  const [receipt, setReceipt] = useState(null);

  const calculatePoints = async () => {
    setPoints('');

    setTimeout(async () => {
      const weightInKg = parseFloat(weight);
      const numberOfItems = parseInt(numberOfWastes, 10);
      let earnedPoints = 0;

      if (numberOfItems > 3) {
        setPoints("You can only submit a maximum of 3 items.");
      } else {
        if (weightInKg < 0.5) {
          earnedPoints = Math.min(3, Math.floor(weightInKg * 6));
          setPoints(`You earned ${earnedPoints} points as "Eco Champion"!`);
        } else if (weightInKg >= 0.5 && weightInKg <= 1) {
          earnedPoints = Math.min(3, Math.floor(weightInKg * 6));
          setPoints(`You earned ${earnedPoints} points as "Green Guardian"!`);
        } else if (weightInKg > 1) {
          earnedPoints = Math.min(3, Math.floor(weightInKg * 6));
          setPoints(`You earned ${earnedPoints} points as "Waste Wizard"!`);
        }

        // Prepare the data to dispatch
        const data = {
          weight: weightInKg,
          numberOfWastes: numberOfItems,
          squad,
          receipt, // Include the receipt URI here
        };

        // Dispatch the action to submit waste collection
        try {
          await dispatch(submitWasteCollection(data));
          setPoints("Waste collection submitted successfully!");
        } catch (error) {
          setPoints("Failed to submit waste collection.");
        }
      }
    }, 2000);
  };

  const uploadReceipt = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setReceipt(result.assets[0].uri);
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
        placeholder="Enter squad names"
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
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {points ? <Text style={styles.result}>{points}</Text> : null}
      {error && <Text style={styles.error}>{error}</Text>} {/* Display error message */}
      <Text style={styles.footnote}>
        *Please ensure you have received a stamped receipt of your personal collections before inputting the weight.
      </Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  receiptImage: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  footnote: {
    marginTop: 20,
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
});

export default SurveyScreen;
