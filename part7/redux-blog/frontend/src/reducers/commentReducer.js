import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const commentsSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    set(state, action) {
      return action.payload;
    },
    append(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      const removedCommentId = action.payload;
      return state.filter((comment) => comment.id !== removedCommentId);
    },
  },
});

export const { set, append, remove } = commentsSlice.actions;

export const initialiazeComments = (id) => {
  return async (dispatch) => {
    const comments = await blogService.getComments(id);
    dispatch(set(comments));
  };
};

export const addNewComment = (id, comment) => {
  return async (dispatch) => {
    const newComment = await blogService.addComment(id, comment);
    dispatch(append(newComment));
  };
};

export const deleteOldComment = (id, commentId) => {
  return async (dispatch) => {
    await blogService.deleteComment(id, commentId);
    dispatch(remove(commentId));
  };
};

export default commentsSlice.reducer;
