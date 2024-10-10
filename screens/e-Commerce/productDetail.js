import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Animated, 
  StyleSheet, 
  ActivityIndicator, 
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import { FlashList } from '@shopify/flash-list'; // Import FlashList

const { width, height } = Dimensions.get('window');

const CartDetail = () => {
  const navigation = useNavigation();
  const [cartCount, setCartCount] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [showReviews, setShowReviews] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [cartBounce] = useState(new Animated.Value(1));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [loadingOrder, setLoadingOrder] = useState(false); // Loading state for the order button

  const images = [
    require('../../assets/greenBin.png'),
    require('../../assets/Appliance.png'),
    require('../../assets/bikes.png'),
    require('../../assets/greenBin.png')
  ];

  const reviewers = [
    { name: "John Doe", stars: 5, message: "Excellent product, highly recommend!", date: new Date() },
    { name: "Jane Smith", stars: 4, message: "Good quality, but the zipper could be better.", date: new Date() },
    { name: "Bob Johnson", stars: 3, message: "Average product, but decent value for the price.", date: new Date() },
  ].sort((a, b) => b.date - a.date);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
    Animated.sequence([
      Animated.timing(cartBounce, { toValue: 1.2, duration: 200, useNativeDriver: true }),
      Animated.timing(cartBounce, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const handleNextImage = () => {
    if (currentImage < images.length - 1) {
      setCurrentImage(currentImage + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
  };

  const handleLoadMoreReviews = () => {
    setLoadingReviews(true);
    // Simulate fetching more reviews
    setTimeout(() => {
      setLoadingReviews(false);
      // You can append more reviews to the `reviewers` array here if needed
    }, 1000);
  };

  const handleOrderNow = () => {
    setLoadingOrder(true); // Set loading state to true
    setTimeout(() => {
      setLoadingOrder(false); // Reset loading state
      navigation.navigate('ChallengePage'); // Navigate to another screen
    }, 300); // Duration for the spinner
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.review}>
      <Text style={styles.reviewerName}>{item.name}</Text>
      <View style={styles.ratingContainer}>
        {Array(item.stars).fill().map((_, i) => (
          <Icon key={i} name="star" type="font-awesome" color="#f5c518" size={16} />
        ))}
      </View>
      <Text style={styles.reviewMessage}>{item.message}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="leftcircle" size={27} color="#4CAF50" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Product Details</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.productImageContainer}>
            <TouchableOpacity onPress={handlePrevImage}>
              <AntDesign name="leftcircle" size={27} color="#4CAF50" />
            </TouchableOpacity>
            <Image 
              source={images[currentImage]} 
              style={styles.productImage} 
              resizeMode="contain"
            />
            <TouchableOpacity onPress={handleNextImage}>
              <AntDesign name="rightcircle" size={27} color="#4CAF50" />
            </TouchableOpacity>
            <View style={styles.imageIndicatorContainer}>
              <Text style={styles.imageIndicator}>{currentImage + 1}/{images.length}</Text>
            </View>
          </View>

          <View style={styles.productInfoContainer}>
            <Text style={styles.discountedPrice}>GCPs 459</Text>
            <Text style={styles.originalPrice}>GCPs 1,299</Text>
            <Text style={styles.discountPercentage}>-64%</Text>
            <Text style={styles.productTitle}>
              Green Bin - 100% Recycled and Renewable Green Bins with Zippered Handles. Material: 100% Recycled Plastic, Dimensions: 30 x 30 x 30 cm, Weight: 1.5 kg, Warranty: 2 years.
            </Text>

            <View style={styles.ratingContainer}>
              <Icon name="star" type="font-awesome" color="#f5c518" size={16} />
              <Text style={styles.ratingText}>4.4</Text>
              <TouchableOpacity onPress={() => setShowReviews(!showReviews)}>
                <Text style={styles.reviewText}> Reviews ({reviewers.length})</Text>
              </TouchableOpacity>
            </View>

            {showReviews && (
              <FlashList
                data={reviewers}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderReviewItem}
                onEndReached={handleLoadMoreReviews}
                onEndReachedThreshold={0.1}
                estimatedItemSize={100} // Estimate item size for better performance
                ListFooterComponent={() => (
                  loadingReviews ? <ActivityIndicator size="small" color="#4CAF50" /> : null
                )}
              />
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('ChatPage')}>
                <AntDesign name="message1" size={24} color="black" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('cart')}>
                <Animated.View style={{ transform: [{ scale: cartBounce }] }}>
                  <FontAwesome6 name="cart-plus" size={24} color="#4CAF50" />
                  {cartCount > 0 && (
                    <View style={styles.cartBadge}>
                      <Text style={styles.badgeText}>{cartCount}</Text>
                    </View>
                  )}
                </Animated.View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.orderNowButton} onPress={handleOrderNow}>
                {loadingOrder ? (
                  <ActivityIndicator size="small" color="#fff" style={styles.spinner} />
                ) : (
                  <Text style={styles.orderNowText}>Order Now</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  productImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  productImage: {
    width: width * 0.7,
    height: height * 0.28,
    borderRadius: 8,
  },
  imageIndicatorContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 4,
    borderRadius: 4,
  },
  imageIndicator: {
    color: '#fff',
    fontSize: 12,
  },
  productInfoContainer: {
    marginTop: 20,
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  discountPercentage: {
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 13,
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    marginLeft: 5,
  },
  reviewText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#4CAF50',
  },
  review: {
    marginBottom: 10,
  },
  reviewerName: {
    fontWeight: 'bold',
  },
  reviewMessage: {
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  chatButton: {
    padding: 10,
  },
  cartButton: {
    padding: 10,
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 12,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
  },
  orderNowButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 12,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderNowText: {
    color: '#fff',
    fontSize: 18,
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 20,
    backgroundColor: '#f44336',
    borderRadius: 10,
    padding: 5,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  spinner: {
    marginRight: 5,
  },
});

export default CartDetail;
