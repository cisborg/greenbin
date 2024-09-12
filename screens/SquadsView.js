import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Color } from '../GlobalStyles';

const SquadScreen = () => {
  const [url, setUrl] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.squadName}>Quantum Photonics</Text>
        <Text style={styles.squadHandle}>@quantumphotonics • Created Aug 2024</Text>
        <Text style={styles.privateSquad}>Private Squad</Text>
        <View style={styles.stats}>
          <Text style={styles.statText}>1 Posts</Text>
          <Text style={styles.statText}>0 Views</Text>
          <Text style={styles.statText}>0 Upvotes</Text>
        </View>
        <View style={styles.moderatedBy}>
          <Text style={styles.moderatedByText}>Moderated by</Text>
          <Text style={styles.moderator}>quantum • Admin</Text>
        </View>
      </View>

      <View style={styles.invitationContainer}>
        <Text style={styles.invitationText}>Invitation link</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter URL"
          placeholderTextColor="#B0B0B0"
          value={url}
          onChangeText={setUrl}
        />
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.historyText}>Choose from reading history</Text>
      <View style={styles.orContainer}>
        <Text style={styles.orText}>or</Text>
      </View>
      <TouchableOpacity style={styles.newPostButton}>
        <Text style={styles.newPostButtonText}>New post</Text>
      </TouchableOpacity>

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
    overflow: 'hidden',
  },
  header: {
    marginBottom: 20,
  },
  squadName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  squadHandle: {
    fontSize: 14,
    color: '#555555',
  },
  privateSquad: {
    fontSize: 14,
    color: '#FF6347', // Red color for Private Squad
    marginVertical: 5,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  statText: {
    fontSize: 14,
    color: '#000000',
  },
  moderatedBy: {
    marginVertical: 10,
  },
  moderatedByText: {
    fontSize: 14,
    color: '#555555',
  },
  moderator: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  invitationContainer: {
    marginVertical: 10,
  },
  invitationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    color: '#000000',
  },
  postButton: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 15,
  },
  postButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  historyText: {
    fontSize: 14,
    color: '#555555',
    marginVertical: 10,
  },
  orContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  orText: {
    fontSize: 14,
    color: '#555555',
  },
  newPostButton: {
    backgroundColor: '#FF6347', // Red color for New post button
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  newPostButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
  },
  footerButtonText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default SquadScreen;
