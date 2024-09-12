import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Color, FontFamily} from "../GlobalStyles"
import { useNavigation } from '@react-navigation/core';

const ReportVendorScreen = () => {
  const navigation = useNavigation()
  const [vendorName, setVendorName] = useState('');
  const [reason, setReason] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [incidentDate, setIncidentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [incidentLocation, setIncidentLocation] = useState('');
  const [severity, setSeverity] = useState('Low');
  const [followUp, setFollowUp] = useState(false);
  const [anonymous, setAnonymous] = useState(false);

  const handleSubmit = () => {
    Alert.alert('Report Submitted', 'Thank you for your report!');
    // Handle submission logic here
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Report Vendor</Text>
      <View style={styles.vendorInfo}>
        <Text style={styles.label}>Vendor Name:</Text>
        <TextInput
          style={styles.input}
          value={vendorName}
          onChangeText={setVendorName}
          placeholder="Enter vendor name"
          placeholderTextColor={Color.colorGray_100}

        />
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.vendorImage} />
      </View>

      <Text style={styles.label}>Reason for Reporting:</Text>
      <TextInput
        style={styles.input}
        value={reason}
        onChangeText={setReason}
        placeholder="Enter reason"
        placeholderTextColor={Color.colorGray_100}

      />

      <Text style={styles.label}>Additional Details:</Text>
      <TextInput
        style={styles.textArea}
        value={additionalDetails}
        onChangeText={setAdditionalDetails}
        placeholder="Provide more details"
        placeholderTextColor={Color.colorGray_100}
        multiline
      />

      <Text style={styles.label}>Incident Date:</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.datePicker}>{incidentDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={incidentDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setIncidentDate(selectedDate);
            }
          }}
        />
      )}

      <Text style={styles.label}>Incident Location:</Text>
      <TextInput
        style={styles.input}
        value={incidentLocation}
        onChangeText={setIncidentLocation}
        placeholder="Enter location"
        placeholderTextColor={Color.colorGray_100}
      />

      <Text style={styles.label}>Severity Level:</Text>
      <View style={styles.severityContainer}>
        {['Low', 'Medium', 'High'].map((level) => (
          <TouchableOpacity
            key={level}
            style={severity === level ? styles.severitySelected : styles.severityButton}
            onPress={() => setSeverity(level)}
          >
            <Text style={styles.severityText}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setFollowUp(!followUp)}>
          <Text style={styles.checkbox}>{followUp ? '☑️' : '⬜️'} Follow-up Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAnonymous(!anonymous)}>
          <Text style={styles.checkbox}>{anonymous ? '☑️' : '⬜️'} Anonymous Reporting</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.submit} onPress={()=> navigation.goBack()}>
        <Text style={{color: Color.colorLimegreen_200}}>Submit Report</Text>
      </TouchableOpacity>
      
      <Text style={styles.footer}>
        By submitting this report, you agree to our Terms of Service and Privacy Policy.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
    overflow: 'hidden',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  vendorInfo: {
    marginBottom: 20,
  },
  vendorImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 20,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 14,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 15,
    padding: 10,
    height: 80,
    marginBottom: 15,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 14,
    padding: 10,
    marginBottom: 15,
    textAlign: 'center',
  },
  severityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: 300,
    left: 30
  },
  severityButton: {
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center',
    maxWidth: 200,
    left: 10
  },
  submit: {
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center',
    maxWidth: 200,
    left: 70,
    marginTop: 20
  },
  severitySelected: {
    padding: 10,
    borderWidth: 1,
    borderColor: Color.colorLimegreen_200,
    borderRadius: 14,
    elevation: 3,
    height: 40
  },
  severityText: {
    color: Color.colorLimegreen_200,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  checkbox: {
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    fontSize: 12,
    textAlign: 'center',
    color: '#777777',
  },
});

export default ReportVendorScreen;
