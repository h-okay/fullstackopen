import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, clickHandler }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={clickHandler}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    return state.anecdotes
      .filter((anecdote) =>
        anecdote.content
          .toLowerCase()
          .trim()
          .includes(state.filter.toLowerCase().trim())
      )
      .sort((a, b) => b.votes - a.votes);
  });

  const voteHandler = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          clickHandler={() => voteHandler(anecdote)}
        />
      ))}
    </>
  );
};

export default AnecdoteList;
