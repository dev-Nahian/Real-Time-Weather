import { useContext } from "react";
import { WeatherContext, UnitContext } from "../../context";
import { convertTemp } from "../../utils/temp-utils";

import CloudIcon from "../../assets/cloud.svg";
import HazeIcon from "../../assets/haze.svg";
import SnowIcon from "../../assets/icons/snow.svg";
import SunnyIcon from "../../assets/icons/sunny.svg";
import RainIcon from "../../assets/rainy.svg";
import ThunderIcon from "../../assets/thunder.svg";

export default function ForecastBoard() {
  const { forecastData, weatherData, selectedDay, setSelectedDay } = useContext(WeatherContext);
  const { unit } = useContext(UnitContext);
  const timezone = weatherData?.timezone || 0;

  function getWeatherIcon(climate, iconCode) {
    switch (climate) {
      case "Rain":
      case "Drizzle":
        return RainIcon;
      case "Clouds":
        return CloudIcon;
      case "Clear":
        return SunnyIcon;
      case "Snow":
        return SnowIcon;
      case "Thunder":
      case "Thunderstorm":
        return ThunderIcon;
      case "Fog":
      case "Haze":
      case "Mist":
      case "Smoke":
      case "Dust":
      case "Sand":
      case "Ash":
      case "Squall":
      case "Tornado":
        return HazeIcon;
      default:
        return iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : SunnyIcon;
    }
  }

  const getDayName = (dt, timezoneOffsetSec = 0) => {
    const valMs = (dt + timezoneOffsetSec) * 1000;
    return new Date(valMs).toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
  };

  const getFormattedDayMonth = (dt, timezoneOffsetSec = 0) => {
    const valMs = (dt + timezoneOffsetSec) * 1000;
    return new Date(valMs).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
  };

  if (!forecastData || forecastData.length === 0) return null;

  return (
    <div className="mt-8 w-full max-w-[1058px] mx-auto px-4 lg:px-14 pb-12">
      <div className="bg-black/35 rounded-xl backdrop-blur-md border border-white/[10%] p-6 shadow-2xl">
        <h3 className="text-lg lg:text-xl font-bold mb-6 text-white tracking-wide uppercase border-b border-white/10 pb-3">
          5-Day Weather Forecast
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {forecastData.map((day, index) => {
            const isSelected = selectedDay && selectedDay.date === day.date;
            return (
              <div
                key={day.date}
                onClick={() => setSelectedDay(day)}
                className={`cursor-pointer bg-white/5 hover:bg-white/15 border rounded-lg p-4 transition-all duration-300 transform flex flex-col items-center justify-between text-center shadow-lg ${
                  isSelected
                    ? "border-sky-400 ring-2 ring-sky-400/30 bg-white/20 -translate-y-1"
                    : "border-white/5 hover:border-white/15 hover:-translate-y-1"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div>
                  <p className="text-sm font-bold text-white uppercase tracking-wider">
                    {getDayName(day.dt, timezone)}
                  </p>
                  <p className="text-[11px] text-white/60 mb-2">
                    {getFormattedDayMonth(day.dt, timezone)}
                  </p>
                </div>

                <img
                  src={getWeatherIcon(day.climate, day.icon)}
                  alt={day.climate}
                  className="w-12 h-12 my-2 object-contain filter drop-shadow-md"
                />

                <div className="mt-2">
                  <p className="text-xs text-white/70 capitalize font-medium mb-1 truncate max-w-[100px]" title={day.description}>
                    {day.description}
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-xs font-semibold">
                    <span className="text-white">{convertTemp(day.maxTemp, unit)}°</span>
                    <span className="text-white/40">/</span>
                    <span className="text-white/50">{convertTemp(day.minTemp, unit)}°</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
