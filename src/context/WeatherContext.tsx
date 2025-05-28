import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    humidity: number;
    wind_kph: number;
    wind_mph: number;
    condition: {
      text: string;
      icon: string;
    };
    feelslike_c: number;
    feelslike_f: number;
  };
}

interface ForecastDay {
  date: string;
  day: {
    avgtemp_c: number;
    avgtemp_f: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

type TemperatureUnit = "C" | "F";

interface WeatherContextType {
  weatherData: WeatherData | null;
  forecast: ForecastDay[];
  loading: boolean;
  error: string | null;
  searchCity: (city: string) => Promise<void>;
  recentCities: string[];
  unit: TemperatureUnit;
  toggleUnit: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

const API_KEY = "d18071baae8a468faf3102710240410";
const BASE_URL = "http://api.weatherapi.com/v1";
const MAX_RECENT_CITIES = 5;

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentCities, setRecentCities] = useState<string[]>(() => {
    const saved = localStorage.getItem("recentCities");
    return saved ? JSON.parse(saved) : [];
  });
  const [unit, setUnit] = useState<TemperatureUnit>(() => {
    return (localStorage.getItem("temperatureUnit") as TemperatureUnit) || "C";
  });

  const updateRecentCities = (city: string) => {
    setRecentCities((prev) => {
      const filtered = prev.filter(
        (c) => c.toLowerCase() !== city.toLowerCase()
      );
      const updated = [city, ...filtered].slice(0, MAX_RECENT_CITIES);
      localStorage.setItem("recentCities", JSON.stringify(updated));
      return updated;
    });
  };

  const fetchWeatherData = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BASE_URL}/forecast.json`, {
        params: {
          key: API_KEY,
          q: city,
          days: 5,
          aqi: "no",
          alerts: "no",
        },
      });
      setWeatherData(response.data);
      setForecast(response.data.forecast?.forecastday || []);
      updateRecentCities(city);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      setWeatherData(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const getLocationWeather = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${BASE_URL}/forecast.json`, {
              params: {
                key: API_KEY,
                q: `${latitude},${longitude}`,
                days: 5,
                aqi: "no",
                alerts: "no",
              },
            });
            setWeatherData(response.data);
            setForecast(response.data.forecast?.forecastday || []);
            updateRecentCities(response.data.location.name);
          } catch (err) {
            setError("Failed to fetch weather data. Please try again.");
            setWeatherData(null);
            setForecast([]);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setError("Please enable location access to see your local weather");
          fetchWeatherData("London");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      fetchWeatherData("London");
    }
  };

  useEffect(() => {
    getLocationWeather();
    const interval = setInterval(() => {
      if (weatherData?.location.name) {
        fetchWeatherData(weatherData.location.name);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const searchCity = async (city: string) => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }
    await fetchWeatherData(city.trim());
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => {
      const newUnit = prevUnit === "C" ? "F" : "C";
      localStorage.setItem("temperatureUnit", newUnit);
      return newUnit;
    });
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        forecast,
        loading,
        error,
        searchCity,
        recentCities,
        unit,
        toggleUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
