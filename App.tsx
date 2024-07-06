const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import HomePageExistingUser from "./screens/HomePageExistingUser";
import ProfilePage from "./screens/ProfilePage";
import VendorsProfilePage from "./screens/VendorsProfilePage";
import ChatPage from "./screens/ChatPage";
import ChallengePage from "./screens/ChallengePage";
import EventsInformationPage from "./screens/EventsInformationPage";
import SignInPage from "./screens/SignInPage";
import RegisterPage from "./screens/RegisterPage";
import StartPage from "./screens/StartPage";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

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

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="HomePageExistingUser"
              component={HomePageExistingUser}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfilePage"
              component={ProfilePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VendorsProfilePage"
              component={VendorsProfilePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChatPage"
              component={ChatPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChallengePage"
              component={ChallengePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EventsInformationPage"
              component={EventsInformationPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignInPage"
              component={SignInPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterPage"
              component={RegisterPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="StartPage"
              component={StartPage}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;
