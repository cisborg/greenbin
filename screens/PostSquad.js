import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Modal, FlatList, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/core';

const NewPostScreen = () => {
  const navigation= useNavigation()
  const [squadModalVisible, setSquadModalVisible] = useState(false);
  const [squads, setSquads] = useState(['Green Circular Economy', 'Nature Diversity', 'Tree Planting Expo']);
  const [selectedSquad, setSelectedSquad] = useState('');
  const [activeTab, setActiveTab] = useState('Write');
  const [thumbnail, setThumbnail] = useState(null);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [newSquad, setNewSquad] = useState('');

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setThumbnail(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    // Logic to handle posting
    console.log('Post Title:', postTitle);
    console.log('Post Content:', postContent);
    console.log('Selected Squad:', selectedSquad);
    console.log('Thumbnail:', thumbnail);
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
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.title}>New Post</Text>

      <TouchableOpacity style={styles.squadSelect} onPress={() => setSquadModalVisible(true)}>
        <Text style={styles.squadText}>{selectedSquad || 'Select Squad'}</Text>
        <Text style={styles.chevron}>▼</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.thumbnail} onPress={handleImagePick}>
        <Text style={styles.thumbnailText}>{thumbnail ? 'Thumbnail Selected' : 'Thumbnail'}</Text>
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

      <View style={styles.footerIcons}>
        <TouchableOpacity>
          <Text style={styles.icon}>🖼️</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.icon}>🔗</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.icon}>@</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.icon}>🔄</Text>
        </TouchableOpacity>
      </View>

      {/* Squad Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={squadModalVisible}
        onRequestClose={() => setSquadModalVisible(false)}
      >
        <View style={styles.modalContainer}>
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
          />
          <View style={styles.addSquadContainer}>
            <TextInput
              style={styles.newSquadInput}
              placeholder="Add Custom Squad"
              placeholderTextColor='gray'
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
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 404,
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
    borderRadius: 10,
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
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    paddingBottom: 5,
    fontSize: 16,
    color: 'black',
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
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: 'black',
    minHeight: 150,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  previewContainer: {
    marginBottom: 15,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 0,
    
  },
  icon: {
    fontSize: 24,
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    width: 404
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
    width: 404,
    top: 200,
    left: 0
  },
  newSquadInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  addSquadButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  addSquadText: {
    color: 'white',
  },
});

export default NewPostScreen;
