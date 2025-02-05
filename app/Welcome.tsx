import React from "react";

import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { RootScreenNavigationProp } from './navigation/types';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation<RootScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://example.com/celebration-image.png", // Replace with a relevant image URL or use a local asset
        }}
        style={styles.image}
      />
      
      <Text style={styles.title}>Welcome!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("")} // Adjust navigation target as needed
      >
        <Text style={styles.buttonText}>Go to Energy Generation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Positions content from the top
    alignItems: "center", // Centers content horizontally
    backgroundColor: "#f9fafd",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 100,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20, // Add spacing from top
    marginBottom: 20, // Space between title and button
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 50, // Moves the button closer to the top
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;

