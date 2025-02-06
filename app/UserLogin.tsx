import React, { useRef, useState } from 'react';
import { View, Alert, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Card, Title, Text } from 'react-native-paper';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { getAuth, signInWithPhoneNumber } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useNavigation } from '@react-navigation/native';
import { RootScreenNavigationProp } from './navigation/types';
import { getDatabase, ref, get } from 'firebase/database';

// Firebase Configuration
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



const FirstPage = () => {
  const navigation = useNavigation<RootScreenNavigationProp>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showCheckbox, setShowCheckbox] = useState(true);
  const recaptchaVerifier = useRef(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otp, setOtp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Handle login action
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password.");
      return;
    }

    try {
      const db = getDatabase();
      const userRef = ref(db, `UserDetails/${username}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();

        if (userData.password === password) {
          // Valid credentials
          setPhoneNumber(userData.phoneNumber);
          sendOTP(userData.phoneNumber);

        } else {
          Alert.alert('Login Failed', 'Incorrect password. Please try again.');
        }
      } else {
        Alert.alert('Login Failed', 'User not found.');
      }
    } catch (error) {
      console.error('Error checking credentials:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  // Handle "Forgot Password" action
  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset instructions will be sent.');
  };

  // Handle navigation to Registration page
  const handleRegister = () => {
    navigation.navigate('MobileVerification'); // Assuming you have a Registration screen
  };


// Function to send OTP
const sendOTP = async (phone: string) => {
  try {
    const result = await signInWithPhoneNumber(auth, phone, recaptchaVerifier.current);
    setConfirmationResult(result);
    setIsOtpSent(true);
    Alert.alert('OTP Sent', 'An OTP has been sent to your registered mobile number.');
  } catch (error) {
    console.error('Error sending OTP:', error);
    Alert.alert('Error', 'Failed to send OTP. Please try again.');
  }
};



// Function to verify OTP
const verifyOTP = async () => {
  try {
    await confirmationResult.confirm(otp);
    Alert.alert('Success', 'Login successful!');
    navigation.navigate('Welcome');
  } catch (error) {
    console.error('Error verifying OTP:', error);
    Alert.alert('Error', 'Invalid OTP. Please try again.');
  }
};


return (
  <ScrollView style={styles.container}>
    {/* Firebase reCAPTCHA Verifier Modal */}
    <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />

    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>{isOtpSent ? "Verify OTP" : "Login"}</Title>

        {!isOtpSent ? (
          <>
            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
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
            <Button mode="contained" onPress={handleLogin} style={styles.button}>
              Login
            </Button>

            <Button mode="text" onPress={() => navigation.navigate('Manuel_QRScanner')}>
                Not registered? Sign Up
              </Button>

          </>
        ) : (
          <>
            <Text style={styles.infoText}>Enter the OTP sent to your phone:</Text>
            <TextInput
              label="Enter OTP"
              value={otp}
              onChangeText={setOtp}
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

export default FirstPage;
