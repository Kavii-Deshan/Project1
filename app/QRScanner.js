// QRScanner.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, TextInput, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
///import { initializeApp } from 'firebase/app'; // Import Firebase app
import { database } from "./firebaseConfig";
import { getDatabase, ref, get } from 'firebase/database'; // Import necessary Firebase functions
import { useNavigation } from '@react-navigation/native';



export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const navigation = useNavigation(); // Access the navigation prop

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    verifyQRCode(data); // Verify QR code
  };

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
          Alert.alert('Success', 'QR code is valid! Navigate to the mobile number verification page.');
          // Navigate to your verification page here

        navigation.navigate('MobileVerification');

        } else {
          Alert.alert('Error', 'Invalid QR code!');
        }
      } else {
        Alert.alert('Error', 'No data found in the database!');
      }
    } catch (error) {
      console.error('Error verifying QR code:', error);
      Alert.alert('Error', 'Failed to verify QR code. Please try again.');
    }
  };

  const handleManualSubmit = () => {
    verifyQRCode(qrCode);
  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
      </View>
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the QR Code Scanner App!</Text>
      <Text style={styles.paragraph}>Scan a QR code or enter it manually.</Text>
      {renderCamera()}
      <TextInput
        style={styles.input}
        placeholder="Enter QR code"
        value={qrCode}
        onChangeText={setQrCode}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleManualSubmit}
      >
        <Text style={styles.buttonText}>Verify QR Code</Text>
      </TouchableOpacity>
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    width: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 20,
  },
  camera: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


