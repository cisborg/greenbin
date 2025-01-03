import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView ,Platform, StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSquads, requestJoinSquad } from '../../redux/actions/squads'; 
import { Color } from '../../GlobalStyles';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';

const JoinSquads = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingStates, setLoadingStates] = useState({});

  // Get userId from Redux state
  const userId  = useSelector((state) => state.auth.id); // Adjust according to your state structure
  // Get posts from Redux state
   const  squads  = useSelector((state) => state.squads.squads);
   const loading  = useSelector((state) => state.squads.loading);
   const error  = useSelector((state) => state.squads.error);
  useEffect(() => {
    dispatch(getAllSquads());
  }, [dispatch]);

  const handleTryAgain = () => {
    dispatch(getAllSquads());
  };

  const filteredSquads = squads.filter(squad =>
    squad.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    squad.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinPress = (squadId) => {
    setLoadingStates((prev) => ({ ...prev, [squadId]: 'loading' }));

    // Dispatch the join squad action with dynamic userId
    dispatch(requestJoinSquad(squadId, userId));

    // Optionally handle loading state after dispatch
    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [squadId]: 'pending' }));
    }, 300); // Duration for the spinner
  };

  const renderSquadItem = ({ item }) => {
    const loadingState = loadingStates[item.id];

    return (
      <View style={styles.squadCard}>
        <FastImage
          source={{ uri: item.cover }} 
          style={styles.coverImage} 
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.squadDetails}>
          <FastImage 
            source={{ uri: item.avatar }} 
            style={styles.avatar} 
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text style={styles.squadName}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={[styles.status, item.status === 'moderated' ? styles.moderated : styles.addPost]}>
            {item.status}
          </Text>
          
          <View style={styles.connectionsContainer}>
            {Array.from({ length: 3 }).map((_, index) => (
              <FastImage 
                key={index}
                source={{ uri: item.avatar }} 
                resizeMode={FastImage.resizeMode.cover}
                style={[styles.connectorImage, { zIndex: 3 - index }]} 
              />
            ))}
            <Text style={styles.connectionsCount}>{item.connections} connections</Text>
          </View>

          <TouchableOpacity style={styles.joinButton} onPress={() => handleJoinPress(item.id)}>
            {loadingState === 'loading' ? (
              <ActivityIndicator size="small" color={Color.colorWhite} />
            ) : (
              <Text style={styles.joinButtonText}>Join Squad</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('../../assets/lottie/rotateLoad.json')} // Adjust the path to your Lottie file
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    );
  }


  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('../../assets/lottie/rotateLoad.json')} // Adjust the path to your Lottie file
          autoPlay
          loop
          style={styles.lottie}
        />
        <TouchableOpacity style={styles.fetchAgain} onPress={handleTryAgain}>
          <Text style={styles.errorText}>{`${error} Try Again`}</Text>
        </TouchableOpacity>
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
    marginHorizontal: 5,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

  },
  listContainer: {
    paddingBottom: 10,
  },
 
  squadCard: {
    backgroundColor: '#ffff',
    borderRadius: 15,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  coverImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
 
  description: {
    color: '#666666',
    marginBottom: 5,
  },
  searchInput: {
    borderRadius: 14,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    height: 35,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowColor: '#000',
    marginBottom: 5,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    top: -25,
    left: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  squadDetails: {
    padding: 10,
    paddingTop: 30,
  },
  squadName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  status: {
    fontSize: 10,
    marginTop: -4,
  },
  moderated: {
    color: 'red',
  },
  addPost: {
    color: 'green',
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
  joinButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
 
  joinButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
 
});

export default JoinSquads;
