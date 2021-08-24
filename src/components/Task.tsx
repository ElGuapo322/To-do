import React, { useState } from "react";

import "../MainPage/Main.css";
import { useSelector, useDispatch } from "react-redux";
import {
  createCommentAction,
  deleteCommentAction,
  deleteTaskAction,
} from "../Redux/Action";
import { v4 as uuidv4 } from "uuid";
import { UseTypedSelector } from "../hooks/useTypedSelector";

interface TaskProps {
  ref: any;
  grandId: string;
  // key: string;
  id: string;
  title: string;
  description: string;
  executor: string;
  date: string;
}

export default function Task({
  // key,
  id,
  title,
  description,
  executor,
  date,
  grandId,
}: TaskProps) {
  const [commentButtonOpen, setCommentButtonOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const dispatch = useDispatch();
  const { tasks } = UseTypedSelector((state) => state.toDoReducer);
  const { comments } = UseTypedSelector((state) => state.toDoReducer);

  const commentOpen = () => {
    setCommentButtonOpen(!commentButtonOpen);
  };
  const nameComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };
  const submit = (e: any) => {
    e.preventDefault();
    if (commentText === "") {
      return;
    }
    const comment = {
      text: commentText,
      grandId: grandId,
      parentId: id,
      id: uuidv4(),
    };
    dispatch(createCommentAction(comment));

    setCommentText("");
    setCommentButtonOpen(false);
  };

  const deleteTaskBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteTaskAction(e.currentTarget.id));
  };
  const deleteCommentBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteCommentAction(e.currentTarget.id));
  };
  return (
    <div className="task" id={id}>
      <div className="task-title">
        <div>{title}</div>

        <button className="delete-button" onClick={deleteTaskBtn} id={id}>
          X
        </button>
      </div>
      <div className="task-info">
        <div>{description}</div>
        <div>{executor}</div>
        <div>{date}</div>
      </div>

      {comments.map((i) =>
        id === i.parentId ? (
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
          <button type="submit" id={id}>
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
