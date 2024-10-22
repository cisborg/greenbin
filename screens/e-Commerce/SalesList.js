import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,Platform,StatusBar, ScrollView } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const categories = [
    { id: '1', name: 'All' },
    { id: '2', name: 'Electronics' },
    { id: '3', name: 'Green Renewables' },
];

const productsData = [
    {
        id: '1',
        title: "Valentine's Day Gift 9 PIECES! Grab it",
        price: 9,
        originalPrice: 1200,
        soldOut: true,
        category: 'All',
        imageUrl: 'https://example.com/image1.jpg', // Update with actual image URL
    },
    {
        id: '2',
        title: 'IPCONE 2L Energy Efficient Kettle gr',
        price: 599,
        originalPrice: 1499,
        soldOut: false,
        category: 'Green Renewables',
        imageUrl: 'https://example.com/image2.jpg', // Update with actual image URL
    },
    {
        id: '3',
        title: 'Samsung Galaxy A05 Grab it now !',
        price: 11199,
        originalPrice: 19999,
        soldOut: false,
        category: 'Electronics',
        imageUrl: 'https://example.com/image3.jpg', // Update with actual image URL
    },
];

const SalesList = () => {
    const [countdown, setCountdown] = useState(75 * 60); // 75 minutes in seconds
    const [selectedCategory, setSelectedCategory] = useState('All');
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handleGrabIt = (product) => {
        if (!product.soldOut) {
            alert(`You grabbed ${product.title} for GP ${product.price}!`);
        } else {
            alert(`${product.title} is sold out!`);
        }
    };

    const filteredData = productsData.filter(
        (product) => selectedCategory === 'All' || product.category === selectedCategory
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={24} color="green" />
                </TouchableOpacity>
                <Text style={styles.heading}>Flash Sales</Text>
            </View>
            <Text style={styles.timer}>Ends in: {formatTime(countdown)}</Text>

            {/* Horizontal Category List */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
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

            {/* FlashList for Products */}
            <FlashList
                data={filteredData}
                keyExtractor={(item) => item.id}
                estimatedItemSize={200}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <Image source={{ uri: item.imageUrl }} style={styles.image} />
                        <View style={styles.productDetails}>
                            <Text style={styles.productTitle}>{item.title}</Text>
                            <Text style={styles.price}>
                                GPs {item.price} <Text style={styles.originalPrice}>GPs {item.originalPrice}</Text>
                            </Text>
                            {item.soldOut ? (
                                <TouchableOpacity style={styles.button1}>
                                    <Text style={styles.soldOut}>Sold Out</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.grabIt}>Grab Now</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f8f8',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent:'flex-start',
        alignItems: 'center',
        marginBottom: 10,
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: '28%',
        color: '#333',
        alignSelf: 'center',
    },
    timer: {
        fontSize: 16,
        marginBottom: 20,
        color: 'orange', // Highlight the timer color
        alignSelf: 'flex-end'
    },
    categoryContainer: { 
        flexDirection: 'row',
        marginVertical: 10 
    },
    categoryButton: {
         paddingHorizontal: 16,
         paddingVertical: 8,
         backgroundColor: '#f0f0f0', 
         borderRadius: 20,
         marginRight: 8 
    },
    selectedCategory: {
         backgroundColor: '#FF5733'
    },
    categoryText: {
         fontSize: 16,
          color: '#555'
     },
    selectedCategoryText: {
         color: '#fff'
     },    

    productContainer: {
        flexDirection: 'row',
        borderRadius: 20,
        padding: 15,
        marginBottom: 8,
        alignItems: 'center',
        backgroundColor: '#fff', // White background for product cards
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1, // For Android shadow
    },
    prodict: {
        flexDirection: 'column',
    },
    image: {
        width: 80,
        flex: 1,
        height: 80,
        borderRadius: 10, // Rounded corners for images
    },
    productTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'flex-start',
        marginBottom: 5,
    },
    price: {
        fontSize: 13,
        color: 'green',
        marginBottom: 5,
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
    button: {
        backgroundColor: 'green',
        borderRadius: 11,
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignSelf: 'flex-end'
    },
    button1: {
        backgroundColor: 'orange',
        borderRadius: 11,
        paddingVertical: 8,
        paddingHorizontal: 10,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    grabIt: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    soldOut: {
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 12,

    },
});

export default SalesList;
