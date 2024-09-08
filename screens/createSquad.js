import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Color, FontFamily } from '../GlobalStyles';
import { useNavigation } from '@react-navigation/core';

const CreateSquad = () => {
  const navigation = useNavigation();
  const [squadName, setSquadName] = useState('');
  const [squadHandle, setSquadHandle] = useState('');
  const [description, setDescription] = useState('');
  const [postPermission, setPostPermission] = useState('all');
  const [invitePermission, setInvitePermission] = useState('all');
  const [greenPoints, setGreenPoints] = useState(0);

  const handleCreateSquad = () => {
    // Handle the squad creation logic
    console.log('Creating squad:', { squadName, squadHandle, description, postPermission, invitePermission, greenPoints });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ top: 10, flexDirection: 'row', left: 10, marginBottom: 20}}>
        <Text style={styles.title}>Launch Squad  🚀</Text>
        <TouchableOpacity style={styles.joinButton} onPress={()=> navigation.navigate('JoinSquads')}>
          <Text style={styles.joinButtonText}> Join </Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.subtitle}>
        Create a <Text style={{ color: Color.colorLimegreen_200}}>squad</Text> where you can learn and interact with other ecoWarriors around topics that matter to you
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
      <TouchableOpacity
        style={styles.option}
        onPress={() => setPostPermission('all')}
      >
        <Text style={postPermission === 'all' ? styles.selectedOption : styles.optionText}>
          All members (recommended)
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => setPostPermission('moderators')}
      >
        <Text style={postPermission === 'moderators' ? styles.selectedOption : styles.optionText}>
          Only moderators
        </Text>
      </TouchableOpacity>

      <Text style={styles.permissionTitle}>Invitation permissions</Text>
      <Text style={styles.permissionSubtitle}>
        Choose who is allowed to invite new members to this Squad.
      </Text>
      <TouchableOpacity
        style={styles.option}
        onPress={() => setInvitePermission('all')}
      >
        <Text style={invitePermission === 'all' ? styles.selectedOption : styles.optionText}>
          All members (recommended)
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => setInvitePermission('moderators')}
      >
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

      <TouchableOpacity style={styles.createButton} onPress={()=> navigation.goBack()}>
        <Text style={styles.createButtonText}> Launch </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    width: 404,
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
    marginBottom: 10,
    fontFamily: FontFamily.poppinsRegular,
    color: 'orange'
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
    borderRadius: 8,
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
    backgroundColor: "white",
    marginTop: 20,
    shadowColor: "#000",
    left: 130,
    
    shadowOffset: {
      width: 2,
      height: 3,
    },
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
    marginBottom: 8,
  },
  joinButton: {
    backgroundColor: "white",
    marginTop: -10,
    shadowColor: "#000",
    left: 60,
    
    shadowOffset: {
      width: 2,
      height: 3,
    },
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
    marginBottom: 8,
  },
  createButtonText: {
    color: Color.colorLimegreen_200,
    fontWeight: 'bold',
    fontFamily: FontFamily.poppinsRegular,
    fontSize: 16,
    marginTop: -20
  },
  joinButtonText: {
    color: Color.colorLimegreen_200,
    fontWeight: 'bold',
    fontFamily: FontFamily.poppinsRegular,
    fontSize: 16,
    marginTop: -5
  },
});

export default CreateSquad;
