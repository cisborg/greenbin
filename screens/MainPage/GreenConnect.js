import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Platform,
  StatusBar
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign, FontAwesome6 } from '@expo/vector-icons';
import NotificationScreen from '../GreenConnect/ConnectNotification';
import FriendScreen from '../GreenConnect/Friends';
import MessagesScreen from '../GreenConnect/messageUI'; // Ensure this is your chat page
import SettingsScreen from '../GreenConnect/Settings';
import { SafeAreaView } from 'react-native-safe-area-context'; // SafeAreaView for screen edges
import { Color } from '../../GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { fetchUsers } from '../../redux/actions/admin'; // Adjust the import path as necessary

const Tab = createBottomTabNavigator(); // Define the Tab navigator

const CustomHeader = ({ profileImage }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View style={{ flexDirection: 'column' }}>
        <Text style={styles.headerTitle}>Pilot Green Connect</Text>
        <Text style={styles.subheaderTitle}> Connect and Go green with GreenBin! </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ProfilePage')}>
        <FastImage
          style={styles.profileImageHeader}
          source={{ uri: profileImage, priority: FastImage.priority.normal }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
    </View>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity key={index} onPress={onPress} style={styles.tabButton}>
            <View style={styles.tabIcon}>
              {options.tabBarIcon({ color: isFocused ? 'green' : 'gray', size: 18 })}
              {options.tabBarBadge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{options.tabBarBadge}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.tabLabel, { color: isFocused ? 'green' : 'gray' }]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const GreenConnectMain = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [connections, setConnections] = useState({});
  const [loading, setLoading] = useState({}); // Track loading status for each user
  const fadeAnim = useRef(new Animated.Value(0)).current; // For screen animation

  const dispatch = useDispatch(); // Get the dispatch function
  const users = useSelector(state => state.users); // Access users from Redux state

  useEffect(() => {
    dispatch(fetchUsers()); // Fetch users when the component mounts
  }, [dispatch]);

  useEffect(() => {
    // Fade-in animation on screen mount
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    { title: 'Suggested for You', filter: user => user.category === 'Suggested' },
    { title: 'Most Popular', filter: user => user.category === 'Popular' },
    { title: 'Most Followed', filter: user => user.category === 'Most Followed' },
  ];

  const handleConnectToggle = (userId) => {
    setLoading((prev) => ({ ...prev, [userId]: true }));
    setTimeout(() => {
      setConnections((prev) => ({
        ...prev,
        [userId]: !prev[userId],
      }));
      setLoading((prev) => ({ ...prev, [userId]: false })); // Stop spinner
    }, 1500); // Simulate async action delay
  };

  const renderUserCard = ({ item }) => {
    const isConnected = connections[item.id];
    const isLoading = loading[item.id];

    return (
      <View style={styles.userContainer}>
        <View style={styles.profileImageContainer}>
          <FastImage
            style={styles.profileImage}
            source={{ uri: item.profileImage }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <Text style={styles.userName}>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text>{item.followers} Followers</Text>
        <TouchableOpacity
          style={styles.connectButton}
          onPress={() => {
            if (!isLoading) {
              if (isConnected) {
                navigation.navigate('chatConnect', { userName: item.name }); // Navigate to chat page
              } else {
                handleConnectToggle(item.id); // Trigger connect action
              }
            }
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.connectButtonText}>{isConnected ? 'Message' : 'Connect'}</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderCategory = ({ item }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{item.title}</Text>
      <FlatList
        data={filteredUsers.filter(user => item.filter(user))}
        renderItem={renderUserCard}
        keyExtractor={user => user.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search name or category"
            placeholderTextColor={Color.colorGray_100}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={item => item.title}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const GreenConnect = () => {
  const unreadMessages = 5;  // Sample message count
  const unseenNotifications = 3;  // Sample notification count
  const unreadSettings = 2; // Sample settings count
  const profileImage = 'https://via.placeholder.com/50'; // Profile image URL

  return (
    <View style={styles.container}>
      <CustomHeader profileImage={profileImage} />
      <Tab.Navigator
        initialRouteName="Connections"
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={({ route }) => ({
          headerShown: false, // Hide header titles
          tabBarIcon: ({ color, size }) => {
            let icon;
            if (route.name === 'Connections') {
              icon = <AntDesign name="plussquare" size={size} color={color} />;
            } else if (route.name === 'Friends') {
              icon = <AntDesign name="addusergroup" size={size} color={color} />;
            }
             else if (route.name === 'Notifications') {
              icon = <Ionicons name="notifications" size={size} color={color} />;
            } else if (route.name === 'Messages') {
              icon = <FontAwesome6 name="facebook-messenger" size={size} color={color} />;
            } else if (route.name === 'Settings') {
              icon = <AntDesign name="setting" size={size} color={color} />;
            } 
            return icon;
          },
          tabBarBadge: route.name === 'Messages' ? unreadMessages :
                       route.name === 'Notifications' ? unseenNotifications :
                       route.name === 'Settings' ? unreadSettings : null,
        })}
      >
        <Tab.Screen name="Connections" component={GreenConnectMain} />
        <Tab.Screen name="Friends" component={FriendScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Notifications" component={NotificationScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </View>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 5,
    overflow: 'hidden',
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight : 0,

  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4%',
    padding: 7,
    backgroundColor: Color.colorWhite,
    borderRadius: 10,
    marginTop: '-7%'
  },
  
  headerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'green',
  },
  subheaderTitle:{
    fontSize: 14,
    color: Color.colorGray_400,
    marginLeft: -5
  },
  profileImageHeader: {
    width: 40,
    height: 40,
    borderRadius: 16,
  },
  searchInput: {
    padding: 10,
    borderRadius: 14,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#ccc',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 15,
    width: '100%',
    elevation: 1,
    marginTop: -50
  },
  userContainer: {
    width: 150,
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 18,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
  },
  userName: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  connectButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  connectButtonText: {
    color: 'white',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    height: 50,
    borderRadius: 16,
  },
  tabButton: {
    alignItems: 'center',
  },
  tabIcon: {
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
  },
  tabLabel: {
    fontSize: 11,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default GreenConnect;
