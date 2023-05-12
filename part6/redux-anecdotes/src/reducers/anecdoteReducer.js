import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    vote(state, action) {
      const votedAnectode = action.payload;
      return state.map((n) => (n.id !== votedAnectode.id ? n : votedAnectode));
    },
    set(state, action) {
      return action.payload;
    },
    append(state, action) {
      state.push(action.payload);
    },
  },
});

export const { vote, set, append } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(set(anecdotes));
  };
};

export const createNew = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch(append(newAnecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const oldAnecdote = await anecdoteService.getOne(id);
    const votedAnectode = {
      ...oldAnecdote,
      votes: oldAnecdote.votes + 1,
    };
    await anecdoteService.put(id, votedAnectode);
    dispatch(vote(votedAnectode));
  };
};

export default anecdoteSlice.reducer;
