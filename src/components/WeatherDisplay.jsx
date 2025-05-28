import React from "react";
import { useWeather } from "../context/WeatherContext";
import ForecastBar from "./ForecastBar";
import "../styles/WeatherDisplay.css";

const WeatherDisplay = () => {
  const { weatherData, loading, error, unit, toggleUnit } = useWeather();

  if (loading) {
    return <div className="loading-message">Loading weather data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!weatherData) {
    return null;
  }

  const date = new Date(weatherData.location.localtime);
  const time = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const temp =
    unit === "C" ? weatherData.current.temp_c : weatherData.current.temp_f;
  const feelsLike =
    unit === "C"
      ? weatherData.current.feelslike_c
      : weatherData.current.feelslike_f;
  const windSpeed =
    unit === "C"
      ? `${weatherData.current.wind_kph} km/h`
      : `${weatherData.current.wind_mph} mph`;

  return (
    <div className="card glass">
      <div className="top-right">
        <div className="place">
          {weatherData.location.region || weatherData.location.country}
        </div>
        <div className="time">{time}</div>
        <button className="unit-toggle" onClick={toggleUnit}>
          Switch to {unit === "C" ? "°F" : "°C"}
        </button>
      </div>

      <div className="city-title">{weatherData.location.name}</div>

      <img
        className="main-icon"
        src={`https:${weatherData.current.condition.icon}`}
        alt={weatherData.current.condition.text}
      />

      <div className="content-container">
        <div className="current-weather">
          <div className="temp">
            {Math.round(temp)}°{unit}
          </div>
          <div className="weather-desc">
            {weatherData.current.condition.text}
          </div>
          <div className="details-row">
            <div className="detail">
              <strong>Feels Like</strong>
              {Math.round(feelsLike)}°{unit}
            </div>
            <div className="detail">
              <strong>Humidity</strong>
              {weatherData.current.humidity}%
            </div>
            <div className="detail">
              <strong>Wind Speed</strong>
              {windSpeed}
            </div>
          </div>
        </div>

        <div className="forecast-container">
          <ForecastBar />
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
