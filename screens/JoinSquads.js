import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Color } from '../GlobalStyles';
import { colorsDark } from 'react-native-elements/dist/config';

const squadsData = [
  {
    id: '1',
    name: 'Nature Diversity',
    handle: '@nature_diversity',
    members: 'Joined by Michael Nyagha, Grace and 19 others you know',
    description: 'Promoting nature green',
    avatar: 'https://d41chssnpqdne.cloudfront.net/user_upload_by_module/chat_bot/files/24467699/mFAGvppUlBQOYJuJ.jpeg?Expires=1724188829&Signature=LuMqvB-RIY8Fu~yNzvOkXM6ElDMc9ztLr9lBMoQf3~NPWmSTbtk3FafFkj0hwKUWtCqidCImktwQa7EK8KoGHKfFuvn7fWfS8vFPLwkmWUUF9ppJEXm3EwQ4rBShuCDcXJw2oUoiupZsBrpwTfgGiU9u3M0ljFTRLEUhPamzy~PvsKq~mkRXlzZGzVhH319NWRXsyckKsS~EzvgMQYOl2pBmycLSAg2lbGbb0wgzYjxHGXIvCfqWbnJNfEXjZltgLldn8Cl-fMuYVhigfjEjq1nlIIUegHaBJXIePAenIO3VFk4vpfq3LsOyIH5vNGHFhxVnc0LVd7RKSbTlCc4hDQ__&Key-Pair-Id=K3USGZIKWMDCSX',
    cover: 'https://example.com/cover1.jpg',
  },
  {
    id: '2',
    name: 'Smarty Tech',
    handle: '@smarty_tech',
    members: 'Joined by Grace, Antony and 250 others you know',
    description: 'Smart Green Homes and Roofs',
    avatar: 'https://d41chssnpqdne.cloudfront.net/user_upload_by_module/chat_bot/files/24467699/mFAGvppUlBQOYJuJ.jpeg?Expires=1724188829&Signature=LuMqvB-RIY8Fu~yNzvOkXM6ElDMc9ztLr9lBMoQf3~NPWmSTbtk3FafFkj0hwKUWtCqidCImktwQa7EK8KoGHKfFuvn7fWfS8vFPLwkmWUUF9ppJEXm3EwQ4rBShuCDcXJw2oUoiupZsBrpwTfgGiU9u3M0ljFTRLEUhPamzy~PvsKq~mkRXlzZGzVhH319NWRXsyckKsS~EzvgMQYOl2pBmycLSAg2lbGbb0wgzYjxHGXIvCfqWbnJNfEXjZltgLldn8Cl-fMuYVhigfjEjq1nlIIUegHaBJXIePAenIO3VFk4vpfq3LsOyIH5vNGHFhxVnc0LVd7RKSbTlCc4hDQ__&Key-Pair-Id=K3USGZIKWMDCSX',
    cover: 'https://example.com/cover2.jpg',
  },
  {
    id: '3',
    name: 'Green Waste Management',
    handle: '@green_waste',
    members: 'Joined by Don, Antony and 200 others you know',
    description: 'Recycling, Reducing and Reusing Wastes',
    avatar: 'https://d41chssnpqdne.cloudfront.net/user_upload_by_module/chat_bot/files/24467699/mFAGvppUlBQOYJuJ.jpeg?Expires=1724188829&Signature=LuMqvB-RIY8Fu~yNzvOkXM6ElDMc9ztLr9lBMoQf3~NPWmSTbtk3FafFkj0hwKUWtCqidCImktwQa7EK8KoGHKfFuvn7fWfS8vFPLwkmWUUF9ppJEXm3EwQ4rBShuCDcXJw2oUoiupZsBrpwTfgGiU9u3M0ljFTRLEUhPamzy~PvsKq~mkRXlzZGzVhH319NWRXsyckKsS~EzvgMQYOl2pBmycLSAg2lbGbb0wgzYjxHGXIvCfqWbnJNfEXjZltgLldn8Cl-fMuYVhigfjEjq1nlIIUegHaBJXIePAenIO3VFk4vpfq3LsOyIH5vNGHFhxVnc0LVd7RKSbTlCc4hDQ__&Key-Pair-Id=K3USGZIKWMDCSX',
    cover: 'https://example.com/cover3.jpg',
  },
];

const JoinSquads = () => {
  const [joinedSquads, setJoinedSquads] = useState({});
  const navigation = useNavigation();

  const renderSquadItem = ({ item }) => {
    const isJoined = joinedSquads[item.id];

    const handleJoinPress = () => {
      setJoinedSquads((prev) => ({ ...prev, [item.id]: !isJoined }));
    };

    return (
      <View style={styles.squadCard}>
        <Image source={{ uri: item.cover }} style={styles.coverImage} />
        <View style={styles.squadDetails}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <TouchableOpacity
            style={[styles.viewButton, isJoined && styles.joinedButton]}
            onPress={handleJoinPress}
          >
            <Text style={styles.viewButtonText}>
              {isJoined ? 'Pending' : 'Join'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.squadName}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.members}>{item.members}</Text>
        </View>
      </View>
    );
  };

  const handleViewSquadsPress = () => {
    navigation.navigate('Squads');
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.title}>Discover Squads Now! 🚀</Text>
        <Text style={styles.description}>
          Join our community squads to share your knowledge, learn from others, and connect with like-minded individuals.
        </Text>
      </View>
      <FlatList
        data={squadsData}
        renderItem={renderSquadItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={handleViewSquadsPress}>
        <Text style={styles.floatingButtonText}>View Joined Squads</Text>
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
  listContainer: {
    paddingBottom: 20,
  },
  squadCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  coverImage: {
    width: 355,
    height: 80,
    left: 5,
    borderRadius: 15,
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  description: {
    color: '#666666',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    top: 10,
    left: 10,
    borderWidth: 1,
    borderColor: Color.colorGray_100,
  },
  squadDetails: {
    padding: 15,
    paddingTop: 60,
  },
  squadName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  members: {
    color: '#666666',
    fontSize: 12,
  },
  viewButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: '#61dafb',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  joinedButton: {
    backgroundColor: 'orange', // Change color to indicate it's joined
  },
  viewButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -100 }],
    backgroundColor: '#61dafb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 18,
  },
  floatingButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default JoinSquads;
