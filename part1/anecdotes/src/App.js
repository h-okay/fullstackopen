import { useState } from "react";

import Button from "./Button";
import Display from "./Display";
import Header from "./Header";
import { anecdotes } from "./Anectodes";

const App = () => {
  const votes = Array(anecdotes.length).fill(0);
  const [selected, setSelected] = useState(0);
  const [anectodeVotes, setAnectodeVotes] = useState(votes);
  const [maxIndex, setMaxIndex] = useState(0);

  const getAnectode = () => {
    const num = Number.parseInt(Math.random() * anecdotes.length);
    setSelected(num);
  };

  const vote = () => {
    const newVotes = [...anectodeVotes];
    newVotes[selected] += 1;
    setAnectodeVotes(newVotes);
    if (newVotes[selected] > newVotes[maxIndex]) {
      setMaxIndex(selected);
    }
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Display text={anecdotes[selected]} />
      <Display text={anectodeVotes[selected]} prefix="has" suffix="votes" />
      <br />
      <Button handleClick={vote} text="vote" />
      <Button handleClick={getAnectode} text="next anectode" />
      <Header text="Anecdote with most votes" />
      <Display text={anecdotes[maxIndex]} />
      <Display text={anectodeVotes[maxIndex]} prefix="has" suffix="votes" />
    </div>
  );
};

export default App;
