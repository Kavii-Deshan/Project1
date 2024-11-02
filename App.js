// App.js or where you configure navigation
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import QRScanner from "./app/QRScanner";
import MobileVerification from "./app/MobileVerification";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="QRScanner">
        <Stack.Screen name="QRScanner" component={QRScanner} />
        <Stack.Screen name="MobileVerification" component={MobileVerification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

