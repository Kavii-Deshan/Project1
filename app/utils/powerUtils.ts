import axios from 'axios';

const API_KEY = 'b9d32839ef7bd654d5ca840c2b0d261c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

function getWindCapacityFactor(windSpeed: number): number {
  if (windSpeed < 3) return 0; // Below cut-in speed
  if (windSpeed >= 3 && windSpeed <= 12) {
    return (windSpeed - 3) / (12 - 3); // Linear ramp-up between cut-in and rated speed
  }
  if (windSpeed > 12 && windSpeed <= 25) {
    return 1; // Rated speed
  }
  return 0; // Above cut-out speed
}

// Fetch weather data for all districts
export async function fetchWeatherData() {
  const districts = [
    { name: 'Colombo', lat: 6.9271, lon: 79.8612, wind_capacity: 1, solar_capacity: 2 },
    { name: 'Hambantota', lat: 6.1246, lon: 81.1185, wind_capacity: 10, solar_capacity: 33 },
    { name: 'Mannar', lat: 8.9795, lon: 79.9020, wind_capacity: 103.5, solar_capacity: 15 },
    { name: 'Moneragala', lat: 6.8706, lon: 81.3485, wind_capacity: 1, solar_capacity: 100 },
    // Add other districts...
  ];

  const weatherData = await Promise.all(
    districts.map(async (district) => {
      const response = await axios.get(`${BASE_URL}?lat=${district.lat}&lon=${district.lon}&appid=${API_KEY}&units=metric`);
      return { district: district.name, wind_capacity: district.wind_capacity, solar_capacity: district.solar_capacity, ...response.data };
    })
  );

  return weatherData;
}

// Calculate power generation for each hour
export function calculatePower(weatherData: any[]) {
  return weatherData.flatMap(({ district, wind_capacity, solar_capacity, list }: any) =>
    list.map((entry: any) => {
      const wind_speed = entry.wind.speed; // m/s
      const cloud_cover = entry.clouds.all; // %

      const wind_cf = getWindCapacityFactor(wind_speed);
      const wind_power = wind_capacity * wind_cf;

      const solar_cf = (100 - cloud_cover) / 100;
      const solar_power = solar_capacity * solar_cf;

      return {
        time: entry.dt_txt, // Hourly timestamp
        district,
        wind_power,
        solar_power,
        total_power: wind_power + solar_power,
      };
    })
  );
}
