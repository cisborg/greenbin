import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingTags, fetchPopularTags } from '../../redux/actions/Posts';
import { FontFamily, Color } from "../../GlobalStyles";
import LottieView from 'lottie-react-native';


const { width, height } = Dimensions.get('window');

const TagList = () => {
  const dispatch = useDispatch();
  const { trendingTags } = useSelector((state) =>  state.posts.trendingTags );
  const {  popularTags } = useSelector((state) =>  state.posts.popularTags );
  const {  trendingLoading} = useSelector((state) =>  state.posts.trendingLoading );
  const {  popularLoading } = useSelector((state) =>  state.posts.popularLoading );
  const { error } = useSelector((state) =>  state.posts.error );



  useEffect(() => {
    dispatch(fetchTrendingTags());
    dispatch(fetchPopularTags());
  }, [dispatch]);

  const handleTryAgain = () => {
    dispatch(fetchTrendingTags());
    dispatch(fetchPopularTags());

  };

  const renderTag = ({ item }) => (
    <TouchableOpacity style={styles.tagContainer}>
      <Text style={styles.tagText}>{item}</Text>
    </TouchableOpacity>
  );

  if (trendingLoading || popularLoading) {
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
          source={require('../../assets/lottie/rotateLoad.json')} // Adjust the path to your Lottie file
          autoPlay
          loop
          style={styles.lottie}
        />
        <TouchableOpacity style={styles.fetchAgain} onPress={handleTryAgain}>
        <Text style={styles.errorText}>{`${error} Try Again`}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trending Tags</Text>
      <FlatList
        data={trendingTags}
        renderItem={renderTag}
        keyExtractor={(item) => item.toString()}
        style={styles.list}
      />

      <Text style={styles.header}>Popular Tags</Text>
      <FlatList
        data={popularTags}
        renderItem={renderTag}
        keyExtractor={(item) => item.toString()}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 5,
    overflow: 'hidden',
  },
  header: {
    fontSize: 17,
    fontWeight: 'bold',

    marginVertical: 5,
    color: 'green',
    FontFamily: FontFamily.manropeBold
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
  
  list: {
    marginBottom: 20,
  },
  tagContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 10,
    marginVertical: 5,
    
  },
  tagText: {
    fontSize: 14,
    color: '#333',
  },
});

export default TagList;
