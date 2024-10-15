import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { StyleSheet, View,Alert, Text, Image, TouchableOpacity, ScrollView, Animated, SafeAreaView, Dimensions, Modal, StatusBar,Platform } from 'react-native';
import { Color } from '../../GlobalStyles';
import { Ionicons } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const { width, height } = Dimensions.get('window');

const ViewSquadScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { squadName } = route.params;

  // State for the modal
  const [isModalVisible, setModalVisible] = useState(false);

  // Mock data for the squad
  const squadData = {
    name: squadName,
    handle: "@pollutiondaily",
    createdDate: 'Oct 2024',
    posts: 309,
    comments: 402,
    upvotes: 560,
    description: 'We initiate pilot monitoring, manage and controlling pollution effluents!',
    moderator: {
      name: 'Vicky Mickey',
      role: 'Admin',
      avatar: 'https://example.com/avatar.jpg'
    },
    members: [
      { name: 'Alice', avatar: 'https://example.com/alice.jpg' },
      { name: 'Bob', avatar: 'https://example.com/bob.jpg' },
      { name: 'Charlie', avatar: 'https://example.com/charlie.jpg' },
    ],
  };

  // Animation for blinking description
  const [fadeAnim] = useState(new Animated.Value(1)); // Initial opacity of 1

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
      clearTimeout(timeout);
      fadeAnim.setValue(1); // Reset opacity to 1 after blinking
    }, 4000);
  
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [fadeAnim]);

  const handleLeaveSquad = () => {
    // Logic to leave the squad
    Alert.alert('You have left the squad.');
    setModalVisible(false); // Close the modal
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Header Section */}
        <View style={styles.header}>
         
          <Image 
            source={{ uri: 'https://example.com/cover.jpg' }} // Add cover image URL here
            style={styles.coverImage}
            accessibilityLabel={`${squadData.name} cover image`}
          />

          {/* Small Avatar for the squad */}
          <Image 
            source={{ uri: squadData.moderator.avatar }} 
            style={styles.squadAvatar} 
            accessibilityLabel={`${squadData.moderator.name}'s avatar`}
          />
          <Text style={styles.headerTitle}>{squadData.name}</Text>
          <Text style={styles.headerHandle}>{squadData.handle} • Created {squadData.createdDate}</Text>
          <TouchableOpacity style={styles.feature}>
            <FontAwesome name="user-circle-o" size={24} color="orange" />
            <Text style={styles.featuredSquad}>Featured Activities</Text>
          </TouchableOpacity>   
          
          {/* Posts, Comments, Upvotes Section */}
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
            <Image 
              source={{ uri: squadData.moderator.avatar }} 
              style={styles.moderatorAvatar} 
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
              <Image key={index} source={{ uri: member.avatar }} style={styles.memberAvatar} accessibilityLabel={`${member.name}'s avatar`} />
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
        <View style={styles.invitationContainer}>
          <TouchableOpacity  accessibilityLabel="Invitation link" style={styles.invitationIcon}>
            <Ionicons name="person-add" size={20} color="white"  />
          </TouchableOpacity>
          <Text style={styles.invitationText}>Invitation link</Text>

        </View>

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
            <Text style={styles.modalText}>Do you want to leave the squad ?</Text>
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
    marginHorizontal: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
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
    justifyContent: 'space-between',
    marginBottom: 20,
    left: '15%',
    width: width < 400 ? '40%': '45%'
  },
  invitationIcon: {
    marginRight: 10,
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
