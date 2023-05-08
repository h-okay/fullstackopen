import Togglable from "./Togglable";
import PropTypes from "prop-types";

const Blog = ({ blog, handleLike, handleRemove }) => {
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
  };

  return (
    <div className="blog">
      <div className="blogTitleWrapper">
        <span className="blogTitle" id="title">
          {blog.title}
        </span>
        <span className="blogAuthor" id="author">
          &nbsp;by&nbsp;{blog.author}
        </span>
      </div>

      <Togglable buttonLabel="details">
        <p className="blogContent" id="url">
          URL: {blog.url}
        </p>
        <div>
          <span className="blogContent" id="likes">
            Likes: {blog.likes}
          </span>
          <button onClick={() => handleLike(blog)} id="likeButton" name="likeButton">
            like
          </button>
        </div>
        <p id="username">Added by: {blog.user.name}</p>
        <button onClick={() => handleRemove(blog)} id="removeButton">
          remove
        </button>
      </Togglable>
    </div>
  );
};

export default Blog;
