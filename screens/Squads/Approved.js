import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, SafeAreaView, ActivityIndicator, StatusBar, Platform, Dimensions, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install this package
import FastImage from 'react-native-fast-image';

const { width } = Dimensions.get('window');

const Approved = ({ navigation }) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      profession: "Graphic Designer",
      description: "Creating stunning visuals for brands.",
      profilePic: "https://example.com/profile1.jpg",
    },
    {
      id: 2,
      name: "James Bond",
      profession: "Web Developer",
      description: "Building responsive and user-friendly websites.",
      profilePic: "https://example.com/profile2.jpg",
    },
    {
      id: 3,
      name: "Alice Johnson",
      profession: "Digital Marketer",
      description: "Expert in SEO and social media marketing.",
      profilePic: "https://example.com/profile3.jpg",
    },
  ]);

  const [loadingStates, setLoadingStates] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleUnfollow = (userId) => {
    setLoadingStates((prev) => ({ ...prev, [userId]: true }));

    setTimeout(() => {
      setUsers((prev) => prev.filter(users => users.id !== userId));
      setLoadingStates((prev) => ({ ...prev, [userId]: false }));
    }, 400);
  };

  const filteredUsers = users.filter(users => 
    users.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    users.profession.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" size={24} color="green" />
        </TouchableOpacity>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Search for connectors to approve..." 
          value={searchTerm} 
          onChangeText={setSearchTerm} 
          placeholderTextColor="#888"
        />
      </View>
      <View style={styles.content}>
        {filteredUsers.length === 0 ? (
          <Text style={styles.emptyMessage}>Approval Complete! </Text>
        ) : (
          filteredUsers.map((users) => (
            <Animated.View key={users.id} style={styles.card}>
              <TouchableOpacity style={styles.userInfo}>
                <FastImage source={{ uri: users.profilePic }} style={styles.profilePic} resizeMode={FastImage.resizeMode.cover}/>
                <View style={styles.details}>
                  <Text style={styles.userName}>{users.name}</Text>
                  <Text style={styles.userProfession}>{users.profession}</Text>
                  <Text style={styles.userDescription}>{users.description}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => handleUnfollow(users.id)} 
                style={[styles.unfollowButton, loadingStates[users.id] ? styles.loadingButton : null]}
              >
                {loadingStates[users.id] ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Approve</Text>
                )}
              </TouchableOpacity>
            </Animated.View>
          ))
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '1%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#ffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10

  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 16,
    padding: 10,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    fontSize: 14,
    color: '#333',
    marginRight: '4%',
  },
  content: {
    margin: 5
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 18,
    color: 'darkgrey',
    marginTop: '20%',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 14,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: width * 0.98,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  details: {
    flexDirection: 'column',
  },
user: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  userProfession: {
    fontSize: 13,
    color: 'gray',
  },
  userDescription: {
    fontSize: 11,
    color: 'darkgray',
  },
  unfollowButton: {
    backgroundColor: 'green',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-4%'
  },
  loadingButton: {
    backgroundColor: 'orange',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default Approved;
