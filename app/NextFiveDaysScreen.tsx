import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, ScrollView } from 'react-native';
import { fetchWeatherData } from './WeatherData';
import { calculateWindPower, calculateSolarPower } from './PowerCalculations';

const districts = [
  { name: 'Colombo', wind: 1, solar: 2, lat: 6.9270, lon: 79.8617 },
  { name: 'Gampaha', wind: 1, solar: 2, lat: 7.0713, lon: 80.0088 },
  { name: 'Kalutara', wind: 1, solar: 2, lat: 6.5836, lon: 80.0654 },
  { name: 'Hambantota', wind: 10, solar: 33, lat: 6.1246, lon: 81.1185 },
  { name: 'Mannar', wind: 103.5, solar: 15, lat: 8.9817, lon: 79.9408 },
  { name: 'Ampara', wind: 1, solar: 3, lat: 7.2912, lon: 81.6724 },
  { name: 'Puttalam', wind: 105, solar: 2, lat: 8.0305, lon: 79.8394 },
  { name: 'Kilinochchi', wind: 20, solar: 2, lat: 9.3805, lon: 80.4026 },
  { name: 'Jaffna', wind: 10, solar: 3, lat: 9.6615, lon: 80.0255 },
  
 
  // Add other districts here...
];

const App = () => {
  const [selectedDay, setSelectedDay] = useState('');
  const [districtData, setDistrictData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  //const [maxPowerTime, setMaxPowerTime] = useState('');
  const [maxPower, setMaxPower] = useState(0);
  //const [maxFullTotalPower, setMaxFullTotalPower] = useState(0); // To store the max total power across all districts
  const [nextDayDate, setNextDayDate] = useState(''); // State to store next day's date

  const getNextDayDate = () => {
    const today = new Date();
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);
    return nextDay.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleNextDay = () => {
    setSelectedDay('Next Day');
    setNextDayDate(getNextDayDate()); // Set the next day date
  };

  const getDistrictDataForNextDay = async () => {
    const allDistricts = [];
    let hourlyTotalPower = []; // Array to store total power per hour across all districts
    let maxPower = 0;
    let maxPowerTime = '';
    let maxTotalPowerAcrossAllDistricts = 0; // Track the maximum total power across all districts for any hour
    let maxTotalPowerHour = '';

    // Loop through each district to fetch weather data
    for (let district of districts) {
      const weatherData = await fetchWeatherData(district.lat, district.lon);
      const hourlyDataForDistrict = [];

      // Extracting data for each hour in the next 24 hours
      weatherData.list.forEach((hourData) => {
        const windPower = calculateWindPower(hourData.wind.speed, district.wind);
        const solarPower = calculateSolarPower(hourData.main.temp, district.solar);
        const totalPower = windPower + solarPower;

        hourlyDataForDistrict.push({
          time: hourData.dt_txt,  // This will give the time in YYYY-MM-DD HH:mm:ss format
          windPower,
          solarPower,
          totalPower,
        });

        // Store total power for this hour (for all districts)
        const hourIndex = new Date(hourData.dt_txt).getHours();
        if (!hourlyTotalPower[hourIndex]) hourlyTotalPower[hourIndex] = 0;
        hourlyTotalPower[hourIndex] += totalPower;

        // Track the max power and corresponding time for each district
        if (totalPower > maxPower) {
          maxPower = totalPower;
          maxPowerTime = hourData.dt_txt;
        }
      });

      allDistricts.push({
        name: district.name,
        hourlyData: hourlyDataForDistrict,
      });
    }

    // Set the total power for each hour across all districts
    setDistrictData(allDistricts);
    setHourlyData(allDistricts);
    setMaxPower(maxPower);
    setMaxPowerTime(maxPowerTime);

    // Find the maximum total power across all districts for any hour

    
    
  };

  useEffect(() => {
    if (selectedDay) {
      getDistrictDataForNextDay();
    }
  }, [selectedDay]);
  
  const maxPowerHourEntry = hourlyData
  ?.flatMap(district => district.hourlyData || [])
  .reduce((max, current) => {
    return current.totalPower > (max?.totalPower || 0) ? current : max;
  }, null);

const maxPowerHourTime = maxPowerHourEntry?.time || null;

const maxPowerHourFullTotal = hourlyData
  ?.reduce((sum, district) => {
    const matchingHour = district.hourlyData?.find(hour => hour.time === maxPowerHourTime);
    return sum + (matchingHour?.totalPower || 0);
  }, 0);

console.log('maxPowerHourTime:', maxPowerHourTime);
console.log('maxPowerHourFullTotal:', maxPowerHourFullTotal);


  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    return formattedTime;
  };
  console.log('hourlyData:', JSON.stringify(hourlyData, null, 2));
  console.log('districtData:', JSON.stringify(districtData, null, 2));
  
  return (
  <View style={styles.container}>
    <Text style={styles.title}>Renewable Energy Generation for</Text>
    {nextDayDate && (
        <Text style={styles.nextDayText}>{nextDayDate}</Text>
      )}
    <Button title="Next 1 Day" onPress={handleNextDay} />
    

    {selectedDay && (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.maxPowerContainer}>
          <Text style={styles.maxPowerText}>Highest Full Total Power Generation:</Text>
          <Text style={styles.maxPowerDetails}>
            {maxPowerHourTime ? formatTime(maxPowerHourTime) : 'N/A'} - {maxPowerHourFullTotal?.toFixed(2) || 0} MW
          </Text>
        </View>

        

        {hourlyData && hourlyData.length > 0 ? (
          hourlyData[0].hourlyData.map((data, index) => {
            const totalPowerForHour = hourlyData
              .map(district => district.hourlyData[index]?.totalPower || 0) // Safely access totalPower
              .reduce((total, current) => total + current, 0);

            const isMaxPowerHour = totalPowerForHour === maxPowerHourFullTotal;
            return (
              <View key={index} style={[styles.timeContainer, isMaxPowerHour && styles.maxPowerHighlight]}>
                <Text style={styles.time}>Date and Time: {formatTime(data.time)}</Text>
                <Text style={styles.totalPower}>Full Total: {totalPowerForHour.toFixed(2)} MW</Text>

                {districtData.map((district) => {
                  const districtHourlyData = district.hourlyData[index];
                  if (!districtHourlyData) return null; // Skip if data is missing
                  
                  const isDistrictMaxPower = districtHourlyData.totalPower === maxPowerHourFullTotal;
                  console.log('maxFullTotalPower:', maxPowerHourFullTotal);
                  return (
                    <View
                      key={district.name}
                      style={[styles.districtContainer, isDistrictMaxPower && styles.maxPowerHighlight]}
                    >
                      <Text style={styles.districtInfo}>- District: {district.name}</Text>
                      <Text style={styles.powerData}>
                        Wind Power: {districtHourlyData.windPower.toFixed(2)} MW
                        {'   '}
                        Solar Power: {districtHourlyData.solarPower.toFixed(2)} MW
                        {'   '}
                        Total Power: {districtHourlyData.totalPower.toFixed(2)} MW
                      </Text>
                    </View>
                  );
                })}
              </View>
            );
          })
        ) : (
          <Text style={styles.errorText}>No data available for the selected day.</Text>
        )}
      </ScrollView>
    )}
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeContainer: {
    marginVertical: 10,
  },
  nextDayText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#2a9d8f',
  },

  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPower: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  districtContainer: {
    marginVertical: 5,
  },
  districtInfo: {
    fontSize: 16,
  },
  powerData: {
    fontSize: 16,
    marginLeft: 20,
  },
  maxPowerContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  maxPowerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  maxPowerDetails: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  maxPowerHighlight: {
    backgroundColor: '#ffeb3b',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
});

export default App;
