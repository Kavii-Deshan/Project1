import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Vibration, Alert,  Animated, } from 'react-native';
import { getDatabase, ref, get } from 'firebase/database';
import { RootScreenNavigationProp } from './navigation/types';
import { useNavigation } from '@react-navigation/native';





export default function QRScanner() {
  
  const [permission, requestPermission] = useCameraPermissions();
  const [scanningEnabled, setScanningEnabled] = useState(true);
  const [message, setMessage] = useState<string | null>(null); // To display success or error message
  const navigation = useNavigation<RootScreenNavigationProp>();
  const [progress, setProgress] = useState(new Animated.Value(0));
  

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
       
        const data1 = snapshot.val() as Record<string, { code: any }>; 
        console.log('Manual Code:', code); // Debug
        console.log('Database Codes:', data1);    // Debug

        // Loop through the database entries
      let isValidCode = false;

      // Check if 'entry' has a 'code' field and compare
      for (const key in data1) {
        const entry = data1[key];
        console.log(`Checking entry: ${key} =>`, entry); // Debugging individual entry

        if (entry && typeof entry === 'object' && entry.code) {
          if (entry.code.trim() === code.trim()) {
            isValidCode = true;
            break; // Exit loop once a match is found
          }
        } else if (typeof entry === 'string' && entry.trim() === code.trim()) {
          // Check if the entry itself is a string that matches the manual code
          isValidCode = true;
          break;
        }
      }
  
        
        
        if (isValidCode) {
          setScanningEnabled(false);
          
          Vibration.vibrate();
          setMessage('QR valid! Navigating to Mobile Verification...');
          startProgressBar();
      setTimeout(() => {
        navigation.navigate('MobileVerification'); // Automatically navigate to the next page
      }, 2000); // Delay navigation for 2 seconds to show the message
      
    }
         else {
        
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
  
  const startProgressBar = () => {
    // Animate progress from 0 to 100
    Animated.timing(progress, {
      toValue: 1, // Full progress (100%)
      duration: 2000, // Duration for 2 seconds
      useNativeDriver: false,
    }).start();
  };

  return (
    
    <View style={styles.container}>
      <CameraView style={styles.camera} onBarcodeScanned={onBarcodeScanned}
      barcodeScannerSettings={{
        barcodeTypes: ["qr"],
      }}
      
      
      />
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>Scan the QR Code</Text>
      </View>
      {message && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{message}</Text>
          <View style={styles.progressBarContainer}>
              <Animated.View
                style={[
                  styles.progressBar,
                  {
                    width: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'], // Start from 0% and fill to 100%
                    }),
                  },
                ]}
                />

        </View>
      
    </View>
    )};
  </View>
    
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
  messageContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  messageText: {
    backgroundColor: 'rgba(0, 128, 0, 0.8)',
    color: '#fff',
    fontSize: 16,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
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
  overlayText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  progressBarContainer: {
    height: 10,
    width: '100%',
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
  },

});