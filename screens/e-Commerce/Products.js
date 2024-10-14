import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Animated, Alert, Modal, ScrollView, TextInput, CheckBox } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { RefreshControl } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox'; // Import BouncyCheckbox

const initialProducts = [
  {
    id: '1',
    title: 'Eco-Friendly Solar Lamp',
    price: 899,
    originalPrice: 999,
    image: require('../../assets/check.png'),
    rating: 4.5,
    reviewCount: 10,
    brand: 'EcoBrand',
    isBrandOfficial: false,
    isLocalDispatch: true,
  },
  {
    id: '2',
    title: 'Recycled Plastic Chair',
    price: 1154,
    originalPrice: null,
    image: require('../../assets/clothes.png'),
    rating: 4.0,
    reviewCount: 5,
    brand: 'ReGreen',
    isBrandOfficial: true,
    isLocalDispatch: false,
  },
  {
    id: '3',
    title: 'Recycled Plastic Chair',
    price: 1154,
    originalPrice: null,
    image: require('../../assets/clothes.png'),
    rating: 4.0,
    reviewCount: 5,
    brand: 'ReGreen',
    isBrandOfficial: true,
    isLocalDispatch: false,
  },
  {
    id: '4',
    title: 'Eco-Friendly Solar Lamp',
    price: 899,
    originalPrice: 999,
    image: require('../../assets/check.png'),
    rating: 4.5,
    reviewCount: 10,
    brand: 'EcoBrand',
    isBrandOfficial: false,
    isLocalDispatch: true,
  },
 
];

const ProductCard = ({ item, addToFavorites, addToCart }) => {
  const swipeableRef = useRef(null);

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={() => (
        <View style={styles.swipeActions}>
          <TouchableOpacity onPress={() => addToCart(item)}>
            <Ionicons name="cart-outline" size={24} color="orange" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => addToFavorites(item)}>
            <Ionicons name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    >
      <TouchableOpacity style={styles.card}>
        <Image source={item.image} style={styles.productImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.productTitle}>{item.title}</Text>
          {item.originalPrice && (
            <View style={styles.priceContainer}>
              <Text style={styles.originalPrice}>{item.originalPrice} GCP</Text>
              <Text style={styles.discountedPrice}>{item.price} GCP</Text>
              <Text style={styles.discountBadge}>{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF</Text>
            </View>
          )}
          {!item.originalPrice && <Text style={styles.productPrice}>{item.price} GCP</Text>}
          <Text style={styles.productBrand}>{item.brand}</Text>
          {item.isBrandOfficial && <Text style={styles.officialBadge}>Brand Official</Text>}
          <Text style={styles.ratingText}>{item.rating} ({item.reviewCount} reviews)</Text>
          <View style={styles.ratingContainer}>
            {[...Array(Math.floor(item.rating))].map((_, index) => (
              <Ionicons key={index} name="star" size={16} color="#FFD700" />
            ))}
            {item.rating % 1 !== 0 && <Ionicons name="star-half" size={16} color="#FFD700" />}
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Best Match');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [brandFilters, setBrandFilters] = useState({ EcoBrand: false, ReGreen: false });
  const [priceRanges, setPriceRanges] = useState({ low: false, medium: false, high: false });
  const animation = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setIsScreenLoading(false));
  }, []);

  const sortProducts = (sortOrder) => {
    setIsLoading(true);
    try {
      let sortedProducts;
      if (sortOrder === 'PriceLowHigh') {
        sortedProducts = [...products].sort((a, b) => a.price - b.price);
      } else if (sortOrder === 'PriceHighLow') {
        sortedProducts = [...products].sort((b, a) => a.price - b.price);
      }
      setProducts(sortedProducts);
    } catch (error) {
      console.error("Error sorting products:", error);
      Alert.alert("Error", "There was an issue sorting the products.");
    } finally {
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    let filteredProducts = initialProducts;

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

    setProducts(filteredProducts);
    setShowFilterModal(false);
  };

  const refreshProducts = () => {
    setIsRefreshing(true);
    // Logic to refresh products from API or database
    setIsRefreshing(false);
  };

  const loadMoreProducts = () => {
    // Simulate fetching more products
    const newProducts = [
      // Example additional products
      {
        id: '5',
        title: 'New Eco Product',
        price: 1300,
        originalPrice: 1400,
        image: require('../../assets/greenBin.png'),
        rating: 4.8,
        reviewCount: 20,
        brand: 'NewBrand',
        isBrandOfficial: true,
        isLocalDispatch: true,
      },
      // Add more new products here
    ];
    setProducts(prevProducts => [...prevProducts, ...newProducts]);
  };

  const addToFavorites = (item) => {
    setFavorites([...favorites, item]);
  };

  const addToCart = (item) => {
    setCartCount(cartCount + 1);
  };

  const handleSortChange = (value) => {
    setSelectedSort(value);
    if (value === 'PriceLowHigh' || value === 'PriceHighLow') {
      sortProducts(value);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredProducts = initialProducts.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  const renderFooter = () => {
    if (!isLoading) return null;
    return <ActivityIndicator size="large" color="#388e3c" style={{ margin: 10 }} />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {isScreenLoading ? (
        <ActivityIndicator size="large" color="#388e3c" style={styles.loadingIndicator} />
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
              <FontAwesome5 name="cart-plus" size={24} color="green" />
            {cartCount > 0 && <Text style={styles.cartCount}>{cartCount}</Text>}
            </TouchableOpacity>
          </View>

          <View style={styles.sortFilterRow}>
            <View style={styles.pickerContainer}>
              <Picker selectedValue={selectedSort} onValueChange={handleSortChange}>
                <Picker.Item label="Best Match" value="Best Match" />
                <Picker.Item label="Price: Low to High" value="PriceLowHigh" />
                <Picker.Item label="Price: High to Low" value="PriceHighLow" />
              </Picker>
            </View>
            <TouchableOpacity onPress={() => setShowFilterModal(true)}>
              <Ionicons name="filter-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Products List */}
          <FlatList 
            data={initialProducts}
            renderItem={({ item }) => (
              <ProductCard 
                item={item} 
                addToFavorites={addToFavorites} 
                addToCart={addToCart} 

              />
            )}
            numColumns={2}
            keyExtractor={item => item.id}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshProducts} />}
            ListFooterComponent={renderFooter}
            onEndReached={loadMoreProducts}
            onEndReachedThreshold={0.5}
          />

          {/* Filter Modal */}
          <Modal visible={showFilterModal} animationType="slide">
            <ScrollView>
              <View style={styles.filterContainer}>
                <Text style={styles.modalTitle}>Filter Products</Text>
                
                <Text style={styles.filterLabel}>Brands</Text>
                <BouncyCheckbox
                  value={brandFilters.EcoBrand}
                  onValueChange={(value) => setBrandFilters({ ...brandFilters, EcoBrand: value })}
                />
                <Text style={styles.filterLabel}>EcoBrand</Text>

                <View styles={styles.bounce}>
                <BouncyCheckbox
                  value={brandFilters.ReGreen}
                  onValueChange={(value) => setBrandFilters({ ...brandFilters, ReGreen: value })}
                />
                <Text style={styles.filterLabel}>ReGreen</Text>
                </View>

                {/* Price Range Checkboxes */}
                <Text style={styles.filterLabel}>Price Ranges</Text>
                <BouncyCheckbox
                  value={priceRanges.low}
                  onValueChange={(value) => setPriceRanges({ ...priceRanges, low: value })}
                />
                <Text>Less than 1000 GCP</Text>
                <BouncyCheckbox
                  value={priceRanges.medium}
                  onValueChange={(value) => setPriceRanges({ ...priceRanges, medium: value })}
                />
                <Text>1000 - 1500 GCP</Text>
                <BouncyCheckbox
                  value={priceRanges.high}
                  onValueChange={(value) => setPriceRanges({ ...priceRanges, high: value })}
                />
                <Text>More than 1500 GCP</Text>

                <Button title="Apply Filters" onPress={filterProducts} />
              </View>
            </ScrollView>
          </Modal>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default Products;


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: '0.50%',
    backgroundColor: '#fff',
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
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    borderRadius: 10,
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
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    borderRadius: 10,
    color:' #ccc',
    marginTop: 10,
    width: 150,
    height: 38,
    paddingVertical: 10,
  },
  bounce: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'

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
    backgroundColor: '#f5f5f5',
    borderRadius: 14,
    elevation: 1,
  },
  filterContainer: {
    padding: 10,
    width: '40%', // Width of the modal
    maxHeight: '100%', // Maximum height of the modal



  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
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
  productPrice: {
    fontSize: 14,
    color: 'green',
  },
  productBrand: {
    fontSize: 12,
    color: 'grey',
  },
  officialBadge: {
    fontSize: 10,
    color: 'blue',
    backgroundColor: '#e0f7fa',
    paddingHorizontal: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 5,
  },
  discountBadge: {
    fontSize: 12,
    color: 'red',
    marginLeft: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginRight: 5,
  },
});
