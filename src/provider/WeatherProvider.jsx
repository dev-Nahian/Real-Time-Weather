import { useState, useEffect } from "react";
import { WeatherContext } from "../context";
import { useWeather } from "../hooks";

// eslint-disable-next-line react/prop-types
const WeatherProvider = ({ children }) => {
  const { weatherData, forecastData, error, loading } = useWeather();
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    setSelectedDay(null);
  }, [weatherData.location]);

  const displayWeather = selectedDay
    ? {
        ...weatherData,
        climate: selectedDay.climate,
        temperature: selectedDay.temp,
        maxTemperature: selectedDay.maxTemp,
        minTemperature: selectedDay.minTemp,
        humidity: selectedDay.humidity,
        cloudPercentage: selectedDay.cloudPercentage,
        wind: selectedDay.wind,
        pressure: selectedDay.pressure,
        visibility: selectedDay.visibility,
        time: selectedDay.dt,
      }
    : weatherData;

  return (
    <WeatherContext.Provider
      value={{
        weatherData: displayWeather,
        forecastData,
        error,
        loading,
        selectedDay,
        setSelectedDay,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
