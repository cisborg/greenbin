import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Color } from '../GlobalStyles';

const ChallengePage = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSidebarItemPress = (categoryName) => {
    // Handle sidebar item press
  };

  // Filter categories based on search query
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard} onPress={() => navigation.navigate('VendorProducts')}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
      </View>

      <View style={styles.mainContent}>
        <View style={styles.header}>
          <TextInput 
            style={styles.searchBar} 
            placeholder="Discover Ecogreen products..." 
            placeholderTextColor={Color.colorGray_100}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('cart')}>
            <FontAwesome6 name="cart-plus" size={24} color="#32CD32" />
          </TouchableOpacity>
        </View>

        <View style={styles.banner}>
          <Image
            source={{ uri: 'https://example.com/banner-image.jpg' }} // Replace with your banner image URL
            style={styles.bannerImage}
          />
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerText}>Fun Green Sales Today</Text>
            <Text style={styles.bannerSubText}>Fan-tastic Deals for U</Text>
          </View>
        </View>

        <Text style={styles.topCategoriesTitle}>Top Categories</Text>
        <FlatList
          data={filteredCategories}
          renderItem={renderCategoryItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={4} // Display 4 items per row
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.categoriesContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const sidebarCategories = [
  { name: 'Appliances', icon: 'fridge' },
  { name: 'Television', icon: 'television-classic' },
  { name: 'Kids Products', icon: 'baby-face-outline' },
  { name: 'Sneakers', icon: 'shoe-sneaker' },
  { name: 'Smart', icon: 'cellphone' },
  { name: 'Home', icon: 'home' },
  { name: 'Health', icon: 'heart' },
  { name: 'Bags', icon: 'bag-suitcase' },
];

const categories = [
  { name: 'Smart Phones', image: require('../assets/smartphone.png'), price: '$499.99' },
  { name: 'Televisions', image: require('../assets/Television.png'), price: '$799.99' },
  { name: 'Kitchen Supplies', image: require('../assets/kitchen.png'), price: '$199.99' },
  { name: 'Refurbished Phones', image: require('../assets/refurbished.png'), price: '$299.99' },
  { name: 'Earphones', image: require('../assets/earphones.png'), price: '$99.99' },
  { name: 'Household Appliances', image: require('../assets/Appliance.png'), price: '$249.99' },
  { name: 'Home Storage', image: require('../assets/storage.png'), price: '$59.99' },
  { name: 'Sneakers', image: require('../assets/sneakers.png'), price: '$149.99' },
  { name: 'Woofers', image: require('../assets/woofer.png'), price: '$199.99' },
  { name: 'Watches', image: require('../assets/watches.png'), price: '$99.99' },
  { name: 'Beauty & Personal Care', image: require('../assets/beauty.png'), price: '$49.99' },
  { name: 'Clothes', image: require('../assets/clothes.png'), price: '$29.99' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
    overflow: 'hidden',
    flexDirection: 'row'
  },
  sidebar: {
    width: '15%', // Reduced width for sidebar
    backgroundColor: '#f4f4f4',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sidebarItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15,
  },
  sidebarText: {
    fontSize: 10,
    color: '#333',
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
  },
  searchBar: {
    flex: 1,
    height: 34,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cartButton: {
    padding: 10,
  },
  banner: {
    width: '100%',
    height: 130,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#ffc107',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerTextContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bannerSubText: {
    fontSize: 14,
    color: '#555',
  },
  topCategoriesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoriesContainer: {
    paddingBottom: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryCard: {
    width: '22%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginRight: 10,
    elevation: 3, // For subtle shadow effect
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
    textAlign: 'center',
  },
  priceContainer: {
    marginTop: 5,
  },
  priceText: {
    fontSize: 14,
    color: '#32CD32',
    fontWeight: 'bold',
  },
});

export default ChallengePage;
