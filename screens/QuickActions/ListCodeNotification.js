import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install this package

const notifications = [
    { id: '1', userName: 'Alice', icon: 'person-circle' },
    { id: '2', userName: 'Bob', icon: 'person-circle' },
    // Add more notifications as needed
];

const NotificationScreen = () => {
    const [loadingId, setLoadingId] = useState(null); // Track which button is loading

    const handleAccept = (userName, id) => {
        setLoadingId(id); // Set loading state for the clicked button
        // Simulate a network request or processing time
        setTimeout(() => {
            setLoadingId(null); // Reset loading state after 2 seconds
        }, 2000);
    };

    const renderItem = ({ item }) => (
        <View style={styles.notificationItem}>
            <Ionicons name={item.icon} size={40} color="black" />
            <Text style={styles.userName}>{item.userName}</Text>
            <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => handleAccept(item.userName, item.id)}
                disabled={loadingId === item.id} // Disable button if loading
            >
                {loadingId === item.id ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>
                        {loadingId === null ? 'Accept to use code' : 'Accepted'}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    userName: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    acceptButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default NotificationScreen;
