const Total = (props) => {
  const [first, second, third] = props.parts;
  return (
    <p>
      Number of exercises&nbsp;
      {first.exercises + second.exercises + third.exercises}
    </p>
  );
};

export default Total;
