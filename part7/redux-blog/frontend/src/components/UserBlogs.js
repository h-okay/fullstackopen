import blogService from "../services/blogs";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserBlogs = () => {
  const users = useSelector((state) => state.users);
  const [userBlogs, setUserBlogs] = useState([]);
  const { id } = useParams();
  const user = users.find((user) => user.id === id);

  const fetchUserBlogs = async () => {
    if (!user) {
      return;
    }

    const userBlogsIds = user.blogs.map((blog) => blog.id);

    if (userBlogsIds.length === 0) {
      setUserBlogs([]);
      return;
    }

    const blogPromises = userBlogsIds.map(async (id) => {
      const blog = await blogService.getOne(id);
      return blog;
    });

    const blogs = await Promise.all(blogPromises);
    setUserBlogs(blogs);
  };

  useEffect(() => {
    fetchUserBlogs();
  }, [id]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBlogs;
