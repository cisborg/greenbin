import React, { useState, useEffect , useRef} from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, View, Text, TouchableOpacity, Platform,ImageBackground,StatusBar, ScrollView, Animated, SafeAreaView, Dimensions, ActivityIndicator, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import { fetchSquadData, deleteSquad } from '../../redux/actions/squads'; // Adjust the path as necessary
import SquadMembers from './SquadMembers';
import BottomSheet from '@gorhom/bottom-sheet';

const { width, height } = Dimensions.get('window');

const SquadCreated = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const bottomSheetRef = useRef(null);
  const  squadData = useSelector(state => state.squads.squads); // Adjust based on your state structure
  const  squadLoading = useSelector(state => state.squads.squadLoding); // Adjust based on your state structure
  const  error  = useSelector(state => state.squads.error); // Adjust based on your state structure
  const [loading, setLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [ecoGreenActivities, setEcoGreenActivities] = useState([]);
  const [connects, setConnects] = useState(0); // Initial connects

  useEffect(() => {
    dispatch(fetchSquadData());
  }, [dispatch]);

  useEffect(() => {
    const blink = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]).start();
    };

    const interval = setInterval(blink, 1000);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      fadeAnim.setValue(1);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [fadeAnim]);

  const handleAddPost = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('PostSquad');
    }, 2000);
  };

  const handleTryAgain = () => {
    dispatch(fetchSquadData());
  };
  
  const handleAddModerator = () => {
    bottomSheetRef.current?.expand(); // Open the Bottom Sheet
  };

  const handleFeaturedClick = () => {
    setEcoGreenActivities(['Plant Trees', 'Clean Beach', 'Recycle Waste']);
    setModalVisible(true);
  };

  const handleDeleteSquad = () => {
    // Assuming  the squad ID available in your component
    const squadId = squadData.id; 

    dispatch(deleteSquad(squadId));
    setDeleteModalVisible(false);
};

  const handleApproveMember = () => {
    setConnects(connects + 1);
    navigation.navigate('Approved');
  };

  if (squadLoading) {
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
      <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.coverContainer}>
          <ImageBackground
            source={{ uri: 'https://example.com/cover.jpg' }}
            resizeMode="cover"
            style={styles.coverImage}
          >
            <FastImage
            source={{ uri: squadData.moderator.avatar }}
            style={styles.squadAvatar}
            resizeMode={FastImage.resizeMode.cover}
            accessibilityLabel={`${squadData.moderator.name}'s avatar`}
          />
            <View style={styles.header}>
              <Text style={styles.headerTitle}>{squadData.name}</Text>
              <Text style={styles.headerHandle}>{squadData.handle} • Created {squadData.createdDate}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.feature} onPress={handleFeaturedClick}>
                  <Text style={styles.featuredSquad}>Featured EcoGreen</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('EventForm')}>
                  <Ionicons name="add-circle-outline" size={37} color="orange" style={styles.addIcon} accessibilityLabel="Add activity" />
                </TouchableOpacity>
              </View>

              {/* Posts, Comments, Upvotes Section */}
              <View style={styles.statsContainer}>
                <Text style={styles.statText}>
                  {squadData.posts >= 1000 ? `${(squadData.posts / 1000).toFixed(1)}k` : squadData.posts} Posts
                </Text>
                <Text style={styles.statText}>
                  {squadData.comments >= 1000 ? `${(squadData.comments / 1000).toFixed(1)}k` : squadData.comments} Comments
                </Text>
                <Text style={styles.statText}>
                  {squadData.upvotes >= 1000 ? `${(squadData.upvotes / 1000).toFixed(1)}k` : squadData.upvotes} Likes
                </Text>
              </View>
            </View>
          </ImageBackground>

          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.description}>{squadData.description}</Text>
          </Animated.View>
        </View>

        <Text style={styles.moderatedByText}>Created By</Text>
        <View style={styles.moderatedByContainer}>
          <View style={styles.moderatorInfo}>
            <FastImage 
              source={{ uri: squadData.moderator.avatar }} 
              style={styles.moderatorAvatar} 
              resizeMode={FastImage.resizeMode.contain}
              accessibilityLabel={`${squadData.moderator.name}'s avatar`}
            />
            <View style={styles.moderatorDetails}>
              <Text style={styles.moderatorName}>{squadData.moderator.name}</Text>
              <Text style={styles.moderatorRole}>
                {squadData.moderator.role} <Ionicons name="star" size={12} color="#FFD700" />
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.addAdminButton} onPress={handleAddModerator} accessibilityLabel="Add moderator">
            <Ionicons name="person-add" size={24} color="green" />
          </TouchableOpacity>
        </View>

        {/* Members Container with Cascaded Images */}
        <View style={styles.membersContainer}>
          <View style={styles.membersList} onPress={handleAddModerator}>
            {squadData.members.map((member, index) => (
              <FastImage key={index} source={{ uri: squadData?.moderator?.avatar }}
              resizeMode={FastImage.resizeMode.cover}
               style={styles.memberAvatar} accessibilityLabel={`${squadData?.moderator?.name}'s avatar`} />
            ))}
            <Text style={styles.totalMembers}>
              {connects >= 1000 ? `${(connects / 1000).toFixed(1)}k` : connects}
            </Text>
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.icons} onPress={handleApproveMember} accessibilityLabel="Member check">
              <FontAwesome5 name="user-check" size={24} color="green" />
              <View style={styles.notificationBubble}>
                <Text style={styles.notificationCount}>{squadData.notifications}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icons} accessibilityLabel="Notifications">
              <Ionicons name="notifications-outline" size={25} color="#333" />
              <View style={styles.notificationBubble}>
                <Text style={styles.notificationCount}>{squadData.notifications}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDeleteModalVisible(true)} style={styles.icons}>
              <Ionicons name="ellipsis-vertical" size={25} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.invitationButton} onPress={() => navigation.navigate('PostFeed')}>
          <Ionicons name="person-add" size={20} color="white" style={styles.invitationIcon} />
          <Text style={styles.invitationText}>View Recent Posts</Text>
        </TouchableOpacity>
        
        <View style={styles.postRestrictionsContainer}>
          <Fontisto name="unlocked" size={24} color="green" />
          <Text style={styles.postRestrictionsText}>Admins, moderators, and debated members can post</Text>
        </View>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginBottom: 10, top: '-10%' }}>
          <TouchableOpacity style={styles.post} onPress={handleAddPost} accessibilityLabel="Add a post">
            {loading ? (
              <ActivityIndicator size="small" color="green" />
            ) : (
              <Text style={styles.addPost}>Add Post</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.back} 
            onPress={() => navigation.navigate('GreenDaily')}
            accessibilityLabel="squad Home"
          >
            <MaterialCommunityIcons name="home-circle" size={24} color="orange" />
          </TouchableOpacity>
        </View>

        {/* Featured Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}> Register FVC Activities</Text>
            {ecoGreenActivities.map((activity, index) => (
              <Text key={index} style={styles.activityText}>{activity}</Text>
            ))}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Delete Squad Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={deleteModalVisible}
          onRequestClose={() => setDeleteModalVisible(false)}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Delete this squad?</Text>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleDeleteSquad}>
              <Text style={styles.submitButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDeleteModalVisible(false)}>
              <Text style={styles.closeModalText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
       
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // Start closed
        snapPoints={['25%', '50%']} // Define snap points
        onChange={() => {}}
      >
        <SquadMembers setConnects={setConnects} closeBottomSheet={() => bottomSheetRef.current?.close()} />
      </BottomSheet>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    paddingHorizontal: width * 0.023,
    padding: width * 0.04,
  },
  coverContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 10,
    height: height * 0.1,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 20,
    width: '90%',
    marginLeft: '7%'
    
  },
  coverImage: {
    width: '100%',
    height: height * 0.025,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  squadAvatar: {
    width: '40%',
    height: height * 0.1,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginTop: height * 0.1,
  },
  fetchAgain: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 5,
    marginBottom: 20,
    width: width * 0.2,
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  post: {
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    bottom: '-13%',
    borderWidth: 1,
    borderColor: 'green',
    width: width * 0.7,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Adjust as needed
  },
  lottie: {
    width: width * 0.2, // Adjust size as needed
    height: height * 0.2,
  },
 
  addPost: {
    color: 'green',
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: '700',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 5,
    marginLeft: 20,
  },
 
  invitationButton: {
    backgroundColor: 'green',
    borderRadius: 17,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    left: '12%',
    width: width < 400 ? '50%': '52%'
  },
  invitationIcon: {
    marginRight: 10,
  },
  invitationText: {
    color: 'white',
    fontSize: 15,
  },
  feature: {
    borderColor: 'lightgray',
    backgroundColor: 'green',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 4,
    alignItems: 'center',
    marginBottom: 13,
    marginRight: 15,
  },
  addIcon: {
    marginLeft: 10,
  },
  back: {
    marginRight: 10,
    marginLeft: 10,
    top: 47,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 10,
    elevation: 3,
    shadowColor: 'gray',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  featuredSquad: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginLeft: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginBottom: 15,
  },
  statText: {
    fontSize: 14,
    color: '#555555',
    marginRight: 22,
  },
  postRestrictionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    width: '100%',
  },
  postRestrictionsText: {
    marginLeft: 10,
    color: '#555',
  },
  moderatedByText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  icons: {
    borderWidth: 1,
    marginRight: 20,
    padding: 10,
    borderRadius: 14,
    borderColor: 'lightgray',
    height: 50,
    position: 'relative',
  },
  notificationBubble: {
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 2,
    width: 22,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 5,
    marginTop: 10,
  },
  headerHandle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  description: {
    color: '#555555',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 14,
  },
  moderatedByContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  moderatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingRight: 12,
    paddingLeft: 4,
    paddingVertical: 8,
    borderColor: 'lightgray',
    borderRadius: 12,
  },
  moderatorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  moderatorDetails: {
    flexDirection: 'column',
  },
  addAdminButton: {
    borderRadius: 9,
    padding: 10,
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginLeft: 30,
  },
  moderatorName: {
    fontWeight: 'bold',
    color: '#333333',
  },
  moderatorRole: {
    color: '#777777',
  },
  membersContainer: {
    marginHorizontal: 20,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  totalMembers: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20,
    color: 'orange',
  },
  membersList: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 12,
    padding: 8,
    width: width < 400 ? '34%': '35%'

  },
  memberAvatar: {
    width: 30,
    height: 30,
    borderRadius: 9,
    marginRight: -11,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green'
  },
  activityText: {
    marginVertical: 3,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: 'green',
    borderRadius: 16,
    margin: 12
  },
  submitButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10,
  },
});

export default SquadCreated