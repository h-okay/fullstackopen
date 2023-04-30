import Person from "./Person";

const Display = ({ persons, clickHandler }) => {
  return persons.map((person) => (
    <Person
      key={person.id}
      name={person.name}
      number={person.number}
      clickHandler={() => clickHandler(person.id)}
    />
  ));
};

export default Display;
