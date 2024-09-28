import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity,Platform,StyleSheet, ScrollView, ActivityIndicator, SafeAreaView, Animated } from 'react-native';
import { Color, FontFamily } from '../../GlobalStyles';
import { useNavigation } from '@react-navigation/core';

const CreateSquad = () => {
  const navigation = useNavigation();
  const [squadName, setSquadName] = useState('');
  const [squadHandle, setSquadHandle] = useState('');
  const [description, setDescription] = useState('');
  const [postPermission, setPostPermission] = useState('all');
  const [invitePermission, setInvitePermission] = useState('all');
  const [greenPoints, setGreenPoints] = useState(0);
  const [loadingLaunch, setLoadingLaunch] = useState(false);
  const [loadingJoin, setLoadingJoin] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Fade in animation on mount
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleCreateSquad = () => {
    if (!squadName || !squadHandle || greenPoints < 2500) {
      alert('Please fill in all fields and ensure you have enough Green Points.');
      return;
    }
    
    setLoadingLaunch(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Creating squad:', { squadName, squadHandle, description, postPermission, invitePermission, greenPoints });
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

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={{ top: 10, flexDirection: 'row', left: 10, marginBottom: 20, justifyContent:'space-between' }}>
            <Text style={styles.title}>Launch Squad  🚀</Text>
            <TouchableOpacity style={styles.joinButton} onPress={handleJoinSquad}>
              {loadingJoin ? (
                <ActivityIndicator size="small" color={Color.colorLimegreen_200} />
              ) : (
                <Text style={styles.joinButtonText}> Join </Text>
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
            placeholderTextColor='gray'
            onChangeText={setSquadName}
          />

          <TextInput
            style={styles.input}
            placeholder="@ Squad handle"
            value={squadHandle}
            placeholderTextColor="gray"
            onChangeText={setSquadHandle}
          />

          <TextInput
            style={styles.input}
            placeholder="Add description"
            value={description}
            placeholderTextColor='gray'
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />

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
              placeholderTextColor='gray'
              onChangeText={text => setGreenPoints(parseInt(text) || 0)}
            />
          </View>

          <TouchableOpacity style={styles.createButton} onPress={handleCreateSquad}>
            {loadingLaunch ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.createButtonText}> Launch </Text>
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
    padding: 20,
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight : 0,

  },
  scrollContainer: {
    paddingBottom: 20,
    paddingLeft: 12,
    paddingRight: 12
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    fontFamily: FontFamily.poppinsRegular,
    color: 'orange',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  input: {
    height: 37,
    borderRadius: 11,
    paddingHorizontal: 10,
    marginBottom: 15,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  permissionSubtitle: {
    fontSize: 14,
    marginBottom: 10,
    color: '#555',
  },
  option: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
  },
  selectedOption: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.colorLimegreen_200,
  },
  paymentBox: {
    marginTop: 20,
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 14,
    backgroundColor: '#f9f9f9',
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentSubtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  greenPoints: {
    fontWeight: 'bold',
    color: Color.colorLimegreen_200,
  },
  createButton: {
    backgroundColor: Color.colorLimegreen_200,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    width: 100,
    height: 40,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 8,
    justifyContent: 'center',
  },
  joinButton: {
    backgroundColor: "white",
    marginTop: -2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    alignContent: "center",
    width: 100,
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -60
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: -27,
  },
  joinButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.colorLimegreen_200,
  },
});

export default CreateSquad;
