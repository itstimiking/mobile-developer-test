import { useAppSelector } from '@/src/hooks/redux';
import { Redirect, Stack } from 'expo-router';

export default function StackLayout() {
  const isAuthenticated = useAppSelector(state=>state.auth.isAuth)

  if (isAuthenticated) {
    return <Redirect href="/dashboard" />;
  }
  return (
    <Stack>
      <Stack.Screen name='login' options={{headerShown:false}} />
      <Stack.Screen name='register' options={{title:'Sign up'}} />
      <Stack.Screen name='forgot-password' options={{title:'Forgot Password'}} />
    </Stack>
  )
}