import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";

import { useNavigation } from '@react-navigation/core';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const BestPlansScreen = () => {
    const navigation = useNavigation();
    const plans = [
        {
            title: '250MB Earth Hour',
            benefits: 'Data - 250MB',
            validity: '1 Hour',
            price: 'Green Points - 50',
            type: 'Hourly',
        },
        {
            title: '1GB GreenBin 3 Hour',
            benefits: 'Data - 1.0 GB',
            validity: '3 Hour',
            price: 'Green Points - 350',
            type: 'Hourly',
        },
        {
            title: 'Amazing Green Daily 600MB',
            benefits: 'Data - 600.0 MB',
            validity: '1 Day',
            price: 'Green Points - 100',
            type: 'Daily',
        },
        {
            title: '750MB Squad Night',
            benefits: 'Data - 750 MB',
            validity: '1 Hour',
            price: 'Green Points - 30',
            type: 'Daily',
        },
        {
            title: 'Talk Green 50',
            benefits: 'Voice - 10 Minutes & 10 SMS to Green daily',
            validity: '7 Days',
            price: 'Green Points -1200',
            type: 'Weekly',
        },
        {
            title: 'Green Renewables Campaign',
            benefits: 'Unlimited- 100 Mins & 5GB Green Data',
            validity: '7 Days',
            price: 'Green Points -4000',
            type: 'Weekly',
        },
        {
            title: '2GB GO Games 2hrs',
            benefits: 'Data - 2.0 GB',
            validity: '2 Hours',
            price: 'Green Points - 500',
            type: 'Hourly',
        },
        {
            title: 'UnlimiNET 250 Monthly',
            benefits: 'Data - 3.0 GB, Voice - 150 Minutes, SMS - 1000',
            validity: '30 Days',
            price: 'Green Points -5000',
            type: 'Monthly',
        },
        {
            title: '30GB Jienjoy na Green Network',
            benefits: 'Data - 30GB',
            validity: '30Days',
            price: 'Green Points - 10000',
            type: 'Monthly',
        },
    ];

    // Function to render plans by type
    const renderPlansByType = (type) => {
        return plans
            .filter(plan => plan.type === type)
            .map((plan, index) => (
                <TouchableOpacity key={index} style={styles.card} onPress={()=> navigation.navigate('BuyBundleSuccessful')}>
                    <Text style={styles.planTitle}>{plan.title}</Text>
                    <Text style={styles.benefits}>{plan.benefits}</Text>
                    <Text style={styles.validity}>Validity: {plan.validity}</Text>
                    <Text style={styles.price}>{plan.price}</Text>
                </TouchableOpacity>
            ));
    };

    return (
        
        <ScrollView style={styles.container}>
            <View style={styles.heading}>
                <TouchableOpacity>
                    <AntDesign name="leftcircle" size={30} color="black" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <Text style={styles.header}>Best Plans</Text>
            </View>
            <View style={styles.noteMessage}>
                <Text style={styles.factAbout201}>
                Note: Green Carbon Points are rated 100 for KES 10.25!
                </Text>
             </View>
            <Text style={styles.subHeader}>Best offers for you</Text>

            {/* Hourly Plans */}
            <Text style={styles.categoryHeader}>Hourly</Text>
            {renderPlansByType('Hourly')}

            {/* Daily Plans */}
            <Text style={styles.categoryHeader}>Daily</Text>
            {renderPlansByType('Daily')}

            {/* Weekly Plans */}
            <Text style={styles.categoryHeader}>Weekly</Text>
            {renderPlansByType('Weekly')}

            {/* Monthly Plans */}
            <Text style={styles.categoryHeader}>Monthly</Text>
            {renderPlansByType('Monthly')}
        </ScrollView>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        width: 404,
    },
    heading: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginBottom: 16,
        justifyContent: 'flex-start',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: Color.colorLimegreen_200,
        marginLeft: 110
    },
    subHeader: {
        fontSize: 16,
        color: Color.colorLimegreen_200,
        marginBottom: 30,
        top: 0,
    },
    categoryHeader: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 11,
        marginTop: 20,
        fontFamily: FontFamily.poppinsRegular,
        color: Color.colorCrimson,
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 17,
        padding: 10,
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        
    },
    noteMessage: {
        height: 40,
        width: 375,
        position: "absolute",
        borderRadius: 13,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        
        top: 82,
        left: 0,
      },
      factAbout201: {
        fontSize: FontSize.size_sm,
        color: Color.colorGray_800,
        width: 370,
        height: 48,
        marginTop: 10,
        marginLeft: 10,
        left: 3,
        position: "absolute",
      },
    planTitle: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: FontFamily.manropeBold
    },
    benefits: {
        fontSize: 14,
        color: '#555',
    },
    validity: {
        fontSize: 12,
        color: '#777',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
        marginTop: 8,
    },
});

export default BestPlansScreen;
