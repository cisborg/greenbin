import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, Modal, ActivityIndicator, SafeAreaView, Animated, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Make sure to install expo-image-picker
import { Color } from '../../GlobalStyles';

const VendorRegister = ({ navigation }) => {
  const [vendorName, setVendorName] = useState('');
  const [profession, setProfession] = useState('');
  const [products, setProducts] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [idPhoto, setIdPhoto] = useState(null);

  const handleRegister = () => {
    // Input validation
    if (!vendorName || !profession || !products || !email || !phone || !address) {
      Alert.alert("All fields are required!");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Please enter a valid email address.");
      return;
    }
    if (!/^\d+$/.test(phone)) {
      Alert.alert("Phone number must be numeric.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalVisible(true);
    }, 2000);
  };

  const pickImage = async (type) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === 'profile') {
        setProfilePhoto(result.assets[0].uri);
      } else {
        setIdPhoto(result.assets[0].uri);
      }
    }
  };

  // Animate screen mount
  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={{ opacity: animation }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>EcoGreen Vendor Registration Form</Text>
          <Text style={styles.description}>Join us in promoting sustainable practices in eCommerce!</Text>

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TextInput
            style={[styles.input, { borderBottomColor: 'green', borderBottomRadius: 10 }]}
            placeholder="Vendor Name"
            value={vendorName}
            onChangeText={setVendorName}
            placeholderTextColor={Color.colorGray_100}

          />

          <TextInput
            style={[styles.input, { borderBottomColor: 'blue' }]}
            placeholder="Profession"
            value={profession}
            onChangeText={setProfession}
            placeholderTextColor={Color.colorGray_100}

          />

          <TextInput
            style={[styles.input, { borderBottomColor: 'orange' }]}
            placeholder="Products Offered"
            value={products}
            onChangeText={setProducts}
            placeholderTextColor={Color.colorGray_100}

          />

          <TextInput
            style={[styles.input, { borderBottomColor: 'black' }]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor={Color.colorGray_100}

          />

          <TextInput
            style={[styles.input, { borderBottomColor: 'green' }]}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholderTextColor={Color.colorGray_100}

          />

          <TextInput
            style={[styles.input, { borderBottomColor: 'blue' }]}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            placeholderTextColor={Color.colorGray_100}
          />

          <View style={styles.photoContainer}>
            <TouchableOpacity onPress={() => pickImage('id')} style={styles.photoButton}>
              <Text style={styles.photoButtonText}>Upload ID Photo (Optional)</Text>
            </TouchableOpacity>
            {idPhoto && <Image source={{ uri: idPhoto }} style={styles.imagePreview} />}
          </View>

          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText} onPress={handleRegister}>
              {loading ? <ActivityIndicator color="#FFFFFF" /> : 'Apply'}
            </Text>
          </View>

          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalText}>Application submitted successfully. Wait for approval.</Text>
                <TouchableOpacity
                  style={styles.okButton}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('Settings'); // Navigate back to Settings
                  }}
                >
                  <Text style={styles.okButtonText}>Okay</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flexGrow: 1,
    padding: '3%',
    marginTop:'10%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'green',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  backButton: {
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderBottomWidth: 1.5,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
  },
  buttonContainer: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  photoContainer: {
    marginBottom: 20,
  },
  photoButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  photoButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  okButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default VendorRegister;
