import React from "react";
import { WeatherProvider } from "./context/WeatherContext";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import "./styles/App.css";

function App() {
  return (
    <WeatherProvider>
      <div className="app-container">
        <h1 className="title">Weather Dashboard</h1>
        <SearchBar />
        <WeatherDisplay />
      </div>
    </WeatherProvider>
  );
}

export default App;
