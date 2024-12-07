import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text,TextInput,FlatList, TouchableOpacity, ScrollView,  Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Color } from "../../GlobalStyles";
import { fetchTags } from '../../redux/actions/Posts';


const { width, height } = Dimensions.get('window');

const TagSelection = () => {
  const dispatch = useDispatch();
  const { tags, loading, error } = useSelector((state) => state.tags);

  const [selectedTags, setSelectedTags] = useState([]);
  const [feedName, setFeedName] = useState('');

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const handleTryAgain = () => {
    dispatch(fetchTags());
  };
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Filter tags based on the feed name input
  const filteredTags = tags.filter(tag =>
    tag.toLowerCase().includes(feedName.toLowerCase())
  );

  const renderTag = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.tag,
        selectedTags.includes(item) && styles.selectedTag,
      ]}
      onPress={() => toggleTag(item)}
    >
      <Text style={styles.tagText}>{item}</Text>
    </TouchableOpacity>
  );

  if (loading) {
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
      <TextInput
        style={styles.input}
        placeholder="Enter feed name or search tags"
        placeholderTextColor="#B0B0B0"
        value={feedName}
        onChangeText={setFeedName}
      />
      <ScrollView contentContainerStyle={styles.tagList}>
        <FlatList
          data={filteredTags}
          renderItem={renderTag}
          keyExtractor={(item) => item}
          numColumns={3}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 2,
    overflow: 'hidden',
  },
 
  input: {
    borderRadius: 12,
    paddingHorizontal: 10,
    shadowColor: '#000',
    height: 35,
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
    marginTop: 15
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
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    margin: 5
  },
  tag: {
    backgroundColor: '#F0F0F0',
    borderRadius: 17,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
  },
  selectedTag: {
    backgroundColor: 'white',
  },
  tagText: {
    color: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    margin: 15,
  },
  buttonText: {
    color: 'green',
    fontWeight: 'bold',
  },
});

export default TagSelection;
