import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { createPost } from '../../redux/actions/Posts'; // Adjust the path as necessary
import { Color } from '../../GlobalStyles';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const NewPostScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Initialize dispatch
  const [activeTab, setActiveTab] = useState('Write');
  const [thumbnails, setThumbnails] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postTags, setPostTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const cameraPermissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted || !cameraPermissionResult.granted) {
      Alert.alert('Permission Denied', 'You need to grant permission to access the camera and media library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 3,
    });

    if (!result.canceled && result.assets) {
      const newThumbnails = result.assets.map(asset => asset.uri);
      setThumbnails(newThumbnails);
    }
  };

  const handleTagInput = (tag) => {
    if (postTags.length < 2 && tag.trim() !== '') {
      setPostTags([...postTags, tag.trim()]);
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = [...postTags];
    newTags.splice(index, 1);
    setPostTags(newTags);
  };

  const handlePost = async () => {
    if (!postTitle || !postContent) {
      Alert.alert('Validation Error', 'Please fill in all fields before posting.');
      return;
    }

    setLoading(true);
    
    const postData = {
      title: postTitle,
      content: postContent,
      tags: postTags,
      thumbnails: thumbnails,
    };

    try {
      await dispatch(createPost(postData)); // Dispatch the createPost action
      Alert.alert('Success', 'Post created successfully!');
      // Reset the form after successful post
      setPostTitle('');
      setPostContent('');
      setThumbnails([]);
    } catch (error) {
      Alert.alert('Error', error.message); // Handle any errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.postButton, loading && styles.disabledButton]}
          onPress={handlePost}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="green" />
          ) : (
            <Text style={styles.postButtonText}>Post</Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>New Post</Text>

      {/* Thumbnail Section */}
      <TouchableOpacity style={styles.thumbnail} onPress={handleImagePick}>
        {thumbnails.length > 0 ? (
          <View style={styles.thumbnailContainer}>
            {thumbnails.map((uri, index) => (
              <FastImage key={index} source={{ uri }} style={styles.thumbnailImage} resizeMode={FastImage.resizeMode.cover} />
            ))}
          </View>
        ) : (
          <Text style={styles.thumbnailText}>Upload up to 3 Photos</Text>
        )}
      </TouchableOpacity>

      <View style={styles.tagsContainer}>
        <TextInput
          style={styles.tagInput}
          placeholder="Add up to 2 tags"
          placeholderTextColor="#999"
          onChangeText={handleTagInput}
          onSubmitEditing={(event) => handleTagInput(event.nativeEvent.text)}
          returnKeyType="done"
        />
        <View style={styles.tagsList}>
          {postTags.map((tag, index) => (
            <View key={index} style={styles.tagItem}>
              <Text style={styles.tagText}>{tag}</Text>
              <TouchableOpacity onPress={() => handleRemoveTag(index)}>
                <Text style={styles.tagRemove}>x</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      {/* Title Input */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.postTitleContent}>
          <View style={styles.postTitleContainer}>
            <TextInput
              style={styles.postTitleInput}
              placeholder="Post Title*"
              placeholderTextColor="#999"
              maxLength={250}
              value={postTitle}
              onChangeText={setPostTitle}
            />
            <Text style={styles.characterCount}>{250 - postTitle.length}</Text>
          </View>
          <View style={styles.tagsList}>
            {postTags.map((tag, index) => (
              <View key={index} style={styles.tagItem}>
                <Text style={styles.tagText}>{tag}</Text>
                <TouchableOpacity onPress={() => handleRemoveTag(index)}>
                  <Text style={styles.tagRemove}>x</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {['Write', 'Preview', 'Saved'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={activeTab === tab ? styles.activeTab : styles.tab}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={styles.tabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content Input or Preview */}
        {activeTab === 'Write' && (
          <TextInput
            style={styles.textArea}
            placeholder="Share your thoughts"
            placeholderTextColor="#999"
            multiline={true}
            maxLength={500}
            value={postContent}
            onChangeText={setPostContent}
          />
        )}

        {activeTab === 'Preview' && (
          <View style={styles.previewContainer}>
            <Text style={styles.previewTitle}>{postTitle}</Text>
            <Text>{postContent}</Text>
          </View>
        )}
      </KeyboardAvoidingView>

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <LottieView
            source={require('../../assets/lottie/rotateLoad.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Color.colorWhite,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cancelButton: {
    color: '#007AFF',
    fontSize: 16,
  },
  postTitleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
    borderColor: 'green',
    borderWidth: 1,
  },
  postButtonText: {
    color: 'green',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
  tagsContainer: {
    marginBottom: 16,
  },
  tagInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagItem: {
    backgroundColor: Color.primary,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    color: '#fff',
    marginRight: 4,
  },
  tagRemove: {
    color: '#fff',
    fontWeight: 'bold',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginVertical: 15,
  },
 
  thumbnail: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  thumbnailImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
    margin: 5,
  },
  thumbnailText: {
    fontSize: 16,
    color: '#007AFF',
  },
  postTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  postTitleInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    borderBottomEndRadius: 8,
    fontSize: 16,
    padding: 8,
    color: 'black',
  },
  characterCount: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  tab: {
    padding: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  activeTab: {
    padding: 8,
    backgroundColor: 'green',
    borderRadius: 10,
  },
  tabText: {
    fontSize: 16,
    color: 'black',
  },
  textArea: {
    height: 150,
    borderRadius: 18,
    shadowColor: 'black',
    shadowOffset:{ width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
    padding: 15,
    color: 'black',
  },
  previewContainer: {
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 15,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
 
 
  
});

export default NewPostScreen;
