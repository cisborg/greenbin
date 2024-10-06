import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView, Animated, StatusBar, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Color, FontFamily } from '../../GlobalStyles';
import { useNavigation } from '@react-navigation/core';

const CreateSquad = () => {
  const navigation = useNavigation();
  const [squadName, setSquadName] = useState('');
  const [description, setDescription] = useState('');
  const [postPermission, setPostPermission] = useState('all');
  const [invitePermission, setInvitePermission] = useState('all');
  const [greenPoints, setGreenPoints] = useState(0);
  const [loadingLaunch, setLoadingLaunch] = useState(false);
  const [loadingJoin, setLoadingJoin] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    // Fade in animation on mount
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleCreateSquad = () => {
    if (!squadName || greenPoints < 2500) {
      alert('Please fill in all fields and ensure you have enough Green Points.');
      return;
    }
    
    setLoadingLaunch(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Creating squad:', { squadName, description, postPermission, invitePermission, greenPoints });
      setLoadingLaunch(false);
      navigation.navigate('Confirmed'); // Navigate to confirmation screen
    }, 2000); // Simulated delay for API call
  };

  const handleJoinSquad = () => {
    setLoadingJoin(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Joining existing squads...');
      setLoadingJoin(false);
      navigation.navigate('JoinSquads'); // Navigate to existing squads
    }, 2000); // Simulated delay for API call
  };

  // Function to pick an image from local storage
  const pickImage = async (setImage) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Launch Squad 🚀</Text>
            <TouchableOpacity style={styles.joinButton} onPress={handleJoinSquad}>
              {loadingJoin ? (
                <ActivityIndicator size="small" color={Color.colorLimegreen_200} />
              ) : (
                <Text style={styles.joinButtonText}>Join</Text>
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Create a <Text style={{ color: Color.colorLimegreen_200 }}>squad</Text> where you can learn and interact with other ecoWarriors around topics that matter to you
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Name your Squad"
            value={squadName}
            placeholderTextColor="gray"
            onChangeText={setSquadName}
          />

          <TextInput
            style={styles.input}
            placeholder="Add description"
            value={description}
            placeholderTextColor="gray"
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />

          <TouchableOpacity style={styles.photoPicker} onPress={() => pickImage(setCoverPhoto)}>
            <Text style={styles.photoText}>Add Cover Photo</Text>
            {coverPhoto && <Image source={{ uri: coverPhoto }} style={styles.photoPreview} />}
          </TouchableOpacity>

          <TouchableOpacity style={styles.photoPicker} onPress={() => pickImage(setProfilePhoto)}>
            <Text style={styles.photoText}>Add Profile Photo</Text>
            {profilePhoto && <Image source={{ uri: profilePhoto }} style={styles.photoPreview} />}
          </TouchableOpacity>

          <Text style={styles.permissionTitle}>Post permissions</Text>
          <Text style={styles.permissionSubtitle}>
            Choose who is allowed to post new content in this Squad.
          </Text>
          <TouchableOpacity style={styles.option} onPress={() => setPostPermission('all')}>
            <Text style={postPermission === 'all' ? styles.selectedOption : styles.optionText}>
              All members (recommended)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => setPostPermission('moderators')}>
            <Text style={postPermission === 'moderators' ? styles.selectedOption : styles.optionText}>
              Only moderators
            </Text>
          </TouchableOpacity>

          <Text style={styles.permissionTitle}>Invitation permissions</Text>
          <Text style={styles.permissionSubtitle}>
            Choose who is allowed to invite new members to this Squad.
          </Text>
          <TouchableOpacity style={styles.option} onPress={() => setInvitePermission('all')}>
            <Text style={invitePermission === 'all' ? styles.selectedOption : styles.optionText}>
              All members (recommended)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => setInvitePermission('moderators')}>
            <Text style={invitePermission === 'moderators' ? styles.selectedOption : styles.optionText}>
              Only moderators
            </Text>
          </TouchableOpacity>

          {/* Payment Box Section */}
          <View style={styles.paymentBox}>
            <Text style={styles.paymentTitle}>Payment for Squad</Text>
            <Text style={styles.paymentSubtitle}>
              You need to pay <Text style={styles.greenPoints}>{2500} Green Points</Text> to create this squad.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Green Points"
              value={greenPoints.toString()}
              keyboardType="numeric"
              placeholderTextColor="gray"
              onChangeText={text => setGreenPoints(parseInt(text) || 0)}
            />
          </View>

          <TouchableOpacity style={styles.createButton} onPress={handleCreateSquad}>
            {loadingLaunch ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.createButtonText}>Launch</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    paddingBottom: 20,
    margin: 15
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 20, // Reduced font size
    fontWeight: '600',
    marginBottom: 5,
    fontFamily: FontFamily.poppinsRegular,
    color: 'orange',
  },
  subtitle: {
    fontSize: 14, // Reduced font size
    marginBottom: 15,
    color: '#555',
  },
  input: {
    height: 35, // Reduced height
    borderRadius: 8, // Reduced border radius
    paddingHorizontal: 8, // Reduced padding
    marginBottom: 10, // Reduced margin
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3, // Reduced shadow radius
  },
  permissionTitle: {
    fontSize: 16, // Reduced font size
    fontWeight: 'bold',
    marginTop: 15,
  },
  permissionSubtitle: {
    fontSize: 13, // Reduced font size
    marginBottom: 8,
    color: '#555',
  },
  option: {
    padding: 8, // Reduced padding
    borderRadius: 6, // Reduced border radius
    backgroundColor: '#f0f0f0',
    marginBottom: 8, // Reduced margin
  },
  optionText: {
    fontSize: 14, // Reduced font size
  },
  selectedOption: {
    fontSize: 14, // Reduced font size
    fontWeight: 'bold',
    color: Color.colorLimegreen_200,
  },
  photoPicker: {
    marginVertical: 12, // Reduced margin
    padding: 8, // Reduced padding
    borderRadius: 8,
    backgroundColor: '#eaeaea',
    alignItems: 'center',
  },
  photoText: {
    fontSize: 14, // Reduced font size
    color: 'gray'
  },
  photoPreview: {
    marginTop: 8,
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  paymentBox: {
    marginTop: 18,
    padding: 13,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 14,
    backgroundColor: '#f9f9f9',
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  paymentSubtitle: {
    fontSize: 12,
    color: '#555',
    marginBottom: 8,
  },
  greenPoints: {
    fontWeight: 'bold',
    color: Color.colorLimegreen_200,
  },
  createButton: {
    backgroundColor: Color.colorLimegreen_200,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    width: 100,
    height: 40,
    padding: 18,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    margin: 13
  },
  createButtonText: {
    color: '#fff',
    fontSize: 14,
    alignSelf: "center",
    fontWeight: 'bold',
  },
  joinButton: {
    backgroundColor: Color.colorLimegreen_200,
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 13,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default CreateSquad;
