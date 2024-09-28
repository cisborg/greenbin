import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, Image, SafeAreaView, Animated, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Color } from '../../GlobalStyles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

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
  const [loadingSquads, setLoadingSquads] = useState({});
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

  const handleJoinPress = (id) => {
    setLoadingSquads((prev) => ({ ...prev, [id]: true }));

    setTimeout(() => {
      setLoadingSquads((prev) => ({ ...prev, [id]: false }));
    }, 1000); // Simulate loading for 1 second
  };

  const renderSquadItem = ({ item }) => {
    const isLoading = loadingSquads[item.id];

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
          <TouchableOpacity 
            style={styles.joinButton} 
            onPress={() => handleJoinPress(item.id)}
          >
            {isLoading ? (
              <Text style={styles.joinButtonText}>Pending...</Text>
            ) : (
              <Text style={styles.joinButtonText}>Join</Text>
            )}
            {isLoading && <ActivityIndicator size="small" color="#FFF" style={styles.spinner} />}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: animatedValue }}>
        <View style={styles.header}>
          <View style={styles.heading}>
            <Text style={styles.title}>Discover Squads Now! 🚀</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('GreenDaily')}>
            <FontAwesome6 name="users-viewfinder" size={24} color="green" />
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
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
  },
  listContainer: {
    paddingBottom: 20,
    padding: 10
  },
  heading: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
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
    height: width * 0.25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'lightgray'
  },
  header: {
    marginBottom: 20,
    padding:10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
    padding: 10,
    marginRight: -20
  },
  description: {
    color: '#666666',
    marginBottom: 10,
  },
  searchInput: {
    borderColor: Color.colorGray_100,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
    padding: 10
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
  status: {
    fontSize: 12,
  },
  moderated: {
    color: 'red',
  },
  addPost: {
    color: 'green',
  },
  members: {
    color: '#666666',
    fontSize: 11,
  },
  joinButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  joinButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  spinner: {
    marginLeft: 5,
  },
});

export default JoinSquads;
