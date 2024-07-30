import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const BestPlansScreen = () => {
    const plans = [
        {
            title: '250MB valid for 1 Hour',
            benefits: 'Data - 1.0 GB',
            validity: '1 Hour',
            price: 'Green Points - 30',
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
            title: 'Talk Green 50',
            benefits: 'Voice - 10 Minutes & 10 SMS to Green daily',
            validity: '7 Days',
            price: 'Green Points -1200',
            type: 'Weekly',
        },
        {
            title: 'UnlimiNET 250 Monthly',
            benefits: 'Data - 3.0 GB, Voice - 150 Minutes, SMS - 1000',
            validity: '30 Days',
            price: 'Green Points -5000',
            type: 'Monthly',
        },
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Best Plans</Text>
            <Text style={styles.subHeader}>Best offers for you</Text>
            {plans.map((plan, index) => (
                <TouchableOpacity key={index} style={styles.card}>
                    <Text style={styles.planTitle}>{plan.title}</Text>
                    <Text style={styles.benefits}>{plan.benefits}</Text>
                    <Text style={styles.validity}>Validity: {plan.validity}</Text>
                    <Text style={styles.price}>{plan.price}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        width: 400,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: "lightgreen",
    },
    subHeader: {
        fontSize: 16,
        color: '#888',
        marginBottom: 20,
        
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        elevation: 3,
        
    },
    planTitle: {
        fontSize: 18,
        fontWeight: '600',
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
