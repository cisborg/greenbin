import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Lottie from 'lottie-react-native'; // Import Lottie

const notificationsData = [
  { id: '1', date: '20 SEP 2024', message: 'Congratulations! You have purchased order bundle RD234563 of GCPs 40000 successfully! You earn a sprout tier of 1000 points' },
  { id: '2', date: '17 SEP 2024', message: 'Congratulations! You have purchased order bundle SA234534 of GCPs 100000 successfully! You earn a blossom tier of 1200 points' },
  { id: '3', date: '14 SEP 2024', message: 'Congratulations! You have purchased order bundle RE237589 of GCPs 500000 successfully! You earn a canopy tier of 2000 points' },
  { id: '4', date: '12 SEP 2024', message: 'Congratulations! You have purchased order bundle FR565731 of GCPs 700000 successfully! You earn a champion tier of 3600 points' },
];

const NotifScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchNotifications = async () => {
      // Simulate a network request
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate loading time
      setNotifications(notificationsData); // Set notifications after loading
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      setLoading(false); // End loading
    };

    fetchNotifications();
  }, [fadeAnim]);

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteNotification(item.id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      )}
    >
      <View style={styles.notificationItem}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    </Swipeable>
  );

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orders Catalog</Text>
        <TouchableOpacity onPress={clearAllNotifications}>
          <Text style={styles.clearAllText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      
      {loading ? ( // Conditional rendering for loading
        <View style={styles.loadingContainer}>
          <Lottie 
            source={require('../../assets/lottie/burst.json')} // Replace with your loading animation
            autoPlay 
            loop 
            style={styles.lottie} 
          />
          <Text style={styles.loadingText}>Loading notifications...</Text>
        </View>
      ) : (
        <Animated.View style={{ ...styles.listContainer, opacity: fadeAnim }}>
          <FlatList
            data={notifications}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
        </Animated.View>
      )}
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomRadius: 5
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'orange'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  clearAllText: {
    color: '#007BFF',
    fontSize: 16,
  },
  listContainer: {
    padding: 10,
  },
  listContent: {
    paddingBottom: 10,
  },
  notificationItem: {
    backgroundColor: '#ffff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  dateContainer: {
    marginBottom: 2
  },
  dateText: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 13,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: 'green',
    justifyContent: 'center',
    borderRadius: 14,
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NotifScreen;
