import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div className="blogForm">
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div className="inputField">
          title:&nbsp;
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="inputField">
          author:&nbsp;
          <input
            type="text"
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div className="inputField">
          url:&nbsp;
          <input
            type="text"
            id="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type="submit" value="Submit" id="createButton">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
