import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, FlatList, Modal, Button } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const settingsOptions = [
  { id: '1', title: 'Profile', description: 'Manage your profile settings' },
  { id: '2', title: 'Notifications', description: 'Configure notification preferences' },
  { id: '3', title: 'Privacy', description: 'Manage your privacy settings' },
  { id: '4', title: 'Return', description: 'Get back to Profile Page and Enjoy ' },
  { id: '5', title: 'About', description: 'Learn more about the app' },
];

const SettingsScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSettingPress = (setting) => {
    setSelectedSetting(setting);
    setModalVisible(true);
  };

  const renderSettingItem = ({ item }) => (
    <TouchableOpacity style={styles.settingItem} onPress={() => handleSettingPress(item)}>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{item.title}</Text>
        <Text style={styles.settingDescription}>{item.description}</Text>
      </View>
      <AntDesign name="right" size={20} color="#888" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <View style={styles.notificationToggle}>
        <Text style={styles.toggleLabel}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={() => setNotificationsEnabled(previousState => !previousState)}
        />
      </View>

      <FlatList
        data={settingsOptions}
        renderItem={renderSettingItem}
        keyExtractor={item => item.id}
        style={styles.settingsList}
      />

      {/* Modal for Settings Details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{selectedSetting?.title}</Text>
          <Text style={styles.modalContent}>{selectedSetting?.description}</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
    width: 404,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  notificationToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#333',
  },
  settingsList: {
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingDescription: {
    fontSize: 14,
    color: '#777',
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
});

export default SettingsScreen;
