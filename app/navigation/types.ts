

import type { NativeStackScreenProps } from "@react-navigation/native-stack";


export type RootStackNavigatorParamList = {
    QRScanner: undefined; 
    MobileVerification: undefined; 
    Fetch_Horly: undefined;
    OTPVerification:{ phoneNumber: string; otp: number };
    Welcome: undefined;
    NextFiveDaysScreen: undefined;
    DayDetailsScreen: { selectedDay: any[]; day: string };
    FiveDaysScreen: undefined;
   
  };

  export type RootScreenNavigationProp = NativeStackScreenProps<
  RootStackNavigatorParamList,
  QRScanner,
  MobileVerification,
  Fetch_Horly,
  OTPVerification,
  Welcome,
  NextFiveDaysScreen,
  DayDetailsScreen,
  FiveDaysScreen
  >;