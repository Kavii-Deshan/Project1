import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function LocationInputScreen() {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        {/* Title for the screen */}
        <Text style={styles.header}>Add Your Location</Text>
      </View>

      {/* Bottom Dialog Box Section */}
      <View style={styles.dialogBox}>
        {/* Button to manually add a location */}
        <TouchableOpacity style={styles.manualLocationButton}>
          <Text style={styles.manualLocationText}>Add your location manually</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main container for the entire screen
  container: {
    flex: 1, // Makes the container take up the full screen height
    backgroundColor: '#000', // Black background color
    justifyContent: 'space-between', // Places header and dialog box at top and bottom respectively
  },

  // Header container to position "Add Your Location"
  headerContainer: {
    marginTop: 100, // Pushes the header text down
    alignItems: 'center', // Centers the header horizontally
  },

  // Style for the "Add Your Location" header text
  header: {
    fontSize: 30, // Large font size
    color: '#fff', // White text color
    fontWeight: 'bold', // Makes the text bold
    textAlign: 'center', // Aligns text to the center
    marginTop: 110,
  },

  // Bottom dialog box style
  dialogBox: {
    backgroundColor: '#fff', // White background for the dialog box
    borderTopLeftRadius: 50, // Rounded corners for the top-left side
    borderTopRightRadius: 50, // Rounded corners for the top-right side
    borderBottomLeftRadius: 50, // Curves the bottom left corner
    borderBottomRightRadius: 50,
    paddingVertical: 40, // Vertical padding for spacing inside the dialog
    alignItems: 'center', // Centers content horizontally
    height: '30%',
    marginBottom:20,
  },

  // Button to manually add a location
  manualLocationButton: {
    paddingVertical: 15, // Vertical padding inside the button
    paddingHorizontal: 30, // Horizontal padding inside the button
    borderRadius: 10, // Rounded corners for the button
    backgroundColor: '#f0f0f0', // Light gray background color for the button
    alignItems: 'center', // Centers the button text
    elevation: 3, // Adds shadow for Android devices
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.3, // Shadow transparency for iOS
    shadowRadius: 4, // Shadow blur radius for iOS
    marginTop:40,
  },

  // Style for the text inside the manual location button
  manualLocationText: {
    fontSize: 16, // Medium font size
    color: '#000', // Black text color
    fontWeight: '600', // Semi-bold text
  },
});


