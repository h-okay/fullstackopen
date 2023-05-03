import Input from "./Input";
import Button from "./Button";

const Form = ({
  name,
  number,
  submitHandler,
  changeHandlers,
  clickHandler,
}) => {
  return (
    <form onSubmit={submitHandler}>
      <Input
        text="name"
        value={name}
        changeHandler={changeHandlers.handleNameChange}
      />
      <Input
        text="number"
        value={number}
        changeHandler={changeHandlers.handleNumberChange}
      />
      <Button text="add" buttonType="submit" clickHandler={clickHandler} />
    </form>
  );
};

export default Form;
