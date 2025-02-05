// App.js or where you configure navigation
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import QRScanner from "./app/QRScanner";
import MobileVerification from "./app/MobileVerification";
import Fetch_Horly from "./app/Fetch_Horly";
import { RootStackNavigatorParamList } from './app/navigation/types';

const Stack = createNativeStackNavigator<RootStackNavigatorParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="QRScanner">
        <Stack.Screen name="QRScanner" component={QRScanner} />
        <Stack.Screen name="MobileVerification" component={MobileVerification} />
        <Stack.Screen name="Fetch_Horly" component={Fetch_Horly} />
      </Stack.Navigator>
      </NavigationContainer>
    
  );
}

