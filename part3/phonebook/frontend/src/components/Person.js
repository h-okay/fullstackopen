import Button from "./Button";
const Person = ({ name, number, clickHandler }) => {
  return (
    <div>
      <p style={{ display: "inline-block", marginRight: "5px" }}>
        {name} {number}
      </p>
      <Button text="delete" clickHandler={clickHandler} />
    </div>
  );
};

export default Person;
