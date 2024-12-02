import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function AddDevicesScreen() {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Text style={styles.header}>Add Your Devices</Text>

      {/* Buttons Section */}
      <View style={styles.buttonsContainer}>
        {/* Button for "Within a day" */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Within a day</Text>
        </TouchableOpacity>

        {/* Button for "Within Three(3) Days" */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Within Three(3) Days</Text>
        </TouchableOpacity>

        {/* Button for "Within Seven(7) Days" */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Within Seven(7) Days</Text>
        </TouchableOpacity>

        {/* Divider text for "OR" */}
        <Text style={styles.orText}>OR</Text>

        {/* Button for "Customize your day" */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Customize your day</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main container for the entire screen
  container: {
    flex: 1, // Takes up the full screen
    backgroundColor: '#000', // Black background
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    paddingHorizontal: 20, // Add padding for left/right spacing
  },

  // Style for the "Add Your Devices" header text
  header: {
    fontSize: 24, // Large font size
    color: '#fff', // White text color
    fontWeight: 'bold', // Bold text for emphasis
    marginBottom: 30, // Adds space below the header
  },

  // Container for the buttons
  buttonsContainer: {
    width: '100%', // Takes up the full width of the screen
    alignItems: 'center', // Center the buttons
  },

  // Style for the buttons
  button: {
    backgroundColor: '#FFC107', // Yellow background color
    paddingVertical: 15, // Vertical padding inside the button
    paddingHorizontal: 30, // Horizontal padding inside the button
    borderRadius: 25, // Fully rounded corners
    marginVertical: 10, // Space between buttons
    width: '100%', // Stretch button to full width
    alignItems: 'center', // Center the text
  },

  // Style for the text inside the buttons
  buttonText: {
    fontSize: 16, // Medium font size
    color: '#000', // Black text color
    fontWeight: 'bold', // Bold text for better readability
  },

  // Style for the "OR" text
  orText: {
    fontSize: 16, // Medium font size
    color: '#fff', // White text color
    marginVertical: 10, // Adds space above and below the "OR" text
    fontWeight: 'bold', // Bold text
  },
});
