import React, { useRef, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 

  FlatList, 
  RefreshControl, 
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const initialFriendsData = [
  { id: 1, name: 'Onyango Borne', mutualFriends: 10, image: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Jack Osodo', mutualFriends: 3, image: 'https://via.placeholder.com/50' },
  { id: 3, name: "Fhabi Vinie's", mutualFriends: 42, image: 'https://via.placeholder.com/50' },
  { id: 4, name: 'C H Hills Jamumbo', mutualFriends: 8, image: 'https://via.placeholder.com/50' },
  { id: 5, name: 'Primee Tez', mutualFriends: 37, image: 'https://via.placeholder.com/50' },
];

const FriendScreen = () => {
  const [friendsData, setFriendsData] = useState(initialFriendsData);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingStates, setLoadingStates] = useState({ add: {}, remove: {} });
  const hasFetchedMore = useRef(false);

  const loadMoreFriends = () => {
    if (loadingMore || hasFetchedMore.current) return;

    hasFetchedMore.current = true;
    setLoadingMore(true);

    setTimeout(() => {
      const moreFriends = [
        { id: friendsData.length + 1, name: 'New Friend 1', mutualFriends: 5, image: 'https://via.placeholder.com/50' },
        { id: friendsData.length + 2, name: 'New Friend 2', mutualFriends: 12, image: 'https://via.placeholder.com/50' },
      ];
      setFriendsData([...friendsData, ...moreFriends]);
      setLoadingMore(false);
      hasFetchedMore.current = false;
    }, 1500);
  };

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setFriendsData(initialFriendsData);
      setRefreshing(false);
    }, 1500);
  };

  const handleAddFriend = (id) => {
    setLoadingStates((prev) => ({ ...prev, add: { ...prev.add, [id]: true } }));

    setTimeout(() => {
      setFriendsData((prev) => 
        prev.map(friend => 
          friend.id === id ? { ...friend, isFriend: true } : friend
        )
      );
      setLoadingStates((prev) => ({ ...prev, add: { ...prev.add, [id]: false } })); // Update only the add state
    }, 1000);
  };

  const handleRemoveFriend = (id) => {
    setLoadingStates((prev) => ({ ...prev, remove: { ...prev.remove, [id]: true } }));

    setTimeout(() => {
      setFriendsData((prev) => prev.filter(friend => friend.id !== id));
      setLoadingStates((prev) => ({ ...prev, remove: { ...prev.remove, [id]: false } })); // Update only the remove state
    }, 1000);
  };


  const renderFriendItem = ({ item }) => (
    <Animated.View
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      style={styles.friendContainer}
    >
      <FastImage
        source={{ uri: item.image }}
        style={styles.profileImage}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.friendDetails}>
        <Text style={styles.friendName}>{item.name}</Text>
        <Text style={styles.mutualFriends}>{item.mutualFriends} mutual friends</Text>
      </View>
      <View style={styles.actionButtons}>
      <TouchableOpacity 
          style={[styles.addButton, item.isFriend ? styles.friendsButton : styles.defaultButton]} 
          onPress={() => handleAddFriend(item.id)}
          disabled={loadingStates.add[item.id]}
        >
          {loadingStates.add[item.id] ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{item.isFriend ? 'Friends' : 'Add Friend'}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.removeButton} 
          onPress={() => handleRemoveFriend(item.id)}
          disabled={loadingStates.remove[item.id]}
        >
          {loadingStates.remove[item.id] ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Remove</Text>
          )}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={friendsData}
        renderItem={renderFriendItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
        }
        onEndReached={loadMoreFriends}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 5,
  },
  friendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 1,
    marginHorizontal:3

  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  friendDetails: {
    flex: 1,
    marginHorizontal: 5,
  },
  friendName: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
  mutualFriends: {
    color: '#ccc',
    fontSize: 11,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  addButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 8,
  },
  removeButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default FriendScreen;
