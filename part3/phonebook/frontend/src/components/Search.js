const Search = ({ text, value, changeHandler }) => {
  return (
    <div>
      {text}: <input value={value} onChange={changeHandler} />
    </div>
  );
};

export default Search;
