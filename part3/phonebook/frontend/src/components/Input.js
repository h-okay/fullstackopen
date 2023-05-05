const Input = ({ text, value, changeHandler }) => {
  return (
    <div>
      {text}: <input value={value} onChange={changeHandler} required />
    </div>
  );
};

export default Input;
