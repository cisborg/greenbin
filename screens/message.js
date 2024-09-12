// MessageScreen.js
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import EmojiSelector from 'react-native-emoji-selector';
import { Color } from '../GlobalStyles';


const MessageScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchText, setSearchText] = useState('');

  const sendMessage = () => {
    if (messageText.trim()) {
      setMessages([...messages, { text: messageText, sender: 'me', timestamp: new Date().toLocaleTimeString(), reactions: [] }]);
      setMessageText('');
      setIsTyping(false);
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
      setMessages([...messages, { text: result.uri, sender: 'me', isImage: true, timestamp: new Date().toLocaleTimeString(), reactions: [] }]);
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
    <LinearGradient colors={darkMode ? ['#2c3e50', '#34495e'] : ['#e0f7e8', '#c4e1c1']} style={styles.container}>
      <KeyboardAvoidingView style={styles.innerContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{user.name}</Text>
          <TouchableOpacity onPress={() => setDarkMode(!darkMode)}>
            <Text style={styles.toggleButton}>{darkMode ? '🌞' : '🌙'}</Text>
          </TouchableOpacity>
        </View>
        
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages..."
          value={searchText}
          onChangeText={setSearchText}
        />

        <FlatList
          data={messages.filter(msg => msg.text.includes(searchText))}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.messageList}
          inverted
        />
        
        {isTyping && <Text style={styles.typingIndicator}>Typing...</Text>}
        
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.attachButton}>📎</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={messageText}
            onChangeText={(text) => {
              setMessageText(text);
              setIsTyping(text.length > 0);
            }}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity onPress={() => setShowEmojiPicker(!showEmojiPicker)}>
            <Text style={styles.emojiButton}>😀</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
        
        {showEmojiPicker && (
          <EmojiSelector
            onEmojiSelected={emoji => {
              setMessageText(messageText + emoji);
              setShowEmojiPicker(false);
            }}
            style={styles.emojiPicker}
          />
        )}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
    overflow: 'hidden',
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    padding: 15,
    backgroundColor: '#4CAF50',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleButton: {
    fontSize: 24,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    margin: 10,
    backgroundColor: '#f4f4f4',
  },
  messageList: {
    paddingBottom: 60,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff', // Changed to white
    borderRadius: 15,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
    borderBottomLeftRadius: 0,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff', // Changed to white
    borderRadius: 15,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    color: '#000',
    fontSize: 16,
  },
  timestamp: {
    color: '#000',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'right',
  },
  typingIndicator: {
    color: '#76ff03',
    fontStyle: 'italic',
    marginLeft: 15,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f4f4f4',
    marginRight: 10,
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  attachButton: {
    fontSize: 24,
    marginRight: 10,
  },
  emojiButton: {
    fontSize: 24,
    marginRight: 10,
  },
  imageMessage: {
    width: 150,
    height: 150,
    borderRadius: 15,
    marginTop: 5,
  },
  emojiPicker: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default MessageScreen;
