import React, { useState, memo, useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/core';
import TagList from '../Squads/Tags';
import YourSquads from '../Squads/Squads';
import NotificationsScreen from '../Squads/Updates';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import TagSelection from '../Squads/selectTag';
import { FlashList } from '@shopify/flash-list';
import CommentBottomSheet from '../Squads/SquadComments';
import FastImage from 'react-native-fast-image'; // Import FastImage

const Tab = createMaterialTopTabNavigator();

const GoodHome = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Header />
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
  const [loadingMore, setLoadingMore] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching posts
    setTimeout(() => {
      setPosts(initialPosts); // Replace with your actual fetching logic
      setLoading(false);
    }, 2000); // Adjust the timeout as necessary
  }, []);

  const fetchMorePosts = useCallback(() => {
    if (loadingMore || allLoaded) return;

    setLoadingMore(true);
    
    // Simulate API request to fetch more posts
    setTimeout(() => {
      const newPosts = [
        // Additional post data here
      ];

      if (newPosts.length === 0) {
        setAllLoaded(true);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      }
      setLoadingMore(false);
    }, 1500);
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
  };

  const openCommentSheet = (postId) => {
    setCurrentPostId(postId);
    setBottomSheetVisible(true);
  };

  return (
    <View style={styles.content}>
      {loading ? (
        <LottieView
          source={require('../../assets/lottie/rotateLoad.json')} // Adjust the path to your Lottie file
          autoPlay
          loop
          style={{ width: 100, height: 100 }} // Adjust size as needed
        />
      ) : (
        <FlashList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={200}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => { /* Navigate to post details */ }}>
              <Post 
                post={item}
                onLike={() => handleLike(item.id)} 
                onCommentPress={() => openCommentSheet(item.id)}
              />
            </TouchableOpacity>
          )}
          onEndReached={fetchMorePosts}
          onEndReachedThreshold={0.7}
          ListFooterComponent={loadingMore ? <ActivityIndicator size="large" color="green" /> : null}
        />
      )}

      <CommentBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        onCommentAdd={handleCommentAdd}
      />
    </View>
  );
};

const Post = memo(({ post, onLike, onCommentPress }) => {
  const { title, author, squad, date, likes, comments, moderated, connections: initialConnections, imageUri: initialImageUri, isLiked } = post;
  const [connections, setConnections] = useState(initialConnections); // State for connections
  const [imageUri, setImageUri] = useState(initialImageUri); // Declare state for imageUri
  const [isBookmarked, setIsBookmarked] = useState(false); // State for bookmark

  const handleLike = () => {
    onLike();
  };

  const handleBookmark = () => {
    setIsBookmarked((prev) => {
      const newBookmarkStatus = !prev;
      setConnections((current) => current + (newBookmarkStatus ? 1 : -1));
      return newBookmarkStatus;
    });
  };

  return (
    <View style={styles.postCard}>
      <View style={styles.header}>
        <FastImage
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
      </View>

      <Text style={styles.postTitle}>{title}</Text>
      {imageUri && (
        <FastImage
          source={{ uri: imageUri }}
          style={styles.postImage}
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
          <Ionicons name="chatbubble-outline" size={17} color="green" />
          <Text style={styles.statText}>
            {comments >= 1000 ? `${(comments / 1000).toFixed(1)}k` : comments} comments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statButton} onPress={handleBookmark}>
          <Ionicons
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={17}
            color={isBookmarked ? "green" : "black"}
          />
          <Text style={styles.statText}>
            {connections >= 1000 
              ? Math.floor(connections / 1000) + 'k' 
              : connections}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View style={{ flexDirection: 'column'}}> 
        <Text style={styles.greenTxt}>Green Squads Daily</Text>
        <Text style={styles.blackText}>"Your Daily Hubspot Platform"</Text>
      </View>
      <TouchableOpacity style={{ left: 20 }}>
        <Ionicons name="color-filter-outline" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.profilePic1} onPress={() => navigation.navigate('SquadCreated')}>
        <FastImage source={require('../../assets/anotherWoman.avif')} />
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
    backgroundColor: '#ffff',
    borderRadius: 19,
    padding: 9,
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
  headerContainer: {
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
