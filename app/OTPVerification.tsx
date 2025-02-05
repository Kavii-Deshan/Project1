// VerifyOTPScreen.tsx
import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { getAuth, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { useNavigation, useRoute } from "@react-navigation/native";

const VerifyOTPScreen = () => {
  const [otpCode, setOtpCode] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { confirmation } = route.params; // Get confirmation object from navigation

  const verifyOTP = async () => {
    try {
      const credential = PhoneAuthProvider.credential(confirmation.verificationId, otpCode);
      await signInWithCredential(getAuth(), credential);
      Alert.alert("Success", "Phone number verified!");

      // Navigate to Home screen or another page after verification
      navigation.navigate("Welcome");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Invalid OTP. Please try again.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Enter OTP</Text>
      <TextInput
        value={otpCode}
        onChangeText={setOtpCode}
        placeholder="123456"
        keyboardType="number-pad"
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Button title="Verify OTP" onPress={verifyOTP} />
    </View>
  );
};

export default VerifyOTPScreen;
