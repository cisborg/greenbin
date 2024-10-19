import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SectionList, TouchableOpacity, Dimensions } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { WaveIndicator } from 'react-native-indicators'; // Import WaveIndicator
import { FlashList } from '@shopify/flash-list'; // Import FlashList

const { width } = Dimensions.get('window');

const ItemGridScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true); // Loading state
  const [data, setData] = useState([]); // State for data
  const [page, setPage] = useState(1); // Current page
  const [loadingMore, setLoadingMore] = useState(false); // Loading more items state

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
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
      setData(DATA); // Set initial data
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    // Simulate fetching more data when scrolling reaches the end
    if (loadingMore) {
      const timer = setTimeout(() => {
        // Here you would typically fetch more data
        setPage((prevPage) => prevPage + 1);
        setLoadingMore(false); // Reset loading more state
      }, 1500); // Simulate network delay

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [loadingMore]);

  const handleProductClick = (item) => {
    navigation.navigate('productDetail', { product: item });
  };

  const handleViewAllClick = (sectionTitle) => {
    navigation.navigate('VendorProducts', { category: sectionTitle });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductClick(item)}>
      <View style={styles.productContainer}>
        <Image source={item.image || require('../../assets/Bags.png')} style={styles.productImage} />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.rating}>
          {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
        </Text>
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
  
      <FlashList
        data={section.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${section.title}-${item.title}-${index}`}  
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        onEndReached={() => {
          if (!loadingMore) {
            setLoadingMore(true); // Set loading more state
          }
        }}
        onEndReachedThreshold={0.5} // Trigger when 50% of the list is visible
        estimatedItemSize={100} // Estimate item size for performance
      />
    </View>
  );
  
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <WaveIndicator size={100} color='green' /> {/* WaveIndicator */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => `${item.title}-${index}`}  
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
    width: width / 3.5 - 20, // Adjusted width to fit 3 items per row
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
