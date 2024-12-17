import 'react-native-gesture-handler'; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, Platform,StatusBar, Dimensions } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VendorsProfilePage from "./screens/Vendors/VendorsProfilePage";
import HomePageExistingUser from "./screens/MainPage/HomePageExistingUser";
import EventForm from "./screens/Squads/EventForm";
import Insurance from "./screens/e-Commerce/Insurance";
import FriendScreen from "./screens/GreenConnect/Friends";
import ChallengePage from "./screens/MainPage/ChallengePage";
import SeeAllEvents from "./screens/MainPage/SeeAllEvents";
import SignInPage from "./screens/Registration/SignInPage";
import RegisterPage from "./screens/Registration/RegisterPage";
import StartPage from "./screens/MainPage/StartPage";
import ManageAccountScreen from "./screens/Registration/manageAccount";
import PrepaidRechargeScreen from "./screens/GreenPoints/Payment";
import ProfileGCPs from "./screens/e-Commerce/ProfileGCPs";
import MessagesScreen from "./screens/GreenConnect/messageUI";
import BuyScreen from "./screens/QuickActions/BuyBundles";
import LeaderBoard from "./screens/MainPage/Happy";
import GreenConnect from "./screens/MainPage/GreenConnect";
import YourSquads from "./screens/Squads/Squads";
import JoinSquads from "./screens/Squads/JoinSquads";
import TagList from "./screens/Squads/Tags";
import DialPad from "./screens/GreenPoints/DialPad";
import WiFiScreen from "./screens/QuickActions/Wifi";
import WifiPlans from "./screens/QuickActions/WifiPlan";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VendorList from "./screens/Vendors/VendorList";
import CreateSquad from "./screens/Squads/createSquad";
import GoodHome from "./screens/MainPage/GreenDaily";
import CartScreen from "./screens/e-Commerce/cart";
import BuySuccess from  "./screens/QuickActions/BuyBundleSuccessful";
import  WifiSuccess from "./screens/QuickActions/BuyWifiSuccessful";
import Transactions from "./screens/e-Commerce/Transaction";
import ViewSquadScreen from  "./screens/Squads/ViewSquads"
import NewPostScreen from  "./screens/Squads/PostSquad"
import ChangePassword from "./screens/Registration/ChangePassword"
import ReferAndEarn from "./screens/GreenPoints/ReferAndEarn";
import ProfileSettings from "./screens/Registration/ProfileSettings";
import NotificationScreen from "./screens/GreenConnect/ConnectNotification"
import SettingsScreen from "./screens/GreenConnect/Settings";
import Checkout from "./screens/e-Commerce/Checkout";
import  CartDetail from "./screens/e-Commerce/productDetail"
import GreenBankAccount from "./screens/e-Commerce/GreenBank";
import JoinUsScreen from "./screens/AboutApp/JoinUs";
import DonatePoints from "./screens/GreenPoints/DonatePoints";
import NotifScreen from "./screens/GreenPoints/PurchaseHist";
import AboutScreen from "./screens/AboutApp/AboutUs";
import ReportVendorScreen from "./screens/Vendors/ReportVendor";
import ProductScreen from "./screens/Vendors/VendorProducts";
import BuyGoods from "./screens/QuickActions/BuyGoods";
import CarbonFootprintCalculator from "./screens/GreenPoints/CarbonCalculator"
import GamesScreen from "./screens/QuickActions/GoGames";
import WalletScreen from "./screens/QuickActions/Crypto";
import LegalScreen from "./screens/AboutApp/LegalScreen";
import LeaderboardScreen from "./screens/Squads/SquadsAward";
import TagSelection from "./screens/Squads/selectTag";
import NotificationsScreen from "./screens/Squads/Updates";
import CommentsSection from "./screens/Squads/SquadComments";
import ConnectToShops from "./screens/e-Commerce/ShopLocator"
import ProfilePage from "./screens/MainPage/ProfilePage";
import VendorChat from "./screens/Vendors/VendorChat";
import ViewSquad2Screen from  "./screens/Squads/ViewSquads2"
import PaymentConfirmed from "./screens/GreenPoints/paymentConfirmed";
import ItemGridScreen from "./screens/e-Commerce/allProducts";
import DonationConfirmed from "./screens/GreenPoints/donationConfirmed";
import GetPremium from "./screens/AboutApp/getPremium";
import HelpSupportScreen from "./screens/AboutApp/Support";
import FAQScreen from "./screens/AboutApp/FAQ";
import VendorRegister from "./screens/Vendors/VendorRegister";
import HelpfulTips from "./screens/AboutApp/HelpFull";
import SquadConfirmation from "./screens/Squads/Confirmed";
import SquadCreated from "./screens/Squads/SquadCreated";
import RatingModal from "./screens/AboutApp/AppRating";
import ChatScreen  from "./screens/GreenConnect/chatConnect"
import HistoryScreen from "./screens/GreenPoints/donationHist"
import FollowedVendors from "./screens/Vendors/VendorsFollowed"
import Approved from "./screens/Squads/Approved";
import VendorRating from './screens/Vendors/RateVendor';
import Products from "./screens/e-Commerce/Products";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Color } from "./GlobalStyles";
import PostFeed from "./screens/Squads/PostFeed";
import FlashSale from "./screens/e-Commerce/FlashSale";
import SalesList from "./screens/e-Commerce/SalesList";
import CoinRewards from "./screens/GreenPoints/GreenCoins";
import Tailored from "./screens/e-Commerce/Tailored";
import ProductUpload from "./screens/Vendors/VendorUpload";
import RegisterCode from "./screens/e-Commerce/RegisterBankCode";
import  GreenBankCodeScreen from "./screens/e-Commerce/CodeAccept";
import AssetsScreen from "./screens/e-Commerce/Assets";
import Subscribed from "./screens/e-Commerce/SubscribedProducts";
import SquadMembers from "./screens/Squads/SquadMembers";
import GreenBin from "./screens/QuickActions/greenBin";
import SurveyScreen from "./screens/e-Commerce/GreenSurvey";
import ProductRating from "./screens/e-Commerce/ProductRating"
import AppCarousel from "./screens/MainPage/AppCarousel";
import QRCodeScanner from "./screens/GreenPoints/QRCodeScanner";
import CallScreen from './screens/Vendors/CallPage';
import IncomingCallScreen from './screens/Vendors/IncomingCall';
import { useState } from 'react';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const windowWidth = Dimensions.get('window').width;
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderRadius: 18,
    shadowColor: "rgba(0,0,0,0.03)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50, // Increased height for text
    width: windowWidth
  },
};

// Define the TabBarIcon component
const TabBarIcon = ({ focused, activeIcon, inactiveIcon, label }) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 5 }}>
      {focused ? (
        <MaterialCommunityIcons name={activeIcon} size={25} color={Color.colorLimegreen_200} />
      ) : (
        <MaterialCommunityIcons name={inactiveIcon} size={25} color={Color.colorGray_100} />
      )}
      <Text style={{ color: focused ? '#000' : '#888', fontSize: 10 }}>{label}</Text>
    </View>
  );
};


// Define the MainTabs component
const MainTabs = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 25 : 0 }}>

    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HomePageExistingUser"
        component={HomePageExistingUser}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon="home-circle" 
              inactiveIcon="home-circle"
              label="Home" // Add label here
            />
          )
        }}
      />
      <Tab.Screen
        name="ChallengePage"
        component={ChallengePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon="lightning-bolt-circle"
              inactiveIcon="lightning-bolt-circle"
              label="Shop" // Add label here
            />
          )
        }}
      />
      <Tab.Screen
        name="GreenDaily"
        component={GoodHome}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon="crowd"
              inactiveIcon="crowd"
              label="Discover" // Add label here
            />
          )
        }}
      />
      <Tab.Screen
        name="SeeAllEvents"
        component={SeeAllEvents}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon="map-marker"
              inactiveIcon="map-marker"
              label="Events" // Add label here
            />
          )
        }}
      />
      <Tab.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon="account"
              inactiveIcon="account"
              label="Me" // Add label here
            />
          )
        }}
      />
    </Tab.Navigator>
    </SafeAreaView>
  );
};


const App = () => {
  const [incomingCall, setIncomingCall] = useState(null);

  const [fontsLoaded, error] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Manrope-ExtraLight": require("./assets/fonts/Manrope-ExtraLight.ttf"),
    "Manrope-SemiBold": require("./assets/fonts/Manrope-SemiBold.ttf"),
    "Manrope-Bold": require("./assets/fonts/Manrope-Bold.ttf"),
  });

  // Check if fonts are loaded or there's an error
  if (!fontsLoaded || error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.colorBlack} barStyle="light-content" />
      {incomingCall ? (
        <IncomingCallScreen call={incomingCall} onClose={() => setIncomingCall(null)} />
      ) : (
        <Provider store={store}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </GestureHandlerRootView>
        </Provider>
      )}
    </View>
  );
};


  const AppNavigator =() => {
    <Stack.Navigator initialRouteName="AppCarousel" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppCarousel" component={AppCarousel} options={{ headerShown: false }} />
      <Stack.Screen name="StartPage" component={StartPage} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterPage" component={RegisterPage} options={{ headerShown: false }} />
      <Stack.Screen name="SignInPage" component={SignInPage} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="Friends" component={FriendScreen} options={{ headerShown: false }} />
      <Stack.Screen name="GreenConnect" component={GreenConnect} options={{ headerShown: false }} />
      <Stack.Screen name="Squads" component={YourSquads} options={{ headerShown: false }} />
      <Stack.Screen name="VendorsProfilePage" component={VendorsProfilePage} options={{ headerShown: false }} />
      <Stack.Screen name="Payment" component={PrepaidRechargeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileGCPs" component={ProfileGCPs} options={{ headerShown: false }} />
      <Stack.Screen name="manageAccount" component={ManageAccountScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BuyBundles" component={BuyScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Happy" component={LeaderBoard} options={{ headerShown: false }} />
      <Stack.Screen name="JoinSquads" component={JoinSquads} options={{ headerShown: false }} />
      <Stack.Screen name="TagList" component={TagList} options={{ headerShown: false }} />
      <Stack.Screen name="DialPad" component={DialPad} options={{ headerShown: false }} />
      <Stack.Screen name="Wifi" component={WiFiScreen} options={{ headerShown: false }} />
      <Stack.Screen name="WifiPlan" component={WifiPlans} options={{ headerShown: false }} />
      <Stack.Screen name="VendorList" component={VendorList} options={{ headerShown: false }} />
      <Stack.Screen name="createSquad" component={CreateSquad} options={{ headerShown: false }} />
      <Stack.Screen name="cart" component={CartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BuyBundleSuccessful" component={BuySuccess} options={{ headerShown: false }} />
      <Stack.Screen name="messageUI" component={MessagesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BuyWifiSuccessful" component={WifiSuccess} options={{ headerShown: false }} />
      <Stack.Screen name="Transaction" component={Transactions} options={{ headerShown: false }} />
      <Stack.Screen name="ViewSquads" component={ViewSquadScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PostSquad" component={NewPostScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false  }} />
      <Stack.Screen name="ReferAndEarn" component={ReferAndEarn} options={{ headerShown: false  }} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettings} options={{ headerShown: false  }} />
      <Stack.Screen name="ConnectNotification" component={NotificationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
      <Stack.Screen name="productDetail" component={CartDetail } options={{ headerShown: false }} />
      <Stack.Screen name="GreenBank" component={GreenBankAccount } options={{ headerShown: false }} />
      <Stack.Screen name="JoinUs" component={JoinUsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PurchaseHist" component={NotifScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AboutUs" component={AboutScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ReportVendor" component={ReportVendorScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VendorProducts" component={ProductScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RateVendor" component={VendorRating} options={{ headerShown: false }} />
      <Stack.Screen name="BuyGoods" component={BuyGoods} options={{ headerShown: false }} />
      <Stack.Screen name="CarbonCalculator" component={CarbonFootprintCalculator} options={{ headerShown: false }} />
      <Stack.Screen name="GoGames" component={GamesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Crypto" component={WalletScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LegalScreen" component={LegalScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SquadsAward" component={LeaderboardScreen} options={{ headerShown: false }} />
      <Stack.Screen name="selectTag" component={TagSelection} options={{ headerShown: false }} />
      <Stack.Screen name="Updates" component={NotificationsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SquadComments" component={CommentsSection} options={{ headerShown: false }} />
      <Stack.Screen name="ShopLocator" component={ConnectToShops} options={{ headerShown: false }} />
      <Stack.Screen name="VendorChat" component={VendorChat} options={{ headerShown: false }} />
      <Stack.Screen name="ViewSquads2" component={ViewSquad2Screen} options={{ headerShown: false }} />
      <Stack.Screen name="paymentConfirmed" component={PaymentConfirmed} options={{ headerShown: false }} />
      <Stack.Screen name="allProducts" component={ItemGridScreen} options={{ headerShown: false }} />
      <Stack.Screen name="donationConfirmed" component={DonationConfirmed} options={{ headerShown: false }} />
      <Stack.Screen name="getPremium" component={GetPremium} options={{ headerShown: false }} />
      <Stack.Screen name="Support" component={HelpSupportScreen} options={{ headerShown: false }} />
      <Stack.Screen name="FAQ" component={FAQScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VendorRegister" component={VendorRegister} options={{ headerShown: false }} />
      <Stack.Screen name="HelpFull" component={HelpfulTips} options={{ headerShown: false }} />
      <Stack.Screen name="Confirmed" component={SquadConfirmation} options={{ headerShown: false }} />
      <Stack.Screen name="SquadCreated" component={SquadCreated} options={{ headerShown: false }} />
      <Stack.Screen name="AppRating" component={RatingModal} options={{ headerShown: false }} />
      <Stack.Screen name="chatConnect" component={ChatScreen} options={{ headerShown: false }} />
      <Stack.Screen name="donationHist" component={HistoryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DonatePoints" component={DonatePoints} options={{ headerShown: false }} />
      <Stack.Screen name="VendorsFollowed" component={FollowedVendors} options={{ headerShown: false }} />
      <Stack.Screen name="Approved" component={Approved} options={{ headerShown: false }} />
      <Stack.Screen name="Products" component={Products} options={{ headerShown: false }} />
      <Stack.Screen name="EventForm" component={EventForm} options={{ headerShown: false }} />
      <Stack.Screen name="PostFeed" component={PostFeed} options={{ headerShown: false }} />
      <Stack.Screen name="FlashSale" component={FlashSale} options={{ headerShown: false }} />
      <Stack.Screen name="SalesList" component={SalesList} options={{ headerShown: false }} />
      <Stack.Screen name="GreenCoins" component={CoinRewards} options={{ headerShown: false }} />
      <Stack.Screen name="Insurance" component={Insurance} options={{ headerShown: false }} />
      <Stack.Screen name="Tailored" component={Tailored} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterBankCode" component={RegisterCode} options={{ headerShown: false }} />
      <Stack.Screen name="VendorUpload" component={ProductUpload} options={{ headerShown: false }} />
      <Stack.Screen name="CodeAccept" component={GreenBankCodeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SquadMembers" component={SquadMembers} options={{ headerShown: false }} />
      <Stack.Screen name="Assets" component={AssetsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SubscribedProducts" component={Subscribed} options={{ headerShown: false }} />
      <Stack.Screen name="greenBin" component={GreenBin} options={{ headerShown: false }} />
      <Stack.Screen name="GreenSurvey" component={SurveyScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductRating" component={ProductRating} options={{ headerShown: false }} />
      <Stack.Screen name="QRCodeScanner" component={QRCodeScanner} options={{ headerShown: false }} />
      <Stack.Screen name="CallPage" component={CallScreen} options={{ headerShown: false }} />
      <Stack.Screen name="IncomingCall" component={IncomingCallScreen} options={{ headerShown: false }} />




    </Stack.Navigator>
    }


export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // Adjust padding if needed
  },
});

