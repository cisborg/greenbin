import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign, FontAwesome6 } from '@expo/vector-icons';
import NotificationScreen from './ConnectNotification';
import MessagesScreen from './messageUI'; // Ensure this is your chat page
import SettingsScreen from './Settings';
import { Color } from '../GlobalStyles';


const Tab = createBottomTabNavigator();

const users = [
  { id: '1', name: 'Valary Akinyi', description: 'Data Assistant at Dapstrem Entertainment', followers: 100, awards: 5, mutuals: 3, coverImage: 'https://via.placeholder.com/150', profileImage: 'https://via.placeholder.com/50', category: 'Suggested' },
  { id: '2', name: 'Mercy Njeri', description: 'Environmental Education and Advocacy', followers: 50, awards: 3, mutuals: 2, coverImage: 'https://via.placeholder.com/150', profileImage: 'https://via.placeholder.com/50', category: 'Suggested' },
  { id: '3', name: 'Geff Kirui', description: 'Web Developer specializing in Web Technologies', followers: 150, awards: 10, mutuals: 5, coverImage: 'https://via.placeholder.com/150', profileImage: 'https://via.placeholder.com/50', category: 'Popular' },
  { id: '4', name: 'Abdijabar Saney', description: 'Humanitarian | Emergency Response', followers: 80, awards: 4, mutuals: 1, coverImage: 'https://via.placeholder.com/150', profileImage: 'https://via.placeholder.com/50', category: 'Suggested' },
  { id: '5', name: 'Michael Brown', description: 'Software Engineer', followers: 200, awards: 8, mutuals: 4, coverImage: 'https://via.placeholder.com/150', profileImage: 'https://via.placeholder.com/50', category: 'Most Followed' },
  { id: '6', name: 'Jane Smith', description: 'AI Researcher', followers: 250, awards: 6, mutuals: 6, coverImage: 'https://via.placeholder.com/150', profileImage: 'https://via.placeholder.com/50', category: 'Most Followed' },
  { id: '7', name: 'John Doe', description: 'Data Scientist', followers: 300, awards: 12, mutuals: 7, coverImage: 'https://via.placeholder.com/150', profileImage: 'https://via.placeholder.com/50', category: 'Individuals with Highest Awards' },
  { id: '8', name: 'Alice Johnson', description: 'Community Organizer', followers: 90, awards: 2, mutuals: 0, coverImage: 'https://via.placeholder.com/150', profileImage: 'https://via.placeholder.com/50', category: 'Individuals with Highest Awards' },
];

const GreenConnectMain = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [connections, setConnections] = useState({}); // Track connection status

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    { title: 'Suggested for You', filter: user => user.category === 'Suggested' },
    { title: 'Most Popular', filter: user => user.category === 'Popular' },
    { title: 'Most Followed', filter: user => user.category === 'Most Followed' },
    { title: 'Individuals with Highest Award Amounts', filter: user => user.category === 'Individuals with Highest Awards' },
  ];

  const handleConnectToggle = (userId) => {
    setConnections(prev => ({
      ...prev,
      [userId]: !prev[userId], // Toggle connection status
    }));
  };

  const renderUserCard = ({ item }) => {
   
    const isConnected = connections[item.id];

    return (
      <View style={styles.userContainer}>
        <Image source={{ uri: item.coverImage }} style={styles.coverImage} />
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
        </View>
        <Text style={styles.userName}>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text>{item.followers} Followers</Text>
        <Text>{item.mutuals} Mutual Connections</Text>
        <TouchableOpacity
          style={styles.connectButton}
          onPress={() => {
            if (isConnected) {
              navigation.navigate('ChatPage', { userName: item.name }); // Navigate to chat page
            } else {
              handleConnectToggle(item.id); // Connect the user
            }
          }}
        >
          <Text style={styles.connectButtonText}>{isConnected ? 'Message' : 'Connect'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCategory = ({ item }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{item.title}</Text>
      <FlatList
        data={filteredUsers.filter(item.filter)}
        renderItem={renderUserCard}
        keyExtractor={user => user.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Ionicons name="arrow-back-circle-outline" size={31} color="green" />
        </TouchableOpacity>
  
      <TextInput
        style={styles.searchInput}
        placeholder="Search name, category, profession"
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
    </View>
  );
};

const GreenConnect = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="Connections"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Connections') {
              iconName = <AntDesign name="plussquare" size={20} color={color} />;
            } else if (route.name === 'Notifications') {
              iconName = <Ionicons name="notifications" size={20} color={color} />;
            } else if (route.name === 'Messages') {
              iconName = <FontAwesome6 name="facebook-messenger" size={20} color={color} />;
            } else if (route.name === 'Settings') {
              iconName = <AntDesign name="setting" size={20} color={color} />;
            }

            return iconName;
          },
          tabBarActiveTintColor: Color.colorLimegreen_200,
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name="Connections" component={GreenConnectMain} />
        <Tab.Screen name="Notifications" component={NotificationScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
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
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: Color.colorLimegreen_200,
    borderRadius: 14,
    margin: 10,
    marginTop: 15,
    marginBottom: 20,
    marginLeft: 20,
    width: 290
  },
  userContainer: {
    width: 150, // Adjusted width for the user cards
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
  },
  coverImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: -30, // Overlap the cover image
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#f9f9f9',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  connectButton: {
    backgroundColor: Color.colorLimegreen_200,
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
  },
});

export default GreenConnect;
