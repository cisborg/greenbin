// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PlaylistScreen from './src/screens/playlist/PlaylistScreen';
import AccountScreen from './src/screens/AccountScreen';
import EventScreen from './src/screens/EventScreen';
import SettingsScreen from './src/screens/SettingScreen';
import LogIn from './src/screens/LogIn';
import SplashScreen from './src/screens/SplashScreen';
import SignUp from './src/screens/SignUp';
import BackgroundLayout from './src/components/BackgroundLayout';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <BackgroundLayout>
      <Tab.Navigator>
        <Tab.Screen name="Playlist" component={PlaylistScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
        <Tab.Screen name="Event" component={EventScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </BackgroundLayout>
  );
}

function AuthScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login">
        {props => (
          <BackgroundLayout>
            <LogIn {...props} />
          </BackgroundLayout>
        )}
      </Stack.Screen>
      <Stack.Screen name="signup">
        {props => (
          <BackgroundLayout>
            <SignUp {...props} />
          </BackgroundLayout>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Auth" component={AuthScreens} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
