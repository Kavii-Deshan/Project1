import React, { useState } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import axios from 'axios';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [bestGeneration, setBestGeneration] = useState<any>(null);
  const [showButtons, setShowButtons] = useState(true);

  const fetchEnergyData = async (days: number) => {
    setLoading(true);
    setError(null);
    setData(null);
    setBestGeneration(null);
    setShowButtons(false); // Hide the buttons after fetching data

    try {
      const apiKey = 'b9d32839ef7bd654d5ca840c2b0d261c'; // OpenWeather API key
      const response = await axios.get(
        `http://192.168.8.185:5000/renewable-energy`,
        { params: { api_key: apiKey, days } }
      );
      const responseData = response.data;

      // Calculate the best energy generation time (hourly max energy)
      let maxEnergy = 0;
      let maxTime = '';

      for (const [time, energy] of Object.entries(responseData.total_energy)) {
        if (energy > maxEnergy) {
          maxEnergy = energy as number;
          maxTime = time;
        }
      }

      setBestGeneration({ time: maxTime, energy: maxEnergy });
      setData(responseData);
    } catch (err) {
      console.error('Error fetching energy data:', err);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setShowButtons(true);
    setData(null);
    setError(null);
    setBestGeneration(null);
  };

  return (
    <View style={styles.container}>
      {showButtons ? (
        <>
          <Text style={styles.title}>Select Forecast Duration</Text>
          <View style={styles.buttonContainer}>
            <Button title="Next 1 Day" onPress={() => fetchEnergyData(1)} />
            <Button title="Next 3 Days" onPress={() => fetchEnergyData(3)} />
            <Button title="Next 5 Days" onPress={() => fetchEnergyData(5)} />
          </View>
        </>
      ) : (
        <View>
          <Button title="Back" onPress={goBack} />
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          {error && <Text style={styles.errorText}>{error}</Text>}
          {data && (
            <ScrollView>
              <Text style={styles.title}>Energy Data</Text>

              {/* Highlight the best energy generation time */}
              {bestGeneration && (
                <View style={styles.highlight}>
                  <Text style={styles.highlightText}>
                    Best Energy Generation: {bestGeneration.time} with{' '}
                    {bestGeneration.energy.toFixed(2)} MW
                  </Text>
                </View>
              )}

              {/* Combined total and detailed energy generation */}
              {Object.entries(data.detailed_energy).map(([time, details]) => (
                <View key={time} style={styles.energyBlock}>
                  <Text
                    style={[
                      styles.subTitle,
                      bestGeneration?.time === time ? styles.highlightText : null,
                    ]}
                  >
                    {time}: Total Energy: {data.total_energy[time].toFixed(2)} MW
                  </Text>
                  {details.map((detail: any, index: number) => (
                    <Text key={index} style={styles.text}>
                      {detail.district}: {detail.total_energy.toFixed(2)} MW
                    </Text>
                  ))}
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f0f8ff' },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10, textAlign: 'center', color: '#333' },
  subTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 5, color: '#555' },
  text: { fontSize: 14, marginVertical: 2, color: '#444' },
  errorText: { color: 'red', marginVertical: 10, textAlign: 'center' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  highlight: {
    backgroundColor: '#ffffcc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  highlightText: { fontWeight: 'bold', color: '#d9534f', textAlign: 'center' },
  energyBlock: { marginVertical: 10, padding: 10, backgroundColor: '#eef', borderRadius: 5 },
});

export default App;
