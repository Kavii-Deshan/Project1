import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function PhoneVerification() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Our app name here</Text>

      {/* Title */}
      <Text style={styles.title}>Verify your phone number</Text>

      {/* Description */}
      <Text style={styles.description}>
        For your security, <Text style={styles.boldText}>app_name</Text> wants to make sure it’s really you. 
        <Text style={styles.boldText}> app_name</Text> will send a text message with a 6-digit verification code. 
        <Text style={styles.italicText}> Standard rates apply.</Text>
      </Text>

      {/* Country Selector */}
      <Text style={styles.label}>Select your Country</Text>
      <TextInput style={styles.input} placeholder="Country" placeholderTextColor="#ccc" />

      {/* Mobile Number Input */}
      <Text style={styles.label}>Enter your mobile Number</Text>
      <TextInput style={styles.input} placeholder="Mobile Number" placeholderTextColor="#ccc" keyboardType="phone-pad" />

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 30,
    lineHeight: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  italicText: {
    fontStyle: 'italic',
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#FEC13D',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#fff',
    marginBottom: 20,
  },
  nextButton: {
    height: 40,
    backgroundColor: '#FEC13D',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});
