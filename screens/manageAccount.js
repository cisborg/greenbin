import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const ManageAccountScreen = () => {
  const menuItems = [
    { title: 'View Balance', description: 'View your current account balance' },
    { title: 'View & Add Account', description: 'View and add more accounts' },
    { title: 'Help And Support', description: 'Help on your fingertips' },
    { title: 'Transaction History', description: 'View transaction history' },
    { title: 'Manage Services', description: 'Activate/Deactivate your services' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Account</Text>
      <ScrollView>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
          >
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Text style={styles.menuDescription}>{item.description}</Text>
          </TouchableOpacity>
        ))}

        {/* Image Container */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/again.jpg")} // Replace with your image URL
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    width: 409,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'lightgreen',
    left: 60,
  },
  menuItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  menuDescription: {
    fontSize: 14,
    color: '#666',
  },
  imageContainer: {
    marginTop: 40,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.2,
    shadowRadius: 6,
    transform: [
      {perspective: 800},
      {rotateY: '7deg'},
      {rotateX: '7deg'},]
  },
  image: {
    width: '100%',
    height: 200, // Adjust height as needed
  },
});

export default ManageAccountScreen;
