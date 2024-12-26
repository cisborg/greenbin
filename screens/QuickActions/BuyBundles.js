import React, { useState } from 'react';
import { View, Text, TextInput,  FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BuyScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false); 

  const handleToggleSearch = () => {
    setIsSearchVisible(!isSearchVisible); // Toggle search bar visibility
  };
  
  // Jack's stats
  const jackStats = {
    invites: 0, // Default value
    coupons: 0, // Default value
    products: 0 // Default value
  };

  const shoppingLists = [
    { id: '1', owner: "John's List", products: 5, invites: 3, coupons: 2 },
    { id: '2', owner: "Jane's List", products: 8, invites: 1, coupons: 0 },
    // Add more sample lists as needed
  ];

  const handleJoinList = (listId) => {
    navigation.navigate('JoinList', { listId });
  };

  const handleAddList = () => {
    navigation.navigate('SubscribedProducts'); // Navigate to Products.js
  };


  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={{ uri: 'profile_picture_url' }} style={styles.profilePic} />
        <TouchableOpacity onPress={handleToggleSearch}>
            <Text style={styles.icon}>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ListCodeNotification')}>
            <Text style={styles.icon}>🔔</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Products')}>
            <Text style={styles.icon}>➕</Text> {/* Add icon */}
        </TouchableOpacity>
    </View>

      
      {/* Jack's Stats Section */}
      <View style={styles.statsContainer}>
        <Text>Invites: {jackStats.invites}</Text>
        <Text>Coupons: {jackStats.coupons}</Text>
        <Text>Products: {jackStats.products}</Text>
        <TouchableOpacity 
          style={[styles.addButton, jackStats.products > 0 ? styles.disabledButton : null]} 
          onPress={jackStats.products === 0 ? handleAddList : null}
          disabled={jackStats.products > 0}
        >
          <Text style={styles.addButtonText}>Add List</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.viewProductsButton} 
          onPress={handleAddList}
        >
          <Text style={styles.viewProductsButtonText}>View Products</Text>
        </TouchableOpacity>
      </View>

      {isSearchVisible && (
        <TextInput
          style={styles.searchBar}
          placeholder="Search shopping lists..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      )}

      <FlatList
        data={shoppingLists.filter(list => list.owner.toLowerCase().includes(searchQuery.toLowerCase()))}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleJoinList(item.id)}>
            <Text style={styles.cardTitle}>{item.owner}</Text>
            <Text>Products: {item.products}</Text>
            <Text>Invites: {item.invites}</Text>
            <Text>Coupons: {item.coupons}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Footer */}
      <Text style={styles.footer}>Promote green circular economy today!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  icon: {
    fontSize: 24,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 14,
    padding: 10,
    marginVertical: 10,
  },
  statsContainer: {
    flexDirection: 'column',
    marginVertical: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  viewProductsButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  viewProductsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default BuyScreen;
