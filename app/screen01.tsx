import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

export default function Screen01() {
  const { width } = Dimensions.get('window'); // Get screen width

  return (
    <View style={styles.container}>
      {/* Display the image with increased size */}
      <Image
        source={require('../assets/images/Picture1.png')} // Ensure correct path
        style={[styles.image, { width: width * 0.8, height: width * 0.8 }]} // Adjust size dynamically
      />

      {/* Display app name */}
      <Text style={styles.appName}>Peak-Power</Text>

      {/* Add "Get Start" button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  image: {
    resizeMode: 'contain', // Maintain aspect ratio
    marginBottom: 20,
  },
  appName: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FFC107',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 25,
    color: '#000',
    fontWeight: 'bold',
  },
});
