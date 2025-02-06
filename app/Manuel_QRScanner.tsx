import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Animated, KeyboardAvoidingView, Platform, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, get } from 'firebase/database';
import { RootScreenNavigationProp } from './navigation/types';


export default function Home() {
  const navigation = useNavigation<RootScreenNavigationProp>();
  const [manualCode, setManualCode] = useState('');
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [message, setMessage] = useState<string | null>(null); // To display success or error message
  const [isNavigating, setIsNavigating] = useState(false);


  const handleManualCodeSubmit = async () => {
    if (manualCode.trim() === '') {
      Alert.alert('Error', 'Please enter a valid code.');
      return;
    }

    const db = getDatabase();
    const dbRef = ref(db, 'QRCodes'); // Adjust database path as needed

    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val() as Record<string, { code: any }>; 
        console.log('Manual Code:', manualCode); // Debug
        console.log('Database Codes:', data);    // Debug

        // Loop through the database entries
      let isValidCode = false;

      // Check if 'entry' has a 'code' field and compare
      for (const key in data) {
        const entry = data[key];
        console.log(`Checking entry: ${key} =>`, entry); // Debugging individual entry

        if (entry && typeof entry === 'object' && entry.code) {
          if (entry.code.trim() === manualCode.trim()) {
            isValidCode = true;
            break; // Exit loop once a match is found
          }
        } else if (typeof entry === 'string' && entry.trim() === manualCode.trim()) {
          // Check if the entry itself is a string that matches the manual code
          isValidCode = true;
          break;
        }
      }

        if (isValidCode) {
            setIsNavigating(true);
            setMessage('QR valid! Navigating to Mobile Verification...');
            startProgressBar();
          
            setTimeout(() => {
                navigation.navigate('MobileVerification'); // Automatically navigate to the next page
              }, 2000); // Delay navigation for 2 seconds to show the message
        } else {
          Alert.alert('Invalid Code', 'The entered QR code does not match any record.');
        }
      } else {
        Alert.alert('Error', 'No QR codes found in the database.');
      }
    } catch (error) {
      console.error('Error verifying QR code:', error);
      Alert.alert('Error', 'Failed to verify QR code. Please try again.');
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior for different platforms
    
>
    
     {/* Hide all content when navigating */}
     {!isNavigating && (
        <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('QRScanner')}
      >
        <Text style={styles.buttonText}>Scan QR Code</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>
      <View style={styles.innerContainer}>
      {/* Manual Code Entry */}
      <TextInput
        style={styles.input}
        placeholder="Enter QR Code"
        value={manualCode}
        onChangeText={setManualCode}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleManualCodeSubmit}>
        <Text style={styles.submitButtonText}>Submit Code</Text>
      </TouchableOpacity>
     </View>
   
     
</>

     )}
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


</KeyboardAvoidingView>






  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#00008B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    color: '#000',
    marginVertical: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#00008B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
