import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Animated,
  RefreshControl,
  Platform,
  StatusBar,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Color } from '../../GlobalStyles';
import ItemGridScreen from '../e-Commerce/allProducts'; // Assuming ItemGridScreen is a component to display grid
import { useNavigation } from '@react-navigation/native';

const ChallengePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [data, setData] = useState(categories); // Data to display in FlatList
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animation value

  // State for the image banner
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const bannerImages = [
    require('../../assets/greenFriday.png'),
    require('../../assets/greenPoints.png'),
    require('../../assets/Bags.png'),
    require('../../assets/connect.png'),
  ];

  useEffect(() => {
    // Start the fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    // Image carousel functionality
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000); // Change image every four seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [fadeAnim]);

  const handleSidebarItemPress = (categoryName) => {
    setSelectedCategory(categoryName);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const handleHomePress = () => {
    setSelectedCategory(null); // Reset selected category to show the main categories
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate a network request
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const loadMoreItems = async () => {
    if (!loading) {
      setLoading(true);
      // Simulate loading more items
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
      setData(prevData => [...prevData, ...categories]); // Add more items
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard} onPress={() => navigation.navigate('VendorProducts')}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.container}>
          {/* Sidebar */}
          <View style={styles.sidebar}>
            <TouchableOpacity style={styles.homeContainer} onPress={handleHomePress}>
              <Image source={require('../../assets/home.png')} style={styles.homeImage} />
              <Text style={styles.homeText}>Home</Text>
            </TouchableOpacity>
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

          {/* Main content area */}
          <ScrollView 
            ref={scrollViewRef} 
            style={styles.mainContent} 
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.header}>
              <TextInput
                style={styles.searchBar}
                placeholder="Discover Ecogreen products..."
                placeholderTextColor={Color.colorGray_100}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity onPress={() => navigation.navigate('cart')}>
                <FontAwesome6 name="cart-plus" size={24} color="#32CD32" />
              </TouchableOpacity>
            </View>

            {/* Banner with animated images */}
            <View style={styles.banner}>
              <Image
                source={bannerImages[currentImageIndex]}
                style={styles.bannerImage}
                resizeMode="cover"
              />
              <View style={styles.dotsContainer}>
                {bannerImages.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      currentImageIndex === index && styles.activeDot,
                    ]}
                  />
                ))}
              </View>
            </View>

            {selectedCategory ? (
              <ItemGridScreen 
                selectedCategory={selectedCategory} 
                onRefresh={onRefresh} // Pass refresh handler
                loadMoreItems={loadMoreItems} // Pass load more items handler
                navigation={navigation} // Pass navigation handler
              />
            ) : (
              <>
                <Text style={styles.topCategoriesTitle}>Top Categories</Text>
                <FlatList
                  data={filteredCategories}
                  renderItem={renderCategoryItem}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={4}
                  columnWrapperStyle={styles.row}
                  contentContainerStyle={styles.categoriesContainer}
                  showsVerticalScrollIndicator={false}
                  onEndReached={loadMoreItems}
                  onEndReachedThreshold={0.5}
                  ListFooterComponent={loading ? <Text style={styles.loadingText}>Loading...</Text> : <Text style={styles.loadingText}>Loaded Successfully</Text>}
                />
              </>
            )}
          </ScrollView>
        </View>
      </Animated.View>
    </SafeAreaView>
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
  { name: 'Smart Phones', image: require('../../assets/smartphone.png') },
  { name: 'Televisions', image: require('../../assets/Television.png') },
  { name: 'Kitchen Supplies', image: require('../../assets/kitchen.png') },
  { name: 'Refurbished Phones', image: require('../../assets/refurbished.png') },
  { name: 'Earphones', image: require('../../assets/earphones.png') },
  { name: 'Household Appliances', image: require('../../assets/Appliance.png') },
  { name: 'Home Storage', image: require('../../assets/storage.png') },
  { name: 'Sneakers', image: require('../../assets/sneakers.png') },
  { name: 'Woofers', image: require('../../assets/woofer.png') },
  { name: 'Watches', image: require('../../assets/watches.png') },
  { name: 'Beauty & Personal Care', image: require('../../assets/beauty.png') },
  { name: 'Clothes', image: require('../../assets/clothes.png') },
];

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
  },
  sidebar: {
    width: '15%',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRightWidth: 1,
    borderColor: '#ccc',
    marginTop: 20,
  },
  homeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20, // Spacing above sidebar items
  },
  homeImage: {
    width: 40,
    height: 40,
  },
  homeText: {
    fontSize: 11,
  },
  sidebarItem: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  sidebarText: {
    marginLeft: 5,
    fontSize: 11,
  },
  mainContent: {
    flex: 1,
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    borderRadius: 14,
    paddingHorizontal: 10,
    height: 35,
    marginRight: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  banner: {
    width: '100%',
    height: 160,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 20,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'contain',
    top: 0,
    left: 0,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#32CD32', // Active dot color
  },
  topCategoriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  categoriesContainer: {
    paddingBottom: 50, // Space for loading indicator
  },
  categoryCard: {
    flex: 1,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
    width: '100%', // Ensure the card takes full width
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    padding: 10,
  },
});

export default ChallengePage;
