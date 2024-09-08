import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Color } from '../GlobalStyles';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/core';

const CarbonFootprintCalculator = () => {
  const navigation = useNavigation();
  const [wasteGenerated, setWasteGenerated] = useState(0);
  const [recycledWaste, setRecycledWaste] = useState(0);
  const [compostedWaste, setCompostedWaste] = useState(0);
  const [renewableEnergy, setRenewableEnergy] = useState(0);
  const [treePlanted, setTreePlanted] = useState(0);
  const [ecoTransactions, setEcoTransactions] = useState(0);
  const [donations, setDonations] = useState(0);

  const [showCongratulations, setShowCongratulations] = useState(false);
  const blinkAnim = useRef(new Animated.Value(1)).current;

  const baselines = {
    totalWaste: 1000, // kg
    recycledWaste: 800, // kg
    compostedWaste: 500, // kg
    renewableEnergy: 2000, // kWh
    treeImpact: 100, // trees
    ecoTransactions: 2000, // dollars
    donations: 1000, // dollars
  };

  const totalThreshold = 7400; // Total threshold for contributions

  const calculateTotalContribution = () => {
    return (
      Math.min(wasteGenerated, baselines.totalWaste) +
      Math.min(recycledWaste, baselines.recycledWaste) +
      Math.min(compostedWaste, baselines.compostedWaste) +
      Math.min(renewableEnergy, baselines.renewableEnergy) +
      Math.min(treePlanted, baselines.treeImpact) +
      Math.min(ecoTransactions, baselines.ecoTransactions) +
      Math.min(donations, baselines.donations)
    );
  };

  const calculateAverageContribution = () => {
    const totalInputs = calculateTotalContribution();
    const totalThreshold = Object.values(baselines).reduce((acc, val) => acc + val, 0);
    return (totalInputs / totalThreshold) * 100 || 0;
  };

  const totalContribution = calculateTotalContribution();
  const averageContribution = calculateAverageContribution();

  const data = [
    { name: 'Total Waste', population: wasteGenerated, color: '#FF6384' },
    { name: 'Recycled Waste', population: recycledWaste, color: '#36A2EB' },
    { name: 'Composted Waste', population: compostedWaste, color: '#FFCE56' },
    { name: 'Renewable Energy Impact', population: renewableEnergy, color: '#4BC0C0' },
    { name: 'Tree Planting Impact', population: treePlanted, color: '#9966FF' },
    { name: 'Eco Transactions', population: ecoTransactions, color: '#FF9F40' },
    { name: 'Donations', population: donations, color: '#4B0082' },
  ];

  // Filter out categories with zero population for better visualization
  const chartData = data.filter(item => item.population > 0);

  useEffect(() => {
    if (averageContribution >= 60) {
      setShowCongratulations(true);
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(blinkAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        { iterations: 6 }
      ).start();
    }
  }, [averageContribution]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircle" size={31} color="green" />
        </TouchableOpacity>
        <Text style={styles.title}>Carbon Footprint Calculator</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder={`Total Waste Generated (kg) - Threshold: ${baselines.totalWaste}`}
        keyboardType="numeric"
        onChangeText={text => setWasteGenerated(Number(text))}
        placeholderTextColor="#FF6384"
      />
      <TextInput
        style={styles.input}
        placeholder={`Recycled Waste (kg) - Threshold: ${baselines.recycledWaste}`}
        keyboardType="numeric"
        onChangeText={text => setRecycledWaste(Number(text))}
        placeholderTextColor="#36A2EB"
      />
      <TextInput
        style={styles.input}
        placeholder={`Composted Waste (kg) - Threshold: ${baselines.compostedWaste}`}
        keyboardType="numeric"
        onChangeText={text => setCompostedWaste(Number(text))}
        placeholderTextColor="#FFCE56"
      />
      <TextInput
        style={styles.input}
        placeholder={`Renewable Energy Usage (kWh) - Threshold: ${baselines.renewableEnergy}`}
        keyboardType="numeric"
        onChangeText={text => setRenewableEnergy(Number(text))}
        placeholderTextColor="#4BC0C0"
      />
      <TextInput
        style={styles.input}
        placeholder={`Trees Planted - Threshold: ${baselines.treeImpact}`}
        keyboardType="numeric"
        onChangeText={text => setTreePlanted(Number(text))}
        placeholderTextColor="#9966FF"
      />
      <TextInput
        style={styles.input}
        placeholder={`Eco-Friendly Transactions ($) - Threshold: ${baselines.ecoTransactions}`}
        keyboardType="numeric"
        onChangeText={text => setEcoTransactions(Number(text))}
        placeholderTextColor="#FF9F40"
      />
      <TextInput
        style={styles.input}
        placeholder={`Donations to Environmental Causes ($) - Threshold: ${baselines.donations}`}
        keyboardType="numeric"
        onChangeText={text => setDonations(Number(text))}
        placeholderTextColor="#4B0082"
      />
      
      {/* Display total contribution against total threshold */}
      <Text style={styles.milestone}>
        Milestone: {totalContribution} / {totalThreshold} 
        ({((totalContribution / totalThreshold) * 100).toFixed(2)}% of threshold achieved)
      </Text>

      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          width={300}
          height={200}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="5"
          absolute
          marginLeft="10"
        />
      </View>

      {showCongratulations ? (
        <Animated.Text style={[styles.congratulationsNote, { opacity: blinkAnim }]}>
          Congratulations you've finally won a chance at our company!
        </Animated.Text>
      ) : (
        <Text style={styles.note}>
          Note: Reach 60% to earn big points and potential absorption by our company!
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    width: 404
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'orange',
    marginLeft: 10,
    marginTop: 15
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  milestone: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    textAlign: 'center',
    color: Color.colorLimegreen_200,
  },
  note: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 10,
    textAlign: 'center', 
    color: '#FF9F40',
  },
  congratulationsNote: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    textAlign: 'center',
    color: Color.colorLimegreen_200
  }

})

export default CarbonFootprintCalculator;