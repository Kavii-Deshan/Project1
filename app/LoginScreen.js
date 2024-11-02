import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import firebase from './firebaseConfig'; // Ensure firebase is set up and initialized
import { useNavigation } from '@react-navigation/native'; // For navigation

export default function LoginScreen() {
  const navigation = useNavigation(); // Initialize navigation
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loginError, setLoginError] = useState('');
  const cameraRef = useRef(null);

  // Request camera permission for QR scanning
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Handle QR code scanning
  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    setQrData(data);  // Store scanned QR data for later use

    // Verify the QR code in the database
    try {
      const snapshot = await firebase.database().ref('qrCodes').orderByChild('code').equalTo(data).once('value');
      if (snapshot.exists()) {
        Alert.alert('QR Code Valid!', 'Please enter your mobile number to log in.');
        // You can now navigate to the next screen if needed
        // navigation.navigate('NextScreen'); // Uncomment to navigate
      } else {
        Alert.alert('Invalid QR Code', 'The scanned QR code is not valid. Please try again.');
        setScanned(false); // Reset the scanning state to allow for new scans
      }
    } catch (error) {
      console.error('Error verifying QR code:', error);
      Alert.alert('Error', 'An error occurred while verifying the QR code.');
      setScanned(false); // Reset the scanning state
    }
  };

  // Handle mobile number submission
  const handleLogin = async () => {
    if (qrData && mobileNumber) {
      try {
        // Firebase authentication logic here (replace with your specific logic)
        const confirmationResult = await firebase.auth().signInWithPhoneNumber(mobileNumber);
        
        // If login is successful, navigate to main app or set login state
        console.log('User logged in:', confirmationResult);
        navigation.navigate('HomeScreen'); // Navigate to your home screen
      } catch (error) {
        setLoginError('Invalid mobile number or QR code. Please try again.');
      }
    } else {
      setLoginError('Please scan the QR code and enter a valid mobile number.');
    }
  };

  // UI Rendering
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the Sustainability App</Text>
      
      {/* Camera for QR Code Scanning */}
      {hasPermission === null ? (
        <Text>Requesting for camera permission...</Text>
      ) : hasPermission === false ? (
        <Text style={styles.error}>No access to camera</Text>
      ) : (
        !scanned && (
          <Camera
            style={StyleSheet.absoluteFillObject}
            ref={cameraRef}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          >
            <View style={styles.overlay}>
              <Text style={styles.text}>Scan QR Code</Text>
            </View>
          </Camera>
        )
      )}

      {/* Mobile Number Input */}
      {scanned && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Mobile Number"
            keyboardType="phone-pad"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
          <Button title="Submit" onPress={handleLogin} />
          {loginError ? <Text style={styles.error}>{loginError}</Text> : null}
        </View>
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

