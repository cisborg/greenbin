import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Color } from '../../GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const DonationConfirmed = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity

    useEffect(() => {
        // Start the animation
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800, // Animation duration
            useNativeDriver: true, // Use native driver for better performance
        }).start();
    }, [fadeAnim]);

    const handleReturnToMenu = () => {
        navigation.navigate('manageAccount');
    };

    const handleCheckDetails = () => {
        navigation.navigate('donationHist');

    };

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <FastImage 
                source={require('../../assets/trase.png')} 
                resizeMode={FastImage.resizeMode.cover}
                style={styles.image} 
            />
            <Text style={styles.title}>Donation Successful, Yayy!</Text>
            <Text style={styles.message}>
                We are so amazed with your generosity continue venturing in donation to community support services and earn some slot with Us!
            </Text>

            <TouchableOpacity style={styles.checkDetails} onPress={handleCheckDetails}>
                <Text style={styles.checkDetailsText}>Donation History</Text>
                <AntDesign name="arrowright" size={20} color="green" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.returnToMenu} onPress={handleReturnToMenu}>
                <Text style={styles.returnText}>Return to Menu</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: width, // Use full width of the screen
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    image: {
        width: width * 0.6, // Responsive width (60% of screen width)
        height: width * 0.6, // Responsive height
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'green'
    },
    message: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 20,
        color: Color.colorGray_100
    },
    checkDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    checkDetailsText: {
        fontSize: 17,
        marginRight: 10,
        color: 'orange'
    },
    returnToMenu: {
        padding: 13,
        backgroundColor: 'green',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        borderRadius: 14,
        width: 200
    },
    returnText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default DonationConfirmed;
