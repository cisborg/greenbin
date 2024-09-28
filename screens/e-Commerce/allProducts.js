import React from 'react';
import { View, Text, Image, StyleSheet, SectionList, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const ItemGridScreen = ({ navigation }) => {
  const DATA = [
    {
      title: "Recommended For You",
      data: [
        { title: 'Top-Handle Bags', image: require('../../assets/Bags.png'), rating: 4 },
        { title: 'Crossbody Bags', image: require('../../assets/Bags.png'), rating: 5 },
        { title: 'Tote Bags', image: require('../../assets/Bags.png'), rating: 3 },
        { title: 'Shoulder Bags', image: require('../../assets/Bags.png'), rating: 4 },
        { title: 'Fashion Backpacks', image: require('../../assets/Bags.png'), rating: 5 },
        { title: 'Wallets & Holders', image: require('../../assets/Bags.png'), rating: 4 },
      ],
    },
    {
      title: "Latest in Store",
      data: [
        { title: 'Fashion Backpacks', image: require('../../assets/beauty.png'), rating: 4 },
        { title: 'Wallets & Holders', image: require('../../assets/refurbished.png'), rating: 5 },
        { title: 'Cross-Body Sling Bags', image: require('../../assets/Bags.png'), rating: 3 },
        { title: 'Shoulder Bags', image: require('../../assets/refurbished.png'), rating: 4 },
        { title: 'Waist Packs', image: require('../../assets/clothes.png'), rating: 2 },
      ],
    },
    {
      title: 'Mostly Purchased',
      data: [
        { title: 'Travel Bags', image: require('../../assets/Appliance.png'), rating: 5 },
        { title: 'Suitcases', image: require('../../assets/genetic.png'), rating: 4 },
        { title: 'Gym Bags', image: require('../../assets/earphones.png'), rating: 3 },
      ],
    },
  ];

  const handleProductClick = (item) => {
    navigation.navigate('productDetail', { product: item });
  };

  const handleViewAllClick = (sectionTitle) => {
    navigation.navigate('VendorProducts', { category: sectionTitle });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductClick(item)}>
      <View style={styles.productContainer}>
        <Image source={item.image} style={styles.productImage} />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.rating}>{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSection = ({ section }) => (
    <View style={styles.sectionContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{section.title}</Text>
        <TouchableOpacity style={styles.viewAllContainer} onPress={() => handleViewAllClick(section.title)}>
          <Text style={styles.viewAll}>View All</Text>
          <MaterialIcons name="arrow-forward-ios" size={17} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={section.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.title + index}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item.title + index}
        renderSectionHeader={({ section }) => renderSection({ section })}
        renderItem={() => null}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAll: {
    fontSize: 16,
    color: '#808080',
    marginRight: 5,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  productContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    width: width / 4 - 20, // Adjust width to fit 4 items in a row with spacing
    margin: 5,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  productTitle: {
    fontSize: 11,
    fontWeight: '400',
    marginBottom: 5,
    textAlign: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#FFD700',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default ItemGridScreen;
