import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Color } from '../GlobalStyles';

const PaymentSuccess = () => {
    const navigation = useNavigation();
   

    return (
        <View style={styles.container}>
            <View style={styles.modal}>
                <Text style={styles.checkmark}>✔️</Text>
                <Text style={styles.title}> Paid Successfully!</Text>
                <Text style={styles.message}>
                    You have successfully paid<Text style={styles.textColor}>  GCPs 14,000 to your order ID D7685B45 </Text>
                    We have awarded you 7% discount to Your Green Bank! <TouchableOpacity onPress={()=> navigation.navigate('GreenBank')}><Text style={{color:Color.colorLimegreen_200}}>confirm?</Text></TouchableOpacity> 
                </Text>
                <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('ChallengePage') }>
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
    textColor: {
        color: Color.colorLimegreen_200,
    },
    checkmark: {
        fontSize: 50,
        color: '#4CAF50',
        marginBottom: 10,
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

export default PaymentSuccess;
