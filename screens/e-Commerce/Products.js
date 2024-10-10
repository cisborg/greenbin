import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Animated, Alert, Modal, ScrollView, TextInput } from 'react-native';
import { Ionicons ,FontAwesome5} from '@expo/vector-icons';
import CheckBox from '@react-native-community/checkbox';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { RefreshControl } from 'react-native';

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
      <TouchableOpacity style={styles.card} >
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
        sortedProducts = [...products].sort((a, b) => b.price - a.price);
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

          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductCard item={item} addToFavorites={addToFavorites} addToCart={addToCart} />}
            numColumns={2}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshProducts} />}
          />

          {/* Filter Modal */}
          <Modal visible={showFilterModal} animationType="fade" transparent>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Filter Products</Text>
                <ScrollView>
                  <Text style={{ color: 'green', marginBottom: 5, fontWeight: '500'}}>Brand Filter</Text>
                  {Object.keys(brandFilters).map((brand) => (
                    <View key={brand} style={styles.checkboxContainer}>
                      <CheckBox
                        value={brandFilters[brand]}
                        onValueChange={() => setBrandFilters({ ...brandFilters, [brand]: !brandFilters[brand] })}
                      />
                      <Text style={{marginLeft: 5}}>{brand}</Text>
                    </View>
                  ))}
                  <Text style={{ color: 'green', marginBottom: 5, fontWeight: '500'}}>Price Range</Text>
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      value={priceRanges.low}
                      onValueChange={() => setPriceRanges({ ...priceRanges, low: !priceRanges.low })}
                    />
                    <Text style={{marginLeft: 5}}>Below 1000 GCP</Text>
                  </View>
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      value={priceRanges.medium}
                      onValueChange={() => setPriceRanges({ ...priceRanges, medium: !priceRanges.medium })}
                    />
                    <Text style={{marginLeft: 5}}>1000 - 1500 GCP</Text>
                  </View>
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      value={priceRanges.high}
                      onValueChange={() => setPriceRanges({ ...priceRanges, high: !priceRanges.high })}
                    />
                    <Text style={{marginLeft: 5}}>Above 1500 GCP</Text>
                  </View>
                  <Button title="Apply" onPress={filterProducts} style={{ borderRadius:14, width:80, backgroundColor: 'green', marginTop: 5}} />
                </ScrollView>
              </View>
            </View>
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
