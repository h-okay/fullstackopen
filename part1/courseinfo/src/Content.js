import Part from "./Part";

const Content = (props) => {
  const [first, second, third] = props.parts;
  return (
    <>
      <Part name={first.name} exercises={first.exercises} />
      <Part name={second.name} exercises={second.exercises} />
      <Part name={third.name} exercises={third.exercises} />
    </>
  );
};

export default Content;
