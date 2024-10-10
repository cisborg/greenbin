import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '../../GlobalStyles';

const Users = [
  {
    id: '1',
    userName: 'Pushkin',
    userImg: require('../../assets/Appliance.png'),
    isOnline: true,
  },
  {
    id: '2',
    userName: 'Silvance',
    userImg: require('../../assets/anotherWoman.avif'),
    isOnline: false,
  },
  {
    id: '3',
    userName: 'Brevo',
    userImg: require('../../assets/anotherMan.avif'),
    isOnline: true,
  },
  {
    id: '4',
    userName: 'Tyson',
    userImg: require('../../assets/woofer.png'),
    isOnline: false,
  },
  {
    id: '5',
    userName: 'Mwalimu',
    userImg: require('../../assets/check.png'),
    isOnline: true,
  },
  {
    id: '6',
    userName: 'Felix Adem',
    userImg: require('../../assets/Appliance.png'),
    isOnline: true,
  },
];

const Messages = [
  {
    id: '1',
    userName: 'Pushkin',
    userImg: require('../../assets/Appliance.png'),
    messageTime: '4 mins ago',
    messageText: 'Na ile group ulicreat fb inajiita aje 😅😅',
    isOnline: true,
    hasUnreadMessages: true,
    unreadCount: 2,
  },
  {
    id: '2',
    userName: 'Silvance',
    userImg: require('../../assets/anotherWoman.avif'),
    messageTime: '2 hours ago',
    messageText: 'Oh to namba ne',
    isOnline: false,
    hasUnreadMessages: false,
    unreadCount: 0,
  },
  {
    id: '3',
    userName: 'Brevo',
    userImg: require('../../assets/anotherMan.avif'),
    messageTime: '5 mins ago',
    messageText: 'What’s up?',
    isOnline: true,
    hasUnreadMessages: false,
    unreadCount: 0,
  },
  {
    id: '4',
    userName: 'Tyson',
    userImg: require('../../assets/woofer.png'),
    messageTime: '1 day ago',
    messageText: 'Can we meet tomorrow?',
    isOnline: false,
    hasUnreadMessages: false,
    unreadCount: 0,
  },
  {
    id: '5',
    userName: 'Mwalimu',
    userImg: require('../../assets/check.png'),
    messageTime: 'Online',
    messageText: 'I am here!',
    isOnline: true,
    hasUnreadMessages: false,
    unreadCount: 0,
  },
  {
    id: '6',
    userName: 'Felix Adem',
    userImg: require('../../assets/Appliance.png'),
    messageTime: '15 mins ago',
    messageText: 'Let’s catch up!',
    isOnline: true,
    hasUnreadMessages: false,
    unreadCount: 0,
  },
];

const MessagesScreen = ({ navigation }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchMode, setSearchMode] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState(Users);
  const [filteredMessages, setFilteredMessages] = useState(Messages);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchText === '') {
        setFilteredUsers(Users);
        setFilteredMessages(Messages);
      } else {
        const filteredUsersList = Users.filter(user =>
          user.userName.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredUsers(filteredUsersList);

        const filteredMessagesList = Messages.filter(message =>
          message.userName.toLowerCase().includes(searchText.toLowerCase()) ||
          message.messageText.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredMessages(filteredMessagesList);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchText]);

  const handleNavigateToChat = (user) => {
    const updatedMessages = filteredMessages.map(msg => {
      if (msg.userName === user.userName) {
        return { ...msg, hasUnreadMessages: false, unreadCount: 0 };
      }
      return msg;
    });
    setFilteredMessages(updatedMessages);
    navigation.navigate('chatConnect', { userName: user.userName });
  };

  const toggleSearchMode = () => {
    setSearchMode(!searchMode);
    setSearchText('');
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedUser(item)}
      style={selectedUser?.id === item.id ? styles.selectedUserProfile : null}
    >
      <View style={styles.userProfile}>
        <Image source={item.userImg} style={styles.userProfileImg} />
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.lastSeen}>
          {item.isOnline ? 'Online' : item.messageTime}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderMessageItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleNavigateToChat(item)}>
      <View style={styles.userInfo}>
        <View style={styles.userImgWrapper}>
          <Image source={item.userImg} style={styles.userImg} />
        </View>
        <View style={styles.textSection}>
          <View style={styles.row}>
            <Text style={styles.userName}>{item.userName}</Text>
            <Text style={styles.messageTime}>{item.messageTime}</Text>
          </View>
          <Text style={styles.messageText}>{item.messageText}</Text>
          <Text style={styles.lastSeen}>
            {item.isOnline ? 'Online' : item.messageTime}
          </Text>
          {item.hasUnreadMessages && (
            <Text style={styles.unreadCount}>
              {item.unreadCount} new messages
            </Text>
          )}
        </View>
        {!item.hasUnreadMessages && (
          <Ionicons name="checkmark-circle" size={16} color="blue" style={styles.unreadIndicator} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIcons}>
          {searchMode ? (
            <TextInput
              style={styles.searchInput}
              placeholder="Search messages..."
              placeholderTextColor={Color.colorGray_100}
              value={searchText}
              onChangeText={setSearchText}
              autoFocus
            />
          ) : (
            <TouchableOpacity style={{ alignSelf: 'flex-end'}}>
               <Ionicons name="search" size={24} color="#333" style={{ marginRight: 15 }} onPress={toggleSearchMode} />
              </TouchableOpacity>
          )}
         
        </View>
      </View>

      <Animated.View style={{ opacity: fadeAnim }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.userScrollView}
        >
          {filteredUsers.map(user => (
            <TouchableOpacity key={user.id} onPress={() => setSelectedUser(user)}>
              <View style={styles.userProfile}>
                <Image source={user.userImg} style={styles.userProfileImg} />
                <Text style={styles.userName}>{user.userName}</Text>
                <Text style={styles.lastSeen}>
                  {user.isOnline ? 'Online' : ' ' + Messages.find(msg => msg.userName === user.userName)?.messageTime}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      <View style={styles.messageListContainer}>
        <FlatList
          data={filteredMessages}
          keyExtractor={item => item.id}
          renderItem={renderMessageItem}
          contentContainerStyle={styles.flatList}
        />
      </View>
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 5,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 3,
    justifyContent: 'flex-start',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1,
    borderColor: 'green',
    borderWidth: 2,
    padding: 10,
    borderRadius: 14,
    marginRight: 15,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    width: '100%',
    marginRight: 40
  },
  userProfile: {
    alignItems: 'center',
    marginRight: 30,
  },
  userProfileImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userName: {
    marginTop: 5,
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  lastSeen: {
    fontSize: 12,
    color: 'green',
  },
  selectedUserProfile: {
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 30,
  },
  card: {
    width: '100%',
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 17,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImgWrapper: {
    paddingRight: 15,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  unreadIndicator: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  textSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageTime: {
    fontSize: 12,
    color: Color.colorGray_200,
  },
  messageText: {
    fontSize: 14,
    color: Color.colorGray_400,
  },
  unreadCount: {
    color: 'red',
    fontSize: 12,
  },
  messageListContainer: {
    flex: 1,
    paddingTop: 10,
  },
  flatList: {
    paddingBottom: 20,
  },
  userScrollView: {
    paddingBottom: 10,
  },
});
