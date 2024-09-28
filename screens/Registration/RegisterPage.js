import * as React from "react";
import { TextInput, Alert, TouchableOpacity, FlatList,Image, ActivityIndicator, Dimensions, Animated } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../../GlobalStyles";
import { SafeAreaView } from 'react-native-safe-area-context';

// Utility functions for scaling
const { width, height } = Dimensions.get('window');
const baseWidth = 375; // Example base width (iPhone 6/7/8)
const baseHeight = 667; // Example base height (iPhone 6/7/8)

const scale = (size) => (width / baseWidth) * size;
const verticalScale = (size) => (height / baseHeight) * size;

const countryCodes = [
  { code: '+254', name: 'Kenya' },
  { code: '+255', name: 'Tanzania' },
  { code: '+256', name: 'Uganda' },
  { code: '+252', name: 'Somalia' },
  { code: '+250', name: 'Rwanda' },
];

const RegisterPage = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [selectedCountryCode, setSelectedCountryCode] = React.useState(countryCodes[0]);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [promoCode, setPromoCode] = React.useState('');
  const [showPromoCodeInput, setShowPromoCodeInput] = React.useState(false);
  const [promoCodeError, setPromoCodeError] = React.useState('');
  const [isSendingOTP, setIsSendingOTP] = React.useState(false);
  const [showCountryCodeDropdown, setShowCountryCodeDropdown] = React.useState(false);
  
  // Animation state
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Start the fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{10}$/; // Adjust regex based on your requirements
    return phoneRegex.test(number);
  };

  const handleSendOTP = async () => {
    setLoading(true);
    setErrorMessage('');
    setPromoCodeError('');
    
    try {
      if (!validatePhoneNumber(phoneNumber)) {
        setErrorMessage('Invalid contact number. Please enter a valid phone number.');
        return;
      }

      // Simulate API call to check if the number is already registered
      const isRegistered = false; // Replace with actual API call
      if (isRegistered) {
        setErrorMessage('Number already registered. Proceed to login.');
        return;
      }

      // Check promo code validity
      if (promoCode) {
        const isValidPromoCode = await checkPromoCode(promoCode);
        if (!isValidPromoCode) {
          setPromoCodeError('Promo code is invalid or already used.');
          return;
        }
      }

      setIsSendingOTP(true);
      // Simulate sending OTP
      setTimeout(() => {
        Alert.alert('OTP sent to:', selectedCountryCode.code + phoneNumber);
        navigation.navigate('otpConfirm', {
          phoneNumber: selectedCountryCode.code + phoneNumber,
        });
      }, 2000); // Delay for 2 seconds
    } catch (error) {
      setErrorMessage('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checkPromoCode = async (code) => {
    // Simulate API call to check promo code
    const usedCodes = ['DAVID', 'DISCOUNT10']; // Example used codes
    return !usedCodes.includes(code);
  };

  return (
    <SafeAreaView style={styles.registerPage}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.welcomeHeader}>GreenBin</Text>
       
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
              accessibilityLabel="Phone Number Input"
              accessibilityHint="Enter your phone number"
            />
          </View>
          {showCountryCodeDropdown && (
            <FlatList
              data={countryCodes}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryCodeItem}
                  onPress={() => {
                    setSelectedCountryCode(item);
                    setShowCountryCodeDropdown(false);
                  }}
                >
                  <Text style={styles.countryCodeText}>{item.code} {item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.code}
              style={styles.dropdown}
            />
          )}
        </View>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity
          style={styles.promoCodeButton}
          onPress={() => setShowPromoCodeInput(!showPromoCodeInput)}
          accessibilityLabel="Promo Code Input"
          accessibilityHint="Press to enter a promo code"
        >
          <Text style={styles.promoCodeText}>Have a Promo Code?</Text>
        </TouchableOpacity>

        {showPromoCodeInput && (
          <View style={styles.promoCodeContainer}>
            <TextInput
              style={styles.promoCodeInput}
              value={promoCode}
              onChangeText={setPromoCode}
              placeholder="Enter Promo Code"
              placeholderTextColor={Color.colorGray_100}
              accessibilityLabel="Promo Code Text Input"
              accessibilityHint="Enter your promo code here"
            />
            {promoCodeError ? <Text style={styles.errorText}>{promoCodeError}</Text> : null}
          </View>
        )}

        <TouchableOpacity
          style={styles.getStartedBtn}
          onPress={handleSendOTP}
          disabled={loading || isSendingOTP}
          accessibilityLabel="Send OTP Button"
          accessibilityHint="Press to send OTP to your phone number"
        >
          {isSendingOTP ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.cardText}>Send OTP</Text>
          )}
        </TouchableOpacity>
        
        <View style={styles.dontHaveAnContainer}>
          <Text style={{ fontSize: scale(14) }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignInPage")}>
            <Text style={styles.register}>Login!</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  registerPage: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    justifyContent: "center",
    padding: scale(20),
  },
 
  welcomeHeader: {
    fontSize: scale(50),
    fontWeight: 'bold',
    color: 'green',
    marginBottom: verticalScale(20),
  },
  inputContainer: {
    width: '100%',
    marginBottom: verticalScale(14),
  },
  dontHaveAnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(14),
    alignSelf: 'center',
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
    paddingHorizontal: scale(10),
    borderRightWidth: 1,
    borderColor: 'lightgray',
    height: verticalScale(40),
    width: scale(70),
  },
  register: {
    color: 'green',
    fontWeight: 'bold',
    marginLeft: scale(8),
    fontSize: scale(14),
  },
  countryCode: {
    fontSize: scale(FontSize.size_base),
    fontWeight: 'bold',
    color: Color.colorGray_600,
  },
  inputContainer1: {
    flex: 1,
    paddingLeft: scale(10),
    height: verticalScale(40),
  },
  label: {
    fontSize: scale(FontSize.size_base),
    color: Color.colorLimegreen_200,
    fontFamily: FontFamily.poppinsBold,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(8),
  },
  errorText: {
    color: 'red',
    marginTop: verticalScale(10),
  },
  getStartedBtn: {
    backgroundColor: Color.colorLimegreen_200,
    borderRadius: 14,
    height: verticalScale(40),
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    marginTop: verticalScale(10),
  },
  cardText: {
    color: "white",
    fontWeight: 'bold',
    fontSize: scale(18),
  },
  dropdown: {
    position: 'absolute',
    top: verticalScale(50),
    left: 0,
    right: 0,
    backgroundColor: 'white',
    elevation: 3,
    zIndex: 1000,
  },
  countryCodeItem: {
    padding: scale(10),
  },
  countryCodeText: {
    fontSize: scale(FontSize.size_base),
  },
  promoCodeButton: {
    marginTop: verticalScale(20),
  },
  promoCodeText: {
    fontSize: scale(FontSize.size_base),
    color: Color.colorLimegreen_200,
    fontWeight: 'bold',
  },
  promoCodeContainer: {
    marginTop: verticalScale(10),
  },
  promoCodeInput: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: Border.br_base,
    padding: scale(10),
  },
});

export default RegisterPage;
