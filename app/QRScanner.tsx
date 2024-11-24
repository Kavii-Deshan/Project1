import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Vibration, Alert } from 'react-native';
import { getDatabase, ref, get } from 'firebase/database';
//import { Redirect, Stack } from 'expo-router';
//import { database } from "./firebaseConfig";
//import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootScreenNavigationProp, RootStackNavigatorParamList } from './navigation/types';
import { useNavigation } from '@react-navigation/native';




export default function QRScanner() {
  
  const [permission, requestPermission] = useCameraPermissions();
  const [scanningEnabled, setScanningEnabled] = useState(true);
  
  const navigation = useNavigation<RootScreenNavigationProp>();
  

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function onBarcodeScanned({ data }: BarcodeScanningResult) {
    if (!scanningEnabled) return;
    try {
      
      setScanningEnabled(false);
      verifyQRCode(data); // Verify QR code


    } catch (error) {
      Alert.alert('Error', "Failed");
      setScanningEnabled(true);
    }
  
  }


  const verifyQRCode = async (code) => {
    const db = getDatabase();
    const dbRef = ref(db, 'QRCodes'); // Adjust your path accordingly
  
    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Check if any of the entries match the scanned code
        const isValidCode = Object.values(data).some(entry => entry.code === code);
  


        
        if (isValidCode) {
          setScanningEnabled(false); // Disable scanning
          Vibration.vibrate();
          Alert.alert('Success', 'QR code is valid. Navigating to the next page...');
          navigation.navigate('MobileVerification'); // Go to MobileVerification Page

        } else {
        
          Alert.alert('Invalid QR Code', 'The scanned QR code does not match any record.', [
            { text: 'OK', onPress: () =>  setScanningEnabled(true)},
          ]);

        }
      } else {
        
        Alert.alert('Error', 'No QR codes found in the database.', [
          { text: 'OK', onPress: () =>  setScanningEnabled(true)},
        ]);
      }
    } catch (error) {
      console.error('Error verifying QR code:', error);
      
      Alert.alert('Error', 'Failed to verify QR code. Please try again.', [
        { text: 'OK', onPress: () =>  setScanningEnabled(true)},
      ]);

    }
  };
  

  return (
    
      <CameraView style={styles.camera} onBarcodeScanned={onBarcodeScanned}
      barcodeScannerSettings={{
        barcodeTypes: ["qr"],
      }}/>
      
      
    
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

