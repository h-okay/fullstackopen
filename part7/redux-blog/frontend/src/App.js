import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";

import LoginForm from "./components/LoginForm";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import UserStats from "./components/UserStats";
import User from "./components/User";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import {
  initialiazeBlogs,
  createNewBlog,
  likeBlog,
  removeBlog,
} from "./reducers/blogReducer";
import { userLogin, userLogout, userLoad } from "./reducers/userReducer";
import {
  initializeStats,
  incrementStat,
  decrementStat,
} from "./reducers/statReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const stats = useSelector((state) => state.stats);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(userLoad());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeStats());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initialiazeBlogs());
  }, [dispatch]);

  const login = async (username, password) => {
    dispatch(userLogin({ username, password }));
  };

  const logout = async () => {
    dispatch(userLogout());
  };

  const createBlog = async (newBlog) => {
    dispatch(createNewBlog(newBlog, user));
    dispatch(incrementStat(user));
    blogFormRef.current.toggleVisibility();
  };

  const like = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    dispatch(likeBlog(blogToUpdate, user));
  };

  const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    );
    if (ok) {
      dispatch(removeBlog(blog, user));
      dispatch(decrementStat(user));
    }
  };

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm login={login} />
      </div>
    );
  }

  return (
    <div>
      <Router>
        <div>
          <div>
            <h2 style={{ display: "inline-block", paddingRight: "5px" }}>
              blogs
            </h2>
            <Link to="/" style={{ paddingRight: "5px" }}>
              blogs
            </Link>
            <Link to="/users">users</Link>
          </div>
          <Notification />
          <div>
            {user.name} logged in
            <button onClick={logout}>logout</button>
          </div>
          <Togglable buttonLabel="new note" ref={blogFormRef}>
            <NewBlog createBlog={createBlog} />
          </Togglable>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {blogs.map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    like={() => like(blog)}
                    canRemove={user && blog.user.username === user.username}
                    remove={() => remove(blog)}
                  />
                ))}
              </div>
            }
          />
          <Route
            path="/users"
            element={
              <div>
                <UserStats stats={stats} />
              </div>
            }
          />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
