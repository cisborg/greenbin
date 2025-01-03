import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, View, Platform,StatusBar, Text, TouchableOpacity, ScrollView, Animated, SafeAreaView, Dimensions, Modal } from 'react-native';
import { Color } from '../../GlobalStyles';
import { Ionicons } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSquadData,leaveSquad } from '../../redux/actions/squads'; // Adjust the path as necessary
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const ViewSquadScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const  squadData  = useSelector(state => state.squads.squadData ); // Adjust based on your state structure
  const  loading  = useSelector(state => state.squads.loading ); // Adjust based on your state structure
  const  error  = useSelector(state => state.squads.error ); // Adjust based on your state structure

  const [isModalVisible, setModalVisible] = useState(false);
  const userId = useSelector(state => state.auth.id); //


  // Animation for blinking description
  const [fadeAnim] = useState(new Animated.Value(1)); // Initial opacity of 1

  useEffect(() => {
    const squadId = squadData.id; // Replace with the actual squad ID
    dispatch(fetchSquadData(squadId));
  }, [dispatch]);

  useEffect(() => {
    const blink = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]).start();
    };

    const interval = setInterval(() => {
      blink();
    }, 1000); // Blink every second

    const timeout = setTimeout(() => {
      clearInterval(interval);
      fadeAnim.setValue(1); // Reset opacity to 1 after blinking
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [fadeAnim]);

  const handleLeaveSquad = () => {
    const squadId = squadData.id; // Assuming squadData contains the ID
    dispatch(leaveSquad(squadId, userId));
    setModalVisible(false); // Close the modal after dispatching
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
          source={require('../../assets/lottie/errorLottie.json')} // Adjust the path to your Lottie file
          autoPlay
          loop
          style={styles.lottie}
        />
        <TouchableOpacity style={styles.fetchAgain} onPress={fetchSquadData}>
          <Text style={styles.errorText}>{`${error} Try Again`}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Header Section */}
        <View style={styles.header}>
          <FastImage
            source={{ uri: 'https://example.com/cover.jpg' }} // Add cover image URL here
            style={styles.coverImage}
            resizeMode={FastImage.resizeMode.cover}
            accessibilityLabel={`${squadData.name} cover image`}
          />

          {/* Small Avatar for the squad */}
          <FastImage
            source={{ uri: squadData.moderator.avatar }} 
            style={styles.squadAvatar} 
            resizeMode={FastImage.resizeMode.cover}
            accessibilityLabel={`${squadData.moderator.name}'s avatar`}
          />
          <Text style={styles.headerTitle}>{squadData.name}</Text>
          <Text style={styles.headerHandle}>{squadData.handle} • Created {squadData.createdDate}</Text>
          <TouchableOpacity style={styles.feature}>
            <FontAwesome name="user-circle-o" size={24} color="orange" />
            <Text style={styles.featuredSquad}>Featured Activities</Text>
          </TouchableOpacity>   
          
          {/* Posts, Comments, Upvotes Section */}
          <View style={styles.statsContainer}>
            <Text style={styles.statText}>
              {squadData.posts >= 1000 ? `${(squadData.posts / 1000).toFixed(1)}k` : squadData.posts} Posts
            </Text>
            <Text style={styles.statText}>
              {squadData.comments >= 1000 ? `${(squadData.comments / 1000).toFixed(1)}k` : squadData.comments} Comments
            </Text>
            <Text style={styles.statText}>
              {squadData.upvotes >= 1000 ? `${(squadData.upvotes / 1000).toFixed(1)}k` : squadData.upvotes} Upvotes
            </Text>
          </View>

          {/* Blinking Description */}
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.description}>
              {squadData.description}
            </Text>
          </Animated.View>
        </View>

        {/* Moderated By Section */}
        <Text style={styles.moderatedByText}>Created By</Text>
        <View style={styles.moderatedByContainer}>
          <View style={styles.moderatorInfo}>
            <FastImage
              source={{ uri: squadData.moderator.avatar }} 
              style={styles.moderatorAvatar} 
              resizeMode={FastImage.resizeMode.cover}
              accessibilityLabel={`${squadData.moderator.name}'s avatar`}
            />
            <View style={styles.moderatorDetails}>
              <Text style={styles.moderatorName}>{squadData.moderator.name}</Text>
              <Text style={styles.moderatorRole}>
                {squadData.moderator.role} <Ionicons name="star" size={12} color="green" />
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.addAdminButton}>
            <Text style={styles.addAdminText}>+1</Text>
          </TouchableOpacity>
        </View>

        {/* Members Section */}
        <View style={styles.membersContainer}>
          <View style={styles.membersList}>
            {squadData.members.map((member, index) => (
              <FastImage key={index} source={{ uri: member.avatar }}
              resizeMode={FastImage.resizeMode.cover}
              style={styles.memberAvatar} accessibilityLabel={`${member.name}'s avatar`} />
            ))}
            <Text style={styles.totalMembers}>
              {squadData.members.length >= 1000 ? `${(squadData.members.length / 1000).toFixed(1)}k` : squadData.members.length}
            </Text>
          </View>
          <TouchableOpacity style={styles.notification}>
            <FontAwesome6 name="user-check" size={23} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.notification}>
            <Ionicons name="notifications" size={25} color="green" />
          </TouchableOpacity>
          <View style={styles.actionsContainer}>
            {/* Ellipsis button with modal */}
            <TouchableOpacity 
              style={styles.notification} 
              accessibilityLabel="More options"
              onPress={() => setModalVisible(true)} // Open modal
            >
              <Ionicons name="ellipsis-vertical" size={25} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Invitation Link Section */}
        <TouchableOpacity style={styles.invitationContainer} onPress={() => navigation.navigate('PostFeed')}>
          <Ionicons name="person-add" size={20} color="white" style={styles.invitationIcon} />
          <Text style={styles.invitationText}>Recent Posts Feeds</Text>
        </TouchableOpacity>

        {/* Post Restrictions Section */}
        <View style={styles.postRestrictionsContainer}>
          <Fontisto name="locked" size={24} color="green" />
          <Text style={styles.postRestrictionsText}>Only Admins and moderators can post</Text>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Do you want to leave the squad?</Text>
            <TouchableOpacity 
              style={styles.leaveButton} 
              onPress={handleLeaveSquad}
            >
              <Text style={styles.leaveButtonText}>Leave Squad</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight : 0,
  },
  scrollView: {
    paddingHorizontal: width * 0.05, // 5% padding on both sides
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  squadAvatar: {
    width: 40, // Reduced size for smaller avatar
    height: 40,
    borderRadius: 40,
    borderColor: 'green',
    borderWidth: 1,

  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Adjust as needed
  },
  lottie: {
    width: width * 0.3, // Adjust size as needed
    height: height * 0.3,
  },
  coverImage: {
    width: '100%',
    height: 100,
    borderColor: 'green',
    borderWidth: 1,
  },
  feature: {
    backgroundColor: 'green',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingTop: 4,
    flexDirection: 'row',
    marginBottom: 13,
  },
 
  featuredSquad: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
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
  moderatedByText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
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
    marginBottom: 9,
  },
  description: {
    color: '#555555',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  moderatedByContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
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
    borderRadius: 9,
    marginRight: 11,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  lottie: {
    width: width * 0.3, // Adjust size as needed
    height: height * 0.3,
  },
  moderatorDetails: {
    flexDirection: 'column',
  },
  moderatorName: {
    fontWeight: 'bold',
    color: '#333333',
  },
  moderatorRole: {
    color: 'red',
    fontSize: 12,
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
  addAdminText: {
    color: 'black',
    fontSize: 14,
  },
  membersContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginHorizontal: 30,
    justifyContent: 'center',

  },
  notification: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 8,
    borderRadius: 13,
    margin: 20
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
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 12,
    padding: 8,
    margin: 20,
    width: width < 400 ? '37%': '40%'

  },
  memberAvatar: {
    width: 30,
    height: 30,
    borderRadius: 19,
    marginRight: -17,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 50,
  },
 
  invitationContainer: {
    backgroundColor: 'green',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    left: '8%',
    width: width < 400 ? '60%': '65%'
  },
  invitationIcon: {
    marginRight: 15,
  },
  invitationText: {
    color: 'white',
    fontSize: 16,
  },
  postRestrictionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    left: '2%',
    borderRadius: 14,
    padding: 15,
    borderColor: 'lightgray',
    borderWidth: 1,
    width: '98%',
  },
  postRestrictionsText: {
    marginLeft: 10,
    color: '#555',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 14,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  leaveButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  leaveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'gray',
  },
  cancelButtonText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default ViewSquadScreen;
