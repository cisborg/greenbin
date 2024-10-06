import * as React from "react";
import { TextInput, Alert, TouchableOpacity, ActivityIndicator, Dimensions, Animated } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Import Picker
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions'; // Adjust the import path as necessary
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
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [selectedCountryCode, setSelectedCountryCode] = React.useState(countryCodes[0].code);  // Use country code as the initial state
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [promoCode, setPromoCode] = React.useState('');
  const [showPromoCodeInput, setShowPromoCodeInput] = React.useState(false);
  const [promoCodeError, setPromoCodeError] = React.useState('');
  const [isSendingOTP, setIsSendingOTP] = React.useState(false);
  
  // Animation state
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Start the fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    const handleResize = () => {
      const { width: newWidth, height: newHeight } = Dimensions.get('window');
      if (newWidth !== width || newHeight !== height) {
        // Handle any additional scaling logic if necessary
      }
    };

    const subscription = Dimensions.addEventListener('change', handleResize);
    return () => subscription?.remove(); // Cleanup
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
        setLoading(false);
        return;
      }

      // Simulate API call to check if the number is already registered
      const isRegistered = false; // Replace with actual API call
      if (isRegistered) {
        setErrorMessage('Number already registered. Proceed to login.');
        setLoading(false);
        return;
      }

      // Check promo code validity
      if (promoCode) {
        const isValidPromoCode = await checkPromoCode(promoCode);
        if (!isValidPromoCode) {
          setPromoCodeError('Promo code is invalid or already used.');
          setLoading(false);
          return;
        }
      }

      setIsSendingOTP(true);
      
      // Dispatch the registerUser action
      await dispatch(registerUser(selectedCountryCode + phoneNumber, promoCode));

      // Simulate sending OTP
      setTimeout(() => {
        Alert.alert('OTP sent to:', selectedCountryCode + phoneNumber);
        navigation.navigate('otpConfirm', {
          phoneNumber: selectedCountryCode + phoneNumber,
        });
        setIsSendingOTP(false);
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
            <Picker
              selectedValue={selectedCountryCode}
              style={styles.countryCodePicker}
              onValueChange={(itemValue) => setSelectedCountryCode(itemValue)} // Update selected country code
            >
              {countryCodes.map((item) => (
                <Picker.Item key={item.code} label={item.code} value={item.code} />  
              ))}
            </Picker>
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
            <ActivityIndicator 
              size="small" 
              color="#fff" 
              accessibilityLabel="Loading OTP" 
              accessibilityHint="Please wait while we send the OTP"
            />
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
  countryCodePicker: {
    width: scale(110), // Adjust width for picker
    height: verticalScale(40),
    fontSize: scale(FontSize.size_base),
    color: Color.colorWhite,
    borderRadius: 14
  },
  register: {
    color: 'green',
    fontWeight: 'bold',
    marginLeft: scale(8),
    fontSize: scale(14),
  },
  inputContainer1: {
    flex: 1,
    height: verticalScale(40),
    padding: 10,
    fontSize: scale(FontSize.size_base),
    color: Color.colorGray_600,
  },
  promoCodeButton: {
    marginTop: verticalScale(10),
    alignItems: 'center',
  },
  promoCodeText: {
    color: 'green',
    textDecorationLine: 'underline',
  },
  promoCodeContainer: {
    marginTop: verticalScale(10),
  },
  promoCodeInput: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: Border.br_base,
    height: verticalScale(40),
    padding: 10,
    fontSize: scale(FontSize.size_base),
    color: Color.colorGray_600,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: scale(FontSize.size_sm),
  },
  getStartedBtn: {
    backgroundColor: Color.colorLimegreen_200,
    padding: verticalScale(10),
    borderRadius: Border.br_base,
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  cardText: {
    color: Color.colorWhite,
    fontSize: scale(FontSize.size_base),
    fontWeight: 'bold',
  },
});

export default RegisterPage;
