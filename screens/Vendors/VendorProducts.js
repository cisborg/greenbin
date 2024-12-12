import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator,Dimensions, Animated, Modal, ScrollView, TextInput } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { RefreshControl } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDispatch, useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import { fetchProducts, followVendor, unfollowVendor, addFavorite, addToCart } from '../../redux/actions/products';


const { width, height } = Dimensions.get('window');

const StoreHeader = ({ vendor }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [followText, setFollowText] = useState('Follow');
    const [followers, setFollowers] = useState(vendor.followers || 0);
    const dispatch = useDispatch();

    useEffect(() => {
        setFollowers(vendor.followers);
    }, [vendor.followers]);

    const handleFollow = () => {
        setIsFollowing(true);
        dispatch(followVendor(vendor.id)); // Dispatch follow action
        setTimeout(() => {
            setIsFollowing(false);
            setFollowers(prevFollowers => {
                setFollowText('Connected');
                return prevFollowers + 1;
            });
        }, 300);
    };

    const handleUnfollow = () => {
        setIsFollowing(true);
        dispatch(unfollowVendor(vendor.id)); // Dispatch unfollow action
        setTimeout(() => {
            setIsFollowing(false);
            setFollowers(prevFollowers => {
                setFollowText('Follow');
                return prevFollowers - 1;
            });
        }, 300);
    };

    return (
        <View style={styles.storeHeaderContainer}>
            <FastImage
                source={require('../../assets/tree.avif')}
                style={styles.storeImage}
                resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.storeInfoContainer}>
                <Text style={styles.storeName}>{vendor.name}</Text>
                <Text style={styles.storeDetails}>Total {vendor.productsCount} products | {followers} followers</Text>
                <View style={styles.ratingContainer}>
                    <Text style={styles.storeScore}>Score: {vendor.score}</Text>
                    <Text style={styles.ratingsCount}>({vendor.ratingsCount} Ratings)</Text>
                </View>
            </View>
            <TouchableOpacity 
                style={[styles.followButton, { backgroundColor: followText === 'Connected' ? 'green' : '#FF5722' }]} 
                onPress={isFollowing ? handleUnfollow : handleFollow}
                disabled={isFollowing}
            >
                {isFollowing ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.followText}>{followText}</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const ProductCard = ({ item }) => {
    const swipeableRef = useRef(null);
    const dispatch = useDispatch(); // Get the dispatch function from Redux

    const handleAddToFavorites = () => {
      dispatch(addFavorite(item)); // Dispatch add to favorites action
    };
  
    const handleAddToCart = () => {
      dispatch(addToCart(item)); // Dispatch add to cart action
    };

    return (
        <Swipeable
            ref={swipeableRef}
            renderRightActions={() => (
                <View style={styles.swipeActions}>
                    <TouchableOpacity onPress={ handleAddToCart}>
                        <Ionicons name="cart-outline" size={24} color="orange" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ handleAddToFavorites}>
                        <Ionicons name="heart-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}
        >
            <TouchableOpacity style={styles.card}>
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
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const loading = useSelector(state => state.products.loading);
    const error = useSelector(state => state.products.error);
    const brands = useSelector(state => state.products.brands); // Fetch brands from Redux
    const vendor = useSelector(state => state.vendor.currentVendor);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [selectedSort, setSelectedSort] = useState('Best Match');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [isScreenLoading, setIsScreenLoading] = useState(true);
    const [cartCount, setCartCount] = useState(0);
    const [brandFilters, setBrandFilters] = useState({});
    const [priceRanges, setPriceRanges] = useState({ low: false, medium: false, high: false });
    const animation = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchProducts()); // Fetch products and brands
            setIsScreenLoading(false);
        };
        fetchData();
    }, [dispatch]);

    const refreshProducts = () => {
        setIsRefreshing(true);
        dispatch(fetchProducts()); // Refresh products and brands
        setIsRefreshing(false);
    };

    const addToFavorites = (item) => {
        dispatch(addFavorite(item)); // Dispatch add favorite action
    };

    const addToCart = (item) => {
        dispatch(addToCart(item)); // Dispatch add to cart action
        setCartCount(cartCount + 1);
    };

    const handleSortChange = (value) => {
        setSelectedSort(value);
        // Sorting logic can remain localized
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
      
      setShowFilterModal(false);

      return filteredProducts;

    };
    const renderFooter = () => {
        if (!loading) return null;
        return <ActivityIndicator size="large" color="#388e3c" style={styles.loadingIndicator} />;
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
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={20} color="black" />
                        </TouchableOpacity>
                        <TextInput 
                            style={styles.searchBar} 
                            placeholder="Search products..." 
                            value={searchQuery} 
                            onChangeText={setSearchQuery} 
                        />
                        <TouchableOpacity onPress={() => navigation.navigate('cart')}>
                            <FontAwesome5 name="cart-plus" size={24} color="black" />
                            {cartCount > 0 && <Text style={styles.cartCount}>{cartCount}</Text>}
                        </TouchableOpacity>
                    </View>
                    <StoreHeader vendor={vendor} />

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
                      data={products}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => <ProductCard item={item} addToFavorites={addToFavorites} addToCart={addToCart} />}
                      numColumns={2}
                      onEndReachedThreshold={0.5}
                      ListFooterComponent={renderFooter}
                      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshProducts} />}
                  />)}

                    <Modal visible={showFilterModal} animationType="fade" transparent>
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Filter Products</Text>
                                <ScrollView>
                                    <Text style={{ color: 'green', marginBottom: 5, fontWeight: '500' }}>Brand Filter</Text>
                                    {brands.map((brand) => (
                                        <View key={brand} style={styles.checkboxContainer}>
                                            <BouncyCheckbox
                                                isChecked={brandFilters[brand] || false}
                                                onPress={() => setBrandFilters({ ...brandFilters, [brand]: !brandFilters[brand] })}
                                            />
                                            <Text style={{ marginLeft: 5 }}>{brand}</Text>
                                        </View>
                                    ))}
                                    
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
  loadingIndicator: {
    width: width * 0.1,
    height: height * 0.1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  storeHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  storeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  storeInfoContainer: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  storeDetails: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  storeScore: {
    fontSize: 14,
    color: '#FF9800',
    marginRight: 4,
  },
  ratingsCount: {
    fontSize: 14,
    color: '#888',
  },
  followButton: {
    backgroundColor: '#FF5722',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  followText: {
    color: '#fff',
    fontWeight: 'bold',
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
 
});

export default Products;