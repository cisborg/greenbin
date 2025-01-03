import React, { useState, memo, useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity,Platform, StatusBar, ActivityIndicator, SafeAreaView ,Alert} from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, likePost, bookmarkPost } from '../../redux/actions/Posts'; 
import FastImage from 'react-native-fast-image'; // Import FastImage

const Tab = createMaterialTopTabNavigator();

const GoodHome = () => {
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
  const dispatch = useDispatch();
  const  posts = useSelector(state => state.posts.posts); // Get posts and loading state from Redux
  const  loading = useSelector(state => state.posts.loading); // Get posts and loading state from Redux
  const  page  = useSelector(state => state.posts.posts); // Get posts and loading state from Redux


  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      await dispatch(getAllPosts()); // Fetch initial posts
    };
    
    fetchPosts();
  }, [dispatch]);

  const fetchMorePosts = useCallback(() => {
    if (loadingMore || allLoaded || loading) return;
  
    setLoadingMore(true);
    dispatch(getAllPosts(page))
      .then((newPosts) => {
        if (newPosts?.length === 0) {
          setAllLoaded(true); // Mark all posts loaded if no new data
        }
      })
      .catch((error) => {
        Alert.alert('Failed to fetch more posts:', error);
      })
      .finally(() => setLoadingMore(false));
  }, [loadingMore, allLoaded, loading, dispatch, page]);
  
 
  const handleCommentAdd = async (commentData) => {
    dispatch(postComment(currentPostId, commentData));
};


  const openCommentSheet = (postId) => {
    setCurrentPostId(postId);
    setBottomSheetVisible(true);
  };

  const renderPost = useCallback(
    ({ item }) => (
      <Post
        postId={item.id}
        onLike={() => dispatch(likePost(item.id))}
        onCommentPress={() => openCommentSheet(item.id)}
        onBookmarkPress={() => dispatch(bookmarkPost(item.id))} // Ensure bookmark handler is passed
      />
    ),
    [dispatch, openCommentSheet]
  );
  
  return (
    <View style={styles.content}>
       {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : posts.length === 0 ? (
        <LottieView
          source={require('../../assets/lottie/burst.json')} // Adjust the path to your Lottie file
          autoPlay
          loop
          style={{ width: 100, height: 100 }} // Adjust size as needed
        />

      ) : (
        <FlashList
          data={posts}
          keyExtractor={(item) => (item?.id ? item.id.toString() : Math.random().toString())}
          estimatedItemSize={250}
          renderItem={renderPost}
          onEndReached={fetchMorePosts}
          onEndReachedThreshold={0.7}
          ListFooterComponent={loadingMore ? <ActivityIndicator size="large" color="green" /> : null}
        />
      )}

      {isBottomSheetVisible && (
        <CommentBottomSheet
          isVisible={isBottomSheetVisible}
          onClose={() => setBottomSheetVisible(false)}
          onCommentAdd={handleCommentAdd}
        />
      )}



    </View>
  );
};

const Post = memo(({ postId, onLike, onCommentPress,onBookmarkPress }) => {
  const post = useSelector(state => state.posts.posts.find(p => p.id === postId));
  if (!post) return null;
  const {
    title = "Pioneering Waste Collection",
    author = "Zedekiah",
    squad = "Nature Diversity",
    date,
    likes = 0,
    comments = 0,
    imageUri,
    isLiked = false,
    isBookmarked = false,
    moderated = false,
    connections = 0,
  } = post;

  return (
    <View style={styles.postCard}>
      <View style={styles.header}>
        <FastImage
          source={require('../../assets/anotherWoman.avif')}
          style={styles.profilePic}
        />
        <View style={styles.authorInfo}>
          <Text style={styles.postAuthor}>
            {author} 
          </Text>
          <TouchableOpacity>
            <Text style={styles.squadName}>• {squad}</Text>
          </TouchableOpacity>

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
        <TouchableOpacity style={styles.statButton} onPress={onLike} accessibilityLabel='Like Post'>
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
        <TouchableOpacity style={styles.statButton} onPress={onBookmarkPress}>
          <Ionicons
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={17}
            color={isBookmarked ? "green" : "black"}
          />
          <Text style={styles.statText}>
          {connections >= 1000 ? `${(connections / 1000).toFixed(1)}k` : connections}
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
        <Text style={styles.blackText}>Your Daily Hubspot Platform</Text>
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
 
 
});

export default GoodHome;
