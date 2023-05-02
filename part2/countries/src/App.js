import countryService from "./services/countries";
import weatherService from "./services/weather";
import { useState, useEffect } from "react";
import "./App.css";
import CountryDetails from "./components/CountryDetails";
import CountryList from "./components/CountryList";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState({});

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      initialCountries.sort((a, b) => (a.name.common > b.name.common ? 1 : -1));
      setCountries(initialCountries);
    });
  }, []);

  useEffect(() => {
    if (countriesToShow.length === 1) {
      const country = countriesToShow[0];
      const capital = country.capital[0];
      weatherService
        .getGeoCode(capital)
        .then((geoCode) => {
          const { lat, lon } = geoCode[0];
          return weatherService.getWeather(lat, lon);
        })
        .then((weatherResponse) => {
          const { main, weather, wind } = weatherResponse;
          const { temp } = main;
          const { icon } = weather[0];
          const { speed } = wind;
          console.log(weatherResponse);
          setWeatherInfo({ temp, icon, speed });
        });
    }
  }, [countriesToShow]);

  useEffect(() => {
    const countriesToShow = countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setCountriesToShow(countriesToShow);
  }, [search, countries]);

  const handleButtonClick = (countryName) => {
    const countryToShow = countries.find(
      (country) => country.name.common === countryName
    );
    setCountriesToShow([countryToShow]);
    setSearch(countryName);
  };

  const content = search ? (
    countriesToShow.length === 1 ? (
      <CountryDetails country={countriesToShow[0]} weather={weatherInfo} />
    ) : countriesToShow.length > 10 ? (
      <p>Too many results...</p>
    ) : (
      <CountryList
        countries={countriesToShow}
        handleButtonClick={handleButtonClick}
      />
    )
  ) : (
    <CountryList countries={countries} handleButtonClick={handleButtonClick} />
  );

  return (
    <div>
      <div>
        <span>Search:&nbsp;</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {content}
    </div>
  );
}

export default App;
