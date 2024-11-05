import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';

const Users = [
  { id: '1', userName: 'Pushkin', userImg: require('../../assets/Appliance.png'), isOnline: true },
  { id: '2', userName: 'Bonke', userImg: require('../../assets/anotherWoman.avif'), isOnline: false },
  { id: '3', userName: 'Vicky', userImg: require('../../assets/anotherMan.avif'), isOnline: true },
  { id: '4', userName: 'Sally', userImg: require('../../assets/anotherWoman.avif'), isOnline: false },
];

// Function to format message time
const formatMessageTime = (timestamp) => {
  const messageDate = new Date(timestamp);
  const now = new Date();
  const diffTime = Math.abs(now - messageDate);
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

  if (diffHours >= 24) {
    return messageDate.toLocaleDateString(); // Display date for messages older than 24 hours
  } else if (diffHours > 1) {
    return `${diffHours} hours ago`;
  } else if (diffMinutes < 1) {
    return 'Just now';
  } else {
    return `${diffMinutes} minutes ago`;
  }
};

// Create some sample messages with varied timestamps for testing
const Messages = [
  {
    id: '1',
    userName: 'Pushkin',
    userImg: require('../../assets/Appliance.png'),
    messageTime: formatMessageTime(new Date(Date.now() - 60000)), // 1 minute ago
    hasUnreadMessages: true,
    unreadCount: 2,
    messageText: 'New message from Pushkin',
  },
  {
    id: '2',
    userName: 'Silvance',
    userImg: require('../../assets/anotherWoman.avif'),
    messageTime: formatMessageTime(new Date(Date.now() - 3600000)), // 1 hour ago
    hasUnreadMessages: false,
    unreadCount: 0,
    messageText: 'Oh to namba ne',
  },
  {
    id: '3',
    userName: 'Vicky',
    userImg: require('../../assets/anotherWoman.avif'),
    messageTime: formatMessageTime(new Date(Date.now() - 86400000)), // 1 day ago
    hasUnreadMessages: false,
    unreadCount: 0,
    messageText: 'Hello!',
  },
];

const MessagesScreen = ({ navigation }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleNavigateToChat = (user) => {
    try {
      navigation.navigate('chatConnect', { userName: user.userName });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const renderActiveUser = ({ item }) => (
    item.isOnline && (
      <TouchableOpacity onPress={() => setSelectedUser(item)} style={styles.activeUser}>
        <Image source={item.userImg} style={styles.userProfileImg} />
        <Text style={styles.userName}>{item.userName}</Text>
      </TouchableOpacity>
    )
  );

  const renderMessageItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleNavigateToChat(item)}>
      <View style={styles.userInfo}>
        <Image source={item.userImg} style={styles.userImg} />
        <View style={styles.textSection}>
          <View style={styles.row}>
            <Text style={styles.userName}>{item.userName}</Text>
            <Text style={styles.messageTime}>{item.messageTime}</Text>
          </View>
          <Text
            style={[
              styles.messageText,
              item.hasUnreadMessages ? styles.boldText : null,
            ]}
          >
            {item.messageText}
          </Text>
          {item.hasUnreadMessages && (
            <View style={styles.unreadBubble}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.activeNowText}>Active Now</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.userScrollView}
        >
          {Users.map((user) => renderActiveUser({ item: user }))}
        </ScrollView>
      </Animated.View>

      <FlatList
        data={Messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  activeNowText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  userScrollView: {
    paddingHorizontal: 10,
  },
  activeUser: {
    alignItems: 'center',
    marginRight: 15,
  },
  userProfileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'green',
  },
  userName: {
    fontSize: 12,
    marginTop: 5,
  },
  flatList: {
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textSection: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageText: {
    color: '#333',
    fontSize: 14,
    marginTop: 5,
  },
  messageTime: {
    fontSize: 12,
    color: '#666',
  },
  boldText: {
    fontWeight: 'bold',
  },
  unreadBubble: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'red',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
