import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import { useRoute} from  "@react-navigation/native"
const ViewSquadScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username , job, profile } = route.params;
  const [isMember, setIsMember] = useState(false);
  const squadData = {
    name: username,
    handle: profile,
    createdDate: 'Aug 2024',
    posts: 109,
    views: '12.3K',
    upvotes: '1.5K',
    description: job,
    moderator: {
      name: 'Bobby Iliev',
      role: 'Admin',
      avatar: 'https://example.com/avatar.jpg'
    },
    members: [
      { name: 'Alice', role: 'Member', avatar: 'https://example.com/alice.jpg' },
      { name: 'Bob', role: 'Moderator', avatar: 'https://example.com/bob.jpg' }
    ],
    recentPosts: [
      { title: 'Understanding Green Technology', description: 'A deep dive into green renewable pipelines.', date: '2 days ago' },
      { title: 'Best Practices in E-waste Management', description: 'Learn the best practices in E-waste collections and Dispatch.', date: '1 week ago' }
    ],
    notifications: [
      'New post: Understanding Green Technology',
      'Alice commented on your post',
    ],
  };

  const toggleMembership = () => {
    setIsMember(!isMember);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <TextInput style={styles.searchBar} placeholder="Search..." />

      {/* Header Section */}
      <View style={styles.header}>
        <Image source={{ uri: squadData.moderator.avatar }} style={styles.logo} />
        <Text style={styles.headerTitle}>{squadData.name}</Text>
        <Text style={styles.headerHandle}>{squadData.handle} • Created {squadData.createdDate}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statText}>{squadData.posts} Posts</Text>
          <Text style={styles.statText}>{squadData.views} Views</Text>
          <Text style={styles.statText}>{squadData.upvotes} Upvotes</Text>
        </View>
      </View>

      {/* Join/Leave Button */}
      <TouchableOpacity style={styles.joinButton} onPress={toggleMembership}>
        <Text style={styles.buttonText}>{isMember ? 'Leave Squad' : 'Join Squad'}</Text>
      </TouchableOpacity>

      {/* Notifications Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        {squadData.notifications.map((notification, index) => (
          <Text key={index} style={styles.notification}>{notification}</Text>
        ))}
      </View>

      {/* Description Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{squadData.description}</Text>
      </View>

      {/* Recent Posts Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Recent Posts</Text>
        {squadData.recentPosts.map((post, index) => (
          <View key={index} style={styles.postItem}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postDescription}>{post.description}</Text>
            <Text style={styles.postDate}>{post.date}</Text>
          </View>
        ))}
      </View>

      {/* Members Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Members</Text>
        {squadData.members.map((member, index) => (
          <View key={index} style={styles.memberContainer}>
            <Image source={{ uri: member.avatar }} style={styles.memberAvatar} />
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberRole}>{member.role}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Share Button */}
      <TouchableOpacity style={styles.shareButton} onPress={()=> navigation.goBack()}>
        <Text style={styles.buttonText}>Share Squad</Text>
      </TouchableOpacity>

      {/* Pinned Posts Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Pinned Posts</Text>
        <View style={styles.postItem}>
          <Text style={styles.postTitle}>Important Announcement</Text>
          <Text style={styles.postDescription}>Please read the new guidelines.</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.invitationButton}>
          <Text style={styles.buttonText}>Invitation link</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.buttonText}>Only admins and moderators can post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    width: 404,
  },
  searchBar: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 1
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerHandle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  statText: {
    color: '#333333',
    fontSize: 16,
  },
  sectionContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: '#555555',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  notification: {
    color: '#555555',
    marginBottom: 5,
  },
  postItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 5,
  },
  postTitle: {
    fontWeight: 'bold',
    color: '#333333',
  },
  postDescription: {
    color: '#666666',
  },
  postDate: {
    color: '#999999',
    fontSize: 12,
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  memberInfo: {
    flexDirection: 'column',
  },
  memberName: {
    color: '#333333',
    fontWeight: 'bold',
  },
  memberRole: {
    color: '#777777',
  },
  joinButton: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  shareButton: {
    backgroundColor: '#28A745',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  invitationButton: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 15,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  postButton: {
    backgroundColor: '#6C757D',
    borderRadius: 10,
    padding: 15,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ViewSquadScreen;
