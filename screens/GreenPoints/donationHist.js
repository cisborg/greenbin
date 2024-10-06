import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const notificationsData = [
  { id: '1', date: '20 SEP 2024', message: 'Congratulations! You have donated  GCPs 40000 successfully! You earn  a bronze tier of 800 points' },
  { id: '2', date: '22 SEP 2024', message: 'Congratulations! You have donated  GCPs 40000 successfully! You earn  a gold tier of 1200 points' },
  { id: '3', date: '28 SEP 2024', message: 'Congratulations! You have donated  GCPs 40000 successfully! You earn  a platinum tier of 1500 points' },
  { id: '4', date: '30 SEP 2024', message: 'Congratulations! You have donated  GCPs 40000 successfully! You earn  a diamond tier of 15000 points' },
];

const HistoryScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
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
        <Text style={styles.headerTitle}>Donations Catalog</Text>
        <TouchableOpacity onPress={clearAllNotifications}>
          <Text style={styles.clearAllText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <Animated.View style={{ ...styles.listContainer, opacity: fadeAnim }}>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      </Animated.View>
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
  notificationItem: {
    backgroundColor: '#ffff',
    borderRadius: 14,
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
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 14,
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

export default HistoryScreen;
