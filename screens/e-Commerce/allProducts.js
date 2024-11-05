import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, SectionList, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const ItemGridScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Use a flag to track if more items are loading
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchData = () => {
    setLoading(true);
    // Simulate fetching data
    const DATA = [
      {
        title: "Recommended",
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
          { title: 'Suitcases', image: require('../../assets/genetic.png'), rating: 2 },
          { title: 'Gym Bags', image: require('../../assets/earphones.png'), rating: 3 },
        ],
      },
    ];
    setData(prevData => [...prevData, ...DATA]);
    setLoading(false);
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, [page]);

  // Handle item click to navigate to product details
  const handleProductClick = (item) => {
    navigation.navigate('productDetail', { product: item });
  };

  // Handle "View All" button click for each section
  const handleViewAllClick = (sectionTitle) => {
    navigation.navigate('Products', { category: sectionTitle });
  };

  // Render each product item in the grid
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductClick(item)}>
      <View style={styles.productContainer}>
        <Image source={item.image || require('../../assets/Bags.png')} style={styles.productImage} />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.rating}>{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</Text>
      </View>
    </TouchableOpacity>
  );

  // Render a section with products
  const renderSection = ({ section }) => (
    <View style={styles.sectionContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{section.title}</Text>
        <TouchableOpacity style={styles.viewAllContainer} onPress={() => handleViewAllClick(section.title)}>
          <Text style={styles.viewAll}>View All</Text>
          <MaterialIcons name="arrow-forward-ios" size={14} color="green" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={section.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${section.title}-${item.title}-${index}`}  
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        scrollEnabled={false} // Prevent FlatList from taking over scroll
      />
    </View>
  );

  // Load more items when user scrolls to the end
  const loadMore = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      setPage(prevPage => prevPage + 1);
      setLoadingMore(false); // Reset flag
    }
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => `${item.title}-${index}`}  
        renderSectionHeader={({ section }) => renderSection({ section })}
        renderItem={() => null} // To avoid duplicate rendering in SectionList
        stickySectionHeadersEnabled={false}
        onEndReached={loadMore} // Trigger when user reaches end
        onEndReachedThreshold={0.5} // Load more items when halfway through
        ListFooterComponent={loadingMore ? <ActivityIndicator size="large" color="blue" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',

  },
  viewAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAll: {
    fontSize: 14,
    color: '#808080',
    marginRight: 5,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  productContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    width: width / 3.5 - 20, // Adjusted width to fit 3 items per row
    margin: 5,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 60,
    borderRadius: 12,
    marginBottom: 2,
  },
  productTitle: {
    fontSize: 10,
    fontWeight: '400',
    marginBottom: 1,
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
