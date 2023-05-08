import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Login from "./components/Login";
import blogService from "./services/blogs";
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [notifType, setNotifType] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    if (!user) return;
    blogService.getAll().then((initialBlogs) => {
      initialBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(initialBlogs);
    });
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user.token);
      setUsername(user.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setUsername("");
  };

  const handleNotification = (text, type) => {
    setNotifType(type);
    setNotification(text);
    setTimeout(() => {
      setNotification(null);
      setNotifType(null);
    }, 2500);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    blogService
      .login({ username, password })
      .then((user) => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user.token);
        setUsername(user.name);
        setPassword("");
      })
      .catch((err) => {
        handleNotification(err.response.data.error, "error");
      });
  };

  const createBlog = (blogObject) => {
    blogService
      .create({ ...blogObject, user })
      .then((blog) => {
        setBlogs(blogs.concat({ ...blog, user: { name: username } }));
        handleNotification(
          `A new blog ${blog.title} by ${blog.author} added`,
          "success"
        );
        blogFormRef.current.toggleVisibility();
      })
      .catch((err) => {
        handleNotification(err.response.data.error, "error");
      });
  };

  const handleLike = (blog) => {
    blogService
      .update({ ...blog, likes: blog.likes + 1 })
      .then((updatedBlog) => {
        setBlogs(
          blogs
            .map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
            .sort((a, b) => b.likes - a.likes)
        );
      })
      .catch((err) => {
        handleNotification(err.response.data.error, "error");
      });
  };

  const handleRemove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService
        .remove({ id: blog.id, user })
        .then(() => {
          setBlogs(blogs.filter((b) => b.id !== blog.id));
          handleNotification(
            `Blog ${blog.title} by ${blog.author} removed`,
            "success"
          );
        })
        .catch((err) => {
          handleNotification(err.response.data.error, "error");
        });
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification text={notification} type={notifType} />

      {!user && (
        <Login
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      )}

      {user && (
        <>
          <div>
            {username} logged in&nbsp;
            <button onClick={handleLogout} className="button" id="logout">
              Logout
            </button>
          </div>
          <br />
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <div className="blogs">
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                handleRemove={handleRemove}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
