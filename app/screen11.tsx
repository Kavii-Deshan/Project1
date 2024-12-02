import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      {/* App Icon */}
      <Image
        source={require('../assets/images/Picture1.png')} // Ensure the image path is correct
        style={styles.icon}
      />

      {/* Menu Options */}
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Manage Your Location</Text>
      </TouchableOpacity>
      <View style={styles.divider} />

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Unit Setting</Text>
      </TouchableOpacity>
      <View style={styles.divider} />

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Background Color</Text>
      </TouchableOpacity>
      <View style={styles.divider} />

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Share to friend</Text>
      </TouchableOpacity>
      <View style={styles.divider} />

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Feedback</Text>
      </TouchableOpacity>
      <View style={styles.divider} />

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Log out</Text>
      </TouchableOpacity>
      <View style={styles.divider} />

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Delete Account</Text>
      </TouchableOpacity>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
    padding: 20,
  },
  icon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  option: {
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: '#fff', // White divider
    marginVertical: 5,
  },
});
