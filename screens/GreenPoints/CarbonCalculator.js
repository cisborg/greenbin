import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, SafeAreaView, Animated, ScrollView } from 'react-native';
import { PieChart, BarChart } from 'react-native-gifted-charts'; // Updated import
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native'; // Import Lottie
import { useDispatch, useSelector } from 'react-redux';
import { fetchPurchaseTiers, fetchDonationTiers } from '../../redux/actions/rewards'; // Adjust the path to your actions

const screenWidth = Dimensions.get('window').width;

const CarbonFootprintCalculator = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [activeCard, setActiveCard] = useState('activities');
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Redux state for purchases and donations
  const purchasesData = useSelector((state) => state.purchases); // Adjust based on your state structure
  const donationsData = useSelector((state) => state.donations); // Adjust based on your state structure
  const activitiesData = route.params.activities; // Get activities data from route params

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchPurchaseTiers(userId)); // Fetch purchase tiers
      await dispatch(fetchDonationTiers(userId)); // Fetch donation tiers
      setLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    };

    fetchData();
  }, [dispatch, fadeAnim]);

  // Prepare pie chart data
  const pieData = {
    activities: activitiesData,
    donations: donationsData.map((tier) => ({
      name: tier.name,
      population: tier.population,
    })),
    purchases: purchasesData.map((tier) => ({
      name: tier.name,
      population: tier.population,
    })),
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

  // Calculate percentages and thresholds
  const calculateMonthlyThresholds = (averagePercentage) => {
    const baseThreshold = 200; // Base threshold value
    const multiplier = averagePercentage / 100; // Scale based on average percentage

    return {
      Jan: baseThreshold * multiplier,
      Feb: baseThreshold * multiplier,
      Mar: baseThreshold * multiplier,
      Apr: baseThreshold * multiplier,
      May: baseThreshold * multiplier,
      Jun: baseThreshold * multiplier,
      Jul: baseThreshold * multiplier,
      Aug: baseThreshold * multiplier,
      Sep: baseThreshold * multiplier,
      Oct: baseThreshold * multiplier,
      Nov: baseThreshold * multiplier,
      Dec: baseThreshold * multiplier,
    };
  };

  const averagePercentage = (activitiesPercentage + donationPercentage + purchasePercentage) / 3;
  const monthlyThresholds = calculateMonthlyThresholds(averagePercentage);

  // Bar chart data
  const barData = {
    labels: Object.keys(monthlyThresholds),
    datasets: [{
      data: Object.values(monthlyThresholds).map(calculateUserThreshold),
    }],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
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
                height={150}
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
                  <Text key={index} style={{ color: item.color, fontSize: 10 }}>
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
                height={210}
                fromZero={true}
                chartConfig={{
                  backgroundColor: 'green',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#f5f5f5',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                style={styles.barChart}
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
