import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Modal, Button } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Color } from '../../GlobalStyles';

const notificationsData = [
  { id: '1', type: 'message', content: 'John Doe and 5 others sent you a message.', time: '5 min ago', images: ['john.jpg', 'michael.jpg', 'jane.jpg'] },
  { id: '2', type: 'squad', content: 'Emily posted a new update in the squad.', time: '10 min ago' },
  { id: '3', type: 'update', content: 'New version of the app is available!', time: '1 hr ago' },
  { id: '4', type: 'connection', content: 'Jane Smith has accepted your connection request.', time: '2 hrs ago', images: ['jane.jpg'] },
  { id: '5', type: 'connection-request', content: 'John and 99 others have requested to connect with you!', time: '3 hrs ago', images: ['john.jpg', 'michael.jpg', 'jane.jpg'] },
  { id: '6', type: 'squad-removed', content: 'You have been removed from these squads.', time: '4 hrs ago', images: ['squad1.jpg', 'squad2.jpg', 'squad3.jpg'] },
];

const NotificationScreen = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const renderNotification = ({ item }) => (
    <TouchableOpacity style={styles.notificationContainer} onPress={() => handleNotificationPress(item)}>
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
  );

  // Render cascaded overlapping images
  const renderCascadedImages = (images) => {
    return (
      <View style={styles.cascadedImagesContainer}>
        {images.length === 1 ? (
          <>
            <Image source={{ uri: images[0] }} style={[styles.cascadedImage, { left: 0 }]} />
            {/* Placeholder image for second position */}
            <Image source={{ uri: 'placeholder_image_url' }} style={[styles.cascadedImage, { left: 15 }]} />
          </>
        ) : (
          images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={[styles.cascadedImage, { left: index * 15 }]} />
          ))
        )}
      </View>
    );
  };

  const handleNotificationPress = (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notificationsData}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        style={styles.notificationList}
      />

      {/* Modal for Notification Details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Notification Details</Text>
          <Text style={styles.modalContent}>{selectedNotification?.content}</Text>
          <Text style={styles.modalTime}>{selectedNotification?.time}</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
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
