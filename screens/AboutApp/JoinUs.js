import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch and useSelector
import FastImage from 'react-native-fast-image';
import { Color } from '../../GlobalStyles'; // Adjust the import path as necessary
import Animated, { Easing } from 'react-native-reanimated';
import { fetchUserData } from '../../redux/actions/authentication'; // Adjust the import path as necessary

const JoinUsScreen = () => {
  const dispatch = useDispatch(); // Initialize dispatch

  // Fetch user information from Redux
  const userInfo = useSelector((state) => state.user); // Access user state directly
  const [animationValue, setAnimationValue] = useState(new Animated.Value(0));

  // Fetch user data when component mounts
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  // Start animation when userInfo changes
  useEffect(() => {
    if (userInfo.userId) {
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }, [userInfo]);

  // Milestone criteria
  const milestonesReached = userInfo.balance >= 1000 && userInfo.totalTiers >= 200;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Join Our Eco-Friendly Movements!</Text>
        <FastImage
          source={{ uri: 'https://via.placeholder.com/100' }}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.logo}
        />
      </View>

      <View style={styles.profileContainer}>
        <FastImage
          source={{ uri: 'https://via.placeholder.com/40' }}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.profileIcon}
        />
        <Text style={styles.profileId}>User ID: {userInfo.userId}</Text>
      </View>

      <Text style={styles.ecoPoints}>Your Eco Points: {userInfo.ecoPoints}</Text>
      <Text style={styles.balance}>Personal Green Bank Balance: GCPS {userInfo.balance.toFixed(2)}</Text>
      <Text style={styles.productsPurchased}>Purchases Tiers Earned: {userInfo.totalTiers}</Text>

      <Text style={styles.description}>
        You are making a significant impact on the environment! Based on your achievements, you can join our NGO.
      </Text>

      <Animated.View style={[styles.milestoneContainer, { opacity: animationValue }]}>
        {milestonesReached ? (
          <View>
            <Text style={styles.milestoneText}>Congratulations! You qualify to join our NGO.</Text>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => Alert.alert('Visit our Nature Diversity Website and Join at naturediversity.org')}
            >
              <Text style={styles.joinButtonText}>Join Now</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.milestoneText}>
            Keep up the good work! You need to reach the following milestones to join:
          </Text>
        )}
      </Animated.View>

      <View style={styles.milestonesList}>
        <Text style={styles.milestone}>✔️ Squad Registration Fee: GPs 2500</Text>
        <Text style={styles.milestone}>✔️ Eco-Friendly Total Tiers Earned: 200+</Text>
        <Text style={styles.milestone}>✔️ Percentage Agg Module Threshold: 60+</Text>
        <Text style={styles.milestone}>✔️ Activities Threshold Reached : 60+</Text>
      </View>

      <View style={styles.notificationsContainer}>
        <Text style={styles.notificationsHeader}>Latest Notifications:</Text>
        <Text style={styles.notification}>You're just a few steps away from joining!</Text>
        <Text style={styles.notification}>Earn more eco points through your purchases!</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.colorWhite,
    overflow: 'hidden',
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 25
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileId: {
    fontSize: 16,
    color: '#333',
  },
 
  ecoPoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 10,
  },
  balance: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333',
  },
  productsPurchased: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    color: '#green',
  },
  milestoneContainer: {
    marginBottom: 20,
    backgroundColor: '#dff0d8',
    padding: 15,
    borderRadius: 18,
  },
  milestoneText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  joinButton: {
    backgroundColor: '#f9f9f9',
    borderRadius: 17,
    padding: 10,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center',
    width: 150,
    left: 90
  },
  joinButtonText: {
    color: Color.colorLimegreen_100,
    fontSize: 18,
    fontWeight: 'bold',
  },
  milestonesList: {
    marginBottom: 10,
  },
  milestone: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  notificationsContainer: {
    marginTop: 5,
  },
  notificationsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 10,
  },
  notification: {
    fontSize: 14,
    color: '#555',
  },
});

export default JoinUsScreen;
