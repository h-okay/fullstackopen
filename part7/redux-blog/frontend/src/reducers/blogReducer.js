import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState: initialState,
  reducers: {
    set(state, action) {
      return action.payload;
    },
    append(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      const removedBlog = action.payload;
      return state.filter((blog) => blog.id !== removedBlog.id);
    },
    like(state, action) {
      const likedBlog = action.payload;
      return state.map((blog) => (blog.id !== likedBlog.id ? blog : likedBlog));
    },
    sort(state, action) {
      return state.sort((a, b) => b.likes - a.likes);
    },
  },
});

export const { set, append, remove, like, sort } = blogSlice.actions;

export const initialiazeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(set(blogs));
    dispatch(sort());
  };
};

export const createNewBlog = (blog, user) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog, user);
    dispatch(append(newBlog));
    dispatch(
      setNotification(
        `A new blog '${newBlog.title}' by '${newBlog.author}' added`,
        5
      )
    );
  };
};

export const likeBlog = (blog, user) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog, user);
    dispatch(like(updatedBlog));
    dispatch(sort());
    dispatch(
      setNotification(
        `A like for the blog '${blog.title}' by '${blog.author}'`,
        5
      )
    );
  };
};

export const removeBlog = (blog, user) => {
  return async (dispatch) => {
    await blogService.remove(blog.id, user);
    dispatch(remove(blog));
    dispatch(
      setNotification(`The blog' ${blog.title}' by '${blog.author} removed`, 5)
    );
  };
};

export default blogSlice.reducer;
