import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  Animated,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Color } from "../../GlobalStyles";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createReport } from '../redux/actions/reportActions';

const ReportVendorScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const [vendorName, setVendorName] = useState('');
  const [reason, setReason] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [incidentDate, setIncidentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [incidentLocation, setIncidentLocation] = useState('');
  const [severity, setSeverity] = useState('Low');
  const [followUp, setFollowUp] = useState(false);
  const [vendorPhone, setVendorPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Redux state
  const reportState = useSelector(state => state.report);
  const { loading: reportLoading, error } = reportState;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleSubmit = () => {
    // Basic validation
    if (!vendorName || !reason || !incidentLocation || !vendorPhone) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    const reportData = {
      vendorName,
      vendorPhone,
      reason,
      additionalDetails,
      incidentDate,
      incidentLocation,
      severity,
      followUp,
    };

    setLoading(true);
    dispatch(createReport(reportData)); // Dispatch createReport action
  };

  useEffect(() => {
    if (reportLoading) {
      setLoading(true);
    } else {
      setLoading(false);
      if (error) {
        Alert.alert('Error', error);
      } else if (!reportLoading) {
        setModalVisible(true); // Show modal on successful report creation
      }
    }
  }, [reportLoading, error]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color={Color.colorGray_100} />
            </TouchableOpacity>
            <Text style={styles.header}>Report Vendor Ticket</Text>
          </View>

          {/* Form Inputs */}
          <View style={styles.vendorInfo}>
            <Text style={styles.label}>Vendor Name:</Text>
            <TextInput
              style={styles.input}
              value={vendorName}
              onChangeText={setVendorName}
              placeholder="Enter vendor name"
              placeholderTextColor={Color.colorGray_100}
            />
          </View>

          <Text style={styles.label}>Vendor Phone:</Text>
          <TextInput
            style={styles.input}
            value={vendorPhone}
            onChangeText={setVendorPhone}
            placeholder="Enter vendor phone number"
            placeholderTextColor={Color.colorGray_100}
            keyboardType="phone-pad"
          />

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
          </View>

          <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
            <Text style={{ color: 'white' }}>Submit Report</Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            By submitting this report, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </ScrollView>

        {loading && (
          <ActivityIndicator size="large" color={'green'} style={styles.loader} />
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            navigation.navigate('VendorsProfilePage');
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Report Submitted Successfully</Text>
              <Text style={styles.modalSubText}>Sorry for the incident, we ensure our customers are served honestly.</Text>
              <TouchableOpacity
                style={styles.okButton}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('HomePageExistingUser');
                }}
              >
                <Text style={styles.okButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: '2%',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: '1%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: '13%',
    color: 'green'
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
    borderRadius: 14,
    padding: 10,
    marginBottom: 15,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1
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
    width: '100%',
  },
  severityButton: {
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  submit: {
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 14,
    marginBottom: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    width: '80%',
    height: '20%',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalSubText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
  },
  okButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 12,
    color: '#777',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    fontSize: 14,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -15,
  },
  severitySelected: {
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 14,
    paddingBottom: -5,
  },
  severityText: {
    color: 'black',
  },
});

export default ReportVendorScreen;
