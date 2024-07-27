// app/_layout.js
import { Tabs } from 'expo-router';
import Icon from '../assets/icon';

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="homepage" options={{
         title: 'Home',
         tabBarIcon: ({ color, size }) => (
          <Home name="home" color={color} size={size} />
        ),
          }}  />
      <Tabs.Screen name="challenges" options={{
         title: 'Challenges',
         tabBarIcon: ({ color, size }) => (
          <Icon name="ios-flash" color={color} size={size} />
        )
          }}  />
      <Tabs.Screen name="news" options={{
         title: 'News',
         tabBarIcon: ({ color, size }) => ( 
          <Icon name="ios-menu" color={color} size={size} />
        )
          }}  />
      <Tabs.Screen name="[id]" options={{
         title: 'User',
         tabBarIcon: ({ color, size }) => (
          <Icon name="ios-person" color={color} size={size} />
        )
          }}  />
    </Tabs>
  );
};

export default TabLayout;
