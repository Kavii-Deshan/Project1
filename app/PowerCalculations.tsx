const calculateWindPower = (windSpeed, windCapacity) => {
    let cfWind = 0;
    
    // Wind power calculation logic
    if (windSpeed < 3) {
      cfWind = 0;
    } else if (windSpeed >= 3 && windSpeed <= 15) {
      cfWind = 0.1 * windSpeed;
    } else if (windSpeed > 15) {
      cfWind = 1;
    }
  
    return windCapacity * cfWind;  // Power generated (in MW)
  };
  
  const calculateSolarPower = (solarIrradiance, solarCapacity) => {
    const cfSolar = solarIrradiance / 1000;  // Irradiance is in W/m^2, capacity factor is calculated by dividing by 1000
    return solarCapacity * cfSolar;  // Power generated (in MW)
  };
  
  export { calculateWindPower, calculateSolarPower };
  