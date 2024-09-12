import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Color } from '../GlobalStyles';
import { Ionicons } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


const ViewSquadScreen = () => {
  const navigation = useNavigation();
  const [isMember, setIsMember] = useState(false);
  
  // Mock data for the squad
  const squadData = {
    name: 'Waste Collection Daily',
    handle: "@wastedaily",
    createdDate: 'Sept 2024',
    posts: 109,
    views: '12.3K',
    upvotes: '1.5K',
    description: 'We collect, disintegrate, and refurbish wastes!',
    moderator: {
      name: 'Bobby Shivley',
      role: 'Admin',
      avatar: 'https://example.com/avatar.jpg'
    },
    members: [
      { name: 'Alice', avatar: 'https://example.com/alice.jpg' },
      { name: 'Bob', avatar: 'https://example.com/bob.jpg' },
      { name: 'Charlie', avatar: 'https://example.com/charlie.jpg' },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
      <TouchableOpacity style={styles.back} onPress={()=> navigation.goBack()}>
        <Text style={{color: 'green', fontWeight: '600'}} > goBack</Text>
        </TouchableOpacity>
        <Image source={{ uri: squadData.moderator.avatar }} style={styles.squadAvatar} />
        <Text style={styles.headerTitle}>{squadData.name}</Text>
        <Text style={styles.headerHandle}>{squadData.handle} • Created {squadData.createdDate}</Text>
        <TouchableOpacity style={styles.feature}>
          <FontAwesome name="user-circle-o" size={24} color="black" />
          <Text style={styles.featuredSquad}>Featured Activities</Text>
        </TouchableOpacity>   
        {/* Posts, Views, Upvotes Section */}
        <View style={styles.statsContainer}>
          <Text style={styles.statText}>{squadData.posts} Posts</Text>
          <Text style={styles.statText}>{squadData.views} Views</Text>
          <Text style={styles.statText}>{squadData.upvotes} Likes</Text>
        </View>
        <Text style={styles.description}>{squadData.description}</Text>

      </View>

      {/* Moderated By Section */}
      <Text style={styles.moderatedByText}>Moderated By</Text>
      <View style={styles.moderatedByContainer}>
        <View style={styles.moderatorInfo}>
          <Image source={{ uri: squadData.moderator.avatar }} style={styles.moderatorAvatar} />
          <View style={styles.moderatorDetails}>
            <Text style={styles.moderatorName}>{squadData.moderator.name}</Text>
            <Text style={styles.moderatorRole}>
              {squadData.moderator.role} <Ionicons name="star" size={12} color="#FFD700" />
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
            <Image key={index} source={{ uri: member.avatar }} style={styles.memberAvatar} />
          ))}
          <Text style={styles.totalMembers}>{squadData.upvotes}</Text>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.icons}>
            <FontAwesome5 name="user-check" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icons}>
            <Ionicons name="notifications-outline" size={25} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icons}>
            <Ionicons name="ellipsis-vertical" size={25} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Invitation Link Section */}
      <View style={styles.invitationContainer}>
        <TouchableOpacity style={styles.invitationButton}>
          <Ionicons name="person-add" size={20} color="white" style={styles.invitationIcon} />
          <Text style={styles.invitationText}>Invitation link</Text>
        </TouchableOpacity>
      </View>

      {/* Post Restrictions Section */}
      <View style={styles.postRestrictionsContainer}>
        <Fontisto name="locked" size={24} color="red" />
        <Text style={styles.postRestrictionsText}>Only admins and moderators can post</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
    width: 410,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  squadAvatar: {
    width: 220,
    height: 180,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginTop: 10

  },
  feature: {
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: Color.colorLimegreen_200,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingTop: 4,
    flexDirection: 'row',
    marginBottom: 13,
  },
  featuredSquad: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    marginLeft: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginBottom: 15
  },
  statText: {
    fontSize: 14,
    color: '#555555',
    marginRight: 22
  },
  moderatedByText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  icons: {
    borderWidth: 1,
    marginRight: 20,
    padding: 10,
    borderRadius: 14,
    borderColor: 'lightgray',
    height: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 5
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
  back: {
    left: 10,
    marginLeft: -320
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
  moderatorName: {
    fontWeight: 'bold',
    color: '#333333',
  },
  moderatorRole: {
    color: '#777777',
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
    fontSize: 14
  },
  membersContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  totalMembers: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20,
    color: 'orange'
  },
  membersList: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 12,
    padding: 8,
  },
  memberAvatar: {
    width: 30,
    height: 30,
    borderRadius: 19,
    marginRight: -12,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 50,
  },
  invitationContainer: {
    marginBottom: 20,
  },
  invitationButton: {
    backgroundColor: Color.colorLimegreen_200,
    borderRadius: 14,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    left: 90,
    width: 150,
  },
  invitationIcon: {
    marginRight: 5,
  },
  invitationText: {
    color: 'white',
    fontWeight: 'bold',
  },
  postRestrictionsContainer: {
    alignItems: 'center',
    marginTop: 20,
    borderColor: '#FFD700',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
  },
  postRestrictionsText: {
    color: '#777777',
    fontSize: 14,
    marginLeft: 15,
  },
});

export default ViewSquadScreen;
