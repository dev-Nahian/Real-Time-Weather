import { WeatherContext } from "../context";
import { useWeather } from "../hooks";

// eslint-disable-next-line react/prop-types
const WeatherProvider = ({ children }) => {
  const { weatherData, forecastData, error, loading } = useWeather();

  return (
    <WeatherContext.Provider value={{ weatherData, forecastData, error, loading }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider
