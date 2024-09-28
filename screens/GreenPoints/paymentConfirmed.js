import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Color } from '../../GlobalStyles';
import { useNavigation } from '@react-navigation/native';
const PaymentConfirmed = () => {
    const navigation = useNavigation();
    const handleReturnToMenu = () => {
        // Logic to return to the menu
        navigation.navigate('ChallengePage')
    };

    const handleCheckDetails = () => {
        // Logic to check details
        Alert.alert('Order invoice sent to sms')
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require('../../assets/trase.png')} // Replace with your image path
                style={styles.image} 
            />
            <Text style={styles.title}>Payment Success, Yayy!</Text>
            <Text style={styles.message}>
                We will send order details and invoice in your contact no. and registered email.
            </Text>

            <TouchableOpacity style={styles.checkDetails} onPress={handleCheckDetails}>
                <Text style={styles.checkDetailsText}>Check Details</Text>
                <AntDesign name="arrowright" size={20} color="green" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.returnToMenu} onPress={handleReturnToMenu}>
                <Text style={styles.returnText}>Return to Menu</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: 410,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF', // Change background color as needed
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
        backgroundColor: Color.colorLimegreen_200, // Change background color as needed
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        borderRadius: 14,
        width: 200
    },
    returnText: {
        color: '#FFFFFF', // Change text color as needed
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default PaymentConfirmed;
