import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import FastImage from 'react-native-fast-image';

const data = [
    {
        id: '1',
        price: 'KSh 499',
        title: 'Football Bulb LED Bulbs Bright Foldable Football Bulbs',
        location: 'Nairobi, Nairobi Central',
        subscribed: 'true',
        imageUrl: 'https://example.com/image1.jpg',
    },
    {
        id: '2',
        price: 'KSh 4,000',
        title: '20 Inches Wide Monitor. Monitor Wide',
        location: 'Nairobi, Nairobi Central',
        subscribed: 'Refurbished',
        imageUrl: 'https://example.com/image2.jpg',
    },
    {
        id: '3',
        price: 'KSh 1,000',
        title: 'Bedsheets 6*7 4pillow Cases1bedsheet1duvet Cover on Premium',
        location: 'Nairobi, Nairobi Central',
        subscribed: 'true',
        imageUrl: 'https://example.com/image3.jpg',
    },
    {
        id: '4',
        price: 'KSh 699, Negotiable',
        title: 'Electric Kettle AILYONS FK Stainless 2.2L Electric Kettle',
        location: 'Nairobi, Nairobi Central',
        subscribed: 'true',
        imageUrl: 'https://example.com/image4.jpg',
    },
    {
        id: '5',
        price: 'KSh 2,500',
        title: 'New 3 Burner Roch Infrared Gas Cooker/ Infrared Cooker',
        location: 'Nairobi, Nairobi Central',
        subscribed: 'true',
        imageUrl: 'https://example.com/image5.jpg',
    },
];

const Subscribed = () => {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(true); // Show the modal when the screen is mounted
        const timer = setTimeout(() => {
            setModalVisible(false); // Hide the modal after 3 seconds
        }, 3000);

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <FastImage source={{ uri: item.imageUrl }} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
            <View style={styles.cardContent}>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.title}>{item.title}</Text>
                {item.subscribed ? (
                    <Text style={styles.subscribed}>{item.subscribed}</Text>
                ) : null}
                <Text style={styles.location}>{item.location}</Text>
            </View>
            <TouchableOpacity style={styles.closeButton}>
                <Text style={styles.closeText}>Grab It</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Flash Message Modal */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Your products are ready for quick purchase!</Text>
                        <Text style={styles.modalBody}>Checkout now and earn more GCPs. Together we go green.</Text>
                    </View>
                </View>
            </Modal>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.flatListContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    flatListContainer: {
        paddingBottom: 20,
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
    subscribed: {
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalBody: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Subscribed;
