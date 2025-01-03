import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated,Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { fetchFlashsale, purchaseProduct} from '../../redux/actions/products'; // Adjust the import based on your project structure

const categories = [
    { id: '1', name: 'All' },
    { id: '2', name: 'Computers & Accessories' },
    { id: '3', name: 'Phones & Accessories' },
];

const { width, height } = Dimensions.get('window');

const SalesList = () => {
    const [countdown, setCountdown] = useState(75 * 60);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loadingId, setLoadingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // Get products and loading state from Redux
    const { products, productsLoading, error } = useSelector(state => ({
        products: state.products.products, // Adjust based on your state structure
        productsLoading: state.products.loading,
        error: state.products.error
    }));

    useEffect(() => {
        dispatch(fetchFlashsale()); // Fetch products when the component mounts
    }, [dispatch]);

    useEffect(() => {
        const now = new Date();
        const sixAM = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0);

        if (now > sixAM) {
            sixAM.setDate(sixAM.getDate() + 1);
        }

        const timeDifference = Math.floor((sixAM - now) / 1000);
        setCountdown(timeDifference);

        const timer = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        // Simulate loading delay
        setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearInterval(timer);
    }, []);

    const formatEndTime = () => {
        const now = new Date();
        const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
        const options = { weekday: 'long' };
        const day = midnight.toLocaleDateString('en-US', options);
        return `Ends on: ${day} at 12:00 midnight`;
    };

    const filteredData = products.filter(
        (product) => selectedCategory === 'All' || product.category === selectedCategory
    );

    const handleGrabIt = (item) => {
        if (item.soldOut) return;
        setLoadingId(item.id);

        dispatch(purchaseProduct(item.id));

        setTimeout(() => {
            if (item.quantity > 0) {
                item.quantity -= 1;
            }

            if (item.quantity <= 0) {
                item.soldOut = true;
            }

            setLoadingId(null);
            navigation.navigate('Checkout');
        }, 300);
    };

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <LottieView
                    source={require('../../assets/lottie/errorLottie.json')} // Update with your error Lottie file path
                    autoPlay
                    loop
                    style={styles.lottie}
                />
                <Text style={styles.errorMessage}>Oops! Something went wrong!</Text>
            </View>
        );
    }
    // Show Lottie loading animation if products are loading
    if (productsLoading) {
        return (
            <View style={styles.loadingContainer}>
                <LottieView
                    source={require('../../assets/lottie/flashed.json')}  // Update with your Lottie file path
                    autoPlay
                    loop
                    style={styles.loadingAnimation}
                />
            </View>
        );
    }

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.heading}>Flash Sales</Text>
            </View>
            {countdown > 0 ? (
                <Text style={styles.timer}>{formatEndTime()}</Text>
            ) : (
                <LottieView
                    source={require('../../assets/lottie/lego.json')}
                    autoPlay
                    loop
                    style={styles.lottie}
                />
            )}
            <View style={styles.categoryContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category.name && styles.selectedCategory,
                            ]}
                            onPress={() => setSelectedCategory(category.name)}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    selectedCategory === category.name && styles.selectedCategoryText,
                                ]}
                            >
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlashList
                data={filteredData}
                keyExtractor={(item) => item.id}
                estimatedItemSize={200}
                contentContainerStyle={styles.flashListContainer}
                renderItem={({ item }) => {
                    const totalQuantity = item.quantity + (item.soldOut ? 0 : 1);
                    const soldPercentage = item.soldOut ? 100 : ((totalQuantity - item.quantity) / totalQuantity) * 100;

                    return (
                        <View style={styles.productContainer}>
                            <FastImage source={{ uri: item.imageUrl }} resizeMode={FastImage.resizeMode.cover} style={styles.image} />
                            <View style={styles.productDetails}>
                                <Text style={styles.productTitle} numberOfLines={3}>{item.title}</Text>
                                <Text style={styles.price}>
                                    KSh {item.price} <Text style={styles.originalPrice}>KSh {item.originalPrice}</Text>
                                </Text>
                                <View style={styles.quantityContainer}>
                                    <View style={styles.productProgressBarContainer}>
                                        <LinearGradient
                                            colors={['#FF6347', '#FF4500']}
                                            style={[styles.productProgressBar, { width: `${soldPercentage}%` }]}
                                        >
                                            <Text style={styles.productProgressText}>{item.soldOut ? '100% Sold Out' : `${Math.round(soldPercentage)}% Left`}</Text>
                                        </LinearGradient>
                                    </View>

                                    {item.soldOut ? (
                                        <TouchableOpacity style={styles.buttonSoldOut} disabled>
                                            <Text style={styles.soldOut}>Sold Out</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity style={styles.button} onPress={() => handleGrabIt(item)}>
                                            {loadingId === item.id ? (
                                                <ActivityIndicator color="white" />
                                            ) : (
                                                <Text style={styles.grabIt}>Grab It</Text>
                                            )}
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                    );
                }}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1,  backgroundColor: '#f9f9f9' },
    header: { flexDirection: 'row', alignItems: 'center',justifyContent: 'flex-start', padding: 16, backgroundColor: 'green' },
    heading: { fontSize: 24, fontWeight: 'bold', color: 'white', marginLeft: 100 },
    timer: { fontSize: 16, color: 'orange', textAlign: 'center', marginVertical: 10 },
    categoryContainer: { 
        height: '9%', // Set height to 10% of the screen
        justifyContent: 'center',
    },
    categoryScroll: {
        alignItems: 'center', // Center the category buttons
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    errorMessage: {
        marginTop: 20,
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    loadingAnimation: {
        width: 150,
        height: 150,
    },
    lottie: {
        width: width * 0.3, // Adjust size as needed
        height: height * 0.3,
      },
    categoryButton: { 
        paddingHorizontal: 12, 
        paddingVertical: 5, 
        borderRadius: 10,
        marginHorizontal: 5, 
        backgroundColor: '#e0e0e0', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedCategory: { backgroundColor: 'green' },
    categoryText: { fontSize: 14 }, 
    selectedCategoryText: { color: 'white' },
    flashListContainer: { paddingBottom: 5 },
    productContainer: { margin: 10, padding: 10, backgroundColor: '#fff', borderRadius: 18, elevation: 1, flexDirection: 'row', justifyContent: 'center' },
    image: { width: '30%', height: 100, borderRadius: 13 },
    productDetails: { marginTop: 9 },
    quantityContainer: {flexDirection: 'row', alignItems: 'center' },
    productTitle: { fontSize: 14, fontWeight: 'bold', alignSelf: 'flex-start', width: '92%'},
    price: { fontSize: 12, color: '#333' },
    originalPrice: { textDecorationLine: 'line-through', color: '#888' },
    productProgressBarContainer: { height: 12, borderRadius: 5, backgroundColor: '#ddd', marginVertical: 10, width: '55%', marginRight: '7%' },
    productProgressBar: { height: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    productProgressText: { fontSize: 10, color: '#fff', marginTop: '-1.5%' },
    buttonSoldOut: { backgroundColor: '#888', padding: 8, borderRadius: 14, marginTop: 5 },
    button: { backgroundColor: 'green', padding: 8, borderRadius: 14, marginTop: 5, width: '25%', alignItems: 'center'},
    soldOut: { color: 'white', fontSize: 14 , fontWeight: 'bold'},
    grabIt: { color: 'white', fontSize: 14, fontWeight: 'bold' },
});

export default SalesList;
