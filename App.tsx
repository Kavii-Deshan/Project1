// App.js or where you configure navigation

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import QRScanner from "./app/QRScanner";
import MobileVerification from "./app/MobileVerification";
import Fetch_Horly from "./app/Fetch_Horly";
import { RootStackNavigatorParamList } from './app/navigation/types';
import OTPVerification from "./app/OTPVerification"
import Welcome from "./app/Welcome";
import FiveDaysScreen from "./app/FiveDaysScreen";
import ForecastDetails from "./app/ForecastDetails";
import index from "./app/index";
import Manuel_QRScanner from "./app/Manuel_QRScanner";
import UserLogin from "./app/UserLogin";


const Stack = createNativeStackNavigator<RootStackNavigatorParamList>();

// Define your deep linking configuration
const linking = {
  prefixes: ['peakpower://'],  // Your custom scheme URL for deep linking
  config: {
    screens: {
      finishSignUp: 'finishSignUp',  // Map the deep link path to your screen
    },
  },
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserLogin">
      <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="QRScanner" component={QRScanner} />
        <Stack.Screen name="Manuel_QRScanner" component={Manuel_QRScanner} />
        <Stack.Screen name="index" component={index} />
        <Stack.Screen name="FiveDaysScreen" component={FiveDaysScreen} />
        <Stack.Screen name="Details" component={ForecastDetails} />
        <Stack.Screen name="MobileVerification" component={MobileVerification} />
        <Stack.Screen name="Fetch_Horly" component={Fetch_Horly} />
        <Stack.Screen name="OTPVerification" component={OTPVerification} />
        <Stack.Screen name="UserLogin" component={UserLogin} />
      </Stack.Navigator>
      </NavigationContainer>
    

    
  );
  

}




