import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator,TextInput, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet from '@gorhom/bottom-sheet';
import { fetchUsers,addModerator, deleteUser } from '../../redux/actions/squads'; // Adjust the path as necessary
import { Swipeable } from 'react-native-gesture-handler';

const SquadMembers = ({ setConnects }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [loadingId, setLoadingId] = useState(null);
  const [ searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddPress = (user) => {
    setLoadingId(user.id);
    setTimeout(() => {
      dispatch(addModerator(user));
      setLoadingId(null);
    }, 2000); // Simulate loading for 2 seconds
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId)); // Dispatch deleteUser action
    setConnects(prev => prev - 1); // Decrement connects
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderUserItem = ({ item }) => {
    const isLoading = loadingId === item.id;

    return (
      <Swipeable
        renderRightActions={() => (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteUser(item.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        )}
      >
        <View style={styles.userContainer}>
          <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userDescription}>{item.description}</Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddPress(item)}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.addButtonText}>Add</Text>
            )}
          </TouchableOpacity>
        </View>
      </Swipeable>
    );
  };

  return (
    <BottomSheet index={0} snapPoints={['50%']}>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users by name..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        </View>

      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  userName: {
    fontWeight: 'bold',
  },
  userDescription: {
    color: 'gray',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default SquadMembers;
