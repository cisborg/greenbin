import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Alert, Animated, SafeAreaView, StatusBar, Platform, Modal, TextInput, RefreshControl } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/core';
import TagList from '../Squads/Tags';
import YourSquads from '../Squads/Squads';
import NotificationsScreen from '../Squads/Updates';
import { Color } from '../../GlobalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import TagSelection from '../Squads/selectTag';

const Tab = createMaterialTopTabNavigator();

const GoodHome = () => {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ ...styles.animatedContainer, opacity: fadeAnim }}>
        <SearchBar />
        <HomeTabs />
      </Animated.View>
    </SafeAreaView>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="For you"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === 'selectTag') {
            return (
              <View style={{ marginTop: 13 }}>
                <MaterialIcons name="add-box" size={22} color={focused ? 'green' : "gray"} />
              </View>
            );
          }
          return null; // No icon for other tabs
        },
        tabBarLabel: ({ focused }) => {
          if (route.name === 'selectTag') {
            return null; // No label for the selectTag tab
          }
          return (
            <Text style={{ color: focused ? "black" : "gray", fontWeight: '550' }}>
              {route.name}
            </Text>
          ); // Default label for other tabs
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 50,
          paddingBottom: 20,
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 1 },
          shadowRadius: 1,
          elevation: 2,
          borderRadius: 8,
          justifyContent: 'center',
        },
        tabBarLabelStyle: {
          fontWeight: '650',
          fontSize: 14,
          textTransform: 'none',
        },
      })}
    >
      <Tab.Screen name="selectTag" component={TagSelection} />
      <Tab.Screen name="For you">
        {() => <ForYouScreen />}
      </Tab.Screen>
      <Tab.Screen name="Tags" component={TagList} />
      <Tab.Screen name="Squads" component={YourSquads} />
      <Tab.Screen name="Updates" component={NotificationsScreen} />
    </Tab.Navigator>
  );
};

const ForYouScreen = () => {
  const [posts, setPosts] = useState([
    {
      title: "Waste Collection Expo Event Report",
      author: "Masaku",
      squad: "Kenya Ecogreen",
      date: "8h ago",
      likes: 450,
      comments: 296,
      moderated: false,
      connections: 1200,
      imageUri: "https://example.com/image1.jpg",
    },
    {
      title: "Green Circular Economy",
      author: "Ashley Young",
      squad: "Eco Warriors",
      date: "Today",
      likes: 656,
      comments: 60,
      moderated: true,
      connections: 999,
      imageUri: "https://example.com/image2.jpg",
    },
    {
      title: "With GreenBins we make waste collection possible",
      author: "George Doyle",
      squad: "Nature Diversity",
      date: "Today",
      likes: 892,
      comments: 300,
      moderated: false,
      connections: 1500,
      imageUri: "https://example.com/image2.jpg",
    },
    {
      title: "Green Circular Economy",
      author: "Ashley Young",
      squad: "Eco Warriors",
      date: "Today",
      likes: 999,
      comments: 60,
      moderated: true,
      connections: 200,
      imageUri: "https://example.com/image2.jpg",
    },
  ]);
  
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [comment, setComment] = useState('');

  const handleLike = (index) => {
    const newPosts = [...posts];
    if (!newPosts[index].isLiked) {
      newPosts[index].likes += 1;
      newPosts[index].isLiked = true;
      Alert.alert(`${newPosts[index].author} liked your post!`);
    }
    setPosts(newPosts);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      // Randomize post order
      const shuffledPosts = [...posts].sort(() => Math.random() - 0.5);
      setPosts(shuffledPosts);
      setRefreshing(false);
    }, 2000);
  };

  const openModal = (post) => {
    setCurrentPost(post);
    setModalVisible(true);
  };

  const submitComment = () => {
    if (comment.trim()) {
      const newPosts = posts.map(post => {
        if (post.title === currentPost.title) {
          return { ...post, comments: post.comments + 1 };
        }
        return post;
      });
      setPosts(newPosts);
      Alert.alert("Comment submitted: " + comment);
      setComment('');
      setModalVisible(false);
    } else {
      Alert.alert("Please enter a comment.");
    }
  };

  return (
    <View style={styles.content}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <Post 
              key={index} 
              {...item} 
              onLike={() => handleLike(index)} 
            />
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {currentPost && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{currentPost.title}</Text>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                value={comment}
                onChangeText={setComment}
              />
              <TouchableOpacity onPress={submitComment} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const Post = ({ title, author, squad, date, likes, comments, moderated, connections, imageUri, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike();
  };

  const handleOptionsPress = () => {
    setOptionsVisible(!optionsVisible);
  };

  return (
    <View style={styles.postCard}>
      <View style={styles.header}>
        <Image style={styles.profilePic} source={require('../../assets/anotherWoman.avif')} />
        <View style={styles.authorInfo}>
          <Text style={styles.postAuthor}>
            {author} <TouchableOpacity>
              <Text style={styles.squadName}>• {squad}</Text>
            </TouchableOpacity>
          </Text>
          <Text style={styles.postDate}>{date}</Text>
          {moderated && <Text style={styles.moderatedIndicator}>Moderated</Text>}
        </View>
        <TouchableOpacity style={styles.optionsButton} onPress={handleOptionsPress}>
          <Ionicons name="ellipsis-vertical" size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {optionsVisible && (
        <View style={styles.optionsMenu}>
          <TouchableOpacity style={styles.optionToggle}>
            <FontAwesome name="frown-o" size={17} color="green" />
            <Text style={{ marginLeft: 6 }}>Not interested in this post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionToggle}>
            <AntDesign name="adduser" size={17} color="green" />
            <Text style={{ marginLeft: 6 }}>Follow @{squad}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionToggle}>
            <MaterialCommunityIcons name="playlist-remove" size={17} color="green" />
            <Text style={{ marginLeft: 6 }}>Add/remove from Lists</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionToggle}>
            <Octicons name="mute" size={17} color="green" />
            <Text style={{ marginLeft: 6 }}>Mute @{squad}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionToggle}>
            <MaterialIcons name="report" size={17} color="green" />
            <Text style={{ marginLeft: 6 }}>Report post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionToggle}>
            <MaterialIcons name="speaker-notes" size={17} color="green" />
            <Text style={{ marginLeft: 6 }}>Request Community Note</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.postTitle}>{title}</Text>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.postImage} />}
      <View style={styles.postStats}>
        <TouchableOpacity style={styles.statButton} onPress={handleLike}>
          <Ionicons name={isLiked ? "heart" : "heart-outline"} size={17} color={isLiked ? Color.colorLimegreen_200 : "black"} />
          <Text style={styles.statText}>
            {likes >= 1000 ? `${(likes / 1000).toFixed(1)}k` : likes} upvotes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statButton}>
          <Ionicons name="chatbubble-outline" size={17} color="black" />
          <Text style={styles.statText}>
            {comments >= 1000 ? `${(comments / 1000).toFixed(1)}k` : comments} comments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statButton}>
          <Ionicons name="stats-chart" size={17} color="black" />
          <Text style={styles.statText}>
            {connections >= 1000 ? `${(connections / 1000).toFixed(1)}k` : connections} views
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statButton}>
          <Ionicons name="share-social-outline" size={17} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SearchBar = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.searchBarContainer}>
        <View style={{ flexDirection: 'column'}}> 
          <Text style={styles.greenTxt}>Green Squads Daily</Text>
          <Text style={styles.blackText}>"Your Daily Hubspot Platform for mind Innovation"</Text>
        </View>
        <TouchableOpacity style={{ left: 20 }}>
          <Ionicons name="color-filter-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SquadCreated')}>
          <Image style={styles.profilePic} source={require('../../assets/anotherWoman.avif')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  animatedContainer: {
    flex: 1,
    padding: 10
  },
  content: {
    flex: 1,
    padding: 10,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 10,
    marginVertical: 5,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorInfo: {
    flex: 1,
    marginLeft: 10,
  },
  postAuthor: {
    fontWeight: 'bold',
  },
  squadName: {
    color: 'gray',
  },
  postDate: {
    color: 'gray',
  },
  moderatedIndicator: {
    color: 'red',
  },
  optionsButton: {
    padding: 5,
  },
  optionsMenu: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    position: 'absolute',
    top: 50,
    right: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 2,
  },
  optionToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  postTitle: {
    fontWeight: '600',
    marginVertical: 5,
  },
  postImage: {
    width: '100%',
    height: 80,
    borderRadius: 14,
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 5,
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greenTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  blackText: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default GoodHome;
