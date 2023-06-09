import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import Comments from "./Comments";

const BlogDetails = ({ like }) => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      const fetchedBlog = await blogService.getOne(id);
      setBlog(fetchedBlog);
    };

    fetchBlogDetails();
  }, [id, like]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1>{blog.title}</h1>
        <p>{blog.url}</p>
        <div>
          <p>{blog.likes} likes</p>
          <button onClick={() => like(blog)}>Like</button>
        </div>
        <p>{"Added by " + blog.user.name}</p>
      </div>
      <h2>Comments</h2>
      <Comments blogId={blog.id} />
    </>
  );
};

export default BlogDetails;
