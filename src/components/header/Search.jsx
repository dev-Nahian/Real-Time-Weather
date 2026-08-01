import { useContext, useState, useEffect, useRef } from "react";
import { LocationContext, WeatherContext } from "../../context";
import { getLocations } from "../../data/location-data";
import { useDebounce } from "../../hooks";

export default function Search() {
  const { selectedLocation, setSelectedLocation } = useContext(LocationContext);
  const { weatherData } = useContext(WeatherContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);

  // Close suggestions dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sync searchTerm with selectedLocation.location
  useEffect(() => {
    if (selectedLocation.location) {
      setSearchTerm(selectedLocation.location);
    }
  }, [selectedLocation.location]);

  // Sync with weatherData.location initially if selectedLocation is empty
  useEffect(() => {
    if (weatherData.location && !selectedLocation.location && !searchTerm) {
      setSearchTerm(weatherData.location);
    }
  }, [weatherData.location]);

  const fetchSuggestions = async (term) => {
    if (!term || term.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          term
        )}&limit=5&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Geocoding failed");
      }

      const data = await response.json();
      
      if (data && data.length > 0) {
        const mapped = data.map((item) => ({
          location: `${item.name}${item.state ? `, ${item.state}` : ""}, ${item.country}`,
          latitude: item.lat,
          longitude: item.lon,
        }));
        setSuggestions(mapped);
      } else {
        fallbackLocalSearch(term);
      }
    } catch (error) {
      console.warn("Geocoding API failed, falling back to local search", error);
      fallbackLocalSearch(term);
    }
  };

  const fallbackLocalSearch = (term) => {
    const localData = getLocations();
    const filtered = localData.filter((item) =>
      item.location.toLowerCase().includes(term.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const debouncedFetch = useDebounce((term) => {
    fetchSuggestions(term);
  }, 400);

  function handleChange(e) {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(true);
    debouncedFetch(value);
  }

  function handleSelectSuggestion(suggestion) {
    setSelectedLocation({
      location: suggestion.location,
      latitude: suggestion.latitude,
      longitude: suggestion.longitude,
    });
    setSearchTerm(suggestion.location);
    setShowSuggestions(false);
  }

  const handleGPSClick = () => {
    setSearchTerm("");
    setSelectedLocation({
      location: "",
      latitude: null,
      longitude: null,
    });
  };

  return (
    <div ref={containerRef} className="relative z-50">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center space-x-2 py-2 px-3 group focus-within:bg-black/35 transition-all border-b border-white/50 focus-within:border-b-0 focus-within:rounded-md bg-black/10">
          <input
            className="bg-transparent placeholder:text-white/70 text-white w-full text-xs md:text-base outline-none border-none"
            type="search"
            placeholder="Search Location..."
            value={searchTerm}
            onChange={handleChange}
            onFocus={() => setShowSuggestions(true)}
            required
            id="search-input"
          />
          <button
            type="button"
            onClick={handleGPSClick}
            className="p-1 hover:bg-white/15 rounded transition-all text-white/80 hover:text-white flex items-center justify-center active:scale-95"
            title="Use Live Location"
            id="gps-location-btn"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2M12 20v2M4 12H2M22 12h-2" />
              <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-md shadow-2xl overflow-hidden border border-white/20 text-black max-h-60 overflow-y-auto z-50">
          {suggestions.map((sug, idx) => (
            <li
              key={`${sug.location}-${idx}`}
              onClick={() => handleSelectSuggestion(sug)}
              className="py-2.5 px-4 cursor-pointer hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-0 text-sm font-medium"
            >
              {sug.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
