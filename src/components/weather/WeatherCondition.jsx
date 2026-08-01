import { useContext } from "react";
import { WeatherContext, UnitContext } from "../../context";
import { convertTemp } from "../../utils/temp-utils";
import { getFormattedDate } from "../../utils/date-utils";

import TempMax from "../../assets/icons/temp-max.svg";
import TempMin from "../../assets/icons/temp-min.svg";
import HumidityIcon from "../../assets/icons/humidity.svg";
import CloudIcon from "../../assets/icons/cloud.svg";
import WindIcon from "../../assets/icons/wind.svg";

export default function WeatherCondition() {
  const { weatherData } = useContext(WeatherContext);
  const { unit } = useContext(UnitContext);

  const {
    maxTemperature,
    minTemperature,
    humidity,
    cloudPercentage,
    wind,
    climate,
    pressure,
    visibility,
    sunrise,
    sunset,
  } = weatherData;

  // Format visibility in km (OpenWeatherMap returns it in meters)
  const formattedVisibility = visibility ? `${(visibility / 1000).toFixed(1)} km` : "N/A";

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <p className="text-sm lg:text-base font-bold uppercase tracking-wider text-white/90 mb-4 border-b border-white/10 pb-2">
          Current Conditions: <span className="underline underline-offset-4 decoration-sky-400">{climate}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-2">
        {/* Temp Max */}
        <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex items-center justify-between hover:bg-white/10 transition-colors shadow-sm">
          <div>
            <p className="text-[11px] text-white/55 uppercase font-semibold">Temp Max</p>
            <p className="text-sm lg:text-base font-bold text-white mt-0.5">
              {convertTemp(maxTemperature, unit)}°
            </p>
          </div>
          <img src={TempMax} alt="temp-max" className="w-5 h-5 filter drop-shadow" />
        </div>

        {/* Temp Min */}
        <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex items-center justify-between hover:bg-white/10 transition-colors shadow-sm">
          <div>
            <p className="text-[11px] text-white/55 uppercase font-semibold">Temp Min</p>
            <p className="text-sm lg:text-base font-bold text-white mt-0.5">
              {convertTemp(minTemperature, unit)}°
            </p>
          </div>
          <img src={TempMin} alt="temp-min" className="w-5 h-5 filter drop-shadow" />
        </div>

        {/* Humidity */}
        <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex items-center justify-between hover:bg-white/10 transition-colors shadow-sm">
          <div>
            <p className="text-[11px] text-white/55 uppercase font-semibold">Humidity</p>
            <p className="text-sm lg:text-base font-bold text-white mt-0.5">{humidity}%</p>
          </div>
          <img src={HumidityIcon} alt="humidity" className="w-5 h-5" />
        </div>

        {/* Cloudiness */}
        <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex items-center justify-between hover:bg-white/10 transition-colors shadow-sm">
          <div>
            <p className="text-[11px] text-white/55 uppercase font-semibold">Cloudy</p>
            <p className="text-sm lg:text-base font-bold text-white mt-0.5">{cloudPercentage}%</p>
          </div>
          <img src={CloudIcon} alt="cloudy" className="w-5 h-5" />
        </div>

        {/* Wind */}
        <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex items-center justify-between hover:bg-white/10 transition-colors shadow-sm">
          <div>
            <p className="text-[11px] text-white/55 uppercase font-semibold">Wind</p>
            <p className="text-sm lg:text-base font-bold text-white mt-0.5">{wind} km/h</p>
          </div>
          <img src={WindIcon} alt="wind" className="w-5 h-5" />
        </div>

        {/* Pressure */}
        <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex items-center justify-between hover:bg-white/10 transition-colors shadow-sm">
          <div>
            <p className="text-[11px] text-white/55 uppercase font-semibold">Pressure</p>
            <p className="text-sm lg:text-base font-bold text-white mt-0.5">{pressure} hPa</p>
          </div>
          <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 12L15 9M12 12a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>

        {/* Visibility */}
        <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex items-center justify-between hover:bg-white/10 transition-colors shadow-sm">
          <div>
            <p className="text-[11px] text-white/55 uppercase font-semibold">Visibility</p>
            <p className="text-sm lg:text-base font-bold text-white mt-0.5">{formattedVisibility}</p>
          </div>
          <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>

        {/* Sunrise */}
        <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex items-center justify-between hover:bg-white/10 transition-colors shadow-sm">
          <div>
            <p className="text-[11px] text-white/55 uppercase font-semibold">Sunrise</p>
            <p className="text-sm lg:text-base font-bold text-amber-400 mt-0.5">
              {sunrise ? getFormattedDate(sunrise, "time", false) : "N/A"}
            </p>
          </div>
          <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.8-5.8l-2.1 2.1M8.8 15.2l-2.1 2.1m11-2.1l-2.1-2.1M8.8 8.8L6.7 6.7M4 19h16" />
            <path d="M16 14a4 4 0 00-8 0" />
          </svg>
        </div>

        {/* Sunset */}
        <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex items-center justify-between hover:bg-white/10 transition-colors shadow-sm mb-2">
          <div>
            <p className="text-[11px] text-white/55 uppercase font-semibold">Sunset</p>
            <p className="text-sm lg:text-base font-bold text-orange-400 mt-0.5">
              {sunset ? getFormattedDate(sunset, "time", false) : "N/A"}
            </p>
          </div>
          <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 17v3M4 17h16M17 12l-2.1-2.1M9.1 9.9L7 7.8M12 6V3m6.8 9h-3M6.2 12H3" />
            <path d="M16 17a4 4 0 00-8 0" />
          </svg>
        </div>
      </div>
    </div>
  );
}
