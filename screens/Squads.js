import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Color } from '../GlobalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign'; // Make sure to install this package

const squadsData = [
  {
    id: '1',
    name: 'Nature Diversity',
    handle: '@nature_diversity',
    status: 'moderated',
    members: 'Joined by Michael Nyagha, Grace and 19 others you know',
    description: 'Promoting nature green',
    avatar: 'https://d41chssnpqdne.cloudfront.net/user_upload_by_module/chat_bot/files/24467699/mFAGvppUlBQOYJuJ.jpeg?Expires=1724188829&Signature=LuMqvB-RIY8Fu~yNzvOkXM6ElDMc9ztLr9lBMoQf3~NPWmSTbtk3FafFkj0hwKUWtCqidCImktwQa7EK8KoGHKfFuvn7fWfS8vFPLwkmWUUF9ppJEXm3EwQ4rBShuCDcXJw2oUoiupZsBrpwTfgGiU9u3M0ljFTRLEUhPamzy~PvsKq~mkRXlzZGzVhH319NWRXsyckKsS~EzvgMQYOl2pBmycLSAg2lbGbb0wgzYjxHGXIvCfqWbnJNfEXjZltgLldn8Cl-fMuYVhigfjEjq1nlIIUegHaBJXIePAenIO3VFk4vpfq3LsOyIH5vNGHFhxVnc0LVd7RKSbTlCc4hDQ__&Key-Pair-Id=K3USGZIKWMDCSX',
    cover: 'https://example.com/cover1.jpg',
  },
  {
    id: '2',
    name: 'Smarty Tech',
    handle: '@smarty_tech',
    status: 'add post',
    members: 'Joined by Grace, Antony and 250 others you know',
    description: 'Smart Green Homes and Roofs',
    avatar: 'https://d41chssnpqdne.cloudfront.net/user_upload_by_module/chat_bot/files/24467699/mFAGvppUlBQOYJuJ.jpeg?Expires=1724188829&Signature=LuMqvB-RIY8Fu~yNzvOkXM6ElDMc9ztLr9lBMoQf3~NPWmSTbtk3FafFkj0hwKUWtCqidCImktwQa7EK8KoGHKfFuvn7fWfS8vFPLwkmWUUF9ppJEXm3EwQ4rBShuCDcXJw2oUoiupZsBrpwTfgGiU9u3M0ljFTRLEUhPamzy~PvsKq~mkRXlzZGzVhH319NWRXsyckKsS~EzvgMQYOl2pBmycLSAg2lbGbb0wgzYjxHGXIvCfqWbnJNfEXjZltgLldn8Cl-fMuYVhigfjEjq1nlIIUegHaBJXIePAenIO3VFk4vpfq3LsOyIH5vNGHFhxVnc0LVd7RKSbTlCc4hDQ__&Key-Pair-Id=K3USGZIKWMDCSX',
    cover: 'https://example.com/cover2.jpg',
  },
  {
    id: '3',
    name: 'Green Waste Management',
    handle: '@green_waste',
    status: 'moderated',
    members: 'Joined by Don, Antony and 200 others you know',
    description: 'Recycling, Reducing and Reusing Wastes',
    avatar: 'https://d41chssnpqdne.cloudfront.net/user_upload_by_module/chat_bot/files/24467699/mFAGvppUlBQOYJuJ.jpeg?Expires=1724188829&Signature=LuMqvB-RIY8Fu~yNzvOkXM6ElDMc9ztLr9lBMoQf3~NPWmSTbtk3FafFkj0hwKUWtCqidCImktwQa7EK8KoGHKfFuvn7fWfS8vFPLwkmWUUF9ppJEXm3EwQ4rBShuCDcXJw2oUoiupZsBrpwTfgGiU9u3M0ljFTRLEUhPamzy~PvsKq~mkRXlzZGzVhH319NWRXsyckKsS~EzvgMQYOl2pBmycLSAg2lbGbb0wgzYjxHGXIvCfqWbnJNfEXjZltgLldn8Cl-fMuYVhigfjEjq1nlIIUegHaBJXIePAenIO3VFk4vpfq3LsOyIH5vNGHFhxVnc0LVd7RKSbTlCc4hDQ__&Key-Pair-Id=K3USGZIKWMDCSX',
    cover: 'https://example.com/cover3.jpg',
  },
];

const JoinSquads = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSquads = squadsData.filter(squad =>
    squad.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    squad.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSquadItem = ({ item }) => {
    return (
      <View style={styles.squadCard}>
        <Image source={{ uri: item.cover }} style={styles.coverImage} />
        <View style={styles.squadDetails}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <TouchableOpacity style={styles.viewButton} onPress={() => navigation.navigate('ViewSquads2')}>
            <Text style={styles.viewButtonText}>Explore</Text>
          </TouchableOpacity>
          <Text style={styles.squadName}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.status}>{item.status}</Text>
          <Text style={styles.members}>{item.members}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search your favorite squads.."
          placeholderTextColor={Color.colorGray_100}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredSquads}
        renderItem={renderSquadItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('createSquad')}>
        <AntDesign name="pluscircle" size={45} color="#61dafb" />
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
    width: '100%',
    height: 95,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'lightgray'
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  searchInput: {
    borderColor: Color.colorGray_100,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 30,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 25,
    position: 'absolute',
    top: -30,
    left: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginBottom: -15
  },
  squadDetails: {
    padding: 15,
    paddingTop: 40, // Ensure space for the avatar and button
  },
  squadName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  description: {
    color: '#666666',
  },
  status: {
    color: 'green',
    fontSize: 12
  },
  members: {
    color: '#666666',
    fontSize: 11,
  },
  viewButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 3}
  },
  viewButtonText: {
    color: Color.colorLimegreen_200,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    backgroundColor: 'white',
    borderRadius: 30,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
});

export default JoinSquads;
