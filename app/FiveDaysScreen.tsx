import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, Button, StyleSheet } from "react-native";
import { getDatabase, ref, set } from 'firebase/database';
import { app } from "./firebaseConfig"; 
import { useNavigation } from "@react-navigation/native";

const userId = 1
//const db = getDatabase(app);
const API_KEY = "b9d32839ef7bd654d5ca840c2b0d261c";
const DISTRICTS = [
  { name: "Colombo", lat: 6.9271, lon: 79.8612 },
  { name: "Kandy", lat: 7.2906, lon: 80.6337 },
  { name: "Galle", lat: 6.0535, lon: 80.2210 },
  { name: "Jaffna", lat: 9.6615, lon: 80.0255 },
  { name: "Anuradhapura", lat: 8.3124, lon: 80.4131 },
  { name: "Trincomalee", lat: 8.5874, lon: 81.2152 }
];

const powerCurve = { 0: 0, 3: 0, 5: 50, 8: 150, 12: 300, 20: 300, 25: 0 };

const calculateWindPower = (windSpeed) => {
  const speeds = Object.keys(powerCurve).map(Number).sort((a, b) => a - b);
  for (let i = 0; i < speeds.length - 1; i++) {
    if (speeds[i] <= windSpeed && windSpeed <= speeds[i + 1]) {
      const x1 = speeds[i], y1 = powerCurve[x1];
      const x2 = speeds[i + 1], y2 = powerCurve[x2];
      return y1 + ((y2 - y1) * (windSpeed - x1)) / (x2 - x1);
    }
  }
  return 0;
};

const calculateSolarPower = (cloudCover, timeOfDay, panelArea = 2, efficiency = 0.2) => {
  const solarConstant = 1361;
  const zenithAngle = Math.abs(timeOfDay - 12) / 12 * 90;
  const solarIrradiance = solarConstant * Math.cos((zenithAngle * Math.PI) / 180) * (1 - cloudCover);
  return Math.max(0, solarIrradiance * panelArea * efficiency);
};

const fetchWeatherData = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};




const WindSolarForecast = () => {
  const [forecastData, setForecastData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const calculateForecast = async () => {
      let hourlyGeneration = {};
      for (const district of DISTRICTS) {
        const data = await fetchWeatherData(district.lat, district.lon);
        if (data?.list) {
          data.list.forEach((forecast) => {
            const dateTime = forecast.dt_txt;
            const date = dateTime.split(" ")[0];
            const hour = parseInt(dateTime.split(" ")[1].split(":")[0], 10);
            const windSpeed = forecast.wind.speed;
            const cloudCover = forecast.clouds.all / 100;

            const windPower = calculateWindPower(windSpeed);
            const solarPower = calculateSolarPower(cloudCover, hour);
            const totalPower = windPower + solarPower;

            if (!hourlyGeneration[date]) hourlyGeneration[date] = {};
            if (!hourlyGeneration[date][hour]) hourlyGeneration[date][hour] = 0;
            hourlyGeneration[date][hour] += totalPower;

            

          });
        }
      }

      let dailyPeak = {};
      Object.keys(hourlyGeneration).forEach((date) => {
        const peakHour = Object.keys(hourlyGeneration[date]).reduce((a, b) => 
          hourlyGeneration[date][a] > hourlyGeneration[date][b] ? a : b
        );
        dailyPeak[date] = {
          hour: peakHour,
          power: hourlyGeneration[date][peakHour]
        };
      });

      setForecastData(dailyPeak);
      setLoading(false);
    };

    calculateForecast();
  }, []);
  console.log(forecastData);

// Function to convert 24-hour format to 12-hour format with AM/PM
const formatHourTo12Hour = (hour) => {
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12; // Convert 0/12 to 12
  return `${formattedHour}${period}`;
};



// Save peak time and date to Firebase
const savePeakDetailsToFirebase = (date, hour) => {
  const db = getDatabase();
  const formattedHour = formatHourTo12Hour(hour); // Convert hour to 12-hour format

  const scheduleData = {
    hour: formattedHour,
    appliance: "off"
};

  const scheduleRef = ref(db, `Users/${userId}/PeakDetails/${date}`); // Store date as a key
  set(scheduleRef, scheduleData) // Store formatted hour as value
    .then(() => {
      console.log("Peak details saved to Firebase.");
    })
    .catch((error) => {
      console.error("Error saving peak details:", error);
    });
};



  const tomorrow = Object.keys(forecastData)[0];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sri Lanka Renewable Energy Forecast</Text>
      {loading ? (
        <Text>Loading Forecast Data...</Text>
        
      ) : tomorrow ? (
        <>
          <Text style={styles.subHeader}>Today's Peak Energy Generation</Text>
          <Text><Text style={styles.bold}>Peak Hour:</Text> {forecastData[tomorrow]?.hour}:00</Text>
          <Text><Text style={styles.bold}>Total Power:</Text> {forecastData[tomorrow]?.power.toFixed(2)} kW</Text>
          <Text style={styles.subHeader}>Next 5 Days:</Text>
          <View style={styles.buttonContainer}>
            {Object.keys(forecastData).slice(1, 6).map((day) => (
              <Button key={day} title={day} 
              
              onPress={() => {
                
                const peakTime = forecastData[day]?.hour;
                const peakDate = day;

                // Save peak time and date to Firebase
               savePeakDetailsToFirebase(peakDate, peakTime);


                console.log(forecastData[day]); // Add this log to verify data
                navigation.navigate("Details", { date: day, details: forecastData[day] });
               
              }}
                color="#4CAF50"
              />
            ))}
          </View>
        </>
      ) : (
        <Text>No forecast data available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subHeader: { fontSize: 18, marginTop: 20, marginBottom: 10 },
  buttonContainer: { marginTop: 10 },
  bold: { fontWeight: "bold" }
});

export default WindSolarForecast;
