import React from "react";
import { useWeather } from "../context/WeatherContext";
import "../styles/ForecastBar.css";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ForecastBar = () => {
  const { forecast, unit } = useWeather();

  if (!forecast || forecast.length === 0) return null;

  const today = new Date(forecast[0].date);
  const todayIdx = today.getDay();

  const daysToShow = Array.from(
    { length: 7 },
    (_, i) => (todayIdx + i) % 7
  ).filter((weekdayIdx) => weekdayIdx !== 1);

  const forecastByDay = {};
  forecast.forEach((f) => {
    const idx = new Date(f.date).getDay();
    forecastByDay[idx] = f;
  });

  return (
    <div className="bar">
      {daysToShow.map((weekdayIdx, i) => {
        const f = forecastByDay[weekdayIdx];
        const isToday =
          forecast[0] && new Date(forecast[0].date).getDay() === weekdayIdx;
        const avgTemp = unit === "C" ? f?.day.avgtemp_c : f?.day.avgtemp_f;

        return (
          <div
            key={WEEKDAYS[weekdayIdx] + i}
            className={`day ${!f ? "faded" : ""}`}
            style={isToday ? { fontWeight: 700, color: "#007bff" } : {}}
          >
            <span className="day-name">{WEEKDAYS[weekdayIdx]}</span>
            {f ? (
              <img
                className="icon"
                src={`https:${f.day.condition.icon}`}
                alt={f.day.condition.text}
              />
            ) : (
              <div className="placeholder-icon">☁️</div>
            )}
            <span className="temp">
              {f ? Math.round(avgTemp) + "°" + unit : "--"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ForecastBar;
