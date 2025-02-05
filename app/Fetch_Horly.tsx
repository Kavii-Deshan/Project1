import React, { useState } from 'react';
import { View, Button, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchEnergyData = async () => {
    setLoading(true);
    setData(null);
    try {
      const apiKey = 'b9d32839ef7bd654d5ca840c2b0d261c'; //  OpenWeather API key
      const response = await axios.get(`http://192.168.8.185:5000/renewable-energy`, {
        params: { api_key: apiKey },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching energy data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Get Renewable Energy Data" onPress={fetchEnergyData} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {data && (
        <ScrollView>
          <Text style={styles.title}>Hourly Renewable Energy Data By District:</Text>
          {Object.entries(data.total_energy).map(([time, totalEnergy]) => (
            <View key={time} style={styles.hourBlock}>
              <Text style={styles.time}>Time: {time}</Text>
              <Text style={styles.totalEnergy}>
                Total Energy: {totalEnergy.toFixed(2)} MW
              </Text>
              {data.detailed_energy[time]?.map((districtData, index) => (
                <Text key={index} style={styles.text}>
                  {districtData.district}: {districtData.total_energy.toFixed(2)} MW
                </Text>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f8ff' },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10, textAlign: 'center', color: '#333' },
  text: { fontSize: 14, marginVertical: 2, textAlign: 'center', color: '#444' },
  hourBlock: { marginVertical: 10, padding: 10, backgroundColor: '#e6f7ff', borderRadius: 8 },
  time: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, textAlign: 'center', color: '#222' },
  totalEnergy: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#006400' },
});

export default App;