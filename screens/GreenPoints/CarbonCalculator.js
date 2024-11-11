import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, SafeAreaView, Animated, ScrollView } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native'; // Import Lottie

const screenWidth = Dimensions.get('window').width;

// Refactored Pie Chart Data
const pieData = {
  activities: [
    { name: "Waste Clean", population: 70, color: "#4CAF50" },
    { name: "Tree Planting", population: 50, color: "#FF9800" },
    { name: "Recycling", population: 40, color: "#2196F3" }
  ],
  donations: [
    { name: "Bronze", population: 12, color: "#CD7F32" },
    { name: "Silver", population: 5, color: "#9C27B0" },
    { name: "Titanium", population: 3, color: "#00BCD4" },
    { name: "Gold", population: 2, color: "#FFD700" },
    { name: "Platinum", population: 1, color: "green" },
    { name: "Diamond", population: 0, color: "blue" }
  ],
  purchases: [
    { name: "Sprout", population: 6, color: "#9C27B0" },
    { name: "Blossom", population: 2, color: "#FF5722" },
    { name: "Canopy", population: 1, color: "#FF9800" },
    { name: "Ecosystem", population: 1, color: "#4CAF50" },
    { name: "Champion", population: 1, color: "#00BCD4" }
  ]
};

// Function to calculate the percentage based on input tiers and focus value tiers
const calculatePercentage = (userValues, focusValues) => {
  let satisfiedTotal = 0;
  const focusTotal = focusValues.reduce((acc, val) => acc + val, 0);

  for (let i = 0; i < userValues.length; i++) {
    if (userValues[i] > 0) {
      satisfiedTotal += focusValues[i];
    }
  }

  return (satisfiedTotal / focusTotal) * 100;
};

// Define focus value tiers
const donationFocusValues = [6, 2, 1, 1, 1, 1]; // Tiers for donations
const purchaseFocusValues = [6, 2, 1, 1, 1]; // Tiers for purchases

// Calculate percentages for donations and purchases
const donationPercentage = calculatePercentage(
  [12, 5, 3, 2, 1, 0], // User donations
  donationFocusValues
);

const purchasePercentage = calculatePercentage(
  [6, 2, 1, 1, 1], // User purchases
  purchaseFocusValues
);

// Calculate overall activity percentage
const activitiesPercentage = pieData.activities.reduce((acc, item) => acc + item.population, 0) / 3; // Average activity percentage

// Calculate final carbon calculator percentage
const finalPercentage = (activitiesPercentage + donationPercentage + purchasePercentage) / 3;

const monthlyThresholds = {
  Jan: 210,
  Feb: 250,
  Mar: 190,
  Apr: 220,
  May: 300,
  Jun: 180,
  Jul: 240,
  Aug: 210,
  Sep: 260,
  Oct: 230,
  Nov: 200,
  Dec: 250,
};

const maxThreshold = 300; // 100% max for the three categories

const calculateUserThreshold = (total) => {
  return (total / maxThreshold) * 100; // Convert to percentage
};

// Function to determine bar color based on value
const getBarColor = (value) => {
  if (value < 50) {
    return '#A9A9A9'; // Gray for below 50%
  } else if (value >= 50 && value <= 59) {
    return '#FFA500'; // Orange for 50-59%
  } else {
    return '#4CAF50'; // Green for 60% and above
  }
};

const CarbonFootprintCalculator = () => {
  const [activeCard, setActiveCard] = useState('activities');
  const [loading, setLoading] = useState(true); // Loading state
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after delay
      Animated.timing(fadeAnim, {
        toValue: 1, 
        duration: 1000, 
        useNativeDriver: true,
      }).start();
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Clean up the timer
  }, [fadeAnim]);

  const handleToggleCard = (card) => {
    setActiveCard(card);
  };

  const getCurrentData = () => {
    switch (activeCard) {
      case 'activities':
        return pieData.activities;
      case 'donations':
        return pieData.donations;
      case 'purchases':
        return pieData.purchases;
      default:
        return [];
    }
  };

  const currentData = getCurrentData();

  // Prepare bar chart data
  const barData = {
    labels: Object.keys(monthlyThresholds),
    datasets: [{
      data: Object.values(monthlyThresholds).map(calculateUserThreshold),
    }],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? ( // Show Lottie animation while loading
        <View style={styles.loadingContainer}>
          <Lottie source={require('../../assets/lottie/rotatingBalls.json')} autoPlay loop style={styles.loadingAnimation} />
        </View>
      ) : (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#4CAF50" />
              </TouchableOpacity>
              <Text style={styles.header}>Green Carbon Calculator</Text>
            </View>

            <View style={styles.pieChartContainer}>
              <PieChart
                data={currentData}
                width={screenWidth - 40}
                height={150} // Reduced height
                chartConfig={{
                  backgroundColor: 'transparent',
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
              <View style={styles.legend}>
                {currentData.map((item, index) => (
                  <Text key={index} style={{ color: item.color, fontSize: 10 }}> {/* Reduced font size */}
                    {item.name}: {item.population}%
                  </Text>
                ))}
              </View>
            </View>

            <View style={styles.cardContainer}>
              {['activities', 'donations', 'purchases'].map((card) => (
                <TouchableOpacity
                  key={card}
                  style={styles.card}
                  onPress={() => handleToggleCard(card)}
                >
                  <LinearGradient
                    colors={
                      card === 'activities' ? ['#4CAF50', '#81C784'] :
                      card === 'donations' ? ['#FF9800', '#FFB74D'] :
                      ['#9C27B0', '#CE93D8']
                    }
                    style={styles.cardGradient}
                  >
                    <Text style={styles.cardTitle}>{card.charAt(0).toUpperCase() + card.slice(1)}</Text>
                    <Text style={styles.cardDescription}>
                      {card === 'activities' ? 'Tackle pilot activities to boost your eco-impact.' :
                      card === 'donations' ? `Aid critical causes/havocs with ${donationPercentage.toFixed(2)}% donations.` :
                      `Track purchases with ${purchasePercentage.toFixed(2)}% purchases.`}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.toggleDots}>
              {['activities', 'donations', 'purchases'].map((card) => (
                <TouchableOpacity
                  key={card}
                  style={activeCard === card ? styles.activeDot : styles.dot}
                  onPress={() => handleToggleCard(card)}
                />
              ))}
            </View>

            <View style={styles.barChartContainer}>
              <Text style={styles.barChartTitle}>Monthly Eco Threshold</Text>
              <BarChart
                data={barData}
                width={screenWidth - 20}
                height={210} // Reduced height
                fromZero={true}
                chartConfig={{
                  backgroundColor: 'yellow',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#f5f5f5',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  barPercentage: 0.4,
                  useShadowColorFromDataset: false,
                }}
                verticalLabelRotation={30}
              />
            </View>
          </ScrollView>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  container: {
    flex: 1,
    padding: 10, // Reduced padding
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingAnimation: {
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
  },
  scrollView: {
    paddingBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15, // Reduced margin
  },
  header: {
    fontSize: 21, // Reduced font size
    fontWeight: '800',
    marginLeft: '14%', // Reduced margin
    color: 'green',
  },
  pieChartContainer: {
    alignItems: 'center',
    marginVertical: 15, // Reduced margin
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'center',
  },
  legend: {
    marginTop: 2, // Reduced margin
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15, // Reduced margin
  },
  card: {
    width: '30%',
    borderRadius: 28,
    overflow: 'hidden',
    marginVertical: 5, // Reduced margin
  },
  cardGradient: {
    padding: 10, // Reduced padding
    borderRadius: 10,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16, // Reduced font size
    fontWeight: 'bold',
  },
  cardDescription: {
    color: '#fff',
    fontSize: 10, // Reduced font size
  },
  toggleDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dot: {
    height: 8, // Reduced size
    width: 8, // Reduced size
    borderRadius: 4, // Reduced size
    backgroundColor: '#A9A9A9',
    marginHorizontal: 4,
  },
  activeDot: {
    height: 8, // Reduced size
    width: 8, // Reduced size
    borderRadius: 4, // Reduced size
    backgroundColor: '#4CAF50',
    marginHorizontal: 4,
  },
  barChartContainer: {
    marginTop: 20,
    padding: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  barChartTitle: {
    fontSize: 12, // Reduced font size
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5, // Reduced margin
    color: 'green',
  },
});

export default CarbonFootprintCalculator;
