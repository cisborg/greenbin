import { Stack } from 'expo-router';

const AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ title: 'Main Tabs' }} />
    </Stack>
  );
};

export default AppLayout;
