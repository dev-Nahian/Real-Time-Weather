import { useContext, useState, useEffect } from "react";
import Header from "./components/header/Header";
import WeatherBoard from "./components/weather/WeatherBoard";
import ForecastBoard from "./components/weather/ForecastBoard";
import { WeatherContext } from "./context";

import ClearSkyImage from "./assets/backgrounds/clear-sky.jpg";
import FewCloudsImage from "./assets/backgrounds/few-clouds.jpg";
import MistImage from "./assets/backgrounds/mist.jpeg";
import RainyDayImage from "./assets/backgrounds/rainy-day.jpg";
import ScatterdCloudsImage from "./assets/backgrounds/scattered-clouds.jpg";
import SnowImage from "./assets/backgrounds/sunny.jpg";
import ThunderStormImage from "./assets/backgrounds/thunderstorm.jpg";
import WinterImage from "./assets/backgrounds/winter.jpg";

const Page = () => {
  const { weatherData, loading } = useContext(WeatherContext);
  const [climateImage, setClimateImage] = useState("");

  function getBackGroundImage(climate) {
    switch (climate) {
      case "Rain":
      case "Drizzle":
        return RainyDayImage;
      case "Clouds":
        return ScatterdCloudsImage;
      case "Clear":
        return ClearSkyImage;
      case "Snow":
        return SnowImage;
      case "Thunder":
      case "Thunderstorm":
        return ThunderStormImage;
      case "Fog":
      case "Winter":
        return WinterImage;
      case "Haze":
      case "Mist":
      case "Smoke":
      case "Dust":
        return FewCloudsImage;
      default:
        return ClearSkyImage;
    }
  }

  useEffect(() => {
    const bgImage = getBackGroundImage(weatherData.climate);
    setClimateImage(bgImage);
  }, [weatherData.climate]);

  return (
    <>
      {loading.state ? (
        <div className="flex bg-gray-900/80 backdrop-blur-md rounded-xl w-96 mt-28 p-8 mx-auto border border-white/20 text-white shadow-2xl justify-center items-center">
          <div className="flex flex-col items-center space-y-4">
            <svg className="animate-spin h-8 w-8 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-sm font-semibold tracking-wider uppercase text-white/70">{loading.message}</p>
          </div>
        </div>
      ) : (
        <div 
          style={{ backgroundImage: `url('${climateImage}')` }}
          className="min-h-screen bg-no-repeat bg-cover bg-center flex flex-col justify-between py-24 transition-all duration-700 ease-in-out"
        >
          <Header />

          <main className="w-full flex-grow flex flex-col items-center justify-center mt-12">
            <section className="w-full">
              <WeatherBoard />
            </section>
            <section className="w-full">
              <ForecastBoard />
            </section>
          </main>
        </div>
      )}
    </>
  );
};

export default Page;
