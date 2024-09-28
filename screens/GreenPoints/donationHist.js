import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Platform, TouchableOpacity, SafeAreaView, Animated, StatusBar } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const donationsData = [
  { id: '1', date: '20 SEP 2024', amount: 'GCPs 1000', project: 'Tree Plantation Drive' },
  { id: '2', date: '17 SEP 2024', amount: 'GCPs 2500', project: 'Clean Water Initiative' },
  { id: '3', date: '14 SEP 2024', amount: 'GCPs 1550', project: 'Plastic Waste Management' },
  { id: '4', date: '12 SEP 2024', amount: 'GCPs 34500', project: 'Renewable Energy Project' },
];

const HistoryScreen = ({ navigation }) => {
  const [donations, setDonations] = useState(donationsData);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const clearAllDonations = () => {
    setDonations([]);
  };

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteDonation(item.id)}>
        <MaterialCommunityIcons name="delete" size={24} color="black" />        </TouchableOpacity>
      )}
    >
      <View style={styles.donationItem}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <Text style={styles.projectText}>{item.project}</Text>
        <Text style={styles.amountText}>{item.amount}</Text>
      </View>
    </Swipeable>
  );

  const deleteDonation = (id) => {
    setDonations(prev => prev.filter(donation => donation.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Donation History</Text>
        <TouchableOpacity onPress={clearAllDonations}>
          <Text style={styles.clearAllText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <Animated.View style={{ ...styles.listContainer, opacity: fadeAnim }}>
        {donations.length === 0 ? (
          <Text style={styles.emptyText}>No donation history available.</Text>
        ) : (
          <FlatList
            data={donations}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  clearAllText: {
    color: '#007BFF',
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  donationItem: {
    backgroundColor: '#e0f7fa',
    borderRadius: 18,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  dateContainer: {
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'bold',
  },
  projectText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  amountText: {
    fontSize: 16,
    color: '#007BFF',
  },
  deleteButton: {
    backgroundColor: '#FF3D00',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    bordeerRadius: 15,
    height: '100%',
  },
  
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 20,
  },
});

export default HistoryScreen;
