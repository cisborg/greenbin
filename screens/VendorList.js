import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Color } from '../GlobalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign'; // Make sure to install this package

const peopleToFollow = [
  {
    id: '1',
    name: 'Tim Tebow',
    job: 'Tree Vendor',
    location: 'Nairobi',
    description: 'Selling All kinds of Trees, 5x NYT Best-Selling Author, 2x National Champion, Heisman Trophy...',
    followers: 'Followed by Michael Nyagha, Grace and 19 others you know',
    image: 'https://example.com/tim-tebow.jpg', // Replace with actual image URL
    coverImage: 'https://example.com/tim-tebow-cover.jpg', // Replace with actual cover image URL
    connections: [
      'https://example.com/connector1.jpg',
      'https://example.com/connector2.jpg',
      'https://example.com/connector3.jpg',
    ],
  },
  {
    id: '2',
    name: 'Ryan Reynolds',
    job: 'Actor, Business Owner',
    location: 'Mombasa',
    description: 'Part-Time Actor, Business Owner',
    followers: 'Followed by Grace, Antony and 250 others you know',
    image: 'https://example.com/ryan-reynolds.jpg', // Replace with actual image URL
    coverImage: 'https://example.com/ryan-reynolds-cover.jpg', // Replace with actual cover image URL
    connections: [
      'https://example.com/connector1.jpg',
      'https://example.com/connector2.jpg',
      'https://example.com/connector3.jpg',
    ],
  },
  // Add more vendors as needed...
];

const VendorList = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPeople = peopleToFollow.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.job.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderConnections = (connections) => (
    <View style={styles.connectionsContainer}>
      {connections.map((uri, index) => (
        <Image
          key={index}
          source={{ uri }}
          style={[styles.connectionImage, { zIndex: connections.length - index }]} // Ensure overlapping effect
        />
      ))}
      <Text style={styles.connectionsCount}>{connections.length}k</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.coverImage }} style={styles.coverImage} />
      <View style={styles.infoContainer}>
        <Image source={{ uri: item.image }} style={styles.profileImage} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.job}>{item.job}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.followers}>{item.followers}</Text>
        {renderConnections(item.connections)}
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Connect Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, job, or location..."
          value={searchQuery}
          placeholderTextColor={Color.colorGray_100}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredPeople}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    width: 404,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexDirection: 'row',
    maxWidth: '100%',
  },
  coverImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    left: -140,
    top: 80
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    position: 'absolute',
    top: -36,
    left: 10,
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 20,
    marginLeft: 70,
  },
  job: {
    fontSize: 10,
    color: '#666666',
    marginLeft: 70,
  },
  description: {
    fontSize: 12,
    color: '#666666',
    marginVertical: 5,
    marginLeft: 70,
  },
  followers: {
    fontSize: 9,
    color: '#666666',
    marginVertical: 4,
    marginLeft: 70,
  },
  followButton: {
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    alignItems: 'center',
    width: 100,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    marginLeft: 70,
  },
  followButtonText: {
    color: Color.colorLimegreen_200,
    fontWeight: 'bold',
  },
  header: {
    marginBottom: 20,
  },
  searchInput: {
    borderColor: Color.colorGray_100,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 30,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
  },
  connectionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top: -120,
    left: 200
  },
  connectionImage: {
    width: 30,
    height: 25,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'lightgray',
    position: 'absolute',
    left: 0,
  },
  connectionsCount: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 40, // Adjust this value as needed
  },
});

export default VendorList;
