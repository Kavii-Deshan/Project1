import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function LocationPermissionDialog() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Add Your Location</Text>

      {/* Permissions Dialog */}
      <View style={styles.dialogBox}>
        <Text style={styles.dialogText}>
          Allow <Text style={styles.appName}>Peak-Power</Text> to access this device's location
        </Text>

        {/* Options */}
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>While using the app</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Only this time</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Don't allow</Text>
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
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 120, // Moves the "Add Your Location" text further down
    
  },
  dialogBox: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 50, // Curves the top left corner
    borderTopRightRadius: 50, // Curves the top right corner
    borderBottomLeftRadius: 50, // Curves the bottom left corner
    borderBottomRightRadius: 50, // Curves the bottom right corner
    padding: 20,
    alignItems: 'center',
    marginBottom:10,
  },
  dialogText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  appName: {
    fontWeight: 'bold',
  },
  optionButton: {
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
});
