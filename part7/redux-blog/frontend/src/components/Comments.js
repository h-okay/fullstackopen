import { useSelector } from "react-redux";
import {
  initialiazeComments,
  addNewComment,
  deleteOldComment,
} from "../reducers/commentReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setNotification } from "../reducers/notificationReducer";

const Comments = ({ blogId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(initialiazeComments(blogId));
  }, [dispatch, blogId]);

  const addComment = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    event.target.comment.value = "";
    dispatch(addNewComment(blogId, { content: comment }));
    dispatch(setNotification("Comment added successfully.", "success", 5));
  };

  const deleteComment = (comment) => {
    const ok = window.confirm(
      `Are you sure you want to delete the comment "${comment.content}"?`
    );
    if (ok) {
      dispatch(deleteOldComment(blogId, comment.id));
      dispatch(setNotification("Comment deleted successfully.", "success", 5));
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <input type="text" name="comment" />
        <button type="submit">Add comment</button>
      </form>
      <p>{comments.length === 0 && "No comments available."}</p>
      <ul>
        <div>
          {comments.map((comment) => (
            <li key={comment.id}>
              <div>
                <p
                  style={{
                    display: "inline-block",
                    paddingRight: "5px",
                  }}
                >
                  {comment.content}
                </p>
                <button onClick={() => deleteComment(comment)}>Delete</button>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Comments;
