const CountryList = ({ countries, handleButtonClick }) => {
  return (
    <div className="list">
      {countries.map((country, i) => (
        <div className="entry" key={"ct_" + i}>
          <p className="name-in-entry">{country.name.common}</p>
          <button
            className="button-in-entry"
            onClick={() => handleButtonClick(country.name.common)}
          >
            Show
          </button>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
