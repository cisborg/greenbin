import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, SafeAreaView, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import EmojiSelector from 'react-native-emoji-selector';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import * as Audio from 'expo-av'; // For recording voice notes
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Ensures gestures work properly

const ChatScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! How are you?',
      timestamp: new Date(),
      sender: 'Sender',
      read: false, // Add read status
    },
    {
      id: 2,
      text: 'I am doing great, thank you!',
      timestamp: new Date(),
      sender: 'You',
      read: true, // Assume this message is read
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [quotedMessage, setQuotedMessage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [recording, setRecording] = useState(null);

  const currentUser = 'You'; // Identifier for the current user
  const isOnline = true; // Change this based on actual online status

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        text: inputMessage,
        timestamp: new Date(),
        sender: currentUser, // Indicates that the current user sent this message
        read: false, // Newly sent messages are unread
        quotedMessage
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      setQuotedMessage(null); // Clear the quoted message after sending
    }
  };

  const quoteMessage = (message) => {
    setQuotedMessage(message);
  };

  const handleFileAttachment = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === 'success') {
        alert(`File Selected: ${result.name}`);
        // Add file sending functionality as needed
      }
    } catch (err) {
      console.log('Error picking file:', err);
    }
  };

  const deleteMessage = (messageId) => {
    setMessages(messages.filter((message) => message.id !== messageId));
  };

  const forwardMessage = (message) => {
    Alert.alert(
      "Forward Message",
      `Forward "${message.text}" to other users?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Forward", onPress: () => alert(`Message forwarded: "${message.text}"`) },
      ]
    );
  };

  const renderRightActions = (message) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteMessage(message.id)}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderLeftActions = (message) => (
    <TouchableOpacity style={styles.quoteButton} onPress={() => quoteMessage(message)}>
      <Text style={styles.quoteButtonText}>Quote</Text>
    </TouchableOpacity>
  );

  const renderMessageItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item)}
      renderLeftActions={() => renderLeftActions(item)}
      onSwipeableLeftOpen={() => quoteMessage(item)}
    >
      <View
        style={[
          styles.messageContainer,
          item.sender === currentUser ? styles.myMessage : styles.otherMessage,
        ]}
      >
        <Text style={styles.messageSender}>{item.sender}</Text>
        
        {item.quotedMessage && (
          <View style={styles.quotedMessage}>
            <Text style={styles.quotedMessageText}>
              {item.quotedMessage.sender}: {item.quotedMessage.text}
            </Text>
          </View>
        )}
        
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTimestamp}>{item.timestamp.toLocaleTimeString()}</Text>

        {item.sender !== currentUser && item.read && (
          <Ionicons name="checkmark-done" size={14} color="blue" style={styles.readIndicator} />
        )}
      </View>
    </Swipeable>
  );

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.granted) {
        await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
      } else {
        alert('Permission to access microphone is required!');
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    alert('Voice note recorded: ' + uri);
    // Add the recorded voice note to the messages array here
  };

  return (
    <GestureHandlerRootView style={styles.safeAreaView}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=> navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Ogallo Apopa</Text>
          <Text style={styles.headerSubtitle}>
            {isOnline ? 'Online' : `Last seen: ${new Date().toLocaleTimeString()}`}
          </Text>
        </View>
        <TouchableOpacity style={styles.voiceCallButton}>
          <Ionicons name="call" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton}>
          <MaterialIcons name="more-vert" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Display Quoted Message Above Messages */}
      {quotedMessage && (
        <View style={styles.quotedMessageAboveInput}>
          <Text style={styles.quotedMessageText}>
            Replying to {quotedMessage.sender}: {quotedMessage.text}
          </Text>
        </View>
      )}

      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.messagesList}
      />

      {showEmojiPicker && (
        <EmojiSelector
          onEmojiSelected={(emoji) => setInputMessage((prev) => prev + emoji)}
          columns={8}
        />
      )}

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => setShowEmojiPicker(!showEmojiPicker)}>
          <FontAwesome name="smile-o" size={24} color="gray" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={inputMessage}
          onChangeText={setInputMessage}
        />

        <TouchableOpacity onPress={handleFileAttachment}>
          <Ionicons name="attach" size={24} color="gray" />
        </TouchableOpacity>

        {inputMessage.trim() !== '' ? (
          <TouchableOpacity onPress={sendMessage}>
            <Ionicons name="send" size={24} color="#25D366" />
          </TouchableOpacity>
        ) : recording ? (
          <TouchableOpacity onPress={stopRecording}>
            <Ionicons name="mic-off" size={24} color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={startRecording}>
            <Ionicons name="mic" size={24} color="gray" />
          </TouchableOpacity>
        )}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#075E54',
  },
  backButton: {
    marginLeft: 10,
  },
  headerInfo: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'white',
  },
  voiceCallButton: {
    marginRight: 20,
  },
  moreButton: {
    marginRight: 10,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageContainer: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
  },
  messageSender: {
    fontWeight: 'bold',
  },
  quotedMessage: {
    borderLeftColor: '#ccc',
    borderLeftWidth: 2,
    paddingLeft: 5,
    marginBottom: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  quotedMessageText: {
    fontStyle: 'italic',
  },
  messageText: {
    marginVertical: 5,
  },
  messageTimestamp: {
    fontSize: 10,
    color: '#999',
  },
  readIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  quotedMessageAboveInput: {
    padding: 5,
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
    marginBottom: 5,
  },
  quotedMessageText: {
    fontStyle: 'italic',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
  quoteButton: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 5,
  },
  quoteButtonText: {
    color: 'white',
  },
});

export default ChatScreen;
