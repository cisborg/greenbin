import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Modal, Alert, ActivityIndicator, Image, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/core';
import { Color } from '../../GlobalStyles';

const NewPostScreen = () => {
  const navigation = useNavigation();
  const [squadModalVisible, setSquadModalVisible] = useState(false);
  const [squads, setSquads] = useState(['Green Circular Economy', 'Nature Diversity', 'Tree Planting Expo']);
  const [selectedSquad, setSelectedSquad] = useState('');
  const [activeTab, setActiveTab] = useState('Write');
  const [thumbnails, setThumbnails] = useState([]); // Changed to an array for multiple images
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [newSquad, setNewSquad] = useState('');
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
      selectionLimit: 3, // Limit selection to 3 images
    });

    if (!result.canceled && result.assets) {
      const newThumbnails = result.assets.map(asset => asset.uri);
      setThumbnails(newThumbnails);
    }
  };

  const handlePost = () => {
    if (!postTitle || !postContent || !selectedSquad) {
      Alert.alert('Validation Error', 'Please fill in all fields before posting.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      console.log('Post Title:', postTitle);
      console.log('Post Content:', postContent);
      console.log('Selected Squad:', selectedSquad);
      console.log('Thumbnails:', thumbnails);

      setPostTitle('');
      setPostContent('');
      setSelectedSquad('');
      setThumbnails([]);
      setLoading(false);
      Alert.alert('Success', 'Post created successfully!');
    }, 2000);
  };

  const addSquad = () => {
    if (newSquad.trim()) {
      setSquads([...squads, newSquad.trim()]);
      setNewSquad('');
      Alert.alert('Success', 'New squad added!');
    } else {
      Alert.alert('Error', 'Please enter a squad name.');
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
          style={[styles.postButton, loading && styles.disabledButton]} // Disable button when loading
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

      {/* Squad Selection */}
      <TouchableOpacity style={styles.squadSelect} onPress={() => setSquadModalVisible(true)}>
        <Text style={styles.squadText}>{selectedSquad || 'Select Squad'}</Text>
        <Text style={styles.chevron}>▼</Text>
      </TouchableOpacity>

      {/* Thumbnail Section */}
      <TouchableOpacity style={styles.thumbnail} onPress={handleImagePick}>
        {thumbnails.length > 0 ? (
          <View style={styles.thumbnailContainer}>
            {thumbnails.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.thumbnailImage} />
            ))}
          </View>
        ) : (
          <Text style={styles.thumbnailText}>Upload up to 3 Photos</Text>
        )}
      </TouchableOpacity>

      {/* Title Input */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
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
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}

      {/* Squad Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={squadModalVisible}
        onRequestClose={() => setSquadModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={squads}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.squadItem}
                  onPress={() => {
                    setSelectedSquad(item);
                    setSquadModalVisible(false);
                  }}
                >
                  <Text style={styles.squadText}>{item}</Text>
                </TouchableOpacity>
              )}
              style={{ maxHeight: 200 }} // Limit the FlatList height
            />
            <View style={styles.addSquadContainer}>
              <TextInput
                style={styles.newSquadInput}
                placeholder="Add Custom Squad"
                placeholderTextColor="gray"
                value={newSquad}
                onChangeText={setNewSquad}
              />
              <TouchableOpacity style={styles.addSquadButton} onPress={addSquad}>
                <Text style={styles.addSquadText}>Add</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setSquadModalVisible(false)}>
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginVertical: 15,
  },
  squadSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 17,
    marginBottom: 15,
  },
  squadText: {
    fontSize: 16,
    color: 'black',
  },
  chevron: {
    fontSize: 16,
    color: '#007AFF',
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
    flex: 1,
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    textAlignVertical: 'top',
    color: 'black',
    marginBottom: 15,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  squadItem: {
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  addSquadContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  newSquadInput: {
    flex: 1,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 8,
  },
  addSquadButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  addSquadText: {
    color: 'white',
  },
  closeModalText: {
    color: '#007AFF',
    marginTop: 20,
  },
});

export default NewPostScreen;
