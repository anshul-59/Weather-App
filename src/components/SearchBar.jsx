import React, { useState } from "react";
import { useWeather } from "../context/WeatherContext";
import "../styles/SearchBar.css";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const { searchCity, loading, error, recentCities } = useWeather();
  const [localError, setLocalError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!city.trim()) {
      setLocalError("Please enter a city name");
      return;
    }

    searchCity(city.trim());
  };

  const handleRecentCityClick = (recentCity) => {
    setCity(recentCity);
    searchCity(recentCity);
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className={`search-input ${localError ? "error" : ""}`}
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setLocalError(null);
          }}
          placeholder="Enter city name..."
          disabled={loading}
        />
        <button
          className="search-button"
          type="submit"
          disabled={loading || !city.trim()}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {(localError || error) && (
        <div className="error-message">{localError || error}</div>
      )}

      {recentCities.length > 0 && (
        <div className="recent-cities-container">
          {recentCities.map((recentCity) => (
            <button
              key={recentCity}
              className="recent-city-button"
              onClick={() => handleRecentCityClick(recentCity)}
              disabled={loading}
            >
              {recentCity}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
