import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Color } from '../GlobalStyles';

const WithdrawalSuccessScreen = () => {
    const navigation = useNavigation();
   

    return (
        <View style={styles.container}>
            <View style={styles.modal}>
                <Image style={styles.imageView} source={require('../assets/withdraw.png')}  />
                <Text style={styles.title}>Withdrawal Successful!</Text>
                <Text style={styles.message}>
                    You have successfully withdrawn <Text style={styles.textColor}>GCPs 14,000 </Text> to your mpesa account!
                </Text>
                <TouchableOpacity style={styles.button} onPress={()=> navigation.goBack() }>
                    <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        width: 404
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 300,
    },
    imageView : {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    message: {
        color: '#555',
        textAlign: 'center',
        marginVertical: 10,
    },
    textColor: {
        color: Color.colorLimegreen_200,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default WithdrawalSuccessScreen;
