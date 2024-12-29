import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity,Dimensions, ActivityIndicator, Animated, Modal, ScrollView, TextInput } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import FastImage from 'react-native-fast-image';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import { Swipeable } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

import { fetchProducts, fetchBrands, addFavorite, addToCart } from '../../redux/actions/products'; // Import necessary actions

const ProductCard = ({ item }) => {
  const handleAddToFavorites = () => {
    dispatch(addFavorite(item)); // Dispatch add to favorites action
  };

  const handleAddToCart = () => {
    dispatch(addToCart(item)); // Dispatch add to cart action
  };
  const renderRightActions = () => (
    <View style={styles.swipeActions}>
      <TouchableOpacity onPress={handleAddToFavorites} style={styles.actionButton}>
        <Ionicons name="heart-outline" size={24} color="red" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAddToCart} style={styles.actionButton}>
        <Ionicons name="cart-outline" size={24} color="orange" />
      </TouchableOpacity>
    </View>
  );
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.card}>
        <FastImage source={item.image} style={styles.productImage} resizeMode={FastImage.resizeMode.cover} />
        <View style={styles.infoContainer}>
          <Text style={styles.productTitle}>{item.title}</Text>
          {item.originalPrice && (
            <View style={styles.priceContainer}>
              <Text style={styles.originalPrice}>{item.originalPrice} GCP</Text>
              <Text style={styles.discountedPrice}>{item.price} GCP</Text>
              <Text style={styles.discountBadge}>{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF</Text>
            </View>
          )}
        </View>
      </View>
    </Swipeable>
  );
};

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading,error,brands }= useSelector(state => ({
    products: state.products.products,
    loading: state.products.loading,
    error: state.products.error,
    brands: state.products.products.brands,
  }));
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Best Match');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [brandFilters, setBrandFilters] = useState({});
  const [priceRanges, setPriceRanges] = useState({ low: false, medium: false, high: false });
  const animation = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts()); // Fetch products from the backend
      await dispatch(fetchBrands()); // Fetch brands from the backend
      setIsScreenLoading(false);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const refreshProducts = () => {
    setIsRefreshing(true);
    dispatch(fetchProducts()); // Refresh products from the backend
    setIsRefreshing(false);
  };

  const addToFavorites = (item) => {
    dispatch(addFavorite(item)); // Dispatch add favorite action
    setFavorites([...favorites, item]);
  };

  const addToCart = (item) => {
    dispatch(addToCart(item)); // Dispatch add to cart action
    setCartCount(cartCount + 1);
  };

  const sortProducts = (sortOrder) => {
    let sortedProducts;
    if (sortOrder === 'PriceLowHigh') {
      sortedProducts = [...products].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'PriceHighLow') {
      sortedProducts = [...products].sort((a, b) => b.price - a.price);
    }
    return sortedProducts;
  };

  const filterProducts = () => {
    let filteredProducts = products;

    // Filter by brands
    const selectedBrands = Object.keys(brandFilters).filter(brand => brandFilters[brand]);
    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter(product => selectedBrands.includes(product.brand));
    }

    // Filter by price ranges
    if (priceRanges.low) {
      filteredProducts = filteredProducts.filter(product => product.price < 1000);
    }
    if (priceRanges.medium) {
      filteredProducts = filteredProducts.filter(product => product.price >= 1000 && product.price < 1500);
    }
    if (priceRanges.high) {
      filteredProducts = filteredProducts.filter(product => product.price >= 1500);
    }

    return filteredProducts;
  };

  const handleSortChange = (value) => {
    setSelectedSort(value);
    const sortedProducts = sortProducts(value);
    setProducts(sortedProducts); // Update products with sorted results
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredProducts = products.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#388e3c" style={{ margin: 10 }} />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {isScreenLoading ? (
        <View style={styles.loadingContainer}>
          <LottieView
            source={require('../../assets/lottie/rotateLoad.json')} 
            autoPlay
            loop
            style={styles.lottie}
          />
    </View>  
      ) : (
        <Animated.View style={[styles.container, { opacity: animation }]}>
          {/* Header Section */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={20} color="black" />
            </TouchableOpacity>
            <TextInput 
              style={styles.searchBar} 
              placeholder="Search products..." 
              value={searchQuery} 
              onChangeText={handleSearch} 
            />
            <TouchableOpacity onPress={() => navigation.navigate('cart')}>
              <FontAwesome5 name="cart-plus" size={24} color="black" />
              {cartCount > 0 && <Text style={styles.cartCount}>{cartCount}</Text>}
            </TouchableOpacity>
          </View>

          <View style={styles.sortFilterRow}>
            <View style={styles.pickerContainer}>
              <Picker selectedValue={selectedSort} onValueChange={handleSortChange} style={{ height: 40, width: 150, borderRadius: 14 }}>
                <Picker.Item label="Best Match" value="Best Match" />
                <Picker.Item label="Price: Low to High" value="PriceLowHigh" />
                <Picker.Item label="Price: High to Low" value="PriceHighLow" />
              </Picker>
            </View>
            <TouchableOpacity onPress={() => setShowFilterModal(true)}>
              <Ionicons name="filter-outline" size={28} color="black" />
            </TouchableOpacity>
          </View>

          {error ? (
            <View style={styles.errorContainer}>
            <LottieView
              source={require('../../assets/lottie/errorLottie.json')} // Replace with your error animation file
              autoPlay
              loop
              style={styles.lottie}
            />
            <Text style={styles.errorMessage}>Oops! Something went wrong.</Text>
        </View>
          ) : (
            <FlatList
              data={filterProducts()} // Apply filtering here
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ProductCard item={item} addToFavorites={addToFavorites} addToCart={addToCart} />
              )}
              numColumns={2}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooter}
              refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshProducts} />}
            />
          )}

          <Modal visible={showFilterModal} animationType="fade" transparent>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Filter Products</Text>
                <ScrollView>
                  {/* Brand Filter Section */}
                  <Text style={{ color: 'green', marginBottom: 5, fontWeight: '500' }}>Brand Filter</Text>
                  {brands.map((brand) => (
                    <View key={brand.id} style={styles.checkboxContainer}>
                      <BouncyCheckbox
                        isChecked={brandFilters[brand.name] || false}
                        onPress={() => setBrandFilters({ ...brandFilters, [brand.name]: !brandFilters[brand.name] })}
                      />
                      <Text style={{ marginLeft: 5 }}>{brand.name}</Text>
                    </View>
                  ))}
                  
                  {/* Price Range Section */}
                  <Text style={{ color: 'green', marginBottom: 5, fontWeight: '500' }}>Price Range</Text>
                  <View style={styles.checkboxContainer}>
                    <BouncyCheckbox
                      isChecked={priceRanges.low}
                      onPress={() => setPriceRanges({ ...priceRanges, low: !priceRanges.low })}
                    />
                    <Text style={{ marginLeft: 5 }}>Below 1000 GCP</Text>
                  </View>
                  <View style={styles.checkboxContainer}>
                    <BouncyCheckbox
                      isChecked={priceRanges.medium}
                      onPress={() => setPriceRanges({ ...priceRanges, medium: !priceRanges.medium })}
                    />
                    <Text style={{ marginLeft: 5 }}>1000 - 1500 GCP</Text>
                  </View>
                  <View style={styles.checkboxContainer}>
                    <BouncyCheckbox
                      isChecked={priceRanges.high}
                      onPress={() => setPriceRanges({ ...priceRanges, high: !priceRanges.high })}
                    />
                    <Text style={{ fontSize: 14 }}>Above 1500 GCP</Text>
                  </View>
                  
                  {/* Apply Button */}
                  <TouchableOpacity style={styles.apply} onPress={filterProducts}>
                    <Text style={styles.applyText}>Apply</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
 
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  actionButton: {
    width: width * 0.1,
    height: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Background color for action buttons
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
},
  errorMessage: {
      color: 'red',
      fontSize: 16,
      textAlign: 'center',
      marginTop: 10,
  },
  lottie: {
    width: width * 0.3, // Adjust size as needed
    height: height * 0.3,
  },
  container: {
    flex: 1,
    padding: '0.50%',
    backgroundColor: '#fff',
  },
  applyText: {
     fontSize: 14,
     fontWeight: 'bold',
     color: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
    width: '95%',
  },
  searchBar: {
    flex: 1,
    height: 35,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 17,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    width: 50
  },
  cartCount: {
    position: 'absolute',
    top: -8,
    right: -17,
    backgroundColor: 'green',
    color: 'white',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: 25,
    fontSize: 11,
  },
  sortFilterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    padding: 1,
    borderRadius: 20,
    borderWidth: 1,
    width: 150,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 9,
    borderRadius: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  swipeActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#388e3c',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 17,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '75%', // Width of the modal
    maxHeight: '80%', // Maximum height of the modal
    padding: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 14,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'flex-start',
  },
  apply: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  productImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  infoContainer: {
    marginTop: 10,
  },
  productTitle: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: 9,
    color: 'grey',
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  discountedPrice: {
    fontSize: 10,
    color: 'green',
  },
  discountBadge: {
    fontSize: 12,
    color: 'red',
    marginLeft: 5,
  },
 
});

export default Products;
