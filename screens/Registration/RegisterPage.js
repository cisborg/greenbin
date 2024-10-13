import * as React from "react";
import { TextInput, Alert, TouchableOpacity, ActivityIndicator, Dimensions, Animated, Platform } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker"; 
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/actions/authentication'; 
import { FontSize, Color, Border } from "../../GlobalStyles";
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const baseWidth = 375; 
const baseHeight = 667; 

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
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [selectedCountryCode, setSelectedCountryCode] = React.useState(countryCodes[0].code);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [promoCode, setPromoCode] = React.useState('');
  const [showPromoCodeInput, setShowPromoCodeInput] = React.useState(false);
  const [promoCodeError, setPromoCodeError] = React.useState('');
  
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{9}$/; 
    return phoneRegex.test(number);
  };

  const handleRegister = async () => {
    setLoading(true);
    setErrorMessage('');
    setPromoCodeError('');
    
    // Validation logic moved to prevent blocking registration
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email address. Please enter a valid email.');
      setLoading(false);
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setErrorMessage('Invalid phone number. Please enter a valid phone number.');
      setLoading(false);
      return;
    }

    if (promoCode) {
      const isValidPromoCode = await checkPromoCode(promoCode);
      if (!isValidPromoCode) {
        setPromoCodeError('Promo code is invalid or already used.');
      }
    }

    try {
      await dispatch(registerUser({ email, password, phoneNumber: selectedCountryCode + phoneNumber, promoCode }));

      Alert.alert('Registration Successful!', 'You can now log in to your account.');
      navigation.navigate('SignInPage');
    } catch (error) {
      setErrorMessage('Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checkPromoCode = async (code) => {
    const usedCodes = ['DAVID', 'DISCOUNT10']; 
    return !usedCodes.includes(code);
  };

  return (
    <SafeAreaView style={styles.registerPage}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.welcomeHeader}>GreenBin</Text>
       <View style={styles.header}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
            placeholderTextColor={Color.colorGray_100}
            keyboardType="email-address"
            accessibilityLabel="Email Input"
            accessibilityHint="Enter your email address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Password"
            placeholderTextColor={Color.colorGray_100}
            secureTextEntry
            accessibilityLabel="Password Input"
            accessibilityHint="Enter your password"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.phoneInput}>
            <Picker
              selectedValue={selectedCountryCode}
              style={styles.countryCodePicker}
              onValueChange={(itemValue) => setSelectedCountryCode(itemValue)}
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
          <Text style={styles.promoCodeText}>Have a referral Code?</Text>
        </TouchableOpacity>

        {showPromoCodeInput && (
          <View style={styles.promoCodeContainer}>
            <TextInput
              style={styles.promoCodeInput}
              value={promoCode}
              onChangeText={setPromoCode}
              placeholder="Enter referral Code"
              placeholderTextColor={Color.colorGray_100}
              accessibilityLabel="Promo Code Text Input"
              accessibilityHint="Enter your promo code here"
            />
            {promoCodeError ? <Text style={styles.errorText}>{promoCodeError}</Text> : null}
          </View>
        )}

        <TouchableOpacity
          style={styles.getStartedBtn}
          onPress={handleRegister}
          disabled={loading}
          accessibilityLabel="Register Button"
          accessibilityHint="Press to register your account"
        >
          {loading ? (
            <ActivityIndicator 
              size="small" 
              color="#fff" 
              accessibilityLabel="Loading Registration" 
              accessibilityHint="Please wait while we register your account"
            />
          ) : (
            <Text style={styles.cardText}>Register</Text>
          )}
        </TouchableOpacity>
        
        <View style={styles.dontHaveAnContainer}>
          <Text style={{ fontSize: scale(12) }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignInPage")}>
            <Text style={styles.register}>Login!</Text>
          </TouchableOpacity>
        </View>
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
    padding: scale(15),
  },
 
  welcomeHeader: {
    fontSize: scale(35),
    fontWeight: '900',
    color: 'green',
    position: 'absolute',
    top: scale(5),
    right: scale(15),
    zIndex: 1,
  },
  header: {
    marginBottom: verticalScale(20),
    top: verticalScale(110)
  },
  inputContainer: {
    width: '100%',
    marginBottom: verticalScale(10),
  },
  dontHaveAnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
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
    width: scale(109), 
    height: verticalScale(30),
    fontSize: scale(FontSize.size_base),
    color: 'green',
    borderRadius: 14,
    ...Platform.select({
      ios: {
        backgroundColor: '#f2f2f2',
      },
      android: {
        backgroundColor: '#f2f2f2',
      },
    }),
  },
  input: {
    height: verticalScale(30), 
    borderRadius: Border.br_base,
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowRadius: 3,
    shadowOpacity: 0.25,
    padding: scale(8),
    fontSize: scale(14),
    color: Color.colorBlack,
    backgroundColor: Color.colorWhite,
  },
  inputContainer1: {
    height: verticalScale(30),
    flex: 1,
    padding: scale(8),
    fontSize: scale(14),
    color: Color.colorBlack,
    backgroundColor: Color.colorWhite,
  },
  promoCodeContainer: {
    marginTop: verticalScale(5),
  },
  promoCodeInput: {
    height: verticalScale(30),
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: Border.br_base,
    padding: scale(8),
    fontSize: scale(14),
  },
  promoCodeButton: {
    marginTop: verticalScale(5),
    backgroundColor: 'lightgray',
    borderRadius: Border.br_base,
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(15),
    alignSelf: 'flex-start',
  },
  promoCodeText: {
    fontSize: scale(12),
    color: Color.colorGreen,
    fontWeight: 'bold',
  },
  getStartedBtn: {
    backgroundColor: 'green',
    borderRadius: Border.br_base,
    paddingVertical: verticalScale(8),
    alignItems: 'center',
    marginTop: verticalScale(15),
  },
  errorText: {
    color: 'red',
    fontSize: scale(12),
    marginTop: verticalScale(5),
  },
  label: {
    fontSize: scale(14),
    marginBottom: verticalScale(5),
    fontWeight: '600',
    color: 'green'
  },
  cardText: {
    color: Color.colorWhite,
    fontSize: scale(14),
    fontWeight: 'bold',
  },
  register: {
    color: 'green',
    fontWeight: 'bold',
    marginLeft: scale(5),
  },
});

export default RegisterPage;
