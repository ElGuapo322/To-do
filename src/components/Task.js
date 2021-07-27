import React, { useState } from "react";
import { Context } from "../MainPage/MainPage";
import "../MainPage/Main.css";

export default function Task(props) {
  const context = React.useContext(Context);
  const [commentButtonOpen, setCommentButtonOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const commentOpen = () => {
    setCommentButtonOpen(!commentButtonOpen);
  };
  const nameComment = (e) => {
    setCommentText(e.target.value);
  };
  const submit = (e) => {
    e.preventDefault();
    context.createComment(commentText, props.id, props.grandId);
    setCommentText("");
    setCommentButtonOpen(false);
  };

  const deleteTaskBtn = (e) => {
    context.delTask(e.target.id);
  };
  const deleteCommentBtn = (e) => {
    context.delComment(e.target.id);
  };
  return (
    <div className="task" id={props.id}>
      <div>
        {props.title}
        <button className="delete-button" onClick={deleteTaskBtn} id={props.id}>
          X
        </button>
      </div>

      {context.comments.map((i) =>
        props.id === i.parentId ? (
          <div className="comment">
            {i.text}
            <button
              className="delete-button"
              onClick={deleteCommentBtn}
              id={i.id}
            >
              X
            </button>
          </div>
        ) : (
          <></>
        )
      )}

      {commentButtonOpen ? (
        <form onSubmit={submit}>
          <input onChange={nameComment} />
          <button type="submit" id={props.id}>
            add comment
          </button>
        </form>
      ) : (
        <div></div>
      )}
      <button onClick={commentOpen} className="comment-button">
        c
      </button>
    </div>
  );
}
