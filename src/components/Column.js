import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../MainPage/Main.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Context } from "../MainPage/MainPage";
import Task from "./Task";

export default function Column(props) {
  const context = React.useContext(Context);
  const [addButtonOpen, setAddButtonOpen] = useState(false);
  const [task, setTask] = useState([]);
  const [taskName, setTaskName] = useState("имя не выбрано");

  const name = (e) => {
    setTaskName(e.target.value);
  };

  const delButton = (e) => {
    context.delColumn(e.target.id);
  };

  const submit = (e) => {
    e.preventDefault();
    context.createTask(taskName, props.id);
    setTaskName("имя не выбрано");
    setAddButtonOpen(false);
  };
  return (
    <div id={props.id} className="column">
      <div>
        {props.title}
        <button className="delete-button" id={props.id} onClick={delButton}>
          X
        </button>
      </div>

      {context.tasks.map((i) =>
        props.id === i.parentId ? (
          <Task grandId={props.id} key={i.id} id={i.id} title={i.title} />
        ) : (
          <></>
        )
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
