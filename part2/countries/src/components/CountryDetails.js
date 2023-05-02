const CountryDetails = ({ country, weather }) => {
  const { name, capital, area, languages, flags } = country;
  const { temp, icon, wind } = weather;
  const languagesArray = Object.values(languages);
  return (
    <>
      <h1>{name.common}</h1>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <h1>Languages</h1>
      <ul>
        {languagesArray.map((language, i) => (
          <li key={"language_" + i}>{language}</li>
        ))}
      </ul>
      <img src={flags.png} alt={name.common + "_flag"} width={200} />
      <h1>Weather in {capital}</h1>
      <p>Temperature is {temp}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={capital + "_weather"}
      />
      <p>Wind {wind} m/s</p>
    </>
  );
};

export default CountryDetails;
