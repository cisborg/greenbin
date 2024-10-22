import React, { useState, memo, useCallback } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity,ActivityIndicator, StatusBar, Platform, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/core';
import TagList from '../Squads/Tags';
import YourSquads from '../Squads/Squads';
import NotificationsScreen from '../Squads/Updates';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import TagSelection from '../Squads/selectTag';
import { FlashList } from '@shopify/flash-list';
import CommentBottomSheet from '../Squads/SquadComments';

const Tab = createMaterialTopTabNavigator();

const GoodHome = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />
      <HomeTabs />
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
              <View style={{ top: 16 }}>
                <MaterialIcons name="add-box" size={22} color={focused ? 'green' : "gray"} />
              </View>
            );
          }
          return null;
        },
        tabBarLabel: ({ focused }) => {
          if (route.name === 'selectTag') {
            return null;
          }
          return (
            <Text style={{ color: focused ? "black" : "gray", fontWeight: '700' }}>
              {route.name}
            </Text>
          );
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 73,
          paddingHorizontal: 5,
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 1 },
          shadowRadius: 1,
          elevation: 2,
          borderRadius: 8,
          justifyContent: 'center',
        },
        tabBarLabelStyle: {
          fontWeight: '800',
          fontSize: 12,
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
      id: 1,
      title: "Waste Collection Expo Event Report",
      author: "Masaku",
      squad: "Kenya Ecogreen",
      date: "8h ago",
      likes: 450,
      comments: 296,
      moderated: false,
      connections: 1200,
      imageUri: "https://example.com/image1.jpg",
      isLiked: false,
    },
    {
      id: 2,
      title: "Green Circular Economy",
      author: "Ashley Young",
      squad: "Eco Warriors",
      date: "Today",
      likes: 656,
      comments: 60,
      moderated: true,
      connections: 999,
      imageUri: "https://example.com/image2.jpg",
      isLiked: false,
    },
    {
      id: 3,
      title: "With GreenBins we make waste collection possible",
      author: "George Doyle",
      squad: "Nature Diversity",
      date: "Today",
      likes: 892,
      comments: 300,
      moderated: false,
      connections: 1500,
      imageUri: "https://example.com/image3.jpg",
      isLiked: false,
    },
    {
      id: 4,
      title: "Green Circular Economy",
      author: "Ashley Young",
      squad: "Eco Warriors",
      date: "Today",
      likes: 999,
      comments: 69,
      moderated: true,
      connections: 200,
      imageUri: "https://example.com/image4.jpg",
      isLiked: false,
    },
  ]);

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false); // Track loading more posts
  const [allLoaded, setAllLoaded] = useState(false); // 

  const fetchMorePosts = useCallback(() => {
    if (loadingMore || allLoaded) return;

    setLoadingMore(true);
    
    // Simulate API request to fetch more posts
    setTimeout(() => {
      const newPosts = [
        // New set of posts, e.g., from API
      ];
      
      if (newPosts.length === 0) {
        setAllLoaded(true); // Stop loading if no more posts
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      }
      setLoadingMore(false);
    }, 1500); // Simulate API latency
  }, [loadingMore, allLoaded]);

  const handleLike = useCallback((postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
          : post
      )
    );
  }, []);

  const handleCommentAdd = (comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === currentPostId ? { ...post, comments: post.comments + 1 } : post
      )
    );
    // You can also store the comment in a comments array if needed
  };

  const openCommentSheet = (postId) => {
    setCurrentPostId(postId);
    setBottomSheetVisible(true);
  };

  return (
    <View style={styles.content}>
      <FlashList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={200} // Add a reasonable estimated item size to optimize performance
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { /* Navigate to post details */ }}>
            <Post 
              post={item}
              onLike={() => handleLike(item.id)} 
              onCommentPress={() => openCommentSheet(item.id)} // Open the bottom sheet for comments
            />
          </TouchableOpacity>
        )}
        onEndReached={fetchMorePosts} // Trigger fetchMorePosts when end is reached
        onEndReachedThreshold={0.5} // Load more when user scrolls to within 50% of the end
        ListFooterComponent={loadingMore ? <ActivityIndicator size="large" color="green" /> : null} // Show loading spinner

      />
      <CommentBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        onCommentAdd={handleCommentAdd}
      />
    </View>
  );
};

const Post = memo(({ post, onLike, onCommentPress }) => {
  const { title, author, squad, date, likes, comments, moderated, connections:initialConnections, imageUri: initialImageUri, isLiked } = post;
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [connections, setConnections] = useState(initialConnections); // State for connections
  const [imageUri, setImageUri] = useState(initialImageUri); // Declare state for imageUri
  const [isBookmarked, setIsBookmarked] = useState(false); // State for bookmark

  const handleLike = () => {
    onLike();
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setConnections((prevConnections) => prevConnections + (isBookmarked ? 0 : 1));  };

  const handleOptionsPress = () => {
    setOptionsVisible(!optionsVisible);
  };

  return (
    <View style={styles.postCard}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/anotherWoman.avif')}
          style={styles.profilePic}
          onError={() => setImageUri(require('../../assets/profilePlaceholder.png'))}
        />
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
            <MaterialIcons name="report" size={17} color="green" />
            <Text style={{ marginLeft: 6 }}>Report post</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.postTitle}>{title}</Text>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.postImage}
          onError={() => setImageUri(require('../../assets/profilePlaceholder.png'))}
        />
      )}
      <View style={styles.postStats}>
        <TouchableOpacity style={styles.statButton} onPress={handleLike}>
          <Ionicons name={isLiked ? "heart" : "heart-outline"} size={17} color={isLiked ? 'green' : "black"} />
          <Text style={styles.statText}>
            {likes >= 1000 ? `${(likes / 1000).toFixed(1)}k` : likes} upvotes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statButton} onPress={onCommentPress}> 
          <Ionicons name="chatbubble-outline" size={17} color="black" />
          <Text style={styles.statText}>
            {comments >= 1000 ? `${(comments / 1000).toFixed(1)}k` : comments} comments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statButton} onPress={handleBookmark}>
          <Ionicons name={isBookmarked ? "bookmark" : "bookmark-outline"} size={17} color={isBookmarked ? "green" : "black"} />
          <Text style={styles.statText}>
            {connections + (isBookmarked ? 1 : 0) >= 1000 
              ? Math.floor((connections + (isBookmarked ? 1 : 0)) / 1000) + 'k' 
              : connections + (isBookmarked ? 1 : 0)}
            
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const SearchBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.searchBarContainer}>
      <View style={{ flexDirection: 'column'}}> 
        <Text style={styles.greenTxt}>Green Squads Daily</Text>
        <Text style={styles.blackText}>"Your Daily Hubspot Platfor"</Text>
      </View>
      <TouchableOpacity style={{ left: 20 }}>
        <Ionicons name="color-filter-outline" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.profilePic1} onPress={() => navigation.navigate('SquadCreated')}>
        <Image source={require('../../assets/anotherWoman.avif')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
 
  content: {
    flex: 1,
    padding: 10,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 10,
    marginVertical: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profilePic1: {
    width: 40,
    height: 40,
    borderRadius: 15,
    left: -10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  authorInfo: {
    flex: 1,
    marginLeft: 10,
  },
  postAuthor: {
    fontWeight: 'bold',
    fontSize: 13

  },
  squadName: {
    color: 'gray',
    top: 5,
    fontSize: 13

  },
  postDate: {
    color: 'gray',
    fontSize: 11

  },
  moderatedIndicator: {
    color: 'red',
    fontSize: 12

  },
  optionsButton: {
    padding: 5,
  },
  optionsMenu: {
    backgroundColor: '#f5f5f5',
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
    fontSize: 14
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
    fontSize: 12

  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '2%'
  },
  greenTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
  },
  blackText: {
    fontSize: 13,
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
