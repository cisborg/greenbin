import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Color } from '../../GlobalStyles';
import { FlashList } from '@shopify/flash-list'; // Import FlashList

const notificationsData = [
  {
    id: '1',
    user: 'Sourabh Verma',
    message: 'shared a new post on Build With GenAI',
    postTitle: 'Introducing My Side Project: UI Creator - The Ultimate JSX-Based UI Library',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    user: 'Wee Center Project',
    message: 'New post from Wee Center, check it out now!',
    postTitle: 'The All-in-One API for wastes collection & monitoring',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    user: 'GreenDaily',
    message: 'New post from GreenDaily, check it out now!',
    postTitle: 'Making Green Circular Economy possible with Technology',
    imageUrl: 'https://via.placeholder.com/150',
  },
];

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    // Simulate fetching more notifications
    const newNotifications = notificationsData.map((item) => ({
      ...item,
      id: `${parseInt(item.id) + page * notificationsData.length}`, // Update ID to prevent duplicates
    }));
    setNotifications((prev) => [...prev, ...newNotifications]);
    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refreshing notifications
    setNotifications(notificationsData);
    setPage(1);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, [page]);

  const renderNotification = ({ item }) => (
    <TouchableOpacity style={styles.notificationContainer} activeOpacity={0.7}>
      <View style={styles.userContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.avatar} />
        <View>
          <Text style={styles.userName}>{item.user}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
      </View>
      <Text style={styles.postTitle}>{item.postTitle}</Text>
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        onEndReached={() => {
          setPage((prev) => prev + 1); // Load more notifications
        }}
        onEndReachedThreshold={0.5} // Load more when 50% of the list is visible
        refreshing={refreshing}
        onRefresh={handleRefresh} // Pull to refresh
        estimatedItemSize={100} // Estimate item size for performance
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 5,
    overflow: 'hidden',
  },
  
  notificationList: {
    paddingBottom: 20,
  },
  notificationContainer: {
    backgroundColor: '#fff', // Changed to light gray
    borderRadius: 20,
    padding: 12,
    marginBottom: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Color.colorGray_100, // Avatar border color
  },
  userName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000', // Changed to black
  },
  message: {
    fontSize: 13,
    color: '#333333', // Changed to dark gray for better contrast
  },
  postTitle: {
    fontSize: 14,
    fontWeight: '450',
    color: '#000000', // Changed to black
    marginVertical: 5,
  },
  postImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginTop: 5,
    borderWidth: 0,
    borderColor: '#007BFF', // Image border color
  },
});

export default NotificationsScreen;
