import React, { useState } from 'react';
import { View, ScrollView, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient'; // For gradients
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons for back icon
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

// Sample Data for Pie Charts
const pieData = {
  activities: [
    { name: "Waste Clean", population: 50, color: "#4CAF50" },
    { name: "Tree Planting", population: 30, color: "#FF9800" },
    { name: "Recycling", population: 20, color: "#2196F3" }
  ],
  donations: [
    { name: "Disasters", population: 40, color: "#00BCD4" },
    { name: "Poverty", population: 30, color: "#FFC107" },
    { name: "Pollution", population: 30, color: "#E91E63" }
  ],
  purchases: [
    { name: "Electronics", population: 70, color: "#9C27B0" },
    { name: "Clothes", population: 20, color: "#FF5722" },
    { name: "Other", population: 10, color: "#FF9800" }
  ]
};

// Sample Bar Data (Monthly Thresholds for Modules)
const barData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      data: [30, 45, 28, 80, 99, 43, 50, 67, 78, 90, 56, 72], // Average threshold data for each month
    }
  ]
};

// Function to determine bar color based on value
const getBarColor = (value) => {
  if (value < 50) {
    return '#A9A9A9'; // Gray for < 50%
  } else if (value >= 50 && value <= 59) {
    return '#FFA500'; // Orange for 50%-59%
  } else {
    return '#4CAF50'; // Green for >= 60%
  }
};

// Main App Component
const CarbonFootprintCalculator = () => {
  const [activeCard, setActiveCard] = useState('activities');
  const navigation  = useNavigation();
  const handleToggleCard = (card) => {
    setActiveCard(card);
  };

  const getCurrentData = () => {
    switch (activeCard) {
      case 'activities':
        return pieData.activities;
      case 'donations':
        return pieData.donations;
      case 'purchases':
        return pieData.purchases;
      default:
        return [];
    }
  };

  const currentData = getCurrentData();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Hi, You!</Text>
      </View>

      {/* Circular progress / Pie chart */}
      <View style={styles.pieChartContainer}>
        <PieChart
          data={currentData}
          width={screenWidth - 40}
          height={160}
          chartConfig={{
            backgroundColor: 'transparent',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
        <View style={styles.legend}>
          {currentData.map((item, index) => (
            <Text key={index} style={{ color: item.color, fontSize: 12 }}>
              {item.name}: {item.population}%
            </Text>
          ))}
        </View>
      </View>

      {/* Card displaying the circular progress and toggling */}
      <View style={styles.cardContainer}>
        {['activities', 'donations', 'purchases'].map((card) => (
          <TouchableOpacity
            key={card}
            style={styles.card}
            onPress={() => handleToggleCard(card)}
          >
            <LinearGradient
              colors={
                card === 'activities' ? ['#4CAF50', '#81C784'] :
                card === 'donations' ? ['#FF9800', '#FFB74D'] :
                ['#9C27B0', '#CE93D8']
              }
              style={styles.cardGradient}
            >
              <Text style={styles.cardTitle}>{card.charAt(0).toUpperCase() + card.slice(1)}</Text>
              <Text style={styles.cardDescription}>
                {card === 'activities' ? 'Engage in activities like waste cleanups, tree planting, and recycling.' :
                card === 'donations' ? 'Contribute to disaster relief, fight poverty, and combat pollution.' :
                'Track purchases like electronics, clothing, and more.'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      {/* Toggle Dots for switching between cards */}
      <View style={styles.toggleDots}>
        {['activities', 'donations', 'purchases'].map((card) => (
          <TouchableOpacity
            key={card}
            style={activeCard === card ? styles.activeDot : styles.dot}
            onPress={() => handleToggleCard(card)}
          />
        ))}
      </View>

      {/* Bar Chart for Monthly Threshold Distribution */}
      <View style={styles.barChartContainer}>
        <Text style={styles.barChartTitle}>Monthly Threshold Distribution</Text>
        <BarChart
          data={{
            labels: barData.labels,
            datasets: [{
              data: barData.datasets[0].data.map(value => ({
                value,
                color: getBarColor(value)
              })),
            }]
          }}
          width={screenWidth - 40}
          height={220}
          fromZero={true}
          chartConfig={{
            backgroundColor: '#fff', // Set background color to white
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0, // For whole numbers
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            barPercentage: 0.7,
          }}
          style={{
            borderRadius: 15, 
            backgroundColor: '#fff' // White background for clarity
          }}
          verticalLabelRotation={30}
          showBarTops={false}
        />
      </View>
    </ScrollView>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
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
  pieChartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  legend: {
    marginTop: 10,
    alignItems: 'center',
    marginLeft: -20
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  card: {
    width: '30%',
  },
  cardGradient: {
    padding: 15,
    borderRadius: 18,
    alignItems: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
  },
  cardDescription: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
  },
  toggleDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  activeDot: {
    width: 20,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginHorizontal: 5,
  },
  barChartContainer: {
    marginTop: 20,
    backgroundColor: 'white'
  },
  barChartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default CarbonFootprintCalculator;
