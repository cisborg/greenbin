import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList, Share } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Color } from '../GlobalStyles';

const donationCategories = [
  { id: '1', name: 'Tree Planting', impact: '1000 points = 1 tree planted' },
  { id: '2', name: 'Waste Management', impact: '20000 points = 1 community clean-up' },
  { id: '3', name: 'Community Support', impact: '5500 points = support for 1 individual' },
];

const DonatePoints = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [donationAmount, setDonationAmount] = useState(0);
  const [isRecurring, setIsRecurring] = useState(false);

  const handleDonation = () => {
    if (!selectedCategory) {
      Alert.alert("Error", "Please select a donation category.");
      return;
    }
    if (donationAmount <= 0) {
      Alert.alert("Error", "Please enter a valid donation amount.");
      return;
    }

    Alert.alert("Success", `You have donated ${donationAmount} points for ${selectedCategory.name}!`);
    setDonationAmount(0);
    setSelectedCategory(null);
  };

  const shareDonation = () => {
    Share.share({
      message: `I just donated ${donationAmount} points for ${selectedCategory?.name}! Join me in making a difference!`,
    });
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryItem, selectedCategory?.id === item.id && styles.selectedCategory]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.categoryImpact}>{item.impact}</Text>
    </TouchableOpacity>
  );

  const viewDonationHistory = () => {
    Alert.alert("Donation History", "This feature is under development."); // Placeholder for future functionality
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Donate Points</Text>
      </View>

      <Text style={styles.description}>
        Choose a category to donate your points and see the impact of your generosity.
      </Text>

      <FlatList
        data={donationCategories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        style={styles.categoryList}
      />

      <Text style={styles.sliderLabel}>Donation Amount: {donationAmount} points</Text>
      <Slider
        minimumValue={2000}
        maximumValue={100000}
        step={2000}
        value={donationAmount}
        onValueChange={setDonationAmount}
        style={styles.slider}
      />

      <TouchableOpacity style={styles.donateButton} onPress={()=> navigation.navigate('DonationSuccessful')}>
        <Text style={styles.buttonText}>Donate</Text>
      </TouchableOpacity>

      {selectedCategory && (
        <View style={styles.impactVisualization}>
          <Text style={styles.impactText}>
            You are donating {donationAmount} points for {selectedCategory.name}.
          </Text>
          <Text style={styles.impactText}>
            {selectedCategory.impact}
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.shareButton} onPress={shareDonation}>
        <Text style={styles.buttonText}>Share My Donation</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.historyButton} onPress={()=> navigation.navigate('DonationHistory')}>
        <Text style={styles.buttonText}>Donation History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.recurringButton} onPress={() => setIsRecurring(!isRecurring)}>
        <Text style={styles.buttonText}>{isRecurring ? "Disable Recurring Donations" : "Enable Recurring Donations"}</Text>
      </TouchableOpacity>

      {isRecurring && (
        <View style={styles.recurringInfo}>
          <Text style={styles.recurringText}>
            You have enabled recurring donations of {donationAmount} points for {selectedCategory?.name}!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
    overflow: 'hidden',
    justifyContent: 'flex-start'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  categoryList: {
    marginBottom: 20,
    maxHeight: 200,
  },
  categoryItem: {
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  selectedCategory: {
    borderColor: '#4CAF50',
    backgroundColor: '#e8f5e9',
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryImpact: {
    fontSize: 14,
    color: '#555',
  },
  sliderLabel: {
    fontSize: 16,
    marginVertical: 10,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
  donateButton: {
    backgroundColor: 'white',
    shadowColor: '#000',
    left: 80,
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    alignContent: 'center',
    width: 200,
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  shareButton: {
    backgroundColor: 'white',
    shadowColor: '#000',
    left: 60,
    marginTop: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    alignContent: 'center',
    width: 250,
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyButton: {
    backgroundColor: 'white',
    shadowColor: '#000',
    left: 60,
    marginTop: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    alignContent: 'center',
    width: 250,
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: Color.colorLimegreen_200,
    fontSize: 18,
    fontWeight: 'bold',
  },
  impactVisualization: {
    marginTop: 20,
    padding: 15,
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 14,
    backgroundColor: '#e8f5e9',
  },
  impactText: {
    fontSize: 16,
    color: '#333',
  },
  recurringButton: {
    backgroundColor: 'white',
    shadowColor: '#000',
    left: 40,
    marginTop: 20,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    alignContent: 'center',
    width: 280,
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  recurringInfo: {
    marginTop: 10,
    padding: 10,
    borderColor: '#FFC107',
    borderWidth: 1,
    borderRadius: 14,
    backgroundColor: '#fff3cd',
  },
  recurringText: {
    fontSize: 16,
    color: Color.colorLimegreen_200,
  },
});

export default DonatePoints;
