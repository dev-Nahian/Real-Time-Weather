import { useEffect, useState, useContext } from "react";
import { LocationContext } from "../context";

const processForecastData = (list) => {
  const dailyForecasts = {};
  list.forEach((item) => {
    // Extract date string YYYY-MM-DD
    const date = item.dt_txt.split(" ")[0];
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = {
        date: date,
        temps: [],
        weather: item.weather[0],
        dt: item.dt,
        humidity: item.main.humidity,
        cloudPercentage: item.clouds?.all,
        wind: item.wind?.speed,
        pressure: item.main.pressure,
        visibility: item.visibility,
      };
    }
    dailyForecasts[date].temps.push(item.main.temp);
    // Prefer mid-day forecast for the representative climate icon/text and details
    if (item.dt_txt.includes("12:00:00")) {
      dailyForecasts[date].weather = item.weather[0];
      dailyForecasts[date].dt = item.dt;
      dailyForecasts[date].humidity = item.main.humidity;
      dailyForecasts[date].cloudPercentage = item.clouds?.all;
      dailyForecasts[date].wind = item.wind?.speed;
      dailyForecasts[date].pressure = item.main.pressure;
      dailyForecasts[date].visibility = item.visibility;
    }
  });

  // Convert to array, compute min/max/average, and take 5 days
  return Object.values(dailyForecasts)
    .map((day) => {
      const minTemp = Math.min(...day.temps);
      const maxTemp = Math.max(...day.temps);
      const avgTemp = day.temps.reduce((sum, t) => sum + t, 0) / day.temps.length;
      return {
        date: day.date,
        dt: day.dt,
        temp: avgTemp,
        minTemp: minTemp,
        maxTemp: maxTemp,
        climate: day.weather.main,
        description: day.weather.description,
        icon: day.weather.icon,
        humidity: day.humidity,
        cloudPercentage: day.cloudPercentage,
        wind: day.wind,
        pressure: day.pressure,
        visibility: day.visibility,
      };
    })
    .slice(0, 5);
};

const useWeather = () => {
  const [weatherData, setWeatherData] = useState({
    location: "",
    climate: "",
    temperature: "",
    maxTemperature: "",
    minTemperature: "",
    humidity: "",
    cloudPercentage: "",
    wind: "",
    time: "",
    timezone: null,
    longitude: "",
    latitude: "",
    pressure: "",
    visibility: "",
    sunrise: "",
    sunset: "",
  });

  const [forecastData, setForecastData] = useState([]);

  const [loading, setLoading] = useState({
    state: false,
    message: "",
  });

  const [error, setError] = useState(null);

  const { selectedLocation } = useContext(LocationContext);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      setLoading({
        state: true,
        message: "Fetching weather data...",
      });
      setError(null);

      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      
      // Fetch both endpoints concurrently
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        ),
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        ),
      ]);

      if (!weatherResponse.ok) {
        throw new Error(`Current weather request failed: ${weatherResponse.status}`);
      }
      if (!forecastResponse.ok) {
        throw new Error(`Forecast request failed: ${forecastResponse.status}`);
      }

      const weatherDataRaw = await weatherResponse.json();
      const forecastDataRaw = await forecastResponse.json();

      setWeatherData({
        location: weatherDataRaw?.name,
        climate: weatherDataRaw?.weather[0]?.main,
        temperature: weatherDataRaw?.main?.temp,
        maxTemperature: weatherDataRaw?.main?.temp_max,
        minTemperature: weatherDataRaw?.main?.temp_min,
        humidity: weatherDataRaw?.main?.humidity,
        cloudPercentage: weatherDataRaw?.clouds?.all,
        wind: weatherDataRaw?.wind?.speed,
        time: weatherDataRaw?.dt,
        timezone: weatherDataRaw?.timezone,
        longitude: longitude,
        latitude: latitude,
        pressure: weatherDataRaw?.main?.pressure,
        visibility: weatherDataRaw?.visibility,
        sunrise: weatherDataRaw?.sys?.sunrise,
        sunset: weatherDataRaw?.sys?.sunset,
      });

      const processedForecast = processForecastData(forecastDataRaw.list);
      setForecastData(processedForecast);

    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load weather data.");
    } finally {
      setLoading({
        state: false,
        message: "",
      });
    }
  };

  useEffect(() => {
    setLoading({
      state: true,
      message: "Finding location...",
    });

    if (selectedLocation.latitude !== null && selectedLocation.longitude !== null) {
      fetchWeatherData(selectedLocation.latitude, selectedLocation.longitude);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchWeatherData(position.coords.latitude, position.coords.longitude);
          },
          (err) => {
            console.warn("Geolocation failed or denied. Falling back to default: Dhaka", err);
            // Default to Dhaka, Bangladesh
            fetchWeatherData(23.8103, 90.4125);
          }
        );
      } else {
        console.warn("Geolocation not supported. Falling back to default: Dhaka");
        fetchWeatherData(23.8103, 90.4125);
      }
    }
  }, [selectedLocation.latitude, selectedLocation.longitude]);

  return {
    weatherData,
    forecastData,
    error,
    loading,
  };
};

export default useWeather;
