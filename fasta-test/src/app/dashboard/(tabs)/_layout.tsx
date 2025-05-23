import { useAppSelector } from '@/src/hooks/redux';
import { RootState } from '@/src/store';
import { AntDesign } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';

export default function TabLayout() {
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuth);

  if (!isAuthenticated) {
    // If not authenticated, redirect to login screen
    return <Redirect href="/auth/login" />;
  }
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <AntDesign size={28} name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="edit"
        options={{
          title: 'Edit',
          tabBarIcon: ({ color }) => <AntDesign size={28} name="edit" color={color} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <AntDesign size={28} name="setting" color={color} />,
        }}
      />
      
    </Tabs>
  );
}