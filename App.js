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
import Cover from "./screens/ProfilePageCopy";
import BestPlansScreen from "./screens/BuyBundles";
import LeaderBoard from "./screens/LeaderBoard";
import GreenConnect from "./screens/GreenConnect";
import MessageScreen from "./screens/message";
import SquadsScreen from "./screens/Squads";
import CallingScreen from "./screens/callPage";
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
        <Stack.Screen name="squadList" component={SquadsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="VendorsProfilePage" component={VendorsProfilePage} options={{ headerShown: false }} />
        <Stack.Screen name="ChatPage" component={ChatPage} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={PrepaidRechargeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileGCPs" component={ProfileGCPs} options={{ headerShown: false }} />
        <Stack.Screen name="manageAccount" component={ManageAccountScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfilePageCopy" component={Cover} options={{ headerShown: false }} />
        <Stack.Screen name="BuyBundles" component={BestPlansScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LeaderBoard" component={LeaderBoard} options={{ headerShown: false }} />
        <Stack.Screen name="callPage" component={CallingScreen} options={{ headerShown: false }} />
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



      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
