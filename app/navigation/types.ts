

import type { NativeStackScreenProps } from "@react-navigation/native-stack";


export type RootStackNavigatorParamList = {
    QRScanner: undefined; // ScreenOne does not expect any parameters
    MobileVerification: undefined; 
    Fetch_Horly: undefined;// ScreenTwo does not expect any parameters
  };

  export type RootScreenNavigationProp = NativeStackScreenProps<
  RootStackNavigatorParamList,
  QRScanner,
  MobileVerification,
  Fetch_Horly,
  >;