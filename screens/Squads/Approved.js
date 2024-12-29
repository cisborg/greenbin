import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity,Platform,StatusBar, Animated, SafeAreaView, ActivityIndicator, Dimensions, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/actions/admin';
import { approveJoinRequest } from '../../redux/actions/squads';
import LottieView from 'lottie-react-native'; // Import Lottie

const { width } = Dimensions.get('window');

const Approved = ({ navigation }) => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => ({ 
    users: state.auth.users, loading: state.auth.loading, error: state.auth.error})); // Adjust the state structure as needed

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleTryAgain = () => {
    dispatch(fetchUsers());
  };
  const [loadingStates, setLoadingStates] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleUnfollow = (userId) => {
    setLoadingStates((prev) => ({ ...prev, [userId]: true }));

    dispatch(approveJoinRequest(userId))
    .then(() => {
      // Update the local state to remove the approved user
      setLoadingStates((prev) => ({ ...prev, [userId]: false }));
    })
    .catch((error) => {
      // Handle the error
      setLoadingStates((prev) => ({ ...prev, [userId]: false }));
    });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.profession.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Text style={styles.errorText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
          <Text style={styles.emptyMessage}>Approval Complete!</Text>
        ) : (
          filteredUsers.map((user) => (
            <Animated.View key={user.id} style={styles.card}>
              <TouchableOpacity style={styles.userInfo}>
                <FastImage source={{ uri: user.profilePic }} style={styles.profilePic} resizeMode={FastImage.resizeMode.cover} />
                <View style={styles.details}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userProfession}>{user.profession}</Text>
                  <Text style={styles.userDescription}>{user.description}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleUnfollow(user.id)}
                style={[styles.unfollowButton, loadingStates[user.id] ? styles.loadingButton : null]}
              >
                {loadingStates[user.id] ? (
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
