import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TextInput, TouchableOpacity, Modal, Button } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';

const ChallengePage = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cart, setCart] = useState([]);

  const handleSidebarItemPress = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleCategoryCardPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    setModalVisible(false);
  };

  // Filter categories based on search query
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter relevant products based on selected category and search query
  const relevantProducts = selectedCategory 
    ? filteredCategories.filter(category => category.name.includes(selectedCategory))
    : filteredCategories;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput 
          style={styles.searchBar} 
          placeholder="Search for items..." 
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('cart', { cartItems: cart })}>
          <MaterialCommunityIcons name="cart-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <ScrollView style={styles.sidebar} showsVerticalScrollIndicator={true}>
          {sidebarCategories.map((category, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.sidebarItem} 
              onPress={() => handleSidebarItemPress(category.name)}
            >
              <MaterialCommunityIcons name={category.icon} size={24} color="#333" />
              <Text style={styles.sidebarText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView style={styles.content}>
          <View style={styles.banner}>
            <Image
              source={{ uri: 'https://example.com/banner-image.jpg' }} // Replace with your banner image URL
              style={styles.bannerImage}
            />
            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerText}>Fans Festival Sale</Text>
              <Text style={styles.bannerSubText}>Fan-tastic Deals for U</Text>
            </View>
          </View>

          <Text style={styles.topCategoriesTitle}>Top Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {relevantProducts.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryCard} onPress={() => handleCategoryCardPress(category)}>
                <Image source={category.image} style={styles.categoryImage} />
                <Text style={styles.categoryText}>{category.name}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceText}>GP{category.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ScrollView>
      </View>

      {/* Modal for Item Description */}
      {selectedItem && (
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.itemTitle}>{selectedItem.name}</Text>
              <Image source={selectedItem.image} style={styles.modalItemImage} />
              <Text style={styles.itemPrice}>Price: ${selectedItem.price}</Text>
              
              <Button title="Add to Cart" onPress={() => addToCart(selectedItem)} />

              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const sidebarCategories = [
  { name: 'Appliances', icon: 'fridge' },
  { name: 'Television', icon: 'television-classic' },
  { name: 'Kids Products', icon: 'baby-face-outline' },
  { name: 'Sneakers', icon: 'shoe-sneaker' },
  { name: 'Accessories', icon: 'cellphone' },
  { name: 'Home', icon: 'home' },
  { name: 'Health', icon: 'heart' },
  { name: 'GreenBins', icon: 'bag-suitcase' },
];

const categories = [
  { name: 'Smart Phones', image: require('../assets/smartphone.png'), price: 499.99 },
  { name: 'Televisions', image: require('../assets/Television.png'), price: 799.99 },
  { name: 'GreenBins', image: require('../assets/greenBin.png'), price: 199.99 },
  { name: 'Accessories', image: require('../assets/refurbished.png'), price: 299.99 },
  { name: 'SmartPhones', image: require('../assets/earphones.png'), price: 99.99 },
  { name: 'Household Appliances', image: require('../assets/Appliance.png'), price: 249.99 },
  { name: 'Home Storage', image: require('../assets/storage.png'), price: 59.99 },
  { name: 'Sneakers', image: require('../assets/sneakers.png'), price: 149.99 },
  { name: 'Woofers', image: require('../assets/woofer.png'), price: 399.99 },
  { name: 'Watches', image: require('../assets/watches.png'), price: 199.99 },
  { name: 'Health', image: require('../assets/genetic.png'), price: 29.99 },
  { name: 'Clothes', image: require('../assets/clothes.png'), price: 49.99 },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'column',
    width: 404,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  cartButton: {
    padding: 10,
  },
  mainContent: {
    flexDirection: 'row',
    flex: 1,
    width: 250
  },
  sidebar: {
    width: 50,
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sidebarItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15,
  },
  sidebarText: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingLeft: 10,
  },
  banner: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#ffc107',
    marginBottom: 10,
    borderRadius: 15,
  },
  bannerImage: {
    width: 300,
    height: 150,
    borderRadius: 10,
  },
  bannerTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: 250,
  },
  bannerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  bannerSubText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  topCategoriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  categoriesContainer: {
    flexDirection: 'row',
  },
  categoryCard: {
    width: 100,
    height: 120,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  categoryImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  priceContainer: {
    backgroundColor: '#e74c3c',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginTop: 5,
  },
  priceText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItemImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  itemDescription: {
    fontSize: 12,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChallengePage;
