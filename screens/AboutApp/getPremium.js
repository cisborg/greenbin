import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, SafeAreaView, Animated, ActivityIndicator, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const plans = [
  {
    id: '1',
    title: 'GreenBin Premium',
    features: [
      { icon: 'checkmark-circle', text: 'No Ads' },
      { icon: 'checkmark-circle', text: 'Get instant Approval on loans' },
      { icon: 'checkmark-circle', text: 'Be admin to multiple squads' },
      { icon: 'checkmark-circle', text: 'Register for more Activities' },
      { icon: 'checkmark-circle', text: 'Get instant approval to purchase our assets' },
      { icon: 'checkmark-circle', text: 'Join Nature Diversity as IP' },
      { icon: 'checkmark-circle', text: 'Deposit and withdraw over 1M points to other platforms' },
    ],
    price: 'GCPs 5833.25/Month',
    yearlyPrice: 'GCPs 69999.00/Year',
    savings: 'Save 45%',
  },
  {
    id: '2',
    title: 'EcoWarrior',
    features: [
      { icon: 'checkmark-circle', text: 'No Ads' },
      { icon: 'checkmark-circle', text: 'Withdraw to other Platforms' },
      { icon: 'checkmark-circle', text: 'Get soft loans as inputs' },
    ],
    price: 'GCPs 149.00/Month',
    yearlyPrice: 'GCPs 999.00/Year',
    savings: 'Save 45%',
  },
];

const TogglePlans = () => {
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const togglePlan = (direction) => {
    setCurrentPlanIndex((prevIndex) => {
      if (direction === 'left') {
        return prevIndex > 0 ? prevIndex - 1 : plans.length - 1;
      } else {
        return prevIndex < plans.length - 1 ? prevIndex + 1 : 0;
      }
    });
  };

  const currentPlan = plans[currentPlanIndex];

  const handleJoinPremium = () => {
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      // Handle approval logic here
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={18} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.titleText}>Discover features and compare plans</Text>
      </View>

      <Animated.View style={[styles.planContainer, { opacity: fadeAnim }]}>
        <Text style={styles.planTitle}>{currentPlan.title}</Text>
        
        {currentPlan.features.map((feature, index) => (
          <View key={index} style={styles.featureContainer}>
            <Icon name={feature.icon} size={16} color="#4CAF50" />
            <Text style={styles.featureText}>{feature.text}</Text>
          </View>
        ))}
        
        <Text style={styles.priceText}>{currentPlan.price}</Text>
        <Text style={styles.yearlyPriceText}>{currentPlan.yearlyPrice}</Text>
        
        <View style={styles.savingsContainer}>
          <Text style={styles.savingsText}>{currentPlan.savings}</Text>
        </View>
        
        <Text style={styles.trialText}>3 days free trial for new subscribers only</Text>

        <View style={styles.arrowContainer}>
          <TouchableOpacity style={styles.arrowButton} onPress={() => togglePlan('left')}>
            <Icon name="arrow-back" size={14} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.arrowButton} onPress={() => togglePlan('right')}>
            <Icon name="arrow-forward" size={14} color="#fff" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <TouchableOpacity style={[styles.registerButton, loading && styles.loadingButton]} onPress={handleJoinPremium} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFD700" />
        ) : (
          <Text style={styles.registerButtonText}>Join Premium</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: '5%',
    marginTop: '-40%'
  },
  backButton: {
    marginRight: 5,
    backgroundColor: 'green',
    borderRadius: 20,
    padding: 3,
    marginLeft: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    flex: 1,
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  arrowButton: {
    padding: 4,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    marginRight: '4%',
    elevation: 1,
    marginHorizontal: 2,


  },
  planContainer: {
    width: width * 0.85,
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    padding: 15,
    elevation: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  featureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  featureText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#555',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
  },
  yearlyPriceText: {
    fontSize: 14,
    color: '#777',
  },
  savingsContainer: {
    marginTop: 8,
    backgroundColor: 'orange',
    width: width * 0.20,
    alignItems: 'center',
    padding: '2%',
    borderRadius: 10
  },
  savingsText: {
    fontSize: 14,
    color: 'green',
  },
  trialText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  loadingButton: {
    opacity: 0.7,
  },
  registerButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default TogglePlans;
