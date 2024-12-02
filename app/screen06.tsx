import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function LocationPermissionScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Add Your Location</Text>

      {/* Permissions Box */}
      <View style={styles.permissionsBox}>
        <Text style={styles.permissionsText}>
          <Text style={styles.boldText}>Peak-Power</Text> needs to access your device location to provide your local forecast.
        </Text>

        {/* Allow Button */}
        <TouchableOpacity style={styles.allowButton}>
          <Text style={styles.allowButtonText}>Allow</Text>
        </TouchableOpacity>

        {/* Ignore Button */}
        <TouchableOpacity>
          <Text style={styles.ignoreButton}>Ignore</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  header: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 110, // Moves the text down
  },
  permissionsBox: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50, // Curve the bottom-left corner
    borderBottomRightRadius: 50, // Curve the bottom-right corner
    padding: 20,
    paddingBottom: 30,
    alignItems: 'center',
    height: '40%', // Increases the size of the white box
    justifyContent: 'center', // Centers the content within the box
    //overflow: 'hidden', // Ensures content respects the curve
  },

  permissionsText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  allowButton: {
    backgroundColor: '#FEC13D',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginBottom: 15,
  },
  allowButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  ignoreButton: {
    fontSize: 16,
    color: '#FEC13D',
    textAlign: 'center',
  },
});
