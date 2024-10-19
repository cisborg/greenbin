import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  RefreshControl,
  Platform,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Color } from '../../GlobalStyles';
import ItemGridScreen from '../e-Commerce/allProducts';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list'; // FlashList import

const { width, height } = Dimensions.get('window');

const ChallengePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [data, setData] = useState(categories);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const bannerImages = [
    { uri: "https://your-image-url.com/greenFriday.png" },
    { uri: "https://your-image-url.com/greenPoints.png" },
    { uri: "https://your-image-url.com/Bags.png" },
    { uri: "https://your-image-url.com/connect.png" },
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [fadeAnim]);

  const handleSidebarItemPress = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleHomePress = () => {
    setSelectedCategory(null);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate a network request
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const loadMoreItems = async () => {
    if (!loading && data.length < categories.length) {
      setLoading(true);
      // Simulate loading more items
      await new Promise(resolve => setTimeout(resolve, 2000));
      setData(prevData => [...prevData, ...categories]); // Load more categories
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard} onPress={() => navigation.navigate('Products')}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderListHeader = () => (
    <>
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
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.container}>
          <View style={styles.sidebar}>
            <TouchableOpacity style={styles.homeContainer} onPress={handleHomePress}>
              <Image source={require('../../assets/menu.jpg')} style={styles.homeImage} />
              <Text style={styles.homeText}>Home</Text>
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
              {sidebarCategories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.sidebarItem}
                  onPress={() => handleSidebarItemPress(category.name)}
                >
                  <MaterialCommunityIcons name={category.icon} size={20} color="#333" />
                  <Text style={styles.sidebarText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.mainContent}>
            {renderListHeader()}

            {selectedCategory ? (
              <ItemGridScreen 
                selectedCategory={selectedCategory}
                onRefresh={onRefresh}
                loadMoreItems={loadMoreItems}
                navigation={navigation}
              />
            ) : (
              <FlashList
                data={filteredCategories}
                renderItem={renderCategoryItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={4}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.categoriesContainer}
                ListFooterComponent={
                  loading && data.length < categories.length ? (
                    <ActivityIndicator size="large" color="#32CD32" />
                  ) : (
                    <Text style={styles.loadingText}>Loaded Successfully</Text>
                  )
                }
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                estimatedItemSize={40} // FlashList-specific prop for optimization
                onEndReached={loadMoreItems}
                onEndReachedThreshold={0.5}
              />
            )}
          </View>
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
  { name: 'Health', icon: 'heart' },
  { name: 'Bags', icon: 'bag-suitcase' },
  { name: 'Electronics', icon: 'phone' },
  { name: 'Books', icon: 'book-open-variant' },
  { name: 'Garden & Outdoors', icon: 'leaf' },
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
    padding: 5,
    flexDirection: 'row',
    minHeight: height * 0.98,
    marginTop: -35
    
  },
  sidebar: {
    width: width * 0.17,
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRightWidth: 1,
    borderColor: '#ccc',
    marginTop: 20,
    alignItems: 'center',
  },
  homeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  homeImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  homeText: {
    fontSize: 11,
  },
  sidebarItem: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  sidebarText: {
    fontSize: 9,
  },
  mainContent: {
    flex: 1,
    marginLeft:4,
    paddingVertical: 10,
    width: width * 0.81,
    height: height * 0.99
    
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    borderColor: Color.colorGray_100,
    borderRadius: 14,
    padding: 10,
    marginRight: 10,
    height: height * 0.045,
    backgroundColor: '#f5f5f5',
  },
  banner: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#32CD32',
  },
  categoryCard: {
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 5
  },
  categoryImage: {
    width: '80%',
    height: 52,
    borderRadius: 10,
  },
  categoryText: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 10
  },
  loadingText: {
    textAlign: 'center',
    marginVertical: 10,
    color: 'green'
  },
  categoriesContainer: {
    paddingBottom: 50, // Add padding to avoid cut-off
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default ChallengePage;
