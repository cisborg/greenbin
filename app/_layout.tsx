import { Stack } from 'expo-router';

const AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="user/auth/login"
        options={{ headerShown: false, title: 'Main Tabs' }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, title: 'Main Tabs' }}
      />
    </Stack>
  );
};

export default AppLayout;
