import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../MainPage/Main.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function Column(props) {
  const [addButtonOpen, setAddButtonOpen] = useState(false);
  const [task, setTask] = useState([]);
  const [taskName, setTaskName] = useState("");

  const name = (e) => {
    setTaskName(e.target.value);
  };

  const delButton = (e) => {
    props.onClick(e);
  };

  const submit = (e) => {
    e.preventDefault();
    let newTask = {
      id: uuidv4(),
      parentId: e.target.id,
      title: taskName,
    };
    setTask([...task, newTask]);
    console.log(task);
    console.log(e.target);
    setAddButtonOpen(false);
  };
  return (
    <div id={props.id} className="column">
      <div>
        {props.title}
        <button id={props.id} onClick={delButton}>
          X
        </button>
      </div>
      {task.length ? (
        task.map((i) => <div className="task">{i.title}</div>)
      ) : (
        <div></div>
      )}
      {!addButtonOpen ? (
        <button onClick={() => setAddButtonOpen(true)} id={props.id}>
          AddButton
        </button>
      ) : (
        <form id={props.id} onSubmit={submit}>
          <input onChange={name} />
          <button id={props.id}>create</button>
        </form>
      )}
    </div>
  );
}
