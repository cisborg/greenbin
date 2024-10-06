import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import { Color } from '../../GlobalStyles';

const commentsData = [
  {
    id: '1',
    user: 'BossX',
    username: '@yourmom24',
    timestamp: '3 weeks ago',
    message: "Gradually I think we won't need to write a message for your commit; it should be generated.",
    upvotes: 4,
  },
  {
    id: '2',
    user: 'Krzysztof',
    username: '@kris007iron',
    timestamp: '2 weeks ago',
    message: "@yourmom24 good idea, Copilot tries to do that in VSCode but often it crashes.",
    upvotes: 1,
  },
  {
    id: '3',
    user: 'ray',
    username: '@raypoly',
    timestamp: '2 weeks ago',
    message: "@yourmom24 we might, but that would mean that the tool is generating a...",
    upvotes: 0,
  },
];

const CommentsSection = ({ visible, onClose }) => {
  const [newComment, setNewComment] = useState('');

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.avatar} />
      <View style={styles.commentContent}>
        <Text style={styles.userName}>
          {item.user} <Text style={styles.username}>{item.username}</Text>
        </Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <View style={styles.footer}>
          <Text style={styles.upvotes}>{item.upvotes} upvotes</Text>
        </View>
      </View>
    </View>
  );

  const handleSendComment = () => {
    if (newComment.trim()) {
      // Logic to add the new comment to commentsData
      // For now, just reset the input
      setNewComment('');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <Text style={styles.header}>Comments</Text>
          <FlatList
            data={commentsData}
            renderItem={renderComment}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.commentList}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Share your thoughts"
              placeholderTextColor="#B0B0B0"
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendComment}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  container: {
    backgroundColor: Color.colorWhite,
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  commentList: {
    paddingBottom: 20,
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  username: {
    fontSize: 14,
    color: '#007BFF',
  },
  timestamp: {
    fontSize: 12,
    color: '#333333',
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
    color: '#000000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  upvotes: {
    fontSize: 12,
    color: '#333333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 10,
    color: '#000000',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    padding: 10,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default CommentsSection;
