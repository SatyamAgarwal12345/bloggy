import axios from "axios";

import React, { useState, useEffect } from "react";

const CommentContent = (props) => {
  const [flag, setFlag] = useState(true);

  const [upVote, setUpVote] = useState(props.comment.vote);

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`https://bloggy-db.onrender.com/comments/${commentId}`);

      // console.log(props.comment);

      props.setComments(
        props.comments.filter((comment) => comment.id !== commentId)
      ); // Remove deleted comment from state
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  async function aprove(commentId) {
    setFlag(!flag);

    try {
      await axios

        .patch(`https://bloggy-db.onrender.com/comments/${commentId}`, { disable: flag })

        .then(() => {
          props.fetchcomments();
        });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }

  const handleCommentUpVote = async (commentId) => {
    setUpVote(upVote + 1);

    try {
      await axios.patch(`https://bloggy-db.onrender.com/comments/${commentId}`, {
        vote: upVote,
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleCommentDownVote = async (commentId) => {
    setUpVote(upVote - 1);

    try {
      await axios.patch(`https://bloggy-db.onrender.com/comments/${commentId}`, {
        vote: upVote,
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  console.log(props.comment.id + " cid");

  return (
    <div className="container">
      <div className="card p-2 mt-3">
        <div className="card-data">
          <b>{props.comment.content}</b>

          <p>
            {upVote}

            <button
              className="btn btn-success mx-2"
              onClick={() => handleCommentUpVote(props.comment.id)}
            >
              <i class="bi bi-emoji-heart-eyes"></i>
            </button>

            <button
              className="btn btn-danger mx-2"
              onClick={() => handleCommentDownVote(props.comment.id)}
            >
              <i class="bi bi-hand-thumbs-down-fill"></i>
            </button>
          </p>

          <button
            className="btn btn-danger mx-4 my-2"
            onClick={() => handleCommentDelete(props.comment.id)}
            disabled={props.comment.disable}
          >
            <i class="bi bi-trash3"></i>
          </button>

          <button
            className="btn btn-primary mx-2 "
            // onClick={() => setApprove(true)}

            onClick={() => aprove(props.comment.id)}
          >
            {flag ? <i class="bi bi-check2-all"></i> : "reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentContent;
