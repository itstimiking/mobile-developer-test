
import { Provider } from 'react-redux';
import "../../global.css";

import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { store } from '../store';

export default function RootLayout() {

  return (
    <Provider store={store}>
      <>
      <Stack screenOptions={()=>({headerShown:false})}/>
      <StatusBar />
      </>
    </Provider>
  )
}