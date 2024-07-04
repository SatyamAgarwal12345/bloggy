import React, { useState, useEffect } from "react";

import axios from "axios";

import CommentContent from "./CommentContent";

const CommentSection = (props) => {
  const [comments, setComments] = useState([]);

  const [newCommentText, setNewCommentText] = useState("");

  const url = `https://bloggy-db.onrender.com/blogs${props.id}/comments`; // Replace with your API endpoint

  // Fetch comments on initial render and after changes

  useEffect(() => {
    fetchComments();
  }, [url, props.id]); // Dependency array includes blogId for updates on specific blog

  const fetchComments = async () => {
    try {
      const response = await axios.get(url);

      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    if (!newCommentText.trim()) {
      return; // Prevent empty comment submission
    }

    try {
      const response = await axios.post(url, {
        blogId: props.id,

        content: newCommentText,

        vote: 0,
      });

      // console.log(response.data +" hello");

      setComments([...comments, response.data]); // Add new comment to state

      setNewCommentText(""); // Clear input field after submission

      // axios.post(`http://localhost:2050/comments/${newCommentText}/${props.id}`)
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  // Implement moderation functionality here (e.g., approve/delete buttons for bloggers)

  return (
    <div className="comment-section px-4">
      <h3>Comments</h3>

      <form onSubmit={handleCommentSubmit}>
        <div className="form-group">
          <textarea
            className="form-control"
            rows="3"
            placeholder="Leave a comment..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            required // Add required attribute to prevent empty comments
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Post Comment
        </button>
      </form>

      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <CommentContent
              comments={comments}
              comment={comment}
              setComments={setComments}
              fetchcomments={fetchComments}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
