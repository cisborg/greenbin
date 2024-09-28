import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Share, Switch, Dimensions, ActivityIndicator , Alert} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Color } from '../../GlobalStyles';

const { width, height } = Dimensions.get('window');

const donationCategories = [
  { id: '1', name: 'Tree Planting', impact: '1000 points = 1 tree planted', pointsRequired: 1000 },
  { id: '2', name: 'Waste Management', impact: '20000 points = 1 community clean-up', pointsRequired: 20000 },
  { id: '3', name: 'Community Support', impact: '5500 points = support for 1 individual', pointsRequired: 5500 },
];

const DonatePoints = () => {
  const navigation = useNavigation();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [donationAmount, setDonationAmount] = useState(100); // Minimum donation set to 100
  const [isRecurring, setIsRecurring] = useState(false);
  const [loading, setLoading] = useState(false); // Activity Indicator state

  // 🚀 Calculate total required points for selected categories
  const getTotalPointsRequired = () => {
    return selectedCategories.reduce((total, category) => total + category.pointsRequired, 0);
  };

  // 🚀 Enhanced donation handling: ensure donation matches or exceeds total required points
  const handleDonation = () => {
    const totalPointsRequired = getTotalPointsRequired();

    if (selectedCategories.length === 0) {
      Alert.alert("Error", "Please select at least one donation category.");
      return;
    }

    if (donationAmount < totalPointsRequired) {
      Alert.alert("Error", `Please donate at least ${totalPointsRequired} points for the selected categories.`);
      return;
    }

    // Show loading spinner for 2 seconds before navigating to donation confirmation screen
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('donationConfirmed');  // Navigate to the confirmed screen
    }, 2000); // 2 second delay for spinner
  };

  // 📲 Share donation details with spinner
  const shareDonation = () => {
    const totalPointsRequired = getTotalPointsRequired();
    if (donationAmount < totalPointsRequired) {
      Alert.alert("Error", `Please donate at least ${totalPointsRequired} points to share.`);
      return;
    }

    // Show loading spinner for 2 seconds before sharing
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const categories = selectedCategories.map(cat => cat.name).join(', ');
      Share.share({
        message: `I just donated ${donationAmount} points for ${categories}! Join me in making a difference!`,
      });
    }, 2000); // 2 second delay for spinner
  };

  // ⚙️ Handle category selection, limit to 3 categories
  const handleSelectCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat.id !== category.id));
    } else {
      if (selectedCategories.length >= 3) {
        Alert.alert("Error", "You can donate to a maximum of 3 categories.");
      } else {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategories.some(cat => cat.id === item.id) && styles.selectedCategory
      ]}
      onPress={() => handleSelectCategory(item)}
    >
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.categoryImpact}>{item.impact}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#FFF" />
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
        minimumValue={100}  // Minimum 100 points to donate
        maximumValue={100000}
        step={250}
        value={donationAmount}
        onValueChange={setDonationAmount}
        style={styles.slider}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#2196F3" style={styles.activityIndicator} />
      ) : (
        <>
          <TouchableOpacity style={styles.donateButton} onPress={handleDonation}>
            <Text style={styles.buttonText}>Donate Now</Text>
          </TouchableOpacity>

          {selectedCategories.length > 0 && (
            <View style={styles.impactVisualization}>
              <Text style={styles.impactText}>
                You are donating {donationAmount} points for {selectedCategories.map(cat => cat.name).join(', ')}.
              </Text>
              <Text style={styles.impactText}>
                Total points required: {getTotalPointsRequired()}.
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.shareButton} onPress={shareDonation}>
            <Text style={styles.buttonText}>Share My Donation</Text>
          </TouchableOpacity>
        </>
      )}

      <View style={styles.recurringContainer}>
        <Text style={styles.recurringText}>Enable Recurring Donations</Text>
        <Switch
          value={isRecurring}
          onValueChange={() => setIsRecurring(!isRecurring)}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isRecurring ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>

      {isRecurring && (
        <View style={styles.recurringInfo}>
          <Text style={styles.recurringText}>
            Recurring donations of {donationAmount} points for {selectedCategories.map(cat => cat.name).join(', ')} enabled!
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
    padding: width * 0.05,
    justifyContent: 'flex-start',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
    backgroundColor: '#4CAF50',
    padding: height * 0.02,
    borderRadius: 12,
  },
  header: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginLeft: 20,
    color: '#FFF',
  },
  description: {
    fontSize: width * 0.04,
    marginBottom: height * 0.02,
    color: '#333',
  },
  categoryList: {
    marginBottom: height * 0.02,
    maxHeight: height * 0.25,
  },
  categoryItem: {
    padding: height * 0.02,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: height * 0.01,
    backgroundColor: '#fff',
  },
  selectedCategory: {
    borderColor: '#4CAF50',
    backgroundColor: '#e8f5e9',
  },
  categoryName: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: width * 0.040,
    fontWeight: '600',
    color: 'black',
  },
  categoryImpact: {
    fontSize: width * 0.035,
    color: '#555',
  },
  sliderLabel: {
    fontSize: width * 0.04,
    marginVertical: height * 0.01,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: height * 0.02,
  },
  donateButton: {
    backgroundColor: '#4CAF50',
    padding: height * 0.015,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  shareButton: {
    backgroundColor: '#2196F3',
    padding: height * 0.015,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.01,
    marginTop: height * 0.02,
  },
  impactVisualization: {
    marginTop: height * 0.02,
    padding: height * 0.02,
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 14,
    backgroundColor: '#e8f5e9',
  },
  impactText: {
    fontSize: width * 0.04,
    color: '#333',
  },
  recurringContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
  },
  recurringText: {
    fontSize: width * 0.04,
    color: '#333',
  },
  recurringInfo: {
    marginTop: height * 0.01,
    padding: height * 0.02,
    borderColor: '#FFC107',
    borderWidth: 1,
    borderRadius: 14,
    backgroundColor: '#fff3cd',
  },
  activityIndicator: {
    marginTop: height * 0.02, // Adjust spinner position
  },
});

export default DonatePoints;
