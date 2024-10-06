import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Color } from '../../GlobalStyles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

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
    connections: 950,
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
    connections: 1200,
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
    connections: 800,
  },
];

const JoinSquads = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingStates, setLoadingStates] = useState({});

  const filteredSquads = squadsData.filter(squad =>
    squad.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    squad.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinPress = (id) => {
    setLoadingStates((prev) => ({ ...prev, [id]: 'loading' }));

    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [id]: 'pending' }));
    }, 300); // Duration for the spinner
  };

  const renderSquadItem = ({ item }) => {
    const loadingState = loadingStates[item.id];

    return (
      <View style={styles.squadCard}>
        <Image 
          source={{ uri: item.cover }} 
          style={styles.coverImage} 
          onError={() => console.error('Cover image failed to load')} 
        />
        <View style={styles.squadDetails}>
          <Image 
            source={{ uri: item.avatar }} 
            style={styles.avatar} 
            onError={() => console.error('Avatar image failed to load')} 
          />
          <Text style={styles.squadName}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={[styles.status, item.status === 'moderated' ? styles.moderated : styles.addPost]}>
            {item.status}
          </Text>
          <Text style={styles.members}>{item.members}</Text>
          
          <View style={styles.connectionsContainer}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Image 
                key={index}
                source={{ uri: item.avatar }} 
                style={[styles.connectorImage, { zIndex: 3 - index }]} 
                onError={() => console.error('Connector image failed to load')} 
              />
            ))}
            <Text style={styles.connectionsCount}>
              {item.connections >= 1000 ? `${(item.connections / 1000).toFixed(1)}k connectors` : `${item.connections} connectors` }
            </Text>
          </View>

          <TouchableOpacity 
            style={[styles.joinButton, loadingState === 'pending' ? styles.loadingButton : null]} 
            onPress={() => handleJoinPress(item.id)}
          >
            {loadingState === 'loading' ? (
              <ActivityIndicator size="small" color="#FFF" style={styles.spinner} />
            ) : (
              <Text style={styles.joinButtonText}>
                {loadingState === 'pending' ? 'Pending' : 'Join'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.heading}>
          <Text style={styles.title}>Discover Squads Now! 🚀</Text>
          <TouchableOpacity onPress={() => navigation.navigate('GreenDaily')}>
            <FontAwesome6 name="users-viewfinder" size={22} color="green" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.description}>
          Join our community squads to share your knowledge, learn from others, and connect with like-minded individuals.
        </Text>
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
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 5,
    marginHorizontal: 5,
  },
  listContainer: {
    paddingBottom: 10,
    padding: 5,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  squadCard: {
    backgroundColor: '#ffff',
    borderRadius: 15,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  coverImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  header: {
    marginBottom: 15,
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 5,
  },
  description: {
    color: '#666666',
    marginBottom: 5,
  },
  searchInput: {
    borderRadius: 14,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    height: 35,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowColor: '#000',
    marginBottom: 5,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    top: -25,
    left: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  squadDetails: {
    padding: 10,
    paddingTop: 30,
  },
  squadName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  status: {
    fontSize: 10,
    marginTop: -4,
  },
  moderated: {
    color: 'red',
  },
  addPost: {
    color: 'green',
  },
  members: {
    color: '#666666',
    fontSize: 10,
  },
  connectionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  connectorImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
  },
  connectionsCount: {
    marginLeft: 30,
    fontSize: 12,
    color: '#333',
  },
  joinButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loadingButton: {
    backgroundColor: 'orange', // Change button color to orange after loading
  },
  joinButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  spinner: {
    marginRight: 5,
  },
});

export default JoinSquads;
