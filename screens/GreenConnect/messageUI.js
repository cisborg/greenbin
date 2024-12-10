import React, {  useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import FastImage from 'react-native-fast-image';
import { fetchChats } from '../../redux/actions/chats'; // Adjust the import path
import LottieView from 'lottie-react-native'; // Import Lottie for animations

const formatMessageTime = (timestamp) => {
  const messageDate = new Date(timestamp);
  const now = new Date();
  const diffTime = Math.abs(now - messageDate);
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

  if (diffHours >= 24) {
    return messageDate.toLocaleDateString();
  } else if (diffHours > 1) {
    return `${diffHours} hours ago`;
  } else if (diffMinutes < 1) {
    return 'Just now';
  } else {
    return `${diffMinutes} minutes ago`;
  }
};

const MessagesScreen = ({ navigation }) => {
  const dispatch = useDispatch(); // Initialize dispatch
  const { chats, loading, error } = useSelector(state => state.chats); // Get chats, loading, and error from the Redux store
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    
    dispatch(fetchChats()); // Fetch chats when the component mounts
  }, [dispatch]);

  const handleNavigateToChat = (user) => {
    try {
      navigation.navigate('chatConnect', { userName: user.userName });
    } catch (error) {
      alert("Navigation failed. Please try again.");
    }
  };

  const renderMessageItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleNavigateToChat(item)}>
      <View style={styles.userInfo}>
        <FastImage source={item.userImg} style={styles.userImg} resizeMode={FastImage.resizeMode.cover} />
        <View style={styles.textSection}>
          <View style={styles.row}>
            <Text style={styles.userName}>{item.userName}</Text>
            <Text style={styles.messageTime}>{formatMessageTime(item.messageTime)}</Text>
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
          <LottieView
            source={require('../../assets/lottie/rotateLoad.json')} 
            autoPlay
            loop
            style={styles.lottie}
          />
      </View>  )}

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <LottieView
          source={require('../../assets/lottie/flashed.json')} // Adjust the path to your Lottie file
          autoPlay
          loop
          style={styles.lottie}
        />
        <Text style={styles.errorText}>Error loading chats.</Text>
      </View>
    );
  }

  if (chats.length === 0) {
    return (
      <View style={styles.noChatsContainer}>
        <Text>No Chats</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <FlatList
        data={chats} // Use chats from Redux store
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        contentContainerStyle={styles.flatList}
        removeClippedSubviews={true}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  userName: {
    fontSize: 12,
    marginTop: 5,
  },
  flatList: {
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noChatsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 100,
    height: 100,
  },
  errorText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#ff0000',
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

export default MessagesScreen;
