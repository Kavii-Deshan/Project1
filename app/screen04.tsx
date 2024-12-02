import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Index() {
  const [country, setCountry] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Text style={styles.header}>Peak-Power</Text>
      <Text style={styles.subHeader}>Verify your phone number</Text>
      <Text style={styles.description}>
        For your security, our app needs to make sure it’s really you. You will receive a text
        message with a 6-digit verification code. Standard rates apply.
      </Text>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        {/* Country Input */}
        <TextInput
          style={styles.input}
          placeholder="Country"
          placeholderTextColor="#aaa"
          value={country}
          onChangeText={(text) => setCountry(text)}
        />

        {/* Mobile Number Input */}
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={(text) => setMobileNumber(text)}
        />

        {/* OTP Code Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter OTP Code"
          placeholderTextColor="#aaa"
          keyboardType="number-pad"
          value={otp}
          onChangeText={(text) => setOtp(text)}
        />
      </View>

      {/* Verify Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#bbb',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#222', // Darker field background
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#444',
  },
  button: {
    backgroundColor: '#fdbf00', // Yellow button
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000', // Black text on the yellow button
    fontSize: 16,
    fontWeight: 'bold',
  },
});
