import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Animated, StatusBar,Platform } from 'react-native';
import { WaveIndicator } from 'react-native-indicators';

const posts = [
  {
    id: '1',
    author: 'Masaku • Kenya Ecogreen',
    time: '8h ago',
    title: 'Waste Collection Expo Event Report',
    upvotes: 450,
    comments: 296,
    saved: '2.0k',
  },
  {
    id: '2',
    author: 'Ashley Young • Eco Warriors',
    time: 'Today',
    title: 'Green Circular Economy',
    upvotes: 656,
    comments: 60,
    saved: 899,
  },
  {
    id: '3',
    author: 'George Doyle • Nature Diversity',
    time: 'Today',
    title: 'With GreenBins we make waste collection possible',
    upvotes: 892,
    comments: 300,
    saved: 99,
  },
  {
    id: '4',
    author: 'Ashley Young • Eco Warriors',
    time: 'Today',
    title: 'Green Circular Economy',
    upvotes: 999,
    comments: 69,
    saved: 10,
  },
];

const PostFeed = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Simulate loading
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => setLoading(false));

    // Filter posts based on search term
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchTerm]);

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.author}>{item.author}</Text>
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
        <WaveIndicator size={100} color="green" />
        <Text style={styles.loadingText}>Loading...</Text>
      </Animated.View>
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
  feed: {
  },
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
});

export default PostFeed;