import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, Modal, SafeAreaView, Animated, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Lottie from 'lottie-react-native'; // Import Lottie
import { Color } from '../../GlobalStyles';

const CustomInput = ({ placeholder, value, onChangeText, keyboardType, secureTextEntry, iconName }) => (
  <View style={styles.inputContainer}>
    <Icon name={iconName} size={20} color="#666" style={styles.icon} />
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholderTextColor={Color.colorGray_100}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

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
      {loading ? (
        <View style={styles.loadingContainer}>
          <Lottie source={require('../../assets/lottie/rotateLoad.json')} autoPlay loop /> {/* Adjust the path */}
        </View>
      ) : (
        <Animated.View style={{ opacity: animation }}>
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}> Vendor Registration Form</Text>
            <Text style={styles.description}>Join us in promoting sustainable practices in eCommerce!</Text>
            <CustomInput
              placeholder="Vendor Name"
              value={vendorName}
              onChangeText={setVendorName}
              iconName="user"
            />
            <CustomInput
              placeholder="Profession"
              value={profession}
              onChangeText={setProfession}
              iconName="briefcase"
            />
            <CustomInput
              placeholder="Products Offered"
              value={products}
              onChangeText={setProducts}
              iconName="tags"
            />
            <CustomInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              iconName="envelope"
            />
            <CustomInput
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              iconName="phone"
            />
            <CustomInput
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
              iconName="home"
            />
            <View style={styles.photoContainer}>
              <TouchableOpacity onPress={() => pickImage('id')} style={styles.photoButton}>
                <Text style={styles.photoButtonText}>Upload ID Photo (Optional)</Text>
              </TouchableOpacity>
              {idPhoto &&<FastImage source={{ uri: idPhoto }} style={styles.imagePreview} resizeMode={FastImage.resizeMode.cover} />
            }
            </View>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText} onPress={handleRegister}>
                Apply
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
                      navigation.goBack();
                    }}
                  >
                    <Text style={styles.okButtonText}>Okay</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </ScrollView>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 10,
    marginLeft: '4%',
  },
  description: {
    fontSize: 15,
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
  },
  photoContainer: {
    marginVertical: 20,
  },
  photoButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 18,
    alignItems: 'center',
  },
  photoButtonText: {
    color: '#fff',
  },
  buttonContainer: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 18,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
  },
  okButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  okButtonText: {
    color: '#fff',
  },
});

export default VendorRegister;
