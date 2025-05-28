# Anshul's Weather App

A sleek, responsive weather application built with React and TypeScript, featuring real time weather data and a beautiful glass morphic UI.

## Features

- **Real-time Weather Data**

  - Current weather conditions
  - 5 day forecast
  - Auto-updates every 30 seconds

- **Location Services**

  - Automatic location detection
  - Fallback to default city if location access denied

- **Temperature Units**

  - Toggle between Celsius and Fahrenheit
  - Persists user preference

- **Responsive Design**

  - Works on all devices
  - Clean, modern interface
  - Glass morphic UI elements

- **Search & History**
  - Search any city worldwide
  - Recent cities history
  - Quick access to previous searches

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/weather-app.git
```

2. Install dependencies

```bash
cd weather-app
npm install
```

3. Create and add your WeatherAPI key:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server

```bash
npm run dev
```

## Built With

- [React](https://reactjs.org/) - Frontend framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [WeatherAPI](https://www.weatherapi.com/) - Weather data
- [Axios](https://axios-http.com/) - API requests
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) - Styling

## Usage

1. **Initial Load**

   - App requests location permission
   - Shows local weather if allowed
   - Falls back to default city if denied

2. **Searching**

   - Enter city name in search bar
   - Click search or press enter
   - City added to recent history

3. **Temperature Units**

   - Click unit toggle button to switch between °C and °F
   - Setting persists across sessions

4. **Auto Update**
   - Weather refreshes every 30 seconds
   - Shows loading state during updates

## Approach

I approached this project in a structured way as there was a time limit and the assignment expected functionality and Aesthetics. I started by first planning the structure, then building core functionality, and finally focusing on polish and usability. My goal was to keep the user experience simple and smooth, while also writing clean, maintainable code.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Weather data provided by [WeatherAPI](https://www.weatherapi.com/)
- Icons from [WeatherAPI](https://www.weatherapi.com/)
