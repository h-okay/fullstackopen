const Button = ({ text, buttonType, clickHandler }) => {
  return (
    <button type={buttonType} onClick={clickHandler}>
      {text}
    </button>
  );
};

export default Button;
