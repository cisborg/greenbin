import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Animated, StatusBar, Platform } from 'react-native';
import LottieView from 'lottie-react-native'; // Import Lottie
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../redux/actions/Posts'; // Adjust the import path as necessary

const PostFeed = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Get posts from Redux state
  const { posts, loading, error } = useSelector((state) => state.postReducer);

  useEffect(() => {
    // Fetch posts when the component mounts
    dispatch(getAllPosts());

    // Simulate loading animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [dispatch]);

  useEffect(() => {
    // Filter posts based on search term
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.author}>
        {item.author} • {item.squad}
      </Text>
      <Text style={styles.time}>{item.time}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.stats}>
        <Text style={styles.upvotes}>{item.upvotes} upvotes</Text>
        <Text style={styles.comments}>{item.comments} comments</Text>
        <Text style={styles.saved}>{item.saved} saved</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <Animated.View style={[styles.loadingContainer, { opacity: fadeAnim }]}>
        <LottieView
          source={require('../../assets/lottie/rotateLoad.json')} // Update with the correct path to your Lottie file
          autoPlay
          loop
          style={styles.lottie}
        />
        <Text style={styles.loadingText}>Loading...</Text>
      </Animated.View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load posts: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TextInput
        style={styles.searchBar}
        placeholder="Search recent posts feed.."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.feed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 14,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  feed: {},
  postContainer: {
    backgroundColor: '#fff',
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  author: {
    fontWeight: 'bold',
  },
  time: {
    color: '#888',
  },
  title: {
    marginVertical: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  upvotes: {
    color: '#4CAF50',
  },
  comments: {
    color: '#2196F3',
  },
  saved: {
    color: '#FF9800',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default PostFeed;
