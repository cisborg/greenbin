import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Color } from '../../GlobalStyles';


const commentsData = [
  {
    id: '1',
    user: 'BossX',
    username: '@yourmom24',
    timestamp: '3 weeks ago',
    message: "Gradually I think we won't need to write a message for your commit; it should be generated. If you need, then just stash it on your local.",
    upvotes: 4,
  },
  {
    id: '2',
    user: 'Krzysztof',
    username: '@kris007iron',
    timestamp: '2 weeks ago',
    message: "@yourmom24 good idea, Copilot tries to do that in VSCode but often it crashes in catching the sense of commit even if it is quite obvious, or I just do not know when to commit ;)",
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

const CommentsSection = () => {
  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.avatar} />
      <View style={styles.commentContent}>
        <Text style={styles.userName}>{item.user} <Text style={styles.username}>{item.username}</Text></Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <View style={styles.footer}>
          <Text style={styles.upvotes}>{item.upvotes} upvotes</Text>
        </View>
      </View>
    </View>
  );

  return (
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
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000', // Changed to black
    marginBottom: 10,
  },
  commentList: {
    paddingBottom: 20,
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#F5F5F5', // Changed to light gray
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
    color: '#000000', // Changed to black
  },
  username: {
    fontSize: 14,
    color: '#007BFF', // Keep username color as blue
  },
  timestamp: {
    fontSize: 12,
    color: '#333333', // Changed to dark gray for better contrast
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
    color: '#000000', // Changed to black
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  upvotes: {
    fontSize: 12,
    color: '#333333', // Changed to dark gray for better contrast
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Changed to light gray
    borderRadius: 20,
    padding: 10,
    color: '#000000', // Changed to black
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007BFF', // Keep button color as blue
    borderRadius: 20,
    padding: 10,
  },
  sendButtonText: {
    color: '#FFFFFF', // Keep button text color white
    fontWeight: 'bold',
  },
});

export default CommentsSection;
