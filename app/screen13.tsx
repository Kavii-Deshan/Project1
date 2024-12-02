import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';

export default function WithinADayScreen() {
  const { width } = Dimensions.get('window'); // Get screen width

  return (
    <View style={styles.container}>
      {/* Watermark Image */}
      <Image
        source={require('../assets/images/Picture1.png')} // Ensure the correct path
        style={[styles.watermark, { width: width * 0.8, height: width * 0.8 }]} // Adjust size dynamically
      />

      {/* Header */}
      <Text style={styles.header}>Within a day</Text>

      {/* Relay Section */}
      <View style={styles.relayContainer}>
        <Text style={styles.relayTitle}>1. Relay one</Text>
        <Text style={styles.subText}>Set Time</Text>

        {/* Input Fields */}
        <View style={styles.timeInputs}>
          <TextInput style={styles.input} placeholder="HH:MM" placeholderTextColor="#000" />
          <TextInput style={styles.input} placeholder="HH:MM" placeholderTextColor="#000" />
        </View>

        {/* ON/OFF Buttons */}
        <View style={styles.toggleButtons}>
          <TouchableOpacity style={styles.onButton}>
            <Text style={styles.toggleText}>ON</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.offButton}>
            <Text style={styles.toggleText}>OFF</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Add Device Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Device</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  watermark: {
    position: 'absolute', // Place the image behind other elements
    top: '30%', // Adjust as necessary
    left: '10%', // Adjust as necessary
    opacity: 0.5, // Make the image semi-transparent
    resizeMode: 'contain', // Maintain aspect ratio
  },
  header: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 80, // Move text further down
    marginBottom: 20,
  },
  relayContainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 20,
  },
  relayTitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 5,
  },
  subText: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 10,
  },
  timeInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    width: '45%',
    height: 40,
    backgroundColor: '#FEC13D',
    borderRadius: 5,
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
    marginHorizontal: 6,
  },
  toggleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  onButton: {
    backgroundColor: '#FEC13D',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  offButton: {
    backgroundColor: '#FEC13D',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  toggleText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute', // Position at the bottom center
    bottom: 100,
    alignSelf: 'center', // Center horizontally
    backgroundColor: '#FFC107',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
