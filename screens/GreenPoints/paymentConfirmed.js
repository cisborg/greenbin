import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Animated, Dimensions } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Color } from '../../GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PaymentConfirmed = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value

    const handleReturnToMenu = () => {
        // Logic to return to the menu
        navigation.navigate('ChallengePage');
    };

    const handleCheckDetails = () => {
        // Logic to check details
        navigation.navigate('PurchaseHist');
    };

    useEffect(() => {
        // Animate on mount: fade in
        Animated.timing(fadeAnim, {
            toValue: 1, // Fully visible
            duration: 800, // Animation duration
            useNativeDriver: true, // Using native driver for performance
        }).start();
    }, [fadeAnim]);

    // Get device dimensions
    const { width } = Dimensions.get('window');

    return (
        <SafeAreaView style={styles.safeArea}>
            <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
                <Image
                    source={require('../../assets/trase.png')} // Replace with your image path
                    style={styles.image}
                />
                <Text style={styles.title}>Payment Success, Yayy!</Text>
                <Text style={styles.message}>
                    We will send order details and invoice to your contact number and registered email.
                </Text>

                <TouchableOpacity style={styles.checkDetails} onPress={handleCheckDetails}>
                    <Text style={styles.checkDetailsText}>Check Details</Text>
                    <AntDesign name="arrowright" size={20} color="green" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.returnToMenu} onPress={handleReturnToMenu}>
                    <Text style={styles.returnText}>Return to Menu</Text>
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Ensuring SafeArea background matches screen
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width: '100%', // Full width
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    message: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 20,
        color: Color.colorGray_100,
    },
    checkDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    checkDetailsText: {
        fontSize: 17,
        marginRight: 10,
        color: 'orange',
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
        width: '60%', // Adjust width dynamically based on screen size
    },
    returnText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default PaymentConfirmed;
