import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
 
const Homepage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Page</Text>
            <Link href="/user/1" style={styles.link}>Go to user</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // Background color for the container
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    link: {
        fontSize: 18,
        color: 'blue',
    },
});

export default Homepage;
