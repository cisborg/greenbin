import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, SafeAreaView, Animated, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSquads } from '../../redux/actions/squads'; // Import the action
import { Color } from '../../GlobalStyles';
import FastImage from 'react-native-fast-image';

const JoinSquads = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const animatedValue = new Animated.Value(0);

  // Fetch squads when the component mounts
  useEffect(() => {
    dispatch(getAllSquads());
  }, [dispatch]);

  // Get squads from Redux state
  const { squads, loading, error } = useSelector((state) => state.squadReducer);

  // Start the animation
  Animated.timing(animatedValue, {
    toValue: 1,
    duration: 700,
    useNativeDriver: true,
  }).start();

  // Filter squads based on search query
  const filteredSquads = squads.filter(squad =>
    squad.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    squad.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSquadItem = ({ item }) => {
    return (
      <View style={styles.squadCard}>
        <FastImage
          source={{ uri: item.cover }} 
          style={styles.coverImage} 
          resizeMode={FastImage.resizeMode.cover}
          onError={() => console.error('Cover image failed to load')} 
        />
        <View style={styles.squadDetails}>
          <FastImage
            source={{ uri: item.avatar }} 
            style={styles.avatar} 
            resizeMode={FastImage.resizeMode.cover}
            onError={() => console.error('Avatar image failed to load')} 
          />
          <TouchableOpacity 
            style={styles.viewButton} 
            onPress={() => {
              if (item.status === 'moderated') {
                navigation.navigate('ViewSquads', { squadName: item.name });
              } else if (item.status === 'add post') {
                navigation.navigate('ViewSquads2', { squadName: item.name });
              }
            }}
          >
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
          <Text style={styles.squadName}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={[styles.status, item.status === 'moderated' ? styles.moderated : styles.addPost]}>
            {item.status}
          </Text>
          <Text style={styles.connectionsCount}>{item.connections} connections</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Color.colorPrimary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load squads: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Squads"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredSquads}
        renderItem={renderSquadItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 5,
  },
  scrollView: {
    paddingBottom: 130,
  },
  squadCard: {
    backgroundColor: '#ffff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  coverImage: {
    width: '100%',
    height: width * 0.20, // Responsive height
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'lightgray'
  },
  header: {
    marginBottom: 20,
  },
  searchInput: {
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowColor: '#000',
    shadowRadius: 3,
    elevation: 2,
    marginVertical: 10
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 25,
    position: 'absolute',

    top: -30,
    left: 10,
    borderWidth: 1,
    borderColor: 'green',
    marginBottom: -15
  },
  squadDetails: {
    padding: 15,
    paddingTop: 40,
  },
  squadName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333333',
  },
  description: {
    color: '#666666',
    fontSize: 13,
  },
  status: {
    color: 'green',
    fontSize: 11
  },
 
  viewButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 3},
    elevation: 4
  },
  viewButtonText: {
    color: 'green',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: '19%',
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    borderRadius: 30,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  connectionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  connectorImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
  },
  connectionsCount: {
    marginLeft: 30,
    fontSize: 12,
    color: '#333',
  },
});

export default JoinSquads;
