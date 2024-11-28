import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAllPurchases, deletePurchase, clearAllPurchases } from '../../redux/actions/purchases';

const NotifScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const purchases = useSelector(state => state.purchases); // Selector for purchases state
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    dispatch(getAllPurchases()); // Fetch all purchases

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [dispatch, fadeAnim]);

  const clearAllPurchasesHandler = () => {
    dispatch(clearAllPurchases()); // Dispatch batch delete
  };

  const deletePurchaseHandler = (id) => {
    dispatch(deletePurchase(id)); // Dispatch single delete
  };

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity style={styles.deleteButton} onPress={() => deletePurchaseHandler(item.id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      )}
    >
      <View style={styles.notificationItem}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    </Swipeable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Purchases Catalog</Text>
        <TouchableOpacity onPress={clearAllPurchasesHandler}>
          <Text style={styles.clearAllText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <Animated.View style={{ ...styles.listContainer, opacity: fadeAnim }}>
        <FlatList
          data={purchases}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      </Animated.View>
    </SafeAreaView>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomRadius: 5
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'orange'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  clearAllText: {
    color: '#007BFF',
    fontSize: 16,
  },
  listContainer: {
    padding: 10,
  },
  listContent: {
    paddingBottom: 10,
  },
  notificationItem: {
    backgroundColor: '#ffff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  dateContainer: {
    marginBottom: 2
  },
  dateText: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 13,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: 'green',
    justifyContent: 'center',
    borderRadius: 14,
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NotifScreen;
