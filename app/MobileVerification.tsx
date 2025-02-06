import React, { useRef, useState } from 'react';
import { View, Alert, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Card, Title, Text } from 'react-native-paper';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { getAuth, signInWithPhoneNumber } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useNavigation } from '@react-navigation/native';
import { RootScreenNavigationProp } from './navigation/types';
import { getDatabase, ref, set } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU_68IcBBU5hDGXClw8oQpXR5uln0p2Mc",
  authDomain: "peak-power-7868d.firebaseapp.com",
  databaseURL: 'https://peak-power-7868d-default-rtdb.firebaseio.com/',
  projectId: "peak-power-7868d",
  storageBucket: "peak-power-7868d.firebasestorage.app",
  messagingSenderId: "789121051537",
  appId: "1:789121051537:web:ea09e834c8dea9823a0830",
  measurementId: "G-88J7BNS4VX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export default function PhoneAuth() {
  const navigation = useNavigation<RootScreenNavigationProp>();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const recaptchaVerifier = useRef(null);

  // Function to handle form submission and store user data in Firebase Realtime Database
  const handleUserData = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    const userId = name; // Use phone number as user ID
    const userData = {
      name,
      phoneNumber,
      password,
    };

    const userRef = ref(db, 'UserDetails/' + userId);
    set(userRef, userData)
      .then(() => {
        Alert.alert('Success', 'User data saved!');
        sendOTP();
      })
      .catch((error) => {
        console.error('Error saving user data:', error);
        Alert.alert('Error', 'Failed to save user data. Please try again.');
      });
  };

  // Function to send OTP
  const sendOTP = async () => {
    try {
      const result = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier.current);
      setConfirmationResult(result);
      setOtpSent(true);
      Alert.alert('OTP Sent', 'An OTP has been sent to your phone.');
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    }
  };

  // Function to verify OTP
  const verifyOTP = async () => {
    try {
      await confirmationResult.confirm(code);
      Alert.alert('Success', 'Phone number verified!');
      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };


  const handlePhoneNumberChange = (text: string) => {
    // Remove all non-numeric characters
    let cleanedText = text.replace(/[^\d]/g, "");
  
    // Check if the cleaned text starts with 94 (Sri Lanka country code)
    if (cleanedText.length === 9 && !cleanedText.startsWith("94")) {
      // If the number is 9 digits long and doesn't start with 94, add the country code
      cleanedText = "+94" + cleanedText;
    } else if (cleanedText.length > 9 && cleanedText.startsWith("94")) {
      // If the input starts with +94, we should not add another 94
      cleanedText = "+94" + cleanedText.slice(3); // Only keep the first 9 digits after +94
    }
  
    setPhoneNumber(cleanedText);
  };
  
  
  


  return (
    <ScrollView style={styles.container}>
      {/* Firebase reCAPTCHA Verifier Modal */}
      <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
  
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>
            {otpSent ? "Verify OTP" : "User Registration"}
          </Title>
  
          {/* Show Registration Form Only If OTP Not Sent */}
          {!otpSent && (
            <>
              <TextInput
                label="Full Name"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.input}
              />
              <TextInput
                label="Phone Number"
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                keyboardType="phone-pad"
                mode="outlined"
                style={styles.input}
              />
              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                mode="outlined"
                style={styles.input}
              />
              <TextInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                mode="outlined"
                style={styles.input}
              />
              <Button mode="contained" onPress={handleUserData} style={styles.button}>
                Register & Send OTP
              </Button>
            </>
          )}
  
          {/* Show OTP Verification Section Only After OTP Sent */}
          {otpSent && (
            <>
              <Text style={styles.infoText}>Enter the OTP sent to your phone:</Text>
              <TextInput
                label="Enter OTP"
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                mode="outlined"
                style={styles.input}
              />
              <Button mode="contained" onPress={verifyOTP} style={styles.button}>
                Verify OTP
              </Button>
            </>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#fff',
    marginVertical: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});
