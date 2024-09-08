import * as React from "react";
import { TextInput, Alert, TouchableOpacity, FlatList } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const countryCodes = [
  { code: '+254', name: 'Kenya' },
  { code: '+255', name: 'Tanzania' },
  { code: '+256', name: 'Uganda' },
  // Add more country codes as needed
];

const RegisterPage = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isPhone, setIsPhone] = React.useState(true);
  const [selectedCountryCode, setSelectedCountryCode] = React.useState(countryCodes[0]);
  const [promoCode, setPromoCode] = React.useState('');
  const [showPromoInput, setShowPromoInput] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showCountryCodeDropdown, setShowCountryCodeDropdown] = React.useState(false);
  const [loading, setLoading] = React.useState(false); // Loading state

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{10}$/; // Adjust regex based on your requirements
    return phoneRegex.test(number);
  };

  const handleSendOTP = async () => {
    setLoading(true); // Start loading
    try {
      if (isPhone && validatePhoneNumber(phoneNumber)) {
        // Call your backend API to send OTP here
        Alert.alert('OTP sent to:', selectedCountryCode.code + phoneNumber);
        
        // Navigate to OTP confirmation screen
        navigation.navigate('otpConfirm', {
          phoneNumber: selectedCountryCode.code + phoneNumber,
        });
      } else if (!isPhone && email) {
        // Validate email format
        Alert.alert('OTP sent to:', email);
        
        // Navigate to OTP confirmation screen
        navigation.navigate('OtpConfirmationScreen', {
          email: email,
        });
      } else {
        Alert.alert('Error', 'Please enter a valid phone number or email.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleRegisterEmail = () => {
    if (password === confirmPassword) {
      Alert.alert('Registered Successfully!');
      navigation.navigate("SignInPage");
    } else {
      Alert.alert('Error', 'Passwords do not match.');
    }
  };

  const handleCountryCodeSelect = (item) => {
    setSelectedCountryCode(item);
    setShowCountryCodeDropdown(false);
  };

  const togglePromoInput = () => {
    setShowPromoInput(!showPromoInput);
  };

  return (
    <View style={styles.registerPage}>
      
      <View style={styles.welcomeMessage}>
        <Text style={[styles.greenbin, styles.greenbinFlexBox]}>GreenBin!</Text>
        <Text style={[styles.welcomeTo, styles.welcomeToTypo]}>Welcome to</Text>
      </View>

      <View style={styles.navbar}>
        <TouchableOpacity 
          onPress={() => setIsPhone(true)} 
          style={[styles.navItem, isPhone && styles.activeNav]}
        >
          <Text style={styles.navText}>Phone Number</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setIsPhone(false)} 
          style={[styles.navItem, !isPhone && styles.activeNav]}
        >
          <Text style={styles.navText}>Email</Text>
        </TouchableOpacity>
      </View>

      {isPhone ? (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.phoneInput}>
            <TouchableOpacity 
              style={styles.countryCodeContainer} 
              onPress={() => setShowCountryCodeDropdown(!showCountryCodeDropdown)}
            >
              <Text style={styles.countryCode}>{selectedCountryCode.code}</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.inputContainer1}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter Phone Number"
              placeholderTextColor={Color.colorGray_100}
              keyboardType="phone-pad"
            />
          </View>
          {showCountryCodeDropdown && (
            <FlatList
              data={countryCodes}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryCodeItem}
                  onPress={() => handleCountryCodeSelect(item)}
                >
                  <Text style={styles.countryCodeText}>{item.code} {item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.code}
              style={styles.dropdown}
            />
          )}
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.inputContainer1}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
            placeholderTextColor={Color.colorGray_100}
            keyboardType="email-address"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.inputContainer1}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Password"
            placeholderTextColor={Color.colorGray_100}
            secureTextEntry
          />
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.inputContainer1}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            placeholderTextColor={Color.colorGray_100}
            secureTextEntry
          />
        </View>
      )}

      <TouchableOpacity onPress={togglePromoInput} style={styles.promoCodeHeader}>
        <Text style={styles.promoCodeText}>Promo Code?</Text>
      </TouchableOpacity>
      {showPromoInput && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputContainer1}
            value={promoCode}
            onChangeText={setPromoCode}
            placeholder="Enter Promo Code"
            placeholderTextColor={Color.colorGray_100}
          />
        </View>
      )}

      <TouchableOpacity
        style={styles.getStartedBtn}
        onPress={isPhone ? handleSendOTP : handleRegisterEmail}
        disabled={loading} // Disable button when loading
      >
        <Text style={styles.cardText}>{loading ? 'Sending...' : (isPhone ? 'Send OTP' : 'Register')}</Text>
      </TouchableOpacity>

      <View style={styles.createAccountContainer}>
        <Text style={styles.createAccountText}>
          Already have an account? 
          <Text style={{color: Color.colorLimegreen_200, marginLeft: 5}} onPress={() => navigation.navigate('SignInPage')}>
            Login
          </Text>
        </Text>
      </View>
      <Text style={styles.title1}>Your GateWay to Sustainable Future!</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  registerPage: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: 404,
  },
  welcomeMessage: {
    top: 34,
    left: 80,
    height: 63,
    width: 229,
    position: "absolute",
  },
  greenbinFlexBox: {
    textAlign: "center",
    position: "absolute",
  }, 
  welcomeToTypo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
  },
  welcomeTo: {
    left: 140,
    color: Color.colorGray_800,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    top: 0,
    width: 200,
    marginBottom: 17
  },
  greenbin: {
    top: 13,
    left: 0,
    fontSize: 41,
    color: Color.colorLimegreen_100,
    height: 56,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    width: 320,
  },
 
  title1: {
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
    left: -13,
    marginTop: 30,
    width: 340,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_base,
  },
  navItem: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
    borderRadius: Border.br_base
  },
  activeNav: {
    backgroundColor: Color.colorWhitesmoke, // Light gray background for selected
  },
  navText: {
    fontSize: FontSize.size_base,
    color: Color.colorGray_600,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 14,
    
  },
  inputContainer1: {
    width: '100%',
    marginBottom: 0,
    paddingLeft:13,
    shadowColor: '#000',
    borderRadius: 12,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 40,
    justifyContent: 'center',
    
    
  },
  label: {
    fontSize: FontSize.size_base,
    color: Color.colorLimegreen_200,
    fontFamily: FontFamily.poppinsBold,
    marginTop: 10
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: Border.br_base,
    overflow: 'hidden',
    
  },
  countryCodeContainer: {
    backgroundColor: Color.colorWhite,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderColor: 'lightgray',
    height: 40,
    width: 70,
  },
  countryCode: {
    fontSize: FontSize.size_base,
    fontWeight: 'bold',
    color: Color.colorGray_600,
  },
  inputField: {
    height: 40,
    flex: 1,
    backgroundColor: Color.colorWhite,
    paddingHorizontal: 10,
    fontSize: FontSize.size_base,
    borderRadius: 10,
    width: 250,
    left: 10

  },
  
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderRadius: Border.br_base,
    elevation: 3,
    zIndex: 3,
    width: 150
  },
  countryCodeItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  countryCodeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  promoCodeHeader: {
    marginTop: 15,
    marginBottom: 10,
  },
  promoCodeText: {
    fontSize: FontSize.size_base,
    color: Color.colorLimegreen_200,
    textDecorationLine: 'underline',
  },
  getStartedBtn: {
    backgroundColor: Color.colorLimegreen_200,
    borderRadius: 18,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    marginTop: 20,
    elevation: 3,
  },
  cardText: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 18,
  },
  createAccountContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  createAccountText: {
    fontSize: FontSize.size_sm,
    color: Color.colorGray_600,
  },
});

export default RegisterPage;
