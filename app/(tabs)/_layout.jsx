// app/_layout.js
import { Tabs } from 'expo-router';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Define tab configurations
const tabConfig = [
  {
    name: 'homepage',
    focusedIcon: 'home',
    unfocusedIcon: 'home-outline',
    iconComponent: Ionicons
  },
  {
    name: 'challenges',
    focusedIcon: 'lightning-bolt',
    unfocusedIcon: 'lightning-bolt-outline',
    iconComponent: MaterialCommunityIcons
  },
  {
    name: 'news',
    focusedIcon: 'menu',
    unfocusedIcon: 'menu',
    iconComponent: MaterialCommunityIcons
  },
  {
    name: '[id]',
    focusedIcon: 'user-circle-o',
    unfocusedIcon: 'user-o',
    iconComponent: FontAwesome
  },
];

// Function to determine tab options based on route
const tabOptions = ({ route }) => {
  const routeConfig = tabConfig.find(config => config.name === route.name);
  const iconName = routeConfig ? (routeConfig.focusedIcon) : '';
  const IconComponent = routeConfig ? routeConfig.iconComponent : Ionicons; // Fallback to Ionicons if no config

  return {
    tabBarIcon: ({ focused, color, size }) => {
      const iconName = focused ? routeConfig.focusedIcon : routeConfig.unfocusedIcon;
      return <IconComponent name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: 'white',
    tabBarStyle: { backgroundColor: '#518265' },
    tabBarLabel: '',
  };
};

const TabLayout = () => {
  return (
    <Tabs screenOptions={tabOptions}>
      <Tabs.Screen name="homepage" options={{}} />
      <Tabs.Screen name="challenges" options={{}} />
      <Tabs.Screen name="news" options={{}} />
      <Tabs.Screen name="[id]" options={{}} />
    </Tabs>
  );
};

export default TabLayout;
