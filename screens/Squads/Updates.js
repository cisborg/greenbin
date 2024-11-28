import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { getAllPosts } from '../../redux/actions/Posts'; // Adjust the path as necessary
import { Color } from '../../GlobalStyles';
import { FlashList } from '@shopify/flash-list'; // Import FlashList
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const NotificationsScreen = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.posts.allPosts); // Assuming your reducer is set up accordingly
  const loading = useSelector((state) => state.posts.loading); // Loading state from Redux
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotifications = async () => {
    setRefreshing(true);
    await dispatch(getAllPosts()); // Dispatch the action to fetch posts
    setRefreshing(false);
  };

  const handleRefresh = async () => {
    setPage(1);
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications(); // Fetch notifications when component mounts
  }, []);

  const renderNotification = ({ item }) => (
    <TouchableOpacity style={styles.notificationContainer} activeOpacity={0.7}>
      <View style={styles.userContainer}>
        <FastImage source={{ uri: 'https://via.placeholder.com/40' }}
        resizeMode={FastImage.resizeMode.cover}
        style={styles.avatar} />
        <View>
          <Text style={styles.userName}>{item.user}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
      </View>
      <Text style={styles.postTitle}>{item.postTitle}</Text>
      <FastImage source={{ uri: item.imageUrl }}
      resizeMode={FastImage.resizeMode.cover}
       style={styles.postImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? ( // Show loading indicator while fetching
        <View style={styles.loadingContainer}>
          <LottieView
            source={require('../../assets/lottie/rotateLoad.json')} // Adjust the path to your Lottie file
            autoPlay
            loop
            style={styles.lottie}
          />
      </View>      ) : (
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
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Adjust as needed
  },
  lottie: {
    width: width * 0.3, // Adjust size as needed
    height: height * 0.3,
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
