import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions,Platform, SafeAreaView, Animated, ActivityIndicator, StatusBar } from 'react-native';
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
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.titleText}>Discover features and compare plans</Text>
      </View>

      <Animated.View style={[styles.planContainer, { opacity: fadeAnim }]}>
        <Text style={styles.planTitle}>{currentPlan.title}</Text>
        
        {currentPlan.features.map((feature, index) => (
          <View key={index} style={styles.featureContainer}>
            <Icon name={feature.icon} size={20} color="#4CAF50" />
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
            <Icon name="arrow-back" size={18} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.arrowButton} onPress={() => togglePlan('right')}>
            <Icon name="arrow-forward" size={18} color="#fff" />
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
    padding: 20,
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight : 0,

  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    padding: 10,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    flex: 1,
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  arrowButton: {
    padding: 5,
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    elevation: 3,
    marginHorizontal: 5,
  },
  planContainer: {
    width: width * 0.8,
    maxWidth: 400,
    backgroundColor: '#f2f2f2',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  planTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  featureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  featureText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FFD700',
  },
  yearlyPriceText: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
  },
  savingsContainer: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 5,
    alignItems: 'center',
  },
  savingsText: {
    fontSize: 16,
    color: '#fff',
  },
  trialText: {
    fontSize: 14,
    color: '#000',
    marginTop: 10,
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 14,
    padding: 15,
    marginTop: 20,
    width: '50%',
    alignItems: 'center',
  },
  loadingButton: {
    backgroundColor: '#FFD700',
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TogglePlans;
