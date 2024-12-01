import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Scan QR Code</Text>

      {/* Scan Button */}
      <TouchableOpacity style={styles.scanButton}>
        <Text style={styles.scanButtonText}>...Scan me...</Text>
      </TouchableOpacity>

      {/* Divider */}
      <Text style={styles.divider}>OR</Text>

      {/* Enter Code Button */}
      <TouchableOpacity style={styles.inputButton}>
        <Text style={styles.inputButtonText}>Enter code here</Text>
      </TouchableOpacity>

      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 40,
  },
  scanButton: {
    width: 200,
    height: 100,
    backgroundColor: '#FEC13D',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  scanButtonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  divider: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 20,
  },
  inputButton: {
    width: 200,
    height: 50,
    backgroundColor: '#FEC13D',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  inputButtonText: {
    fontSize: 16,
    color: '#000',
  },
  skipButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#FEC13D',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  skipButtonText: {
    fontSize: 14,
    color: '#000',
  },
});
