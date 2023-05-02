import axios from "axios";
const geoUrl = "http://api.openweathermap.org/geo/1.0/direct";
const weatherUrl = "http://api.openweathermap.org/data/2.5/weather";

const weatherService = {
  getGeoCode: async (location) => {
    const request = axios.get(geoUrl, {
      params: {
        q: location,
        limit: 1,
        appid: process.env.REACT_APP_WEATHER_API_KEY,
      },
    });
    return request.then((response) => response.data);
  },
  getWeather: async (lat, lon) => {
    const request = axios.get(weatherUrl, {
      params: {
        lat: lat,
        lon: lon,
        appid: process.env.REACT_APP_WEATHER_API_KEY,
        units: "metric",
      },
    });
    return request.then((response) => response.data);
  },
};

export default weatherService;
