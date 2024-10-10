import React, { useEffect, useRef } from 'react';
import { Animated, SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { FontFamily, Color } from "../../GlobalStyles";
import { useNavigation } from '@react-navigation/core';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const WifiPlans = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const plans = [
        {
            title: 'Green Networks',
            benefits: 'Unlimited Wireless with Pizza Gift',
            validity: '2 Weeks',
            price: 'Green Points - 15000',
            type: '2 Weeks',
        },
        {
            title: 'Amazing EcoConnect',
            benefits: 'Unlimited Wireless with Voucher Gift',
            validity: '3 Weeks',
            price: 'Green Points - 20000',
            type: '3 Weeks',
        },
        {
            title: 'Super Squad Network',
            benefits: 'Unlimited Wireless with Voucher Gift',
            validity: 'Monthly Rate',
            price: 'Green Points - 24500',
            type: 'Monthly',
        },
        {
            title: 'Circular Economy',
            benefits: 'Voice - 10 Minutes & 10 SMS to Green daily',
            validity: 'Monthly Rate',
            price: 'Green Points - 30000',
            type: 'Monthly',
        },
        {
            title: 'Green Mifi Renewables',
            benefits: 'Unlimited - 1000 and Talkie Credits valid 2 months',
            validity: '2 Months',
            price: 'Green Points - 50000',
            type: '2 Months',
        },
        {
            title: 'Super Go Games',
            benefits: 'Buy DSTV with Half Paid Plan',
            validity: '2 Months',
            price: 'Green Points - 45000',
            type: '2 Months',
        },
    ];

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const renderPlansByType = (type) => {
        return plans
            .filter(plan => plan.type === type)
            .map((plan) => (
                <View key={plan.title} style={styles.card}>
                    <Text style={styles.planTitle}>{plan.title}</Text>
                    <Text style={styles.benefits}>{plan.benefits}</Text>
                    <Text style={styles.validity}>Validity: {plan.validity}</Text>
                    <Text style={styles.price}>{plan.price}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('BuyWifiSuccessful', { packaged: plan.benefits, valid: plan.validity, price: plan.price })}>
                        <View style={styles.proceed}>
                            <Text style={styles.cardText}>Confirm</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={{ ...styles.animatedView, opacity: fadeAnim }}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.heading}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <AntDesign name="leftcircle" size={30} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.header}>Choose Your Best Package</Text>
                    </View>
                    <Text style={styles.subHeader}>Best Supersonic Wifi Packages!</Text>
                    {['2 Weeks', '3 Weeks', 'Monthly', '2 Months'].map(type => (
                        <View key={type}>
                            <Text style={styles.categoryHeader}>{type}</Text>
                            {renderPlansByType(type)}
                        </View>
                    ))}
                </ScrollView>
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.colorWhite,
    },
    animatedView: {
        flex: 1,
    },
    scrollView: {
        padding: 20,
        paddingBottom: 10,
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'green',
        marginLeft: 10,
    },
    subHeader: {
        fontSize: 16,
        color: Color.colorDarkturquoise,
        marginBottom: 20,
        textAlign: 'center',
    },
    proceed: {
        backgroundColor: 'white',
        shadowColor: '#000',
        marginTop: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 14,
        justifyContent: 'center',
        width: '100%', // Make it responsive
        maxWidth: 150, // Limit the width
    },
    cardText: {
        color: 'green',
        fontWeight: 'bold',
    },
    categoryHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        fontFamily: FontFamily.poppinsRegular,
        color: Color.colorCrimson,
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 15,
        padding: 15,
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    planTitle: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily: FontFamily.manropeBold,
    },
    benefits: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    validity: {
        fontSize: 12,
        color: '#777',
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
        marginTop: 8,
    },
});

export default WifiPlans;
