import { useContext } from "react";
import { WeatherContext, UnitContext } from "../../context";
import { getFormattedDate } from "../../utils/date-utils";
import { convertTemp } from "../../utils/temp-utils";

import PinIcon from "../../assets/pin.svg";

import CloudIcon from "../../assets/cloud.svg";
import HazeIcon from "../../assets/haze.svg";
import SnowIcon from "../../assets/icons/snow.svg";
import SunnyIcon from "../../assets/icons/sunny.svg";
import RainIcon from "../../assets/rainy.svg";
import ThunderIcon from "../../assets/thunder.svg";

export default function WeatherHeadLine() {
  const { weatherData, selectedDay, setSelectedDay } = useContext(WeatherContext);
  const { unit } = useContext(UnitContext);

  const { climate, location, temperature, time, timezone } = weatherData;

  function getWeatherIcon(climate) {
    switch (climate) {
      case "Rain":
        return RainIcon;
      case "Clouds":
        return CloudIcon;
      case "Clear":
        return SunnyIcon;
      case "Snow":
        return SnowIcon;
      case "Thunder":
        return ThunderIcon;
      case "Fog":
        return HazeIcon;
      case "Haze":
        return HazeIcon;
      case "Mist":
        return HazeIcon;

        default:
            return SunnyIcon;
    }
  }

  return (
    <div>
      <div className="max-md:flex items-center justify-between md:-mt-10">
        <img src={getWeatherIcon(climate)} alt="climate" />
        <div className="max-md:flex items-center max-md:space-x-4">
          <h1 className="text-[60px] lg:text-[80px] xl:text-[100px] leading-none md:mb-4">
            {convertTemp(temperature, unit)}°
          </h1>
          <div className="flex items-center space-x-4 md:mb-4">
            <img src={PinIcon} />
            <h2 className="text-2xl lg:text-[50px]">{location}</h2>
          </div>
        </div>
      </div>
      <p className="text-sm lg:text-lg flex flex-wrap items-center gap-2">
        <span>
          {getFormattedDate(time, "time", false, timezone)} -{" "}
          {getFormattedDate(time, "date", false, timezone)}
        </span>
        {selectedDay && (
          <button
            onClick={() => setSelectedDay(null)}
            className="px-2 py-0.5 text-xs font-semibold bg-sky-500/80 hover:bg-sky-600 rounded text-white transition-all cursor-pointer shadow-sm hover:shadow active:scale-95"
          >
            Show Current Weather
          </button>
        )}
      </p>
    </div>
  );
}
