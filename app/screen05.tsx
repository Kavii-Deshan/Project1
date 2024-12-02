import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

export default function WelcomeScreen() {
  const { width } = Dimensions.get('window'); // Get the screen width dynamically

  return (
    <View style={styles.container}>
      {/* App Icon/Image */}
      <Image
        source={require('../assets/images/Picture1.png')} // Ensure this path is correct
        style={[styles.image, { width: width * 0.6, height: width * 0.6 }]} // Adjust image size dynamically
      />

      {/* Header Text */}
      <Text style={styles.header}>Welcome</Text>

      {/* App Name */}
      <Text style={styles.subHeader}>Peek-Power</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Black background
  },
  image: {
    resizeMode: 'contain', // Maintain the image's aspect ratio
    marginBottom: 30, // Space between image and text
  },
  header: {
    fontSize: 40, // Larger font for "Welcome"
    color: '#fff', // White text
    fontWeight: 'bold', // Bold font weight
    marginBottom: 10, // Space between header and sub-header
  },
  subHeader: {
    fontSize: 24, // Slightly smaller font for app name
    color: '#fff', // White text
  },
});
