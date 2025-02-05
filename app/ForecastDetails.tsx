
import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getDatabase, ref, get,set, push } from 'firebase/database';

const ForecastDetails: React.FC = () => {
    const userid = 1;
    const navigation = useNavigation();
    const route = useRoute();
    const { date, details } = route.params as { date: string; details: { hour: string; power: number } };
    const [applianceState, setApplianceState] = useState([]);
    const [newApplianceName, setNewApplianceName] = useState(""); // State for appliance name input
  
    // Function to format the hour into AM/PM format
    const formatHour = (hour: number) => {
      const isPM = hour >= 12;
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12; // Handle 12:00 PM
      const suffix = isPM ? "PM" : "AM";
      return `${formattedHour}:00 ${suffix}`;
    };
  
    const formattedHour = formatHour(parseInt(details.hour));

    
    const addAppliance = async () => {
      
          const db = getDatabase();
          const appliancesRef = ref(db, `Users/${userid}/PeakDetails/${date}/appliance`);

          get(appliancesRef).then((snapshot) => {
            if (snapshot.exists()) {
                const newState = snapshot.val() === "on" ? "off" : "on";
                set(appliancesRef, newState)
                    .then(() => console.log("Appliance toggled:", newState))
                    .catch((error) => console.error("Error toggling appliance:", error));
            }
        });
    
  };



    
      
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Forecast Details</Text>
        <Text style={styles.bold}>Date:</Text> <Text>{date}</Text>
        <Text style={styles.bold}>Peak Time:</Text> <Text>{formattedHour}</Text>
        <Text style={styles.bold}>Total Power:</Text> <Text>{details.power.toFixed(2)} kW</Text>
        
        <Button title="Add Appliance" onPress={addAppliance} />
      </View>
    );

    
  };
  
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
    header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    bold: { fontWeight: "bold", marginTop: 10 },
  });
  
  export default ForecastDetails;
  
