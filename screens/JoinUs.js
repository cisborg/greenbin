import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Color } from '../GlobalStyles';
import { useNavigation } from '@react-navigation/core';

const JoinUsScreen = () => {
  const navigation = useNavigation();
  const userId = 'ID123456';
  const balance = 1500; // Example balance
  const ecoPoints = 750000; // Example eco points
  const productsPurchased = 300; // Example number of eco-friendly products purchased

  // Milestone criteria
  const milestonesReached = balance >= 1000 && productsPurchased >= 200;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Join Our Eco-Friendly NGO!</Text>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.logo} />
      </View>

      <View style={styles.profileContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.profileIcon} />
        <Text style={styles.profileId}>User ID: {userId}</Text>
      </View>

      <Text style={styles.ecoPoints}>Your Eco Points: {ecoPoints}</Text>
      <Text style={styles.balance}>Personal Green Bank Balance: ${balance.toFixed(2)}</Text>
      <Text style={styles.balance}>Squads Green Bank Balance: ${balance.toFixed(2)}</Text>

      <Text style={styles.productsPurchased}>Products Purchased: {productsPurchased}</Text>
      <Text style={styles.productsPurchased}>Aggregated Activities: {productsPurchased}</Text>


      <Text style={styles.description}>
        You are making a significant impact on the environment! Based on your achievements, you can join our NGO.
      </Text>

      {milestonesReached ? (
        <View style={styles.milestoneContainer}>
          <Text style={styles.milestoneText}>Congratulations! You qualify to join our NGO.</Text>
          <TouchableOpacity style={styles.joinButton} onPress={()=> alert('Visit our Nature Diversity Website and Join')}>
            <Text style={styles.joinButtonText}>Join Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.milestoneText}>
          Keep up the good work! You need to reach the following milestones to join:
        </Text>
      )}

      <View style={styles.milestonesList}>
        <Text style={styles.milestone}>✔️ Individual/Squad Registration Fee: GPs 2500</Text>
        <Text style={styles.milestone}>✔️ Eco-Friendly Products Purchased: 200+</Text>
        <Text style={styles.milestone}>✔️ Percentage Agg Module Threshold: 60+</Text>
        <Text style={styles.milestone}>✔️ Activities Threshold Reached : 60+</Text>


      </View>

      <View style={styles.notificationsContainer}>
        <Text style={styles.notificationsHeader}>Latest Notifications:</Text>
        <Text style={styles.notification}>You're just a few steps away from joining!</Text>
        <Text style={styles.notification}>Earn more eco points through your purchases!</Text>
      </View>
      <TouchableOpacity style={styles.ApplyButton} onPress={()=> navigation.navigate('ProfilePage')}>
        <Text style={{color: Color.colorLimegreen_200}}>Exit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.colorWhite,
    overflow: 'hidden',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
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
  ApplyButton: {
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    marginTop: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center',
    maxWidth: 150,
    left: 10
  },
  ecoPoints: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 10,
  },
  balance: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  productsPurchased: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  milestoneContainer: {
    marginBottom: 20,
    backgroundColor: '#dff0d8',
    padding: 15,
    borderRadius: 5,
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
    marginBottom: 20,
  },
  milestone: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  notificationsContainer: {
    marginTop: 20,
  },
  notificationsHeader: {
    fontSize: 18,
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
