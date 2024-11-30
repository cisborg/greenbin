import React, { useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Swipeable } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { Color } from "../../GlobalStyles";

import FastImage from 'react-native-fast-image';

// Import Redux actions
import { fetchNotifications, deleteNotification } from '../../redux/actions/notifications';

;const NotificationScreen = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.data); // Select notifications from Redux store
  const loading = useSelector((state) => state.notifications.loading);

  const [selectedNotification, setSelectedNotification] = React.useState(null);
  const sheetRef = useRef(null);

  // Snap points for the bottom sheet
  const snapPoints = useMemo(() => ['50%', '25%'], []);

  // Fetch notifications when the component mounts
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  // Handle open and close of the bottom sheet
  const openBottomSheet = (notification) => {
    setSelectedNotification(notification);
    sheetRef.current?.expand();
  };

  const closeBottomSheet = () => {
    sheetRef.current?.close();
  };

  // Handle "Delete Notification"
  const handleDelete = (id) => {
    dispatch(deleteNotification(id)); // Dispatch delete action
  };

  // Render swipeable actions
  const renderRightActions = () => (
    <View style={[styles.swipeAction, styles.delete]}>
      <Text style={styles.swipeActionText}>Delete</Text>
    </View>
  );

  // Render notification card
  const renderNotification = ({ item }) => (
    <Swipeable
      renderRightActions={renderRightActions}
      onSwipeableRightOpen={() => handleDelete(item.id)}
    >
      <TouchableOpacity
        style={[styles.notificationContainer, item.read && styles.readNotification]}
        onPress={() => openBottomSheet(item)}
      >
        <View style={styles.iconContainer}>
          {item.type === 'message' && renderCascadedImages(item.images)}
          {item.type === 'squad' && <MaterialIcons name="group" size={24} color="#4CAF50" />}
          {item.type === 'update' && <AntDesign name="notification" size={24} color="#FFA500" />}
          {item.type === 'connection' && <AntDesign name="user" size={24} color="#FF5722" />}
          {item.type === 'connection-request' && renderCascadedImages(item.images)}
          {item.type === 'squad-removed' && renderCascadedImages(item.images)}
        </View>
        <View style={styles.notificationContent}>
          <Text style={styles.notificationText}>{item.content}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  // Render cascaded images for notifications
  const renderCascadedImages = (images) => (
    <View style={styles.cascadedImagesContainer}>
      {images?.map((image, index) => (
        <FastImage
          key={index}
          source={{ uri: image }}
          resizeMode={FastImage.resizeMode.cover}
          style={[styles.cascadedImage, { left: index * 15 }]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          style={styles.notificationList}
        />
      )}
      <BottomSheet
        ref={sheetRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.bottomSheetHandle}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.modalTitle}>Notification Details</Text>
          <Text style={styles.modalContent}>{selectedNotification?.content}</Text>
          <Text style={styles.modalTime}>{selectedNotification?.time}</Text>
        </View>
      </BottomSheet>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 5,
    overflow: 'hidden',
  },
  notificationList: {
    marginBottom: 20,
  },
  notificationContainer: {
    flexDirection: 'column', // Changed to column to stack image above text
    alignItems: 'flex-start', // Align items to the start
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 1,
  },
  swipeAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  markAsRead: {
    backgroundColor: 'green',
  },
  delete: {
    backgroundColor: 'red',
  },
  swipeActionText: {
    color: 'white',
    fontSize: 16,
  },
  bottomSheetBackground: {
    backgroundColor: '#fff',
  },
  bottomSheetHandle: {
    backgroundColor: '#ccc',
  },
  bottomSheetContent: {
    flex: 1,
    padding: 20,
  },
  iconContainer: {
    marginBottom: 5, // Added margin to separate image from text
  },
  cascadedImagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5, // Added margin for better spacing
  },
  cascadedImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
    position: 'relative', // Changed to relative for stacking
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: -15
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: '#333',
  },
  notificationTime: {
    fontSize: 12,
    color: 'gray',
  },
  readNotification: {
    backgroundColor: '#f0f0f0',
  },
  modalView: {
    marginTop: 'auto',
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalTime: {
    fontSize: 12,
    color: 'gray',
  },
});

export default NotificationScreen;
