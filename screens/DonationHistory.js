import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// Import VictoryPie for non-web platforms only
import { VictoryPie } from 'victory-native';
import { Color } from '../GlobalStyles';


const DonationHistory = ({ navigation, donationHistory = [] }) => {
  const renderDonationItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => Alert.alert("Details", `Amount: ${item.amount}\nCategory: ${item.category}\nDate: ${item.date}`)}
    >
      <Text style={styles.donationText}>{`${item.date}`}</Text>
      <Text style={styles.amountText}>{`${item.amount} points`}</Text>
      <Text style={styles.categoryText}>{item.category}</Text>
    </TouchableOpacity>
  );

  const totalDonations = donationHistory.reduce((total, item) => total + item.amount, 0);
  const categoryCounts = donationHistory.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  const chartData = Object.entries(categoryCounts).map(([category, amount]) => ({
    x: category,
    y: amount,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Donation History</Text>
      </View>

      <FlatList
        data={donationHistory}
        renderItem={renderDonationItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
            <Text style={styles.totalDonations}>Total Donations: {totalDonations} points</Text>
            {Platform.OS !== 'web' ? (
              <VictoryPie
                data={chartData}
                colorScale={["#4CAF50", "#FFC107", "#2196F3"]}
                style={{ labels: { fontSize: 14, fill: "#fff" } }}
                innerRadius={50}
                animate={{ duration: 500 }}
              />
            ) : (
              <Text style={styles.webChartPlaceholder}>Pie Chart Placeholder (not available on web)</Text>
            )}
          </>
        }
        ListFooterComponent={
          <>
            {donationHistory.length === 0 && (
              <Text style={styles.emptyState}>No donation history available.</Text>
            )}
            <View style={styles.feedbackContainer}>
              <Text style={styles.feedbackHeader}>Rate Your Experience</Text>
              <TouchableOpacity 
                style={styles.feedbackButton} 
                onPress={() => alert("Feedback", "Thank you for your feedback!")}
              >
                <Text style={styles.feedbackButtonText}>Leave Feedback</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.matchingContainer}>
              <Text style={styles.matchingHeader}>Matching Donations Available!</Text>
              <Text style={styles.matchingText}>Your next donation can be matched by our partners!</Text>
            </View>

            <View style={styles.successStoriesContainer}>
              <Text style={styles.successStoriesHeader}>Success Stories</Text>
              <Text style={styles.successStory}>🌳 "Thanks to your donations, we planted 1000 trees!"</Text>
              <Text style={styles.successStory}>🏘️ "Your support helped build homes for families in need!"</Text>
            </View>

            <View style={styles.exclusiveContentContainer}>
              <Text style={styles.exclusiveHeader}>Exclusive Content</Text>
              <Text style={styles.exclusiveText}>Get updates on our latest projects and initiatives!</Text>
            </View>

            <View style={styles.personalizedSuggestionsContainer}>
              <Text style={styles.suggestionsHeader}>Personalized Donation Suggestions</Text>
              <Text style={styles.suggestionsText}>Based on your interests, we suggest:</Text>
              <Text style={styles.suggestionItem}>1. Tree Planting</Text>
              <Text style={styles.suggestionItem}>2. Community Support</Text>
            </View>

            <View style={styles.communityInvolvementContainer}>
              <Text style={styles.communityHeader}>Get Involved with the Community</Text>
              <Text style={styles.communityText}>Join us for upcoming events and volunteer opportunities!</Text>
            </View>
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
    overflow: 'hidden',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  totalDonations: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  donationText: {
    fontSize: 16,
    color: '#333',
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  categoryText: {
    fontSize: 14,
    color: '#555',
  },
  emptyState: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
  feedbackContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
  },
  feedbackHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  feedbackButton: {
    marginTop: 10,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  feedbackButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  matchingContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#c8e6c9',
    borderRadius: 10,
  },
  matchingHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  matchingText: {
    marginTop: 5,
  },
  successStoriesContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff3e0',
    borderRadius: 10,
  },
  successStoriesHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  successStory: {
    marginTop: 5,
  },
  exclusiveContentContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ffebee',
    borderRadius: 10,
  },
  exclusiveHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  exclusiveText: {
    marginTop: 5,
  },
  personalizedSuggestionsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
  },
  suggestionsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  suggestionsText: {
    marginTop: 5,
  },
  suggestionItem: {
    marginTop: 3,
  },
  communityInvolvementContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ffe0b2',
    borderRadius: 10,
  },
  communityHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  communityText: {
    marginTop: 5,
  },
  webChartPlaceholder: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#555',
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginTop: 10,
  },
});

export default DonationHistory;
