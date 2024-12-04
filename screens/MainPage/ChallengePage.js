import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FastImage from 'react-native-fast-image';
import { Color } from '../../GlobalStyles';
import ItemGridScreen from '../e-Commerce/allProducts';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions/products';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const ChallengePage = () => {
  const dispatch = useDispatch();
  const { products, productsLoading, productsError } = useSelector(state => state.products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = sidebarCategories;
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalProductsCount = products?.length || 0;

  const bannerImages = [
    { uri: "https://your-image-url.com/greenFriday.png" },
    { uri: "https://your-image-url.com/greenPoints.png" },
    { uri: "https://your-image-url.com/Bags.png" },
    { uri: "https://your-image-url.com/connect.png" },
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000);
  
    return () => clearInterval(interval);
  }, [fadeAnim, bannerImages.length]);

  const handleSidebarItemPress = (categoryName) => {
    setSelectedCategory(categoryName);
    onRefresh();
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts());
    };
    fetchData();
  }, [dispatch]);

  const handleHomePress = () => {
    setSelectedCategory(null);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchProducts());
    setRefreshing(false);
  };

  const loadMoreItems = async () => {
    if (!loadingMore && filteredProducts.length < totalProductsCount) {
      setLoadingMore(true);
      await dispatch(fetchProducts(currentPage + 1));
      setCurrentPage(prevPage => prevPage + 1);
      setLoadingMore(false);
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productCard} onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}>
      <FastImage source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderListHeader = useMemo(() => (
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
        <FastImage
          source={bannerImages[currentImageIndex]}
          style={styles.bannerImage}
          resizeMode={FastImage.resizeMode.COVER}
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
  ), [searchQuery, currentImageIndex]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.container}>
          <View style={styles.sidebar}>
            <TouchableOpacity style={styles.homeContainer} onPress={handleHomePress}>
              <FastImage source={require('../../assets/menu.jpg')} style={styles.homeImage} resizeMode={FastImage.resizeMode.CONTAIN} />
              <Text style={styles.homeText}>Home</Text>
            </TouchableOpacity>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.sidebarItem}
                  onPress={() => handleSidebarItemPress(item.name)}
                >
                  <MaterialCommunityIcons name={item.icon} size={20} color="#333" />
                  <Text style={styles.sidebarText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={styles.mainContent}>
            {renderListHeader()}

            {productsLoading ? (
                <LottieView
                source={require('../../assets/lottie/rotateLoad.json')} // Adjust the path to your Lottie file
                autoPlay
                loop
                style={styles.lottie}
              />
            ) : productsError ? (
              <Text style={styles.errorText}>No products available.</Text>
            ) : selectedCategory ? (
              <ItemGridScreen 
                selectedCategory={selectedCategory}
                onRefresh={onRefresh}
                loadMoreItems={loadMoreItems}
                navigation={navigation}
                onEndReached={() => handleSidebarItemPress(selectedCategory)}
              />
            ) : (
              <FlashList
                data={filteredProducts}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={4}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.categoriesContainer}
                ListFooterComponent={
                  loadingMore ? (
                    <ActivityIndicator size="small" color="green" />
                  ) : (
                    <View style={{ paddingVertical: 20 }} />
                  )
                }
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                estimatedItemSize={40}
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
  { name: 'Sneaker', icon: 'shoe-sneaker' },
  { name: 'Smart', icon: 'cellphone' },
  { name: 'Health', icon: 'heart' },
  { name: 'Bags', icon: 'bag-suitcase' },
  { name: 'Electronics', icon: 'phone' },
  { name: 'Books', icon: 'book-open-variant' },
  { name: 'Garden & Outdoors', icon: 'leaf' },
];


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 6,
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
  lottie: {
    width: width * 0.3, // Adjust size as needed
    height: height * 0.3,
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
