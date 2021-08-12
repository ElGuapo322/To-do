import React, { useState } from "react";

import "../MainPage/Main.css";
import { useSelector, useDispatch } from "react-redux";
import {
  createCommentAction,
  deleteCommentAction,
  deleteTaskAction,
} from "../Redux/Action";
import { v4 as uuidv4 } from "uuid";

export default function Task(props) {
  const [commentButtonOpen, setCommentButtonOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.toDoReducer);
  const { comments } = useSelector((state) => state.toDoReducer);

  const commentOpen = () => {
    setCommentButtonOpen(!commentButtonOpen);
  };
  const nameComment = (e) => {
    setCommentText(e.target.value);
  };
  const submit = (e) => {
    e.preventDefault();
    if (commentText === "") {
      return;
    }
    const comment = {
      text: commentText,
      grandId: props.grandId,
      parentId: props.id,
      id: uuidv4(),
    };
    dispatch(createCommentAction(comment));

    setCommentText("");
    setCommentButtonOpen(false);
  };

  const deleteTaskBtn = (e) => {
    dispatch(deleteTaskAction(e.target.id));
  };
  const deleteCommentBtn = (e) => {
    dispatch(deleteCommentAction(e.target.id));
  };
  return (
    <div className="task" id={props.id}>
      <div className="task-title">
        <div>{props.title}</div>
        <button className="delete-button" onClick={deleteTaskBtn} id={props.id}>
          X
        </button>
      </div>

      {comments.map((i) =>
        props.id === i.parentId ? (
          <div className="comment">
            <div>{i.text}</div>
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
          <input autoFocus onChange={nameComment} />
          <button type="submit" id={props.id}>
            add comment
          </button>
        </form>
      ) : (
        <div></div>
      )}
      <button onClick={commentOpen} className="comment-button">
        add comment
      </button>
    </div>
  );
}
