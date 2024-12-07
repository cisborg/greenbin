import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

const data = [
    {
        id: '1',
        price: 'KSh 499',
        title: 'Football Bulb LED Bulbs Bright Foldable Football Bulbs',
        location: 'Nairobi, Nairobi Central',
        condition: '',
        imageUrl: 'https://example.com/image1.jpg',
    },
    {
        id: '2',
        price: 'KSh 4,000',
        title: '20 Inches Wide Monitor. Monitor Wide',
        location: 'Nairobi, Nairobi Central',
        condition: 'Refurbished',
        imageUrl: 'https://example.com/image2.jpg',
    },
    {
        id: '3',
        price: 'KSh 1,000',
        title: 'Bedsheets 6*7 4pillow Cases1bedsheet1duvet Cover on Premium',
        location: 'Nairobi, Nairobi Central',
        condition: '',
        imageUrl: 'https://example.com/image3.jpg',
    },
    {
        id: '4',
        price: 'KSh 699, Negotiable',
        title: 'Electric Kettle AILYONS FK Stainless 2.2L Electric Kettle',
        location: 'Nairobi, Nairobi Central',
        condition: 'Brand New',
        imageUrl: 'https://example.com/image4.jpg',
    },
    {
        id: '5',
        price: 'KSh 2,500',
        title: 'New 3 Burner Roch Infrared Gas Cooker/ Infrared Cooker',
        location: 'Nairobi, Nairobi Central',
        condition: 'Brand New',
        imageUrl: 'https://example.com/image5.jpg',
    },
];

const Tailored = () => {
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <FastImage source={{ uri: item.imageUrl }} style={styles.image} resizeMode={FastImage.resizeMode.cover}  />
            <View style={styles.cardContent}>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.title}>{item.title}</Text>
                {item.condition ? (
                    <Text style={styles.condition}>{item.condition}</Text>
                ) : null}
                <Text style={styles.location}>{item.location}</Text>
            </View>
            <TouchableOpacity style={styles.closeButton}>
                <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    card: {
        backgroundColor: '#1A1A1A',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 10,
    },
    cardContent: {
        flex: 1,
    },
    price: {
        color: '#00C853',
        fontWeight: 'bold',
        fontSize: 16,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 14,
        marginVertical: 2,
    },
    condition: {
        backgroundColor: '#4CAF50',
        color: '#FFFFFF',
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 5,
        alignSelf: 'flex-start',
        marginTop: 2,
    },
    location: {
        color: '#AAAAAA',
        fontSize: 12,
        marginTop: 2,
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    closeText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Tailored;
