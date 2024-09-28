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
  const [thumbnail, setThumbnail] = useState(null);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [newSquad, setNewSquad] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle image picker with both camera and media library permissions
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
    });

    if (!result.canceled && result.assets) {
      setThumbnail(result.assets[0].uri);
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
      console.log('Thumbnail:', thumbnail);

      setPostTitle('');
      setPostContent('');
      setSelectedSquad('');
      setThumbnail(null);
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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
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

        <TouchableOpacity style={styles.squadSelect} onPress={() => setSquadModalVisible(true)}>
          <Text style={styles.squadText}>{selectedSquad || 'Select Squad'}</Text>
          <Text style={styles.chevron}>▼</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.thumbnail} onPress={handleImagePick}>
          {thumbnail ? (
            <Image source={{ uri: thumbnail }} style={styles.thumbnailImage} />
          ) : (
            <Text style={styles.thumbnailText}>Thumbnail</Text>
          )}
        </TouchableOpacity>

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

        {activeTab === 'Write' && (
          <TextInput
            style={styles.textArea}
            placeholder="Share your thoughts"
            placeholderTextColor="#999"
            multiline={true}
            maxLength={500} // Character limit added for post content
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
    </KeyboardAvoidingView>
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
    padding: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  thumbnailImage: {
    width: '100%',
    height: 150,
    borderRadius: 17,
  },
  thumbnailText: {
    fontSize: 16,
    color: '#999',
  },
  postTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  postTitleInput: {
    flex: 1,
    paddingBottom: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    fontSize: 16,
    color: 'black',
    paddingTop: 5,
    borderRadius: 14,
    paddingLeft: 15,
  },
  characterCount: {
    marginLeft: 10,
    color: '#999',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
    paddingBottom: 10,
  },
  tab: {
    paddingBottom: 10,
  },
  tabText: {
    fontSize: 16,
    color: 'black',
  },
  textArea: {
    borderColor: '#999',
    borderRadius: 17,
    padding: 10,
    fontSize: 16,
    color: 'black',
    minHeight: 150,
    textAlignVertical: 'top',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  previewContainer: {
    marginBottom: 15,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 17,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  squadItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  closeModalText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
  },
  addSquadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  newSquadInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  addSquadButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
  },
  addSquadText: {
    color: 'white',
  },
});

export default NewPostScreen;
