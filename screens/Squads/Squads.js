import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Color } from '../../GlobalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get('window');

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
  const animatedValue = new Animated.Value(0);

  // Start the animation
  Animated.timing(animatedValue, {
    toValue: 1,
    duration: 700,
    useNativeDriver: true,
  }).start();

  const filteredSquads = squadsData.filter(squad =>
    squad.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    squad.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSquadItem = ({ item }) => {
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
          <TouchableOpacity 
            style={styles.viewButton} 
            onPress={() => {
              if (item.status === 'moderated') {
                navigation.navigate('ViewSquads', { squadName: item.name });
              } else if (item.status === 'add post') {
                navigation.navigate('ViewSquads2', { squadName: item.name });
              }
            }}
          >
            <Text style={styles.viewButtonText}>Explore</Text>
          </TouchableOpacity>
          <Text style={styles.squadName}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.status}>{item.status}</Text>
          <Text style={styles.members}>{item.members}</Text>

          {/* Connections Count Section */}
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
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: animatedValue }}>
        <View style={styles.header}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search your favorite squads.."
            placeholderTextColor={Color.colorGray_100}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <FlatList
            data={filteredSquads}
            renderItem={renderSquadItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </ScrollView>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => navigation.navigate('createSquad')}>
          <AntDesign name="pluscircle" size={45} color="#61dafb" />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  scrollView: {
    paddingBottom: 20,
  },
  squadCard: {
    backgroundColor: '#ffff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  coverImage: {
    width: '100%',
    height: width * 0.25, // Responsive height
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'lightgray'
  },
  header: {
    marginBottom: 20,
  },
  searchInput: {
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowColor: '#000',
    shadowRadius: 3,
    elevation: 2,
    marginVertical: 10
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
    paddingTop: 40,
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
});

export default JoinSquads;
