import React, { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, Modal } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Color } from "../GlobalStyles";



const VendorChat = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const userContactInfo = {
    name: 'hey',
    status: "Online",
    phone: "+1234567890",
    email: "johndoe@example.com",
  };

  const sendMessage = () => {
    if (messageText.trim() || selectedEmoji) {
      const messageContent = selectedEmoji ? selectedEmoji : messageText;
      setMessages([...messages, { text: messageContent, sender: 'me', timestamp: new Date().toLocaleTimeString() }]);
      setMessageText('');
      setSelectedEmoji('');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMessages([...messages, { text: result.uri, sender: 'me', isImage: true, timestamp: new Date().toLocaleTimeString() }]);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={item.sender === 'me' ? styles.myMessage : styles.otherMessage}>
      {item.isImage ? (
        <Image source={{ uri: item.text }} style={styles.imageMessage} />
      ) : (
        <>
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.chatPage}>
      <View style={styles.header}>
        <TouchableOpacity>
          <AntDesign name="leftcircle" size={24} color="black" onPress={() => navigation.goBack()} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileContainer} onPress={() => setModalVisible(true)}>
          <Image source={{ uri: 'https://example.com/profile-pic.jpg' }} style={styles.profilePic} />
          <View style={styles.headerText}>
            <Text style={styles.userName}>{userContactInfo.name}</Text>
            <Text style={styles.userStatus}>{userContactInfo.status}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView style={styles.innerContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.messageList}
        />
        
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.attachButton}>
            <Text style={styles.attachButtonText}>📎</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type Message.."
            placeholderTextColor='gray'
            value={messageText}
            onChangeText={setMessageText}
            onSubmitEditing={sendMessage}
            multiline={false} // Prevent multiline input
          />
          <Picker
            selectedValue={selectedEmoji}
            style={styles.emojiPicker}
            onValueChange={(itemValue) => setSelectedEmoji(itemValue)}
          >
            <Picker.Item label="😀" value="😀" />
            <Picker.Item label="😂" value="😂" />
            <Picker.Item label="😍" value="😍" />
            <Picker.Item label="😢" value="😢" />
            <Picker.Item label="😎" value="😎" />
          </Picker>
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Modal for Contact Info */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{userContactInfo.name}</Text>
            <Text style={styles.modalText}>Phone: {userContactInfo.phone}</Text>
            <Text style={styles.modalText}>Email: {userContactInfo.email}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  chatPage: {
    flex: 1,
    backgroundColor: Color.colorWhite, // Light background color
    width: 404,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 24,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerText: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userStatus: {
    fontSize: 14,
    color: '#888',
  },
  innerContainer: {
    flex: 1,
    padding: 10,
  },
  messageList: {
    paddingBottom: 60,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4CAF50', // Modern green color
    borderRadius: 12,
    padding: 12,
    marginVertical: 5,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    marginVertical: 5,
    maxWidth: '80%',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  messageText: {
    color: '#fff', // White text for sent messages
    fontSize: 16,
    fontFamily: 'Arial', // Modern font
  },
  timestamp: {
    color: '#ddd', // Light gray timestamp
    fontSize: 12,
    marginTop: 5,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5, // Reduced padding for a compact look
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderRadius: 12,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    maxHeight: 40

  },
  input: {
    flex: 1,
    height: 40, // Smaller height for compactness
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#f4f4f4',
  },
  attachButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 25,
    padding: 8,
    marginRight: 10,
  },
  attachButtonText: {
    fontSize: 20,
  },
  emojiPicker: {
    height: 30,
    width: 40,
    marginRight: 10,
    borderRadius: 12
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 18,
    padding: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageMessage: {
    width: 150,
    height: 150,
    borderRadius: 15,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default VendorChat;
