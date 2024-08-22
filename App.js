import * as React from "react";

import { View, Image, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VendorsProfilePage from "./screens/VendorsProfilePage";
import HomePageExistingUser from "./screens/HomePageExistingUser";
import ChallengePage from "./screens/ChallengePage";
import SeeAllEvents from "./screens/SeeAllEvents";
import ProfilePage from "./screens/ProfilePage";
import ChatPage from "./screens/ChatPage";
import SignInPage from "./screens/SignInPage";
import RegisterPage from "./screens/RegisterPage";
import StartPage from "./screens/StartPage";
import ManageAccountScreen from "./screens/manageAccount";
import PrepaidRechargeScreen from "./screens/Payment";
import ProfileGCPs from "./screens/ProfileGCPs";
import MessagesScreen from "./screens/messageUI";
import BestPlansScreen from "./screens/BuyBundles";
import LeaderBoard from "./screens/LeaderBoard";
import GreenConnect from "./screens/GreenConnect";
import MessageScreen from "./screens/message";
import YourSquads from "./screens/Squads";
import CallScreen from "./screens/callPage";
import JoinSquads from "./screens/JoinSquads";
import TagList from "./screens/Tags";
import DialPad from "./screens/DialPad";
import WiFiScreen from "./screens/Wifi";
import SendMoneyScreen from "./screens/sendMoney"
import WifiPlans from "./screens/WifiPlan";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VendorList from "./screens/VendorList";
import CreateSquad from "./screens/createSquad";
import GoodHome from "./screens/GreenDaily";
import CartScreen from "./screens/cart";
import WithdrawalScreen from "./screens/Withdrawal";
import WithdrawalSuccessScreen from "./screens/WithdrawalSuccess"
import SendSuccess from "./screens/SendSuccessful";
import BuySuccess from  "./screens/BuyBundleSuccessful";
import  WifiSuccess from "./screens/BuyWifiSuccessful";
import Transactions from "./screens/Transaction";
import ViewSquadScreen from  "./screens/ViewSquads"
import NewPostScreen from  "./screens/PostSquad"
import ChangePassword from "./screens/ChangePassword"
import ReferAndEarn from "./screens/ReferAndEarn";
import ProfileSettings from "./screens/ProfileSettings";
import NotificationScreen from "./screens/ConnectNotification"
import SettingsScreen from "./screens/Settings";
import Checkout from "./screens/Checkout";
import PaymentSuccess from  "./screens/CartPayment"
import  CartDetail from "./screens/productDetail"
import GreenBankAccount from "./screens/GreenBank";
import JoinUsScreen from "./screens/JoinUs";
import DonatePoints from "./screens/DonatePoints";
import DonationHistory from "./screens/DonationHistory";
import BuyAirtimeScreen from "./screens/BuyAirtime";
import AboutScreen from "./screens/AboutUs";
import ReportVendorScreen from "./screens/ReportVendor";
import ProductScreen from "./screens/VendorProducts";
import BuyGoods from "./screens/BuyGoods";
import CarbonFootprintCalculator from "./screens/CarbonCalculator"
import GamesScreen from "./screens/GoGames";
import WalletScreen from "./screens/Crypto";
import LegalScreen from "./screens/LegalScreen";
import SquadScreen from "./screens/SquadsView";
import LeaderboardScreen from "./screens/SquadsAward";
import TagSelection from "./screens/+";
import NotificationsScreen from "./screens/Updates";
import CommentsSection from "./screens/SquadComments";
import ConnectToShops from "./screens/ShopLocator"


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
    width: 404
  },
};

// Define the TabBarIcon component
const TabBarIcon = ({ focused, activeIcon, inactiveIcon, label }) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 5 }}>
      <Image
        source={focused ? activeIcon : inactiveIcon}
        style={{ width: 25, height: 25, borderRadius: 13 }}
      />
      <Text style={{ color: focused ? '#000' : '#888', fontSize: 12 }}>{label}</Text>
    </View>
  );
};

// Define the MainTabs component
const MainTabs = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HomePageExistingUser"
        component={HomePageExistingUser}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon={require('./assets/home.png')}
              inactiveIcon={require('./assets/homeInactive.jpg')}
              label="Home"
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
              activeIcon={require('./assets/challenge.png')}
              inactiveIcon={require('./assets/challengeIn.png')}
              label="Challenges"
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
                  activeIcon={require('./assets/eventsActive.avif')}
                  inactiveIcon={require('./assets/eventsInactive.avif')}
                  label="GrnDaily"
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
              activeIcon={require('./assets/eventsActive.avif')}
              inactiveIcon={require('./assets/eventsInactive.avif')}
              label="Events"
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
              activeIcon={require('./assets/profileActive.avif')}
              inactiveIcon={require('./assets/profileInactive.jpg')}
              label="Profile"
            />
          )
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Manrope-ExtraLight": require("./assets/fonts/Manrope-ExtraLight.ttf"),
    "Manrope-SemiBold": require("./assets/fonts/Manrope-SemiBold.ttf"),
    "Manrope-Bold": require("./assets/fonts/Manrope-Bold.ttf"),
  });

  if (!fontsLoaded || error) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartPage" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StartPage" component={StartPage} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} options={{ headerShown: false }} />
        <Stack.Screen name="SignInPage" component={SignInPage} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="GreenConnect" component={GreenConnect} options={{ headerShown: false }} />
        <Stack.Screen name="message" component={MessageScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Squads" component={YourSquads} options={{ headerShown: false }} />
        <Stack.Screen name="VendorsProfilePage" component={VendorsProfilePage} options={{ headerShown: false }} />
        <Stack.Screen name="ChatPage" component={ChatPage} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={PrepaidRechargeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileGCPs" component={ProfileGCPs} options={{ headerShown: false }} />
        <Stack.Screen name="manageAccount" component={ManageAccountScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BuyBundles" component={BestPlansScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LeaderBoard" component={LeaderBoard} options={{ headerShown: false }} />
        <Stack.Screen name="callPage" component={CallScreen} options={{ headerShown: false }} />
        <Stack.Screen name="JoinSquads" component={JoinSquads} options={{ headerShown: false }} />
        <Stack.Screen name="TagList" component={TagList} options={{ headerShown: false }} />
        <Stack.Screen name="DialPad" component={DialPad} options={{ headerShown: false }} />
        <Stack.Screen name="Wifi" component={WiFiScreen} options={{ headerShown: false }} />
        <Stack.Screen name="sendMoney" component={SendMoneyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WifiPlan" component={WifiPlans} options={{ headerShown: false }} />
        <Stack.Screen name="VendorList" component={VendorList} options={{ headerShown: false }} />
        <Stack.Screen name="createSquad" component={CreateSquad} options={{ headerShown: false }} />
        <Stack.Screen name="cart" component={CartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Withdrawal" component={WithdrawalScreen} options={{ headerShown : false }} />
        <Stack.Screen name="WithdrawalSuccess" component={WithdrawalSuccessScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SendSuccessful" component={SendSuccess} options={{ headerShown: false }} />
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
        <Stack.Screen name="CartPayment" component={PaymentSuccess} options={{ headerShown: false }} />
        <Stack.Screen name="productDetail" component={CartDetail } options={{ headerShown: false }} />
        <Stack.Screen name="GreenBank" component={GreenBankAccount } options={{ headerShown: false }} />
        <Stack.Screen name="JoinUs" component={JoinUsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DonatePoints" component={DonatePoints} options={{ headerShown: false }} />
        <Stack.Screen name="DonationHistory" component={DonationHistory} options={{ headerShown: false }} />
        <Stack.Screen name="BuyAirtime" component={BuyAirtimeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AboutUs" component={AboutScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ReportVendor" component={ReportVendorScreen} options={{ headerShown: false }} />
        <Stack.Screen name="VendorProducts" component={ProductScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BuyGoods" component={BuyGoods} options={{ headerShown: false }} />
        <Stack.Screen name="CarbonCalculator" component={CarbonFootprintCalculator} options={{ headerShown: false }} />
        <Stack.Screen name="GoGames" component={GamesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Crypto" component={WalletScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LegalScreen" component={LegalScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SquadsView" component={SquadScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SquadsAward" component={LeaderboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="+" component={TagSelection} options={{ headerShown: false }} />
        <Stack.Screen name="Updates" component={NotificationsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SquadComments" component={CommentsSection} options={{ headerShown: false }} />
         <Stack.Screen name="ShopLocator" component={ConnectToShops} options={{ headerShown: false }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
