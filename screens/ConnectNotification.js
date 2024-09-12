import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Modal, Button } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Color } from '../GlobalStyles';

const notificationsData = [
  { id: '1', type: 'message', content: 'You received a new message from John Doe.', time: '5 min ago' },
  { id: '2', type: 'squad', content: 'Emily posted a new update in the squad.', time: '10 min ago' },
  { id: '3', type: 'update', content: 'New version of the app is available!', time: '1 hr ago' },
  { id: '4', type: 'connection', content: 'You have a new connection request from Jane Smith.', time: '2 hrs ago' },
  { id: '5', type: 'message', content: 'Michael Brown sent you a message.', time: '3 hrs ago' },
  { id: '6', type: 'squad', content: 'David Wilson shared a post in the squad.', time: '4 hrs ago' },
];

const NotificationScreen = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const renderNotification = ({ item }) => (
    <TouchableOpacity style={styles.notificationContainer} onPress={() => handleNotificationPress(item)}>
      <View style={styles.iconContainer}>
        {item.type === 'message' && <AntDesign name="message1" size={24} color="#007BFF" />}
        {item.type === 'squad' && <MaterialIcons name="group" size={24} color="#4CAF50" />}
        {item.type === 'update' && <AntDesign name="notification" size={24} color="#FFA500" />}
        {item.type === 'connection' && <AntDesign name="user" size={24} color="#FF5722" />}
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>{item.content}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

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
    padding: 20,
    overflow: 'hidden',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  notificationList: {
    marginBottom: 20,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
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
